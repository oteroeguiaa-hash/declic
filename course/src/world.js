// Stade : piste d'athlétisme ovale (ou couloir de nage), tribunes, environnement, météo.
import * as THREE from "three";
import { Sky } from "../vendor/addons/Sky.js";

export const STRAIGHT = 84.39;
export const R0 = 36.5;
const CHUTE = 40; // prolongement de la ligne droite (départ du 100 m)

// Géométrie de la piste : couloirs et position le long d'un couloir.
export class Track {
  constructor(lanes, laneW) {
    this.lanes = lanes;
    this.w = laneW;
  }
  radius(i) { return R0 + 0.3 + i * this.w; }
  laneLength(i) { return 2 * STRAIGHT + 2 * Math.PI * this.radius(i); }
  // Point et cap à la distance s (depuis la ligne d'arrivée, sens anti-horaire) du couloir i.
  at(i, s, out = {}) {
    const r = this.radius(i);
    const L = this.laneLength(i);
    s = ((s % L) + L) % L;
    const S = STRAIGHT, h = S / 2;
    const arc = Math.PI * r;
    let x, z, hx, hz;
    if (s < arc) { const t = s / r; x = h + r * Math.sin(t); z = r * Math.cos(t); hx = Math.cos(t); hz = -Math.sin(t); }
    else if (s < arc + S) { const d = s - arc; x = h - d; z = -r; hx = -1; hz = 0; }
    else if (s < 2 * arc + S) { const t = (s - arc - S) / r; x = -h - r * Math.sin(t); z = -r * Math.cos(t); hx = -Math.cos(t); hz = Math.sin(t); }
    else { const d = s - 2 * arc - S; x = -h + d; z = r; hx = 1; hz = 0; }
    out.x = x; out.z = z; out.hx = hx; out.hz = hz; out.yaw = Math.atan2(-hz, hx);
    return out;
  }
}

// Course : position d'un concurrent en fonction de la distance parcourue.
export class Course {
  constructor(track, distance) {
    this.track = track;
    this.D = distance;
    this.straight = distance <= STRAIGHT + CHUTE - 2;
  }
  startS(i) {
    const L = this.track.laneLength(i);
    const m = this.D % L;
    return m === 0 ? 0 : L - m;
  }
  pos(i, d, out = {}) {
    if (this.straight) {
      const r = this.track.radius(i);
      out.x = STRAIGHT / 2 - this.D + d; out.z = r; out.hx = 1; out.hz = 0; out.yaw = 0;
      return out;
    }
    return this.track.at(i, this.startS(i) + d, out);
  }
}

function canvasTex(w, h, draw, repeat = [1, 1]) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d");
  draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function noiseFill(g, w, h, base, spread, n = 9000, size = 2) {
  g.fillStyle = base; g.fillRect(0, 0, w, h);
  for (let i = 0; i < n; i++) {
    const v = (Math.random() - 0.5) * spread;
    g.fillStyle = v > 0 ? `rgba(255,255,255,${v})` : `rgba(0,0,0,${-v})`;
    g.fillRect(Math.random() * w, Math.random() * h, size, size);
  }
}

const SURFACES = {
  piste: { color: "#b5432c", spread: 0.25, rough: 0.85, line: "#f4f1ea" },
  herbe: { color: "#4f7f2e", spread: 0.35, rough: 0.95, line: "#f4f4f0" },
  terre: { color: "#a8603a", spread: 0.3, rough: 0.95, line: "#f4f1ea" },
  bitume: { color: "#3c3d40", spread: 0.25, rough: 0.8, line: "#f4f4f0" },
  sable: { color: "#d9bf8a", spread: 0.25, rough: 1, line: "#7a5a3a" },
  neige: { color: "#eef2f6", spread: 0.08, rough: 0.6, line: "#3a6ab8" },
  boue: { color: "#4e3a28", spread: 0.35, rough: 0.35, line: "#e8e2d4" },
  eau: { color: "#2a6a8a", spread: 0.1, rough: 0.1, line: "#f0f0f0" },
};

