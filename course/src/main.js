// Sprint des espèces : interface, course, caméras, statistiques.
import * as THREE from "three";
import { SPECIES, CATEGORIES, getSpecies, humanStats, HUMAN_PROFILES } from "./species.js";
import { buildParams, createRunner, step, strideAt, energyPct, describe, simulate, TERRAINS, WEATHERS } from "./physio.js";
import { buildCreature } from "./models.js";
import { World, Track, Course, STRAIGHT, R0 } from "./world.js";
import { drawChart, fmtTime, fmtNum } from "./chart.js";

const $ = (s) => document.querySelector(s);
const LANE_COLORS = ["#e6463c", "#3c8ce6", "#f0c030", "#3cc070", "#b45ae6", "#f08c3c", "#40d0d0", "#f070b0"];
const MAX_LANES = 8;
const DISTANCES = [50, 100, 200, 400, 800, 1000, 1500, 5000, 10000];
const GAIT_FR = { walk: "pas", amble: "amble", trot: "trot", pace: "amble latéral", canter: "petit galop", transverse: "galop", rotary: "galop rotatoire", bound: "bond", halfbound: "demi-bond", hop: "saut", biped: "course" };

// ─────────────── État ───────────────
const S = {
  lineup: [],
  env: { distance: 100, terrain: "piste", weather: "soleil", temp: 20 },
  scaleSmall: true,
  cat: "tous",
  q: "",
  ficheId: null,
};
let uid = 0;

// ─────────────── Rendu 3D ───────────────
const canvas = $("#gl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const world = new World(renderer);
const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 5000);
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

// ─────────────── Concurrents ───────────────
function effectiveSpecies(e) {
  const sp = e.sp;
  if (sp.human) {
    const st = humanStats(sp.human, e.training);
    return { ...sp, ...st, mass: st.mass };
  }
  return sp;
}

function modesFor(sp, terrain) {
  const m = [];
  if (terrain === "eau") {
    if (sp.swim) m.push("swim");
    if (sp.fly) m.push("fly");
  } else {
    if (sp.vmax > 0) m.push("land");
    if (sp.fly) m.push("fly");
  }
  return m;
}

function defaultMode(sp, terrain) {
  const m = modesFor(sp, terrain);
  if (!m.length) return terrain === "eau" ? "swim" : "land";
  if (m.includes("fly") && (sp.flyer || sp.vmax < 1 || sp.cat === "insectes" && sp.fly)) return "fly";
  return m[0];
}

function addEntry(sp) {
  if (S.lineup.length >= MAX_LANES) return flash(`Huit couloirs au maximum.`);
  const e = { uid: ++uid, sp, fitness: 1, training: sp.human ? sp.human.training : 1, mode: defaultMode(sp, S.env.terrain) };
  const eff = effectiveSpecies(e);
  e.mass = Math.round((sp.defaultMass ?? eff.mass) * 1000) / 1000;
  S.lineup.push(e);
  renderLineup();
  renderPrediction();
}

function paramsFor(e, env = S.env) {
  const eff = effectiveSpecies(e);
  let mode = e.mode;
  const ms = modesFor(eff, env.terrain);
  if (!ms.includes(mode)) mode = ms[0] || (env.terrain === "eau" ? "swim" : "land");
  const p = buildParams(eff, { mode, mass: e.mass, fitness: e.fitness, env });
  p.modeUsed = mode;
  return p;
}

// ─────────────── Catalogue ───────────────
function renderCats() {
  const el = $("#cats");
  el.innerHTML = "";
  const all = [{ id: "tous", name: "Toutes", icon: "" }, ...CATEGORIES];
  for (const c of all) {
    const b = document.createElement("button");
    b.className = "chip" + (S.cat === c.id ? " on" : "");
    b.textContent = (c.icon ? c.icon + " " : "") + c.name;
    b.onclick = () => { S.cat = c.id; renderCats(); renderList(); };
    el.appendChild(b);
  }
}

function norm(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }

function speedLabel(sp) {
  if (sp.vmax > 0 && !sp.flyer) return `${fmtNum(sp.vmax)} km/h`;
  if (sp.fly) return `vol ${fmtNum(sp.fly.vmax)} km/h`;
  if (sp.swim) return `nage ${fmtNum(sp.swim.vmax)} km/h`;
  return "—";
}

function renderList() {
  const el = $("#list");
  const q = norm(S.q.trim());
  el.innerHTML = "";
  let n = 0;
  const frag = document.createDocumentFragment();
  for (const c of CATEGORIES) {
    if (S.cat !== "tous" && S.cat !== c.id) continue;
    const items = SPECIES.filter((sp) => sp.cat === c.id && (!q || norm(sp.name + " " + (sp.latin || "")).includes(q)));
    if (!items.length) continue;
    const h = document.createElement("div");
    h.className = "catHead";
    h.textContent = `${c.icon} ${c.name} (${items.length})`;
    frag.appendChild(h);
    for (const sp of items) {
      n++;
      const row = document.createElement("div");
      row.className = "sprow" + (S.ficheId === sp.id ? " sel" : "");
      row.innerHTML = `<div><div class="nm"></div><div class="lt"></div></div><div class="sp"></div><button class="add" title="Ajouter au départ">+</button>`;
      row.querySelector(".nm").textContent = sp.name;
      row.querySelector(".lt").textContent = sp.latin || "";
      row.querySelector(".sp").textContent = speedLabel(sp);
      row.onclick = (ev) => {
        if (ev.target.classList.contains("add")) { addEntry(sp); return; }
        S.ficheId = sp.id;
        renderFiche();
        el.querySelectorAll(".sprow.sel").forEach((r) => r.classList.remove("sel"));
        row.classList.add("sel");
      };
      row.ondblclick = () => addEntry(sp);
      frag.appendChild(row);
    }
  }
  el.appendChild(frag);
  $("#catCount").textContent = `${n} espèce${n > 1 ? "s" : ""}`;
}

function statBlock(p, sp) {
  const d = describe(p, sp);
  if (!d) return `<div class="note">Ne peut pas se déplacer sur ce terrain.</div>`;
  const biped = sp.biped && p.mode === "land";
  return `<div class="stats">
    <div><span>Vitesse max.</span><b>${fmtNum(d.vmax)} km/h</b></div>
    <div><span>Accélération</span><b>${d.acc.toFixed(1)} m/s²</b></div>
    <div><span>0 → 90 % vmax</span><b>${d.t90.toFixed(1)} s</b></div>
    <div><span>Vitesse critique</span><b>${fmtNum(d.vcs)} km/h</b></div>
    <div><span>Puissance de pointe</span><b>${d.power >= 1000 ? (d.power / 1000).toFixed(1) + " kW" : Math.round(d.power) + " W"}</b></div>
    <div><span>Puissance / kg</span><b>${Math.round(d.powerKg)} W/kg</b></div>
    <div><span>Réserve anaérobie</span><b>${Math.round(d.E0)} J/kg</b></div>
    <div><span>Endurance (glycogène)</span><b>${fmtDur(d.endurance)}</b></div>
    <div><span>Masse</span><b>${d.mass >= 1 ? fmtNum(d.mass) + " kg" : fmtNum(d.mass * 1000) + " g"}</b></div>
    <div><span>Récupération</span><b>${Math.round(d.recov * 100)} %</b></div>
    <div><span>${biped ? "Longueur du pas" : p.mode === "fly" ? "Distance / battement" : p.mode === "swim" ? "Distance / cycle" : "Longueur de foulée"}</span><b>${d.strideL >= 1 ? d.strideL.toFixed(2) + " m" : (d.strideL * 100).toFixed(1) + " cm"}</b></div>
    <div><span>${p.mode === "fly" ? "Battements d'ailes" : biped ? "Fréquence des pas" : "Fréquence de foulée"}</span><b>${d.strideF.toFixed(1)} /s</b></div>
  </div>`;
}

