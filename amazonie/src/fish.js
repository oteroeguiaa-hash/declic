// Vie aquatique de l'Amazone : 13 espèces de poissons (pirarucu, piranhas, tambaqui, néons…) en bancs, tortues, particules en suspension.
// Chaque espèce est un maillage instancié sculpté (loft) ; la queue ondule dans le shader.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

// Corps de poisson : sections le long de z (tête en +z), nageoires dorsale, caudale, pectorales.
function fishGeo(s) {
  const L = s.len, H = s.h, W = s.w;
  const pos = [], col = [], idx = [];
  const C = new THREE.Color();
  const ring = 12, prof = [[-0.5, 0.05, 0.06], [-0.42, 0.22, 0.2], [-0.25, 0.62, 0.55], [0, 0.95, 0.9], [0.18, 1, 1], [0.33, 0.85, 0.85], [0.44, 0.55, 0.55], [0.5, 0.12, 0.15]];
  const color = (z, y, side) => {
    const t = (z / L) + 0.5, v = y / H;                 // t 0 queue → 1 tête ; v -0.5 ventre → 0.5 dos
    C.set(s.belly).lerp(new THREE.Color(s.side), Math.min(1, Math.max(0, (v + 0.3) * 2.2)));
    C.lerp(new THREE.Color(s.back), Math.min(1, Math.max(0, (v - 0.05) * 3)));
    if (s.bars && v > -0.2 && Math.sin(t * s.bars * Math.PI * 2) > 0.45) C.multiplyScalar(0.45);
    if (s.stripe && Math.abs(v - 0.02) < 0.06) C.lerp(new THREE.Color(s.stripe), 0.8);
    if (s.spots && Math.sin(z * 90) * Math.sin(y * 110) > 0.6 && v > -0.1) C.lerp(new THREE.Color(s.spots), 0.7);
    if (s.wavy && v > 0.1 && Math.sin(z * 60 + Math.sin(y * 50) * 2) > 0.3) C.multiplyScalar(0.5);
    if (s.band && t > 0.78 && t < 0.83 && v > -0.1) C.set(s.band);
    if (t > 0.86) C.multiplyScalar(0.85);
    return C;
  };
  for (const [zf, hf, wf] of prof) {
    const z = zf * L;
    for (let k = 0; k < ring; k++) {
      const a = (k / ring) * Math.PI * 2;
      const x = Math.cos(a) * W * 0.5 * wf, y = Math.sin(a) * H * 0.5 * hf;
      pos.push(x, y, z);
      const c = color(z, y, x); col.push(c.r, c.g, c.b);
    }
  }
  const n = prof.length;
  for (let i = 0; i < n - 1; i++) for (let k = 0; k < ring; k++) {
    const a = i * ring + k, b = i * ring + ((k + 1) % ring), c = a + ring, d = b + ring;
    idx.push(a, b, c, b, d, c);
  }
  const fin = (pts, cc) => { const b0 = pos.length / 3; for (const p of pts) { pos.push(...p); const c = new THREE.Color(cc); col.push(c.r, c.g, c.b); } idx.push(b0, b0 + 1, b0 + 2, b0, b0 + 2, b0 + 1); if (pts.length === 4) idx.push(b0, b0 + 2, b0 + 3, b0, b0 + 3, b0 + 2); };
  const fc = s.fin;
  // caudale (fourchue)
  fin([[0, 0, -0.46 * L], [0, H * (s.fork ? 0.75 : 0.55), -0.62 * L], [0, 0, -0.55 * L], [0, -H * (s.fork ? 0.75 : 0.55), -0.62 * L]], fc);
  // dorsale(s)
  fin([[0, H * 0.45, 0.1 * L], [0, H * (0.45 + s.dorsal), -0.02 * L], [0, H * 0.42, -0.15 * L]], fc);
  if (s.dorsal2) fin([[0, H * 0.35, -0.22 * L], [0, H * 0.55, -0.27 * L], [0, H * 0.3, -0.33 * L]], fc);
  // anale, pectorales
  fin([[0, -H * 0.4, -0.18 * L], [0, -H * 0.62, -0.25 * L], [0, -H * 0.32, -0.32 * L]], fc);
  for (const sx of [-1, 1]) fin([[sx * W * 0.35, -H * 0.1, 0.2 * L], [sx * W * 0.9, -H * 0.3, 0.1 * L], [sx * W * 0.4, -H * 0.2, 0.06 * L]], fc);
  // œil
  for (const sx of [-1, 1]) {
    const b0 = pos.length / 3, ez = 0.38 * L, ey = H * 0.12, ex = sx * W * 0.3, r = Math.max(0.004, H * 0.07);
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; pos.push(ex + sx * 0.001, ey + Math.sin(a) * r, ez + Math.cos(a) * r); col.push(0.02, 0.02, 0.02); }
    pos.push(ex + sx * 0.002, ey, ez); col.push(0.01, 0.01, 0.01);
    for (let k = 0; k < 6; k++) sx > 0 ? idx.push(b0 + 6, b0 + k, b0 + ((k + 1) % 6)) : idx.push(b0 + 6, b0 + ((k + 1) % 6), b0 + k);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// habitat : "douce" (rivières, lacs) ou "mer"
export const FISH = {
  pirarucu:  { name: "Pirarucu (arapaïma)", hab: "douce", len: 2.2, h: 0.32, w: 0.26, back: 0x2e3a2c, side: 0x5a6250, belly: 0xc89a7a, spots: 0xb03a2a, fin: 0xb83a2a, dorsal: 0.12, n: [1, 1], sp: 0.7 },
  tambaqui:  { name: "Tambaqui", hab: "douce", len: 0.8, h: 0.38, w: 0.12, back: 0x2e2e26, side: 0x7a7a5a, belly: 0xd8c8a0, fin: 0x2a2a22, dorsal: 0.2, n: [1, 3], sp: 0.8 },
  piranha:   { name: "Piranha à ventre rouge", hab: "douce", len: 0.26, h: 0.15, w: 0.05, back: 0x4a5a5a, side: 0xa8b0b0, belly: 0xd84a2a, spots: 0x7a8a8a, fin: 0x3a3a3a, dorsal: 0.25, n: [8, 16], sp: 1.8 },
  tucunare:  { name: "Tucunaré (cichlidé paon)", hab: "douce", len: 0.6, h: 0.17, w: 0.08, back: 0x3a5a2a, side: 0xc8b840, belly: 0xe8d8a0, bars: 3, fin: 0xd86a2a, dorsal: 0.35, dorsal2: true, n: [1, 3], sp: 1.5 },
  aruana:    { name: "Aruanã", hab: "douce", len: 0.8, h: 0.13, w: 0.05, back: 0x5a6a5a, side: 0xd0d4d0, belly: 0xf0f0ec, fin: 0x8a8a7a, dorsal: 0.5, n: [1, 2], sp: 1.4 },
  pacu:      { name: "Pacu", hab: "douce", len: 0.4, h: 0.26, w: 0.07, back: 0x4a4a42, side: 0xa8aaa0, belly: 0xe08a3a, fin: 0x5a5a50, dorsal: 0.2, n: [3, 6], sp: 1.1 },
  poraque:   { name: "Gymnote électrique (poraquê)", hab: "douce", len: 1.8, h: 0.11, w: 0.1, back: 0x2a2a24, side: 0x4a4a3a, belly: 0xd88a3a, fin: 0x3a3a2a, dorsal: 0.0, n: [1, 1], sp: 0.5 },
  acara:     { name: "Discus", hab: "douce", len: 0.18, h: 0.17, w: 0.03, back: 0x8a5a3a, side: 0xc8803a, belly: 0xe8b060, bars: 9, fin: 0x6a8ac8, dorsal: 0.45, n: [3, 6], sp: 0.9 },
  cardinal:  { name: "Néon cardinal", hab: "douce", len: 0.045, h: 0.012, w: 0.007, back: 0x2a6ad8, side: 0x3a8af0, belly: 0xe02a2a, fin: 0xc8c8d0, dorsal: 0.25, n: [16, 28], sp: 1.4 },
  jaraqui:   { name: "Jaraqui", hab: "douce", len: 0.32, h: 0.09, w: 0.04, back: 0x4a5a6a, side: 0xc8ccd0, belly: 0xf0f0f0, fin: 0xd8b030, dorsal: 0.25, fork: true, n: [10, 20], sp: 1.6 },
  pescada:   { name: "Corvina d'Amazonie", hab: "douce", len: 0.55, h: 0.13, w: 0.07, back: 0x6a7480, side: 0xc4ccd2, belly: 0xf0f2f4, fin: 0x8a8480, dorsal: 0.3, dorsal2: true, n: [2, 4], sp: 1.3 },
  mandi:     { name: "Poisson-chat mandi", hab: "douce", len: 0.3, h: 0.07, w: 0.06, back: 0x5a5040, side: 0xa89a7a, belly: 0xe8e0c8, spots: 0x2a2418, fin: 0x6a6050, dorsal: 0.1, n: [2, 5], sp: 0.9 },
  surubim:   { name: "Surubim tigre", hab: "douce", len: 1.3, h: 0.16, w: 0.16, back: 0x3a3a34, side: 0x9a9a8a, belly: 0xf0ece0, bars: 10, fin: 0x4a4a40, dorsal: 0.08, n: [1, 1], sp: 0.7 },
};

function turtleModel() {
  const shell = new THREE.MeshStandardMaterial({ color: 0x3a3a2c, roughness: 0.55 });   // tortue de l'Amazone (tartaruga)
  const skin = new THREE.MeshStandardMaterial({ color: 0x7a8a6a, roughness: 0.8 });
  const g = new THREE.Group();
  const s = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 10), shell);
  s.scale.set(0.38, 0.13, 0.48);
  g.add(s);
  const belly = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), new THREE.MeshStandardMaterial({ color: 0xd8d0a8, roughness: 0.8 }));
  belly.scale.set(0.34, 0.07, 0.43); belly.position.y = -0.04;
  g.add(belly);
  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), skin);
  head.scale.set(0.09, 0.08, 0.13); head.position.set(0, 0.02, 0.56);
  g.add(head);
  const flippers = [];
  for (const [x, z, len] of [[0.36, 0.22, 0.42], [-0.36, 0.22, 0.42], [0.25, -0.35, 0.18], [-0.25, -0.35, 0.18]]) {
    const piv = new THREE.Group();
    piv.position.set(x, -0.02, z);
    const f = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 6), skin);
    f.scale.set(len, 0.025, 0.09);
    f.position.x = Math.sign(x) * len * 0.8;
    f.rotation.y = Math.sign(x) * (z > 0 ? -0.5 : 0.4);
    piv.add(f);
    g.add(piv);
    flippers.push(piv);
  }
  g.traverse((o) => { if (o.isMesh) o.castShadow = false; });
  return { group: g, flippers };
}

