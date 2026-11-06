// Mobilier et aménagement : cuisine, salon, chambre, extérieur. Les meubles se placent avec le même
// système que les constructions (aperçu, rotation, collisions, démontage) et beaucoup sont interactifs.
import * as THREE from "three";
import { G } from "./build.js";

const FOOD = new Set(["baies", "noisettes", "viande_crue", "viande_cuite", "legumes"]);

// Pièce de meuble : une boîte décorative (sans collision individuelle)
function bx(c, mat, w, h, d, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.rotation.y = ry;
  m.castShadow = true; m.receiveShadow = true;
  c.group.add(m);
  return m;
}
function cyl(c, mat, r0, r1, h, x, y, z, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, h, seg), mat);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
  c.group.add(m);
  return m;
}
const solid = (c, w, h, d, x = 0, z = 0) => c.boxes.push({ c: [x, h / 2, z], h: [w / 2, h / 2, d / 2] });

// Matériaux supplémentaires (tissus, peinture, électroménager)
function extraMats(M) {
  const S = (o) => new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0, ...o });
  return {
    ...M,
    white: S({ color: 0xeceae4, roughness: 0.35 }), steel: S({ color: 0xb8bcc2, metalness: 0.75, roughness: 0.28 }),
    black: S({ color: 0x18181a, roughness: 0.3 }), screen: S({ color: 0x080a0c, roughness: 0.15, metalness: 0.2 }),
    fabricRed: S({ color: 0x8a2e28, roughness: 0.95 }), fabricGrey: S({ color: 0x6a6e74, roughness: 0.95 }), fabricGreen: S({ color: 0x3e5a3a, roughness: 0.95 }),
    fabricBeige: S({ color: 0xcfc0a0, roughness: 0.95 }), fur: S({ color: 0x6a4a30, roughness: 1 }),
    rugRed: S({ color: 0x8a3a30, roughness: 1 }), rugBlue: S({ color: 0x2e4a6a, roughness: 1 }), rugCream: S({ color: 0xd8ccb0, roughness: 1 }),
    lampOn: new THREE.MeshStandardMaterial({ color: 0xfff0c8, emissive: 0xffd890, emissiveIntensity: 2.2 }),
    lampOff: S({ color: 0xe8dcc0, roughness: 0.6 }),
    soil: S({ color: 0x3a2818, roughness: 1 }), leaf: S({ color: 0x4a7a2a, roughness: 0.9 }), coal: S({ color: 0x2a2220, roughness: 1 }),
    paper: S({ color: 0xd8cca8 }), book1: S({ color: 0x7a2a2a }), book2: S({ color: 0x2a4a6a }), book3: S({ color: 0x3a5a2a }), book4: S({ color: 0x8a6a2a }),
  };
}

// Télévision : écran animé (petit « programme » dessiné sur un canvas)
const tvCanvas = document.createElement("canvas");
tvCanvas.width = 128; tvCanvas.height = 72;
const tvTex = new THREE.CanvasTexture(tvCanvas);
tvTex.colorSpace = THREE.SRGBColorSpace;
const tvMat = new THREE.MeshStandardMaterial({ map: tvTex, emissive: 0xffffff, emissiveMap: tvTex, emissiveIntensity: 1.4, roughness: 0.2 });
function drawTV(t) {
  const g = tvCanvas.getContext("2d");
  const sky = g.createLinearGradient(0, 0, 0, 72);
  sky.addColorStop(0, `hsl(${(t * 20) % 360},60%,55%)`); sky.addColorStop(1, `hsl(${(t * 20 + 60) % 360},50%,30%)`);
  g.fillStyle = sky; g.fillRect(0, 0, 128, 72);
  g.fillStyle = "#2a5a2a"; g.beginPath(); g.moveTo(0, 60);
  for (let x = 0; x <= 128; x += 8) g.lineTo(x, 50 + Math.sin(x * 0.08 + t) * 6);
  g.lineTo(128, 72); g.lineTo(0, 72); g.fill();
  g.fillStyle = "#fff6c0"; g.beginPath(); g.arc(30 + ((t * 15) % 90), 22, 7, 0, 7); g.fill();
  g.fillStyle = "rgba(255,255,255,0.85)"; g.font = "bold 9px sans-serif"; g.fillText("LISIÈRE TV", 4, 10);
  tvTex.needsUpdate = true;
}

