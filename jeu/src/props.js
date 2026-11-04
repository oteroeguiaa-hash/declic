// Arbres, rochers, buissons, objets au sol.
// Génération sur la grille du relief (rapide, même pour 4 km), forêts denses et variées.
// Rendu : modèles 3D détaillés près du joueur (2 niveaux), imposteurs pour toute l'île au-delà,
// « doublures » légères pour les ombres, découpage selon le champ de vision.
import * as THREE from "three";
import { mergeGeometries, mergeVertices } from "../vendor/addons/BufferGeometryUtils.js";
import { mulberry32, smoothstep } from "./noise.js";
import { makeAtlas, makeTree, SPECIES, makeLeafBush, makeFern, makeLog, makeReeds, makeKelp, makeCoral, makeShrub, makeGroundCover, makeVegetationMaterial, makeVegetationDepthMaterial, vegUniforms } from "./trees.js";
import { ImpostorBaker, ImpostorField } from "./impostors.js";

function hash3(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function prep(geo) {
  let g = geo.index ? geo.toNonIndexed() : geo;
  g.deleteAttribute("uv");
  g.deleteAttribute("normal");
  return g;
}

function paint(geo, fn) {
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    fn(p.getX(i), p.getY(i), p.getZ(i), c);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}

function finish(parts, smooth = true) {
  let g = mergeGeometries(parts);
  if (smooth) g = mergeVertices(g, 1e-3);
  g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

const lin = (hex) => new THREE.Color(hex);

function vnoise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  let fx = x - xi, fy = y - yi, fz = z - zi;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy); fz = fz * fz * (3 - 2 * fz);
  const h = (a, b, c) => hash3(xi + a, yi + b, zi + c);
  const l = (a, b, t) => a + (b - a) * t;
  return l(l(l(h(0, 0, 0), h(1, 0, 0), fx), l(h(0, 1, 0), h(1, 1, 0), fx), fy), l(l(h(0, 0, 1), h(1, 0, 1), fx), l(h(0, 1, 1), h(1, 1, 1), fx), fy), fz) * 2 - 1;
}
function fbm3(x, y, z, o) { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * vnoise3(x * f, y * f, z * f); a *= 0.5; f *= 2.1; } return s; }

// Rocher : forme asymétrique, cassures planes, fissures, strates, mousse. style 0 granite, 1 grès, 2 roche sombre.
function makeRock(lod, seed, style = 0) {
  const rand = mulberry32(seed * 97 + style * 13);
  let g = new THREE.IcosahedronGeometry(1, lod ? 1 : 4);
  g.deleteAttribute("uv"); g.deleteAttribute("normal");
  g = mergeVertices(g, 1e-4);
  const p = g.attributes.position;
  const sx = 1.1 + rand() * 0.5, sy = 0.55 + rand() * 0.35, sz = 0.85 + rand() * 0.3;
  const o = seed * 3.7 + style * 11;
  const planes = [];
  for (let k = 0; k < 5 + Math.floor(rand() * 3); k++) {
    const n = new THREE.Vector3(rand() * 2 - 1, rand() * 1.4 - 0.3, rand() * 2 - 1).normalize();
    planes.push([n, 0.55 + rand() * 0.3]);
  }
  const v = new THREE.Vector3(), cav = new Float32Array(p.count);
  for (let i = 0; i < p.count; i++) {
    v.set(p.getX(i), p.getY(i), p.getZ(i));
    const n0 = v.clone().normalize();
    let r = 1 + fbm3(v.x * 1.6 + o, v.y * 1.6, v.z * 1.6, lod ? 2 : 5) * 0.42;
    r *= 1 + Math.sin(v.y * (style === 1 ? 22 : 13) + fbm3(v.x * 3, 0, v.z * 3 + o, 2) * 2) * (style === 1 ? 0.035 : 0.018);
    const cr = Math.abs(fbm3(v.x * 3.2 + o, v.y * 3.2, v.z * 3.2 - o, 2));
    if (!lod && cr < 0.035) r -= (0.035 - cr) * 2.2;
    v.copy(n0).multiplyScalar(r);
    for (const [n, d] of planes) { const t = v.dot(n) - d; if (t > 0) v.addScaledVector(n, -t * 0.88); }
    v.x *= sx; v.y *= sy; v.z *= sz;
    if (v.y < -0.12) v.y = -0.12 + (v.y + 0.12) * 0.25;
    cav[i] = r;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  const nrm = g.attributes.normal;
  const pal = [[0x7a7872, 0x9a978e], [0x9a8266, 0xb8a080], [0x4e4c4a, 0x6a6660]][style];
  const A = lin(pal[0]), B = lin(pal[1]), moss = lin(0x4a6a24), lichen = lin(0x9a9a5a);
  const col = new Float32Array(p.count * 3), c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), ny = nrm.getY(i);
    c.copy(A).lerp(B, vnoise3(x * 2.5 + o, y * 2.5, z * 2.5) * 0.5 + 0.5);
    c.multiplyScalar(0.55 + 0.5 * Math.min(1, Math.max(0, (cav[i] - 0.7) * 1.6)));
    c.multiplyScalar(0.75 + 0.25 * Math.min(1, (y + 0.15) * 2));
    if (ny > 0.45 && vnoise3(x * 3 + o, y * 3, z * 3) > -0.1) c.lerp(moss, Math.min(0.85, (ny - 0.45) * 2));
    else if (vnoise3(x * 9, y * 9 + o, z * 9) > 0.55) c.lerp(lichen, 0.35);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  g.computeBoundingSphere();
  return g;
}

