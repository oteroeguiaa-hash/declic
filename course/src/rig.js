// Outils de squelette : tubes « peau » liés à des os (SkinnedMesh), géométries rigides et
// cinématique inverse à deux os dans le plan sagittal.
import * as THREE from "three";

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

// Ajoute les attributs attendus par les matériaux de peau.
export function prep(geo, tint = null, breath = 0) {
  const n = geo.attributes.position.count;
  const t = new Float32Array(n * 4);
  if (tint) for (let i = 0; i < n; i++) { t[i * 4] = tint[0]; t[i * 4 + 1] = tint[1]; t[i * 4 + 2] = tint[2]; t[i * 4 + 3] = tint[3]; }
  geo.setAttribute("tint", new THREE.BufferAttribute(t, 4));
  geo.setAttribute("breath", new THREE.BufferAttribute(new Float32Array(n).fill(breath), 1));
  return geo;
}

export function colorTint(c, a = 1) {
  const col = new THREE.Color(c);
  return [col.r, col.g, col.b, a];
}

// Ellipsoïde rigide.
export function ellipsoid(rx, ry, rz, seg = 16) {
  const g = new THREE.SphereGeometry(1, seg, Math.max(8, seg * 0.75 | 0));
  g.scale(rx, ry, rz);
  return g;
}

// Tube lisse le long d'une suite de points, avec section elliptique variable.
// pts : Vector3[], rad : [{w,h,dy?}] par point, opts : { up, seg, rings, capStart, capEnd, tint(fn), breath(fn) }
// Retourne la géométrie, avec skinIndex/skinWeight si opts.segBones (indices d'os par segment).
export function tubeGeometry(pts, rad, opts = {}) {
  const seg = opts.seg ?? 14;
  const rings = opts.rings ?? 6;
  const n = pts.length;
  const pos = [], nor = [], idx = [], skI = [], skW = [], tints = [], breaths = [];
  const up = (opts.up || V(0, 1, 0)).clone();
  // Repères par point (transport parallèle).
  const tangents = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    tangents.push(b.clone().sub(a).normalize());
  }
  const perp = (T) => {
    let q = T.clone().cross(V(0, 0, 1));
    if (q.lengthSq() < 1e-6) q = T.clone().cross(V(0, 1, 0));
    return q.normalize();
  };
  let N = up.clone().sub(tangents[0].clone().multiplyScalar(up.dot(tangents[0])));
  N = N.lengthSq() < 1e-8 ? perp(tangents[0]) : N.normalize();
  const frames = [];
  for (let i = 0; i < n; i++) {
    const T = tangents[i];
    if (i > 0) {
      N = N.clone().sub(T.clone().multiplyScalar(N.dot(T)));
      N = N.lengthSq() < 1e-8 ? perp(T) : N.normalize();
    }
    const B = T.clone().cross(N).normalize();
    frames.push({ T, N, B });
  }
  const segBones = opts.segBones;
  const blend = opts.blend ?? 0.3;
  const total = n - 1;
  let ringCount = 0;
  const addRing = (P, fr, w, h, gt, skin) => {
    for (let j = 0; j <= seg; j++) {
      const a = (j / seg) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      const d = fr.N.clone().multiplyScalar(ca * h).add(fr.B.clone().multiplyScalar(sa * w));
      const p = P.clone().add(d);
      pos.push(p.x, p.y, p.z);
      const nn = fr.N.clone().multiplyScalar(ca / Math.max(h, 1e-5)).add(fr.B.clone().multiplyScalar(sa / Math.max(w, 1e-5))).normalize();
      nor.push(nn.x, nn.y, nn.z);
      if (skin) { skI.push(...skin.i); skW.push(...skin.w); }
      const tn = opts.tint ? opts.tint(gt, a, p) : null;
      if (tn) tints.push(...tn); else tints.push(0, 0, 0, 0);
      breaths.push(opts.breath ? opts.breath(gt, a) : 0);
    }
    ringCount++;
  };
  const skinFor = (k, t) => {
    if (!segBones) return null;
    const b = segBones[k];
    let i = [b, 0, 0, 0], w = [1, 0, 0, 0];
    if (k > 0 && t < blend && segBones[k - 1] !== b) {
      const a = 0.5 * (1 - t / blend);
      i = [b, segBones[k - 1], 0, 0]; w = [1 - a, a, 0, 0];
    } else if (k < total - 1 && t > 1 - blend && segBones[k + 1] !== b) {
      const a = 0.5 * (1 - (1 - t) / blend);
      i = [b, segBones[k + 1], 0, 0]; w = [1 - a, a, 0, 0];
    }
    return { i, w };
  };
  const lerpR = (k, t) => {
    const r0 = rad[k], r1 = rad[k + 1];
    const s = t * t * (3 - 2 * t);
    const bul = (r0.b ?? 0) * Math.sin(Math.PI * t);
    return {
      w: (r0.w + (r1.w - r0.w) * s) * (1 + bul),
      h: (r0.h + (r1.h - r0.h) * s) * (1 + bul),
      dy: (r0.dy ?? 0) + ((r1.dy ?? 0) - (r0.dy ?? 0)) * s,
    };
  };
  // Calotte de départ.
  const capRings = 3;
  if (opts.capStart !== false) {
    const fr = frames[0], r = rad[0];
    for (let c = capRings; c >= 1; c--) {
      const ang = (c / (capRings + 0.0001)) * (Math.PI / 2) * 0.92;
      const k = Math.cos(ang);
      const back = Math.sin(ang) * Math.min(r.w, r.h) * (opts.capLen ?? 1);
      const P = pts[0].clone().sub(fr.T.clone().multiplyScalar(back)).add(fr.N.clone().multiplyScalar(r.dy ?? 0));
      addRing(P, fr, r.w * k + 1e-4, r.h * k + 1e-4, 0, skinFor(0, 0));
    }
  }
  for (let k = 0; k < total; k++) {
    const last = k === total - 1;
    const steps = rings;
    for (let s = 0; s <= (last ? steps : steps - 1); s++) {
      const t = s / steps;
      const P = new THREE.Vector3().lerpVectors(pts[k], pts[k + 1], t);
      const fr0 = frames[k], fr1 = frames[k + 1];
      const T = fr0.T.clone().lerp(fr1.T, t).normalize();
      let Nn = fr0.N.clone().lerp(fr1.N, t);
      Nn.sub(T.clone().multiplyScalar(Nn.dot(T)));
      Nn = Nn.lengthSq() < 1e-8 ? perp(T) : Nn.normalize();
      const B = T.clone().cross(Nn).normalize();
      const r = lerpR(k, t);
      P.add(Nn.clone().multiplyScalar(r.dy));
      addRing(P, { T, N: Nn, B }, r.w, r.h, (k + t) / total, skinFor(k, t));
    }
  }
  if (opts.capEnd !== false) {
    const fr = frames[n - 1], r = rad[n - 1];
    for (let c = 1; c <= capRings; c++) {
      const ang = (c / (capRings + 0.0001)) * (Math.PI / 2) * 0.92;
      const k = Math.cos(ang);
      const fwd = Math.sin(ang) * Math.min(r.w, r.h) * (opts.capLen ?? 1);
      const P = pts[n - 1].clone().add(fr.T.clone().multiplyScalar(fwd)).add(fr.N.clone().multiplyScalar(r.dy ?? 0));
      addRing(P, fr, r.w * k + 1e-4, r.h * k + 1e-4, 1, skinFor(total - 1, 1));
    }
  }
  const rs = seg + 1;
  for (let r = 0; r < ringCount - 1; r++) {
    for (let j = 0; j < seg; j++) {
      const a = r * rs + j, b = a + 1, c = a + rs, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute("tint", new THREE.Float32BufferAttribute(tints, 4));
  g.setAttribute("breath", new THREE.Float32BufferAttribute(breaths, 1));
  if (segBones) {
    g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skI, 4));
    g.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skW, 4));
  }
  g.setIndex(idx);
  return g;
}

