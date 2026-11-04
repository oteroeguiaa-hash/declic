// Végétation au sol calculée sur la carte graphique : les positions se recyclent autour du joueur (aucun coût CPU).
// Herbe en vraies touffes de brins (fleurs, herbes sèches, terre nue), couvre-sol, fougères, jeunes pousses, litière.
import * as THREE from "three";
import { mergeGeometries } from "../vendor/addons/BufferGeometryUtils.js";
import { mulberry32 } from "./noise.js";
import { makeGroundCover, makeFern, makeShrub, makeLeafBush, makeLitter, vegUniforms } from "./trees.js";

const HASH = `float h21(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }`;

// ---------- Herbe ----------
export class Grass {
  constructor(scene, world, quality) {
    const count = quality.grassCount;
    const R = quality.grassRadius;
    // Une instance = une touffe de 7 brins courbes de largeurs et hauteurs variées
    const pos = [], bt = [], nrm = [], idx = [];
    const rb = mulberry32(7);
    for (let k = 0; k < 7; k++) {
      const ox = (rb() - 0.5) * 0.45, oz = (rb() - 0.5) * 0.45;
      const rot = rb() * Math.PI, hk = 0.45 + rb() * 0.55;
      const w = 0.018 + rb() * 0.03;
      const lx = (rb() - 0.5) * 0.45, lz = (rb() - 0.5) * 0.45;
      const c = Math.cos(rot), sn = Math.sin(rot);
      const base = pos.length / 3;
      const segs = 4;
      for (let s = 0; s <= segs; s++) {
        const t = s / segs, y = t * hk, ww = w * (1 - t * 0.85);
        const bx = lx * t * t, bz = lz * t * t;
        for (const side of [-1, 1]) {
          if (s === segs && side === 1) break;
          const xx = s === segs ? 0 : side * ww;
          pos.push(ox + xx * c + bx, y, oz + xx * sn + bz);
          bt.push(t);
          // normale arrondie (le brin paraît cylindrique)
          nrm.push(-sn * 0.6 + side * c * 0.4, 0.5, c * 0.6 + side * sn * 0.4);
        }
      }
      for (let s = 0; s < segs - 1; s++) { const a = base + s * 2; idx.push(a, a + 1, a + 2, a + 2, a + 1, a + 3); }
      const a = base + (segs - 1) * 2; idx.push(a, a + 1, a + 2);
    }
    const geo = new THREE.InstancedBufferGeometry();
    geo.setIndex(idx);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
    geo.setAttribute("bt", new THREE.Float32BufferAttribute(bt, 1));
    const off = new Float32Array(count * 4);
    const rand = mulberry32(99);
    for (let i = 0; i < count; i++) {
      off[i * 4] = (rand() * 2 - 1) * R;
      off[i * 4 + 1] = (rand() * 2 - 1) * R;
      off[i * 4 + 2] = rand() * Math.PI * 2;
      off[i * 4 + 3] = 0.32 + rand() * 0.38;
    }
    geo.setAttribute("aOff", new THREE.InstancedBufferAttribute(off, 4));
    geo.instanceCount = count;

    this.uniforms = {
      uTime: vegUniforms.uTime, uWind: vegUniforms.uWind,
      uCam: { value: new THREE.Vector2() },
      uR: { value: R },
      tHeight: { value: world.heightTex },
      tBiome: { value: world.biomeTex },
      uHM: { value: world.hmTransform },
    };
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.78, metalness: 0, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.uniforms, { uSunDir: vegUniforms.uSunDir, uSunCol: vegUniforms.uSunCol });
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform vec3 uWind; uniform vec2 uCam; uniform float uR; uniform sampler2D tHeight; uniform sampler2D tBiome; uniform vec2 uHM;
attribute vec4 aOff; attribute float bt; varying float vT; varying float vVar; varying vec3 vGW; varying float vFlower; varying vec3 vFlowerCol; varying float vDry; varying vec4 vBio; varying float vCan;
${HASH}`)
        .replace("#include <beginnormal_vertex>", `
  float ca0 = cos(aOff.z), sa0 = sin(aOff.z);
  vec3 objectNormal = normalize(vec3(normal.x * ca0 - normal.z * sa0, normal.y + 0.6, normal.x * sa0 + normal.z * ca0));`)
        .replace("#include <begin_vertex>", `
  vec2 wxz = uCam + mod(aOff.xy - uCam + uR, 2.0 * uR) - uR;
  vec2 huv = wxz * uHM.x + uHM.y;
  vec4 hm = texture2D(tHeight, huv);
  vec4 bio = texture2D(tBiome, huv);
  float canopy = hm.a;
  float rnd = h21(floor(wxz * 7.0));
  // densité : carte d'herbe + plaques de terre nue (bruit lent)
  float bare = smoothstep(0.62, 0.8, h21(floor(wxz * 0.18)) * 0.6 + h21(floor(wxz * 0.05) + 3.1) * 0.4);
  float keep = step(rnd, hm.g * (1.0 - bare * 0.85));
  float dist = length(wxz - uCam);
  float fade = 1.0 - smoothstep(uR * 0.6, uR, dist);
  float h2 = h21(floor(wxz * 0.9));
  // en terrain découvert : herbes hautes par endroits (prairies) ; sous les arbres : herbe courte et clairsemée
  float s = aOff.w * keep * fade * (1.0 + (0.45 * h2 * h2 + bio.g * 0.5) * (1.0 - canopy)) * (1.0 - 0.4 * canopy);
  float fh = h21(floor(wxz * 2.3) + 7.0);
  vFlower = step(fh, (0.07 + 0.08 * bio.g) * (1.0 - canopy));
  float fc = fract(fh * 113.7);
  vFlowerCol = fc < 0.25 ? vec3(0.95, 0.82, 0.12) : fc < 0.5 ? vec3(0.96, 0.96, 0.92) : fc < 0.7 ? vec3(0.55, 0.38, 0.85) : fc < 0.85 ? vec3(0.85, 0.15, 0.12) : vec3(0.3, 0.45, 0.95);
  vDry = smoothstep(0.55, 0.85, h21(floor(wxz * 0.12) + 1.7) * 0.7 + bio.g * 0.45);
  vec3 p = position;
  p.y *= s;
  p.xz *= keep * (0.7 + 0.3 * fade) * (0.85 + aOff.w * 0.4);
  p = vec3(p.x * ca0 - p.z * sa0, p.y, p.x * sa0 + p.z * ca0);
  // vent : rafales qui parcourent la prairie
  vec2 wd = normalize(uWind.xz);
  float wave = sin(dot(wxz, wd) * 0.12 - uTime * 1.8) * 0.5 + 0.5;
  float gust = wave * wave * (0.6 + 0.4 * sin(uTime * 0.3 + wxz.x * 0.01));
  float bend = bt * bt * s * (0.12 + 0.42 * gust * uWind.y);
  float flick = sin(uTime * 5.0 + wxz.x * 3.0 + wxz.y * 2.0) * 0.04 * bt * s;
  p.xz += wd * bend + vec2(flick, -flick);
  p.y -= bend * bend * 0.5;
  vec3 transformed = vec3(wxz.x, hm.r - 0.03, wxz.y) + p;
  vT = bt;
  vVar = h21(floor(wxz * 0.35) + 5.0);
  vBio = bio; vCan = canopy;
  vGW = transformed;`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying float vT; varying float vVar; varying vec3 vGW; varying float vFlower; varying vec3 vFlowerCol; varying float vDry; varying vec4 vBio; varying float vCan; uniform vec3 uSunDir; uniform vec3 uSunCol;")
        .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  vec3 toCamG = normalize(cameraPosition - vGW);
  float backG = pow(max(dot(-toCamG, uSunDir), 0.0), 3.0);
  totalEmissiveRadiance += diffuseColor.rgb * uSunCol * (backG * 1.5 + 0.05) * vT * vT;`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  vec3 base = pow(vec3(0.07, 0.12, 0.035), vec3(2.2));
  vec3 tipA = pow(vec3(0.40, 0.56, 0.16), vec3(2.2));
  vec3 tipB = pow(vec3(0.62, 0.58, 0.28), vec3(2.2));
  vec3 tipC = pow(vec3(0.28, 0.46, 0.12), vec3(2.2));
  vec3 tipD = pow(vec3(0.50, 0.60, 0.20), vec3(2.2));
  vec3 tip = vVar < 0.25 ? tipA : vVar < 0.5 ? tipC : vVar < 0.75 ? tipD : mix(tipA, tipB, 0.5);
  tip = mix(tip, pow(vec3(0.68, 0.60, 0.34), vec3(2.2)), vDry * 0.75);              // herbes sèches
  tip = mix(tip, pow(vec3(0.30, 0.40, 0.14), vec3(2.2)), vBio.b * 0.5);             // marais
  tip *= 1.0 - 0.25 * vCan;
  diffuseColor.rgb = mix(base, tip, smoothstep(0.0, 0.85, vT));
  diffuseColor.rgb = mix(diffuseColor.rgb, pow(vFlowerCol, vec3(2.2)), vFlower * smoothstep(0.72, 0.85, vT));`)
        .replace("#include <aomap_fragment>", `
  reflectedLight.indirectDiffuse *= 0.35 + 0.65 * vT;      // pied des touffes dans l'ombre`);
    };
    mat.customProgramCacheKey = () => "grass2";
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);
  }

  update(dt, cam) {
    this.uniforms.uCam.value.set(cam.x, cam.z);
  }
}

