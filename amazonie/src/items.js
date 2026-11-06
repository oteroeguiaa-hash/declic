// Objets, outils et recettes d'artisanat.
// Progression : mains nues → outils en bois (branches + fibre) → outils en pierre et machette → survie et construction.

export const ITEMS = {
  bois:        { name: "Bois", icon: "🪵", desc: "Bûches tirées d'un arbre abattu à la hache." },
  branche:     { name: "Branche", icon: "🥢", desc: "Ramassée au sol, ou arrachée à un arbre en le frappant à mains nues." },
  pierre:      { name: "Pierre", icon: "🪨", desc: "Cailloux ramassés au sol, ou extraits d'un rocher avec une pioche." },
  fibre:       { name: "Fibre", icon: "🌾", desc: "Fibres de palmier et de lianes, tirées des plantes du sous-bois." },
  palme:       { name: "Palme", icon: "🌿", desc: "Feuille de palmier : toiture, cape de pluie." },
  ecorce:      { name: "Écorce", icon: "🟤", desc: "Écorce d'arbre (jatobá, copaíba…) : sert à préparer une tisane qui soigne." },
  baies:       { name: "Camu-camu", icon: "🍒", desc: "Petits fruits rouges acidulés de la várzea. Calment un peu la faim et la soif.", food: 7, water: 5 },
  acai:        { name: "Açaí", icon: "🫐", desc: "Grappe de baies violettes cueillie sur un palmier açaí. Très nourrissant.", food: 12, water: 3 },
  noisettes:   { name: "Noix du Brésil", icon: "🌰", desc: "Ramassées sous les castanheiras (ou chez les agoutis). Très nourrissantes.", food: 14 },
  legumes:     { name: "Légumes", icon: "🥕", desc: "Récoltés au potager. Nourrissants et désaltérants.", food: 18, water: 8 },
  viande_crue: { name: "Viande crue", icon: "🥩", desc: "À cuire sur un feu. Crue, elle rend malade.", food: 12, health: -8 },
  viande_cuite:{ name: "Viande cuite", icon: "🍖", desc: "Très nourrissante.", food: 38, health: 6 },
  peau:        { name: "Peau", icon: "🟫", desc: "Sert à fabriquer une gourde et un abri." },
  cuir:        { name: "Cuir épais", icon: "🟫", desc: "Cuir de tapir ou de caïman : très solide." },
  
  gourde:      { name: "Gourde", icon: "🫗", desc: "Remplie au bord de l'eau ou sous la pluie. Fais bouillir l'eau du fleuve près d'un feu avant de la boire.", isFlask: true },
  tisane:      { name: "Tisane médicinale", icon: "🍵", desc: "Écorce bouillie : fait tomber la fièvre et ralentit le venin.", cure: true },
  manteau:     { name: "Cape de pluie", icon: "🧥", desc: "Palmes tressées : te garde au sec sous les averses (pas de frissons la nuit).", wearable: true },
  hache_bois:  { name: "Hache en bois", icon: "🪓", desc: "Abat les arbres, lentement.", tool: true },
  pioche_bois: { name: "Pioche en bois", icon: "⛏️", desc: "Casse les rochers, lentement.", tool: true },
  epee_bois:   { name: "Épée en bois", icon: "🗡️", desc: "Une arme de départ.", tool: true },
  hache:       { name: "Hache en pierre", icon: "🪓", desc: "Abat les arbres deux fois plus vite.", tool: true },
  pioche:      { name: "Pioche en pierre", icon: "⛏️", desc: "Extrait la pierre deux fois plus vite.", tool: true },
  epee:        { name: "Épée en pierre", icon: "🗡️", desc: "Arme solide pour se défendre.", tool: true },
  lance:       { name: "Lance", icon: "🔱", desc: "Longue portée : idéale pour chasser, pêcher et tenir un caïman ou un jaguar à distance.", tool: true },
  torche:      { name: "Torche", icon: "🔥", desc: "Éclaire la nuit, éloigne les moustiques et tient le jaguar à distance.", tool: true },
  machette:    { name: "Machette", icon: "🔪", desc: "Lame de pierre taillée : coupe les palmiers et la végétation, bonne arme.", tool: true },
};

// tree / rock : efficacité contre les arbres et les rochers (1 = un point de vie par coup)
export const TOOLS = {
  main:        { name: "Mains nues", icon: "✋", damage: 6, tree: 0, rock: 0, reach: 2.4, cooldown: 0.55 },
  hache_bois:  { name: "Hache en bois", icon: "🪓", tag: "bois", damage: 10, tree: 0.5, rock: 0, reach: 2.6, cooldown: 0.6 },
  pioche_bois: { name: "Pioche en bois", icon: "⛏️", tag: "bois", damage: 8, tree: 0.2, rock: 0.5, reach: 2.6, cooldown: 0.65 },
  epee_bois:   { name: "Épée en bois", icon: "🗡️", tag: "bois", damage: 15, tree: 0, rock: 0, reach: 2.7, cooldown: 0.5 },
  hache:       { name: "Hache en pierre", icon: "🪓", tag: "pierre", damage: 18, tree: 1, rock: 0, reach: 2.8, cooldown: 0.6 },
  pioche:      { name: "Pioche en pierre", icon: "⛏️", tag: "pierre", damage: 14, tree: 0.34, rock: 1, reach: 2.8, cooldown: 0.65 },
  epee:        { name: "Épée en pierre", icon: "🗡️", tag: "pierre", damage: 30, tree: 0, rock: 0, reach: 2.9, cooldown: 0.5 },
  lance:       { name: "Lance", icon: "🔱", damage: 34, tree: 0, rock: 0, reach: 3.6, cooldown: 0.75 },
  machette:    { name: "Machette", icon: "🔪", tag: "pierre", damage: 24, tree: 0.6, rock: 0, reach: 2.7, cooldown: 0.45 },
  torche:      { name: "Torche", icon: "🔥", damage: 10, tree: 0, rock: 0, reach: 2.4, cooldown: 0.6, light: true },
};

