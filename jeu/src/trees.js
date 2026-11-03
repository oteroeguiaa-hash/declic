// Arbres et végétation : atlas de textures (écorces, rameaux de feuilles, aiguilles, fougères) avec normal maps,
// générateur d'arbres par squelette (tronc, charpentières, branches, rameaux) pour 11 espèces,
// plusieurs niveaux de détail tirés du même squelette (silhouettes identiques de près comme de loin).
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

// ---------- Disposition de l'atlas (coordonnées normalisées) ----------
// Moitié gauche : 4 écorces sur toute la hauteur (répétition verticale). Moitié droite : 8 tuiles de feuillage.
const col = (i) => [i * 0.125 + 0.004, (i + 1) * 0.125 - 0.004, 0, 1];
const tile = (c, r) => { const u0 = 0.5 + c * 0.25, v1 = 1 - r * 0.25; return [u0 + 0.004, u0 + 0.246, v1 - 0.246, v1 - 0.004]; };
export const UV = {
  bark: col(0), oakBark: col(0), beechBark: col(1), birch: col(2), pineBark: col(3),
  leaves: tile(1, 0), oakLeaves: tile(0, 0), beechLeaves: tile(1, 0), birchLeaves: tile(0, 1), willow: tile(1, 1),
  needles: tile(0, 2), pineNeedles: tile(1, 2), fern: tile(0, 3), small: tile(1, 3),
  white: [0.9795, 0.0205],
};
// cases (canvas, y vers le bas) des tuiles de feuillage
const TILE_PX = { oakLeaves: [0, 0], beechLeaves: [1, 0], birchLeaves: [0, 1], willow: [1, 1], needles: [0, 2], pineNeedles: [1, 2], fern: [0, 3], small: [1, 3] };

