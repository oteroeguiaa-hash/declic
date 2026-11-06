// Faune amazonienne : proies (capybara, agouti, paca, daguet), pécaris en hardes, tapir, tamanoir,
// prédateurs (jaguar, puma, caïman noir).
// Les modèles sont construits avec des formes arrondies (ellipsoïdes, capsules) fusionnées par partie du corps.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";
import { buildAnimal } from "./anatomy.js";

// ---------- Espèces ----------
// behavior : prey (fuit), defensive (fuit, charge si blessé), territorial (charge si on s'approche),
//            hunter (chasse le joueur, craint le feu) ; aquatic : vit dans l'eau (caïman)
export const SPECIES = {
  capivara: {
    name: "Capybara", behavior: "prey", hp: 45, walk: 0.9, run: 6.5, radius: 0.42, alert: [12, 20, 6], drops: { viande_crue: 4, peau: 2 },
    model: { col: 0x8a5c38, back: 0x6e4a2c, belly: 0x9a6c46, dark: 0x22160e, tuck: 0, legLen: 0.2, legR: 0.055, bodyLen: 1.0, bodyR: 0.3, bodyW: 0.44, neckLen: 0.08, neckR: 0.21, neckAngle: 0.25, headLen: 0.3, headR: 0.14, headTilt: 0.25, snoutLen: 0.12, snoutR: 0.11, snoutCol: 0x4a3222, ears: { size: 0.045, pointy: false, up: 0.6 }, tail: null },
  },
  anta: {
    name: "Tapir", behavior: "defensive", hp: 200, walk: 1.0, run: 7.0, radius: 0.75, alert: [10, 18, 6], aggro: [4, 2], dmg: 20, cooldown: 1.6, drops: { viande_crue: 8, cuir: 2 },
    model: { col: 0x3c3632, back: 0x2e2a26, belly: 0x4a4038, dark: 0x141210, hoof: true, tuck: 0.12, legLen: 0.48, legR: 0.08, bodyLen: 1.8, bodyR: 0.45, bodyW: 0.6, neckLen: 0.3, neckR: 0.25, neckAngle: 0.25, headLen: 0.42, headR: 0.17, headTilt: 0.75, snoutLen: 0.32, snoutR: 0.08, snoutCol: 0x2a2420, mane: true, ears: { size: 0.08, pointy: false, up: 0.8 }, earIn: 0xd8d0c4, tail: { len: 0.08, r: 0.04, angle: -1.0 } },
  },
  queixada: {
    name: "Pécari à lèvres blanches", behavior: "territorial", hp: 60, walk: 1.2, run: 7.6, radius: 0.4, aggro: [9, 5], dmg: 13, cooldown: 1.1, hitAndRun: true, alert: [12, 20, 6], drops: { viande_crue: 3, peau: 1 },
    model: { col: 0x2e2a26, back: 0x1e1a18, belly: 0x2a2420, dark: 0x100e0c, hoof: true, mane: true, hump: true, tuck: 0.05, pig: true, legLen: 0.3, legR: 0.035, bodyLen: 0.95, bodyR: 0.27, bodyW: 0.34, neckLen: 0.12, neckR: 0.17, neckAngle: 0.05, headLen: 0.36, headR: 0.14, headTilt: 0.55, snoutLen: 0.22, snoutR: 0.06, snoutCol: 0xe0d8c8, ears: { size: 0.07, pointy: true, up: 0.8 }, tusks: true, tail: { len: 0.05, r: 0.02, angle: -1.2 } },
  },
  cateto: {
    name: "Pécari à collier", behavior: "defensive", hp: 45, walk: 1.2, run: 7.4, radius: 0.35, aggro: [5, 3], dmg: 10, cooldown: 1.1, hitAndRun: true, alert: [12, 20, 6], drops: { viande_crue: 3, peau: 1 },
    model: { col: 0x5e564c, back: 0x3e3830, belly: 0x4a4238, dark: 0x16120e, pattern: "band", bandCol: 0xcfc6b4, hoof: true, mane: true, hump: true, tuck: 0.05, pig: true, legLen: 0.28, legR: 0.033, bodyLen: 0.85, bodyR: 0.24, bodyW: 0.3, neckLen: 0.12, neckR: 0.15, neckAngle: 0.05, headLen: 0.32, headR: 0.13, headTilt: 0.55, snoutLen: 0.2, snoutR: 0.055, snoutCol: 0x3a342e, ears: { size: 0.065, pointy: true, up: 0.8 }, tusks: true, tail: { len: 0.05, r: 0.02, angle: -1.2 } },
  },
  veado: {
    name: "Daguet rouge", behavior: "prey", hp: 40, walk: 1.2, run: 9.5, radius: 0.35, alert: [16, 26, 8], drops: { viande_crue: 3, peau: 1 },
    model: { col: 0x9a4a24, back: 0x7e3c1c, belly: 0xd8b494, dark: 0x1e140e, hoof: true, tuck: 0.5, legLen: 0.5, legR: 0.026, bodyLen: 0.9, bodyR: 0.19, bodyW: 0.25, neckLen: 0.32, neckR: 0.06, neckAngle: 0.85, headLen: 0.22, headR: 0.065, headTilt: 0.45, snoutLen: 0.11, snoutR: 0.034, snoutCol: 0x2a1c14, cheeks: true, ears: { size: 0.11, pointy: true, up: 0.8 }, antlers: "roe", tail: { len: 0.08, r: 0.03, angle: -0.4 }, tailTip: 0xf0ece4 },
  },
  cutia: {
    name: "Agouti", behavior: "prey", hp: 10, walk: 1.4, run: 8, radius: 0.15, alert: [10, 16, 5], drops: { viande_crue: 1, noisettes: 2 },
    model: { col: 0xb0763a, back: 0x8a5a2a, belly: 0xc89a5a, dark: 0x1e140c, tuck: 0.3, legLen: 0.16, legR: 0.018, bodyLen: 0.42, bodyR: 0.11, bodyW: 0.16, neckLen: 0.06, neckR: 0.07, neckAngle: 0.5, headLen: 0.12, headR: 0.06, headTilt: 0.2, snoutLen: 0.05, snoutR: 0.035, ears: { size: 0.03, pointy: false, up: 0.7 }, tail: null },
  },
  paca: {
    name: "Paca", behavior: "prey", hp: 14, walk: 1.0, run: 6.5, radius: 0.2, alert: [9, 14, 4], drops: { viande_crue: 2, peau: 1 },
    model: { col: 0x6a4428, back: 0x5a3820, belly: 0xd8c8a8, dark: 0x1a120a, pattern: "spots", tuck: 0.1, legLen: 0.14, legR: 0.028, bodyLen: 0.6, bodyR: 0.17, bodyW: 0.24, neckLen: 0.05, neckR: 0.1, neckAngle: 0.4, headLen: 0.15, headR: 0.085, headTilt: 0.2, snoutLen: 0.06, snoutR: 0.05, cheeks: true, ears: { size: 0.03, pointy: false, up: 0.6 }, tail: null },
  },
  tamandua: {
    name: "Tamanoir (grand fourmilier)", behavior: "defensive", hp: 70, walk: 0.8, run: 3.5, radius: 0.35, alert: [7, 12, 4], aggro: [3, 2], dmg: 22, cooldown: 1.6, drops: { viande_crue: 3, peau: 2 },
    model: { col: 0x6a6056, back: 0x5a5148, belly: 0x2a2420, dark: 0x14110e, socks: 0xd8d0c0, pattern: "band", bandCol: 0x16120e, tuck: 0.05, legLen: 0.34, legR: 0.055, bodyLen: 1.1, bodyR: 0.24, bodyW: 0.3, neckLen: 0.3, neckR: 0.13, neckAngle: 0.15, headLen: 0.2, headR: 0.07, headTilt: 0.5, snoutLen: 0.42, snoutR: 0.028, snoutCol: 0x2a2420, ears: { size: 0.025, pointy: false }, tail: { len: 0.8, r: 0.17, angle: -0.25, droop: true, bushy: true } },
  },
  quati: {
    name: "Coati", behavior: "prey", hp: 14, walk: 1.3, run: 6.5, radius: 0.18, alert: [9, 15, 5], drops: { viande_crue: 1, peau: 1 },
    model: { col: 0x9a6a3a, back: 0x7a5228, belly: 0xc8a070, dark: 0x1e140c, mask: true, tuck: 0.2, legLen: 0.18, legR: 0.025, bodyLen: 0.52, bodyR: 0.12, bodyW: 0.17, neckLen: 0.1, neckR: 0.07, neckAngle: 0.4, headLen: 0.14, headR: 0.06, headTilt: 0.2, snoutLen: 0.12, snoutR: 0.022, ears: { size: 0.03, pointy: false, up: 0.8 }, tail: { len: 0.5, r: 0.04, angle: 1.1 }, tailRings: true, tailTip: 0x2a1c12 },
  },
  jaguatirica: {
    name: "Ocelot", behavior: "prey", hp: 30, walk: 1.3, run: 8.5, radius: 0.25, alert: [12, 20, 5], drops: { viande_crue: 1, peau: 1 },
    model: { col: 0xc8a068, back: 0xb08a54, belly: 0xf0e6d0, dark: 0x1a120a, pattern: "spots", cheeks: true, tuck: 0.4, legLen: 0.3, legR: 0.03, bodyLen: 0.75, bodyR: 0.14, bodyW: 0.2, neckLen: 0.1, neckR: 0.08, neckAngle: 0.5, headLen: 0.14, headR: 0.08, headTilt: 0.1, snoutLen: 0.05, snoutR: 0.04, snoutCol: 0xe8dcc8, ears: { size: 0.05, pointy: false }, tail: { len: 0.36, r: 0.035, angle: -0.5, droop: true }, tailRings: true, tailTip: 0x1a120a },
  },
  onca: {
    name: "Jaguar", behavior: "hunter", stalker: true, hp: 130, walk: 1.4, run: 9.0, radius: 0.5, chase: 42, dmg: 30, cooldown: 1.5, fleeHp: 35, drops: { viande_crue: 4, peau: 2 },
    model: { col: 0xd8a04e, back: 0xc8903e, belly: 0xf2e8d2, dark: 0x16100a, pattern: "spots", cheeks: true, tuck: 0.3, legLen: 0.4, legR: 0.065, bodyLen: 1.4, bodyR: 0.28, bodyW: 0.42, neckLen: 0.2, neckR: 0.17, neckAngle: 0.4, headLen: 0.26, headR: 0.15, headTilt: 0.1, snoutLen: 0.08, snoutR: 0.08, snoutCol: 0xead8b8, ears: { size: 0.06, pointy: false }, tail: { len: 0.72, r: 0.06, angle: -0.6, droop: true }, tailRings: true, tailTip: 0x16100a },
  },
  sucuarana: {
    name: "Puma", behavior: "hunter", stalker: true, hp: 95, walk: 1.4, run: 9.5, radius: 0.42, chase: 35, dmg: 22, cooldown: 1.4, fleeHp: 30, drops: { viande_crue: 3, peau: 1 },
    model: { col: 0xa8784a, back: 0x96683e, belly: 0xe8dcc8, dark: 0x1a120a, cheeks: true, tuck: 0.35, legLen: 0.44, legR: 0.055, bodyLen: 1.25, bodyR: 0.23, bodyW: 0.34, neckLen: 0.2, neckR: 0.14, neckAngle: 0.45, headLen: 0.2, headR: 0.12, headTilt: 0.1, snoutLen: 0.07, snoutR: 0.065, snoutCol: 0xe8dcc8, ears: { size: 0.06, pointy: false }, tail: { len: 0.75, r: 0.055, angle: -0.6, droop: true }, tailTip: 0x2a1c12 },
  },
  jacare: {
    name: "Caïman noir", behavior: "hunter", aquatic: true, hp: 160, walk: 0.6, run: 5.5, radius: 0.5, chase: 9, dmg: 32, cooldown: 2.2, fleeHp: 40, drops: { viande_crue: 5, cuir: 2 },
    model: { col: 0x2c2e24, back: 0x1e201a, belly: 0x9a9478, dark: 0x0e0e0a, pattern: "spines", tuck: 0, legLen: 0.08, legR: 0.07, bodyLen: 2.2, bodyR: 0.22, bodyW: 0.5, neckLen: 0.12, neckR: 0.2, neckAngle: 0.0, headLen: 0.42, headR: 0.12, headTilt: 0.0, snoutLen: 0.42, snoutR: 0.08, snoutCol: 0x24261e, ears: { size: 0.01, pointy: false }, tail: { len: 1.9, r: 0.18, angle: -0.03 } },
  },
};

