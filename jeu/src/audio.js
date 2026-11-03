// Sons 100 % synthétisés (aucun fichier audio) : vent, oiseaux, grillons, pas, coups, feu, loups.

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

  howl(dist) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const vol = Math.max(0.02, 0.3 * (1 - Math.min(1, dist / 160)));
    const o = ctx.createOscillator(); o.type = "sine";
    o.frequency.setValueAtTime(330, t);
    o.frequency.linearRampToValueAtTime(560, t + 0.6);
    o.frequency.linearRampToValueAtTime(600, t + 1.8);
    o.frequency.linearRampToValueAtTime(420, t + 2.8);
    const vib = ctx.createOscillator(); vib.frequency.value = 5.5;
    const vg = ctx.createGain(); vg.gain.value = 9;
    vib.connect(vg).connect(o.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.4);
    g.gain.setValueAtTime(vol, t + 2.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1400;
    o.connect(lp).connect(g).connect(this.master);
    o.start(t); vib.start(t); o.stop(t + 3.1); vib.stop(t + 3.1);
  }

  bird() {
    const base = 2200 + Math.random() * 2400;
    const n = 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) setTimeout(() => this.tone({ f0: base, f1: base * (0.7 + Math.random() * 0.6), dur: 0.07 + Math.random() * 0.08, gain: 0.025 }), i * (90 + Math.random() * 60));
  }

  // Ambiance générale, appelée chaque image.
  ambient(dt, { day, altitude, inWater, fireDist, coastDist, speed, streamDist = 40 }) {
    if (!this.ctx) return;
    const bv = Math.max(0, 1 - streamDist / 35) * 0.09;
    this.brookGain.gain.value += (bv - this.brookGain.gain.value) * Math.min(1, dt * 2);
    this.brookFilter.frequency.value = 1500 + Math.sin(performance.now() * 0.0021) * 400 + Math.sin(performance.now() * 0.0057) * 200;
    const w = 0.035 + Math.min(0.12, Math.max(0, altitude - 20) * 0.0015) + speed * 0.004;
    this.windGain.gain.value += (w - this.windGain.gain.value) * Math.min(1, dt * 2);
    this.windFilter.frequency.value = 320 + Math.sin(performance.now() * 0.0003) * 120;
    const night = 1 - day;
    this.cricketGain.gain.value += (night * 0.012 - this.cricketGain.gain.value) * Math.min(1, dt);
    const surf = Math.max(0, 1 - coastDist / 60) * 0.12 * (0.7 + 0.3 * Math.sin(performance.now() * 0.0006));
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