// ---------- Atlas ----------
export function makeAtlas(renderer, scale = 1) {
  const S = 2048 * scale;
  const cA = document.createElement("canvas"), cH = document.createElement("canvas");
  cA.width = cA.height = cH.width = cH.height = S;
  const gA = cA.getContext("2d", { willReadFrequently: true }), gH = cH.getContext("2d", { willReadFrequently: true });
  gA.scale(scale, scale); gH.scale(scale, scale);
  gH.fillStyle = "#000"; gH.fillRect(0, 0, 2048, 2048);
  const r = mulberry32(31);
  const rgb = (R, G, B, a = 1) => `rgba(${R | 0},${G | 0},${B | 0},${a})`;
  const gray = (v, a = 1) => rgb(v * 255, v * 255, v * 255, a);
  // dessin dans une colonne d'écorce (256 × 2048), raccordé horizontalement et verticalement
  const inCol = (i, fn) => {
    for (const g of [gA, gH]) { g.save(); g.beginPath(); g.rect(i * 256, 0, 256, 2048); g.clip(); g.translate(i * 256, 0); }
    fn();
    gA.restore(); gH.restore();
  };
  const wrapB = (x, y, rx, ry, fn) => { for (const dx of [-256, 0, 256]) for (const dy of [-2048, 0, 2048]) { const X = x + dx, Y = y + dy; if (X + rx < 0 || X - rx > 256 || Y + ry < 0 || Y - ry > 2048) continue; fn(X, Y); } };
  const both = (fn) => { fn(gA, false); fn(gH, true); };

  // --- Chêne : sillons profonds verticaux, crêtes en blocs, lichens ---
  inCol(0, () => {
    gA.fillStyle = "#3e352c"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.15); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 46; i++) {           // crêtes
      let x = r() * 256, y = r() * 2048;
      const w = 6 + r() * 10, len = 60 + r() * 160, v = 70 + r() * 40;
      wrapB(x, y, w, len, (X, Y) => {
        both((g, h) => {
          g.fillStyle = h ? gray(0.55 + r() * 0.4) : rgb(v, v * 0.9, v * 0.78);
          g.beginPath(); g.moveTo(X - w / 2, Y);
          for (let k = 0; k <= 8; k++) g.lineTo(X - w / 2 + Math.sin(k * 1.3 + x) * 2, Y + (k / 8) * len);
          for (let k = 8; k >= 0; k--) g.lineTo(X + w / 2 + Math.sin(k * 1.1 + y) * 2, Y + (k / 8) * len);
          g.fill();
        });
      });
    }
    for (let i = 0; i < 520; i++) {          // plaques fines et cassures horizontales
      const x = r() * 256, y = r() * 2048, w = 3 + r() * 9, hgt = 10 + r() * 40;
      wrapB(x, y, w, hgt, (X, Y) => {
        const v = 55 + r() * 55;
        gA.fillStyle = rgb(v, v * 0.88, v * 0.75, 0.85); gA.fillRect(X, Y, w, hgt);
        gH.fillStyle = gray(0.35 + r() * 0.55, 0.9); gH.fillRect(X, Y, w, hgt);
        gA.fillStyle = "rgba(15,12,9,0.8)"; gA.fillRect(X, Y + hgt, w, 1.5);
        gH.fillStyle = gray(0.05); gH.fillRect(X, Y + hgt, w, 1.5);
      });
    }
    for (let i = 0; i < 70; i++) {           // lichens gris-vert
      const x = r() * 256, y = r() * 2048, R = 4 + r() * 14;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = rgb(130, 140, 105, 0.35 + r() * 0.3); gA.beginPath(); gA.ellipse(X, Y, R, R * 1.4, 0, 0, 7); gA.fill(); });
    }
  });
  // --- Hêtre : écorce lisse gris argenté, marbrures, algues vertes ---
  inCol(1, () => {
    gA.fillStyle = "#8d8c85"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.5); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 900; i++) {
      const x = r() * 256, y = r() * 2048, R = 3 + r() * 22, v = 110 + r() * 60;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = rgb(v, v * 0.99, v * 0.93, 0.18); gA.beginPath(); gA.ellipse(X, Y, R, R * (0.5 + r()), 0, 0, 7); gA.fill(); gH.fillStyle = gray(0.5 + (r() - 0.5) * 0.15, 0.25); gH.beginPath(); gH.ellipse(X, Y, R, R * 0.7, 0, 0, 7); gH.fill(); });
    }
    for (let i = 0; i < 60; i++) {           // algues
      const x = r() * 256, y = r() * 2048, R = 10 + r() * 30;
      wrapB(x, y, R, R * 2, (X, Y) => { gA.fillStyle = rgb(90, 110, 60, 0.25); gA.beginPath(); gA.ellipse(X, Y, R, R * 2, 0, 0, 7); gA.fill(); });
    }
    for (let i = 0; i < 28; i++) {           // « yeux » et cicatrices horizontales
      const x = r() * 256, y = r() * 2048, w = 14 + r() * 30;
      wrapB(x, y, w, 8, (X, Y) => { both((g, h) => { g.strokeStyle = h ? gray(0.2) : "rgba(40,38,35,0.7)"; g.lineWidth = 2 + r() * 2; g.beginPath(); g.moveTo(X - w / 2, Y); g.quadraticCurveTo(X, Y + 6, X + w / 2, Y); g.stroke(); }); });
    }
  });
  // --- Bouleau : blanc, lenticelles noires horizontales, fissures en losange ---
  inCol(2, () => {
    gA.fillStyle = "#e6e2d8"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.6); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 500; i++) {
      const x = r() * 256, y = r() * 2048, R = 4 + r() * 18, v = 200 + r() * 40;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = rgb(v, v * 0.98, v * 0.93, 0.3); gA.fillRect(X, Y, R * 2, R * 0.6); });
    }
    for (let i = 0; i < 420; i++) {
      const x = r() * 256, y = r() * 2048, w = 6 + r() * 34;
      wrapB(x, y, w, 4, (X, Y) => { both((g, h) => { g.fillStyle = h ? gray(0.15) : rgb(30, 28, 25, 0.55 + r() * 0.45); g.fillRect(X, Y, w, 1.2 + r() * 2.6); }); });
    }
    for (let i = 0; i < 26; i++) {
      const x = r() * 256, y = r() * 2048, w = 14 + r() * 26, h0 = 8 + r() * 18;
      wrapB(x, y, w, h0, (X, Y) => { both((g, h) => { g.fillStyle = h ? gray(0.05) : "rgba(22,20,18,0.92)"; g.beginPath(); g.moveTo(X - w, Y); g.lineTo(X, Y - h0); g.lineTo(X + w, Y); g.lineTo(X, Y + h0); g.fill(); }); });
    }
    for (let i = 0; i < 40; i++) {           // écorce qui pèle (tons fauves)
      const x = r() * 256, y = r() * 2048, w = 10 + r() * 20;
      wrapB(x, y, w, 6, (X, Y) => { gA.fillStyle = rgb(200, 160, 120, 0.6); gA.fillRect(X, Y, w, 3 + r() * 4); });
    }
  });
  // --- Pin : plaques orangées séparées de crevasses sombres ---
  inCol(3, () => {
    gA.fillStyle = "#4a3426"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.1); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 1300; i++) {
      const x = r() * 256, y = r() * 2048, w = 12 + r() * 26, hh = 18 + r() * 44, a = (r() - 0.5) * 0.3;
      const t = r();
      wrapB(x, y, w, hh, (X, Y) => {
        both((g, h) => {
          g.save(); g.translate(X, Y); g.rotate(a);
          g.fillStyle = h ? gray(0.45 + r() * 0.5) : rgb(150 + t * 60, 85 + t * 40, 50 + t * 25);
          g.beginPath();
          for (let k = 0; k < 7; k++) { const an = (k / 7) * 6.283, rr = 0.75 + r() * 0.3; g.lineTo(Math.cos(an) * w / 2 * rr, Math.sin(an) * hh / 2 * rr); }
          g.fill(); g.restore();
        });
      });
    }
  });

  // --- Tuiles de feuillage ---
  const inTile = (key, fn) => {
    const [c, rr] = TILE_PX[key];
    const x0 = 1024 + c * 512, y0 = rr * 512;
    for (const g of [gA, gH]) { g.save(); g.beginPath(); g.rect(x0 + 6, y0 + 6, 500, 500); g.clip(); g.translate(x0, y0); }
    fn();
    gA.restore(); gH.restore();
  };
  // une feuille : forme (fonction de chemin), couleur, dôme en relief + nervure
  const leaf = (x, y, ang, L, W, shape, colr, k = 1) => {
    for (const [g, h] of [[gA, false], [gH, true]]) {
      g.save(); g.translate(x, y); g.rotate(ang);
      if (h) {
        const gr = g.createLinearGradient(0, -W, 0, W);
        gr.addColorStop(0, gray(0.35)); gr.addColorStop(0.5, gray(0.85)); gr.addColorStop(1, gray(0.35));
        g.fillStyle = gr;
      } else g.fillStyle = rgb(colr[0] * k, colr[1] * k, colr[2] * k);
      g.beginPath(); shape(g, L, W); g.fill();
      if (!h) { g.strokeStyle = rgb(colr[0] * k * 1.3 + 20, colr[1] * k * 1.2 + 20, colr[2] * k + 10, 0.35); g.lineWidth = 1; }
      else { g.strokeStyle = gray(0.4); g.lineWidth = 1.4; }
      g.beginPath(); g.moveTo(0, 0); g.lineTo(L * 0.92, 0); g.stroke();
      if (!h && L > 18) { g.lineWidth = 0.6; for (let v = 0.2; v < 0.85; v += 0.16) { g.beginPath(); g.moveTo(L * v, 0); g.lineTo(L * (v + 0.12), -W * 0.6); g.moveTo(L * v, 0); g.lineTo(L * (v + 0.12), W * 0.6); g.stroke(); } }
      g.restore();
    }
  };
  const SH = {
    oval: (g, L, W) => { g.moveTo(0, 0); g.bezierCurveTo(L * 0.25, -W, L * 0.75, -W, L, 0); g.bezierCurveTo(L * 0.75, W, L * 0.25, W, 0, 0); },
    lance: (g, L, W) => { g.moveTo(0, 0); g.quadraticCurveTo(L * 0.4, -W, L, 0); g.quadraticCurveTo(L * 0.4, W, 0, 0); },
    birch: (g, L, W) => { g.moveTo(0, 0); g.lineTo(L * 0.2, -W * 0.9); for (let k = 1; k <= 6; k++) g.lineTo(L * (0.2 + k * 0.13), -W * (0.9 - k * 0.15) - (k % 2) * 1.5); g.lineTo(L, 0); for (let k = 6; k >= 1; k--) g.lineTo(L * (0.2 + k * 0.13), W * (0.9 - k * 0.15) + (k % 2) * 1.5); g.lineTo(L * 0.2, W * 0.9); g.closePath(); },
    oak: (g, L, W) => {
      g.moveTo(0, 0);
      const lobes = 4;
      for (let s of [-1, 1]) {
        if (s === 1) g.moveTo(0, 0);
        for (let k = 0; k < lobes; k++) {
          const t0 = 0.1 + (k / lobes) * 0.8, t1 = t0 + 0.8 / lobes;
          g.quadraticCurveTo(L * (t0 + t1) / 2, s * W * (1.25 - k * 0.12), L * t1, s * W * 0.45);
        }
        g.lineTo(L, 0);
      }
    },
  };
  const spray = (key, opt) => inTile(key, () => {
    // rameau : tige principale depuis le bas de la tuile, rameaux latéraux, feuilles le long
    const cx = 256, base = 500;
    const twigs = [];
    const main = { x0: cx, y0: base, x1: cx + (r() - 0.5) * 60, y1: 40 };
    twigs.push(main);
    for (let i = 0; i < opt.side; i++) {
      const t = 0.15 + (i / opt.side) * 0.75, s = i % 2 ? 1 : -1;
      const x = main.x0 + (main.x1 - main.x0) * t, y = main.y0 + (main.y1 - main.y0) * t;
      const len = (1 - t * 0.6) * opt.sideLen * (0.7 + r() * 0.5);
      const a = -Math.PI / 2 + s * (0.7 + r() * 0.5);
      twigs.push({ x0: x, y0: y, x1: x + Math.cos(a) * len, y1: y + Math.sin(a) * len });
    }
    for (const tw of twigs) for (const [g, h] of [[gA, false], [gH, true]]) {
      g.strokeStyle = h ? gray(0.7) : opt.twig; g.lineWidth = tw === main ? 4 : 2.2; g.lineCap = "round";
      g.beginPath(); g.moveTo(tw.x0, tw.y0); g.lineTo(tw.x1, tw.y1); g.stroke();
    }
    let n = 0;
    for (const tw of twigs) {
      const cnt = tw === main ? opt.perMain : opt.perSide;
      for (let i = 0; i < cnt; i++, n++) {
        const t = 0.12 + (i / cnt) * 0.88;
        const x = tw.x0 + (tw.x1 - tw.x0) * t, y = tw.y0 + (tw.y1 - tw.y0) * t;
        const da = Math.atan2(tw.y1 - tw.y0, tw.x1 - tw.x0);
        const ang = da + (i % 2 ? 1 : -1) * (opt.spread + r() * 0.4) + (r() - 0.5) * 0.3;
        const L = opt.L * (0.75 + r() * 0.5), W = L * opt.W;
        const c = opt.cols[(r() * opt.cols.length) | 0];
        const shade = 0.72 + r() * 0.42 - (1 - t) * 0.12;
        leaf(x, y, ang, L, W, opt.shape, c, shade);
      }
    }
  });
  spray("oakLeaves", { side: 7, sideLen: 210, perMain: 10, perSide: 7, L: 46, W: 0.42, spread: 0.6, shape: SH.oak, twig: "#4a3a28", cols: [[70, 98, 34], [62, 90, 30], [86, 108, 40], [54, 80, 28]] });
  spray("beechLeaves", { side: 8, sideLen: 220, perMain: 12, perSide: 8, L: 40, W: 0.36, spread: 0.9, shape: SH.oval, twig: "#4e4234", cols: [[92, 130, 44], [80, 118, 38], [104, 140, 50], [70, 104, 34]] });
  spray("birchLeaves", { side: 9, sideLen: 200, perMain: 12, perSide: 9, L: 28, W: 0.48, spread: 0.8, shape: SH.birch, twig: "#3a3028", cols: [[110, 146, 52], [96, 134, 46], [124, 156, 60], [88, 122, 42]] });
  // Saule : longs rameaux retombants couverts de feuilles étroites
  inTile("willow", () => {
    for (let s = 0; s < 7; s++) {
      const x0 = 70 + s * 62 + (r() - 0.5) * 20;
      for (const [g, h] of [[gA, false], [gH, true]]) { g.strokeStyle = h ? gray(0.6) : "#5a5030"; g.lineWidth = 1.6; g.beginPath(); g.moveTo(x0, 505); g.quadraticCurveTo(x0 + (r() - 0.5) * 30, 260, x0 + (r() - 0.5) * 30, 20); g.stroke(); }
      for (let i = 0; i < 26; i++) {
        const y = 495 - i * 18 - r() * 6, x = x0 + (r() - 0.5) * 10;
        const c = [[110, 140, 60], [96, 128, 52], [126, 150, 70]][(r() * 3) | 0];
        leaf(x, y, -Math.PI / 2 + (i % 2 ? 0.5 : -0.5) + (r() - 0.5) * 0.3, 44 + r() * 16, 5.5, SH.lance, c, 0.75 + r() * 0.4);
      }
    }
  });
  // Épicéa / sapin : rameau aplati, aiguilles courtes et denses
  inTile("needles", () => {
    const needles = (x0, y0, x1, y1, n, len, w) => {
      for (const [g, h] of [[gA, false], [gH, true]]) { g.strokeStyle = h ? gray(0.6) : "#3a2c1c"; g.lineWidth = w; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); }
      const a0 = Math.atan2(y1 - y0, x1 - x0);
      for (let i = 0; i < n; i++) {
        const t = i / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
        const L = len * (1 - t * 0.35) * (0.8 + r() * 0.4);
        for (const s of [-1, 1]) {
          const a = a0 + s * (0.85 + r() * 0.35);
          const gr = 70 + r() * 50;
          gA.strokeStyle = rgb(25 + r() * 15, gr, 35 + r() * 20); gA.lineWidth = 2.6 + r();
          gA.beginPath(); gA.moveTo(x, y); gA.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); gA.stroke();
          gH.strokeStyle = gray(0.55 + r() * 0.4); gH.lineWidth = 2.6;
          gH.beginPath(); gH.moveTo(x, y); gH.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); gH.stroke();
        }
      }
    };
    needles(256, 505, 256 + (r() - 0.5) * 30, 20, 120, 30, 5);
    for (let k = 0; k < 14; k++) {
      const y = 470 - k * 32, s = k % 2 ? 1 : -1, L = 210 - k * 10;
      needles(256, y, 256 + s * L * 0.85, y - L * 0.5, 50, 20, 2.6);
    }
  });
  // Pin sylvestre : touffes de longues aiguilles par deux
  inTile("pineNeedles", () => {
    const tuft = (x, y, R, n) => {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (r() - 0.5) * 2.6, L = R * (0.6 + r() * 0.4);
        const c = [40 + r() * 20, 90 + r() * 40, 50 + r() * 20];
        gA.strokeStyle = rgb(...c); gA.lineWidth = 2.2;
        gA.beginPath(); gA.moveTo(x, y); gA.quadraticCurveTo(x + Math.cos(a) * L * 0.5, y + Math.sin(a) * L * 0.6 - 4, x + Math.cos(a) * L, y + Math.sin(a) * L); gA.stroke();
        gH.strokeStyle = gray(0.5 + r() * 0.45); gH.lineWidth = 2.2;
        gH.beginPath(); gH.moveTo(x, y); gH.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); gH.stroke();
      }
    };
    const pts = [[256, 470], [180, 360], [330, 350], [256, 260], [150, 220], [360, 210], [250, 130]];
    for (const [x, y] of pts) for (const [g, h] of [[gA, false], [gH, true]]) { g.strokeStyle = h ? gray(0.7) : "#6a4a2c"; g.lineWidth = 4; g.beginPath(); g.moveTo(256, 505); g.lineTo(x, y + 30); g.stroke(); }
    for (const [x, y] of pts) tuft(x, y + 20, 110, 70);
  });
  // Fougère : fronde pennée
  inTile("fern", () => {
    for (const [g, h] of [[gA, false], [gH, true]]) { g.strokeStyle = h ? gray(0.6) : "#4a6a24"; g.lineWidth = 3; g.beginPath(); g.moveTo(256, 505); g.quadraticCurveTo(250, 260, 262, 18); g.stroke(); }
    for (let i = 0; i < 30; i++) {
      const t = i / 30, y = 490 - t * 470, x = 256 + Math.sin(t * 3) * 4;
      const L = 150 * Math.sin(Math.PI * (0.12 + t * 0.85)) * (0.9 + r() * 0.15);
      for (const s of [-1, 1]) {
        const a = -Math.PI / 2 + s * (1.15 - t * 0.3);
        const ex = x + Math.cos(a) * L, ey = y + Math.sin(a) * L;
        for (let k = 0; k < 10; k++) {
          const u = k / 10, px = x + (ex - x) * u, py = y + (ey - y) * u, ll = 13 * (1 - u * 0.6);
          leaf(px, py, a + s * 1.2, ll, ll * 0.45, SH.oval, [70 + r() * 30, 120 + r() * 30, 40], 0.8 + r() * 0.35);
        }
      }
    }
  });
  // Petites feuilles (arbustes, couvre-sol) + carré blanc pour les petits objets pleins (baies…)
  inTile("small", () => {
    for (let i = 0; i < 160; i++) {
      const a = r() * 6.283, d = Math.sqrt(r()) * 200, x = 256 + Math.cos(a) * d, y = 260 + Math.sin(a) * d * 0.95;
      if (x > 420 && y > 420) continue;
      leaf(x, y, r() * 6.283, 22 + r() * 12, 10 + r() * 4, SH.oval, [[70, 110, 36], [86, 124, 42], [60, 96, 30]][(r() * 3) | 0], 0.75 + r() * 0.4);
    }
    gA.fillStyle = "#ffffff"; gA.fillRect(436, 436, 64, 64);
    gH.fillStyle = gray(0.5); gH.fillRect(436, 436, 64, 64);
  });

  // Normal map dérivée du relief dessiné
  const W = S;
  const a = gA.getImageData(0, 0, W, W).data, h = gH.getImageData(0, 0, W, W).data;
  const nd = new Uint8Array(W * W * 4);
  const H = (x, y) => h[(Math.min(W - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))) * 4] / 255;
  const k = 3.5 * scale;
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const dx = H(x + 1, y) - H(x - 1, y), dy = H(x, y + 1) - H(x, y - 1);
    let nx = -dx * k, ny = dy * k;               // y du canvas vers le bas → v vers le haut
    const len = Math.hypot(nx, ny, 1);
    const o = ((W - 1 - y) * W + x) * 4;         // lignes retournées comme la texture couleur
    nd[o] = (nx / len * 0.5 + 0.5) * 255; nd[o + 1] = (ny / len * 0.5 + 0.5) * 255; nd[o + 2] = (1 / len * 0.5 + 0.5) * 255;
    nd[o + 3] = a[(y * W + x) * 4 + 3];
  }
  const tex = new THREE.CanvasTexture(cA);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.wrapT = THREE.RepeatWrapping;
  const nt = new THREE.DataTexture(nd, W, W, THREE.RGBAFormat);
  nt.generateMipmaps = true; nt.minFilter = THREE.LinearMipmapLinearFilter; nt.magFilter = THREE.LinearFilter;
  nt.wrapT = THREE.RepeatWrapping;
  nt.needsUpdate = true;
  tex.normalAtlas = nt;
  return tex;
}

