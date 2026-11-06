// Pièces anatomiques rigides : têtes, oreilles, cornes, bois, crinières, becs…
// Toutes les têtes sont orientées vers +X, origine à l'articulation avec le cou.
import * as THREE from "three";
import { prep, ellipsoid, tubeGeometry, colorTint } from "./rig.js";

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const DARK = new THREE.MeshStandardMaterial({ color: 0x0a0807, roughness: 0.25, metalness: 0.0 });
const NOSE = new THREE.MeshStandardMaterial({ color: 0x1e1614, roughness: 0.45 });
const HORN = new THREE.MeshStandardMaterial({ color: 0x3a3028, roughness: 0.5 });
const HORN_L = new THREE.MeshStandardMaterial({ color: 0xcfc4ae, roughness: 0.45 });
const IVORY = new THREE.MeshStandardMaterial({ color: 0xeee6d0, roughness: 0.35 });
const BEAK_Y = new THREE.MeshStandardMaterial({ color: 0xe8b030, roughness: 0.4 });
const BEAK_D = new THREE.MeshStandardMaterial({ color: 0x2a2624, roughness: 0.4 });
const BEAK_P = new THREE.MeshStandardMaterial({ color: 0xe88a4a, roughness: 0.4 });

function mesh(geo, mat, cast = true) {
  if (!geo.attributes.tint) prep(geo);
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = true;
  return m;
}

