// Générateur de créatures 3D articulées et animation de locomotion.
//
// Chaque créature : squelette d'os (THREE.Bone) + « peau » en tubes liés aux os (SkinnedMesh),
// pièces rigides (tête, cornes…). Les pattes sont pilotées par cinématique inverse : chaque pied
// suit une trajectoire (appui au sol / phase aérienne) calée sur la fréquence de foulée réelle,
// avec des décalages de phase propres à chaque allure (pas, trot, amble, galop transverse,
// galop rotatoire, bond, saut).
import * as THREE from "three";
import { makeSkin, plainMat } from "./skin.js";
import { prep, ellipsoid, tubeGeometry, skinnedChain, bone, legBones, ik2, TAU, smooth, clamp, lerp, fract, cdiff, colorTint } from "./rig.js";
import { makeHead, makeBirdHead, mesh, DARK } from "./parts.js";

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const G = 9.81;

export function parseLook(str) {
  const o = {};
  for (const tok of (str || "").split(/\s+/)) {
    if (!tok) continue;
    const i = tok.indexOf("=");
    if (i < 0) o[tok] = true;
    else o[tok.slice(0, i)] = tok.slice(i + 1);
  }
  return o;
}

// Décalages de phase des pattes [arrière G, arrière D, avant G, avant D] et facteur d'appui.
const GAITS = {
  walk:       { off: [0, 0.5, 0.25, 0.75], duty: 0.64, bob: 2 },
  amble:      { off: [0, 0.5, 0.25, 0.75], duty: 0.5, bob: 2 },
  trot:       { off: [0, 0.5, 0.5, 0], duty: 0.42, bob: 2 },
  pace:       { off: [0, 0.5, 0, 0.5], duty: 0.42, bob: 2 },
  canter:     { off: [0, 0.32, 0.32, 0.62], duty: 0.36, bob: 1 },
  transverse: { off: [0, 0.1, 0.5, 0.6], duty: 0.3, bob: 1 },
  rotary:     { off: [0, 0.1, 0.6, 0.5], duty: 0.26, bob: 1 },
  bound:      { off: [0, 0.04, 0.5, 0.54], duty: 0.3, bob: 1 },
  halfbound:  { off: [0, 0.02, 0.42, 0.58], duty: 0.3, bob: 1 },
  hop:        { off: [0, 0, 0.5, 0.5], duty: 0.32, bob: 1 },
};

function chooseGait(sp, v, hipH, vmax) {
  const fr = (v * v) / (G * Math.max(hipH, 0.02));
  const g = sp.gait;
  if (v < 0.05) return "walk";
  if (g === "amble") return "amble";
  if (g === "trot") return fr < 0.35 ? "walk" : "trot";
  if (g === "pace") return fr < 0.3 ? "walk" : v > vmax * 0.85 && sp.fam !== "equide" ? "rotary" : "pace";
  if (g === "bound" || g === "halfbound") return fr < 0.15 ? "walk" : g;
  if (g === "hop") return "hop";
  if (fr < 0.4) return "walk";
  if (fr < 2.2) return "trot";
  if (fr < 3.2) return "canter";
  return g === "transverse" ? "transverse" : "rotary";
}

