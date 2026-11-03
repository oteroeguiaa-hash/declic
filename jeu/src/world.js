// Génération de l'île : relief, ruisseaux, sol, eau, carte des hauteurs pour les shaders.
// Le terrain est découpé en morceaux (chunks) avec plusieurs niveaux de détail selon la distance.
import * as THREE from "three";
import { createNoise2D, fbm, ridged, smoothstep, lerp, clamp, mulberry32 } from "./noise.js";
import { reflUniforms, REFL_PARS, REFL_APPLY } from "./reflection.js";

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
    this.nV = createNoise2D(seed + 97);
    this.nM = createNoise2D(seed + 131);
    this.nBio = createNoise2D(seed + 151);
    this._out = { h: 0, stream: 0, water: -1e3 };
    this.treeDist = { value: 500 };
    this.waterUniforms = { uTime: { value: 0 } };
    this.buildHeights();
  }

  // Relief « européen » : collines arrondies, vallons, petites montagnes douces, lacs et ruisseaux.
  // Relief sans les ruisseaux. Remplit this._b (h, lake, wx, wz).
  base(x, z) {
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
    h += Math.pow(mount, 2.2) * 40 * massif;
    h += fbm(this.nE, x / 38, z / 38, 2) * 0.8;

    // ---- Biomes ----
    // Montagnes alpines : une ou deux chaînes, crêtes réalistes (bruit « ridged »), jusqu'à ~250 m
    const mreg = fbm(this.nM, x / 1700 + 4.2, z / 1700 - 7.7, 2) * 0.5 + 0.5;
    const M = smoothstep(0.56, 0.68, mreg) * smoothstep(0.84, 0.55, d);
    if (M > 0) {
      const r = ridged(this.nM, wx / 650, wz / 650, 6);
      const broad = fbm(this.nM, x / 900 + 9, z / 900 - 3, 2) * 0.5 + 0.5;
      const hm = 25 + broad * 70 + Math.pow(r, 1.7) * 240;
      h = lerp(h, Math.max(h, hm), M * M * (3 - 2 * M));
    }
    // Prairies (vallées ouvertes), forêts d'automne, marais
    const P = smoothstep(0.6, 0.68, fbm(this.nBio, x / 1100, z / 1100, 2) * 0.5 + 0.5) * (1 - M);
    const A = smoothstep(0.6, 0.68, fbm(this.nBio, x / 1000 + 31, z / 1000 - 17, 2) * 0.5 + 0.5) * (1 - M) * (1 - P);
    let Wm = smoothstep(0.6, 0.68, fbm(this.nBio, x / 700 - 51, z / 700 + 23, 2) * 0.5 + 0.5) * (1 - M) * (1 - massif) * smoothstep(0.55, 0.75, continental);
    Wm *= 1 - smoothstep(0.45, 0.7, roll);

    // Lacs : seulement dans les creux de basse altitude, rives en pente douce (pas de cratère)
    const lakeN = fbm(this.nC, x / 330 + 21, z / 330 - 13, 2);
    // Le masque dépend du relief à grande échelle (plaines, hors massifs), pas de l'altitude locale :
    // sinon la cuvette se creuse d'autant plus vite que le terrain monte, et ça fait des falaises.
    const lowland = (1 - massif) * (1 - smoothstep(0.45, 0.7, roll)) * (1 - M) * (1 - Wm);
    let lake = smoothstep(0.2, 0.5, lakeN) * smoothstep(0.8, 0.5, d) * lowland;
    lake = lake * lake * (3 - 2 * lake);
    h = lerp(h, -2.6, lake);
    // Marais : terrain aplati juste autour du niveau de l'eau, avec des mares
    if (Wm > 0) h = lerp(h, 0.3 + fbm(this.nE, x / 45 + 7, z / 45, 3) * 1.8, Wm);
    h = lerp(-14, h, continental);
    if (h > 0 && h < 3) h = h * h / 3 * 0.6 + h * 0.4;
    const b = this._b || (this._b = {});
    b.h = h; b.lake = lake; b.wx = wx; b.wz = wz; b.massif = massif; b.cont = continental; b.d = d;
    b.mount = M; b.prairie = P; b.autumn = A; b.marsh = Wm;
    return b;
  }

  // Relief complet : relief de base + ruisseaux.
  sample(x, z, out = this._out) {
    const B = this.base(x, z);
    let h = B.h;
    const lake = B.lake, wx = B.wx, wz = B.wz, massif = B.massif, cont = B.cont, dN = B.d;
    out.mount = B.mount; out.prairie = B.prairie; out.autumn = B.autumn; out.marsh = B.marsh;
    let stream = 0, water = -1e3;
    const region = smoothstep(-0.05, 0.25, fbm(this.nR, x / 900, z / 900, 2));
    if (region > 0 && h > 2.5 && h < 46) {
      const f = (X, Z) => fbm(this.nS, X / 380, Z / 380, 3);
      const v = f(wx, wz);
      if (Math.abs(v) < 0.25) {
        // Distance (en mètres) à la ligne du ruisseau : valeur / pente du bruit → largeur régulière
        const gx = f(wx + 1, wz) - v, gz = f(wx, wz + 1) - v;
        const g = Math.hypot(gx, gz) + 1e-6;
        const dist = Math.abs(v) / g;
        const half = 1.2 + 1.3 * region;              // demi-largeur du lit : 1,2 à 2,5 m
        if (dist < half + 6.5) {
          const zone = smoothstep(2.5, 5, h) * (1 - smoothstep(38, 46, h)) * (1 - lake) * region;
          // Niveau de l'eau = relief au milieu du lit : la surface reste horizontale en travers
          const sg = Math.sign(v);
          const cx = x - sg * (gx / g) * dist, cz = z - sg * (gz / g) * dist;
          const W = this.base(cx, cz).h - 0.4;
          const core = 1 - smoothstep(half * 0.5, half + 1.2, dist);
          let h1 = lerp(h, Math.min(h, W - 0.55 - 0.35 * core), core);
          // Berges : le terrain remonte au moins au niveau de l'eau pour la contenir
          const lev = 1 - smoothstep(half + 3.6, half + 6.5, dist);
          h1 = Math.max(h1, lerp(h1, W + 0.15, lev * (1 - core * 0.999)));
          h = lerp(h, h1, zone);
          stream = core * zone;
          if (zone > 0.4 && dist < half + 3.6) {
            water = W;
            // là où il y a de l'eau, la berge est toujours assez haute pour la contenir
            if (core < 0.5) h = Math.max(h, W + 0.15 * (1 - core * 2));
          }
        }
      }
    }

    // Grandes rivières navigables : 2 ou 3 sur l'île, dans des vallées boisées, jusqu'à la mer.
    const rz = (1 - smoothstep(0.35, 0.7, massif)) * smoothstep(0.35, 0.7, cont) * (1 - smoothstep(0.15, 0.45, out.mount)) * (1 - out.marsh);
    if (rz > 0) {
      const fr = (X, Z) => fbm(this.nV, X / 800, Z / 800, 2);
      const v = fr(wx, wz);
      if (Math.abs(v) < 0.6) {
        const gx = (fr(wx + 2, wz) - v) / 2, gz = (fr(wx, wz + 2) - v) / 2;
        const dist = Math.abs(v) / (Math.hypot(gx, gz) + 1e-7);
        const half = 6 + 6 * (fbm(this.nV, x / 300 + 50, z / 300, 1) * 0.5 + 0.5); // 6 à 12 m (12 à 24 m de large)
        if (dist < half + 210) {
          // Niveau de l'eau : descend doucement de l'intérieur des terres vers la mer
          const Wr = (0.4 + 7 * smoothstep(0.85, 0.25, dN)) * smoothstep(0.35, 0.8, cont);
          const valley = (1 - smoothstep(half + 12, half + 210, dist)) * rz;
          const floor = Wr + 0.7 + Math.max(0, dist - half - 4) * 0.035; // plaine alluviale en pente douce
          let hr = lerp(h, floor, valley);
          const core = (1 - smoothstep(half - 2, half + 3, dist)) * rz;
          const t = Math.min(1, dist / (half + 3));
          hr = lerp(hr, Wr - 0.4 - 2.6 * (1 - t * t), core);                 // lit profond au milieu
          if (valley > 0.02) { stream *= 1 - valley; water = -1e3; } // pas de ruisseau dans la vallée d'une rivière
          h = hr;
          stream = Math.max(stream, core);
          if (rz > 0.9 && dist < half + 10) {
            water = Wr;
            if (core < 0.5) h = Math.max(h, Wr + 0.2 * (1 - core * 2));
          }
        }
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
    this.bio = new Uint8Array(V * V * 4);   // R montagne, G prairie, B marais, A automne
    const o = this._out;
    for (let j = 0; j < V; j++) {
      const z = -this.half + j * this.step;
      for (let i = 0; i < V; i++) {
        const x = -this.half + i * this.step;
        this.sample(x, z, o);
        const k = j * V + i;
        this.heights[k] = o.h; this.stream[k] = o.stream; this.waterY[k] = o.water;
        this.bio[k * 4] = o.mount * 255; this.bio[k * 4 + 1] = o.prairie * 255; this.bio[k * 4 + 2] = o.marsh * 255; this.bio[k * 4 + 3] = o.autumn * 255;
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

  // Biomes à cet endroit (0..1) : { m: montagne, p: prairie, w: marais, a: automne }
  biomeAt(x, z) {
    const [i, j, fx, fz] = this._cell(x, z);
    const k = ((j + (fz > 0.5 ? 1 : 0)) * this.V + i + (fx > 0.5 ? 1 : 0)) * 4, B = this.bio;
    return { m: B[k] / 255, p: B[k + 1] / 255, w: B[k + 2] / 255, a: B[k + 3] / 255 };
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
        // Végétation partout, sauf dans l'eau, sur les vraies falaises et au-dessus de la limite alpine
        const marsh = this.bio[k * 4 + 2] / 255, prairie = this.bio[k * 4 + 1] / 255;
        const shore = Math.max(smoothstep(2.4, 3.6, h), smoothstep(0.25, 0.9, h) * marsh);
        let g = shore * (1 - smoothstep(130, 152, h)) * (1 - smoothstep(0.45, 0.62, s));
        g *= Math.min(1, (smoothstep(0.1, 0.5, m) * 0.6 + 0.4) * (1 + prairie * 0.6));
        g *= 1 - smoothstep(0.02, 0.15, this.stream[k]);
        const can = this.canopy ? this.canopy[k] : 0;
        g *= 1 - 0.55 * can;
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
    const bt = new THREE.DataTexture(this.bio, V, V, THREE.RGBAFormat);
    bt.minFilter = bt.magFilter = THREE.LinearFilter;
    bt.needsUpdate = true;
    this.biomeTex = bt;
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
    this.treeDist.value = viewDistance;
    const showDist = viewDistance * 1.6;
    for (const c of this.chunks) {
      const d = Math.max(0, Math.hypot(c.cx - cam.x, c.cz - cam.z) - c.size * 0.71);
      c.mesh.visible = d < showDist + 50 && !c.underwater;
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
      sh.uniforms.tBiome = { value: this.biomeTex };
      sh.uniforms.uTreeDist = this.treeDist;
      sh.uniforms.uTime = this.waterUniforms.uTime;
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
uniform sampler2D tDetail; uniform sampler2D tHeight; uniform vec2 uHM; uniform sampler2D tBiome; uniform float uTreeDist; uniform float uTime;
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
  vec4 bio = texture2D(tBiome, vWPos.xz * uHM.x + uHM.y);
  vec3 grass = mix(srgb(vec3(0.24,0.36,0.12)), srgb(vec3(0.40,0.43,0.17)), smoothstep(0.3,0.7,d2.r*0.6+d3.g*0.6));
  grass *= 0.75 + 0.5 * d1.g;
  vec3 dirt = srgb(vec3(0.33,0.29,0.18)) * (0.75 + 0.5 * d1.b);
  vec3 sand = srgb(vec3(0.80,0.72,0.54)) * (0.88 + 0.24 * d1.r);
  vec3 rock = srgb(vec3(0.46,0.44,0.41)) * (0.55 + 0.7 * d1.r * (0.6 + 0.4 * d2.g));
  vec3 mud = mix(srgb(vec3(0.28,0.24,0.17)), srgb(vec3(0.45,0.42,0.36)), smoothstep(0.45, 0.7, d1.r)) * (0.8 + 0.3 * d1.g);
  grass = mix(grass, srgb(vec3(0.52, 0.50, 0.22)) * (0.8 + 0.4 * d1.g), bio.g * 0.55);      // prairie dorée
  grass = mix(grass, srgb(vec3(0.24, 0.30, 0.12)) * (0.8 + 0.4 * d1.g), bio.b * 0.6);       // marais
  vec3 c = grass;
  c = mix(c, dirt, smoothstep(0.88, 0.96, d2.b * 0.8 + d1.r * 0.25 + d3.r * 0.2) * 0.6);
  // Herbe sèche par endroits (variations naturelles de la prairie)
  c = mix(c, srgb(vec3(0.46, 0.44, 0.22)) * (0.8 + 0.4 * d1.g), smoothstep(0.55, 0.75, d3.r + d2.g * 0.3) * 0.35);
  c = mix(c, srgb(vec3(0.26, 0.28, 0.12)) * (0.7 + 0.5 * d1.b), smoothstep(0.6, 0.8, d3.b) * 0.3);
  // Sous-bois : feuilles mortes, aiguilles et mousse sous les arbres
  vec3 leaves = mix(srgb(vec3(0.36, 0.22, 0.11)), srgb(vec3(0.48, 0.33, 0.17)), d1.r) * (0.75 + 0.4 * d1.b);
  leaves = mix(leaves, mix(srgb(vec3(0.62, 0.30, 0.10)), srgb(vec3(0.70, 0.52, 0.16)), d2.r), bio.a * 0.8); // feuilles d'automne
  vec3 moss = mix(srgb(vec3(0.22, 0.38, 0.08)), srgb(vec3(0.36, 0.50, 0.12)), d1.g) * (0.8 + 0.3 * d1.r);
  vec3 litter = mix(leaves, moss, smoothstep(0.45, 0.62, d2.g * 0.7 + d1.b * 0.45));
  c = mix(c, litter, smoothstep(0.15, 0.65, canopy) * 0.9);
  c = mix(c, srgb(vec3(0.17, 0.24, 0.09)) * (0.8 + 0.4 * d1.g), smoothstep(0.0, 0.08, stream) * 0.7); // berges moussues
  c = mix(c, mud, smoothstep(0.15, 0.45, stream));                                                    // lit du ruisseau
  float beach = 1.0 - smoothstep(1.4, 3.0 + d2.g * 1.6, h);
  c = mix(c, sand, beach);
  c = mix(c, sand * 0.55, 1.0 - smoothstep(-0.3, 0.5, h));
  // Roche seulement sur les vraies falaises (plus tôt en montagne), neige sur les sommets
  float rockStart = mix(0.56, 0.42, bio.r);
  float rockAmt = smoothstep(rockStart, rockStart + 0.14, slope + (d1.g - 0.5) * 0.12) + smoothstep(135.0, 160.0, h + d2.r * 20.0) * 0.6;
  c = mix(c, rock, clamp(rockAmt, 0.0, 1.0) * (1.0 - smoothstep(0.1, 0.3, stream)));
  float snow = smoothstep(150.0, 175.0, h + (d2.r - 0.5) * 30.0) * (1.0 - smoothstep(0.62, 0.82, slope));
  c = mix(c, srgb(vec3(0.92, 0.94, 0.98)) * (0.92 + 0.08 * d1.g), snow);
  // Au-delà de la distance d'affichage des arbres, le sol prend la couleur de la forêt
  float far = smoothstep(uTreeDist * 0.8, uTreeDist * 1.05, length(vWPos - cameraPosition));
  vec3 forestCol = mix(srgb(vec3(0.16, 0.26, 0.10)), srgb(vec3(0.55, 0.30, 0.10)), bio.a * 0.7);
  c = mix(c, forestCol * (0.8 + 0.3 * d2.g), far * smoothstep(0.2, 0.6, canopy) * 0.9);
  return c;
}`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  diffuseColor.rgb = terrainColor();
  // Fond marin : sable mouillé plus sombre et reflets lumineux (caustiques) qui dansent
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
  vec3 shallowC = vec3(0.07, 0.42, 0.40), deepC = vec3(0.006, 0.05, 0.085);
  diffuseColor.rgb = mix(shallowC, deepC, smoothstep(0.5, 14.0, depth));
  // Écume : bande du rivage (vaguelettes qui avancent) + crêtes des vagues au large
  float fN = texture2D(tWaterN, vWPos.xz * 0.17 + vec2(uTime * 0.02, -uTime * 0.013)).b;
  float fN2 = texture2D(tWaterN, vWPos.xz * 0.05 - vec2(uTime * 0.01, 0.0)).b;
  float band = sin(depth * 5.0 - uTime * 1.6 + fN2 * 6.0) * 0.5 + 0.5;
  float shoreFoam = (1.0 - smoothstep(0.0, 0.9, depth)) * smoothstep(0.45, 0.85, fN * 0.7 + band * 0.55);
  float crestFoam = smoothstep(0.55, 0.95, vCrest + fN * 0.35) * smoothstep(3.0, 8.0, depth) * 0.6;
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
  vec3 absorb = vec3(0.42, 0.11, 0.075);
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
