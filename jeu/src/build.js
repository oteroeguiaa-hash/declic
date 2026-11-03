// Construction libre et modulaire : fondations, planchers, murs, portes, fenêtres, escaliers, toits,
// piquets, clôtures, portails… et (étape 5) mobilier. Grille de 3 m avec points d'accroche (sockets).
import * as THREE from "three";

export const G = 3;          // taille d'une case de construction (m)
const WALL_H = 3;            // hauteur d'un mur
const WALL_T = 0.25;         // épaisseur d'un mur

// ---------- Textures procédurales ----------
function canvasTex(w, h, draw, repeat = true) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}
function rnd(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function makeMaterials() {
  const r = rnd(5);
  const planks = canvasTex(256, 256, (g, w, h) => {
    const n = 6;
    for (let i = 0; i < n; i++) {
      const base = 120 + r() * 40;
      g.fillStyle = `rgb(${base + 20 | 0},${base * 0.72 | 0},${base * 0.45 | 0})`;
      g.fillRect((i * w) / n, 0, w / n, h);
      for (let k = 0; k < 40; k++) {
        g.strokeStyle = `rgba(60,35,20,${0.08 + r() * 0.15})`;
        g.lineWidth = 1;
        const x = (i * w) / n + r() * (w / n);
        g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + r() * 6 - 3, h * 0.3, x + r() * 6 - 3, h * 0.7, x, h); g.stroke();
      }
      g.fillStyle = "rgba(30,18,10,0.85)";
      g.fillRect((i * w) / n, 0, 2, h);
      const cut = r() * h;
      g.fillRect((i * w) / n, cut, w / n, 2);
      g.fillStyle = "rgba(40,25,15,0.7)";
      g.beginPath(); g.arc((i * w) / n + w / n / 2, cut + 20, 2, 0, 7); g.fill();
    }
  });
  const logs = canvasTex(256, 256, (g, w, h) => {
    const n = 8;
    for (let i = 0; i < n; i++) {
      const y = (i * h) / n, hh = h / n;
      const grd = g.createLinearGradient(0, y, 0, y + hh);
      grd.addColorStop(0, "#3a2414"); grd.addColorStop(0.25, "#7a5434"); grd.addColorStop(0.6, "#8a6040"); grd.addColorStop(1, "#2a180c");
      g.fillStyle = grd; g.fillRect(0, y, w, hh);
      for (let k = 0; k < 25; k++) { g.fillStyle = `rgba(40,25,12,${r() * 0.3})`; g.fillRect(r() * w, y + r() * hh, 10 + r() * 30, 1); }
    }
  });
  const stone = canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = "#4a4640"; g.fillRect(0, 0, w, h);
    const rows = 6;
    for (let j = 0; j < rows; j++) {
      let x = j % 2 ? -20 : 0;
      while (x < w) {
        const bw = 36 + r() * 40, y = (j * h) / rows;
        const v = 110 + r() * 50;
        g.fillStyle = `rgb(${v | 0},${v * 0.97 | 0},${v * 0.9 | 0})`;
        g.fillRect(x + 2, y + 2, bw - 4, h / rows - 4);
        for (let k = 0; k < 20; k++) { g.fillStyle = `rgba(0,0,0,${r() * 0.12})`; g.fillRect(x + r() * bw, y + r() * (h / rows), 3, 3); }
        x += bw;
      }
    }
  });
  const shingles = canvasTex(256, 256, (g, w, h) => {
    const rows = 10;
    for (let j = 0; j < rows; j++) {
      let x = j % 2 ? -12 : 0;
      while (x < w) {
        const v = 70 + r() * 35;
        g.fillStyle = `rgb(${v * 0.9 | 0},${v * 0.6 | 0},${v * 0.45 | 0})`;
        g.fillRect(x, (j * h) / rows, 24, h / rows);
        g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(x, (j * h) / rows + h / rows - 3, 24, 3); g.fillRect(x, (j * h) / rows, 1, h / rows);
        x += 24;
      }
    }
  });
  const M = (o) => new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0, ...o });
  return {
    planks: M({ map: planks }), logs: M({ map: logs }), stone: M({ map: stone, roughness: 0.95 }), roof: M({ map: shingles }),
    darkWood: M({ color: 0x4a2e1a }), wood: M({ color: 0x8a6040 }), metal: M({ color: 0x8a8e94, metalness: 0.6, roughness: 0.35 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xa8d0e0, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.28, depthWrite: false }),
    rope: M({ color: 0xb8a272 }),
  };
}