// ───────────────────────────── Quadrupède ─────────────────────────────
function buildQuad(sp, look, mats) {
  const fam = sp.fam;
  const heavy = ["bovin", "lourd", "ours", "suide"].includes(fam) || look.head === "elephant" || look.head === "elephantasia";
  const columnar = look.head === "elephant" || look.head === "elephantasia";
  const hoof = sp.foot === "hoof" || sp.foot === "pad";
  const planti = fam === "ours" || fam === "primate" || look.head === "badger" || look.head === "wombat" || look.head === "koala" || look.head === "hedgehog" || look.head === "mole";
  let H = parseFloat(look.H) || 0.3 * Math.cbrt(sp.mass);
  let L = parseFloat(look.L) || H * 1.3;
  const legsMul = parseFloat(look.legs) || (look.legs === "hind" || look.legs === "hindlong" ? 1.0 : 1);
  let legRatio = clamp(0.55 * Math.sqrt(legsMul), 0.22, 0.8);
  if (columnar) legRatio = 0.55;
  if (fam === "petit" && !look.legs) legRatio = 0.42;
  const D = H * (1 - legRatio);
  const widthR = columnar ? 0.95 : heavy ? 0.82 : look.waist ? 0.55 : fam === "felin" ? 0.62 : 0.68;
  const W = D * widthR * (look.belly ? 1.25 : 1) * (look.fur === "shaggy" || look.fur === "long" ? 1.08 : 1);
  const Hh = look.slope ? H * 0.8 : look.arms ? H * 0.82 : H;
  const fur = look.fur === "shaggy" ? 1.12 : look.fur === "long" ? 1.06 : 1;

  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const hipY = Hh - D * 0.45;
  const chestY = H - D * 0.48;
  const hips = bone(null, -L * 0.36, hipY, 0, "hips");
  body.add(hips);
  const spine = bone(hips, L * 0.36, (chestY - hipY) * 0.5 + D * 0.03, 0, "spine");
  const chest = bone(spine, L * 0.36, (chestY - hipY) * 0.5 - D * 0.03, 0, "chest");
  const chestW = chest.position.clone().add(spine.position).add(hips.position);

  // Cou et tête
  const neckType = look.neck || (fam === "equide" ? "horse" : fam === "cervide" ? "deer" : "short");
  let nl, na, nSeg = 2;
  switch (neckType) {
    case "giraffe": nl = H * 1.0; na = 1.15; nSeg = 4; break;
    case "camel": nl = H * 0.55; na = 0.65; nSeg = 3; break;
    case "lama": nl = H * 0.6; na = 1.25; nSeg = 3; break;
    case "medium": nl = D * 0.9; na = 0.7; break;
    case "horse": nl = D * 1.25; na = 0.85; nSeg = 3; break;
    case "deer": nl = D * 1.05; na = 0.9; break;
    default: nl = D * (heavy ? 0.45 : 0.6); na = heavy ? 0.25 : 0.45;
  }
  if (fam === "bovin") { nl = D * 0.55; na = 0.2; }
  if (columnar) { nl = D * 0.3; na = 0.1; }
  if (look.head === "hippo" || look.head === "rhino" || look.head === "rhinowide") { nl = D * 0.45; na = 0.05; }
  const neckBase = V(L * 0.12, D * 0.1, 0);
  const neckBones = [bone(chest, neckBase.x, neckBase.y, 0, "neck0")];
  const segL = nl / nSeg;
  for (let i = 0; i < nSeg; i++) {
    const a = neckType === "camel" ? [-0.55, 0.35, 1.2][i] : na;
    const nb = bone(neckBones[neckBones.length - 1], Math.cos(a) * segL, Math.sin(a) * segL, 0, "neck" + (i + 1));
    neckBones.push(nb);
  }
  const headBone = neckBones[neckBones.length - 1];
  const headType = look.head || (fam === "felin" ? "cat" : fam === "chien" ? "dog" : fam === "equide" ? "horse" : fam === "bovin" ? "cow" : fam === "cervide" ? "deer" : "dog");
  let hs = D * (headType === "horse" || headType === "giraffe" || headType === "camel" ? 0.88 : headType === "cat" ? 0.62 : headType === "elephant" || headType === "elephantasia" ? 0.75 : headType === "rhino" || headType === "rhinowide" ? 0.95 : headType === "rodent" || headType === "rabbit" ? 0.6 : 0.8);
  if (headType === "giraffe") hs = H * 0.3;
  const head = makeHead(headType, hs, mats, look, {});
  headBone.add(head);
  const headPitch = headType === "horse" || headType === "giraffe" || headType === "camel" || headType === "deer" || headType === "gnu" ? -0.55 - na * 0.4
    : headType === "cow" || headType === "bison" ? -0.5 : headType === "elephant" || headType === "elephantasia" ? -0.15 : -0.15 - na * 0.35;
  head.rotation.z = headPitch;
  // Trompe
  let trunk = null;
  if (look.trunk) {
    const tip = head.userData.tip;
    const tb = [bone(null, tip.x, tip.y, 0)];
    head.add(tb[0]);
    const tl = hs * 1.6;
    for (let i = 0; i < 4; i++) tb.push(bone(tb[i], 0.03 * hs, -tl / 4, 0));
    trunk = tb;
  }

  // Queue
  const tailType = look.tail || "long";
  let tailBones = [];
  let tailLen = 0, tailR = D * 0.06, tailDir = -0.9, tailN = 4;
  switch (tailType) {
    case "long": tailLen = L * 0.75; tailR = D * 0.07; tailDir = -0.75; break;
    case "thick": tailLen = L * 0.8; tailR = D * 0.12; tailDir = -1.0; break;
    case "bushy": tailLen = L * 0.55; tailR = D * 0.14; tailDir = -0.7; break;
    case "fox": tailLen = L * 0.6; tailR = D * 0.15; tailDir = -0.6; break;
    case "feather": tailLen = L * 0.6; tailR = D * 0.08; tailDir = -0.9; break;
    case "otter": tailLen = L * 0.5; tailR = D * 0.12; tailDir = -0.5; break;
    case "thin": tailLen = L * 0.55; tailR = D * 0.035; tailDir = -1.0; break;
    case "rat": tailLen = L * 0.9; tailR = D * 0.04; tailDir = -0.2; break;
    case "squirrel": tailLen = L * 0.9; tailR = D * 0.22; tailDir = 0.9; break;
    case "ringed": case "ringedlong": tailLen = L * (tailType === "ringedlong" ? 1.1 : 0.7); tailR = D * 0.12; tailDir = -0.4; break;
    case "baboon": tailLen = L * 0.6; tailR = D * 0.05; tailDir = 0.6; break;
    case "tuft": tailLen = L * 0.55; tailR = D * 0.04; tailDir = -1.35; break;
    case "tuftup": tailLen = L * 0.3; tailR = D * 0.03; tailDir = 1.3; break;
    case "horse": case "horsehigh": tailLen = L * 0.55; tailR = D * 0.11; tailDir = tailType === "horsehigh" ? -0.6 : -1.25; break;
    case "curl": tailLen = L * 0.35; tailR = D * 0.1; tailDir = 1.6; break;
    case "flag": tailLen = L * 0.2; tailR = D * 0.1; tailDir = 0.3; break;
    case "short": tailLen = L * 0.15; tailR = D * 0.07; tailDir = -0.6; break;
    case "bob": tailLen = L * 0.07; tailR = D * 0.08; tailDir = -0.2; break;
    case "pom": tailLen = L * 0.08; tailR = D * 0.12; tailDir = 0.3; break;
    case "beaver": tailLen = L * 0.45; tailR = D * 0.16; tailDir = -0.25; break;
    case "jerboa": tailLen = L * 1.6; tailR = D * 0.04; tailDir = -0.1; break;
    case "none": tailLen = 0; break;
    default: tailLen = L * 0.4;
  }
  if (tailLen > 0) {
    const t0 = bone(hips, -L * 0.2, D * 0.28, 0, "tail0");
    tailBones.push(t0);
    const sl = tailLen / tailN;
    for (let i = 0; i < tailN; i++) {
      const a = tailDir + (tailType === "curl" ? i * 0.9 : tailType === "squirrel" ? -i * 0.25 : i * 0.08);
      tailBones.push(bone(tailBones[i], Math.cos(a) * sl * (i === 0 ? 0.6 : 1), Math.sin(a) * sl * (i === 0 ? 0.6 : 1), 0));
    }
  }

  // Pattes
  const hindY = hipY - D * 0.12;
  const frontY = chestY - D * 0.22;
  const hindLen = hindY * (planti ? 1.0 : 1.04);
  const frontLen = frontY * (planti ? 1.0 : 1.03);
  const fr = planti ? [0.46, 0.44, 0.1] : hoof ? [0.32, 0.33, 0.27, 0.08] : [0.33, 0.35, 0.25, 0.07];
  const ff = planti ? [0.46, 0.44, 0.1] : hoof ? [0.3, 0.34, 0.28, 0.08] : [0.35, 0.36, 0.22, 0.07];
  if (columnar) { fr.splice(0, fr.length, 0.5, 0.45, 0.05); ff.splice(0, ff.length, 0.5, 0.45, 0.05); }
  if (look.legs === "hind" || look.legs === "hindlong") { fr[0] *= 1.2; fr[2] *= look.legs === "hindlong" ? 1.6 : 1.3; }
  const legW = W * 0.34;
  const legs = [];
  const bulk = (heavy ? 1.3 : look.waist ? 0.8 : 1) * fur;
  const mkLeg = (front, side) => {
    const parent = front ? chest : hips;
    const parentW = front ? chestW : hips.position.clone();
    const baseW = V(front ? L * 0.38 : -L * 0.38, front ? frontY : hindY, side * legW);
    const total = front ? frontLen : hindLen;
    const fracs = front ? ff : fr;
    const lens = fracs.map((f) => f * total / fracs.reduce((a, b) => a + b, 0));
    const local = baseW.clone().sub(parentW);
    const bones = legBones(parent, local, lens);
    legs.push({ front, side, bones, lens, baseW, total, planti, hoof, fracs, phaseOff: 0 });
  };
  mkLeg(false, 1); mkLeg(false, -1); mkLeg(true, 1); mkLeg(true, -1);

  root.updateMatrixWorld(true);

  // Peau du tronc
  const waist = look.waist ? 0.72 : fam === "felin" ? 0.8 : fam === "chien" || fam === "carni" ? 0.86 : 1;
  const torsoRad = [
    { w: W * 0.3 * fur, h: D * 0.3 * fur },
    { w: W * 0.5 * fur, h: D * 0.44 * fur },
    { w: W * 0.47 * waist * fur, h: D * 0.42 * (waist < 0.9 ? 0.82 : 1) * fur, dy: waist < 0.9 ? D * 0.05 : look.belly ? -D * 0.08 : -D * 0.02 },
    { w: W * 0.52 * fur, h: D * 0.52 * fur, dy: -D * 0.05 },
    { w: W * 0.36 * fur, h: D * 0.38 * fur, dy: -D * 0.02 },
  ];
  const breathT = (t) => (t > 0.5 && t < 0.95 ? Math.sin(((t - 0.5) / 0.45) * Math.PI) * D * 0.05 : 0);
  const torso = skinnedChain([hips, spine, chest], torsoRad, mats.body, {
    pre: V(-L * 0.53, hipY + D * 0.04, 0), tip: chestW.clone().add(V(L * 0.2, -D * 0.02, 0)),
    seg: 18, rings: 6, breath: breathT, blend: 0.5, capLen: 0.7,
  });
  root.add(torso);

  // Cou (peau)
  const neckR = [];
  const nb = neckBones.length;
  const neckThick = neckType === "giraffe" ? D * 0.22 : neckType === "horse" ? D * 0.3 : neckType === "camel" || neckType === "lama" ? D * 0.2 : D * 0.32;
  neckR.push({ w: W * 0.36 * fur, h: D * 0.38 * fur });
  for (let i = 0; i < nb; i++) {
    const t = i / (nb - 1);
    const r = lerp(neckThick * 1.25, neckThick * (neckType === "giraffe" ? 0.55 : 0.75), t) * fur;
    neckR.push({ w: r * (neckType === "horse" ? 0.7 : 0.85), h: r });
  }
  const headBack = headBone.getWorldPosition(new THREE.Vector3());
  neckR.push({ w: neckR[neckR.length - 1].w * 0.9, h: neckR[neckR.length - 1].h * 0.9 });
  const neckMesh = skinnedChain(neckBones, neckR, mats.body, {
    pre: chestW.clone().add(V(-D * 0.1, -D * 0.05, 0)),
    tip: headBack.clone().add(V(Math.cos(headPitch) * hs * 0.25, Math.sin(headPitch) * hs * 0.25, 0)),
    seg: 14, rings: 4, capEnd: true,
  });
  root.add(neckMesh);
  // Crinière
  if (look.mane) {
    const mt = look.mane;
    const maneMat = new THREE.MeshStandardMaterial({ color: mats.colors.c1.clone().multiplyScalar(fam === "felin" ? 0.55 : 0.4), roughness: 0.95 });
    if (fam === "felin" || mt === "cape") {
      const g = new THREE.Group();
      const mm = mesh(prep(ellipsoid(hs * 0.75, hs * 0.95, hs * 0.9, 14)), maneMat);
      g.add(mm);
      g.position.set(-hs * 0.1, 0, 0);
      neckBones[neckBones.length - 2].add(g);
      if (mt === true || mt === "true") {
        const m2 = mesh(prep(ellipsoid(hs * 0.6, hs * 0.85, hs * 0.75, 12)), maneMat);
        m2.position.set(0.1 * hs, -0.1 * hs, 0);
        headBone.add(m2);
      }
    } else {
      for (let i = 0; i < nb - 1; i++) {
        const b = neckBones[i];
        const seg = neckBones[i + 1].position.length();
        const strip = mesh(prep(new THREE.BoxGeometry(seg * 1.05, neckThick * (mt === "brush" ? 0.45 : mt === "short" ? 0.35 : 0.5), neckThick * 0.18)), maneMat);
        const dir = neckBones[i + 1].position.clone().normalize();
        strip.position.copy(dir.clone().multiplyScalar(seg * 0.5)).add(V(-dir.y, dir.x, 0).multiplyScalar(neckThick * 0.8));
        strip.rotation.z = Math.atan2(dir.y, dir.x);
        b.add(strip);
      }
    }
  }
  if (trunk) {
    const tr = trunk.map((_, i) => { const r = lerp(hs * 0.2, hs * 0.07, i / (trunk.length - 1)); return { w: r, h: r }; });
    tr.push({ w: hs * 0.08, h: hs * 0.08 });
    root.updateMatrixWorld(true);
    const tw = trunk[trunk.length - 1].getWorldPosition(new THREE.Vector3());
    root.add(skinnedChain(trunk, tr, mats.head, { tip: tw.add(V(0.02 * hs, -0.1 * hs, 0)), seg: 12, rings: 3 }));
  }
  // Bosses, fanon, mamelle
  if (look.hump) {
    const humpMat = mats.body;
    const hcount = look.hump === "2" ? 2 : 1;
    const big = look.hump === "big" ? 1.3 : look.hump === "low" ? 0.6 : look.hump === "zebu" ? 0.7 : 1;
    for (let i = 0; i < hcount; i++) {
      const hm = mesh(prep(ellipsoid(L * 0.18 * big, D * 0.35 * big, W * 0.32, 14)), humpMat);
      const host = look.hump === "big" || look.hump === "low" || look.hump === "zebu" ? chest : spine;
      hm.position.set(hcount === 2 ? (i === 0 ? -L * 0.08 : L * 0.2) : (host === chest ? -L * 0.05 : L * 0.05), D * 0.45, 0);
      host.add(hm);
    }
  }
  if (look.udder) {
    const u = mesh(prep(ellipsoid(L * 0.1, D * 0.14, W * 0.18, 10)), new THREE.MeshStandardMaterial({ color: 0xe8b0a0, roughness: 0.6 }));
    u.position.set(L * 0.02, -D * 0.42, 0);
    hips.add(u);
  }
  if (look.dewlap) {
    const d = mesh(prep(ellipsoid(D * 0.35, D * 0.25, W * 0.08, 10)), mats.body);
    d.position.set(D * 0.15, -D * 0.25, 0);
    neckBones[0].add(d);
  }
  if (look.beard) {
    const bm = mesh(prep(ellipsoid(hs * 0.12, hs * 0.35, hs * 0.08, 8)), new THREE.MeshStandardMaterial({ color: 0x2a2420, roughness: 0.95 }));
    bm.position.set(hs * 0.3, -hs * 0.35, 0);
    head.add(bm);
  }
  if (look.quills) {
    const qm = new THREE.MeshStandardMaterial({ color: 0x3a3028, roughness: 0.7 });
    const n = look.quills === "long" ? 40 : 60;
    const ql = look.quills === "long" ? D * 0.9 : D * 0.35;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const c = mesh(prep(new THREE.ConeGeometry(D * 0.025, ql, 4).translate(0, ql / 2, 0)), qm);
      const ang = (Math.sin(i * 12.9898) * 0.5) * 2.4;
      c.position.set(-L * 0.55 + t * L * 0.9, hipY + D * 0.3 * Math.cos(ang), Math.sin(ang) * W * 0.45);
      c.rotation.set(Math.sin(ang) * 0.6, 0, 0.6 + Math.sin(i) * 0.2);
      (t < 0.5 ? hips : spine).attach(c);
    }
  }
  if (look.shell) {
    const sh = mesh(prep(ellipsoid(L * 0.62, D * 0.55, W * 0.62, 18)), new THREE.MeshStandardMaterial({ color: 0xb8a898, roughness: 0.5 }));
    sh.position.set(L * 0.18, D * 0.08, 0);
    hips.add(sh);
  }

  // Peau de la queue
  if (tailBones.length) {
    const tr = [];
    const tn = tailBones.length;
    for (let i = 0; i < tn; i++) {
      const t = i / (tn - 1);
      let r = tailR;
      if (tailType === "long" || tailType === "thin" || tailType === "rat" || tailType === "tuft" || tailType === "jerboa") r = lerp(tailR * 1.4, tailR * 0.5, t);
      else if (tailType === "bushy" || tailType === "fox" || tailType === "squirrel" || tailType === "feather") r = tailR * (0.5 + 0.8 * Math.sin(Math.PI * (0.25 + 0.6 * t)));
      else if (tailType === "horse" || tailType === "horsehigh") r = tailR * (0.4 + 0.9 * t);
      else if (tailType === "beaver") r = tailR * (0.6 + 0.5 * Math.sin(Math.PI * t));
      tr.push({ w: tailType === "beaver" ? r * 1.6 : r, h: tailType === "beaver" ? r * 0.35 : r });
    }
    tr.push({ w: tr[tn - 1].w * 0.6, h: tr[tn - 1].h * 0.6 });
    const last = tailBones[tn - 1].getWorldPosition(new THREE.Vector3());
    const prev = tailBones[tn - 2].getWorldPosition(new THREE.Vector3());
    const tip = last.clone().add(last.clone().sub(prev).multiplyScalar(0.4));
    const isHorse = tailType === "horse" || tailType === "horsehigh";
    const tailMat = isHorse ? new THREE.MeshStandardMaterial({ color: mats.colors.c1.clone().multiplyScalar(look.c && sp.look.includes("#f") ? 0.9 : 0.35), roughness: 0.95 }) : mats.body;
    const tmesh = skinnedChain(tailBones, tr, tailMat, {
      tip, seg: 10, rings: 3,
      tint: (t) => ((tailType === "tuft" || tailType === "tuftup") && t > 0.8 ? colorTint(0x1a1612, 1)
        : (tailType === "ringed" || tailType === "ringedlong") && Math.sin(t * 40) > 0.2 ? colorTint(0x1a1612, 0.85)
        : sp.id.startsWith("guepard") && t > 0.7 && Math.sin(t * 50) > 0 ? colorTint(0x1a1612, 0.9)
        : (tailType === "fox") && t > 0.88 ? colorTint(0xf6f2ea, 1) : null),
    });
    if (isHorse) prep(tmesh.geometry);
    root.add(tmesh);
    if (tailType === "tuft" || tailType === "tuftup") {
      const tf = mesh(prep(ellipsoid(tailR * 2.5, tailR * 4, tailR * 2.5, 8)), new THREE.MeshStandardMaterial({ color: 0x1a1612, roughness: 0.95 }));
      tf.position.set(0, -tailR * 2, 0);
      tailBones[tn - 1].add(tf);
    }
  }

  // Peau des pattes
  const sockC = look.socks ? (mats.colors.c2.getHSL({}).l > 0.5 ? mats.colors.c2 : new THREE.Color(0xf4f0e8)) : null;
  const pat = look.pat;
  for (const lg of legs) {
    const b = lg.bones;
    const T = lg.total;
    const k = bulk * (lg.front ? 0.95 : 1);
    let rads;
    if (columnar) rads = [{ w: 0.15, h: 0.18 }, { w: 0.13, h: 0.15 }, { w: 0.11, h: 0.11 }, { w: 0.1, h: 0.1 }, { w: 0.11, h: 0.12 }];
    else if (lg.planti) rads = [{ w: 0.18, h: 0.22 }, { w: 0.13, h: 0.16, b: 0.1 }, { w: 0.08, h: 0.09, b: 0.08 }, { w: 0.065, h: 0.06 }, { w: 0.07, h: 0.04 }];
    else if (lg.front) rads = [{ w: 0.12, h: 0.16 }, { w: 0.1, h: 0.15, b: 0.15 }, { w: 0.06, h: 0.08, b: 0.12 }, { w: 0.04, h: 0.045 }, { w: 0.035, h: 0.04 }, { w: lg.hoof ? 0.045 : 0.05, h: lg.hoof ? 0.05 : 0.045 }];
    else rads = [{ w: 0.13, h: 0.18 }, { w: 0.12, h: 0.2, b: 0.12 }, { w: 0.065, h: 0.1, b: 0.15 }, { w: 0.04, h: 0.05 }, { w: 0.035, h: 0.04 }, { w: lg.hoof ? 0.045 : 0.05, h: lg.hoof ? 0.05 : 0.045 }];
    const pts = b.length + 2;
    while (rads.length > pts) rads.splice(rads.length - 2, 1);
    while (rads.length < pts) rads.push(rads[rads.length - 1]);
    const scaled = rads.map((r) => ({ w: r.w * T * k, h: r.h * T * k, b: r.b }));
    const baseW = b[0].getWorldPosition(new THREE.Vector3());
    const tipW = b[b.length - 1].getWorldPosition(new THREE.Vector3());
    const tint = (t) => {
      if (lg.hoof && t > 0.93) return colorTint(sp.foot === "pad" ? 0x6a5a48 : 0x2a2420, 1);
      if (sockC && t > 0.65) return [sockC.r, sockC.g, sockC.b, 1];
      if (pat === "panda" && (t > 0.0)) return colorTint(0x1a1818, 1);
      if (pat === "points" && t > 0.55) return [mats.colors.c2.r, mats.colors.c2.g, mats.colors.c2.b, 0.9];
      if ((pat === "tan" || pat === "tricolor") && t > 0.7) return colorTint(0xa8683a, 0.9);
      if (look.feathers && t > 0.85) return colorTint(0xf0ece4, 1);
      return null;
    };
    const legMesh = skinnedChain(b, scaled, mats.limb, {
      pre: baseW.clone().add(V(0, D * 0.1, 0)), tip: tipW.clone().add(V(0, -T * 0.03, 0)),
      seg: 12, rings: 4, up: V(1, 0, 0), tint,
    });
    root.add(legMesh);
  }
  if (pat === "panda") {
    // Taches autour des yeux et oreilles noires.
    head.traverse((o) => { if (o.userData.ear) o.children.forEach((c) => (c.material = DARK)); });
    for (const sd of [-1, 1]) {
      const p = mesh(prep(ellipsoid(hs * 0.12, hs * 0.1, hs * 0.06, 8)), new THREE.MeshStandardMaterial({ color: 0x141212, roughness: 0.9 }), false);
      p.position.set(hs * 0.42, hs * 0.1, sd * hs * 0.2);
      head.add(p);
    }
  }

  const eye = new THREE.Object3D();
  eye.position.copy(head.userData.eye || V(hs * 0.3, hs * 0.2, 0));
  head.add(eye);

  // Allures et animation
  const st = {
    phase: Math.random(), offs: GAITS.walk.off.slice(), duty: 0.6, gait: "walk",
    blink: 0, breath: 0, tailT: 0,
  };
  const spineAmp = (sp.spine ?? 0.5) * 0.32;
  const hipHeight = hindY;
  const restNeck = neckBones.map((b) => b.rotation.z);
  const tmpM = new THREE.Matrix4(), tmpV = new THREE.Vector3(), invRoot = new THREE.Matrix4();

  function pitchOf(obj) {
    let a = 0, o = obj;
    while (o && o !== root) { a += o.rotation.z; o = o.parent; }
    return a;
  }

  function update(dt, s) {
    const v = s.v;
    const vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    // Fréquence de cycle (foulée complète)
    const f = s.f > 0 ? s.f : 0;
    st.phase = fract(st.phase + f * dt);
    const gname = chooseGait(sp, v, hipHeight, s.vmax);
    const gd = GAITS[gname];
    st.gait = gname;
    const k = 1 - Math.exp(-dt * 6);
    for (let i = 0; i < 4; i++) st.offs[i] = fract(st.offs[i] + cdiff(st.offs[i], gd.off[i]) * k);
    let duty = gd.duty;
    if (gname === "rotary" || gname === "transverse") duty = lerp(gd.duty + 0.06, gd.duty - 0.06, clamp((vr - 0.5) * 2, 0, 1));
    st.duty = lerp(st.duty, duty, k);
    const ph = st.phase;
    const gallop = gname === "rotary" || gname === "transverse" || gname === "bound" || gname === "halfbound" || gname === "canter";
    const moving = v > 0.05;

    // Corps : rebond, tangage, flexion du dos
    const crouch = s.crouch ? 1 : 0;
    const bobAmp = moving ? (gallop ? 0.05 : 0.025) * hipHeight * clamp(vr * 1.5, 0.2, 1) : 0;
    const bob = gd.bob === 2 ? -Math.abs(Math.cos(ph * TAU)) * bobAmp : Math.sin(ph * TAU + 1.2) * bobAmp;
    body.position.y = bob - crouch * hipHeight * 0.12 + (s.fatigue / 100) * -hipHeight * 0.02;
    const pitch = gallop ? Math.sin(ph * TAU + 0.6) * 0.06 * clamp(vr * 1.4, 0, 1) : 0;
    body.rotation.z = pitch + (look.arms ? 0.12 : 0) - crouch * 0.05;
    const flex = gallop ? Math.sin(ph * TAU + 2.0) * spineAmp * clamp(vr * 1.3, 0.2, 1) : 0;
    hips.rotation.z = -flex * 0.5;
    spine.rotation.z = flex * 0.6;
    chest.rotation.z = flex * 0.4;
    // Respiration : plus ample et plus rapide avec la fatigue
    const bf = 0.35 + (s.fatigue / 100) * 1.6 + vr * 0.5;
    st.breath += dt * bf * TAU * (gallop ? 0 : 1);
    const br = gallop ? Math.sin(ph * TAU) : Math.sin(st.breath);
    mats.uniforms.uBreath.value = (0.15 + s.fatigue / 100) * br;
    // Cou et tête : la tête reste stable, s'abaisse avec la fatigue
    const stab = -(pitch + flex * 0.4) * 0.8;
    const nod = (fam === "equide" || fam === "cervide" || fam === "bovin") && gallop ? Math.sin(ph * TAU + 0.3) * 0.12 : 0;
    const droop = -(s.fatigue / 100) * 0.35 - crouch * 0.25 + (gallop && fam === "felin" ? -0.15 : 0);
    neckBones[0].rotation.z = restNeck[0] + stab + droop * 0.6 + nod;
    if (neckBones[1]) neckBones[1].rotation.z = restNeck[1] + droop * 0.4 - nod * 0.5;
    head.rotation.z = headPitch - stab * 0.3 + (gallop && fam === "felin" ? 0.2 : 0);
    // Oreilles plaquées au galop
    // Queue
    st.tailT += dt;
    tailBones.forEach((b, i) => {
      if (i === 0) {
        b.rotation.z = gallop ? (fam === "felin" ? 0.5 : 0.3) * clamp(vr, 0, 1) + Math.sin(ph * TAU - 0.5) * 0.15 : Math.sin(st.tailT * 1.3) * 0.05;
        b.rotation.y = Math.sin(st.tailT * (moving ? 2 : 0.8)) * 0.15;
      } else {
        b.rotation.z = (gallop ? Math.sin(ph * TAU - i * 0.7) * 0.2 : Math.sin(st.tailT * 1.5 - i) * 0.06);
        b.rotation.y = Math.sin(st.tailT * 1.7 - i * 0.6) * 0.08 * (1 + vr);
      }
    });
    if (trunk) trunk.forEach((b, i) => { if (i) b.rotation.z = Math.sin(ph * TAU - i * 0.6) * 0.15 * vr + (moving ? 0.05 : 0); b.rotation.x = Math.sin(st.tailT * 0.7 - i) * 0.08; });

    // Pattes (IK)
    root.updateMatrixWorld(true);
    invRoot.copy(root.matrixWorld).invert();
    const stride = moving && f > 0 ? v / f : 0;
    for (let i = 0; i < 4; i++) {
      const lg = legs[i];
      const b = lg.bones;
      const lp = fract(ph + st.offs[i] + (lg.side < 0 && gname === "walk" ? 0 : 0));
      const d = st.duty;
      const sweep = Math.min(stride * d, lg.total * (gallop ? 1.5 : 1.1));
      let fx, fy, swingS = 0, inSwing = false;
      if (!moving) { fx = 0; fy = 0; }
      else if (lp < d) { const s2 = lp / d; fx = sweep * (0.5 - s2); fy = 0; }
      else {
        inSwing = true;
        swingS = (lp - d) / (1 - d);
        const e = smooth(swingS);
        fx = sweep * (-0.5 + e) + (lg.front ? 1 : -0.3) * Math.sin(Math.PI * swingS) * lg.total * 0.08 * vr;
        fy = Math.sin(Math.PI * swingS) * lg.total * (0.12 + 0.2 * clamp(vr, 0, 1)) * (columnar ? 0.4 : 1);
      }
      if (crouch) fx += lg.front ? lg.total * 0.1 : -lg.total * 0.05;
      const parent = b[0].parent;
      // Cible du pied dans le repère racine, puis dans le repère du parent de la hanche.
      const footR = V(lg.baseW.x + fx + (lg.front ? lg.total * 0.04 : 0), fy + lg.total * 0.02, lg.baseW.z);
      const pp = pitchOf(parent);
      // Angles des segments distaux, absolus dans le repère racine.
      const n = lg.lens.length;
      let a3, a4;
      if (lg.planti) {
        a3 = inSwing ? -0.6 - 0.5 * Math.sin(Math.PI * swingS) : (lp > d * 0.8 && moving ? -0.4 : 0);
        if (lg.front && sp.fam === "primate") a3 = inSwing ? -1.4 : -1.2;
      } else if (lg.front) {
        a3 = -Math.PI / 2 + (inSwing ? -1.5 * Math.sin(Math.PI * Math.min(1, swingS * 1.2)) * clamp(vr * 1.5, 0.3, 1) : 0.05);
        a4 = a3 + (inSwing ? -0.4 : 0.55);
      } else {
        a3 = -Math.PI / 2 + 0.25 + (inSwing ? -0.7 * Math.sin(Math.PI * swingS) : (lp > d * 0.7 ? -0.3 : 0));
        a4 = a3 + (inSwing ? -0.3 : 0.6);
      }
      // Position de la cheville = pied - segments distaux
      const ank = footR.clone();
      if (n === 4) {
        ank.x -= Math.cos(a4) * lg.lens[3]; ank.y -= Math.sin(a4) * lg.lens[3];
        ank.x -= Math.cos(a3) * lg.lens[2]; ank.y -= Math.sin(a3) * lg.lens[2];
      } else {
        // plantigrade : le dernier segment (pied) part de la cheville vers l'avant
        ank.x -= Math.cos(a3) * lg.lens[2] * 0.5; ank.y -= Math.sin(a3) * lg.lens[2] * 0.5;
        ank.y += lg.lens[2] * 0.15;
      }
      // repère du parent
      tmpM.copy(invRoot).multiply(parent.matrixWorld).invert();
      tmpV.copy(ank).applyMatrix4(tmpM).sub(b[0].position);
      const bend = lg.front ? (lg.planti && sp.fam !== "primate" ? -1 : -1) : 1;
      const [r1, r2, aAbs2] = ik2(tmpV.x, tmpV.y, lg.lens[0], lg.lens[1], bend);
      b[0].rotation.z = r1;
      b[1].rotation.z = r2;
      const a2 = aAbs2 + pp; // absolu dans le repère racine
      if (n === 4) {
        b[2].rotation.z = a3 - a2;
        b[3].rotation.z = a4 - a3;
      } else {
        b[2].rotation.z = a3 - a2;
      }
    }
  }

  return {
    root, update, eye, head,
    dims: { height: Math.max(H, head.getWorldPosition(new THREE.Vector3()).y + hs * 0.3), length: L * 1.6 + hs + tailLen * 0.5, width: W, hip: hipHeight },
  };
}

