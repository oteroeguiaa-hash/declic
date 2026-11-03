// Faune d'une forêt européenne : proies, prédateurs et animaux qui défendent leur territoire.
// Les modèles sont construits avec des formes arrondies (ellipsoïdes, capsules) fusionnées par partie du corps.
import * as THREE from "three";
import { mergeGeometries } from "../vendor/addons/BufferGeometryUtils.js";
import { mulberry32 } from "./noise.js";

const MAT = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
const EYE = new THREE.MeshStandardMaterial({ color: 0x0a0806, roughness: 0.3 });

// ---------- Géométries de base ----------
const SPHERE = new THREE.SphereGeometry(1, 14, 10);
const SPHERE_LO = new THREE.SphereGeometry(1, 8, 6);

function colored(geo, hex, shade = true) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.deleteAttribute("uv");
  const c = new THREE.Color(hex);
  const p = g.attributes.position;
  g.computeBoundingBox();
  const minY = g.boundingBox.min.y, maxY = g.boundingBox.max.y;
  const col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    // légère occlusion : plus sombre vers le bas
    const k = shade ? 0.78 + 0.22 * ((p.getY(i) - minY) / Math.max(1e-4, maxY - minY)) : 1;
    col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k;
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
}

// Ellipsoïde (rx, ry, rz) au point (x, y, z), avec rotation optionnelle autour de X puis Y.
function ell(rx, ry, rz, hex, x = 0, y = 0, z = 0, rotX = 0, rotY = 0, lo = false) {
  const g = (lo ? SPHERE_LO : SPHERE).clone();
  g.scale(rx, ry, rz);
  if (rotX) g.rotateX(rotX);
  if (rotY) g.rotateY(rotY);
  g.translate(x, y, z);
  return colored(g, hex);
}

// Capsule entre deux points.
function limb(a, b, r0, r1, hex) {
  const len = Math.max(1e-3, a.distanceTo(b));
  const g = new THREE.CylinderGeometry(r1, r0, len, 8, 1);
  const cap0 = new THREE.SphereGeometry(r0, 8, 6), cap1 = new THREE.SphereGeometry(r1, 8, 6);
  cap0.translate(0, -len / 2, 0); cap1.translate(0, len / 2, 0);
  const parts = [g, cap0, cap1].map((x) => colored(x, hex, false));
  const m = mergeGeometries(parts);
  const dir = b.clone().sub(a).normalize();
  m.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir));
  m.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  return m;
}

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

function mesh(parts) {
  const m = new THREE.Mesh(mergeGeometries(parts.filter(Boolean)), MAT);
  m.castShadow = true;
  return m;
}

