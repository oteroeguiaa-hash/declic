// Arbres « réalistes » : écorce texturée, grappes de feuilles et rameaux d'aiguilles en cartes à transparence,
// lumière à contre-jour (les feuilles s'illuminent quand on regarde vers le soleil) et ombres découpées.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

// ---------- Atlas de textures (dessiné une fois sur un canvas) ----------
// u 0.00-0.25 : écorce brune · u 0.25-0.50 : écorce de bouleau (v > 0.06), blanc uni (v < 0.05)
// u 0.50-1.00 / v 0.50-1.00 : grappe de feuilles · u 0.50-1.00 / v 0.00-0.50 : rameau d'aiguilles
export const UV = {
  bark: [0.005, 0.245, 0.0, 1.0],
  birch: [0.255, 0.495, 0.07, 1.0],
  white: [0.375, 0.025],
  leaves: [0.5, 1.0, 0.5, 1.0],
  needles: [0.5, 1.0, 0.0, 0.5],
};

export function makeAtlas(renderer) {
  const S = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d");
  const r = mulberry32(31);
  // Canvas : y vers le bas. La texture est retournée (flipY), donc v=1 en haut du canvas.

  // Écorce brune : stries verticales sinueuses
  g.fillStyle = "#4a3828"; g.fillRect(0, 0, 256, S);
  for (let i = 0; i < 260; i++) {
    const x = r() * 256, w = 1 + r() * 4;
    const light = r() < 0.35;
    g.strokeStyle = light ? `rgba(130,110,90,${0.25 + r() * 0.3})` : `rgba(20,14,10,${0.35 + r() * 0.45})`;
    g.lineWidth = w;
    g.beginPath();
    let px = x;
    g.moveTo(px, 0);
    for (let y = 0; y <= S; y += 24) { px += (r() - 0.5) * 7; g.lineTo(px, y); }
    g.stroke();
  }
  for (let i = 0; i < 90; i++) { // plaques
    g.fillStyle = `rgba(${90 + r() * 40},${70 + r() * 30},${50 + r() * 20},0.35)`;
    g.fillRect(r() * 256, r() * S, 6 + r() * 18, 20 + r() * 60);
  }

  // Bouleau
  g.fillStyle = "#e4e0d6"; g.fillRect(256, 0, 256, S - 52);
  for (let i = 0; i < 220; i++) {
    const y = r() * (S - 52), x = 256 + r() * 256;
    g.fillStyle = `rgba(30,28,25,${0.5 + r() * 0.5})`;
    g.fillRect(x, y, 6 + r() * 34, 1.5 + r() * 3);
  }
  for (let i = 0; i < 25; i++) {
    g.fillStyle = "rgba(25,22,20,0.85)";
    const y = r() * (S - 60), x = 256 + r() * 230;
    g.beginPath(); g.ellipse(x, y, 8 + r() * 20, 4 + r() * 10, 0, 0, 7); g.fill();
  }
  g.fillStyle = "#ffffff"; g.fillRect(256, S - 50, 256, 50);

  // Grappe de feuilles (rameaux + ~420 feuilles)
  const LX = 768, LY = 256, LR = 236;
  g.save();
  g.beginPath(); g.rect(512, 0, 512, 512); g.clip();
  g.strokeStyle = "#3b2c1e"; g.lineCap = "round";
  for (let i = 0; i < 9; i++) {
    const a = r() * Math.PI * 2;
    g.lineWidth = 3 + r() * 3;
    g.beginPath(); g.moveTo(LX, LY + 40);
    g.quadraticCurveTo(LX + Math.cos(a) * 80, LY + Math.sin(a) * 80, LX + Math.cos(a) * LR * 0.85, LY + Math.sin(a) * LR * 0.85);
    g.stroke();
  }
  for (let i = 0; i < 430; i++) {
    const rr = Math.sqrt(r()) * LR * 0.92, a = r() * Math.PI * 2;
    const x = LX + Math.cos(a) * rr, y = LY + Math.sin(a) * rr * 0.92;
    const len = 15 + r() * 13, wid = len * (0.42 + r() * 0.15);
    const shade = rr / LR;
    const gr = 70 + r() * 70 - shade * 20, rd = 40 + r() * 45, bl = 20 + r() * 25;
    g.save();
    g.translate(x, y); g.rotate(r() * Math.PI * 2);
    g.fillStyle = `rgb(${rd | 0},${gr | 0},${bl | 0})`;
    g.beginPath();
    g.moveTo(-len, 0);
    g.quadraticCurveTo(0, -wid, len, 0);
    g.quadraticCurveTo(0, wid, -len, 0);
    g.fill();
    g.strokeStyle = `rgba(200,220,150,0.25)`; g.lineWidth = 1;
    g.beginPath(); g.moveTo(-len * 0.8, 0); g.lineTo(len * 0.8, 0); g.stroke();
    g.restore();
  }
  g.restore();

  // Rameau d'aiguilles (base à gauche, pointe à droite)
  g.save();
  g.beginPath(); g.rect(512, 512, 512, 512); g.clip();
  const cy = 768;
  const twig = (x0, y0, x1, y1, n, len0, wBase) => {
    g.strokeStyle = "#3a2a1c"; g.lineWidth = wBase;
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      const len = len0 * (1 - t * 0.55) * (0.8 + r() * 0.4);
      for (const s of [-1, 1]) {
        const ang = Math.atan2(y1 - y0, x1 - x0) + s * (0.75 + r() * 0.35);
        const gr = 60 + r() * 55;
        g.strokeStyle = `rgb(${25 + r() * 20 | 0},${gr | 0},${30 + r() * 20 | 0})`;
        g.lineWidth = 2.4 + r() * 1.4;
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len); g.stroke();
      }
    }
  };
  twig(520, cy, 1010, cy - 6, 230, 78, 5);
  for (let k = 0; k < 12; k++) {
    const x = 560 + k * 36, s = k % 2 ? 1 : -1;
    twig(x, cy, x + 110 - k * 6, cy + s * (95 - k * 6), 45, 40, 2.5);
  }
  g.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  return tex;
}

