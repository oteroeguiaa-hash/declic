// Selva : survie en Amazonie — boucle principale, chargement, interactions, sauvegarde.
import * as THREE from "three";
import { World, makeDetailTexture, makeWaterNormalTexture } from "./world.js";
import { makeTerrainTextures } from "./textures.js";
import { Environment } from "./sky.js";
import { Props, PROP_TYPES } from "./props.js";
import { Grass, Undergrowth } from "./ground.js";
import { Creatures } from "./creatures.js";
import { Structures } from "./structures.js";
import { Player } from "./player.js";
import { Input } from "./input.js";
import { Sounds } from "./audio.js";
import { UI } from "./ui.js";
import { ITEMS, TOOLS, RECIPES, TOOL_SLOTS, Inventory } from "./items.js";
import { Post } from "./post.js";
import { Reflection } from "./reflection.js";
import { Fish } from "./fish.js";
import { BuildSystem, PIECES, BUILD_CATS } from "./build.js";
import { registerFurniture } from "./furniture.js";
import { MapView } from "./map.js";
import { Birds } from "./birds.js";
import { Insects } from "./insects.js";
import { Herps } from "./herps.js";
import { setFurShells } from "./anatomy.js";
import { Rain } from "./rain.js";

const SAVE_KEY = "selva-save-v1";
const OLD_SAVE_KEYS = [];
const SETTINGS_KEY = "selva-settings";
const $ = (id) => document.getElementById(id);
const SPECIES_PALM = new Set(["acai", "buriti", "paxiuba"]);

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};

// treeNear : arbres détaillés · treeFar : au-delà, imposteurs (toute l'île reste visible)
const PRESETS = {
  low:    { reflections: 0, msaa: 0, fxaa: true, ssao: 0, raySamples: 24, rayScale: 0.25, shadows: true, shadowSize: 1024, shadowRange: 32, shadowSoft: 1, viewDistance: 330, treeNear: 20, treeFar: 95, cullCos: 0.2, grassCount: 9000, grassRadius: 16, undergrowth: 2400, undergrowthRadius: 22, lodScale: 0.6, envInterval: 20, atlasScale: 0.5, impostorTile: 96, impostorThin: 1, terrainTex: 256, maxDeer: 5, maxSquirrels: 3, maxWolves: 4, maxCreatures: 16, antialias: false, maxPixelRatio: 1.0 },
  medium: { reflections: 0.25, msaa: 0, fxaa: true, ssao: 1, raySamples: 36, rayScale: 0.35, shadows: true, shadowSize: 2048, shadowRange: 50, shadowSoft: 2, viewDistance: 480, treeNear: 30, treeFar: 150, cullCos: 0.12, grassCount: 24000, grassRadius: 24, undergrowth: 5000, undergrowthRadius: 32, lodScale: 0.9, envInterval: 10, atlasScale: 1, impostorTile: 128, impostorThin: 0, terrainTex: 512, maxDeer: 6, maxSquirrels: 4, maxWolves: 5, maxCreatures: 24, antialias: true, maxPixelRatio: 1.5 },
  high:   { reflections: 0.35, msaa: 4, fxaa: false, ssao: 2, raySamples: 48, rayScale: 0.4, shadows: true, shadowSize: 4096, shadowRange: 70, shadowSoft: 2, viewDistance: 620, treeNear: 45, treeFar: 220, cullCos: 0.08, grassCount: 42000, grassRadius: 30, undergrowth: 8500, undergrowthRadius: 42, lodScale: 1.25, envInterval: 6, atlasScale: 1, impostorTile: 128, impostorThin: 0, terrainTex: 512, maxDeer: 8, maxSquirrels: 5, maxWolves: 6, maxCreatures: 32, antialias: true, maxPixelRatio: 1.6 },
};

function detectQuality() {
  const touch = matchMedia("(pointer: coarse)").matches;
  const mem = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 4;
  if (touch) return mem >= 6 && cores >= 8 ? "medium" : "low";
  return cores >= 8 && mem >= 8 ? "high" : "medium";
}

const DEFAULTS = {
  quality: "auto", shadows: "auto", grass: "auto", viewDist: "auto", ssao: true, rays: true, bloom: true, mist: true, reflections: true, dynres: true,
  difficulty: "normal", dayMinutes: 16, hints: true,
  sens: 1, invertY: false, fov: 72, headBob: true,
  volume: 80,
  uiScale: "1", compass: true, crosshair: true, fps: false,
};
const savedSettings = store.get(SETTINGS_KEY) || {};
if (savedSettings.sound === false && savedSettings.volume == null) savedSettings.volume = 0;
const settings = Object.assign({}, DEFAULTS, savedSettings);

export const DIFFS = {
  paisible:  { label: "Paisible",  predators: false, damage: 0.5, hunger: 0.6, wolves: 0, bears: 0, sick: 0.3 },
  normal:    { label: "Normal",    predators: true,  damage: 1,   hunger: 1,   wolves: 1, bears: 1, sick: 1 },
  difficile: { label: "Difficile", predators: true,  damage: 1.5, hunger: 1.4, wolves: 1.6, bears: 2, sick: 1.5 },
};
// Distance des arbres en 3D (au-delà : imposteurs ; le paysage reste entier jusqu'à l'horizon)
const VIEW = { proche: 0.7, normale: 1, loin: 1.35, tresloin: 1.75 };

const qualityName = settings.quality === "auto" ? detectQuality() : settings.quality;
const Q = { ...PRESETS[qualityName], name: qualityName };
if (settings.shadows === "off") Q.shadows = false;
else if (settings.shadows === "normal") Object.assign(Q, { shadows: true, shadowSize: 2048, shadowRange: 48 });
else if (settings.shadows === "fine") Object.assign(Q, { shadows: true, shadowSize: 4096, shadowRange: 60 });
if (settings.grass === "low") Object.assign(Q, { grassCount: Math.round(Q.grassCount * 0.5), grassRadius: Q.grassRadius * 0.8 });
else if (settings.grass === "normal") Object.assign(Q, { grassCount: PRESETS.medium.grassCount, grassRadius: PRESETS.medium.grassRadius });
else if (settings.grass === "high") Object.assign(Q, { grassCount: Math.round(Q.grassCount * 1.6), grassRadius: Q.grassRadius * 1.15 });
const baseTreeFar = Q.treeFar;
if (VIEW[settings.viewDist]) Q.treeFar = Math.round(baseTreeFar * VIEW[settings.viewDist]);
const RELOAD_KEYS = ["quality", "shadows", "grass", "viewDist"];
const initialReload = Object.fromEntries(RELOAD_KEYS.map((k) => [k, settings[k]]));

const opt = (pairs) => pairs.map(([v, l]) => ({ v, l }));
const SCHEMA = [
  ["Graphismes", [
    { k: "quality", l: "Qualité générale", o: opt([["auto", "Automatique"], ["low", "Rapide"], ["medium", "Équilibrée"], ["high", "Belle"]]) },
    { k: "shadows", l: "Ombres", o: opt([["auto", "Selon la qualité"], ["off", "Désactivées"], ["normal", "Normales"], ["fine", "Fines"]]) },
    { k: "grass", l: "Densité de l'herbe", o: opt([["auto", "Selon la qualité"], ["low", "Faible"], ["normal", "Normale"], ["high", "Élevée"]]) },
    { k: "viewDist", l: "Arbres détaillés jusqu'à", h: "Au-delà, la forêt reste visible jusqu'à l'horizon", o: opt([["auto", "Selon la qualité"], ["proche", "Proche"], ["normale", "Normale"], ["loin", "Loin"], ["tresloin", "Très loin"]]) },
    { k: "ssao", l: "Occlusion ambiante", h: "Ombres de contact sous les arbres et dans les creux", t: "toggle" },
    { k: "rays", l: "Rayons de soleil", t: "toggle" },
    { k: "bloom", l: "Halo lumineux", t: "toggle" },
    { k: "mist", l: "Brume sur la forêt", t: "toggle" },
    { k: "reflections", l: "Reflets dans l'eau", h: "Indisponible en qualité Rapide", t: "toggle" },
    { k: "dynres", l: "Résolution dynamique", h: "Baisse la netteté si le jeu ralentit", t: "toggle" },
  ]],
  ["Jeu", [
    { k: "difficulty", l: "Difficulté", o: opt([["paisible", "Paisible"], ["normal", "Normal"], ["difficile", "Difficile"]]) },
    { k: "dayMinutes", l: "Durée d'une journée", num: true, o: opt([[10, "10 minutes"], [16, "16 minutes"], [24, "24 minutes"], [40, "40 minutes"]]) },
    { k: "hints", l: "Conseils à l'écran", t: "toggle" },
  ]],
  ["Commandes", [
    { k: "sens", l: "Sensibilité", t: "range", min: 0.3, max: 2.5, step: 0.1, fmt: (v) => "×" + (+v).toFixed(1) },
    { k: "invertY", l: "Inverser l'axe vertical", t: "toggle" },
    { k: "fov", l: "Champ de vision", t: "range", min: 60, max: 100, step: 1, fmt: (v) => v + "°" },
    { k: "headBob", l: "Balancement de la tête", t: "toggle" },
  ]],
  ["Son", [
    { k: "volume", l: "Volume", t: "range", min: 0, max: 100, step: 5, fmt: (v) => v + " %" },
  ]],
  ["Interface", [
    { k: "uiScale", l: "Taille de l'interface", o: opt([["0.85", "Petite"], ["1", "Normale"], ["1.15", "Grande"], ["1.3", "Très grande"]]) },
    { k: "compass", l: "Boussole", t: "toggle" },
    { k: "crosshair", l: "Viseur", t: "toggle" },
    { k: "fps", l: "Afficher les FPS", t: "toggle" },
  ]],
];

const loadBar = $("loadBar"), loadText = $("loadText");
let stepT = performance.now(), stepName = "début";
const step = async (pct, text) => {
  if (location.search.includes("perf")) console.info(`Selva : ${stepName} ${Math.round(performance.now() - stepT)} ms`);
  stepT = performance.now(); stepName = text;
  loadBar.style.width = pct + "%";
  loadText.textContent = text;
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
};

