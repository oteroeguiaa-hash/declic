// Catalogue des espèces.
//
// Chaque entrée : [nom, nom scientifique, masse kg, vmax km/h, accélération m/s², vitesse critique km/h,
//                  réserve de sprint (s), apparence, options]
//  - vmax : vitesse de pointe mesurée ou estimée dans la littérature (course au sol, sauf mention).
//  - accélération : accélération maximale au départ (m/s²), mesurée chez le guépard, le lévrier,
//    le cheval et l'humain ; estimée d'après la masse et le type de locomotion ailleurs.
//  - vitesse critique : vitesse soutenable longtemps par le métabolisme aérobie (trot, petit galop…).
//  - réserve de sprint : nombre de secondes « équivalentes » à pleine puissance que la réserve
//    anaérobie permet (calibré sur des performances réelles : 100 m à 10 km humains, courses de
//    lévriers et de chevaux, poursuites de guépards).
//
// L'apparence est une petite chaîne lue par le générateur de modèles 3D (models.js).

export const CATEGORIES = [
  { id: "humains", name: "Humains", icon: "🏃" },
  { id: "felins", name: "Félins", icon: "🐆" },
  { id: "canides", name: "Canidés", icon: "🐺" },
  { id: "hyenes", name: "Hyènes et autres carnivores", icon: "🦡" },
  { id: "bovins", name: "Bovins", icon: "🐂" },
  { id: "equides", name: "Équidés", icon: "🐎" },
  { id: "herbivores", name: "Grands herbivores", icon: "🐘" },
  { id: "cervides", name: "Cervidés et antilopes", icon: "🦌" },
  { id: "suides", name: "Suidés et autres ongulés", icon: "🐗" },
  { id: "primates", name: "Primates", icon: "🦍" },
  { id: "marsupiaux", name: "Marsupiaux", icon: "🦘" },
  { id: "ours", name: "Ours", icon: "🐻" },
  { id: "petits", name: "Petits mammifères", icon: "🐇" },
  { id: "coureurs", name: "Oiseaux coureurs", icon: "🦤" },
  { id: "volants", name: "Oiseaux volants", icon: "🦅" },
  { id: "reptiles", name: "Reptiles", icon: "🐊" },
  { id: "aquatiques", name: "Animaux aquatiques", icon: "🐬" },
  { id: "insectes", name: "Insectes", icon: "🐜" },
  { id: "invertebres", name: "Autres invertébrés", icon: "🐌" },
];

// Valeurs par défaut de chaque grande famille (physiologie et apparence).
const FAM = {
  felin:   { restFrac: 0.5, cat: "felins", plan: "quad", gait: "rotary", spine: 1, pacing: 0.12, cool: 0.5, heatTol: 1.6, kfat: 0.7, floor: 0.4, endur: 3000, oxyTau: 20, foot: "paw", recov: 0.9, look: "ears=round tail=long head=cat" },
  chien:   { cat: "canides", plan: "quad", gait: "rotary", spine: 0.75, pacing: 0.42, cool: 0.75, heatTol: 2, kfat: 0.5, floor: 0.5, endur: 12000, oxyTau: 16, foot: "paw", look: "ears=pointed tail=long head=dog" },
  carni:   { cat: "hyenes", plan: "quad", gait: "rotary", spine: 0.6, pacing: 0.3, cool: 0.6, heatTol: 1.8, kfat: 0.55, floor: 0.45, endur: 6000, foot: "paw", look: "ears=round tail=long head=dog" },
  bovin:   { cat: "bovins", plan: "quad", gait: "transverse", spine: 0.2, pacing: 0.3, cool: 0.55, heatTol: 1.8, kfat: 0.5, floor: 0.5, endur: 6000, foot: "hoof", look: "ears=side tail=tuft head=cow horns=cow" },
  equide:  { cat: "equides", plan: "quad", gait: "transverse", spine: 0.25, pacing: 0.6, cool: 1.0, heatTol: 2, kfat: 0.5, floor: 0.55, endur: 7000, foot: "hoof", look: "ears=pointed tail=horse head=horse mane" },
  lourd:   { cat: "herbivores", plan: "quad", gait: "amble", spine: 0.1, pacing: 0.35, cool: 0.4, heatTol: 1.5, kfat: 0.5, floor: 0.5, endur: 8000, foot: "paw", look: "tail=tuft" },
  cervide: { cat: "cervides", plan: "quad", gait: "transverse", spine: 0.4, pacing: 0.3, cool: 0.7, heatTol: 2, kfat: 0.45, floor: 0.55, endur: 9000, foot: "hoof", look: "ears=pointed tail=short head=deer" },
  suide:   { cat: "suides", plan: "quad", gait: "transverse", spine: 0.3, pacing: 0.3, cool: 0.35, heatTol: 1.5, kfat: 0.55, floor: 0.5, endur: 4000, foot: "hoof", look: "ears=pointed tail=thin head=pig" },
  primate: { cat: "primates", plan: "quad", gait: "rotary", spine: 0.4, pacing: 0.3, cool: 0.8, heatTol: 2, kfat: 0.6, floor: 0.45, endur: 3000, foot: "paw", look: "ears=round tail=none head=ape arms" },
  marsu:   { cat: "marsupiaux", plan: "hop", gait: "hop", spine: 0.3, pacing: 0.5, cool: 0.6, heatTol: 2, kfat: 0.45, floor: 0.55, endur: 15000, foot: "paw", recov: 1.2, look: "ears=long tail=thick head=deer" },
  ours:    { restFrac: 0.55, cat: "ours", plan: "quad", gait: "rotary", spine: 0.35, pacing: 0.25, cool: 0.35, heatTol: 1.5, kfat: 0.6, floor: 0.45, endur: 4000, foot: "paw", look: "ears=round tail=short head=bear" },
  petit:   { cat: "petits", plan: "quad", gait: "bound", spine: 0.8, pacing: 0.2, cool: 0.5, heatTol: 1.5, kfat: 0.6, floor: 0.45, endur: 2000, foot: "paw", look: "ears=round tail=thin head=rodent" },
  ratite:  { cat: "coureurs", plan: "bird2", gait: "biped", spine: 0, pacing: 0.5, cool: 0.7, heatTol: 2.5, kfat: 0.45, floor: 0.55, endur: 15000, foot: "bird", biped: true, look: "neck=long" },
  oiseau:  { cat: "volants", plan: "bird", gait: "fly", spine: 0, pacing: 0.55, cool: 1.2, heatTol: 2, kfat: 0.5, floor: 0.55, endur: 30000, foot: "bird", biped: true, look: "" },
  reptile: { restFrac: 0.5, cat: "reptiles", plan: "reptile", gait: "sprawl", spine: 0.6, pacing: 0.1, cool: 1, heatTol: 4, kfat: 0.8, floor: 0.3, endur: 1200, foot: "claw", ecto: true, topt: 32, oxyTau: 12, recov: 0.5, look: "tail=lizard head=lizard" },
  marin:   { cat: "aquatiques", plan: "swim", gait: "swim", spine: 0.6, pacing: 0.4, cool: 0.4, heatTol: 2, kfat: 0.5, floor: 0.5, endur: 30000, foot: "none", look: "" },
  insecte: { cat: "insectes", plan: "insect", gait: "tripod", spine: 0, pacing: 0.2, cool: 2, heatTol: 6, kfat: 0.5, floor: 0.5, endur: 8000, foot: "claw", ecto: true, topt: 30, oxyTau: 5, drag: 0.03, look: "" },
  inverte: { cat: "invertebres", plan: "insect", gait: "tripod", spine: 0, pacing: 0.2, cool: 2, heatTol: 6, kfat: 0.5, floor: 0.5, endur: 8000, foot: "claw", ecto: true, topt: 25, oxyTau: 5, drag: 0.03, look: "" },
};

export const SPECIES = [];
const byId = new Map();

