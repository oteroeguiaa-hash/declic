// Oiseaux : 25 espèces européennes avec leurs comportements (sautiller au sol, voler d'arbre en arbre,
// tournoyer en vol plané, raser l'eau, pêcher à l'affût dans les hauts-fonds).
import * as THREE from "three";
import { buildBird } from "./anatomy.js";
import { mulberry32 } from "./noise.js";

// Ailes repliées le long du corps : envergure vers l'arrière, plat contre le flanc
const FOLD_R = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, -0.15, -1).normalize(), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, -0.15).normalize()));
const FOLD_L = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0.15, 1).normalize(), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, -0.15).normalize()));

export const BIRDS = {
  rougegorge: { name: "Rouge-gorge", kind: "small", w: 3, size: 0.14, col: 0x7a6a4a, breast: 0xd8662a, belly: 0xece4d4, span: 0.85, legs: 0.15, tail: 0.35 },
  mesange:    { name: "Mésange bleue", kind: "small", w: 3, size: 0.12, col: 0x7a9a5a, crown: 0x3a78c8, cheek: 0xf4f4f0, belly: 0xe8d040, wing: 0x4a78b8, head: null, span: 0.85, legs: 0.12, tail: 0.35 },
  merle:      { name: "Merle noir", kind: "small", w: 3, size: 0.25, col: 0x1a1816, beakCol: 0xe8a020, span: 0.8, legs: 0.12, tail: 0.45 },
  geai:       { name: "Geai des chênes", kind: "small", w: 2, size: 0.34, col: 0xc8a090, belly: 0xd8c0b0, wing: 0x2a2a2c, wingBar: 0x3a6ad0, crown: 0xe8e0d8, span: 0.85, legs: 0.1, tail: 0.4 },
  pie:        { name: "Pie bavarde", kind: "small", w: 2, size: 0.44, col: 0x14161a, belly: 0xf4f4f4, wingBar: 0xf4f4f4, span: 0.75, legs: 0.1, tail: 0.75 },
  corneille:  { name: "Corneille noire", kind: "flock", w: 2, size: 0.47, col: 0x121214, span: 0.95, legs: 0.1, tail: 0.38 },
  buse:       { name: "Buse variable", kind: "raptor", w: 1, size: 0.55, col: 0x6a4a30, belly: 0xdccca8, hook: true, beakCol: 0x3a3028, beak: 0.05, span: 1.15, tail: 0.35 },
  picvert:    { name: "Pic vert", kind: "small", w: 1.5, size: 0.32, col: 0x6a8a3a, crown: 0xc82a2a, belly: 0xb8c890, beak: 0.06, span: 0.85, legs: 0.08, tail: 0.32 },
  martin:     { name: "Martin-pêcheur", kind: "water", w: 2, size: 0.17, col: 0x2a8ac8, belly: 0xe0782a, wing: 0x2a6aa8, beak: 0.05, span: 0.7, legs: 0.06, tail: 0.25 },
  bouvreuil:  { name: "Bouvreuil pivoine", kind: "small", w: 2, size: 0.16, col: 0x6a6a72, breast: 0xe0503a, belly: 0xe0503a, crown: 0x141414, wing: 0x2a2a2e, wingBar: 0xe8e8e8, span: 0.8, legs: 0.12, tail: 0.35 },
  charbon:    { name: "Mésange charbonnière", kind: "small", w: 3, size: 0.14, col: 0x6a7a3a, head: 0x141414, cheek: 0xf4f4f0, belly: 0xe8d040, wing: 0x5a6a7a, wingBar: 0xe8e8e8, span: 0.85, legs: 0.12, tail: 0.35 },
  pinson:     { name: "Pinson des arbres", kind: "small", w: 3, size: 0.15, col: 0x8a6a50, breast: 0xc8805a, crown: 0x5a7a9a, wing: 0x2a2a2a, wingBar: 0xf0f0f0, span: 0.85, legs: 0.12, tail: 0.38 },
  chardon:    { name: "Chardonneret élégant", kind: "small", w: 2, size: 0.13, col: 0xa88a60, head: 0xd03a2a, crown: 0x141414, cheek: 0xf4f4f0, belly: 0xf0ece4, wing: 0x1a1a1a, wingBar: 0xf0c820, span: 0.85, legs: 0.11, tail: 0.32 },
  epeiche:    { name: "Pic épeiche", kind: "small", w: 1.5, size: 0.23, col: 0x141414, belly: 0xe8e4dc, cheek: 0xf0f0f0, wingBar: 0xf4f4f4, beak: 0.05, span: 0.85, legs: 0.08, tail: 0.32 },
  etourneau:  { name: "Étourneau sansonnet", kind: "flock", w: 2, size: 0.21, col: 0x1a2028, beakCol: 0xe0c040, span: 0.9, legs: 0.1, tail: 0.3 },
  hirondelle: { name: "Hirondelle rustique", kind: "swift", w: 2.5, size: 0.17, col: 0x1a2440, belly: 0xf0e8e0, breast: 0xa8342a, fork: true, span: 1.15, tail: 0.6 },
  martinet:   { name: "Martinet noir", kind: "swift", w: 2, size: 0.17, col: 0x262220, fork: true, span: 1.35, tail: 0.4 },
  colvert:    { name: "Canard colvert", kind: "swim", w: 2, size: 0.55, col: 0x8a7a68, head: 0x1a5a2a, breast: 0x6a3a2a, belly: 0xc8c4bc, wingBar: 0x3a4ab0, beakCol: 0xe0c040, beak: 0.06, span: 0.9, tail: 0.25 },
  cygne:      { name: "Cygne tuberculé", kind: "swim", w: 1, size: 1.1, col: 0xf6f6f2, beakCol: 0xe0702a, neck: 0.5, beak: 0.1, span: 1.1, tail: 0.2 },
  aigle:      { name: "Aigle royal", kind: "raptor", w: 0.7, size: 0.85, col: 0x4a3220, crown: 0xb0844a, hook: true, beakCol: 0x2a2420, beak: 0.08, span: 1.3, tail: 0.35 },
  faucon:     { name: "Faucon pèlerin", kind: "raptor", w: 0.7, size: 0.42, col: 0x4a5460, belly: 0xe8e4dc, cheek: 0x1a1c20, hook: true, beakCol: 0x2a2a30, beak: 0.04, span: 1.15, tail: 0.35 },
  hulotte:    { name: "Chouette hulotte", kind: "owl", w: 2, owl: true, size: 0.4, col: 0x7a5a3a, belly: 0xb89a74, face: 0xa88a64, beakCol: 0xd8c8a0, beak: 0.03, span: 1.1, legs: 0.08, tail: 0.25 },
  effraie:    { name: "Effraie des clochers", kind: "owl", w: 1.5, owl: true, size: 0.36, col: 0xc8a060, belly: 0xf4efe6, face: 0xf8f4ee, beakCol: 0xd8c8a0, beak: 0.03, span: 1.15, legs: 0.12, tail: 0.25 },
  hibou:      { name: "Hibou des marais", kind: "owl", w: 1, owl: true, size: 0.38, col: 0xa8844c, belly: 0xe0c890, face: 0xd8c09a, beakCol: 0x2a2420, beak: 0.03, span: 1.2, legs: 0.08, tail: 0.25 },
  heron:      { name: "Héron cendré", kind: "wader", w: 1, size: 0.75, col: 0x8a8e94, belly: 0xe8e8e8, crown: 0x1a1a1c, beakCol: 0xd8b040, beak: 0.16, neck: 0.32, span: 1.05, legs: 0.85, tail: 0.25 },
};