// ---------- Construction des pièces (géométrie + boîtes de collision locales) ----------
// Chaque pièce : group (Object3D), boxes [{c:[x,y,z], h:[hx,hy,hz]}], walk [{type:'box'|'ramp', ...}], sockets [...]
function part(ctx, mat, w, h, d, x, y, z, { collide = true, uv = 1, ry = 0, rx = 0 } = {}) {
  const geo = new THREE.BoxGeometry(w, h, d);
  // UV proportionnels à la taille (texture à l'échelle du mètre)
  const uvA = geo.attributes.uv, pos = geo.attributes.position, nrm = geo.attributes.normal;
  for (let i = 0; i < uvA.count; i++) {
    const nx = Math.abs(nrm.getX(i)), ny = Math.abs(nrm.getY(i));
    const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
    const u = nx > 0.5 ? pz : px, v = ny > 0.5 ? pz : py;
    uvA.setXY(i, (u + x) / (uv * 1.5), (v + y) / (uv * 1.5));
  }
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, 0);
  m.castShadow = true; m.receiveShadow = true;
  ctx.group.add(m);
  if (collide) ctx.boxes.push({ c: [x, y, z], h: [w / 2, h / 2, d / 2] });
  return m;
}

const S = (type, x, y, z, ry = 0, e = null) => ({ type, p: [x, y, z], r: ry, e });

export function buildPiece(def, M) {
  const ctx = { group: new THREE.Group(), boxes: [], walk: [], sockets: [] };
  def.make(ctx, M);
  // Murs : la boîte de collision s'arrête 20 cm sous le sommet (le plancher de l'étage se pose dessus)
  if (def.wall) for (const b of ctx.boxes) { const top = b.c[1] + b.h[1]; if (top > WALL_H - 0.2) { const bot = b.c[1] - b.h[1], nt = WALL_H - 0.2; b.c[1] = (bot + nt) / 2; b.h[1] = (nt - bot) / 2; } }
  ctx.group.traverse((o) => { if (o.isMesh) o.userData.piece = true; });
  return ctx;
}

const foundSockets = (ctx, neigh) => {
  for (const [x, z] of [[G, 0], [-G, 0], [0, G], [0, -G]]) ctx.sockets.push(S(neigh, x, 0, z, 0));
  ctx.sockets.push(S("wall", 0, 0, G / 2, 0), S("wall", 0, 0, -G / 2, 0), S("wall", G / 2, 0, 0, Math.PI / 2), S("wall", -G / 2, 0, 0, Math.PI / 2));
  ctx.sockets.push(S("stairs", 0, 0, 0, 0), S("roof", 0, 0, 0, 0));
};
const wallSockets = (ctx) => {
  ctx.sockets.push(S("wall", 0, WALL_H, 0, 0), S("floor", 0, WALL_H, G / 2, 0), S("floor", 0, WALL_H, -G / 2, 0));
};