// ---------- Construction des maillages ----------
class Builder {
  constructor() { this.pos = []; this.nor = []; this.uv = []; this.col = []; this.wind = []; this.w = [0, 0]; }
  v(p, n, u, v, c) { this.pos.push(p.x, p.y, p.z); this.nor.push(n.x, n.y, n.z); this.uv.push(u, v); this.col.push(c.r, c.g, c.b); this.wind.push(this.w[0], this.w[1]); }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
    g.setAttribute("aWind", new THREE.Float32BufferAttribute(this.wind, 2));
    g.computeBoundingSphere();
    return g;
  }

  // Tube le long d'une suite de points (tronc, branches). L'écorce se répète verticalement (v en mètres).
  // colorAt(i) : couleur de l'anneau i ; windAt(i) : [balancement, souplesse] de l'anneau i
  tube(points, radii, seg, uvr, color, vScale = null, windAt = null, colorAt = null) {
    const [u0, u1] = uvr;
    const avgR = radii.reduce((s, x) => s + x, 0) / radii.length;
    const vs = vScale ?? Math.min(0.5, 0.02 / Math.max(0.03, avgR));
    const frames = [];
    let len = 0;
    let prevN1 = null;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const next = points[Math.min(i + 1, points.length - 1)], prev = points[Math.max(i - 1, 0)];
      const t = next.clone().sub(prev).normalize();
      let n1;
      if (prevN1) { n1 = prevN1.clone().addScaledVector(t, -prevN1.dot(t)).normalize(); }   // repère transporté : pas de torsion
      else { const ref = Math.abs(t.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0); n1 = new THREE.Vector3().crossVectors(t, ref).normalize(); }
      prevN1 = n1;
      const n2 = new THREE.Vector3().crossVectors(t, n1).normalize();
      if (i > 0) len += p.distanceTo(points[i - 1]);
      frames.push({ p, n1, n2, len });
    }
    const ring = (f, k, r) => {
      const a = (k / seg) * Math.PI * 2;
      const n = f.n1.clone().multiplyScalar(Math.cos(a)).addScaledVector(f.n2, Math.sin(a));
      return { p: f.p.clone().addScaledVector(n, r), n };
    };
    const cc = new THREE.Color();
    for (let i = 0; i < frames.length - 1; i++) {
      const ca = colorAt ? colorAt(i) : color, cb = colorAt ? colorAt(i + 1) : color;
      const ao0 = Math.min(1, 0.6 + frames[i].p.y * 0.22), ao1 = Math.min(1, 0.6 + frames[i + 1].p.y * 0.22);
      const c0 = cc.clone().copy(ca).multiplyScalar(ao0), c1 = cc.clone().copy(cb).multiplyScalar(ao1);
      const w0 = windAt ? windAt(i) : [0, 0], w1 = windAt ? windAt(i + 1) : [0, 0];
      const va = frames[i].len * vs, vb = frames[i + 1].len * vs;
      for (let k = 0; k < seg; k++) {
        const a = ring(frames[i], k, radii[i]), b = ring(frames[i], k + 1, radii[i]);
        const c = ring(frames[i + 1], k, radii[i + 1]), d = ring(frames[i + 1], k + 1, radii[i + 1]);
        const ua = u0 + (u1 - u0) * (k / seg), ub = u0 + (u1 - u0) * ((k + 1) / seg);
        this.w = w0; this.v(a.p, a.n, ua, va, c0); this.w = w1; this.v(c.p, c.n, ua, vb, c1); this.w = w0; this.v(b.p, b.n, ub, va, c0);
        this.v(b.p, b.n, ub, va, c0); this.w = w1; this.v(c.p, c.n, ua, vb, c1); this.v(d.p, d.n, ub, vb, c1);
      }
    }
    this.w = [0, 0];
  }

  // Carte (quad) à transparence. Normales mêlant l'orientation de la carte et la direction depuis le centre du houppier
  // (éclairage doux et volumique du feuillage).
  card(center, right, up, w, h, uvr, color, crown, normalUp = 0.3, wind = null) {
    const [u0, u1, v0, v1] = uvr;
    const corners = [[-1, -1, u0, v0], [1, -1, u1, v0], [1, 1, u1, v1], [-1, 1, u0, v1]];
    const pts = corners.map(([sx, sy, u, v]) => {
      const p = center.clone().addScaledVector(right, sx * w / 2).addScaledVector(up, sy * h / 2);
      const n = p.clone().sub(crown).normalize();
      n.y += normalUp; n.normalize();
      return { p, n, u, v };
    });
    const [a, b, cc, d] = pts;
    const col = (p) => {
      const k = Math.min(1.1, Math.max(0.35, 0.5 + (p.y - crown.y) * 0.12 + p.clone().sub(crown).length() * 0.1));
      return color.clone().multiplyScalar(k);
    };
    if (wind) this.w = wind;
    this.v(a.p, a.n, a.u, a.v, col(a.p)); this.v(b.p, b.n, b.u, b.v, col(b.p)); this.v(cc.p, cc.n, cc.u, cc.v, col(cc.p));
    this.v(a.p, a.n, a.u, a.v, col(a.p)); this.v(cc.p, cc.n, cc.u, cc.v, col(cc.p)); this.v(d.p, d.n, d.u, d.v, col(d.p));
    this.w = [0, 0];
  }

  // Grappe = n cartes croisées orientées au hasard.
  cluster(center, size, uvr, color, crown, rand, n = 3) {
    for (let i = 0; i < n; i++) {
      const nrm = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize();
      const right = new THREE.Vector3().crossVectors(nrm, new THREE.Vector3(rand() - 0.5, 1, rand() - 0.5)).normalize();
      const up = new THREE.Vector3().crossVectors(right, nrm).normalize();
      const s = size * (0.8 + rand() * 0.4);
      this.card(center, right, up, s, s, uvr, color, crown);
    }
  }

  // Petite sphère pleine (baies) utilisant le blanc de l'atlas.
  blob(center, r, color) {
    const geo = new THREE.IcosahedronGeometry(r, 0);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i));
      this.v(v.clone().add(center), v.clone().normalize(), UV.white[0], UV.white[1], color);
    }
  }
}

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const tint = (hex, k = 1) => new THREE.Color(hex).multiplyScalar(k);
const rot = (v, axis, a) => v.clone().applyAxisAngle(axis, a);
const perp = (d, rand) => { const t = Math.abs(d.y) < 0.95 ? V(0, 1, 0) : V(1, 0, 0); return new THREE.Vector3().crossVectors(d, t).normalize().applyAxisAngle(d, rand() * 6.283); };

