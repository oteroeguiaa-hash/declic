// Génération de l'île : relief, texture du sol, eau, carte des hauteurs pour les shaders.
import * as THREE from "three";
import { createNoise2D, fbm, ridged, smoothstep, lerp, clamp, mulberry32 } from "./noise.js";

export const WORLD_SIZE = 1400;      // mètres de côté
export const SEA_LEVEL = 0;

export class World {
  constructor(seed, quality) {
    this.seed = seed;
    this.N = quality.terrainCells;     // nombre de cases par côté
    this.step = WORLD_SIZE / this.N;
    this.half = WORLD_SIZE / 2;
    this.nA = createNoise2D(seed);
    this.nB = createNoise2D(seed + 11);
    this.nC = createNoise2D(seed + 23);
    this.nD = createNoise2D(seed + 37);
    this.nE = createNoise2D(seed + 51);
    this.buildHeights();
  }

  rawHeight(x, z) {
    const d = Math.hypot(x, z) / this.half;
    const coast = fbm(this.nC, x / 260, z / 260, 3) * 0.2;
    const continental = 1 - smoothstep(0.52, 0.9, d + coast);
    const hills = fbm(this.nA, x / 420, z / 420, 5) * 0.5 + 0.5;
    const mMask = smoothstep(0.1, 0.6, fbm(this.nB, x / 700 + 3.1, z / 700 - 1.7, 2) * 0.9 + 0.3);
    const m = ridged(this.nB, x / 380, z / 380, 5);
    let h = 4 + hills * 18 + Math.pow(m, 1.6) * 82 * mMask + fbm(this.nD, x / 45, z / 45, 3) * 1.5;
    return lerp(-16, h, continental);
  }

  moisture(x, z) {
    return fbm(this.nE, x / 250, z / 250, 3) * 0.5 + 0.5;
  }

  buildHeights() {
    const V = this.N + 1;
    this.V = V;
    this.heights = new Float32Array(V * V);
    for (let j = 0; j < V; j++) {
      const z = -this.half + j * this.step;
      for (let i = 0; i < V; i++) {
        const x = -this.half + i * this.step;
        this.heights[j * V + i] = this.rawHeight(x, z);
      }
    }
  }

  // Hauteur exacte du maillage (même découpage en triangles que le rendu).
  heightAt(x, z) {
    const V = this.V;
    let gx = (x + this.half) / this.step, gz = (z + this.half) / this.step;
    gx = clamp(gx, 0, this.N - 0.0001); gz = clamp(gz, 0, this.N - 0.0001);
    const i = Math.floor(gx), j = Math.floor(gz);
    const fx = gx - i, fz = gz - j;
    const H = this.heights;
    const ha = H[j * V + i], hb = H[j * V + i + 1], hc = H[(j + 1) * V + i], hd = H[(j + 1) * V + i + 1];
    if (fx + fz <= 1) return ha + (hb - ha) * fx + (hc - ha) * fz;
    return hd + (hc - hd) * (1 - fx) + (hb - hd) * (1 - fz);
  }

  slopeAt(x, z) {
    const e = this.step;
    const dx = this.heightAt(x + e, z) - this.heightAt(x - e, z);
    const dz = this.heightAt(x, z + e) - this.heightAt(x, z - e);
    const ny = 2 * e / Math.hypot(dx, 2 * e, dz);
    return 1 - ny; // 0 = plat
  }

  rawSlope(x, z) {
    const e = 2;
    const dx = this.rawHeight(x + e, z) - this.rawHeight(x - e, z);
    const dz = this.rawHeight(x, z + e) - this.rawHeight(x, z - e);
    return 1 - (2 * e) / Math.hypot(dx, 2 * e, dz);
  }

  findSpawn(isClear = () => true) {
    const rand = mulberry32(this.seed + 99);
    for (let tries = 0; tries < 4000; tries++) {
      const r = 60 + tries * 0.12;
      const a = rand() * Math.PI * 2;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const h = this.heightAt(x, z);
      if (h > 4 && h < 16 && this.slopeAt(x, z) < 0.08 && isClear(x, z)) return new THREE.Vector3(x, h, z);
    }
    return new THREE.Vector3(0, this.heightAt(0, 0), 0);
  }