export class Birds {
  constructor(scene, world, props) {
    this.scene = scene;
    this.world = world;
    this.props = props;
    this.list = [];
    this.rand = mulberry32(4711);
    this.timer = 0;
    this.v = new THREE.Vector3();
  }

  pickType(near, day) {
    const r = this.rand;
    const wet = this.nearWater(near);
    const pool = Object.entries(BIRDS).filter(([k, b]) => ((b.kind !== "water" && b.kind !== "wader" && b.kind !== "swim") || wet) && ((b.kind === "owl") === (day < 0.3)));
    const tot = pool.reduce((a, [, b]) => a + b.w, 0);
    let x = r() * tot;
    for (const [k, b] of pool) { x -= b.w; if (x <= 0) return k; }
    return pool[0][0];
  }

  nearWater(p) {
    for (let a = 0; a < 6.28; a += 0.8) for (const d of [10, 25]) {
      const x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d;
      if (this.world.waterLevelAt(x, z) - this.world.heightAt(x, z) > 0.2) return [x, z];
    }
    return null;
  }

  spawn(type, near) {
    const b = BIRDS[type], r = this.rand;
    const parts = buildBird({ ...b, seed: (r() * 1e6) | 0 });
    let x, z, y, state = "fly";
    if (b.kind === "wader" || b.kind === "water" || b.kind === "swim") {
      const w = this.nearWater(near); if (!w) return null;
      [x, z] = w; y = this.world.heightAt(x, z);
      if (b.kind === "wader" && this.world.waterLevelAt(x, z) - y > 0.7) return null;
      state = b.kind === "wader" ? "stand" : b.kind === "swim" ? "swim" : "fly";
      if (b.kind === "swim") { if (this.world.waterLevelAt(x, z) - y < 0.4) return null; y = this.world.waterLevelAt(x, z); }
    } else {
      const a = r() * 6.28, d = 25 + r() * 40;
      x = near.x + Math.cos(a) * d; z = near.z + Math.sin(a) * d;
      y = this.world.heightAt(x, z);
      if (y < 0.5) return null;
      state = b.kind === "small" && r() < 0.5 ? "ground" : "fly";
    }
    const g = parts.group;
    const foot = (b.legs ? b.legs * b.size : 0) + b.size * 0.2;   // hauteur des pattes au-dessus du sol
    g.position.set(x, y + (state === "fly" ? (b.kind === "raptor" ? 60 + r() * 30 : 6 + r() * 12) : state === "swim" ? -b.size * 0.08 : foot), z);
    this.scene.add(g);
    const bird = { foot, type, b, ...parts, pos: g.position, vel: new THREE.Vector3(), state, timer: 2 + r() * 4, target: new THREE.Vector3(), flap: r() * 6, center: new THREE.Vector3(x, 0, z), ang: r() * 6.28 };
    this.newTarget(bird);
    if (b.kind === "flock") {
      // une petite bande de corneilles
      this.list.push(bird);
      for (let k = 0; k < 2 + Math.floor(r() * 3); k++) {
        const p2 = buildBird({ ...b, seed: (r() * 1e6) | 0 });
        p2.group.position.copy(g.position).add(new THREE.Vector3((r() - 0.5) * 6, (r() - 0.5) * 2, (r() - 0.5) * 6));
        this.scene.add(p2.group);
        this.list.push({ type, b, ...p2, pos: p2.group.position, vel: new THREE.Vector3(), state: "fly", timer: 3, target: new THREE.Vector3(), flap: r() * 6, leader: bird, off: new THREE.Vector3((r() - 0.5) * 6, (r() - 0.5) * 2, (r() - 0.5) * 6), center: bird.center, ang: 0 });
      }
      return bird;
    }
    this.list.push(bird);
    return bird;
  }