// ---------- Construction des maillages ----------
class Builder {
  constructor() { this.pos = []; this.nor = []; this.uv = []; this.col = []; }
  v(p, n, u, v, c) { this.pos.push(p.x, p.y, p.z); this.nor.push(n.x, n.y, n.z); this.uv.push(u, v); this.col.push(c.r, c.g, c.b); }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
    g.computeBoundingSphere();
    return g;
  }

  // Tube le long d'une suite de points (tronc, branches). uv dans une zone de l'atlas.
  tube(points, radii, seg, uvr, color, vScale = 0.25) {
    const [u0, u1, v0, v1] = uvr;
    const frames = [];
    let len = 0;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const next = points[Math.min(i + 1, points.length - 1)], prev = points[Math.max(i - 1, 0)];
      const t = next.clone().sub(prev).normalize();
      const ref = Math.abs(t.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const n1 = new THREE.Vector3().crossVectors(t, ref).normalize();
      const n2 = new THREE.Vector3().crossVectors(t, n1).normalize();
      if (i > 0) len += p.distanceTo(points[i - 1]);
      frames.push({ p, n1, n2, len });
    }
    const ring = (f, k, r) => {
      const a = (k / seg) * Math.PI * 2;
      const n = f.n1.clone().multiplyScalar(Math.cos(a)).addScaledVector(f.n2, Math.sin(a));
      return { p: f.p.clone().addScaledVector(n, r), n };
    };
    const c = new THREE.Color();
    for (let i = 0; i < frames.length - 1; i++) {
      for (let k = 0; k < seg; k++) {
        const a = ring(frames[i], k, radii[i]), b = ring(frames[i], k + 1, radii[i]);
        const cc = ring(frames[i + 1], k, radii[i + 1]), d = ring(frames[i + 1], k + 1, radii[i + 1]);
        const ua = u0 + (u1 - u0) * (k / seg), ub = u0 + (u1 - u0) * ((k + 1) / seg);
        const va = v0 + ((frames[i].len * vScale) % 1) * (v1 - v0) * 0.999;
        let vb = va + (frames[i + 1].len - frames[i].len) * vScale * (v1 - v0);
        if (vb > v1) vb = v1;
        const ao0 = Math.min(1, 0.55 + frames[i].p.y * 0.25), ao1 = Math.min(1, 0.55 + frames[i + 1].p.y * 0.25);
        const c0 = c.clone().copy(color).multiplyScalar(ao0), c1 = c.clone().copy(color).multiplyScalar(ao1);
        this.v(a.p, a.n, ua, va, c0); this.v(cc.p, cc.n, ua, vb, c1); this.v(b.p, b.n, ub, va, c0);
        this.v(b.p, b.n, ub, va, c0); this.v(cc.p, cc.n, ua, vb, c1); this.v(d.p, d.n, ub, vb, c1);
      }
    }
  }

  // Carte (quad) à transparence, normales « sphériques » autour du centre du houppier pour un éclairage doux.
  card(center, right, up, w, h, uvr, color, crown, normalUp = 0.3) {
    const [u0, u1, v0, v1] = uvr;
    const corners = [[-1, -1, u0, v0], [1, -1, u1, v0], [1, 1, u1, v1], [-1, 1, u0, v1]];
    const pts = corners.map(([sx, sy, u, v]) => {
      const p = center.clone().addScaledVector(right, sx * w / 2).addScaledVector(up, sy * h / 2);
      const n = p.clone().sub(crown).normalize();
      n.y += normalUp; n.normalize();
      return { p, n, u, v };
    });
    const [a, b, cc, d] = pts;
    const col = (p) => {
      const k = Math.min(1, Math.max(0.35, 0.45 + (p.y - crown.y) * 0.18 + p.clone().sub(crown).length() * 0.12));
      return color.clone().multiplyScalar(k);
    };
    this.v(a.p, a.n, a.u, a.v, col(a.p)); this.v(b.p, b.n, b.u, b.v, col(b.p)); this.v(cc.p, cc.n, cc.u, cc.v, col(cc.p));
    this.v(a.p, a.n, a.u, a.v, col(a.p)); this.v(cc.p, cc.n, cc.u, cc.v, col(cc.p)); this.v(d.p, d.n, d.u, d.v, col(d.p));
  }

  // Grappe = 3 cartes croisées orientées au hasard.
  cluster(center, size, uvr, color, crown, rand, n = 3) {
    for (let i = 0; i < n; i++) {
      const nrm = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize();
      const right = new THREE.Vector3().crossVectors(nrm, new THREE.Vector3(rand() - 0.5, 1, rand() - 0.5)).normalize();
      const up = new THREE.Vector3().crossVectors(right, nrm).normalize();
      const s = size * (0.8 + rand() * 0.4);
      this.card(center, right, up, s, s, uvr, color, crown);
    }
  }

  // Petite sphère pleine (baies) utilisant le blanc de l'atlas.
  blob(center, r, color) {
    const geo = new THREE.IcosahedronGeometry(r, 0);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i));
      this.v(v.clone().add(center), v.clone().normalize(), UV.white[0], UV.white[1], color);
    }
  }
}

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const tint = (hex, k = 1) => new THREE.Color(hex).multiplyScalar(k);