// ---------- Espèces ----------
// bark : colonne d'écorce, barkTint, leaf : tuile de feuillage, leafSize : taille d'une carte (m),
// stiff : raideur au vent (plus grand = moins de balancement)
export const SPECIES = {
  oak:     { bark: "oakBark", barkTint: 0xd8ccbc, leaf: "oakLeaves", leafTint: 0xb0c080, leafSize: 2.3, stiff: 1.2 },
  beech:   { bark: "beechBark", barkTint: 0xe4e4dc, leaf: "beechLeaves", leafTint: 0xc0d690, leafSize: 2.2, stiff: 1.0 },
  birch:   { bark: "birch", barkTint: 0xffffff, leaf: "birchLeaves", leafTint: 0xd0e098, leafSize: 1.5, stiff: 0.6 },
  scots:   { bark: "pineBark", barkTint: 0xffffff, leaf: "pineNeedles", leafTint: 0xb0c890, leafSize: 2.4, stiff: 1.4 },
  pine:    { bark: "pineBark", barkTint: 0x9a8c80, leaf: "needles", leafTint: 0x88a878, leafSize: 1.9, stiff: 1.6 },   // épicéa
  fir:     { bark: "beechBark", barkTint: 0x9a968c, leaf: "needles", leafTint: 0x9ab888, leafSize: 1.9, stiff: 1.7 },  // sapin
  poplar:  { bark: "oakBark", barkTint: 0xb8b4a8, leaf: "birchLeaves", leafTint: 0xc8d890, leafSize: 1.7, stiff: 0.8 },
  willow:  { bark: "oakBark", barkTint: 0xc0b49c, leaf: "willow", leafTint: 0xc8d498, leafSize: 2.6, stiff: 0.5 },
  ancient: { bark: "oakBark", barkTint: 0xc8bcac, leaf: "oakLeaves", leafTint: 0xa0b474, leafSize: 2.6, stiff: 1.5 },
  dead:    { bark: "oakBark", barkTint: 0xa8a49c, leaf: null, stiff: 2.0 },
  young:   { bark: "beechBark", barkTint: 0xc8c0b0, leaf: "beechLeaves", leafTint: 0xc8dc98, leafSize: 1.4, stiff: 0.7 },
};

