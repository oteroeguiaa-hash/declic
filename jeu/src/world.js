// Génération de l'île : relief, ruisseaux, sol, eau, carte des hauteurs pour les shaders.
// Le terrain est découpé en morceaux (chunks) avec plusieurs niveaux de détail selon la distance.
import * as THREE from "three";
import { createNoise2D, fbm, smoothstep, lerp, clamp, mulberry32 } from "./noise.js";

export const WORLD_SIZE = 3500;      // mètres de côté (île 2,5 × plus grande)
export const SEA_LEVEL = 0;
const CELLS = 1100;                  // même grille pour toutes les qualités : l'île est identique partout
const CHUNK = 50;                    // cases par morceau de terrain
const LOD_STEPS = [1, 2, 5, 10, 25];

export class World {
  constructor(seed) {
    this.seed = seed;
    this.N = CELLS;
    this.step = WORLD_SIZE / this.N;
    this.half = WORLD_SIZE / 2;
    this.nA = createNoise2D(seed);
    this.nB = createNoise2D(seed + 11);
    this.nC = createNoise2D(seed + 23);
    this.nD = createNoise2D(seed + 37);
    this.nE = createNoise2D(seed + 51);
    this.nS = createNoise2D(seed + 67);
    this.nR = createNoise2D(seed + 79);
    this._out = { h: 0, stream: 0, water: -1e3 };
    this.buildHeights();
  }

  // Relief « européen » : collines arrondies, vallons, petites montagnes douces, lacs et ruisseaux.
  sample(x, z, out = this._out) {
    const wx = x + fbm(this.nD, x / 500 + 7.3, z / 500 - 2.1, 2) * 90;
    const wz = z + fbm(this.nD, x / 500 - 4.7, z / 500 + 5.9, 2) * 90;
    const d = Math.hypot(x, z) / this.half;
    const coast = fbm(this.nC, x / 420, z / 420, 2) * 0.16;
    const continental = 1 - smoothstep(0.62, 0.93, d + coast);

    const roll = fbm(this.nA, wx / 520, wz / 520, 4) * 0.5 + 0.5;
    const hills = Math.pow(fbm(this.nA, wx / 230 + 11, wz / 230 - 3, 3) * 0.5 + 0.5, 1.6);
    let h = 3.5 + roll * 14 + hills * 16;

    const massif = smoothstep(0.25, 0.7, fbm(this.nB, x / 650 + 3.1, z / 650 - 1.7, 2) * 0.9 + 0.35);
    const mount = fbm(this.nB, wx / 300, wz / 300, 4) * 0.5 + 0.5;
    h += Math.pow(mount, 2.2) * 62 * massif;
    h += fbm(this.nE, x / 38, z / 38, 2) * 0.8;

    const lakeN = fbm(this.nC, x / 330 + 21, z / 330 - 13, 2);
    const lake = smoothstep(0.32, 0.5, lakeN) * smoothstep(0.8, 0.5, d) * (1 - massif * 0.8);
    h = lerp(h, -2.8, lake);
    h = lerp(-14, h, continental);
    if (h > 0 && h < 3) h = h * h / 3 * 0.6 + h * 0.4;

    // Ruisseaux : lignes de niveau d'un bruit, seulement dans certaines régions et à basse altitude
    let stream = 0, water = -1e3;
    const region = smoothstep(-0.05, 0.25, fbm(this.nR, x / 900, z / 900, 2));
    if (region > 0 && h > 2.5 && h < 46) {
      const f = (X, Z) => fbm(this.nS, X / 380, Z / 380, 3);
      const v = f(wx, wz);
      if (Math.abs(v) < 0.06) {
        // Distance (en mètres) à la ligne du ruisseau : valeur / pente du bruit → largeur régulière
        const gx = f(wx + 1, wz) - v, gz = f(wx, wz + 1) - v;
        const dist = Math.abs(v) / (Math.hypot(gx, gz) + 1e-6);
        const zone = smoothstep(2.5, 5, h) * (1 - smoothstep(38, 46, h)) * (1 - lake) * region;
        const half = 1.2 + 1.3 * region;              // demi-largeur du lit : 1,2 à 2,5 m
        stream = (1 - smoothstep(half * 0.5, half + 1.6, dist)) * zone;
        // La surface de l'eau couvre une bande plus large que le lit : le terrain la cache sur les berges.
        if (zone > 0.05 && dist < half + 8) water = h - 0.45;
        h -= 1.4 * stream;
      }
    }
    out.h = h; out.stream = stream; out.water = water;
    return out;
  }

