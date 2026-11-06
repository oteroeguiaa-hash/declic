// Modèle physiologique de course.
//
// Base : modèle de Keller (1973), utilisé en biomécanique du sprint :
//   dv/dt = F - v/τ            (F : force propulsive par kg, τ : constante de « résistance » interne)
//   dE/dt = σ - F·v            (E : réserve anaérobie en J/kg, σ : puissance aérobie maximale en W/kg)
// avec F ≤ Fmax. À l'équilibre, la vitesse soutenable est la vitesse critique vc = √(σ·τ),
// la vitesse maximale est vmax = Fmax·τ et l'accélération au départ vaut Fmax.
//
// Extensions (inspirées de Mathis, Behncke, Aftalion & Martinon) :
//  - la force maximale baisse quand la réserve anaérobie s'épuise (fatigue neuromusculaire) ;
//  - la puissance aérobie met du temps à s'installer (cinétique de la VO2) ;
//  - le glycogène s'épuise sur les longues distances (« le mur ») ;
//  - la chaleur corporelle s'accumule et force à ralentir (thermorégulation propre à chaque espèce) ;
//  - l'air (vent) freine davantage les petits corps ;
//  - le terrain, la pluie, la température et la masse modifient les capacités ;
//  - chaque espèce a sa stratégie d'allure : l'humain gère sa course, le guépard part à fond.

export const G = 9.81;

export const TERRAINS = {
  piste:  { name: "Piste synthétique", vmax: 1.0,  cost: 1.0,  acc: 1.0 },
  herbe:  { name: "Herbe",             vmax: 0.97, cost: 1.06, acc: 0.95 },
  terre:  { name: "Terre battue",      vmax: 0.98, cost: 1.04, acc: 0.97 },
  bitume: { name: "Route (bitume)",    vmax: 1.0,  cost: 1.0,  acc: 1.0 },
  sable:  { name: "Sable du désert",   vmax: 0.78, cost: 1.6,  acc: 0.75 },
  neige:  { name: "Neige",             vmax: 0.82, cost: 1.45, acc: 0.78 },
  boue:   { name: "Boue",              vmax: 0.75, cost: 1.7,  acc: 0.7 },
  eau:    { name: "Eau (course de nage)", vmax: 1, cost: 1, acc: 1, water: true },
};

// Adaptation du pied au terrain (multiplicateur appliqué à la pénalité, 0 = aucune pénalité).
const FOOT_ADAPT = {
  pad:   { sable: 0.25, neige: 0.8, boue: 0.9 },          // coussinets larges (chameau, dromadaire)
  snow:  { neige: 0.3, boue: 0.8 },                       // renne, husky, lynx, ours polaire, lièvre arctique
  hoof:  { piste: 1, herbe: 0.6, terre: 0.4, bitume: 1, boue: 1.1 },
  paw:   {},
  human: { herbe: 1.1, sable: 1.0 },
  bird:  { sable: 0.6 },                                  // autruche : très à l'aise sur sol sableux
  claw:  { sable: 0.7 },                                  // reptiles du désert, fourmi du Sahara
  desert:{ sable: 0.3 },
};

export const WEATHERS = {
  soleil:   { name: "Grand soleil",     cool: 0.9, acc: 1.0, vmax: 1.0, wind: 0, sun: 1 },
  nuageux:  { name: "Nuageux",          cool: 1.05, acc: 1.0, vmax: 1.0, wind: 0, sun: 0.5 },
  pluie:    { name: "Pluie",            cool: 1.25, acc: 0.9, vmax: 0.98, wind: 0, sun: 0.2, rain: 1 },
  orage:    { name: "Orage",            cool: 1.3, acc: 0.85, vmax: 0.96, wind: -3, sun: 0.1, rain: 2 },
  ventface: { name: "Vent de face (5 m/s)", cool: 1.15, acc: 1.0, vmax: 1.0, wind: -5, sun: 0.7 },
  ventdos:  { name: "Vent de dos (5 m/s)",  cool: 0.95, acc: 1.0, vmax: 1.0, wind: 5, sun: 0.7 },
  brouillard:{ name: "Brouillard",      cool: 1.1, acc: 0.98, vmax: 1.0, wind: 0, sun: 0.3, fog: 1 },
  neigeuse: { name: "Chute de neige",   cool: 1.35, acc: 0.88, vmax: 0.97, wind: -1, sun: 0.2, snow: 1 },
};

const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);