function trunkPoints(h, steps, lean, rand) {
  const pts = [];
  let x = 0, z = 0;
  const dx = (rand() - 0.5) * lean, dz = (rand() - 0.5) * lean;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    x += dx / steps + (rand() - 0.5) * 0.04; z += dz / steps + (rand() - 0.5) * 0.04;
    pts.push(V(x, -0.3 + t * (h + 0.3), z));
  }
  return pts;
}

function flare(n, r0, r1) {
  // évasement aux racines
  return Array.from({ length: n + 1 }, (_, i) => { const t = i / n; return (r0 + (r1 - r0) * t) * (1 + 0.6 * Math.exp(-t * 14)); });
}

export function makeBroadleaf(lod, seed, birch = false) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const h = birch ? 6.2 : 3.4;
  const steps = lod ? 3 : 8;
  const pts = trunkPoints(h, steps, birch ? 0.5 : 0.3, rand);
  b.tube(pts, flare(steps, birch ? 0.2 : 0.42, birch ? 0.08 : 0.26), lod ? 5 : 9, birch ? UV.birch : UV.bark, tint(birch ? 0xffffff : 0xd8c8b8), birch ? 0.35 : 0.3);
  const top = pts[pts.length - 1];
  const crown = birch ? V(top.x, 6.4, top.z) : V(top.x, 5.9, top.z);
  const R = birch ? V(1.8, 2.6, 1.8) : V(3.3, 2.5, 3.3);
  const leafTint = birch ? tint(0xc8e070, 1.0) : tint(0xa8c070, 0.95);
  // Branches maîtresses
  if (!lod) {
    const nb = birch ? 6 : 5;
    for (let i = 0; i < nb; i++) {
      const a = (i / nb) * Math.PI * 2 + rand() * 0.6;
      const startY = birch ? 2.8 + rand() * 3 : h - 0.3 - rand() * 0.6;
      const s = V(top.x * (startY / h), startY, top.z * (startY / h));
      const e = V(crown.x + Math.cos(a) * R.x * 0.75, crown.y + (rand() - 0.2) * R.y * 0.7, crown.z + Math.sin(a) * R.z * 0.75);
      const m = s.clone().lerp(e, 0.5); m.y += 0.4;
      b.tube([s, m, e], birch ? [0.06, 0.04, 0.015] : [0.17, 0.1, 0.03], 5, birch ? UV.birch : UV.bark, tint(birch ? 0xffffff : 0xc8b8a8), 0.5);
    }
  }
  // Feuillage
  const n = lod ? (birch ? 7 : 9) : (birch ? 22 : 30);
  const size = lod ? (birch ? 2.4 : 3.4) : (birch ? 1.5 : 2.2);
  for (let i = 0; i < n; i++) {
    const dir = V(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1);
    if (dir.length() > 1) { i--; continue; }
    const shell = 0.45 + 0.55 * Math.cbrt(rand());
    dir.normalize().multiplyScalar(shell);
    const p = V(crown.x + dir.x * R.x, crown.y + dir.y * R.y, crown.z + dir.z * R.z);
    const c = leafTint.clone().multiplyScalar(0.85 + rand() * 0.3);
    b.cluster(p, size, UV.leaves, c, crown, rand, lod ? 2 : 3);
  }
  return b.build();
}

