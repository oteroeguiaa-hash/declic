// Relief de l'île, sans dépendance à Three.js : utilisé par le fil principal ET par les workers
// qui calculent la carte des hauteurs en parallèle (chargement beaucoup plus rapide sur une île de 4 km).
import { createNoise2D, fbm, smoothstep, lerp } from "./noise.js";

export const WORLD_SIZE = 4000;        // 4 × 4 km
export const CELLS = 1600;             // 2,5 m par case
const K = 0.95;                        // échelle des grands reliefs (bruit en « mètres de conception »)

export class Relief {
  constructor(seed) {
    this.seed = seed;
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
    this.nF = createNoise2D(seed + 777);   // forêts / clairières
    this.nT = createNoise2D(seed + 901);   // fourrés
    this.nG = createNoise2D(seed + 913);   // bosquets serrés
    // Direction de la grande chaîne de montagnes (différente pour chaque île)
    const a = ((seed * 0.6180339887) % 1) * Math.PI * 2;
    this.mdx = Math.cos(a); this.mdz = Math.sin(a);
    this._b = {};
    this._out = { h: 0, stream: 0, water: -1e3 };
  }

  // Relief sans les ruisseaux : collines, vallons, chaîne de montagnes, falaises côtières, lacs, marais.
  base(x, z) {
    const X = x * K, Z = z * K;
    const wx = X + fbm(this.nD, X / 500 + 7.3, Z / 500 - 2.1, 2) * 90;
    const wz = Z + fbm(this.nD, X / 500 - 4.7, Z / 500 + 5.9, 2) * 90;
    // Forme de l'île : déformée à grande échelle (caps, golfes, presqu'îles), légèrement allongée
    const ex = x + fbm(this.nC, x / 1400 + 3, z / 1400 - 5, 2) * 520, ez = z + fbm(this.nC, x / 1400 - 8, z / 1400 + 2, 2) * 520;
    const d = Math.hypot(ex * (1 + 0.12 * this.mdz), ez * (1 - 0.12 * this.mdz)) / this.half;
    // Côte découpée : caps, criques
    const coast = fbm(this.nC, X / 380, Z / 380, 3) * 0.12 + fbm(this.nC, X / 900 + 40, Z / 900 - 9, 2) * 0.12;
    const continental = 1 - smoothstep(0.6, 0.92, d + coast);

    const roll = fbm(this.nA, wx / 560, wz / 560, 4) * 0.5 + 0.5;
    const hills = Math.pow(fbm(this.nA, wx / 240 + 11, wz / 240 - 3, 4) * 0.5 + 0.5, 1.6);
    let h = 3.5 + roll * 16 + hills * 22;

    const massif = smoothstep(0.25, 0.7, fbm(this.nB, X / 700 + 3.1, Z / 700 - 1.7, 2) * 0.9 + 0.35);
    const mount = fbm(this.nB, wx / 320, wz / 320, 4) * 0.5 + 0.5;
    h += Math.pow(mount, 2.2) * 55 * massif;
    h += fbm(this.nE, x / 38, z / 38, 2) * 0.8;

    // ---- Chaîne de montagnes : surtout d'un côté de l'île (comme une vraie cordillère) ----
    const side = (x * this.mdx + z * this.mdz) / this.half;
    const mreg = (fbm(this.nM, X / 1500 + 4.2, Z / 1500 - 7.7, 2) * 0.5 + 0.5) * 0.55 + smoothstep(-0.15, 0.55, side) * 0.5;
    const M = smoothstep(0.42, 0.62, mreg) * smoothstep(0.9, 0.55, d);
    if (M > 0) {
      const qx = wx + fbm(this.nM, X / 420 + 3, Z / 420 - 8, 3) * 150;
      const qz = wz + fbm(this.nM, X / 420 - 6, Z / 420 + 2, 3) * 150;
      const core = smoothstep(0.45, 0.88, mreg);
      const dome = core * core * (3 - 2 * core);
      // Crête principale + sommets secondaires + épaulements (pas de cônes)
      const ridgeN = 1 - Math.abs(fbm(this.nM, qx / 1200, qz / 1200, 3));
      const ridgeLine = ridgeN * ridgeN * (3 - 2 * ridgeN);
      const sharp = Math.pow(1 - Math.abs(fbm(this.nM, qx / 380 + 5, qz / 380 - 1, 3)), 3);   // arêtes rocheuses
      const broad = fbm(this.nM, X / 900 + 9, Z / 900 - 3, 2) * 0.5 + 0.5;
      const bumps = fbm(this.nM, qx / 300 + 2, qz / 300 - 6, 4) * 0.5 + 0.5;
      let hm = 18 + dome * (245 * (0.6 + 0.4 * broad) + 215 * ridgeLine + 160 * sharp * ridgeLine) + dome * dome * bumps * 100;
      // Ravines qui descendent les versants
      const gully = 1 - Math.abs(fbm(this.nM, qx / 150 + 17, qz / 150 + 4, 3));
      hm -= Math.pow(gully, 6) * 14 * smoothstep(60, 200, hm);
      hm += fbm(this.nM, x / 28, z / 28, 3) * 2.6 * smoothstep(40, 140, hm);
      hm = 720 * Math.tanh(hm / 720);
      const k = M * M * (3 - 2 * M);
      h = lerp(h, Math.max(h, hm), k);
    }
    // Prairies, forêts d'automne, marais
    // Grandes plaines (type Yellowstone) : vallées ouvertes d'herbes hautes, surtout dans les terres basses
    const pN = fbm(this.nBio, X / 1100, Z / 1100, 3) * 0.5 + 0.5 + (0.5 - massif) * 0.12;
    const P = smoothstep(0.52, 0.6, pN) * (1 - M);
    const A = smoothstep(0.6, 0.68, fbm(this.nBio, X / 1000 + 31, Z / 1000 - 17, 2) * 0.5 + 0.5) * (1 - M) * (1 - P);
    // Plaines : relief adouci, longues ondulations (le paysage reste naturel, pas plat)
    if (P > 0) h = lerp(h, 4.5 + roll * 12 + hills * 7 + fbm(this.nE, x / 160, z / 160, 3) * 2.5, P * 0.65);
    let Wm = smoothstep(0.6, 0.68, fbm(this.nBio, X / 700 - 51, Z / 700 + 23, 2) * 0.5 + 0.5) * (1 - M) * (1 - massif) * smoothstep(0.55, 0.75, continental);
    Wm *= 1 - smoothstep(0.45, 0.7, roll);

    // Lacs dans les creux de basse altitude, rives douces
    const lakeN = fbm(this.nC, X / 330 + 21, Z / 330 - 13, 2);
    const lowland = (1 - massif) * (1 - smoothstep(0.45, 0.7, roll)) * (1 - M) * (1 - Wm);
    let lake = smoothstep(0.22, 0.5, lakeN) * smoothstep(0.8, 0.5, d) * lowland;
    lake = lake * lake * (3 - 2 * lake);
    h = lerp(h, -2.6, lake);
    if (Wm > 0) h = lerp(h, 0.3 + fbm(this.nE, x / 45 + 7, z / 45, 3) * 1.8, Wm);
    // Falaises côtières : par endroits la côte reste haute puis tombe dans la mer ; ailleurs, plages et criques
    const cliffN = smoothstep(0.05, 0.35, fbm(this.nC, X / 600 - 70, Z / 600 + 33, 2));
    const cliffBand = smoothstep(0.02, 0.18, continental) * (1 - smoothstep(0.55, 0.9, continental));
    h += cliffN * cliffBand * (14 + 16 * (fbm(this.nC, X / 140, Z / 140, 2) * 0.5 + 0.5)) * (1 - Wm) * (1 - lake);
    const contK = cliffN > 0.3 ? smoothstep(0, 0.12, continental) * (0.4 + 0.6 * continental) : continental;
    h = lerp(-14, h, lerp(continental, Math.max(continental, contK), cliffN));
    if (h > 0 && h < 3) h = h * h / 3 * 0.6 + h * 0.4;
    const b = this._b;
    b.h = h; b.lake = lake; b.wx = wx; b.wz = wz; b.massif = massif; b.cont = continental; b.d = d;
    b.mount = M; b.prairie = P; b.autumn = A; b.marsh = Wm;
    return b;
  }