function makeStick() {
  const g = prep(new THREE.CylinderGeometry(0.035, 0.045, 1.1, 5, 1));
  g.rotateZ(Math.PI / 2); g.translate(0, 0.05, 0);
  const tw = prep(new THREE.CylinderGeometry(0.015, 0.025, 0.35, 4, 1));
  tw.rotateZ(0.9); tw.translate(0.2, 0.12, 0.05);
  paint(g, (x, y, z, c) => c.set(0x5a432c).lerp(lin(0x3a2a1a), hash3(x * 9, y, z)));
  paint(tw, (x, y, z, c) => c.set(0x5a432c));
  return finish([g, tw], false);
}

function makeFlint() {
  const g = prep(new THREE.DodecahedronGeometry(0.16, 0));
  g.scale(1.3, 0.6, 1);
  g.translate(0, 0.06, 0);
  paint(g, (x, y, z, c) => c.set(0x7c7a76).lerp(lin(0x9a968e), hash3(x * 20, y * 20, z * 20)));
  return finish([g], false);
}

// ---------- Types d'objets ----------
// Arbres : radius = tronc (collisions), crown = rayon du houppier (ombre au sol), sp = espacement minimal (m)
export const PROP_TYPES = {
  beech:   { kind: "tree", hp: 12, radius: 0.48, center: 1.4, crown: 6.5, wood: 9, sp: 5.2, name: "Hêtre" },
  oak:     { kind: "tree", hp: 13, radius: 0.6, center: 1.4, crown: 7.5, wood: 10, sp: 6.2, name: "Chêne" },
  ancient: { kind: "tree", hp: 30, radius: 1.3, center: 1.6, crown: 11, wood: 24, sp: 11, name: "Vieux chêne" },
  scots:   { kind: "tree", hp: 10, radius: 0.4, center: 1.4, crown: 3.8, wood: 8, sp: 4.8, name: "Pin sylvestre" },
  pine:    { kind: "tree", hp: 9, radius: 0.38, center: 1.4, crown: 4, wood: 7, sp: 4.2, name: "Épicéa" },
  fir:     { kind: "tree", hp: 9, radius: 0.38, center: 1.4, crown: 4, wood: 7, sp: 4.4, name: "Sapin" },
  birch:   { kind: "tree", hp: 6, radius: 0.22, center: 1.4, crown: 3, wood: 4, sp: 3.4, name: "Bouleau" },
  poplar:  { kind: "tree", hp: 8, radius: 0.4, center: 1.4, crown: 2.8, wood: 7, sp: 3.8, name: "Peuplier" },
  willow:  { kind: "tree", hp: 9, radius: 0.6, center: 1.4, crown: 6.5, wood: 6, sp: 6.5, name: "Saule" },
  dead:    { kind: "tree", hp: 5, radius: 0.35, center: 1.4, crown: 0.8, wood: 6, sp: 3.6, name: "Arbre mort" },
  young:   { kind: "tree", hp: 4, radius: 0.12, center: 1.2, crown: 1.6, wood: 2, sp: 2.4, name: "Jeune arbre" },
  rock:  { kind: "rock", hp: 6, radius: 1.05, center: 0.4, name: "Rocher" },
  bush:  { kind: "bush", hp: 1, radius: 0.0, maxDist: 110, center: 0.5, name: "Buisson" },
  stick: { kind: "pickup", hp: 1, radius: 0, maxDist: 45, center: 0.08, name: "Branche" },
  flint: { kind: "pickup", hp: 1, radius: 0, maxDist: 45, center: 0.08, name: "Pierre" },
  fern:  { kind: "decor", hp: 1, radius: 0, maxDist: 60, center: 0.35, name: "Fougère" },
  log:   { kind: "log", hp: 3, radius: 0, maxDist: 150, center: 0.3, name: "Tronc couché" },
  reed:  { kind: "decor", hp: 1, radius: 0, maxDist: 90, center: 0.6, name: "Roseaux" },
  kelp:  { kind: "decor", hp: 1, radius: 0, maxDist: 55, center: 1.0, name: "Algues" },
  shrub: { kind: "decor", hp: 1, radius: 0.0, maxDist: 140, center: 1.0, name: "Arbuste" },
  cover: { kind: "decor", hp: 1, radius: 0, maxDist: 50, center: 0.1, name: "Couvre-sol" },
  coral: { kind: "decor", hp: 1, radius: 0, maxDist: 55, center: 0.3, name: "Corail" },
};
export const TREE_KINDS = Object.keys(PROP_TYPES).filter((k) => PROP_TYPES[k].kind === "tree");
const VARIANTS = 3;
const CELL = 16;
// Teintes d'automne du feuillage (multipliées à la luminance des feuilles)
const TINTS = [null, [1.25, 0.55, 0.18], [1.2, 0.3, 0.14], [1.15, 0.92, 0.3]];
const WHITE = [1, 1, 1];

export class Props {
  constructor(scene, world, quality, seed, renderer) {
    this.scene = scene;
    this.world = world;
    this.quality = quality;
    this.list = [];             // {t, x, y, z, ry, s, hp, alive, state, respawnAt}
    this.grid = new Map();
    this.byType = {};
    for (const k in PROP_TYPES) this.byType[k] = [];
    this.uniforms = { uTime: { value: 0 } };
    this.generate(seed);
    this.buildMeshes(renderer);
    this.lastBuild = new THREE.Vector3(1e9, 0, 1e9);
    this.lastDir = new THREE.Vector3(0, 0, 1);
    this.lastShadow = new THREE.Vector3(1e9, 0, 1e9);
    this.dirty = true;
    this.falling = [];
    this.shakes = new Map();
  }

  key(cx, cz) { return cx * 73856093 ^ cz * 19349663; }

  addToGrid(id) {
    const p = this.list[id];
    const k = this.key(Math.floor(p.x / CELL), Math.floor(p.z / CELL));
    let arr = this.grid.get(k);
    if (!arr) this.grid.set(k, (arr = []));
    arr.push(id);
  }

