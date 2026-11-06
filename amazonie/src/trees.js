// Arbres et végétation de la forêt amazonienne : atlas de textures (écorces, feuillages tropicaux, palmes, fougères) avec normal maps,
// générateur d'arbres par squelette (tronc, contreforts, charpentières, branches, rameaux, palmes) pour 11 essences,
// plusieurs niveaux de détail tirés du même squelette (silhouettes identiques de près comme de loin).
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

// ---------- Disposition de l'atlas (coordonnées normalisées) ----------
// Moitié gauche : 4 écorces sur toute la hauteur (répétition verticale). Moitié droite : 8 tuiles de feuillage.
const col = (i) => [i * 0.125 + 0.004, (i + 1) * 0.125 - 0.004, 0, 1];
const tile = (c, r) => { const u0 = 0.5 + c * 0.25, v1 = 1 - r * 0.25; return [u0 + 0.004, u0 + 0.246, v1 - 0.246, v1 - 0.004]; };
export const UV = {
  roughBark: col(0), smoothBark: col(1), cecropiaBark: col(2), palmBark: col(3),
  broad: tile(0, 0), canopy: tile(1, 0), leaflet: tile(0, 1), frond: tile(1, 1), fan: tile(0, 2), palmate: tile(1, 2),
  bark: col(0), oakBark: col(0), beechBark: col(1), birch: col(2), pineBark: col(3),
  leaves: tile(1, 0), oakLeaves: tile(0, 0), beechLeaves: tile(1, 0), birchLeaves: tile(0, 1), willow: tile(1, 1),
  needles: tile(0, 2), pineNeedles: tile(1, 2), fern: tile(0, 3),
  small: (() => { const t = tile(1, 3); return [t[0], t[0] + 0.25 * 0.84, t[3] - 0.25 * 0.84, t[3]]; })(),   // sans le coin du carré blanc
  white: [(1024 + 512 + 475) / 2048, 1 - (1536 + 475) / 2048],
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

  // --- Écorce tropicale rugueuse : gris-brun, fissures peu profondes, croûtes de lichens blancs et verts ---
  inCol(0, () => {
    gA.fillStyle = "#5e554a"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.3); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 40; i++) {           // crêtes longues et peu marquées
      let x = r() * 256, y = r() * 2048;
      const w = 10 + r() * 16, len = 120 + r() * 260, v = 92 + r() * 40;
      wrapB(x, y, w, len, (X, Y) => {
        both((g, h) => {
          g.fillStyle = h ? gray(0.5 + r() * 0.3) : rgb(v, v * 0.95, v * 0.86, 0.8);
          g.beginPath(); g.moveTo(X - w / 2, Y);
          for (let k = 0; k <= 8; k++) g.lineTo(X - w / 2 + Math.sin(k * 1.3 + x) * 2.5, Y + (k / 8) * len);
          for (let k = 8; k >= 0; k--) g.lineTo(X + w / 2 + Math.sin(k * 1.1 + y) * 2.5, Y + (k / 8) * len);
          g.fill();
        });
      });
    }
    for (let i = 0; i < 380; i++) {          // écailles fines
      const x = r() * 256, y = r() * 2048, w = 4 + r() * 10, hgt = 8 + r() * 26;
      wrapB(x, y, w, hgt, (X, Y) => {
        const v = 70 + r() * 50;
        gA.fillStyle = rgb(v, v * 0.92, v * 0.82, 0.6); gA.fillRect(X, Y, w, hgt);
        gH.fillStyle = gray(0.35 + r() * 0.4, 0.8); gH.fillRect(X, Y, w, hgt);
        gA.fillStyle = "rgba(20,16,12,0.6)"; gA.fillRect(X, Y + hgt, w, 1.2);
      });
    }
    for (let i = 0; i < 150; i++) {          // croûtes de lichens : blanc crème, gris-vert, rose pâle
      const x = r() * 256, y = r() * 2048, R = 6 + r() * 26;
      const c = [[214, 212, 196], [176, 188, 150], [200, 176, 170], [150, 170, 120]][(r() * 4) | 0];
      wrapB(x, y, R, R * 1.6, (X, Y) => {
        gA.fillStyle = rgb(...c, 0.35 + r() * 0.4); gA.beginPath(); gA.ellipse(X, Y, R, R * (1 + r() * 0.8), 0, 0, 7); gA.fill();
        gH.fillStyle = gray(0.62, 0.3); gH.beginPath(); gH.ellipse(X, Y, R, R * 1.3, 0, 0, 7); gH.fill();
      });
    }
    for (let i = 0; i < 90; i++) {           // mousse humide
      const x = r() * 256, y = r() * 2048, R = 4 + r() * 12;
      wrapB(x, y, R, R * 3, (X, Y) => { gA.fillStyle = rgb(70, 96, 40, 0.4 + r() * 0.3); gA.beginPath(); gA.ellipse(X, Y, R, R * 3, 0, 0, 7); gA.fill(); });
    }
  });
  // --- Écorce lisse et claire (grands arbres du dossel) : gris pâle, larges plaques de lichens ---
  inCol(1, () => {
    gA.fillStyle = "#9c968a"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.5); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 900; i++) {
      const x = r() * 256, y = r() * 2048, R = 3 + r() * 22, v = 120 + r() * 60;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = rgb(v, v * 0.97, v * 0.9, 0.18); gA.beginPath(); gA.ellipse(X, Y, R, R * (0.5 + r()), 0, 0, 7); gA.fill(); gH.fillStyle = gray(0.5 + (r() - 0.5) * 0.15, 0.25); gH.beginPath(); gH.ellipse(X, Y, R, R * 0.7, 0, 0, 7); gH.fill(); });
    }
    for (let i = 0; i < 110; i++) {          // lichens crustacés blancs et verdâtres
      const x = r() * 256, y = r() * 2048, R = 10 + r() * 34;
      const c = r() < 0.55 ? [226, 224, 210] : r() < 0.5 ? [168, 186, 140] : [120, 140, 96];
      wrapB(x, y, R, R * 2, (X, Y) => { gA.fillStyle = rgb(...c, 0.3 + r() * 0.35); gA.beginPath(); gA.ellipse(X, Y, R, R * (1 + r()), 0, 0, 7); gA.fill(); });
    }
    for (let i = 0; i < 30; i++) {           // cicatrices horizontales
      const x = r() * 256, y = r() * 2048, w = 14 + r() * 30;
      wrapB(x, y, w, 8, (X, Y) => { both((g, h) => { g.strokeStyle = h ? gray(0.2) : "rgba(50,46,40,0.6)"; g.lineWidth = 2 + r() * 2; g.beginPath(); g.moveTo(X - w / 2, Y); g.quadraticCurveTo(X, Y + 6, X + w / 2, Y); g.stroke(); }); });
    }
  });
  // --- Embaúba (Cecropia) : blanc grisâtre, anneaux réguliers (cicatrices des feuilles) ---
  inCol(2, () => {
    gA.fillStyle = "#c4c0b2"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.55); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 400; i++) {
      const x = r() * 256, y = r() * 2048, R = 4 + r() * 18, v = 170 + r() * 50;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = rgb(v, v * 0.98, v * 0.92, 0.3); gA.fillRect(X, Y, R * 2, R * 0.8); });
    }
    for (let y = 0; y < 2048; y += 64) {     // anneaux
      const yy = y + r() * 8;
      both((g, h) => { g.fillStyle = h ? gray(0.15) : "rgba(70,66,58,0.75)"; g.fillRect(0, yy, 256, 2.5); g.fillStyle = h ? gray(0.8) : "rgba(230,228,220,0.6)"; g.fillRect(0, yy + 3, 256, 3); });
    }
    for (let i = 0; i < 120; i++) {          // lichens roses et blancs
      const x = r() * 256, y = r() * 2048, R = 6 + r() * 16;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = r() < 0.5 ? rgb(214, 180, 176, 0.45) : rgb(236, 236, 228, 0.5); gA.beginPath(); gA.ellipse(X, Y, R, R * 0.8, 0, 0, 7); gA.fill(); });
    }
  });
  // --- Stipe de palmier : bandes annulaires (cicatrices des palmes), fibres verticales ---
  inCol(3, () => {
    gA.fillStyle = "#77705f"; gA.fillRect(0, 0, 256, 2048);
    gH.fillStyle = gray(0.45); gH.fillRect(0, 0, 256, 2048);
    for (let i = 0; i < 1600; i++) {         // fibres
      const x = r() * 256, y = r() * 2048, L = 10 + r() * 40, v = 90 + r() * 60;
      wrapB(x, y, 2, L, (X, Y) => { gA.fillStyle = rgb(v, v * 0.95, v * 0.82, 0.35); gA.fillRect(X, Y, 1.5, L); gH.fillStyle = gray(0.4 + r() * 0.3, 0.4); gH.fillRect(X, Y, 1.5, L); });
    }
    for (let y = 0; y < 2048; y += 32) {     // anneaux rapprochés
      const yy = y + r() * 4, th = 3 + r() * 3;
      both((g, h) => { g.fillStyle = h ? gray(0.12) : "rgba(46,40,30,0.7)"; g.fillRect(0, yy, 256, th); g.fillStyle = h ? gray(0.75) : "rgba(170,164,140,0.45)"; g.fillRect(0, yy + th, 256, 4); });
    }
    for (let i = 0; i < 70; i++) {
      const x = r() * 256, y = r() * 2048, R = 6 + r() * 18;
      wrapB(x, y, R, R, (X, Y) => { gA.fillStyle = r() < 0.6 ? rgb(196, 198, 182, 0.4) : rgb(80, 104, 50, 0.45); gA.beginPath(); gA.ellipse(X, Y, R, R * 1.4, 0, 0, 7); gA.fill(); });
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
    drip: (g, L, W) => { g.moveTo(0, 0); g.bezierCurveTo(L * 0.2, -W, L * 0.62, -W * 0.95, L * 0.84, -W * 0.22); g.lineTo(L, 0); g.lineTo(L * 0.84, W * 0.22); g.bezierCurveTo(L * 0.62, W * 0.95, L * 0.2, W, 0, 0); },
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
  // Grandes feuilles vernissées à pointe d'égouttement (sous-étage, figuiers)
  spray("oakLeaves", { side: 5, sideLen: 200, perMain: 6, perSide: 4, L: 82, W: 0.36, spread: 0.55, shape: SH.drip, twig: "#4a4230", cols: [[38, 76, 24], [50, 88, 28], [32, 64, 20], [58, 96, 34]] });
  // Feuilles du dossel : moyennes, ovales, vert olive
  spray("beechLeaves", { side: 8, sideLen: 220, perMain: 12, perSide: 8, L: 44, W: 0.4, spread: 0.8, shape: SH.drip, twig: "#4e4234", cols: [[62, 98, 32], [76, 110, 36], [54, 88, 28], [88, 116, 42]] });
  // Feuilles composées (légumineuses : angelim, fromager, ipê) : nombreuses petites folioles
  spray("birchLeaves", { side: 10, sideLen: 200, perMain: 22, perSide: 14, L: 19, W: 0.42, spread: 1.25, shape: SH.oval, twig: "#3e3628", cols: [[74, 114, 38], [88, 128, 44], [64, 102, 34], [98, 134, 50]] });
  // Palme pennée (açaí, paxiúba) : rachis central, longues folioles étroites et retombantes
  inTile("willow", () => {
    for (const [g, h] of [[gA, false], [gH, true]]) { g.strokeStyle = h ? gray(0.75) : "#7a8a3a"; g.lineWidth = 5; g.beginPath(); g.moveTo(256, 508); g.lineTo(256, 4); g.stroke(); }
    const n = 30;
    for (let i = 0; i < n; i++) {
      const t = i / n, y = 500 - t * 490;
      const L = 236 * Math.sin(Math.PI * (0.18 + t * 0.78)) * (0.9 + r() * 0.15);
      for (const s of [-1, 1]) {
        const th = 0.42 + r() * 0.2, ex = 256 + s * Math.cos(th) * L, ey = y - Math.sin(th) * L * 0.55 + L * 0.25;
        const c = [[60, 104, 34], [72, 116, 40], [52, 92, 30]][(r() * 3) | 0], k = 0.75 + r() * 0.4;
        for (const [g, hh] of [[gA, false], [gH, true]]) {
          g.strokeStyle = hh ? gray(0.55 + r() * 0.35) : rgb(c[0] * k, c[1] * k, c[2] * k); g.lineCap = "round";
          g.lineWidth = 9 * (1 - t * 0.4);
          g.beginPath(); g.moveTo(256, y); g.quadraticCurveTo(256 + s * L * 0.55, y - L * 0.32, ex, ey); g.stroke();
          if (!hh) { g.strokeStyle = rgb(c[0] * k * 1.4 + 20, c[1] * k * 1.3 + 20, c[2] * k + 10, 0.4); g.lineWidth = 1; g.beginPath(); g.moveTo(256, y); g.quadraticCurveTo(256 + s * L * 0.55, y - L * 0.32, ex, ey); g.stroke(); }
        }
      }
    }
  });
  // Palme en éventail (buriti) : segments rayonnants plissés, pointes fendues
  inTile("needles", () => {
    const n = 46;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI * (0.06 + 0.88 * (i / (n - 1))) + (r() - 0.5) * 0.04;
      const L = 0.82 + r() * 0.18;
      const ex = 256 + Math.cos(a) * 246 * L, ey = 500 + Math.sin(a) * 490 * L;
      const c = [[66, 104, 40], [80, 118, 46], [58, 94, 36]][(r() * 3) | 0], k = 0.8 + r() * 0.35;
      for (const [g, hh] of [[gA, false], [gH, true]]) {
        g.strokeStyle = hh ? gray(i % 2 ? 0.85 : 0.35) : rgb(c[0] * k, c[1] * k, c[2] * k); g.lineCap = "round";
        g.lineWidth = 16 * (0.6 + 0.4 * Math.abs(Math.cos(a)) * 0.5 + 0.3);
        g.beginPath(); g.moveTo(256, 500); g.lineTo(ex, ey); g.stroke();
        if (!hh && r() < 0.5) { g.strokeStyle = rgb(130, 128, 70, 0.8); g.lineWidth = 3; g.beginPath(); g.moveTo(ex, ey); g.lineTo(ex + Math.cos(a + 0.3) * 30, ey + Math.sin(a + 0.3) * 40); g.stroke(); }
      }
    }
    for (const [g, hh] of [[gA, false], [gH, true]]) { g.fillStyle = hh ? gray(0.6) : "#6a7a3a"; g.beginPath(); g.arc(256, 500, 22, 0, 7); g.fill(); }
  });
  // Embaúba : grandes feuilles palmées, profondément lobées, revers argenté
  inTile("pineNeedles", () => {
    const cx = 256, cy = 290;
    for (const [g, hh] of [[gA, false], [gH, true]]) { g.strokeStyle = hh ? gray(0.7) : "#8a6a3a"; g.lineWidth = 7; g.beginPath(); g.moveTo(256, 508); g.lineTo(cx, cy); g.stroke(); }
    const lobes = 9;
    for (let i = 0; i < lobes; i++) {
      const a = -Math.PI / 2 + (i - (lobes - 1) / 2) * (Math.PI * 1.55 / (lobes - 1)) + (r() - 0.5) * 0.08;
      const L = (175 + r() * 40) * (1 - Math.abs(i - (lobes - 1) / 2) / lobes * 0.55);
      const k = 0.8 + r() * 0.3;
      leaf(cx, cy, a, L, L * 0.17, SH.oval, [84 * k, 118 * k, 56 * k], 1);
      gA.strokeStyle = "rgba(200,210,190,0.35)"; gA.lineWidth = 2.5;
      gA.beginPath(); gA.moveTo(cx, cy); gA.lineTo(cx + Math.cos(a) * L, cy + Math.sin(a) * L); gA.stroke();
    }
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
      const a = r() * 6.283, d = Math.sqrt(r()) * 165, x = 215 + Math.cos(a) * d, y = 215 + Math.sin(a) * d;
      leaf(x, y, r() * 6.283, 22 + r() * 12, 10 + r() * 4, SH.oval, [[50, 92, 30], [66, 108, 36], [42, 80, 26]][(r() * 3) | 0], 0.75 + r() * 0.4);
    }
    gA.fillStyle = "#ffffff"; gA.fillRect(446, 446, 58, 58);
    gH.fillStyle = gray(0.5); gH.fillRect(446, 446, 58, 58);
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

  // Contrefort : lame de bois triangulaire, concave, qui part du tronc jusqu'au sol (épaisseur th)
  fin(f, uvr, color, lod) {
    const n = lod ? 3 : 6, dir = new THREE.Vector3(Math.cos(f.a), 0, Math.sin(f.a)), side = new THREE.Vector3(-dir.z, 0, dir.x);
    const [u0, u1] = uvr, um = (u0 + u1) / 2, uw = (u1 - u0) * 0.25;
    const top = [], bot = [];
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      const out = f.R * 0.7 + (f.L + f.R * 0.3) * t;
      const y = -0.3 + (f.h + 0.3) * Math.pow(1 - t, 2.2) + 0.15 * (1 - t);
      top.push(dir.clone().multiplyScalar(out).setY(y)); bot.push(dir.clone().multiplyScalar(out).setY(-0.35));
    }
    const thick = (t) => f.th * (1 - t * 0.7);
    const c = color.clone().multiplyScalar(0.85);
    for (const s of [-1, 1]) {
      const nrm = side.clone().multiplyScalar(s);
      for (let k = 0; k < n; k++) {
        const t0 = k / n, t1 = (k + 1) / n;
        const a = top[k].clone().addScaledVector(side, s * thick(t0)), b = top[k + 1].clone().addScaledVector(side, s * thick(t1));
        const cc = bot[k].clone().addScaledVector(side, s * thick(t0)), d = bot[k + 1].clone().addScaledVector(side, s * thick(t1));
        const ua = um + s * uw * t0, ub = um + s * uw * t1;
        const q = [[a, ua, a.y * 0.25], [cc, ua, cc.y * 0.25], [b, ub, b.y * 0.25], [d, ub, d.y * 0.25]];
        const tri = s > 0 ? [0, 1, 2, 2, 1, 3] : [0, 2, 1, 2, 3, 1];
        for (const i of tri) this.v(q[i][0], nrm, q[i][1], q[i][2], c);
      }
    }
    for (let k = 0; k < n; k++) {   // arête supérieure
      const t0 = k / n, t1 = (k + 1) / n;
      const a1 = top[k].clone().addScaledVector(side, thick(t0)), a2 = top[k].clone().addScaledVector(side, -thick(t0));
      const b1 = top[k + 1].clone().addScaledVector(side, thick(t1)), b2 = top[k + 1].clone().addScaledVector(side, -thick(t1));
      const nrm = new THREE.Vector3(0, 1, 0);
      for (const [p, u] of [[a1, u0], [b1, u0], [a2, u0 + uw], [a2, u0 + uw], [b1, u0], [b2, u0 + uw]]) this.v(p, nrm, u, p.y * 0.25, c);
    }
  }

  // Palme : pennée (deux demi-cartes en V le long du rachis courbe) ou en éventail (pétiole + éventail plié)
  frond(f, uvr, color, crown, lod, sway, stiff, barkUV) {
    const [u0, u1, v0, v1] = uvr, um = (u0 + u1) / 2;
    const up = new THREE.Vector3(0, 1, 0);
    const c = f.dead ? new THREE.Color(0.62, 0.46, 0.26) : color;
    const pts = lod ? f.pts.filter((_, i) => i % 2 === 0 || i === f.pts.length - 1) : f.pts;
    const flexAt = (p, t) => [sway(p) * 1.05, (0.3 + t) / stiff];
    if (f.fan) {
      this.tube(pts, pts.map((_, i) => 0.06 - i * 0.008), 3, barkUV, f.dead ? new THREE.Color(0.5, 0.4, 0.28) : new THREE.Color(0.55, 0.6, 0.35), 0.3, (i) => flexAt(pts[i], i / pts.length * 0.5));
      const e = pts[pts.length - 1], d = e.clone().sub(pts[pts.length - 2]).normalize();
      let right = new THREE.Vector3().crossVectors(d, up);
      if (right.lengthSq() < 0.01) right.set(1, 0, 0); else right.normalize();
      const S = f.size, wind = flexAt(e, 0.8);
      const rL = right.clone().applyAxisAngle(d, -f.fold), rR = right.clone().applyAxisAngle(d, f.fold);
      this.card(e.clone().addScaledVector(d, S * 0.48).addScaledVector(rL, -S * 0.25), rL, d, S * 0.5, S, [u0, um, v0, v1], c, crown, 0.4, wind);
      this.card(e.clone().addScaledVector(d, S * 0.48).addScaledVector(rR, S * 0.25), rR, d, S * 0.5, S, [um, u1, v0, v1], c, crown, 0.4, wind);
      return;
    }
    // rachis
    if (!lod) this.tube(pts, pts.map((_, i) => 0.035 * (1 - i / pts.length * 0.8)), 3, barkUV, new THREE.Color(0.55, 0.62, 0.35), 0.3, (i) => flexAt(pts[i], i / pts.length));
    const n = pts.length - 1;
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[i + 1], t = i / n;
      const dseg = b.clone().sub(a); const len = dseg.length(); dseg.normalize();
      let right = new THREE.Vector3().crossVectors(dseg, up);
      if (right.lengthSq() < 0.01) right.set(1, 0, 0); else right.normalize();
      const mid = a.clone().lerp(b, 0.5), W = f.W;
      const va = v0 + (v1 - v0) * t, vb = v0 + (v1 - v0) * ((i + 1) / n);
      const wind = flexAt(mid, t);
      const rL = right.clone().applyAxisAngle(dseg, -f.fold), rR = right.clone().applyAxisAngle(dseg, f.fold);
      const hh = len * 1.04;
      this.card(mid.clone().addScaledVector(rL, -W / 2), rL, dseg, W, hh, [u0, um, va, vb], c, crown, 0.45, wind);
      this.card(mid.clone().addScaledVector(rR, W / 2), rR, dseg, W, hh, [um, u1, va, vb], c, crown, 0.45, wind);
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
// Forêt amazonienne de terre ferme et de várzea, par étages : émergents (sumaúma, castanheira), dossel (angelim,
// arbres à feuilles vernissées, figuiers étrangleurs), pionniers (embaúba), palmiers (açaí, buriti, paxiúba), sous-étage.
// bark : colonne d'écorce, barkTint, leaf : tuile de feuillage, leafSize : taille d'une carte (m),
// stiff : raideur au vent (plus grand = moins de balancement)
export const SPECIES = {
  sumauma:     { bark: "beechBark", barkTint: 0xdedad0, leaf: "birchLeaves", leafTint: 0xd0e0a0, leafSize: 3.4, stiff: 2.4 },
  castanheira: { bark: "oakBark", barkTint: 0xcfc2ae, leaf: "beechLeaves", leafTint: 0xd8e4a8, leafSize: 3.1, stiff: 2.0 },
  angelim:     { bark: "oakBark", barkTint: 0xd8ccb8, leaf: "birchLeaves", leafTint: 0xc4d894, leafSize: 2.9, stiff: 1.8 },
  dossel:      { bark: "beechBark", barkTint: 0xc8c4b8, leaf: "beechLeaves", leafTint: 0xd0e09c, leafSize: 2.6, stiff: 1.5 },
  apui:        { bark: "beechBark", barkTint: 0xa8a298, leaf: "oakLeaves", leafTint: 0xd0e0a0, leafSize: 2.5, stiff: 1.6 },
  embauba:     { bark: "birch", barkTint: 0xb4b0a4, leaf: "pineNeedles", leafTint: 0xe4eec4, leafSize: 1.9, stiff: 0.8 },
  acai:        { bark: "pineBark", barkTint: 0xb8b4a0, leaf: "willow", leafTint: 0xd8e8b0, stiff: 0.7, palm: true },
  buriti:      { bark: "pineBark", barkTint: 0x9c9484, leaf: "needles", leafTint: 0xd8e4b0, stiff: 1.1, palm: true },
  paxiuba:     { bark: "pineBark", barkTint: 0xc4c0b0, leaf: "willow", leafTint: 0xd0e4a8, stiff: 0.9, palm: true },
  sousbois:    { bark: "beechBark", barkTint: 0xb8b0a0, leaf: "oakLeaves", leafTint: 0xd8e8a8, leafSize: 1.5, stiff: 0.7 },
  dead:        { bark: "oakBark", barkTint: 0xa8a49c, leaf: null, stiff: 2.0 },
};

// Squelette : liste de branches (points, rayons, niveau) et de points d'attache des feuilles.
function skeleton(kind, seed) {
  const rand = mulberry32(seed * 7919 + kind.length * 131);
  const sp = SPECIES[kind];
  const S = { branches: [], leaves: [], fins: [], fronds: [], kind, height: 0 };
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

  // Contreforts : grandes lames de bois qui partent du tronc (typiques des arbres de la forêt tropicale)
  const fins = (n, R, h, L) => {
    const a0 = rand() * 6.283;
    for (let i = 0; i < n; i++) S.fins.push({ a: a0 + (i / n) * 6.283 + (rand() - 0.5) * 0.5, R, h: h * (0.6 + rand() * 0.6), L: L * (0.6 + rand() * 0.7), th: 0.12 + R * 0.12 });
  };
  // Palme : courbe qui part du cœur du palmier et retombe ; width = demi-largeur max (folioles), fold = folioles en V
  const frond = (p0, d0, L, o) => {
    const n = o.fan ? 3 : 7;
    const pts = [p0.clone()];
    let d = d0.clone().normalize(), p = p0.clone();
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      d.y -= (o.droop ?? 0.35) * (1 / n) * (1 + t * 1.6); d.normalize();
      p = p.clone().addScaledVector(d, L / n); pts.push(p);
    }
    S.fronds.push({ pts, W: o.width ?? 0.8, fold: o.fold ?? 0.5, fan: !!o.fan, size: o.size ?? 3, dead: !!o.dead });
  };
  const crownOfFronds = (top, count, L, o) => {
    for (let i = 0; i < count; i++) {
      const a = i * 2.39996 + rand() * 0.4, k = i / count;
      const el = (o.el0 ?? 1.6) - k * (o.elSpan ?? 1.9) + (rand() - 0.5) * 0.3;
      frond(top.clone().add(V(0, -k * (o.drop ?? 0.4), 0)), V(Math.cos(a), el, Math.sin(a)), L * (0.85 + rand() * 0.3) * (1 - k * 0.15), o);
    }
  };

  if (kind === "sumauma") {
    // Sumaúma (Ceiba pentandra) : géant émergent, fût lisse et clair, contreforts immenses, houppier en parasol
    const H = 40 + rand() * 8, R = 1.25 + rand() * 0.3;
    const tr = trunk(H, R, R * 0.45, 0.06, 0.04);
    fins(7 + Math.floor(rand() * 3), R, 5 + rand() * 2.5, 4.5 + rand() * 2);
    const o = { kids: [0, 4, 4, 0], start: [0, 0.25, 0.3], angle: [0, 0.7, 0.8], lenK: [0, 0.5, 0.48], lift: [0, 0.18, 0.2], bend: [0, 0.1, 0.25], leavesPer: 3, leafUp: 0.7, taper: 0.4 };
    const limbs = 6 + Math.floor(rand() * 3);
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.5;
      const { p, r } = at(tr, 0.8 + rand() * 0.18);
      const L = 13 * (0.75 + rand() * 0.45);
      ramify(branch(p, V(Math.cos(a), 0.28 + rand() * 0.3, Math.sin(a)), L, r * 0.7, r * 0.15, 1, { bend: 0.15, wob: 0.22 }), 1, 3, o);
    }
    const top = at(tr, 1);
    ramify(branch(top.p, V(0, 1, 0), 6, top.r * 0.8, 0.06, 1, { bend: 0.05 }), 1, 3, o);
  } else if (kind === "castanheira" || kind === "angelim" || kind === "dossel") {
    // Castanheira (noyer du Brésil) : fût droit très haut, houppier compact au sommet ;
    // angelim : grand arbre du dossel à feuilles composées ; dossel : arbre « moyen » à feuilles vernissées
    const cast = kind === "castanheira", ang = kind === "angelim";
    const H = cast ? 31 + rand() * 7 : ang ? 24 + rand() * 6 : 16 + rand() * 7;
    const R = cast ? 0.85 + rand() * 0.2 : ang ? 0.68 + rand() * 0.15 : 0.42 + rand() * 0.12;
    const tr = trunk(H, R, R * 0.55, 0.12, 0.08);
    fins(cast ? 4 : 5, R, cast ? 1.6 : ang ? 3.2 : 1.6, cast ? 1.5 : ang ? 2.8 : 1.3);
    const o = { kids: [0, 4, 4, 0], start: [0, 0.25, 0.3], angle: [0, 0.65, 0.8], lenK: [0, 0.5, 0.5], lift: [0, 0.2, 0.15], bend: [0, 0.25, 0.25], leavesPer: 3, leafUp: 0.45, taper: 0.45 };
    const limbs = cast ? 5 + Math.floor(rand() * 2) : 6 + Math.floor(rand() * 3);
    const t0 = cast ? 0.76 : ang ? 0.62 : 0.5;
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.6;
      const { p, r } = at(tr, t0 + rand() * (0.98 - t0));
      const d = V(Math.cos(a), (cast ? 0.75 : 0.45) + rand() * 0.45, Math.sin(a));
      const L = (cast ? 9.5 : ang ? 9 : 7) * (0.75 + rand() * 0.45);
      ramify(branch(p, d, L, r * 0.7, r * 0.15, 1, { bend: 0.2, wob: 0.25 }), 1, 3, o);
    }
    const top = at(tr, 1);
    ramify(branch(top.p, V((rand() - 0.5) * 0.4, 1, (rand() - 0.5) * 0.4), (cast ? 6 : 5) * (0.8 + rand() * 0.3), top.r * 0.8, 0.04, 1, { bend: 0.1 }), 1, 3, o);
  } else if (kind === "apui") {
    // Apuí (figuier étrangleur) : treillis de racines qui enserrent le tronc, racines aériennes pendantes, large houppier
    const H = 17 + rand() * 6, R = 0.95 + rand() * 0.25;
    const tr = trunk(H, R, R * 0.6, 0.15, 0.1);
    const strands = 12 + Math.floor(rand() * 5);
    for (let i = 0; i < strands; i++) {
      const a0 = rand() * 6.283, twist = (rand() - 0.5) * 1.6, top = 0.35 + rand() * 0.45;
      const pts = [], radii = [];
      for (let k = 0; k <= 8; k++) {
        const t = k / 8, { p, r } = at(tr, t * top), a = a0 + twist * t;
        const out = r * 1.05 + 0.06 + (k === 0 ? 0.5 + rand() * 0.6 : 0);
        pts.push(V(p.x + Math.cos(a) * out, k === 0 ? -0.3 : p.y, p.z + Math.sin(a) * out)); radii.push((0.16 - t * 0.09) * (0.6 + rand() * 0.6));
      }
      S.branches.push({ pts, radii, level: 0, len: H * top, root: true });
    }
    const o = { kids: [0, 4, 4, 0], start: [0, 0.2, 0.3], angle: [0, 0.75, 0.8], lenK: [0, 0.55, 0.5], lift: [0, 0.12, 0.12], bend: [0, 0.2, 0.3], leavesPer: 3, leafUp: 0.3, taper: 0.4 };
    const limbs = 7;
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.5;
      const { p, r } = at(tr, 0.7 + rand() * 0.28);
      const limb = branch(p, V(Math.cos(a), 0.35 + rand() * 0.35, Math.sin(a)), 10 * (0.8 + rand() * 0.4), r * 0.65, r * 0.15, 1, { bend: 0.2, wob: 0.25 });
      ramify(limb, 1, 3, o);
      // racines aériennes qui pendent de la branche
      for (let k = 0; k < 2; k++) {
        const q = at(limb, 0.3 + rand() * 0.5), len = Math.max(1.5, q.p.y * (0.4 + rand() * 0.55));
        S.branches.push({ pts: [q.p.clone(), q.p.clone().add(V((rand() - 0.5) * 0.3, -len * 0.5, (rand() - 0.5) * 0.3)), q.p.clone().add(V((rand() - 0.5) * 0.5, -len, (rand() - 0.5) * 0.5))], radii: [0.035, 0.025, 0.015], level: 3, len, hangRoot: true });
      }
    }
  } else if (kind === "embauba") {
    // Embaúba (Cecropia) : pionnière des berges et des trouées, tronc fin et blanc annelé, racines-échasses,
    // quelques branches en candélabre portant des bouquets de grandes feuilles palmées argentées
    const H = 12 + rand() * 6, R = 0.17 + rand() * 0.05;
    const tr = trunk(H, R, R * 0.6, 0.45, 0.15);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * 6.283 + rand() * 0.6, h0 = 0.9 + rand() * 0.8, out = 0.7 + rand() * 0.5;
      S.branches.push({ pts: [V(Math.cos(a) * R * 0.5, h0, Math.sin(a) * R * 0.5), V(Math.cos(a) * out * 0.55, h0 * 0.45, Math.sin(a) * out * 0.55), V(Math.cos(a) * out, -0.3, Math.sin(a) * out)], radii: [R * 0.4, R * 0.35, R * 0.3], level: 0, len: 2, root: true });
    }
    const tips = [at(tr, 1)];
    const nb = 3 + Math.floor(rand() * 3);
    for (let i = 0; i < nb; i++) {
      const a = (i / nb) * 6.283 + rand() * 0.6;
      const { p, r } = at(tr, 0.72 + rand() * 0.2);
      const b = branch(p, V(Math.cos(a), 0.55, Math.sin(a)), 3 + rand() * 1.8, r * 0.6, r * 0.35, 1, { bend: 1.4, wob: 0.1 });
      tips.push(at(b, 1));
    }
    for (const tp of tips) {
      const n = 6 + Math.floor(rand() * 3);
      for (let k = 0; k < n; k++) {
        const a = (k / n) * 6.283 + rand() * 0.4;
        leafAt(tp.p.clone().add(V(Math.cos(a) * 0.2, -0.1 - rand() * 0.25, Math.sin(a) * 0.2)), V(Math.cos(a), -0.25 + rand() * 0.3, Math.sin(a)), sp.leafSize * (0.8 + rand() * 0.4), { palmate: true });
      }
      leafAt(tp.p.clone().add(V(0, 0.1, 0)), V(rand() - 0.5, 1.5, rand() - 0.5), sp.leafSize * 0.6, { palmate: true });
    }
  } else if (kind === "acai") {
    // Açaí : touffe de stipes fins et élancés, palmes aux folioles pendantes, gaine verte en haut du stipe
    const stems = 3 + Math.floor(rand() * 4);
    for (let s = 0; s < stems; s++) {
      const a = rand() * 6.283, o = s ? 0.3 + rand() * 0.6 : 0;
      const H = (s ? 9 : 13) + rand() * 6;
      const base = V(Math.cos(a) * o, -0.4, Math.sin(a) * o);
      const st = branch(base, V(Math.cos(a) * 0.12 + (rand() - 0.5) * 0.1, 1, Math.sin(a) * 0.12 + (rand() - 0.5) * 0.1), H, 0.1, 0.075, 0, { bend: 0.05, wob: 0.03 });
      st.palmStem = true; st.shaft = 1.4;
      crownOfFronds(at(st, 1).p, 9 + Math.floor(rand() * 3), 2.6 + rand() * 0.6, { width: 0.7, fold: 1.15, droop: 0.55, el0: 1.8, elSpan: 2.0, drop: 0.3 });
    }
  } else if (kind === "paxiuba") {
    // Paxiúba (Socratea) : palmier sur un cône de racines-échasses épineuses
    const H = 14 + rand() * 6;
    const st = branch(V(0, 1.6, 0), V((rand() - 0.5) * 0.1, 1, (rand() - 0.5) * 0.1), H, 0.13, 0.1, 0, { bend: 0.03, wob: 0.03 });
    st.palmStem = true; st.shaft = 1.6;
    const nr = 10 + Math.floor(rand() * 5);
    for (let i = 0; i < nr; i++) {
      const a = (i / nr) * 6.283 + rand() * 0.4, h0 = 0.6 + rand() * 1.9, out = 0.8 + rand() * 0.8;
      S.branches.push({ pts: [V(Math.cos(a) * 0.08, h0 + 0.3, Math.sin(a) * 0.08), V(Math.cos(a) * out * 0.5, h0 * 0.5, Math.sin(a) * out * 0.5), V(Math.cos(a) * out, -0.3, Math.sin(a) * out)], radii: [0.05, 0.045, 0.04], level: 0, len: 2, root: true, stilt: true });
    }
    crownOfFronds(at(st, 1).p, 7 + Math.floor(rand() * 2), 3.4 + rand() * 0.8, { width: 0.9, fold: 0.5, droop: 0.4, el0: 1.9, elSpan: 1.8, drop: 0.3 });
  } else if (kind === "buriti") {
    // Buriti (Mauritia flexuosa) : stipe épais des marais, couronne sphérique de palmes en éventail, jupe de palmes sèches
    const H = 16 + rand() * 7;
    const st = branch(V(0, -0.4, 0), V((rand() - 0.5) * 0.08, 1, (rand() - 0.5) * 0.08), H, 0.38, 0.3, 0, { bend: 0.02, wob: 0.02 });
    st.palmStem = true;
    const top = at(st, 1).p;
    const n = 13 + Math.floor(rand() * 4);
    for (let i = 0; i < n; i++) {
      const a = i * 2.39996 + rand() * 0.3, k = i / n;
      frond(top.clone().add(V(0, -k * 0.6, 0)), V(Math.cos(a), 1.6 - k * 2.0 + (rand() - 0.5) * 0.3, Math.sin(a)), 2.4 + rand() * 1.2, { fan: true, droop: 0.2, size: 3.6 + rand() * 0.8, fold: 0.35 });
    }
    for (let i = 0; i < 5; i++) {
      const a = rand() * 6.283;
      frond(top.clone().add(V(0, -1.2, 0)), V(Math.cos(a) * 0.4, -1, Math.sin(a) * 0.4), 1.2, { fan: true, droop: 0, size: 2.6, fold: 0.6, dead: true });
    }
  } else if (kind === "sousbois") {
    // Sous-étage : petit arbre grêle à grandes feuilles, dans la pénombre
    const H = 3.5 + rand() * 4.5, R = 0.06 + rand() * 0.04;
    const tr = trunk(H, R, R * 0.6, 0.5, 0.2);
    const o = { kids: [0, 3, 0], start: [0, 0.3], angle: [0, 0.6], lenK: [0, 0.5], lift: [0, 0.1], bend: [0, 0.3], leavesPer: 4, leafUp: 0.2 };
    const limbs = 3 + Math.floor(rand() * 2);
    for (let i = 0; i < limbs; i++) {
      const a = (i / limbs) * 6.283 + rand() * 0.7;
      const { p, r } = at(tr, 0.45 + rand() * 0.5);
      ramify(branch(p, V(Math.cos(a) * 0.8, 0.8, Math.sin(a) * 0.8), 2 + rand() * 1.4, r * 0.7, 0.012, 1, { bend: 0.1, wob: 0.2 }), 1, 2, o);
    }
    const top = at(tr, 1);
    ramify(branch(top.p, V(0, 1, 0), 1.6, top.r * 0.8, 0.01, 1, {}), 1, 2, o);
  } else if (kind === "dead") {
    const H = 7 + rand() * 7, R = 0.32 + rand() * 0.15;
    const tr = trunk(H, R, R * 0.45, 0.5, 0.3);
    roots(4, R, 1.2);
    for (let i = 0; i < 12; i++) {
      const t = 0.3 + rand() * 0.68;
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
  // les palmes comptent comme du feuillage (centre et rayon du houppier)
  const fol = S.leaves.map((l) => ({ p: l.p, size: l.size }));
  for (const f of S.fronds) for (const p of f.pts) fol.push({ p, size: f.fan ? f.size : 0.5 });
  for (const l of fol) { c.add(l.p); maxY = Math.max(maxY, l.p.y + l.size * 0.5); }
  if (fol.length) c.divideScalar(fol.length); else c.set(0, maxY * 0.7, 0);
  let rad = 0;
  for (const l of fol) rad = Math.max(rad, Math.hypot(l.p.x - c.x, l.p.z - c.z) + (l.size > 1 ? l.size * 0.4 : 0));
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
    if (lod >= 1 && br.hangRoot) continue;
    if (lod >= 1 && br.root && lod === 2) continue;
    let pts = br.pts, radii = br.radii;
    if (lod >= 1 && pts.length > 4) { const keep = pts.map((_, i) => i).filter((i) => i % 2 === 0 || i === pts.length - 1); pts = keep.map((i) => br.pts[i]); radii = keep.map((i) => br.radii[i]); }
    let seg = br.level === 0 ? (lod ? 6 : br.radii[0] > 0.9 ? 14 : 10) : br.radii[0] > 0.12 ? (lod ? 4 : 6) : lod ? 3 : 4;
    if (br.root) seg = lod ? 4 : 6;
    if (br.hangRoot) seg = 3;
    if (br.palmStem) seg = lod ? 6 : br.radii[0] > 0.3 ? 12 : 8;
    if (br.flare) radii = radii.map((r, i) => r * (1 + 0.55 * Math.exp(-(i / (radii.length - 1)) * 9)));
    const start = br.pts[0];
    const flexAt = (i) => [sway(pts[i]), br.level === 0 ? 0 : Math.min(1, pts[i].distanceTo(start) / 6) * (0.4 + br.level * 0.3) / stiff];
    // açaí, paxiúba : gaine foliaire lisse et verte en haut du stipe
    const topY = br.pts[br.pts.length - 1].y;
    const colorAt = br.shaft ? (i) => (pts[i].y > topY - br.shaft ? tint(0x7a9a4a) : barkC) : null;
    if (br.shaft) radii = radii.map((r, i) => (pts[i].y > topY - br.shaft ? r * 1.35 : r));
    b.tube(pts, radii, seg, barkUV, br.level === 0 ? barkC : barkC.clone().multiplyScalar(0.95), null, flexAt, colorAt);
  }
  // contreforts
  for (const f of S.fins) b.fin(f, barkUV, barkC, lod);
  if (!sp.leaf) return b.build();
  const leafUV = UV[sp.leaf];
  const leafC = tint(sp.leafTint);
  const crown = S.crown;
  const big = S.kind === "embauba";
  const step = big ? (lod === 0 ? 1 : 2) : lod === 0 ? 1 : lod === 1 ? 3 : 4;
  const grow = big ? (lod === 0 ? 1 : 1.3) : lod === 0 ? 1 : lod === 1 ? 1.62 : 1.9;
  const up = V(0, 1, 0);
  // Palmes
  for (const f of S.fronds) b.frond(f, leafUV, leafC.clone().multiplyScalar(0.85 + rand() * 0.3), crown, lod, sway, stiff, barkUV);
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
    if (l.palmate) {
      // feuille palmée presque horizontale, vue de dessous à contre-jour
      b.card(center, right, d, size, size, leafUV, c, V(l.p.x, l.p.y - 2, l.p.z), 0.6, flex);
      return;
    }
    const ref = l.flat ? V(l.p.x * 0.3 + crown.x * 0.7, l.p.y - 0.8, l.p.z * 0.3 + crown.z * 0.7) : l.hang ? V(crown.x, l.p.y + 1.5, crown.z) : crown;
    if (l.hang) { b.card(center, right, d, size * 0.45, size, leafUV, c, ref, 0.2, flex); if (lod === 0) b.card(center, rot(right, d, 1.57), d, size * 0.45, size, leafUV, c, ref, 0.2, flex); return; }
    right.applyAxisAngle(d, l.flat ? (rand() - 0.5) * 1.2 : 0);
    b.card(center, right, d, size, size, leafUV, c, ref, l.flat ? 0.5 : 0.25, flex);
    if (lod === 0 || (lod === 1 && l.flat)) {
      // seconde carte croisée pour le volume (et pour que les conifères ne soient pas des « disques » de loin)
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

// Héliconia (« oiseau de paradis ») : grandes feuilles en pagaie sur de longs pétioles, bractées rouges et jaunes en zigzag.
export function makeShrub(seed = 61) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const stems = 6 + Math.floor(rand() * 4);
  const crown = V(0, 1.2, 0);
  for (let i = 0; i < stems; i++) {
    const a = rand() * Math.PI * 2, out = 0.2 + rand() * 0.5, H = 0.9 + rand() * 1.4;
    const p0 = V(Math.cos(a) * 0.1, -0.1, Math.sin(a) * 0.1), p1 = V(Math.cos(a) * out, H, Math.sin(a) * out);
    b.tube([p0, p0.clone().lerp(p1, 0.5), p1], [0.025, 0.02, 0.014], 4, UV.beechBark, tint(0x7a9a4a), null, (k) => [0, k * 0.4]);
    // feuille en pagaie : longue carte qui s'arque vers l'extérieur
    const d = V(Math.cos(a + (rand() - 0.5) * 0.6), 0.7 + rand() * 0.6, Math.sin(a + (rand() - 0.5) * 0.6)).normalize();
    let right = new THREE.Vector3().crossVectors(d, V(0, 1, 0)).normalize();
    right.applyAxisAngle(d, (rand() - 0.5) * 0.8);
    const L = 1.1 + rand() * 0.6;
    b.card(p1.clone().addScaledVector(d, L * 0.45), right, d, L * 0.45, L, UV.oakLeaves, tint(0xc0d890, 0.8 + rand() * 0.3), crown, 0.4, [0.1, 0.6]);
    if (i % 3 === 0) {
      // inflorescence pendante : bractées alternées rouge vif à pointe jaune
      const top = p1.clone().add(V(0, 0.05, 0));
      for (let k = 0; k < 7; k++) {
        const y = top.y - k * 0.07, s = k % 2 ? 1 : -1;
        b.w = [0.05, 0.5];
        b.blob(V(top.x + s * 0.06, y, top.z), 0.045, tint(0xd8201a, 0.9 + rand() * 0.2));
        b.blob(V(top.x + s * 0.1, y - 0.02, top.z), 0.022, tint(0xf0c020));
      }
      b.w = [0, 0];
    }
  }
  return b.build();
}

// Vitória-régia (Victoria amazonica) : feuille flottante ronde de 1,5 à 2,5 m, bord relevé rouge, nervures en relief.
export function makeLily(seed = 29) {
  const rand = mulberry32(seed);
  const b = new Builder();
  const W = UV.white;
  const pad = (cx, cz, R) => {
    const seg = 36, rings = 5;
    const ring = (k, rr, y) => { const a = (k / seg) * Math.PI * 2; return V(cx + Math.cos(a) * rr, y, cz + Math.sin(a) * rr); };
    const up = V(0, 1, 0);
    for (let r = 0; r < rings; r++) {
      const r0 = (r / rings) * R, r1 = ((r + 1) / rings) * R;
      for (let k = 0; k < seg; k++) {
        const vein = k % 3 === 0 ? 0.8 : 1;
        const c0 = tint(0x4a6e22, (0.75 + 0.2 * (r / rings)) * vein), c1 = tint(0x4a6e22, (0.75 + 0.2 * ((r + 1) / rings)) * vein);
        const a = ring(k, r0, 0), bb = ring(k + 1, r0, 0), c = ring(k, r1, 0), d = ring(k + 1, r1, 0);
        b.v(a, up, W[0], W[1], c0); b.v(c, up, W[0], W[1], c1); b.v(bb, up, W[0], W[1], c0);
        b.v(bb, up, W[0], W[1], c0); b.v(c, up, W[0], W[1], c1); b.v(d, up, W[0], W[1], c1);
      }
    }
    // rebord relevé : vert dedans, rouge pourpre dehors
    const H = 0.07 + R * 0.04;
    for (let k = 0; k < seg; k++) {
      const a = ring(k, R, 0), bb = ring(k + 1, R, 0), c = ring(k, R * 1.02, H), d = ring(k + 1, R * 1.02, H);
      const ang = (k / seg) * Math.PI * 2, n = V(-Math.cos(ang), 0.3, -Math.sin(ang)).normalize();
      const ci = tint(0x5a7a2a), co = tint(0x8a2238);
      b.v(a, n, W[0], W[1], ci); b.v(bb, n, W[0], W[1], ci); b.v(c, n, W[0], W[1], co);
      b.v(bb, n, W[0], W[1], ci); b.v(d, n, W[0], W[1], co); b.v(c, n, W[0], W[1], co);
    }
  };
  pad(0, 0, 1.0);
  pad(1.9 + rand() * 0.3, 0.6, 0.7 + rand() * 0.2);
  pad(-0.8, 1.8, 0.55);
  // une fleur blanche
  const f = V(0.9, 0.1, -1.0);
  for (let k = 0; k < 9; k++) b.blob(f.clone().add(V(Math.cos(k * 0.7) * 0.12, 0.04 + (k % 3) * 0.03, Math.sin(k * 0.7) * 0.12)), 0.07, tint(k < 3 ? 0xf0c8d8 : 0xf8f6f0));
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
  roughnessFactor = mix(0.95, 0.74, vLeaf);   // écorce mate, feuilles légèrement satinées`)
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