export const PIECES = {
  // ----- Fondations & sols
  fondation_bois: { name: "Fondation en bois", icon: "🟫", cat: "Fondations et sols", cost: { bois: 6 }, snap: ["foundation"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      part(c, M.planks, G, 0.3, G, 0, -0.15, 0);
      part(c, M.logs, G, 0.3, 0.3, 0, -0.45, G / 2 - 0.15, { collide: false }); part(c, M.logs, G, 0.3, 0.3, 0, -0.45, -G / 2 + 0.15, { collide: false });
      for (const [x, z] of [[1.3, 1.3], [-1.3, 1.3], [1.3, -1.3], [-1.3, -1.3], [0, 0]]) part(c, M.logs, 0.3, 3, 0.3, x, -1.8, z, { collide: false });
      c.walk.push({ type: "box", c: [0, 0, 0], h: [G / 2, G / 2] });
      foundSockets(c, "foundation");
    } },
  fondation_pierre: { name: "Fondation en pierre", icon: "⬛", cat: "Fondations et sols", cost: { pierre: 8 }, snap: ["foundation"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      part(c, M.stone, G, 3, G, 0, -1.5, 0);
      c.walk.push({ type: "box", c: [0, 0, 0], h: [G / 2, G / 2] });
      foundSockets(c, "foundation");
    } },
  plancher: { name: "Plancher", icon: "🪵", cat: "Fondations et sols", cost: { bois: 4 }, snap: ["floor", "foundation"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      part(c, M.planks, G, 0.2, G, 0, -0.1, 0);
      c.walk.push({ type: "box", c: [0, 0, 0], h: [G / 2, G / 2] });
      foundSockets(c, "floor");
    } },
  // ----- Murs
  mur_bois: { wall: true, name: "Mur en rondins", icon: "🧱", cat: "Murs", cost: { bois: 5 }, snap: ["wall"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) { part(c, M.logs, G, WALL_H, WALL_T, 0, WALL_H / 2, 0); wallSockets(c); } },
  mur_planches: { wall: true, name: "Mur en planches", icon: "🚪", cat: "Murs", cost: { bois: 4, branche: 2 }, snap: ["wall"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) { part(c, M.planks, G, WALL_H, WALL_T, 0, WALL_H / 2, 0); wallSockets(c); } },
  mur_pierre: { wall: true, name: "Mur en pierre", icon: "🪨", cat: "Murs", cost: { pierre: 7 }, snap: ["wall"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) { part(c, M.stone, G, WALL_H, WALL_T + 0.1, 0, WALL_H / 2, 0); wallSockets(c); } },
  mur_fenetre: { wall: true, name: "Mur avec fenêtre", icon: "🪟", cat: "Murs", cost: { bois: 5, fibre: 2 }, snap: ["wall"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      part(c, M.logs, G, 1, WALL_T, 0, 0.5, 0);
      part(c, M.logs, G, 0.8, WALL_T, 0, WALL_H - 0.4, 0);
      part(c, M.logs, 0.9, 1.2, WALL_T, -1.05, 1.6, 0); part(c, M.logs, 0.9, 1.2, WALL_T, 1.05, 1.6, 0);
      part(c, M.darkWood, 1.3, 0.08, 0.35, 0, 1.0, 0, { collide: false });
      part(c, M.darkWood, 0.06, 1.2, 0.08, 0, 1.6, 0, { collide: false });
      part(c, M.glass, 1.2, 1.2, 0.03, 0, 1.6, 0, { collide: false });
      c.boxes.push({ c: [0, 1.6, 0], h: [0.6, 0.6, 0.05] });
      wallSockets(c);
    } },
  mur_porte: { wall: true, name: "Mur avec encadrement de porte", icon: "🚪", cat: "Murs", cost: { bois: 4 }, snap: ["wall"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      part(c, M.logs, 0.95, WALL_H, WALL_T, -1.025, WALL_H / 2, 0); part(c, M.logs, 0.95, WALL_H, WALL_T, 1.025, WALL_H / 2, 0);
      part(c, M.logs, 1.1, WALL_H - 2.3, WALL_T, 0, 2.3 + (WALL_H - 2.3) / 2, 0);
      wallSockets(c);
      c.sockets.push(S("door", 0, 0, 0, 0));
    } },
  porte: { name: "Porte", icon: "🚪", cat: "Murs", cost: { bois: 3 }, snap: ["door"], free: false, door: true, rotStep: Math.PI,
    make(c, M) {
      const pivot = new THREE.Group(); pivot.position.set(-0.54, 0, 0); c.group.add(pivot);
      const ctx2 = { group: pivot, boxes: [], walk: [], sockets: [] };
      part(ctx2, M.planks, 1.08, 2.28, 0.08, 0.54, 1.14, 0, { collide: false });
      part(ctx2, M.darkWood, 0.9, 0.1, 0.1, 0.54, 0.5, 0.02, { collide: false }); part(ctx2, M.darkWood, 0.9, 0.1, 0.1, 0.54, 1.8, 0.02, { collide: false });
      part(ctx2, M.metal, 0.06, 0.06, 0.12, 0.98, 1.1, 0.04, { collide: false });
      c.pivot = pivot;
      c.boxes.push({ c: [0, 1.14, 0], h: [0.54, 1.14, 0.06], door: true });
    } },
  // ----- Toits & escaliers
  escalier: { name: "Escalier", icon: "🪜", cat: "Toits et escaliers", cost: { bois: 5 }, snap: ["stairs"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      const n = 8;
      for (let i = 0; i < n; i++) part(c, M.planks, 1.4, 0.12, G / n + 0.02, 0, (i + 1) * (WALL_H / n) - 0.06, -G / 2 + (i + 0.5) * (G / n), { collide: false });
      part(c, M.logs, 0.15, 0.3, G * 1.42, 0.7, WALL_H / 2 - 0.05, 0, { collide: false, rx: -Math.atan2(WALL_H, G) }); part(c, M.logs, 0.15, 0.3, G * 1.42, -0.7, WALL_H / 2 - 0.05, 0, { collide: false, rx: -Math.atan2(WALL_H, G) });
      c.walk.push({ type: "ramp", c: [0, 0, 0], h: [0.75, G / 2], rise: WALL_H });
    } },
  toit: { name: "Toit en pente", icon: "🏠", cat: "Toits et escaliers", cost: { bois: 3, branche: 3 }, snap: ["roof", "floor"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      const ang = Math.atan2(1.6, G), L = Math.hypot(1.6, G) + 0.5;
      part(c, M.roof, G + 0.4, 0.12, L, 0, 0.8, 0, { collide: false, rx: -ang });
    } },
  toit_plat: { name: "Toit plat", icon: "⬜", cat: "Toits et escaliers", cost: { bois: 3, fibre: 2 }, snap: ["floor"], free: "ground", rotStep: Math.PI / 2,
    make(c, M) {
      part(c, M.roof, G + 0.2, 0.2, G + 0.2, 0, 0.1, 0);
      c.walk.push({ type: "box", c: [0, 0.2, 0], h: [G / 2, G / 2] });
      foundSockets(c, "floor");
    } },
  // ----- Clôtures
  piquet: { name: "Piquet (2 m)", icon: "🪵", cat: "Clôtures et portails", cost: { bois: 1 }, snap: ["post"], free: "ground", rotStep: Math.PI / 12,
    make(c, M) { part(c, M.logs, 0.5, 2, 0.5, 0, 1, 0); part(c, M.darkWood, 0.42, 0.08, 0.42, 0, 2.02, 0, { collide: false });
      // une clôture peut partir de chaque face du piquet (puis être orientée librement)
      c.sockets.push(S("fence", 0.25, 0, 0, 0, [0.25, 0, 1]), S("fence", -0.25, 0, 0, 0, [-0.25, 0, -1])); } },
  cloture: { name: "Clôture", icon: "🚧", cat: "Clôtures et portails", cost: { branche: 3, bois: 1 }, snap: ["fence"], free: "ground", rotStep: Math.PI / 12,
    make(c, M) {
      for (const x of [-1.2, 1.2]) part(c, M.logs, 0.16, 1.4, 0.16, x, 0.7, 0, { collide: false });
      for (const y of [0.45, 0.95]) part(c, M.wood, 2.5, 0.1, 0.06, 0, y, 0.06, { collide: false });
      for (let i = 0; i < 7; i++) part(c, M.planks, 0.12, 1.15, 0.03, -0.9 + i * 0.3, 0.62, 0.11, { collide: false });
      c.boxes.push({ c: [0, 0.7, 0.04], h: [1.28, 0.7, 0.12] });
      c.sockets.push(S("fence", 1.25, 0, 0, 0, [1.25, 0, 1]), S("fence", -1.25, 0, 0, 0, [-1.25, 0, -1]), S("post", 1.5, 0, 0, 0), S("post", -1.5, 0, 0, 0));
    } },
  portail: { name: "Portail", icon: "⛩️", cat: "Clôtures et portails", cost: { branche: 3, bois: 2 }, snap: ["fence"], free: "ground", door: true, rotStep: Math.PI / 12,
    make(c, M) {
      for (const x of [-1.2, 1.2]) part(c, M.logs, 0.2, 1.6, 0.2, x, 0.8, 0, { collide: false });
      const pivot = new THREE.Group(); pivot.position.set(-1.1, 0, 0); c.group.add(pivot);
      const ctx2 = { group: pivot, boxes: [], walk: [], sockets: [] };
      for (const y of [0.35, 0.8, 1.2]) part(ctx2, M.wood, 2.2, 0.1, 0.06, 1.1, y, 0, { collide: false });
      part(ctx2, M.wood, 0.1, 1.35, 0.06, 2.15, 0.78, 0, { collide: false }); part(ctx2, M.wood, 0.1, 1.35, 0.06, 0.05, 0.78, 0, { collide: false });
      part(ctx2, M.wood, 0.08, 1.9, 0.05, 1.1, 0.78, 0.01, { collide: false, ry: 0, rx: 0 }).rotation.z = 0.55;
      c.pivot = pivot;
      c.boxes.push({ c: [0, 0.8, 0], h: [1.15, 0.8, 0.1], door: true });
      c.sockets.push(S("fence", 1.25, 0, 0, 0, [1.25, 0, 1]), S("fence", -1.25, 0, 0, 0, [-1.25, 0, -1]));
    } },
};