export function registerFurniture(build, game) {
  const M = extraMats(build.M);
  const cats = ["Cuisine", "Salon", "Chambre", "Extérieur"];
  build.extraCats = cats;
  const R = Math.PI / 8;
  const F = (o) => ({ furniture: true, free: "surface", snap: [], rotStep: R, ...o });
  const store = (cap, filter, label) => ({
    useLabel: (p) => `${label} (${Object.values(p.state.items || {}).reduce((a, b) => a + b, 0)}/${cap})`,
    use: (p, gm) => gm.openStorage(p, cap, filter),
  });
  const cook = (label) => ({
    useLabel: (p, gm) => (gm.inv.count("viande_crue") ? `${label} : cuire la viande` : label),
    use: (p, gm) => {
      const n = gm.inv.count("viande_crue");
      if (!n) { gm.ui.toast("Tu n'as pas de viande crue à cuire.", true); return; }
      gm.inv.remove("viande_crue", n); gm.give("viande_cuite", n); gm.sounds.ignite();
    },
  });
  const sit = (h) => ({ useLabel: () => "S'asseoir", use: (p, gm) => gm.sitOn(p, h) });
  const light = (offset, range = 10) => ({
    light: { offset, range },
    useLabel: (p) => (p.state.on ? "Éteindre" : "Allumer"),
    use: (p) => { p.state.on = !p.state.on; applyLamp(p); },
    onAdd: (p) => applyLamp(p),
  });
  function applyLamp(p) { p.group.traverse((o) => { if (o.userData.bulb) o.material = p.state.on ? M.lampOn : M.lampOff; }); }

  const D = {
    // ----------------------------------------------------------- Cuisine
    frigo: F({ name: "Réfrigérateur", icon: "🧊", cat: "Cuisine", cost: { pierre: 6, bois: 3 }, desc: "Conserve les aliments : rien ne s'y abîme.",
      make(c) { bx(c, M.white, 0.8, 1.9, 0.7, 0, 0.95, 0); bx(c, M.white, 0.78, 1.15, 0.04, 0, 1.3, 0.37); bx(c, M.white, 0.78, 0.65, 0.04, 0, 0.36, 0.37); bx(c, M.steel, 0.04, 0.5, 0.05, 0.3, 1.2, 0.41); bx(c, M.steel, 0.04, 0.3, 0.05, 0.3, 0.55, 0.41); solid(c, 0.8, 1.9, 0.7); },
      ...store(30, (id) => FOOD.has(id), "Ouvrir le réfrigérateur") }),
    four: F({ name: "Four", icon: "🔥", cat: "Cuisine", cost: { pierre: 6, bois: 2 }, desc: "Cuit toute la viande crue d'un coup.",
      make(c) { bx(c, M.steel, 0.7, 0.9, 0.65, 0, 0.45, 0); bx(c, M.black, 0.56, 0.4, 0.02, 0, 0.45, 0.33); bx(c, M.steel, 0.5, 0.04, 0.04, 0, 0.72, 0.36); for (let i = 0; i < 4; i++) cyl(c, M.black, 0.03, 0.03, 0.05, -0.24 + i * 0.16, 0.83, 0.33, 8).rotation.x = Math.PI / 2; solid(c, 0.7, 0.9, 0.65); },
      ...cook("Four") }),
    plaques: F({ name: "Plan de travail avec plaques", icon: "🍳", cat: "Cuisine", cost: { pierre: 4, bois: 3 }, desc: "Plaques de cuisson : cuit la viande.",
      make(c) { bx(c, M.planks, 1.2, 0.86, 0.6, 0, 0.43, 0); bx(c, M.stone, 1.24, 0.05, 0.64, 0, 0.885, 0); for (const [x, z] of [[-0.3, -0.12], [0.3, -0.12], [-0.3, 0.14], [0.3, 0.14]]) cyl(c, M.black, 0.11, 0.11, 0.02, x, 0.92, z, 16); solid(c, 1.2, 0.9, 0.6); },
      ...cook("Plaques de cuisson") }),
    evier: F({ name: "Évier", icon: "🚰", cat: "Cuisine", cost: { pierre: 4, bois: 2 }, desc: "Eau potable : boire et remplir la gourde.",
      make(c) { bx(c, M.planks, 1.0, 0.86, 0.6, 0, 0.43, 0); bx(c, M.steel, 1.04, 0.05, 0.64, 0, 0.885, 0); bx(c, M.black, 0.5, 0.03, 0.36, 0, 0.9, 0.02); cyl(c, M.steel, 0.02, 0.02, 0.3, 0, 1.05, -0.22, 8); bx(c, M.steel, 0.04, 0.03, 0.2, 0, 1.2, -0.13); solid(c, 1, 0.9, 0.6); },
      useLabel: (p, gm) => "Boire" + (gm.inv.count("gourde") ? " et remplir la gourde" : ""),
      use: (p, gm) => gm.interact({ type: "water" }) }),
    placard: F({ name: "Placard de cuisine", icon: "🗄️", cat: "Cuisine", cost: { bois: 4 }, desc: "Range 20 objets.",
      make(c) { bx(c, M.planks, 1.0, 0.86, 0.6, 0, 0.43, 0); bx(c, M.wood, 1.0, 0.05, 0.62, 0, 0.885, 0); for (const x of [-0.25, 0.25]) { bx(c, M.wood, 0.46, 0.7, 0.03, x, 0.45, 0.31); bx(c, M.steel, 0.12, 0.02, 0.03, x + (x < 0 ? 0.15 : -0.15), 0.7, 0.33); } solid(c, 1, 0.9, 0.6); },
      ...store(20, null, "Ouvrir le placard") }),
    plan: F({ name: "Plan de travail", icon: "🧱", cat: "Cuisine", cost: { bois: 3, pierre: 2 },
      make(c) { bx(c, M.planks, 1.2, 0.86, 0.6, 0, 0.43, 0); bx(c, M.stone, 1.24, 0.05, 0.64, 0, 0.885, 0); solid(c, 1.2, 0.9, 0.6); } }),
    table_rustique: F({ name: "Table (rustique)", icon: "🪵", cat: "Cuisine", cost: { bois: 4 },
      make(c) { bx(c, M.planks, 1.6, 0.07, 0.9, 0, 0.76, 0); for (const [x, z] of [[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]]) bx(c, M.logs, 0.09, 0.73, 0.09, x, 0.365, z); solid(c, 1.6, 0.8, 0.9); } }),
    table_moderne: F({ name: "Table (moderne)", icon: "⬜", cat: "Cuisine", cost: { bois: 3, pierre: 2 },
      make(c) { bx(c, M.white, 1.6, 0.05, 0.9, 0, 0.75, 0); for (const [x, z] of [[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]]) cyl(c, M.black, 0.025, 0.025, 0.73, x, 0.365, z, 8); solid(c, 1.6, 0.8, 0.9); } }),
    chaise: F({ name: "Chaise", icon: "🪑", cat: "Cuisine", cost: { bois: 2 },
      make(c) { bx(c, M.planks, 0.45, 0.05, 0.45, 0, 0.46, 0); for (const [x, z] of [[-0.19, -0.19], [0.19, -0.19], [-0.19, 0.19], [0.19, 0.19]]) bx(c, M.wood, 0.04, 0.46, 0.04, x, 0.23, z); bx(c, M.planks, 0.45, 0.5, 0.04, 0, 0.73, -0.21); solid(c, 0.45, 0.5, 0.45); },
      ...sit(0.46) }),
    // ----------------------------------------------------------- Salon
    canape_cuir: F({ name: "Canapé (cuir brun)", icon: "🛋️", cat: "Salon", cost: { bois: 3, peau: 3, fibre: 2 }, desc: "S'asseoir : on récupère plus vite.",
      make(c) { bx(c, M.fur, 2.0, 0.42, 0.85, 0, 0.21, 0); bx(c, M.fur, 2.0, 0.55, 0.22, 0, 0.67, -0.32); for (const x of [-0.92, 0.92]) bx(c, M.fur, 0.18, 0.62, 0.85, x, 0.31, 0); for (const x of [-0.42, 0.42]) bx(c, M.fur, 0.82, 0.12, 0.6, x, 0.47, 0.08); solid(c, 2.0, 0.6, 0.85); },
      ...sit(0.5) }),
    canape_tissu: F({ name: "Canapé (tissu gris)", icon: "🛋️", cat: "Salon", cost: { bois: 3, fibre: 6 }, desc: "S'asseoir : on récupère plus vite.",
      make(c) { bx(c, M.fabricGrey, 2.0, 0.42, 0.85, 0, 0.25, 0); bx(c, M.fabricGrey, 2.0, 0.5, 0.2, 0, 0.7, -0.33); for (const x of [-0.92, 0.92]) bx(c, M.fabricGrey, 0.16, 0.55, 0.85, x, 0.32, 0); for (const x of [-0.42, 0.42]) bx(c, M.fabricBeige, 0.82, 0.1, 0.6, x, 0.5, 0.08); for (const x of [-0.9, 0.9]) for (const z of [-0.35, 0.35]) bx(c, M.black, 0.05, 0.05, 0.05, x, 0.025, z); solid(c, 2.0, 0.6, 0.85); },
      ...sit(0.52) }),
    tv: F({ name: "Télévision", icon: "📺", cat: "Salon", cost: { pierre: 4, bois: 2, fibre: 4 }, desc: "S'allume et s'éteint.",
      make(c) { bx(c, M.wood, 1.4, 0.5, 0.45, 0, 0.25, 0); bx(c, M.black, 1.2, 0.7, 0.06, 0, 0.9, -0.05); const s = bx(c, M.screen, 1.12, 0.62, 0.01, 0, 0.9, -0.015); s.userData.screen = true; solid(c, 1.4, 0.5, 0.45); },
      useLabel: (p) => (p.state.on ? "Éteindre la télévision" : "Allumer la télévision"),
      use: (p) => { p.state.on = !p.state.on; p.group.traverse((o) => { if (o.userData.screen) o.material = p.state.on ? tvMat : M.screen; }); },
      onAdd: (p) => { if (p.state.on) p.group.traverse((o) => { if (o.userData.screen) o.material = tvMat; }); } }),
    console: F({ name: "Console de jeu", icon: "🎮", cat: "Salon", cost: { pierre: 2, fibre: 2 }, desc: "Un vrai petit jeu : le serpent.",
      make(c) { bx(c, M.black, 0.36, 0.08, 0.26, 0, 0.04, 0); bx(c, M.white, 0.34, 0.01, 0.24, 0, 0.085, 0); const pad = bx(c, M.black, 0.16, 0.03, 0.09, 0.32, 0.015, 0.1, 0.3); pad.castShadow = false; },
      useLabel: () => "Jouer", use: (p, gm) => gm.openArcade() }),
    table_basse: F({ name: "Table basse", icon: "🟫", cat: "Salon", cost: { bois: 3 },
      make(c) { bx(c, M.planks, 1.1, 0.06, 0.6, 0, 0.42, 0); for (const [x, z] of [[-0.48, -0.24], [0.48, -0.24], [-0.48, 0.24], [0.48, 0.24]]) bx(c, M.darkWood, 0.06, 0.39, 0.06, x, 0.195, z); bx(c, M.planks, 1.0, 0.03, 0.5, 0, 0.12, 0); solid(c, 1.1, 0.45, 0.6); } }),
    bibliotheque: F({ name: "Bibliothèque", icon: "📚", cat: "Salon", cost: { bois: 6, fibre: 2 }, desc: "Range 25 objets.",
      make(c) { bx(c, M.darkWood, 1.2, 2.0, 0.35, 0, 1.0, -0.02); const books = [M.book1, M.book2, M.book3, M.book4, M.paper];
        for (let s = 0; s < 4; s++) { bx(c, M.planks, 1.12, 0.03, 0.32, 0, 0.12 + s * 0.48, 0.02); let x = -0.52; let k = s * 7;
          while (x < 0.5) { const w = 0.04 + ((k * 37) % 5) * 0.012, h = 0.26 + ((k * 13) % 4) * 0.04; bx(c, books[k % 5], w, h, 0.22, x + w / 2, 0.135 + s * 0.48 + h / 2, 0.05); x += w + 0.008; k++; } }
        solid(c, 1.2, 2.0, 0.35); },
      ...store(25, null, "Ouvrir la bibliothèque") }),
    lampe_pied: F({ name: "Lampadaire", icon: "💡", cat: "Salon", cost: { bois: 1, fibre: 2, pierre: 1 },
      make(c) { cyl(c, M.darkWood, 0.18, 0.18, 0.04, 0, 0.02, 0, 16); cyl(c, M.darkWood, 0.02, 0.02, 1.5, 0, 0.77, 0, 8); const sh = cyl(c, M.lampOff, 0.24, 0.14, 0.3, 0, 1.6, 0, 16); sh.userData.bulb = true; solid(c, 0.36, 1.7, 0.36); },
      ...light([0, 1.55, 0], 11) }),
    tapis_rouge: F({ name: "Tapis (rouge)", icon: "🟥", cat: "Salon", cost: { fibre: 4 }, make(c) { bx(c, M.rugRed, 2.2, 0.015, 1.5, 0, 0.008, 0).castShadow = false; bx(c, M.rugCream, 2.0, 0.017, 1.3, 0, 0.009, 0).scale.set(1, 1, 0.08); } }),
    tapis_bleu: F({ name: "Tapis (bleu)", icon: "🟦", cat: "Salon", cost: { fibre: 4 }, make(c) { bx(c, M.rugBlue, 2.2, 0.015, 1.5, 0, 0.008, 0).castShadow = false; } }),
    tapis_fourrure: F({ name: "Tapis en peau", icon: "🟫", cat: "Salon", cost: { peau: 2 }, make(c) { const m = cyl(c, M.fur, 1.0, 1.0, 0.03, 0, 0.015, 0, 18); m.scale.set(1.2, 1, 0.8); m.castShadow = false; } }),
    // ----------------------------------------------------------- Chambre
    lit_rustique: F({ name: "Lit (rustique)", icon: "🛏️", cat: "Chambre", cost: { bois: 5, fibre: 4, peau: 1 }, desc: "Dormir la nuit · point de réapparition.",
      make(c) { bx(c, M.logs, 1.5, 0.35, 2.1, 0, 0.175, 0); bx(c, M.fabricBeige, 1.4, 0.18, 1.95, 0, 0.44, 0.02); bx(c, M.fabricRed, 1.42, 0.06, 1.3, 0, 0.55, 0.35); bx(c, M.white, 0.55, 0.12, 0.35, -0.35, 0.57, -0.75); bx(c, M.white, 0.55, 0.12, 0.35, 0.35, 0.57, -0.75); bx(c, M.logs, 1.5, 1.0, 0.12, 0, 0.5, -1.05); solid(c, 1.5, 0.6, 2.1); },
      useLabel: (p, gm) => (gm.isNight() ? "Dormir jusqu'au matin" : "Définir comme point de réapparition"),
      use: (p, gm) => { gm.player.spawnPoint.set(p.pos.x, p.pos.y + 0.7, p.pos.z); if (gm.isNight()) gm.sleep(); else gm.ui.toast("🛏️ Point de réapparition enregistré"); } }),
    lit_moderne: F({ name: "Lit (moderne)", icon: "🛏️", cat: "Chambre", cost: { bois: 4, fibre: 6 }, desc: "Dormir la nuit · point de réapparition.",
      make(c) { bx(c, M.fabricGrey, 1.6, 0.3, 2.1, 0, 0.15, 0); bx(c, M.white, 1.5, 0.2, 2.0, 0, 0.4, 0.02); bx(c, M.fabricBeige, 1.52, 0.05, 1.2, 0, 0.52, 0.4); bx(c, M.white, 0.6, 0.12, 0.35, -0.38, 0.56, -0.75); bx(c, M.white, 0.6, 0.12, 0.35, 0.38, 0.56, -0.75); bx(c, M.fabricGrey, 1.6, 0.9, 0.1, 0, 0.6, -1.05); solid(c, 1.6, 0.6, 2.1); },
      useLabel: (p, gm) => (gm.isNight() ? "Dormir jusqu'au matin" : "Définir comme point de réapparition"),
      use: (p, gm) => { gm.player.spawnPoint.set(p.pos.x, p.pos.y + 0.7, p.pos.z); if (gm.isNight()) gm.sleep(); else gm.ui.toast("🛏️ Point de réapparition enregistré"); } }),
    armoire: F({ name: "Armoire", icon: "🚪", cat: "Chambre", cost: { bois: 6 }, desc: "Range 30 objets.",
      make(c) { bx(c, M.planks, 1.1, 2.0, 0.6, 0, 1.0, 0); for (const x of [-0.27, 0.27]) { bx(c, M.wood, 0.52, 1.88, 0.03, x, 1.0, 0.31); bx(c, M.steel, 0.02, 0.15, 0.03, x + (x < 0 ? 0.2 : -0.2), 1.05, 0.33); } solid(c, 1.1, 2.0, 0.6); },
      ...store(30, null, "Ouvrir l'armoire") }),
    commode: F({ name: "Commode", icon: "🗃️", cat: "Chambre", cost: { bois: 4 }, desc: "Range 15 objets.",
      make(c) { bx(c, M.planks, 1.0, 0.85, 0.5, 0, 0.425, 0); for (let i = 0; i < 3; i++) { bx(c, M.wood, 0.92, 0.22, 0.03, 0, 0.17 + i * 0.26, 0.26); bx(c, M.steel, 0.14, 0.02, 0.03, 0, 0.2 + i * 0.26, 0.28); } solid(c, 1, 0.85, 0.5); },
      ...store(15, null, "Ouvrir la commode") }),
    bureau: F({ name: "Bureau", icon: "🖋️", cat: "Chambre", cost: { bois: 4 },
      make(c) { bx(c, M.planks, 1.3, 0.05, 0.65, 0, 0.75, 0); bx(c, M.planks, 0.45, 0.72, 0.62, 0.42, 0.36, 0); for (const [x, z] of [[-0.6, -0.28], [-0.6, 0.28]]) bx(c, M.darkWood, 0.05, 0.72, 0.05, x, 0.36, z); bx(c, M.paper, 0.3, 0.01, 0.22, -0.2, 0.78, 0.05); solid(c, 1.3, 0.78, 0.65); } }),
    lampe_chevet: F({ name: "Lampe de chevet", icon: "🕯️", cat: "Chambre", cost: { fibre: 2, pierre: 1 },
      make(c) { cyl(c, M.darkWood, 0.06, 0.08, 0.06, 0, 0.03, 0, 12); cyl(c, M.steel, 0.012, 0.012, 0.25, 0, 0.18, 0, 6); const sh = cyl(c, M.lampOff, 0.13, 0.08, 0.16, 0, 0.36, 0, 14); sh.userData.bulb = true; },
      ...light([0, 0.35, 0], 6) }),
    // ----------------------------------------------------------- Extérieur
    barbecue: F({ name: "Barbecue", icon: "🍖", cat: "Extérieur", cost: { pierre: 6 }, desc: "Cuit la viande dehors.",
      make(c) { bx(c, M.stone, 1.2, 0.8, 0.7, 0, 0.4, 0); bx(c, M.coal, 0.9, 0.05, 0.45, 0, 0.82, 0); for (let i = 0; i < 6; i++) bx(c, M.steel, 0.015, 0.015, 0.5, -0.38 + i * 0.15, 0.88, 0); solid(c, 1.2, 0.9, 0.7); },
      ...cook("Barbecue") }),
    coffre: F({ name: "Coffre", icon: "🧰", cat: "Extérieur", cost: { bois: 4 }, desc: "Range 40 objets.",
      make(c) { bx(c, M.planks, 1.0, 0.55, 0.6, 0, 0.275, 0); bx(c, M.wood, 1.02, 0.12, 0.62, 0, 0.6, 0); for (const x of [-0.4, 0.4]) bx(c, M.steel, 0.05, 0.68, 0.62, x, 0.34, 0); bx(c, M.steel, 0.1, 0.12, 0.04, 0, 0.5, 0.31); solid(c, 1.0, 0.66, 0.6); },
      ...store(40, null, "Ouvrir le coffre") }),
    potager: F({ name: "Potager", icon: "🥕", cat: "Extérieur", cost: { bois: 3, fibre: 2 }, desc: "Plante des baies : des légumes poussent en une journée.",
      make(c) { bx(c, M.logs, 2.0, 0.3, 1.2, 0, 0.15, 0); bx(c, M.soil, 1.85, 0.05, 1.05, 0, 0.29, 0); for (let i = 0; i < 8; i++) { const pl = new THREE.Group(); pl.position.set(-0.75 + (i % 4) * 0.5, 0.31, -0.25 + Math.floor(i / 4) * 0.5); for (let k = 0; k < 4; k++) { const l = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 5), M.leaf); l.position.set(Math.cos(k * 1.6) * 0.05, 0.17, Math.sin(k * 1.6) * 0.05); l.rotation.set(Math.cos(k * 1.6) * 0.4, 0, Math.sin(k * 1.6) * 0.4); pl.add(l); } pl.userData.plant = true; pl.scale.setScalar(0.01); c.group.add(pl); } solid(c, 2.0, 0.32, 1.2); },
      useLabel: (p, gm) => { const st = p.state; if (!st.plantedAt) return gm.inv.count("baies") ? "Planter (1 camu-camu)" : "Il faut un fruit de camu-camu pour planter"; const k = Math.min(1, (gm.totalHours - st.plantedAt) / 24); return k >= 1 ? "Récolter les légumes" : `Ça pousse… ${Math.round(k * 100)} %`; },
      use: (p, gm) => { const st = p.state;
        if (!st.plantedAt) { if (!gm.inv.remove("baies", 1)) { gm.ui.toast("Il te faut un fruit de camu-camu pour planter.", true); return; } st.plantedAt = gm.totalHours; gm.sounds.pickup(); gm.ui.toast("🌱 Planté : reviens dans une journée."); return; }
        if (gm.totalHours - st.plantedAt >= 24) { st.plantedAt = 0; gm.give("legumes", 6); gm.sounds.pickup(); } else gm.ui.toast("Ce n'est pas encore mûr."); },
      tick: (p, dt, b) => { const k = p.state.plantedAt ? Math.min(1, Math.max(0.05, (game.totalHours - p.state.plantedAt) / 24)) : 0.01; p.group.traverse((o) => { if (o.userData.plant) o.scale.setScalar(k); }); } }),
    mangeoire: F({ name: "Mangeoire", icon: "🦫", cat: "Extérieur", cost: { bois: 3 }, desc: "Remplie de fruits ou de noix, elle attire capybaras et agoutis.",
      make(c) { for (const x of [-0.55, 0.55]) bx(c, M.logs, 0.1, 1.1, 0.1, x, 0.55, 0); bx(c, M.planks, 1.2, 0.3, 0.5, 0, 0.75, 0); bx(c, M.planks, 1.3, 0.05, 0.7, 0, 1.15, 0, 0); const hay = bx(c, M.fabricBeige, 1.1, 0.12, 0.42, 0, 0.92, 0); hay.userData.hay = true; hay.visible = false; solid(c, 1.2, 1.1, 0.5); },
      useLabel: (p) => `Remplir (${p.state.food || 0}/10)`,
      use: (p, gm) => { let n = 0; for (const id of ["baies", "noisettes"]) while (gm.inv.count(id) && (p.state.food || 0) < 10) { gm.inv.remove(id, 1); p.state.food = (p.state.food || 0) + 1; n++; } if (!n) gm.ui.toast("Il faut du camu-camu ou des noix du Brésil.", true); else gm.ui.toast(`🦫 Mangeoire remplie (${p.state.food}/10)`); },
      tick: (p) => { p.group.traverse((o) => { if (o.userData.hay) o.visible = (p.state.food || 0) > 0; }); } }),
    lanterne: F({ name: "Lanterne d'extérieur", icon: "🏮", cat: "Extérieur", cost: { bois: 2, pierre: 1, fibre: 1 },
      make(c) { bx(c, M.logs, 0.12, 1.8, 0.12, 0, 0.9, 0); bx(c, M.darkWood, 0.5, 0.06, 0.06, 0.2, 1.75, 0); const l = bx(c, M.lampOff, 0.18, 0.24, 0.18, 0.4, 1.55, 0); l.userData.bulb = true; bx(c, M.black, 0.22, 0.04, 0.22, 0.4, 1.69, 0); solid(c, 0.2, 1.8, 0.2); },
      ...light([0.4, 1.5, 0], 14) }),
    garage: { name: "Mur de garage (porte relevable)", icon: "🚗", cat: "Extérieur", cost: { bois: 6, pierre: 2 }, snap: ["wall"], free: "ground", rotStep: Math.PI / 2, wall: true, door: true, garage: true,
      desc: "Se pose sur un bord de fondation, comme un mur. La porte se relève.",
      make(c) {
        bx(c, M.logs, 0.25, 3, 0.25, -1.375, 1.5, 0); bx(c, M.logs, 0.25, 3, 0.25, 1.375, 1.5, 0); bx(c, M.logs, 3, 0.5, 0.25, 0, 2.75, 0);
        c.boxes.push({ c: [-1.375, 1.4, 0], h: [0.125, 1.4, 0.125] }, { c: [1.375, 1.4, 0], h: [0.125, 1.4, 0.125] });
        const pivot = new THREE.Group(); c.group.add(pivot);
        for (let i = 0; i < 5; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.48, 0.06), M.planks); m.position.set(0, 0.26 + i * 0.5, 0.02); m.castShadow = true; pivot.add(m); }
        c.pivot = pivot;
        c.boxes.push({ c: [0, 1.25, 0], h: [1.25, 1.25, 0.08], door: true });
        c.sockets.push({ type: "wall", p: [0, 3, 0], r: 0 }, { type: "floor", p: [0, 3, G / 2], r: 0 }, { type: "floor", p: [0, 3, -G / 2], r: 0 });
      },
      tick: (p, dt) => { const pv = p.info.pivot; if (!pv) return; const ty = p.state.open ? 2.3 : 0; pv.position.y += (ty - pv.position.y) * Math.min(1, dt * 3); pv.rotation.y = 0; p.doorTarget = undefined; } },
  };
  Object.assign(build.extraDefs, D);
  build.tvTick = (t) => { if (build.pieces.some((p) => p.type === "tv" && p.state.on)) drawTV(t); };
}