// Profils de tête : crâne (rx,ry,rz), museau (longueur, rayon base, rayon bout, chute), position des yeux.
const HEAD_TYPES = {
  cat:      { cr: [0.36, 0.34, 0.36], mz: [0.32, 0.24, 0.17], drop: 0.12, eye: [0.38, 0.12, 0.2], nose: 0.06 },
  dog:      { cr: [0.34, 0.3, 0.3], mz: [0.55, 0.2, 0.12], drop: 0.08, eye: [0.32, 0.12, 0.18], nose: 0.07 },
  greyhound:{ cr: [0.3, 0.24, 0.24], mz: [0.72, 0.15, 0.07], drop: 0.06, eye: [0.28, 0.1, 0.15], nose: 0.05 },
  hyena:    { cr: [0.36, 0.33, 0.33], mz: [0.5, 0.24, 0.15], drop: 0.12, eye: [0.32, 0.13, 0.18], nose: 0.07 },
  fox:      { cr: [0.32, 0.28, 0.3], mz: [0.58, 0.17, 0.07], drop: 0.06, eye: [0.3, 0.11, 0.17], nose: 0.05 },
  otter:    { cr: [0.34, 0.26, 0.32], mz: [0.32, 0.2, 0.14], drop: 0.05, eye: [0.3, 0.12, 0.2], nose: 0.06 },
  badger:   { cr: [0.34, 0.26, 0.32], mz: [0.5, 0.18, 0.08], drop: 0.12, eye: [0.32, 0.1, 0.18], nose: 0.06 },
  bear:     { cr: [0.38, 0.34, 0.38], mz: [0.42, 0.24, 0.16], drop: 0.06, eye: [0.32, 0.14, 0.2], nose: 0.08 },
  polar:    { cr: [0.32, 0.28, 0.3], mz: [0.55, 0.2, 0.14], drop: 0.05, eye: [0.3, 0.12, 0.17], nose: 0.07 },
  horse:    { cr: [0.32, 0.28, 0.26], mz: [0.85, 0.24, 0.17], drop: 0.35, eye: [0.25, 0.14, 0.2], nose: 0.0, nostril: true },
  cow:      { cr: [0.34, 0.3, 0.3], mz: [0.62, 0.26, 0.24], drop: 0.35, eye: [0.25, 0.16, 0.25], nose: 0.0, muzzle: true },
  bison:    { cr: [0.42, 0.4, 0.38], mz: [0.5, 0.28, 0.24], drop: 0.5, eye: [0.25, 0.14, 0.28], nose: 0.0, muzzle: true },
  deer:     { cr: [0.3, 0.27, 0.26], mz: [0.62, 0.19, 0.11], drop: 0.28, eye: [0.27, 0.13, 0.19], nose: 0.06 },
  gnu:      { cr: [0.32, 0.3, 0.28], mz: [0.75, 0.24, 0.22], drop: 0.45, eye: [0.25, 0.14, 0.22], nose: 0.0, muzzle: true },
  saiga:    { cr: [0.32, 0.28, 0.28], mz: [0.48, 0.22, 0.2], drop: 0.3, eye: [0.27, 0.13, 0.2], nose: 0.0, muzzle: true },
  moose:    { cr: [0.34, 0.3, 0.28], mz: [0.85, 0.26, 0.24], drop: 0.35, eye: [0.25, 0.14, 0.22], nose: 0.0, muzzle: true },
  sheep:    { cr: [0.32, 0.3, 0.28], mz: [0.5, 0.2, 0.15], drop: 0.35, eye: [0.27, 0.13, 0.2], nose: 0.05 },
  pig:      { cr: [0.36, 0.3, 0.32], mz: [0.5, 0.2, 0.17], drop: 0.12, eye: [0.3, 0.14, 0.2], nose: 0.0, disc: true },
  warthog:  { cr: [0.4, 0.3, 0.36], mz: [0.55, 0.24, 0.2], drop: 0.15, eye: [0.32, 0.18, 0.22], nose: 0.0, disc: true },
  ape:      { cr: [0.4, 0.42, 0.4], mz: [0.18, 0.28, 0.24], drop: 0.2, eye: [0.42, 0.14, 0.15], nose: 0.0, flatface: true },
  monkey:   { cr: [0.38, 0.38, 0.36], mz: [0.22, 0.2, 0.15], drop: 0.15, eye: [0.38, 0.12, 0.14], nose: 0.03 },
  baboon:   { cr: [0.34, 0.32, 0.32], mz: [0.58, 0.2, 0.16], drop: 0.15, eye: [0.32, 0.15, 0.15], nose: 0.06 },
  mandrill: { cr: [0.34, 0.32, 0.32], mz: [0.58, 0.22, 0.17], drop: 0.15, eye: [0.32, 0.15, 0.15], nose: 0.06, red: true },
  lemur:    { cr: [0.34, 0.3, 0.32], mz: [0.4, 0.16, 0.08], drop: 0.08, eye: [0.3, 0.12, 0.17], nose: 0.05 },
  rodent:   { cr: [0.38, 0.32, 0.34], mz: [0.35, 0.2, 0.1], drop: 0.1, eye: [0.32, 0.12, 0.2], nose: 0.05 },
  rabbit:   { cr: [0.38, 0.34, 0.32], mz: [0.32, 0.22, 0.15], drop: 0.15, eye: [0.3, 0.14, 0.22], nose: 0.05 },
  hedgehog: { cr: [0.36, 0.28, 0.3], mz: [0.5, 0.17, 0.06], drop: 0.15, eye: [0.32, 0.1, 0.16], nose: 0.06 },
  mole:     { cr: [0.34, 0.26, 0.3], mz: [0.6, 0.16, 0.06], drop: 0.05, eye: [0.4, 0.05, 0.1], nose: 0.07 },
  armadillo:{ cr: [0.3, 0.26, 0.26], mz: [0.6, 0.14, 0.06], drop: 0.15, eye: [0.28, 0.09, 0.15], nose: 0.05 },
  capybara: { cr: [0.36, 0.38, 0.32], mz: [0.55, 0.32, 0.28], drop: 0.12, eye: [0.25, 0.22, 0.2], nose: 0.0, muzzle: true },
  koala:    { cr: [0.42, 0.4, 0.42], mz: [0.15, 0.22, 0.2], drop: 0.1, eye: [0.4, 0.12, 0.17], nose: 0.13 },
  wombat:   { cr: [0.42, 0.36, 0.42], mz: [0.2, 0.26, 0.24], drop: 0.1, eye: [0.35, 0.12, 0.2], nose: 0.12 },
  elephant: { cr: [0.5, 0.55, 0.46], mz: [0.3, 0.3, 0.25], drop: 0.5, eye: [0.25, 0.1, 0.36], nose: 0.0, trunk: true },
  elephantasia: { cr: [0.5, 0.6, 0.44], mz: [0.3, 0.28, 0.24], drop: 0.5, eye: [0.25, 0.1, 0.34], nose: 0.0, trunk: true, dome: true },
  rhino:    { cr: [0.34, 0.3, 0.3], mz: [0.85, 0.26, 0.22], drop: 0.3, eye: [0.2, 0.08, 0.24], nose: 0.0, muzzle: true },
  rhinowide:{ cr: [0.34, 0.3, 0.32], mz: [0.95, 0.28, 0.28], drop: 0.45, eye: [0.2, 0.08, 0.26], nose: 0.0, muzzle: true },
  hippo:    { cr: [0.38, 0.32, 0.36], mz: [0.7, 0.36, 0.36], drop: 0.1, eye: [0.25, 0.3, 0.24], nose: 0.0, muzzle: true, hippo: true },
  tapir:    { cr: [0.34, 0.3, 0.3], mz: [0.6, 0.2, 0.12], drop: 0.15, eye: [0.27, 0.14, 0.2], nose: 0.06, proboscis: true },
  giraffe:  { cr: [0.32, 0.28, 0.26], mz: [0.85, 0.2, 0.15], drop: 0.3, eye: [0.27, 0.16, 0.2], nose: 0.0, muzzle: true },
  camel:    { cr: [0.32, 0.27, 0.27], mz: [0.65, 0.2, 0.17], drop: 0.12, eye: [0.27, 0.16, 0.2], nose: 0.0, muzzle: true },
  lizard:   { cr: [0.34, 0.22, 0.3], mz: [0.45, 0.16, 0.08], drop: 0.02, eye: [0.3, 0.1, 0.18], nose: 0.0, flat: true },
  iguana:   { cr: [0.34, 0.26, 0.28], mz: [0.42, 0.2, 0.12], drop: 0.05, eye: [0.3, 0.12, 0.18], nose: 0.0, flat: true, dewlap: true },
  monitor:  { cr: [0.32, 0.2, 0.26], mz: [0.65, 0.16, 0.08], drop: 0.02, eye: [0.28, 0.1, 0.16], nose: 0.0, flat: true, tongue: true },
  croc:     { cr: [0.3, 0.16, 0.3], mz: [1.05, 0.21, 0.13], drop: 0.0, eye: [0.28, 0.17, 0.12], nose: 0.0, flat: true, teeth: true },
  gator:    { cr: [0.3, 0.16, 0.32], mz: [1.15, 0.15, 0.13], drop: 0.0, eye: [0.28, 0.17, 0.12], nose: 0.0, flat: true, teeth: true },
  gharial:  { cr: [0.28, 0.16, 0.26], mz: [1.6, 0.08, 0.05], drop: 0.0, eye: [0.25, 0.16, 0.12], nose: 0.0, flat: true, teeth: true },
  bearded:  { cr: [0.36, 0.24, 0.34], mz: [0.3, 0.2, 0.12], drop: 0.02, eye: [0.3, 0.12, 0.2], nose: 0.0, flat: true, frillS: true },
  frill:    { cr: [0.34, 0.24, 0.3], mz: [0.35, 0.16, 0.1], drop: 0.02, eye: [0.3, 0.1, 0.18], nose: 0.0, flat: true, frill: true },
  gecko:    { cr: [0.38, 0.24, 0.36], mz: [0.3, 0.2, 0.15], drop: 0.02, eye: [0.25, 0.14, 0.24], nose: 0.0, flat: true, bigeye: true },
  chameleon:{ cr: [0.4, 0.34, 0.26], mz: [0.25, 0.16, 0.1], drop: 0.05, eye: [0.25, 0.08, 0.22], nose: 0.0, casque: true, bigeye: true },
  gila:     { cr: [0.36, 0.24, 0.34], mz: [0.3, 0.2, 0.15], drop: 0.02, eye: [0.28, 0.1, 0.2], nose: 0.0, flat: true },
  turtle:   { cr: [0.36, 0.3, 0.32], mz: [0.3, 0.22, 0.12], drop: 0.08, eye: [0.32, 0.12, 0.2], nose: 0.0, beakT: true },
  snake:    { cr: [0.38, 0.2, 0.3], mz: [0.4, 0.15, 0.08], drop: 0.0, eye: [0.32, 0.1, 0.2], nose: 0.0, flat: true, tongue: true },
  viper:    { cr: [0.42, 0.22, 0.4], mz: [0.3, 0.18, 0.1], drop: 0.0, eye: [0.32, 0.12, 0.26], nose: 0.0, flat: true },
  cobra:    { cr: [0.38, 0.2, 0.3], mz: [0.35, 0.15, 0.08], drop: 0.0, eye: [0.3, 0.1, 0.2], nose: 0.0, flat: true, hood: true },
  python:   { cr: [0.4, 0.22, 0.32], mz: [0.45, 0.18, 0.12], drop: 0.0, eye: [0.32, 0.1, 0.2], nose: 0.0, flat: true },
};