function renderFiche() {
  const sp = getSpecies(S.ficheId);
  const el = $("#fiche");
  if (!sp) return;
  const e = { sp, fitness: 1, training: sp.human ? sp.human.training : 1, mode: defaultMode(sp, S.env.terrain) };
  e.mass = sp.defaultMass ?? effectiveSpecies(e).mass;
  const p = paramsFor(e);
  const cat = CATEGORIES.find((c) => c.id === sp.cat);
  el.innerHTML = `<div class="row2" style="justify-content:space-between"><div><h3></h3><div class="muted small"><i></i> · ${cat ? cat.name : ""}</div></div><button class="btn sm primary" id="ficheAdd">Ajouter</button></div>
    ${statBlock(p, effectiveSpecies(e))}
    <p class="note">${sp.note ? escapeHtml(sp.note) + " " : ""}${p.modeUsed === "fly" ? "Course en vol horizontal. " : p.modeUsed === "swim" ? "Course à la nage. " : ""}${sp.ecto ? "Animal à sang froid : ses performances dépendent de la température. " : ""}${sp.swim?.generic && S.env.terrain === "eau" ? "Vitesse de nage estimée (nage « du chien »). " : ""}</p>`;
  el.querySelector("h3").textContent = sp.name;
  el.querySelector("i").textContent = sp.latin || "";
  $("#ficheAdd").onclick = () => addEntry(sp);
}

function fmtDur(t) {
  if (t < 90) return Math.round(t) + " s";
  if (t < 5400) return Math.round(t / 60) + " min";
  if (t < 72 * 3600) return (t / 3600).toFixed(1).replace(".", ",").replace(",0", "") + " h";
  return Math.round(t / 86400) + " jours";
}

function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// ─────────────── Concurrents (couloirs) ───────────────
function renderLineup() {
  const el = $("#lanes");
  el.innerHTML = "";
  $("#laneCount").textContent = `${S.lineup.length} / ${MAX_LANES}`;
  if (!S.lineup.length) {
    el.innerHTML = `<div class="empty">Ajoute des concurrents depuis le catalogue (bouton +).<br>Humain contre animal, ou animaux entre eux : de 2 à 8 couloirs.</div>`;
  }
  S.lineup.forEach((e, i) => {
    const sp = e.sp;
    const c = LANE_COLORS[i];
    const card = document.createElement("div");
    card.className = "lane";
    card.style.setProperty("--c", c);
    const eff = effectiveSpecies(e);
    const baseMass = sp.defaultMass ?? eff.mass;
    const mMin = baseMass * 0.6, mMax = baseMass * 1.6;
    const modes = modesFor(eff, S.env.terrain);
    const fmtMass = (m) => (m >= 10 ? Math.round(m) + " kg" : m >= 1 ? m.toFixed(1) + " kg" : m >= 0.001 ? (m * 1000).toFixed(m < 0.01 ? 2 : 0) + " g" : (m * 1e6).toFixed(0) + " mg");
    card.innerHTML = `<div class="top"><div class="num">${i + 1}</div><div class="ttl"></div><button class="x" title="Retirer">×</button></div>
      <div class="ctl"><span>Masse</span><input type="range" class="mass" min="${mMin}" max="${mMax}" step="${baseMass / 200}" value="${e.mass}"><output>${fmtMass(e.mass)}</output></div>
      <div class="ctl"><span>Condition physique</span><input type="range" class="fit" min="0.6" max="1.15" step="0.01" value="${e.fitness}"><output>${Math.round(e.fitness * 100)} %</output></div>
      ${sp.human ? `<div class="ctl"><span>Entraînement</span><input type="range" class="train" min="0" max="1" step="0.01" value="${e.training}"><output>${trainingLabel(e.training)}</output></div>` : ""}
      ${modes.length > 1 ? `<div class="ctl"><span>Locomotion</span><select class="mode">${modes.map((m) => `<option value="${m}" ${m === e.mode ? "selected" : ""}>${{ land: "Au sol", fly: "En vol", swim: "À la nage" }[m]}</option>`).join("")}</select></div>` : ""}
      <div class="mini"></div>`;
    card.querySelector(".ttl").textContent = sp.name;
    card.querySelector(".x").onclick = () => { S.lineup.splice(i, 1); renderLineup(); renderPrediction(); };
    const upd = () => {
      const p = paramsFor(e);
      const d = describe(p, eff);
      card.querySelector(".mini").innerHTML = d
        ? `<span>Pointe <b>${fmtNum(d.vmax)} km/h</b></span><span>Accél. <b>${d.acc.toFixed(1)} m/s²</b></span><span>Croisière <b>${fmtNum(d.vcs)} km/h</b></span><span>${p.mode === "fly" ? "Vol" : p.mode === "swim" ? "Nage" : "Course"}</span>`
        : `<span style="color:var(--bad)">Incapable de se déplacer sur ce terrain.</span>`;
    };
    const mass = card.querySelector(".mass");
    mass.oninput = () => { e.mass = +mass.value; mass.nextElementSibling.textContent = fmtMass(e.mass); upd(); schedulePred(); };
    const fit = card.querySelector(".fit");
    fit.oninput = () => { e.fitness = +fit.value; fit.nextElementSibling.textContent = Math.round(e.fitness * 100) + " %"; upd(); schedulePred(); };
    const tr = card.querySelector(".train");
    if (tr) tr.oninput = () => {
      e.training = +tr.value; tr.nextElementSibling.textContent = trainingLabel(e.training);
      const eff2 = effectiveSpecies(e); e.mass = eff2.mass; mass.value = e.mass; mass.nextElementSibling.textContent = fmtMass(e.mass);
      upd(); schedulePred();
    };
    const md = card.querySelector(".mode");
    if (md) md.onchange = () => { e.mode = md.value; upd(); schedulePred(); };
    upd();
    el.appendChild(card);
  });
  $("#btnGo").disabled = S.lineup.length < 2;
}

function trainingLabel(t) {
  return t >= 0.97 ? "Élite" : t >= 0.75 ? "National" : t >= 0.5 ? "Club" : t >= 0.25 ? "Loisir" : t > 0.05 ? "Occasionnel" : "Aucun";
}

let predTimer = 0;
function schedulePred() { clearTimeout(predTimer); predTimer = setTimeout(renderPrediction, 180); }