  // Relief complet : relief de base + ruisseaux + grandes rivières.
  sample(x, z, out = this._out) {
    const X = x * K, Z = z * K;
    const B = this.base(x, z);
    let h = B.h;
    const lake = B.lake, wx = B.wx, wz = B.wz, massif = B.massif, cont = B.cont, dN = B.d;
    out.mount = B.mount; out.prairie = B.prairie; out.autumn = B.autumn; out.marsh = B.marsh;
    let stream = 0, water = -1e3;
    const region = smoothstep(-0.05, 0.25, fbm(this.nR, X / 900, Z / 900, 2));
    if (region > 0 && h > 2.5 && h < 60) {
      const f = (X, Z) => fbm(this.nS, X / 380, Z / 380, 3);
      const v = f(wx, wz);
      if (Math.abs(v) < 0.25) {
        const gx = f(wx + 1, wz) - v, gz = f(wx, wz + 1) - v;
        const g = Math.hypot(gx, gz) + 1e-6;
        const dist = Math.abs(v) / g / K;
        const half = 1.2 + 1.3 * region;
        if (dist < half + 6.5) {
          const zone = smoothstep(2.5, 5, h) * (1 - smoothstep(50, 60, h)) * (1 - lake) * region;
          const sg = Math.sign(v);
          const cx = x - sg * (gx / g) * dist, cz = z - sg * (gz / g) * dist;
          const W = this.base(cx, cz).h - 0.4;
          const core = 1 - smoothstep(half * 0.5, half + 1.2, dist);
          let h1 = lerp(h, Math.min(h, W - 0.55 - 0.35 * core), core);
          const lev = 1 - smoothstep(half + 3.6, half + 6.5, dist);
          h1 = Math.max(h1, lerp(h1, W + 0.15, lev * (1 - core * 0.999)));
          h = lerp(h, h1, zone);
          stream = core * zone;
          if (zone > 0.02 && dist < half + 3.6 && W - h < 0.45 + 1.6 * core) {
            water = W;
            if (core < 0.5) h = Math.max(h, W + 0.15 * (1 - core * 2));
          }
        }
      }
    }

    // Grandes rivières navigables dans des vallées boisées, jusqu'à la mer.
    const rz = (1 - smoothstep(0.35, 0.7, massif)) * smoothstep(0.35, 0.7, cont) * (1 - smoothstep(0.15, 0.45, out.mount)) * (1 - out.marsh);
    if (rz > 0) {
      const fr = (X, Z) => fbm(this.nV, X / 800, Z / 800, 2);
      const v = fr(wx, wz);
      if (Math.abs(v) < 0.6) {
        const gx = (fr(wx + 2, wz) - v) / 2, gz = (fr(wx, wz + 2) - v) / 2;
        const dist = Math.abs(v) / (Math.hypot(gx, gz) + 1e-7) / K;
        const half = 6 + 7 * (fbm(this.nV, x / 300 + 50, z / 300, 1) * 0.5 + 0.5);
        if (dist < half + 230) {
          const Wr = (0.4 + 8 * smoothstep(0.85, 0.25, dN)) * smoothstep(0.35, 0.8, cont);
          const valley = (1 - smoothstep(half + 12, half + 230, dist)) * rz;
          const floor = Wr + 0.7 + Math.max(0, dist - half - 4) * 0.035;
          let hr = lerp(h, floor, valley);
          const core = (1 - smoothstep(half - 2, half + 3, dist)) * rz;
          const t = Math.min(1, dist / (half + 3));
          hr = lerp(hr, Wr - 0.4 - 2.6 * (1 - t * t), core);
          if (valley > 0.02) { stream *= 1 - valley; if (valley > 0.25) water = -1e3; }
          h = hr;
          stream = Math.max(stream, core);
          if (rz > 0.02 && dist < half + 10 && Wr - hr < 0.6 + 3.2 * core) {
            water = Wr;
            if (core < 0.5) h = Math.max(h, Wr + 0.2 * (1 - core * 2));
          }
        }
      }
    }
    if (water > -100 && water - h > 0.6 + 3.2 * stream) water = -1e3;
    out.h = h; out.stream = stream; out.water = water;
    return out;
  }