  query(x, z, r, cb) {
    const x0 = Math.floor((x - r) / CELL), x1 = Math.floor((x + r) / CELL);
    const z0 = Math.floor((z - r) / CELL), z1 = Math.floor((z + r) / CELL);
    for (let cx = x0; cx <= x1; cx++) for (let cz = z0; cz <= z1; cz++) {
      const arr = this.grid.get(this.key(cx, cz));
      if (arr) for (const id of arr) cb(id, this.list[id]);
    }
  }

  add(t, x, z, s, rand, state = 1) {
    const id = this.list.length;
    const y = this.world.heightAt(x, z);
    let yy = y;
    if (t === "rock") for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; yy = Math.min(yy, this.world.heightAt(x + Math.cos(a) * s * 0.9, z + Math.sin(a) * s * 0.9)); }
    const def = PROP_TYPES[t];
    const item = { r0: def.radius * s, t, x, y: yy, z, ry: rand() * Math.PI * 2, s, hp: def.hp, alive: true, state, respawnAt: 0, s0: state };
    if (def.kind === "tree") item.v = Math.floor(hash3(x * 0.37, z * 0.53, 7) * VARIANTS);
    if (t === "shrub") item.v = Math.floor(hash3(x * 0.41, z * 0.29, 3) * 2);
    if (t === "rock") { const bi = this.world.biomeAt(x, z); item.v = bi.m > 0.4 ? (rand() < 0.75 ? 0 : 2) : rand() < 0.45 ? 0 : rand() < 0.6 ? 1 : 2; }
    this.list.push(item);
    this.byType[t].push(id);
    this.addToGrid(id);
    return id;
  }

  // ---------- Génération ----------
  generate(seed) {
    const W = this.world, V = W.V, N = W.N, step = W.step, half = W.half;
    const H = W.heights, ST = W.stream, BIO = W.bio, VEG = W.veg, NRM = W.nrm, WY = W.waterY;
    const rand = mulberry32(seed + 1234);
    // Grille d'occupation des arbres (tête de liste par case + chaînage)
    const head = new Int32Array(V * V).fill(-1);
    const next = [];
    const cellOf = (x, z) => Math.min(N, Math.max(0, Math.round((x + half) / step))) + Math.min(N, Math.max(0, Math.round((z + half) / step))) * V;
    const treeOK = (x, z, sp) => {
      const gi = Math.round((x + half) / step), gj = Math.round((z + half) / step), rc = Math.ceil(sp / step);
      for (let dj = -rc; dj <= rc; dj++) {
        const j = gj + dj; if (j < 0 || j > N) continue;
        for (let di = -rc; di <= rc; di++) {
          const i = gi + di; if (i < 0 || i > N) continue;
          for (let id = head[j * V + i]; id >= 0; id = next[id]) {
            const q = this.list[id], need = (sp + q.sp) * 0.5;
            if ((q.x - x) ** 2 + (q.z - z) ** 2 < need * need) return false;
          }
        }
      }
      return true;
    };
    const addTree = (t, x, z, s, sp) => {
      const id = this.add(t, x, z, s, rand);
      const p = this.list[id];
      p.sp = sp;
      const c = cellOf(x, z);
      while (next.length < id) next.push(-1);
      next[id] = head[c]; head[c] = id;
      return id;
    };
    // Petits objets : on évite seulement les troncs et les rochers déjà posés
    const tooClose = (x, z, d) => {
      let hit = false;
      this.query(x, z, d, (id, p) => {
        const k = PROP_TYPES[p.t].kind;
        if (!hit && (k === "tree" || k === "rock" || k === "bush") && (p.x - x) ** 2 + (p.z - z) ** 2 < Math.max(d, p.r0 || 0) ** 2) hit = true;
      });
      return hit;
    };
    const near = (x, z, d) => { const a = rand() * 6.283, r = d * (0.4 + rand() * 0.6); return [x + Math.cos(a) * r, z + Math.sin(a) * r]; };
    const dry = (x, z) => W.streamAt(x, z) < 0.02 && W.heightAt(x, z) > 2.4;
    const R2 = (half * 0.97) ** 2;

    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * V + i;
      const x = -half + (i + rand()) * step, z = -half + (j + rand()) * step;
      if (x * x + z * z > R2 * 1.4) continue;
      const h = H[k];
      const bm = BIO[k * 4] / 255, bp = BIO[k * 4 + 1] / 255, bw = BIO[k * 4 + 2] / 255, ba = BIO[k * 4 + 3] / 255;
      if (h < 2.2) {
        if (rand() > 0.39) continue;
        const wl = WY[k] > -100 ? WY[k] : 0;
        if (bw > 0.3 && h > -0.8 && h < 1.6) { if (rand() < 0.55 * bw) this.add("reed", x, z, 0.8 + rand() * 0.5, rand); }
        else if (h < -1.5 && h > -14 && wl - h > 1.5 && rand() < 0.1) this.add("kelp", x, z, 0.7 + rand() * 0.7, rand);
        else if (h < -1.2 && h > -8 && wl < 0.5 && rand() < 0.05) this.add("coral", x, z, 1.6 + rand() * 1.6, rand);
        else if (h < -1 && h > -14 && rand() < 0.012 && !tooClose(x, z, 3)) this.add("rock", x, z, 0.6 + rand() * 1.4, rand);
        continue;
      }
      const st = ST[k];
      if (st > 0.02) {
        if (st > 0.25 && rand() < 0.02 && (WY[k] - h) < 1.3 && !tooClose(x, z, 1.6)) this.add("rock", x, z, 0.3 + rand() * 0.5, rand);
        continue;
      }
      const slope = 1 - NRM[k * 3 + 1];
      const moist = VEG[k * 4 + 3] / 255, forest = VEG[k * 4] / 255, grove = VEG[k * 4 + 1] / 255, thicket = VEG[k * 4 + 2] / 255;
      const s3 = (ii, jj) => ST[Math.min(N, Math.max(0, jj)) * V + Math.min(N, Math.max(0, ii))];
      const bank = s3(i + 3, j) + s3(i - 3, j) + s3(i, j + 3) + s3(i, j - 3) > 0.05;
      const shoreWet = h < 6 && (H[Math.max(0, j - 4) * V + i] < 0.5 || H[Math.min(N, j + 4) * V + i] < 0.5 || H[j * V + Math.max(0, i - 4)] < 0.5 || H[j * V + Math.min(N, i + 4)] < 0.5);

      // ---- Arbres ----
      if (h > 3.0 && h < 430 && slope < (bm > 0.3 ? 0.68 : 0.46)) {
        const clearing = smoothstep(0.66, 0.76, forest) * (bank ? 0.3 : 1);
        // Plaines : presque sans arbres, sauf des bosquets de conifères isolés et quelques arbres solitaires
        const copse = bp > 0.3 ? smoothstep(0.7, 0.8, grove) * 0.75 + (rand() < 0.012 ? 0.6 : 0) : 0;
        const dens = (1 - clearing) * smoothstep(3.0, 6.0, h) * (1 - smoothstep(360, 425, h)) * (0.85 + 0.15 * moist) * Math.max(1 - 0.97 * bp, copse) * (1 - 0.6 * bw);
        if (rand() < dens * 0.62) {
          let t;
          const u = rand();
          const alpine = Math.max(smoothstep(30, 60, h) * 0.85, bm * smoothstep(15, 40, h));
          if (rand() < alpine) t = h > 120 && rand() < 0.45 ? "fir" : "pine";
          else if ((bank || shoreWet) && u < 0.3) t = rand() < 0.5 ? "willow" : "poplar";
          else if (bp > 0.3) t = rand() < 0.55 ? "pine" : rand() < 0.7 ? "scots" : "fir";
          else if (bw > 0.3 && rand() < 0.7) t = rand() < 0.75 ? "birch" : "willow";
          else if ((moist > 0.62 && u < 0.22) || (bank && u < 0.45)) t = "birch";
          else if (moist < 0.32 && u < 0.35) t = "scots";
          else t = u < 0.46 ? "beech" : u < 0.78 ? "oak" : u < 0.88 ? "scots" : u < 0.94 ? "young" : u < 0.965 ? "fir" : "birch";
          const r2 = rand();
          if (r2 < 0.035 && h < 300) t = "dead";
          else if (r2 < 0.05 && (t === "oak" || t === "beech") && grove > 0.45) t = "ancient";
          // Bosquets très serrés, zones plus ouvertes ; espacement irrégulier
          const spaceK = 0.62 + 0.72 * smoothstep(0.3, 0.75, 1 - grove) + (rand() - 0.5) * 0.25;
          const sp = PROP_TYPES[t].sp * spaceK;
          if (treeOK(x, z, sp)) {
            // âges variés : jeunes, adultes, vieux géants
            const age = rand();
            let sc = age < 0.18 ? 0.55 + rand() * 0.2 : age > 0.88 ? 1.1 + rand() * 0.25 : 0.82 + rand() * 0.28;
            if (t === "young") sc = 0.7 + rand() * 0.8;
            if (t === "ancient") sc = 0.9 + rand() * 0.25;
            const tid = addTree(t, x, z, sc, sp * (0.6 + 0.4 * sc));
            if (ba > 0.2 && !["pine", "scots", "fir", "dead"].includes(t) && rand() < ba * 0.95) this.list[tid].tint = 1 + Math.floor(rand() * 3);
            // Sous-bois autour des troncs
            const q = rand();
            if (q < 0.16) { const [sx, sz] = near(x, z, 4); if (dry(sx, sz)) this.add("stick", sx, sz, 0.8 + rand() * 0.4, rand); }
            else if (q < 0.26) { const [fx, fz] = near(x, z, 3.5); if (dry(fx, fz)) this.add("fern", fx, fz, 0.8 + rand() * 0.6, rand); }
            else if (q < 0.33) { const [bx, bz] = near(x, z, 4); if (dry(bx, bz) && !tooClose(bx, bz, 1.5)) this.add("bush", bx, bz, 0.7 + rand() * 0.5, rand, rand() < 0.35 ? 1 : 0); }
            else if (q < 0.37) { const [lx, lz] = near(x, z, 6); if (dry(lx, lz)) this.add("log", lx, lz, 0.7 + rand() * 0.5, rand); }
            else if (q < 0.47) { const [ax, az] = near(x, z, 5); if (dry(ax, az) && !tooClose(ax, az, 1.6)) this.add("shrub", ax, az, 0.7 + rand() * 0.6, rand); }
            continue;
          }
        }
      }
      // ---- Petits objets (même densité qu'avant : ~1 essai pour 16 m²) ----
      if (rand() > 0.39) continue;
      const r = rand();
      // Bosquets : buissons, fougères, jeunes arbres, branches et troncs couchés
      if (thicket > 0.66 && h > 3 && h < 60 && slope < 0.28) {
        if (r < 0.22) {
          if (!tooClose(x, z, 1.6)) this.add("bush", x, z, 0.7 + rand() * 0.6, rand, rand() < 0.6 ? 1 : 0);
          { const [fx, fz] = near(x, z, 2.2); if (dry(fx, fz)) this.add("fern", fx, fz, 0.7 + rand() * 0.6, rand); }
          if (rand() < 0.35) { const [sx, sz] = near(x, z, 2.5); if (dry(sx, sz)) this.add("stick", sx, sz, 0.8 + rand() * 0.4, rand); }
          continue;
        }
        if (r < 0.3) { if (treeOK(x, z, 2.2)) addTree(rand() < 0.5 ? "birch" : "young", x, z, 0.6 + rand() * 0.5, 2.2); continue; }
        if (r < 0.305) { this.add("log", x, z, 0.8 + rand() * 0.4, rand); continue; }
      }
      // Montagne : gros affleurements et éboulis
      if (bm > 0.3 && h > 25) {
        if (slope > 0.3 && rand() < 0.06 && !tooClose(x, z, 6)) { this.add("rock", x, z, 2.5 + rand() * 4, rand); continue; }
        if (slope > 0.18 && slope < 0.45 && rand() < 0.05) {
          for (let q = 0; q < 4; q++) { const [rx, rz] = near(x, z, 5); if (!tooClose(rx, rz, 1.2)) this.add("rock", rx, rz, 0.35 + rand() * 0.8, rand); }
          continue;
        }
      }
      // Plaines : rochers erratiques et buissons d'armoise épars
      if (bp > 0.5 && h > 3 && slope < 0.3) {
        if (rand() < 0.012 && !tooClose(x, z, 6)) { this.add("rock", x, z, 0.6 + rand() * 1.8, rand); continue; }
        if (rand() < 0.05 && !tooClose(x, z, 2)) { this.add("bush", x, z, 0.6 + rand() * 0.5, rand, rand() < 0.25 ? 1 : 0); continue; }
      }
      // Côtes rocheuses : blocs au pied des falaises
      if (h < 12 && slope > 0.35 && rand() < 0.15 && !tooClose(x, z, 4)) { this.add("rock", x, z, 1.5 + rand() * 3, rand); continue; }
      if (rand() < 0.01 + slope * 0.3 && h < 120) {
        if (!tooClose(x, z, 3)) { this.add("rock", x, z, 0.6 + rand() * 1.6, rand); continue; }
      }
      if (rand() < 0.012 && slope < 0.3) { this.add("flint", x, z, 0.8 + rand() * 0.6, rand); continue; }
      // Lisières : buissons et jeunes arbres en bordure des clairières
      const edge = smoothstep(0.62, 0.68, forest) * (1 - smoothstep(0.72, 0.78, forest));
      if (edge > 0.2 && h > 3.5 && h < 60 && slope < 0.3 && rand() < 0.4 * edge) {
        if (rand() < 0.65) { if (!tooClose(x, z, 1.8)) this.add("bush", x, z, 0.7 + rand() * 0.6, rand, rand() < 0.5 ? 1 : 0); }
        else if (treeOK(x, z, 2.6)) addTree(rand() < 0.5 ? "birch" : "young", x, z, 0.6 + rand() * 0.6, 2.6);
        continue;
      }
      // Buissons (plus nombreux au bord des ruisseaux)
      if (h > 3 && h < 80 && slope < 0.4 && r < 0.06 * (0.4 + moist) * (bank ? 3 : 1) * (1 + 1.5 * bp + 1.5 * bw)) {
        if (!tooClose(x, z, 2)) this.add("bush", x, z, 0.8 + rand() * 0.5, rand);
        continue;
      }
      if (bank && r < 0.15) { this.add("fern", x, z, 0.8 + rand() * 0.5, rand); continue; }
    }
  }

  // ---------- Modèles et maillages ----------
  buildMeshes(renderer) {
    const Q = this.quality;
    const atlas = makeAtlas(renderer, Q.atlasScale ?? 1);
    this.atlas = atlas;
    const mat = makeVegetationMaterial(atlas, { a2c: Q.msaa > 0 });
    const depthMat = makeVegetationDepthMaterial(atlas);
    this.depthMat = depthMat;
    const plain = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
    const rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88, metalness: 0 });
    this.rockUniforms = { tDetail: { value: null }, tAlb: { value: null }, tNrm: { value: null } };
    // Roche : couches « roche » et « mousse » des matériaux du sol, projetées sur 3 axes
    rockMat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, this.rockUniforms);
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vRP; varying vec3 vRN; varying vec3 vRW;")
        .replace("#include <begin_vertex>", `#include <begin_vertex>
  vRP = transformed; vRN = objectNormal;
  vec4 rw = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  rw = instanceMatrix * rw;
#endif
  vRW = (modelMatrix * rw).xyz;`);
      sh.fragmentShader = sh.fragmentShader
        .replace("#include <common>", `#include <common>
uniform sampler2D tDetail; uniform mediump sampler2DArray tAlb; uniform mediump sampler2DArray tNrm; varying vec3 vRP; varying vec3 vRN; varying vec3 vRW;
vec3 rTN;`)
        .replace("#include <color_fragment>", `#include <color_fragment>
  {
    vec3 n = normalize(vRN), w = pow(abs(n), vec3(4.0)); w /= w.x + w.y + w.z;
    vec3 p = vRP * 0.55 + vRW * 0.05;
    vec4 ax = texture(tAlb, vec3(p.zy, 2.0)), ay = texture(tAlb, vec3(p.xz, 2.0)), az = texture(tAlb, vec3(p.xy, 2.0));
    vec3 tex = ax.rgb * w.x + ay.rgb * w.y + az.rgb * w.z;
    float lumT = dot(tex, vec3(0.3, 0.59, 0.11));
    diffuseColor.rgb *= tex / max(0.12, lumT) * 0.5 + 0.5 * (0.6 + lumT);
    vec2 nx = texture(tNrm, vec3(p.zy, 2.0)).rg * 2.0 - 1.0, ny = texture(tNrm, vec3(p.xz, 2.0)).rg * 2.0 - 1.0, nz = texture(tNrm, vec3(p.xy, 2.0)).rg * 2.0 - 1.0;
    rTN = vec3(0.0, nx.y, nx.x) * w.x + vec3(ny.x, 0.0, ny.y) * w.y + vec3(nz.x, nz.y, 0.0) * w.z;
  }`)
        .replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
  normal = normalize(normal + (viewMatrix * vec4(rTN, 0.0)).xyz * 0.9);`);
    };
    this.materials = { tree: mat, rock: rockMat };

    // Arbres : 11 espèces × 3 variantes, chacune en [détaillé, simplifié, ombre]
    const geos = {};
    const treeInfo = {};
    for (const kind of TREE_KINDS) for (let v = 0; v < VARIANTS; v++) {
      const g = makeTree(kind, 17 + v * 101 + kind.length * 7);
      geos[kind + v] = [g[0], g[1]];
      geos[kind + v].shadow = g[2];
      treeInfo[kind + v] = g.info;
    }
    this.treeInfo = treeInfo;
    Object.assign(geos, {
      rock0: [makeRock(0, 1, 0), makeRock(1, 1, 0)],
      rock1: [makeRock(0, 2, 1), makeRock(1, 2, 1)],
      rock2: [makeRock(0, 3, 2), makeRock(1, 3, 2)],
      bush: [makeLeafBush(true)],
      bushEmpty: [makeLeafBush(false)],
      shrub0: [makeShrub(61)], shrub1: [makeShrub(62)],
      cover: [makeGroundCover(71)],
      fern: [makeFern(5)],
      reed: [makeReeds(13)],
      kelp: [makeKelp(17)],
      coral: [makeCoral(23)],
      log: [makeLog(3)],
      stick: [makeStick()],
      flint: [makeFlint()],
    });
    this.geos = geos;
    this.meshes = {};
    this.shadowMeshes = {};
    const shadowRange = Q.shadows ? Q.shadowRange : 0;
    for (const key in geos) {
      const baseType = key === "bushEmpty" ? "bush" : key.replace(/\d+$/, "");
      const def = PROP_TYPES[baseType];
      const kind = def.kind;
      const total = this.byType[baseType].length;
      const cap = Math.max(4, Math.min(total + 4, kind === "tree" ? 2500 : 6000));
      const m = kind === "rock" ? rockMat : kind === "pickup" ? plain : mat;
      this.meshes[key] = geos[key].map((g, lod) => {
        const im = new THREE.InstancedMesh(g, m, cap);
        if (m === mat) im.customDepthMaterial = depthMat;
        im.count = 0;
        im.frustumCulled = false;
        im.castShadow = kind === "rock" && lod === 0;
        im.receiveShadow = true;
        im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        if (m === mat) {
          im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3).fill(1), 3);
          im.instanceColor.setUsage(THREE.DynamicDrawUsage);
        }
        this.scene.add(im);
        return im;
      });
      // Doublures d'ombre : visibles seulement dans la passe d'ombre (rien n'est dessiné à l'écran)
      if (kind === "tree" && shadowRange > 0) {
        const sg = Q.name === "high" ? geos[key][1] : geos[key].shadow;
        const sgeo = sg.clone();
        const im = new THREE.InstancedMesh(sgeo, mat, Math.min(total + 4, 1500));
        im.customDepthMaterial = depthMat;
        im.count = 0; im.frustumCulled = false; im.castShadow = true; im.receiveShadow = false;
        im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        im.onBeforeRender = () => sgeo.setDrawRange(0, 0);
        im.onBeforeShadow = () => sgeo.setDrawRange(0, Infinity);
        this.scene.add(im);
        this.shadowMeshes[key] = im;
      }
    }
    this.slot = new Int32Array(this.list.length).fill(-1);
    this._m4 = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._tq = new THREE.Quaternion(); this._e = new THREE.Euler();
    this._v = new THREE.Vector3(); this._sv = new THREE.Vector3();

    // Imposteurs : un par espèce et variante, puis toute la forêt de l'île
    const entryKeys = TREE_KINDS.flatMap((k) => Array.from({ length: VARIANTS }, (_, v) => k + v));
    const avg = { oak: 0x4a5a2a, ancient: 0x48582a, beech: 0x5a6e30, birch: 0x6a7a38, scots: 0x3e5230, pine: 0x2e4228, fir: 0x34482c, poplar: 0x5e7034, willow: 0x6a7840, dead: 0x6a645c, young: 0x5e7232 };
    const entries = entryKeys.map((k) => {
      const info = treeInfo[k], kind = k.replace(/\d+$/, "");
      return { geo: geos[k][0], height: info.height + 0.5, crownR: info.crownR + 1.0, crownY: info.height * 0.62, avgColor: new THREE.Color(avg[kind]) };
    });
    this.entryIndex = Object.fromEntries(entryKeys.map((k, i) => [k, i]));
    this.baker = new ImpostorBaker(renderer, atlas, entries, Q.impostorTile ?? 128);
    const items = [];
    this.treeIds = [];
    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      if (PROP_TYPES[p.t].kind !== "tree") continue;
      items.push({ x: p.x, y: p.y - 0.25, z: p.z, s: p.s, ry: p.ry, entry: this.entryIndex[p.t + p.v], tint: p.tint ? TINTS[p.tint] : null });
      p.imp = this.treeIds.length;
      this.treeIds.push(i);
    }
    this.impostors = new ImpostorField(this.scene, this.baker, items, { half: this.world.half, thin: Q.impostorThin ?? 0 });
    vegUniforms.uFade.value.set(Q.treeFar * 0.8, Q.treeFar);
  }

  renderKey(p) {
    if (p.t === "bush" && p.state === 0) return "bushEmpty";
    if (p.t === "rock" || p.t === "shrub" || PROP_TYPES[p.t].kind === "tree") return p.t + (p.v ?? 0);
    return p.t;
  }

  // Matrice de placement d'un objet
  matrixOf(i, out) {
    const p = this.list[i], def = PROP_TYPES[p.t];
    const q = this._q.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, p.ry);
    const isTree = def.kind === "tree";
    if (isTree) q.premultiply(this._tq.setFromEuler(this._e.set((hash3(i, 4, 1) - 0.5) * 0.08, 0, (hash3(i, 5, 2) - 0.5) * 0.08)));
    const sw = isTree ? 0.88 + hash3(i, 6, 3) * 0.28 : 1;
    const sy = def.kind === "rock" ? p.s * (p.s > 2 ? 1.3 + hash3(i, 1, 2) * 0.8 : 0.9 + hash3(i, 1, 2) * 0.6) : p.s;
    const sink = isTree ? -0.25 : def.kind === "rock" ? -0.15 * p.s : 0;
    return out.compose(this._v.set(p.x, p.y + sink, p.z), q, this._sv.set(p.s * sw, sy, p.s * sw));
  }

  // Objets proches : modèles 3D dans le champ de vision (avec marge), niveau de détail selon la distance
  rebuild(cam, dir) {
    const Q = this.quality;
    const near2 = Q.treeNear ** 2, far = Q.treeFar + 8, far2 = far * far;
    const counts = {};
    for (const k in this.meshes) counts[k] = [0, 0];
    this.slot.fill(-1);
    const cosC = Q.cullCos ?? 0.1;
    const m4 = this._m4;
    this.query(cam.x, cam.z, far, (i, p) => {
      if (!p.alive) return;
      const def = PROP_TYPES[p.t];
      const dx = p.x - cam.x, dz = p.z - cam.z, d2 = dx * dx + dz * dz;
      const maxD = def.maxDist ? def.maxDist * def.maxDist : far2;
      if (d2 > maxD) return;
      // découpage : hors du cône de vision (élargi) et pas tout près → ignoré
      if (d2 > 225) {
        const dy = p.y + 4 - cam.y, inv = 1 / Math.sqrt(d2 + dy * dy);
        if ((dx * dir.x + dy * dir.y + dz * dir.z) * inv < cosC) return;
      }
      const key = this.renderKey(p);
      const meshes = this.meshes[key];
      const lod = meshes.length === 1 || d2 < (def.kind === "tree" ? near2 : 70 * 70 * Q.lodScale) ? 0 : 1;
      const im = meshes[lod];
      const n = counts[key][lod];
      if (n >= im.instanceMatrix.count) return;
      counts[key][lod]++;
      this.matrixOf(i, m4).toArray(im.instanceMatrix.array, n * 16);
      if (im.instanceColor) im.instanceColor.array.set(p.tint ? TINTS[p.tint] : WHITE, n * 3);
      if (lod === 0) this.slot[i] = n;
    });
    for (const k in this.meshes) {
      this.meshes[k].forEach((im, lod) => {
        im.count = counts[k][lod];
        im.visible = im.count > 0;
        im.instanceMatrix.needsUpdate = true;
        if (im.instanceColor) im.instanceColor.needsUpdate = true;
      });
    }
    this.lastBuild.copy(cam);
    this.lastDir.copy(dir);
    this.dirty = false;
  }

  // Doublures d'ombre : tous les arbres autour du joueur (dans toutes les directions)
  rebuildShadows(cam) {
    const R = this.quality.shadowRange + 12;
    const counts = {};
    for (const k in this.shadowMeshes) counts[k] = 0;
    this.query(cam.x, cam.z, R, (i, p) => {
      if (!p.alive || PROP_TYPES[p.t].kind !== "tree") return;
      if ((p.x - cam.x) ** 2 + (p.z - cam.z) ** 2 > R * R) return;
      const key = this.renderKey(p), im = this.shadowMeshes[key];
      if (!im || counts[key] >= im.instanceMatrix.count) return;
      this.matrixOf(i, this._m4).toArray(im.instanceMatrix.array, counts[key]++ * 16);
    });
    for (const k in this.shadowMeshes) {
      const im = this.shadowMeshes[k];
      im.count = counts[k]; im.visible = im.count > 0; im.instanceMatrix.needsUpdate = true;
    }
    this.lastShadow.copy(cam);
  }

  update(dt, cam, gameHours, dir) {
    vegUniforms.uTime.value += dt;
    dir = dir || this.lastDir;
    const moved = (cam.x - this.lastBuild.x) ** 2 + (cam.z - this.lastBuild.z) ** 2 + (cam.y - this.lastBuild.y) ** 2;
    if (this.dirty || moved > 9 || dir.dot(this.lastDir) < 0.985) this.rebuild(cam, dir);
    if (this.quality.shadows && (this.shadowDirty || (cam.x - this.lastShadow.x) ** 2 + (cam.z - this.lastShadow.z) ** 2 > 16)) { this.shadowDirty = false; this.rebuildShadows(cam); }

    // Petites secousses quand on frappe un arbre/rocher
    if (this.shakes.size) {
      const m4 = new THREE.Matrix4(), r = new THREE.Matrix4();
      for (const [id, t] of this.shakes) {
        const left = t - dt;
        const slot = this.slot[id];
        const p = this.list[id];
        if (slot >= 0) {
          const im = this.meshes[this.renderKey(p)][0];
          this.matrixOf(id, m4);
          if (left > 0) {
            const k = Math.sin(left * 40) * left * 0.12;
            r.makeRotationAxis(new THREE.Vector3(Math.cos(p.ry), 0, Math.sin(p.ry)), k);
            const pos = new THREE.Vector3().setFromMatrixPosition(m4);
            m4.setPosition(0, 0, 0).premultiply(r).setPosition(pos);
          }
          im.setMatrixAt(slot, m4);
          im.instanceMatrix.needsUpdate = true;
        }
        if (left <= 0) this.shakes.delete(id); else this.shakes.set(id, left);
      }
    }

    // Arbres qui tombent
    for (let i = this.falling.length - 1; i >= 0; i--) {
      const f = this.falling[i];
      f.t += dt;
      const k = Math.min(1, (f.t / 1.8) ** 2);
      f.mesh.quaternion.setFromAxisAngle(f.axis, k * Math.PI * 0.48).multiply(f.base);
      if (f.t > 1.8) f.mesh.position.y -= dt * 0.5;
      if (f.t > 4.5) { this.scene.remove(f.mesh); this.falling.splice(i, 1); }
    }

    // Repousse
    this.respawnTimer = (this.respawnTimer || 0) + dt;
    if (this.respawnTimer > 3) {
      this.respawnTimer = 0;
      for (let i = 0; i < this.list.length; i++) {
        const p = this.list[i];
        if (p.respawnAt && gameHours >= p.respawnAt) {
          const near = (p.x - cam.x) ** 2 + (p.z - cam.z) ** 2 < 30 * 30;
          if (near && p.t !== "bush") continue;
          p.alive = true; p.state = 1; p.hp = PROP_TYPES[p.t].hp; p.respawnAt = 0;
          if (p.imp !== undefined) this.impostors.setVisible(p.imp, p.s);
          this.dirty = true; this.shadowDirty = true;
        }
      }
    }
  }

  // Cible la plus proche dans l'axe du regard.
  pick(origin, dir, maxDist) {
    let best = -1, bestT = maxDist;
    const v = new THREE.Vector3();
    this.query(origin.x, origin.z, maxDist + 2, (id, p) => {
      if (!p.alive) return;
      const def = PROP_TYPES[p.t];
      const cy = p.y + def.center * (def.kind === "tree" ? 1 : p.s);
      v.set(p.x - origin.x, 0, p.z - origin.z);
      let t, distToRay;
      if (def.kind === "tree") {
        const dh = Math.hypot(dir.x, dir.z) || 1e-6;
        t = (v.x * dir.x + v.z * dir.z) / (dh * dh);
        const px = origin.x + dir.x * t, pz = origin.z + dir.z * t;
        const py = origin.y + dir.y * t;
        distToRay = Math.hypot(px - p.x, pz - p.z);
        if (py < p.y - 0.5 || py > p.y + 6) return;
        if (distToRay > def.radius * p.s + 0.35) return;
      } else {
        v.y = cy - origin.y;
        t = v.dot(dir);
        if (t < 0) return;
        const closest = origin.clone().addScaledVector(dir, t);
        distToRay = closest.distanceTo(new THREE.Vector3(p.x, cy, p.z));
        const rad = def.kind === "rock" ? 1.1 * p.s : def.kind === "bush" ? 0.95 * p.s : def.kind === "log" ? 1.3 : def.kind === "decor" ? 0.7 * p.s : 0.45;
        if (distToRay > rad) return;
        t = Math.max(0, t - rad * 0.6);
      }
      if (t > 0 && t < bestT) { bestT = t; best = id; }
    });
    return best >= 0 ? { id: best, dist: bestT, prop: this.list[best] } : null;
  }

  hit(id) {
    this.shakes.set(id, 0.35);
  }

  remove(id, gameHours, respawnHours, fall) {
    const p = this.list[id];
    p.alive = false;
    p.respawnAt = gameHours + respawnHours;
    this.dirty = true; this.shadowDirty = true;
    if (p.imp !== undefined) this.impostors.setVisible(p.imp, 0);
    if (fall) {
      const mesh = new THREE.Mesh(this.geos[this.renderKey(p)][0], this.materials.tree);
      const m4 = this.matrixOf(id, new THREE.Matrix4());
      m4.decompose(mesh.position, mesh.quaternion, mesh.scale);
      mesh.castShadow = true;
      mesh.customDepthMaterial = this.depthMat;
      this.scene.add(mesh);
      const away = new THREE.Vector3(fall.x, 0, fall.z).normalize();
      const axis = new THREE.Vector3(away.z, 0, -away.x).normalize();
      this.falling.push({ mesh, t: 0, axis, base: mesh.quaternion.clone() });
    }
  }

  setBush(id, state, gameHours, respawnHours) {
    const p = this.list[id];
    p.state = state;
    p.respawnAt = state === 0 ? gameHours + respawnHours : 0;
    this.dirty = true;
  }

  // Collisions : repousse un cercle (joueur/animal) hors des troncs et rochers.
  collide(pos, radius) {
    this.query(pos.x, pos.z, 4, (id, p) => {
      if (!p.alive) return;
      const def = PROP_TYPES[p.t];
      if (!def.radius) return;
      const r = def.radius * p.s + radius;
      if (def.kind === "rock" && pos.y > p.y + p.s * 0.9) return;
      const dx = pos.x - p.x, dz = pos.z - p.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < r * r && d2 > 1e-8) {
        const d = Math.sqrt(d2);
        pos.x = p.x + (dx / d) * r;
        pos.z = p.z + (dz / d) * r;
      }
    });
  }

  isClear(x, z, r) {
    let clear = true;
    this.query(x, z, r, (id, p) => {
      if (p.alive && PROP_TYPES[p.t].radius && (p.x - x) ** 2 + (p.z - z) ** 2 < r * r) clear = false;
    });
    return clear;
  }

  serialize() {
    const out = [];
    for (let i = 0; i < this.list.length; i++) {
      const p = this.list[i];
      if (!p.alive || p.state !== p.s0 || p.hp !== PROP_TYPES[p.t].hp) out.push([i, p.alive ? 1 : 0, p.state, p.hp, Math.round(p.respawnAt * 100) / 100]);
    }
    return out;
  }

  restore(arr) {
    for (const [i, alive, state, hp, respawnAt] of arr || []) {
      const p = this.list[i];
      if (!p) continue;
      p.alive = !!alive; p.state = state; p.hp = hp; p.respawnAt = respawnAt;
      if (p.imp !== undefined) this.impostors.setVisible(p.imp, p.alive ? p.s : 0);
    }
    this.dirty = true; this.shadowDirty = true;
  }
}