export const BUILD_CATS = ["Fondations et sols", "Murs", "Toits et escaliers", "Clôtures et portails"];

// ---------- Système de construction ----------
export class BuildSystem {
  constructor(scene, world, props) {
    this.scene = scene;
    this.world = world;
    this.props = props;
    this.M = makeMaterials();
    this.pieces = [];             // pièces posées
    this.meshes = [];             // pour la visée (raycast)
    this.ray = new THREE.Raycaster();
    this.ghost = null;
    this.selected = null;         // id de la pièce en cours de placement
    this.rotUser = 0;
    this.valid = false;
    this.ghostMatOk = new THREE.MeshBasicMaterial({ color: 0x5ee08a, transparent: true, opacity: 0.38, depthWrite: false });
    this.ghostMatBad = new THREE.MeshBasicMaterial({ color: 0xe05a4a, transparent: true, opacity: 0.38, depthWrite: false });
    this.extraDefs = {};          // mobilier (ajouté à l'étape 5)
  }

  def(id) { return PIECES[id] || this.extraDefs[id]; }

  // --- Placement ---
  select(id) {
    this.cancel();
    this.selected = id;
    const built = buildPiece(this.def(id), this.M);
    this.ghost = built.group;
    this.ghostInfo = built;
    this.ghost.traverse((o) => { if (o.isMesh) { o.material = this.ghostMatOk; o.castShadow = false; o.renderOrder = 5; } });
    this.scene.add(this.ghost);
  }

