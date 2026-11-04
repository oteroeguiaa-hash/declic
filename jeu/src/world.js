// Génération de l'île : relief (calculé en parallèle par des workers), ruisseaux, sol, eau, cartes pour les shaders.
// Terrain rendu sur la carte graphique : une grille partagée par niveau de détail, déplacée par la carte des hauteurs,
// avec morphing progressif entre niveaux (aucun saut visible) et normales au pixel (relief net même à des kilomètres).
import * as THREE from "three";
import { smoothstep, lerp, clamp, mulberry32 } from "./noise.js";
import { Relief, WORLD_SIZE, CELLS } from "./relief.js";
import { reflUniforms, REFL_PARS, REFL_APPLY } from "./reflection.js";

export { WORLD_SIZE };
export const SEA_LEVEL = 0;
const CHUNK = 64;                       // cases par morceau (160 m)
const SUPER = 5;                        // 5 × 5 morceaux = un « grand morceau » lointain (800 m)
const LOD_STEPS = [1, 2, 4, 8];
const LOD_RANGES = [150, 340, 720];     // fin de chaque niveau (m), multipliée par lodScale

export class World {
  constructor(seed) {
    this.seed = seed;
    this.N = CELLS;
    this.V = CELLS + 1;
    this.step = WORLD_SIZE / this.N;
    this.half = WORLD_SIZE / 2;
    this.relief = new Relief(seed);
    this._out = { h: 0, stream: 0, water: -1e3 };
    this.treeDist = { value: 500 };
    this.waterUniforms = { uTime: { value: 0 } };
    this.shadowRange = { value: 60 };
  }

  // Calcule toute la carte des hauteurs, en parallèle si possible. onProgress(0..1)
  async generate(onProgress = () => {}) {
    const V = this.V, n = V * V;
    this.heights = new Float32Array(n);
    this.stream = new Float32Array(n);
    this.waterY = new Float32Array(n);
    this.bio = new Uint8Array(n * 4);       // R montagne, G prairie, B marais, A automne
    this.veg = new Uint8Array(n * 4);       // R forêt, G bosquets, B fourrés, A humidité
    const bands = [];
    const BAND = 64;                        // lignes par tâche (multiple de 2)
    for (let j = 0; j < V; j += BAND) bands.push([j, Math.min(V, j + BAND)]);
    const put = (r) => {
      const o = r.j0 * V;
      this.heights.set(r.heights, o); this.stream.set(r.stream, o); this.waterY.set(r.waterY, o);
      this.bio.set(r.bio, o * 4); this.veg.set(r.veg, o * 4);
    };
    let done = 0;
    const nW = Math.max(1, Math.min(8, (navigator.hardwareConcurrency || 4) - 1));
    let ok = false;
    if (typeof Worker !== "undefined") {
      try {
        ok = await new Promise((resolve) => {
          const workers = [];
          let next = 0, failed = false;
          const finish = (v) => { workers.forEach((w) => w.terminate()); resolve(v); };
          const timer = setTimeout(() => { if (done === 0) { failed = true; finish(false); } }, 8000);
          const feed = (w) => {
            if (next >= bands.length) return;
            const [j0, j1] = bands[next++];
            w.postMessage({ seed: this.seed, j0, j1 });
          };
          for (let i = 0; i < Math.min(nW, bands.length); i++) {
            const w = new Worker(new URL("./relief-worker.js", import.meta.url), { type: "module" });
            w.onmessage = (e) => {
              if (failed) return;
              put(e.data); done++;
              onProgress(done / bands.length);
              if (done === bands.length) { clearTimeout(timer); finish(true); } else feed(w);
            };
            w.onerror = () => { if (!failed && done === 0) { failed = true; clearTimeout(timer); finish(false); } };
            workers.push(w);
            feed(w);
          }
        });
      } catch { ok = false; }
    }
    if (!ok) {
      // Repli : calcul sur le fil principal, par bandes (la barre de chargement avance)
      done = 0;
      for (const [j0, j1] of bands) {
        put({ j0, ...this.relief.computeRows(j0, j1) });
        onProgress(++done / bands.length);
        await new Promise((r) => setTimeout(r, 0));
      }
    }
    this.computeNormals();
  }

