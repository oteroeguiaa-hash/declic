// Faune : cerfs (fuient) et loups (chassent la nuit, craignent le feu).
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

function buildDeer() {
  const fur = new THREE.MeshStandardMaterial({ color: 0x7a5232, roughness: 0.9 });
  const belly = new THREE.MeshStandardMaterial({ color: 0xc9b08a, roughness: 0.9 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a1d14, roughness: 0.8 });
  const g = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 1.05;
  g.add(body);
  body.add(box(0.42, 0.48, 1.25, fur));
  body.add(box(0.36, 0.12, 1.0, belly, 0, -0.22, 0));
  const neck = new THREE.Group();
  neck.position.set(0, 0.18, 0.55);
  neck.rotation.x = -0.6;
  neck.add(box(0.2, 0.62, 0.22, fur, 0, 0.3, 0));
  const head = new THREE.Group();
  head.position.set(0, 0.62, 0.02);
  head.add(box(0.2, 0.2, 0.42, fur, 0, 0, 0.12));
  head.add(box(0.1, 0.08, 0.06, dark, 0, -0.02, 0.35));
  head.add(box(0.06, 0.16, 0.04, fur, 0.1, 0.14, -0.05));
  head.add(box(0.06, 0.16, 0.04, fur, -0.1, 0.14, -0.05));
  for (const s of [-1, 1]) {
    const a = box(0.03, 0.38, 0.03, dark, s * 0.08, 0.3, -0.02); a.rotation.z = s * -0.35; head.add(a);
    const b = box(0.03, 0.18, 0.03, dark, s * 0.18, 0.42, 0.04); b.rotation.x = 0.5; head.add(b);
  }
  head.rotation.x = 0.6;
  neck.add(head);
  body.add(neck);
  body.add(box(0.1, 0.16, 0.06, belly, 0, 0.14, -0.64));
  const legs = [];
  for (const [x, z] of [[0.14, 0.48], [-0.14, 0.48], [0.14, -0.48], [-0.14, -0.48]]) {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.2, z);
    pivot.add(box(0.09, 0.85, 0.09, fur, 0, -0.42, 0));
    pivot.add(box(0.1, 0.08, 0.1, dark, 0, -0.85, 0));
    body.add(pivot);
    legs.push(pivot);
  }
  return { group: g, body, legs, neck, height: 1.1 };
}

function buildWolf() {
  const fur = new THREE.MeshStandardMaterial({ color: 0x5b5752, roughness: 0.95 });
  const light = new THREE.MeshStandardMaterial({ color: 0x9a948a, roughness: 0.95 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b1a19, roughness: 0.8 });
  const eye = new THREE.MeshBasicMaterial({ color: 0xffd04a });
  const g = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 0.72;
  g.add(body);
  body.add(box(0.36, 0.4, 1.05, fur));
  body.add(box(0.4, 0.44, 0.4, fur, 0, 0.04, 0.32));
  body.add(box(0.3, 0.12, 0.8, light, 0, -0.2, 0));
  const neck = new THREE.Group();
  neck.position.set(0, 0.12, 0.55);
  const head = new THREE.Group();
  head.add(box(0.28, 0.26, 0.3, fur, 0, 0, 0.05));
  head.add(box(0.16, 0.13, 0.24, light, 0, -0.05, 0.3));
  head.add(box(0.06, 0.05, 0.04, dark, 0, -0.01, 0.43));
  head.add(box(0.07, 0.14, 0.05, fur, 0.09, 0.18, -0.02));
  head.add(box(0.07, 0.14, 0.05, fur, -0.09, 0.18, -0.02));
  const e1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.02), eye); e1.position.set(0.08, 0.05, 0.2); head.add(e1);
  const e2 = e1.clone(); e2.position.x = -0.08; head.add(e2);
  neck.add(head);
  body.add(neck);
  const tail = box(0.1, 0.1, 0.5, fur, 0, 0.05, -0.7); tail.rotation.x = 0.5; body.add(tail);
  const legs = [];
  for (const [x, z] of [[0.12, 0.36], [-0.12, 0.36], [0.12, -0.38], [-0.12, -0.38]]) {
    const pivot = new THREE.Group();
    pivot.position.set(x, -0.15, z);
    pivot.add(box(0.09, 0.58, 0.1, fur, 0, -0.28, 0));
    pivot.add(box(0.1, 0.06, 0.13, dark, 0, -0.56, 0.02));
    body.add(pivot);
    legs.push(pivot);
  }
  return { group: g, body, legs, neck, tail, height: 0.75 };
}