  cancel() {
    if (this.ghost) this.scene.remove(this.ghost);
    this.ghost = null; this.selected = null; this.moving = null;
  }

  rotate(dir = 1) { if (this.selected) this.rotUser += (this.def(this.selected).rotStep || Math.PI / 2) * dir; }

  // Point visé : pièces existantes (raycast) puis terrain (marche le long du rayon)
  aim(cam, maxD = 9) {
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    this.ray.set(cam.position, dir);
    this.ray.far = maxD;
    const hits = this.ray.intersectObjects(this.meshes, false);
    let best = hits.length ? { point: hits[0].point, piece: hits[0].object.userData.owner, dist: hits[0].distance, normal: hits[0].face?.normal } : null;
    for (let t = 0.5; t < (best ? best.dist : maxD); t += 0.25) {
      const p = cam.position.clone().addScaledVector(dir, t);
      if (p.y <= this.world.heightAt(p.x, p.z)) { best = { point: p, piece: null, dist: t }; break; }
    }
    return best;
  }

  worldSockets(piece) {
    const c = Math.cos(piece.rot), s = Math.sin(piece.rot);
    return piece.info.sockets.map((k) => ({
      type: k.type,
      pos: new THREE.Vector3(piece.pos.x + k.p[0] * c + k.p[2] * s, piece.pos.y + k.p[1], piece.pos.z - k.p[0] * s + k.p[2] * c),
      rot: piece.rot + k.r,
      parent: piece,
      sign: k.e ? k.e[2] : 0,
    }));
  }

  // Boîtes englobantes (monde) d'une pièce
  worldBoxes(info, pos, rot, shrink = 0) {
    const c = Math.cos(rot), s = Math.sin(rot);
    return info.boxes.map((b) => {
      const [bx, by, bz] = b.c, [hx, hy, hz] = b.h;
      const wx = pos.x + bx * c + bz * s, wz = pos.z - bx * s + bz * c;
      const ex = Math.abs(hx * c) + Math.abs(hz * s), ez = Math.abs(hx * s) + Math.abs(hz * c);
      return { min: [wx - ex + shrink, pos.y + by - hy + shrink, wz - ez + shrink], max: [wx + ex - shrink, pos.y + by + hy - shrink, wz + ez - shrink], door: b.door, rot, pos, b };
    });
  }