// ---------- Constructeur générique de quadrupède ----------
function buildAnimal(s) {
  const rand = mulberry32(s.seed || 1);
  const g = new THREE.Group();
  const body = new THREE.Group();
  const height = s.legLen + s.bodyR * 0.85;
  body.position.y = height;
  g.add(body);
  const L = s.bodyLen, R = s.bodyR, W = s.bodyW;

  // Tronc
  const torso = [
    ell(W / 2, R, L * 0.36, s.col, 0, 0, 0),
    ell(W / 2 * 1.05, R * 1.05, L * 0.24, s.col, 0, R * 0.05, L * 0.24),
    ell(W / 2 * 0.95, R * 0.95, L * 0.22, s.col, 0, 0, -L * 0.26),
    ell(W / 2 * 0.75, R * 0.45, L * 0.32, s.belly, 0, -R * 0.55, 0),
  ];
  if (s.hump) torso.push(ell(W * 0.42, R * 0.55, L * 0.2, s.col, 0, R * 0.65, L * 0.22));
  if (s.mane) torso.push(ell(W * 0.12, R * 0.35, L * 0.38, s.dark, 0, R * 0.85, L * 0.05));
  if (s.spots) for (let i = 0; i < 18; i++) {
    const a = rand() * Math.PI * 2, zz = (rand() - 0.5) * L * 0.65;
    torso.push(ell(R * 0.09, R * 0.09, R * 0.12, s.dark, Math.cos(a) * W * 0.49, Math.sin(a) * R * 0.95, zz, 0, 0, true));
  }
  body.add(mesh(torso));

  // Pattes
  const legs = [];
  const legTop = -R * 0.45;
  const Lr = height + legTop; // longueur depuis le pivot jusqu'au sol
  for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * W * 0.3, legTop, sz * L * 0.32);
    const front = sz > 0;
    const knee = V3(0, -Lr * 0.5, front ? 0.02 : -Lr * 0.08);
    const parts = [
      ell(s.legR * 1.6, Lr * 0.28, s.legR * 1.9, s.col, 0, -Lr * 0.18, 0),
      limb(V3(0, -Lr * 0.2, 0), knee, s.legR * 1.2, s.legR, s.legCol || s.col),
      limb(knee, V3(0, -Lr * 0.95, front ? 0.02 : 0.03), s.legR, s.legR * 0.8, s.legCol || s.col),
      ell(s.legR * 1.05, s.legR * 0.7, s.legR * 1.3, s.dark, 0, -Lr + s.legR * 0.6, 0.02),
    ];
    pivot.add(mesh(parts));
    body.add(pivot);
    legs.push(pivot);
  }

  // Cou + tête
  const neck = new THREE.Group();
  neck.position.set(0, R * 0.35, L * 0.42);
  const na = s.neckAngle;
  const nEnd = V3(0, Math.sin(na) * s.neckLen, Math.cos(na) * s.neckLen);
  const hp = [limb(V3(0, 0, 0), nEnd, s.neckR * 1.15, s.neckR, s.col)];
  const hx = nEnd.x, hy = nEnd.y, hz = nEnd.z;
  const hl = s.headLen, hr = s.headR;
  const tilt = s.headTilt ?? 0.35;
  const fwd = V3(0, -Math.sin(tilt), Math.cos(tilt));
  const at = (d, up = 0, side = 0) => V3(hx + side, hy + fwd.y * d + up, hz + fwd.z * d);
  hp.push(ell(hr * 0.9, hr, hl * 0.42, s.col, ...at(hl * 0.2).toArray(), tilt));
  hp.push(ell(s.snoutR, s.snoutR * 0.85, s.snoutLen / 2, s.snoutCol || s.col, ...at(hl * 0.45 + s.snoutLen * 0.35, -hr * 0.15).toArray(), tilt));
  hp.push(ell(s.snoutR * 0.4, s.snoutR * 0.3, s.snoutR * 0.25, s.dark, ...at(hl * 0.45 + s.snoutLen * 0.82, -hr * 0.1).toArray(), 0, 0, true));
  if (s.ears) for (const sx of [-1, 1]) {
    const e = s.ears;
    const base = at(-hl * 0.05, hr * 0.75, sx * hr * 0.55);
    const tip = base.clone().add(V3(sx * e.size * 0.35, e.size * (e.up ?? 1), -e.size * 0.15));
    hp.push(limb(base, tip, e.size * 0.32, e.pointy ? e.size * 0.04 : e.size * 0.25, s.col));
    if (s.tufts) hp.push(limb(tip, tip.clone().add(V3(0, e.size * 0.4, 0)), e.size * 0.05, e.size * 0.02, s.dark));
  }
  if (s.antlers === "deer") for (const sx of [-1, 1]) {
    const b = at(hl * 0.02, hr * 0.85, sx * hr * 0.35);
    const m1 = b.clone().add(V3(sx * 0.18, 0.28, -0.08)), t1 = m1.clone().add(V3(sx * 0.1, 0.25, -0.12));
    hp.push(limb(b, m1, 0.025, 0.02, s.antlerCol), limb(m1, t1, 0.02, 0.008, s.antlerCol));
    hp.push(limb(m1, m1.clone().add(V3(sx * 0.02, 0.16, 0.12)), 0.016, 0.006, s.antlerCol));
    hp.push(limb(b.clone().lerp(m1, 0.4), b.clone().lerp(m1, 0.4).add(V3(sx * 0.03, 0.12, 0.13)), 0.015, 0.005, s.antlerCol));
  }
  if (s.antlers === "moose") for (const sx of [-1, 1]) {
    const b = at(hl * 0.05, hr * 0.8, sx * hr * 0.4);
    const end = b.clone().add(V3(sx * 0.3, 0.12, -0.02));
    hp.push(limb(b, end, 0.04, 0.035, s.antlerCol));
    hp.push(ell(0.3, 0.05, 0.2, s.antlerCol, end.x + sx * 0.18, end.y + 0.08, end.z - 0.02));
    for (let k = 0; k < 4; k++) hp.push(limb(V3(end.x + sx * (0.05 + k * 0.1), end.y + 0.1, end.z + 0.12), V3(end.x + sx * (0.07 + k * 0.11), end.y + 0.25, end.z + 0.16), 0.02, 0.006, s.antlerCol));
  }
  if (s.tusks) for (const sx of [-1, 1]) {
    const b = at(hl * 0.45 + s.snoutLen * 0.5, -hr * 0.3, sx * s.snoutR * 0.8);
    hp.push(limb(b, b.clone().add(V3(sx * 0.02, 0.07, 0.02)), 0.012, 0.004, 0xe8e0c8));
  }
  if (s.dewlap) hp.push(ell(0.05, 0.12, 0.05, s.col, ...at(hl * 0.1, -hr * 1.1).toArray()));
  neck.add(mesh(hp));
  for (const sx of [-1, 1]) {
    const e = new THREE.Mesh(SPHERE_LO, EYE);
    e.scale.setScalar(Math.max(0.012, hr * 0.12));
    e.position.copy(at(hl * 0.18, hr * 0.35, sx * hr * 0.78));
    neck.add(e);
  }
  body.add(neck);

  // Queue
  let tail = null;
  if (s.tail) {
    const t = s.tail;
    tail = new THREE.Group();
    tail.position.set(0, R * 0.35, -L * 0.48);
    const dir = V3(0, Math.sin(t.angle), -Math.cos(t.angle));
    const tp = [];
    if (t.bushy) {
      tp.push(ell(t.r, t.r, t.len * 0.5, s.col, ...dir.clone().multiplyScalar(t.len * 0.5).toArray(), -t.angle));
      if (t.curl) tp.push(ell(t.r * 0.9, t.len * 0.35, t.r * 0.9, s.col, 0, t.len * 0.6, -t.len * 0.55));
      if (t.tip) tp.push(ell(t.r * 0.7, t.r * 0.7, t.len * 0.14, t.tip, ...dir.clone().multiplyScalar(t.len * 0.95).toArray(), -t.angle));
    } else {
      tp.push(limb(V3(0, 0, 0), dir.clone().multiplyScalar(t.len), t.r, t.r * 0.5, t.color || s.col));
    }
    tail.add(mesh(tp));
    body.add(tail);
  }
  return { group: g, body, legs, neck, tail, height };
}