const PREDATORS = new Set(["onca", "sucuarana", "jacare"]);

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
      capivara: [35, 110], anta: [60, 140], queixada: [55, 120], cateto: [45, 110], veado: [45, 120], cutia: [16, 45],
      onca: [55, 100], sucuarana: [55, 100], jacare: [20, 90], tamandua: [40, 100],
    }[type] || (SPECIES[type].radius > 0.4 ? [50, 130] : [14, 45]);
    const aquatic = !!SPECIES[type].aquatic;
    for (let tries = 0; tries < 25; tries++) {
      const a = this.rand() * Math.PI * 2;
      const d = dMin + this.rand() * (dMax - dMin);
      const x = near.x + Math.cos(a) * d, z = near.z + Math.sin(a) * d;
      const h = this.world.heightAt(x, z);
      const wd = this.world.waterLevelAt(x, z) - h;
      if (aquatic) { if (wd < 0.6 || wd > 6) continue; }
      else if (wd > 0.25 || h < -0.2 || this.world.slopeAt(x, z) > 0.32 || this.world.streamAt(x, z) > 0.1) continue;
      if (opts.hab && !opts.hab(x, z, h)) continue;
      return this.create(type, x, z, opts);
    }
    return null;
  }

  create(type, x, z, opts = {}) {
    const sp = SPECIES[type];
    const parts = buildAnimal({ ...sp.model, seed: (this.rand() * 1e6) | 0 });
    if (type === "veado" && this.rand() < 0.5) parts.head.children.forEach((m) => { if (m.userData.antler) m.visible = false; }); // femelles sans dagues
    if (type === "onca" && this.rand() < 0.08) parts.group.traverse((m) => { if (m.isMesh && m.material?.color) m.material = m.material.clone(), m.material.color.multiplyScalar(0.18); }); // jaguar noir (mélanique)
    const s = opts.scale || 0.9 + this.rand() * 0.2;
    parts.group.scale.setScalar(s);
    parts.group.position.set(x, this.world.heightAt(x, z), z);
    this.scene.add(parts.group);
    const meshes = [];
    parts.group.traverse((o) => { if (o.isMesh) meshes.push(o); });
    const c = {
      type, sp, ...parts, meshes, scale: s, pos: parts.group.position, yaw: this.rand() * 6.28, speed: 0, target: 0, hp: sp.hp,
      state: "idle", timer: 0, phase: this.rand() * 6, attackCd: 0, dead: false, deadT: 0, heading: this.rand() * 6.28,
      nocturnal: !!opts.nocturnal, angry: false, retreat: 0, angryT: 0, groundY: this.world.heightAt(x, z),
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
      const W = this.world;
      const forest = (x, z) => W.canopyAt(x, z) > 0.3;
      const wet = (x, z) => { for (let a = 0; a < 6.28; a += 1.05) if (W.waterLevelAt(x + Math.cos(a) * 12, z + Math.sin(a) * 12) - W.heightAt(x + Math.cos(a) * 12, z + Math.sin(a) * 12) > 0.3) return true; return false; };
      const dusk = night || (ctx.hours !== undefined && (ctx.hours < 7.5 || ctx.hours > 17));
      // [espèce, max, probabilité, habitat, harde]
      const table = [
        ["capivara", Q.maxDeer, 0.45, wet, true], ["veado", 2, 0.3, forest], ["cutia", Q.maxSquirrels, 0.5], ["paca", 2, dusk ? 0.4 : 0.05, wet],
        ["cateto", 6, 0.12, forest, true], ["quati", 5, 0.2, forest, true], ["tamandua", 1, 0.08], ["anta", 1, dusk ? 0.12 : 0.04, wet],
        ["jaguatirica", 1, dusk ? 0.12 : 0.03, forest],
      ];
      for (const [t, max, p, hab, herd] of table) {
        if (this.count(t) >= max || r() > p) continue;
        const c = this.spawn(t, player.pos, { hab });
        if (c && herd) for (let k = 0; k < 2 + Math.floor(r() * 3) && this.count(t) < max + 2; k++) this.create(t, c.pos.x + (r() - 0.5) * 10, c.pos.z + (r() - 0.5) * 10, { scale: k === 0 ? 0.6 : undefined });
      }
      if (diff.predators) {
        // Pécaris à lèvres blanches : grandes hardes agressives, rares
        if (this.count("queixada") < 1 && r() < 0.025 * (diff.wolves || 1)) {
          const lead = this.spawn("queixada", player.pos, { hab: forest });
          if (lead) for (let k = 0; k < 5 + Math.floor(r() * 6); k++) this.create("queixada", lead.pos.x + (r() - 0.5) * 12, lead.pos.z + (r() - 0.5) * 12);
        }
        // Caïmans dans l'eau, près du joueur s'il longe une berge
        if (this.count("jacare") < Math.round(2 * diff.wolves) && r() < 0.2) this.spawn("jacare", player.pos);
        // Jaguar : solitaire, chasse surtout à l'aube, au crépuscule et la nuit ; puma plus rare
        const maxJ = dusk ? Math.max(1, Math.round(diff.wolves + (day >= 3 ? 1 : 0))) : (day >= 2 ? 1 : 0);
        if (this.count("onca") < maxJ && r() < (dusk ? 0.08 : 0.015)) {
          const j = this.spawn("onca", player.pos, { nocturnal: night });
          if (j && this.sounds && r() < 0.6) this.sounds.howl(j.pos.distanceTo(player.pos));
        }
        if (this.count("sucuarana") < 1 && r() < 0.015 * diff.bears) this.spawn("sucuarana", player.pos);
      }
    }
    for (const c of [...this.list]) {
      const d = c.pos.distanceTo(player.pos);
      const small = c.sp.radius < 0.2;
      if (d > (small ? 80 : 220) || (c.dead && c.deadT > 240)) this.remove(c);
      else if (c.type === "onca" && c.nocturnal && !night && d > 70) this.remove(c);
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
        // Chasseur (jaguar, puma, caïman)
        const flee = c.hp < sp.fleeHp;
        const nearFire = fires.find((f) => f.lit && f.pos.distanceTo(player.pos) < 9);
        if (flee) {
          c.heading = away(player.pos); c.target = sp.run; c.state = "flee";
        } else if (nearFire) {
          const fx = c.pos.x - nearFire.pos.x, fz = c.pos.z - nearFire.pos.z;
          const fd = Math.hypot(fx, fz);
          c.heading = fd < 13 ? Math.atan2(fx, fz) : Math.atan2(fx, fz) + Math.PI / 2;
          c.target = fd < 13 ? sp.run * 0.6 : sp.walk; c.state = "circle";
        } else if (sp.aquatic && dist >= sp.chase) {
          // caïman : immobile à l'affût, ou dérive lentement
          if (c.timer <= 0) { c.state = this.rand() < 0.7 ? "idle" : "roam"; c.target = c.state === "roam" ? sp.walk : 0; c.heading += (this.rand() - 0.5) * 2; c.timer = 5 + this.rand() * 8; }
        } else if (dist < (c.nocturnal || sp.stalker ? sp.chase : sp.chase * 0.5)) {
          c.heading = toward();
          if (sp.stalker && dist > 9 && !c.pounce) {
            c.state = "stalk"; c.target = sp.walk * 1.2;  // le félin s'approche lentement, tapi…
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
      const nh = this.world.heightAt(nx, nz), nwd = this.world.waterLevelAt(nx, nz) - nh;
      const blocked = sp.aquatic ? nwd < 0.15 || nwd > 8 : nh < -0.4 || nh - c.groundY > 1.2 * Math.max(dt * c.speed, 0.05) + 0.3 || nwd > 0.7;
      if (blocked) {
        c.heading = c.yaw + Math.PI * (0.6 + this.rand() * 0.8);
        c.speed *= 0.5;
      } else { c.pos.x = nx; c.pos.z = nz; }
      if (sp.radius > 0.2) this.props.collide(c.pos, sp.radius);
      if (this.build) this.build.collide(c.pos, Math.max(0.15, sp.radius), c.height * 1.5);
      c.groundY = this.world.heightAt(c.pos.x, c.pos.z);
      // caïman : flotte à la surface, seuls les yeux et le dos dépassent
      c.pos.y = sp.aquatic ? Math.max(c.groundY, this.world.waterLevelAt(c.pos.x, c.pos.z) - c.height * c.scale * 1.6) : c.groundY;
      c.group.rotation.y = c.yaw;
      const ahead = this.world.heightAt(c.pos.x + Math.sin(c.yaw), c.pos.z + Math.cos(c.yaw));
      c.body.rotation.x = sp.aquatic ? 0 : THREE.MathUtils.lerp(c.body.rotation.x, -Math.atan2(ahead - c.pos.y, 1) * 0.8, dt * 5);

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
      if (c.tail) { c.tail.rotation.y = Math.sin(performance.now() * 0.004 + c.phase) * (c.state === "chase" ? 0.1 : 0.25); c.tail.rotation.x = c.state === "flee" && c.type === "veado" ? -0.8 : 0; }
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