  update(cam, inv) {
    if (!this.ghost) return;
    const d = this.def(this.selected);
    let hit = this.aim(cam);
    if (!hit) { // rien de visé à portée : point virtuel devant soi (pour accrocher en hauteur)
      const dd = new THREE.Vector3(); cam.getWorldDirection(dd);
      hit = { point: cam.position.clone().addScaledVector(dd, 6), piece: null, dist: 6, air: true };
    }
    this.ghost.visible = true;
    let pos = hit.point.clone(), rot = Math.round((cam.rotation.y + this.rotUser) / d.rotStep) * d.rotStep, snapped = false;
    // Recherche du point d'accroche compatible le plus proche
    // Accroche : le point compatible le plus proche du point visé OU de la ligne du regard
    let best = null, bd = d.snapRadius || 2.2;
    const dir = new THREE.Vector3(); cam.getWorldDirection(dir);
    const v = new THREE.Vector3();
    for (const p of this.pieces) {
      if (p.pos.distanceToSquared(cam.position) > 196) continue;
      for (const sk of this.worldSockets(p)) {
        if (!d.snap || !d.snap.includes(sk.type)) continue;
        if (this.occupied(sk, this.selected)) continue;
        v.copy(sk.pos).sub(cam.position);
        const t = v.dot(dir);
        if (t < 0.5 || t > 10) continue;
        const perp = v.addScaledVector(dir, -t).length();
        const dd = Math.min(sk.pos.distanceTo(hit.point), perp * 1.4);
        if (dd < bd) { bd = dd; best = sk; }
      }
    }
    if (best && best.sign) {
      // Clôtures bout à bout : la nouvelle part de l'extrémité, dans la direction choisie (rotation libre)
      rot = best.rot + this.rotUser;
      const half = d.halfLen || 1.25;
      pos.set(best.pos.x + Math.cos(rot) * half * best.sign, best.pos.y, best.pos.z - Math.sin(rot) * half * best.sign);
      pos.y = Math.max(best.pos.y, this.world.heightAt(pos.x, pos.z) - 0.1);
      snapped = true;
    } else if (best) {
      pos.copy(best.pos);
      rot = best.rot + (d.rotStep < Math.PI / 2 || this.selected === "escalier" || this.selected === "toit" || d.furniture ? this.rotUser : 0);
      snapped = true;
    } else if (d.free === "ground" || d.free === "surface") {
      // Pose libre : sur le sol, ou sur la surface praticable visée (plancher…)
      const g = this.groundAt(pos.x, pos.z, pos.y + 0.3);
      pos.y = Math.max(this.world.heightAt(pos.x, pos.z), g);
      if (this.selected.startsWith("fondation")) {
        // le dessus de la fondation dépasse du point le plus haut du terrain sous elle
        let top = -1e9;
        for (const [x, z] of [[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4], [0, 0]]) top = Math.max(top, this.world.heightAt(pos.x + x, pos.z + z));
        pos.y = top + 0.3;
      }
    } else { this.ghost.visible = false; this.valid = false; this.reason = "Vise un point d'accroche"; return; }
    if (!snapped && hit.air) { this.ghost.visible = false; this.valid = false; this.reason = "Vise le sol ou une construction"; return; }
    this.ghost.position.copy(pos);
    this.ghost.rotation.set(0, rot, 0);
    this.gPos = pos; this.gRot = rot; this.gSnap = best;
    // Validité : ressources, eau, chevauchements
    let ok = Object.entries(d.cost).every(([k, n]) => inv.count(k) >= n);
    this.reason = ok ? "" : "Ressources insuffisantes";
    if (ok && this.world.waterLevelAt(pos.x, pos.z) > this.world.heightAt(pos.x, pos.z) + 0.3 && !snapped) { ok = false; this.reason = "Impossible dans l'eau"; }
    if (ok && pos.distanceTo(cam.position) > 9.5) { ok = false; this.reason = "Trop loin"; }
    if (ok) {
      const mine = this.worldBoxes(this.ghostInfo, pos, rot, 0.14);   // tolérance : les angles de murs se recouvrent légèrement
      for (const p of this.pieces) {
        if (p === this.moving || (best && p === best.parent && best.sign)) continue;
        for (const a of mine) for (const b of p.wboxes) if (a.min[0] < b.max[0] && a.max[0] > b.min[0] && a.min[1] < b.max[1] && a.max[1] > b.min[1] && a.min[2] < b.max[2] && a.max[2] > b.min[2]) { ok = false; }
      }
      if (!ok) this.reason = "Ça chevauche une autre construction";
      // Arbres et rochers
      if (ok) for (const a of mine) {
        const cx = (a.min[0] + a.max[0]) / 2, cz = (a.min[2] + a.max[2]) / 2, R = Math.hypot(a.max[0] - a.min[0], a.max[2] - a.min[2]) / 2 + 1;
        this.props.query(cx, cz, R, (id, q) => {
          if (!q.alive || !q.r0 || q.y > a.max[1] + 0.5) return;
          if (q.x + q.r0 > a.min[0] && q.x - q.r0 < a.max[0] && q.z + q.r0 > a.min[2] && q.z - q.r0 < a.max[2] && q.y < a.max[1]) { ok = false; this.reason = "Un arbre ou un rocher gêne"; }
        });
      }
    }
    this.valid = ok;
    const mat = ok ? this.ghostMatOk : this.ghostMatBad;
    this.ghost.traverse((o) => { if (o.isMesh) o.material = mat; });
  }

