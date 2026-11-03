// Objets, outils et recettes d'artisanat.

export const ITEMS = {
  bois:        { name: "Bois", icon: "🪵", desc: "Bûches tirées d'un arbre abattu." },
  branche:     { name: "Branche", icon: "🥢", desc: "Ramassée au sol ou arrachée à un arbre à mains nues." },
  pierre:      { name: "Pierre", icon: "🪨", desc: "Ramassée au sol ou extraite d'un rocher à la pioche." },
  fibre:       { name: "Fibre", icon: "🌾", desc: "Fibres végétales tirées des buissons." },
  baies:       { name: "Baies", icon: "🫐", desc: "Calment un peu la faim et la soif.", food: 7, water: 4 },
  viande_crue: { name: "Viande crue", icon: "🥩", desc: "À cuire sur un feu. Crue, elle rend malade.", food: 12, health: -8 },
  viande_cuite:{ name: "Viande cuite", icon: "🍖", desc: "Très nourrissante.", food: 38, health: 6 },
  peau:        { name: "Peau", icon: "🟫", desc: "Sert à fabriquer une gourde et un abri." },
  gourde:      { name: "Gourde", icon: "🫗", desc: "Remplie au bord de l'eau, elle se boit n'importe où.", isFlask: true },
  hache:       { name: "Hache en pierre", icon: "🪓", desc: "Abat les arbres. Arme correcte.", tool: true },
  pioche:      { name: "Pioche en pierre", icon: "⛏️", desc: "Extrait la pierre des rochers.", tool: true },
  lance:       { name: "Lance", icon: "🔱", desc: "La meilleure arme pour chasser et se défendre.", tool: true },
  torche:      { name: "Torche", icon: "🔥", desc: "Éclaire la nuit et tient les loups à distance.", tool: true },
};

export const TOOLS = {
  main:   { name: "Mains nues", icon: "✋", damage: 6, tree: 0, rock: 0, reach: 2.4, cooldown: 0.55 },
  hache:  { name: "Hache", icon: "🪓", damage: 22, tree: 1, rock: 0, reach: 2.8, cooldown: 0.6 },
  pioche: { name: "Pioche", icon: "⛏️", damage: 16, tree: 0.34, rock: 1, reach: 2.8, cooldown: 0.65 },
  lance:  { name: "Lance", icon: "🔱", damage: 34, tree: 0, rock: 0, reach: 3.6, cooldown: 0.75 },
  torche: { name: "Torche", icon: "🔥", damage: 10, tree: 0, rock: 0, reach: 2.4, cooldown: 0.6, light: true },
};

export const RECIPES = [
  { id: "hache",  out: { hache: 1 }, needs: { branche: 2, pierre: 2, fibre: 1 } },
  { id: "pioche", out: { pioche: 1 }, needs: { branche: 2, pierre: 3, fibre: 1 } },
  { id: "lance",  out: { lance: 1 }, needs: { branche: 3, pierre: 1, fibre: 2 } },
  { id: "torche", out: { torche: 1 }, needs: { branche: 1, fibre: 1, bois: 1 } },
  { id: "gourde", out: { gourde: 1 }, needs: { peau: 1, fibre: 2 } },
  { id: "feu",    out: {}, place: "feu", needs: { bois: 4, pierre: 4 }, name: "Feu de camp", icon: "🔥", desc: "Cuit la viande, réchauffe, éloigne les loups. Se rallume avec du bois." },
  { id: "abri",   out: {}, place: "abri", needs: { bois: 10, branche: 6, peau: 1 }, name: "Abri", icon: "⛺", desc: "Dors-y pour passer la nuit. Tu y réapparais si tu meurs." },
];

export class Inventory {
  constructor() {
    this.items = {};
    this.flask = 0; // gorgées restantes dans la gourde (0..4)
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
    return true;
  }
  serialize() { return { items: this.items, flask: this.flask }; }
  restore(d) { this.items = d?.items || {}; this.flask = d?.flask || 0; }
}
