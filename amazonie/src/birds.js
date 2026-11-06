// Oiseaux d'Amazonie : 22 espèces (aras, toucans, perroquets, hoazin, aigrettes, jabiru, harpie, urubus…) avec leurs comportements (sautiller au sol, voler d'arbre en arbre,
// tournoyer en vol plané, raser l'eau, pêcher à l'affût dans les hauts-fonds).
import * as THREE from "three";
import { buildBird } from "./anatomy.js";
import { mulberry32 } from "./noise.js";

// Ailes repliées le long du corps : envergure vers l'arrière, plat contre le flanc
const FOLD_R = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, -0.15, -1).normalize(), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, -0.15).normalize()));
const FOLD_L = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0.15, 1).normalize(), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, -0.15).normalize()));

export const BIRDS = {
  arara:      { name: "Ara rouge", kind: "flock", w: 2, size: 0.85, col: 0xd8261a, belly: 0xd02a1a, wing: 0x2a5ad0, wingBar: 0xf0c820, cheek: 0xf4ece4, beakCol: 0xe8e0d0, hook: true, beak: 0.07, span: 1.0, legs: 0.08, tail: 1.1 },
  ararauna:   { name: "Ara bleu", kind: "flock", w: 1.5, size: 0.82, col: 0x2a7ad8, belly: 0xf0b820, breast: 0xf0b820, cheek: 0xf0f0f0, wing: 0x2a6ac8, beakCol: 0x1a1a1a, hook: true, beak: 0.07, span: 1.0, legs: 0.08, tail: 1.1 },
  papagaio:   { name: "Amazone poudrée", kind: "flock", w: 2, size: 0.38, col: 0x4a9a3a, crown: 0x8ab040, wingBar: 0xd82a1a, beakCol: 0x8a8a7a, hook: true, beak: 0.04, span: 0.9, legs: 0.08, tail: 0.35 },
  japim:      { name: "Cassique cul-jaune", kind: "flock", w: 1.5, size: 0.26, col: 0x141414, wingBar: 0xf0c820, beakCol: 0xe8e8c0, beak: 0.05, span: 0.85, legs: 0.1, tail: 0.4 },
  tucano:     { name: "Toucan à bec rouge", kind: "small", w: 2, size: 0.52, col: 0x141414, breast: 0xf4f0e0, cheek: 0xf4f0e0, beakCol: 0xf0a020, beak: 0.19, span: 0.85, legs: 0.08, tail: 0.45 },
  cigana:     { name: "Hoazin huppé", kind: "small", w: 1, size: 0.6, col: 0x8a6a3a, crown: 0xc86a2a, cheek: 0x3a6ad8, belly: 0xc8803a, breast: 0xe8c890, beakCol: 0x2a2a20, beak: 0.04, span: 0.85, legs: 0.1, tail: 0.55 },
  bemtevi:    { name: "Tyran quiquivi", kind: "small", w: 3, size: 0.22, col: 0x6a5a3a, belly: 0xf0d020, head: 0x141414, cheek: 0xf4f4f0, beak: 0.04, span: 0.85, legs: 0.12, tail: 0.38 },
  sanhaco:    { name: "Tangara évêque", kind: "small", w: 3, size: 0.16, col: 0x8aa8c0, wing: 0x5a88b8, belly: 0xa8bcd0, span: 0.85, legs: 0.12, tail: 0.35 },
  saira:      { name: "Calliste septicolore", kind: "small", w: 2, size: 0.13, col: 0x1a1a1a, head: 0x6ae04a, belly: 0x3a6ad8, breast: 0x3aa0e0, wingBar: 0xe02a1a, span: 0.85, legs: 0.11, tail: 0.32 },
  beijaflor:  { name: "Colibri", kind: "swift", w: 2, size: 0.1, col: 0x2aa060, belly: 0xe8e8e0, breast: 0x2ac080, beak: 0.03, span: 0.9, tail: 0.3 },
  andorinha:  { name: "Hirondelle à ailes blanches", kind: "swift", w: 1.5, size: 0.14, col: 0x2a3a6a, belly: 0xf4f4f4, wingBar: 0xf4f4f4, fork: true, span: 1.15, tail: 0.45 },
  martim:     { name: "Martin-pêcheur d'Amazonie", kind: "water", w: 2, size: 0.28, col: 0x2a6a3a, belly: 0xf0f0e8, breast: 0xb84a2a, beak: 0.07, span: 0.75, legs: 0.06, tail: 0.3 },
  pato:       { name: "Canard musqué", kind: "swim", w: 1, size: 0.7, col: 0x1a2a1a, wingBar: 0xf0f0f0, head: 0x1e2a1e, beakCol: 0xd0a0a0, beak: 0.06, span: 0.9, tail: 0.25 },
  biguatinga: { name: "Anhinga", kind: "swim", w: 0.7, size: 0.8, col: 0x141414, wingBar: 0xd8d8d0, beakCol: 0xc8a050, neck: 0.45, beak: 0.1, span: 1.1, tail: 0.5 },
  garca:      { name: "Grande aigrette", kind: "wader", w: 1.5, size: 0.9, col: 0xf6f6f2, belly: 0xf6f6f2, beakCol: 0xe8c030, beak: 0.13, neck: 0.42, span: 1.05, legs: 0.9, tail: 0.2 },
  tuiuiu:     { name: "Jabiru d'Amérique", kind: "wader", w: 0.6, size: 1.3, col: 0xf4f4f0, head: 0x141414, beakCol: 0x141414, beak: 0.3, neck: 0.42, span: 1.1, legs: 1.0, tail: 0.25 },
  socó:       { name: "Onoré rayé", kind: "wader", w: 1, size: 0.7, col: 0x8a5a2a, crown: 0x6a3a1a, belly: 0xd8c098, beakCol: 0xc8b040, beak: 0.12, neck: 0.32, span: 1.0, legs: 0.6, tail: 0.25 },
  harpia:     { name: "Harpie féroce", kind: "raptor", w: 0.5, size: 1.0, col: 0x3a3a3c, head: 0x9a9a9c, belly: 0xf0f0f0, hook: true, beakCol: 0x1a1a1a, beak: 0.09, span: 1.35, tail: 0.4 },
  urubu:      { name: "Urubu noir", kind: "raptor", w: 1.5, size: 0.62, col: 0x141414, head: 0x3a3a3a, beakCol: 0x5a5a5a, hook: true, beak: 0.05, span: 1.3, tail: 0.3 },
  urubuRei:   { name: "Sarcoramphe roi", kind: "raptor", w: 0.4, size: 0.75, col: 0xf0ece4, wing: 0x141414, head: 0xe8702a, beakCol: 0xd8402a, hook: true, beak: 0.06, span: 1.4, tail: 0.3 },
  murucututu: { name: "Chouette à lunettes", kind: "owl", w: 2, owl: true, size: 0.45, col: 0x4a3020, belly: 0xf0d8a0, face: 0x2a1a10, beakCol: 0xd8c8a0, beak: 0.03, span: 1.1, legs: 0.08, tail: 0.25 },
  urutau:     { name: "Ibijau gris (oiseau-fantôme)", kind: "owl", w: 1.5, owl: true, size: 0.38, col: 0x8a7a64, belly: 0xa89a84, face: 0x8a7a64, beakCol: 0x3a3028, beak: 0.02, span: 1.2, legs: 0.06, tail: 0.35 },
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
      // un couple ou une petite bande (aras, perroquets, cassiques)
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
    bd.target.set(x, Math.max(g, 0) + (b.kind === "flock" ? 38 + r() * 16 : b.kind === "swift" ? 1.5 + r() * 9 : 3 + r() * 10), z);
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