// ───────────────────────────── Humain ─────────────────────────────
function buildHuman(sp, look, mats) {
  const h = sp.human || {};
  const S = look.S ? parseFloat(look.S) : h.age === "enfant" ? 1.4 : h.age === "ado" ? 1.7 : h.sex === "f" ? 1.68 : sp.id.startsWith("gibbon") ? 0.75 : 1.8;
  const gib = sp.id.startsWith("gibbon");
  const kit = new THREE.Color(look.kit || "#cc3333");
  const kit2 = kit.clone().multiplyScalar(0.55);
  const belly = look.belly ? 1.35 : 1;
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const pelY = S * 0.53 * (gib ? 0.75 : 1);
  const pelvis = bone(null, 0, pelY, 0, "pelvis");
  body.add(pelvis);
  const abd = bone(pelvis, 0, S * 0.1, 0);
  const chest = bone(abd, 0, S * 0.13, 0);
  const neck = bone(chest, 0, S * 0.1, 0);
  const headB = bone(neck, 0, S * 0.05, 0);
  const legLen = pelY - S * 0.04;
  const legs = [];
  for (const side of [1, -1]) {
    const base = V(0, -S * 0.03, side * S * 0.052);
    const bones = legBones(pelvis, base, [legLen * 0.49, legLen * 0.47, S * 0.075]);
    legs.push({ side, bones, lens: [legLen * 0.49, legLen * 0.47, S * 0.075] });
  }
  const arms = [];
  const armL = gib ? 1.9 : 1;
  for (const side of [1, -1]) {
    const base = V(0, S * 0.075, side * S * 0.115);
    const bones = legBones(chest, base, [S * 0.17 * armL, S * 0.15 * armL, S * 0.06 * armL]);
    arms.push({ side, bones });
  }
  root.updateMatrixWorld(true);
  const skin = mats.colors.c1;
  const hairC = look.hair === "grey" ? 0xb8b8b0 : 0x1e1612;
  // Tronc : short puis maillot
  const torsoPts = [V(0, pelY - S * 0.06, 0)];
  const torso = skinnedChain([pelvis, abd, chest, neck], [
    { w: S * 0.07, h: S * 0.055 },
    { w: S * 0.095, h: S * 0.06 },
    { w: S * 0.08 * belly, h: S * 0.055 * belly, dy: S * 0.005 * (belly - 1) * 10 },
    { w: S * 0.105, h: S * 0.065, b: 0.05 },
    { w: S * 0.045, h: S * 0.042 },
    { w: S * 0.035, h: S * 0.035 },
  ], mats.body, {
    pre: torsoPts[0], tip: neck.getWorldPosition(new THREE.Vector3()).add(V(0, S * 0.06, 0)),
    up: V(1, 0, 0), seg: 18, rings: 5,
    tint: (t) => (gib ? null : t < 0.3 ? [kit2.r, kit2.g, kit2.b, 1] : t < 0.78 ? [kit.r, kit.g, kit.b, 1] : null),
    breath: (t) => (t > 0.4 && t < 0.8 ? Math.sin(((t - 0.4) / 0.4) * Math.PI) * S * 0.008 : 0),
  });
  root.add(torso);
  // Épaules (deltoïdes)
  for (const side of [1, -1]) {
    const d = mesh(prep(ellipsoid(S * 0.03, S * 0.035, S * 0.032, 10)), mats.body);
    d.position.set(0, S * 0.07, side * S * 0.105);
    chest.add(d);
  }
  // Tête
  const head = new THREE.Group();
  headB.add(head);
  const hs = S * 0.125;
  const sk = mesh(prep(ellipsoid(hs * 0.52, hs * 0.62, hs * 0.46, 18)), mats.head);
  sk.position.set(hs * 0.05, hs * 0.5, 0);
  head.add(sk);
  const jaw = mesh(prep(ellipsoid(hs * 0.4, hs * 0.3, hs * 0.36, 12)), mats.head);
  jaw.position.set(hs * 0.18, hs * 0.18, 0);
  head.add(jaw);
  const nose = mesh(prep(new THREE.ConeGeometry(hs * 0.07, hs * 0.18, 6).rotateZ(-Math.PI / 2 + 0.3)), mats.head);
  nose.position.set(hs * 0.55, hs * 0.42, 0);
  head.add(nose);
  for (const sd of [-1, 1]) {
    const e = mesh(prep(new THREE.SphereGeometry(hs * 0.055, 8, 6)), DARK, false);
    e.position.set(hs * 0.47, hs * 0.58, sd * hs * 0.17);
    head.add(e);
    const ear = mesh(prep(ellipsoid(hs * 0.06, hs * 0.12, hs * 0.04, 8)), mats.head);
    ear.position.set(0, hs * 0.5, sd * hs * 0.46);
    head.add(ear);
  }
  const hairMat = new THREE.MeshStandardMaterial({ color: gib ? 0x2a2420 : hairC, roughness: 0.9 });
  const hair = mesh(prep(ellipsoid(hs * 0.55, hs * 0.42, hs * 0.5, 14)), hairMat);
  hair.position.set(-hs * 0.02, hs * 0.72, 0);
  head.add(hair);
  if (look.hair === "long") {
    const pony = mesh(prep(ellipsoid(hs * 0.15, hs * 0.45, hs * 0.15, 8)), hairMat);
    pony.position.set(-hs * 0.5, hs * 0.3, 0);
    pony.rotation.z = -0.4;
    head.add(pony);
  }
  // Jambes
  const shoe = new THREE.Color(0xf2f2f2);
  for (const lg of legs) {
    const b = lg.bones;
    const m = skinnedChain(b, [
      { w: S * 0.055, h: S * 0.06 }, { w: S * 0.05, h: S * 0.058, b: 0.06 }, { w: S * 0.03, h: S * 0.033, b: 0.18 },
      { w: S * 0.02, h: S * 0.022 }, { w: S * 0.024, h: S * 0.014 },
    ], mats.limb, {
      pre: b[0].getWorldPosition(new THREE.Vector3()).add(V(0, S * 0.05, 0)),
      up: V(1, 0, 0), seg: 12, rings: 4,
      tint: (t) => (gib ? null : t < 0.32 ? [kit2.r, kit2.g, kit2.b, 1] : t > 0.83 ? [shoe.r, shoe.g, shoe.b, 1] : null),
    });
    root.add(m);
    const sole = mesh(prep(new THREE.BoxGeometry(S * 0.1, S * 0.015, S * 0.045), gib ? null : [0.1, 0.1, 0.1, 1]), mats.limb);
    sole.position.set(0, -S * 0.04, 0);
    sole.rotation.z = Math.PI / 2;
    b[2].add(sole);
  }
  for (const ar of arms) {
    const b = ar.bones;
    const m = skinnedChain(b, [
      { w: S * 0.035, h: S * 0.04 }, { w: S * 0.024, h: S * 0.028, b: 0.12 }, { w: S * 0.018, h: S * 0.022 }, { w: S * 0.015, h: S * 0.024 },
    ], mats.limb, { up: V(1, 0, 0), seg: 10, rings: 4, tint: () => null });
    root.add(m);
  }
  const eye = new THREE.Object3D();
  eye.position.set(hs * 0.5, hs * 0.6, 0);
  head.add(eye);

  const st = { phase: 0, breath: 0 };
  const tmpM = new THREE.Matrix4(), tmpV = new THREE.Vector3(), invRoot = new THREE.Matrix4();
  function swimPose(dt, s) {
    // Crawl : corps à plat ventre, bras en moulinet, battements de jambes.
    const cyc = Math.max(0.5, s.f || 0.6);
    st.phase = fract(st.phase + cyc * dt);
    const ph = st.phase;
    body.rotation.z = -Math.PI / 2 + 0.06;
    body.position.set(-S * 0.45, -S * 0.02, 0);
    pelvis.rotation.set(0, 0, 0);
    abd.rotation.set(0, Math.sin(ph * TAU) * 0.25, 0);
    chest.rotation.set(0, Math.sin(ph * TAU) * 0.35, 0);
    neck.rotation.z = 0.5;
    arms.forEach((ar, i) => {
      const a = (ph + i * 0.5) * TAU;
      ar.bones[0].rotation.set(0, 0, Math.PI + a);
      ar.bones[1].rotation.z = Math.max(0, Math.sin(a)) * 0.9;
    });
    legs.forEach((lg, i) => {
      const k = Math.sin((ph * 3 + i * 0.5) * TAU) * 0.3;
      lg.bones[0].rotation.set(0, 0, k);
      lg.bones[1].rotation.z = -Math.abs(k) * 0.6;
      lg.bones[2].rotation.z = -1.2;
    });
    mats.uniforms.uBreath.value = 0;
  }

  function update(dt, s) {
    if (s.mode === "swim") { swimPose(dt, s); return; }
    body.rotation.set(0, 0, 0);
    body.position.x = 0;
    const v = s.v;
    const vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    const cyc = s.f > 0 ? s.f / 2 : 0;
    st.phase = fract(st.phase + cyc * dt);
    const ph = st.phase;
    const running = v > 2.1;
    const moving = v > 0.05;
    const duty = running ? lerp(0.42, 0.24, clamp(vr, 0, 1)) : 0.62;
    const accLean = clamp((s.a || 0) / Math.max(s.acc || 5, 1), 0, 1);
    const crouch = s.crouch ? (s.blocks ? 1 : 0.4) : 0;
    const lean = 0.04 + 0.1 * vr + 0.55 * accLean * clamp(1 - s.t / 3, 0, 1) + crouch * 0.9 + (s.fatigue / 100) * 0.08;
    const bobA = running ? S * 0.025 : S * 0.012;
    body.position.y = moving ? -Math.abs(Math.cos(ph * TAU)) * bobA + bobA * 0.5 : 0;
    body.position.y -= crouch * S * 0.2;
    body.position.x = crouch * S * 0.1;
    pelvis.rotation.set(0, 0, -lean * 0.3);
    abd.rotation.set(0, 0, -lean * 0.4);
    chest.rotation.set(0, 0, -lean * 0.3);
    pelvis.rotation.y = moving ? Math.sin(ph * TAU) * 0.08 : 0;
    chest.rotation.y = moving ? -Math.sin(ph * TAU) * 0.18 * (0.5 + vr) : 0;
    neck.rotation.z = lean * 0.75 - (s.fatigue / 100) * 0.15 + crouch * 0.4;
    st.breath += dt * (0.3 + s.fatigue / 40) * TAU;
    mats.uniforms.uBreath.value = (0.2 + s.fatigue / 60) * Math.sin(st.breath);
    mats.uniforms.uSweat.value = clamp((s.heat || 0) * 0.7, 0, 0.7);
    root.updateMatrixWorld(true);
    invRoot.copy(root.matrixWorld).invert();
    const stride = moving && cyc > 0 ? v / cyc : 0;
    legs.forEach((lg, i) => {
      const b = lg.bones;
      const lp = fract(ph + (i ? 0.5 : 0));
      const sweep = Math.min(stride * duty, legLen * (running ? 1.3 : 0.9));
      let fx = 0, fy = 0, a3 = 0, sw = 0, swing = false;
      if (moving) {
        if (lp < duty) { const t = lp / duty; fx = sweep * (0.5 - t); a3 = t > 0.6 ? -0.6 * (t - 0.6) / 0.4 : 0; }
        else {
          swing = true; sw = (lp - duty) / (1 - duty);
          const kick = running ? (0.15 + 0.45 * vr) : 0.08;
          fx = sweep * (-0.5 + smooth(sw)) + (running ? Math.sin(Math.PI * sw) * legLen * 0.18 * vr : 0);
          fy = Math.sin(Math.PI * Math.pow(sw, 0.7)) * legLen * kick;
          a3 = -0.7 * Math.sin(Math.PI * sw) - 0.2;
        }
      }
      if (crouch) {
        if (i === 0) { fx = S * 0.32; fy = 0; a3 = -0.3; } else { fx = -S * 0.12; fy = 0; a3 = -1.2; }
      }
      const ankle = V(fx - Math.cos(a3) * lg.lens[2] * 0.3, fy + S * 0.04 - Math.sin(a3) * lg.lens[2] * 0.3, lg.bones[0].position.z);
      const parent = b[0].parent;
      tmpM.copy(invRoot).multiply(parent.matrixWorld).invert();
      tmpV.copy(ankle).applyMatrix4(tmpM).sub(b[0].position);
      const [r1, r2, aAbs] = ik2(tmpV.x, tmpV.y, lg.lens[0], lg.lens[1], 1);
      b[0].rotation.z = r1;
      b[1].rotation.z = r2;
      let pp = 0; let o = parent; while (o && o !== root) { pp += o.rotation.z; o = o.parent; }
      b[2].rotation.z = a3 - (aAbs + pp);
    });
    arms.forEach((ar, i) => {
      const b = ar.bones;
      const swingA = moving ? (running ? 0.5 + 0.7 * vr : 0.35) : 0.05;
      const ang = Math.sin((ph + (i ? 0 : 0.5)) * TAU) * swingA;
      b[0].rotation.y = 0;
      b[0].rotation.z = crouch ? 0.9 * crouch + lean * 0.3 : ang + lean * 0.3;
      b[0].rotation.x = ar.side * (gib ? 0.2 + (moving ? 1.6 : 0.3) : 0.08);
      b[1].rotation.z = crouch ? 0 : running ? 1.1 + 0.4 * vr + Math.sin((ph + (i ? 0 : 0.5)) * TAU) * 0.3 : 0.25;
      b[2].rotation.z = 0.1;
    });
  }
  return { root, update, eye, head, dims: { height: S, length: S * 0.4, width: S * 0.3, hip: pelY } };
}

