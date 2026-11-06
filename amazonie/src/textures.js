// Matériaux du sol (PBR) dessinés au chargement, sans fichier image :
// 8 couches (herbe, litière de forêt tropicale, roche, sable de plage fluviale, terre rouge latéritique, neige (inutilisée), mousse, gravier),
// chacune avec couleur (albedo), hauteur (pour les transitions), normales, rugosité et occlusion.
import * as THREE from "three";
import { mulberry32 } from "./noise.js";

// Bruit de valeur périodique (raccord parfait) en plusieurs octaves
function tileNoise(S, cells, oct, seed) {
  const rand = mulberry32(seed);
  const out = new Float32Array(S * S);
  let amp = 1, norm = 0;
  for (let o = 0; o < oct; o++, cells *= 2, amp *= 0.5) {
    if (cells > S) break;
    const L = new Float32Array(cells * cells);
    for (let i = 0; i < L.length; i++) L[i] = rand();
    for (let y = 0; y < S; y++) {
      const gy = (y / S) * cells, y0 = Math.floor(gy), y1 = (y0 + 1) % cells;
      let fy = gy - y0; fy = fy * fy * (3 - 2 * fy);
      for (let x = 0; x < S; x++) {
        const gx = (x / S) * cells, x0 = Math.floor(gx), x1 = (x0 + 1) % cells;
        let fx = gx - x0; fx = fx * fx * (3 - 2 * fx);
        const a = L[y0 * cells + x0], b = L[y0 * cells + x1], c = L[y1 * cells + x0], d = L[y1 * cells + x1];
        out[y * S + x] += ((a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy) * amp;
      }
    }
    norm += amp;
  }
  for (let i = 0; i < out.length; i++) out[i] /= norm;
  return out;
}

// Dessine une forme en la répétant de l'autre côté des bords (texture raccordable)
function wrap(S, x, y, r, fn) {
  for (const dx of [-S, 0, S]) for (const dy of [-S, 0, S]) {
    const X = x + dx, Y = y + dy;
    if (X + r < 0 || X - r > S || Y + r < 0 || Y - r > S) continue;
    fn(X, Y);
  }
}

const rgb = (r, g, b, a = 1) => `rgba(${r | 0},${g | 0},${b | 0},${a})`;
const gray = (v, a = 1) => rgb(v * 255, v * 255, v * 255, a);

// Fond : couleur modulée par un bruit (canvas A) et hauteur de base (canvas H)
function fillNoise(S, gA, gH, cA, cB, seed, cells = 6, hk = 0.5, hb = 0.25) {
  const n = tileNoise(S, cells, 5, seed), m = tileNoise(S, cells * 4, 3, seed + 1);
  const ia = gA.createImageData(S, S), ih = gH.createImageData(S, S);
  for (let i = 0; i < S * S; i++) {
    const t = Math.min(1, Math.max(0, (n[i] - 0.5) * 1.8 + 0.5)), v = 0.85 + 0.3 * m[i];
    ia.data[i * 4] = (cA[0] + (cB[0] - cA[0]) * t) * v; ia.data[i * 4 + 1] = (cA[1] + (cB[1] - cA[1]) * t) * v; ia.data[i * 4 + 2] = (cA[2] + (cB[2] - cA[2]) * t) * v; ia.data[i * 4 + 3] = 255;
    const h = (hb + hk * (n[i] * 0.6 + m[i] * 0.4)) * 255;
    ih.data[i * 4] = ih.data[i * 4 + 1] = ih.data[i * 4 + 2] = h; ih.data[i * 4 + 3] = 255;
  }
  gA.putImageData(ia, 0, 0); gH.putImageData(ih, 0, 0);
}

const LAYERS = [
  // 0 Herbe rase (sol de prairie vu entre les brins et au loin)
  (S, gA, gH, r) => {
    fillNoise(S, gA, gH, [62, 78, 30], [96, 110, 44], 11, 5, 0.3, 0.15);
    gA.lineCap = gH.lineCap = "round";
    for (let i = 0; i < S * 9; i++) {
      const x = r() * S, y = r() * S, a = -Math.PI / 2 + (r() - 0.5) * 1.6, L = 4 + r() * 12;
      const dry = r() < 0.18, k = 0.7 + r() * 0.5;
      const col = dry ? [150 * k, 140 * k, 70 * k] : [(60 + r() * 50) * k, (95 + r() * 60) * k, (30 + r() * 25) * k];
      const ex = Math.cos(a) * L, ey = Math.sin(a) * L;
      wrap(S, x, y, L, (X, Y) => {
        gA.strokeStyle = rgb(...col); gA.lineWidth = 1 + r() * 1.4; gA.beginPath(); gA.moveTo(X, Y); gA.lineTo(X + ex, Y + ey); gA.stroke();
        gH.strokeStyle = gray(0.45 + r() * 0.5); gH.lineWidth = 1.2; gH.beginPath(); gH.moveTo(X, Y); gH.lineTo(X + ex, Y + ey); gH.stroke();
      });
    }
    // trèfles et petites feuilles
    for (let i = 0; i < 90; i++) {
      const x = r() * S, y = r() * S;
      wrap(S, x, y, 8, (X, Y) => { for (let k = 0; k < 3; k++) { const a = k * 2.1 + r(); gA.fillStyle = rgb(50, 105, 35); gA.beginPath(); gA.ellipse(X + Math.cos(a) * 3, Y + Math.sin(a) * 3, 3.2, 2.4, a, 0, 7); gA.fill(); gH.fillStyle = gray(0.85); gH.beginPath(); gH.ellipse(X + Math.cos(a) * 3, Y + Math.sin(a) * 3, 3.2, 2.4, a, 0, 7); gH.fill(); } });
    }
  },
  // 1 Litière forestière : feuilles mortes, aiguilles, brindilles, terre sombre
  (S, gA, gH, r) => {
    fillNoise(S, gA, gH, [52, 34, 22], [82, 54, 34], 21, 6, 0.25, 0.05);
    // grandes feuilles mortes du dossel : brun chocolat, rouille, ocre, quelques-unes encore vertes ou noircies
    const leafCols = [[120, 70, 34], [140, 84, 40], [96, 56, 30], [158, 104, 52], [70, 44, 28], [118, 66, 30], [96, 98, 50], [52, 36, 26]];
    for (let i = 0; i < 2200; i++) {
      const x = r() * S, y = r() * S, a = r() * 6.28, L = 9 + r() * 16, W = L * (0.3 + r() * 0.2);
      const c = leafCols[(r() * leafCols.length) | 0], k = 0.65 + r() * 0.5, hv = 0.45 + i / 2600 * 0.5;
      wrap(S, x, y, L, (X, Y) => {
        gA.save(); gA.translate(X, Y); gA.rotate(a);
        gA.fillStyle = rgb(c[0] * k, c[1] * k, c[2] * k);
        gA.beginPath(); gA.moveTo(-L, 0); gA.quadraticCurveTo(0, -W, L, 0); gA.quadraticCurveTo(0, W, -L, 0); gA.fill();
        gA.strokeStyle = rgb(c[0] * k * 0.6, c[1] * k * 0.6, c[2] * k * 0.6, 0.7); gA.lineWidth = 0.8; gA.beginPath(); gA.moveTo(-L, 0); gA.lineTo(L, 0); gA.stroke();
        gA.restore();
        gH.save(); gH.translate(X, Y); gH.rotate(a);
        gH.fillStyle = gray(hv); gH.beginPath(); gH.moveTo(-L, 0); gH.quadraticCurveTo(0, -W, L, 0); gH.quadraticCurveTo(0, W, -L, 0); gH.fill();
        gH.restore();
      });
    }
    // aiguilles de pin
    for (let i = 0; i < 300; i++) {
      const x = r() * S, y = r() * S, a = r() * 6.28, L = 7 + r() * 8;
      wrap(S, x, y, L, (X, Y) => {
        gA.strokeStyle = rgb(80 + r() * 30, 54 + r() * 16, 32); gA.lineWidth = 0.7; gA.beginPath(); gA.moveTo(X, Y); gA.lineTo(X + Math.cos(a) * L, Y + Math.sin(a) * L); gA.stroke();
        gH.strokeStyle = gray(0.9); gH.lineWidth = 1; gH.beginPath(); gH.moveTo(X, Y); gH.lineTo(X + Math.cos(a) * L, Y + Math.sin(a) * L); gH.stroke();
      });
    }
    // brindilles
    for (let i = 0; i < 70; i++) {
      const x = r() * S, y = r() * S, a = r() * 6.28, L = 20 + r() * 50;
      wrap(S, x, y, L, (X, Y) => {
        gA.strokeStyle = rgb(60, 44, 30); gA.lineWidth = 2 + r() * 2.5; gA.lineCap = "round"; gA.beginPath(); gA.moveTo(X, Y); gA.lineTo(X + Math.cos(a) * L, Y + Math.sin(a) * L); gA.stroke();
        gH.strokeStyle = gray(1); gH.lineWidth = 3; gH.beginPath(); gH.moveTo(X, Y); gH.lineTo(X + Math.cos(a) * L, Y + Math.sin(a) * L); gH.stroke();
      });
    }
  },
  // 2 Roche (granite) : grain, fissures, lichens
  (S, gA, gH, r) => {
    const n = tileNoise(S, 4, 6, 31), m = tileNoise(S, 16, 4, 32), q = tileNoise(S, 8, 5, 33);
    const ia = gA.createImageData(S, S), ih = gH.createImageData(S, S);
    for (let i = 0; i < S * S; i++) {
      const ridge = 1 - Math.abs(q[i] - 0.5) * 2;
      const h = n[i] * 0.55 + m[i] * 0.25 + ridge * 0.2;
      const v = 95 + 70 * n[i] + 35 * (m[i] - 0.5) + (r() - 0.5) * 18;
      const warm = Math.max(0, q[i] - 0.55) * 60;
      ia.data[i * 4] = v + warm * 0.6; ia.data[i * 4 + 1] = v * 0.97 + warm * 0.3; ia.data[i * 4 + 2] = v * 0.9; ia.data[i * 4 + 3] = 255;
      ih.data[i * 4] = ih.data[i * 4 + 1] = ih.data[i * 4 + 2] = h * 255; ih.data[i * 4 + 3] = 255;
    }
    gA.putImageData(ia, 0, 0); gH.putImageData(ih, 0, 0);
    // fissures (marche aléatoire)
    for (let i = 0; i < 42; i++) {
      let x = r() * S, y = r() * S, a = r() * 6.28;
      const w = 1 + r() * 2.2, n2 = 20 + r() * 50;
      for (let s = 0; s < n2; s++) {
        const nx = x + Math.cos(a) * 5, ny = y + Math.sin(a) * 5;
        wrap(S, x, y, 8, (X, Y) => {
          gA.strokeStyle = rgb(35, 33, 30, 0.85); gA.lineWidth = w; gA.beginPath(); gA.moveTo(X, Y); gA.lineTo(X + nx - x, Y + ny - y); gA.stroke();
          gH.strokeStyle = gray(0.0); gH.lineWidth = w + 1.5; gH.beginPath(); gH.moveTo(X, Y); gH.lineTo(X + nx - x, Y + ny - y); gH.stroke();
        });
        x = nx; y = ny; a += (r() - 0.5) * 0.7;
      }
    }
    // lichens
    for (let i = 0; i < 160; i++) {
      const x = r() * S, y = r() * S, R = 3 + r() * 14, c = r() < 0.6 ? [150, 150, 90] : r() < 0.5 ? [190, 140, 70] : [210, 210, 200];
      wrap(S, x, y, R, (X, Y) => { gA.fillStyle = rgb(...c, 0.35 + r() * 0.3); gA.beginPath(); gA.ellipse(X, Y, R, R * (0.6 + r() * 0.4), r() * 3, 0, 7); gA.fill(); });
    }
  },
  // 3 Sable : grain fin, rides, petits coquillages
  (S, gA, gH, r) => {
    const n = tileNoise(S, 8, 5, 41), m = tileNoise(S, 3, 3, 42);
    const ia = gA.createImageData(S, S), ih = gH.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const rip = Math.sin((y / S) * Math.PI * 2 * 9 + m[i] * 9 + n[i] * 2) * 0.5 + 0.5;
      const g = (r() - 0.5) * 30;
      const v = 0.85 + 0.15 * n[i];
      ia.data[i * 4] = (214 + g) * v; ia.data[i * 4 + 1] = (186 + g) * v; ia.data[i * 4 + 2] = (138 + g * 0.8) * v; ia.data[i * 4 + 3] = 255;
      ih.data[i * 4] = ih.data[i * 4 + 1] = ih.data[i * 4 + 2] = (0.35 + rip * 0.35 + (r() - 0.5) * 0.12) * 255; ih.data[i * 4 + 3] = 255;
    }
    gA.putImageData(ia, 0, 0); gH.putImageData(ih, 0, 0);
    for (let i = 0; i < 40; i++) {
      const x = r() * S, y = r() * S, R = 2 + r() * 4;
      wrap(S, x, y, R, (X, Y) => { gA.fillStyle = rgb(225, 215, 195); gA.beginPath(); gA.ellipse(X, Y, R, R * 0.7, r() * 3, 0, 7); gA.fill(); gH.fillStyle = gray(0.9); gH.beginPath(); gH.ellipse(X, Y, R, R * 0.7, 0, 0, 7); gH.fill(); });
    }
  },
  // 4 Terre : sol brun, mottes, cailloux
  (S, gA, gH, r) => {
    fillNoise(S, gA, gH, [96, 56, 34], [128, 80, 50], 51, 6, 0.4, 0.15);   // latosol brun-rouge
    for (let i = 0; i < 700; i++) {
      const x = r() * S, y = r() * S, R = 1.5 + r() * r() * 9, v = 90 + r() * 50;
      wrap(S, x, y, R, (X, Y) => {
        gA.fillStyle = rgb(v * 1.12, v * 0.72, v * 0.48); gA.beginPath(); gA.ellipse(X, Y, R, R * (0.6 + r() * 0.4), r() * 3, 0, 7); gA.fill();
        const gr = gH.createRadialGradient(X, Y, 0, X, Y, R); gr.addColorStop(0, gray(1)); gr.addColorStop(1, gray(0.45));
        gH.fillStyle = gr; gH.beginPath(); gH.ellipse(X, Y, R, R * 0.8, 0, 0, 7); gH.fill();
      });
    }
  },
  // 5 Neige : douce, légèrement bleutée, congères
  (S, gA, gH, r) => {
    const n = tileNoise(S, 4, 5, 61), m = tileNoise(S, 24, 2, 62);
    const ia = gA.createImageData(S, S), ih = gH.createImageData(S, S);
    for (let i = 0; i < S * S; i++) {
      const v = 228 + 22 * n[i] + (r() - 0.5) * 6;
      ia.data[i * 4] = v * 0.97; ia.data[i * 4 + 1] = v * 0.985; ia.data[i * 4 + 2] = v; ia.data[i * 4 + 3] = 255;
      ih.data[i * 4] = ih.data[i * 4 + 1] = ih.data[i * 4 + 2] = (n[i] * 0.8 + m[i] * 0.2) * 255; ih.data[i * 4 + 3] = 255;
    }
    gA.putImageData(ia, 0, 0); gH.putImageData(ih, 0, 0);
  },
  // 6 Mousse : coussinets verts
  (S, gA, gH, r) => {
    fillNoise(S, gA, gH, [40, 62, 18], [78, 104, 30], 71, 8, 0.3, 0.2);
    for (let i = 0; i < 2600; i++) {
      const x = r() * S, y = r() * S, R = 2 + r() * 6, k = 0.75 + r() * 0.5;
      wrap(S, x, y, R, (X, Y) => {
        const gr = gA.createRadialGradient(X - R * 0.3, Y - R * 0.3, 0, X, Y, R);
        gr.addColorStop(0, rgb(110 * k, 140 * k, 45 * k)); gr.addColorStop(1, rgb(45 * k, 70 * k, 20 * k));
        gA.fillStyle = gr; gA.beginPath(); gA.arc(X, Y, R, 0, 7); gA.fill();
        const gh = gH.createRadialGradient(X, Y, 0, X, Y, R); gh.addColorStop(0, gray(0.95)); gh.addColorStop(1, gray(0.3));
        gH.fillStyle = gh; gH.beginPath(); gH.arc(X, Y, R, 0, 7); gH.fill();
      });
    }
  },
  // 7 Gravier / éboulis : petites pierres serrées
  (S, gA, gH, r) => {
    fillNoise(S, gA, gH, [80, 76, 70], [110, 106, 98], 81, 6, 0.1, 0.05);
    for (let i = 0; i < 1500; i++) {
      const x = r() * S, y = r() * S, R = 3 + r() * r() * 14, v = 85 + r() * 90, w = r() < 0.2 ? 18 : 0;
      wrap(S, x, y, R, (X, Y) => {
        const a = r() * 3;
        const gr = gA.createRadialGradient(X - R * 0.3, Y - R * 0.3, 0, X, Y, R * 1.1);
        gr.addColorStop(0, rgb(v * 1.15 + w, v * 1.12, v * 1.05)); gr.addColorStop(1, rgb(v * 0.65 + w, v * 0.63, v * 0.6));
        gA.fillStyle = gr; gA.beginPath(); gA.ellipse(X, Y, R, R * (0.55 + r() * 0.4), a, 0, 7); gA.fill();
        const gh = gH.createRadialGradient(X, Y, 0, X, Y, R); gh.addColorStop(0, gray(1)); gh.addColorStop(0.7, gray(0.7)); gh.addColorStop(1, gray(0.1));
        gH.fillStyle = gh; gH.beginPath(); gH.ellipse(X, Y, R, R * 0.8, a, 0, 7); gH.fill();
      });
    }
  },
];
// rugosité de base par couche, force du relief (normales)
const ROUGH = [0.92, 0.86, 0.78, 0.9, 0.95, 0.55, 0.96, 0.8];
const BUMP = [2.0, 2.6, 3.5, 1.4, 2.6, 1.0, 2.4, 4.0];