// ---------- Espèces ----------
// behavior : prey (fuit), defensive (fuit, charge si blessé), territorial (charge si on s'approche),
//            hunter (chasse le joueur, craint le feu)
export const SPECIES = {
  deer: {
    name: "Cerf", behavior: "prey", hp: 60, walk: 1.3, run: 9.5, radius: 0.5, alert: [17, 30, 9], drops: { viande_crue: 3, peau: 2 },
    model: { col: 0x7a5232, belly: 0xc9b08a, dark: 0x2a1d14, legLen: 0.78, legR: 0.045, bodyLen: 1.25, bodyR: 0.26, bodyW: 0.38, neckLen: 0.5, neckR: 0.09, neckAngle: 0.95, headLen: 0.36, headR: 0.1, snoutLen: 0.16, snoutR: 0.06, ears: { size: 0.13, pointy: true }, antlers: "deer", antlerCol: 0x8a7a60, tail: { len: 0.1, r: 0.04, angle: 0.3, color: 0xe8e0d0 } },
  },
  moose: {
    name: "Élan", behavior: "defensive", hp: 170, walk: 1.1, run: 7.2, radius: 0.8, alert: [10, 18, 6], aggro: [6, 3], dmg: 22, cooldown: 1.6, drops: { viande_crue: 7, peau: 3 },
    model: { col: 0x3a2a1e, belly: 0x4a3a2c, dark: 0x1a120c, legCol: 0x8a7a68, legLen: 1.1, legR: 0.07, bodyLen: 1.9, bodyR: 0.42, bodyW: 0.62, hump: true, neckLen: 0.42, neckR: 0.17, neckAngle: 0.35, headLen: 0.6, headR: 0.16, headTilt: 0.7, snoutLen: 0.3, snoutR: 0.13, ears: { size: 0.16, pointy: true }, antlers: "moose", antlerCol: 0xb0a080, dewlap: true, tail: { len: 0.1, r: 0.05, angle: -0.8 } },
  },
  boar: {
    name: "Sanglier", behavior: "territorial", hp: 90, walk: 1.2, run: 7.8, radius: 0.45, aggro: [9, 5], dmg: 14, cooldown: 1.2, hitAndRun: true, alert: [12, 20, 6], drops: { viande_crue: 4, peau: 1 },
    model: { col: 0x3b2f25, belly: 0x2e241c, dark: 0x15100c, legLen: 0.3, legR: 0.045, bodyLen: 1.1, bodyR: 0.3, bodyW: 0.4, mane: true, neckLen: 0.12, neckR: 0.18, neckAngle: 0.1, headLen: 0.5, headR: 0.17, headTilt: 0.45, snoutLen: 0.22, snoutR: 0.08, snoutCol: 0x4a3a30, ears: { size: 0.09, pointy: true }, tusks: true, tail: { len: 0.22, r: 0.02, angle: -1.1 } },
  },
  fox: {
    name: "Renard", behavior: "prey", hp: 22, walk: 1.6, run: 8.5, radius: 0.25, alert: [14, 22, 7], drops: { viande_crue: 1, peau: 1 },
    model: { col: 0xc0581e, belly: 0xf0e6d6, dark: 0x1a120e, legCol: 0x3a2418, legLen: 0.28, legR: 0.025, bodyLen: 0.62, bodyR: 0.13, bodyW: 0.2, neckLen: 0.14, neckR: 0.07, neckAngle: 0.6, headLen: 0.2, headR: 0.08, snoutLen: 0.13, snoutR: 0.035, ears: { size: 0.09, pointy: true }, tail: { len: 0.5, r: 0.08, angle: -0.35, bushy: true, tip: 0xf0ece0 } },
  },
  rabbit: {
    name: "Lapin", behavior: "prey", hp: 8, walk: 1.2, run: 7.5, radius: 0.12, alert: [9, 14, 4], hop: true, drops: { viande_crue: 1, peau: 1 },
    model: { col: 0x8a7458, belly: 0xd8ccb8, dark: 0x2a2018, legLen: 0.07, legR: 0.025, bodyLen: 0.32, bodyR: 0.12, bodyW: 0.19, neckLen: 0.05, neckR: 0.07, neckAngle: 0.9, headLen: 0.13, headR: 0.07, snoutLen: 0.05, snoutR: 0.04, ears: { size: 0.13, pointy: false, up: 1.4 }, tail: { len: 0.04, r: 0.045, angle: 0.5, color: 0xf4f0ea } },
  },
  squirrel: {
    name: "Écureuil", behavior: "prey", hp: 8, walk: 1.5, run: 6.5, radius: 0.1, alert: [7, 12, 3], hop: true, drops: { viande_crue: 1, noisettes: 2 },
    model: { col: 0x9a4a1e, belly: 0xeedcc0, dark: 0x2a1408, legLen: 0.05, legR: 0.015, bodyLen: 0.2, bodyR: 0.06, bodyW: 0.1, neckLen: 0.04, neckR: 0.04, neckAngle: 0.9, headLen: 0.08, headR: 0.042, snoutLen: 0.03, snoutR: 0.022, ears: { size: 0.035, pointy: true }, tufts: true, tail: { len: 0.24, r: 0.06, angle: 1.0, bushy: true, curl: true } },
  },
  wolf: {
    name: "Loup", behavior: "hunter", hp: 70, walk: 1.8, run: 7.4, radius: 0.45, chase: 55, dmg: 13, cooldown: 1.25, fleeHp: 22, drops: { viande_crue: 2, peau: 1 },
    model: { col: 0x6a645c, belly: 0xb0a898, dark: 0x1b1a19, legLen: 0.5, legR: 0.035, bodyLen: 1.0, bodyR: 0.19, bodyW: 0.3, neckLen: 0.25, neckR: 0.12, neckAngle: 0.5, headLen: 0.28, headR: 0.11, snoutLen: 0.17, snoutR: 0.05, snoutCol: 0x8a8478, ears: { size: 0.1, pointy: true }, tail: { len: 0.45, r: 0.07, angle: -0.6, bushy: true } },
  },
  lynx: {
    name: "Lynx", behavior: "hunter", stalker: true, hp: 60, walk: 1.5, run: 8.8, radius: 0.35, chase: 32, dmg: 15, cooldown: 1.4, fleeHp: 25, drops: { viande_crue: 2, fourrure: 1 },
    model: { col: 0xb08a5a, belly: 0xe8dcc4, dark: 0x2a1e14, spots: true, legLen: 0.46, legR: 0.04, bodyLen: 0.82, bodyR: 0.18, bodyW: 0.28, neckLen: 0.14, neckR: 0.11, neckAngle: 0.5, headLen: 0.2, headR: 0.11, headTilt: 0.15, snoutLen: 0.07, snoutR: 0.05, ears: { size: 0.08, pointy: true }, tufts: true, tail: { len: 0.13, r: 0.04, angle: -0.2, color: 0x2a1e14 } },
  },
  bear: {
    name: "Ours", behavior: "territorial", hp: 220, walk: 1.2, run: 6.8, radius: 0.8, aggro: [13, 7], dmg: 28, cooldown: 1.8, alert: [15, 25, 8], drops: { viande_crue: 6, fourrure: 2 },
    model: { col: 0x4a3222, belly: 0x3e2a1c, dark: 0x1a120c, legLen: 0.55, legR: 0.11, bodyLen: 1.6, bodyR: 0.46, bodyW: 0.78, hump: true, neckLen: 0.28, neckR: 0.26, neckAngle: 0.15, headLen: 0.42, headR: 0.24, headTilt: 0.2, snoutLen: 0.2, snoutR: 0.1, snoutCol: 0x7a5a3e, ears: { size: 0.08, pointy: false }, tail: { len: 0.08, r: 0.05, angle: 0.2 } },
  },
};