export function makeConifer(lod, seed) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const H = 10.5;
  const steps = lod ? 3 : 9;
  const pts = trunkPoints(H, steps, 0.15, rand);
  b.tube(pts, flare(steps, 0.32, 0.04), lod ? 5 : 8, UV.bark, tint(0xb8a898), 0.3);
  const needleTint = tint(0x9cc088);
  const step = lod ? 1.0 : 0.45;
  for (let y = 1.8; y < H - 0.3; y += step * (0.85 + rand() * 0.3)) {
    const t = (y - 1.8) / (H - 1.8);
    const L = 0.5 + 2.7 * Math.pow(1 - t, 0.95);
    const n = lod ? 5 : 7 + Math.floor(rand() * 2);
    const a0 = rand() * Math.PI * 2;
    const tp = pts[Math.min(pts.length - 1, Math.round((y / H) * steps))];
    for (let i = 0; i < n; i++) {
      const a = a0 + (i / n) * Math.PI * 2 + (rand() - 0.5) * 0.4;
      const droop = 0.25 + t * -0.3 + rand() * 0.15;
      const dir = V(Math.cos(a), -droop, Math.sin(a)).normalize();
      const base = V(tp.x, y, tp.z);
      const center = base.clone().addScaledVector(dir, L / 2);
      const side = V(-Math.sin(a), 0, Math.cos(a));
      const flatUp = new THREE.Vector3().crossVectors(dir, side).normalize();
      const crown = V(tp.x, y - 0.6, tp.z);
      const c = needleTint.clone().multiplyScalar(0.8 + rand() * 0.3);
      // carte presque horizontale + carte verticale pour le volume
      b.card(center, dir, side, L, L * 0.62, UV.needles, c, crown, 0.6);
      if (!lod) b.card(center, dir, flatUp, L, L * 0.4, UV.needles, c.clone().multiplyScalar(0.85), crown, 0.6);
    }
  }
  // Cime
  const tip = pts[pts.length - 1];
  for (let i = 0; i < (lod ? 2 : 3); i++) {
    const a = (i / 3) * Math.PI;
    b.card(V(tip.x, H - 0.1, tip.z), V(0, 1, 0), V(Math.cos(a), 0, Math.sin(a)), 1.4, 0.6, UV.needles, needleTint, V(tip.x, H - 1, tip.z), 0.6);
  }
  return b.build();
}

export function makeLeafBush(withBerries, seed = 9) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const crown = V(0, 0.55, 0);
  for (let i = 0; i < 12; i++) {
    const d = V(rand() * 2 - 1, rand() * 0.9 - 0.2, rand() * 2 - 1).normalize().multiplyScalar(0.3 + rand() * 0.5);
    b.cluster(crown.clone().add(d), 0.95, UV.leaves, tint(0x98b468, 0.8 + rand() * 0.3), crown, rand, 2);
  }
  if (withBerries) {
    // Petites grappes de fruits des bois, à moitié cachées dans le feuillage
    for (let g = 0; g < 9; g++) {
      const a = rand() * Math.PI * 2, e = rand() * 1.0 - 0.1;
      const cx = Math.cos(a) * 0.62 * Math.cos(e), cy = 0.55 + Math.sin(e) * 0.5, cz = Math.sin(a) * 0.62 * Math.cos(e);
      const col = rand() < 0.5 ? tint(0x7a0a18) : tint(0x5a0a12);
      for (let k = 0; k < 4; k++) {
        b.blob(V(cx + (rand() - 0.5) * 0.09, cy - k * 0.035 + (rand() - 0.5) * 0.04, cz + (rand() - 0.5) * 0.09), 0.026 + rand() * 0.01, col.clone().multiplyScalar(0.8 + rand() * 0.4));
      }
    }
  }
  return b.build();
}