function renderPrediction() {
  const el = $("#pred");
  if (S.lineup.length < 1) { el.innerHTML = "Ajoute au moins deux concurrents."; return; }
  const dists = [...new Set([S.env.distance, 100, 400, 1000, 5000])].sort((a, b) => a - b).slice(0, 5);
  const rows = S.lineup.map((e) => {
    const p = paramsFor(e);
    return { e, times: dists.map((d) => (p.incapable ? Infinity : simulate(p, d, 3600 * 30, d > 3000 ? 0.1 : 0.03).time)) };
  });
  const best = dists.map((_, j) => Math.min(...rows.map((r) => r.times[j])));
  el.innerHTML = `<table class="pred"><tr><th>Concurrent</th>${dists.map((d) => `<th>${d >= 1000 ? d / 1000 + " km" : d + " m"}</th>`).join("")}</tr>
    ${rows.map((r, i) => `<tr><td><span class="dot" style="background:${LANE_COLORS[i]}"></span>${escapeHtml(r.e.sp.name.length > 18 ? r.e.sp.name.slice(0, 17) + "…" : r.e.sp.name)}</td>${r.times.map((t, j) => `<td class="${t === best[j] && isFinite(t) && rows.length > 1 ? "win" : ""}">${fmtTime(t, true)}</td>`).join("")}</tr>`).join("")}
  </table><div class="small" style="margin-top:6px">Le plus rapide en pointe ne gagne pas forcément : tout dépend de la distance, de l'accélération et de la fatigue.</div>`;
}

function renderSettings() {
  const ds = $("#dist");
  ds.innerHTML = "";
  for (const d of DISTANCES) {
    const b = document.createElement("button");
    b.textContent = d >= 1000 ? `${d / 1000} km` : `${d} m`;
    b.className = S.env.distance === d ? "on" : "";
    b.onclick = () => { S.env.distance = d; $("#distCustom").value = ""; renderSettings(); renderPrediction(); };
    ds.appendChild(b);
  }
  const tr = $("#terrain");
  if (!tr.options.length) {
    for (const [k, v] of Object.entries(TERRAINS)) tr.add(new Option(v.name, k));
    for (const [k, v] of Object.entries(WEATHERS)) $("#weather").add(new Option(v.name, k));
  }
  tr.value = S.env.terrain;
  $("#weather").value = S.env.weather;
}

function bindSettings() {
  $("#distCustom").oninput = (ev) => {
    const v = Math.round(+ev.target.value);
    if (v >= 1) { S.env.distance = Math.min(100000, v); [...$("#dist").children].forEach((b) => b.classList.remove("on")); schedulePred(); }
  };
  $("#terrain").onchange = (ev) => {
    S.env.terrain = ev.target.value;
    for (const e of S.lineup) { const ms = modesFor(effectiveSpecies(e), S.env.terrain); if (!ms.includes(e.mode)) e.mode = defaultMode(e.sp, S.env.terrain); }
    renderLineup(); renderPrediction(); if (S.ficheId) renderFiche();
  };
  $("#weather").onchange = (ev) => { S.env.weather = ev.target.value; renderLineup(); renderPrediction(); };
  $("#temp").oninput = (ev) => { S.env.temp = +ev.target.value; $("#tempOut").textContent = `${S.env.temp} °C`; renderLineup(); schedulePred(); };
  $("#scaleSmall").onchange = (ev) => (S.scaleSmall = ev.target.checked);
  $("#q").oninput = (ev) => { S.q = ev.target.value; renderList(); };
  $("#btnClear").onclick = () => { S.lineup = []; renderLineup(); renderPrediction(); };
  $("#btnRandom").onclick = () => {
    const pool = SPECIES.filter((s) => s.vmax > 2 && !s.flyer);
    const pick = () => pool[Math.floor(Math.random() * pool.length)];
    S.lineup = [];
    addEntry(getSpecies("sprinteur-professionnel"));
    addEntry(pick());
  };
  $("#btnGo").onclick = () => startRace();
}

function flash(msg) {
  const a = $("#announce");
  if (!$("#hud").classList.contains("hidden")) { a.innerHTML = msg; return; }
  alert(msg);
}

// ─────────────── Course ───────────────
let R = null; // course en cours
let previewMode = false;

function startRace() {
  if (S.lineup.length < 2) return;
  $("#setup").classList.add("hidden");
  $("#results").classList.add("hidden");
  $("#hud").classList.remove("hidden");
  const env = { ...S.env };
  const entries = S.lineup.map((e, i) => {
    const eff = effectiveSpecies(e);
    const p = paramsFor(e, env);
    const sp2 = { ...eff, look: e.sp.look };
    const cr = buildCreature(sp2);
    return { e, sp: eff, p, cr, color: LANE_COLORS[i], lane: i };
  });
  // Échelle visuelle
  for (const en of entries) {
    const h = Math.max(en.cr.dims.height, en.cr.dims.length * 0.3);
    en.vscale = 1;
    if (S.scaleSmall && h < 0.3) en.vscale = Math.min(60, 0.3 / Math.max(h, 0.003));
    en.cr.root.scale.setScalar(en.vscale);
  }
  const maxW = Math.max(...entries.map((en) => Math.min(en.cr.dims.flyer ? 1.2 : en.cr.dims.width + (en.cr.dims.water ? 0.5 : 0.3), 6) * en.vscale));
  const laneW = Math.max(1.22, Math.min(7, maxW * 1.35));
  const track = new Track(entries.length, laneW);
  const course = new Course(track, env.distance);
  world.build(track, course, env);
  for (const en of entries) world.scene.add(en.cr.root);
  // Temps de réaction au départ
  for (const en of entries) {
    en.r = createRunner(en.p);
    en.react = en.sp.human ? 0.13 + Math.random() * 0.05 + (1 - (en.e.training ?? 1)) * 0.12 : 0.18 + Math.random() * 0.12;
    en.samples = [];
    en.splits = {};
    en.place = 0;
    en.dnf = en.p.incapable ? "Incapable de se déplacer sur ce terrain" : null;
    en.gait = "";
  }
  // Intervalle d'échantillonnage selon la durée prévue
  const preds = entries.map((en) => (en.p.incapable ? 0 : simulate(en.p, env.distance, 3600 * 12, env.distance > 3000 ? 0.1 : 0.03).time)).filter(isFinite);
  const tMax = Math.max(1, ...preds);
  R = {
    env, entries, track, course, t: -3.2, simT: 0, phase: "countdown", speed: tMax > 600 ? 10 : 1, paused: false,
    sampleDt: Math.max(0.05, Math.min(tMax, 3600 * 4) / 1200), lastSample: -1, finishOrder: [], over: false,
    cam: "side", focus: -1, orbit: { yaw: 0.6, pitch: 0.35, dist: 0 }, camPos: new THREE.Vector3(), camLook: new THREE.Vector3(), camInit: false,
    announceT: 0, tMax, stopAt: Infinity,
  };
  buildHudControls();
  renderBoard(true);
  placeRunners(0);
}

function buildHudControls() {
  const cams = [["side", "Latérale", "1"], ["fpv", "1re personne", "2"], ["aerial", "Aérienne", "3"], ["finish", "Arrivée", "4"], ["orbit", "Libre", "5"]];
  const cr = $("#camRow");
  cr.querySelectorAll("button").forEach((b) => b.remove());
  for (const [id, label, key] of cams) {
    const b = document.createElement("button");
    b.textContent = label;
    b.title = `Touche ${key}`;
    b.dataset.cam = id;
    b.onclick = () => setCam(id);
    cr.appendChild(b);
  }
  const sr = $("#speedRow");
  sr.querySelectorAll("button").forEach((b) => b.remove());
  for (const v of [0.25, 0.5, 1, 2, 5, 10, 50, 200]) {
    const b = document.createElement("button");
    b.textContent = `×${v}`.replace(".", ",");
    b.dataset.speed = v;
    b.onclick = () => { R.speed = v; syncHudButtons(); };
    sr.appendChild(b);
  }
  syncHudButtons();
}