// Squelette : liste de branches (points, rayons, niveau) et de points d'attache des feuilles.
function skeleton(kind, seed) {
  const rand = mulberry32(seed * 7919 + kind.length * 131);
  const sp = SPECIES[kind];
  const S = { branches: [], leaves: [], kind, height: 0 };
  const up = V(0, 1, 0);
  // Branche : courbe vers le haut (phototropisme) ou vers le bas (gravité), avec ondulations
  const branch = (p0, dir, len, r0, r1, level, opts = {}) => {
    const n = Math.max(3, Math.min(10, Math.round(len / (level ? 0.9 : 1.6)) + 2));
    const pts = [p0.clone()], radii = [r0];
    let d = dir.clone().normalize(), p = p0.clone();
    const bend = opts.bend ?? 0, wob = opts.wob ?? 0.12;
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      d.addScaledVector(up, bend / n).add(V((rand() - 0.5) * wob, (rand() - 0.5) * wob * 0.6, (rand() - 0.5) * wob)).normalize();
      p = p.clone().addScaledVector(d, len / n);
      pts.push(p); radii.push(r0 + (r1 - r0) * Math.pow(t, 0.8));
    }
    const b = { pts, radii, level, len };
    S.branches.push(b);
    return b;
  };
  const at = (b, t) => {      // point et direction le long d'une branche
    const f = t * (b.pts.length - 1), i = Math.min(b.pts.length - 2, Math.floor(f)), u = f - i;
    const p = b.pts[i].clone().lerp(b.pts[i + 1], u);
    const d = b.pts[i + 1].clone().sub(b.pts[i]).normalize();
    const r = b.radii[i] + (b.radii[i + 1] - b.radii[i]) * u;
    return { p, d, r };
  };
  const leafAt = (p, d, size, extra = {}) => S.leaves.push({ p, d: d.clone().normalize(), size, ...extra });
  // Ramification récursive des feuillus : enfants le long de la branche, feuilles au bout des rameaux
  const ramify = (b, level, maxLevel, o) => {
    if (level >= maxLevel) {
      // rameaux feuillus : cartes le long de la dernière moitié et au bout
      const n = o.leavesPer ?? 3;
      for (let k = 0; k < n; k++) {
        const t = 0.45 + (k / n) * 0.55 + rand() * 0.08;
        const { p, d } = at(b, Math.min(1, t));
        const out = d.clone().add(perp(d, rand).multiplyScalar(0.7)).addScaledVector(up, o.leafUp ?? 0.15).normalize();
        leafAt(p, out, sp.leafSize * (0.8 + rand() * 0.4));
      }
      const tip = at(b, 1);
      leafAt(tip.p, tip.d.clone().addScaledVector(up, o.leafUp ?? 0.15), sp.leafSize * (0.9 + rand() * 0.3));
      return;
    }
    const nKids = o.kids[level];
    for (let k = 0; k < nKids; k++) {
      const t = o.start[level] + (1 - o.start[level]) * ((k + rand() * 0.6) / nKids);
      const { p, d, r } = at(b, Math.min(0.97, t));
      const ang = o.angle[level] * (0.75 + rand() * 0.5);
      const axis = perp(d, rand);
      let nd = rot(d, axis, ang);
      nd.y += o.lift?.[level] ?? 0.1; nd.normalize();
      const len = b.len * o.lenK[level] * (1 - t * (o.taper ?? 0.45)) * (0.75 + rand() * 0.5);
      if (len < 0.25) continue;
      const kid = branch(p, nd, len, Math.min(r * 0.72, r * 0.9), Math.max(0.012, r * 0.18), level + 1, { bend: o.bend?.[level] ?? 0.25, wob: 0.18 });
      ramify(kid, level + 1, maxLevel, o);
    }
  };
  const trunk = (H, r0, r1, lean, bend) => {
    const tr = branch(V(0, -0.4, 0), V((rand() - 0.5) * lean, 1, (rand() - 0.5) * lean), H + 0.4, r0, r1, 0, { bend, wob: 0.05 });
    tr.flare = true;
    return tr;
  };
  // Racines apparentes
  const roots = (n, r0, len) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283 + rand() * 0.5, L = len * (0.7 + rand() * 0.6);
      const b = { pts: [V(Math.cos(a) * r0 * 0.4, 0.8 * r0 + 0.2, Math.sin(a) * r0 * 0.4), V(Math.cos(a) * (r0 + L * 0.4), 0.12, Math.sin(a) * (r0 + L * 0.4)), V(Math.cos(a + (rand() - 0.5) * 0.5) * (r0 + L), -0.3, Math.sin(a + (rand() - 0.5) * 0.5) * (r0 + L))], radii: [r0 * 0.5, r0 * 0.28, 0.05], level: 0, len: L, root: true };
      S.branches.push(b);
    }
  };

  if (kind === "oak" || kind === "ancient") {
    const anc = kind === "ancient";
    const H = (anc ? 6 : 5) + rand() * 2.5, R = anc ? 1.25 + rand() * 0.3 : 0.55 + rand() * 0.15;
    const tr = trunk(H, R, R * 0.7, 0.35, 0.3);
    roots(anc ? 8 : 5, R, anc ? 3.4 : 1.8);
    const limbs = anc ? 6 : 4 + Math.floor(rand() * 2);
    const o = { kids: [0, anc ? 5 : 4, 4, 0], start: [0, 0.2, 0.3], angle: [0, 0.75, 0.8], lenK: [0, 0.55, 0.5], lift: [0, 0.05, 0.1], bend: [0, 0.2, 0.3], leavesPer: 3, taper: 0.4 };
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.6;
      const t = 0.72 + rand() * 0.28;
      const { p, r } = at(tr, t);
      const d = V(Math.cos(a), 0.55 + rand() * 0.6, Math.sin(a));
      const L = (anc ? 10 : 7.5) * (0.75 + rand() * 0.45);
      const limb = branch(p, d, L, r * 0.75, r * 0.18, 1, { bend: 0.35, wob: 0.28 });
      ramify(limb, 1, 3, o);
    }
    // cime : prolongement du tronc
    const top = at(tr, 1);
    const lead = branch(top.p, V((rand() - 0.5) * 0.4, 1, (rand() - 0.5) * 0.4), (anc ? 8 : 6) * (0.8 + rand() * 0.4), top.r * 0.9, 0.05, 1, { bend: 0.1, wob: 0.2 });
    ramify(lead, 1, 3, o);
  } else if (kind === "beech" || kind === "young") {
    const yg = kind === "young";
    const H = yg ? 2.2 + rand() * 1.2 : 11 + rand() * 4, R = yg ? 0.09 + rand() * 0.04 : 0.42 + rand() * 0.12;
    const tr = trunk(H, R, R * 0.75, yg ? 0.5 : 0.25, 0.2);
    if (!yg) roots(4, R, 1.4);
    const o = { kids: [0, 4, 4, 0], start: [0, 0.25, 0.3], angle: [0, 0.6, 0.75], lenK: [0, 0.5, 0.5], lift: [0, 0.15, 0.12], bend: [0, 0.35, 0.3], leavesPer: yg ? 2 : 3, taper: 0.45 };
    const limbs = yg ? 4 : 5 + Math.floor(rand() * 2);
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.7;
      const { p, r } = at(tr, 0.75 + rand() * 0.25);
      const d = V(Math.cos(a) * 0.6, 1, Math.sin(a) * 0.6);
      const L = (yg ? 2.8 : 10) * (0.75 + rand() * 0.4);
      ramify(branch(p, d, L, r * 0.7, r * 0.15, 1, { bend: 0.2, wob: 0.2 }), 1, yg ? 2 : 3, yg ? { ...o, kids: [0, 5, 0], leavesPer: 3 } : o);
    }
    const top = at(tr, 1);
    ramify(branch(top.p, V(0, 1, 0), (yg ? 2.2 : 8) * (0.8 + rand() * 0.3), top.r * 0.8, 0.03, 1, { bend: 0.1 }), 1, yg ? 2 : 3, yg ? { ...o, kids: [0, 5, 0], leavesPer: 3 } : o);
  } else if (kind === "birch" || kind === "poplar") {
    const pop = kind === "poplar";
    const H = pop ? 22 + rand() * 5 : 14 + rand() * 4, R = pop ? 0.4 : 0.2 + rand() * 0.05;
    const tr = trunk(H, R, 0.04, pop ? 0.15 : 0.6, pop ? 0.05 : 0.5);
    if (pop) roots(4, R, 1.2);
    const n = pop ? 26 : 18;
    for (let i = 0; i < n; i++) {
      const t = (pop ? 0.18 : 0.35) + (i / n) * (pop ? 0.8 : 0.62);
      const { p, r } = at(tr, t);
      const a = i * 2.39996 + rand() * 0.4;
      const d = pop ? V(Math.cos(a) * 0.25, 1, Math.sin(a) * 0.25) : V(Math.cos(a), 0.7 + rand() * 0.4, Math.sin(a));
      const L = (pop ? 4.5 : 5) * Math.sin(Math.PI * (0.25 + t * 0.7)) * (0.7 + rand() * 0.5);
      const b = branch(p, d, L, Math.max(0.03, r * 0.5), 0.012, 1, { bend: pop ? 0.25 : -0.5, wob: 0.2 });
      ramify(b, 1, 2, { kids: [0, pop ? 3 : 4, 0], start: [0, 0.3], angle: [0, pop ? 0.4 : 0.7], lenK: [0, 0.5], lift: [0, pop ? 0.3 : -0.25], bend: [0, pop ? 0.2 : -0.6], leavesPer: pop ? 3 : 3, leafUp: pop ? 0.4 : -0.3 });
    }
  } else if (kind === "willow") {
    const H = 3.5 + rand() * 1.5, R = 0.55 + rand() * 0.15;
    const tr = trunk(H, R, R * 0.8, 1.0, 0.6);
    roots(5, R, 1.5);
    const limbs = 6;
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.5;
      const { p, r } = at(tr, 0.8 + rand() * 0.2);
      const d = V(Math.cos(a) * 0.8, 1, Math.sin(a) * 0.8);
      const limb = branch(p, d, 7 + rand() * 3, r * 0.55, 0.06, 1, { bend: -0.6, wob: 0.2 });
      // longs rameaux retombants le long de l'arche
      for (let k = 0; k < 9; k++) {
        const q = at(limb, 0.35 + (k / 9) * 0.65);
        const out = V(q.p.x, 0, q.p.z).normalize().multiplyScalar(0.3);
        for (let s = 0; s < 2; s++) {
          const len = 2.2 + rand() * 1.8;
          leafAt(q.p.clone().add(V((rand() - 0.5) * 0.6, 0, (rand() - 0.5) * 0.6)), V(out.x * 0.3, -1, out.z * 0.3), len, { hang: true });
        }
      }
    }
  } else if (kind === "scots") {
    const H = 18 + rand() * 6, R = 0.38 + rand() * 0.1;
    const tr = trunk(H, R, 0.08, 0.35, 0.45);
    tr.pineColor = true;
    roots(4, R, 1.1);
    const n = 9;
    for (let i = 0; i < n; i++) {
      const t = 0.62 + (i / n) * 0.36;
      const { p, r } = at(tr, t);
      const a = i * 2.39996 + rand() * 0.5;
      const d = V(Math.cos(a), 0.35 + rand() * 0.5, Math.sin(a));
      const L = 3.2 * (1.2 - t * 0.5) * (0.7 + rand() * 0.5);
      const b = branch(p, d, L, Math.max(0.05, r * 0.45), 0.03, 1, { bend: 0.35, wob: 0.3 });
      // « nuages » d'aiguilles au bout des branches
      for (let k = 0; k < 3; k++) {
        const q = at(b, 0.55 + k * 0.2);
        for (let s = 0; s < 5; s++) leafAt(q.p.clone().add(V((rand() - 0.5) * 0.7, (rand() - 0.5) * 0.3, (rand() - 0.5) * 0.4)), V(q.d.x + (rand() - 0.5), 0.6 + rand() * 0.5, q.d.z + (rand() - 0.5)), sp.leafSize * (0.8 + rand() * 0.4));
      }
    }
    const top = at(tr, 1);
    for (let s = 0; s < 5; s++) leafAt(top.p.clone().add(V((rand() - 0.5) * 0.6, -0.4 + rand() * 0.5, (rand() - 0.5) * 0.6)), V(rand() - 0.5, 1, rand() - 0.5), sp.leafSize);
  } else if (kind === "pine" || kind === "fir") {
    // Conifères : tronc jusqu'à la cime, verticilles de branches (pendantes pour l'épicéa, à plat pour le sapin)
    const fir = kind === "fir";
    const H = (fir ? 22 : 24) + rand() * 7, R = 0.36 + rand() * 0.1;
    const tr = trunk(H, R, 0.03, 0.2, 0.1);
    roots(4, R, 1.0);
    const base = 2.2 + rand() * 1.5;
    let y = base;
    while (y < H - 0.4) {
      const t = (y - base) / (H - base);
      const reach = (fir ? 4.2 : 4.6) * Math.pow(1 - t, 0.95) + 0.4;
      const n = 5 + Math.floor(rand() * 2);
      const a0 = rand() * 6.283;
      const { p, r } = at(tr, (y + 0.4) / (H + 0.4));
      for (let i = 0; i < n; i++) {
        const a = a0 + (i / n) * 6.283 + (rand() - 0.5) * 0.4;
        const droop = fir ? -0.02 + rand() * 0.08 : -0.28 + t * 0.35 + rand() * 0.1;
        const d = V(Math.cos(a), droop, Math.sin(a));
        const b = branch(p, d, reach * (0.8 + rand() * 0.35), Math.max(0.025, r * 0.35), 0.012, 1, { bend: fir ? 0.04 : 0.25 + t * 0.2, wob: 0.08 });
        // rameaux aplatis le long de la branche
        const cnt = Math.max(1, Math.round(b.len / 0.9));
        for (let k = 0; k < cnt; k++) {
          const q = at(b, (k + 0.6) / cnt);
          const side = V(-q.d.z, 0, q.d.x).normalize();
          for (const s of [-1, 1]) leafAt(q.p, q.d.clone().addScaledVector(side, s * 0.9).add(V(0, fir ? 0.02 : -0.1, 0)), sp.leafSize * (1 - t * 0.35) * (0.8 + rand() * 0.35), { flat: true });
        }
        leafAt(at(b, 1).p, b.pts[b.pts.length - 1].clone().sub(b.pts[b.pts.length - 2]), sp.leafSize * (1 - t * 0.4), { flat: true });
      }
      y += (fir ? 0.75 : 0.62) * (0.85 + rand() * 0.3);
    }
    const tip = at(tr, 1);
    for (let i = 0; i < 4; i++) leafAt(tip.p.clone().add(V(0, -0.7, 0)), V(Math.cos(i * 1.57) * 0.3, 1, Math.sin(i * 1.57) * 0.3), sp.leafSize * 0.7);
  } else if (kind === "dead") {
    const H = 7 + rand() * 7, R = 0.32 + rand() * 0.15;
    const tr = trunk(H, R, R * 0.45, 0.5, 0.3);
    roots(4, R, 1.2);
    for (let i = 0; i < 6; i++) {
      const t = 0.4 + rand() * 0.55;
      const { p, r } = at(tr, t);
      const a = rand() * 6.283;
      const b = branch(p, V(Math.cos(a), 0.3 + rand() * 0.6, Math.sin(a)), 1.5 + rand() * 3.5, r * 0.4, 0.02, 1, { bend: 0.2, wob: 0.35 });
      if (rand() < 0.6) { const q = at(b, 0.6); branch(q.p, rot(q.d, perp(q.d, rand), 0.7), 1 + rand() * 1.2, q.r * 0.6, 0.01, 2, { wob: 0.3 }); }
    }
  }
  // hauteur, centre du houppier
  let maxY = 0;
  const c = V(0, 0, 0);
  for (const b of S.branches) for (const p of b.pts) maxY = Math.max(maxY, p.y);
  for (const l of S.leaves) { c.add(l.p); maxY = Math.max(maxY, l.p.y + l.size * 0.5); }
  if (S.leaves.length) c.divideScalar(S.leaves.length); else c.set(0, maxY * 0.7, 0);
  let rad = 0;
  for (const l of S.leaves) rad = Math.max(rad, Math.hypot(l.p.x - c.x, l.p.z - c.z));
  S.height = maxY; S.crown = c; S.crownR = rad || 2;
  return S;
}