// Silhouette très lointaine (3ᵉ niveau de détail) : une forme simple, couleur feuillage.
// ---------- Grands arbres de forêt tempérée (20 à 30 m) ----------
// Hêtre / chêne : long fût nu, grosses branches maîtresses, large couronne tout en haut.
export function makeTallBroadleaf(lod, seed, kind = "beech") {
  const rand = mulberry32(seed);
  const b = new Builder();
  const oak = kind === "oak";
  const H = oak ? 11 : 14;                       // hauteur du fût jusqu'aux premières branches
  const steps = lod ? 3 : 10;
  const pts = trunkPoints(H + 3, steps, oak ? 1.2 : 0.6, rand);
  const barkTint = oak ? tint(0xd8c4b0) : tint(0xc4c2bc, 1.05);   // hêtre : écorce grise et lisse
  b.tube(pts, flare(steps, oak ? 0.68 : 0.55, oak ? 0.36 : 0.3), lod ? 6 : 12, UV.bark, barkTint, oak ? 0.25 : 0.12);
  const top = pts[pts.length - 1];
  const crown = V(top.x, H + 8.5, top.z);
  const R = oak ? V(8.5, 6.5, 8.5) : V(7, 7.5, 7);
  if (lod < 2) {
    const nl = oak ? 6 : 5;
    for (let i = 0; i < nl; i++) {
      const a = (i / nl) * Math.PI * 2 + rand() * 0.5;
      const sy = H - 1.5 + rand() * 3;
      const s0 = V(top.x * (sy / (H + 3)), sy, top.z * (sy / (H + 3)));
      const out = (oak ? 0.75 : 0.55) * (0.7 + rand() * 0.3);
      const e = V(crown.x + Math.cos(a) * R.x * out, crown.y + (rand() - 0.15) * R.y * 0.6, crown.z + Math.sin(a) * R.z * out);
      const m = s0.clone().lerp(e, 0.45); m.y += oak ? 0.5 : 1.5;
      b.tube([s0, m, e], [oak ? 0.3 : 0.24, oak ? 0.18 : 0.15, 0.06], lod ? 4 : 7, UV.bark, barkTint.clone().multiplyScalar(0.95), 0.3);
      if (!lod) for (let k = 0; k < 2; k++) {
        const e2 = e.clone().add(V((rand() - 0.5) * 4, 1 + rand() * 2.5, (rand() - 0.5) * 4));
        b.tube([m.clone().lerp(e, 0.6), e2], [0.08, 0.03], 5, UV.bark, barkTint, 0.4);
      }
    }
  }
  const leafTint = oak ? tint(0x9ab462) : tint(0xb4d070);
  const n = lod === 0 ? 58 : 16;
  const size = lod === 0 ? 3.5 : 6.2;
  for (let i = 0; i < n; i++) {
    const dir = V(rand() * 2 - 1, rand() * 1.6 - 0.6, rand() * 2 - 1);
    if (dir.length() > 1) { i--; continue; }
    dir.normalize().multiplyScalar(0.4 + 0.6 * Math.cbrt(rand()));
    const p = V(crown.x + dir.x * R.x, crown.y + dir.y * R.y, crown.z + dir.z * R.z);
    b.cluster(p, size * (0.8 + rand() * 0.4), UV.leaves, leafTint.clone().multiplyScalar(0.8 + rand() * 0.35), crown, rand, lod ? 2 : 3);
  }
  return b.build();
}

// Pin sylvestre : très haut fût, écorce brun-gris en bas et orangée en haut, houppier en « nuages ».
export function makeScotsPine(lod, seed) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const H = 24;
  const steps = lod ? 3 : 10;
  const pts = trunkPoints(H, steps, 0.9, rand);
  const half = Math.ceil(steps * 0.55);
  b.tube(pts.slice(0, half + 1), flare(half, 0.46, 0.3), lod ? 6 : 10, UV.bark, tint(0xb8aa9c), 0.25);
  b.tube(pts.slice(half), Array.from({ length: steps - half + 1 }, (_, i) => 0.3 - (i / (steps - half)) * 0.2), lod ? 5 : 8, UV.bark, tint(0xe0a070), 0.3);
  const needle = tint(0x9cb878);
  const clouds = lod === 0 ? 8 : 4;
  for (let c = 0; c < clouds; c++) {
    const y = 16 + (c / clouds) * 8 + rand() * 1.2;
    const a = rand() * Math.PI * 2, r = 1.2 + rand() * 2.8 * (1 - c / clouds * 0.5);
    const tp = pts[Math.min(pts.length - 1, Math.round((y / H) * steps))];
    const cc = V(tp.x + Math.cos(a) * r, y + 0.6, tp.z + Math.sin(a) * r);
    if (lod < 2) b.tube([V(tp.x, y - 0.8, tp.z), cc], [0.1, 0.04], 4, UV.bark, tint(0xd09060), 0.4);
    const nf = lod === 0 ? 7 : 4;
    for (let k = 0; k < nf; k++) {
      const fa = (k / nf) * Math.PI * 2 + rand() * 0.5;
      const L = 1.8 + rand() * 0.9;
      const dir = V(Math.cos(fa), 0.12 + rand() * 0.2, Math.sin(fa)).normalize();
      const side = V(-Math.sin(fa), 0, Math.cos(fa));
      b.card(cc.clone().addScaledVector(dir, L * 0.45), dir, side, L, L * 0.7, UV.needles, needle.clone().multiplyScalar(0.8 + rand() * 0.3), V(cc.x, cc.y - 1, cc.z), 0.7);
      if (!lod) b.card(cc.clone().addScaledVector(dir, L * 0.45), dir, V(0, 1, 0), L, L * 0.45, UV.needles, needle.clone().multiplyScalar(0.75), V(cc.x, cc.y - 1, cc.z), 0.7);
    }
  }
  return b.build();
}