function syncHudButtons() {
  if (!R) return;
  $("#camRow").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.cam === R.cam));
  $("#speedRow").querySelectorAll("button").forEach((b) => b.classList.toggle("on", +b.dataset.speed === R.speed));
  $("#btnPause").textContent = R.paused ? "Reprendre" : "Pause";
}

function setCam(id) { if (!R) return; R.cam = id; R.camInit = false; syncHudButtons(); }

$("#btnPause").onclick = () => { if (R) { R.paused = !R.paused; syncHudButtons(); } };
$("#btnRestart").onclick = () => { cleanupRace(); startRace(); };
$("#btnQuit").onclick = () => { cleanupRace(); showSetup(); };
$("#btnFinish").onclick = () => fastForward();

function cleanupRace() {
  if (!R) return;
  for (const en of R.entries) world.scene.remove(en.cr.root);
  $("#labels").innerHTML = "";
  R = null;
}

function showSetup() {
  $("#hud").classList.add("hidden");
  $("#results").classList.add("hidden");
  $("#setup").classList.remove("hidden");
}

// Avance de la simulation.
const PHYS_DT = 1 / 120;
function simulateStep(dt) {
  const D = R.env.distance;
  R.simT += dt;
  for (const en of R.entries) {
    const r = en.r;
    if (en.dnf) continue;
    if (r.finished) { step(r, dt, D); continue; }
    if (R.simT < en.react) continue;
    const before = r.s;
    step(r, dt, D);
    r.tRace = R.simT;
    for (const m of [10, 20, 30, 50, 100, 200, 400, 800, 1000, 1500, 3000, 5000]) {
      if (m < D && !en.splits[m] && r.s >= m) en.splits[m] = R.simT - (r.s - m) / Math.max(r.v, 1e-6);
    }
    if (r.finished) {
      en.time = en.react + r.finishTime;
      R.finishOrder.push(en);
      en.place = R.finishOrder.length;
      if (en.place === 1) {
        R.stopAt = Math.max(en.time * 3, en.time + 240);
        announce(`${escapeHtml(en.sp.name)}<small>vainqueur en ${fmtTime(en.time)}</small>`, 3.5);
        sfx("cheer");
      }
    }
    void before;
  }
  // Échantillons pour les graphiques
  if (R.simT - R.lastSample >= R.sampleDt) {
    R.lastSample = R.simT;
    for (const en of R.entries) {
      if (en.dnf || (en.r.finished && en.samples.length && en.samples[en.samples.length - 1].done)) continue;
      const r = en.r;
      en.samples.push({ t: R.simT, d: r.s, v: r.v * 3.6, e: energyPct(r), f: r.fatigue, a: r.a, done: r.finished });
    }
  }
  const allDone = R.entries.every((en) => en.dnf || en.r.finished);
  if (allDone || R.simT > R.stopAt || R.simT > 3600 * 30) endRace();
}

function fastForward() {
  if (!R || R.over) return;
  if (R.phase === "countdown") { R.t = 0; R.phase = "race"; sfx("gun"); }
  const t0 = performance.now();
  const dt = 0.02;
  while (!R.over && performance.now() - t0 < 4000) {
    for (let k = 0; k < 200 && !R.over; k++) simulateStep(dt);
  }
  if (!R.over) endRace();
}

function endRace() {
  if (R.over) return;
  R.over = true;
  R.phase = "done";
  // Concurrents non arrivés : temps prévu par le modèle (simulation complète, déterministe)
  for (const en of R.entries) {
    if (!en.r.finished && !en.dnf) {
      const res = simulate(en.p, R.env.distance, 3600 * 200, R.env.distance > 3000 ? 0.1 : 0.05);
      en.projected = isFinite(res.time) ? en.react + res.time : Infinity;
      en.dnf = "Course arrêtée (trop loin derrière)";
    }
  }
  setTimeout(showResults, 1600);
}

// Position et animation de chaque concurrent.
const tmpP = {};
function placeRunners(dtAnim) {
  for (const en of R.entries) {
    const r = en.r;
    const pos = R.course.pos(en.lane, r.s + (r.post || 0), tmpP);
    const root = en.cr.root;
    let y = 0;
    if ((en.p.modeUsed || en.p.mode) === "swim") {
      const plan = en.sp.plan;
      y = (world.surfaceY || 0);
      if (plan !== "swim" && plan !== "pinniped" && plan !== "human") y -= (en.cr.dims.hip || 0.3) * en.vscale * (plan === "bird2" || plan === "bird" ? 0.55 : 0.92);
    }
    root.position.set(pos.x, y, pos.z);
    root.rotation.y = pos.yaw;
    en.heading = [pos.hx, pos.hz];
    const st = strideAt(en.p, r.v);
    const started = R.phase !== "countdown" && R.simT >= en.react;
    en.cr.update(dtAnim, {
      v: r.v, a: r.a, vmax: en.p.vmax || 1, acc: en.p.acc, f: st.f, fatigue: r.fatigue, heat: r.p.heatTol ? r.H / r.p.heatTol : 0,
      mode: en.p.modeUsed || en.p.mode, started, crouch: R.phase === "countdown" && R.t > -2.2, blocks: en.sp.human?.profile === "sprint" && R.env.distance <= 400,
      t: Math.max(0, R.simT - en.react), effort: r.v / Math.max(en.p.vmax, 0.1),
    });
  }
}

function announce(html, dur = 1.2) {
  const a = $("#announce");
  a.innerHTML = html;
  a.style.opacity = 1;
  R.announceT = dur;
}

// ─────────────── Caméras ───────────────
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
function leaderIndex() {
  let best = -1, bd = -1;
  R.entries.forEach((en, i) => { if (!en.dnf || en.r.s > 0) { if (en.r.s > bd) { bd = en.r.s; best = i; } } });
  return Math.max(0, best);
}

function focusEntry() { return R.entries[R.focus >= 0 ? R.focus : leaderIndex()]; }

