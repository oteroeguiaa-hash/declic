// Lisière : boucle principale, chargement, interactions, sauvegarde.
import * as THREE from "three";
import { World, makeDetailTexture, makeWaterNormalTexture } from "./world.js";
import { Environment } from "./sky.js";
import { Props, Grass, PROP_TYPES } from "./props.js";
import { Creatures } from "./creatures.js";
import { Structures } from "./structures.js";
import { Player } from "./player.js";
import { Input } from "./input.js";
import { Sounds } from "./audio.js";
import { UI } from "./ui.js";
import { ITEMS, TOOLS, RECIPES, TOOL_SLOTS, Inventory } from "./items.js";
import { Post } from "./post.js";

const SAVE_KEY = "lisiere-save-v3";        // v3 : île 2,5 × plus grande, ruisseaux, bosquets
const OLD_SAVE_KEYS = ["lisiere-save-v2", "lisiere-save-v1"];
const SETTINGS_KEY = "lisiere-settings";
const $ = (id) => document.getElementById(id);

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};

const PRESETS = {
  low:    { msaa: 0, raySamples: 24, rayScale: 0.25, terrainCells: 256, shadows: true, shadowSize: 1024, shadowRange: 34, viewDistance: 330, grassCount: 16000, grassRadius: 19, treeCandidates: 120000, lodScale: 0.55, envInterval: 20, maxDeer: 5, maxSquirrels: 3, maxWolves: 4, maxCreatures: 16, antialias: false, maxPixelRatio: 1.25 },
  medium: { msaa: 2, raySamples: 40, rayScale: 0.4, terrainCells: 384, shadows: true, shadowSize: 2048, shadowRange: 48, viewDistance: 480, grassCount: 38000, grassRadius: 26, treeCandidates: 120000, lodScale: 0.85, envInterval: 10, maxDeer: 6, maxSquirrels: 4, maxWolves: 5, maxCreatures: 22, antialias: true, maxPixelRatio: 1.6 },
  high:   { msaa: 4, raySamples: 60, rayScale: 0.5, terrainCells: 512, shadows: true, shadowSize: 4096, shadowRange: 62, viewDistance: 680, grassCount: 75000, grassRadius: 34, treeCandidates: 120000, lodScale: 1.25, envInterval: 6, maxDeer: 8, maxSquirrels: 5, maxWolves: 6, maxCreatures: 28, antialias: true, maxPixelRatio: 2 },
};

function detectQuality() {
  const touch = matchMedia("(pointer: coarse)").matches;
  const mem = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 4;
  if (touch) return mem >= 6 && cores >= 8 ? "medium" : "low";
  return cores >= 8 && mem >= 8 ? "high" : "medium";
}

const DEFAULTS = {
  quality: "auto", shadows: "auto", grass: "auto", viewDist: "auto", rays: true, bloom: true, dynres: true,
  difficulty: "normal", dayMinutes: 16, hints: true,
  sens: 1, invertY: false, fov: 72, headBob: true,
  volume: 80,
  uiScale: "1", compass: true, crosshair: true, fps: false,
};
const savedSettings = store.get(SETTINGS_KEY) || {};
if (savedSettings.sound === false && savedSettings.volume == null) savedSettings.volume = 0;
const settings = Object.assign({}, DEFAULTS, savedSettings);

export const DIFFS = {
  paisible:  { label: "Paisible",  predators: false, damage: 0.5, hunger: 0.6, wolves: 0, bears: 0 },
  normal:    { label: "Normal",    predators: true,  damage: 1,   hunger: 1,   wolves: 1, bears: 1 },
  difficile: { label: "Difficile", predators: true,  damage: 1.5, hunger: 1.4, wolves: 1.6, bears: 2 },
};
const VIEW = { proche: 260, normale: 450, loin: 650, tresloin: 900 };

