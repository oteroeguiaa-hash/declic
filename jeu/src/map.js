// Carte de l'île : image dessinée une fois au chargement (relief ombré, forêts, eau, neige),
// plus une mini-carte dans un coin et une grande carte (touche M ou 🗺️) avec ta position et tes constructions.
import { smoothstep } from "./noise.js";

export class MapView {
  constructor(world, canopyAt) {
    this.world = world;
    const S = (this.size = 512);
    const c = (this.base = document.createElement("canvas"));
    c.width = c.height = S;
    const g = c.getContext("2d");
    const img = g.createImageData(S, S);
    const W = world, half = W.half, step = (2 * half) / S;
    const H = (i, j) => W.heightAt(-half + (i + 0.5) * step, -half + (j + 0.5) * step);
    for (let j = 0; j < S; j++) {
      for (let i = 0; i < S; i++) {
        const x = -half + (i + 0.5) * step, z = -half + (j + 0.5) * step;
        const h = W.heightAt(x, z), wl = W.waterLevelAt(x, z);
        let r, gg, b;
        if (wl - h > 0.15) {
          const d = Math.min(1, (wl - h) / 12);
          r = 40 - 30 * d; gg = 120 - 75 * d; b = 140 - 40 * d;          // eau : turquoise → bleu profond
        } else {
          const bi = W.biomeAt(x, z), can = canopyAt(x, z);
          if (h < 2.2) { r = 214; gg = 196; b = 150; }                   // plage
          else { r = 112; gg = 140; b = 64; }                            // prairie
          r += (176 - r) * bi.p * 0.5; gg += (160 - gg) * bi.p * 0.5;  // prairie dorée
          r += (40 - r) * can * 0.85; gg += (78 - gg) * can * 0.85; b += (34 - b) * can * 0.85; // forêt
          r += (190 - r) * bi.a * can * 0.45; gg += (110 - gg) * bi.a * can * 0.35;              // automne
          const rock = smoothstep(0.35, 0.55, W.slopeAt(x, z)) + smoothstep(390, 440, h);
          r += (128 - r) * Math.min(1, rock); gg += (124 - gg) * Math.min(1, rock); b += (116 - b) * Math.min(1, rock);
          const snow = smoothstep(440, 480, h);
          r += (240 - r) * snow; gg += (244 - gg) * snow; b += (250 - b) * snow;
          // Ombrage du relief (lumière venant du nord-ouest)
          const dx = H(Math.min(S - 1, i + 1), j) - H(Math.max(0, i - 1), j), dz = H(i, Math.min(S - 1, j + 1)) - H(i, Math.max(0, j - 1));
          const sh = Math.max(0.55, Math.min(1.35, 1 - (dx + dz) * 0.06));
          r *= sh; gg *= sh; b *= sh;
        }
        const k = (j * S + i) * 4;
        img.data[k] = r; img.data[k + 1] = gg; img.data[k + 2] = b; img.data[k + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    this.mini = document.getElementById("minimap");
    this.full = document.getElementById("mapCanvas");
    this.t = 0;
  }

  toPx(x, z, S) { const h = this.world.half; return [((x + h) / (2 * h)) * S, ((z + h) / (2 * h)) * S]; }

  drawMarkers(g, S, game, scale = 1) {
    // Constructions, feux, abris, canoës
    for (const p of game.build.pieces) {
      if (!p.info.walk.length && !game.build.def(p.type).furniture) continue;
      const [x, y] = this.toPx(p.pos.x, p.pos.z, S);
      g.fillStyle = "#e9a23b"; g.fillRect(x - 1.5 * scale, y - 1.5 * scale, 3 * scale, 3 * scale);
    }
    for (const f of game.structures.fires) { const [x, y] = this.toPx(f.pos.x, f.pos.z, S); g.fillStyle = "#ff6a2a"; g.beginPath(); g.arc(x, y, 3 * scale, 0, 7); g.fill(); }
    for (const s of game.structures.shelters) { const [x, y] = this.toPx(s.pos.x, s.pos.z, S); g.fillStyle = "#f3efe6"; g.fillRect(x - 3 * scale, y - 3 * scale, 6 * scale, 6 * scale); }
    for (const b of game.structures.boats) { const [x, y] = this.toPx(b.pos.x, b.pos.z, S); g.fillStyle = "#c8703a"; g.beginPath(); g.ellipse(x, y, 4 * scale, 1.6 * scale, -b.yaw, 0, 7); g.fill(); }
    const sp = game.player.spawnPoint;
    if (sp.lengthSq()) { const [x, y] = this.toPx(sp.x, sp.z, S); g.strokeStyle = "#fff"; g.lineWidth = 1.5 * scale; g.strokeRect(x - 4 * scale, y - 4 * scale, 8 * scale, 8 * scale); }
    // Joueur : flèche orientée
    const p = game.player.boat ? game.player.boat.pos : game.player.pos;
    const [px, py] = this.toPx(p.x, p.z, S);
    const yaw = game.player.yaw;
    const fx = -Math.sin(yaw), fz = -Math.cos(yaw);
    g.save(); g.translate(px, py); g.rotate(Math.atan2(fz, fx) + Math.PI / 2);
    g.fillStyle = "#ff3a3a"; g.strokeStyle = "#fff"; g.lineWidth = 1.5 * scale;
    g.beginPath(); g.moveTo(0, -8 * scale); g.lineTo(5.5 * scale, 6 * scale); g.lineTo(0, 3 * scale); g.lineTo(-5.5 * scale, 6 * scale); g.closePath(); g.fill(); g.stroke();
    g.restore();
  }

  // Mini-carte : zone de ~360 m autour du joueur, nord en haut
  updateMini(dt, game) {
    if (!this.mini || this.mini.offsetParent === null) return;
    this.t -= dt; if (this.t > 0) return; this.t = 0.2;
    const g = this.mini.getContext("2d"), M = this.mini.width;
    const S = this.size, p = game.player.boat ? game.player.boat.pos : game.player.pos;
    const span = (360 / (2 * this.world.half)) * S;          // pixels de la carte de base visibles
    const [cx, cy] = this.toPx(p.x, p.z, S);
    g.clearRect(0, 0, M, M);
    g.save(); g.beginPath(); g.arc(M / 2, M / 2, M / 2 - 2, 0, 7); g.clip();
    g.fillStyle = "#123a46"; g.fillRect(0, 0, M, M);
    g.drawImage(this.base, cx - span / 2, cy - span / 2, span, span, 0, 0, M, M);
    g.translate(M / 2 - (cx * M) / span, M / 2 - (cy * M) / span);
    g.scale(M / span, M / span);
    this.drawMarkers(g, S, game, span / M);
    g.restore();
    g.strokeStyle = "rgba(243,239,230,0.6)"; g.lineWidth = 2; g.beginPath(); g.arc(M / 2, M / 2, M / 2 - 2, 0, 7); g.stroke();
    g.fillStyle = "#f3efe6"; g.font = "bold 11px system-ui"; g.textAlign = "center"; g.fillText("N", M / 2, 13);
  }

  drawFull(game) {
    const c = this.full, g = c.getContext("2d"), S = c.width;
    g.fillStyle = "#123a46"; g.fillRect(0, 0, S, S);
    g.drawImage(this.base, 0, 0, S, S);
    // Quadrillage (200 m)
    g.strokeStyle = "rgba(255,255,255,0.08)"; g.lineWidth = 1;
    const n = Math.round((2 * this.world.half) / 200);
    for (let i = 1; i < n; i++) { const v = (i / n) * S; g.beginPath(); g.moveTo(v, 0); g.lineTo(v, S); g.moveTo(0, v); g.lineTo(S, v); g.stroke(); }
    this.drawMarkers(g, S, game, S / this.size);
    g.fillStyle = "#f3efe6"; g.font = "bold 16px system-ui"; g.textAlign = "center"; g.fillText("N", S / 2, 20);
  }
}