  occupied(sk, id) {
    // Un point d'accroche est pris si une pièce compatible y est déjà
    if (sk.sign) return false;   // extrémités de clôture : toujours libres (on peut faire des angles)
    for (const p of this.pieces) if (p.pos.distanceToSquared(sk.pos) < 0.04 && (p.type === id || (this.def(p.type).snap || []).includes(sk.type))) return true;
    return false;
  }

  place(inv, state) {
    if (!this.ghost || !this.valid) return false;
    const d = this.def(this.selected);
    if (this.moving) { this.moving = null; } else for (const [k, n] of Object.entries(d.cost)) inv.remove(k, n);
    const p = this.add(this.selected, this.gPos, this.gRot, state || {});
    return p;
  }

  add(type, pos, rot, state = {}) {
    const d = this.def(type);
    const info = buildPiece(d, this.M);
    info.group.position.copy(pos);
    info.group.rotation.y = rot;
    this.scene.add(info.group);
    const piece = { type, pos: pos.clone(), rot, info, group: info.group, state: { ...state } };
    piece.wboxes = this.worldBoxes(info, piece.pos, rot);
    info.group.traverse((o) => { if (o.isMesh) { o.userData.owner = piece; this.meshes.push(o); } });
    if (d.door && state.open) this.setDoor(piece, true, true);
    if (d.onAdd) d.onAdd(piece, this);
    this.pieces.push(piece);
    return piece;
  }

  remove(piece) {
    const i = this.pieces.indexOf(piece);
    if (i < 0) return;
    this.pieces.splice(i, 1);
    this.scene.remove(piece.group);
    this.meshes = this.meshes.filter((m) => m.userData.owner !== piece);
    const d = this.def(piece.type);
    if (d.onRemove) d.onRemove(piece, this);
  }

  // Démonter : rend toutes les ressources (et le contenu des coffres)
  dismantle(piece, inv) {
    const d = this.def(piece.type);
    for (const [k, n] of Object.entries(d.cost)) inv.add(k, n);
    if (piece.state.items) for (const [k, n] of Object.entries(piece.state.items)) inv.add(k, n);
    this.remove(piece);
  }

  // Déplacer : on reprend la pièce et on repasse en mode placement (sans payer)
  pickUp(piece) {
    const type = piece.type, state = piece.state;
    this.remove(piece);
    this.select(type);
    this.moving = { type, state };
    this.movingState = state;
  }

  setDoor(piece, open, instant = false) {
    piece.state.open = open;
    piece.doorTarget = open ? -Math.PI / 2 * 0.95 : 0;
    if (instant && piece.info.pivot) piece.info.pivot.rotation.y = piece.doorTarget;
  }

