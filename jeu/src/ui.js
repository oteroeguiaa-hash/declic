// Interface : barres de survie, horloge, boussole, barre d'outils, messages, sac et fabrication.
import { ITEMS, TOOLS, RECIPES } from "./items.js";

const $ = (id) => document.getElementById(id);

export class UI {
  constructor() {
    this.bars = {
      health: $("sHealth"), food: $("sFood"), water: $("sWater"), stamina: $("sStamina"), warmth: $("sWarmth"),
    };
    this.clock = $("clock");
    this.target = $("target");
    this.cross = $("crosshair");
    this.hotbar = $("hotbar");
    this.toasts = $("toasts");
    this.hurt = $("hurt");
    this.fps = $("fps");
    this.hint = $("hint");
    this.compass = $("compassStrip");
    this.lastTarget = "";
    this.buildCompass();
  }

  buildCompass() {
    const marks = [];
    const names = { 0: "N", 45: "NE", 90: "E", 135: "SE", 180: "S", 225: "SO", 270: "O", 315: "NO" };
    for (let rep = 0; rep < 3; rep++) {
      for (let d = 0; d < 360; d += 15) {
        const x = (rep * 360 + d) * 3;
        const label = names[d] ? `<b style="color:${d === 0 ? "var(--accent)" : "var(--ink)"}">${names[d]}</b>` : "·";
        marks.push(`<span style="position:absolute;left:${x}px;transform:translateX(-50%)">${label}</span>`);
      }
    }
    this.compass.innerHTML = marks.join("");
  }

  updateHUD(p, hours, day, fpsText) {
    for (const k in this.bars) {
      const v = p[k];
      const el = this.bars[k];
      el.querySelector("i").style.width = v.toFixed(1) + "%";
      el.classList.toggle("low", v < 22 && k !== "stamina");
    }
    this.bars.warmth.style.display = p.warmth < 99 ? "" : "none";
    const h = Math.floor(hours), m = Math.floor((hours - h) * 60);
    const icon = hours >= 6 && hours < 20.5 ? "☀️" : "🌙";
    this.clock.textContent = `${icon} Jour ${day} · ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    this.hurt.style.opacity = Math.max(p.hurtFlash * 2, p.health < 25 ? 0.35 + Math.sin(performance.now() * 0.005) * 0.15 : 0);
    // Boussole : yaw 0 = regard vers -Z = nord
    let deg = ((-p.yaw * 180) / Math.PI) % 360;
    if (deg < 0) deg += 360;
    this.compass.style.transform = `translateX(${130 - (360 + deg) * 3}px)`;
    if (fpsText != null) { this.fps.classList.remove("hidden"); this.fps.textContent = fpsText; }
    else this.fps.classList.add("hidden");
  }

  setTarget(html, active) {
    if (html !== this.lastTarget) { this.target.innerHTML = html; this.lastTarget = html; }
    this.cross.classList.toggle("active", !!active);
  }

  updateHotbar(tools, current) {
    const key = tools.join(",") + "|" + current;
    if (key === this.hotbarKey) return;
    this.hotbarKey = key;
    this.hotbar.innerHTML = tools.map((t, i) => `<div class="slot ${t === current ? "sel" : ""}" title="${TOOLS[t].name}"><kbd>${i + 1}</kbd>${TOOLS[t].icon}</div>`).join("");
  }

  toast(text, warn = false) {
    const el = document.createElement("div");
    el.className = "toast" + (warn ? " warn" : "");
    el.textContent = text;
    this.toasts.appendChild(el);
    while (this.toasts.children.length > 5) this.toasts.firstChild.remove();
    setTimeout(() => { el.style.transition = "opacity .5s"; el.style.opacity = "0"; }, 2600);
    setTimeout(() => el.remove(), 3200);
  }

  showHint(text, ms = 6000) {
    this.hint.textContent = text;
    this.hint.classList.remove("hidden");
    this.hint.style.opacity = 1;
    clearTimeout(this.hintT);
    this.hintT = setTimeout(() => { this.hint.style.opacity = 0; setTimeout(() => this.hint.classList.add("hidden"), 400); }, ms);
  }

  renderBag(inv, handlers) {
    const items = Object.entries(inv.items).filter(([, n]) => n > 0);
    const box = $("bagItems");
    if (!items.length) box.innerHTML = `<p class="empty">Ton sac est vide. Ramasse des branches et des pierres au sol.</p>`;
    else {
      box.innerHTML = items.map(([id, n]) => {
        const it = ITEMS[id];
        const usable = it.food || (it.isFlask && inv.flask > 0);
        const label = it.isFlask ? `${it.name} (${inv.flask}/4)` : it.name;
        return `<div class="item ${usable ? "use" : ""}" data-id="${id}" title="${it.desc}"><span class="n">${n}</span><span class="ic">${it.icon}</span>${label}</div>`;
      }).join("");
      box.querySelectorAll(".item.use").forEach((el) => el.addEventListener("click", () => handlers.use(el.dataset.id)));
    }
    const rec = $("recipes");
    rec.innerHTML = RECIPES.map((r) => {
      const outId = Object.keys(r.out)[0];
      const it = outId ? ITEMS[outId] : r;
      const owned = outId && ITEMS[outId].tool && inv.count(outId) > 0;
      const can = inv.canCraft(r) && !owned;
      const needs = Object.entries(r.needs).map(([k, n]) => `<span class="${inv.count(k) >= n ? "ok" : "ko"}">${ITEMS[k].icon} ${inv.count(k)}/${n} ${ITEMS[k].name.toLowerCase()}</span>`).join(" · ");
      return `<div class="recipe"><div class="ic">${it.icon}</div><div class="info"><b>${it.name}</b><div class="desc">${it.desc}</div><div class="needs">${needs}</div></div>
        <button class="btn small" data-r="${r.id}" ${can ? "" : "disabled"}>${owned ? "Possédé" : r.place ? "Construire" : "Fabriquer"}</button></div>`;
    }).join("");
    rec.querySelectorAll("button[data-r]").forEach((b) => b.addEventListener("click", () => handlers.craft(b.dataset.r)));
  }
}
