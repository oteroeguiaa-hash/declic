// Insectes volants : abeilles et bourdons autour des fleurs, papillons dans les clairières, libellules au-dessus
// de l'eau, lucioles la nuit. Instanciés ; les ailes battent dans le shader.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

function geo(parts) {
  const pos = [], col = [], idx = [];
  for (const p of parts) {
    const b = pos.length / 3;
    p.v.forEach((v) => { pos.push(...v); col.push(...p.c); });
    p.i.forEach((i) => idx.push(b + i));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
// petit corps (octaèdre étiré) et aile (quadrilatère arrondi)
const blob = (x, y, z, rx, ry, rz, c) => ({ v: [[x + rx, y, z], [x - rx, y, z], [x, y + ry, z], [x, y - ry, z], [x, y, z + rz], [x, y, z - rz]], i: [0, 2, 4, 2, 1, 4, 1, 3, 4, 3, 0, 4, 2, 0, 5, 1, 2, 5, 3, 1, 5, 0, 3, 5], c });
const wing = (sx, len, wid, z, c) => ({ v: [[sx * 0.002, 0, z + wid * 0.3], [sx * len, 0.002, z + wid * 0.5], [sx * len * 1.05, 0, z - wid * 0.4], [sx * 0.002, 0, z - wid * 0.4]], i: [0, 1, 2, 0, 2, 3, 0, 2, 1, 0, 3, 2], c });
const hex = (h) => { const c = new THREE.Color(h); return [c.r, c.g, c.b]; };

const TYPES = {
  abeille: { n: 22, geo: () => geo([blob(0, 0, -0.006, 0.006, 0.006, 0.01, hex(0xd8a020)), blob(0, 0, -0.012, 0.005, 0.005, 0.004, hex(0x1a1408)), blob(0, 0, 0.006, 0.005, 0.005, 0.005, hex(0x2a2010)), blob(0, 0.001, 0.012, 0.004, 0.004, 0.004, hex(0x141008)), wing(1, 0.016, 0.008, 0.002, hex(0xd8e4ec)), wing(-1, 0.016, 0.008, 0.002, hex(0xd8e4ec))]), scale: 1.6, flap: 90, amp: 0.7, wingW: 0.004, where: "fleurs", day: true },
  bourdon: { n: 8, geo: () => geo([blob(0, 0, -0.004, 0.011, 0.011, 0.013, hex(0x2a2010)), blob(0, 0, -0.014, 0.008, 0.008, 0.005, hex(0xf4f0e0)), blob(0, 0, 0.006, 0.009, 0.009, 0.005, hex(0xe8b020)), wing(1, 0.016, 0.008, 0.004, hex(0xc8d0d8)), wing(-1, 0.016, 0.008, 0.004, hex(0xc8d0d8))]), scale: 1.5, flap: 70, amp: 0.6, wingW: 0.008, where: "fleurs", day: true },
  paon: { n: 6, geo: () => geo([blob(0, 0, 0, 0.003, 0.003, 0.016, hex(0x2a1a14)), wing(1, 0.032, 0.03, 0.008, hex(0xa83020)), wing(-1, 0.032, 0.03, 0.008, hex(0xa83020)), wing(1, 0.022, 0.018, -0.014, hex(0x6a2418)), wing(-1, 0.022, 0.018, -0.014, hex(0x6a2418))]), scale: 1.4, flap: 11, amp: 1.1, wingW: 0.003, where: "ouvert", day: true, flutter: true },
  pieride: { n: 8, geo: () => geo([blob(0, 0, 0, 0.003, 0.003, 0.014, hex(0x2a2a2a)), wing(1, 0.028, 0.026, 0.006, hex(0xf4f4ec)), wing(-1, 0.028, 0.026, 0.006, hex(0xf4f4ec)), wing(1, 0.02, 0.016, -0.012, hex(0xecece0)), wing(-1, 0.02, 0.016, -0.012, hex(0xecece0))]), scale: 1.4, flap: 12, amp: 1.1, wingW: 0.003, where: "ouvert", day: true, flutter: true },
  azure: { n: 6, geo: () => geo([blob(0, 0, 0, 0.002, 0.002, 0.01, hex(0x1a1a2a)), wing(1, 0.02, 0.018, 0.004, hex(0x5a8ae8)), wing(-1, 0.02, 0.018, 0.004, hex(0x5a8ae8)), wing(1, 0.014, 0.012, -0.008, hex(0x7a9ae0)), wing(-1, 0.014, 0.012, -0.008, hex(0x7a9ae0))]), scale: 1.4, flap: 14, amp: 1.1, wingW: 0.002, where: "ouvert", day: true, flutter: true },
  libellule: { n: 8, geo: () => geo([blob(0, 0, 0.02, 0.005, 0.005, 0.012, hex(0x2a6aa8)), blob(0, 0, -0.025, 0.002, 0.002, 0.035, hex(0x3a8ac8)), wing(1, 0.04, 0.008, 0.024, hex(0xdce8f0)), wing(-1, 0.04, 0.008, 0.024, hex(0xdce8f0)), wing(1, 0.038, 0.008, 0.01, hex(0xdce8f0)), wing(-1, 0.038, 0.008, 0.01, hex(0xdce8f0))]), scale: 1.3, flap: 40, amp: 0.4, wingW: 0.004, where: "eau", day: true, dart: true },
};

export class Insects {
  constructor(scene, world) {
    this.world = world;
    this.rand = mulberry32(99);
    this.uTime = { value: 0 };
    this.groups = {};
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = this.uTime;
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uTime; attribute vec3 aFlap;")
        .replace("#include <begin_vertex>", `#include <begin_vertex>
  // Ailes : les sommets hors du corps tournent autour de l'axe du corps
  float ph = 0.0;
#ifdef USE_INSTANCING
  ph = instanceMatrix[3].x * 7.3 + instanceMatrix[3].z * 3.1;
#endif
  float ax = abs(position.x);
  if (ax > aFlap.z) {
    float a = sin(uTime * aFlap.x + ph) * aFlap.y + 0.25;
    float r = ax - aFlap.z;
    transformed.x = sign(position.x) * (aFlap.z + r * cos(a));
    transformed.y = position.y + r * sin(a);
  }`);
    };
    for (const [k, T] of Object.entries(TYPES)) {
      const g = T.geo();
      const fl = new Float32Array(g.attributes.position.count * 3);
      for (let i = 0; i < fl.length; i += 3) { fl[i] = T.flap; fl[i + 1] = T.amp; fl[i + 2] = T.wingW; }
      g.setAttribute("aFlap", new THREE.BufferAttribute(fl, 3));
      const m = new THREE.InstancedMesh(g, mat, T.n);
      m.frustumCulled = false; m.count = 0;
      scene.add(m);
      this.groups[k] = { T, mesh: m, items: [] };
    }
    // Lucioles : points lumineux qui clignotent la nuit
    const NF = 90, fp = new Float32Array(NF * 3), ph = new Float32Array(NF);
    for (let i = 0; i < NF; i++) ph[i] = this.rand() * 100;
    const fg = new THREE.BufferGeometry();
    fg.setAttribute("position", new THREE.BufferAttribute(fp, 3));
    fg.setAttribute("aPh", new THREE.BufferAttribute(ph, 1));
    this.fireflyMat = new THREE.ShaderMaterial({
      uniforms: { uTime: this.uTime, uNight: { value: 0 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aPh; uniform float uTime; varying float vA;
        void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
          float b = pow(max(0.0, sin(uTime * 1.3 + aPh)), 6.0); vA = b; gl_PointSize = (2.0 + 5.0 * b) * 40.0 / max(1.0, -mv.z); }`,
      fragmentShader: `uniform float uNight; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d));
        gl_FragColor = vec4(vec3(0.75, 1.0, 0.35) * (0.4 + vA * 2.0), a * uNight * (0.25 + vA)); }`,
    });
    this.fireflies = new THREE.Points(fg, this.fireflyMat);
    this.fireflies.frustumCulled = false;
    scene.add(this.fireflies);
    this.fireflyPos = Array.from({ length: NF }, () => ({ p: new THREE.Vector3(1e6, 0, 0), v: new THREE.Vector3() }));
    this.m4 = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.e = new THREE.Euler(); this.s = new THREE.Vector3();
    this.t = 0;
  }

  // point de départ selon le milieu : fleurs (herbe dense), espace ouvert, bord de l'eau
  findSpot(type, cam) {
    const W = this.world, r = this.rand;
    for (let k = 0; k < 10; k++) {
      const a = r() * 6.28, d = 3 + r() * 22;
      const x = cam.x + Math.cos(a) * d, z = cam.z + Math.sin(a) * d;
      const h = W.heightAt(x, z), wl = W.waterLevelAt(x, z);
      const water = wl - h > 0.2;
      if (type.where === "eau") { if (water) return new THREE.Vector3(x, wl + 0.3 + r() * 0.8, z); continue; }
      if (water || h < 2) continue;
      const [i, j] = W._cell(x, z);
      const can = W.canopy ? W.canopy[j * W.V + i] : 0;
      if (type.where === "ouvert" && can > 0.4) continue;
      return new THREE.Vector3(x, h + 0.3 + r() * 1.2, z);
    }
    return null;
  }

  update(dt, cam, day) {
    this.uTime.value += dt;
    const r = this.rand, t = this.uTime.value;
    this.t -= dt;
    const respawn = this.t <= 0;
    if (respawn) this.t = 1.5;
    for (const [k, G] of Object.entries(this.groups)) {
      const T = G.T;
      const want = day > 0.45 ? T.n : 0;
      if (respawn) {
        G.items = G.items.filter((it) => it.p.distanceTo(cam) < 40);
        while (G.items.length < want) {
          const p = this.findSpot(T, cam); if (!p) break;
          G.items.push({ p, home: p.clone(), tgt: p.clone(), v: new THREE.Vector3(), ph: r() * 10, wait: 0 });
        }
        if (!want) G.items.length = 0;
      }
      let n = 0;
      for (const it of G.items) {
        // vol vers une cible proche de la « maison » (fleur, eau) ; les papillons volettent, les libellules foncent
        it.wait -= dt;
        if (it.p.distanceTo(it.tgt) < 0.15 || it.wait < -4) {
          const rad = T.dart ? 4 : T.flutter ? 3 : 1.5;
          const g = this.world.heightAt(it.home.x, it.home.z), wl = this.world.waterLevelAt(it.home.x, it.home.z);
          it.tgt.set(it.home.x + (r() - 0.5) * rad * 2, Math.max(g, wl) + 0.25 + r() * (T.flutter ? 1.6 : 0.9), it.home.z + (r() - 0.5) * rad * 2);
          it.wait = T.dart ? 0.6 + r() * 1.5 : r() * 0.6;
        }
        const sp = T.dart ? (it.wait > 0 ? 0 : 5) : T.flutter ? 1.2 : 1.6;
        const want = this.s.copy(it.tgt).sub(it.p);
        if (want.lengthSq() > 1e-6) want.normalize().multiplyScalar(sp);
        it.v.lerp(want, Math.min(1, dt * (T.dart ? 6 : 3)));
        if (T.flutter) it.v.y += Math.sin(t * 7 + it.ph) * 0.6 * dt * 10;
        it.p.addScaledVector(it.v, dt);
        // abeilles : vrombissement autour (petit tremblement)
        const jit = T.flutter ? 0 : 0.01;
        this.q.setFromEuler(this.e.set(0, Math.atan2(it.v.x, it.v.z), 0));
        this.s.set(T.scale, T.scale, T.scale);
        this.m4.compose(new THREE.Vector3(it.p.x + Math.sin(t * 40 + it.ph) * jit, it.p.y + Math.sin(t * 33 + it.ph) * jit, it.p.z), this.q, this.s);
        G.mesh.setMatrixAt(n++, this.m4);
      }
      G.mesh.count = n;
      G.mesh.visible = n > 0;
      G.mesh.instanceMatrix.needsUpdate = true;
    }
    // Lucioles
    const night = Math.max(0, 1 - day * 3);
    this.fireflyMat.uniforms.uNight.value = night;
    this.fireflies.visible = night > 0.01;
    if (night > 0.01) {
      const a = this.fireflies.geometry.attributes.position;
      this.fireflyPos.forEach((f, i) => {
        if (f.p.distanceTo(cam) > 35) {
          const ang = r() * 6.28, d = 4 + r() * 28;
          const x = cam.x + Math.cos(ang) * d, z = cam.z + Math.sin(ang) * d;
          f.p.set(x, this.world.heightAt(x, z) + 0.4 + r() * 2.2, z);
        }
        f.v.set(Math.sin(t * 0.3 + i) * 0.3, Math.sin(t * 0.5 + i * 1.7) * 0.15, Math.cos(t * 0.27 + i * 0.6) * 0.3);
        f.p.addScaledVector(f.v, dt);
        a.setXYZ(i, f.p.x, f.p.y, f.p.z);
      });
      a.needsUpdate = true;
    }
  }
}