// Becs d'oiseaux : [longueur, rayon base, courbure, matériau]
const BIRD_HEADS = {
  ostrich: { cr: 0.34, beak: [0.55, 0.14, 0.0, "p"], eye: 0.13, flat: true },
  emu: { cr: 0.36, beak: [0.45, 0.12, 0.0, "d"], eye: 0.11 },
  cassowary: { cr: 0.36, beak: [0.5, 0.13, 0.05, "d"], eye: 0.1 },
  roadrunner: { cr: 0.38, beak: [0.7, 0.12, 0.05, "d"], eye: 0.12 },
  turkey: { cr: 0.36, beak: [0.35, 0.12, 0.1, "p"], eye: 0.1, wattle: true },
  chicken: { cr: 0.4, beak: [0.3, 0.12, 0.15, "y"], eye: 0.1, comb: true },
  guineafowl: { cr: 0.38, beak: [0.3, 0.12, 0.1, "y"], eye: 0.1 },
  kiwi: { cr: 0.4, beak: [1.4, 0.06, 0.08, "p"], eye: 0.05 },
  raptor: { cr: 0.4, beak: [0.32, 0.14, 0.5, "d"], eye: 0.12, crest: true },
  falcon: { cr: 0.42, beak: [0.28, 0.15, 0.55, "d"], eye: 0.14 },
  eagle: { cr: 0.4, beak: [0.42, 0.16, 0.6, "y"], eye: 0.12 },
  pigeon: { cr: 0.42, beak: [0.28, 0.07, 0.1, "d"], eye: 0.11 },
  crow: { cr: 0.42, beak: [0.5, 0.12, 0.15, "d"], eye: 0.1 },
  parrot: { cr: 0.44, beak: [0.36, 0.2, 0.9, "d"], eye: 0.11 },
  swift: { cr: 0.45, beak: [0.12, 0.08, 0.1, "d"], eye: 0.14 },
  humming: { cr: 0.45, beak: [1.1, 0.04, 0.05, "d"], eye: 0.14 },
  duck: { cr: 0.4, beak: [0.55, 0.14, 0.0, "y"], eye: 0.1, flatbeak: true },
  goose: { cr: 0.38, beak: [0.5, 0.14, 0.0, "p"], eye: 0.1 },
  swan: { cr: 0.38, beak: [0.55, 0.13, 0.0, "p"], eye: 0.09 },
  gull: { cr: 0.4, beak: [0.48, 0.1, 0.25, "y"], eye: 0.1 },
  owl: { cr: 0.5, beak: [0.15, 0.1, 0.6, "d"], eye: 0.2, facial: true },
  barnowl: { cr: 0.5, beak: [0.15, 0.08, 0.6, "y"], eye: 0.14, facial: true },
  small: { cr: 0.44, beak: [0.25, 0.1, 0.1, "d"], eye: 0.12 },
  heron: { cr: 0.34, beak: [1.0, 0.1, 0.0, "y"], eye: 0.1 },
  stork: { cr: 0.34, beak: [1.0, 0.12, 0.0, "p"], eye: 0.1 },
  flamingo: { cr: 0.38, beak: [0.6, 0.14, -0.9, "d"], eye: 0.09 },
  pelican: { cr: 0.36, beak: [1.4, 0.12, 0.05, "p"], eye: 0.09, pouch: true },
  penguin: { cr: 0.42, beak: [0.45, 0.1, 0.15, "d"], eye: 0.08 },
};

