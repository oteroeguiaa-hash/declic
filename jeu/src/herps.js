// Amphibiens et reptiles : grenouilles, crapaud, salamandre, triton, couleuvre, vipère, lézard.
// Petits, discrets, à leur vraie taille ; ils apparaissent selon le milieu (bord de l'eau, sous-bois humide,
// rochers ensoleillés) et l'heure, ondulent (serpents, lézards, tritons) ou sautent (grenouilles) et fuient le joueur.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";
import { loft, ellipsoid, mesh, EYE } from "./anatomy.js";

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const C = (h) => new THREE.Color(h);

// où : "eau" (bord de l'eau / dans l'eau), "sousbois" (forêt humide), "sec" (rochers, plaines au soleil)
export const HERPS = {
  rousse:     { name: "Grenouille rousse", form: "frog", where: ["eau", "sousbois"], size: 0.08, back: 0x9a6a3a, belly: 0xe8d8b8, mark: 0x3a2414, mask: true, hop: true, speed: 1.2 },
  verte:      { name: "Grenouille verte", form: "frog", where: ["eau"], size: 0.09, back: 0x5a8a2a, belly: 0xf0ecd0, mark: 0x1e3a12, spots: true, hop: true, speed: 1.4 },
  crapaud:    { name: "Crapaud commun", form: "frog", where: ["sousbois", "sec"], size: 0.1, back: 0x7a5a38, belly: 0xd8c8a0, mark: 0x4a3420, warts: true, toad: true, speed: 0.35, dusk: true },
  salamandre: { name: "Salamandre tachetée", form: "lizard", where: ["sousbois"], len: 0.18, r: 0.016, back: 0x141414, belly: 0x1e1e1e, mark: 0xf2c414, spots: true, speed: 0.25, dusk: true },
  triton:     { name: "Triton alpestre", form: "lizard", where: ["eau"], len: 0.1, r: 0.009, back: 0x3a4a5e, belly: 0xf07a1a, mark: 0x1a1e24, spots: true, speed: 0.4, swim: true },
  couleuvre:  { name: "Couleuvre à collier", form: "snake", where: ["eau", "sec"], len: 1.0, r: 0.017, back: 0x5e6a4a, belly: 0xd8d4c4, mark: 0x1a1a14, collar: 0xf0d02a, speed: 0.9 },
  vipere:     { name: "Vipère aspic", form: "snake", where: ["sec"], len: 0.6, r: 0.02, back: 0x9a7c5a, belly: 0x6a5a4a, mark: 0x2a1c12, zigzag: true, speed: 0.45, day: true },
  lezard:     { name: "Lézard des murailles", form: "lizard", where: ["sec"], len: 0.19, r: 0.011, back: 0x8a7a5e, belly: 0xe8dcc0, mark: 0x2a241c, net: true, speed: 2.2, dart: true, day: true },
};