export function makeTerrainTextures(renderer) {
  const S = 512, NL = LAYERS.length;   // les dessins sont pensés pour 512 px
  const alb = new Uint8Array(S * S * 4 * NL), nrm = new Uint8Array(S * S * 4 * NL);
  const cA = document.createElement("canvas"), cH = document.createElement("canvas");
  cA.width = cA.height = cH.width = cH.height = S;
  const gA = cA.getContext("2d", { willReadFrequently: true }), gH = cH.getContext("2d", { willReadFrequently: true });
  for (let l = 0; l < NL; l++) {
    gA.setTransform(1, 0, 0, 1, 0, 0); gH.setTransform(1, 0, 0, 1, 0, 0);
    gA.clearRect(0, 0, S, S); gH.clearRect(0, 0, S, S);
    LAYERS[l](S, gA, gH, mulberry32(1000 + l * 77));
    const a = gA.getImageData(0, 0, S, S).data, h = gH.getImageData(0, 0, S, S).data;
    const off = l * S * S * 4;
    const H = (x, y) => h[(((y + S) % S) * S + ((x + S) % S)) * 4] / 255;
    const k = BUMP[l];
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const i = y * S + x, o = off + i * 4;
      alb[o] = a[i * 4]; alb[o + 1] = a[i * 4 + 1]; alb[o + 2] = a[i * 4 + 2];
      const hh = h[i * 4] / 255;
      alb[o + 3] = hh * 255;
      // Sobel → normale tangente (x vers la droite, y vers le bas de l'image = +z du monde)
      const dx = (H(x + 1, y - 1) + 2 * H(x + 1, y) + H(x + 1, y + 1)) - (H(x - 1, y - 1) + 2 * H(x - 1, y) + H(x - 1, y + 1));
      const dy = (H(x - 1, y + 1) + 2 * H(x, y + 1) + H(x + 1, y + 1)) - (H(x - 1, y - 1) + 2 * H(x, y - 1) + H(x + 1, y - 1));
      let nx = -dx * k, nz = -dy * k;
      const len = Math.hypot(nx, nz, 1);
      nx /= len; nz /= len;
      nrm[o] = (nx * 0.5 + 0.5) * 255; nrm[o + 1] = (nz * 0.5 + 0.5) * 255;
      nrm[o + 2] = Math.min(1, Math.max(0.2, ROUGH[l] + (0.5 - hh) * 0.12)) * 255;
      nrm[o + 3] = 255;
    }
  }
  const mk = (data, srgb) => {
    const t = new THREE.DataArrayTexture(data, S, S, NL);
    t.format = THREE.RGBAFormat; t.type = THREE.UnsignedByteType;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = true;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  };
  return { albedo: mk(alb, true), normal: mk(nrm, false) };
}