// Silhouette très lointaine (3ᵉ niveau de détail) : une forme simple, couleur feuillage.
export function makeTreeImpostor(kind) {
  const b = new Builder();
  const add = (geo, color, top) => {
    const g = geo.index ? geo.toNonIndexed() : geo;
    const p = g.attributes.position, n = g.attributes.normal;
    for (let i = 0; i < p.count; i++) {
      const v = V(p.getX(i), p.getY(i), p.getZ(i));
      b.v(v, V(n.getX(i), n.getY(i), n.getZ(i)), UV.white[0], UV.white[1], color.clone().multiplyScalar(0.55 + 0.45 * Math.min(1, v.y / top)));
    }
  };
  const trunk = (r0, h, col) => { const tr = new THREE.CylinderGeometry(r0 * 0.5, r0, h, 4, 1, true); tr.translate(0, h / 2, 0); add(tr, tint(col), h); };
  if (kind === "pine") {
    const cone = new THREE.ConeGeometry(2.7, 8.6, 7, 1, true); cone.translate(0, 1.6 + 4.3, 0);
    add(cone, tint(0x2f4a28), 8);
    trunk(0.3, 2, 0x4a3828);
  } else if (kind === "birch") {
    const crown = new THREE.IcosahedronGeometry(1, 0);
    crown.scale(1.8, 2.6, 1.8); crown.translate(0, 6.4, 0);
    add(crown, tint(0x5a7a30), 8);
    trunk(0.18, 5, 0xd8d4c8);
  } else if (kind === "young") {
    const crown = new THREE.IcosahedronGeometry(1, 0);
    crown.scale(3.3, 2.5, 3.3); crown.translate(0, 5.9, 0);
    add(crown, tint(0x3e5a24), 8);
    trunk(0.38, 3.6, 0x4a3828);
  } else if (kind === "scots") {
    const crown = new THREE.IcosahedronGeometry(1, 0);
    crown.scale(4, 3.2, 4); crown.translate(0, 20.5, 0);
    add(crown, tint(0x34502a), 24);
    trunk(0.4, 19, 0x8a5a3a);
  } else {
    const oak = kind === "oak";
    const crown = new THREE.IcosahedronGeometry(1, 1);
    crown.scale(oak ? 8.5 : 7, oak ? 6.5 : 7.5, oak ? 8.5 : 7); crown.translate(0, oak ? 19.5 : 22.5, 0);
    add(crown, tint(oak ? 0x3e5a24 : 0x48682a), 28);
    trunk(oak ? 0.6 : 0.5, oak ? 14 : 17, oak ? 0x5a4632 : 0x8a8880);
  }
  return b.build();
}

// Roseaux de marais : touffe de tiges fines et quelques massettes brunes.
export function makeReeds(seed = 13) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const W = UV.white;
  for (let i = 0; i < 16; i++) {
    const a = rand() * Math.PI * 2, r = rand() * 0.45;
    const base = V(Math.cos(a) * r, -0.6, Math.sin(a) * r);
    const H = 1.6 + rand() * 1.1, w = 0.035;
    const lean = V((rand() - 0.5) * 0.4, 0, (rand() - 0.5) * 0.4);
    const side = V(Math.cos(a + 1.57), 0, Math.sin(a + 1.57));
    const col = tint(rand() < 0.3 ? 0xb8a860 : 0x7a9440, 0.8 + rand() * 0.3);
    for (let s = 0; s < 3; s++) {
      const t0 = s / 3, t1 = (s + 1) / 3;
      const p0 = base.clone().addScaledVector(lean, t0 * t0).add(V(0, H * t0, 0));
      const p1 = base.clone().addScaledVector(lean, t1 * t1).add(V(0, H * t1, 0));
      const w0 = w * (1 - t0 * 0.8), w1 = w * (1 - t1 * 0.8);
      const n = V(side.z, 0.3, -side.x).normalize();
      const q = [p0.clone().addScaledVector(side, -w0), p0.clone().addScaledVector(side, w0), p1.clone().addScaledVector(side, w1), p1.clone().addScaledVector(side, -w1)];
      const c0 = col.clone().multiplyScalar(0.55 + 0.45 * t0), c1 = col.clone().multiplyScalar(0.55 + 0.45 * t1);
      b.v(q[0], n, W[0], W[1], c0); b.v(q[1], n, W[0], W[1], c0); b.v(q[2], n, W[0], W[1], c1);
      b.v(q[0], n, W[0], W[1], c0); b.v(q[2], n, W[0], W[1], c1); b.v(q[3], n, W[0], W[1], c1);
    }
    if (i < 5) b.blob(base.clone().addScaledVector(lean, 0.8).add(V(0, H * 0.85, 0)), 0.05, tint(0x4a2e18));
  }
  return b.build();
}