  // Texture R = hauteur, G = densité d'herbe. Utilisée par l'herbe et l'eau.
  buildHeightTexture() {
    const V = this.V;
    const data = new Uint16Array(V * V * 2);
    const toHalf = THREE.DataUtils.toHalfFloat;
    for (let j = 0; j < V; j++) {
      const z = -this.half + j * this.step;
      for (let i = 0; i < V; i++) {
        const x = -this.half + i * this.step;
        const h = this.heights[j * V + i];
        const s = this.slopeAt(x, z);
        const m = this.moisture(x, z);
        let g = smoothstep(2.6, 4.0, h) * (1 - smoothstep(42, 56, h)) * (1 - smoothstep(0.12, 0.25, s));
        g *= smoothstep(0.15, 0.55, m) * 0.85 + 0.15;
        data[(j * V + i) * 2] = toHalf(h);
        data[(j * V + i) * 2 + 1] = toHalf(g);
      }
    }
    const tex = new THREE.DataTexture(data, V, V, THREE.RGFormat, THREE.HalfFloatType);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    this.heightTex = tex;
    const a = 1 / (this.step * V);
    const b = (this.half / this.step + 0.5) / V;
    this.hmTransform = new THREE.Vector2(a, b); // uv = pos * a + b
    return tex;
  }