  newTarget(bd) {
    const r = this.rand, b = bd.b;
    const a = r() * 6.28, d = b.kind === "small" ? 8 + r() * 25 : 20 + r() * 50;
    const x = bd.pos.x + Math.cos(a) * d, z = bd.pos.z + Math.sin(a) * d;
    const g = this.world.heightAt(x, z);
    bd.target.set(x, Math.max(g, 0) + (b.kind === "flock" ? 18 + r() * 15 : b.kind === "swift" ? 1.5 + r() * 9 : 3 + r() * 10), z);
    if (b.kind === "swift") bd.target.set(bd.pos.x + Math.cos(a) * 60, bd.target.y, bd.pos.z + Math.sin(a) * 60);
  }

  remove(bd) { this.scene.remove(bd.group); bd.group.traverse((o) => o.geometry && o.geometry.dispose()); this.list.splice(this.list.indexOf(bd), 1); }

  update(dt, cam, day) {
    const r = this.rand;
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = 2.5;
      const max = day > 0.3 ? 18 : 3;
      if (this.list.length < max) this.spawn(this.pickType(cam, day), cam);
      for (const bd of [...this.list]) if (bd.pos.distanceTo(cam) > 170 || (day < 0.2 && bd.b.kind !== "owl" && bd.state !== "fly" && r() < 0.3) || (day > 0.35 && bd.b.kind === "owl" && r() < 0.3)) this.remove(bd);
    }
    const t = performance.now() * 0.001;
    for (const bd of this.list) {
      const b = bd.b;
      bd.timer -= dt;
      const dPlayer = Math.hypot(bd.pos.x - cam.x, bd.pos.z - cam.z);
      let flying = bd.state === "fly";
      if (bd.leader) {
        // corneilles : suivent le meneur avec un décalage
        const tgt = this.v.copy(bd.leader.pos).add(bd.off);
        bd.vel.lerp(tgt.sub(bd.pos).multiplyScalar(1.5), Math.min(1, dt * 2));
        bd.pos.addScaledVector(bd.vel, dt);
        flying = true;
      } else if (b.kind === "swim" && bd.state !== "fly") {
        // nage lentement à la surface ; le canard s'envole si on approche, le cygne s'éloigne
        const wl = this.world.waterLevelAt(bd.pos.x, bd.pos.z);
        if (bd.timer <= 0 || this.world.waterLevelAt(bd.target.x, bd.target.z) - this.world.heightAt(bd.target.x, bd.target.z) < 0.4) {
          const a = r() * 6.28; bd.target.set(bd.pos.x + Math.cos(a) * 8, 0, bd.pos.z + Math.sin(a) * 8); bd.timer = 4 + r() * 6;
        }
        if (dPlayer < 9) { const a = Math.atan2(bd.pos.z - cam.z, bd.pos.x - cam.x); if (b.size < 0.8) { bd.state = "fly"; bd.target.set(bd.pos.x + Math.cos(a) * 40, wl + 8, bd.pos.z + Math.sin(a) * 40); bd.timer = 8; } else bd.target.set(bd.pos.x + Math.cos(a) * 10, 0, bd.pos.z + Math.sin(a) * 10); }
        const to = this.v.set(bd.target.x - bd.pos.x, 0, bd.target.z - bd.pos.z);
        bd.vel.lerp(to.normalize().multiplyScalar(dPlayer < 9 ? 1.4 : 0.45), Math.min(1, dt));
        const nx = bd.pos.x + bd.vel.x * dt, nz = bd.pos.z + bd.vel.z * dt;
        if (this.world.waterLevelAt(nx, nz) - this.world.heightAt(nx, nz) > 0.35) { bd.pos.x = nx; bd.pos.z = nz; } else bd.timer = 0;
        bd.pos.y = wl - b.size * 0.08 + Math.sin(t * 1.3 + bd.flap) * 0.01;
      } else if (b.kind === "raptor") {
        // vol plané en grands cercles, battements rares
        bd.ang += dt * 0.12;
        const R = 45, gy = Math.max(0, this.world.heightAt(bd.center.x, bd.center.z));
        const nx = bd.center.x + Math.cos(bd.ang) * R, nz = bd.center.z + Math.sin(bd.ang) * R;
        bd.vel.set((nx - bd.pos.x) / Math.max(dt, 1e-3), 0, (nz - bd.pos.z) / Math.max(dt, 1e-3));
        bd.pos.set(nx, gy + 70 + Math.sin(bd.ang * 3) * 6, nz);
        flying = true;
      } else if (bd.state === "fly") {
        const to = this.v.copy(bd.target).sub(bd.pos);
        const dist = to.length();
        const sp = b.kind === "swift" ? 15 : b.kind === "water" ? 11 : b.kind === "wader" ? 5 : b.kind === "flock" ? 8 : b.kind === "swim" ? 10 : 7;
        bd.vel.lerp(to.normalize().multiplyScalar(sp), Math.min(1, dt * 1.8));
        bd.pos.addScaledVector(bd.vel, dt);
        if (b.kind === "water") bd.pos.y = Math.max(bd.pos.y, this.world.waterLevelAt(bd.pos.x, bd.pos.z) + 0.4);
        if (dist < 1.5 || bd.timer < -12) {
          if (b.kind === "swim" && this.world.waterLevelAt(bd.pos.x, bd.pos.z) - this.world.heightAt(bd.pos.x, bd.pos.z) > 0.5) { bd.state = "swim"; bd.timer = 5; }
          else if (b.kind === "small" || b.kind === "water" || b.kind === "wader" || b.kind === "owl") {
            bd.state = b.kind === "wader" ? "stand" : "ground";
            bd.pos.y = this.world.heightAt(bd.pos.x, bd.pos.z) + (bd.foot || 0.05);
            bd.timer = 3 + r() * 8;
          } else { this.newTarget(bd); bd.timer = 6; }
        }
      } else {
        // au sol : sautille et picore ; s'envole si on approche
        const scare = b.kind === "wader" ? 14 : 6;
        if (dPlayer < scare || bd.timer <= 0) {
          bd.state = "fly";
          if (dPlayer < scare) { const a = Math.atan2(bd.pos.z - cam.z, bd.pos.x - cam.x); bd.target.set(bd.pos.x + Math.cos(a) * 30, bd.pos.y + 10, bd.pos.z + Math.sin(a) * 30); }
          else this.newTarget(bd);
          bd.timer = 8;
        } else if (b.kind === "small" && Math.sin(t * 3 + bd.flap) > 0.97) {
          const a = r() * 6.28; bd.pos.x += Math.cos(a) * 0.12; bd.pos.z += Math.sin(a) * 0.12;
          bd.pos.y = this.world.heightAt(bd.pos.x, bd.pos.z) + (bd.foot || 0.05);
        }
        bd.vel.multiplyScalar(0.8);
      }
      // Orientation
      if (bd.vel.lengthSq() > 0.05) bd.group.rotation.y = Math.atan2(bd.vel.x, bd.vel.z);
      bd.group.rotation.x = flying ? -Math.max(-0.5, Math.min(0.5, bd.vel.y * 0.08)) : 0;
      // Ailes : battements (plané pour la buse), repliées au sol
      const glide = b.kind === "raptor" || b.kind === "owl" && Math.sin(t * 0.9 + bd.flap) > 0 || ((b.kind === "flock" || b.kind === "swift") && Math.sin(t * 0.7 + bd.flap) > 0.4);
      bd.wings.forEach((w, i) => {
        const sx = i === 0 ? -1 : 1;
        if (flying) {
          const f = glide ? Math.sin(t * 2 + bd.flap) * 0.08 : Math.sin(t * (b.size < 0.2 ? 30 : b.size < 0.4 ? 16 : 7) + bd.flap) * 0.9;
          w.rotation.set(0, 0, sx * f);
          w.scale.setScalar(1);
        } else { w.quaternion.copy(sx > 0 ? FOLD_R : FOLD_L); w.scale.setScalar(0.62); }
      });
      if (!flying) bd.group.position.y += b.kind === "small" ? Math.max(0, Math.sin(t * 9 + bd.flap)) * 0.004 : 0;
    }
  }
}