// Matériau : peau légèrement humide ; ondulation latérale (serpents, lézards, tritons) dans le shader
function skinMaterial(wave) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45, metalness: 0 });
  m.userData.u = { uPhase: { value: 0 }, uAmp: { value: 0 }, uFreq: { value: 1 }, uHead: { value: 0 }, uLen: { value: 1 } };
  if (wave) m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uPhase; uniform float uAmp; uniform float uFreq; uniform float uHead; uniform float uLen;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
  float wk = clamp((uHead - position.z) / uLen, 0.0, 1.0);
  transformed.x += sin(position.z * uFreq - uPhase) * uAmp * (0.25 + wk);`);
  };
  m.customProgramCacheKey = () => "herp" + (wave ? 1 : 0);
  return m;
}

function colorFn(s) {
  const back = C(s.back), belly = C(s.belly), mark = C(s.mark), out = new THREE.Color();
  return (p, d) => {
    out.copy(belly).lerp(back, Math.min(1, Math.max(0, (d.y + 0.25) * 2)));
    const top = d.y > -0.1;
    if (s.spots && top && Math.sin(p.x * 260 + p.z * 90) * Math.sin(p.z * 210 - p.y * 150) > 0.45) out.copy(mark);
    if (s.warts && Math.sin(p.x * 420) * Math.sin(p.z * 380) * Math.sin(p.y * 400) > 0.3) out.multiplyScalar(0.7);
    if (s.zigzag && d.y > 0.2 && Math.abs(d.x - Math.sin(p.z * 70) * 0.45) < 0.28) out.copy(mark);
    if (s.net && top && Math.sin(p.x * 300) * Math.sin(p.z * 240) > 0.35) out.lerp(mark, 0.7);
    return out.clone().multiplyScalar(0.9 + Math.random() * 0.2);
  };
}

function buildHerp(s) {
  const g = new THREE.Group();
  const cf = colorFn(s);
  const mat = skinMaterial(s.form !== "frog");
  const parts = [];
  let head = 0, len = 0.1;
  if (s.form === "frog") {
    const S = s.size, wide = s.toad ? 1.25 : 1;
    // corps aplati et allongé, tête large et plate qui se fond dans le corps
    parts.push(loft([
      { c: V3(0, S * 0.2, -S * 0.42), rx: S * 0.12, ry: S * 0.08 },
      { c: V3(0, S * 0.24, -S * 0.25), rx: S * 0.34 * wide, ry: S * 0.2 * wide },
      { c: V3(0, S * 0.24, S * 0.05), rx: S * 0.38 * wide, ry: S * 0.19 * wide },
      { c: V3(0, S * 0.22, S * 0.3), rx: S * 0.33 * wide, ry: S * 0.13 },
      { c: V3(0, S * 0.18, S * 0.5), rx: S * 0.16 * wide, ry: S * 0.07 },
      { c: V3(0, S * 0.16, S * 0.56), rx: 0.001, ry: 0.001 },
    ], (p, d) => { const c = cf(p, d); if (s.mask && Math.abs(d.x) > 0.6 && d.y > -0.2 && p.z > S * 0.22 && p.z < S * 0.5) c.lerp(C(s.mark), 0.8); return c; }, 14, 3));
    for (const sx of [-1, 1]) {
      // cuisse et jambe repliées, pied palmé
      parts.push(loft([{ c: V3(sx * S * 0.3, S * 0.18, -S * 0.3), rx: S * 0.11, ry: S * 0.1 }, { c: V3(sx * S * 0.55, S * 0.12, -S * 0.05), rx: S * 0.08, ry: S * 0.07 }, { c: V3(sx * S * 0.45, S * 0.05, -S * 0.42), rx: S * 0.05, ry: S * 0.05 }, { c: V3(sx * S * 0.6, S * 0.02, -S * 0.2), rx: S * 0.06, ry: S * 0.015 }], cf, 8, 3));
      parts.push(loft([{ c: V3(sx * S * 0.25, S * 0.16, S * 0.25), rx: S * 0.05, ry: S * 0.05 }, { c: V3(sx * S * 0.32, S * 0.02, S * 0.4), rx: S * 0.035, ry: S * 0.03 }], cf, 6, 2));
    }
    const m = mesh(parts, mat); m.castShadow = false; g.add(m);
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(S * 0.055, 8, 6), EYE);
      e.position.set(sx * S * 0.2 * wide, S * 0.33, S * 0.33);
      g.add(e);
    }
  } else {
    // corps allongé de la queue (-z) à la tête (+z)
    const L = s.len, r = s.r, snake = s.form === "snake";
    const n = snake ? 14 : 9, sec = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, z = (t - 0.5) * L;
      let rr;
      if (snake) rr = r * (t < 0.12 ? t / 0.12 * 0.8 + 0.2 : t > 0.93 ? 0.75 : 1);
      else rr = r * (t < 0.55 ? 0.15 + (t / 0.55) * 0.85 : t > 0.88 ? 0.85 : 1);
      sec.push({ c: V3(0, rr, z), rx: rr * (snake ? 1 : 1.25), ry: rr * 0.85 });
    }
    sec.push({ c: V3(0, r * 0.7, L * 0.5 + r * 1.6), rx: r * 0.5, ry: r * 0.4 });
    sec.push({ c: V3(0, r * 0.6, L * 0.5 + r * 2.2), rx: 0.001, ry: 0.001 });
    parts.push(loft(sec, cf, 10, 3));
    if (s.collar) for (const sx of [-1, 1]) parts.push(ellipsoid(r * 0.45, r * 0.5, r * 0.8, V3(sx * r * 0.75, r * 0.95, L * 0.5 - r * 1.2), () => C(s.collar), 6));
    if (!snake) for (const [sx, zf] of [[1, 0.3], [-1, 0.3], [1, -0.05], [-1, -0.05]]) {
      const z = zf * L;
      parts.push(loft([{ c: V3(sx * r, r * 0.8, z), rx: r * 0.35, ry: r * 0.35 }, { c: V3(sx * r * 2.3, r * 0.6, z + r * 0.4), rx: r * 0.28, ry: r * 0.28 }, { c: V3(sx * r * 2.6, 0.002, z + r * 1.2), rx: r * 0.3, ry: r * 0.08 }], cf, 6, 2));
    }
    const m = mesh(parts, mat); m.castShadow = false; g.add(m);
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(r * 0.28, 6, 5), EYE);
      e.position.set(sx * r * 0.62, r * 1.1, L * 0.5 + r * 1.1);
      g.add(e);
    }
    head = L * 0.5; len = L;
    mat.userData.u.uHead.value = head; mat.userData.u.uLen.value = len; mat.userData.u.uFreq.value = (snake ? 3.2 : 2.4) * Math.PI * 2 / L;
  }
  return { group: g, mat };
}

export class Herps {
  constructor(scene, world) {
    this.scene = scene;
    this.world = world;
    this.list = [];
    this.rand = mulberry32(2024);
    this.timer = 0;
  }

  // milieu à cet endroit
  habitat(x, z) {
    const W = this.world, h = W.heightAt(x, z);
    if (h < 0.3 && W.waterLevelAt(x, z) - h < 0.2) return null;
    for (let a = 0; a < 6.28; a += 1.05) {
      const px = x + Math.cos(a) * 4, pz = z + Math.sin(a) * 4;
      if (W.waterLevelAt(px, pz) - W.heightAt(px, pz) > 0.2) return "eau";
    }
    if (W.canopyAt(x, z) > 0.35) return "sousbois";
    if (W.slopeAt(x, z) > 0.18 || W.biomeAt(x, z).p > 0.4 || W.biomeAt(x, z).m > 0.3) return "sec";
    return null;
  }

  spawn(cam, hours) {
    const r = this.rand;
    const day = hours > 7 && hours < 19, dusk = !day || hours < 9 || hours > 17;
    for (let k = 0; k < 6; k++) {
      const a = r() * 6.28, d = 5 + r() * 18;
      const x = cam.x + Math.cos(a) * d, z = cam.z + Math.sin(a) * d;
      const hab = this.habitat(x, z);
      if (!hab) continue;
      const pool = Object.entries(HERPS).filter(([, s]) => s.where.includes(hab) && (!s.dusk || dusk || r() < 0.2) && (!s.day || day));
      if (!pool.length) continue;
      const [type, s] = pool[Math.floor(r() * pool.length)];
      const { group, mat } = buildHerp(s);
      const sc = 0.85 + r() * 0.35;
      group.scale.setScalar(sc);
      group.position.set(x, this.world.heightAt(x, z), z);
      group.rotation.y = r() * 6.28;
      this.scene.add(group);
      this.list.push({ type, s, group, mat, pos: group.position, heading: group.rotation.y, state: "idle", timer: 1 + r() * 3, hopT: 0, phase: r() * 6, speed: 0 });
      return;
    }
  }

  remove(h) {
    this.scene.remove(h.group);
    h.group.traverse((o) => o.isMesh && o.material !== EYE && o.geometry.dispose());
    h.mat.dispose();
    this.list.splice(this.list.indexOf(h), 1);
  }

  update(dt, cam, hours, playerPos) {
    const r = this.rand, W = this.world;
    this.timer -= dt;
    if (this.timer <= 0) {
      this.timer = 2;
      if (this.list.length < 7 && r() < 0.6) this.spawn(cam, hours);
      for (const h of [...this.list]) if (Math.hypot(h.pos.x - cam.x, h.pos.z - cam.z) > 40) this.remove(h);
    }
    for (const h of this.list) {
      const s = h.s;
      const dx = h.pos.x - playerPos.x, dz = h.pos.z - playerPos.z, dP = Math.hypot(dx, dz);
      h.timer -= dt;
      const scared = dP < (s.form === "snake" ? 2.5 : 3.5);
      if (scared) { h.state = "flee"; h.heading = Math.atan2(dx, dz) + (r() - 0.5) * 0.6; h.timer = 1.5; }
      else if (h.timer <= 0) {
        if (h.state === "idle") { h.state = "move"; h.heading += (r() - 0.5) * 2; h.timer = s.dart ? 0.4 + r() * 0.5 : 1.5 + r() * 3; }
        else { h.state = "idle"; h.timer = s.dart ? 1 + r() * 3 : 2 + r() * 5; }
      }
      const moving = h.state !== "idle";
      const target = moving ? s.speed * (h.state === "flee" ? 1.8 : 1) : 0;
      h.speed += (target - h.speed) * Math.min(1, dt * 6);
      let lift = 0;
      if (s.hop) {
        // sauts : arcs successifs
        if (moving) { h.hopT += dt * 2.6; lift = Math.max(0, Math.sin(h.hopT * Math.PI)) * s.size * 1.6; if (Math.sin(h.hopT * Math.PI) < 0) h.speed *= 0.4; }
        else h.hopT = 0;
      }
      const nx = h.pos.x + Math.sin(h.heading) * h.speed * dt, nz = h.pos.z + Math.cos(h.heading) * h.speed * dt;
      const water = W.waterLevelAt(nx, nz) - W.heightAt(nx, nz);
      if (water > 0.25 && !s.swim && s.form !== "frog" && h.type !== "couleuvre") { h.heading += Math.PI * 0.7; }
      else { h.pos.x = nx; h.pos.z = nz; }
      const g = W.heightAt(h.pos.x, h.pos.z), wl = W.waterLevelAt(h.pos.x, h.pos.z);
      h.pos.y = (wl - g > 0.05 ? wl - (s.form === "frog" ? s.size * 0.25 : 0.01) : g) + lift;
      h.group.rotation.y += ((h.heading - h.group.rotation.y + Math.PI * 3) % (Math.PI * 2) - Math.PI) * Math.min(1, dt * 8);
      // ondulation
      const u = h.mat.userData.u;
      h.phase += dt * (2 + h.speed * (s.form === "snake" ? 9 : 14));
      u.uPhase.value = h.phase;
      u.uAmp.value = s.form === "snake" ? s.r * (0.4 + h.speed * 3.5) : s.form === "lizard" ? s.r * (0.2 + h.speed * 1.2) : 0;
    }
  }
}