  buildTerrainMesh(detailTex) {
    const V = this.V;
    const pos = new Float32Array(V * V * 3);
    for (let j = 0; j < V; j++) {
      for (let i = 0; i < V; i++) {
        const k = (j * V + i) * 3;
        pos[k] = -this.half + i * this.step;
        pos[k + 1] = this.heights[j * V + i];
        pos[k + 2] = -this.half + j * this.step;
      }
    }
    const idx = new Uint32Array(this.N * this.N * 6);
    let p = 0;
    for (let j = 0; j < this.N; j++) {
      for (let i = 0; i < this.N; i++) {
        const a = j * V + i, b = a + 1, c = a + V, d = c + 1;
        idx[p++] = a; idx[p++] = c; idx[p++] = b;
        idx[p++] = b; idx[p++] = c; idx[p++] = d;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeVertexNormals();
    geo.computeBoundingSphere();

    const mat = new THREE.MeshStandardMaterial({ roughness: 0.95, metalness: 0 });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.tDetail = { value: detailTex };
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;\nvarying vec3 vWN;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;\nvWN = normalize(mat3(modelMatrix) * objectNormal);");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform sampler2D tDetail;
varying vec3 vWPos;
varying vec3 vWN;
vec3 srgb(vec3 c){ return pow(c, vec3(2.2)); }
vec3 terrainColor(){
  vec3 d1 = texture2D(tDetail, vWPos.xz * 0.21).rgb;
  vec3 d2 = texture2D(tDetail, vWPos.xz * 0.019).rgb;
  vec3 d3 = texture2D(tDetail, vWPos.xz * 0.0041).rgb;
  float h = vWPos.y;
  float slope = 1.0 - normalize(vWN).y;
  vec3 grass = mix(srgb(vec3(0.24,0.36,0.12)), srgb(vec3(0.40,0.43,0.17)), smoothstep(0.3,0.7,d2.r*0.6+d3.g*0.6));
  grass *= 0.75 + 0.5 * d1.g;
  vec3 dirt = srgb(vec3(0.36,0.28,0.19)) * (0.75 + 0.5 * d1.b);
  vec3 sand = srgb(vec3(0.80,0.72,0.54)) * (0.88 + 0.24 * d1.r);
  vec3 rock = srgb(vec3(0.46,0.44,0.41)) * (0.55 + 0.7 * d1.r * (0.6 + 0.4 * d2.g));
  vec3 snow = srgb(vec3(0.93,0.95,0.98)) * (0.92 + 0.08 * d1.g);
  vec3 c = grass;
  c = mix(c, dirt, smoothstep(0.68, 0.8, d2.b * 0.8 + d1.r * 0.25 + d3.r * 0.2));
  float beach = 1.0 - smoothstep(1.4, 3.0 + d2.g * 1.6, h);
  c = mix(c, sand, beach);
  c = mix(c, sand * 0.55, 1.0 - smoothstep(-0.3, 0.5, h));
  float rockAmt = smoothstep(0.26, 0.40, slope + (d1.g - 0.5) * 0.14) + smoothstep(52.0, 66.0, h + d2.r * 10.0);
  c = mix(c, rock, clamp(rockAmt, 0.0, 1.0));
  float snowAmt = smoothstep(74.0, 82.0, h + d2.r * 9.0) * (1.0 - smoothstep(0.32, 0.5, slope));
  c = mix(c, snow, snowAmt);
  return c;
}`)
        .replace("#include <color_fragment>", "#include <color_fragment>\ndiffuseColor.rgb = terrainColor();");
    };
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    return mesh;
  }

  buildWater(waterNormalTex) {
    const geo = new THREE.PlaneGeometry(9000, 9000, 1, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({ color: 0x1b4d5c, roughness: 0.06, metalness: 0.0, transparent: true, depthWrite: true });
    const uniforms = { uTime: { value: 0 } };
    this.waterUniforms = uniforms;
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = uniforms.uTime;
      sh.uniforms.tHeight = { value: this.heightTex };
      sh.uniforms.uHM = { value: this.hmTransform };
      sh.uniforms.tWaterN = { value: waterNormalTex };
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform sampler2D tHeight; uniform vec2 uHM; uniform sampler2D tWaterN;
varying vec3 vWPos;`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  float ground = texture2D(tHeight, vWPos.xz * uHM.x + uHM.y).r;
  float depth = max(0.0, -ground);
  vec3 shallow = vec3(0.10, 0.36, 0.34);
  vec3 deep = vec3(0.012, 0.07, 0.10);
  diffuseColor.rgb = mix(shallow, deep, smoothstep(0.0, 9.0, depth));
  float foamN = texture2D(tWaterN, vWPos.xz * 0.21 + vec2(uTime * 0.03, 0.0)).b;
  float foam = (1.0 - smoothstep(0.0, 0.55, depth)) * smoothstep(0.35, 0.65, foamN + 0.25 * sin(uTime * 1.3 + vWPos.x * 0.4));
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.85), foam * 0.7);
  diffuseColor.a = mix(0.28, 0.93, smoothstep(0.0, 3.5, depth)) + foam * 0.4;`)
        .replace("#include <normal_fragment_maps>", `
  vec3 n1 = texture2D(tWaterN, vWPos.xz * 0.045 + vec2(uTime * 0.018, uTime * 0.011)).xyz * 2.0 - 1.0;
  vec3 n2 = texture2D(tWaterN, vWPos.xz * 0.12 - vec2(uTime * 0.013, -uTime * 0.021)).xyz * 2.0 - 1.0;
  vec2 nxy = (n1.xy + n2.xy) * 0.55;
  vec3 wn = normalize(vec3(nxy.x, 1.0, -nxy.y));
  normal = normalize((viewMatrix * vec4(wn, 0.0)).xyz);`);
    };
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = SEA_LEVEL;
    mesh.receiveShadow = false;
    mesh.renderOrder = 2;
    return mesh;
  }
}

// --- Textures procédurales (aucun fichier image à télécharger) ---

function periodicValueNoise(size, cells, rand) {
  const lattice = new Float32Array(cells * cells);
  for (let i = 0; i < lattice.length; i++) lattice[i] = rand();
  const out = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const gx = (x / size) * cells, gy = (y / size) * cells;
      const x0 = Math.floor(gx), y0 = Math.floor(gy);
      let fx = gx - x0, fy = gy - y0;
      fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
      const x1 = (x0 + 1) % cells, y1 = (y0 + 1) % cells;
      const a = lattice[y0 * cells + x0], b = lattice[y0 * cells + x1];
      const c = lattice[y1 * cells + x0], d = lattice[y1 * cells + x1];
      out[y * size + x] = lerp(lerp(a, b, fx), lerp(c, d, fx), fy);
    }
  }
  return out;
}

function tileableFbm(size, baseCells, octaves, seed) {
  const rand = mulberry32(seed);
  const out = new Float32Array(size * size);
  let amp = 1, norm = 0, cells = baseCells;
  for (let o = 0; o < octaves; o++) {
    const n = periodicValueNoise(size, cells, rand);
    for (let i = 0; i < out.length; i++) out[i] += n[i] * amp;
    norm += amp; amp *= 0.5; cells *= 2;
    if (cells > size) break;
  }
  for (let i = 0; i < out.length; i++) out[i] /= norm;
  return out;
}

export function makeDetailTexture(renderer, seed) {
  const size = 256;
  const r = tileableFbm(size, 8, 5, seed + 1);
  const g = tileableFbm(size, 4, 5, seed + 2);
  const b = tileableFbm(size, 16, 4, seed + 3);
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    data[i * 4] = clamp((r[i] - 0.5) * 1.8 + 0.5, 0, 1) * 255;
    data[i * 4 + 1] = clamp((g[i] - 0.5) * 1.8 + 0.5, 0, 1) * 255;
    data[i * 4 + 2] = clamp((b[i] - 0.5) * 1.8 + 0.5, 0, 1) * 255;
    data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  tex.needsUpdate = true;
  return tex;
}

export function makeWaterNormalTexture(renderer, seed) {
  const size = 256;
  const h = tileableFbm(size, 8, 5, seed + 7);
  const foam = tileableFbm(size, 16, 3, seed + 8);
  const data = new Uint8Array(size * size * 4);
  const k = 6.0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = h[y * size + ((x - 1 + size) % size)], rr = h[y * size + ((x + 1) % size)];
      const u = h[((y - 1 + size) % size) * size + x], d = h[((y + 1) % size) * size + x];
      let nx = (l - rr) * k, ny = (u - d) * k, nz = 1;
      const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len;
      const i = (y * size + x) * 4;
      data[i] = (nx * 0.5 + 0.5) * 255;
      data[i + 1] = (ny * 0.5 + 0.5) * 255;
      data[i + 2] = foam[y * size + x] * 255;
      data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  tex.needsUpdate = true;
  return tex;
}