function earMesh(type, s, mat, mats) {
  const g = new THREE.Group();
  let geo;
  switch (type) {
    case "pointed": geo = new THREE.ConeGeometry(0.1 * s, 0.26 * s, 8); geo.scale(1, 1, 0.45); break;
    case "big": geo = new THREE.ConeGeometry(0.15 * s, 0.4 * s, 8); geo.scale(1, 1, 0.35); break;
    case "huge": geo = new THREE.ConeGeometry(0.24 * s, 0.75 * s, 10); geo.scale(1, 1, 0.3); break;
    case "round": geo = ellipsoid(0.1 * s, 0.11 * s, 0.04 * s, 10); break;
    case "small": geo = ellipsoid(0.06 * s, 0.07 * s, 0.03 * s, 8); break;
    case "rose": geo = ellipsoid(0.09 * s, 0.07 * s, 0.03 * s, 8); break;
    case "floppy": geo = ellipsoid(0.08 * s, 0.24 * s, 0.03 * s, 10); geo.translate(0, -0.2 * s, 0); break;
    case "lop": geo = ellipsoid(0.08 * s, 0.32 * s, 0.03 * s, 10); geo.translate(0, -0.28 * s, 0); break;
    case "long": geo = ellipsoid(0.08 * s, 0.38 * s, 0.03 * s, 10); geo.translate(0, 0.3 * s, 0); break;
    case "hare": geo = ellipsoid(0.08 * s, 0.5 * s, 0.03 * s, 10); geo.translate(0, 0.42 * s, 0); break;
    case "side": geo = ellipsoid(0.07 * s, 0.16 * s, 0.03 * s, 8); geo.translate(0, 0.12 * s, 0); break;
    case "banana": geo = ellipsoid(0.05 * s, 0.24 * s, 0.03 * s, 8); geo.translate(0, 0.2 * s, 0); break;
    case "koala": geo = ellipsoid(0.16 * s, 0.16 * s, 0.05 * s, 10); break;
    case "elephant": geo = ellipsoid(0.08 * s, 0.85 * s, 0.75 * s, 12); geo.translate(0, -0.25 * s, 0); break;
    case "elephantr": geo = ellipsoid(0.07 * s, 0.6 * s, 0.5 * s, 12); geo.translate(0, -0.15 * s, 0); break;
    default: return null;
  }
  g.add(mesh(prep(geo), mat));
  return g;
}

// Corne courbe (tube effilé) le long de points (unités de tête).
function horn(pts, r0, r1, s, mat, ringed = false) {
  const P = pts.map((p) => V(p[0] * s, p[1] * s, p[2] * s));
  const n = P.length;
  const rad = P.map((_, i) => {
    const t = i / (n - 1);
    const r = (r0 + (r1 - r0) * t) * s * (ringed && i % 2 ? 1.12 : 1);
    return { w: r, h: r };
  });
  const geo = tubeGeometry(P, rad, { seg: 8, rings: 3, capStart: false, up: V(1, 0, 0) });
  return mesh(geo, mat);
}