class Game {
  async init() {
    this.diff = DIFFS[settings.difficulty] || DIFFS.normal;
    this.hoursPerSec = 24 / (settings.dayMinutes * 60);
    const saved = store.get(SAVE_KEY);
    const oldSave = saved ? null : OLD_SAVE_KEYS.map((k) => store.get(k)).find(Boolean);
    const newSeed = store.get("selva-newseed");
    store.del("selva-newseed");
    this.seed = saved?.seed ?? newSeed ?? oldSave?.seed ?? ((Math.random() * 1e9) | 0);

    await step(5, "Allumage du moteur 3D…");
    const canvas = $("game");
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", stencil: false });
    } catch (e) {
      loadText.textContent = "Ton appareil ne prend pas en charge WebGL, nécessaire pour le jeu.";
      throw e;
    }
    this.renderer = renderer;
    this.pixelRatio = Math.min(devicePixelRatio, Q.maxPixelRatio);
    renderer.setPixelRatio(this.pixelRatio);
    this.viewW = canvas.clientWidth || innerWidth;
    this.viewH = canvas.clientHeight || innerHeight;
    renderer.setSize(this.viewW, this.viewH, false); // le CSS garde 100 % : pas de taille figée
    renderer.info.autoReset = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = Q.shadows;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(settings.fov, this.viewW / this.viewH, 0.1, 12000);
    this.scene.add(this.camera);

    await step(8, "Le fleuve dessine l'île…");
    const t0 = performance.now();
    this.world = new World(this.seed);
    await this.world.generate((k) => { loadBar.style.width = (8 + k * 27) + "%"; loadText.textContent = `Le fleuve dessine l'île… ${Math.round(k * 100)} %`; });
    const t1 = performance.now();
    await step(36, "La forêt pousse : sumaúmas, castanheiras, palmiers…");
    this.props = new Props(this.scene, this.world, Q, this.seed, renderer);
    this.world.applyCanopy(this.props.list, (p) => (PROP_TYPES[p.t].kind === "tree" ? PROP_TYPES[p.t].crown * p.s : 0));
    const t2 = performance.now();

    await step(55, "Berges, plages et igarapés…");
    const detail = makeDetailTexture(renderer, 7);
    const terrainTex = makeTerrainTextures(renderer, Q.terrainTex);
    Object.assign(this.props.rockUniforms, { tDetail: { value: detail }, tAlb: { value: terrainTex.albedo }, tNrm: { value: terrainTex.normal } });
    const waterN = makeWaterNormalTexture(renderer, 3);
    this.world.buildHeightTexture();
    this.world.shadowRange.value = Q.shadows ? Q.shadowRange : 0;
    this.scene.add(this.world.buildTerrain({ detail, ...terrainTex }, Q));
    this.loadTimes = { relief: Math.round(t1 - t0), forests: Math.round(t2 - t1), trees: this.props.treeIds.length, props: this.props.list.length };
    console.info("Selva : chargement", JSON.stringify(this.loadTimes));
    this.scene.add(this.world.buildWater(waterN));
    this.scene.add(this.world.buildStreams(waterN));
    this.grass = new Grass(this.scene, this.world, Q);
    this.under = new Undergrowth(this.scene, this.world, Q, this.props.atlas);
    this.fish = new Fish(this.scene, this.world, Q);
    this.birds = new Birds(this.scene, this.world, this.props);
    this.insects = new Insects(this.scene, this.world);
    this.herps = new Herps(this.scene, this.world);
    setFurShells(Q.name !== "low");   // pelage duveteux sauf en qualité « rapide »

    this.map = new MapView(this.world, (x, z) => { const [i, j] = this.world._cell(x, z); return this.world.canopy ? this.world.canopy[j * this.world.V + i] : 0; });

    await step(65, "L'air se charge d'humidité…");
    this.env = new Environment(this.scene, renderer, Q);
    this.rain = new Rain(this.scene);

    await step(78, "Les animaux s'installent…");
    this.sounds = new Sounds();
    this.sounds.setVolume(settings.volume / 100);
    this.structures = new Structures(this.scene, this.world);
    this.creatures = new Creatures(this.scene, this.world, this.props, Q, this.sounds);
    this.build = new BuildSystem(this.scene, this.world, this.props);
    this.structures.build = this.build;
    this.creatures.build = this.build;
    registerFurniture(this.build, this);
    this.player = new Player(this.camera, this.world, this.props, this.structures);
    this.inv = new Inventory();
    this.input = new Input(canvas);
    this.input.sensitivity = settings.sens;
    this.ui = new UI();

    this.hours = 8;
    this.day = 1;
    this.totalHours = 8;
    this.tool = "main";
    const spawn = this.world.findSpawn((x, z) => this.props.isClear(x, z, 9));
    this.worldSpawn = spawn.clone();
    this.player.pos.copy(spawn);
    this.player.spawnPoint.copy(spawn);
    this.player.yaw = Math.atan2(spawn.x, spawn.z); // regarde vers l'intérieur de l'île
    this.player.sick = 0; this.player.venom = 0; this.player.wet = 0;
    if (saved) this.restore(saved);
    else if (oldSave) this.migrate(oldSave);
    this.player.setTool(this.tool);

    await step(90, "Compilation des shaders…");
    this.env.update(this.hours, 0.016, this.camera.position, this.player.pos);
    this.player.update(0, this.input, this.ctx(0, 0));
    this.camera.getWorldDirection(this._camDir = new THREE.Vector3());
    this.props.rebuild(this.camera.position, this._camDir);
    this.world.updateTerrain(this.camera, Q.viewDistance);
    this.scene.traverse((o) => { if (o.isLight) o.layers.enable(1); });
    this.post = new Post(renderer, Q);
    this.post.setSize(this.viewW * this.pixelRatio, this.viewH * this.pixelRatio);
    this.refl = new Reflection(renderer, Q);
    this.refl.hidden = [this.grass.mesh, ...this.under.meshes, this.world.streamMesh, this.world.seaMesh];
    this.refl.setSize(this.viewW * this.pixelRatio, this.viewH * this.pixelRatio);
    if (this.refl.enabled) this.refl.render(this.scene, this.camera, this.world.waterLevelAt(this.player.pos.x, this.player.pos.z)); // précompile les shaders avec découpe
    renderer.compile(this.scene, this.camera);
    this.post.render(this.scene, this.camera, this.env.sunInfo);

    await step(100, "Prêt.");
    this.state = "menu";
    this.hasSave = !!(saved || oldSave);
    this.applySettings();
    this.wireUI();
    $("loading").classList.add("hidden");
    this.showMenu();