function updateCamera(dt) {
  const en = focusEntry();
  const root = en.cr.root;
  const size = Math.max(0.4, Math.max(en.cr.dims.height, en.cr.dims.length * 0.6) * en.vscale);
  const fp = root.position.clone();
  const hx = en.heading?.[0] ?? 1, hz = en.heading?.[1] ?? 0;
  const right = V3(-hz, 0, hx);
  const fwd = V3(hx, 0, hz);
  let want = new THREE.Vector3(), look = new THREE.Vector3();
  const k = R.camInit ? 1 - Math.exp(-dt * 3.5) : 1;
  const outer = R0 + R.track.lanes * R.track.w;
  if (R.cam === "side") {
    // Groupe des concurrents proches du point suivi
    const near = R.entries.filter((o) => Math.abs(o.r.s - en.r.s) < Math.max(25, size * 8));
    let minS = Infinity, maxS = -Infinity, maxH = size;
    for (const o of near) { minS = Math.min(minS, o.r.s); maxS = Math.max(maxS, o.r.s); maxH = Math.max(maxH, Math.max(o.cr.dims.height, o.cr.dims.length * 0.6) * o.vscale); }
    // Écran étroit (téléphone en portrait) : on cadre surtout le concurrent suivi.
    const portrait = camera.aspect < 0.9;
    if (portrait) { minS = maxS = en.r.s; }
    const mid = (minS + maxS) / 2;
    const p = R.course.pos(en.lane, mid + (en.r.post || 0), {});
    const lanesW = R.track.lanes * R.track.w;
    const narrow = 1 / Math.min(1, Math.max(0.7, camera.aspect * 1.25));
    const dist = Math.max(4, maxH * 3.2, (maxS - minS) * 0.75 + maxH * 2, lanesW * 0.9) * narrow;
    const laneOff = (R.track.lanes - 1 - en.lane) * R.track.w;
    const c = V3(p.x, 0, p.z);
    // Ne pas entrer dans les tribunes : au-delà de 5 m hors piste, on prend de la hauteur.
    const room = laneOff + R.track.w * 0.5 + 5;
    let side = dist + laneOff, up = Math.max(1.2, maxH * 0.9) + (world.surfaceY || 0);
    if (side > room) { up += (side - room) * 0.5; side = room; }
    let flyAlt = 0;
    for (const o of near) if (o.cr.dims.flyer) flyAlt = Math.max(flyAlt, o.cr.dims.height * 0.8);
    up += flyAlt;
    want.copy(c).addScaledVector(V3(-p.hz, 0, p.hx), side).add(V3(0, up, 0)).addScaledVector(V3(p.hx, 0, p.hz), portrait ? 0 : -dist * 0.12);
    look.copy(c).addScaledVector(V3(-p.hz, 0, p.hx), -lanesW * 0.25 + laneOff * 0.5).add(V3(0, (portrait ? maxH * 0.4 - dist * 0.1 : maxH * 0.45) + flyAlt * 0.8 + (world.surfaceY || 0), 0));
  } else if (R.cam === "fpv") {
    en.cr.eye.getWorldPosition(want);
    want.addScaledVector(fwd, size * 0.05);
    look.copy(want).addScaledVector(fwd, 20).add(V3(0, -0.4 * Math.min(size, 2), 0));
    camera.position.copy(want);
    camera.lookAt(look);
    camera.fov = 75;
    camera.near = Math.max(0.002, size * 0.02);
    camera.updateProjectionMatrix();
    R.camInit = true;
    return;
  } else if (R.cam === "aerial") {
    const d = Math.max(12, size * 9) / Math.min(1, camera.aspect * 1.25);
    want.copy(fp).addScaledVector(fwd, -d * 0.7).addScaledVector(right, d * 0.35).add(V3(0, d * 1.1, 0));
    look.copy(fp).addScaledVector(fwd, d * 0.3);
  } else if (R.cam === "finish") {
    const fx = STRAIGHT / 2;
    want.set(fx + 2, 2.2, outer + Math.max(6, R.track.lanes * R.track.w * 0.9));
    look.set(fx, 0.6, (R0 + outer) / 2);
    const lead = R.entries[leaderIndex()];
    if (R.course.straight || R.env.distance - lead.r.s < 120) look.lerp(lead.cr.root.position, 0.25);
  } else {
    const o = R.orbit;
    if (!o.dist) o.dist = Math.max(4, size * 4);
    want.set(fp.x + Math.cos(o.yaw) * Math.cos(o.pitch) * o.dist, fp.y + Math.sin(o.pitch) * o.dist + size * 0.3, fp.z + Math.sin(o.yaw) * Math.cos(o.pitch) * o.dist);
    look.copy(fp).add(V3(0, size * 0.4, 0));
  }
  // Lissage des décalages relatifs au concurrent suivi (pas de retard sur les sprinteurs rapides).
  const anchor = R.cam === "finish" ? new THREE.Vector3() : fp;
  const offW = want.clone().sub(anchor), offL = look.clone().sub(anchor);
  if (!R.camInit) { R.camPos.copy(offW); R.camLook.copy(offL); R.camInit = true; }
  R.camPos.lerp(offW, R.cam === "orbit" ? 1 : k);
  R.camLook.lerp(offL, R.cam === "orbit" ? 1 : Math.min(1, k * 1.6));
  camera.position.copy(anchor).add(R.camPos);
  const lookAt = anchor.clone().add(R.camLook);
  if (camera.position.y < 0.15 && R.env.terrain !== "eau") camera.position.y = 0.15;
  camera.lookAt(lookAt);
  const fov = R.cam === "finish" ? 40 : 50;
  if (camera.fov !== fov || camera.near !== 0.05) { camera.fov = fov; camera.near = 0.05; camera.updateProjectionMatrix(); }
}

// Caméra libre : glisser pour tourner, molette pour zoomer
let drag = null;
canvas.addEventListener("pointerdown", (e) => { if (R && R.cam === "orbit") drag = { x: e.clientX, y: e.clientY }; });
window.addEventListener("pointerup", () => (drag = null));
window.addEventListener("pointermove", (e) => {
  if (!drag || !R) return;
  R.orbit.yaw += (e.clientX - drag.x) * 0.006;
  R.orbit.pitch = Math.max(-0.1, Math.min(1.45, R.orbit.pitch + (e.clientY - drag.y) * 0.005));
  drag = { x: e.clientX, y: e.clientY };
});
canvas.addEventListener("wheel", (e) => {
  if (!R || R.cam !== "orbit") return;
  R.orbit.dist = Math.max(0.2, Math.min(400, (R.orbit.dist || 5) * Math.exp(e.deltaY * 0.001)));
}, { passive: true });
window.addEventListener("keydown", (e) => {
  if (!R || $("#hud").classList.contains("hidden")) return;
  if (e.target.tagName === "INPUT") return;
  const cams = { 1: "side", 2: "fpv", 3: "aerial", 4: "finish", 5: "orbit" };
  if (cams[e.key]) setCam(cams[e.key]);
  if (e.key === " ") { R.paused = !R.paused; syncHudButtons(); e.preventDefault(); }
  if (e.key === "Tab") { R.focus = (R.focus + 2) % (R.entries.length + 1) - 1; R.camInit = false; renderBoard(true); e.preventDefault(); }
  if (e.key === "c" || e.key === "C") { const ids = ["side", "fpv", "aerial", "finish", "orbit"]; setCam(ids[(ids.indexOf(R.cam) + 1) % ids.length]); }
});

// ─────────────── Tableau de bord ───────────────
let boardT = 0;
function ranking() {
  return [...R.entries].sort((a, b) => {
    if (a.r.finished && b.r.finished) return a.time - b.time;
    if (a.r.finished) return -1;
    if (b.r.finished) return 1;
    return b.r.s - a.r.s;
  });
}

