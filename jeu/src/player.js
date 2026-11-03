// Joueur à la première personne : déplacement physique, nage, endurance, survie, outil en main.
import * as THREE from "three";
import { clamp } from "./noise.js";

const EYE = 1.68;
const GRAVITY = 22;

export class Player {
  constructor(camera, world, props, structures) {
    this.camera = camera;
    this.world = world;
    this.props = props;
    this.structures = structures;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.onGround = false;
    this.health = 100;
    this.food = 100;
    this.water = 100;
    this.stamina = 100;
    this.warmth = 100;
    this.dead = false;
    this.sprinting = false;
    this.crouching = false;
    this.swimming = false;
    this.bob = 0;
    this.stepAcc = 0;
    this.hurtFlash = 0;
    this.eyeY = EYE;
    this.fallStartY = null;
    this.spawnPoint = new THREE.Vector3();
    this.buildHands();
  }

  buildHands() {
    // Modèles tenus en main, attachés à la caméra.
    this.hand = new THREE.Group();
    this.camera.add(this.hand);
    this.hand.position.set(0.32, -0.34, -0.55);
    const wood = new THREE.MeshStandardMaterial({ color: 0x6a4a2e, roughness: 0.85 });
    const stone = new THREE.MeshStandardMaterial({ color: 0x7d7a74, roughness: 0.8, flatShading: true });
    const skin = new THREE.MeshStandardMaterial({ color: 0xc69676, roughness: 0.7 });
    const cord = new THREE.MeshStandardMaterial({ color: 0xb8a272, roughness: 1 });
    const mk = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); return m; };
    this.models = {};

    const arm = new THREE.Group();
    arm.add(mk(new THREE.CylinderGeometry(0.035, 0.042, 0.34, 8), skin, 0.04, -0.06, 0.16, Math.PI / 2 - 0.25));
    arm.add(mk(new THREE.SphereGeometry(0.05, 10, 8), skin, 0.0, -0.01, -0.03));
    arm.scale.setScalar(0.9);
    arm.position.set(0.05, -0.04, 0);
    this.models.main = arm;

    const handle = new THREE.CylinderGeometry(0.018, 0.022, 0.55, 6);
    const pale = new THREE.MeshStandardMaterial({ color: 0x9a7650, roughness: 0.8 });
    const makeAxe = (head) => {
      const g = new THREE.Group();
      g.add(mk(handle, wood, 0, 0.1, 0));
      g.add(mk(new THREE.BoxGeometry(0.035, 0.12, 0.16), head, 0, 0.32, 0.06, 0.2));
      g.add(mk(new THREE.CylinderGeometry(0.028, 0.028, 0.06, 6), cord, 0, 0.32, 0));
      return g;
    };
    const makePick = (head) => {
      const g = new THREE.Group();
      g.add(mk(handle, wood, 0, 0.1, 0));
      g.add(mk(new THREE.BoxGeometry(0.04, 0.05, 0.34), head, 0, 0.36, 0));
      g.add(mk(new THREE.CylinderGeometry(0.028, 0.028, 0.06, 6), cord, 0, 0.36, 0));
      return g;
    };
    const makeSword = (blade) => {
      const g = new THREE.Group();
      g.add(mk(new THREE.CylinderGeometry(0.018, 0.02, 0.16, 6), wood, 0, -0.05, 0));
      g.add(mk(new THREE.BoxGeometry(0.14, 0.025, 0.035), cord, 0, 0.04, 0));
      g.add(mk(new THREE.BoxGeometry(0.05, 0.55, 0.014), blade, 0, 0.32, 0));
      g.add(mk(new THREE.ConeGeometry(0.035, 0.09, 4), blade, 0, 0.64, 0, 0, Math.PI / 4));
      return g;
    };
    this.models.hache_bois = makeAxe(pale);
    this.models.pioche_bois = makePick(pale);
    this.models.epee_bois = makeSword(pale);
    this.models.hache = makeAxe(stone);
    this.models.pioche = makePick(stone);
    this.models.epee = makeSword(stone);

    const spear = new THREE.Group();
    spear.add(mk(new THREE.CylinderGeometry(0.016, 0.02, 1.5, 6), wood, 0, 0.35, 0));
    spear.add(mk(new THREE.ConeGeometry(0.035, 0.16, 4), stone, 0, 1.17, 0));
    this.models.lance = spear;

    const torch = new THREE.Group();
    torch.add(mk(new THREE.CylinderGeometry(0.022, 0.026, 0.5, 6), wood, 0, 0.05, 0));
    torch.add(mk(new THREE.CylinderGeometry(0.04, 0.03, 0.1, 6), cord, 0, 0.3, 0));
    const fc = document.createElement("canvas"); fc.width = fc.height = 64;
    const fg = fc.getContext("2d");
    const grd = fg.createRadialGradient(32, 40, 0, 32, 36, 30);
    grd.addColorStop(0, "rgba(255,250,220,1)"); grd.addColorStop(0.3, "rgba(255,190,90,0.9)");
    grd.addColorStop(0.7, "rgba(255,90,20,0.3)"); grd.addColorStop(1, "rgba(255,60,0,0)");
    fg.fillStyle = grd; fg.fillRect(0, 0, 64, 64);
    const ftex = new THREE.CanvasTexture(fc); ftex.colorSpace = THREE.SRGBColorSpace;
    const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: ftex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    flame.position.y = 0.42;
    flame.scale.set(0.16, 0.24, 1);
    torch.add(flame);
    this.torchFlame = flame;
    this.models.torche = torch;

    for (const k in this.models) {
      const m = this.models[k];
      m.visible = false;
      m.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.renderOrder = 10; } });
      if (k !== "main") m.rotation.set(-0.35, 0.15, -0.15);
      this.hand.add(m);
    }
    this.torchLight = new THREE.PointLight(0xffb066, 0, 20, 1.4);
    this.torchLight.position.set(0.35, 0.35, -0.6);
    this.camera.add(this.torchLight);
    this.swingT = 1;
  }

  setTool(id) {
    for (const k in this.models) this.models[k].visible = k === id;
    this.torchLight.intensity = 0;
    this.tool = id;
  }

  swing() { this.swingT = 0; }

  get eye() { return new THREE.Vector3(this.pos.x, this.pos.y + this.eyeY, this.pos.z); }
  get forward() {
    return new THREE.Vector3(-Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch));
  }

  surface() {
    const h = this.pos.y;
    if (this.swimming || h < 0.3) return "water";
    if (h < 2.6) return "sand";
    if (this.world.slopeAt(this.pos.x, this.pos.z) > 0.3 || h > 60) return "rock";
    return "grass";
  }

  update(dt, input, ctx) {
    const { sounds } = ctx;
    if (this.dead) return;
    const look = input.consumeLook();
    this.yaw -= look.x;
    this.pitch = clamp(this.pitch - look.y * (this.invertY ? -1 : 1), -1.5, 1.5);

    const ax = input.axis();
    const len = Math.hypot(ax.x, ax.y);
    if (len > 1) { ax.x /= len; ax.y /= len; }
    this.crouching = input.crouch;
    const ground = this.world.heightAt(this.pos.x, this.pos.z);
    const waterDepth = -ground;
    this.swimming = waterDepth > 1.35 && this.pos.y < 0.2 - 1.2;
    const wading = !this.swimming && this.pos.y < 0.15;

    const wantsSprint = input.sprint && ax.y > 0.3 && !this.crouching;
    this.sprinting = wantsSprint && this.stamina > 2 && !this.swimming;
    let speed = this.crouching ? 1.8 : this.sprinting ? 7.2 : 4.2;
    if (this.swimming) speed = 2.4;
    else if (wading) speed *= 0.65;
    if (this.food < 10 || this.water < 10) speed *= 0.8;

    // Pente : on monte moins vite
    const slope = this.world.slopeAt(this.pos.x, this.pos.z);
    if (!this.swimming && slope > 0.25) speed *= 1 - clamp((slope - 0.25) * 2, 0, 0.6);

    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    const wishX = (ax.x * cos - ax.y * sin) * speed;
    const wishZ = (-ax.x * sin - ax.y * cos) * speed;
    const accel = this.onGround || this.swimming ? 12 : 2.5;
    this.vel.x += (wishX - this.vel.x) * Math.min(1, dt * accel);
    this.vel.z += (wishZ - this.vel.z) * Math.min(1, dt * accel);

    // Endurance
    if (this.sprinting && len > 0.1) this.stamina -= dt * 16;
    else if (this.swimming && len > 0.1) this.stamina -= dt * 4;
    else this.stamina += dt * (this.food > 20 ? 14 : 6);
    this.stamina = clamp(this.stamina, 0, 100);
    if (this.swimming && this.stamina <= 0) this.health -= dt * 6; // noyade

    if (this.swimming) {
      const surfaceY = -1.35;
      this.vel.y += (surfaceY - this.pos.y) * dt * 6 - this.vel.y * dt * 3;
      if (input.jump) this.vel.y += dt * 6;
      this.onGround = false;
    } else {
      if (this.onGround && input.jump && this.stamina > 8) {
        this.vel.y = 7.2;
        this.onGround = false;
        this.stamina -= 8;
      }
      this.vel.y -= GRAVITY * dt;
    }

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.pos.y += this.vel.y * dt;

    // Collisions
    this.props.collide(this.pos, 0.35);
    this.structures.collide(this.pos, 0.35);
    const lim = this.world.half * 0.98;
    this.pos.x = clamp(this.pos.x, -lim, lim);
    this.pos.z = clamp(this.pos.z, -lim, lim);

    // Rochers : on peut monter dessus
    let floor = this.world.heightAt(this.pos.x, this.pos.z);
    this.props.query(this.pos.x, this.pos.z, 3, (id, p) => {
      if (!p.alive || p.t !== "rock") return;
      const d = Math.hypot(this.pos.x - p.x, this.pos.z - p.z);
      if (d < 1.0 * p.s && this.pos.y >= p.y + p.s * 0.6) floor = Math.max(floor, p.y + p.s * 0.75);
    });

    if (!this.swimming && this.pos.y <= floor) {
      if (!this.onGround && this.fallStartY !== null) {
        const fall = this.fallStartY - floor;
        if (fall > 6) { this.damage((fall - 6) * 7, ctx); }
      }
      this.pos.y = floor;
      this.vel.y = 0;
      this.onGround = true;
      this.fallStartY = null;
    } else if (!this.swimming) {
      if (this.onGround && this.pos.y - floor < 0.6 && this.vel.y <= 0) {
        this.pos.y = floor; // colle au sol dans les descentes
      } else {
        this.onGround = false;
        if (this.fallStartY === null) this.fallStartY = this.pos.y;
        this.fallStartY = Math.max(this.fallStartY, this.pos.y);
      }
    } else this.fallStartY = null;

    // Caméra, balancement de la tête
    const hs = Math.hypot(this.vel.x, this.vel.z);
    const targetEye = this.crouching ? 1.1 : EYE;
    this.eyeY += (targetEye - this.eyeY) * Math.min(1, dt * 10);
    if (this.onGround && hs > 0.5) {
      this.bob += dt * hs * 1.9;
      this.stepAcc += dt * hs;
      const stride = this.sprinting ? 2.1 : 1.6;
      if (this.stepAcc > stride) { this.stepAcc = 0; sounds.step(this.surface()); }
    } else if (this.swimming && hs > 0.5) {
      this.stepAcc += dt * hs;
      if (this.stepAcc > 1.8) { this.stepAcc = 0; sounds.step("water"); }
    }
    const bobAmt = (this.onGround ? Math.min(1, hs / 5) : 0) * (this.bobScale ?? 1);
    const cam = this.camera;
    cam.position.set(this.pos.x, this.pos.y + this.eyeY + Math.sin(this.bob * 2) * 0.045 * bobAmt, this.pos.z);
    if (this.swimming) cam.position.y = Math.max(cam.position.y, 0.25 + Math.sin(performance.now() * 0.002) * 0.06);
    cam.rotation.order = "YXZ";
    cam.rotation.y = this.yaw;
    cam.rotation.x = this.pitch;
    cam.rotation.z = Math.sin(this.bob) * 0.006 * bobAmt + (this.hurtFlash > 0 ? Math.sin(this.hurtFlash * 40) * 0.02 : 0);

    // Main / outil : balancement et coup
    this.swingT = Math.min(1, this.swingT + dt * 3.2);
    const s = this.swingT < 1 ? Math.sin(this.swingT * Math.PI) : 0;
    this.hand.position.set(0.32 + Math.sin(this.bob) * 0.012 * bobAmt, -0.34 + Math.abs(Math.cos(this.bob)) * 0.012 * bobAmt - s * 0.05, -0.55 - s * 0.12);
    this.hand.rotation.set(-s * 1.3, s * 0.25, 0);
    if (this.tool === "torche") {
      const night = 1 - ctx.day;
      this.torchLight.intensity = (0.6 + night * 2.6) * (0.9 + Math.random() * 0.1 + Math.sin(performance.now() * 0.013) * 0.05);
      this.torchFlame.scale.set(0.15 + Math.random() * 0.02, 0.22 + Math.sin(performance.now() * 0.02) * 0.04 + Math.random() * 0.03, 1);
    }

    // Survie
    const hours = ctx.gameDtHours;
    const hk = ctx.hunger ?? 1;
    this.food -= hours * (this.sprinting ? 5.5 : 3.6) * hk;
    this.water -= hours * (this.sprinting ? 7.5 : 5.2) * hk;
    this.food = clamp(this.food, 0, 100);
    this.water = clamp(this.water, 0, 100);
    if (this.food <= 0) this.health -= dt * 0.6;
    if (this.water <= 0) this.health -= dt * 0.9;
    // Froid la nuit (sauf près du feu ou avec une torche)
    const cold = (1 - ctx.day) * (ctx.nearFire ? 0 : this.tool === "torche" ? 0.4 : 1) + (this.swimming ? 0.6 : 0) + (this.pos.y > 55 ? 0.6 : 0);
    const coldK = ctx.coat ? cold * 0.35 : cold;
    this.warmth = clamp(this.warmth + (coldK > 0.5 ? -coldK * dt * 1.2 : dt * 4), 0, 100);
    if (this.warmth <= 0) this.health -= dt * 0.5;
    if (this.food > 45 && this.water > 45 && this.warmth > 30) this.health += dt * (ctx.nearFire ? 0.45 : 0.18);
    this.health = clamp(this.health, 0, 100);
    this.hurtFlash = Math.max(0, this.hurtFlash - dt);
    if (this.health <= 0) this.dead = true;
  }

  damage(n, ctx) {
    if (this.dead) return;
    this.health -= n;
    this.hurtFlash = 0.4;
    if (ctx?.sounds) ctx.sounds.hurt();
    if (this.health <= 0) { this.health = 0; this.dead = true; }
  }

  serialize() {
    return {
      pos: [this.pos.x, this.pos.y, this.pos.z].map((v) => Math.round(v * 100) / 100),
      yaw: this.yaw, pitch: this.pitch,
      health: this.health, food: this.food, water: this.water, stamina: this.stamina, warmth: this.warmth,
      spawn: [this.spawnPoint.x, this.spawnPoint.y, this.spawnPoint.z],
    };
  }
  restore(d) {
    if (!d) return;
    this.pos.fromArray(d.pos);
    this.yaw = d.yaw; this.pitch = d.pitch;
    Object.assign(this, { health: d.health, food: d.food, water: d.water, stamina: d.stamina, warmth: d.warmth ?? 100 });
    if (d.spawn) this.spawnPoint.fromArray(d.spawn);
  }
}