// Transforme les caractéristiques d'une espèce (données lisibles) en paramètres du modèle.
// mode : "land" | "swim" | "fly"
export function buildParams(sp, opts = {}) {
  const mode = opts.mode || "land";
  const loc = mode === "swim" ? sp.swim : mode === "fly" ? sp.fly : sp;
  const fitness = opts.fitness ?? 1;            // condition physique (0.6 à 1.15)
  const mass = opts.mass ?? sp.mass;
  const env = opts.env || {};

  if (!loc || !loc.vmax) {
    return { incapable: true, mass, mode };
  }

  let vmax = loc.vmax / 3.6;
  let acc = loc.acc ?? sp.acc ?? 6;
  let vcs = (loc.vcs ?? sp.vcs) / 3.6;
  const sprint = loc.sprint ?? sp.sprint ?? 10;  // secondes tenables près de la vitesse max
  const kFat = loc.kfat ?? sp.kfat ?? 0.5;        // forme de la perte de force avec la fatigue
  const fl = loc.floor ?? sp.floor ?? 0.5;        // force résiduelle quand la réserve est vide

  // Masse : un corps plus lourd que la normale porte de la masse non musculaire.
  const r = mass / sp.mass;
  let massF;
  if (r >= 1) massF = Math.pow(1 / r, 0.75);
  else if (r >= 0.85) massF = Math.pow(1 / r, 0.25);
  else massF = Math.pow(0.85 / 1, -0.25) * Math.pow(r / 0.85, 0.9); // trop maigre : moins de muscle
  massF = clamp(massF, 0.35, 1.08);

  // Ectothermes (reptiles, insectes) : performance selon la température.
  let ecto = 1;
  const T = env.temp ?? 20;
  if (sp.ecto) {
    const topt = sp.topt ?? 32;
    if (T < topt) ecto = clamp(Math.exp(-Math.pow((topt - T) / 18, 2)), 0.08, 1);
    else ecto = clamp(1 - (T - topt) * 0.03, 0.5, 1);
  } else if (T < -10 && !sp.cold) ecto = 0.95;

  // Terrain et météo.
  const ter = TERRAINS[env.terrain || "piste"];
  const wea = WEATHERS[env.weather || "soleil"];
  let tv = 1, tc = 1, ta = 1;
  if (mode === "land") {
    const ad = FOOT_ADAPT[sp.foot || "paw"] || {};
    const k = ad[env.terrain] ?? 1;
    tv = 1 - (1 - ter.vmax) * k;
    tc = 1 + (ter.cost - 1) * k;
    ta = 1 - (1 - ter.acc) * k;
    if (sp.foot === "hoof" && wea.rain) ta *= 0.94;
    ta *= wea.acc;
    tv *= wea.vmax;
  }

  const perf = massF * ecto * fitness;
  vmax *= tv * Math.pow(perf, 0.55);
  acc *= ta * Math.pow(perf, 0.6);
  vcs *= Math.pow(perf, 0.5) / Math.sqrt(tc);
  if (vcs > vmax * 0.95) vcs = vmax * 0.95;

  const tau = vmax / acc;            // s
  const Fmax = acc;                  // m/s²
  const sigma = (vcs * vcs) / tau;   // W/kg (unités du modèle)
  // Réserve anaérobie : de quoi tenir « sprint » secondes près de vmax.
  const p95 = Math.pow(0.95 * vmax, 2) / tau;
  const E0 = Math.max(30, sprint * (p95 - 0.5 * sigma)) * Math.pow(perf, 0.4);

  // Thermorégulation.
  const heatTol = sp.heatTol ?? 2.0;
  let cool = sp.cool ?? 0.8;
  const ambient = clamp((42 - T) / 22, 0.08, 1.6);
  cool *= ambient * wea.cool * (sp.cold && T > 15 ? 0.75 : 1);
  if (mode === "swim") cool *= 4; // l'eau évacue très bien la chaleur
  // Frottement de l'air (vent) : surface frontale ∝ m^(2/3).
  const CdA = (sp.drag ?? 0.022) * Math.pow(mass, 2 / 3);
  const kd = mode === "swim" ? 0 : (0.6 * CdA) / mass;

  const pacing = sp.pacing ?? 0.5;
  return {
    incapable: false, mode, mass,
    vmax, acc, vcs, tau, Fmax, sigma, E0, kFat, fl,
    oxyTau: sp.oxyTau ?? 18,
    glyco: (sp.endur ?? 5000) * Math.pow(perf, 0.5),
    recov: sp.recov ?? 1,
    heatTol, cool, heatGen: 0.00008 * (sp.heatGen ?? 1),
    kd, wind: mode === "swim" ? 0 : wea.wind,
    pacing, instinct: pacing < 0.35,
    restSpeed: vcs * (sp.restFrac ?? 0.82),
    stride: strideModel(sp, vmax, mode),
    cost: tc,
  };
}

