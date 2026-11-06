// Sons 100 % synthétisés (aucun fichier audio) : forêt amazonienne (cigales, grenouilles, singes hurleurs, aras,
// piha « capitão-do-mato »), pluie tropicale, fleuve, pas, coups, feu, rugissement du jaguar.

export class Sounds {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.8;
  }

  init() {
    if (this.ctx) { if (this.ctx.state === "suspended") this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain();
    this.master.gain.value = this.enabled ? this.volume : 0;
    // Filtre « sous l'eau » : étouffe tous les sons quand on plonge
    this.uw = ctx.createBiquadFilter(); this.uw.type = "lowpass"; this.uw.frequency.value = 20000;
    this.master.connect(this.uw).connect(ctx.destination);

    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // Vent
    const wind = ctx.createBufferSource();
    wind.buffer = this.noise; wind.loop = true;
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = "bandpass"; this.windFilter.frequency.value = 380; this.windFilter.Q.value = 0.6;
    this.windGain = ctx.createGain(); this.windGain.gain.value = 0.05;
    wind.connect(this.windFilter).connect(this.windGain).connect(this.master);
    wind.start();

    // Vagues (bruit grave filtré, monte près de la côte)
    const surf = ctx.createBufferSource();
    surf.buffer = this.noise; surf.loop = true; surf.playbackRate.value = 0.7;
    const sf = ctx.createBiquadFilter(); sf.type = "lowpass"; sf.frequency.value = 500;
    this.surfGain = ctx.createGain(); this.surfGain.gain.value = 0;
    surf.connect(sf).connect(this.surfGain).connect(this.master);
    surf.start();

    // Ruisseau (bruit aigu filtré, clapotis)
    const brook = ctx.createBufferSource();
    brook.buffer = this.noise; brook.loop = true; brook.playbackRate.value = 1.3;
    const bf = ctx.createBiquadFilter(); bf.type = "bandpass"; bf.frequency.value = 1800; bf.Q.value = 0.7;
    this.brookGain = ctx.createGain(); this.brookGain.gain.value = 0;
    brook.connect(bf).connect(this.brookGain).connect(this.master);
    brook.start();
    this.brookFilter = bf;

    // Grillons
    const cr = ctx.createOscillator(); cr.frequency.value = 4400; cr.type = "sine";
    const lfo = ctx.createOscillator(); lfo.frequency.value = 28;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.5;
    const crAmp = ctx.createGain(); crAmp.gain.value = 0.5;
    lfo.connect(lfoGain).connect(crAmp.gain);
    this.cricketGain = ctx.createGain(); this.cricketGain.gain.value = 0;
    cr.connect(crAmp).connect(this.cricketGain).connect(this.master);
    cr.start(); lfo.start();

    // Cigales du jour : bourdonnement aigu qui enfle et retombe par vagues
    const ci = ctx.createOscillator(); ci.type = "sawtooth"; ci.frequency.value = 5600;
    const ciF = ctx.createBiquadFilter(); ciF.type = "bandpass"; ciF.frequency.value = 6200; ciF.Q.value = 4;
    const ciL = ctx.createOscillator(); ciL.frequency.value = 110;
    const ciLG = ctx.createGain(); ciLG.gain.value = 0.5;
    const ciA = ctx.createGain(); ciA.gain.value = 0.5;
    ciL.connect(ciLG).connect(ciA.gain);
    this.cicadaGain = ctx.createGain(); this.cicadaGain.gain.value = 0;
    ci.connect(ciF).connect(ciA).connect(this.cicadaGain).connect(this.master);
    ci.start(); ciL.start();
    this.cicadaPhase = 0;

    // Pluie tropicale : souffle large (gouttes sur les feuilles) + grondement grave
    const rain = ctx.createBufferSource(); rain.buffer = this.noise; rain.loop = true;
    const rf = ctx.createBiquadFilter(); rf.type = "highpass"; rf.frequency.value = 900;
    const rf2 = ctx.createBiquadFilter(); rf2.type = "lowpass"; rf2.frequency.value = 7000;
    this.rainGain = ctx.createGain(); this.rainGain.gain.value = 0;
    rain.connect(rf).connect(rf2).connect(this.rainGain).connect(this.master);
    rain.start();
    const rumble = ctx.createBufferSource(); rumble.buffer = this.noise; rumble.loop = true; rumble.playbackRate.value = 0.4;
    const rl = ctx.createBiquadFilter(); rl.type = "lowpass"; rl.frequency.value = 260;
    this.rumbleGain = ctx.createGain(); this.rumbleGain.gain.value = 0;
    rumble.connect(rl).connect(this.rumbleGain).connect(this.master);
    rumble.start();
    this.frogTimer = 1; this.monkeyTimer = 20; this.pihaTimer = 8; this.dripTimer = 0;

    // Crépitement du feu
    this.fireGain = ctx.createGain(); this.fireGain.gain.value = 0;
    this.fireGain.connect(this.master);
    this.birdTimer = 2;
    this.crackleTimer = 0;
  }

  setUnderwater(on) {
    if (!this.ctx || !!this.isUnder === on) return;
    this.isUnder = on;
    this.uw.frequency.setTargetAtTime(on ? 520 : 20000, this.ctx.currentTime, 0.08);
    this.burst({ freq: on ? 500 : 1300, q: 0.6, dur: 0.5, gain: 0.3, rate: 0.6, type: "lowpass" }); // plouf / sortie de l'eau
  }

  setVolume(v) {
    this.volume = v;
    this.enabled = v > 0;
    if (this.master) this.master.gain.value = v;
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master) this.master.gain.value = on ? this.volume : 0;
  }

  burst({ freq = 800, q = 1, type = "bandpass", dur = 0.1, gain = 0.3, rate = 1, dest }) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise; src.playbackRate.value = rate;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(dest || this.master);
    src.start(t, Math.random() * 1.5, dur + 0.05);
  }

  tone({ f0 = 200, f1 = f0, dur = 0.2, gain = 0.2, type = "sine", attack = 0.005 }) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  step(surface) {
    if (surface === "water") this.burst({ freq: 1400, q: 0.8, dur: 0.18, gain: 0.12, rate: 0.8 });
    else if (surface === "sand") this.burst({ freq: 2200, q: 0.5, dur: 0.07, gain: 0.07 });
    else if (surface === "rock") this.burst({ freq: 3000, q: 2, dur: 0.04, gain: 0.08 });
    else this.burst({ freq: 900 + Math.random() * 300, q: 0.7, dur: 0.09, gain: 0.09 });
  }
  chop() { this.tone({ f0: 170, f1: 70, dur: 0.18, gain: 0.35 }); this.burst({ freq: 1800, q: 1.5, dur: 0.06, gain: 0.25 }); }
  rockHit() { this.burst({ freq: 3200, q: 4, dur: 0.12, gain: 0.3 }); this.tone({ f0: 900, f1: 700, dur: 0.1, gain: 0.08, type: "triangle" }); }
  swing() { this.burst({ freq: 600, q: 0.6, dur: 0.15, gain: 0.05, rate: 1.6 }); }
  hitFlesh() { this.tone({ f0: 140, f1: 60, dur: 0.15, gain: 0.3 }); this.burst({ freq: 500, q: 1, dur: 0.1, gain: 0.2 }); }
  treeFall() {
    this.burst({ freq: 300, q: 0.4, dur: 1.4, gain: 0.25, rate: 0.5, type: "lowpass" });
    setTimeout(() => this.tone({ f0: 90, f1: 35, dur: 0.6, gain: 0.5 }), 1500);
  }
  pickup() { this.tone({ f0: 520, f1: 780, dur: 0.12, gain: 0.08, type: "triangle" }); }
  craft() { this.tone({ f0: 660, f1: 990, dur: 0.15, gain: 0.08, type: "triangle" }); setTimeout(() => this.tone({ f0: 990, f1: 1320, dur: 0.2, gain: 0.07, type: "triangle" }), 110); }
  eat() { for (let i = 0; i < 3; i++) setTimeout(() => this.burst({ freq: 1200, q: 1, dur: 0.06, gain: 0.12 }), i * 140); }
  drink() { for (let i = 0; i < 3; i++) setTimeout(() => this.tone({ f0: 300, f1: 520, dur: 0.12, gain: 0.08 }), i * 220); }
  hurt() { this.tone({ f0: 220, f1: 120, dur: 0.25, gain: 0.25, type: "sawtooth" }); }
  bite() { this.burst({ freq: 700, q: 1.2, dur: 0.12, gain: 0.3 }); this.tone({ f0: 110, f1: 80, dur: 0.3, gain: 0.25, type: "sawtooth" }); }
  error() { this.tone({ f0: 200, f1: 170, dur: 0.15, gain: 0.08, type: "square" }); }
  ignite() { this.burst({ freq: 900, q: 0.4, dur: 0.6, gain: 0.25, rate: 0.6, type: "lowpass" }); }

  // Rugissement rauque du jaguar : série de « sciages » graves
  howl(dist) {
    if (!this.ctx) return;
    const vol = Math.max(0.03, 0.4 * (1 - Math.min(1, dist / 160)));
    for (let i = 0; i < 6; i++) setTimeout(() => {
      this.burst({ freq: 180 + Math.random() * 60, q: 1.5, dur: 0.32, gain: vol, rate: 0.5, type: "bandpass" });
      this.tone({ f0: 95, f1: 70, dur: 0.3, gain: vol * 0.6, type: "sawtooth", attack: 0.05 });
    }, i * (420 + Math.random() * 80));
  }

  // Singes hurleurs : grondement immense qui porte à des kilomètres (surtout à l'aube)
  howler(vol = 0.12) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime, dur = 4 + Math.random() * 3;
    const src = ctx.createBufferSource(); src.buffer = this.noise; src.loop = true; src.playbackRate.value = 0.5;
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 3;
    f.frequency.setValueAtTime(320, t);
    for (let k = 0; k < dur * 2; k++) f.frequency.linearRampToValueAtTime(260 + Math.random() * 260, t + k * 0.5 + 0.25);
    const am = ctx.createOscillator(); am.frequency.value = 2.2 + Math.random(); const amg = ctx.createGain(); amg.gain.value = vol * 0.5;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.8);
    g.gain.setValueAtTime(vol, t + dur - 1); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    am.connect(amg).connect(g.gain);
    src.connect(f).connect(g).connect(this.master);
    src.start(t); am.start(t); src.stop(t + dur + 0.1); am.stop(t + dur + 0.1);
  }

  // Piha hurleur (« capitão-do-mato ») : le sifflet « ui-ui-ouuu » emblématique de la forêt
  piha() {
    const g = 0.035 + Math.random() * 0.03;
    this.tone({ f0: 1500, f1: 2600, dur: 0.22, gain: g });
    setTimeout(() => this.tone({ f0: 1500, f1: 2700, dur: 0.22, gain: g }), 380);
    setTimeout(() => this.tone({ f0: 2800, f1: 1300, dur: 0.6, gain: g * 1.2 }), 760);
  }

  // Ara : cri rauque et puissant
  macaw() {
    const g = 0.04 + Math.random() * 0.03;
    for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) setTimeout(() => {
      this.tone({ f0: 900 + Math.random() * 300, f1: 600, dur: 0.25, gain: g, type: "sawtooth", attack: 0.02 });
      this.burst({ freq: 1800, q: 2, dur: 0.2, gain: g * 0.8 });
    }, i * 380);
  }

  // Grenouilles de la nuit : coassements, sifflets, « tocs » de rainettes
  frog() {
    const k = Math.random(), g = 0.02 + Math.random() * 0.03;
    if (k < 0.4) for (let i = 0; i < 4 + Math.floor(Math.random() * 6); i++) setTimeout(() => this.tone({ f0: 2400 + Math.random() * 600, f1: 2000, dur: 0.04, gain: g, type: "square" }), i * 110);
    else if (k < 0.7) this.tone({ f0: 300, f1: 180, dur: 0.35, gain: g * 1.5, type: "sawtooth", attack: 0.03 });
    else for (let i = 0; i < 3; i++) setTimeout(() => this.tone({ f0: 1100, f1: 1250, dur: 0.12, gain: g }), i * 260);
  }

  bird() {
    const base = 2200 + Math.random() * 2400;
    const n = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) setTimeout(() => this.tone({ f0: base, f1: base * (0.7 + Math.random() * 0.6), dur: 0.07 + Math.random() * 0.08, gain: 0.025 }), i * (90 + Math.random() * 60));
  }

  // Ambiance générale, appelée chaque image.
  ambient(dt, { day, altitude, inWater, fireDist, coastDist, speed, streamDist = 40, rain = 0, hours = 12 }) {
    if (!this.ctx) return;
    // Pluie
    this.rainGain.gain.value += (rain * 0.32 - this.rainGain.gain.value) * Math.min(1, dt * 1.5);
    this.rumbleGain.gain.value += (rain * rain * 0.22 - this.rumbleGain.gain.value) * Math.min(1, dt * 1.5);
    // Cigales : vagues de bourdonnement le jour (se taisent sous la pluie)
    this.cicadaPhase += dt;
    const wave = Math.max(0, Math.sin(this.cicadaPhase * 0.35) * Math.sin(this.cicadaPhase * 0.13 + 1)) ;
    const cv = day * (1 - rain) * (0.004 + wave * 0.016);
    this.cicadaGain.gain.value += (cv - this.cicadaGain.gain.value) * Math.min(1, dt * 2);
    // Grenouilles la nuit et après la pluie, près de l'eau
    this.frogTimer -= dt;
    if (this.frogTimer < 0) {
      this.frogTimer = 0.4 + Math.random() * (streamDist < 30 ? 1.2 : 3);
      if ((1 - day) > 0.5 || rain > 0.3) this.frog();
    }
    // Singes hurleurs à l'aube et au crépuscule (parfois en journée), pihas et aras le jour
    this.monkeyTimer -= dt;
    if (this.monkeyTimer < 0) {
      const dawn = (hours > 4.5 && hours < 7.5) || (hours > 17 && hours < 18.8);
      this.monkeyTimer = dawn ? 15 + Math.random() * 25 : 60 + Math.random() * 120;
      if (!inWater) this.howler(0.05 + Math.random() * 0.1);
    }
    this.pihaTimer -= dt;
    if (this.pihaTimer < 0) {
      this.pihaTimer = 6 + Math.random() * 14;
      if (day > 0.5 && rain < 0.4 && !inWater) (Math.random() < 0.55 ? this.piha() : this.macaw());
    }
    const bv = Math.max(0, 1 - streamDist / 35) * 0.09;
    this.brookGain.gain.value += (bv - this.brookGain.gain.value) * Math.min(1, dt * 2);
    this.brookFilter.frequency.value = 1500 + Math.sin(performance.now() * 0.0021) * 400 + Math.sin(performance.now() * 0.0057) * 200;
    const w = 0.015 + Math.min(0.12, Math.max(0, altitude - 25) * 0.003) + speed * 0.004 + rain * 0.04;   // l'air est immobile sous la canopée
    this.windGain.gain.value += (w - this.windGain.gain.value) * Math.min(1, dt * 2);
    this.windFilter.frequency.value = 320 + Math.sin(performance.now() * 0.0003) * 120;
    const night = 1 - day;
    this.cricketGain.gain.value += (night * 0.02 - this.cricketGain.gain.value) * Math.min(1, dt);
    const surf = Math.max(0, 1 - coastDist / 60) * 0.05 * (0.7 + 0.3 * Math.sin(performance.now() * 0.0006));   // clapotis du fleuve
    this.surfGain.gain.value += (surf - this.surfGain.gain.value) * Math.min(1, dt * 2);
    this.birdTimer -= dt;
    if (this.birdTimer < 0) {
      this.birdTimer = 2 + Math.random() * 6;
      if (day > 0.6 && !inWater) this.bird();
    }
    const fv = fireDist < 25 ? (1 - fireDist / 25) * 0.25 : 0;
    this.crackleTimer -= dt;
    if (fv > 0.01 && this.crackleTimer < 0) {
      this.crackleTimer = 0.03 + Math.random() * 0.15;
      this.burst({ freq: 2000 + Math.random() * 3000, q: 3, dur: 0.02 + Math.random() * 0.03, gain: fv * (0.3 + Math.random()) });
    }
  }
}