const HORN_DEFS = {
  cow: { pts: [[0, 0, 0.1], [0.05, 0.08, 0.25], [0.15, 0.2, 0.32]], r: [0.06, 0.015], m: HORN_L },
  small: { pts: [[0, 0, 0.1], [0.02, 0.06, 0.18], [0.06, 0.12, 0.22]], r: [0.05, 0.015], m: HORN_L },
  short: { pts: [[0, 0, 0.12], [0.06, 0.04, 0.22], [0.12, 0.1, 0.24]], r: [0.06, 0.02], m: HORN_L },
  wide: { pts: [[0, 0, 0.12], [0.0, 0.05, 0.4], [0.1, 0.2, 0.62], [0.2, 0.32, 0.66]], r: [0.07, 0.015], m: HORN_L },
  huge: { pts: [[0, 0, 0.12], [-0.05, 0.25, 0.45], [-0.05, 0.6, 0.75], [0.05, 0.9, 0.85]], r: [0.18, 0.03], m: HORN_L },
  forward: { pts: [[0, 0, 0.12], [0.05, 0.08, 0.3], [0.22, 0.18, 0.36], [0.35, 0.22, 0.3]], r: [0.07, 0.015], m: HORN_L },
  bison: { pts: [[0, 0, 0.18], [0.0, 0.05, 0.3], [0.05, 0.18, 0.34]], r: [0.06, 0.015], m: HORN },
  buffalo: { pts: [[0.05, 0.05, 0.02], [0.0, 0.0, 0.25], [-0.05, -0.15, 0.42], [0.05, -0.05, 0.55], [0.15, 0.12, 0.55]], r: [0.11, 0.02], m: HORN },
  sweep: { pts: [[0, 0, 0.12], [-0.1, 0.05, 0.4], [-0.35, 0.1, 0.55], [-0.5, 0.25, 0.5]], r: [0.08, 0.02], m: HORN },
  musk: { pts: [[0.05, 0.05, 0.02], [0, -0.02, 0.22], [0.05, -0.2, 0.35], [0.15, -0.12, 0.42]], r: [0.1, 0.02], m: HORN_L },
  gazelle: { pts: [[0, 0, 0.06], [-0.1, 0.25, 0.08], [-0.15, 0.5, 0.09], [-0.08, 0.68, 0.08]], r: [0.04, 0.012], m: HORN, ringed: true },
  lyre: { pts: [[0, 0, 0.06], [-0.12, 0.3, 0.12], [-0.12, 0.55, 0.06], [-0.02, 0.72, 0.1]], r: [0.045, 0.012], m: HORN, ringed: true },
  impala: { pts: [[0, 0, 0.06], [-0.2, 0.25, 0.2], [-0.25, 0.55, 0.28], [-0.08, 0.85, 0.2]], r: [0.045, 0.012], m: HORN, ringed: true },
  lyreshort: { pts: [[0, 0, 0.06], [-0.1, 0.2, 0.14], [-0.15, 0.32, 0.12]], r: [0.05, 0.015], m: HORN, ringed: true },
  hartebeest: { pts: [[0, 0.15, 0.04], [0.0, 0.3, 0.14], [-0.15, 0.36, 0.18], [-0.25, 0.48, 0.12]], r: [0.05, 0.012], m: HORN, ringed: true },
  gnu: { pts: [[0, 0, 0.1], [0, -0.05, 0.3], [0.05, 0.1, 0.42], [0.0, 0.25, 0.4]], r: [0.06, 0.015], m: HORN },
  gnu2: { pts: [[0.05, 0, 0.1], [0.18, -0.12, 0.22], [0.25, 0.05, 0.28], [0.2, 0.2, 0.26]], r: [0.06, 0.015], m: HORN },
  spiral: { pts: [[0, 0, 0.06], [-0.05, 0.2, 0.15], [-0.1, 0.38, 0.05], [-0.15, 0.55, 0.16], [-0.2, 0.72, 0.06], [-0.25, 0.88, 0.14]], r: [0.04, 0.012], m: HORN, ringed: true },
  oryx: { pts: [[0, 0, 0.06], [-0.3, 0.4, 0.08], [-0.6, 0.8, 0.1], [-0.9, 1.15, 0.12]], r: [0.04, 0.012], m: HORN, ringed: true },
  kudu: { pts: [[0, 0, 0.08], [-0.15, 0.25, 0.3], [-0.05, 0.5, 0.15], [-0.3, 0.75, 0.35], [-0.2, 1.05, 0.2], [-0.35, 1.3, 0.4]], r: [0.06, 0.012], m: HORN },
  eland: { pts: [[0, 0, 0.06], [-0.15, 0.3, 0.1], [-0.3, 0.6, 0.12]], r: [0.06, 0.015], m: HORN, ringed: true },
  saiga: { pts: [[0, 0, 0.06], [-0.05, 0.25, 0.08], [-0.05, 0.4, 0.07]], r: [0.04, 0.012], m: HORN_L, ringed: true },
  hook: { pts: [[0, 0, 0.06], [0, 0.18, 0.08], [-0.06, 0.24, 0.08], [-0.1, 0.18, 0.08]], r: [0.03, 0.01], m: HORN },
  ibex: { pts: [[0, 0, 0.06], [-0.2, 0.3, 0.1], [-0.55, 0.5, 0.14], [-0.9, 0.45, 0.16]], r: [0.08, 0.02], m: HORN, ringed: true },
  curl: { pts: [[0, 0, 0.08], [-0.2, 0.15, 0.2], [-0.3, -0.05, 0.3], [-0.1, -0.25, 0.32], [0.08, -0.1, 0.32]], r: [0.1, 0.03], m: HORN_L, ringed: true },
  goat: { pts: [[0, 0, 0.06], [-0.12, 0.2, 0.1], [-0.3, 0.3, 0.14]], r: [0.04, 0.01], m: HORN },
  tiny: { pts: [[0, 0, 0.05], [-0.03, 0.12, 0.05]], r: [0.03, 0.01], m: HORN },
  sable: { pts: [[0, 0, 0.06], [-0.25, 0.35, 0.08], [-0.6, 0.55, 0.1], [-0.95, 0.5, 0.1]], r: [0.05, 0.012], m: HORN, ringed: true },
  waterbuck: { pts: [[0, 0, 0.06], [-0.2, 0.25, 0.14], [-0.2, 0.55, 0.15], [-0.05, 0.75, 0.12]], r: [0.05, 0.012], m: HORN_L, ringed: true },
  pronghorn: { pts: [[0, 0, 0.06], [-0.02, 0.22, 0.08], [-0.1, 0.32, 0.07]], r: [0.04, 0.012], m: HORN },
  ossicones: { pts: [[0, 0, 0.07], [-0.02, 0.18, 0.07]], r: [0.04, 0.035], m: null },
};