// Foulée : fréquence maximale ∝ m^-0.13 (Heglund & Taylor), longueur = v / fréquence.
function strideModel(sp, vmax, mode) {
  let fmax = sp.strideF ?? (mode === "fly" ? 0 : 5.0 * Math.pow(sp.mass, -0.13));
  if (mode === "fly") fmax = sp.fly?.flap ?? clamp(3.5 * Math.pow(sp.mass, -0.3), 1.2, 80);
  if (mode === "swim") fmax = sp.swim?.beat ?? clamp(2.2 * Math.pow(sp.mass, -0.15), 0.3, 6);
  if (sp.biped && mode === "land" && !sp.strideF) fmax = 4.4 * Math.pow(sp.mass / 75, -0.12);
  return { fmax, lmax: vmax / fmax };
}

// Fréquence et longueur de foulée à la vitesse v.
export function strideAt(p, v) {
  if (!p.stride || v < 0.0005) return { f: 0, l: 0 };
  const x = clamp(v / p.vmax, 0, 1.2);
  const f = p.stride.fmax * (0.38 + 0.62 * Math.pow(x, 0.6));
  return { f, l: v / f };
}

export function createRunner(params) {
  return {
    p: params,
    s: 0, v: 0, a: 0, t: 0,
    E: params.E0 ?? 0, G: 1, H: 0, O: 0.25,
    resting: false, finished: false, finishTime: null,
    vPeak: 0, history: [], lastSample: -1,
    fatigue: 0,
  };
}

// Puissance aérobie disponible.
function sigmaEff(r) {
  const p = r.p;
  const gly = 0.5 + 0.5 * Math.pow(r.G, 0.5);
  const heat = heatFactor(r);
  return p.sigma * r.O * gly * (0.6 + 0.4 * heat);
}

function heatFactor(r) {
  const p = r.p;
  if (r.H <= p.heatTol) return 1;
  return clamp(1 - (r.H - p.heatTol) / (p.heatTol * 0.9), 0.25, 1);
}

// Force maximale disponible selon la réserve anaérobie et la chaleur.
function forceCap(r) {
  const p = r.p;
  const x = clamp(r.E / p.E0, 0, 1);
  return p.Fmax * (p.fl + (1 - p.fl) * Math.pow(x, p.kFat)) * heatFactor(r);
}

// Vitesse de croisière optimale pour finir la distance restante en vidant la réserve.
function cruiseSpeed(r, dRem) {
  const p = r.p;
  const sig = p.sigma * (0.5 + 0.5 * Math.pow(r.G, 0.5)) * Math.min(1, 0.6 + 0.4 * heatFactor(r));
  const E = Math.max(0, r.E - 0.02 * p.E0);
  const d = Math.max(dRem, 1);
  const a = 1 / p.tau + p.kd * Math.abs(p.wind) * 0.2;
  const b = E / d;
  return (b + Math.sqrt(b * b + 4 * a * sig)) / (2 * a);
}