  // Normales du relief + occlusion ambiante (creux, vallons, pieds de falaise plus sombres)
  computeNormals() {
    const V = this.V, H = this.heights, s = this.step;
    const nrm = (this.nrm = new Float32Array(V * V * 3));
    for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) {
      const l = H[j * V + Math.max(0, i - 1)], r = H[j * V + Math.min(V - 1, i + 1)];
      const d = H[Math.max(0, j - 1) * V + i], u = H[Math.min(V - 1, j + 1) * V + i];
      const nx = l - r, ny = 2 * s, nz = d - u, k = 1 / Math.hypot(nx, ny, nz);
      const o = (j * V + i) * 3;
      nrm[o] = nx * k; nrm[o + 1] = ny * k; nrm[o + 2] = nz * k;
    }
    // Occlusion : écart à la hauteur moyenne des environs (deux échelles), par flous séparables
    const blur = (src, r) => {
      const tmp = new Float32Array(V * V), out = new Float32Array(V * V), w = 2 * r + 1;
      for (let j = 0; j < V; j++) {
        let acc = 0;
        for (let i = -r; i <= r; i++) acc += src[j * V + clamp(i, 0, V - 1)];
        for (let i = 0; i < V; i++) {
          tmp[j * V + i] = acc / w;
          acc += src[j * V + Math.min(V - 1, i + r + 1)] - src[j * V + Math.max(0, i - r)];
        }
      }
      for (let i = 0; i < V; i++) {
        let acc = 0;
        for (let j = -r; j <= r; j++) acc += tmp[clamp(j, 0, V - 1) * V + i];
        for (let j = 0; j < V; j++) {
          out[j * V + i] = acc / w;
          acc += tmp[Math.min(V - 1, j + r + 1) * V + i] - tmp[Math.max(0, j - r) * V + i];
        }
      }
      return out;
    };
    const b1 = blur(H, 3), b2 = blur(H, 14);
    const ao = (this.ao = new Uint8Array(V * V));
    for (let k = 0; k < V * V; k++) {
      const c1 = b1[k] - H[k], c2 = b2[k] - H[k];
      const occ = clamp(c1 * 0.09 + c2 * 0.012, 0, 0.7);
      ao[k] = (1 - occ) * 255;
    }
  }

  // Compatibilité : relief exact en un point (lent ; préférer heightAt)
  sample(x, z, out = this._out) { return this.relief.sample(x, z, out); }
  rawHeight(x, z) { return this.relief.sample(x, z).h; }

  _cell(x, z) {
    let gx = (x + this.half) / this.step, gz = (z + this.half) / this.step;
    gx = clamp(gx, 0, this.N - 0.0001); gz = clamp(gz, 0, this.N - 0.0001);
    const i = Math.floor(gx), j = Math.floor(gz);
    return [i, j, gx - i, gz - j];
  }

  // Humidité (0..1), lue dans la grille précalculée
  moisture(x, z) { return this.vegAt(x, z, 3); }
  vegAt(x, z, c) {
    const [i, j, fx, fz] = this._cell(x, z), V = this.V, G = this.veg;
    const a = G[(j * V + i) * 4 + c], b = G[(j * V + i + 1) * 4 + c], cc = G[((j + 1) * V + i) * 4 + c], d = G[((j + 1) * V + i + 1) * 4 + c];
    return lerp(lerp(a, b, fx), lerp(cc, d, fx), fz) / 255;
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

  // Biomes à cet endroit (0..1) : { m: montagne, p: prairie, w: marais, a: automne }
  biomeAt(x, z) {
    const [i, j, fx, fz] = this._cell(x, z);
    const k = ((j + (fz > 0.5 ? 1 : 0)) * this.V + i + (fx > 0.5 ? 1 : 0)) * 4, B = this.bio;
    return { m: B[k] / 255, p: B[k + 1] / 255, w: B[k + 2] / 255, a: B[k + 3] / 255 };
  }

  canopyAt(x, z) {
    if (!this.canopy) return 0;
    const [i, j] = this._cell(x, z);
    return this.canopy[j * this.V + i];
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

  // Pente au sommet (i, j) de la grille, depuis les normales précalculées
  slopeIdx(k) { return 1 - this.nrm[k * 3 + 1]; }

  findSpawn(isClear = () => true) {
    const rand = mulberry32(this.seed + 99);
    for (let tries = 0; tries < 8000; tries++) {
      const r = 200 + tries * 0.25;
      const a = rand() * Math.PI * 2;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const h = this.heightAt(x, z);
      if (h > 4 && h < 24 && this.slopeAt(x, z) < 0.08 && this.streamAt(x, z) < 0.01 && isClear(x, z)) return new THREE.Vector3(x, h, z);
    }
    return new THREE.Vector3(0, this.heightAt(0, 0), 0);
  }

  // Ombre des arbres sur le sol (canopée), rastérisée sur la grille : sol de sous-bois, moins d'herbe.
  applyCanopy(props, crownOf) {
    const V = this.V, C = (this.canopy = new Float32Array(V * V));
    for (const p of props) {
      const r = crownOf(p);
      if (!r) continue;
      const gi = (p.x + this.half) / this.step, gj = (p.z + this.half) / this.step, rc = r / this.step;
      for (let j = Math.max(0, Math.floor(gj - rc)); j <= Math.min(this.N, Math.ceil(gj + rc)); j++)
        for (let i = Math.max(0, Math.floor(gi - rc)); i <= Math.min(this.N, Math.ceil(gi + rc)); i++) {
          const d = Math.hypot(i - gi, j - gj) / rc;
          if (d < 1) C[j * V + i] = Math.min(1, C[j * V + i] + (1 - d * d) * 0.8);
        }
    }
  }

  // Dégage l'herbe sous une construction (fondation, plancher posé au sol)
  clearGround(x0, z0, x1, z1) {
    if (!this.heightTex) return;
    const V = this.V, data = this.heightTex.image.data, zero = THREE.DataUtils.toHalfFloat(0);
    const i0 = Math.max(0, Math.floor((x0 + this.half) / this.step)), i1 = Math.min(this.N, Math.ceil((x1 + this.half) / this.step));
    const j0 = Math.max(0, Math.floor((z0 + this.half) / this.step)), j1 = Math.min(this.N, Math.ceil((z1 + this.half) / this.step));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) data[(j * V + i) * 4 + 1] = zero;
    this.heightTex.needsUpdate = true;
  }

  // Textures pour les shaders :
  //  tHeight (RGBA demi-flottant, filtrée) : R hauteur, G densité d'herbe, B ruisseau, A canopée
  //  tHF (R flottant exact) : hauteur pour déplacer le terrain
  //  tNormal (RGBA8, mipmaps) : normale XZ, occlusion, pente
  //  tBiome (RGBA8) : montagne, prairie, marais, automne
  buildHeightTexture() {
    const V = this.V;
    const data = new Uint16Array(V * V * 4);
    const toHalf = THREE.DataUtils.toHalfFloat;
    const nd = new Uint8Array(V * V * 4);
    for (let k = 0; k < V * V; k++) {
      const h = this.heights[k];
      const s = 1 - this.nrm[k * 3 + 1];
      const m = this.veg[k * 4 + 3] / 255;
      const marsh = this.bio[k * 4 + 2] / 255, prairie = this.bio[k * 4 + 1] / 255;
      const shore = Math.max(smoothstep(2.4, 3.6, h), smoothstep(0.25, 0.9, h) * marsh);
      let g = shore * (1 - smoothstep(380, 440, h)) * (1 - smoothstep(0.55, 0.75, s));
      g *= Math.min(1, (smoothstep(0.1, 0.5, m) * 0.6 + 0.4) * (1 + prairie * 0.6));
      g *= 1 - smoothstep(0.02, 0.15, this.stream[k]);
      const can = this.canopy ? this.canopy[k] : 0;
      g *= 1 - 0.45 * can;
      data[k * 4] = toHalf(h);
      data[k * 4 + 1] = toHalf(g);
      data[k * 4 + 2] = toHalf(this.stream[k]);
      data[k * 4 + 3] = toHalf(can);
      nd[k * 4] = (this.nrm[k * 3] * 0.5 + 0.5) * 255;
      nd[k * 4 + 1] = (this.nrm[k * 3 + 2] * 0.5 + 0.5) * 255;
      nd[k * 4 + 2] = this.ao[k];
      nd[k * 4 + 3] = clamp(s * 2, 0, 1) * 255;
    }
    const tex = new THREE.DataTexture(data, V, V, THREE.RGBAFormat, THREE.HalfFloatType);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    this.heightTex = tex;
    const hf = new THREE.DataTexture(this.heights, V, V, THREE.RedFormat, THREE.FloatType);
    hf.minFilter = hf.magFilter = THREE.NearestFilter;
    hf.generateMipmaps = false;
    hf.needsUpdate = true;
    this.hfTex = hf;
    const nt = new THREE.DataTexture(nd, V, V, THREE.RGBAFormat);
    nt.minFilter = THREE.LinearMipmapLinearFilter; nt.magFilter = THREE.LinearFilter;
    nt.generateMipmaps = true; nt.anisotropy = 4;
    nt.needsUpdate = true;
    this.normalTex = nt;
    const a = 1 / (this.step * V);
    const b = (this.half / this.step + 0.5) / V;
    this.hmTransform = new THREE.Vector2(a, b); // uv = pos * a + b
    const bt = new THREE.DataTexture(this.bio, V, V, THREE.RGBAFormat);
    bt.minFilter = bt.magFilter = THREE.LinearFilter;
    bt.needsUpdate = true;
    this.biomeTex = bt;
    return tex;
  }

  // ---------- Terrain : grilles partagées, déplacées sur la carte graphique ----------
  makeGrid(cells, s) {
    const n = cells / s, CV = n + 1;
    const pos = new Float32Array((CV * CV + 4 * CV) * 3);
    for (let j = 0; j < CV; j++) for (let i = 0; i < CV; i++) {
      const k = (j * CV + i) * 3;
      pos[k] = i * s * this.step; pos[k + 1] = 0; pos[k + 2] = j * s * this.step;
    }
    const border = [
      Array.from({ length: CV }, (_, i) => i), Array.from({ length: CV }, (_, i) => n * CV + i),
      Array.from({ length: CV }, (_, j) => j * CV), Array.from({ length: CV }, (_, j) => j * CV + n),
    ];
    border.forEach((side, si) => side.forEach((v, q) => {
      const k = (CV * CV + si * CV + q) * 3;
      pos[k] = pos[v * 3]; pos[k + 1] = -1; pos[k + 2] = pos[v * 3 + 2];   // y = -1 : sommet de jupe
    }));
    const idx = [];
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const a = j * CV + i, b = a + 1, c = a + CV, d = c + 1;
      // diagonale alternée : moins d'artefacts sur les crêtes
      if ((i + j) & 1) idx.push(a, c, b, b, c, d); else idx.push(a, c, d, a, d, b);
    }
    border.forEach((side, si) => {
      const base = CV * CV + si * CV;
      for (let q = 0; q < n; q++) {
        const v0 = side[q], v1 = side[q + 1], s0 = base + q, s1 = base + q + 1;
        idx.push(v0, s0, v1, v1, s0, s1, v0, v1, s0, v1, s1, s0);
      }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setIndex(new THREE.BufferAttribute(CV * CV + 4 * CV > 65535 ? new Uint32Array(idx) : new Uint16Array(idx), 1));
    const size = cells * this.step;
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(size / 2, 0, size / 2), size);
    return geo;
  }

  buildTerrain(textures, quality) {
    const nC = this.N / CHUNK, V = this.V;
    this.lodScale = quality.lodScale;
    this.lodGeos = LOD_STEPS.map((s) => this.makeGrid(CHUNK, s));
    this.superGeo = this.makeGrid(CHUNK * SUPER, 8);
    const ranges = LOD_RANGES.map((r) => r * quality.lodScale);
    this.lodRanges = ranges;
    this.terrainMats = LOD_STEPS.map((s, l) => this.makeTerrainMaterial(textures, quality, s, l < 3 ? ranges[l] * 0.62 : 1e7, l < 3 ? ranges[l] : 1e7 + 1));
    this.superMat = this.makeTerrainMaterial(textures, quality, 8, 1e7, 1e7 + 1);
    this.chunks = [];
    this.supers = [];
    const group = new THREE.Group();
    const size = CHUNK * this.step;
    for (let cj = 0; cj < nC; cj++) for (let ci = 0; ci < nC; ci++) {
      let minY = 1e9, maxY = -1e9;
      for (let j = 0; j <= CHUNK; j++) for (let i = 0; i <= CHUNK; i++) {
        const y = this.heights[(cj * CHUNK + j) * V + ci * CHUNK + i];
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
      const x0 = -this.half + ci * size, z0 = -this.half + cj * size;
      const mesh = new THREE.Mesh(this.lodGeos[3], this.terrainMats[3]);
      mesh.position.set(x0, 0, z0);
      mesh.updateMatrix(); mesh.updateMatrixWorld();
      mesh.matrixAutoUpdate = false;
      mesh.frustumCulled = false;
      mesh.receiveShadow = true;
      group.add(mesh);
      const box = new THREE.Box3(new THREE.Vector3(x0, minY - 8, z0), new THREE.Vector3(x0 + size, maxY, z0 + size));
      this.chunks.push({ mesh, box, lod: 3, underwater: maxY < -6, ci, cj });
    }
    const ss = size * SUPER;
    for (let sj = 0; sj < nC / SUPER; sj++) for (let si = 0; si < nC / SUPER; si++) {
      const kids = this.chunks.filter((c) => Math.floor(c.ci / SUPER) === si && Math.floor(c.cj / SUPER) === sj);
      const box = new THREE.Box3();
      kids.forEach((c) => box.union(c.box));
      const x0 = -this.half + si * ss, z0 = -this.half + sj * ss;
      const mesh = new THREE.Mesh(this.superGeo, this.superMat);
      mesh.position.set(x0, 0, z0);
      mesh.updateMatrix(); mesh.updateMatrixWorld();
      mesh.matrixAutoUpdate = false;
      mesh.frustumCulled = false;
      mesh.receiveShadow = true;
      group.add(mesh);
      this.supers.push({ mesh, box, kids, underwater: kids.every((c) => c.underwater) });
    }
    this.terrain = group;
    this._frustum = new THREE.Frustum();
    this._pm = new THREE.Matrix4();
    this._cp = new THREE.Vector3();
    return group;
  }

  // Choix des niveaux de détail et découpage selon le champ de vision (appelé à chaque image)
  updateTerrain(camera, viewDistance) {
    this.treeDist.value = viewDistance;
    camera.updateMatrixWorld();
    this._pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this._frustum.setFromProjectionMatrix(this._pm);
    const cp = this._cp.copy(camera.position), R = this.lodRanges;
    for (const s of this.supers) {
      const dS = s.box.distanceToPoint(cp);
      const vis = !s.underwater && this._frustum.intersectsBox(s.box);
      const useSuper = dS > R[2];
      s.mesh.visible = vis && useSuper;
      for (const c of s.kids) {
        if (!vis || useSuper || c.underwater || !this._frustum.intersectsBox(c.box)) { c.mesh.visible = false; continue; }
        c.mesh.visible = true;
        const d = c.box.distanceToPoint(cp);
        const lod = d < R[0] ? 0 : d < R[1] ? 1 : d < R[2] ? 2 : 3;
        if (lod !== c.lod) { c.lod = lod; c.mesh.geometry = this.lodGeos[lod]; c.mesh.material = this.terrainMats[lod]; }
      }
    }
  }

  makeTerrainMaterial(T, quality, lodStep, morph0, morph1) {
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.95, metalness: 0 });
    const low = quality.name === "low";
    const shared = this._terrainUniforms || (this._terrainUniforms = {
      tDetail: { value: T.detail }, tAlb: { value: T.albedo }, tNrm: { value: T.normal },
      tHeight: { value: this.heightTex }, tHF: { value: this.hfTex }, tNormal: { value: this.normalTex }, tBiome: { value: this.biomeTex },
      uHM: { value: this.hmTransform }, uStep: { value: this.step }, uHalf: { value: this.half }, uN: { value: this.N },
      uTime: this.waterUniforms.uTime, uShadowRange: this.shadowRange,
    });
    const own = { uLodStep: { value: lodStep }, uMorph: { value: new THREE.Vector2(morph0, morph1) } };
    mat.customProgramCacheKey = () => "terrain" + (low ? "L" : "H");
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, shared, own);
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
uniform highp sampler2D tHF; uniform float uStep; uniform float uHalf; uniform float uN; uniform float uLodStep; uniform vec2 uMorph;
varying vec3 vWPos;
float hTex(vec2 g) {
  vec2 f = floor(g), t = g - f;
  ivec2 i0 = ivec2(clamp(f, vec2(0.0), vec2(uN))), i1 = ivec2(clamp(f + 1.0, vec2(0.0), vec2(uN)));
  float a = texelFetch(tHF, i0, 0).r, b = texelFetch(tHF, ivec2(i1.x, i0.y), 0).r;
  float c = texelFetch(tHF, ivec2(i0.x, i1.y), 0).r, d = texelFetch(tHF, i1, 0).r;
  return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
}`)
        .replace("#include <beginnormal_vertex>", "vec3 objectNormal = vec3(0.0, 1.0, 0.0);")
        .replace("#include <begin_vertex>", `
  vec2 org = modelMatrix[3].xz;
  vec2 g = floor((position.xz + org + uHalf) / uStep + 0.5);
  float h0 = texelFetch(tHF, ivec2(clamp(g, vec2(0.0), vec2(uN))), 0).r;
  // Morphing vers la grille deux fois plus grossière à l'approche de la limite du niveau (pas de saut)
  float dCam = distance(cameraPosition, vec3(g.x * uStep - uHalf, h0, g.y * uStep - uHalf));
  float km = clamp((dCam - uMorph.x) / (uMorph.y - uMorph.x), 0.0, 1.0);
  vec2 fr = mod(g, 2.0 * uLodStep);
  g -= fr * km;
  float hy = km > 0.0 ? hTex(g) : h0;
  if (position.y < -0.5) hy -= 8.0;   // jupe : cache les fentes entre niveaux
  vec3 transformed = vec3(g.x * uStep - uHalf - org.x, hy, g.y * uStep - uHalf - org.y);
  vWPos = vec3(g.x * uStep - uHalf, hy, g.y * uStep - uHalf);`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
${low ? "#define TERRAIN_LOW" : ""}
uniform sampler2D tDetail; uniform sampler2D tHeight; uniform sampler2D tNormal; uniform sampler2D tBiome; uniform vec2 uHM;
uniform mediump sampler2DArray tAlb; uniform mediump sampler2DArray tNrm;
uniform float uTime; uniform float uShadowRange;
varying vec3 vWPos;
vec3 gN; float gRough; float gAO; float gFarShade;
#define L_GRASS 0.0
#define L_FOREST 1.0
#define L_ROCK 2.0
#define L_SAND 3.0
#define L_DIRT 4.0
#define L_SNOW 5.0
#define L_MOSS 6.0
#define L_GRAVEL 7.0
// Mélange par hauteur : la couche du dessus s'insinue d'abord dans les creux de celle du dessous (transitions naturelles)
float hBlend(float t, float ha, float hb) {
  float a = ha + 1.0 - t, b = hb + t;
  float m = max(a, b) - 0.18;
  float wa = max(a - m, 0.0), wb = max(b - m, 0.0);
  return wb / max(wa + wb, 1e-4);
}
struct Lay { vec3 c; vec2 n; float r; float h; };
Lay smp(float i, vec2 uv) {
  vec4 a = texture(tAlb, vec3(uv, i)), n = texture(tNrm, vec3(uv, i));
  return Lay(a.rgb, n.rg * 2.0 - 1.0, n.b, a.a);
}
// Anti-répétition : deux échantillonnages (échelle et rotation différentes) mêlés par un bruit lent
Lay smpA(float i, vec2 p, float s, float m) {
  Lay A = smp(i, p * s);
#ifndef TERRAIN_LOW
  const mat2 R = mat2(0.8, -0.6, 0.6, 0.8);
  Lay B = smp(i, R * p * (s * 0.73) + 0.37);
  B.n = transpose(R) * B.n;
  float k = smoothstep(0.35, 0.65, m);
  A.c = mix(A.c, B.c, k); A.n = mix(A.n, B.n, k); A.r = mix(A.r, B.r, k); A.h = mix(A.h, B.h, k);
#endif
  return A;
}
void over(inout Lay base, Lay top, float w) {
  if (w <= 0.001) return;
  float k = hBlend(clamp(w, 0.0, 1.0), base.h, top.h);
  base.c = mix(base.c, top.c, k); base.n = mix(base.n, top.n, k); base.r = mix(base.r, top.r, k); base.h = mix(base.h, top.h, k);
}
vec3 terrainShade() {
  vec2 huv = vWPos.xz * uHM.x + uHM.y;
  vec4 nt = texture(tNormal, huv);
  vec2 nxz = nt.rg * 2.0 - 1.0;
  vec3 nW = normalize(vec3(nxz.x, sqrt(max(0.0, 1.0 - dot(nxz, nxz))), nxz.y));
  float slope = 1.0 - nW.y;
  vec4 hm = texture(tHeight, huv);
  float stream = hm.b, canopy = hm.a;
  vec4 bio = texture(tBiome, huv);
  vec3 dn = texture(tDetail, vWPos.xz * 0.0041).rgb;   // ~250 m
  vec3 dm = texture(tDetail, vWPos.xz * 0.019).rgb;    // ~50 m
  vec3 ds = texture(tDetail, vWPos.xz * 0.09).rgb;     // ~11 m
  float h = vWPos.y;
  float dist = length(vWPos - cameraPosition);
  vec2 p = vWPos.xz;

  // ---- Couches ----
  Lay g = smpA(L_GRASS, p, 0.30, dm.g);
  // teintes de l'herbe : prairie dorée, marais, variations lentes
  g.c *= mix(vec3(1.0), vec3(1.22, 1.08, 0.7), bio.g * 0.6) * mix(vec3(1.0), vec3(0.8, 0.92, 0.75), bio.b * 0.6);
  g.c *= mix(vec3(0.86, 0.96, 0.9), vec3(1.12, 1.04, 0.86), smoothstep(0.3, 0.7, dn.r * 0.7 + dm.r * 0.5)) * (0.86 + 0.28 * ds.g);
  Lay c = g;
  // Sous-bois : feuilles mortes, aiguilles, brindilles (tons d'automne dans les forêts rousses)
  float wF = smoothstep(0.08, 0.55, canopy + (ds.r - 0.5) * 0.2);
  if (wF > 0.001) {
    Lay f = smpA(L_FOREST, p, 0.33, dm.b);
    f.c *= mix(vec3(1.0), vec3(1.3, 0.85, 0.55), bio.a * 0.7);
    over(c, f, wF);
  }
  // Mousse : sous-bois humide, berges
  float wM = wF * smoothstep(0.5, 0.75, dm.g * 0.8 + ds.b * 0.4) * 0.9 + smoothstep(0.0, 0.1, stream) * 0.8 * (1.0 - smoothstep(0.2, 0.5, stream));
  if (wM > 0.001) over(c, smp(L_MOSS, p * 0.35), wM);
  // Terre nue par plaques, chemins de bêtes, lit des ruisseaux
  float wD = smoothstep(0.74, 0.9, dm.b * 0.75 + ds.r * 0.3 + dn.r * 0.2) * 0.85 + smoothstep(0.15, 0.4, stream);
  wD += smoothstep(0.25, 0.42, slope) * (1.0 - bio.r) * 0.5;
  if (wD > 0.001) over(c, smp(L_DIRT, p * 0.28), wD);
  // Plage, sable mouillé
  float wS = (1.0 - smoothstep(1.3, 2.9 + dm.g * 1.8, h)) * (1.0 - smoothstep(0.15, 0.5, bio.b));
  // Marais : vase et mousse au bord des mares
  float wMud = smoothstep(0.15, 0.5, bio.b) * (1.0 - smoothstep(0.4, 1.6, h));
  if (wMud > 0.001) { Lay m = smp(L_DIRT, p * 0.28); m.c *= vec3(0.62, 0.6, 0.5); m.r = 0.45; over(c, m, wMud); }
  if (wS > 0.001) { Lay s = smp(L_SAND, p * 0.22); s.c *= mix(0.62, 1.0, smoothstep(-0.2, 1.1, h)); s.r = mix(0.35, s.r, smoothstep(-0.2, 1.0, h)); over(c, s, wS); }
  // Éboulis au pied des falaises
  float rockStart = mix(0.48, 0.42, bio.r);
  float wG = smoothstep(rockStart - 0.2, rockStart - 0.04, slope) * (0.3 + 0.7 * bio.r) * smoothstep(0.5, 0.75, dm.b + ds.g * 0.4) + smoothstep(300.0, 350.0, h + dm.r * 40.0) * 0.8;
  wG *= 1.0 - smoothstep(0.1, 0.3, stream);
  if (wG > 0.001) over(c, smp(L_GRAVEL, p * 0.4), wG);
  // Roche : falaises, affleurements, haute montagne (projetée sur 3 axes)
  float outcrop = bio.r * smoothstep(0.3, 0.46, slope) * smoothstep(0.66, 0.8, dm.b * 0.7 + dn.r * 0.5);
  float wR = outcrop + smoothstep(rockStart, rockStart + 0.12, slope + (ds.g - 0.5) * 0.12) + smoothstep(370.0, 430.0, h + dm.r * 40.0) * 0.7;
  wR = clamp(wR, 0.0, 1.0) * (1.0 - smoothstep(0.1, 0.3, stream));
  vec3 rockN = vec3(0.0);
  if (wR > 0.001) {
    vec3 w3 = pow(abs(nW), vec3(4.0)); w3 /= (w3.x + w3.y + w3.z);
    float sc = 0.11;
    Lay rx = smp(L_ROCK, vWPos.zy * sc), ry = smp(L_ROCK, vWPos.xz * sc), rz = smp(L_ROCK, vWPos.xy * sc);
    Lay r = Lay(rx.c * w3.x + ry.c * w3.y + rz.c * w3.z, vec2(0.0), rx.r * w3.x + ry.r * w3.y + rz.r * w3.z, rx.h * w3.x + ry.h * w3.y + rz.h * w3.z);
    // grande échelle : strates, teinte plus chaude (grès) par zones
    // montagnes : calcaire clair (Dolomites), roche plus sombre ailleurs
    r.c = mix(r.c, r.c * vec3(1.55, 1.48, 1.36), smoothstep(0.3, 0.7, bio.r));
    r.c *= mix(vec3(1.0), vec3(1.12, 1.0, 0.85), smoothstep(0.4, 0.7, dm.g)) * (1.0 + 0.35 * dn.b) * (0.88 + 0.18 * sin(h * 1.3 + dm.b * 6.0));
    rockN = vec3(0.0, rx.n.y, rx.n.x) * w3.x + vec3(ry.n.x, 0.0, ry.n.y) * w3.y + vec3(rz.n.x, rz.n.y, 0.0) * w3.z;
    float k = hBlend(wR, c.h, r.h);
    c.c = mix(c.c, r.c, k); c.r = mix(c.r, r.r, k); c.h = mix(c.h, r.h, k);
    c.n *= 1.0 - k; rockN *= k * 1.4;
  }
  // Neige sur les sommets (moins sur les pentes raides)
  float wN = smoothstep(420.0, 470.0, h + (dm.r - 0.5) * 50.0) * (1.0 - smoothstep(0.55, 0.8, slope));
  if (wN > 0.001) { Lay s = smp(L_SNOW, p * 0.18); over(c, s, wN); rockN *= 1.0 - wN; }

  // ---- Normale au pixel : relief + détail des couches (qui s'efface au loin) ----
  float nd = 1.0 - smoothstep(60.0, 320.0, dist);
  gN = normalize(nW + (vec3(c.n.x, 0.0, c.n.y) * 0.9 + rockN) * (0.35 + 0.65 * nd));
  gRough = c.r;
  // Occlusion : creux du relief, sous la canopée, et creux de la texture
  gAO = nt.b * (1.0 - 0.38 * canopy) * mix(1.0, 0.7 + 0.3 * c.h, nd);
  // Au-delà de la portée des ombres, la canopée assombrit quand même le sol (forêts lointaines denses)
  float far = smoothstep(uShadowRange * 0.75, uShadowRange, dist);
  gFarShade = 1.0 - canopy * 0.45 * far;
  return c.c;
}`)
        .replace("#include <roughnessmap_fragment>", "float roughnessFactor = gRough;")
        .replace("#include <normal_fragment_maps>", `normal = normalize((viewMatrix * vec4(gN, 0.0)).xyz);`)
        .replace("#include <lights_fragment_end>", `#include <lights_fragment_end>
  reflectedLight.directDiffuse *= gFarShade; reflectedLight.directSpecular *= gFarShade;`)
        .replace("#include <aomap_fragment>", `
  reflectedLight.indirectDiffuse *= gAO;
  reflectedLight.indirectSpecular *= gAO * gAO;`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  diffuseColor.rgb = terrainShade();
  // Fond marin : reflets lumineux (caustiques) qui dansent
  if (vWPos.y < -0.2) {
    float dd = -vWPos.y;
    vec2 q = vWPos.xz * 0.55;
    float ca = sin(q.x + uTime * 0.9) + sin(q.y * 1.1 - uTime * 0.7) + sin((q.x + q.y) * 0.7 + uTime * 0.6) + sin((q.x - q.y) * 1.4 - uTime);
    ca = pow(abs(ca) * 0.25, 3.0);
    diffuseColor.rgb *= mix(vec3(1.0), vec3(0.75, 0.92, 0.95), smoothstep(0.0, 3.0, dd));
    diffuseColor.rgb += ca * 1.4 * exp(-dd * 0.12) * diffuseColor.rgb;
  }`);
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
    const mat = new THREE.MeshStandardMaterial({ color: 0x2a5a52, roughness: 0.14, metalness: 0, transparent: true, depthWrite: true, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = this.waterUniforms.uTime;
      sh.uniforms.tHeight = { value: this.heightTex };
      sh.uniforms.uHM = { value: this.hmTransform };
      sh.uniforms.uTexel = { value: 1 / V };
      sh.uniforms.tWaterN = { value: waterNormalTex };
      Object.assign(sh.uniforms, reflUniforms);
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = transformed;");
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform sampler2D tHeight; uniform vec2 uHM; uniform float uTexel; uniform sampler2D tWaterN;
varying vec3 vWPos;
${REFL_PARS}`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  vec2 huv = vWPos.xz * uHM.x + uHM.y;
  float ground = texture2D(tHeight, huv).r;
  float depth = max(0.0, vWPos.y - ground);
  diffuseColor.rgb = mix(vec3(0.16, 0.30, 0.24), vec3(0.03, 0.10, 0.09), smoothstep(0.0, 1.0, depth));
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.02, 0.06, 0.06), smoothstep(1.2, 2.6, depth));
  diffuseColor.a = smoothstep(0.0, 0.12, depth) * mix(0.35, 0.85, smoothstep(0.0, 0.9, depth));
  if (diffuseColor.a < 0.02) discard;`)
        .replace("#include <normal_fragment_maps>", `
  // Le courant suit la pente du terrain
  float gx = texture2D(tHeight, huv + vec2(uTexel * 3.0, 0.0)).r - texture2D(tHeight, huv - vec2(uTexel * 3.0, 0.0)).r;
  float gz = texture2D(tHeight, huv + vec2(0.0, uTexel * 3.0)).r - texture2D(tHeight, huv - vec2(0.0, uTexel * 3.0)).r;
  vec2 flow = -normalize(vec2(gx, gz) + 1e-4) * (0.6 + min(1.5, length(vec2(gx, gz)) * 0.4));
  float river = smoothstep(1.0, 1.8, depth);
  flow = mix(flow, normalize(vWPos.xz + 1e-3) * 0.25, river);   // rivière : courant lent vers la mer
  vec3 n1 = texture2D(tWaterN, vWPos.xz * 0.35 + flow * uTime * 0.35).xyz * 2.0 - 1.0;
  vec3 n2 = texture2D(tWaterN, vWPos.xz * 0.8 + flow * uTime * 0.5 + 0.37).xyz * 2.0 - 1.0;
  vec2 nxy = (n1.xy + n2.xy) * 0.45;
  vec3 wn = normalize(vec3(nxy.x, 1.0, -nxy.y));
  normal = normalize((viewMatrix * vec4(wn, 0.0)).xyz);
  // Écume blanche là où le ruisseau descend vite (petites cascades)
  float steep = smoothstep(0.7, 2.2, length(vec2(gx, gz))) * (1.0 - river);
  float foamW = smoothstep(0.35, 0.75, texture2D(tWaterN, vWPos.xz * 0.6 + flow * uTime * 1.2).b + steep * 0.45);
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.92, 0.95, 0.95), steep * foamW);
  diffuseColor.a = max(diffuseColor.a, steep * foamW * 0.95);`)
        .replace("#include <opaque_fragment>", REFL_APPLY);
    };
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = 2;
    this.streamMesh = mesh;
    return mesh;
  }

  // Hauteur des vagues de mer à un endroit (même formule que le shader), pour faire flotter canoë et nageur.
  waveHeight(x, z, t) {
    const ground = this.heightAt(x, z);
    const amp = WAVE_AMP * smoothstep(0, 7, -ground);
    if (amp <= 0) return 0;
    let y = 0;
    for (const [dx, dz, L, st, sp] of WAVES) {
      const k = (2 * Math.PI) / L, c = Math.sqrt(9.8 / k) * sp;
      y += (st / k) * Math.sin(k * (dx * x + dz * z - c * t));
    }
    return y * amp;
  }

  // Mer et lacs : surface déformée par des vagues de Gerstner, réfraction du fond, couleur selon la profondeur,
  // écume sur les crêtes et vaguelettes qui viennent lécher les berges.
  buildWater(waterNormalTex) {
    // Grille polaire centrée sur la caméra : dense près du joueur, large au loin (jusqu'à l'horizon)
    const RING = 190, SEG = 128;
    const pos = [0, 0, 0], idx = [];
    for (let i = 1; i <= RING; i++) {
      const r = 1.6 * (Math.pow(1.046, i) - 1);
      for (let j = 0; j < SEG; j++) { const a = (j / SEG) * Math.PI * 2; pos.push(Math.cos(a) * r, 0, Math.sin(a) * r); }
    }
    for (let j = 0; j < SEG; j++) idx.push(0, 1 + ((j + 1) % SEG), 1 + j);
    for (let i = 1; i < RING; i++) for (let j = 0; j < SEG; j++) {
      const a = 1 + (i - 1) * SEG + j, b = 1 + (i - 1) * SEG + ((j + 1) % SEG), c = a + SEG, d = b + SEG;
      idx.push(a, b, c, b, d, c);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({ color: 0x0e3a46, roughness: 0.04, metalness: 0.0, side: THREE.DoubleSide });
    const uniforms = this.waterUniforms;
    const waveGLSL = WAVES.map(([dx, dz, L, st, sp]) => `gw(p, vec2(${dx.toFixed(4)}, ${dz.toFixed(4)}), ${L.toFixed(2)}, ${st.toFixed(3)}, ${sp.toFixed(3)}, amp, disp, nrm);`).join("\n    ");
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, reflUniforms);
      sh.uniforms.uTime = uniforms.uTime;
      sh.uniforms.tHeight = { value: this.heightTex };
      sh.uniforms.uHM = { value: this.hmTransform };
      sh.uniforms.tWaterN = { value: waterNormalTex };
      sh.uniforms.tRefr = refrUniforms.tRefr;
      sh.uniforms.uRefrOn = refrUniforms.uRefrOn;
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform sampler2D tHeight; uniform vec2 uHM;
varying vec3 vWPos; varying vec3 vGN; varying float vCrest; varying float vDepth;
void gw(vec2 p, vec2 d, float L, float st, float sp, float amp, inout vec3 disp, inout vec3 nrm) {
  float k = 6.2831853 / L, c = sqrt(9.8 / k) * sp, a = st / k * amp;
  float f = k * (dot(d, p) - c * uTime);
  float cf = cos(f), sf = sin(f);
  disp.xz += d * (a * cf * 0.6);
  disp.y += a * sf;
  nrm.xz -= d * (k * a * cf);
  nrm.y -= 0.6 * k * a * sf;
}`)
        .replace("#include <begin_vertex>", `#include <begin_vertex>
  vec3 wp0 = (modelMatrix * vec4(transformed, 1.0)).xyz;
  float ground = texture2D(tHeight, wp0.xz * uHM.x + uHM.y).r;
  vDepth = max(0.0, -ground);
  float distC = length(wp0.xz - cameraPosition.xz);
  float amp = ${WAVE_AMP.toFixed(3)} * smoothstep(0.0, 7.0, vDepth) * (1.0 - smoothstep(180.0, 480.0, distC));
  vec3 disp = vec3(0.0), nrm = vec3(0.0, 1.0, 0.0);
  vec2 p = wp0.xz;
  if (amp > 0.0001) {
    ${waveGLSL}
  }
  // Vaguelettes du rivage : l'eau monte et descend doucement sur le sable
  float swash = (1.0 - smoothstep(0.0, 1.5, vDepth)) * smoothstep(-1.5, 0.0, -vDepth) * 0.06 * sin(uTime * 0.9 - vDepth * 3.0 + wp0.x * 0.05);
  transformed += disp;
  transformed.y += swash;
  vGN = normalize(nrm);
  vCrest = disp.y / max(0.001, ${WAVE_AMP.toFixed(3)});
  vWPos = wp0 + disp;`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform float uTime; uniform sampler2D tHeight; uniform vec2 uHM; uniform sampler2D tWaterN;
uniform sampler2D tRefr; uniform float uRefrOn;
varying vec3 vWPos; varying vec3 vGN; varying float vCrest; varying float vDepth;
vec3 wRefr; float wTrans; float wFoam;
${REFL_PARS}`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  float ground = texture2D(tHeight, vWPos.xz * uHM.x + uHM.y).r;
  float depth = max(0.0, vWPos.y - ground);
  float viewDist = length(cameraPosition - vWPos);
  // Couleur de l'eau diffusée : turquoise en eau peu profonde, bleu nuit au large
  // Lacs de l'intérieur : eau claire et turquoise (lacs alpins) ; mer plus profonde et bleue
  float inland = 1.0 - smoothstep(1250.0, 1650.0, length(vWPos.xz));
  vec3 shallowC = mix(vec3(0.07, 0.42, 0.40), vec3(0.06, 0.62, 0.58), inland), deepC = mix(vec3(0.006, 0.05, 0.085), vec3(0.01, 0.22, 0.26), inland);
  diffuseColor.rgb = mix(shallowC, deepC, smoothstep(0.5, 14.0, depth));
  // Écume : bande du rivage (vaguelettes qui avancent) + crêtes des vagues au large
  float fN = texture2D(tWaterN, vWPos.xz * 0.17 + vec2(uTime * 0.02, -uTime * 0.013)).b;
  float fN2 = texture2D(tWaterN, vWPos.xz * 0.05 - vec2(uTime * 0.01, 0.0)).b;
  float band = sin(depth * 5.0 - uTime * 1.6 + fN2 * 6.0) * 0.5 + 0.5;
  float shoreFoam = (1.0 - smoothstep(0.0, 0.9, depth)) * smoothstep(0.45, 0.85, fN * 0.7 + band * 0.55);
  float crestFoam = smoothstep(0.75, 1.1, vCrest + fN * 0.25) * smoothstep(3.0, 8.0, depth) * 0.3 * fN2;
  wFoam = clamp(shoreFoam + crestFoam, 0.0, 1.0);
  diffuseColor.a = 1.0;`)
        .replace("#include <normal_fragment_maps>", `
  // Normales : vagues + trois échelles de détail (moins de répétition), qui s'effacent au loin
  float vd = length(cameraPosition - vWPos);
  float detail = 1.0 - smoothstep(60.0, 420.0, vd);
  vec2 n1 = texture2D(tWaterN, vWPos.xz * 0.031 + vec2(uTime * 0.012, uTime * 0.007)).xy * 2.0 - 1.0;
  vec2 n2 = texture2D(tWaterN, mat2(0.8, -0.6, 0.6, 0.8) * vWPos.xz * 0.11 - vec2(uTime * 0.021, -uTime * 0.015)).xy * 2.0 - 1.0;
  vec2 n3 = texture2D(tWaterN, mat2(0.28, 0.96, -0.96, 0.28) * vWPos.xz * 0.37 + vec2(uTime * 0.05, uTime * 0.03)).xy * 2.0 - 1.0;
  vec2 nxy = n1 * 0.35 + (n2 * 0.4 + n3 * 0.22) * detail;
  vec3 wn = normalize(vec3(vGN.x + nxy.x * 0.6, vGN.y, vGN.z - nxy.y * 0.6));
  if (!gl_FrontFacing) wn = -wn;
  normal = normalize((viewMatrix * vec4(wn, 0.0)).xyz);
  // Réfraction : on voit le fond, déformé par les vagues, et absorbé selon la profondeur
  vec2 suv = gl_FragCoord.xy / vec2(textureSize(tRefr, 0)) * uRefrScale;
  vec2 ruv = clamp(suv + nxy * 0.03 * (1.0 - smoothstep(0.0, 120.0, vd)), 0.001, 0.999);
  wRefr = texture2D(tRefr, ruv).rgb;
  float thick = gl_FrontFacing ? depth : min(vd, 30.0);
  vec3 absorb = mix(vec3(0.42, 0.11, 0.075), vec3(0.3, 0.06, 0.05), 1.0 - smoothstep(1250.0, 1650.0, length(vWPos.xz)));
  vec3 tr = exp(-absorb * thick * 1.3);
  wTrans = uRefrOn * dot(tr, vec3(0.333)) * (1.0 - wFoam);
  diffuseColor.rgb *= 1.0 - wTrans;
  wRefr *= tr;`)
        .replace("#include <opaque_fragment>", `
  outgoingLight += wRefr * wTrans * (gl_FrontFacing ? 1.0 : 1.0);
  outgoingLight = mix(outgoingLight, vec3(0.9, 0.93, 0.95) * (0.35 + 0.65 * dot(normal, normalize((viewMatrix * vec4(0.3, 0.9, 0.2, 0.0)).xyz)) ) * 1.1, wFoam * 0.85);
${REFL_APPLY}`);
      sh.fragmentShader = sh.fragmentShader.replace("uniform sampler2D tRefr; uniform float uRefrOn;", "uniform sampler2D tRefr; uniform float uRefrOn; uniform float uRefrScale;");
      sh.uniforms.uRefrScale = refrUniforms.uRefrScale;
    };
    const mesh = new THREE.Mesh(geo, mat);
    this.seaMesh = mesh;
    mesh.position.y = SEA_LEVEL;
    mesh.frustumCulled = false;
    mesh.receiveShadow = false;
    mesh.layers.set(1);   // rendue dans une 2ᵉ passe, après le reste (pour la réfraction)
    mesh.renderOrder = 2;
    mesh.onBeforeRender = (r, sc, cam) => { mesh.position.x = cam.position.x; mesh.position.z = cam.position.z; mesh.updateMatrixWorld(); };
    return mesh;
  }
}

// Trains de vagues : direction (x, z), longueur d'onde (m), cambrure, vitesse relative
const WAVE_AMP = 0.42;
const WAVES = [[0.96, 0.28, 34, 0.16, 1], [0.45, 0.89, 19, 0.14, 1], [-0.7, 0.71, 11, 0.12, 1.05], [0.87, -0.5, 6.5, 0.1, 1.1], [0.2, 0.98, 3.7, 0.07, 1.2]];
export const refrUniforms = { tRefr: { value: null }, uRefrOn: { value: 0 }, uRefrScale: { value: 1 } };

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
      fx = fx * fx * fx * (fx * (fx * 6 - 15) + 10); fy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
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
  const size = 512;
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