// Bois (cervidés) : merrain + andouillers.
function antlers(type, s, side) {
  const g = new THREE.Group();
  const cfg = {
    red: { len: 1.6, tines: 5, spread: 0.5, palm: false },
    elk: { len: 2.0, tines: 6, spread: 0.55, palm: false },
    whitetail: { len: 1.1, tines: 4, spread: 0.45, fwd: true },
    mule: { len: 1.1, tines: 4, spread: 0.5, fork: true },
    roe: { len: 0.6, tines: 2, spread: 0.15 },
    fallow: { len: 1.2, tines: 3, spread: 0.45, palm: true },
    moose: { len: 1.2, tines: 6, spread: 1.0, palm: true, flat: true },
    caribou: { len: 1.8, tines: 5, spread: 0.5, fwd: true },
    small: { len: 0.35, tines: 0, spread: 0.1 },
  }[type] || { len: 1, tines: 3, spread: 0.4 };
  const L = cfg.len * s;
  const pts = [];
  for (let i = 0; i <= 5; i++) {
    const t = i / 5;
    const x = cfg.flat ? -0.1 * L * t : (-0.35 * Math.sin(t * Math.PI * 0.8) + (cfg.fwd ? 0.35 * t * t : 0.1 * t)) * L;
    const y = (cfg.flat ? 0.25 : 0.95) * L * t;
    const z = (0.06 * s + cfg.spread * L * Math.sin(t * Math.PI * 0.55)) * side;
    pts.push([x / s, y / s, z / s]);
  }
  g.add(horn(pts, 0.045 * Math.max(1, cfg.len * 0.8), 0.018, s, HORN_L));
  if (cfg.palm) {
    const pg = ellipsoid(0.32 * L, 0.06 * L, 0.18 * L, 10);
    const pm = mesh(prep(pg), HORN_L);
    const p = pts[cfg.flat ? 4 : 4];
    pm.position.set(p[0] * s, p[1] * s, p[2] * s);
    pm.rotation.set(side * 0.3, 0, cfg.flat ? 0.15 : 0.9);
    if (cfg.flat) pm.scale.set(1.2, 1, 1.6);
    g.add(pm);
  }
  for (let k = 0; k < cfg.tines; k++) {
    const i = 1 + Math.floor((k / Math.max(1, cfg.tines)) * 4.5);
    const p = pts[Math.min(5, i)];
    const tl = (0.18 + 0.1 * Math.sin(k * 2.1)) * L;
    const dir = cfg.flat ? [0.2, 0.3, side * 0.8] : [0.55 + 0.2 * Math.sin(k), 0.7, side * 0.12];
    const q = [[p[0], p[1], p[2]], [p[0] + dir[0] * tl / s, p[1] + dir[1] * tl / s, p[2] + dir[2] * tl / s]];
    g.add(horn(q, 0.022, 0.008, s, HORN_L));
  }
  return g;
}