// Géométrie d'un niveau de détail à partir du squelette.
// lod 0 : tout ; lod 1 : charpentières + branches, feuillage regroupé en grandes cartes ; lod 2 : ombres (très léger)
function buildFromSkeleton(S, lod) {
  const sp = SPECIES[S.kind];
  const b = new Builder();
  const rand = mulberry32(S.branches.length * 31 + lod);
  const barkUV = UV[sp.bark], barkC = tint(sp.barkTint);
  const stiff = sp.stiff, H = Math.max(4, S.height);
  const sway = (p) => Math.pow(Math.max(0, p.y) / H, 1.6) / stiff;
  for (const br of S.branches) {
    if (lod >= 1 && br.level >= 2 && br.radii[0] < (lod === 1 ? 0.1 : 0.16)) continue;
    if (lod >= 1 && br.level >= 1 && (S.kind === "pine" || S.kind === "fir") && br.radii[0] < 0.11) continue;
    if (lod >= 1 && br.root && lod === 2) continue;
    let pts = br.pts, radii = br.radii;
    if (lod >= 1 && pts.length > 4) { const keep = pts.map((_, i) => i).filter((i) => i % 2 === 0 || i === pts.length - 1); pts = keep.map((i) => br.pts[i]); radii = keep.map((i) => br.radii[i]); }
    let seg = br.level === 0 ? (lod ? 6 : br.radii[0] > 0.9 ? 14 : 10) : br.radii[0] > 0.12 ? (lod ? 4 : 6) : lod ? 3 : 4;
    if (br.root) seg = lod ? 4 : 6;
    if (br.flare) radii = radii.map((r, i) => r * (1 + 0.55 * Math.exp(-(i / (radii.length - 1)) * 9)));
    const start = br.pts[0];
    const flexAt = (i) => [sway(pts[i]), br.level === 0 ? 0 : Math.min(1, pts[i].distanceTo(start) / 6) * (0.4 + br.level * 0.3) / stiff];
    const colorAt = br.flare && br.pts.length && S.kind === "scots"
      ? (i) => tint(0xb0a090).lerp(tint(0xffb070), Math.min(1, Math.max(0, (pts[i].y / H - 0.35) * 2.5)))
      : null;
    b.tube(pts, radii, seg, barkUV, br.level === 0 ? barkC : barkC.clone().multiplyScalar(0.95), null, flexAt, colorAt);
  }
  if (!sp.leaf) return b.build();
  const leafUV = UV[sp.leaf];
  const leafC = tint(sp.leafTint);
  const crown = S.crown;
  const step = lod === 0 ? 1 : lod === 1 ? 3 : 4;
  const grow = lod === 0 ? 1 : lod === 1 ? 1.62 : 1.9;
  const up = V(0, 1, 0);
  S.leaves.forEach((l, idx) => {
    if (idx % step !== 0) return;
    const size = l.size * grow;
    const d = l.d.clone().normalize();
    const c = leafC.clone().multiplyScalar(0.82 + rand() * 0.36);
    // profondeur dans le houppier : intérieur plus sombre
    const depth = Math.hypot(l.p.x - crown.x, l.p.z - crown.z) / S.crownR;
    c.multiplyScalar(0.7 + 0.4 * Math.min(1, depth));
    const flex = [sway(l.p) * 1.05, 1.0 / stiff];
    let right = new THREE.Vector3().crossVectors(d, up);
    if (right.lengthSq() < 0.01) right = perp(d, rand); else right.normalize();
    right.applyAxisAngle(d, (rand() - 0.5) * 0.9);
    const center = l.p.clone().addScaledVector(d, size * 0.45);
    const ref = l.flat ? V(l.p.x * 0.3 + crown.x * 0.7, l.p.y - 0.8, l.p.z * 0.3 + crown.z * 0.7) : l.hang ? V(crown.x, l.p.y + 1.5, crown.z) : crown;
    if (l.hang) { b.card(center, right, d, size * 0.45, size, leafUV, c, ref, 0.2, flex); if (lod === 0) b.card(center, rot(right, d, 1.57), d, size * 0.45, size, leafUV, c, ref, 0.2, flex); return; }
    b.card(center, right, d, size, size, leafUV, c, ref, l.flat ? 0.5 : 0.25, flex);
    if (lod === 0) {
      // seconde carte croisée pour le volume
      const n2 = new THREE.Vector3().crossVectors(right, d).normalize();
      b.card(center, n2, d, size * (l.flat ? 0.55 : 0.9), size * 0.95, leafUV, c.clone().multiplyScalar(0.92), ref, l.flat ? 0.5 : 0.25, flex);
    }
  });
  return b.build();
}

// Arbre complet : [lod0, lod1, ombre], plus infos (hauteur, rayon du houppier)
const skelCache = new Map();
export function makeTree(kind, seed) {
  const key = kind + seed;
  let S = skelCache.get(key);
  if (!S) { S = skeleton(kind, seed); skelCache.set(key, S); }
  const geos = [buildFromSkeleton(S, 0), buildFromSkeleton(S, 1), buildFromSkeleton(S, 2)];
  geos.info = { height: S.height, crownR: S.crownR };
  return geos;
}

// ---------- Petits végétaux ----------
export function makeLeafBush(withBerries, seed = 9) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const crown = V(0, 0.55, 0);
  // tiges
  for (let i = 0; i < 6; i++) {
    const a = rand() * 6.283;
    b.tube([V(0, -0.05, 0), V(Math.cos(a) * 0.25, 0.45, Math.sin(a) * 0.25), V(Math.cos(a) * 0.5, 0.8 + rand() * 0.3, Math.sin(a) * 0.5)], [0.025, 0.015, 0.006], 3, UV.oakBark, tint(0x8a7a68), 0.2);
  }
  for (let i = 0; i < 16; i++) {
    const d = V(rand() * 2 - 1, rand() * 0.9 - 0.2, rand() * 2 - 1).normalize().multiplyScalar(0.3 + rand() * 0.5);
    b.w = [0.3, 0.6];
    b.cluster(crown.clone().add(d), 0.85, UV.small, tint(0xa8c478, 0.8 + rand() * 0.3), crown, rand, 2);
  }
  b.w = [0, 0];
  if (withBerries) {
    for (let g = 0; g < 10; g++) {
      const a = rand() * Math.PI * 2, e = rand() * 1.0 - 0.1;
      const cx = Math.cos(a) * 0.62 * Math.cos(e), cy = 0.55 + Math.sin(e) * 0.5, cz = Math.sin(a) * 0.62 * Math.cos(e);
      const colr = rand() < 0.5 ? tint(0x7a0a18) : tint(0x5a0a12);
      for (let k = 0; k < 4; k++) {
        b.blob(V(cx + (rand() - 0.5) * 0.09, cy - k * 0.035 + (rand() - 0.5) * 0.04, cz + (rand() - 0.5) * 0.09), 0.026 + rand() * 0.01, colr.clone().multiplyScalar(0.8 + rand() * 0.4));
      }
    }
  }
  return b.build();
}