  rawHeight(x, z) { return this.sample(x, z).h; }

  moisture(x, z) {
    return fbm(this.nE, x / 250, z / 250, 3) * 0.5 + 0.5;
  }

  buildHeights() {
    const V = this.N + 1;
    this.V = V;
    this.heights = new Float32Array(V * V);
    this.stream = new Float32Array(V * V);
    this.waterY = new Float32Array(V * V);
    const o = this._out;
    for (let j = 0; j < V; j++) {
      const z = -this.half + j * this.step;
      for (let i = 0; i < V; i++) {
        const x = -this.half + i * this.step;
        this.sample(x, z, o);
        const k = j * V + i;
        this.heights[k] = o.h; this.stream[k] = o.stream; this.waterY[k] = o.water;
      }
    }
  }

  _cell(x, z) {
    let gx = (x + this.half) / this.step, gz = (z + this.half) / this.step;
    gx = clamp(gx, 0, this.N - 0.0001); gz = clamp(gz, 0, this.N - 0.0001);
    const i = Math.floor(gx), j = Math.floor(gz);
    return [i, j, gx - i, gz - j];
  }

  // Hauteur exacte du maillage le plus détaillé (même découpage en triangles).
  heightAt(x, z) {
    const V = this.V;
    const [i, j, fx, fz] = this._cell(x, z);
    const H = this.heights;
    const ha = H[j * V + i], hb = H[j * V + i + 1], hc = H[(j + 1) * V + i], hd = H[(j + 1) * V + i + 1];
    if (fx + fz <= 1) return ha + (hb - ha) * fx + (hc - ha) * fz;
    return hd + (hc - hd) * (1 - fx) + (hb - hd) * (1 - fz);
  }

  streamAt(x, z) {
    const V = this.V, S = this.stream;
    const [i, j, fx, fz] = this._cell(x, z);
    const a = S[j * V + i], b = S[j * V + i + 1], c = S[(j + 1) * V + i], d = S[(j + 1) * V + i + 1];
    return lerp(lerp(a, b, fx), lerp(c, d, fx), fz);
  }

  // Niveau de l'eau à cet endroit : ruisseau, sinon mer/lacs (0).
  waterLevelAt(x, z) {
    const V = this.V, W = this.waterY;
    const [i, j, fx, fz] = this._cell(x, z);
    const a = W[j * V + i], b = W[j * V + i + 1], c = W[(j + 1) * V + i], d = W[(j + 1) * V + i + 1];
    if (a < -100 || b < -100 || c < -100 || d < -100) return SEA_LEVEL;
    return Math.max(SEA_LEVEL, lerp(lerp(a, b, fx), lerp(c, d, fx), fz));
  }

  // Distance approximative au ruisseau le plus proche (pour le son), en mètres, plafonnée.
  streamNear(x, z, maxR = 40) {
    if (this.streamAt(x, z) > 0.2) return 0;
    for (let r = 6; r <= maxR; r += 6) {
      for (let a = 0; a < 8; a++) {
        const t = (a / 8) * Math.PI * 2;
        if (this.streamAt(x + Math.cos(t) * r, z + Math.sin(t) * r) > 0.2) return r;
      }
    }
    return maxR;
  }