export class World {
  constructor(renderer) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.t = 0;
    this.setupLights();
    this.setupSky();
    this.precip = null;
    this.flags = [];
  }

  setupLights() {
    const s = this.scene;
    this.hemi = new THREE.HemisphereLight(0xcfe6ff, 0x5a6a3a, 0.9);
    s.add(this.hemi);
    const sun = new THREE.DirectionalLight(0xfff2dc, 2.6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    const c = sun.shadow.camera;
    c.left = -18; c.right = 18; c.top = 18; c.bottom = -18; c.near = 1; c.far = 260;
    s.add(sun);
    s.add(sun.target);
    this.sun = sun;
    this.sunDir = new THREE.Vector3(-0.45, 0.75, 0.48).normalize();
  }

  setupSky() {
    const sky = new Sky();
    sky.scale.setScalar(4500);
    const u = sky.material.uniforms;
    u.turbidity.value = 4;
    u.rayleigh.value = 1.4;
    u.mieCoefficient.value = 0.004;
    u.mieDirectionalG.value = 0.8;
    u.sunPosition.value.copy(this.sunDir);
    this.scene.add(sky);
    this.sky = sky;
    this.scene.fog = new THREE.Fog(0xc8d8e8, 300, 1800);
  }

  // Construit le stade pour la course demandée.
  build(track, course, env) {
    this.clear();
    this.track = track;
    this.course = course;
    this.env = env;
    const G = this.group;
    const surf = SURFACES[env.terrain] || SURFACES.piste;
    const water = env.terrain === "eau";
    const WY = 0.45; // niveau de l'eau du canal (surélevé, bordé de murets)
    this.surfaceY = water ? WY : 0;

    // Sol général : herbe
    const grassTex = canvasTex(512, 512, (g, w, h) => {
      noiseFill(g, w, h, env.terrain === "neige" ? "#e8eef2" : env.terrain === "sable" ? "#cfb07a" : "#4a7a2c", 0.3, 26000, 2);
    }, [140, 140]);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400), new THREE.MeshStandardMaterial({ map: grassTex, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    G.add(ground);

    // Pelouse intérieure tondue en bandes
    const infieldTex = canvasTex(256, 256, (g, w, h) => {
      const base = env.terrain === "neige" ? ["#eef2f6", "#e2e8ee"] : env.terrain === "sable" ? ["#d4b880", "#c8aa70"] : ["#4f8a30", "#447a28"];
      for (let i = 0; i < 8; i++) { g.fillStyle = base[i % 2]; g.fillRect(i * 32, 0, 32, h); }
      for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
    }, [6, 3]);
    const inner = this.ovalShape(R0, 0);
    const infield = new THREE.Mesh(new THREE.ShapeGeometry(inner, 48), new THREE.MeshStandardMaterial({ map: infieldTex, roughness: 0.95 }));
    infield.rotation.x = -Math.PI / 2;
    infield.position.y = 0.003;
    infield.receiveShadow = true;
    const uvA = infield.geometry.attributes.uv;
    const pA = infield.geometry.attributes.position;
    for (let i = 0; i < uvA.count; i++) uvA.setXY(i, pA.getX(i) / 40, pA.getY(i) / 40);
    G.add(infield);

    // Surface de la piste (+ prolongement de la ligne droite)
    const tex = canvasTex(512, 512, (g, w, h) => noiseFill(g, w, h, surf.color, surf.spread, 30000, 2), [1, 1]);
    const outerR = R0 + track.lanes * track.w + 1.0;
    const trackMat = water
      ? new THREE.MeshStandardMaterial({ color: 0x1f5f80, roughness: 0.08, metalness: 0.3, transparent: true, opacity: 0.88 })
      : new THREE.MeshStandardMaterial({ map: tex, roughness: surf.rough, color: 0xffffff });
    const ring = this.ringGeometry(R0 - 0.1, outerR, tex);
    const tm = new THREE.Mesh(ring, trackMat);
    tm.receiveShadow = true;
    tm.position.y = water ? WY : 0.01;
    G.add(tm);
    this.trackMesh = tm;
    const chute = new THREE.Mesh(new THREE.PlaneGeometry(CHUTE + 2, outerR - R0 + 0.1), trackMat);
    chute.rotation.x = -Math.PI / 2;
    chute.position.set(-STRAIGHT / 2 - CHUTE / 2 - 1, water ? WY : 0.01, (R0 + outerR) / 2);
    chute.receiveShadow = true;
    G.add(chute);
    if (water) {
      // bassin : fond et berges
      const bed = new THREE.Mesh(this.ringGeometry(R0 - 0.1, outerR, null), new THREE.MeshStandardMaterial({ color: 0x2a4a3a, roughness: 1 }));
      bed.position.y = 0.0;
      G.add(bed);
      const bed2 = new THREE.Mesh(new THREE.PlaneGeometry(CHUTE + 2, outerR - R0 + 0.1), bed.material);
      bed2.rotation.x = -Math.PI / 2;
      bed2.position.set(chute.position.x, 0.0, chute.position.z);
      G.add(bed2);
      // murets du canal
      const wallMat = new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.8 });
      for (const r of [R0 - 0.35, outerR]) {
        const wall = new THREE.Mesh(this.wallGeometry(r, r + 0.35, WY + 0.15), wallMat);
        wall.castShadow = wall.receiveShadow = true;
        G.add(wall);
      }
      this.water = [tm, chute];
      // lignes de bouées
      for (let i = 0; i <= track.lanes; i++) {
        const r = R0 + i * track.w;
        const pts = [];
        const n = 300;
        for (let k = 0; k <= n; k++) { const p = this.ovalPoint(r, (k / n)); pts.push(new THREE.Vector3(p.x, WY + 0.05, p.z)); }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const buoys = new THREE.InstancedMesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshStandardMaterial({ color: i % 2 ? 0xe03a2a : 0xf0d020, roughness: 0.4 }), Math.floor(geo.attributes.position.count / 2));
        const m = new THREE.Matrix4();
        for (let k = 0; k < buoys.count; k++) { const p = pts[k * 2]; m.makeTranslation(p.x, p.y, p.z); buoys.setMatrixAt(k, m); }
        G.add(buoys);
      }
    } else {
      // Bordure intérieure
      const kerb = new THREE.Mesh(this.ringGeometry(R0 - 0.15, R0, null, 0.06), new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.5 }));
      kerb.position.y = 0.04;
      G.add(kerb);
    }

    // Lignes de couloirs
    const lineMat = new THREE.MeshBasicMaterial({ color: surf.line });
    for (let i = 0; i <= track.lanes; i++) {
      const r = R0 + i * track.w;
      const g = this.ringGeometry(r - 0.025, r + 0.025, null);
      const l = new THREE.Mesh(g, lineMat);
      l.position.y = (water ? -0.24 : 0.015);
      if (!water) G.add(l);
      const cl = new THREE.Mesh(new THREE.PlaneGeometry(CHUTE, 0.05), lineMat);
      cl.rotation.x = -Math.PI / 2;
      cl.position.set(-STRAIGHT / 2 - CHUTE / 2, 0.016, r);
      if (!water) G.add(cl);
    }
    // Ligne d'arrivée (damier) et lignes de départ
    const finTex = canvasTex(64, 256, (g, w, h) => {
      for (let y = 0; y < 16; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? "#111" : "#f6f6f6"; g.fillRect(x * 16, y * 16, 16, 16); }
    });
    const fw = outerR - R0;
    const fin = new THREE.Mesh(new THREE.PlaneGeometry(0.5, fw), new THREE.MeshBasicMaterial({ map: finTex }));
    fin.rotation.x = -Math.PI / 2;
    fin.position.set(STRAIGHT / 2, water ? WY + 0.03 : 0.02, R0 + fw / 2);
    G.add(fin);
    // portique d'arrivée
    const postMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.4, metalness: 0.4 });
    const gH = 4.5;
    for (const z of [R0 - 1, outerR + 0.5]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, gH, 10), postMat);
      p.position.set(STRAIGHT / 2, gH / 2, z);
      p.castShadow = true;
      G.add(p);
    }
    const banTex = canvasTex(1024, 128, (g, w, h) => {
      g.fillStyle = "#14325a"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#fff"; g.font = "bold 72px system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText("ARRIVÉE", w / 2, h / 2 + 4);
    });
    const banner = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.9, outerR - R0 + 1.5), [postMat, postMat, postMat, postMat, new THREE.MeshStandardMaterial({ map: banTex }), new THREE.MeshStandardMaterial({ map: banTex })]);
    banner.position.set(STRAIGHT / 2, gH - 0.3, (R0 - 1 + outerR + 0.5) / 2);
    banner.material[4].map.rotation = 0;
    G.add(banner);
    // Chronomètre géant
    this.clockCanvas = document.createElement("canvas");
    this.clockCanvas.width = 512; this.clockCanvas.height = 160;
    this.clockTex = new THREE.CanvasTexture(this.clockCanvas);
    this.clockTex.colorSpace = THREE.SRGBColorSpace;
    const clock = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 1.4), new THREE.MeshBasicMaterial({ map: this.clockTex }));
    clock.position.set(STRAIGHT / 2 + 3, 2.4, outerR + 3);
    clock.rotation.y = Math.PI * 0.05;
    G.add(clock);
    const clockBack = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.7, 0.2), new THREE.MeshStandardMaterial({ color: 0x111111 }));
    clockBack.position.set(clock.position.x, clock.position.y, clock.position.z - 0.12);
    clockBack.rotation.y = clock.rotation.y;
    const clockLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 0.2), postMat);
    clockLeg.position.set(clock.position.x, 0.8, clock.position.z - 0.15);
    G.add(clockBack, clockLeg);
    this.setClock("0.00");

    // Lignes de départ de chaque couloir
    const startMat = new THREE.MeshBasicMaterial({ color: water ? 0xffffff : surf.line });
    for (let i = 0; i < track.lanes; i++) {
      const p = course.pos(i, 0);
      // Barre perpendiculaire au cap du couloir
      const holder = new THREE.Group();
      holder.position.set(p.x, water ? WY + 0.03 : 0.021, p.z);
      holder.rotation.y = p.yaw;
      const b2 = new THREE.Mesh(new THREE.PlaneGeometry(0.08, track.w - 0.06), startMat);
      b2.rotation.x = -Math.PI / 2;
      holder.add(b2);
      G.add(holder);
      // numéro de couloir
      const numTex = canvasTex(128, 128, (g, w, h) => { g.fillStyle = "rgba(0,0,0,0)"; g.clearRect(0, 0, w, h); g.fillStyle = surf.line; g.font = "bold 100px system-ui"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(i + 1), w / 2, h / 2); });
      const num = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(1, track.w * 0.7), Math.min(1, track.w * 0.7)), new THREE.MeshBasicMaterial({ map: numTex, transparent: true }));
      num.rotation.x = -Math.PI / 2;
      num.rotation.z = -Math.PI / 2;
      const q = course.pos(i, -1.2);
      const nh = new THREE.Group();
      nh.position.set(q.x, water ? -0.21 : 0.022, q.z);
      nh.rotation.y = q.yaw;
      nh.add(num);
      if (!water) G.add(nh);
    }

    this.buildStands(outerR);
    this.buildScenery(outerR);
    this.setWeather(env);
  }

  ovalPoint(r, u) {
    const S = STRAIGHT, h = S / 2, L = 2 * S + 2 * Math.PI * r;
    let s = u * L;
    const arc = Math.PI * r;
    if (s < arc) { const t = s / r; return { x: h + r * Math.sin(t), z: r * Math.cos(t) }; }
    if (s < arc + S) return { x: h - (s - arc), z: -r };
    if (s < 2 * arc + S) { const t = (s - arc - S) / r; return { x: -h - r * Math.sin(t), z: -r * Math.cos(t) }; }
    return { x: -h + (s - 2 * arc - S), z: r };
  }

  ovalShape(r) {
    const sh = new THREE.Shape();
    const n = 120;
    for (let k = 0; k <= n; k++) {
      const p = this.ovalPoint(r, k / n);
      if (k === 0) sh.moveTo(p.x, -p.z); else sh.lineTo(p.x, -p.z);
    }
    return sh;
  }

  wallGeometry(r0, r1, h) {
    // anneau extrudé (muret) : dessus + deux faces verticales
    const n = 240;
    const pos = [], idx = [];
    for (let k = 0; k <= n; k++) {
      const a = this.ovalPoint(r0, k / n), b = this.ovalPoint(r1, k / n);
      pos.push(a.x, 0, a.z, a.x, h, a.z, b.x, h, b.z, b.x, 0, b.z);
    }
    for (let k = 0; k < n; k++) {
      const o = k * 4, q = o + 4;
      for (let f = 0; f < 3; f++) idx.push(o + f, q + f, o + f + 1, o + f + 1, q + f, q + f + 1);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return new THREE.Mesh(g).geometry;
  }

  ringGeometry(r0, r1, tex, y = 0) {
    const n = 360;
    const pos = [], uv = [], idx = [];
    for (let k = 0; k <= n; k++) {
      const u = k / n;
      const a = this.ovalPoint(r0, u), b = this.ovalPoint(r1, u);
      pos.push(a.x, y, a.z, b.x, y, b.z);
      const L = 2 * STRAIGHT + 2 * Math.PI * r0;
      uv.push(u * L / 6, 0, u * L / 6, (r1 - r0) / 6);
    }
    for (let k = 0; k < n; k++) { const a = k * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    // les normales doivent pointer vers le haut
    const nA = g.attributes.normal;
    for (let i = 0; i < nA.count; i++) nA.setXYZ(i, 0, 1, 0);
    return g;
  }

  buildStands(outerR) {
    const G = this.group;
    const standMat = new THREE.MeshStandardMaterial({ color: 0x9aa0a8, roughness: 0.85 });
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x2a4a8a, roughness: 0.7 });
    const len = STRAIGHT + 30;
    const z0 = outerR + 7;
    const rows = 14;
    for (let r = 0; r < rows; r++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(len, 0.45, 0.9), r % 2 ? standMat : seatMat);
      step.position.set(0, 0.6 + r * 0.45, z0 + r * 0.9);
      step.receiveShadow = true;
      G.add(step);
    }
    const back = new THREE.Mesh(new THREE.BoxGeometry(len, 8, 0.4), standMat);
    back.position.set(0, 4, z0 + rows * 0.9 + 0.3);
    G.add(back);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(len + 2, 0.3, rows * 0.9 + 3), new THREE.MeshStandardMaterial({ color: 0xe8e8ea, roughness: 0.5, metalness: 0.3 }));
    roof.position.set(0, 9.5, z0 + rows * 0.45);
    roof.castShadow = true;
    G.add(roof);
    for (const x of [-len / 2, 0, len / 2]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 9.5, 8), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5, roughness: 0.4 }));
      col.position.set(x, 4.75, z0 + rows * 0.9);
      G.add(col);
    }
    // Spectateurs (instanciés)
    const n = 1800;
    const geo = new THREE.CapsuleGeometry(0.18, 0.45, 3, 6);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.8 });
    const crowd = new THREE.InstancedMesh(geo, mat, n);
    const m = new THREE.Matrix4();
    const col = new THREE.Color();
    const palette = [0xd03a2a, 0x2a6ad0, 0xf0c020, 0xf2f2f2, 0x2a2a2a, 0x3aa04a, 0xe07a20, 0x8a3ab0, 0x60a0d0];
    this.crowdBase = [];
    for (let i = 0; i < n; i++) {
      const r = Math.floor(Math.random() * rows);
      const x = (Math.random() - 0.5) * (len - 2);
      const y = 0.6 + r * 0.45 + 0.55;
      const z = z0 + r * 0.9 + 0.1;
      m.makeTranslation(x, y, z);
      crowd.setMatrixAt(i, m);
      col.set(palette[Math.floor(Math.random() * palette.length)]);
      crowd.setColorAt(i, col);
      this.crowdBase.push([x, y, z, Math.random() * 6.28]);
    }
    this.crowd = crowd;
    G.add(crowd);
    // Tribune d'en face, plus petite
    for (let r = 0; r < 6; r++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(len * 0.8, 0.45, 0.9), r % 2 ? standMat : seatMat);
      step.position.set(0, 0.4 + r * 0.45, -(R0 + 0.0) - 0 - (outerR - R0) - 6 - r * 0.9);
      G.add(step);
    }
    // Pylônes d'éclairage
    for (const [x, z] of [[-STRAIGHT / 2 - 30, outerR + 12], [STRAIGHT / 2 + 30, outerR + 12], [-STRAIGHT / 2 - 30, -outerR - 12], [STRAIGHT / 2 + 30, -outerR - 12]]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 32, 8), new THREE.MeshStandardMaterial({ color: 0xb8bcc4, metalness: 0.6, roughness: 0.4 }));
      p.position.set(x, 16, z);
      p.castShadow = true;
      G.add(p);
      const head = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.6), new THREE.MeshStandardMaterial({ color: 0xf0f0f0, emissive: 0x444444 }));
      head.position.set(x, 32, z);
      head.lookAt(0, 0, 0);
      G.add(head);
    }
    // Drapeaux (indiquent le vent)
    for (let i = 0; i < 6; i++) {
      const x = -STRAIGHT / 2 + i * (STRAIGHT / 5);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 6, 6), new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.5 }));
      pole.position.set(x, 3 + 9.8, z0 + rows * 0.45);
      G.add(pole);
      const fg = new THREE.PlaneGeometry(1.4, 0.9, 10, 4);
      fg.translate(0.7, 0, 0);
      const flag = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({ color: palette[i % palette.length], side: THREE.DoubleSide, roughness: 0.8 }));
      flag.position.set(x, 5.4 + 9.8, z0 + rows * 0.45);
      G.add(flag);
      this.flags.push({ flag, base: fg.attributes.position.array.slice() });
    }
  }

  buildScenery(outerR) {
    const G = this.group;
    const env = this.env;
    const snowy = env.terrain === "neige";
    const sandy = env.terrain === "sable";
    // Arbres en couronne
    const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 4, 6);
    const crownGeo = sandy ? new THREE.SphereGeometry(2.2, 8, 6) : new THREE.ConeGeometry(2.6, 7, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 1 });
    const crownMat = new THREE.MeshStandardMaterial({ color: snowy ? 0xdfe8ec : sandy ? 0x6a8a3a : 0x2e5a2a, roughness: 0.95 });
    const n = 220;
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, n);
    const crowns = new THREE.InstancedMesh(crownGeo, crownMat, n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), p = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const rx = 170 + Math.random() * 250, rz = 120 + Math.random() * 240;
      p.set(Math.cos(a) * rx, 2, Math.sin(a) * rz);
      const s = 0.8 + Math.random() * 0.9;
      sc.set(s, s, s);
      m.compose(p, q, sc);
      trunks.setMatrixAt(i, m);
      p.y = 2 + 5 * s;
      m.compose(p, q, sc);
      crowns.setMatrixAt(i, m);
    }
    trunks.castShadow = crowns.castShadow = true;
    G.add(trunks, crowns);
    // Collines lointaines
    const hillMat = new THREE.MeshStandardMaterial({ color: snowy ? 0xe6edf2 : sandy ? 0xd0a868 : 0x5a7a4a, roughness: 1 });
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const h = new THREE.Mesh(new THREE.SphereGeometry(120 + Math.random() * 120, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), hillMat);
      h.scale.y = 0.25 + Math.random() * 0.2;
      h.position.set(Math.cos(a) * 900, -5, Math.sin(a) * 900);
      G.add(h);
    }
  }

  setWeather(env) {
    const w = env.weather;
    const s = this.scene;
    const fogC = new THREE.Color(0xc8d8e8);
    let near = 300, far = 1800, sunI = 2.6, hemiI = 0.9, turb = 4, elev = 0.75;
    if (w === "nuageux") { sunI = 1.3; hemiI = 1.1; turb = 9; fogC.set(0xb8c4cc); far = 1200; }
    if (w === "pluie" || w === "orage") { sunI = w === "orage" ? 0.5 : 0.8; hemiI = 0.9; turb = 14; fogC.set(0x8a949c); near = 60; far = w === "orage" ? 350 : 600; }
    if (w === "brouillard") { sunI = 0.7; hemiI = 1.0; turb = 10; fogC.set(0xc8ccd0); near = 5; far = 160; }
    if (w === "neigeuse") { sunI = 0.9; hemiI = 1.2; turb = 12; fogC.set(0xd8dfe6); near = 30; far = 400; }
    s.fog.color.copy(fogC); s.fog.near = near; s.fog.far = far;
    this.sun.intensity = sunI;
    this.hemi.intensity = hemiI;
    this.sky.material.uniforms.turbidity.value = turb;
    this.sunDir.set(-0.45, elev, 0.48).normalize();
    this.sky.material.uniforms.sunPosition.value.copy(this.sunDir);
    if (w === "pluie" || w === "orage" || w === "brouillard" || w === "neigeuse") this.renderer.setClearColor(fogC);
    // Précipitations
    if (this.precip) { this.scene.remove(this.precip); this.precip.geometry.dispose(); this.precip = null; }
    const rain = w === "pluie" || w === "orage";
    const snow = w === "neigeuse";
    if (rain || snow) {
      const n = rain ? 9000 : 6000;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - 0.5) * 80; pos[i * 3 + 1] = Math.random() * 30; pos[i * 3 + 2] = (Math.random() - 0.5) * 80; }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: rain ? 0xaabbcc : 0xffffff, size: rain ? 0.05 : 0.12, transparent: true, opacity: rain ? 0.6 : 0.9, depthWrite: false });
      this.precip = new THREE.Points(g, mat);
      this.precip.userData = { rain, speed: rain ? 14 : 1.5 };
      this.precip.frustumCulled = false;
      this.scene.add(this.precip);
    }
    // Surface mouillée
    if (this.trackMesh && rain && env.terrain !== "eau") this.trackMesh.material.roughness = 0.35;
  }

  setClock(txt) {
    const c = this.clockCanvas;
    if (!c) return;
    const g = c.getContext("2d");
    g.fillStyle = "#050505"; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = "#ffcc33"; g.font = "bold 110px ui-monospace, Menlo, monospace"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(txt, c.width / 2, c.height / 2 + 6);
    this.clockTex.needsUpdate = true;
  }

  update(dt, focus, excitement = 0) {
    this.t += dt;
    // Ombre portée centrée sur le point d'intérêt
    this.sun.position.copy(focus).addScaledVector(this.sunDir, 120);
    this.sun.target.position.copy(focus);
    // Drapeaux au vent
    const wind = (this.env && { ventface: -5, ventdos: 5, orage: -3, neigeuse: -1 }[this.env.weather]) || 0;
    const strength = 0.4 + Math.abs(wind) * 0.25;
    for (const f of this.flags) {
      const a = f.flag.geometry.attributes.position;
      for (let i = 0; i < a.count; i++) {
        const x = f.base[i * 3];
        a.setZ(i, Math.sin(this.t * 6 + x * 3) * 0.12 * strength * (x / 1.4));
      }
      a.needsUpdate = true;
      f.flag.rotation.y = wind >= 0 ? 0 : Math.PI;
    }
    // Public qui s'agite
    if (this.crowd && excitement > 0) {
      const m = new THREE.Matrix4();
      for (let i = 0; i < this.crowdBase.length; i += 3) {
        const b = this.crowdBase[i];
        m.makeTranslation(b[0], b[1] + Math.max(0, Math.sin(this.t * 9 + b[3])) * 0.18 * excitement, b[2]);
        this.crowd.setMatrixAt(i, m);
      }
      this.crowd.instanceMatrix.needsUpdate = true;
    }
    // Pluie / neige autour du point d'intérêt
    if (this.precip) {
      const a = this.precip.geometry.attributes.position;
      const sp = this.precip.userData.speed;
      for (let i = 0; i < a.count; i++) {
        let y = a.getY(i) - sp * dt;
        if (y < 0) y += 30;
        a.setY(i, y);
        if (!this.precip.userData.rain) a.setX(i, a.getX(i) + Math.sin(this.t + i) * 0.01);
      }
      a.needsUpdate = true;
      this.precip.position.set(focus.x, 0, focus.z);
    }
    // Eau ondulante
    if (this.water) for (const w of this.water) w.position.y = this.surfaceY + Math.sin(this.t * 0.8) * 0.01;
  }

  clear() {
    for (const c of [...this.group.children]) {
      this.group.remove(c);
      c.traverse?.((o) => { if (o.geometry) o.geometry.dispose?.(); });
    }
    this.flags = [];
    this.water = null;
    this.crowd = null;
  }
}