// Emplacements de la barre d'outils : on garde la meilleure version possédée.
export const TOOL_SLOTS = [["hache", "hache_bois"], ["pioche", "pioche_bois"], ["machette", "epee", "epee_bois"], ["lance"], ["torche"]];

export const RECIPE_GROUPS = [
  ["bois", "Outils en bois"],
  ["pierre", "Outils en pierre"],
  ["survie", "Survie"],
  ["construction", "Construction"],
];

export const RECIPES = [
  { id: "hache_bois",  group: "bois",   out: { hache_bois: 1 },  needs: { branche: 3, fibre: 1 } },
  { id: "pioche_bois", group: "bois",   out: { pioche_bois: 1 }, needs: { branche: 3, fibre: 1 } },
  { id: "epee_bois",   group: "bois",   out: { epee_bois: 1 },   needs: { branche: 2, fibre: 1 } },
  { id: "hache",       group: "pierre", out: { hache: 1 },  needs: { branche: 2, pierre: 3, fibre: 2 }, upgrade: "hache_bois" },
  { id: "pioche",      group: "pierre", out: { pioche: 1 }, needs: { branche: 2, pierre: 3, fibre: 2 }, upgrade: "pioche_bois" },
  { id: "epee",        group: "pierre", out: { epee: 1 },   needs: { bois: 1, pierre: 4, fibre: 2 }, upgrade: "epee_bois" },
  { id: "lance",       group: "pierre", out: { lance: 1 },  needs: { branche: 3, pierre: 2, fibre: 2 } },
  { id: "machette",    group: "pierre", out: { machette: 1 }, needs: { bois: 1, pierre: 4, fibre: 2 } },
  { id: "torche",      group: "survie", out: { torche: 1 }, needs: { branche: 1, fibre: 1, bois: 1 } },
  { id: "gourde",      group: "survie", out: { gourde: 1 }, needs: { peau: 1, fibre: 2 } },
  { id: "manteau",     group: "survie", out: { manteau: 1 }, needs: { palme: 4, fibre: 3 } },
  { id: "tisane",      group: "survie", out: { tisane: 1 }, needs: { ecorce: 2, fibre: 1 } },
  { id: "feu",  group: "construction", out: {}, place: "feu", needs: { bois: 4, pierre: 4 }, name: "Feu de camp", icon: "🔥", desc: "Cuit la viande, fait bouillir l'eau, sèche les vêtements, chasse les moustiques et tient le jaguar à distance." },
  { id: "canoe", group: "construction", out: {}, place: "canoe", needs: { bois: 8, peau: 2, fibre: 4 }, name: "Canoë", icon: "🛶", desc: "Pirogue à fabriquer face au fleuve, à un igarapé ou à un lac. Monte dedans pour naviguer." },
  { id: "abri", group: "construction", out: {}, place: "abri", needs: { bois: 10, branche: 6, palme: 4 }, name: "Abri (tapiri)", icon: "⛺", desc: "Toit de palmes sur pilotis : dors-y au sec, hors de portée des serpents. Tu y réapparais si tu meurs." },
];

export class Inventory {
  constructor() {
    this.items = {};
    this.flask = 0; // gorgées restantes dans la gourde (0..4)
    this.flaskClean = true; // eau bouillie ou eau de pluie
  }
  count(id) { return this.items[id] || 0; }
  add(id, n = 1) { this.items[id] = (this.items[id] || 0) + n; }
  remove(id, n = 1) {
    if (this.count(id) < n) return false;
    this.items[id] -= n;
    if (this.items[id] <= 0) delete this.items[id];
    return true;
  }
  canCraft(r) { return Object.entries(r.needs).every(([k, n]) => this.count(k) >= n); }
  craft(r) {
    if (!this.canCraft(r)) return false;
    for (const [k, n] of Object.entries(r.needs)) this.remove(k, n);
    for (const [k, n] of Object.entries(r.out)) this.add(k, n);
    if (r.upgrade) this.remove(r.upgrade, this.count(r.upgrade)); // l'outil en bois est remplacé
    return true;
  }
  serialize() { return { items: this.items, flask: this.flask, clean: this.flaskClean }; }
  restore(d) { this.items = d?.items || {}; this.flask = d?.flask || 0; this.flaskClean = d?.clean ?? true; }
}