const SPECIES = {
  deer: { build: buildDeer, hp: 60, walk: 1.3, run: 9.5, radius: 0.5, meat: 3, hide: 2 },
  wolf: { build: buildWolf, hp: 70, walk: 1.8, run: 7.4, radius: 0.45, meat: 2, hide: 1 },
};

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

  spawn(type, player) {
    const sp = SPECIES[type];
    for (let tries = 0; tries < 20; tries++) {
      const a = this.rand() * Math.PI * 2;
      const d = type === "wolf" ? 55 + this.rand() * 40 : 50 + this.rand() * 80;
      const x = player.x + Math.cos(a) * d, z = player.z + Math.sin(a) * d;
      const h = this.world.heightAt(x, z);
      if (h < 2.5 || h > 60 || this.world.slopeAt(x, z) > 0.3) continue;
      const parts = sp.build();
      parts.group.position.set(x, h, z);
      this.scene.add(parts.group);
      const pack = type === "wolf" ? 1 : 1;
      const c = { type, sp, ...parts, pos: parts.group.position, yaw: this.rand() * 6.28, speed: 0, target: 0, hp: sp.hp, state: "idle", timer: 0, phase: 0, attackCd: 0, dead: false, deadT: 0, heading: this.rand() * 6.28, pack };
      this.list.push(c);
      return c;
    }
    return null;
  }

  remove(c) {
    this.scene.remove(c.group);
    c.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    this.list.splice(this.list.indexOf(c), 1);
  }

  update(dt, player, ctx) {
    const { night, fires, onAttack } = ctx;
    // Apparitions / disparitions
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = 2;
      const deer = this.list.filter((c) => c.type === "deer" && !c.dead).length;
      const wolves = this.list.filter((c) => c.type === "wolf" && !c.dead).length;
      if (deer < this.quality.maxDeer && this.rand() < 0.5) this.spawn("deer", player.pos);
      const maxW = night ? Math.min(this.quality.maxWolves, 1 + Math.floor(ctx.day / 2)) : 0;
      if (wolves < maxW && this.rand() < 0.25) {
        const w = this.spawn("wolf", player.pos);
        if (w && this.sounds) this.sounds.howl(w.pos.distanceTo(player.pos));
      }
      for (const c of [...this.list]) {
        const d = c.pos.distanceTo(player.pos);
        if (d > 190 || (c.dead && c.deadT > 240)) this.remove(c);
        else if (c.type === "wolf" && !night && d > 70) this.remove(c);
      }
    }

    for (const c of this.list) {
      if (c.dead) { this.animateDead(c, dt); continue; }
      const toP = this.v.set(player.pos.x - c.pos.x, 0, player.pos.z - c.pos.z);
      const dist = toP.length();
      c.timer -= dt;
      c.attackCd -= dt;

      if (c.type === "deer") {
        const alert = player.sprinting ? 30 : player.crouching ? 9 : 17;
        if (dist < alert || c.state === "flee") {
          if (c.state !== "flee") { c.state = "flee"; c.timer = 4 + this.rand() * 3; }
          c.heading = Math.atan2(-toP.x, -toP.z) + Math.sin(performance.now() * 0.001 + c.pos.x) * 0.3;
          c.target = c.sp.run;
          if (c.timer <= 0 && dist > alert) c.state = "idle";
        } else if (c.timer <= 0) {
          if (this.rand() < 0.45) { c.state = "graze"; c.target = 0; }
          else { c.state = "walk"; c.target = c.sp.walk; c.heading += (this.rand() - 0.5) * 2.2; }
          c.timer = 3 + this.rand() * 6;
        }
      } else {
        // Loup
        let nearFire = null;
        for (const f of fires) if (f.lit && f.pos.distanceTo(player.pos) < 9) nearFire = f;
        const fleeing = c.hp < 22 || !night;
        if (fleeing) {
          c.heading = Math.atan2(-toP.x, -toP.z);
          c.target = c.sp.run;
          c.state = "flee";
        } else if (nearFire) {
          // tourne autour du feu, à distance
          const fx = c.pos.x - nearFire.pos.x, fz = c.pos.z - nearFire.pos.z;
          const fd = Math.hypot(fx, fz);
          c.heading = fd < 13 ? Math.atan2(fx, fz) : Math.atan2(fx, fz) + Math.PI / 2;
          c.target = fd < 13 ? c.sp.run * 0.6 : c.sp.walk;
          c.state = "circle";
        } else if (dist < 55) {
          c.state = dist < 1.9 ? "attack" : "chase";
          c.heading = Math.atan2(toP.x, toP.z);
          c.target = dist < 1.9 ? 0 : dist < 14 ? c.sp.run : c.sp.run * 0.75;
          if (dist < 2.1 && c.attackCd <= 0 && !player.dead) {
            c.attackCd = 1.25;
            onAttack(11 + Math.floor(this.rand() * 6), c);
          }
        } else if (c.timer <= 0) {
          c.state = "roam";
          c.heading = Math.atan2(toP.x, toP.z) + (this.rand() - 0.5) * 1.5;
          c.target = c.sp.walk * 1.5;
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
      if (nh < 1.2 || nh - c.pos.y > 1.2 * Math.max(dt * c.speed, 0.05) + 0.3) {
        c.heading = c.yaw + Math.PI * (0.6 + this.rand() * 0.8);
        c.speed *= 0.5;
      } else {
        c.pos.x = nx; c.pos.z = nz;
      }
      this.props.collide(c.pos, c.sp.radius);
      c.pos.y = this.world.heightAt(c.pos.x, c.pos.z);
      c.group.rotation.y = c.yaw;

      // Inclinaison selon la pente
      const ahead = this.world.heightAt(c.pos.x + Math.sin(c.yaw), c.pos.z + Math.cos(c.yaw));
      c.body.rotation.x = THREE.MathUtils.lerp(c.body.rotation.x, -Math.atan2(ahead - c.pos.y, 1) * 0.8, dt * 5);

      // Animation des pattes
      c.phase += dt * c.speed * (c.type === "deer" ? 2.2 : 2.8);
      const amp = Math.min(0.75, c.speed * 0.12);
      const gallop = c.speed > 4;
      c.legs.forEach((l, i) => {
        const off = gallop ? (i < 2 ? 0 : Math.PI * 0.8) + (i % 2) * 0.3 : (i === 0 || i === 3 ? 0 : Math.PI);
        l.rotation.x = Math.sin(c.phase + off) * amp;
      });
      c.body.position.y = c.height * (c.type === "deer" ? 0.955 : 0.96) + Math.abs(Math.sin(c.phase)) * (gallop ? 0.08 : 0.02);
      if (c.type === "deer") c.neck.rotation.x = THREE.MathUtils.lerp(c.neck.rotation.x, c.state === "graze" ? 0.9 : c.state === "flee" ? -0.9 : -0.6, dt * 2);
      else {
        c.neck.rotation.x = c.state === "attack" ? Math.sin(performance.now() * 0.02) * 0.15 + 0.1 : 0;
        if (c.tail) c.tail.rotation.x = c.state === "chase" ? 0.1 : 0.6;
      }
    }
  }

  animateDead(c, dt) {
    c.deadT += dt;
    c.group.rotation.z = THREE.MathUtils.lerp(c.group.rotation.z, Math.PI / 2, Math.min(1, dt * 4));
    c.group.position.y = this.world.heightAt(c.pos.x, c.pos.z) + 0.25;
    c.legs.forEach((l) => (l.rotation.x *= 0.9));
  }

  pick(origin, dir, maxDist) {
    let best = null, bestT = maxDist;
    const center = new THREE.Vector3();
    for (const c of this.list) {
      center.set(c.pos.x, c.dead ? c.pos.y + 0.2 : c.pos.y + c.height, c.pos.z);
      const t = center.clone().sub(origin).dot(dir);
      if (t < 0 || t > bestT + 1) continue;
      const closest = origin.clone().addScaledVector(dir, t);
      if (closest.distanceTo(center) < 0.85) {
        const tt = Math.max(0, t - 0.6);
        if (tt < bestT) { bestT = tt; best = c; }
      }
    }
    return best ? { creature: best, dist: bestT } : null;
  }

  damage(c, amount, from) {
    if (c.dead) return false;
    c.hp -= amount;
    if (c.type === "deer") { c.state = "flee"; c.timer = 8; }
    else { c.attackCd = Math.max(c.attackCd, 0.5); }
    // petit recul
    const dx = c.pos.x - from.x, dz = c.pos.z - from.z, d = Math.hypot(dx, dz) || 1;
    c.pos.x += (dx / d) * 0.4; c.pos.z += (dz / d) * 0.4;
    if (c.hp <= 0) {
      c.dead = true; c.speed = 0; c.deadT = 0;
      return true;
    }
    return false;
  }

  serialize() { return []; } // les animaux réapparaissent naturellement
}