// ---------- Couches semées (couvre-sol, fougères, jeunes pousses, litière) ----------
// dens : expression GLSL (0..1) utilisant hm (hauteur, herbe, ruisseau, canopée) et bio (biomes)
class Scatter {
  constructor(scene, world, atlas, geo, { count, R, dens, sMin = 0.7, sMax = 1.4, sink = 0.04, cell = 3.0, sway = 0.03, tint = "vec3(1.0)", seed = 1234, shadows = false }) {
    const g = new THREE.InstancedBufferGeometry();
    g.index = geo.index;
    for (const k of ["position", "normal", "uv", "color", "aWind"]) if (geo.attributes[k]) g.setAttribute(k, geo.attributes[k]);
    const off = new Float32Array(count * 4), rand = mulberry32(seed);
    for (let i = 0; i < count; i++) { off[i * 4] = (rand() * 2 - 1) * R; off[i * 4 + 1] = (rand() * 2 - 1) * R; off[i * 4 + 2] = rand() * 6.283; off[i * 4 + 3] = sMin + rand() * (sMax - sMin); }
    g.setAttribute("aOff", new THREE.InstancedBufferAttribute(off, 4));
    g.instanceCount = count;
    this.uniforms = { uCam: { value: new THREE.Vector2() }, uR: { value: R }, tHeight: { value: world.heightTex }, tBiome: { value: world.biomeTex }, uHM: { value: world.hmTransform } };
    const mat = new THREE.MeshStandardMaterial({ map: atlas, normalMap: atlas.normalAtlas || null, vertexColors: true, roughness: 0.8, alphaTest: 0.42, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.uniforms, { uTime: vegUniforms.uTime, uWind: vegUniforms.uWind, uSunDir: vegUniforms.uSunDir, uSunCol: vegUniforms.uSunCol });
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
uniform vec2 uCam; uniform float uR; uniform sampler2D tHeight; uniform sampler2D tBiome; uniform vec2 uHM; uniform float uTime; uniform vec3 uWind; attribute vec4 aOff; varying float vUG; varying vec3 vSW;
${geo.attributes.aWind ? "attribute vec2 aWind;" : "const vec2 aWind = vec2(0.0, 0.5);"}
${HASH}`)
        .replace("#include <beginnormal_vertex>", `
  float ca0 = cos(aOff.z), sa0 = sin(aOff.z);
  vec3 objectNormal = normalize(vec3(normal.x * ca0 - normal.z * sa0, normal.y + 0.4, normal.x * sa0 + normal.z * ca0));`)
        .replace("#include <begin_vertex>", `
  vec2 wxz = uCam + mod(aOff.xy - uCam + uR, 2.0 * uR) - uR;
  vec2 huv = wxz * uHM.x + uHM.y;
  vec4 hm = texture2D(tHeight, huv);
  vec4 bio = texture2D(tBiome, huv);
  float rnd = h21(floor(wxz / ${cell.toFixed(2)}) + aOff.z);
  float dens = clamp(${dens}, 0.0, 1.0) * smoothstep(2.2, 3.4, hm.r) * (1.0 - smoothstep(0.03, 0.2, hm.b));
  float keep = step(rnd, dens);
  float dist = length(wxz - uCam);
  float s = aOff.w * keep * (1.0 - smoothstep(uR * 0.72, uR, dist));
  vec3 p = position * s;
  p = vec3(p.x * ca0 - p.z * sa0, p.y, p.x * sa0 + p.z * ca0);
  vec2 wd = normalize(uWind.xz);
  float sw = sin(uTime * 1.6 + wxz.x * 0.4 + wxz.y * 0.3) * 0.6 + 0.4;
  p.xz += wd * sw * ${sway.toFixed(3)} * (aWind.x + aWind.y) * s * uWind.y * max(position.y, 0.0);
  vec3 transformed = vec3(wxz.x, hm.r - ${sink.toFixed(3)}, wxz.y) + p;
  if (s <= 0.0) transformed = vec3(0.0, -1e5, 0.0);
  vUG = fract(rnd * 17.0 + aOff.w * 3.1);
  vSW = transformed;`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying float vUG; varying vec3 vSW; uniform vec3 uSunDir; uniform vec3 uSunCol;")
        .replace("#include <color_fragment>", `#include <color_fragment>
  // variété : vert sombre, vert tendre, roussi
  diffuseColor.rgb *= ${tint} * mix(vec3(0.88, 1.0, 0.82), vec3(1.15, 0.95, 0.65), step(0.8, vUG)) * (0.78 + 0.42 * vUG);`)
        .replace("#include <alphatest_fragment>", `
  vec2 dUv = max(abs(dFdx(vMapUv)), abs(dFdy(vMapUv))) * 2048.0;
  diffuseColor.a *= 1.0 + max(0.0, log2(max(dUv.x, dUv.y))) * 0.4;
  #include <alphatest_fragment>`)
        .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  vec3 toCamS = normalize(cameraPosition - vSW);
  totalEmissiveRadiance += diffuseColor.rgb * uSunCol * (pow(max(dot(-toCamS, uSunDir), 0.0), 3.0) * 1.3 + 0.05) * step(0.5, vMapUv.x);`);
    };
    mat.customProgramCacheKey = () => "scatter" + dens + sink + cell + tint;
    this.mesh = new THREE.Mesh(g, mat);
    this.mesh.frustumCulled = false;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = false;
    scene.add(this.mesh);
  }
  update(cam) { this.uniforms.uCam.value.set(cam.x, cam.z); }
}

// Ensemble des couches au sol, réglées selon la qualité
export class Undergrowth {
  constructor(scene, world, quality, atlas) {
    const k = quality.undergrowth / 5000;           // 1 = qualité équilibrée
    const R = quality.undergrowthRadius;
    const cover = mergeGeometries([makeGroundCover(71), (() => { const h = makeGroundCover(72); h.scale(0.75, 2.2, 0.75); h.translate(0, -0.05, 0); return h; })()]);
    const fern = mergeGeometries([makeFern(5), (() => { const f = makeFern(6); f.rotateY(1.1); f.scale(0.8, 1.1, 0.8); f.translate(0.5, 0, 0.3); return f; })()]);
    const sapling = makeShrub(63);
    const litter = makeLitter(91);
    const sage = makeLeafBush(false, 23);
    this.layers = [
      // couvre-sol : partout sur la terre ferme, plus dense sous les arbres
      new Scatter(scene, world, atlas, cover, { count: Math.round(5000 * k), R, dens: "(0.5 + hm.a * 0.6) * step(0.02, hm.g + hm.a)", sMin: 0.6, sMax: 1.5, cell: 3.0, seed: 11 }),
      // fougères : sous-bois, lisières humides
      new Scatter(scene, world, atlas, fern, { count: Math.round(3600 * k), R: R * 1.1, dens: "smoothstep(0.12, 0.6, hm.a) * 0.85 + bio.b * 0.3 - bio.r * 0.4", sMin: 0.7, sMax: 1.6, cell: 2.5, seed: 12, tint: "vec3(0.95, 1.0, 0.9)" }),
      // jeunes pousses, ronces, noisetiers : deuxième étage de végétation
      new Scatter(scene, world, atlas, sapling, { count: Math.round(1300 * k), R: R * 1.5, dens: "smoothstep(0.15, 0.55, hm.a) * 0.55 * (1.0 - bio.r * 0.7)", sMin: 0.6, sMax: 1.5, cell: 4.0, seed: 13, sway: 0.05 }),
      // plaines : touffes d'armoise et petits buissons gris-vert, éparpillés
      new Scatter(scene, world, atlas, sage, { count: Math.round(1600 * k), R: R * 1.6, dens: "smoothstep(0.3, 0.8, bio.g) * 0.35 * (1.0 - hm.a)", sMin: 0.45, sMax: 1.0, cell: 5.0, seed: 15, sway: 0.04, tint: "vec3(0.85, 0.95, 0.8)" }),
      // litière : brindilles, cailloux, pommes de pin
      new Scatter(scene, world, atlas, litter, { count: Math.round(2000 * k), R: Math.min(R, 26), dens: "smoothstep(0.1, 0.5, hm.a) * 0.9 + 0.15", sMin: 0.7, sMax: 1.3, cell: 2.0, seed: 14, sink: 0.01, sway: 0.0 }),
    ];
    this.mesh = this.layers[0].mesh;
    this.meshes = this.layers.map((l) => l.mesh);
  }
  update(cam) { for (const l of this.layers) l.update(cam); }
}