// Roseaux de marais : touffe de tiges fines et quelques massettes brunes.
export function makeReeds(seed = 13) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const W = UV.white;
  for (let i = 0; i < 16; i++) {
    const a = rand() * Math.PI * 2, r = rand() * 0.45;
    const base = V(Math.cos(a) * r, -0.6, Math.sin(a) * r);
    const H = 1.6 + rand() * 1.1, w = 0.035;
    const lean = V((rand() - 0.5) * 0.4, 0, (rand() - 0.5) * 0.4);
    const side = V(Math.cos(a + 1.57), 0, Math.sin(a + 1.57));
    const colr = tint(rand() < 0.3 ? 0xb8a860 : 0x7a9440, 0.8 + rand() * 0.3);
    for (let s = 0; s < 3; s++) {
      const t0 = s / 3, t1 = (s + 1) / 3;
      const p0 = base.clone().addScaledVector(lean, t0 * t0).add(V(0, H * t0, 0));
      const p1 = base.clone().addScaledVector(lean, t1 * t1).add(V(0, H * t1, 0));
      const w0 = w * (1 - t0 * 0.8), w1 = w * (1 - t1 * 0.8);
      const n = V(side.z, 0.3, -side.x).normalize();
      const q = [p0.clone().addScaledVector(side, -w0), p0.clone().addScaledVector(side, w0), p1.clone().addScaledVector(side, w1), p1.clone().addScaledVector(side, -w1)];
      const c0 = colr.clone().multiplyScalar(0.55 + 0.45 * t0), c1 = colr.clone().multiplyScalar(0.55 + 0.45 * t1);
      b.w = [0, t0 * 0.8]; b.v(q[0], n, W[0], W[1], c0); b.v(q[1], n, W[0], W[1], c0); b.w = [0, t1 * 0.8]; b.v(q[2], n, W[0], W[1], c1);
      b.w = [0, t0 * 0.8]; b.v(q[0], n, W[0], W[1], c0); b.w = [0, t1 * 0.8]; b.v(q[2], n, W[0], W[1], c1); b.v(q[3], n, W[0], W[1], c1);
    }
    b.w = [0, 0.8];
    if (i < 5) b.blob(base.clone().addScaledVector(lean, 0.8).add(V(0, H * 0.85, 0)), 0.05, tint(0x4a2e18));
    b.w = [0, 0];
  }
  return b.build();
}

// Corail : colonie ramifiée aux couleurs vives (orange, rose, violet, jaune).
export function makeCoral(seed = 23) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const WH = [UV.white[0] - 0.003, UV.white[0] + 0.003];
  const cols = [0xe8703a, 0xd8507a, 0x8a5ad0, 0xe8c040, 0xf0907a];
  const branch = (p, dir, len, r, depth, colr) => {
    const e = p.clone().addScaledVector(dir, len);
    const m = p.clone().lerp(e, 0.5).add(V((rand() - 0.5) * 0.06, 0, (rand() - 0.5) * 0.06));
    b.tube([p, m, e], [r, r * 0.8, r * 0.6], 5, [WH[0], WH[1], 0.02, 0.022], colr, 0.0001);
    if (depth > 0) for (let k = 0; k < 2 + (rand() < 0.4 ? 1 : 0); k++) {
      const nd = dir.clone().add(V((rand() - 0.5) * 1.2, 0.3 + rand() * 0.4, (rand() - 0.5) * 1.2)).normalize();
      branch(e, nd, len * (0.6 + rand() * 0.2), r * 0.7, depth - 1, colr);
    } else b.blob(e, r * 1.3, colr.clone().multiplyScalar(1.15));
  };
  for (let c = 0; c < 4; c++) {
    const colr = tint(cols[Math.floor(rand() * cols.length)], 0.9 + rand() * 0.2);
    const base = V((rand() - 0.5) * 0.9, -0.1, (rand() - 0.5) * 0.9);
    if (rand() < 0.35) {
      for (let k = 0; k < 6; k++) b.blob(base.clone().add(V((rand() - 0.5) * 0.3, 0.15 + rand() * 0.15, (rand() - 0.5) * 0.3)), 0.16, colr);
    } else branch(base, V(0, 1, 0), 0.32, 0.05, 2, colr);
  }
  return b.build();
}

// Algues sous-marines : longs rubans ondulants.
export function makeKelp(seed = 17) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const W = UV.white;
  for (let i = 0; i < 6; i++) {
    const a = rand() * Math.PI * 2, r = rand() * 0.5;
    const base = V(Math.cos(a) * r, 0, Math.sin(a) * r);
    const H = 1.5 + rand() * 2.5, w = 0.09 + rand() * 0.05;
    const side = V(Math.cos(a), 0, Math.sin(a));
    const colr = tint(rand() < 0.5 ? 0x5a6a20 : 0x3a5a2a, 0.8 + rand() * 0.3);
    const segs = 6;
    for (let s = 0; s < segs; s++) {
      const t0 = s / segs, t1 = (s + 1) / segs;
      const off = (t) => V(Math.sin(t * 5 + i) * 0.15 * t, H * t, Math.cos(t * 4 + i) * 0.15 * t);
      const p0 = base.clone().add(off(t0)), p1 = base.clone().add(off(t1));
      const n = V(side.z, 0.2, -side.x).normalize();
      const q = [p0.clone().addScaledVector(side, -w), p0.clone().addScaledVector(side, w), p1.clone().addScaledVector(side, w), p1.clone().addScaledVector(side, -w)];
      const c0 = colr.clone().multiplyScalar(0.5 + 0.5 * t0), c1 = colr.clone().multiplyScalar(0.5 + 0.5 * t1);
      b.w = [0, t0]; b.v(q[0], n, W[0], W[1], c0); b.v(q[1], n, W[0], W[1], c0); b.w = [0, t1]; b.v(q[2], n, W[0], W[1], c1);
      b.w = [0, t0]; b.v(q[0], n, W[0], W[1], c0); b.w = [0, t1]; b.v(q[2], n, W[0], W[1], c1); b.v(q[3], n, W[0], W[1], c1);
    }
  }
  return b.build();
}

// Arbuste (noisetier, aubépine…) : plusieurs tiges qui partent du sol, feuillage étagé, 1,5 à 3 m.
export function makeShrub(seed = 61) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const stems = 5 + Math.floor(rand() * 3);
  const tipList = [];
  for (let i = 0; i < stems; i++) {
    const a = rand() * Math.PI * 2, out = 0.5 + rand() * 0.9, H = 1.6 + rand() * 1.3;
    const p0 = V(Math.cos(a) * 0.12, -0.1, Math.sin(a) * 0.12);
    const p1 = V(Math.cos(a) * out * 0.5, H * 0.55, Math.sin(a) * out * 0.5);
    const p2 = V(Math.cos(a) * out, H, Math.sin(a) * out);
    b.tube([p0, p1, p2], [0.04, 0.03, 0.012], 5, UV.beechBark, tint(0x9a8a78), null, (k) => [0, k * 0.3]);
    tipList.push(p1, p2);
  }
  const crown = V(0, 1.4, 0);
  for (const t of tipList) for (let k = 0; k < 3; k++) {
    const p = t.clone().add(V((rand() - 0.5) * 0.7, (rand() - 0.4) * 0.6, (rand() - 0.5) * 0.7));
    b.w = [0.15, 0.6 * p.y / 3];
    b.cluster(p, 0.9 + rand() * 0.4, rand() < 0.5 ? UV.beechLeaves : UV.small, tint(0xb0c880, 0.75 + rand() * 0.35), crown, rand, 2);
  }
  b.w = [0, 0];
  return b.build();
}

// Couvre-sol : tapis de petites feuilles (pervenche, lierre, ail des ours) à ras du sol.
export function makeGroundCover(seed = 71) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const crown = V(0, -1, 0);
  for (let i = 0; i < 9; i++) {
    const a = rand() * Math.PI * 2, r = rand() * 0.9;
    const c = V(Math.cos(a) * r, 0.04 + rand() * 0.2, Math.sin(a) * r);
    const nrm = V((rand() - 0.5) * 0.5, 1, (rand() - 0.5) * 0.5).normalize();
    const right = new THREE.Vector3().crossVectors(nrm, V(rand() - 0.5, 0, rand() - 0.5).normalize()).normalize();
    const up = new THREE.Vector3().crossVectors(right, nrm).normalize();
    b.card(c, right, up, 0.7 + rand() * 0.5, 0.7 + rand() * 0.5, UV.small, tint(0x8ab060, 0.7 + rand() * 0.4), crown, 2.0, [0, 0.15]);
  }
  return b.build();
}

// Fougère : frondes arquées.
export function makeFern(seed = 5) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const crown = V(0, 0.2, 0);
  const n = 11;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand() * 0.4;
    const len = 0.8 + rand() * 0.5;
    const lift = 0.55 + rand() * 0.45;
    const dir1 = V(Math.cos(a), lift, Math.sin(a)).normalize();
    const side = V(-Math.sin(a), 0, Math.cos(a));
    const c = tint(0xc0e090, 0.75 + rand() * 0.35);
    const [u0, u1, v0, v1] = UV.fern, vm = (v0 + v1) / 2;
    // base qui monte, puis pointe qui retombe (deux moitiés de la fronde)
    const p1 = dir1.clone().multiplyScalar(len * 0.5);
    b.card(p1.clone().multiplyScalar(0.5), side, dir1, len * 0.42, len * 0.5, [u0, u1, v0, vm], c, crown, 0.8, [0, 0.3]);
    const dir2 = V(Math.cos(a), -0.4, Math.sin(a)).normalize();
    b.card(p1.clone().addScaledVector(dir2, len * 0.25), side, dir2, len * 0.36, len * 0.5, [u0, u1, vm, v1], c, crown, 0.8, [0, 0.8]);
  }
  return b.build();
}