// Avance d'un pas de temps dt (s). Retourne le coureur mis à jour.
export function step(r, dt, distance) {
  const p = r.p;
  if (p.incapable) { r.v = 0; return r; }
  if (r.finished) {
    // Après la ligne : décélération progressive (récupération), sans effet sur le classement.
    const dec = Math.max(1.5, r.v * 0.6);
    r.a = r.v > 0 ? -dec : 0;
    r.v = Math.max(0, r.v - dec * dt);
    r.post = (r.post || 0) + r.v * dt;
    r.E = Math.min(p.E0, r.E + p.sigma * 0.5 * dt);
    return r;
  }
  r.t += dt;

  // Cinétique de la VO2 : l'aérobie démarre lentement.
  r.O += (1 - r.O) * (1 - Math.exp(-dt / p.oxyTau));

  const dRem = distance - r.s;
  const Fcap = forceCap(r);
  const vcap = Fcap * p.tau;
  const ratio = r.E / p.E0;
  // Comportement instinctif : à bout de souffle, l'animal ralentit au pas pour récupérer.
  if (p.instinct) {
    if (!r.resting && (ratio < 0.06 || heatFactor(r) < 0.6)) r.resting = true;
    if (r.resting && ratio > 0.55 && heatFactor(r) > 0.95) r.resting = false;
  } else if (p.pacing < 0.75) {
    // Personne peu entraînée : marche quand elle n'en peut plus.
    if (!r.resting && ratio < 0.02 && r.H > p.heatTol * 0.8) r.resting = true;
    if (r.resting && ratio > 0.25) r.resting = false;
  }

  let vt;
  if (r.resting) vt = p.restSpeed;
  else {
    const vc = cruiseSpeed(r, dRem);
    // pacing = 1 : allure optimale ; 0 : à fond tant que possible.
    vt = Math.min(vcap, p.pacing * vc + (1 - p.pacing) * vcap);
    // Finir fort : sprint final si la réserve le permet.
    if (dRem < 0.06 * distance + 30 && p.pacing > 0.5) vt = vcap;
  }

  // Force demandée (régulateur) + frottements de l'air relatifs au vent.
  const vRel = r.v - p.wind;
  const drag = p.kd * (vRel * Math.abs(vRel) - r.v * r.v);
  let F = r.v / p.tau + drag + 3.0 * (vt - r.v);
  F = clamp(F, 0, Fcap);

  // Bilan énergétique.
  const sig = sigmaEff(r);
  const P = F * r.v * p.cost;
  let dE = (sig - P) * dt;
  if (dE > 0) dE *= p.recov;
  if (r.E + dE < 0) {
    // Réserve vide : on ne peut dépenser que l'aérobie.
    F = Math.min(F, r.v > 0.1 ? sig / (r.v * p.cost) : Fcap);
    dE = -r.E;
  }
  r.E = clamp(r.E + dE, 0, p.E0);

  // Glycogène.
  r.G = clamp(r.G - (Math.min(P, sig) / Math.max(p.sigma, 1e-6)) * dt / p.glyco, 0, 1);

  // Chaleur corporelle (°C au-dessus du repos).
  r.H = Math.max(0, r.H + (p.heatGen * P * 1.0 - p.cool * 0.0018 * r.H) * dt);

  // Mouvement.
  const a = F - r.v / p.tau - drag;
  r.a = a;
  r.v = Math.max(0, r.v + a * dt);
  r.s += r.v * dt;
  if (r.v > r.vPeak) r.vPeak = r.v;

  // Fatigue perçue (0 à 100 %).
  r.fatigue = clamp(100 * (0.62 * (1 - ratio) + 0.2 * (1 - r.G) + 0.18 * Math.min(1, r.H / p.heatTol)), 0, 100);

  if (r.s >= distance) {
    // Interpolation de l'instant exact du passage de la ligne.
    const over = r.s - distance;
    r.finishTime = r.t - (r.v > 0 ? over / r.v : 0);
    r.finished = true;
    r.s = distance;
  }
  return r;
}

export function energyPct(r) {
  if (r.p.incapable) return 0;
  // Énergie : réserve anaérobie (70 %) + glycogène (30 %).
  return clamp(100 * (0.7 * (r.E / r.p.E0) + 0.3 * r.G), 0, 100);
}

// Simulation complète sans rendu (pour les tests et les prévisions).
export function simulate(params, distance, maxTime = 4 * 3600, dt = 0.02) {
  const r = createRunner(params);
  if (params.incapable) return { time: Infinity, r };
  const splits = {};
  while (!r.finished && r.t < maxTime) {
    step(r, dt, distance);
    for (const m of [100, 200, 400]) if (!splits[m] && r.s >= m) splits[m] = r.t;
  }
  return { time: r.finished ? r.finishTime : Infinity, r, splits };
}

// Caractéristiques affichables.
export function describe(p, sp) {
  if (p.incapable) return null;
  const t90 = -p.tau * Math.log(0.1); // temps pour atteindre 90 % de vmax
  return {
    vmax: p.vmax * 3.6,
    acc: p.acc,
    t90,
    vcs: p.vcs * 3.6,
    power: (p.mass * p.Fmax * p.vmax) / 4,       // W (puissance mécanique de pointe estimée)
    powerKg: (p.Fmax * p.vmax) / 4,
    E0: p.E0,
    endurance: p.glyco,
    strideL: p.stride.lmax,
    strideF: p.stride.fmax,
    recov: p.recov,
    fatigueRes: 1 / (1 - p.fl + 0.001),
    mass: p.mass,
  };
}
