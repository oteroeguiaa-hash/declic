// Modèles d'animaux « réalistes » : corps, cou, tête, pattes et queue sculptés par « loft » (sections
// elliptiques lissées le long d'une colonne), pattes articulées (épaule/hanche + genou/jarret), pelage
// coloré par zones (dos, ventre, motifs propres à l'espèce) et matériau « fourrure » (grain fin + liseré de lumière).
import * as THREE from "three";
import { mergeGeometries } from "../vendor/addons/BufferGeometryUtils.js";
import { mulberry32 } from "./noise.js";

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const C = (h) => new THREE.Color(h);

// ---------- Matériau fourrure ----------
export const FUR = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0 });
FUR.onBeforeCompile = (sh) => {
  sh.vertexShader = sh.vertexShader
    .replace("#include <common>", "#include <common>\nvarying vec3 vOP;")
    .replace("#include <begin_vertex>", "#include <begin_vertex>\nvOP = position;");
  sh.fragmentShader = sh.fragmentShader
    .replace("#include <common>", `#include <common>
varying vec3 vOP;
float h3(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float n3(vec3 x){ vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z); }`)
    .replace("#include <color_fragment>", `#include <color_fragment>
  // Mèches : grain allongé + variations douces
  float strand = n3(vOP * vec3(140.0, 40.0, 140.0)) * 0.6 + n3(vOP * 22.0) * 0.4;
  diffuseColor.rgb *= 0.78 + 0.36 * strand;`)
    .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  // Liseré de lumière sur les contours (poils qui accrochent la lumière)
  float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 3.0);
  totalEmissiveRadiance += diffuseColor.rgb * rim * 0.35;`);
};
export const EYE = new THREE.MeshStandardMaterial({ color: 0x120c08, roughness: 0.08, metalness: 0.1 });
const HORN = new THREE.MeshStandardMaterial({ color: 0xd8ccb0, roughness: 0.5 });

// Coque de poils : décalée le long de la normale, percée selon un bruit fin (mèches) ; pointes plus claires
let furShells = true;
export function setFurShells(on) { furShells = on; }
function shellMaterial(off, freqK) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, alphaTest: 0.5 });
  m.userData.u = { uOff: { value: off }, uFreq: { value: 55 * freqK } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uOff; varying vec3 vSP;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\ntransformed += normal * uOff; vSP = position;");
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", `#include <common>
uniform float uFreq; varying vec3 vSP;
float hs(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }`)
      .replace("#include <alphatest_fragment>", `
  vec3 q = vSP * uFreq * vec3(1.0, 0.35, 1.0);
  float h = hs(floor(q * 4.0));
  if (h < 0.55) discard;
  diffuseColor.rgb *= 1.08 + 0.15 * h;`);
  };
  m.customProgramCacheKey = () => "furshell";
  return m;
}

// ---------- Outils de géométrie ----------
const cr = (p0, p1, p2, p3, t) => 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);

// sections : [{ c: Vector3, rx, ry, roll? }] ; colorFn(pos, dirFromCenter, t) → Color
export function loft(sections, colorFn, seg = 16, sub = 4) {
  // Densification par spline (centres et rayons)
  const S = [];
  const n = sections.length;
  for (let i = 0; i < n - 1; i++) {
    const a = sections[Math.max(0, i - 1)], b = sections[i], c = sections[i + 1], d = sections[Math.min(n - 1, i + 2)];
    for (let k = 0; k < sub; k++) {
      const t = k / sub;
      S.push({
        c: V3(cr(a.c.x, b.c.x, c.c.x, d.c.x, t), cr(a.c.y, b.c.y, c.c.y, d.c.y, t), cr(a.c.z, b.c.z, c.c.z, d.c.z, t)),
        rx: Math.max(0.0005, cr(a.rx, b.rx, c.rx, d.rx, t)), ry: Math.max(0.0005, cr(a.ry, b.ry, c.ry, d.ry, t)),
      });
    }
  }
  S.push(sections[n - 1]);
  const pos = [], col = [], idx = [];
  const m = S.length;
  let prevSide = null;
  for (let i = 0; i < m; i++) {
    const s = S[i];
    const tan = S[Math.min(m - 1, i + 1)].c.clone().sub(S[Math.max(0, i - 1)].c).normalize();
    let side = new THREE.Vector3().crossVectors(tan, V3(0, 1, 0));
    if (side.lengthSq() < 1e-4) side = prevSide ? prevSide.clone() : V3(1, 0, 0);
    side.normalize(); prevSide = side;
    const up = new THREE.Vector3().crossVectors(side, tan).normalize();
    for (let k = 0; k < seg; k++) {
      const a = (k / seg) * Math.PI * 2;
      const dir = side.clone().multiplyScalar(Math.cos(a)).addScaledVector(up, Math.sin(a));
      const p = s.c.clone().addScaledVector(side, Math.cos(a) * s.rx).addScaledVector(up, Math.sin(a) * s.ry);
      pos.push(p.x, p.y, p.z);
      const cc = colorFn(p, dir, i / (m - 1));
      col.push(cc.r, cc.g, cc.b);
    }
  }
  for (let i = 0; i < m - 1; i++) for (let k = 0; k < seg; k++) {
    const a = i * seg + k, b = i * seg + ((k + 1) % seg), c = a + seg, d = b + seg;
    idx.push(a, c, b, b, c, d);
  }
  // Bouchons
  for (const [ring, flip] of [[0, true], [m - 1, false]]) {
    const ci = pos.length / 3, s = S[ring];
    pos.push(s.c.x, s.c.y, s.c.z);
    const cc = colorFn(s.c, V3(0, 0, 0), ring / (m - 1)); col.push(cc.r, cc.g, cc.b);
    for (let k = 0; k < seg; k++) { const a = ring * seg + k, b = ring * seg + ((k + 1) % seg); flip ? idx.push(ci, a, b) : idx.push(ci, b, a); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function ellipsoid(rx, ry, rz, c, colorFn, seg = 14) {
  const g = new THREE.SphereGeometry(1, seg, Math.max(6, seg >> 1));
  g.deleteAttribute("uv");
  g.scale(rx, ry, rz); g.translate(c.x, c.y, c.z);
  const p = g.attributes.position, col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const v = V3(p.getX(i), p.getY(i), p.getZ(i)), d = v.clone().sub(c).normalize();
    const cc = colorFn(v, d, 0); col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b;
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
}

export const mesh = (geos, mat = FUR) => { const m = new THREE.Mesh(geos.length > 1 ? mergeGeometries(geos) : geos[0], mat); m.castShadow = true; m.receiveShadow = true; return m; };

const antler = (m) => { m.userData.antler = true; return m; };

// Fusionne les morceaux immobiles d'un groupe en un seul maillage (moins d'appels de dessin)
export function flatten(group) {
  const geos = [], keep = [];
  for (const o of [...group.children]) {
    if (!o.isMesh || o.userData.antler) { if (o.isMesh) keep.push(o); continue; }
    o.updateMatrix();
    let g = o.geometry.clone().applyMatrix4(o.matrix);
    if (g.index === null) g = g.toNonIndexed();
    for (const k of Object.keys(g.attributes)) if (k !== "position" && k !== "normal" && k !== "color") g.deleteAttribute(k);
    if (!g.attributes.color) {
      const c = o.material.color || new THREE.Color(1, 1, 1), a = new Float32Array(g.attributes.position.count * 3);
      for (let i = 0; i < a.length; i += 3) { a[i] = c.r; a[i + 1] = c.g; a[i + 2] = c.b; }
      g.setAttribute("color", new THREE.BufferAttribute(a, 3));
    }
    if (!g.index) { const idx = []; for (let i = 0; i < g.attributes.position.count; i++) idx.push(i); g.setIndex(idx); }
    geos.push(g);
    group.remove(o);
  }
  if (geos.length) { const m = new THREE.Mesh(mergeGeometries(geos), FUR); m.castShadow = true; group.add(m); }
}

// ---------- Pelage ----------
// Couleur d'un point selon les zones : dos, flancs, ventre + motif de l'espèce.
function furFn(s, part, rand) {
  const base = C(s.col), belly = C(s.belly), dark = C(s.dark), back = C(s.back ?? s.col).multiplyScalar(s.back ? 1 : 0.72);
  const L = s.bodyLen, out = new THREE.Color();
  return (p, d, t) => {
    out.copy(base);
    // ventre clair, dos plus foncé
    out.lerp(belly, Math.max(0, Math.min(1, (-d.y - 0.15) * 1.8)) * (part === "head" ? 0.7 : 1));
    out.lerp(back, Math.max(0, Math.min(1, (d.y - 0.45) * 2)) * (part === "body" || part === "neck" ? 1 : 0.4));
    const pat = s.pattern;
    if (part === "body" && pat === "spots") { const k = Math.sin(p.x * 61 + p.z * 23) * Math.sin(p.y * 47 - p.z * 59) * Math.sin(p.x * 17 + p.y * 71); if (k > 0.35) out.lerp(dark, 0.75); }
    if ((part === "body" || part === "neck") && pat === "tabby") { const k = Math.sin(p.z * 34 + Math.sin(p.y * 20) * 1.5); if (k > 0.55 && d.y > -0.3) out.lerp(dark, 0.6); }
    if (part === "body" && pat === "rump" && p.z < -L * 0.38 && d.y > -0.4 && Math.abs(d.x) < 0.75) out.lerp(belly, 0.85);
    if (part === "body" && pat === "saddle" && d.y > 0.35 && p.z > -L * 0.3 && p.z < L * 0.2) out.lerp(dark, 0.45);
    if (part === "neck" && s.chest && d.y < 0.1 && d.z > -0.2) out.lerp(belly, 0.8);
    if (part === "legLow" && s.socks) out.lerp(C(s.socks), 0.85);
    if (part === "legLow" && s.legCol) out.lerp(C(s.legCol), 0.8);
    if (part === "snout") { if (s.snoutCol) out.lerp(C(s.snoutCol), 0.85); if (s.cheeks && d.y < 0.2) out.lerp(belly, 0.75); }
    if (part === "head" && s.cheeks && d.y < -0.1) out.lerp(belly, 0.7);
    if (part === "head" && s.mask && d.y > -0.1 && d.y < 0.5) out.lerp(dark, 0.4);
    if (part === "tail") {
      if (s.tailRings) { if (Math.sin(t * 28) > 0.3) out.lerp(dark, 0.75); }
      if (s.tailTip && t > 0.82) out.copy(C(s.tailTip));
      if (s.tailCol) out.copy(C(s.tailCol));
    }
    if (part === "ear" && s.earBack && d.z < 0) out.lerp(dark, 0.8);
    // Blaireau : tête blanche à deux bandes noires, corps gris
    if (pat === "badger" && (part === "head" || part === "snout" || part === "ear")) { out.copy(C(0xf0eee8)); if (part === "ear" || (Math.abs(d.x) > 0.18 && Math.abs(d.x) < 0.7 && d.y > -0.45)) out.copy(C(0x141210)); if (part === "ear") out.copy(C(0xf0eee8)); }
    // Hérisson : piquants bruns à pointes claires
    if (pat === "spines" && (part === "body" || (part === "neck" && d.y > 0)) && d.y > -0.25) { out.copy(C(0x6a5644)).lerp(C(0xc8b8a0), 0.25 + 0.2 * Math.sin(p.z * 60)); }
    // Glouton : bande claire sur les flancs
    if (pat === "band" && part === "body" && d.y > 0.05 && d.y < 0.45) out.lerp(C(s.bandCol || 0xb08a50), 0.75);
    // Loutre, martre : gorge claire
    if (s.throat && (part === "neck" || part === "head") && d.y < -0.15) out.lerp(C(s.throat), 0.85);
    // Bison : avant du corps et cou plus sombres et laineux
    if (s.shaggy && (part === "neck" || part === "head" || (part === "body" && p.z > 0.05 * L) || (part === "legUp" && p.z > 0))) out.lerp(C(s.shaggy), 0.7);
    out.multiplyScalar(0.92 + rand() * 0.16);
    return out.clone();
  };
}

// ---------- Construction d'un quadrupède ----------
export function buildAnimal(s) {
  const rand = mulberry32(s.seed || 1);
  const g = new THREE.Group();
  const body = new THREE.Group();
  const height = s.legLen + s.bodyR * 0.85;
  body.position.y = height;
  g.add(body);
  const L = s.bodyLen, R = s.bodyR, W = s.bodyW / 2, hump = s.hump ? 1 : 0, tuck = s.tuck ?? 0.3;

  // Tronc : de la croupe au garrot
  const torso = [
    { c: V3(0, 0.08 * R, -0.56 * L), rx: 0.04 * W, ry: 0.04 * R },
    { c: V3(0, 0.12 * R, -0.5 * L), rx: 0.62 * W, ry: 0.62 * R },
    { c: V3(0, 0.1 * R, -0.36 * L), rx: 0.96 * W, ry: 0.96 * R },
    { c: V3(0, (0.06 + tuck * 0.12) * R, -0.08 * L), rx: 0.9 * W, ry: (0.92 - tuck * 0.18) * R },
    { c: V3(0, 0.0, 0.18 * L), rx: 1.0 * W, ry: 1.02 * R },
    { c: V3(0, (0.06 + hump * 0.22) * R, 0.36 * L), rx: 0.9 * W, ry: (0.96 + hump * 0.28) * R },
    { c: V3(0, 0.28 * R, 0.5 * L), rx: 0.66 * W, ry: 0.72 * R },
  ];
  const torsoMesh = mesh([loft(torso, furFn(s, "body", rand), 24, 6)]);
  body.add(torsoMesh);
  if (s.mane) body.add(mesh([loft([{ c: V3(0, 0.8 * R, -0.1 * L), rx: 0.01, ry: 0.01 }, { c: V3(0, 1.05 * R, 0.15 * L), rx: 0.18 * W, ry: 0.3 * R }, { c: V3(0, 1.1 * R, 0.42 * L), rx: 0.22 * W, ry: 0.32 * R }, { c: V3(0, 0.8 * R, 0.58 * L), rx: 0.01, ry: 0.01 }], () => C(s.dark), 10, 4)]));

  // Pattes articulées : pivot (hanche/épaule) → genou → pied
  const legs = [], knees = [];
  const legTop = -R * 0.35;
  const Lr = height + legTop;
  for (const [sx, front] of [[1, true], [-1, true], [1, false], [-1, false]]) {
    const pivot = new THREE.Group();
    pivot.position.set(sx * W * 0.62, legTop, front ? 0.33 * L : -0.36 * L);
    const up = Lr * 0.5, lo = Lr * 0.5;
    const thick = front ? 1 : 1.25;
    const kneeZ = front ? 0.02 : -0.08 * Lr;
    // Épaule / cuisse : grosse masse musculaire fondue dans le corps, puis la patte s'affine jusqu'au genou
    const mass = Math.min(W * 0.42, R * 0.5) * (front ? 0.85 : 1);
    const upper = [
      { c: V3(-sx * W * 0.12, R * 0.62, 0), rx: mass * 0.6, ry: mass * 0.7 },
      { c: V3(-sx * W * 0.06, R * 0.3, 0), rx: mass * 0.92, ry: mass * 1.05 },
      { c: V3(0, -up * 0.05, kneeZ * 0.2), rx: Math.max(s.legR * 2.2, mass * 0.62) * thick, ry: Math.max(s.legR * 2.6, mass * 0.75) * thick },
      { c: V3(0, -up * 0.55, kneeZ * 0.65), rx: s.legR * 1.55 * thick, ry: s.legR * 1.8 * thick },
      { c: V3(0, -up, kneeZ), rx: s.legR * 1.1, ry: s.legR * 1.2 },
    ];
    pivot.add(mesh([loft(upper, furFn(s, "legUp", rand), 14, 4)]));
    const knee = new THREE.Group();
    knee.position.set(0, -up, kneeZ);
    const lower = [
      { c: V3(0, 0.02, 0), rx: s.legR * 1.1, ry: s.legR * 1.2 },
      { c: V3(0, -lo * 0.5, front ? 0.0 : 0.04 * Lr), rx: s.legR * 0.85, ry: s.legR * 0.95 },
      { c: V3(0, -lo + s.legR * 0.9, (front ? 0.0 : 0.05 * Lr) + s.legR * 0.3), rx: s.legR * 0.8, ry: s.legR * 0.85 },
    ];
    const parts = [loft(lower, furFn(s, "legLow", rand), 12, 4)];
    const foot = V3(0, -lo + s.legR * 0.7, (front ? 0.0 : 0.05 * Lr) + s.legR * (s.hoof ? 0.3 : 0.9));
    parts.push(ellipsoid(s.legR * (s.hoof ? 0.95 : 1.3), s.legR * 0.75, s.legR * (s.hoof ? 1.1 : 1.8), foot, () => C(s.hoof ? 0x1a1410 : s.socks || s.dark), 10));
    knee.add(mesh(parts));
    pivot.add(knee);
    body.add(pivot);
    legs.push(pivot); knees.push(knee);
  }

  // Cou
  const neck = new THREE.Group();
  neck.position.set(0, R * 0.32, L * 0.47);
  const na = s.neckAngle, nl = s.neckLen;
  const nEnd = V3(0, Math.sin(na) * nl, Math.cos(na) * nl);
  neck.add(mesh([loft([
    { c: V3(0, -0.05 * R, -0.08 * L), rx: W * 0.7, ry: R * 0.72 },
    { c: V3(0, nEnd.y * 0.45, nEnd.z * 0.45), rx: s.neckR * 1.15, ry: s.neckR * 1.3 },
    { c: nEnd.clone(), rx: s.neckR * 0.95, ry: s.neckR * 1.05 },
    { c: nEnd.clone().add(V3(0, 0.02, 0.03)), rx: s.neckR * 0.6, ry: s.neckR * 0.6 },
  ], furFn(s, "neck", rand), 14, 4)]));

  // Tête : crâne → museau → truffe
  const head = new THREE.Group();
  head.position.copy(nEnd);
  head.rotation.x = s.headTilt ?? 0.35;
  const hl = s.headLen, hr = s.headR, sl = s.snoutLen, sr = s.snoutR;
  head.add(mesh([
    loft([
      { c: V3(0, 0.05 * hr, -0.25 * hl), rx: 0.4 * hr, ry: 0.4 * hr },
      { c: V3(0, 0.05 * hr, -0.05 * hl), rx: 0.95 * hr, ry: 0.95 * hr },
      { c: V3(0, 0.0, 0.2 * hl), rx: 0.92 * hr, ry: 0.88 * hr },
      { c: V3(0, -0.12 * hr, 0.42 * hl), rx: 0.62 * hr, ry: 0.65 * hr },
    ], furFn(s, "head", rand), 16, 4),
    loft([
      { c: V3(0, -0.12 * hr, 0.38 * hl), rx: Math.max(sr * 1.3, 0.55 * hr), ry: Math.max(sr * 1.25, 0.58 * hr) },
      { c: V3(0, -0.18 * hr, 0.45 * hl + sl * 0.5), rx: sr * 1.05, ry: sr * 1.0 },
      { c: V3(0, -0.2 * hr, 0.45 * hl + sl * 0.95), rx: sr * 0.85, ry: sr * 0.75 },
      { c: V3(0, -0.2 * hr, 0.45 * hl + sl * 1.02), rx: sr * 0.4, ry: sr * 0.35 },
    ], furFn(s, "snout", rand), 14, 3),
  ]));
  const noseZ = 0.45 * hl + sl * 1.0;
  const nose = new THREE.Mesh(new THREE.SphereGeometry(sr * (s.pig ? 0.75 : 0.42), 12, 8), new THREE.MeshStandardMaterial({ color: s.pig ? 0x5a4038 : 0x141010, roughness: 0.25 }));
  nose.position.set(0, -0.18 * hr, noseZ); if (s.pig) nose.scale.z = 0.35;
  head.add(nose);
  for (const sx of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(Math.max(0.006, hr * 0.12), 10, 8), EYE);
    e.position.set(sx * hr * 0.66, hr * 0.22, 0.22 * hl);
    head.add(e);
    // Oreilles : feuille aplatie, orientée vers le haut et l'arrière
    if (s.ears) {
      const es = s.ears.size, round = !s.ears.pointy;
      const base = V3(sx * hr * 0.55, hr * 0.7, -0.05 * hl);
      const dir = V3(sx * 0.35, s.ears.up ?? 1, -0.25).normalize();
      const long = (s.ears.up ?? 1) > 1.2;   // lapin, lièvre : oreilles longues et étroites
      const ear = loft([
        { c: base, rx: es * (long ? 0.2 : 0.3), ry: es * 0.14 },
        { c: base.clone().addScaledVector(dir, es * 0.15), rx: es * (long ? 0.2 : 0.34), ry: es * 0.1 },
        { c: base.clone().addScaledVector(dir, es * 0.55), rx: es * (long ? 0.18 : round ? 0.32 : 0.24), ry: es * 0.06 },
        { c: base.clone().addScaledVector(dir, es * 0.92), rx: es * (long ? 0.1 : round ? 0.16 : 0.05), ry: es * 0.04 },
        { c: base.clone().addScaledVector(dir, es), rx: 0.002, ry: 0.002 },
      ], (p, d) => { const c = furFn(s, "ear", rand)(p, d); if (d.z > 0.3 && Math.abs(d.x) < 0.7) c.lerp(C(s.earIn || 0xc8a090), 0.55); return c; }, 10, 3);
      head.add(mesh([ear]));
      if (s.tufts) { const t0 = base.clone().addScaledVector(dir, es); head.add(mesh([loft([{ c: t0, rx: es * 0.06, ry: es * 0.06 }, { c: t0.clone().add(V3(0, es * 0.45, 0)), rx: 0.002, ry: 0.002 }], () => C(s.dark), 6, 2)])); }
    }
    if (s.tusks) {
      const t0 = V3(sx * sr * 0.9, -0.28 * hr, 0.45 * hl + sl * 0.75);
      head.add(mesh([loft([{ c: t0, rx: sr * 0.18, ry: sr * 0.18 }, { c: t0.clone().add(V3(sx * 0.02, 0.06, 0.0)), rx: sr * 0.12, ry: sr * 0.12 }, { c: t0.clone().add(V3(sx * 0.03, 0.1, -0.03)), rx: 0.002, ry: 0.002 }], () => C(0xeee4cc), 6, 3)], HORN));
    }
  }
  if (s.antlers === "deer") for (const sx of [-1, 1]) {
    const tine = (pts, r0) => loft(pts.map((p, i) => ({ c: p, rx: r0 * (1 - i / pts.length * 0.7), ry: r0 * (1 - i / pts.length * 0.7) })), () => C(0x8a7458), 6, 3);
    const b = V3(sx * hr * 0.35, hr * 0.85, -0.02 * hl);
    const m1 = b.clone().add(V3(sx * 0.16, 0.28, -0.1)), t1 = m1.clone().add(V3(sx * 0.12, 0.26, -0.06)), t2 = t1.clone().add(V3(sx * 0.02, 0.14, 0.08));
    head.add(antler(mesh([tine([b, m1, t1, t2], 0.026), tine([b.clone().lerp(m1, 0.35), b.clone().lerp(m1, 0.35).add(V3(sx * 0.04, 0.1, 0.14))], 0.016), tine([m1, m1.clone().add(V3(sx * 0.02, 0.16, 0.12))], 0.014), tine([t1, t1.clone().add(V3(sx * 0.08, 0.1, -0.06))], 0.012)])));
  }
  if (s.antlers === "roe") for (const sx of [-1, 1]) {
    const b = V3(sx * hr * 0.3, hr * 0.85, -0.02 * hl), t = b.clone().add(V3(sx * 0.03, 0.2, -0.02));
    const tine = (pts, r0) => loft(pts.map((p, i) => ({ c: p, rx: r0 * (1 - i / pts.length * 0.6), ry: r0 * (1 - i / pts.length * 0.6) })), () => C(0x6a5440), 6, 2);
    head.add(antler(mesh([tine([b, b.clone().lerp(t, 0.5), t], 0.014), tine([b.clone().lerp(t, 0.55), b.clone().lerp(t, 0.55).add(V3(0, 0.06, 0.06))], 0.008), tine([t.clone().add(V3(0, -0.04, 0)), t.clone().add(V3(0, 0.0, -0.07))], 0.007)])));
  }
  if (s.horns === "bison") for (const sx of [-1, 1]) {
    const b = V3(sx * hr * 0.75, hr * 0.55, -0.05 * hl);
    head.add(mesh([loft([{ c: b, rx: hr * 0.13, ry: hr * 0.13 }, { c: b.clone().add(V3(sx * hr * 0.35, hr * 0.05, 0.02)), rx: hr * 0.1, ry: hr * 0.1 }, { c: b.clone().add(V3(sx * hr * 0.45, hr * 0.4, 0.06)), rx: hr * 0.05, ry: hr * 0.05 }, { c: b.clone().add(V3(sx * hr * 0.38, hr * 0.55, 0.04)), rx: 0.003, ry: 0.003 }], () => C(0x1c1814), 8, 3)], HORN));
  }
  if (s.antlers === "moose") for (const sx of [-1, 1]) {
    const b = V3(sx * hr * 0.4, hr * 0.8, -0.05 * hl);
    const parts = [loft([{ c: b, rx: 0.04, ry: 0.04 }, { c: b.clone().add(V3(sx * 0.25, 0.08, -0.02)), rx: 0.035, ry: 0.035 }], () => C(0xb0a080), 6, 2)];
    const pal = ellipsoid(0.32, 0.04, 0.22, b.clone().add(V3(sx * 0.5, 0.14, -0.02)), () => C(0xb8a888), 12);
    pal.rotateZ(sx * 0.35);
    parts.push(pal);
    for (let k = 0; k < 5; k++) parts.push(loft([{ c: b.clone().add(V3(sx * (0.32 + k * 0.08), 0.2, 0.12 - k * 0.06)), rx: 0.018, ry: 0.018 }, { c: b.clone().add(V3(sx * (0.36 + k * 0.09), 0.36, 0.15 - k * 0.07)), rx: 0.002, ry: 0.002 }], () => C(0xb8a888), 5, 2));
    head.add(mesh(parts));
  }
  if (s.dewlap) head.add(mesh([loft([{ c: V3(0, -hr * 0.8, 0.05 * hl), rx: 0.03, ry: 0.03 }, { c: V3(0, -hr * 1.4, 0.0), rx: 0.04, ry: 0.06 }, { c: V3(0, -hr * 1.7, -0.02), rx: 0.002, ry: 0.002 }], furFn(s, "neck", rand), 6, 3)]));
  flatten(head);
  neck.add(head);
  body.add(neck);

  // Queue
  let tail = null;
  if (s.tail) {
    const t = s.tail;
    tail = new THREE.Group();
    tail.position.set(0, R * 0.42, -L * 0.52);
    const pts = [];
    const segs = 6;
    for (let i = 0; i <= segs; i++) {
      const u = i / segs;
      const ang = t.angle + (t.curl ? u * u * 2.6 : t.droop ? -u * 0.6 : 0);
      const prev = pts.length ? pts[pts.length - 1].c : V3(0, 0, 0);
      const stepL = t.len / segs;
      const c = i === 0 ? V3(0, 0, 0) : prev.clone().add(V3(0, Math.sin(ang) * stepL, -Math.cos(ang) * stepL));
      const r0 = t.bushy ? t.r * (0.45 + Math.sin(Math.min(1, u * 1.1) * Math.PI) * 0.75) * (u > 0.95 ? 0.4 : 1) : t.r * (1 - u * 0.65);
      const r = r0;
      pts.push(t.flat ? { c, rx: r * (u > 0.25 ? 2.6 : 1) * (u > 0.9 ? 0.6 : 1), ry: r * (u > 0.25 ? 0.25 : 1) } : { c, rx: r, ry: r });
    }
    pts.push({ c: pts[pts.length - 1].c.clone().add(V3(0, 0, -0.005)), rx: 0.002, ry: 0.002 });
    tail.add(mesh([loft(pts, furFn(s, "tail", rand), 10, 3)]));
    body.add(tail);
  }
  // Pelage : une coque légèrement gonflée, découpée en mèches, donne une silhouette duveteuse (poils)
  if (furShells) {
    const sm = shellMaterial(Math.max(0.004, Math.min(0.03, R * 0.07)), 1 / Math.max(0.05, L));
    const add = (m) => { if (!m || !m.isMesh) return; const sh = new THREE.Mesh(m.geometry, sm); sh.castShadow = false; m.add(sh); };
    add(torsoMesh);
    neck.children.forEach((m) => m.material === FUR && add(m));
    head.children.forEach((m) => m.material === FUR && !m.userData.antler && add(m));
    if (tail) tail.children.forEach(add);
    legs.forEach((p) => p.children.forEach((m) => m.isMesh && add(m)));
  }
  return { group: g, body, legs, knees, neck, head, tail, height };
}

// ---------- Oiseaux ----------
export function buildBird(b) {
  const rand = mulberry32(b.seed || 3);
  const g = new THREE.Group();
  const L = b.size, r = L * 0.22;
  const col = (part) => (p, d) => {
    const out = C(b.col);
    if (part === "body" && d.y < -0.2 && b.belly) out.lerp(C(b.belly), Math.min(1, (-d.y - 0.2) * 2.5));
    if (part === "body" && b.breast && d.y < 0.3 && p.z > L * 0.05) out.lerp(C(b.breast), 0.9);
    if (part === "head" && b.head) out.copy(C(b.head));
    if (part === "head" && b.cheek && d.y < 0.3 && Math.abs(d.x) > 0.5) out.lerp(C(b.cheek), 0.9);
    if (part === "head" && b.crown && d.y > 0.4) out.lerp(C(b.crown), 0.9);
    if (part === "tail" && b.tailCol) out.copy(C(b.tailCol));
    if (part === "wing" && b.wing) out.copy(C(b.wing));
    if (part === "wing" && b.wingBar && Math.abs(p.x) > L * 0.25 && Math.abs(p.x) < L * 0.38) out.lerp(C(b.wingBar), 0.85);
    return out.multiplyScalar(0.92 + rand() * 0.16);
  };
  const neckLen = b.neck || 0;
  const body = [
    { c: V3(0, 0, -0.5 * L), rx: 0.002, ry: 0.002 },
    { c: V3(0, 0.02 * L, -0.32 * L), rx: r * 0.7, ry: r * 0.6 },
    { c: V3(0, 0, 0), rx: r, ry: r * 1.05 },
    { c: V3(0, 0.03 * L, 0.25 * L), rx: r * 0.75, ry: r * 0.8 },
    { c: V3(0, 0.08 * L + neckLen * 0.6, 0.36 * L + neckLen * 0.3), rx: r * 0.42, ry: r * 0.45 },
  ];
  const parts = [loft(body, col("body"), 12, 3)];
  const hc = V3(0, 0.12 * L + neckLen, 0.42 * L + neckLen * 0.45);
  const hk = b.owl ? 1.45 : 1;
  parts.push(ellipsoid(r * 0.62 * hk, r * 0.6 * hk, r * 0.7 * (b.owl ? 1.05 : 1), hc, col("head"), 10));
  if (b.owl) parts.push(ellipsoid(r * 0.62 * hk * 0.85, r * 0.6 * hk * 0.8, r * 0.12, hc.clone().add(V3(0, 0, r * 0.62)), () => C(b.face || 0xd8c8a8), 12));
  if (neckLen) parts.push(loft([{ c: V3(0, 0.06 * L, 0.3 * L), rx: r * 0.42, ry: r * 0.45 }, { c: V3(0, 0.06 * L + neckLen * 0.6, 0.36 * L + neckLen * 0.05), rx: r * 0.28, ry: r * 0.3 }, { c: hc.clone().add(V3(0, -r * 0.2, -r * 0.2)), rx: r * 0.3, ry: r * 0.32 }], col("body"), 8, 4));
  const bl = b.beak || L * 0.12;
  parts.push(loft([{ c: hc.clone().add(V3(0, -r * 0.05, r * 0.55)), rx: r * 0.17, ry: r * 0.14 }, { c: hc.clone().add(V3(0, -r * 0.1 - (b.hook ? bl * 0.2 : 0), r * 0.55 + bl)), rx: 0.002, ry: 0.002 }], () => C(b.beakCol || 0x2a2420), 6, 2));
  parts.push(loft([{ c: V3(0, 0.02 * L, -0.38 * L), rx: r * 0.35, ry: r * 0.08 }, { c: V3(0, 0.0, -0.38 * L - (b.tail || 0.3) * L), rx: r * (b.fork ? 0.9 : 0.6), ry: r * 0.04 }], col("tail"), 8, 2));
  for (const sx of [-1, 1]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(r * 0.12, 8, 6), EYE);
    e.position.copy(hc).add(b.owl ? V3(sx * r * 0.32, r * 0.12, r * 0.72) : V3(sx * r * 0.48, r * 0.12, r * 0.25));
    if (b.owl) e.scale.setScalar(1.9);
    g.add(e);
  }
  if (b.legs) for (const sx of [-1, 1]) parts.push(loft([{ c: V3(sx * r * 0.35, -r * 0.8, 0), rx: r * 0.06, ry: r * 0.06 }, { c: V3(sx * r * 0.35, -r * 0.8 - b.legs * L, 0.02 * L), rx: r * 0.05, ry: r * 0.05 }], () => C(0x8a7a50), 5, 2));
  const bodyMesh = mesh(parts);
  bodyMesh.castShadow = false;
  g.add(bodyMesh);
  // Ailes : pivot à l'épaule, profil effilé
  const wings = [];
  const span = L * (b.span || 0.8);
  for (const sx of [-1, 1]) {
    const pv = new THREE.Group();
    pv.position.set(sx * r * 0.8, r * 0.35, 0.06 * L);
    // section : rx = largeur de l'aile (avant-arrière), ry = épaisseur
    const w = loft([
      { c: V3(0, 0, 0.0), rx: L * 0.22, ry: r * 0.12 },
      { c: V3(sx * span * 0.45, 0.01 * L, -0.03 * L), rx: L * 0.21, ry: r * 0.07 },
      { c: V3(sx * span * 0.85, 0.0, -0.1 * L), rx: L * 0.13, ry: r * 0.04 },
      { c: V3(sx * span, 0, -0.16 * L), rx: 0.01 * L, ry: 0.002 },
    ], col("wing"), 8, 3);
    const wm = mesh([w]); wm.castShadow = false;
    pv.add(wm);
    g.add(pv);
    wings.push(pv);
  }
  flatten(g);
  return { group: g, wings };
}