function renderBoard(force) {
  if (!R) return;
  const rk = ranking();
  const pos = new Map(rk.map((en, i) => [en, i + 1]));
  const rows = R.entries.map((en, i) => {
    const r = en.r;
    const tRun = Math.max(0, R.simT - en.react);
    const avg = r.finished ? R.env.distance / Math.max(r.finishTime, 1e-6) : tRun > 0 ? r.s / tRun : 0;
    const e = energyPct(r), f = r.fatigue;
    const status = en.dnf && !r.finished && en.p.incapable ? "immobile" : r.finished ? fmtTime(en.time) : `${fmtNum(r.s)} m`;
    return `<tr data-i="${i}" class="${(R.focus === i) ? "focus" : ""}">
      <td>${pos.get(en)}</td>
      <td><span class="dot" style="background:${en.color}"></span><span class="nm2">${escapeHtml(en.sp.name)}</span> <span class="gait">${en.gait || ""}</span></td>
      <td><b>${(r.v * 3.6).toFixed(1)}</b></td>
      <td class="opt">${(avg * 3.6).toFixed(1)}</td>
      <td>${status}</td>
      <td class="opt">${r.a >= 0 ? "+" : ""}${r.a.toFixed(1)}</td>
      <td>${Math.round(e)}%<span class="bar"><i style="width:${e}%"></i></span></td>
      <td class="opt">${Math.round(f)}%<span class="bar f"><i style="width:${f}%"></i></span></td>
    </tr>`;
  }).join("");
  $("#board").innerHTML = `<table><tr><th>#</th><th>Concurrent</th><th>km/h</th><th class="opt">moy.</th><th>Distance</th><th class="opt">m/s²</th><th>Énergie</th><th class="opt">Fatigue</th></tr>${rows}</table>
    <div class="small muted" style="padding:4px 5px 0">Clique une ligne pour suivre ce concurrent · <kbd>Tab</kbd> suivant · <kbd>1</kbd>–<kbd>5</kbd> caméras</div>`;
  $("#board").querySelectorAll("tr[data-i]").forEach((tr) => (tr.onclick = () => { const i = +tr.dataset.i; R.focus = R.focus === i ? -1 : i; R.camInit = false; renderBoard(true); }));
  const D = R.env.distance;
  const env = R.env;
  $("#raceInfo").innerHTML = `<b>${D >= 1000 ? D / 1000 + " km" : D + " m"}</b> · ${TERRAINS[env.terrain].name} · ${WEATHERS[env.weather].name} · ${env.temp} °C<br>${R.paused ? "En pause" : R.phase === "countdown" ? "Départ imminent" : R.over ? "Course terminée" : "Vitesse de lecture ×" + String(R.speed).replace(".", ",")}`;
  // Fiche du concurrent suivi
  const en = focusEntry();
  const r = en.r;
  const st = strideAt(en.p, r.v);
  const tRun = Math.max(0, R.simT - en.react);
  $("#focusInfo").innerHTML = `<h4><span class="dot" style="background:${en.color}"></span>${escapeHtml(en.sp.name)}</h4>
    <div class="big">${(r.v * 3.6).toFixed(1)} <span class="small muted">km/h</span></div>
    <div class="kv">
      <span>Position</span><span>${pos.get(en)}e / ${R.entries.length}</span>
      <span>Distance</span><span>${fmtNum(r.s)} m / ${fmtNum(D)} m</span>
      <span>Vitesse moyenne</span><span>${tRun > 0 ? ((r.s / tRun) * 3.6).toFixed(1) : "0"} km/h</span>
      <span>Pointe atteinte</span><span>${(r.vPeak * 3.6).toFixed(1)} km/h</span>
      <span>Accélération</span><span>${r.a.toFixed(2)} m/s²</span>
      <span>Énergie restante</span><span>${Math.round(energyPct(r))} %</span>
      <span>Réserve anaérobie</span><span>${en.p.E0 ? Math.round((r.E / en.p.E0) * 100) : 0} %</span>
      <span>Glycogène</span><span>${Math.round(r.G * 100)} %</span>
      <span>Fatigue</span><span>${Math.round(r.fatigue)} %</span>
      <span>Échauffement corporel</span><span>+${r.H.toFixed(2)} °C</span>
      <span>${en.p.mode === "fly" ? "Battements" : "Foulée"}</span><span>${st.l ? (st.l >= 1 ? st.l.toFixed(2) + " m" : (st.l * 100).toFixed(1) + " cm") : "—"} · ${st.f.toFixed(1)}/s</span>
      <span>Allure</span><span>${r.resting ? "récupère" : en.gait || "—"}</span>
    </div>${en.dnf && en.p.incapable ? `<div class="small" style="color:var(--bad);margin-top:6px">${en.dnf}</div>` : ""}`;
}

function liveChart() {
  const series = R.entries.map((en) => ({ color: en.color, pts: en.samples.map((s) => [s.t, s.v]) }));
  drawChart($("#liveChart"), series, { title: "Vitesse (km/h) en fonction du temps (s)", xFmt: (x) => fmtNum(x) });
}

// Étiquettes au-dessus des concurrents
const tagEls = new Map();
const projV = new THREE.Vector3();
function updateLabels() {
  const box = $("#labels");
  const W = window.innerWidth, H = window.innerHeight;
  const rk = ranking();
  R.entries.forEach((en, i) => {
    let el = tagEls.get(en);
    if (!el || !box.contains(el)) {
      el = document.createElement("div");
      el.className = "tag";
      el.style.setProperty("--c", en.color);
      box.appendChild(el);
      tagEls.set(en, el);
    }
    const h = Math.max(en.cr.dims.height, 0.05) * en.vscale;
    projV.copy(en.cr.root.position).add(V3(0, h * 1.15 + 0.15, 0));
    if (en.cr.dims.flyer) projV.y += 0.5;
    projV.project(camera);
    const vis = projV.z < 1 && projV.z > -1 && (R.cam !== "fpv" || R.focus !== i);
    if (!vis) { el.style.display = "none"; return; }
    el.style.display = "";
    el.style.left = ((projV.x + 1) / 2) * W + "px";
    el.style.top = ((1 - projV.y) / 2) * H + "px";
    const p = rk.indexOf(en) + 1;
    el.innerHTML = `<i>${p}</i>${escapeHtml(shortName(en.sp.name))}${en.vscale > 1.05 ? ` <span class="muted">×${Math.round(en.vscale)}</span>` : ""}`;
  });
}
function shortName(n) { const s = n.replace(/\s*\(.*\)/, ""); return s.length > 22 ? s.slice(0, 21) + "…" : s; }