  slopeAt(x, z) {
    const e = this.step;
    const dx = this.heightAt(x + e, z) - this.heightAt(x - e, z);
    const dz = this.heightAt(x, z + e) - this.heightAt(x, z - e);
    const ny = 2 * e / Math.hypot(dx, 2 * e, dz);
    return 1 - ny; // 0 = plat
  }

  findSpawn(isClear = () => true) {
    const rand = mulberry32(this.seed + 99);
    for (let tries = 0; tries < 6000; tries++) {
      const r = 150 + tries * 0.2;
      const a = rand() * Math.PI * 2;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const h = this.heightAt(x, z);
      if (h > 4 && h < 18 && this.slopeAt(x, z) < 0.08 && this.streamAt(x, z) < 0.01 && isClear(x, z)) return new THREE.Vector3(x, h, z);
    }
    return new THREE.Vector3(0, this.heightAt(0, 0), 0);
  }

  // Ombre des arbres sur le sol (canopée), rastérisée sur la grille : sol de sous-bois, moins d'herbe.
  applyCanopy(props) {
    const V = this.V, C = (this.canopy = new Float32Array(V * V));
    for (const p of props) {
      if (p.t !== "pine" && p.t !== "oak" && p.t !== "birch") continue;
      const r = (p.t === "oak" ? 4.2 : p.t === "birch" ? 2.6 : 3.2) * p.s;
      const gi = (p.x + this.half) / this.step, gj = (p.z + this.half) / this.step, rc = r / this.step;
      for (let j = Math.max(0, Math.floor(gj - rc)); j <= Math.min(this.N, Math.ceil(gj + rc)); j++)
        for (let i = Math.max(0, Math.floor(gi - rc)); i <= Math.min(this.N, Math.ceil(gi + rc)); i++) {
          const d = Math.hypot(i - gi, j - gj) / rc;
          if (d < 1) C[j * V + i] = Math.min(1, C[j * V + i] + (1 - d * d) * 0.8);
        }
    }
  }