// Corail : colonie ramifiée aux couleurs vives (orange, rose, violet, jaune).
export function makeCoral(seed = 23) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const WH = [0.37, 0.38, 0.005, 0.04];
  const cols = [0xe8703a, 0xd8507a, 0x8a5ad0, 0xe8c040, 0xf0907a];
  const branch = (p, dir, len, r, depth, col) => {
    const e = p.clone().addScaledVector(dir, len);
    const m = p.clone().lerp(e, 0.5).add(V((rand() - 0.5) * 0.06, 0, (rand() - 0.5) * 0.06));
    b.tube([p, m, e], [r, r * 0.8, r * 0.6], 5, WH, col, 1);
    if (depth > 0) for (let k = 0; k < 2 + (rand() < 0.4 ? 1 : 0); k++) {
      const nd = dir.clone().add(V((rand() - 0.5) * 1.2, 0.3 + rand() * 0.4, (rand() - 0.5) * 1.2)).normalize();
      branch(e, nd, len * (0.6 + rand() * 0.2), r * 0.7, depth - 1, col);
    } else b.blob(e, r * 1.3, col.clone().multiplyScalar(1.15));
  };
  for (let c = 0; c < 4; c++) {
    const col = tint(cols[Math.floor(rand() * cols.length)], 0.9 + rand() * 0.2);
    const base = V((rand() - 0.5) * 0.9, -0.1, (rand() - 0.5) * 0.9);
    if (rand() < 0.35) {
      // corail « cerveau » : boule bosselée
      for (let k = 0; k < 6; k++) b.blob(base.clone().add(V((rand() - 0.5) * 0.3, 0.15 + rand() * 0.15, (rand() - 0.5) * 0.3)), 0.16, col);
    } else branch(base, V(0, 1, 0), 0.32, 0.05, 2, col);
  }
  return b.build();
}

// Algues sous-marines : longs rubans ondulants.
export function makeKelp(seed = 17) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const W = UV.white;
  for (let i = 0; i < 6; i++) {
    const a = rand() * Math.PI * 2, r = rand() * 0.5;
    const base = V(Math.cos(a) * r, 0, Math.sin(a) * r);
    const H = 1.5 + rand() * 2.5, w = 0.09 + rand() * 0.05;
    const side = V(Math.cos(a), 0, Math.sin(a));
    const col = tint(rand() < 0.5 ? 0x5a6a20 : 0x3a5a2a, 0.8 + rand() * 0.3);
    const segs = 6;
    for (let s = 0; s < segs; s++) {
      const t0 = s / segs, t1 = (s + 1) / segs;
      const off = (t) => V(Math.sin(t * 5 + i) * 0.15 * t, H * t, Math.cos(t * 4 + i) * 0.15 * t);
      const p0 = base.clone().add(off(t0)), p1 = base.clone().add(off(t1));
      const n = V(side.z, 0.2, -side.x).normalize();
      const q = [p0.clone().addScaledVector(side, -w), p0.clone().addScaledVector(side, w), p1.clone().addScaledVector(side, w), p1.clone().addScaledVector(side, -w)];
      const c0 = col.clone().multiplyScalar(0.5 + 0.5 * t0), c1 = col.clone().multiplyScalar(0.5 + 0.5 * t1);
      b.v(q[0], n, W[0], W[1], c0); b.v(q[1], n, W[0], W[1], c0); b.v(q[2], n, W[0], W[1], c1);
      b.v(q[0], n, W[0], W[1], c0); b.v(q[2], n, W[0], W[1], c1); b.v(q[3], n, W[0], W[1], c1);
    }
  }
  return b.build();
}

// Fougère : frondes arquées (on réutilise la texture du rameau, teintée vert tendre).
export function makeFern(seed = 5) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const crown = V(0, 0.2, 0);
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand() * 0.4;
    const len = 0.7 + rand() * 0.45;
    const lift = 0.55 + rand() * 0.35;
    const dir1 = V(Math.cos(a), lift, Math.sin(a)).normalize();
    const side = V(-Math.sin(a), 0, Math.cos(a));
    const c = tint(0xb8e080, 0.8 + rand() * 0.3);
    // base qui monte, puis pointe qui retombe
    const p1 = dir1.clone().multiplyScalar(len * 0.5);
    b.card(p1.clone().multiplyScalar(0.5), dir1, side, len * 0.5, len * 0.42, [0.5, 0.75, 0.0, 0.5], c, crown, 0.8);
    const dir2 = V(Math.cos(a), -0.35, Math.sin(a)).normalize();
    b.card(p1.clone().addScaledVector(dir2, len * 0.25), dir2, side, len * 0.5, len * 0.32, [0.75, 1.0, 0.0, 0.5], c, crown, 0.8);
  }
  return b.build();
}