// Construit la tête. s = longueur de tête (m). mats = matériaux de peau.
export function makeHead(type, s, mats, look, extra = {}) {
  const g = new THREE.Group();
  const T = HEAD_TYPES[type] || HEAD_TYPES.dog;
  const mat = mats.head;
  const cr = T.cr;
  const crPos = V(cr[0] * s * 0.75, 0, 0);
  const cran = mesh(prep(ellipsoid(cr[0] * s, cr[1] * s, cr[2] * s, 18)), mat);
  cran.position.copy(crPos);
  g.add(cran);
  if (T.dome) { const d = mesh(prep(ellipsoid(cr[0] * s * 0.6, cr[1] * s * 0.5, cr[2] * s * 0.9, 12)), mat); d.position.set(crPos.x - 0.05 * s, cr[1] * s * 0.65, 0); g.add(d); }
  // Museau
  const [mL, mR0, mR1] = T.mz;
  const m0 = V(crPos.x + cr[0] * s * 0.35, -T.drop * s * 0.15, 0);
  const m1 = V(crPos.x + cr[0] * s * 0.35 + mL * s, -T.drop * s, 0);
  const fl = T.flat ? 0.55 : 1;
  const muz = tubeGeometry([m0, m0.clone().lerp(m1, 0.5), m1], [
    { w: mR0 * s * 0.95, h: mR0 * s * fl }, { w: (mR0 + mR1) * 0.5 * s, h: (mR0 + mR1) * 0.5 * s * fl * 0.95 }, { w: mR1 * s, h: mR1 * s * fl },
  ], { seg: 14, rings: 4, capStart: false, capLen: 0.8, up: V(0, 1, 0) });
  const mm = mesh(muz, mat);
  g.add(mm);
  if (T.teeth) {
    const tg = new THREE.BoxGeometry(mL * s * 0.85, 0.012 * s, mR0 * s * 1.6);
    const teeth = mesh(prep(tg), IVORY);
    teeth.position.set((m0.x + m1.x) / 2 + 0.05 * s, -T.drop * s * 0.5 - mR0 * s * 0.12, 0);
    g.add(teeth);
  }
  if (T.nose > 0) {
    const n = mesh(prep(ellipsoid(T.nose * s * 0.8, T.nose * s * 0.7, T.nose * s, 8)), NOSE, false);
    n.position.set(m1.x + mR1 * s * 0.7, m1.y + mR1 * s * 0.3, 0);
    g.add(n);
  }
  if (T.nostril || T.muzzle) {
    const n = mesh(prep(ellipsoid(mR1 * s * 0.55, mR1 * s * 0.75, mR1 * s * 0.95, 10)), T.muzzle ? NOSE : mat, false);
    n.position.set(m1.x + mR1 * s * 0.45, m1.y, 0);
    g.add(n);
    for (const sd of [-1, 1]) {
      const nn = mesh(prep(ellipsoid(0.025 * s, 0.035 * s, 0.02 * s, 6)), DARK, false);
      nn.position.set(m1.x + mR1 * s * 0.9, m1.y + mR1 * s * 0.2, sd * mR1 * s * 0.45);
      g.add(nn);
    }
  }
  if (T.disc) {
    const d = mesh(prep(new THREE.CylinderGeometry(mR1 * s, mR1 * s, 0.03 * s, 14).rotateZ(Math.PI / 2)), new THREE.MeshStandardMaterial({ color: 0xd8908a, roughness: 0.5 }), false);
    d.position.set(m1.x + mR1 * s * 0.6, m1.y, 0);
    g.add(d);
  }
  if (T.red) {
    const r = mesh(prep(ellipsoid(mL * s * 0.45, mR0 * s * 0.5, mR0 * s * 0.6, 10)), new THREE.MeshStandardMaterial({ color: 0xd02820, roughness: 0.5 }), false);
    r.position.set((m0.x + m1.x) / 2, (m0.y + m1.y) / 2 + mR0 * s * 0.6, 0);
    g.add(r);
  }
  if (T.proboscis) {
    const p = tubeGeometry([m1, m1.clone().add(V(0.12 * s, -0.08 * s, 0)), m1.clone().add(V(0.2 * s, -0.2 * s, 0))],
      [{ w: mR1 * s, h: mR1 * s }, { w: mR1 * s * 0.8, h: mR1 * s * 0.8 }, { w: mR1 * s * 0.6, h: mR1 * s * 0.6 }], { seg: 10, rings: 3, capStart: false, up: V(0, 1, 0) });
    g.add(mesh(p, mat));
  }
  // Yeux
  const er = (T.bigeye ? 0.09 : 0.05) * s;
  for (const sd of [-1, 1]) {
    const e = mesh(prep(new THREE.SphereGeometry(er, 10, 8)), DARK, false);
    e.position.set(crPos.x + T.eye[0] * s, T.eye[1] * s, sd * T.eye[2] * s);
    g.add(e);
  }
  // Oreilles
  const ears = look.ears;
  if (ears && ears !== "none" && !T.flat) {
    for (const sd of [-1, 1]) {
      const e = earMesh(ears, s, mat);
      if (!e) break;
      const big = ears === "elephant" || ears === "elephantr";
      e.position.set(crPos.x - cr[0] * s * (big ? 0.2 : 0.35), cr[1] * s * (big ? 0.2 : 0.75), sd * cr[2] * s * (big ? 0.95 : 0.6));
      if (ears === "side") e.rotation.set(sd * 1.4, 0, 0);
      else if (ears === "floppy" || ears === "lop") e.rotation.set(sd * 0.25, 0, 0.1);
      else if (big) e.rotation.set(sd * 0.25, sd * 0.3, 0);
      else e.rotation.set(sd * 0.35, 0, -0.15);
      e.userData.ear = sd;
      g.add(e);
      if (look.tufts && !big) {
        const t = mesh(prep(new THREE.ConeGeometry(0.02 * s, 0.14 * s, 5)), DARK, false);
        t.position.set(0, 0.2 * s, 0);
        e.add(t);
      }
    }
  }
  // Cornes
  const hn = look.horns;
  if (hn && hn !== "none" && !hn.startsWith("rhino")) {
    const def = HORN_DEFS[hn];
    if (def) {
      for (const sd of [-1, 1]) {
        const pts = def.pts.map((p) => [p[0], p[1], p[2] * sd]);
        const h = horn(pts, def.r[0], def.r[1], s, def.m || mat, def.ringed);
        h.position.set(crPos.x - cr[0] * s * 0.1, cr[1] * s * 0.8, 0);
        g.add(h);
        if (hn === "ossicones") {
          const knob = mesh(prep(new THREE.SphereGeometry(0.05 * s, 8, 6)), new THREE.MeshStandardMaterial({ color: 0x2a1c14, roughness: 0.8 }));
          knob.position.set(crPos.x - cr[0] * s * 0.1 - 0.02 * s, cr[1] * s * 0.8 + 0.18 * s, sd * 0.07 * s);
          g.add(knob);
        }
      }
    }
  }
  if (hn && hn.startsWith("rhino")) {
    const h1 = mesh(prep(new THREE.ConeGeometry(0.12 * s, 0.55 * s, 10).translate(0, 0.27 * s, 0)), HORN);
    h1.position.set(m1.x - 0.05 * s, m1.y + mR1 * s * 0.8, 0);
    h1.rotation.z = -0.25;
    g.add(h1);
    if (hn === "rhino2") {
      const h2 = mesh(prep(new THREE.ConeGeometry(0.09 * s, 0.28 * s, 10).translate(0, 0.14 * s, 0)), HORN);
      h2.position.set(m1.x - 0.38 * s, m1.y + mR0 * s * 0.9, 0);
      h2.rotation.z = -0.15;
      g.add(h2);
    }
  }
  if (look.antlers) {
    for (const sd of [-1, 1]) {
      const a = antlers(look.antlers, s, sd);
      a.position.set(crPos.x - cr[0] * s * 0.1, cr[1] * s * 0.75, 0);
      g.add(a);
    }
  }
  if (look.tusks || extra.tusks) {
    const tt = look.tusks === true || look.tusks === "true" ? "elephant" : look.tusks;
    for (const sd of [-1, 1]) {
      let pts;
      if (tt === "boar" || tt === "wart") pts = [[0, 0, 0], [0.05, 0.08, 0.04], [0.02, 0.18, 0.08]];
      else if (tt === "babirusa") pts = [[0, 0, 0], [0.0, 0.2, 0.03], [-0.15, 0.35, 0.05]];
      else if (tt === "straight") pts = [[0, 0, 0], [0.3, -0.25, 0.06], [0.55, -0.3, 0.06]];
      else pts = [[0, 0, 0], [0.25, -0.35, 0.05], [0.55, -0.4, 0.12], [0.75, -0.25, 0.1]];
      const sc = tt === "boar" || tt === "wart" || tt === "babirusa" ? 0.55 : 1;
      const tsk = horn(pts.map((p) => [p[0] * sc, p[1] * sc, p[2] * sd]), 0.05 * sc, 0.015, s, IVORY);
      tsk.position.set(m0.x + 0.1 * s, m0.y - 0.06 * s, sd * mR0 * s * 0.7);
      g.add(tsk);
    }
  }
  if (T.hood) {
    const h = mesh(prep(ellipsoid(0.15 * s, 0.4 * s, 0.6 * s, 10)), mat);
    h.position.set(-0.1 * s, 0, 0);
    g.add(h);
  }
  if (T.frill) {
    const f = mesh(prep(new THREE.CylinderGeometry(0.75 * s, 0.75 * s, 0.03 * s, 20, 1, false, 0, Math.PI * 1.2).rotateZ(Math.PI / 2).rotateX(-Math.PI * 0.1)), new THREE.MeshStandardMaterial({ color: 0xc87038, roughness: 0.6, side: THREE.DoubleSide }));
    f.position.set(0.05 * s, 0, 0);
    g.add(f);
  }
  if (T.casque) {
    const c = mesh(prep(new THREE.ConeGeometry(0.2 * s, 0.4 * s, 8).rotateZ(Math.PI * 0.6)), mat);
    c.position.set(0.05 * s, 0.25 * s, 0);
    g.add(c);
  }
  // Points d'ancrage utiles
  g.userData.eye = V(crPos.x + T.eye[0] * s + 0.02 * s, T.eye[1] * s + 0.05 * s, 0);
  g.userData.tip = m1.clone();
  return g;
}