// ─────────────── Résultats ───────────────
function showResults() {
  if (!R) return;
  const D = R.env.distance;
  const rk = [...R.entries].sort((a, b) => (a.time ?? a.projected ?? Infinity) - (b.time ?? b.projected ?? Infinity));
  const win = rk[0];
  const wt = win.time ?? win.projected;
  const medal = ["#f0c030", "#c8ccd4", "#d08850"];
  const rows = rk.map((en, i) => {
    const t = en.time ?? en.projected;
    const avg = isFinite(t) ? (D / Math.max(t - en.react, 1e-6)) * 3.6 : 0;
    const gap = i && isFinite(t) && isFinite(wt) ? "+" + fmtTime(t - wt) : "";
    const s0 = en.samples;
    const last = s0[s0.length - 1];
    const sp100 = en.splits[100] ? fmtTime(en.splits[100] - en.react) : D <= 100 && en.time ? fmtTime(en.time - en.react) : "—";
    const st = strideAt(en.p, en.r.vPeak);
    return `<tr><td>${isFinite(t) ? (i < 3 ? `<span class="medal" style="background:${medal[i]}">${i + 1}</span>` : i + 1) : "—"}</td>
      <td><span class="dot" style="background:${en.color}"></span>${escapeHtml(en.sp.name)}${en.dnf && !en.time ? `<div class="small muted">${en.p.incapable ? en.dnf : "Temps estimé par le modèle"}</div>` : ""}</td>
      <td><b>${en.p.incapable ? "—" : fmtTime(t)}</b>${en.dnf && !en.time && isFinite(t) ? "*" : ""}</td><td>${gap}</td>
      <td>${(en.r.vPeak * 3.6).toFixed(1)}</td><td>${avg ? avg.toFixed(1) : "—"}</td><td>${sp100}</td>
      <td>${last ? Math.round(last.e) + " %" : "—"}</td><td>${en.r.vPeak > 0 ? (st.l >= 1 ? st.l.toFixed(2) + " m" : (st.l * 100).toFixed(1) + " cm") + " · " + st.f.toFixed(1) + "/s" : "—"}</td><td>${en.react.toFixed(2)} s</td></tr>`;
  }).join("");
  const explain = explainResult(rk);
  $("#resCard").innerHTML = `<h2>Résultats : ${D >= 1000 ? D / 1000 + " km" : D + " m"}</h2>
    <div class="muted">${TERRAINS[R.env.terrain].name} · ${WEATHERS[R.env.weather].name} · ${R.env.temp} °C</div>
    <div style="overflow-x:auto"><table class="podium"><tr><th>Rang</th><th>Concurrent</th><th>Temps</th><th>Écart</th><th>Pointe km/h</th><th>Moyenne km/h</th><th>100 m</th><th>Énergie à l'arrivée</th><th>Foulée à la pointe</th><th>Réaction</th></tr>${rows}</table></div>
    <p class="explain">${explain}</p>
    <div class="charts">
      <div class="cb"><canvas id="ch1"></canvas></div>
      <div class="cb"><canvas id="ch2"></canvas></div>
      <div class="cb"><canvas id="ch3"></canvas></div>
      <div class="cb"><canvas id="ch4"></canvas></div>
    </div>
    <div class="legend">${R.entries.map((en) => `<span><span class="dot" style="background:${en.color}"></span>${escapeHtml(en.sp.name)}</span>`).join("")}</div>
    <div class="actions"><button class="btn" id="rView">Revoir la piste</button><button class="btn" id="rAgain">Rejouer</button><button class="btn primary" id="rNew">Nouvelle course</button></div>`;
  $("#results").classList.remove("hidden");
  const S1 = R.entries.map((en) => ({ color: en.color, pts: en.samples.map((s) => [s.d, s.v]) }));
  const S2 = R.entries.map((en) => ({ color: en.color, pts: en.samples.map((s) => [s.d, s.e]) }));
  const S3 = R.entries.map((en) => ({ color: en.color, pts: en.samples.map((s) => [s.t, s.f]) }));
  const S4 = R.entries.map((en) => ({ color: en.color, pts: en.samples.map((s) => [s.t, s.d]) }));
  drawChart($("#ch1"), S1, { title: "Vitesse (km/h) selon la distance (m)" });
  drawChart($("#ch2"), S2, { title: "Énergie restante (%) selon la distance (m)", yMax: 100 });
  drawChart($("#ch3"), S3, { title: "Fatigue (%) selon le temps (s)", yMax: 100 });
  drawChart($("#ch4"), S4, { title: "Distance parcourue (m) selon le temps (s)" });
  $("#rView").onclick = () => $("#results").classList.add("hidden");
  $("#rAgain").onclick = () => { cleanupRace(); startRace(); };
  $("#rNew").onclick = () => { cleanupRace(); showSetup(); };
}

function fmtDist(d) { return d >= 1000 ? `${fmtNum(d / 1000).replace(".", ",")} km` : `${Math.round(d)} m`; }

function explainResult(rk) {
  const valid = rk.filter((en) => !en.p.incapable);
  if (valid.length < 2) return "";
  const fastestTop = [...valid].sort((a, b) => b.p.vmax - a.p.vmax)[0];
  const win = rk[0];
  const D = R.env.distance;
  const parts = [];
  if (fastestTop !== win) {
    parts.push(`${escapeHtml(fastestTop.sp.name)} a la meilleure vitesse de pointe (${fmtNum(fastestTop.p.vmax * 3.6)} km/h) mais ${escapeHtml(win.sp.name)} gagne : sur ${fmtDist(D)}, l'endurance et la gestion de la fatigue comptent plus que la vitesse maximale.`);
    const sOut = fastestTop.samples.find((s) => s.e < 15);
    if (sOut) parts.push(`${escapeHtml(fastestTop.sp.name)} a épuisé sa réserve vers ${fmtDist(sOut.d)}.`);
  } else {
    parts.push(`${escapeHtml(win.sp.name)} combine la meilleure pointe et assez d'énergie pour la tenir sur ${fmtDist(D)}.`);
  }
  const quick = [...valid].sort((a, b) => (a.splits[20] ?? 99) - (b.splits[20] ?? 99))[0];
  if (quick.splits[20]) parts.push(`Meilleur départ : ${escapeHtml(quick.sp.name)} (20 m en ${fmtTime(quick.splits[20] - quick.react)}).`);
  const proj = rk.filter((en) => en.projected && isFinite(en.projected));
  if (proj.length) parts.push(`* Concurrents encore en course à l'arrêt : temps calculé par le même modèle physiologique.`);
  return parts.join(" ");
}

// ─────────────── Sons (synthétisés) ───────────────
let actx = null;
function sfx(kind) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime;
    const len = kind === "gun" ? 0.4 : kind === "cheer" ? 2.5 : 0.15;
    const buf = actx.createBuffer(1, actx.sampleRate * len, actx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      const x = i / d.length;
      d[i] = (Math.random() * 2 - 1) * (kind === "gun" ? Math.exp(-x * 18) : kind === "cheer" ? Math.sin(Math.PI * x) * 0.35 * (0.7 + 0.3 * Math.sin(i / 900)) : Math.exp(-x * 8) * 0.3);
    }
    const src = actx.createBufferSource();
    src.buffer = buf;
    const f = actx.createBiquadFilter();
    f.type = kind === "cheer" ? "bandpass" : "lowpass";
    f.frequency.value = kind === "cheer" ? 1200 : kind === "gun" ? 2500 : 900;
    const g = actx.createGain();
    g.gain.value = kind === "beep" ? 0.25 : 0.6;
    src.connect(f).connect(g).connect(actx.destination);
    if (kind === "beep") {
      const o = actx.createOscillator();
      o.frequency.value = 880;
      const og = actx.createGain();
      og.gain.setValueAtTime(0.15, t);
      og.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.connect(og).connect(actx.destination);
      o.start(t); o.stop(t + 0.22);
      return;
    }
    src.start(t);
  } catch { /* son indisponible */ }
}