// ───────────────────────────── Oiseau coureur (bipède) ─────────────────────────────
function buildRatite(sp, look, mats) {
  const H = parseFloat(look.H) || 0.4 * Math.cbrt(sp.mass);
  const L = parseFloat(look.L) || H * 0.7;
  const penguin = look.legs === "penguin";
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const legsType = look.legs || "bird";
  const legFrac = legsType === "ostrich" ? 0.6 : legsType === "emu" ? 0.55 : legsType === "heron" ? 0.62 : penguin ? 0.12 : 0.42;
  const hipY = H * legFrac + H * (1 - legFrac) * 0.35;
  const bodyB = bone(null, 0, hipY, 0, "body");
  body.add(bodyB);
  const bodyLen = L, bodyH = H * (1 - legFrac) * (penguin ? 0.85 : 0.6);
  const torsoGeo = prep(ellipsoid(bodyLen * 0.55, bodyH * 0.6, bodyLen * (penguin ? 0.45 : 0.36), 18));
  const torsoM = mesh(torsoGeo, mats.body);
  torsoM.position.set(0, bodyH * 0.05, 0);
  if (penguin) { torsoM.rotation.z = Math.PI / 2 - 0.15; torsoM.position.y = bodyH * 0.45; }
  bodyB.add(torsoM);
  // Cou
  const nt = look.neck || "short";
  let nl = nt === "ostrich" || nt === "ostrichblue" ? H * 0.75 : nt === "emu" || nt === "rhea" || nt === "cassowary" ? H * 0.45 : nt === "heron" ? H * 0.5 : nt === "turkey" ? H * 0.35 : nt === "medium" ? H * 0.3 : nt === "none" ? H * 0.05 : H * 0.18;
  const nb = [bone(bodyB, bodyLen * 0.45, bodyH * 0.2, 0)];
  const nseg = nl > H * 0.3 ? 4 : 2;
  for (let i = 0; i < nseg; i++) {
    const a = penguin ? 1.5 : 1.25 - i * 0.12;
    nb.push(bone(nb[i], Math.cos(a) * nl / nseg, Math.sin(a) * nl / nseg, 0));
  }
  const hs = Math.max(H * 0.13, bodyLen * 0.25) * (penguin ? 1.1 : 1);
  const head = makeBirdHead(look.head || "small", hs, mats, look);
  nb[nb.length - 1].add(head);
  head.rotation.z = -1.2 + (penguin ? 1.0 : 0);
  root.updateMatrixWorld(true);
  {
    const nr = nb.map((_, i) => { const t = i / (nb.length - 1); const r = lerp(bodyH * 0.28, hs * 0.18, Math.pow(t, 0.6)); return { w: r, h: r }; });
    nr.unshift({ w: bodyH * 0.35, h: bodyH * 0.35 });
    const neckMat = look.neck === "ostrich" || look.neck === "ostrichblue" ? new THREE.MeshStandardMaterial({ color: look.neck === "ostrichblue" ? 0x8a9ab8 : 0xd8a898, roughness: 0.7 }) : mats.body;
    const nm = skinnedChain(nb, nr, neckMat, { pre: V(bodyLen * 0.3, bodyH * 0.05, 0), seg: 12, rings: 4 });
    if (!nm.geometry.attributes.tint) prep(nm.geometry);
    root.add(nm);
  }
  // Ailes plumeuses
  for (const sd of [-1, 1]) {
    const w = mesh(prep(ellipsoid(bodyLen * (look.wings === "flipper" ? 0.3 : 0.38), bodyH * 0.35, bodyLen * 0.06, 10)), look.wings === "plume" ? new THREE.MeshStandardMaterial({ color: 0xf2eee6, roughness: 0.95 }) : mats.limb);
    w.position.set(-bodyLen * 0.05, bodyH * 0.1, sd * bodyLen * 0.34);
    w.rotation.set(sd * 0.3, 0, penguin ? -1.3 : -0.4);
    bodyB.add(w);
  }
  if (look.tail) {
    const t = mesh(prep(new THREE.ConeGeometry(bodyLen * 0.2, bodyLen * (look.tail === "long" ? 1.0 : 0.45), 8).rotateZ(Math.PI / 2 + 0.5)), mats.body);
    t.position.set(-bodyLen * 0.6, bodyH * 0.2, 0);
    if (look.tail === "fan") t.scale.set(1, 1, 2.5);
    bodyB.add(t);
  }
  // Pattes : fémur (caché), tibiotarse, tarsométatarse, doigts
  const legLen = hipY * 1.06;
  const fr = penguin ? [0.4, 0.4, 0.2] : [0.22, 0.38, 0.33, 0.07];
  const tot = fr.reduce((a, b) => a + b, 0);
  const lens = fr.map((f) => (f * legLen) / tot);
  const legs = [];
  for (const side of [1, -1]) {
    const bones = legBones(bodyB, V(0, -bodyH * 0.1, side * bodyLen * 0.16), lens);
    legs.push({ side, bones, lens });
  }
  root.updateMatrixWorld(true);
  const legMat = new THREE.MeshStandardMaterial({ color: legsType === "ostrich" ? 0xd8a898 : penguin ? 0xe0a080 : 0x5a5248, roughness: 0.7 });
  for (const lg of legs) {
    const b = lg.bones;
    const thigh = lens[0];
    const rad = penguin ? [{ w: 0.14, h: 0.14 }, { w: 0.12, h: 0.12 }, { w: 0.1, h: 0.1 }, { w: 0.07, h: 0.07 }, { w: 0.09, h: 0.04 }] : [{ w: 0.18, h: 0.22 }, { w: 0.16, h: 0.2 }, { w: 0.12, h: 0.16, b: 0.15 }, { w: 0.04, h: 0.05 }, { w: 0.035, h: 0.04 }, { w: 0.045, h: 0.03 }];
    const m = skinnedChain(b, rad.map((r) => ({ w: r.w * legLen, h: r.h * legLen, b: r.b })), legMat, {
      pre: b[0].getWorldPosition(new THREE.Vector3()).add(V(0, bodyH * 0.2, 0)),
      up: V(1, 0, 0), seg: 10, rings: 4,
      tint: (t) => (t < 0.3 && !penguin ? [mats.colors.c1.r, mats.colors.c1.g, mats.colors.c1.b, 1] : null),
    });
    m.material = mats.limb;
    prep(m.geometry);
    const tints = m.geometry.attributes.tint;
    // Cuisse en plumes, reste en peau nue
    const n = tints.count;
    const legC = new THREE.Color(legMat.color);
    for (let i = 0; i < n; i++) {
      const y = m.geometry.attributes.position.getY(i);
      if (y < hipY - thigh * 0.9) tints.setXYZW(i, legC.r, legC.g, legC.b, 1);
    }
    root.add(m);
  }
  const eye = new THREE.Object3D();
  eye.position.copy(head.userData.eye);
  head.add(eye);
  const st = { phase: 0 };
  const tmpM = new THREE.Matrix4(), tmpV = new THREE.Vector3(), invRoot = new THREE.Matrix4();
  const restN = nb.map((b) => b.rotation.z);
  function update(dt, s) {
    const v = s.v, vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    const cyc = s.f > 0 ? s.f / 2 : 0;
    st.phase = fract(st.phase + cyc * dt);
    const ph = st.phase, moving = v > 0.05;
    const running = v * v / (G * hipY) > 0.5;
    const duty = running ? lerp(0.45, 0.3, clamp(vr, 0, 1)) : 0.6;
    body.position.y = moving ? -Math.abs(Math.cos(ph * TAU)) * hipY * 0.04 * (0.4 + vr) : 0;
    bodyB.rotation.z = -0.1 * vr - (s.crouch ? 0.15 : 0);
    if (penguin) { bodyB.rotation.x = moving ? Math.sin(ph * TAU) * 0.15 : 0; }
    nb[0].rotation.z = restN[0] - 0.35 * vr - (s.fatigue / 100) * 0.2;
    nb[1].rotation.z = restN[1] + 0.15 * vr;
    root.updateMatrixWorld(true);
    invRoot.copy(root.matrixWorld).invert();
    const stride = moving && cyc > 0 ? v / cyc : 0;
    legs.forEach((lg, i) => {
      const b = lg.bones;
      const lp = fract(ph + (i ? 0.5 : 0));
      const sweep = Math.min(stride * duty, legLen * 1.2);
      let fx = 0, fy = 0, a3 = -Math.PI / 2 + 0.25, sw = 0;
      if (moving) {
        if (lp < duty) { fx = sweep * (0.5 - lp / duty); }
        else { sw = (lp - duty) / (1 - duty); fx = sweep * (-0.5 + smooth(sw)); fy = Math.sin(Math.PI * sw) * legLen * (0.12 + 0.18 * vr); a3 -= 0.9 * Math.sin(Math.PI * sw); }
      }
      if (penguin) {
        const ank = V(fx, fy + lens[2] * 0.5, lg.bones[0].position.z);
        tmpM.copy(invRoot).multiply(b[0].parent.matrixWorld).invert();
        tmpV.copy(ank).applyMatrix4(tmpM).sub(b[0].position);
        const [r1, r2] = ik2(tmpV.x, tmpV.y, lens[0], lens[1], 1);
        b[0].rotation.z = r1; b[1].rotation.z = r2; b[2].rotation.z = Math.PI / 2;
        return;
      }
      const a4 = a3 + 0.9;
      const ank = V(fx - Math.cos(a4) * lens[3] - Math.cos(a3) * lens[2], fy + legLen * 0.02 - Math.sin(a4) * lens[3] - Math.sin(a3) * lens[2], lg.bones[0].position.z);
      tmpM.copy(invRoot).multiply(b[0].parent.matrixWorld).invert();
      tmpV.copy(ank).applyMatrix4(tmpM).sub(b[0].position);
      const [r1, r2, aAbs] = ik2(tmpV.x, tmpV.y, lens[0], lens[1], 1);
      b[0].rotation.z = r1; b[1].rotation.z = r2;
      const a2 = aAbs + bodyB.rotation.z;
      b[2].rotation.z = a3 - a2;
      b[3].rotation.z = a4 - a3;
    });
  }
  return { root, update, eye, head, dims: { height: H + nl * 0.6, length: bodyLen * 1.6, width: bodyLen * 0.7, hip: hipY } };
}

