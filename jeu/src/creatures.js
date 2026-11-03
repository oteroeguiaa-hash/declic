// Faune d'une forêt européenne : proies, prédateurs et animaux qui défendent leur territoire.
// Les modèles sont construits avec des formes arrondies (ellipsoïdes, capsules) fusionnées par partie du corps.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";
import { buildAnimal } from "./anatomy.js";

// ---------- Espèces ----------
// behavior : prey (fuit), defensive (fuit, charge si blessé), territorial (charge si on s'approche),
//            hunter (chasse le joueur, craint le feu)
export const SPECIES = {
  deer: {
    name: "Cerf", behavior: "prey", hp: 60, walk: 1.3, run: 9.5, radius: 0.5, alert: [17, 30, 9], drops: { viande_crue: 3, peau: 2 },
    model: { col: 0x8a5a34, back: 0x6a4428, belly: 0xd8c4a0, dark: 0x2a1d14, pattern: "rump", hoof: true, tuck: 0.6, legLen: 0.82, legR: 0.038, bodyLen: 1.3, bodyR: 0.27, bodyW: 0.36, neckLen: 0.52, neckR: 0.085, neckAngle: 0.95, headLen: 0.32, headR: 0.095, headTilt: 0.5, snoutLen: 0.17, snoutR: 0.05, snoutCol: 0x5a4030, cheeks: true, ears: { size: 0.16, pointy: true, up: 0.7 }, antlers: "deer", tail: { len: 0.13, r: 0.04, angle: -0.5 } },
  },
  moose: {
    name: "Élan", behavior: "defensive", hp: 170, walk: 1.1, run: 7.2, radius: 0.8, alert: [10, 18, 6], aggro: [6, 3], dmg: 22, cooldown: 1.6, drops: { viande_crue: 7, peau: 3 },
    model: { col: 0x3e2c1e, back: 0x2c1e14, belly: 0x4a3828, dark: 0x1a120c, legCol: 0x9a8a74, hoof: true, hump: true, tuck: 0.2, legLen: 1.15, legR: 0.06, bodyLen: 2.0, bodyR: 0.44, bodyW: 0.62, neckLen: 0.42, neckR: 0.17, neckAngle: 0.3, headLen: 0.55, headR: 0.15, headTilt: 0.8, snoutLen: 0.36, snoutR: 0.12, ears: { size: 0.2, pointy: true, up: 0.6 }, antlers: "moose", dewlap: true, tail: { len: 0.1, r: 0.05, angle: -1.2 } },
  },
  boar: {
    name: "Sanglier", behavior: "territorial", hp: 90, walk: 1.2, run: 7.8, radius: 0.45, aggro: [9, 5], dmg: 14, cooldown: 1.2, hitAndRun: true, alert: [12, 20, 6], drops: { viande_crue: 4, peau: 1 },
    model: { col: 0x3e342a, back: 0x24201a, belly: 0x342a22, dark: 0x16120e, hoof: true, mane: true, hump: true, tuck: 0.05, pig: true, legLen: 0.34, legR: 0.04, bodyLen: 1.2, bodyR: 0.33, bodyW: 0.42, neckLen: 0.14, neckR: 0.2, neckAngle: 0.05, headLen: 0.42, headR: 0.18, headTilt: 0.55, snoutLen: 0.28, snoutR: 0.07, snoutCol: 0x4a3c34, ears: { size: 0.11, pointy: true, up: 0.8 }, tusks: true, tail: { len: 0.24, r: 0.018, angle: -1.3 } },
  },
  fox: {
    name: "Renard", behavior: "prey", hp: 22, walk: 1.6, run: 8.5, radius: 0.25, alert: [14, 22, 7], drops: { viande_crue: 1, peau: 1 },
    model: { col: 0xc8622a, back: 0xb05420, belly: 0xf2ece0, dark: 0x1a120e, socks: 0x241812, chest: true, cheeks: true, earBack: true, tuck: 0.5, legLen: 0.3, legR: 0.022, bodyLen: 0.66, bodyR: 0.13, bodyW: 0.19, neckLen: 0.16, neckR: 0.065, neckAngle: 0.65, headLen: 0.17, headR: 0.075, headTilt: 0.2, snoutLen: 0.14, snoutR: 0.028, ears: { size: 0.1, pointy: true }, tail: { len: 0.48, r: 0.085, angle: -0.25, droop: true, bushy: true }, tailTip: 0xf4f0e8 },
  },
  wildcat: {
    name: "Chat sauvage", behavior: "prey", hp: 26, walk: 1.3, run: 8.0, radius: 0.22, alert: [12, 20, 5], drops: { viande_crue: 1, fourrure: 1 },
    model: { col: 0x8a7e6a, back: 0x6a5e4e, belly: 0xc8bca4, dark: 0x2a241c, pattern: "tabby", cheeks: true, tuck: 0.4, legLen: 0.24, legR: 0.024, bodyLen: 0.6, bodyR: 0.12, bodyW: 0.2, neckLen: 0.09, neckR: 0.07, neckAngle: 0.6, headLen: 0.13, headR: 0.075, headTilt: 0.1, snoutLen: 0.045, snoutR: 0.035, snoutCol: 0xb8a890, ears: { size: 0.055, pointy: true }, tail: { len: 0.32, r: 0.042, angle: -0.35, droop: true, bushy: true }, tailRings: true, tailTip: 0x18140f },
  },
  rabbit: {
    name: "Lapin", behavior: "prey", hp: 8, walk: 1.2, run: 7.5, radius: 0.12, alert: [9, 14, 4], hop: true, drops: { viande_crue: 1, peau: 1 },
    model: { col: 0x8a7458, back: 0x6e5c46, belly: 0xe4d8c4, dark: 0x2a2018, tuck: 0, legLen: 0.06, legR: 0.024, bodyLen: 0.32, bodyR: 0.12, bodyW: 0.2, neckLen: 0.05, neckR: 0.07, neckAngle: 0.9, headLen: 0.12, headR: 0.068, headTilt: 0.2, snoutLen: 0.04, snoutR: 0.035, cheeks: true, ears: { size: 0.14, pointy: false, up: 1.6 }, tail: { len: 0.05, r: 0.04, angle: 0.6 }, tailTip: 0xf6f2ec },
  },
  squirrel: {
    name: "Écureuil", behavior: "prey", hp: 8, walk: 1.5, run: 6.5, radius: 0.1, alert: [7, 12, 3], hop: true, drops: { viande_crue: 1, noisettes: 2 },
    model: { col: 0xa8501e, back: 0x8a3e16, belly: 0xf0e2c8, dark: 0x2a1408, chest: true, tuck: 0.2, legLen: 0.05, legR: 0.014, bodyLen: 0.2, bodyR: 0.055, bodyW: 0.09, neckLen: 0.04, neckR: 0.035, neckAngle: 0.9, headLen: 0.07, headR: 0.04, snoutLen: 0.025, snoutR: 0.02, ears: { size: 0.035, pointy: true }, tufts: true, tail: { len: 0.24, r: 0.06, angle: 1.2, bushy: true, curl: true } },
  },
  wolf: {
    name: "Loup", behavior: "hunter", hp: 70, walk: 1.8, run: 7.4, radius: 0.45, chase: 55, dmg: 13, cooldown: 1.25, fleeHp: 22, drops: { viande_crue: 2, peau: 1 },
    model: { col: 0x8a8278, back: 0x4e4a44, belly: 0xd4ccbc, dark: 0x2a2826, pattern: "saddle", chest: true, cheeks: true, tuck: 0.55, legLen: 0.54, legR: 0.032, bodyLen: 1.05, bodyR: 0.2, bodyW: 0.28, neckLen: 0.28, neckR: 0.13, neckAngle: 0.45, headLen: 0.25, headR: 0.105, headTilt: 0.15, snoutLen: 0.17, snoutR: 0.045, snoutCol: 0xa8a090, ears: { size: 0.11, pointy: true }, tail: { len: 0.46, r: 0.07, angle: -0.9, droop: true, bushy: true }, tailTip: 0x1e1c1a },
  },
  lynx: {
    name: "Lynx", behavior: "hunter", stalker: true, hp: 60, walk: 1.5, run: 8.8, radius: 0.35, chase: 32, dmg: 15, cooldown: 1.4, fleeHp: 25, drops: { viande_crue: 2, fourrure: 1 },
    model: { col: 0xbc9466, back: 0xa47e52, belly: 0xf0e6d4, dark: 0x2a1e14, pattern: "spots", cheeks: true, tuck: 0.4, legLen: 0.5, legR: 0.04, bodyLen: 0.86, bodyR: 0.18, bodyW: 0.27, neckLen: 0.14, neckR: 0.11, neckAngle: 0.5, headLen: 0.18, headR: 0.105, headTilt: 0.1, snoutLen: 0.06, snoutR: 0.05, snoutCol: 0xe8dcc8, ears: { size: 0.085, pointy: true }, tufts: true, tail: { len: 0.14, r: 0.04, angle: -0.4 }, tailTip: 0x16120c },
  },
  bear: {
    name: "Ours", behavior: "territorial", hp: 220, walk: 1.2, run: 6.8, radius: 0.8, aggro: [13, 7], dmg: 28, cooldown: 1.8, alert: [15, 25, 8], drops: { viande_crue: 6, fourrure: 2 },
    model: { col: 0x5a3c26, back: 0x46301e, belly: 0x3e2a1a, dark: 0x1e140c, socks: 0x2a1c12, hump: true, tuck: 0.05, legLen: 0.55, legR: 0.1, bodyLen: 1.7, bodyR: 0.48, bodyW: 0.8, neckLen: 0.3, neckR: 0.27, neckAngle: 0.1, headLen: 0.4, headR: 0.24, headTilt: 0.25, snoutLen: 0.2, snoutR: 0.1, snoutCol: 0x8a6a4a, ears: { size: 0.1, pointy: false, up: 1.0 }, tail: { len: 0.1, r: 0.06, angle: -0.3 } },
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
      wolf: [55, 95], lynx: [50, 100], bear: [80, 140], wildcat: [30, 80],
    }[type];
    for (let tries = 0; tries < 25; tries++) {
      const a = this.rand() * Math.PI * 2;
      const d = dMin + this.rand() * (dMax - dMin);
      const x = near.x + Math.cos(a) * d, z = near.z + Math.sin(a) * d;
      const h = this.world.heightAt(x, z);
      if (h < 2.5 || h > 300 || this.world.slopeAt(x, z) > 0.3 || this.world.streamAt(x, z) > 0.1) continue;
      if (type === "moose" && this.world.moisture(x, z) < 0.45) continue;
      return this.create(type, x, z, opts);
    }
    return null;
  }

  create(type, x, z, opts = {}) {
    const sp = SPECIES[type];
    const parts = buildAnimal({ ...sp.model, seed: (this.rand() * 1e6) | 0 });
    if (type === "deer" && this.rand() < 0.45) parts.head.children.forEach((m) => { if (m.userData.antler) m.visible = false; }); // biches sans bois
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
    c.meshes.forEach((m) => m.geometry.dispose());
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
      if (this.count("fox") < 3 && r() < 0.25) this.spawn("fox", player.pos);
      if (this.count("wildcat") < 2 && r() < 0.15) this.spawn("wildcat", player.pos);
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
      const close = dist < 28;
      if (c.meshes[0].castShadow !== close) c.meshes.forEach((m) => (m.castShadow = close));
      const size = c.height;
      c.phase += dt * c.speed * (sp.hop ? 2.4 / Math.max(0.15, size) : 1.6 / Math.max(0.4, size));
      const gallop = c.speed > sp.walk * 2;
      const amp = Math.min(0.8, c.speed * (sp.hop ? 0.25 : 0.12));
      c.legs.forEach((l, i) => {
        const off = sp.hop || gallop ? (i < 2 ? 0 : Math.PI * 0.8) + (i % 2) * 0.25 : (i === 0 || i === 3 ? 0 : Math.PI);
        const ph = c.phase + off;
        l.rotation.x = Math.sin(ph) * amp;
        // genou / jarret : se plie quand la patte revient vers l'avant
        const flex = Math.max(0, Math.cos(ph)) * amp * 1.6;
        if (c.knees) c.knees[i].rotation.x = i < 2 ? flex : -flex * 0.6;
      });
      // respiration
      c.body.scale.y = 1 + Math.sin(performance.now() * 0.0025 + c.phase) * 0.012;
      const bob = Math.abs(Math.sin(c.phase)) * (sp.hop ? size * 0.5 : gallop ? size * 0.07 : size * 0.02) * Math.min(1, c.speed);
      c.body.position.y = c.height + bob - (c.state === "stalk" ? c.height * 0.15 : 0);
      const headDown = c.state === "graze" ? 0.9 : c.state === "flee" ? -0.3 : c.state === "stalk" ? 0.35 : c.state === "attack" ? Math.sin(performance.now() * 0.02) * 0.2 + 0.15 : 0;
      c.neck.rotation.x = THREE.MathUtils.lerp(c.neck.rotation.x, headDown, dt * 3);
      if (c.tail) { c.tail.rotation.y = Math.sin(performance.now() * 0.004 + c.phase) * (c.state === "chase" ? 0.1 : 0.25); c.tail.rotation.x = c.state === "flee" && c.type === "deer" ? -0.8 : 0; }
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