// ─────────────── Boucle ───────────────
const clock = new THREE.Clock();
const idleCam = { a: 0 };
function frame() {
  requestAnimationFrame(frame);
  const dtReal = Math.min(clock.getDelta(), 0.1);
  if (R) {
    let simAdvance = 0;
    if (!R.paused) {
      if (R.phase === "countdown") {
        const prev = R.t;
        R.t += dtReal;
        if (prev < -2.2 && R.t >= -2.2) { announce("À vos marques…", 1); sfx("beep"); }
        if (prev < -1.0 && R.t >= -1.0) { announce("Prêts…", 1); sfx("beep"); }
        if (R.t >= 0) { R.phase = "race"; announce("Partez !", 0.8); sfx("gun"); }
      } else if (!R.over) {
        simAdvance = dtReal * R.speed;
        let n = Math.ceil(simAdvance / PHYS_DT);
        const maxSteps = 4000;
        let dt = PHYS_DT;
        if (n > maxSteps) { dt = simAdvance / maxSteps; n = maxSteps; }
        for (let i = 0; i < n && !R.over; i++) simulateStep(dt);
      } else {
        // Après la course : les concurrents ralentissent au-delà de la ligne.
        for (const en of R.entries) if (en.r.finished) step(en.r, dtReal * Math.min(R.speed, 2), R.env.distance);
      }
    }
    const dtAnim = R.paused ? 0 : R.phase === "countdown" ? dtReal : Math.min(dtReal * R.speed, dtReal * 3);
    for (const en of R.entries) {
      const vr = en.r.v;
      en.gait = en.p.mode === "fly" ? "vol" : en.p.mode === "swim" ? "nage" : vr < 0.05 ? (R.phase === "countdown" ? "prêt" : "arrêt") : en.sp.biped ? (vr > 2.2 ? "course" : "marche") : (GAIT_FR[gaitName(en)] || "");
    }
    placeRunners(dtAnim);
    updateCamera(dtReal);
    const ex = R.phase === "race" ? 0.6 : R.over ? 1 : 0.2;
    world.update(dtReal, R.entries[leaderIndex()].cr.root.position, ex);
    const tShow = R.phase === "countdown" ? 0 : Math.max(0, Math.min(R.simT, R.finishOrder[0]?.time ?? Infinity));
    $("#chrono").textContent = fmtClock(R.phase === "countdown" ? 0 : R.simT);
    world.setClock(fmtClock(tShow, true));
    if (R.announceT > 0) { R.announceT -= dtReal; if (R.announceT <= 0) $("#announce").style.opacity = 0; }
    boardT -= dtReal;
    if (boardT <= 0) { boardT = 0.12; renderBoard(); liveChart(); }
    updateLabels();
  } else if (previewMode) {
    /* aperçu figé */
  } else {
    // Vue d'ambiance derrière l'écran de préparation
    idleCam.a += dtReal * 0.05;
    camera.position.set(Math.cos(idleCam.a) * 120, 40, Math.sin(idleCam.a) * 90);
    camera.lookAt(0, 0, 0);
    world.update(dtReal, new THREE.Vector3(0, 0, 0), 0);
  }
  renderer.render(world.scene, camera);
}

function gaitName(en) {
  // Même logique que le modèle : nombre de Froude
  const h = Math.max(en.cr.dims.hip || 0.5, 0.02);
  const v = en.r.v;
  const fr = (v * v) / (9.81 * h);
  const g = en.sp.gait;
  if (g === "amble") return "amble";
  if (g === "trot") return fr < 0.35 ? "walk" : "trot";
  if (g === "pace") return fr < 0.3 ? "walk" : "pace";
  if (g === "hop") return "hop";
  if (g === "bound" || g === "halfbound") return fr < 0.15 ? "walk" : g;
  if (g === "serpentine" || g === "sidewind" || g === "rectilinear") return "";
  if (fr < 0.4) return "walk";
  if (fr < 2.2) return "trot";
  if (fr < 3.2) return "canter";
  return g === "transverse" ? "transverse" : "rotary";
}

function fmtClock(t, board = false) {
  if (t < 60) return t.toFixed(2).replace(".", board ? "." : ",");
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
  const sec = s.toFixed(board ? 1 : 2).padStart(board ? 4 : 5, "0").replace(".", board ? "." : ",");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

// ─────────────── Démarrage ───────────────
function init() {
  $("#countLine").textContent = `${SPECIES.length} espèces, races et profils humains · physiologie inspirée du modèle de Keller · fatigue, chaleur et terrain`;
  renderCats();
  renderList();
  renderSettings();
  bindSettings();
  renderLineup();
  // Duel de démonstration
  addEntry(getSpecies("sprinteur-professionnel"));
  addEntry(getSpecies("guepard"));
  S.ficheId = "guepard";
  renderFiche();
  // Décor d'ambiance
  const track = new Track(8, 1.22);
  world.build(track, new Course(track, 400), S.env);
  $("#loading").classList.add("hidden");
  $("#setup").classList.remove("hidden");
  frame();
}

try { init(); } catch (err) {
  $("#loading").textContent = "Erreur au chargement : " + err.message;
  console.error(err);
}

// Accès de débogage : aperçu d'un modèle seul (utilisé pour les vérifications visuelles).
const preview = { list: [] };
function viewModel(ids, vfrac = 0.8, view = "side", phaseT = 0.3) {
  for (const c of preview.list) world.scene.remove(c.root);
  preview.list = [];
  $("#setup").classList.add("hidden");
  let x = 0;
  let maxH = 0.1;
  for (const id of ids) {
    const sp0 = getSpecies(id);
    const ter = sp0.vmax > 0 || sp0.fly ? "piste" : "eau";
    const e = { sp: sp0, fitness: 1, training: sp0.human ? sp0.human.training : 1, mode: defaultMode(sp0, ter) };
    const eff = effectiveSpecies(e);
    e.mass = eff.mass;
    const p = paramsFor(e, { ...S.env, terrain: ter });
    const cr = buildCreature({ ...eff, look: sp0.look });
    cr.root.position.set(0, 0, x);
    world.scene.add(cr.root);
    const v = (p.vmax || 1) * vfrac;
    const st = strideAt(p, v);
    const s = { v, a: 0, vmax: p.vmax || 1, acc: p.acc, f: st.f, fatigue: 20, heat: 0, mode: p.modeUsed || p.mode, started: true, t: 2, effort: vfrac };
    for (let k = 0; k < 30; k++) cr.update(phaseT / 30, s);
    preview.list.push(cr);
    const w = Math.max(cr.dims.width, 0.2);
    x += w * 2.2;
    maxH = Math.max(maxH, cr.dims.height, cr.dims.length * 0.5);
  }
  const cz = x / 2 - (preview.list[preview.list.length - 1]?.dims.width ?? 0.2) * 1.1;
  const d = Math.max(maxH * 2.6, x * 0.9);
  if (view === "side") camera.position.set(0, maxH * 0.6, cz - d);
  else if (view === "front") camera.position.set(d, maxH * 0.6, cz);
  else camera.position.set(d * 0.6, maxH * 0.9, cz - d * 0.7);
  camera.lookAt(0, maxH * 0.45, cz);
  camera.near = Math.max(0.001, maxH * 0.01);
  camera.updateProjectionMatrix();
  world.sun.position.set(30, 60, -40);
  world.sun.target.position.set(0, 0, cz);
  previewMode = true;
}
function advance(sec) {
  if (!R) return;
  if (R.phase === "countdown") { R.phase = "race"; R.t = 0; }
  const n = Math.round(sec / PHYS_DT);
  for (let i = 0; i < n && !R.over; i++) { simulateStep(PHYS_DT); if (i % 4 === 0) placeRunners(PHYS_DT * 4); }
  R.camInit = false;
}
window.__course = { S, get R() { return R; }, world, camera, startRace, SPECIES, viewModel, advance };