// ───────────────────────────── Oiseau en vol ─────────────────────────────
function buildFlyer(sp, look, mats) {
  const wt = look.wing || "small";
  const spanK = { albatross: 1.35, eagle: 1.05, heron: 1.15, goose: 1.0, swift: 0.95, falcon: 0.95, pigeon: 0.9, crow: 1.0, parrot: 0.9, gull: 1.1, owl: 1.05, duck: 0.85, humming: 0.55, small: 0.85 }[wt] || 1;
  const span = spanK * 1.0 * Math.pow(sp.mass, 0.39);
  const bl = span * (wt === "albatross" ? 0.32 : wt === "heron" ? 0.35 : 0.38);
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const bodyB = bone(null, 0, 0, 0, "body");
  body.add(bodyB);
  const torso = mesh(prep(ellipsoid(bl * 0.42, bl * 0.18, bl * 0.18, 16)), mats.body);
  bodyB.add(torso);
  const neckL = look.neck === "swan" ? bl * 0.7 : look.neck === "heron" ? bl * 0.5 : look.neck === "medium" ? bl * 0.3 : bl * 0.12;
  const nb = [bone(bodyB, bl * 0.35, bl * 0.05, 0)];
  nb.push(bone(nb[0], neckL * 0.95, neckL * 0.15, 0));
  const hs = bl * (wt === "humming" ? 0.3 : 0.25);
  const head = makeBirdHead(look.head || "small", hs, mats, look);
  nb[1].add(head);
  head.position.x = -hs * 0.2;
  root.updateMatrixWorld(true);
  if (neckL > bl * 0.2) {
    const nm = skinnedChain(nb, [{ w: bl * 0.12, h: bl * 0.12 }, { w: bl * 0.07, h: bl * 0.07 }, { w: bl * 0.06, h: bl * 0.06 }], mats.body, { pre: V(bl * 0.2, 0, 0), seg: 10, rings: 3 });
    root.add(nm);
  }
  // Queue
  const tl = bl * (look.tail === "long" ? 0.7 : look.tail === "fork" ? 0.55 : 0.35);
  const tailG = new THREE.ConeGeometry(bl * 0.16, tl, 3).rotateZ(Math.PI / 2);
  tailG.scale(1, 0.15, 1.8);
  const tail = mesh(prep(tailG), mats.limb);
  tail.position.set(-bl * 0.42 - tl * 0.4, 0, 0);
  bodyB.add(tail);
  // Ailes : bras + main (deux os), surface aplatie
  const wingC = look.wingc ? new THREE.Color(look.wingc) : null;
  const wings = [];
  for (const sd of [-1, 1]) {
    const arm = bone(bodyB, bl * 0.08, bl * 0.08, sd * bl * 0.12);
    const hand = bone(arm, 0, 0, sd * span * 0.22);
    const armW = mesh(prep(new THREE.BoxGeometry(bl * (wt === "swift" ? 0.28 : 0.42), bl * 0.025, span * 0.24).translate(-bl * 0.08, 0, sd * span * 0.11), wingC ? [wingC.r, wingC.g, wingC.b, 0.6] : null), mats.limb);
    arm.add(armW);
    const hg = new THREE.ConeGeometry(bl * 0.22, span * 0.3, 4).rotateX(sd * Math.PI / 2);
    hg.scale(1.2, 0.08, 1);
    hg.translate(-bl * 0.12, 0, sd * span * 0.14);
    const handW = mesh(prep(hg, wingC ? [wingC.r, wingC.g, wingC.b, 1] : null), mats.limb);
    hand.add(handW);
    wings.push({ sd, arm, hand });
  }
  // Pattes repliées
  const legMat = new THREE.MeshStandardMaterial({ color: 0xc8a050, roughness: 0.6 });
  const legsG = [];
  for (const sd of [-1, 1]) {
    const lgm = mesh(prep(new THREE.CylinderGeometry(bl * 0.025, bl * 0.02, bl * 0.35, 5).translate(0, -bl * 0.17, 0)), legMat);
    lgm.position.set(-bl * 0.05, -bl * 0.1, sd * bl * 0.06);
    bodyB.add(lgm);
    legsG.push(lgm);
  }
  const eye = new THREE.Object3D();
  eye.position.copy(head.userData.eye);
  head.add(eye);
  const st = { phase: 0, alt: 0, t: 0 };
  const cruiseAlt = clamp(1.2 + span * 1.2, 1.5, 6);
  function update(dt, s) {
    const v = s.v;
    const vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    st.t += dt;
    const flying = s.mode === "fly" && (s.started || v > 0.2);
    const f = flying ? Math.max(s.f, 1) : 0;
    st.phase = fract(st.phase + f * dt);
    const target = flying ? cruiseAlt : bl * 0.35 + 0.0;
    st.alt += (target - st.alt) * (1 - Math.exp(-dt * (flying ? 1.5 : 4)));
    body.position.y = st.alt + (flying ? Math.sin(st.phase * TAU) * span * 0.03 : 0);
    const amp = flying ? (0.55 + 0.45 * clamp((s.effort ?? vr), 0, 1)) * (wt === "albatross" ? 0.5 : 1) : 0;
    wings.forEach((w) => {
      if (flying) {
        w.arm.rotation.x = -w.sd * (Math.sin(st.phase * TAU) * amp * 0.9 + 0.1);
        w.hand.rotation.x = -w.sd * Math.sin(st.phase * TAU - 0.8) * amp * 0.6;
        w.arm.rotation.y = 0; w.hand.rotation.y = 0;
      } else {
        w.arm.rotation.x = -w.sd * 0.1;
        w.arm.rotation.y = w.sd * 1.35;
        w.hand.rotation.y = w.sd * 1.4;
        w.hand.rotation.x = 0;
      }
    });
    bodyB.rotation.z = flying ? -0.05 - 0.05 * vr : 0.35;
    legsG.forEach((l) => (l.rotation.z = flying ? 1.3 : 0));
  }
  return { root, update, eye, head, dims: { height: cruiseAlt + bl * 0.3, length: bl * 1.5, width: span, hip: bl * 0.3, flyer: true } };
}

