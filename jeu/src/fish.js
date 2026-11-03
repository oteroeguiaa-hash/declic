// Vie sous-marine : bancs de poissons et tortues de mer, autour du joueur quand il y a de l'eau profonde.
import * as THREE from "three";
import { mergeGeometries } from "../vendor/addons/BufferGeometryUtils.js";
import { mulberry32 } from "./noise.js";

function colorize(geo, fn) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  g.deleteAttribute("uv");
  const p = g.attributes.position, col = new Float32Array(p.count * 3), c = new THREE.Color();
  for (let i = 0; i < p.count; i++) { fn(p.getX(i), p.getY(i), p.getZ(i), c); col.set([c.r, c.g, c.b], i * 3); }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
}

function fishGeometry() {
  const body = new THREE.SphereGeometry(1, 10, 6);
  body.scale(0.055, 0.1, 0.26);
  const b = colorize(body, (x, y, z, c) => c.setRGB(0.25, 0.3, 0.35).lerp(new THREE.Color(0.95, 0.95, 0.9), y < 0 ? 0.8 : 0.1 + (y + 0.1) * 0));
  const tail = new THREE.BufferGeometry();
  tail.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, -0.22, 0, 0.09, -0.36, 0, -0.09, -0.36], 3));
  tail.computeVertexNormals();
  const t = colorize(tail, (x, y, z, c) => c.setRGB(0.4, 0.45, 0.5));
  const g = mergeGeometries([b, t]);
  g.computeVertexNormals();
  return g;
}

function turtleModel() {
  const shell = new THREE.MeshStandardMaterial({ color: 0x4a5a32, roughness: 0.6 });
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

const SPECIES = [
  [0.75, 0.78, 0.82], // argenté
  [1.0, 0.75, 0.25],  // doré
  [0.35, 0.55, 0.95], // bleu
  [1.0, 0.45, 0.2],   // orangé
  [0.55, 0.7, 0.45],  // vert (truite)
];

export class Fish {
  constructor(scene, world, quality) {
    this.world = world;
    this.rand = mulberry32(777);
    this.perSchool = quality.name === "low" ? 10 : 16;
    this.schools = [];
    const count = this.perSchool * 6;
    this.mesh = new THREE.InstancedMesh(fishGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.3 }), count);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3).fill(1), 3);
    this.mesh.frustumCulled = false;
    this.mesh.count = 0;
    scene.add(this.mesh);
    for (let s = 0; s < 6; s++) {
      const members = [];
      for (let k = 0; k < this.perSchool; k++) {
        members.push({ off: new THREE.Vector3((this.rand() - 0.5) * 3, (this.rand() - 0.5) * 1.2, (this.rand() - 0.5) * 3), ph: this.rand() * 6.28, sp: 0.8 + this.rand() * 0.4 });
      }
      this.schools.push({ pos: new THREE.Vector3(), heading: this.rand() * 6.28, speed: 1.2, active: false, color: SPECIES[s % SPECIES.length], members, timer: 0 });
    }
    this.turtles = [0, 1].map(() => { const t = turtleModel(); t.group.visible = false; scene.add(t.group); return { ...t, pos: t.group.position, heading: 0, active: false, phase: 0 }; });
    this.checkTimer = 0;
    // Particules en suspension (visibles seulement sous l'eau)
    const NP = 700, pp = new Float32Array(NP * 3);
    for (let i = 0; i < NP * 3; i++) pp[i] = (this.rand() - 0.5) * 24;
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    this.dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xcfe8e0, size: 0.04, transparent: true, opacity: 0.55, depthWrite: false, fog: false }));
    this.dust.frustumCulled = false;
    this.dust.visible = false;
    scene.add(this.dust);
    this.m4 = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.e = new THREE.Euler(); this.v = new THREE.Vector3(); this.one = new THREE.Vector3(1, 1, 1);
  }

  // Point d'eau profonde au hasard près de c (ou null)
  findSpot(c, rMin, rMax, minDepth) {
    for (let t = 0; t < 12; t++) {
      const a = this.rand() * Math.PI * 2, r = rMin + this.rand() * (rMax - rMin);
      const x = c.x + Math.cos(a) * r, z = c.z + Math.sin(a) * r;
      const wl = this.world.waterLevelAt(x, z), g = this.world.heightAt(x, z);
      if (wl - g > minDepth) return new THREE.Vector3(x, g + 0.6 + this.rand() * (wl - g - 1.4), z);
    }
    return null;
  }

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

  depthAt(x, z) { return this.world.waterLevelAt(x, z) - this.world.heightAt(x, z); }

  update(dt, cam, day) {
    const t = performance.now() * 0.001;
    this.checkTimer -= dt;
    if (this.checkTimer <= 0) {
      this.checkTimer = 1;
      for (const s of this.schools) {
        if (!s.active || s.pos.distanceTo(cam) > 55) {
          const p = this.findSpot(cam, 8, 40, 2.2);
          s.active = !!p;
          if (p) { s.pos.copy(p); s.heading = this.rand() * 6.28; }
        }
      }
      for (const tu of this.turtles) {
        if (!tu.active || tu.pos.distanceTo(cam) > 60) {
          const p = this.rand() < 0.5 ? this.findSpot(cam, 12, 45, 3.5) : null;
          tu.active = !!p;
          tu.group.visible = tu.active;
          if (p) { tu.pos.copy(p); tu.heading = this.rand() * 6.28; }
        }
      }
    }
    let n = 0;
    const arr = this.mesh.instanceColor.array;
    for (const s of this.schools) {
      if (!s.active) continue;
      // Le banc tourne au hasard, évite les hauts-fonds et s'écarte du nageur
      s.timer -= dt;
      if (s.timer <= 0) { s.timer = 2 + this.rand() * 3; s.turn = (this.rand() - 0.5) * 1.2; }
      s.heading += (s.turn || 0) * dt;
      const flee = s.pos.distanceTo(cam) < 4;
      if (flee) s.heading = Math.atan2(s.pos.x - cam.x, s.pos.z - cam.z);
      const sp = flee ? 3.5 : 1.2;
      const nx = s.pos.x + Math.sin(s.heading) * sp * dt, nz = s.pos.z + Math.cos(s.heading) * sp * dt;
      if (this.depthAt(nx, nz) < 1.4) s.heading += Math.PI * 0.8; else { s.pos.x = nx; s.pos.z = nz; }
      const wl = this.world.waterLevelAt(s.pos.x, s.pos.z), g = this.world.heightAt(s.pos.x, s.pos.z);
      s.pos.y = Math.min(wl - 0.5, Math.max(g + 0.5, s.pos.y));
      for (const m of s.members) {
        const wig = Math.sin(t * 9 * m.sp + m.ph);
        this.v.set(m.off.x + Math.sin(t * 0.7 + m.ph) * 0.5, m.off.y + Math.sin(t * 0.9 + m.ph) * 0.2, m.off.z);
        this.v.applyAxisAngle(THREE.Object3D.DEFAULT_UP, s.heading).add(s.pos);
        this.v.y = Math.min(wl - 0.3, Math.max(g + 0.3, this.v.y));
        this.q.setFromEuler(this.e.set(0, s.heading + wig * 0.18, wig * 0.05));
        this.m4.compose(this.v, this.q, this.one);
        this.mesh.setMatrixAt(n, this.m4);
        arr.set(s.color, n * 3);
        n++;
      }
    }
    this.mesh.count = n;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor.needsUpdate = true;

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