  moisture(x, z) { return fbm(this.nE, x / 250, z / 250, 3) * 0.5 + 0.5; }

  // Calcule les lignes [j0, j1) de la grille (CELLS + 1 sommets de côté).
  // Renvoie des tableaux typés : hauteurs, ruisseaux, niveau d'eau, biomes (RGBA), champs de végétation (RGBA).
  computeRows(j0, j1) {
    const V = CELLS + 1, step = WORLD_SIZE / CELLS, n = (j1 - j0) * V;
    const heights = new Float32Array(n), stream = new Float32Array(n), waterY = new Float32Array(n);
    const bio = new Uint8Array(n * 4), veg = new Uint8Array(n * 4);
    const o = this._out;
    for (let j = j0; j < j1; j++) {
      const z = -this.half + j * step;
      for (let i = 0; i < V; i++) {
        const x = -this.half + i * step;
        this.sample(x, z, o);
        const k = (j - j0) * V + i;
        heights[k] = o.h; stream[k] = o.stream; waterY[k] = o.water;
        bio[k * 4] = o.mount * 255; bio[k * 4 + 1] = o.prairie * 255; bio[k * 4 + 2] = o.marsh * 255; bio[k * 4 + 3] = o.autumn * 255;
        // Champs de végétation (échelle de dizaines de mètres) : évalués une seule fois ici
        if ((i & 1) === 0 && (j & 1) === 0) {
          veg[k * 4] = (fbm(this.nF, x / 180, z / 180, 3) * 0.5 + 0.5) * 255;     // forêt (clairières si élevé)
          veg[k * 4 + 1] = (fbm(this.nG, x / 70, z / 70, 3) * 0.5 + 0.5) * 255;   // bosquets serrés
          veg[k * 4 + 2] = (fbm(this.nT, x / 110, z / 110, 2) * 0.5 + 0.5) * 255; // fourrés
          veg[k * 4 + 3] = this.moisture(x, z) * 255;                               // humidité
        }
      }
    }
    // Champs de végétation : remplis sur une grille d'un sommet sur deux, interpolés ici
    for (let j = j0; j < j1; j++) for (let i = 0; i < V; i++) {
      if ((i & 1) === 0 && (j & 1) === 0) continue;
      const k = (j - j0) * V + i;
      const i0 = i & ~1, i1 = Math.min(V - 1, i0 + 2);
      const ja = j & ~1;
      const jb = Math.min(j1 - 1, ja + 2);
      const rowA = ja >= j0 ? ja : j0, rowB = jb >= j0 && jb < j1 && (jb & 1) === 0 ? jb : rowA;
      for (let c = 0; c < 4; c++) {
        const a = veg[((rowA - j0) * V + i0) * 4 + c], b = veg[((rowA - j0) * V + i1) * 4 + c];
        const cc = veg[((rowB - j0) * V + i0) * 4 + c], d = veg[((rowB - j0) * V + i1) * 4 + c];
        const fx = (i & 1) * 0.5, fz = rowB !== rowA ? (j & 1) * 0.5 : 0;
        veg[k * 4 + c] = lerp(lerp(a, b, fx), lerp(cc, d, fx), fz);
      }
    }
    return { heights, stream, waterY, bio, veg };
  }
}