// ───────────────────────────── Sauteur (kangourou, gerboise) ─────────────────────────────
function buildHopper(sp, look, mats) {
  const H = parseFloat(look.H) || 0.35 * Math.cbrt(sp.mass);
  const L = parseFloat(look.L) || H * 0.6;
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const hipY = H * 0.42;
  const hips = bone(null, 0, hipY, 0);
  body.add(hips);
  const spine = bone(hips, L * 0.45, L * 0.2, 0);
  const chest = bone(spine, L * 0.45, L * 0.25, 0);
  const n0 = bone(chest, L * 0.15, L * 0.18, 0);
  const headB = bone(n0, L * 0.08, L * 0.15, 0);
  const D = L * 0.42;
  const hs = D * 0.95;
  const head = makeHead(look.head || "deer", hs, mats, { ...look, ears: look.ears || "long" });
  headB.add(head);
  head.rotation.z = -0.35;
  const tailBones = [bone(hips, -L * 0.1, -D * 0.1, 0)];
  const tL = look.tail === "jerboa" ? L * 2.2 : L * 1.25;
  for (let i = 0; i < 5; i++) tailBones.push(bone(tailBones[i], -tL / 5, -tL / 5 * (i === 0 ? 0.45 : 0.06), 0));
  const legLen = hipY * 1.25;
  const lens = [legLen * 0.32, legLen * 0.42, legLen * 0.26];
  const legs = [];
  for (const side of [1, -1]) legs.push({ side, lens, bones: legBones(hips, V(L * 0.05, -D * 0.2, side * D * 0.35), lens) });
  const arms = [];
  for (const side of [1, -1]) arms.push(legBones(chest, V(L * 0.08, -D * 0.2, side * D * 0.3), [D * 0.4, D * 0.35, D * 0.12]));
  root.updateMatrixWorld(true);
  root.add(skinnedChain([hips, spine, chest, n0], [{ w: D * 0.42, h: D * 0.48 }, { w: D * 0.55, h: D * 0.6 }, { w: D * 0.48, h: D * 0.5 }, { w: D * 0.38, h: D * 0.4 }, { w: D * 0.25, h: D * 0.25 }, { w: D * 0.2, h: D * 0.2 }],
    mats.body, { pre: V(-L * 0.15, hipY - D * 0.15, 0), tip: headB.getWorldPosition(new THREE.Vector3()), seg: 16, rings: 5 }));
  root.add(skinnedChain(tailBones, tailBones.map((_, i) => { const r = lerp(D * 0.32, D * 0.06, i / 5); return { w: r, h: r }; }).concat([{ w: D * 0.05, h: D * 0.05 }]), mats.body, { seg: 10, rings: 3, tip: tailBones[5].getWorldPosition(new THREE.Vector3()).add(V(-tL * 0.1, 0, 0)) }));
  for (const lg of legs) root.add(skinnedChain(lg.bones, [{ w: 0.2, h: 0.28 }, { w: 0.15, h: 0.24, b: 0.15 }, { w: 0.06, h: 0.08 }, { w: 0.05, h: 0.045 }, { w: 0.05, h: 0.035 }].map((r) => ({ w: r.w * legLen, h: r.h * legLen, b: r.b })), mats.limb, { pre: lg.bones[0].getWorldPosition(new THREE.Vector3()).add(V(0, D * 0.3, 0)), up: V(1, 0, 0), seg: 12, rings: 4 }));
  for (const ab of arms) root.add(skinnedChain(ab, [{ w: D * 0.12, h: D * 0.12 }, { w: D * 0.09, h: D * 0.1 }, { w: D * 0.06, h: D * 0.06 }, { w: D * 0.05, h: D * 0.05 }], mats.limb, { up: V(1, 0, 0), seg: 8, rings: 3 }));
  const eye = new THREE.Object3D();
  eye.position.copy(head.userData.eye);
  head.add(eye);
  const st = { phase: 0 };
  const tmpM = new THREE.Matrix4(), tmpV = new THREE.Vector3(), invRoot = new THREE.Matrix4();
  function update(dt, s) {
    const v = s.v, vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    const f = s.f;
    st.phase = fract(st.phase + f * dt);
    const ph = st.phase, moving = v > 0.05;
    const duty = 0.34;
    const hopH = moving ? (0.04 + 0.12 * vr) * H : 0;
    const flight = ph > duty ? Math.sin(Math.PI * (ph - duty) / (1 - duty)) : 0;
    body.position.y = flight * hopH;
    const pitch = 0.6 - 0.5 * clamp(vr * 1.5, 0, 1);
    hips.rotation.z = pitch - (s.fatigue / 100) * 0.1;
    spine.rotation.z = 0.15 * (moving ? Math.sin(ph * TAU) : 0);
    n0.rotation.z = -pitch * 0.7 + 0.1;
    tailBones[0].rotation.z = -pitch * 0.6 + (moving ? Math.sin(ph * TAU + 2) * 0.2 : 0.2);
    for (let i = 1; i < tailBones.length; i++) tailBones[i].rotation.z = moving ? Math.sin(ph * TAU + 2 - i * 0.5) * 0.1 : 0.05;
    arms.forEach((b) => { b[0].rotation.z = 0.6 - pitch; b[1].rotation.z = 0.8; });
    root.updateMatrixWorld(true);
    invRoot.copy(root.matrixWorld).invert();
    const stride = moving && f > 0 ? v / f : 0;
    const sweep = Math.min(stride * duty, legLen * 1.2);
    legs.forEach((lg) => {
      const b = lg.bones;
      let fx = 0, fy = 0, a3 = 0;
      if (moving) {
        if (ph < duty) { fx = sweep * (0.5 - ph / duty) + L * 0.15; a3 = -0.9 * (ph / duty); }
        else { const sw = (ph - duty) / (1 - duty); fx = L * 0.15 + sweep * (-0.5 + smooth(sw)); fy = flight * hopH * -0.5 + Math.sin(Math.PI * sw) * legLen * 0.1; a3 = -0.5; }
      } else { fx = L * 0.25; a3 = 0; }
      const fy2 = fy - body.position.y * 0;
      const ank = V(fx - Math.cos(a3) * lens[2] * 0.95, Math.max(0, fy2) + 0.02 * H - Math.sin(a3) * lens[2] * 0.95, b[0].position.z);
      tmpM.copy(invRoot).multiply(b[0].parent.matrixWorld).invert();
      tmpV.copy(ank).applyMatrix4(tmpM).sub(b[0].position);
      const [r1, r2, aAbs] = ik2(tmpV.x, tmpV.y, lens[0], lens[1], 1);
      b[0].rotation.z = r1; b[1].rotation.z = r2;
      b[2].rotation.z = a3 - (aAbs + hips.rotation.z);
    });
  }
  return { root, update, eye, head, dims: { height: H, length: L + tL * 0.5, width: D, hip: hipY } };
}

// ───────────────────────────── Reptiles (lézards, crocodiliens, tortues) ─────────────────────────────
function buildReptile(sp, look, mats) {
  const croc = sp.plan === "croc";
  const turtle = sp.plan === "turtle";
  const L = parseFloat(look.L) || 0.5 * Math.cbrt(sp.mass);
  const H = parseFloat(look.H) || L * 0.18;
  const tailFrac = turtle ? 0.08 : croc ? 0.45 : look.tail === "lizardlong" ? 0.62 : 0.5;
  const bodyL = L * (1 - tailFrac) * 0.7;
  const neckL = L * (1 - tailFrac) * 0.12;
  const D = turtle ? H * 0.9 : H * (croc ? 0.9 : 0.75);
  const W = D * (croc ? 1.5 : turtle ? 2.2 : 1.3);
  const legLen = (turtle ? H * 0.9 : H * 1.1) * (parseFloat(look.legs) || 1);
  const bodyY = turtle ? H * 0.75 : legLen * 0.62 + D * 0.15;
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const nb = turtle ? 3 : 5;
  const spineB = [bone(null, -bodyL / 2, bodyY, 0)];
  body.add(spineB[0]);
  for (let i = 1; i < nb; i++) spineB.push(bone(spineB[i - 1], bodyL / (nb - 1), 0, 0));
  const neck = bone(spineB[nb - 1], neckL * 0.6, 0, 0);
  const headB = bone(neck, neckL, 0.0, 0);
  const tailB = [bone(spineB[0], -bodyL * 0.12, 0, 0)];
  const tN = 6, tL = L * tailFrac;
  for (let i = 0; i < tN; i++) tailB.push(bone(tailB[i], -tL / tN, -(i === 0 ? D * 0.12 : 0), 0));
  const hs = turtle ? D * 0.55 : croc ? D * 1.3 : D * 1.2;
  const head = makeHead(look.head || "lizard", hs, mats, look);
  headB.add(head);
  // Pattes en position écartée
  const legs = [];
  const lens = [legLen * 0.45, legLen * 0.45, legLen * 0.18];
  for (const front of [true, false]) for (const side of [1, -1]) {
    const host = front ? spineB[nb - 1] : spineB[0];
    const bb = legBones(host, V(front ? 0 : bodyL * 0.02, -D * 0.25, side * W * 0.38), lens);
    bb[0].rotation.order = "YXZ";
    legs.push({ front, side, bones: bb });
  }
  root.updateMatrixWorld(true);
  const spPts = spineB.map((b) => b.getWorldPosition(new THREE.Vector3()));
  const rad = spPts.map((_, i) => { const t = i / (nb - 1); return { w: W * 0.5 * (0.75 + 0.3 * Math.sin(Math.PI * t)), h: D * 0.5 * (0.8 + 0.25 * Math.sin(Math.PI * t)) }; });
  rad.push({ w: W * 0.28, h: D * 0.35 }, { w: hs * 0.32, h: hs * 0.22 });
  rad.unshift({ w: W * 0.32, h: D * 0.36 });
  const allB = [...spineB, neck, headB];
  root.add(skinnedChain(allB, rad, mats.body, { pre: V(-bodyL / 2 - bodyL * 0.12, bodyY, 0), seg: 16, rings: 4, capEnd: false }));
  const trad = tailB.map((_, i) => { const t = i / tN; const r = lerp(Math.min(W, D) * 0.45, Math.min(W, D) * 0.06, Math.pow(t, 0.8)); return { w: croc ? r * 0.8 : r, h: croc ? r * 1.2 : r }; });
  trad.push({ w: D * 0.03, h: D * 0.03 });
  root.add(skinnedChain(tailB, trad, mats.body, { seg: 10, rings: 3, tip: tailB[tN].getWorldPosition(new THREE.Vector3()).add(V(-tL / tN * 0.5, 0, 0)) }));
  for (const lg of legs) {
    const r = Math.min(W, D) * (turtle ? 0.22 : 0.18);
    root.add(skinnedChain(lg.bones, [{ w: r * 1.3, h: r * 1.3 }, { w: r, h: r }, { w: r * 0.75, h: r * 0.75 }, { w: r * 0.6, h: r * 0.6 }, { w: r * 0.9, h: r * 0.5 }], mats.limb, { pre: lg.bones[0].getWorldPosition(new THREE.Vector3()).add(V(0, D * 0.2, -lg.side * W * 0.15)), up: V(1, 0, 0), seg: 8, rings: 3 }));
  }
  if (turtle) {
    const shellMat = new THREE.MeshStandardMaterial({ color: mats.colors.c1, roughness: 0.55 });
    const sh = mesh(prep(new THREE.SphereGeometry(1, 24, 12, 0, TAU, 0, Math.PI / 2).scale(bodyL * 0.85, D * 1.05, W * 0.62)), shellMat);
    sh.position.set(bodyL * 0.5, -D * 0.1, 0);
    spineB[0].add(sh);
    // écailles du dessus
    const scuteM = new THREE.MeshStandardMaterial({ color: mats.colors.c2, roughness: 0.6 });
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * TAU;
      const sc = mesh(prep(new THREE.CircleGeometry(bodyL * 0.17, 6)), scuteM);
      const r = i === 0 ? 0 : bodyL * 0.35;
      sc.position.set(bodyL * 0.5 + Math.cos(a) * r * 0.9, D * (i === 0 ? 0.96 : 0.7), Math.sin(a) * r * 0.65);
      sc.lookAt(sc.position.clone().add(V(Math.cos(a) * (i ? 0.6 : 0), 1, Math.sin(a) * (i ? 0.6 : 0))));
      sc.position.y -= D * 0.1;
      spineB[0].add(sc);
    }
    const pl = mesh(prep(ellipsoid(bodyL * 0.8, D * 0.12, W * 0.55, 16)), new THREE.MeshStandardMaterial({ color: 0xd8c890, roughness: 0.6 }));
    pl.position.set(bodyL * 0.5, -D * 0.12, 0);
    spineB[0].add(pl);
  }
  if (look.crest) {
    const cm = new THREE.MeshStandardMaterial({ color: mats.colors.c1.clone().multiplyScalar(0.8), roughness: 0.6 });
    for (let i = 0; i < 10; i++) {
      const c = mesh(prep(new THREE.ConeGeometry(D * 0.06, D * 0.35 * (1 - i / 12), 4)), cm);
      c.position.set(-i * bodyL * 0.1 + bodyL * 0.15, D * 0.5, 0);
      spineB[Math.min(nb - 1, Math.floor((1 - i / 10) * nb))].attach(c);
    }
  }
  if (look.armor || croc) {
    const am = new THREE.MeshStandardMaterial({ color: mats.colors.c1.clone().multiplyScalar(0.75), roughness: 0.7 });
    for (let i = 0; i < 16; i++) for (const sd of [-1, 1]) {
      const c = mesh(prep(new THREE.BoxGeometry(D * 0.18, D * 0.12, D * 0.12)), am);
      const x = -bodyL / 2 + (i / 16) * bodyL;
      c.position.set(x, bodyY + D * 0.48, sd * W * 0.18);
      spineB[clamp(Math.floor((i / 16) * nb), 0, nb - 1)].attach(c);
    }
  }
  const eye = new THREE.Object3D();
  eye.position.copy(head.userData.eye);
  head.add(eye);
  const st = { phase: 0 };
  function update(dt, s) {
    const v = s.v, vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    const f = s.f;
    st.phase = fract(st.phase + f * dt);
    const ph = st.phase, moving = v > 0.01;
    const amp = moving ? (turtle ? 0.05 : 0.18 + 0.15 * vr) : 0;
    const gallop = croc && vr > 0.7 && sp.gait === "bound";
    spineB.forEach((b, i) => { if (i) b.rotation.y = Math.sin(ph * TAU - i * 0.9) * amp * (gallop ? 0.2 : 1); });
    spineB[0].rotation.y = Math.sin(ph * TAU) * amp * 0.6;
    spineB[0].rotation.z = gallop ? Math.sin(ph * TAU) * 0.12 : 0;
    neck.rotation.y = -Math.sin(ph * TAU - 4 * 0.9) * amp * 0.8;
    tailB.forEach((b, i) => { b.rotation.y = Math.sin(ph * TAU + 1 + i * 0.8) * amp * 0.8; b.rotation.z = i === 0 ? -0.05 : 0.02; });
    body.position.y = moving ? (croc && vr > 0.5 ? 0.1 * legLen * vr : 0) + Math.abs(Math.sin(ph * TAU * 2)) * legLen * 0.03 * vr : -legLen * 0.15;
    const duty = turtle ? 0.75 : 0.55 - 0.15 * vr;
    legs.forEach((lg, i) => {
      const off = gallop ? (lg.front ? 0.5 : 0) + (lg.side > 0 ? 0 : 0.05) : turtle ? [0.25, 0.75, 0.5, 0][i] : ((lg.front === (lg.side > 0)) ? 0 : 0.5);
      const lp = fract(ph + off);
      let swing = 0, lift = 0;
      if (lp < duty) swing = 0.5 - lp / duty;
      else { const s2 = (lp - duty) / (1 - duty); swing = -0.5 + smooth(s2); lift = Math.sin(Math.PI * s2); }
      if (!moving) { swing = 0; lift = 0; }
      const b = lg.bones;
      const sweepA = turtle ? 0.6 : 1.1;
      b[0].rotation.y = lg.side * (-swing * sweepA + (lg.front ? -0.2 : 0.3));
      b[0].rotation.x = lg.side * -(turtle ? 0.9 : 1.15 - (croc ? 0.25 * vr : 0)) - lg.side * lift * 0.35;
      b[1].rotation.x = lg.side * (turtle ? 1.0 : 1.25);
      b[1].rotation.z = 0;
      b[2].rotation.z = 0.8;
    });
  }
  return { root, update, eye, head, dims: { height: bodyY + D * 0.5, length: L, width: W + legLen, hip: bodyY } };
}