const PREDATORS = new Set(["wolf", "lynx", "bear"]);

export class Creatures {
  constructor(scene, world, props, quality, sounds) {
    this.scene = scene;
    this.world = world;
    this.props = props;
    this.quality = quality;
    this.sounds = sounds;
    this.list = [];
    this.rand = mulberry32(Date.now() & 0xffff);
    this.spawnTimer = 0;
    this.v = new THREE.Vector3();
  }

  spawn(type, near, opts = {}) {
    const [dMin, dMax] = opts.dist || {
      deer: [50, 130], moose: [60, 140], boar: [45, 110], fox: [30, 90], rabbit: [18, 50], squirrel: [14, 40],
      wolf: [55, 95], lynx: [50, 100], bear: [80, 140],
    }[type];
    for (let tries = 0; tries < 25; tries++) {
      const a = this.rand() * Math.PI * 2;
      const d = dMin + this.rand() * (dMax - dMin);
      const x = near.x + Math.cos(a) * d, z = near.z + Math.sin(a) * d;
      const h = this.world.heightAt(x, z);
      if (h < 2.5 || h > 60 || this.world.slopeAt(x, z) > 0.3 || this.world.streamAt(x, z) > 0.1) continue;
      if (type === "moose" && this.world.moisture(x, z) < 0.45) continue;
      return this.create(type, x, z, opts);
    }
    return null;
  }