const qualityName = settings.quality === "auto" ? detectQuality() : settings.quality;
const Q = { ...PRESETS[qualityName], name: qualityName };
if (settings.shadows === "off") Q.shadows = false;
else if (settings.shadows === "normal") Object.assign(Q, { shadows: true, shadowSize: 2048, shadowRange: 48 });
else if (settings.shadows === "fine") Object.assign(Q, { shadows: true, shadowSize: 4096, shadowRange: 60 });
if (settings.grass === "low") Object.assign(Q, { grassCount: Math.round(Q.grassCount * 0.5), grassRadius: Q.grassRadius * 0.8 });
else if (settings.grass === "normal") Object.assign(Q, { grassCount: PRESETS.medium.grassCount, grassRadius: PRESETS.medium.grassRadius });
else if (settings.grass === "high") Object.assign(Q, { grassCount: Math.round(Q.grassCount * 1.6), grassRadius: Q.grassRadius * 1.15 });
const baseView = Q.viewDistance;
if (VIEW[settings.viewDist]) Q.viewDistance = VIEW[settings.viewDist];
const RELOAD_KEYS = ["quality", "shadows", "grass"];
const initialReload = Object.fromEntries(RELOAD_KEYS.map((k) => [k, settings[k]]));

const opt = (pairs) => pairs.map(([v, l]) => ({ v, l }));
const SCHEMA = [
  ["Graphismes", [
    { k: "quality", l: "Qualité générale", o: opt([["auto", "Automatique"], ["low", "Rapide"], ["medium", "Équilibrée"], ["high", "Belle"]]) },
    { k: "shadows", l: "Ombres", o: opt([["auto", "Selon la qualité"], ["off", "Désactivées"], ["normal", "Normales"], ["fine", "Fines"]]) },
    { k: "grass", l: "Densité de l'herbe", o: opt([["auto", "Selon la qualité"], ["low", "Faible"], ["normal", "Normale"], ["high", "Élevée"]]) },
    { k: "viewDist", l: "Distance de vue", o: opt([["auto", "Selon la qualité"], ["proche", "Proche"], ["normale", "Normale"], ["loin", "Loin"], ["tresloin", "Très loin"]]) },
    { k: "rays", l: "Rayons de soleil", t: "toggle" },
    { k: "bloom", l: "Halo lumineux", t: "toggle" },
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
const step = async (pct, text) => {
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
    const newSeed = store.get("lisiere-newseed");
    store.del("lisiere-newseed");
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(settings.fov, this.viewW / this.viewH, 0.08, 9000);
    this.scene.add(this.camera);

    await step(15, "Formation de l'île…");
    this.world = new World(this.seed);
    await step(35, "Les forêts poussent…");
    this.props = new Props(this.scene, this.world, Q, this.seed, renderer);
    this.world.applyCanopy(this.props.list);

    await step(55, "Érosion et rivages…");
    const detail = makeDetailTexture(renderer, 7);
    const waterN = makeWaterNormalTexture(renderer, 3);
    this.world.buildHeightTexture();
    this.scene.add(this.world.buildTerrain(detail));
    this.scene.add(this.world.buildWater(waterN));
    this.scene.add(this.world.buildStreams(waterN));
    this.grass = new Grass(this.scene, this.world, Q);

    await step(65, "Le ciel se lève…");
    this.env = new Environment(this.scene, renderer, Q);

    await step(78, "Les animaux s'installent…");
    this.sounds = new Sounds();
    this.sounds.setVolume(settings.volume / 100);
    this.structures = new Structures(this.scene, this.world);
    this.creatures = new Creatures(this.scene, this.world, this.props, Q, this.sounds);
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
    if (saved) this.restore(saved);
    else if (oldSave) this.migrate(oldSave);
    this.player.setTool(this.tool);

    await step(90, "Compilation des shaders…");
    this.env.update(this.hours, 0.016, this.camera.position, this.player.pos);
    this.player.update(0, this.input, this.ctx(0, 0));
    this.props.rebuild(this.player.pos);
    this.world.updateTerrain(this.player.pos, Q.viewDistance, Q.lodScale);
    this.post = new Post(renderer, Q);
    this.post.setSize(this.viewW * this.pixelRatio, this.viewH * this.pixelRatio);
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
    return { sounds: this.sounds, day: this.env.dayFactor, gameDtHours, nearFire, fireDist, coat: this.inv.count("manteau") > 0, hunger: this.diff.hunger };
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
    if (this.post) { this.post.rays = settings.rays; this.post.bloom = settings.bloom; }
    if (!settings.dynres && this.post) {
      const max = Math.min(devicePixelRatio, Q.maxPixelRatio);
      if (this.pixelRatio !== max) { this.pixelRatio = max; this.renderer.setPixelRatio(max); this.renderer.setSize(this.viewW, this.viewH, false); this.post.setSize(this.viewW * max, this.viewH * max); }
    }
    const vd = VIEW[settings.viewDist] || baseView;
    if (vd !== Q.viewDistance) {
      Q.viewDistance = vd;
      this.scene.fog.near = vd * 0.25; this.scene.fog.far = vd;
      this.props.dirty = true;
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
    $("btnReload").onclick = () => { this.save(); location.reload(); };
    document.querySelectorAll("[data-back]").forEach((b) => (b.onclick = () => this.openPanel(null)));
    $("howKeys").innerHTML = touch
      ? `<p>Joystick à gauche pour marcher (pousse à fond pour courir), glisse à droite pour regarder.<br>✊ frapper · ✋ ramasser, boire, cuire · 🎒 sac · 🔁 changer d'outil · ⤒ sauter.</p>`
      : `<p><kbd>Z</kbd><kbd>Q</kbd><kbd>S</kbd><kbd>D</kbd> ou <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> se déplacer · <kbd>Maj</kbd> courir · <kbd>Espace</kbd> sauter · <kbd>C</kbd> s'accroupir<br>
         <kbd>Clic</kbd> frapper · <kbd>E</kbd> ou <kbd>clic droit</kbd> ramasser, boire, cuire · <kbd>Tab</kbd> sac · <kbd>1</kbd>–<kbd>6</kbd> ou molette : outil · <kbd>F</kbd> manger · <kbd>Échap</kbd> pause</p>`;
    $("closeBag").onclick = () => this.toggleBag(false);
    $("btnRespawn").onclick = () => this.respawn();
    $("btnPause").addEventListener("touchstart", (e) => { e.preventDefault(); this.pause(); });
    this.input.onLockChange = (locked) => {
      if (!locked && this.state === "play" && !this.bagOpen) this.pause();
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
      store.set("lisiere-newseed", seed % 1e9);
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
      this.ui.showHint("Ramasse des branches et des cailloux au sol, cueille un buisson pour la fibre, puis ouvre ton sac pour fabriquer tes premiers outils en bois.", 9000);
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
      if (this.inv.flask <= 0) { this.ui.toast("La gourde est vide. Remplis-la au bord de l'eau.", true); return; }
      this.inv.flask--;
      p.water = Math.min(100, p.water + 25);
      this.sounds.drink();
      this.ui.toast("💧 Tu bois à la gourde");
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
    for (const id of ["viande_cuite", "noisettes", "baies", "viande_crue"]) {
      if (this.inv.count(id) > 0) { this.useItem(id); return; }
    }
    this.ui.toast("Tu n'as rien à manger.", true);
  }

  craft(id) {
    const r = RECIPES.find((x) => x.id === id);
    if (!r || !this.inv.canCraft(r)) return;
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
        this.ui.toast("⛺ Abri construit : tu y réapparaîtras");
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
    if (t.type === "water") return [`<b>Eau</b><small>${use} Boire${this.inv.count("gourde") ? " et remplir la gourde" : ""}</small>`, true];
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
        const act = this.inv.count("viande_crue") ? "Cuire la viande" : this.inv.count("bois") ? (s.lit ? "Ajouter du bois" : "Rallumer (1 bois)") : s.lit ? "Se réchauffer" : "Il faut du bois";
        return [`<b>Feu de camp</b><small>${st}<br>${use} ${act}</small>`, true];
      }
      return [`<b>Abri</b><small>${use} ${this.isNight() ? "Dormir jusqu'au matin" : "Définir comme point de réapparition"}</small>`, true];
    }
    const p = t.prop, def = PROP_TYPES[p.t];
    if (def.kind === "tree") {
      const tool = TOOLS[this.tool];
      const action = tool.tree >= 1 ? `${hit} Abattre` : tool.tree > 0 ? `${hit} Abattre (lentement)` : `${hit} Arracher une branche`;
      const hp = p.hp < def.hp ? `<div class="hpbar"><i style="width:${(p.hp / def.hp) * 100}%"></i></div>` : "";
      return [`<b>${def.name}</b><small>${action}</small>${hp}`, true];
    }
    if (def.kind === "rock") {
      const ok = TOOLS[this.tool].rock > 0;
      const hp = p.hp < def.hp ? `<div class="hpbar"><i style="width:${(p.hp / def.hp) * 100}%"></i></div>` : "";
      return [`<b>Rocher</b><small>${ok ? `${hit} Extraire de la pierre${TOOLS[this.tool].rock < 1 ? " (lentement)" : ""}` : "Il faut une pioche (en bois ou en pierre)"}</small>${hp}`, ok];
    }
    if (def.kind === "bush") return [`<b>${p.state ? "Buisson à baies" : "Buisson"}</b><small>${p.state ? `${use} Cueillir` : "Les baies repousseront"}</small>`, !!p.state];
    if (def.kind === "pickup") return [`<b>${def.name}</b><small>${use} Ramasser</small>`, true];
    if (def.kind === "decor") return [`<b>Fougère</b><small>${use} Cueillir (fibre)</small>`, true];
    if (def.kind === "log") {
      const ok = TOOLS[this.tool].tree > 0;
      return [`<b>Tronc couché</b><small>${ok ? `${hit} Débiter (bois)` : "Il faut une hache"}</small>`, ok];
    }
    return ["", false];
  }

  isNight() { return this.hours >= 20.5 || this.hours < 5.5; }

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
      if (this.creatures.damage(c, dmg, this.player.pos)) this.ui.toast(`${c.sp.name} : abattu${c.type === "bear" || c.type === "moose" ? " !" : ""}`);
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
          const wood = 3 + Math.round(p.s * 2);
          setTimeout(() => { this.give("bois", wood); this.give("branche", 2); }, 900);
        }
      } else if (Math.random() < 0.45) this.give("branche", 1);
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
    const p = this.player;
    if (target.type === "water") {
      p.water = Math.min(100, p.water + 30);
      this.sounds.drink();
      let msg = "💧 Tu bois de l'eau";
      if (this.inv.count("gourde") && this.inv.flask < 4) { this.inv.flask = 4; msg += " et remplis ta gourde"; }
      this.ui.toast(msg);
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
        else this.ui.toast("Tu te réchauffes près du feu.");
        return;
      }
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
      this.attack(target);
    }
  }

  sleep() {
    const target = this.hours >= 12 ? 24 + 6.5 : 6.5;
    const dh = target - this.hours;
    this.advanceTime(dh);
    const p = this.player;
    p.food = Math.max(5, p.food - dh * 2.2);
    p.water = Math.max(5, p.water - dh * 3);
    p.health = Math.min(100, p.health + 30);
    p.warmth = 100;
    for (const c of [...this.creatures.list]) if (c.type === "wolf") this.creatures.remove(c);
    this.env.forceEnvUpdate();
    this.ui.toast(`Tu dors… réveil au jour ${this.day}.`);
    this.save();
  }

  advanceTime(dh) {
    this.hours += dh;
    this.totalHours += dh;
    while (this.hours >= 24) { this.hours -= 24; this.day++; this.ui.toast(`☀️ Jour ${this.day}`); }
  }

  respawn() {
    const p = this.player;
    for (const id of Object.keys(this.inv.items)) if (!ITEMS[id].tool && id !== "gourde") delete this.inv.items[id];
    p.dead = false;
    p.health = 70; p.food = Math.max(p.food, 50); p.water = Math.max(p.water, 50); p.stamina = 100; p.warmth = 100;
    p.pos.copy(p.spawnPoint.lengthSq() ? p.spawnPoint : this.worldSpawn);
    p.pos.y = this.world.heightAt(p.pos.x, p.pos.z);
    p.vel.set(0, 0, 0);
    for (const c of [...this.creatures.list]) if (c.type === "wolf") this.creatures.remove(c);
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
      player: this.player.serialize(), inv: this.inv.serialize(), props: this.props.serialize(), structures: this.structures.serialize(),
      intro: this.introShown,
    });
  }

  // Ancienne sauvegarde (avant le nouveau relief) : on garde le sac, les stats et le jour, pas la position.
  migrate(s) {
    this.hours = s.hours ?? 8; this.day = s.day ?? 1; this.totalHours = s.totalHours ?? 8;
    this.inv.restore(s.inv);
    const p = s.player || {};
    for (const k of ["health", "food", "water", "stamina", "warmth"]) if (p[k] != null) this.player[k] = p[k];
    this.introShown = true;
    this.migrated = true;
  }

  restore(s) {
    this.hours = s.hours ?? 8; this.day = s.day ?? 1; this.totalHours = s.totalHours ?? 8;
    this.player.restore(s.player);
    this.inv.restore(s.inv);
    this.props.restore(s.props);
    this.structures.restore(s.structures);
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
    if (avg > 1 / 40 && pr > 0.6) pr = Math.max(0.6, pr - 0.15);
    else if (avg < 1 / 58 && pr < max) pr = Math.min(max, pr + 0.1);
    if (pr !== this.pixelRatio) { this.pixelRatio = pr; this.renderer.setPixelRatio(pr); this.renderer.setSize(this.viewW, this.viewH, false); this.post.setSize(this.viewW * pr, this.viewH * pr); }
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

      if (input.was("Tab") || input.was("KeyI")) this.toggleBag();
      if (input.was("Escape") && this.bagOpen) this.toggleBag(false);
      if (input.was("KeyF")) this.quickEat();
      const tools = this.ownedTools();
      for (let i = 0; i < tools.length; i++) if (input.was("Digit" + (i + 1))) this.selectTool(tools[i]);
      if (input.was("WheelDown") || input.was("WheelUp")) {
        const i = tools.indexOf(this.tool);
        this.selectTool(tools[(i + (input.was("WheelUp") ? tools.length - 1 : 1)) % tools.length]);
      }
      if (!tools.includes(this.tool)) this.selectTool("main");

      if (this.bagOpen) { input.consumeLook(); input.move.x = input.move.y = 0; }
      const frozenInput = this.bagOpen ? { consumeLook: () => ({ x: 0, y: 0 }), axis: () => ({ x: 0, y: 0 }), sprint: false, crouch: false, jump: false } : input;
      p.update(dt, frozenInput, ctx);

      const target = this.bagOpen ? null : this.findTarget();
      const [html, active] = this.describeTarget(target);
      this.ui.setTarget(html, active);
      this.attackCd -= dt;
      if (!this.bagOpen) {
        if ((input.was("Attack") || input.attackHeld) && this.attackCd <= 0) this.attack(target);
        if (input.was("KeyE")) this.interact(target);
      }

      this.creatures.update(dt, p, {
        night: this.isNight(), day: this.day, fires: this.structures.fires, diff: this.diff,
        onAttack: (dmg, c) => {
          const torch = this.tool === "torche" ? 0.6 : 1;
          p.damage(dmg * torch, ctx);
          this.sounds.bite();
        },
      });
      this.structures.update(dt, gameDt, p.pos);
      this.sounds.ambient(dt, {
        day: this.env.dayFactor, altitude: p.pos.y, inWater: p.swimming, fireDist: ctx.fireDist,
        coastDist: Math.max(0, this.world.heightAt(p.pos.x, p.pos.z)) * 6, speed: Math.hypot(p.vel.x, p.vel.z),
        streamDist: (this._sd = (this.frameN = (this.frameN || 0) + 1) % 15 === 0 ? this.world.streamNear(p.pos.x, p.pos.z) : this._sd ?? 40),
      });
      if (p.dead && this.state === "play") this.die();

      this.ui.updateHotbar(tools, this.tool);
      this.saveTimer += dt;
      if (this.saveTimer > 15) { this.saveTimer = 0; this.save(); }

      // Annonce de la nuit
      const nightNow = this.isNight();
      if (nightNow && !this.wasNight) {
        this.ui.toast(this.diff.predators ? "🌙 La nuit tombe. Les loups sortent…" : "🌙 La nuit tombe.", !!this.diff.predators);
        if (settings.hints && this.diff.predators && !this.structures.fires.some((f) => f.lit)) this.ui.showHint("La nuit, les loups rôdent et il fait froid. Reste près d'un feu ou tiens une torche.", 7000);
      }
      this.wasNight = nightNow;
    } else {
      this.camera.rotation.y += dt * 0.02; // menu : la caméra tourne doucement
      p.yaw = this.camera.rotation.y;
    }

    this.props.update(dt, p.pos, this.totalHours);
    this.world.updateTerrain(this.camera.position, Q.viewDistance, Q.lodScale);
    this.grass.update(dt, this.camera.position);
    this.world.waterUniforms.uTime.value += dt;
    this.env.update(this.hours, dt, this.camera.position, p.pos);

    this.ui.updateHUD(p, this.hours, this.day, settings.fps ? this.fpsText : null);
    this.resize(); // filet de sécurité : rotation d'écran en mode appli (iOS)
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