  // Texture R = hauteur, G = densité d'herbe, B = ruisseau, A = canopée. Utilisée par le terrain, l'herbe et l'eau.
  buildHeightTexture() {
    const V = this.V;
    const data = new Uint16Array(V * V * 4);
    const toHalf = THREE.DataUtils.toHalfFloat;
    for (let j = 0; j < V; j++) {
      const z = -this.half + j * this.step;
      for (let i = 0; i < V; i++) {
        const x = -this.half + i * this.step;
        const k = j * V + i;
        const h = this.heights[k];
        const s = this.slopeAt(x, z);
        const m = this.moisture(x, z);
        let g = smoothstep(2.6, 4.0, h) * (1 - smoothstep(42, 56, h)) * (1 - smoothstep(0.12, 0.25, s));
        g *= smoothstep(0.15, 0.55, m) * 0.85 + 0.15;
        g *= 1 - smoothstep(0.02, 0.15, this.stream[k]);
        const can = this.canopy ? this.canopy[k] : 0;
        g *= 1 - 0.7 * can;
        data[k * 4] = toHalf(h);
        data[k * 4 + 1] = toHalf(g);
        data[k * 4 + 2] = toHalf(this.stream[k]);
        data[k * 4 + 3] = toHalf(this.canopy ? this.canopy[k] : 0);
      }
    }
    const tex = new THREE.DataTexture(data, V, V, THREE.RGBAFormat, THREE.HalfFloatType);
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

  // ---------- Terrain en morceaux avec niveaux de détail ----------
  buildTerrain(detailTex) {
    const C = CHUNK, CV = C + 1, nC = this.N / C;
    // Ordre des sommets d'un morceau : grille (CV×CV) puis 4 bords de jupe (CV chacun)
    const border = [
      Array.from({ length: CV }, (_, i) => i),                    // bas  (j = 0)
      Array.from({ length: CV }, (_, i) => C * CV + i),           // haut (j = C)
      Array.from({ length: CV }, (_, j) => j * CV),               // gauche (i = 0)
      Array.from({ length: CV }, (_, j) => j * CV + C),           // droite (i = C)
    ];
    this.lodIndex = LOD_STEPS.map((s) => {
      const idx = [];
      for (let j = 0; j < C; j += s) for (let i = 0; i < C; i += s) {
        const a = j * CV + i, b = a + s, c = a + s * CV, d = c + s;
        idx.push(a, c, b, b, c, d);
      }
      border.forEach((side, si) => {
        const base = CV * CV + si * CV;
        for (let k = 0; k < C; k += s) {
          const v0 = side[k], v1 = side[k + s], s0 = base + k, s1 = base + k + s;
          idx.push(v0, s0, v1, v1, s0, s1, v0, v1, s0, v1, s1, s0); // deux faces
        }
      });
      return new THREE.BufferAttribute(new Uint32Array(idx), 1);
    });

    const mat = this.makeTerrainMaterial(detailTex);
    this.chunks = [];
    const group = new THREE.Group();
    const V = this.V;
    for (let cj = 0; cj < nC; cj++) for (let ci = 0; ci < nC; ci++) {
      const pos = new Float32Array((CV * CV + 4 * CV) * 3);
      let minY = 1e9, maxY = -1e9;
      for (let j = 0; j < CV; j++) for (let i = 0; i < CV; i++) {
        const gi = ci * C + i, gj = cj * C + j;
        const k = (j * CV + i) * 3;
        const y = this.heights[gj * V + gi];
        pos[k] = -this.half + gi * this.step; pos[k + 1] = y; pos[k + 2] = -this.half + gj * this.step;
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
      border.forEach((side, si) => side.forEach((v, n) => {
        const k = (CV * CV + si * CV + n) * 3;
        pos[k] = pos[v * 3]; pos[k + 1] = pos[v * 3 + 1] - 6; pos[k + 2] = pos[v * 3 + 2];
      }));
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setIndex(this.lodIndex[4]);
      const cx = -this.half + (ci + 0.5) * C * this.step, cz = -this.half + (cj + 0.5) * C * this.step;
      const size = C * this.step;
      geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(cx, (minY + maxY) / 2, cz), Math.hypot(size / 2, size / 2, (maxY - minY) / 2 + 6));
      geo.boundingBox = new THREE.Box3(new THREE.Vector3(cx - size / 2, minY - 6, cz - size / 2), new THREE.Vector3(cx + size / 2, maxY, cz + size / 2));
      const mesh = new THREE.Mesh(geo, mat);
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
      this.chunks.push({ mesh, geo, cx, cz, size, lod: 4, underwater: maxY < -6 });
    }
    this.terrain = group;
    return group;
  }

  updateTerrain(cam, viewDistance, lodScale = 1) {
    for (const c of this.chunks) {
      const d = Math.max(0, Math.hypot(c.cx - cam.x, c.cz - cam.z) - c.size * 0.71);
      c.mesh.visible = d < viewDistance + 50 && !c.underwater;
      if (!c.mesh.visible) continue;
      const k = d / lodScale;
      const lod = k < 70 ? 0 : k < 200 ? 1 : k < 420 ? 2 : k < 750 ? 3 : 4;
      if (lod !== c.lod) { c.lod = lod; c.geo.setIndex(this.lodIndex[lod]); }
    }
  }

  makeTerrainMaterial(detailTex) {
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.95, metalness: 0 });
    const step = this.step;
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.tDetail = { value: detailTex };
      sh.uniforms.tHeight = { value: this.heightTex };
      sh.uniforms.uHM = { value: this.hmTransform };
      sh.uniforms.uTexel = { value: 1 / this.V };
      sh.uniforms.uStep = { value: step };
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nuniform sampler2D tHeight; uniform vec2 uHM; uniform float uTexel; uniform float uStep;\nvarying vec3 vWPos;\nvarying vec3 vWN;")
        .replace("#include <beginnormal_vertex>", `
  vec2 huv = position.xz * uHM.x + uHM.y;
  float hl = texture2D(tHeight, huv - vec2(uTexel, 0.0)).r, hr = texture2D(tHeight, huv + vec2(uTexel, 0.0)).r;
  float hd = texture2D(tHeight, huv - vec2(0.0, uTexel)).r, hu = texture2D(tHeight, huv + vec2(0.0, uTexel)).r;
  vec3 objectNormal = normalize(vec3(hl - hr, 2.0 * uStep, hd - hu));`)
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = transformed;\nvWN = objectNormal;");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform sampler2D tDetail; uniform sampler2D tHeight; uniform vec2 uHM;
varying vec3 vWPos;
varying vec3 vWN;
vec3 srgb(vec3 c){ return pow(c, vec3(2.2)); }
vec3 terrainColor(){
  vec3 d1 = texture2D(tDetail, vWPos.xz * 0.21).rgb;
  vec3 d2 = texture2D(tDetail, vWPos.xz * 0.019).rgb;
  vec3 d3 = texture2D(tDetail, vWPos.xz * 0.0041).rgb;
  float h = vWPos.y;
  float slope = 1.0 - normalize(vWN).y;
  vec4 hm = texture2D(tHeight, vWPos.xz * uHM.x + uHM.y);
  float stream = hm.b;
  float canopy = hm.a;
  vec3 grass = mix(srgb(vec3(0.24,0.36,0.12)), srgb(vec3(0.40,0.43,0.17)), smoothstep(0.3,0.7,d2.r*0.6+d3.g*0.6));
  grass *= 0.75 + 0.5 * d1.g;
  vec3 dirt = srgb(vec3(0.33,0.29,0.18)) * (0.75 + 0.5 * d1.b);
  vec3 sand = srgb(vec3(0.80,0.72,0.54)) * (0.88 + 0.24 * d1.r);
  vec3 rock = srgb(vec3(0.46,0.44,0.41)) * (0.55 + 0.7 * d1.r * (0.6 + 0.4 * d2.g));
  vec3 mud = mix(srgb(vec3(0.20,0.17,0.12)), srgb(vec3(0.42,0.40,0.36)), step(0.55, d1.r)) * (0.7 + 0.4 * d1.g);
  vec3 c = grass;
  c = mix(c, dirt, smoothstep(0.72, 0.84, d2.b * 0.8 + d1.r * 0.25 + d3.r * 0.2));
  c = mix(c, srgb(vec3(0.26, 0.28, 0.12)) * (0.7 + 0.5 * d1.b), smoothstep(0.6, 0.8, d3.b) * 0.3);
  // Sous-bois : feuilles mortes, aiguilles et mousse sous les arbres
  vec3 litter = mix(srgb(vec3(0.30, 0.24, 0.14)), srgb(vec3(0.20, 0.25, 0.10)), smoothstep(0.35, 0.65, d2.g + d1.b * 0.3)) * (0.7 + 0.5 * d1.r);
  c = mix(c, litter, smoothstep(0.15, 0.7, canopy) * 0.8);
  c = mix(c, srgb(vec3(0.17, 0.24, 0.09)) * (0.8 + 0.4 * d1.g), smoothstep(0.0, 0.08, stream) * 0.7); // berges moussues
  c = mix(c, mud, smoothstep(0.15, 0.45, stream));                                                    // lit du ruisseau
  float beach = 1.0 - smoothstep(1.4, 3.0 + d2.g * 1.6, h);
  c = mix(c, sand, beach);
  c = mix(c, sand * 0.55, 1.0 - smoothstep(-0.3, 0.5, h));
  float rockAmt = smoothstep(0.30, 0.46, slope + (d1.g - 0.5) * 0.14) + smoothstep(58.0, 72.0, h + d2.r * 10.0);
  c = mix(c, rock, clamp(rockAmt, 0.0, 1.0) * (1.0 - smoothstep(0.1, 0.3, stream)));
  return c;
}`)
        .replace("#include <color_fragment>", "#include <color_fragment>\ndiffuseColor.rgb = terrainColor();");
    };
    return mat;
  }

  // Surface de l'eau des ruisseaux : un maillage qui suit le lit, avec un courant qui descend la pente.
  buildStreams(waterNormalTex) {
    const V = this.V, W = this.waterY, S = this.stream;
    const pos = [], idx = [];
    const map = new Int32Array(V * V).fill(-1);
    const vert = (i, j) => {
      const k = j * V + i;
      if (map[k] < 0) { map[k] = pos.length / 3; pos.push(-this.half + i * this.step, W[k], -this.half + j * this.step); }
      return map[k];
    };
    for (let j = 0; j < this.N; j++) for (let i = 0; i < this.N; i++) {
      const a = j * V + i, b = a + 1, c = a + V, d = c + 1;
      if (W[a] < -100 || W[b] < -100 || W[c] < -100 || W[d] < -100) continue;
      if (Math.max(S[a], S[b], S[c], S[d]) < 0.05) continue;
      const va = vert(i, j), vb = vert(i + 1, j), vc = vert(i, j + 1), vd = vert(i + 1, j + 1);
      idx.push(va, vc, vb, vb, vc, vd);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    const mat = new THREE.MeshStandardMaterial({ color: 0x2a5a52, roughness: 0.05, metalness: 0, transparent: true, depthWrite: true });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = this.waterUniforms.uTime;
      sh.uniforms.tHeight = { value: this.heightTex };
      sh.uniforms.uHM = { value: this.hmTransform };
      sh.uniforms.uTexel = { value: 1 / V };
      sh.uniforms.tWaterN = { value: waterNormalTex };
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = transformed;");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform sampler2D tHeight; uniform vec2 uHM; uniform float uTexel; uniform sampler2D tWaterN;
varying vec3 vWPos;`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  vec2 huv = vWPos.xz * uHM.x + uHM.y;
  float ground = texture2D(tHeight, huv).r;
  float depth = max(0.0, vWPos.y - ground);
  diffuseColor.rgb = mix(vec3(0.16, 0.30, 0.24), vec3(0.03, 0.10, 0.09), smoothstep(0.0, 1.0, depth));
  diffuseColor.a = smoothstep(0.0, 0.12, depth) * mix(0.35, 0.85, smoothstep(0.0, 0.9, depth));
  if (diffuseColor.a < 0.02) discard;`)
        .replace("#include <normal_fragment_maps>", `
  // Le courant suit la pente du terrain
  float gx = texture2D(tHeight, huv + vec2(uTexel * 3.0, 0.0)).r - texture2D(tHeight, huv - vec2(uTexel * 3.0, 0.0)).r;
  float gz = texture2D(tHeight, huv + vec2(0.0, uTexel * 3.0)).r - texture2D(tHeight, huv - vec2(0.0, uTexel * 3.0)).r;
  vec2 flow = -normalize(vec2(gx, gz) + 1e-4) * (0.6 + min(1.5, length(vec2(gx, gz)) * 0.4));
  vec3 n1 = texture2D(tWaterN, vWPos.xz * 0.35 + flow * uTime * 0.35).xyz * 2.0 - 1.0;
  vec3 n2 = texture2D(tWaterN, vWPos.xz * 0.8 + flow * uTime * 0.5 + 0.37).xyz * 2.0 - 1.0;
  vec2 nxy = (n1.xy + n2.xy) * 0.45;
  vec3 wn = normalize(vec3(nxy.x, 1.0, -nxy.y));
  normal = normalize((viewMatrix * vec4(wn, 0.0)).xyz);`);
    };
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = 2;
    return mesh;
  }

  buildWater(waterNormalTex) {
    const geo = new THREE.PlaneGeometry(16000, 16000, 1, 1);
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