  create(type, x, z, opts = {}) {
    const sp = SPECIES[type];
    const parts = buildAnimal({ ...sp.model, seed: (this.rand() * 1e6) | 0 });
    const s = opts.scale || 0.9 + this.rand() * 0.2;
    parts.group.scale.setScalar(s);
    parts.group.position.set(x, this.world.heightAt(x, z), z);
    this.scene.add(parts.group);
    const meshes = [];
    parts.group.traverse((o) => { if (o.isMesh) meshes.push(o); });
    const c = {
      type, sp, ...parts, meshes, scale: s, pos: parts.group.position, yaw: this.rand() * 6.28, speed: 0, target: 0, hp: sp.hp,
      state: "idle", timer: 0, phase: this.rand() * 6, attackCd: 0, dead: false, deadT: 0, heading: this.rand() * 6.28,
      nocturnal: !!opts.nocturnal, angry: false, retreat: 0, angryT: 0,
    };
    this.list.push(c);
    return c;
  }

  remove(c) {
    this.scene.remove(c.group);
    c.meshes.forEach((m) => { if (m.geometry !== SPHERE_LO) m.geometry.dispose(); });
    const i = this.list.indexOf(c);
    if (i >= 0) this.list.splice(i, 1);
  }

  count(t) { let n = 0; for (const c of this.list) if (c.type === t && !c.dead) n++; return n; }