// Tronc couché, moussu, avec branches cassées.
export function makeLog(seed = 3) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const L = 4.2;
  const pts = [];
  for (let i = 0; i <= 7; i++) pts.push(V(-L / 2 + (i / 7) * L, 0.28 + (rand() - 0.5) * 0.05, (rand() - 0.5) * 0.08));
  b.tube(pts, pts.map((_, i) => 0.32 - i * 0.012), 10, UV.oakBark, tint(0x9a9080), 0.1);
  for (let i = 0; i < 6; i++) {
    const p = V(-L / 2 + 0.4 + rand() * (L - 0.8), 0.56, (rand() - 0.5) * 0.15);
    b.card(p, V(1, 0, 0), V(0, 0, 1), 0.8, 0.4, UV.small, tint(0x6a8a3a, 0.7), V(p.x, 0, 0), 0.9);
  }
  b.tube([V(0.6, 0.4, 0.1), V(0.9, 0.75, 0.35), V(1.0, 0.95, 0.45)], [0.07, 0.05, 0.02], 5, UV.oakBark, tint(0x9a9078), 0.3);
  b.tube([V(-1.2, 0.4, -0.1), V(-1.5, 0.6, -0.5), V(-1.6, 0.7, -0.75)], [0.06, 0.04, 0.015], 4, UV.oakBark, tint(0x9a9078), 0.3);
  // souche de racines à un bout
  for (let k = 0; k < 5; k++) { const a = (k / 5) * 6.283; b.tube([V(L / 2, 0.3, 0), V(L / 2 + 0.15, 0.3 + Math.sin(a) * 0.5, Math.cos(a) * 0.5), V(L / 2 + 0.1, 0.3 + Math.sin(a) * 0.8, Math.cos(a) * 0.8)], [0.12, 0.06, 0.02], 4, UV.oakBark, tint(0x8a8070), 0.3); }
  return b.build();
}


// Litière forestière : brindilles, cailloux, pommes de pin (petits objets semés autour du joueur)
export function makeLitter(seed = 91) {
  const rand = mulberry32(seed);
  const b = new Builder();
  for (let i = 0; i < 5; i++) {
    const a = rand() * 6.283, x = (rand() - 0.5) * 1.6, z = (rand() - 0.5) * 1.6, L = 0.3 + rand() * 0.7;
    const d = V(Math.cos(a), 0.02, Math.sin(a));
    const p0 = V(x, 0.02, z), p1 = p0.clone().addScaledVector(d, L);
    b.tube([p0, p0.clone().lerp(p1, 0.5).add(V(0, 0.03, 0)), p1], [0.018, 0.013, 0.006], 3, UV.oakBark, tint(0x8a7058), 0.3);
    if (rand() < 0.5) { const q = p0.clone().lerp(p1, 0.4); b.tube([q, q.clone().add(V(Math.sin(a) * 0.2, 0.05, -Math.cos(a) * 0.2))], [0.01, 0.004], 3, UV.oakBark, tint(0x8a7058), 0.3); }
  }
  for (let i = 0; i < 4; i++) {
    const g = 0.45 + rand() * 0.3;
    b.blob(V((rand() - 0.5) * 1.8, 0.0, (rand() - 0.5) * 1.8), 0.04 + rand() * 0.07, new THREE.Color(g, g * 0.97, g * 0.92).multiplyScalar(0.5));
  }
  for (let i = 0; i < 2; i++) b.blob(V((rand() - 0.5) * 1.5, 0.03, (rand() - 0.5) * 1.5), 0.035, tint(0x5a3a20));
  return b.build();
}

// ---------- Matériau partagé ----------
export const vegUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunCol: { value: new THREE.Color(1, 1, 1) },
  uWind: { value: new THREE.Vector3(1, 0, 0.4) },     // direction xz + force
  uFade: { value: new THREE.Vector2(1e6, 1e6) },      // fondu (tramé) entre modèles 3D et imposteurs
};

// Code du vent commun au rendu et aux ombres
const WIND_VS = `
  vec3 ip = vec3(0.0);
#ifdef USE_INSTANCING
  ip = vec3(instanceMatrix[3]);
#endif
  float ph = ip.x * 0.071 + ip.z * 0.053;
  float gust = 0.55 + 0.45 * sin(uTime * 0.37 + ip.x * 0.011 + ip.z * 0.007) * sin(uTime * 0.23 + 1.3);
  vec2 wd = normalize(uWind.xz) * uWind.y;
  // balancement de tout l'arbre (plus fort en haut), branches qui oscillent, feuilles qui frémissent
  float s1 = sin(uTime * 0.9 + ph) * 0.6 + sin(uTime * 1.7 + ph * 1.7) * 0.25 + 0.55;
  transformed.xz += wd * aWind.x * s1 * gust * 0.55;
  float s2 = sin(uTime * 2.3 + ph * 3.0 + position.y * 0.35 + position.x * 0.2);
  transformed += vec3(wd.x, 0.35, wd.y) * aWind.y * s2 * gust * 0.09;
  float fl = sin(uTime * 9.0 + dot(position, vec3(3.1, 2.3, 2.7)) + ip.x);
  transformed += normal * fl * 0.03 * vLeaf * (0.4 + gust) * min(1.0, aWind.y + 0.2);`;

export function makeVegetationMaterial(atlas, opts = {}) {
  const mat = new THREE.MeshStandardMaterial({ map: atlas, normalMap: atlas.normalAtlas || null, vertexColors: true, roughness: 0.8, metalness: 0, alphaTest: 0.42, side: THREE.DoubleSide, shadowSide: THREE.DoubleSide });
  if (mat.normalMap) mat.normalScale.set(0.8, 0.8);
  if (opts.a2c) { mat.alphaToCoverage = true; }
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, vegUniforms);
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime; uniform vec3 uWind;\nattribute vec2 aWind;\nvarying float vLeaf;\nvarying vec3 vWPos2;\nvarying vec3 vAut;\nvarying float vDither;")
      .replace("#include <color_vertex>", `
  vColor = vec3(1.0);
#ifdef USE_COLOR
  vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
  vAut = instanceColor;
#else
  vAut = vec3(1.0);
#endif`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>
  vLeaf = step(0.5, uv.x);
${WIND_VS}`)
      .replace("#include <worldpos_vertex>", `#include <worldpos_vertex>
  vec4 wp2 = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  wp2 = instanceMatrix * wp2;
#endif
  vWPos2 = (modelMatrix * wp2).xyz;
  vDither = fract(sin(dot(ip.xz, vec2(12.9898, 78.233))) * 43758.5453);`);
    sh.fragmentShader = sh.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uSunDir;\nuniform vec3 uSunCol;\nuniform vec2 uFade;\nvarying float vLeaf;\nvarying vec3 vWPos2;\nvarying vec3 vAut;\nvarying float vDither;\nfloat ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }")
      .replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>
  // Fondu tramé vers les imposteurs lointains (pas d'apparition brutale)
  {
    float dC = length(vWPos2.xz - cameraPosition.xz);
    float fo = clamp((dC - uFade.x) / max(1.0, uFade.y - uFade.x), 0.0, 1.0);
    if (fo > 0.0 && ign(gl_FragCoord.xy) < fo) discard;
  }`)
      .replace("#include <color_fragment>", `#include <color_fragment>
  float autK = (1.0 - step(2.99, vAut.r + vAut.g + vAut.b)) * vLeaf;
  float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
  diffuseColor.rgb = mix(diffuseColor.rgb, lum * vAut * 2.6, autK);`)
      .replace("#include <alphatest_fragment>", `
  // Les mipmaps rendent les feuilles transparentes au loin : on compense selon le niveau de détail.
  vec2 dUv = max(abs(dFdx(vMapUv)), abs(dFdy(vMapUv))) * 2048.0;
  diffuseColor.a *= 1.0 + max(0.0, log2(max(dUv.x, dUv.y))) * 0.4;
  #include <alphatest_fragment>`)
      .replace("#include <roughnessmap_fragment>", `#include <roughnessmap_fragment>
  roughnessFactor = mix(0.95, 0.62, vLeaf);   // écorce mate, feuilles légèrement satinées`)
      .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
  // Translucidité : feuilles éclairées par derrière (contre-jour), lumière diffusée dans le feuillage
  vec3 toCam = normalize(cameraPosition - vWPos2);
  float back = pow(max(dot(-toCam, uSunDir), 0.0), 3.0);
  float wrapL = max(0.0, dot(normalize(vNormal), normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz)) * -0.5 + 0.5);
  totalEmissiveRadiance += diffuseColor.rgb * uSunCol * (back * 1.5 + wrapL * 0.12 + 0.05) * vLeaf;`);
  };
  mat.customProgramCacheKey = () => "veg" + (opts.a2c ? 1 : 0);
  return mat;
}

// Matériau d'ombre : même vent, même découpe des feuilles
export function makeVegetationDepthMaterial(atlas) {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: atlas, alphaTest: 0.42, side: THREE.DoubleSide });
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, vegUniforms);
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime; uniform vec3 uWind; attribute vec2 aWind; float vLeaf;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
  vLeaf = step(0.5, uv.x);
  vec3 normal = vec3(0.0, 1.0, 0.0);
${WIND_VS}`);
  };
  m.customProgramCacheKey = () => "vegdepth";
  return m;
}