// ───────────────────────────── Serpent ─────────────────────────────
function buildSnake(sp, look, mats) {
  const L = parseFloat(look.L) || 1;
  const r = L * 0.022 * Math.pow(sp.mass / Math.max(L, 0.1) / 2, 0.15) + L * 0.008;
  const N = 18;
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const seg = L / N;
  const bones = [bone(null, L * 0.5, r, 0)];
  body.add(bones[0]);
  for (let i = 1; i < N; i++) bones.push(bone(bones[i - 1], -seg, 0, 0));
  const hs = r * 4.5;
  const head = makeHead(look.head || "snake", hs, mats, look);
  const headB = bone(bones[0], 0, 0, 0);
  head.rotation.y = 0;
  headB.add(head);
  root.updateMatrixWorld(true);
  const rad = bones.map((_, i) => { const t = i / (N - 1); const k = t < 0.1 ? 0.6 + 4 * t : t > 0.7 ? 1 - (t - 0.7) / 0.32 : 1; return { w: r * Math.max(0.08, k), h: r * Math.max(0.08, k) * 0.85 }; });
  rad.push({ w: r * 0.05, h: r * 0.05 });
  root.add(skinnedChain(bones, rad, mats.body, { tip: bones[N - 1].getWorldPosition(new THREE.Vector3()).add(V(-seg, 0, 0)), seg: 10, rings: 3 }));
  const eye = new THREE.Object3D();
  eye.position.copy(head.userData.eye);
  head.add(eye);
  const st = { phase: 0 };
  function update(dt, s) {
    const v = s.v;
    const f = s.f;
    st.phase = fract(st.phase + f * dt);
    const moving = v > 0.01;
    const A = moving ? (sp.gait === "rectilinear" ? 0.04 : 0.35) : 0.12;
    bones.forEach((b, i) => {
      if (i === 0) { b.rotation.y = Math.sin(st.phase * TAU) * A * 0.5; return; }
      b.rotation.y = Math.sin(st.phase * TAU - i * 0.55) * A;
      if (sp.gait === "sidewind") b.position.y = Math.max(0, Math.sin(st.phase * TAU - i * 0.55)) * r * 0.5;
    });
    head.rotation.y = -bones[0].rotation.y;
  }
  return { root, update, eye, head, dims: { height: r * 3, length: L, width: L * 0.2, hip: r } };
}

// ───────────────────────────── Nageurs (cétacés, poissons, pinnipèdes) ─────────────────────────────
function buildSwimmer(sp, look, mats) {
  const type = look.body || "fish";
  const L = parseFloat(look.L) || Math.cbrt(sp.mass) * 0.6;
  const cet = ["dolphin", "orca", "whale", "sperm", "manatee", "seal", "sealion", "walrus", "otter"].includes(type);
  const pinn = ["seal", "sealion", "walrus", "otter"].includes(type);
  const N = 7;
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const prof = {
    dolphin: [0.3, 0.75, 1, 0.95, 0.7, 0.4, 0.18, 0.1], orca: [0.5, 0.85, 1, 0.95, 0.75, 0.45, 0.2, 0.12], whale: [0.6, 0.9, 1, 0.9, 0.7, 0.45, 0.22, 0.12],
    sperm: [0.95, 1, 1, 0.9, 0.7, 0.45, 0.22, 0.12], manatee: [0.5, 0.85, 1, 1, 0.85, 0.6, 0.35, 0.2], seal: [0.45, 0.8, 1, 1, 0.85, 0.6, 0.35, 0.2],
    sealion: [0.4, 0.7, 1, 1, 0.8, 0.55, 0.3, 0.18], walrus: [0.6, 0.9, 1, 1, 0.9, 0.65, 0.35, 0.2], otter: [0.4, 0.7, 0.9, 0.9, 0.8, 0.6, 0.35, 0.2],
    shark: [0.3, 0.7, 1, 0.95, 0.75, 0.45, 0.2, 0.12], tuna: [0.35, 0.8, 1, 0.9, 0.6, 0.3, 0.12, 0.1], sword: [0.25, 0.7, 1, 0.9, 0.65, 0.35, 0.14, 0.1],
    sail: [0.25, 0.7, 1, 0.9, 0.65, 0.35, 0.14, 0.1], fish: [0.45, 0.85, 1, 0.9, 0.7, 0.45, 0.2, 0.12], seahorse: [0.6, 0.8, 1, 0.8, 0.5, 0.3, 0.2, 0.1],
  }[type] || [0.45, 0.85, 1, 0.9, 0.7, 0.45, 0.2, 0.12];
  const R = L * (type === "sperm" || type === "manatee" || type === "walrus" ? 0.13 : type === "seahorse" ? 0.1 : cet ? 0.1 : type === "tuna" ? 0.12 : 0.08);
  const seg = L / N;
  const bones = [bone(null, L * 0.5, 0, 0)];
  body.add(bones[0]);
  for (let i = 1; i < N; i++) bones.push(bone(bones[i - 1], -seg, 0, 0));
  root.updateMatrixWorld(true);
  const flat = cet ? 0.9 : 1.3;
  const rad = [{ w: R * prof[0] * 0.5 * (cet ? 1 : 0.6), h: R * prof[0] * 0.5 * flat }, ...prof.slice(0, N).map((k) => ({ w: R * k * (cet ? 1 : 0.6), h: R * k * flat }))];
  rad.push({ w: R * prof[N] * 0.6, h: R * prof[N] * 0.6 });
  const mainMesh = skinnedChain(bones, rad, mats.body, { pre: V(L * 0.5 + R * 0.4, 0, 0), tip: V(-L * 0.5, 0, 0), seg: 18, rings: 4, capLen: 1.4 });
  root.add(mainMesh);
  const finMat = mats.limb;
  const fin = (geo, parent, pos, rot) => { const m = mesh(prep(geo), finMat); m.position.copy(pos); m.rotation.set(...rot); parent.add(m); return m; };
  // Nageoire caudale
  const tailB = bones[N - 1];
  if (cet && !pinn) {
    for (const sd of [-1, 1]) fin(new THREE.ConeGeometry(R * 0.35, R * 1.6, 3).scale(1, 1, 0.15), tailB, V(-seg * 0.9, 0, sd * R * 0.7), [Math.PI / 2 * sd, 0, 0.6 * sd * 0]);
  } else if (pinn) {
    for (const sd of [-1, 1]) fin(new THREE.ConeGeometry(R * 0.3, R * 1.2, 3).scale(1, 0.15, 1).rotateZ(Math.PI / 2), tailB, V(-seg * 0.8, 0, sd * R * 0.35), [0, sd * 0.3, 0]);
  } else {
    for (const sd of [-1, 1]) fin(new THREE.ConeGeometry(R * 0.35, R * (type === "tuna" || type === "sword" || type === "sail" ? 2.4 : 1.6), 3).scale(1, 1, 0.12), tailB, V(-seg * 0.9, sd * R * 0.7, 0), [0, 0, sd > 0 ? -0.9 : Math.PI + 0.9]);
  }
  // Dorsale
  if (type === "orca") fin(new THREE.ConeGeometry(R * 0.35, R * 2.4, 3).scale(1, 1, 0.12), bones[2], V(0, R * 1.6, 0), [0, 0, 0]);
  else if (type === "dolphin" || type === "shark" || type === "tuna" || type === "fish" || type === "sword") fin(new THREE.ConeGeometry(R * 0.4, R * 1.1, 3).scale(1, 1, 0.12), bones[2], V(-seg * 0.2, R * 1.2, 0), [0, 0, 0.5]);
  else if (type === "sail") fin(new THREE.CircleGeometry(R * 2.8, 12, 0, Math.PI).scale(1.4, 1, 1), bones[2], V(0, R * 0.8, 0), [0, 0, 0]);
  else if (type === "whale" || type === "sperm") fin(new THREE.ConeGeometry(R * 0.2, R * 0.35, 3), bones[4], V(0, R * 0.7, 0), [0, 0, 0.5]);
  // Pectorales / nageoires avant
  const pecs = [];
  for (const sd of [-1, 1]) {
    const len = look.flippers === "long" ? R * 4 : pinn ? R * 1.3 : R * 1.1;
    const p = fin(new THREE.ConeGeometry(R * 0.3, len, 4).translate(0, -len / 2, 0).scale(1, 1, 0.2), bones[1], V(-seg * 0.1, -R * 0.4, sd * R * 0.8), [sd * 0.9, 0, 0.5]);
    pecs.push({ p, sd });
  }
  // Rostre / tête
  const headB = bones[0];
  if (type === "sword" || type === "sail") fin(new THREE.ConeGeometry(R * 0.12, L * 0.35, 6).rotateZ(-Math.PI / 2), headB, V(R * 0.5 + L * 0.17, 0, 0), [0, 0, 0]);
  if (type === "dolphin") fin(new THREE.CylinderGeometry(R * 0.18, R * 0.3, R * 1.2, 8).rotateZ(-Math.PI / 2), headB, V(R * 1.0, -R * 0.3, 0), [0, 0, 0]);
  if (type === "walrus" || look.tusks) for (const sd of [-1, 1]) { const t = mesh(prep(new THREE.ConeGeometry(R * 0.08, R * 1.6, 6).translate(0, -R * 0.8, 0)), new THREE.MeshStandardMaterial({ color: 0xeee6d0, roughness: 0.4 })); t.position.set(R * 0.7, -R * 0.3, sd * R * 0.2); headB.add(t); }
  for (const sd of [-1, 1]) { const e = mesh(prep(new THREE.SphereGeometry(R * 0.08, 8, 6)), DARK, false); e.position.set(R * (pinn ? 0.6 : 0.2), R * 0.25, sd * R * (pinn ? 0.45 : 0.6)); headB.add(e); }
  if (look.pat === "orca") { const pm = mesh(prep(ellipsoid(R * 0.4, R * 0.18, R * 0.05, 8)), new THREE.MeshStandardMaterial({ color: 0xf8f8f8, roughness: 0.4 }), false); for (const sd of [-1, 1]) { const c = pm.clone(); c.position.set(-R * 0.1, R * 0.35, sd * R * 0.66); headB.add(c); } }
  const eye = new THREE.Object3D();
  eye.position.set(R * 1.0, R * 0.4, 0);
  headB.add(eye);
  const st = { phase: 0, t: 0 };
  const seahorse = type === "seahorse";
  if (seahorse) body.rotation.z = Math.PI / 2.4;
  function update(dt, s) {
    const v = s.v, vr = clamp(v / Math.max(s.vmax, 0.1), 0, 1.2);
    const f = s.f > 0 ? s.f : 0.4;
    st.phase = fract(st.phase + f * dt);
    st.t += dt;
    const inWater = s.mode === "swim";
    const A = (0.12 + 0.25 * vr) * (inWater ? 1 : 0.6);
    bones.forEach((b, i) => {
      const a = Math.sin(st.phase * TAU - i * 0.7) * A * (i / N);
      if (cet || !inWater) { b.rotation.z = a; b.rotation.y = 0; } else { b.rotation.y = a; b.rotation.z = 0; }
    });
    pecs.forEach((p) => (p.p.rotation.x = p.sd * (pinn && !inWater ? 1.3 + Math.sin(st.phase * TAU) * 0.4 : 0.9 + Math.sin(st.phase * TAU) * 0.15)));
    if (inWater) {
      // à fleur d'eau, avec bonds (marsouinage) pour les cétacés rapides
      const jump = cet && !pinn && v > 6 ? Math.max(0, Math.sin(st.t * 1.4)) * R * 3 : 0;
      body.position.y = -R * (cet ? 0.45 : 0.8) + jump + Math.sin(st.t * 2) * R * 0.05;
      body.rotation.z = (seahorse ? Math.PI / 2.4 : 0) + (jump ? Math.cos(st.t * 1.4) * 0.3 : 0);
    } else {
      body.position.y = R * 0.9 * (pinn ? 1 : 0.6);
      body.rotation.z = pinn ? Math.sin(st.phase * TAU) * 0.05 : 0;
    }
  }
  return { root, update, eye, head: headB, dims: { height: R * 2, length: L, width: R * 2, hip: R, water: true } };
}