  animate(dt) {
    for (const p of this.pieces) {
      if (p.info.pivot && p.doorTarget !== undefined) {
        const r = p.info.pivot.rotation;
        r.y += (p.doorTarget - r.y) * Math.min(1, dt * 6);
      }
      const d = this.def(p.type);
      if (d.tick) d.tick(p, dt, this);
    }
  }

  // Pièce visée (pour ouvrir, démonter, utiliser un meuble)
  pickPiece(cam, maxD = 4) {
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    this.ray.set(cam.position, dir);
    this.ray.far = maxD;
    const hits = this.ray.intersectObjects(this.meshes, false);
    return hits.length ? { piece: hits[0].object.userData.owner, dist: hits[0].distance } : null;
  }

  // Hauteur de la surface praticable la plus haute sous (x, z), sans dépasser footY + marche
  groundAt(x, z, footY, step = 0.6) {
    let best = -1e9;
    for (const p of this.pieces) {
      if (Math.abs(p.pos.x - x) > 4 || Math.abs(p.pos.z - z) > 4) continue;
      const c = Math.cos(-p.rot), s = Math.sin(-p.rot);
      const dx = x - p.pos.x, dz = z - p.pos.z;
      const lx = dx * c + dz * s, lz = -dx * s + dz * c;
      for (const w of p.info.walk) {
        if (Math.abs(lx - w.c[0]) > w.h[0] || Math.abs(lz - w.c[2]) > w.h[1]) continue;
        let y = p.pos.y + w.c[1];
        if (w.type === "ramp") y += Math.max(0, Math.min(w.rise, ((lz - w.c[2] + w.h[1]) / (2 * w.h[1])) * w.rise));
        if (y <= footY + step && y > best) best = y;
      }
    }
    return best;
  }

  // Collision cylindre (joueur, animal) contre murs, portes fermées, clôtures, meubles
  collide(pos, radius, height = 1.7) {
    for (const p of this.pieces) {
      if (Math.abs(p.pos.x - pos.x) > 6 || Math.abs(p.pos.z - pos.z) > 6) continue;
      const c = Math.cos(-p.rot), s = Math.sin(-p.rot);
      for (const b of p.info.boxes) {
        if (b.door && p.state.open) continue;
        const y0 = p.pos.y + b.c[1] - b.h[1], y1 = p.pos.y + b.c[1] + b.h[1];
        if (pos.y + 0.35 > y1 || pos.y + height < y0) continue;     // on passe au-dessus (sol, marche) ou dessous
        const dx = pos.x - p.pos.x, dz = pos.z - p.pos.z;
        let lx = dx * c + dz * s - b.c[0], lz = -dx * s + dz * c - b.c[2];
        const qx = Math.max(-b.h[0], Math.min(b.h[0], lx)), qz = Math.max(-b.h[2], Math.min(b.h[2], lz));
        let ox = lx - qx, oz = lz - qz;
        const d2 = ox * ox + oz * oz;
        if (d2 >= radius * radius) continue;
        if (d2 < 1e-8) {
          // centre à l'intérieur de la boîte : on sort par le côté le plus proche
          const px = b.h[0] - Math.abs(lx), pz = b.h[2] - Math.abs(lz);
          if (px < pz) { lx = Math.sign(lx || 1) * (b.h[0] + radius); } else { lz = Math.sign(lz || 1) * (b.h[2] + radius); }
        } else {
          const d = Math.sqrt(d2);
          lx = qx + (ox / d) * radius; lz = qz + (oz / d) * radius;
        }
        lx += b.c[0]; lz += b.c[2];
        // retour en coordonnées monde
        const cr = Math.cos(p.rot), sr = Math.sin(p.rot);
        pos.x = p.pos.x + lx * cr + lz * sr;
        pos.z = p.pos.z - lx * sr + lz * cr;
      }
    }
  }

  serialize() {
    return this.pieces.map((p) => ({ t: p.type, p: [p.pos.x, p.pos.y, p.pos.z].map((v) => Math.round(v * 1000) / 1000), r: Math.round(p.rot * 10000) / 10000, s: p.state }));
  }

  restore(arr) {
    for (const o of arr || []) if (this.def(o.t)) this.add(o.t, new THREE.Vector3(...o.p), o.r, o.s || {});
  }
}