  manageSpawns(player, ctx) {
    const { night, diff, day } = ctx;
    const Q = this.quality;
    const r = () => this.rand();
    const total = this.list.filter((c) => !c.dead).length;
    if (total < Q.maxCreatures) {
      if (this.count("deer") < Q.maxDeer && r() < 0.45) this.spawn("deer", player.pos);
      if (this.count("squirrel") < Q.maxSquirrels && r() < 0.5) this.spawn("squirrel", player.pos);
      if (this.count("rabbit") < 3 && r() < 0.35) this.spawn("rabbit", player.pos);
      if (this.count("fox") < 2 && r() < 0.15) this.spawn("fox", player.pos);
      if (this.count("moose") < 2 && r() < 0.08) this.spawn("moose", player.pos);
      if (this.count("boar") < Math.max(1, Math.round(2 * (diff.wolves || 0.5))) && r() < 0.12) this.spawn("boar", player.pos);
      if (diff.predators) {
        if (this.count("lynx") < Math.max(1, Math.round(diff.wolves)) && r() < 0.07) this.spawn("lynx", player.pos);
        if (this.count("bear") < diff.bears && r() < (day >= 2 ? 0.06 : 0.03)) this.spawn("bear", player.pos);
        // Loups : meutes la nuit, petites meutes plus rares le jour
        const maxW = night ? Math.min(Math.round(Q.maxWolves * diff.wolves), 2 + Math.floor(day / 2)) : Math.round(2 * diff.wolves);
        if (this.count("wolf") < maxW && r() < (night ? 0.25 : 0.04)) {
          const lead = this.spawn("wolf", player.pos, { nocturnal: night });
          if (lead) {
            const pack = 1 + Math.floor(r() * (night ? 3 : 2));
            for (let k = 0; k < pack; k++) this.create("wolf", lead.pos.x + (r() - 0.5) * 6, lead.pos.z + (r() - 0.5) * 6, { nocturnal: night });
            if (this.sounds) this.sounds.howl(lead.pos.distanceTo(player.pos));
          }
        }
      }
    }
    for (const c of [...this.list]) {
      const d = c.pos.distanceTo(player.pos);
      const small = c.type === "squirrel" || c.type === "rabbit";
      if (d > (small ? 80 : 220) || (c.dead && c.deadT > 240)) this.remove(c);
      else if (c.type === "wolf" && c.nocturnal && !night && d > 70) this.remove(c);
      else if (PREDATORS.has(c.type) && !diff.predators) this.remove(c);
    }
  }

  update(dt, player, ctx) {
    const { fires, onAttack } = ctx;
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) { this.spawnTimer = 2; this.manageSpawns(player, ctx); }