export class Fish {
  constructor(scene, world, quality) {
    this.world = world;
    this.rand = mulberry32(777);
    this.uTime = { value: 0 };
    this.meshes = {};
    this.schools = [];
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.3, metalness: 0.35, side: THREE.DoubleSide });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = this.uTime;
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uTime;")
        .replace("#include <begin_vertex>", `#include <begin_vertex>
  // Ondulation : la queue bat de plus en plus fort vers l'arrière
  float ph = 0.0;
#ifdef USE_INSTANCING
  ph = instanceMatrix[3].x * 3.1 + instanceMatrix[3].z * 1.7;
#endif
  float back = clamp(-position.z * 2.6 + 0.35, 0.0, 1.2);
  transformed.x += sin(uTime * 9.0 + ph - position.z * 9.0) * 0.06 * back * back * (0.5 + abs(position.z) * 2.0);`);
    };
    for (const k in FISH) {
      const max = FISH[k].n[1] * 2;
      const m = new THREE.InstancedMesh(fishGeo(FISH[k]), mat, max);
      m.count = 0; m.frustumCulled = false;
      scene.add(m);
      this.meshes[k] = m;
    }
    for (let s = 0; s < 9; s++) this.schools.push({ pos: new THREE.Vector3(), heading: 0, active: false, type: null, members: [], timer: 0 });
    this.turtles = [0, 1].map(() => { const t = turtleModel(); t.group.visible = false; scene.add(t.group); return { ...t, pos: t.group.position, heading: 0, active: false, phase: 0 }; });
    this.checkTimer = 0;
    // Particules en suspension (visibles seulement sous l'eau)
    const NP = 700, pp = new Float32Array(NP * 3);
    for (let i = 0; i < NP * 3; i++) pp[i] = (this.rand() - 0.5) * 24;
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    this.dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xb8a070, size: 0.035, transparent: true, opacity: 0.7, depthWrite: false, fog: false }));
    this.dust.frustumCulled = false;
    this.dust.visible = false;
    scene.add(this.dust);
    this.m4 = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.e = new THREE.Euler(); this.v = new THREE.Vector3(); this.sc = new THREE.Vector3();
  }

  isSea(x, z) { return Math.hypot(x, z) > this.world.half * 0.92 || (this.world.waterLevelAt(x, z) < 0.3 && this.world.heightAt(x, z) < -3.5 && Math.hypot(x, z) > this.world.half * 0.6); }

  // Point d'eau assez profond près de c (ou null)
  findSpot(c, rMin, rMax, minDepth) {
    for (let t = 0; t < 14; t++) {
      const a = this.rand() * Math.PI * 2, r = rMin + this.rand() * (rMax - rMin);
      const x = c.x + Math.cos(a) * r, z = c.z + Math.sin(a) * r;
      const wl = this.world.waterLevelAt(x, z), g = this.world.heightAt(x, z);
      if (wl - g > minDepth) return new THREE.Vector3(x, g + 0.4 + this.rand() * Math.max(0, wl - g - 0.9), z);
    }
    return null;
  }

  depthAt(x, z) { return this.world.waterLevelAt(x, z) - this.world.heightAt(x, z); }

  particles(dt, cam, under) {
    this.dust.visible = under;
    if (!under) return;
    const a = this.dust.geometry.attributes.position, t = performance.now() * 0.0003;
    for (let i = 0; i < a.count; i++) {
      let x = a.getX(i), y = a.getY(i) + dt * 0.05, z = a.getZ(i);
      // Le nuage reste centré sur le plongeur (repli sur un cube de 24 m)
      const wrap = (v, c) => c + ((((v - c) + 12) % 24) + 24) % 24 - 12;
      x = wrap(x + Math.sin(t + i) * dt * 0.08, cam.x); y = wrap(y, cam.y); z = wrap(z, cam.z);
      a.setXYZ(i, x, y, z);
    }
    a.needsUpdate = true;
  }

  update(dt, cam, day) {
    this.uTime.value += dt;
    const t = performance.now() * 0.001, r = this.rand;
    this.checkTimer -= dt;
    if (this.checkTimer <= 0) {
      this.checkTimer = 1;
      for (const s of this.schools) {
        if (!s.active || s.pos.distanceTo(cam) > 60) {
          const p = this.findSpot(cam, 6, 45, 0.9);
          s.active = !!p;
          if (!p) continue;
          s.pos.copy(p); s.heading = r() * 6.28;
          const sea = this.isSea(p.x, p.z);
          const pool = Object.keys(FISH).filter((k) => FISH[k].len < 0.5 || this.depthAt(p.x, p.z) > 1.6);   // tout est eau douce : le fleuve entoure l'île
          s.type = pool[Math.floor(r() * pool.length)];
          const f = FISH[s.type], n = f.n[0] + Math.floor(r() * (f.n[1] - f.n[0] + 1));
          s.members = [];
          const spread = f.len * 6;
          for (let k = 0; k < n; k++) s.members.push({ off: new THREE.Vector3((r() - 0.5) * spread, (r() - 0.5) * spread * 0.3, (r() - 0.5) * spread), ph: r() * 6.28, sc: 0.8 + r() * 0.4 });
        }
      }
      for (const tu of this.turtles) {
        if (!tu.active || tu.pos.distanceTo(cam) > 60) {
          const p = r() < 0.5 ? this.findSpot(cam, 12, 45, 3.5) : null;
          tu.active = !!p && this.isSea(p.x, p.z);
          tu.group.visible = tu.active;
          if (tu.active) { tu.pos.copy(p); tu.heading = r() * 6.28; }
        }
      }
    }
    const counts = {};
    for (const k in FISH) counts[k] = 0;
    for (const s of this.schools) {
      if (!s.active) continue;
      const f = FISH[s.type], im = this.meshes[s.type];
      s.timer -= dt;
      if (s.timer <= 0) { s.timer = 2 + r() * 3; s.turn = (r() - 0.5) * 1.2; }
      s.heading += (s.turn || 0) * dt;
      const flee = s.pos.distanceTo(cam) < 3.5;
      if (flee) s.heading = Math.atan2(s.pos.x - cam.x, s.pos.z - cam.z);
      const sp = f.sp * (flee ? 2.5 : 1);
      const nx = s.pos.x + Math.sin(s.heading) * sp * dt, nz = s.pos.z + Math.cos(s.heading) * sp * dt;
      if (this.depthAt(nx, nz) < 0.8) s.heading += Math.PI * 0.8; else { s.pos.x = nx; s.pos.z = nz; }
      const wl = this.world.waterLevelAt(s.pos.x, s.pos.z), g = this.world.heightAt(s.pos.x, s.pos.z);
      s.pos.y = Math.min(wl - 0.3, Math.max(g + 0.3, s.pos.y));
      for (const m of s.members) {
        const n = counts[s.type];
        if (n >= im.instanceMatrix.count) break;
        this.v.set(m.off.x + Math.sin(t * 0.7 + m.ph) * f.len, m.off.y + Math.sin(t * 0.9 + m.ph) * 0.1, m.off.z);
        this.v.applyAxisAngle(THREE.Object3D.DEFAULT_UP, s.heading).add(s.pos);
        this.v.y = Math.min(wl - 0.2, Math.max(g + 0.15, this.v.y));
        this.q.setFromEuler(this.e.set(Math.sin(t + m.ph) * 0.08, s.heading + Math.sin(t * 1.3 + m.ph) * 0.15, 0));
        this.m4.compose(this.v, this.q, this.sc.setScalar(m.sc));
        im.setMatrixAt(n, this.m4);
        counts[s.type]++;
      }
    }
    for (const k in FISH) { const im = this.meshes[k]; im.count = counts[k]; im.visible = counts[k] > 0; im.instanceMatrix.needsUpdate = true; }

    for (const tu of this.turtles) {
      if (!tu.active) continue;
      tu.phase += dt * 2.2;
      tu.heading += Math.sin(t * 0.2 + tu.phase * 0.05) * dt * 0.3;
      const nx = tu.pos.x + Math.sin(tu.heading) * 0.8 * dt, nz = tu.pos.z + Math.cos(tu.heading) * 0.8 * dt;
      if (this.depthAt(nx, nz) < 2) tu.heading += Math.PI * 0.7; else { tu.pos.x = nx; tu.pos.z = nz; }
      const wl = this.world.waterLevelAt(tu.pos.x, tu.pos.z), g = this.world.heightAt(tu.pos.x, tu.pos.z);
      tu.pos.y = Math.min(wl - 0.35, Math.max(g + 0.6, tu.pos.y + Math.sin(t * 0.3) * dt * 0.3));
      tu.group.rotation.set(Math.sin(tu.phase) * 0.05, tu.heading, 0);
      tu.flippers.forEach((f, i) => { f.rotation.z = Math.sin(tu.phase + (i < 2 ? 0 : 1.5)) * (i < 2 ? 0.6 : 0.3) * (i % 2 ? -1 : 1); });
    }
  }
}