// ───────────────────────────── Insectes, araignées, crustacés ─────────────────────────────
function buildInsect(sp, look, mats) {
  const L = parseFloat(look.L) || 0.02;
  const type = look.body || "ant";
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const shell = new THREE.MeshStandardMaterial({ color: mats.colors.c1, roughness: 0.35, metalness: 0.15 });
  const dark = new THREE.MeshStandardMaterial({ color: mats.colors.c2, roughness: 0.4, metalness: 0.1 });
  const legMat = new THREE.MeshStandardMaterial({ color: mats.colors.c2.clone().multiplyScalar(0.7), roughness: 0.5 });
  const bodyY = L * (type === "crab" ? 0.25 : type === "spider" ? 0.18 : 0.12);
  const add = (geo, m, x, y, z, rot) => { const o = mesh(prep(geo), m); o.position.set(x, y, z); if (rot) o.rotation.set(...rot); body.add(o); return o; };
  let headX = L * 0.4;
  switch (type) {
    case "ant":
      add(ellipsoid(L * 0.12, L * 0.1, L * 0.1), dark, L * 0.38, bodyY + L * 0.02, 0);
      add(ellipsoid(L * 0.16, L * 0.07, L * 0.07), shell, L * 0.15, bodyY, 0);
      add(ellipsoid(L * 0.05, L * 0.05, L * 0.04), shell, -L * 0.02, bodyY, 0);
      add(ellipsoid(L * 0.2, L * 0.14, L * 0.14), dark, -L * 0.25, bodyY + L * 0.02, 0);
      break;
    case "beetle": case "stag": case "ladybug":
      add(ellipsoid(L * 0.1, L * 0.08, L * 0.12), dark, L * 0.36, bodyY, 0);
      add(new THREE.SphereGeometry(1, 18, 10, 0, TAU, 0, Math.PI / 2).scale(L * 0.38, L * (type === "ladybug" ? 0.3 : 0.2), L * (type === "ladybug" ? 0.36 : 0.26)), shell, -L * 0.03, bodyY - L * 0.02, 0);
      if (type === "stag") for (const sd of [-1, 1]) add(new THREE.ConeGeometry(L * 0.03, L * 0.35, 5).rotateZ(-Math.PI / 2), dark, L * 0.6, bodyY + L * 0.03, sd * L * 0.08, [0, sd * 0.4, 0]);
      if (type === "ladybug") for (let i = 0; i < 7; i++) add(new THREE.SphereGeometry(L * 0.06, 8, 6), dark, -L * 0.2 + (i % 3) * L * 0.15, bodyY + L * 0.2, (i % 2 ? 1 : -1) * L * (0.1 + (i % 3) * 0.04));
      break;
    case "roach":
      add(ellipsoid(L * 0.5, L * 0.08, L * 0.24), shell, -L * 0.05, bodyY, 0);
      add(ellipsoid(L * 0.1, L * 0.05, L * 0.16), dark, L * 0.4, bodyY + L * 0.01, 0);
      break;
    case "locust": case "cricket": case "mantis":
      add(ellipsoid(L * 0.45, L * 0.08, L * 0.08), shell, -L * 0.1, bodyY + L * 0.03, 0);
      add(ellipsoid(L * 0.1, L * 0.1, L * 0.08), shell, L * 0.4, bodyY + L * 0.05, 0);
      if (type === "mantis") add(new THREE.CylinderGeometry(L * 0.03, L * 0.03, L * 0.3).rotateZ(1.2), shell, L * 0.25, bodyY + L * 0.12, 0);
      break;
    case "bee": case "fly":
      add(ellipsoid(L * 0.1, L * 0.1, L * 0.1), dark, L * 0.36, bodyY + L * 0.05, 0);
      add(ellipsoid(L * 0.16, L * 0.15, L * 0.15), shell, L * 0.12, bodyY + L * 0.05, 0);
      add(ellipsoid(L * 0.26, L * 0.18, L * 0.18), shell, -L * 0.25, bodyY + L * 0.03, 0);
      break;
    case "dragonfly":
      add(ellipsoid(L * 0.08, L * 0.08, L * 0.1), shell, L * 0.4, bodyY + L * 0.05, 0);
      add(ellipsoid(L * 0.12, L * 0.08, L * 0.08), dark, L * 0.25, bodyY + L * 0.05, 0);
      add(new THREE.CylinderGeometry(L * 0.025, L * 0.03, L * 0.6, 6).rotateZ(Math.PI / 2), shell, -L * 0.18, bodyY + L * 0.05, 0);
      break;
    case "butterfly": case "moth":
      add(ellipsoid(L * 0.25, L * 0.06, L * 0.06), dark, 0, bodyY + L * 0.05, 0);
      break;
    case "spider":
      add(ellipsoid(L * 0.18, L * 0.12, L * 0.16), dark, L * 0.15, bodyY, 0);
      add(ellipsoid(L * 0.26, L * 0.2, L * 0.22), shell, -L * 0.22, bodyY + L * 0.04, 0);
      headX = L * 0.3;
      break;
    case "crab":
      add(ellipsoid(L * 0.35, L * 0.18, L * 0.45), shell, 0, bodyY, 0);
      for (const sd of [-1, 1]) add(new THREE.CylinderGeometry(L * 0.02, L * 0.02, L * 0.25), dark, L * 0.25, bodyY + L * 0.2, sd * L * 0.15);
      break;
    case "centipede": case "millipede":
      for (let i = 0; i < 12; i++) add(ellipsoid(L * 0.05, L * 0.04, L * 0.06), i % 2 ? shell : dark, L * 0.45 - i * L * 0.08, bodyY, 0);
      break;
  }
  // Pattes
  const nLegs = type === "centipede" || type === "millipede" ? 24 : sp.legs8 || type === "spider" || type === "crab" ? 8 : 6;
  const legLen = L * (parseFloat(look.legs) || 1) * (type === "spider" ? 0.8 : type === "crab" ? 0.6 : type === "centipede" ? 0.35 : type === "millipede" ? 0.1 : 0.45);
  const legs = [];
  for (let i = 0; i < nLegs; i++) {
    const side = i % 2 ? 1 : -1;
    const k = Math.floor(i / 2);
    const nPairs = nLegs / 2;
    const x = type === "centipede" || type === "millipede" ? L * 0.4 - (k / nPairs) * L * 0.85 : type === "spider" ? L * 0.2 - k * L * 0.06 : L * 0.25 - k * L * 0.12;
    const pivot = new THREE.Object3D();
    pivot.position.set(x, bodyY, side * L * (type === "crab" ? 0.3 : 0.06));
    pivot.rotation.order = "YXZ";
    body.add(pivot);
    const up = mesh(prep(new THREE.CylinderGeometry(L * 0.012, L * 0.01, legLen * 0.5, 5).translate(0, legLen * 0.25, 0).rotateX(side * Math.PI / 2)), legMat);
    pivot.add(up);
    const knee = new THREE.Object3D();
    knee.position.set(0, 0, side * legLen * 0.5);
    pivot.add(knee);
    const lo = mesh(prep(new THREE.CylinderGeometry(L * 0.01, L * 0.006, legLen * 0.6, 5).translate(0, -legLen * 0.3, 0)), legMat);
    knee.add(lo);
    pivot.rotation.x = side * -0.5;
    pivot.rotation.y = (k - (nPairs - 1) / 2) * -0.35 * side * (type === "centipede" || type === "millipede" ? 0.2 : 1);
    knee.rotation.x = side * 0.5;
    legs.push({ pivot, knee, side, k, baseY: pivot.rotation.y, group: (k + (side > 0 ? 1 : 0)) % 2 });
  }
  // Antennes et ailes
  if (type !== "spider" && type !== "crab" && type !== "snail") {
    for (const sd of [-1, 1]) add(new THREE.CylinderGeometry(L * 0.006, L * 0.004, L * 0.4).translate(0, L * 0.2, 0), legMat, headX + L * 0.05, bodyY + L * 0.08, sd * L * 0.04, [sd * 0.5, 0, -0.9]);
  }
  const wings = [];
  if (sp.fly) {
    const wm = new THREE.MeshStandardMaterial({ color: type === "butterfly" || type === "moth" ? mats.colors.c1 : 0xdde8f0, roughness: 0.3, transparent: true, opacity: type === "butterfly" || type === "moth" ? 1 : 0.45, side: THREE.DoubleSide, depthWrite: false });
    const nw = type === "dragonfly" ? 2 : 1;
    for (let j = 0; j < nw; j++) for (const sd of [-1, 1]) {
      const piv = new THREE.Object3D();
      piv.position.set(L * (0.1 - j * 0.12), bodyY + L * 0.12, 0);
      body.add(piv);
      const ws = type === "butterfly" || type === "moth" ? L * 0.9 : type === "dragonfly" ? L * 0.6 : L * 0.45;
      const w = mesh(prep(ellipsoid(ws * 0.35, 0.0001 + L * 0.003, ws * 0.5, 10).translate(-ws * 0.1, 0, sd * ws * 0.5)), wm, false);
      piv.add(w);
      wings.push({ piv, sd });
    }
  }
  const eye = new THREE.Object3D();
  eye.position.set(headX + L * 0.1, bodyY + L * 0.12, 0);
  body.add(eye);
  const st = { phase: 0, alt: 0 };
  function update(dt, s) {
    const v = s.v;
    const flying = s.mode === "fly" && (s.started || v > 0.01);
    st.phase = fract(st.phase + (s.f || 0) * dt);
    const ph = st.phase;
    const target = flying ? Math.max(0.6, L * 30) : 0;
    st.alt += (target - st.alt) * (1 - Math.exp(-dt * 2));
    body.position.y = st.alt;
    const moving = v > 0.001 && !flying;
    legs.forEach((lg) => {
      const lp = fract(ph + lg.group * 0.5 + lg.k * (nLegs > 8 ? 0.08 : 0));
      const sw = lp < 0.5 ? (0.5 - lp * 2) : (-0.5 + (lp - 0.5) * 2);
      const lift = lp >= 0.5 ? Math.sin(Math.PI * (lp - 0.5) * 2) : 0;
      lg.pivot.rotation.y = lg.baseY + (moving ? sw * 0.5 * lg.side : 0);
      lg.pivot.rotation.x = lg.side * (-0.5 - (moving ? lift * 0.3 : 0)) + (flying ? lg.side * 0.6 : 0);
    });
    wings.forEach((w) => {
      w.piv.rotation.x = flying ? -w.sd * Math.sin(ph * TAU * 1.0) * 0.9 : -w.sd * -0.05;
      w.piv.rotation.y = flying ? 0 : w.sd * 1.2;
    });
    if (sp.gait === "jump" && moving) body.position.y = Math.max(0, Math.sin(ph * TAU)) * L * 1.5;
  }
  return { root, update, eye, head: body, dims: { height: bodyY + L * 0.2, length: L, width: legLen * 2, hip: bodyY, tiny: true } };
}

// ───────────────────────────── Escargot / limace ─────────────────────────────
function buildSnail(sp, look, mats) {
  const L = parseFloat(look.L) || 0.05;
  const slug = look.body === "slug";
  const root = new THREE.Group();
  const body = new THREE.Object3D();
  root.add(body);
  const foot = mesh(prep(ellipsoid(L * 0.55, L * 0.12, L * 0.18, 16)), mats.body);
  foot.position.set(0, L * 0.1, 0);
  body.add(foot);
  const headM = mesh(prep(ellipsoid(L * 0.15, L * 0.14, L * 0.12, 10)), mats.body);
  headM.position.set(L * 0.5, L * 0.18, 0);
  body.add(headM);
  for (const sd of [-1, 1]) {
    const t = mesh(prep(new THREE.CylinderGeometry(L * 0.015, L * 0.02, L * 0.25).translate(0, L * 0.12, 0)), mats.body);
    t.position.set(L * 0.55, L * 0.25, sd * L * 0.05);
    t.rotation.set(sd * 0.3, 0, -0.5);
    body.add(t);
  }
  if (!slug) {
    const shellM = new THREE.MeshStandardMaterial({ color: mats.colors.c2, roughness: 0.5 });
    const shell = new THREE.Group();
    for (let i = 0; i < 26; i++) {
      const t = i / 26;
      const a = t * TAU * 2.6;
      const r = L * 0.3 * (1 - t * 0.85);
      const s2 = mesh(prep(new THREE.SphereGeometry(L * 0.17 * (1 - t * 0.8), 10, 8)), shellM);
      s2.position.set(Math.cos(a) * r, Math.sin(a) * r, t * L * 0.08);
      shell.add(s2);
    }
    shell.position.set(-L * 0.05, L * 0.5, 0);
    body.add(shell);
  }
  const eye = new THREE.Object3D();
  eye.position.set(L * 0.6, L * 0.35, 0);
  body.add(eye);
  let t = 0;
  function update(dt, s) {
    t += dt * (0.5 + s.v * 50);
    foot.scale.x = 1 + Math.sin(t * 3) * 0.04 * (s.v > 0 ? 1 : 0);
  }
  return { root, update, eye, head: body, dims: { height: L * 0.8, length: L, width: L * 0.4, hip: L * 0.1, tiny: true } };
}

// ───────────────────────────── Fabrique ─────────────────────────────
export function buildCreature(sp, opts = {}) {
  const look = parseLook(sp.look);
  const kind = sp.cat === "reptiles" ? "scale" : sp.plan === "human" && sp.fam === "humain" ? "skin"
    : sp.plan === "bird" || sp.plan === "bird2" ? "feather" : sp.plan === "insect" ? "chitin" : sp.plan === "swim" ? "smooth" : "fur";
  if (sp.plan === "human" && !look.c) look.c = "#c89a78";
  const mats = makeSkin(look, kind);
  let c;
  switch (sp.plan) {
    case "human": c = buildHuman(sp, look, mats); break;
    case "bird2": c = buildRatite(sp, look, mats); break;
    case "bird": c = buildFlyer(sp, look, mats); break;
    case "hop": c = buildHopper(sp, look, mats); break;
    case "reptile": case "croc": case "turtle": c = buildReptile(sp, look, mats); break;
    case "snake": c = buildSnake(sp, look, mats); break;
    case "swim": case "pinniped": c = buildSwimmer(sp, look, mats); break;
    case "insect": c = buildInsect(sp, look, mats); break;
    case "snail": c = buildSnail(sp, look, mats); break;
    default: c = buildQuad(sp, look, mats);
  }
  c.root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  c.mats = mats;
  c.look = look;
  return c;
}