    for (const c of this.list) {
      if (c.dead) { this.animateDead(c, dt); continue; }
      const sp = c.sp;
      const toP = this.v.set(player.pos.x - c.pos.x, 0, player.pos.z - c.pos.z);
      const dist = toP.length();
      c.timer -= dt; c.attackCd -= dt; c.retreat -= dt;
      let fire = null;
      for (const f of fires) if (f.lit && f.pos.distanceTo(c.pos) < 13) fire = f;
      const toward = () => Math.atan2(toP.x, toP.z);
      const away = (from) => Math.atan2(c.pos.x - from.x, c.pos.z - from.z);
      const tryHit = (reach) => {
        if (dist < reach && c.attackCd <= 0 && !player.dead) {
          c.attackCd = sp.cooldown || 1.5;
          onAttack(Math.round((sp.dmg + this.rand() * sp.dmg * 0.4) * ctx.diff.damage), c);
          if (sp.hitAndRun) c.retreat = 1.6;
        }
      };
      let behavior = sp.behavior;
      if (behavior === "territorial" && !ctx.diff.predators) behavior = "prey";
      if (behavior === "defensive") behavior = c.angry ? "territorial" : "prey";

      if (behavior === "prey") {
        const [calm, sprint, crouch] = sp.alert || [15, 25, 8];
        const alert = player.sprinting ? sprint : player.crouching ? crouch : calm;
        if (dist < alert || c.state === "flee") {
          if (c.state !== "flee") { c.state = "flee"; c.timer = 4 + this.rand() * 3; }
          c.heading = away(player.pos) + Math.sin(performance.now() * 0.001 + c.pos.x) * 0.3;
          c.target = sp.run;
          if (c.timer <= 0 && dist > alert) c.state = "idle";
        } else if (c.timer <= 0) {
          if (this.rand() < 0.45) { c.state = "graze"; c.target = 0; }
          else { c.state = "walk"; c.target = sp.walk; c.heading += (this.rand() - 0.5) * 2.2; }
          c.timer = sp.hop ? 0.8 + this.rand() * 2 : 3 + this.rand() * 6;
        }
      } else if (behavior === "territorial") {
        const [ag, agC] = sp.aggro || [8, 4];
        if (c.hp < sp.hp * 0.22 || fire) {
          c.heading = away(fire ? fire.pos : player.pos); c.target = sp.run; c.state = "flee"; c.angry = false;
        } else if (c.retreat > 0) {
          c.heading = away(player.pos); c.target = sp.run * 0.8; c.state = "flee";
        } else if (c.angry || dist < (player.crouching ? agC : ag)) {
          if (!c.angry) { c.angry = true; c.angryT = 14; }
          c.angryT -= dt;
          if (c.angryT <= 0 && dist > ag) c.angry = false;
          if (dist > 45) c.angry = false;
          c.state = dist < 2.2 + sp.radius ? "attack" : "chase";
          c.heading = toward();
          c.target = c.state === "attack" ? 0 : sp.run;
          tryHit(2.4 + sp.radius);
        } else if (c.timer <= 0) {
          c.state = this.rand() < 0.4 ? "graze" : "walk";
          c.target = c.state === "walk" ? sp.walk : 0;
          c.heading += (this.rand() - 0.5) * 1.6;
          c.timer = 4 + this.rand() * 8;
        }
      } else {
        // Chasseur (loup, lynx)
        const flee = c.hp < sp.fleeHp || (c.type === "wolf" && c.nocturnal && !ctx.night);
        const nearFire = fires.find((f) => f.lit && f.pos.distanceTo(player.pos) < 9);
        if (flee) {
          c.heading = away(player.pos); c.target = sp.run; c.state = "flee";
        } else if (nearFire) {
          const fx = c.pos.x - nearFire.pos.x, fz = c.pos.z - nearFire.pos.z;
          const fd = Math.hypot(fx, fz);
          c.heading = fd < 13 ? Math.atan2(fx, fz) : Math.atan2(fx, fz) + Math.PI / 2;
          c.target = fd < 13 ? sp.run * 0.6 : sp.walk; c.state = "circle";
        } else if (dist < (c.nocturnal || c.type === "lynx" ? sp.chase : sp.chase * 0.5)) {
          c.heading = toward();
          if (sp.stalker && dist > 9 && !c.pounce) {
            c.state = "stalk"; c.target = sp.walk * 1.2;  // le lynx s'approche lentement…
          } else {
            c.pounce = true;                              // … puis bondit
            c.state = dist < 1.9 ? "attack" : "chase";
            c.target = dist < 1.9 ? 0 : dist < 14 ? sp.run : sp.run * 0.75;
            tryHit(2.1);
          }
        } else if (c.timer <= 0) {
          c.pounce = false;
          c.state = "roam";
          c.heading = (c.nocturnal ? toward() : c.heading) + (this.rand() - 0.5) * 1.5;
          c.target = sp.walk * 1.4;
          c.timer = 4;
        }
      }

      // Déplacement
      let dy = c.heading - c.yaw;
      dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      c.yaw += dy * Math.min(1, dt * (c.target > 3 ? 5 : 2));
      c.speed += (c.target - c.speed) * Math.min(1, dt * 3);
      const nx = c.pos.x + Math.sin(c.yaw) * c.speed * dt;
      const nz = c.pos.z + Math.cos(c.yaw) * c.speed * dt;
      const nh = this.world.heightAt(nx, nz);
      if (nh < 1.2 || nh - c.pos.y > 1.2 * Math.max(dt * c.speed, 0.05) + 0.3 || this.world.waterLevelAt(nx, nz) - nh > 0.7) {
        c.heading = c.yaw + Math.PI * (0.6 + this.rand() * 0.8);
        c.speed *= 0.5;
      } else { c.pos.x = nx; c.pos.z = nz; }
      if (sp.radius > 0.2) this.props.collide(c.pos, sp.radius);
      if (this.build) this.build.collide(c.pos, Math.max(0.15, sp.radius), c.height * 1.5);
      c.pos.y = this.world.heightAt(c.pos.x, c.pos.z);
      c.group.rotation.y = c.yaw;
      const ahead = this.world.heightAt(c.pos.x + Math.sin(c.yaw), c.pos.z + Math.cos(c.yaw));
      c.body.rotation.x = THREE.MathUtils.lerp(c.body.rotation.x, -Math.atan2(ahead - c.pos.y, 1) * 0.8, dt * 5);

      // Animation
      const close = dist < 60;
      if (c.meshes[0].castShadow !== close) c.meshes.forEach((m) => (m.castShadow = close));
      const size = c.height;
      c.phase += dt * c.speed * (sp.hop ? 2.4 / Math.max(0.15, size) : 1.6 / Math.max(0.4, size));
      const gallop = c.speed > sp.walk * 2;
      const amp = Math.min(0.8, c.speed * (sp.hop ? 0.25 : 0.12));
      c.legs.forEach((l, i) => {
        const off = sp.hop || gallop ? (i < 2 ? 0 : Math.PI * 0.8) + (i % 2) * 0.25 : (i === 0 || i === 3 ? 0 : Math.PI);
        l.rotation.x = Math.sin(c.phase + off) * amp;
      });
      const bob = Math.abs(Math.sin(c.phase)) * (sp.hop ? size * 0.5 : gallop ? size * 0.07 : size * 0.02) * Math.min(1, c.speed);
      c.body.position.y = c.height + bob - (c.state === "stalk" ? c.height * 0.15 : 0);
      const headDown = c.state === "graze" ? 0.9 : c.state === "flee" ? -0.3 : c.state === "stalk" ? 0.35 : c.state === "attack" ? Math.sin(performance.now() * 0.02) * 0.2 + 0.15 : 0;
      c.neck.rotation.x = THREE.MathUtils.lerp(c.neck.rotation.x, headDown, dt * 3);
      if (c.tail) c.tail.rotation.y = Math.sin(performance.now() * 0.004 + c.phase) * (c.state === "chase" ? 0.1 : 0.25);
    }
  }

  animateDead(c, dt) {
    c.deadT += dt;
    c.group.rotation.z = THREE.MathUtils.lerp(c.group.rotation.z, Math.PI / 2, Math.min(1, dt * 4));
    c.group.position.y = this.world.heightAt(c.pos.x, c.pos.z) + c.sp.model.bodyW * 0.35 * c.scale;
    c.legs.forEach((l) => (l.rotation.x *= 0.9));
  }

  pick(origin, dir, maxDist) {
    let best = null, bestT = maxDist;
    const center = new THREE.Vector3();
    for (const c of this.list) {
      const m = c.sp.model;
      center.set(c.pos.x, c.dead ? c.pos.y + m.bodyW * 0.3 : c.pos.y + c.height * c.scale, c.pos.z);
      const t = center.clone().sub(origin).dot(dir);
      if (t < 0 || t > bestT + 1.5) continue;
      const closest = origin.clone().addScaledVector(dir, t);
      const rad = Math.max(0.35, m.bodyR * 2.2 * c.scale, m.bodyLen * 0.45 * c.scale);
      if (closest.distanceTo(center) < rad) {
        const tt = Math.max(0, t - rad * 0.6);
        if (tt < bestT) { bestT = tt; best = c; }
      }
    }
    return best ? { creature: best, dist: bestT } : null;
  }

  damage(c, amount, from) {
    if (c.dead) return false;
    c.hp -= amount;
    if (c.sp.behavior === "prey") { c.state = "flee"; c.timer = 8; }
    else if (c.sp.behavior === "defensive" || c.sp.behavior === "territorial") { c.angry = true; c.angryT = 20; }
    else c.attackCd = Math.max(c.attackCd, 0.5);
    const dx = c.pos.x - from.x, dz = c.pos.z - from.z, d = Math.hypot(dx, dz) || 1;
    const kb = c.sp.radius > 0.6 ? 0.08 : 0.35;
    c.pos.x += (dx / d) * kb; c.pos.z += (dz / d) * kb;
    if (c.hp <= 0) { c.dead = true; c.speed = 0; c.deadT = 0; return true; }
    return false;
  }

  serialize() { return []; }
}