    this.clock = new THREE.Clock();
    this.attackCd = 0;
    this.saveTimer = 0;
    this.frameTimes = [];
    this.dynTimer = 0;
    this.fpsAcc = 0; this.fpsFrames = 0; this.fpsText = "";
    addEventListener("resize", () => this.resize());
    addEventListener("orientationchange", () => { this.resize(); setTimeout(() => this.resize(), 300); setTimeout(() => this.resize(), 1000); });
    if (window.visualViewport) visualViewport.addEventListener("resize", () => this.resize());
    document.addEventListener("visibilitychange", () => { if (document.hidden) { this.save(); if (this.state === "play") this.pause(); } });
    addEventListener("pagehide", () => this.save());
    renderer.setAnimationLoop(() => this.frame());
  }

  ctx(dt, gameDtHours) {
    let nearFire = false, fireDist = 1e9;
    for (const f of this.structures.fires) {
      const d = f.pos.distanceTo(this.player.pos);
      if (f.lit) { fireDist = Math.min(fireDist, d); if (d < 6) nearFire = true; }
    }
    const cover = Math.min(1, this.world.canopyAt(this.player.pos.x, this.player.pos.z) * 1.3);
    const roof = this.structures.shelters?.some?.((sh) => sh.pos.distanceTo(this.player.pos) < 3.2) || false;
    return { sounds: this.sounds, day: this.env.dayFactor, gameDtHours, nearFire, fireDist, coat: this.inv.count("manteau") > 0, hunger: this.diff.hunger, rain: this.env.rain || 0, cover: roof ? 1 : cover, sick: this.diff.sick ?? 1 };
  }

  // ---------- Réglages ----------
  applySettings() {
    this.diff = DIFFS[settings.difficulty] || DIFFS.normal;
    this.hoursPerSec = 24 / (settings.dayMinutes * 60);
    this.input.sensitivity = settings.sens;
    this.player.invertY = settings.invertY;
    this.player.bobScale = settings.headBob ? 1 : 0;
    this.camera.fov = settings.fov; this.camera.updateProjectionMatrix();
    this.sounds.setVolume(settings.volume / 100);
    document.documentElement.style.setProperty("--ui", settings.uiScale);
    document.body.classList.toggle("nocompass", !settings.compass);
    document.body.classList.toggle("nocross", !settings.crosshair);
    if (this.post) { this.post.rays = settings.rays; this.post.bloom = settings.bloom; this.post.mist = settings.mist; this.post.ssao = settings.ssao && Q.ssao > 0; }
    if (!settings.dynres && this.post) {
      const max = Math.min(devicePixelRatio, Q.maxPixelRatio);
      if (this.pixelRatio !== max) { this.pixelRatio = max; this.renderer.setPixelRatio(max); this.renderer.setSize(this.viewW, this.viewH, false); this.post.setSize(this.viewW * max, this.viewH * max); }
    }

  }

  renderSettings(tab = this.setTab || 0) {
    this.setTab = tab;
    $("setTabs").innerHTML = SCHEMA.map(([name], i) => `<button class="${i === tab ? "sel" : ""}" data-tab="${i}">${name}</button>`).join("");
    $("setTabs").querySelectorAll("button").forEach((b) => (b.onclick = () => this.renderSettings(+b.dataset.tab)));
    const rows = SCHEMA[tab][1].map((f) => {
      const v = settings[f.k];
      let ctl;
      if (f.t === "toggle") ctl = `<button class="toggle ${v ? "on" : ""}" data-k="${f.k}" aria-pressed="${!!v}" aria-label="${f.l}"></button>`;
      else if (f.t === "range") ctl = `<div class="ctl"><input type="range" data-k="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${v}" aria-label="${f.l}"><span class="val">${f.fmt(v)}</span></div>`;
      else ctl = `<div class="ctl"><select data-k="${f.k}" aria-label="${f.l}">${f.o.map((o) => `<option value="${o.v}" ${String(o.v) === String(v) ? "selected" : ""}>${o.l}</option>`).join("")}</select></div>`;
      return `<div class="row"><label>${f.l}${f.h ? `<br><small>${f.h}</small>` : ""}</label>${ctl}</div>`;
    }).join("");
    $("setBody").innerHTML = rows;
    const body = $("setBody");
    const field = (k) => SCHEMA[tab][1].find((f) => f.k === k);
    body.querySelectorAll(".toggle").forEach((b) => (b.onclick = () => { this.setSetting(b.dataset.k, !settings[b.dataset.k]); b.classList.toggle("on", settings[b.dataset.k]); }));
    body.querySelectorAll("input[type=range]").forEach((r) => (r.oninput = () => { const f = field(r.dataset.k); this.setSetting(f.k, +r.value); r.nextElementSibling.textContent = f.fmt(+r.value); }));
    body.querySelectorAll("select").forEach((sel) => (sel.onchange = () => { const f = field(sel.dataset.k); this.setSetting(f.k, f.num ? +sel.value : sel.value); }));
    this.updateReloadNote();
  }

  setSetting(k, v) {
    settings[k] = v;
    store.set(SETTINGS_KEY, settings);
    this.applySettings();
    this.updateReloadNote();
    this.updateHomeInfo();
  }

  updateReloadNote() {
    const need = RELOAD_KEYS.some((k) => settings[k] !== initialReload[k]);
    $("reloadNote").classList.toggle("hidden", !need);
    $("btnReload").classList.toggle("hidden", !need);
  }

  // ---------- Menus ----------
  openPanel(id) {
    for (const p of ["newgame", "settings", "howto"]) $(p).classList.toggle("hidden", p !== id);
  }

  updateHomeInfo() {
    const d = this.diff.label;
    $("homeInfo").innerHTML = this.hasSave
      ? `Partie en cours : <b>jour ${this.day}</b> · ${d}<br>Graine de l'île : ${this.seed}`
      : `Nouvelle île prête · ${d}<br>Graine : ${this.seed}`;
  }

  wireUI() {
    const touch = this.input.touch;
    $("btnPlay").textContent = this.hasSave ? "Continuer" : "Jouer";
    $("btnPlay").onclick = () => this.play();
    $("btnNew").onclick = () => this.openNewGame();
    $("btnSettings").onclick = () => { this.renderSettings(); this.openPanel("settings"); };
    $("btnHelp").onclick = () => this.openPanel("howto");
    // Réglages rapides de l'accueil
    const markSeg = (id, v) => document.querySelectorAll(`#${id} button`).forEach((b) => b.classList.toggle("sel", String(b.dataset.v) === String(v)));
    markSeg("qQuality", settings.quality);
    document.querySelectorAll("#qQuality button").forEach((b) => (b.onclick = () => { this.setSetting("quality", b.dataset.v); markSeg("qQuality", b.dataset.v); $("qReload").classList.toggle("hidden", settings.quality === initialReload.quality); }));
    const nearT = () => [6.3, 11, 17.4].reduce((a, b) => (Math.abs(b - this.hours) < Math.abs(a - this.hours) ? b : a));
    markSeg("qTime", nearT());
    document.querySelectorAll("#qTime button").forEach((b) => (b.onclick = () => { this.advanceTime(((+b.dataset.v - this.hours) % 24 + 24) % 24); this.env.forceEnvUpdate(); this.updateHomeInfo(); markSeg("qTime", b.dataset.v); }));
    $("qSound").classList.toggle("on", settings.volume > 0);
    $("qSound").onclick = () => { this.setSetting("volume", settings.volume > 0 ? 0 : 80); $("qSound").classList.toggle("on", settings.volume > 0); };
    $("qReload").onclick = () => { this.save(); location.reload(); };
    $("btnReload").onclick = () => { this.save(); location.reload(); };
    document.querySelectorAll("[data-back]").forEach((b) => (b.onclick = () => this.openPanel(null)));
    $("howKeys").innerHTML = touch
      ? `<p>Joystick à gauche pour marcher (pousse à fond pour courir), glisse à droite pour regarder.<br>✊ frapper · ✋ ramasser, boire, cuire · 🎒 sac · 🔨 construire · 🗺️ carte · 🔁 changer d'outil · ⤒ sauter.</p>`
      : `<p><kbd>Z</kbd><kbd>Q</kbd><kbd>S</kbd><kbd>D</kbd> ou <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> se déplacer · <kbd>Maj</kbd> courir · <kbd>Espace</kbd> sauter · <kbd>C</kbd> s'accroupir<br>
         <kbd>Clic</kbd> frapper · <kbd>E</kbd> ou <kbd>clic droit</kbd> ramasser, boire, cuire · <kbd>Tab</kbd> sac · <kbd>B</kbd> construire · <kbd>M</kbd> carte · <kbd>1</kbd>–<kbd>6</kbd> ou molette : outil · <kbd>F</kbd> manger · <kbd>Échap</kbd> pause</p>`;
    $("closeBag").onclick = () => this.toggleBag(false);
    $("closeBuild").onclick = () => this.toggleBuildMenu(false);
    $("closeMap").onclick = () => this.toggleMap(false);
    $("closeStorage").onclick = () => this.closeStorage();
    $("storageAll").onchange = (e) => (this.storageAll = e.target.checked);
    // Barre d'outils : toucher / cliquer un emplacement sélectionne l'outil
    const pickSlot = (e) => {
      const slot = e.target.closest(".slot");
      if (!slot || this.state !== "play") return;
      e.preventDefault(); e.stopPropagation();
      this.selectTool(slot.dataset.tool);
    };
    $("hotbar").addEventListener("touchstart", pickSlot, { passive: false });
    $("hotbar").addEventListener("mousedown", pickSlot);
    $("btnRespawn").onclick = () => this.respawn();
    $("btnPause").addEventListener("touchstart", (e) => { e.preventDefault(); this.pause(); });
    this.input.onLockChange = (locked) => {
      if (!locked && this.state === "play" && !this.bagOpen && !this.buildMenuOpen && !this.storageOpen && !this.arcadeOpen && !this.mapOpen) this.pause();
    };
    this.updateHomeInfo();
  }

  openNewGame() {
    let diff = settings.difficulty;
    const mark = () => document.querySelectorAll("#diffs .diff").forEach((b) => b.classList.toggle("sel", b.dataset.d === diff));
    document.querySelectorAll("#diffs .diff").forEach((b) => (b.onclick = () => { diff = b.dataset.d; mark(); }));
    mark();
    $("ngDay").value = String(settings.dayMinutes);
    $("ngSeed").value = "";
    $("newWarn").textContent = this.hasSave ? `Attention : ta partie en cours (jour ${this.day}) sera remplacée.` : "Choisis comment tu veux jouer.";
    $("ngStart").onclick = () => {
      settings.difficulty = diff;
      settings.dayMinutes = +$("ngDay").value;
      store.set(SETTINGS_KEY, settings);
      const raw = $("ngSeed").value.trim();
      let seed = /^\d+$/.test(raw) ? parseInt(raw, 10) % 1e9 : raw ? [...raw].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7) >>> 0 : (Math.random() * 1e9) | 0;
      store.del(SAVE_KEY); OLD_SAVE_KEYS.forEach((k) => store.del(k));
      store.set("selva-newseed", seed % 1e9);
      this.noSave = true;
      location.reload();
    };
    this.openPanel("newgame");
  }

  showMenu() {
    $("menu").classList.remove("hidden");
    $("hud").classList.add("hidden");
    document.body.classList.remove("playing");
    this.input.enabled = false;
    this.updateHomeInfo();
  }

  play() {
    this.sounds.init();
    this.openPanel(null);
    $("menu").classList.add("hidden");
    $("hud").classList.remove("hidden");
    document.body.classList.add("playing");
    this.state = "play";
    this.hasSave = true;
    this.input.enabled = true;
    if (this.migrated) { this.migrated = false; this.ui.toast("L'île a été redessinée : tu repars d'un nouvel endroit, avec ton sac."); }
    this.input.requestLock();
    if (this.input.touch) {
      const el = document.documentElement;
      if (el.requestFullscreen && !document.fullscreenElement) el.requestFullscreen().catch(() => {});
      try { screen.orientation?.lock?.("landscape").catch(() => {}); } catch {}
    }
    if (!this.introShown && this.day === 1 && this.hours < 9 && settings.hints) {
      this.introShown = true;
      this.ui.showHint("Tu es perdu au cœur de l'Amazonie. Ramasse des branches et des cailloux, cueille des plantes pour la fibre, puis ouvre ton sac pour fabriquer tes premiers outils. L'eau du fleuve rend malade : fais-la bouillir ou bois l'eau de pluie.", 11000);
    }
  }

  pause() {
    if (this.state !== "play") return;
    this.state = "menu";
    this.toggleBag(false, true);
    this.input.exitLock();
    $("btnPlay").textContent = "Reprendre";
    $("menuTag").textContent = "Pause · partie sauvegardée";
    this.save();
    this.showMenu();
  }

  // ---------- Carte ----------
  toggleMap(open) {
    open = open ?? !this.mapOpen;
    this.mapOpen = open;
    $("mapFull").classList.toggle("hidden", !open);
    if (open) { this.map.drawFull(this); this.input.exitLock(); }
    else if (this.state === "play") this.input.requestLock();
  }

  // ---------- Mobilier ----------
  // Rangement (coffre, armoire, réfrigérateur…) : clic sur un objet du sac = déposer, sur le contenu = prendre
  openStorage(piece, cap, filter) {
    this.storage = { piece, cap, filter };
    this.storageOpen = true;
    $("storage").classList.remove("hidden");
    this.input.exitLock();
    this.renderStorage();
  }
  closeStorage() {
    this.storageOpen = false;
    $("storage").classList.add("hidden");
    if (this.state === "play") this.input.requestLock();
    this.save();
  }
  renderStorage() {
    const { piece, cap, filter } = this.storage, st = piece.state;
    st.items = st.items || {};
    const used = Object.values(st.items).reduce((a, b) => a + b, 0);
    const d = this.build.def(piece.type);
    $("storageTitle").textContent = `${d.icon} ${d.name} — ${used}/${cap}`;
    const cell = (id, n, side) => `<div class="item use" data-id="${id}" data-side="${side}"><span class="n">${n}</span><span class="ic">${ITEMS[id].icon}</span>${ITEMS[id].name}</div>`;
    const bag = Object.entries(this.inv.items).filter(([id, n]) => n > 0 && !ITEMS[id].tool && (!filter || filter(id)));
    $("storageBag").innerHTML = bag.length ? bag.map(([id, n]) => cell(id, n, "bag")).join("") : `<p class="empty">${filter ? "Rien à ranger ici (aliments uniquement)." : "Ton sac est vide."}</p>`;
    const inside = Object.entries(st.items).filter(([, n]) => n > 0);
    $("storageBox").innerHTML = inside.length ? inside.map(([id, n]) => cell(id, n, "box")).join("") : `<p class="empty">Vide.</p>`;
    document.querySelectorAll("#storage .item").forEach((el) => el.addEventListener("click", (e) => {
      const id = el.dataset.id, all = e.shiftKey || this.storageAll;
      if (el.dataset.side === "bag") {
        const room = cap - Object.values(st.items).reduce((a, b) => a + b, 0);
        const n = Math.min(all ? this.inv.count(id) : 1, room);
        if (n <= 0) { this.ui.toast("C'est plein.", true); return; }
        this.inv.remove(id, n); st.items[id] = (st.items[id] || 0) + n;
      } else {
        const n = all ? st.items[id] : 1;
        st.items[id] -= n; if (st.items[id] <= 0) delete st.items[id];
        this.inv.add(id, n);
      }
      this.sounds.pickup();
      this.renderStorage();
    }));
  }

  // S'asseoir (canapé, chaise) : on récupère plus vite ; bouger pour se lever
  sitOn(piece, h) {
    const p = this.player;
    p.seat = { x: piece.pos.x, y: piece.pos.y + h, z: piece.pos.z, yaw: piece.rot + Math.PI };
    p.yaw = p.seat.yaw; p.pitch = -0.05;
    this.ui.toast("Tu t'assois. Avance pour te lever.");
  }

  // Mangeoire : attire du gibier près d'elle
  feederTick(dt) {
    this.feederT = (this.feederT || 0) - dt;
    if (this.feederT > 0) return;
    this.feederT = 15;
    for (const p of this.build.pieces) {
      if (p.type !== "mangeoire" || !(p.state.food > 0)) continue;
      if (p.pos.distanceTo(this.player.pos) > 160 || p.pos.distanceTo(this.player.pos) < 12) continue;
      if (this.creatures.list.filter((c) => !c.dead && c.pos.distanceTo(p.pos) < 40).length >= 4) continue;
      const a = Math.random() * Math.PI * 2, r = 8 + Math.random() * 8;
      const c = this.creatures.create(Math.random() < 0.6 ? "capivara" : "cutia", p.pos.x + Math.cos(a) * r, p.pos.z + Math.sin(a) * r);
      if (c) { c.state = "graze"; c.timer = 20; p.state.food--; }
    }
  }

  // Console : petit jeu du serpent
  openArcade() {
    this.arcadeOpen = true;
    $("arcade").classList.remove("hidden");
    this.input.exitLock();
    const cv = $("arcadeCanvas"), g = cv.getContext("2d"), N = 20, C = cv.width / N;
    let snake = [[10, 10], [9, 10], [8, 10]], dir = [1, 0], next = [1, 0], food = [15, 10], score = 0, over = false, acc = 0, last = performance.now();
    this.arcadeBest = this.arcadeBest || 0;
    const place = () => { do { food = [Math.floor(Math.random() * N), Math.floor(Math.random() * N)]; } while (snake.some(([x, y]) => x === food[0] && y === food[1])); };
    const key = (e) => {
      const m = { ArrowUp: [0, -1], KeyW: [0, -1], ArrowDown: [0, 1], KeyS: [0, 1], ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0] }[e.code];
      if (m && (m[0] !== -dir[0] || m[1] !== -dir[1])) { next = m; e.preventDefault(); }
      if (e.code === "Escape") close();
      if (over && (e.code === "Space" || e.code === "Enter")) restart();
    };
    let sx = 0, sy = 0;
    const ts = (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; if (over) restart(); };
    const te = (e) => { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.hypot(dx, dy) < 20) return; key({ code: Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "ArrowRight" : "ArrowLeft") : (dy > 0 ? "ArrowDown" : "ArrowUp"), preventDefault() {} }); };
    const restart = () => { snake = [[10, 10], [9, 10], [8, 10]]; dir = [1, 0]; next = [1, 0]; score = 0; over = false; place(); };
    const draw = () => {
      g.fillStyle = "#0e1a12"; g.fillRect(0, 0, cv.width, cv.height);
      g.fillStyle = "#e05a4a"; g.fillRect(food[0] * C + 3, food[1] * C + 3, C - 6, C - 6);
      snake.forEach(([x, y], i) => { g.fillStyle = i ? "#7ad46a" : "#c8f0a0"; g.fillRect(x * C + 1, y * C + 1, C - 2, C - 2); });
      g.fillStyle = "#f3efe6"; g.font = "bold 16px system-ui"; g.fillText(`Score ${score} · Record ${this.arcadeBest}`, 8, 20);
      if (over) { g.fillStyle = "rgba(0,0,0,0.6)"; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = "#fff"; g.font = "bold 24px system-ui"; g.textAlign = "center"; g.fillText("Perdu !", cv.width / 2, cv.height / 2 - 6); g.font = "14px system-ui"; g.fillText("Espace ou toucher pour rejouer", cv.width / 2, cv.height / 2 + 20); g.textAlign = "left"; }
    };
    const loop = (t) => {
      if (!this.arcadeOpen) return;
      acc += t - last; last = t;
      while (acc > 120 && !over) {
        acc -= 120; dir = next;
        const h = [(snake[0][0] + dir[0] + N) % N, (snake[0][1] + dir[1] + N) % N];
        if (snake.some(([x, y]) => x === h[0] && y === h[1])) { over = true; this.arcadeBest = Math.max(this.arcadeBest, score); break; }
        snake.unshift(h);
        if (h[0] === food[0] && h[1] === food[1]) { score++; this.sounds.pickup(); place(); } else snake.pop();
      }
      if (over) acc = 0;
      draw();
      requestAnimationFrame(loop);
    };
    const close = () => {
      this.arcadeOpen = false; $("arcade").classList.add("hidden");
      removeEventListener("keydown", key, true); cv.removeEventListener("touchstart", ts); cv.removeEventListener("touchend", te);
      if (this.state === "play") this.input.requestLock();
    };
    addEventListener("keydown", key, true); cv.addEventListener("touchstart", ts, { passive: true }); cv.addEventListener("touchend", te, { passive: true });
    $("arcadeClose").onclick = close;
    place(); requestAnimationFrame(loop);
  }

  // ---------- Construction ----------
  toggleBuildMenu(open) {
    open = open ?? !this.buildMenuOpen;
    this.buildMenuOpen = open;
    $("buildMenu").classList.toggle("hidden", !open);
    if (open) { this.renderBuildMenu(); this.input.exitLock(); }
    else if (this.state === "play") this.input.requestLock();
  }

  renderBuildMenu() {
    const inv = this.inv;
    const all = { ...PIECES, ...this.build.extraDefs };
    const cats = [...BUILD_CATS, ...(this.build.extraCats || [])];
    const card = (id, d) => {
      const can = Object.entries(d.cost).every(([k, n]) => inv.count(k) >= n);
      const needs = Object.entries(d.cost).map(([k, n]) => `<span class="${inv.count(k) >= n ? "ok" : "ko"}">${ITEMS[k].icon} ${inv.count(k)}/${n}</span>`).join(" · ");
      return `<div class="recipe"><div class="ic">${d.icon}</div><div class="info"><b>${d.name}</b>${d.desc ? `<div class="desc">${d.desc}</div>` : ""}<div class="needs">${needs}</div></div>
        <button class="btn small" data-piece="${id}" ${can ? "" : "disabled"}>Placer</button></div>`;
    };
    $("buildList").innerHTML = `<button class="btn" id="btnEdit">🔧 Démonter ou déplacer une construction</button>` +
      cats.map((c) => `<h3 class="rgroup">${c}</h3>` + Object.entries(all).filter(([, d]) => d.cat === c).map(([id, d]) => card(id, d)).join("")).join("");
    $("buildList").querySelectorAll("button[data-piece]").forEach((b) => (b.onclick = () => {
      this.build.rotUser = 0;
      this.build.select(b.dataset.piece);
      this.editMode = false;
      this.toggleBuildMenu(false);
      if (settings.hints && !this.buildHintShown) { this.buildHintShown = true; this.ui.showHint(this.input.touch ? "✊ poser · ✋ tourner · 🔨 terminer. Les pièces s'accrochent toutes seules aux autres (vert = possible)." : "[Clic] poser · [R] ou molette : tourner · [E] annuler · [B] terminer. Les pièces s'accrochent toutes seules aux autres (vert = possible).", 8000); }
    }));
    $("btnEdit").onclick = () => { this.build.cancel(); this.editMode = true; this.toggleBuildMenu(false); };
  }

  exitBuild() {
    const b = this.build;
    if (b.moving) { // pièce en cours de déplacement : on la rend (ressources + contenu)
      for (const [k, n] of Object.entries(b.def(b.moving.type).cost)) this.inv.add(k, n);
      if (b.moving.state?.items) for (const [k, n] of Object.entries(b.moving.state.items)) this.inv.add(k, n);
    }
    b.cancel();
    this.editMode = false;
    this.ui.setTarget("", false);
  }

  updateBuild(input) {
    const b = this.build, touch = this.input.touch;
    const H = touch ? "✊" : "[Clic]", U = touch ? "✋" : "[E]";
    if (this.editMode) {
      const t = b.pickPiece(this.camera, 8);
      if (t) {
        const d = b.def(t.piece.type);
        this.ui.setTarget(`<b>${d.name}</b><small>${H} Démonter (ressources rendues) · ${touch ? "✋" : "[G]"} Déplacer · ${touch ? "🔨" : "[B]"} Terminer</small>`, true);
        if (input.was("Attack")) { b.dismantle(t.piece, this.inv); this.sounds.chop(); this.ui.toast(`${d.icon} ${d.name} démonté`); this.save(); }
        else if (input.was("KeyG") || input.was("KeyE")) { b.pickUp(t.piece); this.editMode = false; }
      } else this.ui.setTarget(`<b>Démonter ou déplacer</b><small>Vise une construction · ${touch ? "🔨" : "[B]"} Terminer</small>`, false);
      return;
    }
    if (input.was("WheelUp")) b.rotate(-1);
    if (input.was("WheelDown") || input.was("KeyR") || (touch && input.was("KeyE"))) b.rotate(1);
    if (!touch && input.was("KeyE")) { this.exitBuild(); return; }
    b.update(this.camera, this.inv);
    const d = b.def(b.selected);
    if (!d) return;
    const why = b.valid ? "" : `<br><span style="color:#ff9a8a">${b.reason || "Impossible ici"}</span>`;
    this.ui.setTarget(`<b>${d.icon} ${d.name}${b.moving ? " (déplacement)" : ""}</b><small>${H} Poser · ${touch ? "✋" : "[R]"} Tourner · ${touch ? "🔨" : "[E]"} ${b.moving ? "Annuler" : "Terminer"}${why}</small>`, b.valid);
    if (input.was("Attack")) {
      if (!b.valid) { this.sounds.error(); return; }
      const moving = b.moving;
      b.place(this.inv, moving?.state);
      this.sounds.chop();
      this.save();
      if (moving) b.cancel();
      else if (!Object.entries(d.cost).every(([k, n]) => this.inv.count(k) >= n)) { this.ui.toast("Plus assez de ressources pour en poser une autre.", true); }
    }
  }

  toggleBag(open, silent) {
    open = open ?? !this.bagOpen;
    this.bagOpen = open;
    $("bag").classList.toggle("hidden", !open);
    if (open) {
      this.renderBag();
      this.input.exitLock();
    } else if (!silent && this.state === "play") this.input.requestLock();
  }

  renderBag() {
    this.ui.renderBag(this.inv, { use: (id) => { this.useItem(id); this.renderBag(); }, craft: (id) => this.craft(id) });
  }

  // ---------- Objets ----------
  ownedTools() {
    return ["main", ...TOOL_SLOTS.map((slot) => slot.find((t) => this.inv.count(t) > 0)).filter(Boolean)];
  }

  selectTool(t) {
    if (t === this.tool) return;
    this.tool = t;
    this.player.setTool(t);
    this.player.swingT = 0.5;
  }

  give(id, n, silent) {
    this.inv.add(id, n);
    if (!silent) this.ui.toast(`+${n} ${ITEMS[id].icon} ${ITEMS[id].name}`);
    if (this.bagOpen) this.renderBag();
  }

  useItem(id) {
    const it = ITEMS[id];
    const p = this.player;
    if (it.isFlask) {
      if (this.inv.flask <= 0) { this.ui.toast("La gourde est vide. Remplis-la au bord de l'eau ou sous la pluie.", true); return; }
      this.inv.flask--;
      p.water = Math.min(100, p.water + 25);
      this.sounds.drink();
      if (this.inv.flaskClean) this.ui.toast("💧 Tu bois à la gourde (eau saine)");
      else this.drinkRaw(0.12, "💧 Tu bois l'eau de la gourde, pas bouillie…");
      return;
    }
    if (it.cure) {
      if (p.sick < 1 && p.venom < 1) { this.ui.toast("Tu n'es pas malade."); return; }
      this.inv.remove(id);
      p.sick = Math.max(0, p.sick - 70); p.venom = Math.max(0, p.venom - 60);
      this.sounds.drink();
      this.ui.toast("🍵 La tisane te fait du bien.");
      return;
    }
    if (!it.food) return;
    if (p.food > 97) { this.ui.toast("Tu n'as plus faim."); return; }
    this.inv.remove(id);
    p.food = Math.min(100, p.food + it.food);
    if (it.water) p.water = Math.min(100, p.water + it.water);
    if (it.health) {
      if (it.health < 0) p.damage(-it.health, null); else p.health = Math.min(100, p.health + it.health);
      if (it.health < 0) this.ui.toast("Beurk… la viande crue t'a rendu malade.", true);
    }
    this.sounds.eat();
  }

  quickEat() {
    for (const id of ["viande_cuite", "legumes", "noisettes", "acai", "baies", "viande_crue"]) {
      if (this.inv.count(id) > 0) { this.useItem(id); return; }
    }
    this.ui.toast("Tu n'as rien à manger.", true);
  }

  craft(id) {
    const r = RECIPES.find((x) => x.id === id);
    if (!r || !this.inv.canCraft(r)) return;
    if (r.place === "canoe") {
      const f = this.player.forward; f.y = 0; f.normalize();
      let spot = null;
      for (let d = 2; d <= 9; d += 0.5) {
        const x = this.player.pos.x + f.x * d, z = this.player.pos.z + f.z * d;
        if (this.world.waterLevelAt(x, z) - this.world.heightAt(x, z) > 0.8) { spot = [x, z]; break; }
      }
      if (!spot) { this.ui.toast("Mets-toi face au fleuve, à un igarapé ou à un lac pour construire la pirogue.", true); this.sounds.error(); return; }
      this.inv.craft(r);
      this.structures.addCanoe(spot[0], spot[1], this.player.yaw);
      this.ui.toast("🛶 Pirogue à l'eau ! Approche-toi et monte dedans. Attention aux caïmans.");
      this.toggleBag(false);
      this.sounds.craft();
      this.save();
      return;
    }
    if (r.place) {
      const f = this.player.forward; f.y = 0; f.normalize();
      const x = this.player.pos.x + f.x * 2.6, z = this.player.pos.z + f.z * 2.6;
      const h = this.world.heightAt(x, z);
      if (h < 0.6) { this.ui.toast("Impossible de construire dans l'eau.", true); this.sounds.error(); return; }
      if (this.world.slopeAt(x, z) > 0.3) { this.ui.toast("Le terrain est trop pentu ici.", true); this.sounds.error(); return; }
      this.inv.craft(r);
      if (r.place === "feu") { this.structures.addFire(x, z, 8); this.sounds.ignite(); this.ui.toast("🔥 Feu de camp allumé"); }
      else {
        const s = this.structures.addShelter(x, z, this.player.yaw);
        this.player.spawnPoint.set(s.pos.x, s.pos.y, s.pos.z);
        this.ui.toast("⛺ Tapiri construit : tu y réapparaîtras");
      }
      this.toggleBag(false);
    } else {
      this.inv.craft(r);
      const out = Object.keys(r.out)[0];
      this.ui.toast(`Fabriqué : ${ITEMS[out].icon} ${ITEMS[out].name}`);
      if (TOOLS[out]) this.selectTool(out);
    }
    this.sounds.craft();
    this.save();
    if (this.bagOpen) this.renderBag();
  }

  // ---------- Visée ----------
  findTarget() {
    const eye = this.camera.position.clone();
    const dir = this.player.forward;
    const reach = TOOLS[this.tool].reach + 0.3;
    const c = this.creatures.pick(eye, dir, reach + 0.5);
    const p = this.props.pick(eye, dir, 3.4);
    const s = this.structures.pick(eye, dir, 3.4);
    let best = null;
    if (c) best = { type: "creature", ...c };
    if (p && (!best || p.dist < best.dist)) best = { type: "prop", ...p };
    if (s && (!best || s.dist < best.dist)) best = { type: "structure", ...s };
    const bp = this.build.pickPiece(this.camera, 3.4);
    if (bp) {
      const d = this.build.def(bp.piece.type);
      if (d.door || d.use) { if (!best || bp.dist < best.dist + 0.3) best = { type: "piece", ...bp }; }
      else if (best && bp.dist < best.dist) best = null;   // un mur cache ce qu'il y a derrière
    }
    if (!best && dir.y < -0.05) {
      // On avance le long du regard : de l'eau (mer, lac ou ruisseau) au-dessus du sol ?
      for (let t = 0.5; t < 4.5; t += 0.25) {
        const x = eye.x + dir.x * t, y = eye.y + dir.y * t, z = eye.z + dir.z * t;
        const wl = this.world.waterLevelAt(x, z), gh = this.world.heightAt(x, z);
        if (gh > y) break;
        if (y <= wl && gh < wl - 0.05) { best = { type: "water", dist: t }; break; }
      }
    }
    if (!best && this.player.swimming) best = { type: "water", dist: 0 };
    return best;
  }

  describeTarget(t) {
    if (!t) return ["", false];
    const use = this.input.touch ? "✋" : "[E]";
    const hit = this.input.touch ? "✊" : "[Clic]";
    if (t.type === "piece") {
      const d = this.build.def(t.piece.type);
      if (d.door) return [`<b>${d.name}</b><small>${use} ${t.piece.state.open ? "Fermer" : "Ouvrir"}</small>`, true];
      if (d.use) return [`<b>${d.name}</b><small>${use} ${d.useLabel ? d.useLabel(t.piece, this) : "Utiliser"}</small>`, true];
    }
    if (t.type === "water") return [`<b>Eau ${this.world.heightAt(this.player.pos.x, this.player.pos.z) > 0 && this.world.streamAt(this.player.pos.x, this.player.pos.z) > 0.1 ? "de l'igarapé" : "du fleuve"}</b><small>${use} Boire (risque de fièvre)${this.inv.count("gourde") ? " et remplir la gourde" : ""}</small>`, true];
    if (t.type === "creature") {
      const c = t.creature;
      const name = c.sp.name;
      if (c.dead) return [`<b>${name} (mort)</b><small>${use} Dépecer</small>`, true];
      if (t.dist > TOOLS[this.tool].reach) return [`<b>${name}</b>`, false];
      return [`<b>${name}</b><small>${hit} Attaquer</small><div class="hpbar"><i style="width:${(c.hp / c.sp.hp) * 100}%"></i></div>`, true];
    }
    if (t.type === "structure") {
      const s = t.structure;
      if (s.kind === "fire") {
        const st = s.lit ? `allumé · ${Math.ceil(s.fuel)} h de bois` : "éteint";
        const boil = s.lit && this.inv.count("gourde") && this.inv.flask > 0 && !this.inv.flaskClean;
        const act = this.inv.count("viande_crue") ? "Cuire la viande" : boil ? "Faire bouillir l'eau de la gourde" : this.inv.count("bois") ? (s.lit ? "Ajouter du bois" : "Rallumer (1 bois)") : s.lit ? "Se sécher et se réchauffer" : "Il faut du bois";
        return [`<b>Feu de camp</b><small>${st}<br>${use} ${act}</small>`, true];
      }
      if (s.kind === "boat") return [`<b>Pirogue</b><small>${use} Monter dedans</small>`, true];
      return [`<b>Tapiri</b><small>${use} ${this.isNight() ? "Dormir jusqu'au matin" : "Définir comme point de réapparition"}</small>`, true];
    }
    const p = t.prop, def = PROP_TYPES[p.t];
    if (def.kind === "tree") {
      const tool = TOOLS[this.tool];
      const action = tool.tree >= 1 ? `${hit} Abattre` : tool.tree > 0 ? `${hit} Abattre (lentement)` : `${hit} Arracher une branche`;
      const hp = p.hp < def.hp ? `<div class="hpbar"><i style="width:${(p.hp / def.hp) * 100}%"></i></div>` : "";
      const climb = this.input.touch ? "⤒ + avancer : grimper" : "[Espace] + avancer : grimper";
      const fruit = (p.t === "castanheira" || p.t === "acai") && p.state ? ` · ${use} ${p.t === "acai" ? "Cueillir l'açaí" : "Ramasser des noix"}` : "";
      return [`<b>${def.name}</b><small>${action}${fruit} · ${climb}</small>${hp}`, true];
    }
    if (def.kind === "rock") {
      const ok = TOOLS[this.tool].rock > 0;
      const hp = p.hp < def.hp ? `<div class="hpbar"><i style="width:${(p.hp / def.hp) * 100}%"></i></div>` : "";
      return [`<b>Rocher</b><small>${ok ? `${hit} Extraire de la pierre${TOOLS[this.tool].rock < 1 ? " (lentement)" : ""}` : "Il faut une pioche (en bois ou en pierre)"}</small>${hp}`, ok];
    }
    if (def.kind === "bush") return [`<b>${p.state ? "Buisson à baies" : "Buisson"}</b><small>${p.state ? `${use} Cueillir` : "Les baies repousseront"}</small>`, !!p.state];
    if (def.kind === "pickup") return [`<b>${def.name}</b><small>${use} Ramasser</small>`, true];
    if (def.kind === "decor") return [`<b>${def.name}</b><small>${use} Cueillir (fibre)</small>`, true];
    if (def.kind === "log") {
      const ok = TOOLS[this.tool].tree > 0;
      return [`<b>Tronc couché</b><small>${ok ? `${hit} Débiter (bois)` : "Il faut une hache"}</small>`, ok];
    }
    return ["", false];
  }

  // Point de rive sèche le plus proche (pour débarquer du canoë).
  findShore(pos) {
    let best = null, bd = 1e9;
    for (let r = 1.5; r <= 5; r += 0.7) for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2;
      const x = pos.x + Math.cos(a) * r, z = pos.z + Math.sin(a) * r;
      const h = this.world.heightAt(x, z);
      if (h > this.world.waterLevelAt(x, z) + 0.05 && this.world.slopeAt(x, z) < 0.45 && r < bd) { bd = r; best = [x, z]; }
    }
    return best;
  }

  // Altitude de la surface d'eau visible la plus proche (pour les reflets), recalculée 2 fois par seconde.
  nearWaterLevel(dt) {
    this.wlTimer = (this.wlTimer || 0) - dt;
    if (this.wlTimer > 0) return this.wlCache;
    this.wlTimer = 0.5;
    const c = this.player.boat ? this.player.boat.pos : this.camera.position;
    let best = null, bd = 1e9;
    for (let r = 0; r <= 70; r += 7) for (let k = 0; k < (r ? 12 : 1); k++) {
      const a = (k / 12) * Math.PI * 2;
      const x = c.x + Math.cos(a) * r, z = c.z + Math.sin(a) * r;
      const wl = this.world.waterLevelAt(x, z);
      if (wl - this.world.heightAt(x, z) > 0.6 && r < bd && Math.abs(wl - c.y) < 40) { bd = r; best = wl; }
    }
    this.wlCache = best;
    return best;
  }

  isNight() { return this.hours >= 18.6 || this.hours < 5.6; }

  attack(target) {
    const tool = TOOLS[this.tool];
    this.player.swing();
    this.attackCd = tool.cooldown;
    if (!target) { this.sounds.swing(); return; }
    if (target.type === "creature" && target.dist <= tool.reach) {
      const c = target.creature;
      if (c.dead) return;
      const dmg = tool.damage * (0.85 + Math.random() * 0.3);
      this.sounds.hitFlesh();
      if (this.creatures.damage(c, dmg, this.player.pos)) this.ui.toast(`${c.sp.name} : chasse réussie${c.sp.radius > 0.7 ? " !" : ""}`);
      return;
    }
    if (target.type !== "prop" || target.dist > tool.reach) { this.sounds.swing(); return; }
    const p = target.prop, id = target.id, def = PROP_TYPES[p.t];
    if (def.kind === "tree") {
      this.sounds.chop();
      this.props.hit(id);
      if (tool.tree > 0) {
        p.hp -= tool.tree;
        if (p.hp <= 0.01) {
          const away = new THREE.Vector3(p.x - this.player.pos.x, 0, p.z - this.player.pos.z);
          this.props.remove(id, this.totalHours, 96, away);
          this.sounds.treeFall();
          const wood = Math.max(2, Math.round(def.wood * p.s));
          const palm = SPECIES_PALM.has(p.t);
          setTimeout(() => { this.give("bois", palm ? Math.max(1, Math.round(wood / 2)) : wood); this.give(palm ? "palme" : "branche", palm ? 3 : 2); if (!palm && Math.random() < 0.7) this.give("ecorce", 1 + Math.floor(Math.random() * 2)); }, 900);
        }
      } else if (SPECIES_PALM.has(p.t) && Math.random() < 0.4) this.give("palme", 1);
      else if (Math.random() < 0.45) this.give("branche", 1);
      else if (!this.toldAxe) { this.toldAxe = true; this.ui.toast("Avec une hache, tu pourrais l'abattre pour du bois."); }
    } else if (def.kind === "log") {
      this.sounds.chop();
      if (tool.tree > 0) {
        p.hp -= tool.tree;
        if (p.hp <= 0.01) { this.props.remove(id, this.totalHours, 200); this.give("bois", 3); this.give("branche", 1); }
      } else this.ui.toast("Il te faut une hache pour débiter ce tronc.", true);
    } else if (def.kind === "rock") {
      this.sounds.rockHit();
      this.props.hit(id);
      if (tool.rock > 0) {
        p.hp -= tool.rock;
        this.give("pierre", 1);
        if (p.hp <= 0.01) this.props.remove(id, this.totalHours, 120);
      } else this.ui.toast("Il te faut une pioche (en bois ou en pierre) pour casser ce rocher.", true);
    } else this.interact(target);
  }

  interact(target) {
    if (!target) return;
    if (target.type === "piece") {
      const pc = target.piece, d = this.build.def(pc.type);
      if (d.door) { this.build.setDoor(pc, !pc.state.open); this.sounds.chop(); return; }
      if (d.use) { d.use(pc, this); this.save(); return; }
    }
    const p = this.player;
    if (target.type === "water") {
      p.water = Math.min(100, p.water + 30);
      this.sounds.drink();
      let msg = "💧 Tu bois l'eau du fleuve";
      if (this.inv.count("gourde") && (this.inv.flask < 4 || this.inv.flaskClean)) { this.inv.flask = 4; this.inv.flaskClean = false; msg += " et remplis ta gourde (à faire bouillir)"; }
      this.drinkRaw(0.22, msg);
      return;
    }
    if (target.type === "creature") {
      const c = target.creature;
      if (!c.dead) return;
      for (const [id, n] of Object.entries(c.sp.drops)) this.give(id, n);
      this.creatures.remove(c);
      return;
    }
    if (target.type === "structure") {
      const s = target.structure;
      if (s.kind === "fire") {
        const raw = this.inv.count("viande_crue");
        if (!raw && s.lit && this.inv.count("gourde") && this.inv.flask > 0 && !this.inv.flaskClean) {
          this.inv.flaskClean = true; this.sounds.ignite();
          this.ui.toast("♨️ L'eau de la gourde a bouilli : elle est saine.");
          return;
        }
        if (raw && s.lit) {
          this.inv.remove("viande_crue", raw);
          this.give("viande_cuite", raw);
          this.sounds.ignite();
        } else if (raw && !s.lit) this.ui.toast("Le feu est éteint : ajoute du bois.", true);
        else if (this.inv.remove("bois", 1)) {
          if (!s.lit) this.ui.toast("🔥 Le feu repart");
          this.structures.addFuel(s, 1);
          this.sounds.ignite();
        } else if (!s.lit) this.ui.toast("Il te faut du bois pour rallumer le feu.", true);
        else this.ui.toast("Tu te sèches et te réchauffes près du feu.");
        return;
      }
      if (s.kind === "boat") { this.player.board(s); this.ui.toast("🛶 Pagaie avec avancer/reculer, tourne à gauche/droite. Action pour débarquer."); return; }
      p.spawnPoint.set(s.pos.x, s.pos.y, s.pos.z);
      if (this.isNight()) this.sleep();
      else this.ui.toast("⛺ Point de réapparition enregistré");
      return;
    }
    const pr = target.prop, def = PROP_TYPES[pr.t];
    if (def.kind === "pickup") {
      this.props.remove(target.id, this.totalHours, 30 + Math.random() * 30);
      this.give(pr.t === "stick" ? "branche" : "pierre", 1);
      this.sounds.pickup();
    } else if (def.kind === "decor") {
      this.props.remove(target.id, this.totalHours, 30 + Math.random() * 20);
      this.give("fibre", 2);
      this.sounds.pickup();
    } else if (def.kind === "log") {
      this.attack(target);
    } else if (def.kind === "bush") {
      if (!pr.state) { this.ui.toast("Plus de baies ici pour le moment."); return; }
      this.props.setBush(target.id, 0, this.totalHours, 40);
      this.give("baies", 3 + Math.floor(Math.random() * 3));
      this.give("fibre", 2);
      this.sounds.pickup();
    } else if (def.kind === "tree") {
      if ((pr.t === "castanheira" || pr.t === "acai") && pr.state) {
        this.props.setBush(target.id, 0, this.totalHours, pr.t === "acai" ? 30 : 48);
        if (pr.t === "acai") this.give("acai", 2 + Math.floor(Math.random() * 3));
        else { this.give("noisettes", 3 + Math.floor(Math.random() * 4)); this.ui.toast("🌰 Tu casses un ouriço tombé au sol (attention, ils tombent de 40 m !)"); }
        this.sounds.pickup();
        return;
      }
      this.attack(target);
    }
  }

  // Boire de l'eau non traitée : risque de fièvre (amibes, bactéries)
  drinkRaw(risk, msg) {
    const p = this.player;
    this.ui.toast(msg);
    if (Math.random() < risk * (this.diff.sick ?? 1)) {
      p.sick = Math.min(100, (p.sick || 0) + 40);
      setTimeout(() => this.ui.toast("🤒 Tu as de la fièvre : l'eau n'était pas saine.", true), 2500);
      if (settings.hints && !this.toldBoil) { this.toldBoil = true; this.ui.showHint("La fièvre te déshydrate et t'affaiblit. Fais bouillir l'eau de la gourde près d'un feu, bois l'eau de pluie, et prépare une tisane d'écorce pour guérir.", 9000); }
    }
  }

  // Dangers de la forêt : moustiques au crépuscule près de l'eau, serpents venimeux, pluie qui remplit la gourde
  jungleTick(dt, ctx) {
    const p = this.player;
    // Gourde sous la pluie (hors couvert) : se remplit d'eau saine
    if ((this.env.rain || 0) > 0.4 && ctx.cover < 0.5 && this.inv.count("gourde")) {
      this.rainFill = (this.rainFill || 0) + dt * this.env.rain;
      if (this.rainFill > 25) {
        this.rainFill = 0;
        if (this.inv.flask < 4 && (this.inv.flaskClean || this.inv.flask === 0)) { this.inv.flask++; this.inv.flaskClean = true; this.ui.toast("🌧️ La pluie remplit ta gourde (eau saine)"); }
      }
    }
    // Moustiques : au crépuscule et la nuit, près de l'eau, sauf près d'un feu ou avec une torche
    this.mosqT = (this.mosqT || 0) - dt;
    if (this.mosqT <= 0) {
      this.mosqT = 20;
      const dusk = (this.hours > 17.5 && this.hours < 20.5) || (this.hours > 4.5 && this.hours < 6.5) || this.isNight();
      const nearWater = (this._sd ?? 40) < 25 || this.world.biomeAt(p.pos.x, p.pos.z).w > 0.3;
      if (dusk && nearWater && !ctx.nearFire && this.tool !== "torche" && Math.random() < 0.3 * (this.diff.sick ?? 1)) {
        this.sounds.tone({ f0: 620, f1: 660, dur: 0.6, gain: 0.03, type: "sawtooth" });
        if (Math.random() < 0.35) { p.sick = Math.min(100, (p.sick || 0) + 15); this.ui.toast("🦟 Piqûres de moustiques… tu te sens fiévreux.", true); }
        else this.ui.toast("🦟 Les moustiques te harcèlent. Un feu ou une torche les chasserait.");
      }
    }
    // Serpents venimeux (jararaca, surucucu) : morsure si on marche dessus
    const bite = this.herps.venomBite?.(p.pos, p.crouching);
    if (bite) {
      p.venom = Math.min(100, (p.venom || 0) + bite.venom);
      p.damage(6, ctx);
      this.sounds.bite();
      this.ui.toast(`🐍 Morsure de ${bite.name} ! Le venin agit : prépare une tisane et repose-toi.`, true);
    }
  }

  sleep() {
    const target = this.hours >= 12 ? 24 + 6.2 : 6.2;
    const dh = target - this.hours;
    this.advanceTime(dh);
    const p = this.player;
    p.food = Math.max(5, p.food - dh * 2.2);
    p.water = Math.max(5, p.water - dh * 3);
    p.health = Math.min(100, p.health + 30);
    p.warmth = 100; p.wet = 0;
    for (const c of [...this.creatures.list]) if (c.type === "onca") this.creatures.remove(c);
    this.env.forceEnvUpdate();
    this.ui.toast(`Tu dors… réveil au jour ${this.day}.`);
    this.save();
  }

  advanceTime(dh) {
    this.hours += dh;
    this.totalHours += dh;
    while (this.hours >= 24) {
      this.hours -= 24; this.day++; this.ui.toast(`☀️ Jour ${this.day}`);
      // La viande se gâte dans le sac (pas dans le réfrigérateur)
      let lost = 0;
      for (const id of ["viande_crue", "viande_cuite"]) { const n = this.inv.count(id); const k = Math.ceil(n / 3); if (k) { this.inv.remove(id, k); lost += k; } }
      if (lost) this.ui.toast(`🤢 ${lost} morceau${lost > 1 ? "x" : ""} de viande s'est gâté dans la chaleur humide. Range-la au réfrigérateur.`, true);
    }
  }

  respawn() {
    const p = this.player;
    for (const id of Object.keys(this.inv.items)) if (!ITEMS[id].tool && id !== "gourde") delete this.inv.items[id];
    p.dead = false;
    p.health = 70; p.food = Math.max(p.food, 50); p.water = Math.max(p.water, 50); p.stamina = 100; p.warmth = 100; p.sick = 0; p.venom = 0; p.wet = 0;
    p.pos.copy(p.spawnPoint.lengthSq() ? p.spawnPoint : this.worldSpawn);
    p.pos.y = this.world.heightAt(p.pos.x, p.pos.z);
    p.vel.set(0, 0, 0);
    for (const c of [...this.creatures.list]) if (c.type === "onca" || c.type === "jacare") this.creatures.remove(c);
    $("death").classList.add("hidden");
    this.state = "play";
    this.input.enabled = true;
    this.input.requestLock();
    this.save();
  }

  die() {
    this.state = "dead";
    this.input.exitLock();
    this.input.enabled = false;
    this.toggleBag(false, true);
    $("deathText").textContent = `Tu as tenu ${this.day - 1 === 0 ? "moins d'un jour" : this.day - 1 === 1 ? "1 jour" : this.day - 1 + " jours"}.`;
    $("death").classList.remove("hidden");
    this.save();
  }

  // ---------- Sauvegarde ----------
  save() {
    if (this.noSave || !this.player) return;
    if (!this.oldCleaned) { this.oldCleaned = true; OLD_SAVE_KEYS.forEach((k) => store.del(k)); }
    store.set(SAVE_KEY, {
      v: 1, seed: this.seed, hours: this.hours, day: this.day, totalHours: this.totalHours, tool: this.tool,
      player: this.player.serialize(), inv: this.inv.serialize(), props: this.props.serialize(), structures: this.structures.serialize(), builds: this.build.serialize(),
      intro: this.introShown,
    });
  }

  // Ancienne sauvegarde (avant le nouveau relief) : on garde le sac, les stats et le jour, pas la position.
  migrate(s) {
    this.hours = s.hours ?? 8; this.day = s.day ?? 1; this.totalHours = s.totalHours ?? 8;
    this.inv.restore(s.inv);
    const p = s.player || {};
    for (const k of ["health", "food", "water", "stamina", "warmth", "sick", "venom"]) if (p[k] != null) this.player[k] = p[k];
    this.introShown = true;
    this.migrated = true;
  }

  restore(s) {
    this.hours = s.hours ?? 8; this.day = s.day ?? 1; this.totalHours = s.totalHours ?? 8;
    this.player.restore(s.player);
    this.inv.restore(s.inv);
    this.props.restore(s.props);
    this.structures.restore(s.structures);
    this.build.restore(s.builds);
    this.tool = s.tool && (s.tool === "main" || this.inv.count(s.tool)) ? s.tool : "main";
    this.introShown = s.intro;
  }

  resize() {
    const c = this.renderer.domElement;
    const w = c.clientWidth || innerWidth, h = c.clientHeight || innerHeight;
    if (w === this.viewW && h === this.viewH) return;
    this.viewW = w; this.viewH = h;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.post.setSize(w * this.pixelRatio, h * this.pixelRatio);
    this.refl.setSize(w * this.pixelRatio, h * this.pixelRatio);
  }

  // Résolution dynamique : garde le jeu fluide sur les appareils modestes.
  adaptResolution(dt) {
    this.frameTimes.push(dt);
    this.dynTimer += dt;
    if (this.dynTimer < 2.5) return;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    this.dynTimer = 0;
    const max = Math.min(devicePixelRatio, Q.maxPixelRatio);
    let pr = this.pixelRatio;
    if (!settings.dynres) return;
    // D'abord on allège les effets coûteux (image toujours nette), puis seulement un peu la résolution
    this.perfLevel = this.perfLevel || 0;
    if (avg > 1 / 50 && this.perfLevel < 6) {
      this.perfLevel++;
      if (this.perfLevel === 1) this.post.ssao = false;
      if (this.perfLevel === 2) this.post.rays = false;
      if (this.perfLevel === 3) this.refl.enabled = false;
      if (this.perfLevel === 4) this.post.bloom = false;
      if (this.perfLevel === 5) { this.renderer.shadowMap.enabled = false; this.scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; }); }
      if (this.perfLevel === 6) this.under.meshes.slice(2).forEach((m) => (m.visible = false));
      return;
    }
    const minPr = Math.max(0.85, max * 0.75);
    if (avg > 1 / 42 && pr > minPr) pr = Math.max(minPr, pr - 0.1);
    else if (avg < 1 / 58 && pr < max) pr = Math.min(max, pr + 0.1);
    if (pr !== this.pixelRatio) { this.pixelRatio = pr; this.renderer.setPixelRatio(pr); this.renderer.setSize(this.viewW, this.viewH, false); this.post.setSize(this.viewW * pr, this.viewH * pr); this.refl.setSize(this.viewW * pr, this.viewH * pr); }
  }

  // ---------- Boucle ----------
  frame() {
    const dt = Math.min(0.05, this.clock.getDelta());
    this.renderer.info.reset();
    const playing = this.state === "play";
    const input = this.input;
    const p = this.player;

    if (playing) {
      const gameDt = dt * this.hoursPerSec;
      this.advanceTime(gameDt);
      const ctx = this.ctx(dt, gameDt);

      if ((input.was("Tab") || input.was("KeyI")) && !this.buildMenuOpen) this.toggleBag();
      if (input.was("Escape") && this.bagOpen) this.toggleBag(false);
      // Construction : B (ou 🔨) ouvre le menu, ou quitte le mode construction
      if ((input.was("KeyB") || input.was("Build")) && !this.bagOpen) {
        if (this.build.selected || this.editMode) this.exitBuild(); else this.toggleBuildMenu();
      }
      if (input.was("Escape") && this.buildMenuOpen) this.toggleBuildMenu(false);
      if ((input.was("KeyM") || input.was("Map")) && !this.bagOpen && !this.buildMenuOpen) this.toggleMap();
      if (input.was("Escape") && this.mapOpen) this.toggleMap(false);
      const building = !!this.build.selected || this.editMode;
      if (input.was("KeyF")) this.quickEat();
      const tools = this.ownedTools();
      for (let i = 0; i < tools.length; i++) if (input.was("Digit" + (i + 1))) this.selectTool(tools[i]);
      if (!building && (input.was("WheelDown") || input.was("WheelUp"))) {
        const i = tools.indexOf(this.tool);
        this.selectTool(tools[(i + (input.was("WheelUp") ? tools.length - 1 : 1)) % tools.length]);
      }
      if (!tools.includes(this.tool)) this.selectTool("main");

      const menu = this.bagOpen || this.buildMenuOpen || this.storageOpen || this.arcadeOpen || this.mapOpen;
      this.map.updateMini(dt, this);
      if (input.was("Escape") && this.storageOpen) this.closeStorage();
      if (menu) { input.consumeLook(); input.move.x = input.move.y = 0; }
      const frozenInput = menu ? { consumeLook: () => ({ x: 0, y: 0 }), axis: () => ({ x: 0, y: 0 }), sprint: false, crouch: false, jump: false } : input;
      p.update(dt, frozenInput, ctx);

      this.attackCd -= dt;
      if (p.boat) {
        // En canoë : la seule action est de débarquer, sur la rive la plus proche
        const shore = this.findShore(p.boat.pos);
        this.ui.setTarget(shore ? `<b>Canoë</b><small>${this.input.touch ? "✋" : "[E]"} Débarquer</small>` : `<b>Canoë</b><small>Approche-toi d'une rive pour débarquer</small>`, !!shore);
        if (!this.bagOpen && input.was("KeyE") && shore) { p.leave(shore[0], shore[1]); this.sounds.step("water"); }
      }
      if (building && !menu && !p.boat) this.updateBuild(input);
      const target = menu || p.boat || building ? null : this.findTarget();
      if (!p.boat && !building) { const [html, active] = this.describeTarget(target); this.ui.setTarget(html, active); }
      if (!menu && !p.boat && !building) {
        if ((input.was("Attack") || input.attackHeld) && this.attackCd <= 0) this.attack(target);
        if (input.was("KeyE")) this.interact(target);
      }

      this.build.animate(dt, this.camera.position);
      this.feederTick(dt);
      this.creatures.update(dt, p, {
        night: this.isNight(), day: this.day, hours: this.hours, fires: this.structures.fires, diff: this.diff,
        onAttack: (dmg, c) => {
          const torch = this.tool === "torche" ? 0.6 : 1;
          p.damage(dmg * torch, ctx);
          this.sounds.bite();
          if (c.type === "jacare" && !this.toldCaiman) { this.toldCaiman = true; this.ui.toast("🐊 Un caïman ! Éloigne-toi de l'eau.", true); }
        },
      });
      this.structures.update(dt, gameDt, p.pos);
      this.sounds.ambient(dt, {
        day: this.env.dayFactor, altitude: p.pos.y, inWater: p.swimming, fireDist: ctx.fireDist,
        coastDist: Math.max(0, this.world.heightAt(p.pos.x, p.pos.z)) * 6, speed: Math.hypot(p.vel.x, p.vel.z),
        streamDist: (this._sd = (this.frameN = (this.frameN || 0) + 1) % 15 === 0 ? this.world.streamNear(p.pos.x, p.pos.z) : this._sd ?? 40),
        rain: this.env.rain || 0, hours: this.hours,
      });
      this.jungleTick(dt, ctx);
      if (p.dead && this.state === "play") this.die();

      this.ui.updateHotbar(tools, this.tool);
      this.saveTimer += dt;
      if (this.saveTimer > 15) { this.saveTimer = 0; this.save(); }

      // Annonce de la nuit
      const nightNow = this.isNight();
      if (nightNow && !this.wasNight) {
        this.ui.toast(this.diff.predators ? "🌙 La nuit tombe d'un coup. Le jaguar chasse…" : "🌙 La nuit tombe d'un coup.", !!this.diff.predators);
        if (settings.hints && this.diff.predators && !this.structures.fires.some((f) => f.lit)) this.ui.showHint("La nuit, le jaguar chasse et les moustiques piquent près de l'eau. Reste près d'un feu ou tiens une torche, et évite de nager : les caïmans sont actifs.", 8000);
      }
      this.wasNight = nightNow;
    } else {
      this.camera.rotation.y += dt * 0.02; // menu : la caméra tourne doucement
      p.yaw = this.camera.rotation.y;
    }

    this.camera.getWorldDirection(this._camDir);
    this.props.update(dt, this.camera.position, this.totalHours, this._camDir);
    this.world.updateTerrain(this.camera, Q.viewDistance);
    this.grass.update(dt, this.camera.position);
    this.under.update(this.camera.position);
    this.world.waterUniforms.uTime.value += dt;
    this.env.update(this.hours, dt, this.camera.position, p.pos, playing ? dt * this.hoursPerSec : 0);
    this.rain.update(dt, this.camera.position, this.state === "play" && p.underwater ? 0 : this.env.rain, this.env.dayFactor, this.env.flash || 0);
    if (this.env.thunder != null) { const d = this.env.thunder; this.env.thunder = null; setTimeout(() => this.sounds.treeFall && this.sounds.burst({ freq: 120, q: 0.5, dur: 2.5, gain: 0.45, rate: 0.35, type: "lowpass" }), d * 1000); }

    this.ui.raining = (this.env.rain || 0) > 0.3;
    this.ui.updateHUD(p, this.hours, this.day, settings.fps ? this.fpsText : null);
    this.resize(); // filet de sécurité : rotation d'écran en mode appli (iOS)
    this.env.sunInfo.under = this.state === "play" && !!p.underwater;
    this.env.sunInfo.surf = p.surfaceY ?? 0;
    if (this.wasUnder && !this.env.sunInfo.under) this.wetT = 1.6;
    this.wetT = Math.max(0, (this.wetT || 0) - dt);
    this.env.sunInfo.wet = Math.max(this.wetT / 1.6, this.state === "play" ? (this.env.rain || 0) * 0.6 * (1 - Math.min(1, this.world.canopyAt(p.pos.x, p.pos.z) * 1.3)) : 0);
    this.wasUnder = this.env.sunInfo.under;
    this.sounds.setUnderwater(this.env.sunInfo.under);
    this.fish.particles(dt, this.camera.position, this.env.sunInfo.under);
    this.env.sunInfo.day = this.env.dayFactor;
    if (this.fish) this.fish.update(dt, this.camera.position, this.env.dayFactor);
    this.birds.update(dt, this.camera.position, this.env.dayFactor);
    this.insects.update(dt, this.camera.position, this.env.dayFactor);
    this.herps.update(dt, this.camera.position, this.hours, p.pos);
    this.refl.render(this.scene, this.camera, settings.reflections && !p.underwater ? this.nearWaterLevel(dt) : null);
    this.post.render(this.scene, this.camera, this.env.sunInfo);
    input.endFrame();

    this.fpsAcc += dt; this.fpsFrames++;
    if (this.fpsAcc > 0.5) {
      const info = this.renderer.info.render;
      this.fpsText = `${Math.round(this.fpsFrames / this.fpsAcc)} FPS · ${Q.name} · ×${this.pixelRatio.toFixed(2)} · ${(info.triangles / 1000).toFixed(0)}k tri · ${info.calls} appels`;
      this.fpsAcc = 0; this.fpsFrames = 0;
    }
    if (playing) this.adaptResolution(dt);
  }
}

const game = new Game();
window.__game = game;
game.init().catch((e) => {
  console.error(e);
  loadText.textContent = "Erreur au chargement : " + e.message;
});

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js", { scope: "./" }).catch(() => {});
}