// Tête d'oiseau.
export function makeBirdHead(type, s, mats, look) {
  const g = new THREE.Group();
  const T = BIRD_HEADS[type] || BIRD_HEADS.small;
  const cr = T.cr * s;
  const head = mesh(prep(ellipsoid(cr * 1.1, cr, cr * 0.9, 16)), mats.head);
  head.position.set(cr * 0.8, 0, 0);
  g.add(head);
  const [bl, br, curve, mt] = T.beak;
  const mat = mt === "y" ? BEAK_Y : mt === "p" ? BEAK_P : BEAK_D;
  const b0 = V(cr * 1.6, -cr * 0.1, 0);
  const pts = [b0, b0.clone().add(V(bl * s * 0.5, -curve * bl * s * 0.12, 0)), b0.clone().add(V(bl * s, -curve * bl * s * 0.5, 0))];
  const beak = tubeGeometry(pts, [{ w: br * s * (T.flatbeak ? 1.3 : 1), h: br * s * (T.flatbeak ? 0.5 : 1) }, { w: br * s * 0.7 * (T.flatbeak ? 1.4 : 1), h: br * s * 0.6 * (T.flatbeak ? 0.5 : 1) }, { w: br * s * 0.15, h: br * s * 0.15 }], { seg: 10, rings: 3, capStart: false, up: V(0, 1, 0) });
  g.add(mesh(beak, mat));
  for (const sd of [-1, 1]) {
    const e = mesh(prep(new THREE.SphereGeometry(T.eye * s * 0.6, 10, 8)), DARK, false);
    e.position.set(cr * 1.2, cr * 0.25, sd * cr * (T.facial ? 0.45 : 0.75));
    g.add(e);
  }
  if (T.facial) {
    const f = mesh(prep(ellipsoid(cr * 0.2, cr * 0.95, cr * 0.95, 12)), mats.limb);
    f.position.set(cr * 1.5, 0, 0);
    g.add(f);
  }
  if (T.comb) {
    const c = mesh(prep(ellipsoid(cr * 0.6, cr * 0.4, cr * 0.1, 8)), new THREE.MeshStandardMaterial({ color: 0xd0201c, roughness: 0.6 }));
    c.position.set(cr * 0.9, cr * 1.0, 0);
    g.add(c);
  }
  if (T.wattle) {
    const c = mesh(prep(ellipsoid(cr * 0.2, cr * 0.6, cr * 0.15, 8)), new THREE.MeshStandardMaterial({ color: 0xc02020, roughness: 0.6 }));
    c.position.set(cr * 1.6, -cr * 0.7, 0);
    g.add(c);
  }
  if (T.pouch) {
    const c = mesh(prep(ellipsoid(bl * s * 0.4, br * s * 1.4, br * s * 0.8, 10)), new THREE.MeshStandardMaterial({ color: 0xf0b060, roughness: 0.6 }));
    c.position.set(cr * 1.6 + bl * s * 0.45, -br * s * 1.2, 0);
    g.add(c);
  }
  if (look.casque) {
    const c = mesh(prep(new THREE.ConeGeometry(cr * 0.5, cr * 1.4, 10).rotateZ(0.4)), new THREE.MeshStandardMaterial({ color: 0x8a6a40, roughness: 0.5 }));
    c.position.set(cr * 1.0, cr * 1.1, 0);
    g.add(c);
  }
  if (look.crest || T.crest) {
    for (let i = 0; i < 4; i++) {
      const c = mesh(prep(new THREE.ConeGeometry(cr * 0.08, cr * 1.1, 4)), mats.limb);
      c.position.set(cr * 0.2 - i * cr * 0.15, cr * 0.8, 0);
      c.rotation.z = 0.9 + i * 0.1;
      g.add(c);
    }
  }
  if (look.tufts) {
    for (const sd of [-1, 1]) {
      const c = mesh(prep(new THREE.ConeGeometry(cr * 0.18, cr * 0.8, 5)), mats.limb);
      c.position.set(cr * 0.7, cr * 0.95, sd * cr * 0.5);
      c.rotation.x = sd * 0.3;
      g.add(c);
    }
  }
  g.userData.eye = V(cr * 1.3, cr * 0.4, 0);
  return g;
}

export { mesh, DARK, NOSE, HORN, HORN_L, IVORY };