// Crée un SkinnedMesh pour une chaîne d'os (les os doivent avoir leur matrixWorld à jour,
// la créature étant construite à l'origine).
export function skinnedChain(bones, rad, mat, opts = {}) {
  const pts = bones.map((b) => b.getWorldPosition(new THREE.Vector3()));
  if (opts.tip) pts.push(opts.tip.clone());
  if (opts.pre) pts.unshift(opts.pre.clone());
  const segBones = [];
  const nb = bones.length;
  for (let k = 0; k < pts.length - 1; k++) {
    let bi = opts.pre ? k - 1 : k;
    bi = Math.max(0, Math.min(nb - 1, bi));
    segBones.push(opts.segMap ? opts.segMap[k] : bi);
  }
  const geo = tubeGeometry(pts, rad, { ...opts, segBones });
  const mesh = new THREE.SkinnedMesh(geo, mat);
  const skel = new THREE.Skeleton(bones);
  mesh.bind(skel);
  mesh.frustumCulled = false;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

// Os enfant positionné à un décalage local.
export function bone(parent, x = 0, y = 0, z = 0, name = "") {
  const b = new THREE.Bone();
  b.position.set(x, y, z);
  b.name = name;
  if (parent) parent.add(b);
  return b;
}

// Chaîne d'os verticale (vers le bas, axe local -Y) : renvoie la liste des os.
export function legBones(parent, base, lengths) {
  const out = [];
  let p = bone(parent, base.x, base.y, base.z);
  out.push(p);
  for (let i = 0; i < lengths.length; i++) {
    const b = bone(p, 0, -lengths[i], 0);
    out.push(b);
    p = b;
  }
  return out; // lengths.length + 1 os (le dernier = extrémité)
}

// IK deux os dans le plan (x avant, y haut), os orientés vers -Y au repos.
// Renvoie [rotZ os1, rotZ os2 relative] pour atteindre (tx, ty) depuis l'origine.
export function ik2(tx, ty, a, b, bend) {
  let d = Math.hypot(tx, ty);
  const maxD = (a + b) * 0.999, minD = Math.abs(a - b) + 1e-4;
  if (d > maxD) d = maxD;
  if (d < minD) d = minD;
  const th = Math.atan2(ty, tx);
  const cA = (a * a + d * d - b * b) / (2 * a * d);
  const A = Math.acos(Math.max(-1, Math.min(1, cA)));
  const a1 = th + bend * A;
  const kx = a * Math.cos(a1), ky = a * Math.sin(a1);
  const a2 = Math.atan2(ty - ky, tx - kx);
  return [a1 + Math.PI / 2, a2 - a1, a2];
}

export const TAU = Math.PI * 2;
export const smooth = (t) => t * t * (3 - 2 * t);
export const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
export const lerp = (a, b, t) => a + (b - a) * t;
export function fract(x) { return x - Math.floor(x); }
export function cdiff(a, b) { let d = fract(b - a); if (d > 0.5) d -= 1; return d; }