function slug(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function add(fam, rows) {
  const d = FAM[fam];
  for (const row of rows) {
    const [name, latin, mass, vmax, acc, vcs, sprint, look = "", extra = {}] = row;
    let id = slug(name);
    while (byId.has(id)) id += "-2";
    const sp = {
      ...d, id, fam, name, latin, mass, vmax, acc, vcs, sprint,
      look: (d.look ? d.look + " " : "") + look,
      ...extra,
    };
    if (extra.look) sp.look = (d.look ? d.look + " " : "") + extra.look;
    if (vmax == null) sp.vmax = 0;
    SPECIES.push(sp);
    byId.set(id, sp);
  }
}

export function getSpecies(id) { return byId.get(id); }

// ───────────────────────── HUMAINS ─────────────────────────
// Profils élites (homme adulte) puis interpolation selon l'entraînement.
export const HUMAN_PROFILES = {
  sprint:  { label: "Sprint",       vmax: 44.3, acc: 9.5, vcs: 17.5, sprint: 24, mass: 80, endur: 6000 },
  demi:    { label: "Demi-fond",    vmax: 36.5, acc: 7.8, vcs: 22.5, sprint: 40, mass: 65, endur: 8000 },
  fond:    { label: "Fond",         vmax: 33.0, acc: 6.8, vcs: 22.9, sprint: 28, mass: 58, endur: 10000 },
  ultra:   { label: "Ultra-endurance", vmax: 30.0, acc: 6.0, vcs: 19.5, sprint: 22, mass: 62, endur: 26000 },
  complet: { label: "Polyvalent",   vmax: 39.0, acc: 8.5, vcs: 19.0, sprint: 30, mass: 85, endur: 7000 },
};
const UNTRAINED = { vmax: 24, acc: 4.6, vcs: 9, sprint: 40, endur: 2500, pacing: 0.62, heatTol: 2.0, cool: 1.2 };
const ELITE_SWIM = { vmax: 8.8, acc: 2.2, vcs: 6.2, sprint: 20 };
const BASE_SWIM = { vmax: 3.6, acc: 1.2, vcs: 2.2, sprint: 12 };

// training : 0 (non entraîné) à 1 (élite mondiale).
export function humanStats(h, training) {
  const P = HUMAN_PROFILES[h.profile];
  const t = Math.pow(Math.max(0, Math.min(1, training)), 0.85);
  const L = (a, b) => a + (b - a) * t;
  const sexF = h.sex === "f" ? { v: 0.905, a: 0.93, c: 0.9, m: 0.78 } : { v: 1, a: 1, c: 1, m: 1 };
  const ageF = h.age === "enfant" ? { v: 0.6, a: 0.72, c: 0.68, s: 0.8, m: 0.4 }
    : h.age === "senior" ? { v: 0.6, a: 0.58, c: 0.62, s: 0.75, m: 0.95 }
    : h.age === "ado" ? { v: 0.85, a: 0.88, c: 0.88, s: 0.9, m: 0.75 } : { v: 1, a: 1, c: 1, s: 1, m: 1 };
  const swimT = h.swimmer ? 1 : t * 0.75;
  const SL = (a, b) => a + (b - a) * swimT;
  return {
    vmax: L(UNTRAINED.vmax, P.vmax) * sexF.v * ageF.v,
    acc: L(UNTRAINED.acc, P.acc) * sexF.a * ageF.a,
    vcs: L(UNTRAINED.vcs, P.vcs) * sexF.c * ageF.c,
    sprint: L(UNTRAINED.sprint, P.sprint) * ageF.s,
    endur: L(UNTRAINED.endur, P.endur),
    pacing: L(UNTRAINED.pacing, 0.92),
    heatTol: L(UNTRAINED.heatTol, h.profile === "ultra" ? 3 : 2.5),
    cool: L(UNTRAINED.cool, 1.6),
    mass: (h.baseMass ?? P.mass) * sexF.m * ageF.m,
    swim: {
      vmax: SL(BASE_SWIM.vmax, ELITE_SWIM.vmax) * sexF.v * ageF.v,
      acc: SL(BASE_SWIM.acc, ELITE_SWIM.acc), vcs: SL(BASE_SWIM.vcs, ELITE_SWIM.vcs) * sexF.c * ageF.c,
      sprint: SL(BASE_SWIM.sprint, ELITE_SWIM.sprint), beat: 0.8,
    },
  };
}

const HUMANS = [
  ["Sprinteur professionnel", { profile: "sprint", training: 1, sex: "m", look: "c=#6b4532 kit=#d43d2f" }],
  ["Sprinteuse professionnelle", { profile: "sprint", training: 1, sex: "f", look: "c=#8a5a3c kit=#2f6fd4 hair=long" }],
  ["Coureur de demi-fond élite", { profile: "demi", training: 1, sex: "m", look: "c=#5a3a28 kit=#2fa34a" }],
  ["Marathonien élite", { profile: "fond", training: 1, sex: "m", look: "c=#4a2e20 kit=#e0b020" }],
  ["Marathonienne élite", { profile: "fond", training: 1, sex: "f", look: "c=#5a3828 kit=#c02f8a hair=long" }],
  ["Ultra-traileur", { profile: "ultra", training: 0.95, sex: "m", look: "c=#d9a98a kit=#3a3a3a" }],
  ["Décathlonien", { profile: "complet", training: 1, sex: "m", look: "c=#e0b896 kit=#1f4fa0" }],
  ["Nageur olympique", { profile: "complet", training: 0.55, sex: "m", swimmer: true, baseMass: 88, look: "c=#e8c2a0 kit=#101828" }],
  ["Athlète moyen (club)", { profile: "complet", training: 0.5, sex: "m", baseMass: 75, look: "c=#d8a888 kit=#8a2be2" }],
  ["Coureur amateur (jogging)", { profile: "fond", training: 0.32, sex: "m", baseMass: 75, look: "c=#e8c0a0 kit=#ff8c1a" }],
  ["Coureuse amateur", { profile: "fond", training: 0.32, sex: "f", baseMass: 78, look: "c=#f0caa8 kit=#18b0b0 hair=long" }],
  ["Personne non entraînée", { profile: "complet", training: 0, sex: "m", baseMass: 82, look: "c=#e8c0a0 kit=#7a7a7a" }],
  ["Personne sédentaire en surpoids", { profile: "complet", training: 0, sex: "m", baseMass: 82, massOverride: 110, look: "c=#e8c0a0 kit=#5a6a7a belly" }],
  ["Adolescent sportif (15 ans)", { profile: "complet", training: 0.4, sex: "m", age: "ado", look: "c=#d8a888 kit=#e04040" }],
  ["Enfant (10 ans)", { profile: "complet", training: 0.2, sex: "m", age: "enfant", look: "c=#f0c8a8 kit=#40a0e0" }],
  ["Senior actif (70 ans)", { profile: "fond", training: 0.35, sex: "m", age: "senior", baseMass: 75, look: "c=#e8c0a0 kit=#708090 hair=grey" }],
  ["Chasseur à l'épuisement (San)", { profile: "ultra", training: 0.85, sex: "m", baseMass: 52, look: "c=#7a4a30 kit=#a0703a" }],
];
for (const [name, h] of HUMANS) {
  const st = humanStats(h, h.training);
  const sp = {
    id: slug(name), fam: "humain", cat: "humains", name, latin: "Homo sapiens",
    plan: "human", gait: "biped", biped: true, spine: 0, foot: "human", oxyTau: 20,
    kfat: 0.5, floor: 0.55, recov: 1, human: h, ...st,
    look: h.look || "",
  };
  if (h.massOverride) sp.defaultMass = h.massOverride;
  SPECIES.push(sp);
  byId.set(sp.id, sp);
}

// ───────────────────────── FÉLINS ─────────────────────────
add("felin", [
  ["Guépard", "Acinonyx jubatus", 50, 104, 13, 15, 9, "H=0.8 L=1.15 c=#d9a548/#f6ead0 pat=spots tear legs=1.25 tail=long", { strideF: 3.2, note: "Pointe mesurée en chasse : 93 km/h (Wilson 2013) ; 104 km/h en sprint record." }],
  ["Guépard d'Asie", "Acinonyx jubatus venaticus", 42, 96, 12.5, 14, 8.5, "H=0.75 L=1.1 c=#d8ac62/#f3e6cc pat=spots tear legs=1.25", { strideF: 3.2 }],
  ["Guépard royal", "Acinonyx jubatus (morphe king)", 52, 102, 12.8, 15, 9, "H=0.8 L=1.15 c=#d9a548/#f6ead0 pat=blotches tear legs=1.25", { strideF: 3.2 }],
  ["Guépard de zoo (Sarah)", "Acinonyx jubatus", 40, 98, 12, 13, 8.5, "H=0.75 L=1.1 c=#d9a548/#f6ead0 pat=spots tear legs=1.25", { strideF: 3.3, note: "100 m en 5,95 s (Cincinnati, 2012)." }],
  ["Lion (mâle)", "Panthera leo", 190, 60, 9.5, 12, 7, "H=1.15 L=1.85 c=#c99a5b/#e8cfa0 mane tail=tuft", { pacing: 0.15 }],
  ["Lionne", "Panthera leo", 126, 64, 10, 13, 7.5, "H=1.0 L=1.6 c=#c99a5b/#ead4a8 tail=tuft" ],
  ["Lion d'Asie", "Panthera leo persica", 160, 58, 9.2, 12, 7, "H=1.05 L=1.75 c=#b89060/#e0c89c mane=short tail=tuft"],
  ["Lion blanc", "Panthera leo (leucistique)", 180, 59, 9.4, 12, 7, "H=1.12 L=1.8 c=#ece2cc/#f8f2e4 mane tail=tuft"],
  ["Tigre du Bengale", "Panthera tigris tigris", 220, 63, 9, 12, 7, "H=1.0 L=1.9 c=#d9782b/#f6ecdc pat=stripes", { swim: { vmax: 6.5, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Tigre de Sibérie", "Panthera tigris altaica", 250, 60, 8.6, 12, 7, "H=1.05 L=2.0 c=#e08a3c/#f6ecdc pat=stripes fur=long", { cold: true, foot: "snow", swim: { vmax: 6, acc: 1.4, vcs: 4, sprint: 20 } }],
  ["Tigre de Sumatra", "Panthera tigris sondaica", 120, 62, 9.5, 12, 7, "H=0.85 L=1.6 c=#c8682a/#f0e0cc pat=stripes", { swim: { vmax: 6.5, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Tigre blanc", "Panthera tigris (leucistique)", 200, 62, 9, 12, 7, "H=1.0 L=1.85 c=#efe9de/#fbf8f2 pat=stripes stripe=#3a3530", { swim: { vmax: 6.5, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Léopard d'Afrique", "Panthera pardus pardus", 60, 58, 10, 13, 7.5, "H=0.7 L=1.3 c=#d4a050/#f4e8d0 pat=rosettes"],
  ["Léopard de l'Amour", "Panthera pardus orientalis", 45, 56, 9.8, 13, 7.5, "H=0.68 L=1.2 c=#e0b880/#f6ecdc pat=rosettes fur=long", { cold: true, foot: "snow" }],
  ["Panthère noire", "Panthera pardus (mélanique)", 58, 58, 10, 13, 7.5, "H=0.7 L=1.3 c=#1c1a1a/#2a2626 pat=rosettes rosette=#0c0b0b"],
  ["Panthère des neiges", "Panthera uncia", 45, 60, 9.5, 13, 7.5, "H=0.62 L=1.2 c=#d8d4c8/#f4f2ec pat=rosettes rosette=#5a5a58 fur=long tail=thick", { cold: true, foot: "snow" }],
  ["Panthère nébuleuse", "Neofelis nebulosa", 18, 40, 8, 10, 6, "H=0.5 L=0.95 c=#b0905c/#e0d0b0 pat=blotches tail=thick"],
  ["Jaguar", "Panthera onca", 95, 64, 9.5, 13, 7, "H=0.75 L=1.5 c=#d6a04a/#f4e6cc pat=rosettes", { swim: { vmax: 6, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Jaguar noir", "Panthera onca (mélanique)", 95, 64, 9.5, 13, 7, "H=0.75 L=1.5 c=#1e1b1a/#2c2826 pat=rosettes rosette=#0c0b0b"],
  ["Puma", "Puma concolor", 65, 70, 10.5, 14, 7.5, "H=0.7 L=1.3 c=#b8885a/#e8d8c0 tail=long"],
  ["Lynx boréal", "Lynx lynx", 22, 60, 10, 14, 7, "H=0.62 L=0.95 c=#b89a78/#ece0d0 pat=dots tufts tail=bob legs=1.15", { cold: true, foot: "snow" }],
  ["Lynx roux", "Lynx rufus", 10, 48, 10, 13, 6.5, "H=0.5 L=0.75 c=#a8805a/#ecdcc8 pat=dots tufts tail=bob"],
  ["Lynx ibérique", "Lynx pardinus", 11, 50, 10, 13, 6.5, "H=0.5 L=0.8 c=#c09a68/#f0e4d0 pat=spots tufts tail=bob"],
  ["Lynx du Canada", "Lynx canadensis", 10, 48, 9.5, 13, 6.5, "H=0.55 L=0.8 c=#a8a090/#e8e4dc tufts tail=bob fur=long legs=1.15", { cold: true, foot: "snow" }],
  ["Caracal", "Caracal caracal", 15, 80, 11, 14, 7, "H=0.45 L=0.85 c=#c08850/#f0e0c8 tufts tail=short legs=1.2", { foot: "desert" }],
  ["Serval", "Leptailurus serval", 14, 80, 11, 15, 7, "H=0.6 L=0.8 c=#d8a858/#f6ecd8 pat=spots legs=1.4 ears=big tail=short"],
  ["Ocelot", "Leopardus pardalis", 12, 61, 10, 12, 6.5, "H=0.45 L=0.85 c=#c8a060/#f0e4cc pat=blotches"],
  ["Margay", "Leopardus wiedii", 3.5, 40, 9, 10, 6, "H=0.3 L=0.55 c=#c0985a/#f0e4cc pat=blotches tail=long"],
  ["Jaguarondi", "Herpailurus yagouaroundi", 6, 48, 9, 12, 6, "H=0.33 L=0.65 c=#5a4a40/#6a5a50 ears=small legs=0.8"],
  ["Chat sauvage d'Europe", "Felis silvestris", 5, 48, 9, 10, 6, "H=0.35 L=0.55 c=#8a7a66/#d8ccb8 pat=tabby tail=thick"],
  ["Chat des sables", "Felis margarita", 2.5, 40, 8.5, 10, 6, "H=0.27 L=0.45 c=#d8c098/#f4ecdc ears=big", { foot: "desert", heatTol: 3 }],
  ["Chat de Pallas (manul)", "Otocolobus manul", 4, 30, 7, 8, 5, "H=0.3 L=0.55 c=#a8a090/#e0dcd0 fur=long ears=small legs=0.8", { cold: true }],
  ["Chat domestique (européen)", "Felis catus", 4.2, 48, 9, 8, 8, "H=0.28 L=0.46 c=#7a6a5a/#e0d4c4 pat=tabby", { note: "Pointe ~48 km/h sur quelques dizaines de mètres." }],
  ["Chat siamois", "Felis catus", 4, 48, 9, 8, 8, "H=0.27 L=0.45 c=#efe4d0/#4a3a30 pat=points"],
  ["Maine coon", "Felis catus", 7.5, 45, 8.5, 8, 8, "H=0.33 L=0.55 c=#8a6a4a/#d8c8b0 pat=tabby fur=long tufts tail=thick"],
  ["Chat bengal", "Felis catus × P. bengalensis", 5, 50, 9.5, 9, 8, "H=0.3 L=0.5 c=#d8a050/#f4e8d4 pat=rosettes"],
  ["Chat abyssin", "Felis catus", 4, 50, 9.5, 8, 8, "H=0.29 L=0.47 c=#b87a4a/#e0b890 ears=big"],
  ["Chat persan", "Felis catus", 4.5, 35, 7, 6, 6, "H=0.25 L=0.45 c=#efeae2/#ffffff fur=long head=flat tail=thick", { heatTol: 1.2, cool: 0.35 }],
  ["Chat sphynx", "Felis catus", 4, 45, 9, 8, 7, "H=0.28 L=0.45 c=#e8c4b0/#f0d0c0 ears=big tail=thin"],
  ["Chat savannah F1", "Felis catus × L. serval", 9, 56, 10, 10, 7, "H=0.43 L=0.62 c=#c8a060/#f0e4cc pat=spots legs=1.3 ears=big"],
  ["Chat de gouttière en surpoids", "Felis catus", 7, 38, 7, 6, 6, "H=0.28 L=0.5 c=#c88a4a/#f0d8b8 pat=tabby belly"],
]);

// ───────────────────────── CANIDÉS ─────────────────────────
const SNOW = { cold: true, foot: "snow" };
add("chien", [
  ["Loup gris (Europe)", "Canis lupus lupus", 40, 60, 8, 28, 20, "H=0.8 L=1.05 c=#8a8278/#d8d0c4 pat=wolf tail=bushy", { endur: 22000, swim: { vmax: 6, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Loup arctique", "Canis lupus arctos", 45, 60, 7.8, 28, 20, "H=0.82 L=1.05 c=#ece8e0/#f8f6f2 tail=bushy fur=long", { ...SNOW, endur: 25000 }],
  ["Loup ibérique", "Canis lupus signatus", 35, 55, 8, 26, 18, "H=0.75 L=1.0 c=#8a7058/#d0c0a8 pat=wolf tail=bushy", { endur: 20000 }],
  ["Loup des steppes", "Canis lupus campestris", 38, 58, 8, 27, 19, "H=0.78 L=1.0 c=#a89878/#e0d4c0 pat=wolf tail=bushy", { endur: 22000 }],
  ["Loup d'Abyssinie", "Canis simensis", 15, 50, 8, 22, 15, "H=0.6 L=0.9 c=#c0602a/#f4e8dc tail=bushy legs=1.2"],
  ["Loup à crinière", "Chrysocyon brachyurus", 23, 60, 8, 24, 16, "H=0.9 L=0.95 c=#c86a2a/#2a201a legs=1.6 ears=big mane=short"],
  ["Loup rouge", "Canis rufus", 25, 56, 8, 25, 17, "H=0.7 L=0.95 c=#9a6a48/#d8c0a8 pat=wolf tail=bushy"],
  ["Lycaon (chien sauvage d'Afrique)", "Lycaon pictus", 25, 66, 8.5, 34, 40, "H=0.72 L=0.95 c=#6a5038/#d8b060 pat=patches ears=big tail=bushy", { endur: 25000, pacing: 0.5, note: "Chasseur d'endurance : poursuites de plusieurs kilomètres." }],
  ["Dhole", "Cuon alpinus", 16, 50, 8, 28, 20, "H=0.5 L=0.9 c=#c06a30/#f0dcc8 tail=bushy", { endur: 20000 }],
  ["Dingo", "Canis lupus dingo", 18, 60, 8.5, 26, 18, "H=0.55 L=0.9 c=#d0904a/#f4e4cc tail=bushy", { endur: 18000 }],
  ["Coyote", "Canis latrans", 14, 64, 9, 30, 18, "H=0.6 L=0.85 c=#a8906a/#e8dcc8 pat=wolf tail=bushy", { endur: 18000 }],
  ["Chacal doré", "Canis aureus", 10, 50, 8.5, 25, 15, "H=0.45 L=0.75 c=#c0a070/#ecdcc4 tail=bushy"],
  ["Chacal à chabraque", "Lupulella mesomelas", 9, 55, 8.5, 25, 15, "H=0.45 L=0.75 c=#c07a40/#2a2420 pat=saddle tail=bushy"],
  ["Renard roux", "Vulpes vulpes", 7, 50, 9, 20, 12, "H=0.4 L=0.7 c=#c8642a/#f6efe6 tail=fox socks"],
  ["Renard arctique", "Vulpes lagopus", 4, 48, 8.5, 18, 12, "H=0.3 L=0.6 c=#f4f2ee/#ffffff tail=fox fur=long ears=small", SNOW],
  ["Fennec", "Vulpes zerda", 1.3, 40, 8.5, 14, 10, "H=0.2 L=0.38 c=#e8cc98/#f8f0e0 ears=huge tail=fox", { foot: "desert", heatTol: 3 }],
  ["Renard gris", "Urocyon cinereoargenteus", 5, 42, 8.5, 18, 11, "H=0.36 L=0.65 c=#8a8a88/#c87a48 tail=fox"],
  ["Renard véloce", "Vulpes velox", 2.5, 55, 9, 20, 12, "H=0.3 L=0.5 c=#c8a070/#f4ecdc tail=fox ears=big"],
  ["Lévrier anglais (greyhound)", "Canis familiaris", 30, 70, 9, 30, 22, "H=0.72 L=0.85 c=#7a6a5a/#e8dcd0 legs=1.35 ears=rose tail=thin head=greyhound waist", { strideF: 3.6, pacing: 0.3, note: "Course de 480 m en ~28 s, 67 km/h de moyenne sur le sprint." }],
  ["Whippet", "Canis familiaris", 13, 56, 9.5, 25, 18, "H=0.5 L=0.6 c=#c8b098/#f4ecdc legs=1.35 ears=rose tail=thin head=greyhound waist", { pacing: 0.3 }],
  ["Saluki", "Canis familiaris", 25, 68, 8.8, 29, 30, "H=0.68 L=0.8 c=#d8b888/#f4ead8 legs=1.35 ears=floppy tail=feather head=greyhound waist", { endur: 20000, pacing: 0.45 }],
  ["Barzoï", "Canis familiaris", 40, 58, 8.2, 28, 20, "H=0.8 L=0.95 c=#f0ebe2/#d8b890 legs=1.3 fur=long tail=feather head=greyhound waist"],
  ["Lévrier afghan", "Canis familiaris", 26, 64, 8.5, 28, 20, "H=0.7 L=0.8 c=#d8b888/#f0e4d0 legs=1.3 fur=long ears=floppy head=greyhound waist"],
  ["Lévrier irlandais", "Canis familiaris", 60, 56, 7.5, 24, 18, "H=0.86 L=1.05 c=#8a8278/#b0a898 legs=1.25 fur=shaggy head=greyhound"],
  ["Galgo espagnol", "Canis familiaris", 28, 64, 9, 28, 20, "H=0.68 L=0.82 c=#8a5a3a/#e8d8c8 legs=1.35 ears=rose tail=thin head=greyhound waist"],
  ["Sloughi", "Canis familiaris", 25, 64, 8.8, 27, 22, "H=0.68 L=0.78 c=#d0a060/#f0e0c0 legs=1.35 ears=floppy head=greyhound waist", { endur: 16000 }],
  ["Azawakh", "Canis familiaris", 22, 64, 8.8, 27, 22, "H=0.7 L=0.72 c=#c89058/#f4ecdc legs=1.45 ears=floppy head=greyhound waist", { endur: 16000, heatTol: 2.6 }],
  ["Lévrier italien (levrette)", "Canis familiaris", 4.5, 40, 8.5, 16, 12, "H=0.36 L=0.4 c=#8a8a90/#d8d8dc legs=1.35 ears=rose tail=thin head=greyhound waist"],
  ["Braque hongrois (vizsla)", "Canis familiaris", 25, 60, 8.5, 26, 18, "H=0.6 L=0.65 c=#c07038/#d08848 ears=floppy tail=thin"],
  ["Braque de Weimar", "Canis familiaris", 32, 56, 8.2, 26, 18, "H=0.65 L=0.7 c=#9a9890/#b0aea8 ears=floppy tail=thin"],
  ["Dalmatien", "Canis familiaris", 25, 50, 8, 24, 18, "H=0.58 L=0.62 c=#f6f4f0/#ffffff pat=dalmatian ears=floppy tail=thin", { endur: 15000 }],
  ["Dobermann", "Canis familiaris", 35, 50, 8.5, 22, 15, "H=0.68 L=0.7 c=#1c1816/#8a4a28 pat=tan ears=pointed tail=short"],
  ["Berger allemand", "Canis familiaris", 35, 48, 8, 22, 16, "H=0.62 L=0.75 c=#c08848/#2a221c pat=saddle ears=pointed tail=bushy", { endur: 14000 }],
  ["Berger belge malinois", "Canis familiaris", 28, 55, 8.8, 25, 18, "H=0.62 L=0.68 c=#c89050/#3a2a20 pat=mask ears=pointed tail=bushy", { endur: 14000 }],
  ["Berger australien", "Canis familiaris", 22, 48, 8, 24, 16, "H=0.53 L=0.6 c=#5a5a60/#e8e4e0 pat=merle ears=floppy fur=long tail=bob"],
  ["Border collie", "Canis familiaris", 18, 48, 8.5, 24, 16, "H=0.52 L=0.58 c=#1c1a1a/#f6f4f0 pat=collie ears=rose fur=long tail=bushy", { endur: 16000 }],
  ["Husky sibérien", "Canis familiaris", 22, 45, 7.5, 26, 18, "H=0.56 L=0.65 c=#5a5c60/#f4f4f2 pat=husky ears=pointed tail=curl fur=long", { ...SNOW, endur: 35000, note: "Chien de traîneau : couvre plus de 150 km par jour." }],
  ["Husky d'Alaska (chien de course de traîneau)", "Canis familiaris", 23, 50, 8, 28, 20, "H=0.6 L=0.68 c=#8a7060/#e8e0d8 ears=pointed tail=curl legs=1.1", { ...SNOW, endur: 45000 }],
  ["Malamute d'Alaska", "Canis familiaris", 38, 40, 6.8, 20, 15, "H=0.63 L=0.72 c=#7a7a7e/#f4f4f2 pat=husky ears=pointed tail=curl fur=long", { ...SNOW, endur: 30000 }],
  ["Samoyède", "Canis familiaris", 25, 40, 7, 20, 15, "H=0.56 L=0.6 c=#f8f6f2/#ffffff ears=pointed tail=curl fur=long", { ...SNOW, endur: 25000 }],
  ["Chien-loup tchécoslovaque", "Canis familiaris", 28, 50, 8, 26, 18, "H=0.65 L=0.75 c=#8a8278/#d8d0c4 pat=wolf ears=pointed tail=bushy", { endur: 25000 }],
  ["Chien-loup de Saarloos", "Canis familiaris", 36, 48, 7.8, 25, 17, "H=0.7 L=0.8 c=#8a8278/#d8d0c4 pat=wolf ears=pointed tail=bushy", { endur: 22000 }],
  ["Labrador retriever", "Canis familiaris", 32, 45, 7.5, 20, 15, "H=0.57 L=0.65 c=#e0c080/#f0dcac ears=floppy tail=otter", { swim: { vmax: 5.5, acc: 1.3, vcs: 3.6, sprint: 20 } }],
  ["Golden retriever", "Canis familiaris", 32, 45, 7.5, 20, 15, "H=0.58 L=0.65 c=#d8a050/#e8c080 ears=floppy fur=long tail=feather", { swim: { vmax: 5.5, acc: 1.3, vcs: 3.5, sprint: 20 } }],
  ["Jack Russell terrier", "Canis familiaris", 7, 38, 8.5, 18, 12, "H=0.3 L=0.36 c=#f6f2ea/#a8683a pat=patches ears=floppy tail=short"],
  ["Beagle", "Canis familiaris", 11, 32, 7.5, 18, 12, "H=0.38 L=0.42 c=#f4efe6/#a86a3a pat=tricolor ears=floppy tail=thin", { endur: 12000 }],
  ["Boxer", "Canis familiaris", 30, 45, 8, 20, 13, "H=0.6 L=0.6 c=#c07a3a/#f6f2ea ears=floppy head=flat tail=short", { heatTol: 1.4, cool: 0.5 }],
  ["Rottweiler", "Canis familiaris", 50, 40, 7, 18, 13, "H=0.64 L=0.72 c=#1c1816/#8a4a28 pat=tan ears=floppy tail=short"],
  ["American Staffordshire (pit-bull)", "Canis familiaris", 25, 42, 8.5, 18, 13, "H=0.47 L=0.55 c=#8a8a90/#f4f2ee ears=rose tail=thin head=broad"],
  ["Dogue allemand", "Canis familiaris", 65, 45, 6.5, 18, 13, "H=0.82 L=0.9 c=#2a2a2e/#3a3a3e ears=floppy tail=thin legs=1.2"],
  ["Saint-bernard", "Canis familiaris", 75, 32, 5.5, 14, 11, "H=0.75 L=0.85 c=#a8582a/#f6f2ea pat=patches ears=floppy fur=long tail=bushy", { heatTol: 1.3, cool: 0.45, cold: true }],
  ["Bouledogue anglais", "Canis familiaris", 24, 24, 5.5, 10, 8, "H=0.36 L=0.45 c=#f2ebe0/#c08a5a pat=patches ears=rose head=flat legs=0.75 tail=bob", { heatTol: 1.0, cool: 0.3, note: "Race brachycéphale : surchauffe très vite." }],
  ["Carlin", "Canis familiaris", 8, 16, 5, 8, 7, "H=0.29 L=0.32 c=#d8c098/#2a2420 pat=mask ears=floppy head=flat legs=0.75 tail=curl", { heatTol: 0.9, cool: 0.3 }],
  ["Chihuahua", "Canis familiaris", 2.5, 24, 7, 10, 8, "H=0.2 L=0.22 c=#e0b880/#f0dcc0 ears=huge tail=thin"],
  ["Teckel", "Canis familiaris", 9, 24, 6.5, 12, 9, "H=0.22 L=0.55 c=#8a4a24/#a05a30 ears=floppy legs=0.5 tail=thin"],
  ["Caniche royal", "Canis familiaris", 25, 48, 8, 20, 14, "H=0.6 L=0.6 c=#f6f4f0/#ffffff fur=curly ears=floppy tail=short"],
  ["Shiba inu", "Canis familiaris", 10, 40, 8, 20, 13, "H=0.4 L=0.45 c=#d0803a/#f4ecdc ears=pointed tail=curl"],
  ["Akita inu", "Canis familiaris", 40, 40, 7, 20, 14, "H=0.66 L=0.72 c=#c88848/#f4ecdc ears=pointed tail=curl fur=long", { cold: true }],
  ["Cane corso", "Canis familiaris", 45, 40, 7, 18, 13, "H=0.66 L=0.72 c=#3a3a3e/#4a4a4e ears=rose tail=thin head=broad"],
  ["Husky croisé de refuge", "Canis familiaris", 24, 44, 7.5, 24, 17, "H=0.56 L=0.65 c=#6a5a50/#e8e0d4 pat=husky ears=pointed tail=curl", { ...SNOW, endur: 25000 }],
]);

// ───────────────────── HYÈNES ET AUTRES CARNIVORES ─────────────────────
add("carni", [
  ["Hyène tachetée", "Crocuta crocuta", 60, 60, 8, 32, 40, "H=0.82 L=1.1 c=#b09a78/#5a4a3a pat=spots slope ears=round tail=short head=hyena", { endur: 18000, pacing: 0.5, note: "Poursuites de 3 km à 40–50 km/h." }],
  ["Hyène rayée", "Hyaena hyaena", 35, 50, 7.5, 24, 22, "H=0.7 L=1.0 c=#b0a690/#2a2420 pat=stripes slope mane=short ears=pointed tail=bushy head=hyena", { endur: 14000 }],
  ["Hyène brune", "Parahyaena brunnea", 42, 50, 7.5, 24, 22, "H=0.75 L=1.05 c=#5a4a3a/#a89878 slope fur=shaggy ears=pointed tail=bushy head=hyena", { endur: 14000 }],
  ["Protèle", "Proteles cristata", 10, 40, 7, 18, 12, "H=0.45 L=0.7 c=#d8c098/#2a2420 pat=stripes slope mane=short ears=pointed tail=bushy"],
  ["Glouton (carcajou)", "Gulo gulo", 15, 48, 6.5, 14, 10, "H=0.4 L=0.8 c=#3a2a20/#a07848 pat=saddle fur=shaggy legs=0.7 tail=bushy head=bear", { ...SNOW }],
  ["Raton laveur", "Procyon lotor", 7, 24, 6, 10, 8, "H=0.3 L=0.55 c=#8a8580/#2a2828 pat=mask tail=ringed head=fox"],
  ["Panda roux", "Ailurus fulgens", 5, 20, 5, 8, 6, "H=0.28 L=0.55 c=#b8501f/#2a1a14 tail=ringed head=fox", { cold: true }],
  ["Loutre d'Europe", "Lutra lutra", 8, 29, 6.5, 10, 8, "H=0.22 L=0.7 c=#5a4030/#a08870 legs=0.6 tail=thick head=otter", { swim: { vmax: 12, acc: 3, vcs: 6, sprint: 20 } }],
  ["Suricate", "Suricata suricatta", 0.7, 32, 9, 12, 8, "H=0.15 L=0.28 c=#c8a880/#7a6a5a pat=stripes tail=thin head=fox", { foot: "desert" }],
  ["Mangouste ichneumon", "Herpestes ichneumon", 3, 32, 8.5, 12, 8, "H=0.2 L=0.55 c=#8a8070/#5a5048 legs=0.7 tail=long head=fox"],
  ["Fossa", "Cryptoprocta ferox", 9, 56, 9, 14, 8, "H=0.37 L=0.75 c=#a86a3a/#d8a878 tail=long head=cat"],
  ["Genette commune", "Genetta genetta", 2, 30, 8, 10, 7, "H=0.2 L=0.5 c=#d8ccb0/#2a2420 pat=spots tail=ringed head=fox legs=0.8"],
  ["Civette africaine", "Civettictis civetta", 12, 30, 7, 12, 8, "H=0.4 L=0.8 c=#c8bca0/#1a1816 pat=blotches tail=ringed head=fox"],
  ["Blaireau européen", "Meles meles", 12, 30, 6, 10, 8, "H=0.3 L=0.75 c=#8a8880/#f4f2ee pat=badger legs=0.55 tail=short head=badger"],
  ["Ratel (blaireau à miel)", "Mellivora capensis", 10, 30, 6, 10, 8, "H=0.28 L=0.72 c=#1c1a18/#d8d8d4 pat=ratel legs=0.55 tail=short head=badger"],
  ["Mouffette rayée", "Mephitis mephitis", 3, 16, 5, 7, 6, "H=0.18 L=0.4 c=#1a1818/#f4f4f2 pat=skunk tail=bushy head=fox legs=0.6"],
  ["Coati roux", "Nasua nasua", 5, 27, 6.5, 10, 8, "H=0.3 L=0.55 c=#a86a3a/#d8b890 tail=ringed head=fox"],
]);

// ───────────────────────── BOVINS ─────────────────────────
add("bovin", [
  ["Vache Holstein", "Bos taurus", 650, 25, 3, 10, 18, "H=1.45 L=1.7 c=#f6f4f0/#1a1818 pat=holstein horns=none udder"],
  ["Vache charolaise", "Bos taurus", 800, 25, 2.8, 10, 18, "H=1.4 L=1.75 c=#f2ead8/#e8dcc4 horns=small"],
  ["Vache limousine", "Bos taurus", 700, 30, 3.2, 11, 18, "H=1.4 L=1.7 c=#b8682a/#d8a070 horns=small"],
  ["Vache Highland", "Bos taurus", 550, 28, 3.2, 11, 18, "H=1.2 L=1.5 c=#b8682a/#c88048 fur=shaggy horns=wide", { cold: true }],
  ["Taureau charolais", "Bos taurus", 1100, 30, 3, 11, 18, "H=1.55 L=1.9 c=#f2ead8/#e8dcc4 horns=short hump=low"],
  ["Taureau de combat (toro bravo)", "Bos taurus", 500, 55, 6, 18, 10, "H=1.35 L=1.6 c=#1c1816/#2a2420 horns=forward hump=low", { pacing: 0.15 }],
  ["Bison d'Amérique", "Bison bison", 700, 56, 6, 24, 25, "H=1.8 L=2.2 c=#5a3a24/#3a2818 hump=big fur=shaggy beard horns=bison head=bison", { cold: true, endur: 9000 }],
  ["Bison d'Europe", "Bison bonasus", 600, 50, 5.5, 22, 22, "H=1.8 L=2.1 c=#6a4a30/#4a3420 hump=big fur=shaggy horns=bison head=bison", { cold: true, endur: 8000 }],
  ["Buffle d'Afrique", "Syncerus caffer", 650, 56, 5.8, 22, 20, "H=1.5 L=2.0 c=#2a2420/#3a322a horns=buffalo", { endur: 8000 }],
  ["Buffle d'eau", "Bubalus bubalis", 600, 30, 3.5, 12, 18, "H=1.5 L=1.9 c=#3a3634/#4a4440 horns=sweep", { swim: { vmax: 4, acc: 0.8, vcs: 2.5, sprint: 20 } }],
  ["Yack", "Bos grunniens", 550, 40, 4.5, 16, 15, "H=1.6 L=1.8 c=#2a2420/#4a3a30 fur=shaggy hump=low horns=wide", { cold: true, foot: "snow" }],
  ["Zébu", "Bos indicus", 450, 40, 4.5, 15, 14, "H=1.4 L=1.6 c=#d8d0c4/#a89888 hump=zebu horns=small dewlap", { heatTol: 2.5, cool: 0.8 }],
  ["Gaur", "Bos gaurus", 900, 56, 5.5, 20, 18, "H=1.9 L=2.4 c=#2a1c14/#f0e8d8 socks horns=wide hump=low"],
  ["Banteng", "Bos javanicus", 700, 40, 4.5, 16, 15, "H=1.6 L=2.0 c=#8a4a24/#f4f0e8 socks horns=small"],
  ["Watusi (Ankole)", "Bos taurus", 500, 30, 3.5, 12, 18, "H=1.5 L=1.7 c=#8a3a1c/#a84a24 horns=huge"],
  ["Bœuf musqué", "Ovibos moschatus", 300, 60, 6, 20, 15, "H=1.3 L=1.9 c=#3a2a20/#c8b090 fur=shaggy horns=musk legs=0.8", { cold: true, foot: "snow" }],
]);

// ───────────────────────── ÉQUIDÉS ─────────────────────────
add("equide", [
  ["Pur-sang anglais", "Equus caballus", 500, 70, 7, 44, 60, "H=1.62 L=1.6 c=#6a3a1c/#2a1a10 socks", { strideF: 2.3, note: "Record : 70,76 km/h sur 2 furlongs (402 m). Mile en ~1:33." }],
  ["Quarter horse", "Equus caballus", 520, 85, 8.5, 40, 18, "H=1.5 L=1.55 c=#8a4a24/#2a1a10", { strideF: 2.4, note: "Le plus rapide sur 400 m (~21 s)." }],
  ["Pur-sang arabe", "Equus caballus", 420, 65, 6.5, 46, 35, "H=1.5 L=1.45 c=#c8c4bc/#8a8680 tail=horsehigh", { endur: 28000, heatTol: 2.6, note: "Courses d'endurance de 160 km en une journée." }],
  ["Akhal-Teke", "Equus caballus", 450, 65, 6.8, 46, 35, "H=1.58 L=1.5 c=#c8a050/#a07830 sheen", { endur: 24000, heatTol: 2.6 }],
  ["Trotteur français", "Equus caballus", 480, 53, 5.5, 44, 50, "H=1.6 L=1.6 c=#5a3018/#2a1a10", { gait: "trot", note: "Course au trot attelé : galop interdit." }],
  ["Standardbred (trotteur américain)", "Equus caballus", 470, 54, 5.6, 44, 50, "H=1.55 L=1.55 c=#4a2a18/#2a1a10", { gait: "pace", note: "Ambleur : il trotte en déplaçant les deux jambes d'un même côté." }],
  ["Frison", "Equus caballus", 650, 50, 5.5, 32, 25, "H=1.65 L=1.65 c=#141212/#1c1a1a mane=long feathers"],
  ["Lusitanien", "Equus caballus", 500, 55, 6, 36, 28, "H=1.6 L=1.55 c=#d8d4cc/#b0aca4"],
  ["Appaloosa", "Equus caballus", 480, 60, 6.5, 38, 28, "H=1.5 L=1.5 c=#f2eee6/#5a3a24 pat=appaloosa"],
  ["Mustang", "Equus ferus caballus", 400, 60, 6.5, 38, 30, "H=1.45 L=1.45 c=#a8683a/#2a1a10", { endur: 18000 }],
  ["Camargue", "Equus caballus", 350, 50, 6, 34, 25, "H=1.4 L=1.4 c=#e8e6e2/#c8c6c2", { foot: "hoof" }],
  ["Percheron (cheval de trait)", "Equus caballus", 900, 35, 3.8, 22, 20, "H=1.7 L=1.8 c=#5a5a5c/#8a8a8c feathers legs=0.95"],
  ["Shetland (poney)", "Equus caballus", 200, 35, 5, 22, 20, "H=1.0 L=1.1 c=#5a3a24/#2a1a10 fur=shaggy mane=long legs=0.8"],
  ["Cheval de Przewalski", "Equus ferus przewalskii", 300, 60, 6.5, 38, 28, "H=1.3 L=1.4 c=#c89a60/#4a3020 mane=brush socks", { endur: 16000 }],
  ["Mule", "Equus asinus × E. caballus", 400, 45, 5, 28, 25, "H=1.5 L=1.5 c=#5a3a24/#a08060 ears=long mane=brush tail=tuft", { endur: 20000, heatTol: 2.6 }],
  ["Âne", "Equus asinus", 250, 35, 4.5, 20, 20, "H=1.15 L=1.2 c=#8a8580/#e8e4e0 ears=long mane=brush tail=tuft muzzle", { endur: 20000, heatTol: 3, note: "Très économe en eau et en énergie." }],
  ["Baudet du Poitou", "Equus asinus", 400, 30, 4, 18, 18, "H=1.45 L=1.4 c=#3a2a20/#c8b8a8 ears=long fur=shaggy tail=tuft muzzle", { endur: 16000 }],
  ["Onagre", "Equus hemionus onager", 230, 70, 7, 40, 30, "H=1.25 L=1.3 c=#d0ac78/#f6f2ea ears=long mane=brush tail=tuft", { endur: 20000, heatTol: 3 }],
  ["Kiang", "Equus kiang", 300, 60, 6.5, 38, 28, "H=1.4 L=1.4 c=#a86a3a/#f6f2ea ears=long mane=brush tail=tuft", { cold: true, endur: 18000 }],
  ["Âne sauvage de Somalie", "Equus africanus somaliensis", 250, 70, 7, 38, 28, "H=1.3 L=1.3 c=#b8b4b0/#f4f2ee pat=legstripes ears=long mane=brush tail=tuft", { heatTol: 3 }],
  ["Zèbre des plaines", "Equus quagga", 300, 64, 6.5, 35, 30, "H=1.35 L=1.4 c=#f6f4f0/#141212 pat=zebra mane=brush tail=tuft", { endur: 12000 }],
  ["Zèbre de Grévy", "Equus grevyi", 400, 64, 6.2, 35, 30, "H=1.5 L=1.5 c=#f6f4f0/#141212 pat=zebrafine mane=brush ears=big tail=tuft"],
  ["Zèbre de montagne", "Equus zebra", 300, 55, 6, 32, 26, "H=1.3 L=1.35 c=#f2eee6/#141212 pat=zebra mane=brush tail=tuft dewlap"],
]);

// ───────────────────────── GRANDS HERBIVORES ─────────────────────────
add("lourd", [
  ["Éléphant d'Afrique de savane", "Loxodonta africana", 6000, 25, 1.8, 12, 20, "H=3.2 L=2.8 c=#8a8480/#9a948e head=elephant ears=elephant trunk tusks legs=1.0", { note: "Ne galope jamais : allure « ambulée » rapide (Hutchinson 2003)." , swim: { vmax: 2.5, acc: 0.3, vcs: 2, sprint: 30 } }],
  ["Éléphant de forêt d'Afrique", "Loxodonta cyclotis", 2700, 25, 2, 12, 20, "H=2.4 L=2.3 c=#6a6460/#7a7470 head=elephant ears=elephantr trunk tusks=straight", { swim: { vmax: 2.5, acc: 0.3, vcs: 2, sprint: 30 } }],
  ["Éléphant d'Asie", "Elephas maximus", 4000, 25, 1.9, 12, 20, "H=2.75 L=2.5 c=#7a706a/#a08a80 head=elephantasia ears=small trunk legs=0.95", { swim: { vmax: 2.5, acc: 0.3, vcs: 2, sprint: 30 } }],
  ["Rhinocéros noir", "Diceros bicornis", 1100, 55, 5, 25, 15, "H=1.6 L=2.6 c=#6a6460/#7a7470 head=rhino horns=rhino2 ears=pointed", { gait: "rotary", foot: "hoof" }],
  ["Rhinocéros blanc", "Ceratotherium simum", 2300, 50, 4.2, 22, 15, "H=1.8 L=3.2 c=#8a8480/#9a948e head=rhinowide horns=rhino2 ears=pointed hump=low", { gait: "rotary", foot: "hoof" }],
  ["Rhinocéros indien", "Rhinoceros unicornis", 2200, 48, 4, 20, 14, "H=1.8 L=3.0 c=#7a706a/#8a8078 head=rhino horns=rhino1 armor ears=pointed", { gait: "rotary", foot: "hoof" }],
  ["Rhinocéros de Sumatra", "Dicerorhinus sumatrensis", 700, 40, 4, 16, 12, "H=1.3 L=2.3 c=#6a4a30/#7a5a40 head=rhino horns=rhino2 fur=shaggy", { gait: "rotary", foot: "hoof" }],
  ["Hippopotame", "Hippopotamus amphibius", 1500, 30, 3.5, 10, 10, "H=1.5 L=3.0 c=#7a6868/#d89a8a head=hippo legs=0.55 ears=small tail=short", { gait: "trot", heatTol: 1.2, cool: 0.3, swim: { vmax: 8, acc: 1, vcs: 5, sprint: 20 }, note: "Course au trot rapide, sans phase de vol complète." }],
  ["Hippopotame nain", "Choeropsis liberiensis", 250, 25, 3.5, 9, 10, "H=0.8 L=1.6 c=#3a3434/#6a5a58 head=hippo legs=0.6 ears=small tail=short", { gait: "trot", heatTol: 1.2, cool: 0.3 }],
  ["Girafe réticulée", "Giraffa reticulata", 1100, 60, 4.5, 16, 25, "H=3.0 L=1.8 c=#b8682a/#f6efe0 pat=reticulated neck=giraffe head=giraffe horns=ossicones legs=1.6 slope tail=tuft", { gait: "rotary", foot: "hoof", swim: { vmax: 2, acc: 0.3, vcs: 1.5, sprint: 10 } }],
  ["Girafe Masaï", "Giraffa tippelskirchi", 1200, 60, 4.4, 16, 25, "H=3.1 L=1.85 c=#8a4a24/#f2e8d4 pat=masai neck=giraffe head=giraffe horns=ossicones legs=1.6 slope tail=tuft", { gait: "rotary", foot: "hoof" }],
  ["Girafe de Rothschild", "Giraffa camelopardalis rothschildi", 1150, 58, 4.4, 16, 25, "H=3.1 L=1.85 c=#a86a3a/#efe2c8 pat=giraffe socks neck=giraffe head=giraffe horns=ossicones legs=1.6 slope tail=tuft", { gait: "rotary", foot: "hoof" }],
  ["Okapi", "Okapia johnstoni", 250, 50, 5.5, 18, 15, "H=1.55 L=1.6 c=#3a1c14/#f4f0e8 pat=okapi head=giraffe horns=ossicones neck=medium slope", { gait: "transverse", foot: "hoof" }],
  ["Dromadaire", "Camelus dromedarius", 500, 65, 4, 32, 40, "H=1.9 L=1.7 c=#c89a60/#d8b080 hump neck=camel head=camel legs=1.45 tail=tuft", { gait: "pace", foot: "pad", endur: 40000, heatTol: 6, cool: 0.6, note: "Supporte 6 °C de variation de température corporelle." }],
  ["Dromadaire de course", "Camelus dromedarius", 450, 65, 4.3, 36, 45, "H=1.9 L=1.65 c=#d8b080/#e8c898 hump neck=camel head=camel legs=1.5 tail=tuft", { gait: "pace", foot: "pad", endur: 40000, heatTol: 6, cool: 0.6, pacing: 0.55, note: "Courses de 10 km en ~17 min (Émirats)." }],
  ["Chameau de Bactriane", "Camelus bactrianus", 600, 65, 3.8, 28, 35, "H=1.9 L=1.8 c=#8a6038/#a07848 hump=2 fur=shaggy neck=camel head=camel legs=1.35 tail=tuft", { gait: "pace", foot: "pad", endur: 35000, heatTol: 5, cold: true }],
  ["Lama", "Lama glama", 150, 56, 5.5, 26, 22, "H=1.15 L=1.2 c=#f2ece0/#7a5030 pat=patches neck=lama head=camel ears=banana fur=long legs=1.2 tail=short", { gait: "pace", foot: "pad", cold: true }],
  ["Alpaga", "Vicugna pacos", 65, 40, 5, 22, 18, "H=0.9 L=0.95 c=#e8dcc4/#f4ecdc neck=lama head=camel ears=banana fur=curly legs=1.1 tail=short", { gait: "pace", foot: "pad", cold: true }],
  ["Guanaco", "Lama guanicoe", 120, 56, 6, 28, 22, "H=1.15 L=1.2 c=#b8784a/#f4ece0 neck=lama head=camel ears=banana legs=1.25 tail=short", { gait: "pace", foot: "pad", cold: true, endur: 16000 }],
  ["Vigogne", "Vicugna vicugna", 50, 47, 6, 26, 20, "H=0.9 L=0.9 c=#c88a4a/#f6f0e4 neck=lama head=camel ears=banana legs=1.3 tail=short", { gait: "pace", foot: "pad", cold: true }],
  ["Tapir d'Amérique", "Tapirus terrestris", 250, 40, 4.5, 14, 12, "H=1.0 L=1.9 c=#4a3a32/#5a4a40 head=tapir legs=0.8 ears=round tail=short", { gait: "transverse", foot: "hoof", swim: { vmax: 5, acc: 1, vcs: 3, sprint: 20 } }],
  ["Tapir de Malaisie", "Tapirus indicus", 320, 40, 4.3, 14, 12, "H=1.05 L=2.0 c=#1c1a1a/#f2f0ec pat=saddlewhite head=tapir legs=0.8 ears=round tail=short", { gait: "transverse", foot: "hoof" }],
]);

// ───────────────────────── CERVIDÉS ET ANTILOPES ─────────────────────────
add("cervide", [
  ["Cerf élaphe", "Cervus elaphus", 190, 65, 6.5, 32, 25, "H=1.3 L=1.6 c=#8a5a34/#c8a880 antlers=red rump", { swim: { vmax: 5, acc: 1, vcs: 3, sprint: 20 } }],
  ["Biche (cerf élaphe femelle)", "Cervus elaphus", 110, 65, 6.8, 32, 25, "H=1.15 L=1.4 c=#9a6a40/#d0b088 rump"],
  ["Wapiti", "Cervus canadensis", 320, 70, 6.2, 34, 28, "H=1.5 L=1.9 c=#a07850/#5a3a24 antlers=elk rump mane=short", { cold: true }],
  ["Cerf de Virginie", "Odocoileus virginianus", 70, 64, 7.5, 30, 22, "H=0.95 L=1.25 c=#a8784a/#f4f0e8 antlers=whitetail tail=flag", { swim: { vmax: 6, acc: 1.2, vcs: 4, sprint: 20 } }],
  ["Cerf mulet", "Odocoileus hemionus", 80, 60, 7, 30, 22, "H=1.0 L=1.3 c=#8a7a6a/#f0ece4 antlers=mule ears=big rump", { gait: "bound", note: "Bondit sur les quatre pattes (« stotting »)." }],
  ["Chevreuil", "Capreolus capreolus", 25, 60, 8, 26, 18, "H=0.7 L=0.95 c=#a05a30/#f4f0e8 antlers=roe rump"],
  ["Daim", "Dama dama", 60, 60, 7.5, 28, 20, "H=0.9 L=1.3 c=#b8783a/#f6f0e4 pat=spots antlers=fallow tail=short"],
  ["Cerf axis (chital)", "Axis axis", 60, 65, 7.5, 28, 20, "H=0.9 L=1.3 c=#c07a3a/#f8f4ec pat=spots antlers=red"],
  ["Cerf sika", "Cervus nippon", 50, 60, 7.5, 28, 20, "H=0.85 L=1.2 c=#8a5a3a/#e8dcc8 pat=spots antlers=red rump"],
  ["Muntjac", "Muntiacus reevesi", 14, 40, 7.5, 18, 12, "H=0.48 L=0.8 c=#a8603a/#e8c8a8 antlers=small slope"],
  ["Élan (orignal)", "Alces alces", 450, 56, 4.5, 32, 30, "H=1.9 L=2.4 c=#3a2a20/#8a7a6a antlers=moose head=moose dewlap legs=1.25 hump=low", { ...SNOW, swim: { vmax: 9, acc: 1.2, vcs: 6, sprint: 25 }, note: "Excellent nageur : 9 km/h dans l'eau." }],
  ["Renne", "Rangifer tarandus", 100, 60, 6.5, 32, 26, "H=1.1 L=1.5 c=#8a7a68/#ece8e0 antlers=caribou fur=long mane=short", { ...SNOW, endur: 30000, swim: { vmax: 6, acc: 1, vcs: 4, sprint: 20 } }],
  ["Caribou des bois", "Rangifer tarandus caribou", 130, 80, 7, 36, 30, "H=1.2 L=1.6 c=#6a5040/#f0ece4 antlers=caribou fur=long mane=short", { ...SNOW, endur: 35000, note: "Migrations de plus de 5 000 km par an." }],
  ["Antilope d'Amérique (pronghorn)", "Antilocapra americana", 50, 88, 7.5, 50, 55, "H=0.9 L=1.3 c=#c88a4a/#f8f4ec pat=pronghorn horns=pronghorn rump", { endur: 25000, pacing: 0.5, strideF: 3.3, note: "Tient 56 km/h sur 6 km (Lindstedt 1991)." }],
  ["Gazelle de Thomson", "Eudorcas thomsonii", 25, 80, 7.5, 35, 20, "H=0.65 L=0.9 c=#c89058/#f8f4ec pat=sideband horns=gazelle legs=1.2 tail=short"],
  ["Gazelle de Grant", "Nanger granti", 60, 75, 7.2, 35, 22, "H=0.85 L=1.1 c=#d0a068/#f8f4ec horns=lyre rump legs=1.2"],
  ["Gazelle dorcas", "Gazella dorcas", 18, 70, 7.5, 32, 20, "H=0.6 L=0.85 c=#d8b080/#f8f4ec pat=sideband horns=gazelle legs=1.25", { foot: "desert", heatTol: 3 }],
  ["Springbok", "Antidorcas marsupialis", 40, 88, 8, 40, 25, "H=0.8 L=1.1 c=#c8884a/#f8f6f0 pat=sideband horns=lyre legs=1.2", { note: "Bonds (« pronking ») jusqu'à 3,5 m de haut." }],
  ["Impala", "Aepyceros melampus", 55, 80, 8, 35, 25, "H=0.9 L=1.2 c=#b8703a/#f8f4ec pat=impala horns=impala legs=1.2"],
  ["Gnou bleu", "Connochaetes taurinus", 230, 80, 6, 32, 30, "H=1.35 L=1.9 c=#5a5a5e/#3a3a3c pat=brindle horns=gnu beard mane=short slope head=gnu", { endur: 25000, note: "Migration du Serengeti : plus de 1 000 km." }],
  ["Gnou à queue blanche", "Connochaetes gnou", 160, 80, 6.5, 32, 28, "H=1.15 L=1.8 c=#3a3028/#f6f2ea horns=gnu2 beard mane=brush head=gnu tail=horse", { endur: 20000 }],
  ["Antilope cervicapre", "Antilope cervicapra", 38, 80, 7.8, 35, 22, "H=0.8 L=1.1 c=#2a2420/#f8f4ec pat=blackbuck horns=spiral"],
  ["Topi (damalisque)", "Damaliscus lunatus", 120, 80, 7, 38, 30, "H=1.2 L=1.6 c=#8a4a28/#4a3a3c pat=topi horns=lyreshort slope", { endur: 18000 }],
  ["Bubale roux", "Alcelaphus buselaphus", 150, 70, 6.8, 38, 30, "H=1.25 L=1.8 c=#b87a48/#e0c098 horns=hartebeest slope head=gnu", { endur: 18000 }],
  ["Oryx gazelle", "Oryx gazella", 200, 60, 6, 30, 25, "H=1.2 L=1.7 c=#b8a890/#f6f4f0 pat=oryx horns=oryx", { foot: "desert", heatTol: 4 }],
  ["Oryx d'Arabie", "Oryx leucoryx", 70, 60, 6.5, 30, 25, "H=0.85 L=1.4 c=#f6f2ea/#3a3028 pat=oryxlight horns=oryx", { foot: "desert", heatTol: 4 }],
  ["Grand koudou", "Tragelaphus strepsiceros", 250, 60, 6, 28, 22, "H=1.45 L=2.0 c=#a08a70/#f6f2ea pat=kudu horns=kudu beard ears=big"],
  ["Éland du Cap", "Taurotragus oryx", 600, 55, 4.8, 26, 22, "H=1.6 L=2.4 c=#c0985a/#f0e4d0 pat=kudu horns=eland dewlap hump=low"],
  ["Nilgaut", "Boselaphus tragocamelus", 200, 48, 5.5, 25, 20, "H=1.4 L=1.9 c=#6a7078/#f6f2ea horns=small beard slope"],
  ["Saïga", "Saiga tatarica", 40, 80, 7.5, 35, 25, "H=0.75 L=1.2 c=#d8c098/#f6f0e4 head=saiga horns=saiga", { cold: true, endur: 18000 }],
  ["Chamois", "Rupicapra rupicapra", 35, 50, 7, 25, 18, "H=0.78 L=1.15 c=#6a5038/#f0e8dc pat=chamois horns=hook", { foot: "snow", cold: true }],
  ["Bouquetin des Alpes", "Capra ibex", 90, 40, 6, 20, 16, "H=0.9 L=1.4 c=#8a7a68/#c8b8a8 horns=ibex beard", { foot: "snow", cold: true }],
  ["Mouflon", "Ovis gmelini musimon", 40, 50, 7, 24, 18, "H=0.75 L=1.2 c=#8a5030/#f4f0e8 pat=saddlewhite horns=curl"],
  ["Mouton domestique", "Ovis aries", 70, 35, 5, 16, 14, "H=0.75 L=1.1 c=#efe8da/#2a2420 fur=curly head=sheep ears=side", { cold: true }],
  ["Chèvre domestique", "Capra hircus", 50, 32, 5.5, 16, 14, "H=0.7 L=0.9 c=#f2eee6/#8a6a4a horns=goat beard ears=side"],
  ["Dik-dik", "Madoqua kirkii", 5, 42, 8, 18, 12, "H=0.38 L=0.55 c=#a08a70/#e8dcc8 horns=tiny legs=1.1 head=saiga"],
  ["Antilope rouanne", "Hippotragus equinus", 250, 57, 5.8, 28, 22, "H=1.45 L=2.0 c=#a8805a/#2a2420 pat=mask horns=sable mane=short ears=big"],
  ["Hippotrague noir", "Hippotragus niger", 230, 57, 5.8, 28, 22, "H=1.35 L=1.9 c=#1c1616/#f6f2ea pat=mask horns=sable mane=short"],
  ["Cobe à croissant", "Kobus ellipsiprymnus", 220, 50, 5.6, 25, 20, "H=1.25 L=1.8 c=#6a5a4a/#f4f0e8 pat=ring horns=waterbuck fur=shaggy"],
  ["Bongo", "Tragelaphus eurycerus", 300, 45, 5.2, 22, 18, "H=1.2 L=1.9 c=#a8401c/#f6f2ea pat=kudu horns=kudu ears=big"],
]);

// ───────────────────── SUIDÉS ET AUTRES ONGULÉS ─────────────────────
add("suide", [
  ["Sanglier", "Sus scrofa", 90, 48, 6.5, 18, 14, "H=0.85 L=1.3 c=#3a2e26/#5a4a3c fur=shaggy mane=short tusks=boar", { swim: { vmax: 5, acc: 1, vcs: 3, sprint: 20 } }],
  ["Phacochère", "Phacochoerus africanus", 75, 55, 7, 20, 14, "H=0.7 L=1.2 c=#6a5a50/#8a7a70 mane=short tusks=wart tail=tuftup head=warthog"],
  ["Cochon domestique", "Sus domesticus", 120, 17, 3.5, 8, 10, "H=0.75 L=1.3 c=#f0c4b4/#f8d4c4 ears=floppy tail=curl", { heatTol: 1.0, cool: 0.25 }],
  ["Cochon vietnamien", "Sus domesticus", 60, 16, 3.5, 8, 9, "H=0.5 L=0.9 c=#2a2626/#3a3434 ears=pointed tail=thin belly legs=0.7", { heatTol: 1.0, cool: 0.25 }],
  ["Pécari à collier", "Pecari tajacu", 22, 35, 6, 14, 10, "H=0.5 L=0.9 c=#4a4440/#d8d0c4 pat=collar fur=shaggy"],
  ["Hylochère", "Hylochoerus meinertzhageni", 200, 40, 5, 15, 12, "H=1.0 L=1.6 c=#2a2420/#3a3430 fur=shaggy tusks=boar"],
  ["Babiroussa", "Babyrousa celebensis", 90, 35, 5, 14, 12, "H=0.75 L=1.1 c=#8a7a70/#a09088 tusks=babirusa"],
]);

// ───────────────────────── PRIMATES ─────────────────────────
add("primate", [
  ["Chimpanzé", "Pan troglodytes", 55, 40, 7, 12, 10, "H=0.85 L=0.75 c=#2a2420/#d8b8a0 face", { biped: false, note: "Galop quadrupède en appui sur les phalanges." }],
  ["Bonobo", "Pan paniscus", 40, 35, 6.5, 11, 10, "H=0.75 L=0.7 c=#1c1816/#3a2a24 face"],
  ["Gorille des plaines", "Gorilla gorilla", 170, 35, 5.5, 10, 9, "H=1.25 L=0.95 c=#2a2828/#3a3838 face=gorilla silverback"],
  ["Gorille des montagnes", "Gorilla beringei beringei", 160, 32, 5.2, 9, 9, "H=1.2 L=0.95 c=#1c1a1a/#2a2828 face=gorilla fur=long silverback", { cold: true }],
  ["Orang-outan", "Pongo pygmaeus", 75, 8, 2.5, 4, 8, "H=0.9 L=0.8 c=#b05a24/#c86a30 face fur=long arms=long", { note: "Arboricole : très lent au sol." }],
  ["Babouin chacma", "Papio ursinus", 30, 45, 8, 16, 12, "H=0.65 L=0.8 c=#5a5450/#8a8078 head=baboon tail=baboon arms=normal", { endur: 6000 }],
  ["Babouin olive", "Papio anubis", 25, 45, 8, 16, 12, "H=0.6 L=0.78 c=#6a6448/#8a8468 head=baboon tail=baboon arms=normal mane=short", { endur: 6000 }],
  ["Babouin hamadryas", "Papio hamadryas", 20, 43, 8, 15, 12, "H=0.55 L=0.7 c=#c8c4bc/#d8a0a0 head=baboon tail=baboon arms=normal mane=cape"],
  ["Mandrill", "Mandrillus sphinx", 30, 40, 7.5, 14, 11, "H=0.6 L=0.75 c=#4a4a38/#d83020 head=mandrill tail=bob arms=normal"],
  ["Singe patas", "Erythrocebus patas", 12, 55, 9, 18, 12, "H=0.6 L=0.6 c=#c0602a/#f0e8dc legs=1.4 tail=long arms=normal head=monkey", { note: "Le primate le plus rapide." }],
  ["Vervet", "Chlorocebus pygerythrus", 5, 40, 8.5, 14, 10, "H=0.35 L=0.45 c=#8a8a70/#f0ece4 head=monkey tail=long arms=normal"],
  ["Macaque rhésus", "Macaca mulatta", 8, 32, 7.5, 12, 9, "H=0.4 L=0.5 c=#a08a68/#d8a090 head=monkey tail=short arms=normal"],
  ["Macaque japonais", "Macaca fuscata", 11, 30, 7, 12, 9, "H=0.45 L=0.55 c=#a8a098/#e08080 head=monkey tail=bob arms=normal fur=long", { cold: true }],
  ["Gélada", "Theropithecus gelada", 18, 40, 7.5, 14, 10, "H=0.55 L=0.7 c=#8a6a48/#c84040 head=baboon tail=long arms=normal mane=cape", { cold: true }],
  ["Capucin", "Cebus capucinus", 3, 30, 8, 10, 8, "H=0.28 L=0.4 c=#1c1a1a/#f4ece0 head=monkey tail=long arms=normal"],
  ["Lémur catta", "Lemur catta", 2.5, 20, 7, 9, 7, "H=0.28 L=0.42 c=#a8a8a8/#f4f4f4 head=lemur tail=ringedlong arms=normal"],
  ["Ouistiti", "Callithrix jacchus", 0.35, 15, 7, 6, 6, "H=0.12 L=0.2 c=#8a8278/#f4f2ee head=monkey tail=ringedlong tufts arms=normal"],
  ["Gibbon à mains blanches", "Hylobates lar", 6, 12, 5, 6, 6, "H=0.5 L=0.4 c=#2a2420/#f4f2ee face arms=huge", { plan: "human", biped: true, gait: "biped", note: "Marche et court debout au sol, bras levés." }],
]);

// ───────────────────────── MARSUPIAUX ─────────────────────────
add("marsu", [
  ["Kangourou roux", "Osphranter rufus", 85, 70, 6, 30, 25, "H=1.5 L=0.9 c=#c0602a/#f0e4d8", { strideF: 2.6, endur: 25000, note: "Le saut stocke l'énergie dans les tendons : très économe." }],
  ["Kangourou gris de l'Est", "Macropus giganteus", 66, 64, 6, 28, 24, "H=1.4 L=0.85 c=#8a8078/#e0d8d0", { strideF: 2.6, endur: 22000 }],
  ["Kangourou gris de l'Ouest", "Macropus fuliginosus", 54, 60, 6, 27, 22, "H=1.3 L=0.8 c=#7a6050/#d8c8b8", { strideF: 2.7 }],
  ["Wallaroo", "Osphranter robustus", 40, 50, 6, 24, 20, "H=1.1 L=0.7 c=#3a3434/#6a6060"],
  ["Wallaby de Bennett", "Notamacropus rufogriseus", 18, 48, 6.5, 22, 16, "H=0.8 L=0.55 c=#8a7a70/#e0d0c4", { cold: true }],
  ["Wallaby agile", "Notamacropus agilis", 16, 48, 6.8, 22, 16, "H=0.75 L=0.5 c=#c8a070/#f0e4d0"],
  ["Quokka", "Setonix brachyurus", 3, 32, 7, 14, 10, "H=0.35 L=0.35 c=#8a7060/#b8a090 ears=round tail=thin"],
  ["Wombat commun", "Vombatus ursinus", 30, 40, 6, 14, 10, "H=0.35 L=0.9 c=#6a5a50/#7a6a60 ears=small tail=none head=wombat legs=0.6", { plan: "quad", gait: "rotary", spine: 0.4 }],
  ["Koala", "Phascolarctos cinereus", 9, 10, 3.5, 5, 6, "H=0.3 L=0.55 c=#8a8a88/#e8e4e0 ears=koala tail=none head=koala", { plan: "quad", gait: "bound", spine: 0.4 }],
  ["Diable de Tasmanie", "Sarcophilus harrisii", 8, 25, 6, 13, 10, "H=0.3 L=0.6 c=#1a1818/#f4f2ee pat=chestband ears=round tail=thick head=bear", { plan: "quad", gait: "bound", spine: 0.5, endur: 10000 }],
  ["Opossum de Virginie", "Didelphis virginiana", 3, 7, 3, 4, 6, "H=0.2 L=0.45 c=#a8a8a8/#f2f2f2 ears=round tail=thin head=rodent", { plan: "quad", gait: "trot", spine: 0.3 }],
]);

// ───────────────────────── OURS ─────────────────────────
add("ours", [
  ["Ours brun d'Europe", "Ursus arctos arctos", 250, 50, 6, 15, 10, "H=1.0 L=1.8 c=#5a3a24/#6a4a30 fur=long hump=low", { swim: { vmax: 6, acc: 1, vcs: 3.5, sprint: 20 } }],
  ["Grizzly", "Ursus arctos horribilis", 300, 56, 6.5, 16, 10, "H=1.05 L=1.9 c=#7a5a3a/#b09070 fur=long hump=big", { swim: { vmax: 6, acc: 1, vcs: 3.5, sprint: 20 } }],
  ["Ours kodiak", "Ursus arctos middendorffi", 500, 48, 5.5, 14, 9, "H=1.3 L=2.3 c=#5a3a24/#7a5a3a fur=long hump=big", { cold: true, swim: { vmax: 6, acc: 1, vcs: 3.5, sprint: 20 } }],
  ["Ours polaire", "Ursus maritimus", 450, 40, 5, 10, 8, "H=1.3 L=2.2 c=#f2eee2/#fbf8ee fur=long neck=medium head=polar", { ...SNOW, cool: 0.2, heatTol: 1.0, swim: { vmax: 10, acc: 1.5, vcs: 6.5, sprint: 30 }, note: "Surchauffe vite à la course ; excellent nageur." }],
  ["Ours noir américain", "Ursus americanus", 120, 50, 6.5, 15, 10, "H=0.85 L=1.5 c=#1c1a1a/#8a6a50 fur=long", { swim: { vmax: 5, acc: 1, vcs: 3, sprint: 20 } }],
  ["Panda géant", "Ailuropoda melanoleuca", 100, 32, 4, 8, 6, "H=0.75 L=1.4 c=#f6f4ee/#1a1818 pat=panda ears=round", { cold: true, recov: 0.7 }],
  ["Ours à lunettes", "Tremarctos ornatus", 120, 30, 5, 10, 8, "H=0.8 L=1.5 c=#1c1a1a/#e8d8b0 pat=spectacled"],
  ["Ours malais", "Helarctos malayanus", 50, 48, 7, 13, 9, "H=0.65 L=1.2 c=#1c1a1a/#e0a050 pat=chestband ears=small"],
  ["Ours lippu", "Melursus ursinus", 110, 50, 6.5, 13, 9, "H=0.85 L=1.6 c=#1c1a1a/#f4f2ee pat=chestband fur=shaggy"],
  ["Ours noir d'Asie", "Ursus thibetanus", 120, 40, 6, 12, 9, "H=0.85 L=1.5 c=#1c1a1a/#f4f2ee pat=chestband ears=big", { cold: true }],
]);

// ───────────────────────── PETITS MAMMIFÈRES ─────────────────────────
add("petit", [
  ["Lapin de garenne", "Oryctolagus cuniculus", 1.6, 50, 9, 15, 8, "H=0.18 L=0.35 c=#8a7a68/#e8e0d4 ears=long tail=pom head=rabbit legs=hind", { gait: "halfbound" }],
  ["Lapin domestique", "Oryctolagus cuniculus", 2.5, 38, 8, 12, 7, "H=0.2 L=0.4 c=#f6f4f0/#d8c8b8 ears=long tail=pom head=rabbit legs=hind", { gait: "halfbound" }],
  ["Lapin bélier", "Oryctolagus cuniculus", 3, 32, 7, 10, 7, "H=0.2 L=0.42 c=#c8a070/#f0e4d0 ears=lop tail=pom head=rabbit legs=hind", { gait: "halfbound" }],
  ["Lièvre d'Europe", "Lepus europaeus", 4, 70, 9, 25, 15, "H=0.3 L=0.55 c=#a8805a/#f0e8dc ears=hare tail=pom head=rabbit legs=hindlong", { gait: "halfbound", endur: 6000, strideF: 4 }],
  ["Lièvre de Californie (jackrabbit)", "Lepus californicus", 3, 70, 9, 25, 15, "H=0.32 L=0.5 c=#a89070/#f0e8dc ears=huge tail=pom head=rabbit legs=hindlong", { gait: "halfbound", endur: 6000, foot: "desert" }],
  ["Lièvre arctique", "Lepus arcticus", 4.5, 64, 8.5, 22, 14, "H=0.32 L=0.55 c=#f8f6f2/#ffffff ears=hare tail=pom head=rabbit legs=hindlong", { gait: "halfbound", ...SNOW }],
  ["Lièvre variable", "Lepus timidus", 3.5, 60, 8.5, 22, 14, "H=0.3 L=0.52 c=#e8e4dc/#ffffff ears=hare tail=pom head=rabbit legs=hindlong", { gait: "halfbound", ...SNOW }],
  ["Écureuil roux", "Sciurus vulgaris", 0.3, 20, 8, 8, 6, "H=0.1 L=0.2 c=#b8501f/#f4ece0 tufts tail=squirrel head=rodent legs=hind"],
  ["Écureuil gris", "Sciurus carolinensis", 0.5, 32, 8.5, 10, 6, "H=0.11 L=0.24 c=#8a8a88/#f0ece8 tail=squirrel head=rodent legs=hind"],
  ["Tamia rayé", "Tamias striatus", 0.1, 21, 8, 8, 5, "H=0.06 L=0.13 c=#a8704a/#2a2420 pat=chipmunk tail=squirrel head=rodent"],
  ["Rat brun", "Rattus norvegicus", 0.35, 13, 6, 6, 6, "H=0.08 L=0.22 c=#7a6a5a/#b8aca0 tail=rat head=rodent", { swim: { vmax: 2.5, acc: 1, vcs: 1.5, sprint: 20 } }],
  ["Souris domestique", "Mus musculus", 0.02, 13, 7, 5, 5, "H=0.035 L=0.08 c=#8a8278/#c8c0b8 tail=rat ears=big head=rodent", { strideF: 9 }],
  ["Hamster doré", "Mesocricetus auratus", 0.13, 6, 4, 3, 5, "H=0.05 L=0.15 c=#d8a060/#f6f0e4 tail=none ears=round head=rodent legs=0.7"],
  ["Cochon d'Inde", "Cavia porcellus", 1, 9, 4.5, 4, 5, "H=0.08 L=0.25 c=#d8a060/#f6f4f0 pat=patches tail=none ears=round head=rodent legs=0.6"],
  ["Chinchilla", "Chinchilla lanigera", 0.6, 20, 7, 8, 6, "H=0.1 L=0.25 c=#a8a8a8/#f0f0f0 tail=squirrel ears=big head=rodent legs=hind", { cold: true }],
  ["Gerboise", "Jaculus jaculus", 0.06, 24, 8, 10, 6, "H=0.07 L=0.1 c=#d8b888/#f8f4ec ears=big tail=jerboa head=rodent", { plan: "hop", gait: "hop", foot: "desert" }],
  ["Hérisson d'Europe", "Erinaceus europaeus", 1, 7, 3, 3, 6, "H=0.1 L=0.25 c=#8a7a68/#d8ccb8 quills tail=none head=hedgehog legs=0.5", { gait: "trot" }],
  ["Marmotte des Alpes", "Marmota marmota", 5, 16, 5, 7, 6, "H=0.2 L=0.5 c=#8a6a48/#c8a880 tail=bushy head=rodent legs=0.6", { cold: true }],
  ["Castor d'Europe", "Castor fiber", 20, 8, 2.5, 4, 6, "H=0.25 L=0.8 c=#6a4428/#8a6040 tail=beaver head=rodent legs=0.5", { gait: "trot", swim: { vmax: 8, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Porc-épic", "Hystrix cristata", 15, 7, 2.5, 4, 6, "H=0.3 L=0.7 c=#2a2420/#f4f2ee quills=long tail=short head=rodent legs=0.6", { gait: "trot" }],
  ["Tatou à neuf bandes", "Dasypus novemcinctus", 5, 30, 6, 10, 7, "H=0.18 L=0.45 c=#b8a898/#d0c0b0 shell=armadillo tail=rat head=armadillo legs=0.6", { gait: "trot" }],
  ["Furet", "Mustela furo", 1, 24, 7, 10, 7, "H=0.1 L=0.4 c=#d8c8a8/#2a2420 pat=mask tail=thick head=otter legs=0.5"],
  ["Belette", "Mustela nivalis", 0.1, 24, 8, 10, 6, "H=0.05 L=0.2 c=#a86a3a/#f6f2ea pat=belly tail=thin head=otter legs=0.5"],
  ["Hermine", "Mustela erminea", 0.25, 32, 8.5, 12, 7, "H=0.07 L=0.25 c=#a86a3a/#f6f2ea pat=belly tail=thin head=otter legs=0.5", { cold: true }],
  ["Taupe d'Europe", "Talpa europaea", 0.1, 4, 2.5, 2, 5, "H=0.04 L=0.14 c=#2a2626/#3a3434 tail=none head=mole legs=0.4", { gait: "trot" }],
  ["Musaraigne", "Sorex araneus", 0.01, 8, 6, 4, 5, "H=0.025 L=0.07 c=#4a3a30/#a89078 tail=rat head=mole legs=0.6", { strideF: 10 }],
  ["Capybara", "Hydrochoerus hydrochaeris", 50, 35, 5, 14, 12, "H=0.55 L=1.1 c=#8a5a34/#9a6a40 tail=none ears=small head=capybara legs=0.8", { gait: "transverse", swim: { vmax: 8, acc: 1.5, vcs: 4, sprint: 20 } }],
  ["Mara (lièvre de Patagonie)", "Dolichotis patagonum", 8, 45, 8, 18, 12, "H=0.45 L=0.6 c=#8a7a68/#f4f0e8 ears=big tail=none head=rodent legs=1.4", { gait: "halfbound" }],
  ["Agouti", "Dasyprocta punctata", 3, 30, 7.5, 12, 8, "H=0.25 L=0.5 c=#a8703a/#c08848 ears=round tail=none head=rodent legs=1.1"],
  ["Chien de prairie", "Cynomys ludovicianus", 1, 20, 7, 8, 6, "H=0.12 L=0.3 c=#c8a070/#f0e4d0 tail=short ears=small head=rodent legs=0.6"],
  ["Lemming", "Lemmus lemmus", 0.08, 8, 5, 4, 5, "H=0.04 L=0.12 c=#a07040/#2a2420 tail=none ears=small head=rodent legs=0.5", { cold: true }],
]);

// ───────────────────────── OISEAUX COUREURS ─────────────────────────
add("ratite", [
  ["Autruche", "Struthio camelus", 115, 70, 7, 50, 40, "H=1.25 L=0.9 c=#1c1a1a/#f4efe6 neck=ostrich head=ostrich legs=ostrich wings=plume", { strideF: 2.0, heatTol: 3, note: "Foulée de 5 m ; tient 50 km/h pendant une demi-heure." }],
  ["Autruche de Somalie", "Struthio molybdophanes", 105, 70, 7, 50, 40, "H=1.25 L=0.9 c=#1c1a1a/#f4efe6 neck=ostrichblue head=ostrich legs=ostrich wings=plume", { strideF: 2.0, heatTol: 3 }],
  ["Émeu", "Dromaius novaehollandiae", 40, 50, 5.5, 30, 20, "H=1.0 L=0.75 c=#5a4a3c/#3a2e26 neck=emu head=emu legs=emu fur=shaggy", { strideF: 2.4 }],
  ["Casoar à casque", "Casuarius casuarius", 60, 50, 6, 26, 18, "H=1.05 L=0.85 c=#141212/#2058c0 neck=cassowary head=cassowary casque legs=emu fur=shaggy", { strideF: 2.3 }],
  ["Nandou d'Amérique", "Rhea americana", 25, 60, 6.5, 32, 22, "H=0.9 L=0.7 c=#a8a49c/#5a5650 neck=rhea head=emu legs=emu wings=plume", { strideF: 2.6 }],
  ["Nandou de Darwin", "Rhea pennata", 20, 60, 6.5, 30, 22, "H=0.8 L=0.6 c=#8a8278/#f0ece4 pat=dots neck=rhea head=emu legs=emu wings=plume", { cold: true }],
  ["Grand géocoucou (roadrunner)", "Geococcyx californianus", 0.3, 32, 8, 14, 10, "H=0.18 L=0.22 c=#6a5a48/#d8ccb8 pat=dots neck=short head=roadrunner legs=bird tail=bird crest", { foot: "desert" }],
  ["Dindon sauvage", "Meleagris gallopavo", 8, 40, 6.5, 16, 12, "H=0.55 L=0.5 c=#3a2e28/#8a4a30 neck=turkey head=turkey legs=bird tail=fan"],
  ["Poule", "Gallus gallus domesticus", 2, 14, 5, 6, 6, "H=0.3 L=0.3 c=#a8582a/#d87a3a neck=short head=chicken legs=bird tail=chicken"],
  ["Faisan de Colchide", "Phasianus colchicus", 1.2, 16, 6, 8, 6, "H=0.28 L=0.3 c=#8a3a1c/#1e5a3a neck=short head=chicken legs=bird tail=long"],
  ["Pintade de Numidie", "Numida meleagris", 1.3, 30, 7, 12, 8, "H=0.3 L=0.3 c=#3a3a42/#f4f4f4 pat=dots neck=short head=guineafowl legs=bird tail=bob"],
  ["Kiwi", "Apteryx mantelli", 2.5, 10, 4, 5, 6, "H=0.25 L=0.35 c=#6a5038/#8a6a4a neck=none head=kiwi legs=bird fur=shaggy"],
  ["Serpentaire", "Sagittarius serpentarius", 4, 30, 7, 14, 10, "H=0.75 L=0.4 c=#c8c8c4/#1a1818 neck=medium head=raptor legs=ostrich crest tail=long", { fly: { vmax: 50, acc: 4, vcs: 35, sprint: 20, flap: 3 } }],
  ["Manchot empereur", "Aptenodytes forsteri", 30, 3, 1, 2, 6, "H=0.9 L=0.4 c=#141418/#f8f8f4 neck=none head=penguin legs=penguin wings=flipper", { cat: "aquatiques", cold: true, foot: "snow", swim: { vmax: 12, acc: 2, vcs: 8, sprint: 30, beat: 1.5 }, note: "Sur la glace il se déplace à ~3 km/h ou glisse sur le ventre." }],
  ["Manchot papou", "Pygoscelis papua", 6, 5, 1.5, 3, 6, "H=0.6 L=0.3 c=#1c1c22/#f8f8f4 neck=none head=penguin legs=penguin wings=flipper", { cat: "aquatiques", cold: true, swim: { vmax: 36, acc: 5, vcs: 12, sprint: 20, beat: 2.5 }, note: "Le plus rapide des manchots sous l'eau." }],
]);

// ───────────────────────── OISEAUX VOLANTS ─────────────────────────
// Vitesses en vol horizontal battu (pas en piqué). Au sol : marche ou petits sauts.
function flyer(vmax, acc, vcs, sprint, flap, land = 5) {
  return { fly: { vmax, acc, vcs, sprint, flap }, landV: land };
}
add("oiseau", [
  ["Faucon pèlerin", "Falco peregrinus", 0.9, 4, 3, 2, 6, "wing=falcon c=#5a6068/#f0ece4 pat=barred head=falcon", { ...flyer(110, 9, 60, 30, 4.5), note: "389 km/h en piqué (record), ~110 km/h en vol horizontal." }],
  ["Faucon gerfaut", "Falco rusticolus", 1.5, 4, 3, 2, 6, "wing=falcon c=#e8e4dc/#5a5a5c pat=barred head=falcon", { ...flyer(105, 8, 60, 30, 4), cold: true }],
  ["Faucon crécerelle", "Falco tinnunculus", 0.2, 4, 3, 2, 6, "wing=falcon c=#b8683a/#e8dcc8 pat=dots head=falcon", flyer(60, 7, 40, 20, 6) ],
  ["Aigle royal", "Aquila chrysaetos", 5, 5, 3, 2, 6, "wing=eagle c=#5a3a24/#c8a060 head=eagle", { ...flyer(80, 5, 50, 25, 2.5), note: "Jusqu'à 240 km/h en piqué ; ~50–80 km/h en vol battu." }],
  ["Pygargue à tête blanche", "Haliaeetus leucocephalus", 5, 5, 3, 2, 6, "wing=eagle c=#3a2a20/#f8f8f4 pat=whitehead head=eagle", flyer(70, 5, 48, 25, 2.5)],
  ["Aigle de Bonelli", "Aquila fasciata", 2.3, 5, 3, 2, 6, "wing=eagle c=#6a4a30/#f0ece4 head=eagle", flyer(80, 6, 50, 25, 3)],
  ["Buse variable", "Buteo buteo", 1, 4, 3, 2, 6, "wing=eagle c=#6a4a30/#e8dcc8 pat=barred head=eagle", flyer(55, 5, 40, 20, 3)],
  ["Milan royal", "Milvus milvus", 1.1, 4, 3, 2, 6, "wing=eagle c=#a8502a/#d8d4cc head=eagle tail=fork", flyer(55, 5, 40, 20, 2.8)],
  ["Pigeon voyageur", "Columba livia domestica", 0.45, 6, 3, 3, 6, "wing=pigeon c=#7a8090/#4a6a5a head=pigeon", { ...flyer(110, 7, 78, 60, 6), endur: 60000, note: "Concours de 500 km à 80–90 km/h de moyenne." }],
  ["Pigeon biset", "Columba livia", 0.35, 6, 3, 3, 6, "wing=pigeon c=#8a90a0/#4a6a5a head=pigeon", flyer(75, 7, 55, 40, 6)],
  ["Pigeon ramier", "Columba palumbus", 0.5, 6, 3, 3, 6, "wing=pigeon c=#8a8a98/#f4f4f4 head=pigeon", flyer(70, 6.5, 55, 40, 5.5)],
  ["Grand corbeau", "Corvus corax", 1.2, 8, 4, 3, 6, "wing=crow c=#141418/#202028 head=crow", flyer(60, 5, 40, 25, 3.5)],
  ["Corneille noire", "Corvus corone", 0.5, 8, 4, 3, 6, "wing=crow c=#18181c/#22222a head=crow", flyer(50, 5, 35, 20, 4)],
  ["Pie bavarde", "Pica pica", 0.2, 8, 4, 3, 6, "wing=crow c=#141418/#f8f8f4 pat=magpie head=crow tail=long", flyer(40, 5, 30, 15, 5)],
  ["Ara macao", "Ara macao", 1, 3, 2, 1.5, 6, "wing=parrot c=#d81e1e/#f0c020 head=parrot tail=long wingc=#1a50c0", flyer(56, 5, 40, 25, 4)],
  ["Ara bleu", "Ara ararauna", 1.1, 3, 2, 1.5, 6, "wing=parrot c=#1a70d0/#f0c020 head=parrot tail=long", flyer(56, 5, 40, 25, 4)],
  ["Perroquet gris du Gabon", "Psittacus erithacus", 0.45, 3, 2, 1.5, 6, "wing=parrot c=#9a9aa0/#c81e1e head=parrot tail=short", flyer(60, 5.5, 42, 25, 5)],
  ["Perruche ondulée", "Melopsittacus undulatus", 0.035, 3, 2, 1.5, 6, "wing=parrot c=#5ac030/#f0e040 pat=barred head=parrot tail=long", flyer(40, 6, 30, 20, 14)],
  ["Martinet noir", "Apus apus", 0.045, 0.5, 1, 0.3, 6, "wing=swift c=#2a2626/#3a3434 head=swift tail=fork", { ...flyer(111, 10, 40, 20, 8), landV: 0.5, note: "111 km/h mesuré en vol battu (Henningsson 2010)." }],
  ["Hirondelle rustique", "Hirundo rustica", 0.02, 2, 2, 1, 6, "wing=swift c=#1a2a5a/#f0d8c0 head=swift tail=fork", flyer(60, 9, 40, 20, 10)],
  ["Colibri d'Anna", "Calypte anna", 0.0045, 0.5, 1, 0.3, 6, "wing=humming c=#2a8a4a/#d82060 head=humming", { ...flyer(50, 12, 35, 15, 50), landV: 0.3 }],
  ["Canard colvert", "Anas platyrhynchos", 1.1, 6, 3, 3, 6, "wing=duck c=#8a7058/#1e6a3a head=duck", { ...flyer(75, 5, 60, 40, 6), swim: { vmax: 4, acc: 1, vcs: 2.5, sprint: 20 } }],
  ["Eider à duvet", "Somateria mollissima", 2, 6, 3, 3, 6, "wing=duck c=#f4f4f0/#1a1818 head=duck", { ...flyer(76, 5, 60, 40, 5.5), swim: { vmax: 4, acc: 1, vcs: 2.5, sprint: 20 }, cold: true }],
  ["Oie cendrée", "Anser anser", 3.5, 8, 3, 4, 6, "wing=goose c=#8a8278/#f0ece4 head=goose neck=medium", { ...flyer(80, 4.5, 60, 45, 4), endur: 60000, swim: { vmax: 4, acc: 1, vcs: 2.5, sprint: 20 } }],
  ["Bernache du Canada", "Branta canadensis", 4, 8, 3, 4, 6, "wing=goose c=#6a5a48/#1a1818 pat=whitecheek head=goose neck=medium", { ...flyer(80, 4.5, 60, 45, 4), endur: 60000 }],
  ["Cygne tuberculé", "Cygnus olor", 11, 8, 2.5, 4, 6, "wing=goose c=#f8f8f4/#ffffff head=swan neck=swan", { ...flyer(80, 3, 55, 35, 3), swim: { vmax: 5, acc: 0.8, vcs: 3, sprint: 20 } }],
  ["Albatros hurleur", "Diomedea exulans", 9, 4, 2, 2, 6, "wing=albatross c=#f8f8f4/#3a3a3a head=gull", { ...flyer(100, 3, 60, 40, 1.5), endur: 200000, note: "Plane plusieurs milliers de km sans battre des ailes." }],
  ["Goéland argenté", "Larus argentatus", 1, 6, 3, 3, 6, "wing=gull c=#f4f4f2/#8a9098 head=gull", { ...flyer(55, 5, 40, 25, 3.5), swim: { vmax: 3, acc: 1, vcs: 2, sprint: 20 } }],
  ["Chouette effraie", "Tyto alba", 0.3, 4, 3, 2, 6, "wing=owl c=#d8b880/#f8f4ec head=barnowl", flyer(45, 5, 30, 15, 3.5)],
  ["Grand-duc d'Europe", "Bubo bubo", 2.5, 4, 3, 2, 6, "wing=owl c=#8a6a48/#d8b888 pat=barred head=owl tufts", flyer(65, 5, 40, 20, 3)],
  ["Moineau domestique", "Passer domesticus", 0.03, 4, 3, 2, 6, "wing=small c=#8a6a48/#a8a8a0 head=small", flyer(45, 8, 32, 15, 13)],
  ["Étourneau sansonnet", "Sturnus vulgaris", 0.08, 5, 3, 2, 6, "wing=small c=#1e2a2a/#d8c8a0 pat=dots head=small", flyer(75, 8, 55, 30, 10)],
  ["Héron cendré", "Ardea cinerea", 1.5, 8, 3, 4, 6, "wing=heron c=#9aa0a8/#f4f4f4 head=heron neck=heron legs=heron", flyer(45, 3.5, 35, 20, 2.3)],
  ["Pélican blanc", "Pelecanus onocrotalus", 9, 6, 2.5, 3, 6, "wing=albatross c=#f8f0f0/#1a1818 head=pelican neck=medium", { ...flyer(56, 3, 40, 25, 2), swim: { vmax: 4, acc: 1, vcs: 2.5, sprint: 20 } }],
  ["Flamant rose", "Phoenicopterus roseus", 3, 8, 3, 4, 6, "wing=heron c=#f4a0b0/#f8c0c8 head=flamingo neck=heron legs=heron wingc=#1a1818", flyer(55, 4, 45, 30, 3)],
  ["Cigogne blanche", "Ciconia ciconia", 3.5, 8, 3, 4, 6, "wing=heron c=#f8f8f4/#1a1818 head=stork neck=medium legs=heron", { ...flyer(45, 3, 35, 25, 2), endur: 100000 }],
  ["Frégate superbe", "Fregata magnificens", 1.5, 2, 2, 1, 6, "wing=albatross c=#141418/#d81e1e head=gull tail=fork", flyer(60, 4, 40, 25, 2)],
]);
// Les oiseaux volants : au sol, quelques km/h en marchant ou sautillant.
for (const sp of SPECIES) {
  if (sp.fam === "oiseau") {
    sp.vmax = sp.landV ?? sp.vmax;
    sp.acc = 3; sp.vcs = sp.vmax * 0.5; sp.sprint = 6; sp.gait = "biped"; sp.flyer = true;
  }
}

// ───────────────────────── REPTILES ─────────────────────────
add("reptile", [
  ["Crocodile du Nil", "Crocodylus niloticus", 400, 17, 4, 4, 4, "H=0.4 L=3.5 c=#5a6040/#c8c098 head=croc legs=0.8 armor", { plan: "croc", topt: 30, swim: { vmax: 30, acc: 4, vcs: 8, sprint: 8 }, note: "Peut galoper sur de courtes distances." }],
  ["Crocodile marin", "Crocodylus porosus", 600, 15, 3.5, 4, 4, "H=0.45 L=4.2 c=#4a5038/#d8d0a8 head=croc legs=0.8 armor", { plan: "croc", topt: 30, swim: { vmax: 29, acc: 4, vcs: 8, sprint: 8 } }],
  ["Crocodile de Johnston", "Crocodylus johnstoni", 40, 17, 5, 4, 4, "H=0.22 L=1.8 c=#6a6448/#d8d0a8 head=gharial legs=0.9 armor", { plan: "croc", gait: "bound", topt: 30, swim: { vmax: 20, acc: 4, vcs: 6, sprint: 8 }, note: "Galop observé (Webb & Gans 1982)." }],
  ["Alligator d'Amérique", "Alligator mississippiensis", 300, 18, 4, 4, 4, "H=0.38 L=3.2 c=#2a2c24/#c8c4a8 head=gator legs=0.8 armor", { plan: "croc", topt: 30, swim: { vmax: 30, acc: 4, vcs: 8, sprint: 8 } }],
  ["Caïman à lunettes", "Caiman crocodilus", 40, 15, 4.5, 4, 4, "H=0.22 L=1.8 c=#5a5a40/#d8d0a8 head=gator legs=0.85 armor", { plan: "croc", topt: 30, swim: { vmax: 20, acc: 3.5, vcs: 6, sprint: 8 } }],
  ["Gavial du Gange", "Gavialis gangeticus", 500, 6, 2, 2, 3, "H=0.35 L=4.0 c=#5a6048/#d0c8a0 head=gharial legs=0.6 armor", { plan: "croc", topt: 30, swim: { vmax: 25, acc: 3.5, vcs: 8, sprint: 8 } }],
  ["Varan de Komodo", "Varanus komodoensis", 80, 20, 4, 5, 5, "H=0.4 L=2.2 c=#6a6048/#8a8060 head=monitor legs=1.0", { endur: 2500, recov: 0.7, swim: { vmax: 4, acc: 1, vcs: 2, sprint: 10 } }],
  ["Varan du Nil", "Varanus niloticus", 15, 25, 5, 5, 5, "H=0.22 L=1.4 c=#3a3a28/#d8c860 pat=dots head=monitor", { swim: { vmax: 5, acc: 1, vcs: 2.5, sprint: 10 } }],
  ["Iguane vert", "Iguana iguana", 5, 30, 6, 4, 4, "H=0.16 L=0.9 c=#5a9a3a/#8ab860 head=iguana crest tail=lizardlong", { swim: { vmax: 4, acc: 1, vcs: 2, sprint: 10 } }],
  ["Iguane noir (cténosaure)", "Ctenosaura similis", 1, 35, 8, 5, 4, "H=0.1 L=0.5 c=#3a3a34/#a8a898 pat=bands head=iguana crest tail=lizardlong", { note: "Le lézard le plus rapide mesuré : 34,6 km/h." }],
  ["Basilic commun", "Basiliscus basiliscus", 0.2, 11, 7, 3, 3, "H=0.07 L=0.2 c=#7a6a3a/#d8c880 pat=stripes head=iguana crest tail=lizardlong", { biped: true, swim: { vmax: 5.4, acc: 4, vcs: 1, sprint: 3 }, note: "Court debout, y compris sur l'eau (« lézard Jésus-Christ »)." }],
  ["Lézard à collerette", "Chlamydosaurus kingii", 0.6, 20, 7, 4, 4, "H=0.1 L=0.3 c=#8a6a48/#c88848 head=frill tail=lizardlong", { biped: true }],
  ["Lézard des murailles", "Podarcis muralis", 0.008, 7, 6, 2, 3, "H=0.02 L=0.07 c=#6a6a48/#8a9060 pat=dots head=lizard tail=lizardlong"],
  ["Lézard vert", "Lacerta bilineata", 0.04, 10, 6, 2, 3, "H=0.03 L=0.12 c=#4ab030/#8ad050 head=lizard tail=lizardlong"],
  ["Dragon barbu (pogona)", "Pogona vitticeps", 0.4, 14, 5, 3, 3, "H=0.07 L=0.25 c=#c8a060/#d8b878 head=bearded"],
  ["Gecko léopard", "Eublepharis macularius", 0.06, 5, 3, 1.5, 3, "H=0.03 L=0.12 c=#e8d060/#3a3028 pat=dots head=gecko tail=thick", { topt: 30 }],
  ["Caméléon panthère", "Furcifer pardalis", 0.15, 1, 0.8, 0.5, 3, "H=0.07 L=0.18 c=#3ab060/#e03050 pat=bands head=chameleon tail=curlz", { gait: "walk" }],
  ["Monstre de Gila", "Heloderma suspectum", 2, 2.4, 1.5, 1, 3, "H=0.07 L=0.35 c=#e07a50/#2a2020 pat=blotches head=gila tail=thick legs=0.7", { gait: "walk" }],
  ["Tortue d'Hermann", "Testudo hermanni", 1.5, 0.5, 0.3, 0.3, 30, "H=0.08 L=0.18 c=#c8a040/#3a3020 head=turtle", { plan: "turtle", gait: "walk", note: "~0,3 à 0,5 km/h." }],
  ["Tortue géante des Galápagos", "Chelonoidis niger", 250, 0.3, 0.1, 0.25, 60, "H=0.6 L=1.2 c=#3a3830/#4a4840 head=turtle legs=1.0", { plan: "turtle", gait: "walk", topt: 28 }],
  ["Tortue verte", "Chelonia mydas", 150, 1, 0.4, 0.4, 10, "H=0.3 L=1.0 c=#5a6a40/#d8c890 head=turtle flippers", { plan: "turtle", gait: "walk", cat: "reptiles", swim: { vmax: 35, acc: 3, vcs: 6, sprint: 15, beat: 1 } }],
  ["Tortue luth", "Dermochelys coriacea", 500, 1, 0.3, 0.4, 10, "H=0.4 L=1.6 c=#2a2a2e/#f0f0f0 pat=dots head=turtle flippers ridges", { plan: "turtle", gait: "walk", ecto: false, swim: { vmax: 35, acc: 2.5, vcs: 7, sprint: 15, beat: 0.8 } }],
  ["Mamba noir", "Dendroaspis polylepis", 1.6, 20, 5, 6, 5, "L=2.5 c=#5a5a50/#a8a898 head=snake", { plan: "snake", gait: "serpentine", note: "Le serpent le plus rapide : ~16–20 km/h en pointe." }],
  ["Crotale cornu (sidewinder)", "Crotalus cerastes", 0.2, 29, 5, 6, 5, "L=0.6 c=#d8c098/#8a7058 pat=blotches head=viper", { plan: "snake", gait: "sidewind", foot: "desert", topt: 35 }],
  ["Couleuvre agile (racer)", "Coluber constrictor", 0.6, 13, 4.5, 5, 5, "L=1.3 c=#2a2c34/#d8d8d0 head=snake", { plan: "snake", gait: "serpentine" }],
  ["Cobra royal", "Ophiophagus hannah", 6, 12, 4, 4, 5, "L=4.0 c=#5a5838/#d8c880 pat=bands head=cobra", { plan: "snake", gait: "serpentine" }],
  ["Python réticulé", "Malayopython reticulatus", 75, 1.6, 0.5, 1, 5, "L=6.0 c=#8a7048/#2a2418 pat=reticulated head=python", { plan: "snake", gait: "rectilinear", swim: { vmax: 3, acc: 0.5, vcs: 1.5, sprint: 10 } }],
  ["Anaconda vert", "Eunectes murinus", 90, 8, 1.5, 2, 5, "L=5.0 c=#4a5a30/#1a1a10 pat=dots head=python", { plan: "snake", gait: "serpentine", swim: { vmax: 16, acc: 2, vcs: 5, sprint: 10 } }],
]);

// ───────────────────────── ANIMAUX AQUATIQUES ─────────────────────────
// Sur la piste, les cétacés et les poissons ne peuvent pas avancer : choisir le terrain « Eau ».
function swimmer(vmax, acc, vcs, sprint, beat) { return { swim: { vmax, acc, vcs, sprint, beat } }; }
add("marin", [
  ["Dauphin commun", "Delphinus delphis", 100, null, 0, 0, 0, "body=dolphin L=2.2 c=#3a4250/#f0f0f0 pat=hourglass", { ...swimmer(60, 6, 20, 15, 3), note: "Ne peut pas se déplacer hors de l'eau." }],
  ["Grand dauphin", "Tursiops truncatus", 300, null, 0, 0, 0, "body=dolphin L=3.0 c=#7a8490/#d8dce0", swimmer(35, 4.5, 15, 15, 2.5)],
  ["Orque", "Orcinus orca", 5000, null, 0, 0, 0, "body=orca L=7.5 c=#141418/#f8f8f8 pat=orca", { ...swimmer(56, 3, 15, 15, 1.2), note: "Pointes à 56 km/h." }],
  ["Marsouin de Dall", "Phocoenoides dalli", 150, null, 0, 0, 0, "body=dolphin L=2.0 c=#141418/#f8f8f8 pat=dall", swimmer(55, 6, 20, 15, 3)],
  ["Baleine à bosse", "Megaptera novaeangliae", 30000, null, 0, 0, 0, "body=whale L=14 c=#2a2e36/#e8e8e8 flippers=long", swimmer(27, 0.8, 8, 15, 0.4)],
  ["Baleine bleue", "Balaenoptera musculus", 140000, null, 0, 0, 0, "body=whale L=25 c=#5a6a7a/#8a9aa8", swimmer(33, 0.5, 15, 15, 0.25)],
  ["Cachalot", "Physeter macrocephalus", 40000, null, 0, 0, 0, "body=sperm L=16 c=#3a3838/#5a5858", swimmer(37, 0.7, 10, 15, 0.4)],
  ["Phoque commun", "Phoca vitulina", 100, 5, 1.5, 2, 5, "body=seal L=1.6 c=#8a8a80/#5a5a54 pat=dots", { plan: "pinniped", ...swimmer(35, 4, 9, 15, 2), note: "Sur la terre, il ondule sur le ventre." }],
  ["Phoque gris", "Halichoerus grypus", 200, 5, 1.2, 2, 5, "body=seal L=2.2 c=#6a6a68/#a8a8a0 pat=blotches", { plan: "pinniped", ...swimmer(30, 3.5, 8, 15, 1.8) }],
  ["Otarie de Californie", "Zalophus californianus", 250, 20, 4, 6, 8, "body=sealion L=2.2 c=#5a4030/#7a5a40", { plan: "pinniped", gait: "gallop", ...swimmer(40, 5, 15, 15, 2), note: "Galope sur ses quatre nageoires à terre." }],
  ["Otarie à fourrure", "Arctocephalus pusillus", 60, 22, 4.5, 6, 8, "body=sealion L=1.6 c=#4a3a30/#6a5444", { plan: "pinniped", gait: "gallop", ...swimmer(30, 5, 12, 15, 2.2) }],
  ["Morse", "Odobenus rosmarus", 1000, 3, 0.8, 1.5, 5, "body=walrus L=3.0 c=#a87060/#c89080 tusks", { plan: "pinniped", cold: true, ...swimmer(35, 2.5, 7, 15, 1.2) }],
  ["Éléphant de mer du Sud", "Mirounga leonina", 2500, 8, 1, 2, 5, "body=seal L=4.5 c=#6a5a4c/#8a7a6a nose", { plan: "pinniped", ...swimmer(25, 2, 7, 15, 1) }],
  ["Loutre de mer", "Enhydra lutris", 30, 3, 1.5, 1.5, 5, "body=otter L=1.3 c=#4a3428/#c8b8a0", { plan: "pinniped", ...swimmer(9, 2, 5, 15, 2) }],
  ["Lamantin", "Trichechus manatus", 500, null, 0, 0, 0, "body=manatee L=3.2 c=#7a7a78/#8a8a88", swimmer(25, 1, 8, 15, 0.6)],
  ["Thon rouge", "Thunnus thynnus", 250, null, 0, 0, 0, "body=tuna L=2.0 c=#1a2a5a/#d8dce4", { ...swimmer(70, 6, 25, 20, 6), ecto: false, note: "Poisson à sang « chaud » : endurance exceptionnelle." }],
  ["Espadon", "Xiphias gladius", 400, null, 0, 0, 0, "body=sword L=3.0 c=#3a3a50/#c8c8d0", { ...swimmer(80, 5, 20, 15, 4), note: "Vitesse de pointe discutée (estimations de 60 à 100 km/h)." }],
  ["Voilier de l'Indo-Pacifique", "Istiophorus platypterus", 60, null, 0, 0, 0, "body=sail L=2.5 c=#1a3a7a/#d8dce8", { ...swimmer(80, 7, 20, 10, 5), note: "Vitesse de pointe discutée ; mesures récentes plus basses." }],
  ["Requin mako", "Isurus oxyrinchus", 300, null, 0, 0, 0, "body=shark L=3.0 c=#3a5a8a/#f0f0f0", swimmer(70, 6, 20, 15, 2.5)],
  ["Grand requin blanc", "Carcharodon carcharias", 1100, null, 0, 0, 0, "body=shark L=4.5 c=#5a6068/#f4f4f4", swimmer(40, 3, 10, 15, 1.2)],
  ["Requin-baleine", "Rhincodon typus", 15000, null, 0, 0, 0, "body=shark L=10 c=#3a4a5a/#f0f0f0 pat=dots", swimmer(5, 0.3, 3, 20, 0.3)],
  ["Barracuda", "Sphyraena barracuda", 20, null, 0, 0, 0, "body=fish L=1.5 c=#8a9aa8/#e8ecf0 pat=bars", swimmer(43, 8, 10, 8, 4)],
  ["Saumon atlantique", "Salmo salar", 5, null, 0, 0, 0, "body=fish L=0.8 c=#6a7a8a/#e8e4e0 pat=dots", { ...swimmer(30, 6, 10, 15, 5), ecto: true, topt: 14 }],
  ["Truite fario", "Salmo trutta", 2, null, 0, 0, 0, "body=fish L=0.5 c=#8a7a48/#e8dcc0 pat=dots", { ...swimmer(25, 6, 8, 12, 6), ecto: true, topt: 14 }],
  ["Hippocampe", "Hippocampus erectus", 0.02, null, 0, 0, 0, "body=seahorse L=0.15 c=#e0a040/#f0c060", { ...swimmer(0.015, 0.01, 0.01, 10, 30), ecto: true, topt: 24, note: "Le poisson le plus lent : ~1,5 m/h." }],
  ["Poisson-clown", "Amphiprion ocellaris", 0.01, null, 0, 0, 0, "body=fish L=0.09 c=#f07020/#f8f8f8 pat=clown", { ...swimmer(2.5, 2, 1, 10, 8), ecto: true, topt: 26 }],
]);

// ───────────────────────── INSECTES ─────────────────────────
add("insecte", [
  ["Fourmi rousse des bois", "Formica rufa", 0.00001, 0.11, 0.5, 0.09, 30, "L=0.009 c=#8a2a14/#1a0e0a body=ant", { strideF: 12 }],
  ["Fourmi argentée du Sahara", "Cataglyphis bombycina", 0.00001, 3.1, 4, 2.5, 30, "L=0.01 c=#d8d4c8/#e8e4dc body=ant legs=1.4", { foot: "desert", topt: 46, strideF: 40, note: "0,85 m/s, sur un sol à plus de 50 °C." }],
  ["Fourmi charpentière", "Camponotus herculeanus", 0.00002, 0.2, 0.5, 0.15, 30, "L=0.014 c=#1a1414/#3a2420 body=ant"],
  ["Fourmi de feu", "Solenopsis invicta", 0.000003, 0.1, 0.5, 0.08, 30, "L=0.004 c=#a8401c/#3a1a10 body=ant"],
  ["Cicindèle (scarabée-tigre)", "Cicindela hudsoni", 0.0001, 9, 8, 6, 20, "L=0.02 c=#1e6a5a/#3ab08a body=beetle legs=1.4", { topt: 34, strideF: 23, note: "2,5 m/s : 171 longueurs de corps par seconde." }],
  ["Scarabée bousier", "Scarabaeus sacer", 0.003, 0.4, 1, 0.3, 20, "L=0.03 c=#141414/#2a2a2a body=beetle", { fly: { vmax: 15, acc: 4, vcs: 10, sprint: 20, flap: 90 } }],
  ["Lucane cerf-volant", "Lucanus cervus", 0.006, 0.5, 1, 0.3, 20, "L=0.07 c=#3a1c14/#5a2a1c body=stag", { fly: { vmax: 10, acc: 3, vcs: 7, sprint: 20, flap: 50 } }],
  ["Hanneton commun", "Melolontha melolontha", 0.001, 0.3, 1, 0.2, 20, "L=0.03 c=#8a4a24/#3a3028 body=beetle", { fly: { vmax: 10, acc: 3, vcs: 8, sprint: 20, flap: 50 } }],
  ["Coccinelle à sept points", "Coccinella septempunctata", 0.00004, 0.4, 1, 0.3, 20, "L=0.007 c=#d81e1e/#141414 pat=dots body=ladybug", { fly: { vmax: 24, acc: 6, vcs: 15, sprint: 20, flap: 85 } }],
  ["Criquet pèlerin", "Schistocerca gregaria", 0.002, 2.5, 4, 1, 15, "L=0.06 c=#c8a040/#8a6a30 body=locust", { gait: "jump", fly: { vmax: 20, acc: 4, vcs: 16, sprint: 30, flap: 20 }, note: "Les essaims parcourent 100 km par jour." }],
  ["Sauterelle verte", "Tettigonia viridissima", 0.002, 2, 4, 0.8, 15, "L=0.04 c=#4ab030/#7ad050 body=locust", { gait: "jump" }],
  ["Grillon champêtre", "Gryllus campestris", 0.001, 1.5, 3, 0.6, 15, "L=0.025 c=#1a1414/#5a3a1c body=cricket", { gait: "jump" }],
  ["Cafard américain", "Periplaneta americana", 0.001, 5.4, 6, 2.5, 20, "L=0.04 c=#8a4a24/#a85a2a body=roach", { strideF: 27, note: "1,5 m/s ; se dresse sur deux pattes à pleine vitesse (Full & Tu 1991)." }],
  ["Blatte germanique", "Blattella germanica", 0.0001, 1.3, 4, 0.8, 20, "L=0.014 c=#a87a3a/#2a2420 body=roach"],
  ["Mante religieuse", "Mantis religiosa", 0.003, 0.5, 1, 0.3, 15, "L=0.07 c=#6ab040/#8ad060 body=mantis"],
  ["Libellule (anax empereur)", "Anax imperator", 0.001, 0.2, 0.5, 0.1, 10, "L=0.08 c=#2a6ab0/#3ab030 body=dragonfly", { fly: { vmax: 50, acc: 20, vcs: 30, sprint: 30, flap: 30 } }],
  ["Abeille domestique", "Apis mellifera", 0.0001, 0.5, 1, 0.3, 10, "L=0.013 c=#d8a020/#2a1a10 pat=bands body=bee", { fly: { vmax: 30, acc: 8, vcs: 24, sprint: 30, flap: 230 } }],
  ["Bourdon terrestre", "Bombus terrestris", 0.0003, 0.6, 1, 0.3, 10, "L=0.02 c=#1a1414/#e0c020 pat=bands body=bee fur=long", { fly: { vmax: 18, acc: 6, vcs: 14, sprint: 30, flap: 180 }, cold: true }],
  ["Frelon européen", "Vespa crabro", 0.0005, 0.6, 1, 0.3, 10, "L=0.03 c=#8a3a1c/#e8c020 pat=bands body=bee", { fly: { vmax: 25, acc: 8, vcs: 18, sprint: 30, flap: 120 } }],
  ["Mouche domestique", "Musca domestica", 0.00002, 0.5, 1, 0.3, 10, "L=0.007 c=#3a3a3a/#8a8a8a body=fly", { fly: { vmax: 7, acc: 6, vcs: 5, sprint: 30, flap: 190 } }],
  ["Taon", "Tabanus bovinus", 0.0002, 0.5, 1, 0.3, 10, "L=0.02 c=#5a4a3a/#8a7a5a body=fly", { fly: { vmax: 40, acc: 10, vcs: 25, sprint: 30, flap: 100 } }],
  ["Monarque (papillon)", "Danaus plexippus", 0.0005, 0.1, 0.5, 0.1, 10, "L=0.04 c=#e07a10/#1a1414 body=butterfly", { fly: { vmax: 18, acc: 3, vcs: 12, sprint: 30, flap: 6 }, endur: 500000, note: "Migration de 4 000 km." }],
  ["Sphinx colibri", "Macroglossum stellatarum", 0.0003, 0.1, 0.5, 0.1, 10, "L=0.03 c=#6a6050/#e08a30 body=moth", { fly: { vmax: 50, acc: 10, vcs: 30, sprint: 30, flap: 75 } }],
]);

// ───────────────────────── AUTRES INVERTÉBRÉS ─────────────────────────
add("inverte", [
  ["Escargot de Bourgogne", "Helix pomatia", 0.025, 0.05, 0.02, 0.04, 60, "L=0.06 c=#c8a878/#8a6a48 body=snail", { plan: "snail", gait: "glide", note: "~1 mm/s : un 100 m prend plus d'une journée." }],
  ["Limace rouge", "Arion rufus", 0.01, 0.05, 0.02, 0.04, 60, "L=0.12 c=#c8401c/#a83010 body=slug", { plan: "snail", gait: "glide" }],
  ["Solifuge (araignée-chameau)", "Galeodes arabs", 0.005, 16, 8, 5, 10, "L=0.07 c=#d8b888/#c8a070 body=spider legs=1.3", { foot: "desert", topt: 38, legs8: true }],
  ["Araignée-loup", "Lycosa tarantula", 0.002, 2, 4, 1, 10, "L=0.03 c=#5a4a3a/#8a7a6a body=spider", { legs8: true }],
  ["Araignée géante des maisons", "Eratigena atrica", 0.0008, 1.9, 4, 0.8, 10, "L=0.018 c=#6a5040/#8a6a50 body=spider legs=1.6", { legs8: true }],
  ["Scutigère véloce", "Scutigera coleoptrata", 0.0003, 1.5, 4, 0.8, 15, "L=0.035 c=#a89070/#5a4a3a body=centipede legs=1.6"],
  ["Crabe fantôme", "Ocypode ceratophthalmus", 0.08, 7, 5, 3, 10, "L=0.05 c=#e0d0b0/#f0e8d0 body=crab", { foot: "desert", legs8: true, note: "Court de côté à 2 m/s sur le sable." }],
  ["Mille-pattes géant", "Archispirostreptus gigas", 0.05, 0.3, 0.3, 0.2, 30, "L=0.3 c=#1a1414/#5a2a1a body=millipede"],
]);

// Caractéristiques sur le terrain « eau » si l'espèce n'a pas de valeurs dédiées :
// la plupart des mammifères terrestres nagent à 2–6 km/h (« nage du chien »).
const NON_SWIMMERS = new Set(["insectes", "invertebres", "volants"]);
for (const sp of SPECIES) {
  if (!sp.swim && !NON_SWIMMERS.has(sp.cat) && sp.fam !== "reptile" && sp.vmax > 2) {
    const m = sp.mass;
    const v = Math.min(6, 1.2 + 1.0 * Math.pow(m, 0.18));
    sp.swim = { vmax: v, acc: 1, vcs: v * 0.65, sprint: 15, generic: true };
  }
  if (!sp.swim && sp.fam === "reptile" && sp.plan !== "turtle" && sp.vmax > 1) {
    sp.swim = { vmax: Math.min(8, sp.vmax * 0.3), acc: 1, vcs: 1, sprint: 6, generic: true };
  }
}

export function countSpecies() { return SPECIES.length; }
