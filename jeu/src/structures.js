// Constructions : feux de camp (lumière, flammes, fumée) et abris.
import * as THREE from "three";

function flameTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,220,140,0.9)");
  grd.addColorStop(0.6, "rgba(255,110,30,0.35)");
  grd.addColorStop(1, "rgba(255,60,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function smokeTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(200,200,200,0.5)");
  grd.addColorStop(1, "rgba(200,200,200,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

const FIRE_FUEL_PER_WOOD = 5; // heures de jeu

export class Structures {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.fires = [];
    this.shelters = [];
    this.boats = [];
    this.flameMat = new THREE.SpriteMaterial({ map: flameTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: true });
    this.smokeTex = smokeTexture();
    this.stoneMat = new THREE.MeshStandardMaterial({ color: 0x77736c, roughness: 0.95, flatShading: true });
    this.logMat = new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0.9 });
    this.charMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 1 });
    this.lights = [0, 1].map(() => {
      const l = new THREE.PointLight(0xff8a3a, 0, 22, 1.6);
      scene.add(l);
      return l;
    });
    this.time = 0;
  }

  addFire(x, z, fuel = 8) {
    const y = this.world.heightAt(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    const stone = new THREE.DodecahedronGeometry(0.17, 0);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const m = new THREE.Mesh(stone, this.stoneMat);
      m.position.set(Math.cos(a) * 0.55, 0.06, Math.sin(a) * 0.55);
      m.rotation.set(i, i * 2, 0);
      m.castShadow = true;
      g.add(m);
    }
    const logG = new THREE.CylinderGeometry(0.07, 0.08, 0.9, 6);
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(logG, this.logMat);
      m.rotation.z = Math.PI / 2 - 0.5;
      m.rotation.y = (i / 4) * Math.PI * 2;
      m.position.y = 0.22;
      m.castShadow = true;
      const pivot = new THREE.Group();
      pivot.rotation.y = (i / 4) * Math.PI * 2;
      m.position.x = 0.18;
      m.rotation.set(0, 0, 0.9);
      pivot.add(m);
      g.add(pivot);
    }
    const ash = new THREE.Mesh(new THREE.CircleGeometry(0.42, 12), this.charMat);
    ash.rotation.x = -Math.PI / 2; ash.position.y = 0.02;
    g.add(ash);
    const flames = [];
    for (let i = 0; i < 7; i++) {
      const s = new THREE.Sprite(this.flameMat);
      s.userData.seed = Math.random() * 10;
      g.add(s);
      flames.push(s);
    }
    const smoke = [];
    for (let i = 0; i < 6; i++) {
      const m = new THREE.SpriteMaterial({ map: this.smokeTex, transparent: true, depthWrite: false, opacity: 0 });
      const s = new THREE.Sprite(m);
      s.userData.t = i / 6;
      g.add(s);
      smoke.push(s);
    }
    this.scene.add(g);
    const f = { kind: "fire", group: g, pos: g.position, fuel, lit: fuel > 0, flames, smoke };
    this.fires.push(f);
    return f;
  }

  addShelter(x, z, yaw) {
    const y = this.world.heightAt(x, z);
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = yaw;
    const pole = new THREE.CylinderGeometry(0.06, 0.07, 2.6, 6);
    for (const sx of [-1.1, 1.1]) {
      for (const sz of [-1, 1]) {
        const m = new THREE.Mesh(pole, this.logMat);
        m.position.set(sx, 1.0, sz * 0.55);
        m.rotation.x = sz * 0.55;
        m.castShadow = true;
        g.add(m);
      }
    }
    const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 6), this.logMat);
    ridge.rotation.z = Math.PI / 2; ridge.position.y = 2.05;
    g.add(ridge);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x5c4a2e, roughness: 1, side: THREE.DoubleSide });
    for (const s of [-1, 1]) {
      const roof = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 2.3, 6, 1), roofMat);
      const p = roof.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 9) * 0.04);
      roof.geometry.computeVertexNormals();
      roof.position.set(0, 1.05, s * 0.55);
      roof.rotation.x = -s * (Math.PI / 2 - 0.55);
      roof.castShadow = true; roof.receiveShadow = true;
      g.add(roof);
    }
    const bed = new THREE.Mesh(new THREE.BoxGeometry(2, 0.08, 0.9), new THREE.MeshStandardMaterial({ color: 0x6b5a3a, roughness: 1 }));
    bed.position.y = 0.04; bed.receiveShadow = true;
    g.add(bed);
    this.scene.add(g);
    const s = { kind: "shelter", group: g, pos: g.position, yaw };
    this.shelters.push(s);
    return s;
  }

  addCanoe(x, z, yaw) {
    const g = new THREE.Group();
    const wood = new THREE.MeshStandardMaterial({ color: 0x8a5530, roughness: 0.75, side: THREE.DoubleSide });
    const dark = new THREE.MeshStandardMaterial({ color: 0x4a2c18, roughness: 0.8 });
    const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wood);
    hull.scale.set(0.46, 0.34, 2.3);
    hull.position.y = 0.16;
    hull.castShadow = true; hull.receiveShadow = true;
    g.add(hull);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.035, 6, 40), dark);
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(0.46, 2.3, 1);
    rim.position.y = 0.16;
    g.add(rim);
    for (const zz of [-0.7, 0.75]) {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.22), dark);
      seat.position.set(0, 0.08, zz);
      g.add(seat);
    }
    const y = this.world.waterLevelAt(x, z) + 0.02;
    g.position.set(x, y, z);
    g.rotation.y = yaw;
    this.scene.add(g);
    const b = { kind: "boat", group: g, pos: g.position, yaw, speed: 0, yawVel: 0 };
    this.boats.push(b);
    return b;
  }

  addFuel(f, wood) {
    f.fuel += wood * FIRE_FUEL_PER_WOOD;
    f.lit = true;
  }

  // Cible structure dans l'axe du regard.
  pick(origin, dir, maxDist) {
    let best = null, bestT = maxDist;
    const all = [...this.fires, ...this.shelters, ...this.boats];
    const c = new THREE.Vector3();
    for (const s of all) {
      c.copy(s.pos); c.y += s.kind === "fire" ? 0.3 : s.kind === "boat" ? 0.1 : 0.9;
      const t = c.clone().sub(origin).dot(dir);
      if (t < 0 || t > bestT + 1.5) continue;
      const d = origin.clone().addScaledVector(dir, t).distanceTo(c);
      const r = s.kind === "fire" ? 0.8 : s.kind === "boat" ? 1.4 : 1.5;
      if (d < r && t - r * 0.5 < bestT) { bestT = Math.max(0, t - r * 0.5); best = s; }
    }
    return best ? { structure: best, dist: bestT } : null;
  }

  collide(pos, radius) {
    if (this.build) this.build.collide(pos, radius);
    for (const s of this.shelters) {
      // boîte simple autour de l'abri (on peut entrer par l'avant/arrière ouvert)
      const dx = pos.x - s.pos.x, dz = pos.z - s.pos.z;
      const c = Math.cos(-s.yaw), sn = Math.sin(-s.yaw);
      const lx = dx * c - dz * sn;
      if (Math.abs(lx) > 1.1 && Math.abs(lx) < 1.35 + radius && Math.abs(dx * sn + dz * c) < 1.1) {
        const push = (lx > 0 ? 1.35 + radius : -1.35 - radius) - lx;
        pos.x += push * c; pos.z -= push * sn;
      }
    }
    for (const f of this.fires) {
      const dx = pos.x - f.pos.x, dz = pos.z - f.pos.z, d = Math.hypot(dx, dz), r = 0.65 + radius;
      if (d < r && d > 1e-5) { pos.x = f.pos.x + (dx / d) * r; pos.z = f.pos.z + (dz / d) * r; }
    }
  }

  update(dt, gameDtHours, camPos) {
    this.time += dt;
    for (const f of this.fires) {
      if (f.lit) {
        f.fuel -= gameDtHours;
        if (f.fuel <= 0) { f.fuel = 0; f.lit = false; }
      }
      const intensity = f.lit ? Math.min(1, f.fuel / 1.5) : 0;
      f.flames.forEach((s, i) => {
        const k = (this.time * (1.4 + i * 0.13) + s.userData.seed) % 1;
        const sc = (1 - k) * (0.55 + (i % 3) * 0.18) * intensity;
        s.position.set(Math.sin(s.userData.seed * 5 + this.time * 3) * 0.12 * (1 - k), 0.15 + k * 0.85, Math.cos(s.userData.seed * 3 + this.time * 2.6) * 0.12 * (1 - k));
        s.scale.set(sc * 0.8, sc * 1.25, 1);
        s.visible = intensity > 0;
      });
      f.smoke.forEach((s, i) => {
        s.userData.t = (s.userData.t + dt * 0.12) % 1;
        const t = s.userData.t;
        s.position.set(Math.sin(t * 6 + i) * 0.3 + t * 0.8, 1 + t * 5, Math.cos(t * 5 + i) * 0.3);
        const sc = 0.6 + t * 2.6;
        s.scale.set(sc, sc, 1);
        s.material.opacity = (f.lit ? 0.22 : 0) * Math.sin(t * Math.PI);
      });
    }
    // Les deux feux allumés les plus proches éclairent (nombre de lumières fixe = pas de recompilation).
    const lit = this.fires.filter((f) => f.lit).sort((a, b) => a.pos.distanceToSquared(camPos) - b.pos.distanceToSquared(camPos));
    this.lights.forEach((l, i) => {
      const f = lit[i];
      if (f && f.pos.distanceTo(camPos) < 120) {
        const flick = 0.85 + Math.sin(this.time * 13 + i) * 0.06 + Math.sin(this.time * 23.7 + i * 3) * 0.05 + Math.random() * 0.04;
        l.intensity = 9 * flick * Math.min(1, f.fuel / 1.5);
        l.position.set(f.pos.x, f.pos.y + 0.8, f.pos.z);
      } else l.intensity = 0;
    });
  }

  serialize() {
    return {
      fires: this.fires.map((f) => [Math.round(f.pos.x * 100) / 100, Math.round(f.pos.z * 100) / 100, Math.round(f.fuel * 100) / 100]),
      shelters: this.shelters.map((s) => [Math.round(s.pos.x * 100) / 100, Math.round(s.pos.z * 100) / 100, Math.round(s.yaw * 100) / 100]),
      boats: this.boats.map((s) => [Math.round(s.pos.x * 100) / 100, Math.round(s.pos.z * 100) / 100, Math.round(s.yaw * 100) / 100]),
    };
  }

  restore(d) {
    for (const [x, z, fuel] of d?.fires || []) this.addFire(x, z, fuel);
    for (const [x, z, yaw] of d?.shelters || []) this.addShelter(x, z, yaw);
    for (const [x, z, yaw] of d?.boats || []) this.addCanoe(x, z, yaw);
  }
}