// Tronc couché, moussu.
export function makeLog(seed = 3) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const L = 3.6;
  const pts = [];
  for (let i = 0; i <= 6; i++) pts.push(V(-L / 2 + (i / 6) * L, 0.26 + (rand() - 0.5) * 0.04, (rand() - 0.5) * 0.06));
  b.tube(pts, pts.map((_, i) => 0.3 - i * 0.012), 9, UV.bark, tint(0x9a9078), 0.3);
  // mousse sur le dessus
  for (let i = 0; i < 5; i++) {
    const p = V(-L / 2 + 0.4 + rand() * (L - 0.8), 0.5, (rand() - 0.5) * 0.15);
    b.card(p, V(1, 0, 0), V(0, 0, 1), 0.7, 0.35, UV.leaves, tint(0x6a8a3a, 0.7), V(p.x, 0, 0), 0.9);
  }
  // branche cassée
  b.tube([V(0.6, 0.4, 0.1), V(0.9, 0.75, 0.35), V(1.0, 0.95, 0.45)], [0.07, 0.05, 0.02], 5, UV.bark, tint(0x9a9078), 0.5);
  return b.build();
}

// ---------- Matériau partagé ----------
// uniforms partagés avec l'herbe : temps, direction et couleur du soleil.
export const vegUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunCol: { value: new THREE.Color(1, 1, 1) },
};

export function makeVegetationMaterial(atlas) {
  const mat = new THREE.MeshStandardMaterial({ map: atlas, vertexColors: true, roughness: 0.82, metalness: 0, alphaTest: 0.42, side: THREE.DoubleSide, shadowSide: THREE.DoubleSide });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, vegUniforms);
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime;\nvarying float vLeaf;\nvarying vec3 vWPos2;\nvarying vec3 vAut;")
      .replace("#include <color_vertex>", `
  // La couleur d'instance sert de teinte d'automne, appliquée seulement au feuillage (dans le fragment)
  vColor = vec3(1.0);
#ifdef USE_COLOR
  vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
  vAut = instanceColor;
#else
  vAut = vec3(1.0);
#endif`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>
  vLeaf = step(0.5, uv.x);
  vec3 ip = vec3(0.0);
#ifdef USE_INSTANCING
  ip = vec3(instanceMatrix[3]);
#endif
  float hgt = max(0.0, position.y - 1.5);
  float sway = min(hgt, 6.0) * 0.03 + max(0.0, hgt - 6.0) * 0.012;   // les grands arbres oscillent doucement
  float w = sin(uTime * 1.2 + ip.x * 0.13 + ip.z * 0.07) + 0.45 * sin(uTime * 2.6 + ip.z * 0.3);
  transformed.x += w * sway;
  transformed.z += cos(uTime * 1.05 + ip.z * 0.11) * sway * 0.75;
  // frémissement des feuilles
  float fl = sin(uTime * 7.0 + position.x * 3.1 + position.y * 2.3 + position.z * 2.7 + ip.x);
  transformed += normal * fl * 0.035 * vLeaf;`)
      .replace("#include <worldpos_vertex>", `#include <worldpos_vertex>
  vec4 wp2 = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  wp2 = instanceMatrix * wp2;
#endif
  vWPos2 = (modelMatrix * wp2).xyz;`);
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uSunDir;\nuniform vec3 uSunCol;\nvarying float vLeaf;\nvarying vec3 vWPos2;\nvarying vec3 vAut;")
      .replace("#include <color_fragment>", `#include <color_fragment>
  float autK = (1.0 - step(2.99, vAut.r + vAut.g + vAut.b)) * vLeaf;
  float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
  diffuseColor.rgb = mix(diffuseColor.rgb, lum * vAut * 2.6, autK);`)
      .replace("#include <alphatest_fragment>", `
  // Les mipmaps rendent les feuilles transparentes au loin : on compense selon le niveau de détail.
  vec2 dUv = max(abs(dFdx(vMapUv)), abs(dFdy(vMapUv))) * 1024.0;
  diffuseColor.a *= 1.0 + max(0.0, log2(max(dUv.x, dUv.y))) * 0.35;
  #include <alphatest_fragment>`)
      .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  // Translucidité : feuilles éclairées par derrière quand on regarde vers le soleil.
  vec3 toCam = normalize(cameraPosition - vWPos2);
  float back = pow(max(dot(-toCam, uSunDir), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * uSunCol * (back * 1.6 + 0.08) * vLeaf;`);
  };
  return mat;
}
