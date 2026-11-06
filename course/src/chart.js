// Graphiques (canvas 2D) : vitesse, énergie… en fonction du temps ou de la distance.
export function drawChart(canvas, series, o = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.clientWidth || 300, H = canvas.clientHeight || 150;
  if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  }
  const g = canvas.getContext("2d");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, W, H);
  const pad = { l: 40, r: 10, t: o.title ? 22 : 10, b: 24 };
  let xMax = o.xMax ?? 0, yMax = o.yMax ?? 0;
  for (const s of series) for (const p of s.pts) { if (p[0] > xMax) xMax = p[0]; if (p[1] > yMax) yMax = p[1]; }
  xMax = xMax || 1; yMax = niceMax(yMax || 1);
  const X = (x) => pad.l + (x / xMax) * (W - pad.l - pad.r);
  const Y = (y) => H - pad.b - (y / yMax) * (H - pad.t - pad.b);
  const css = getComputedStyle(document.documentElement);
  const grid = css.getPropertyValue("--chart-grid").trim() || "rgba(255,255,255,0.1)";
  const ink = css.getPropertyValue("--chart-ink").trim() || "#c9d1d9";
  g.font = "11px system-ui, sans-serif";
  g.strokeStyle = grid; g.fillStyle = ink; g.lineWidth = 1;
  const ny = 4;
  for (let i = 0; i <= ny; i++) {
    const y = (yMax * i) / ny;
    g.beginPath(); g.moveTo(pad.l, Y(y)); g.lineTo(W - pad.r, Y(y)); g.stroke();
    g.textAlign = "right"; g.textBaseline = "middle";
    g.fillText(fmtNum(y), pad.l - 6, Y(y));
  }
  const nx = Math.max(2, Math.min(6, Math.floor((W - pad.l) / 70)));
  for (let i = 0; i <= nx; i++) {
    const x = (xMax * i) / nx;
    g.textAlign = "center"; g.textBaseline = "top";
    g.fillText(o.xFmt ? o.xFmt(x) : fmtNum(x), X(x), H - pad.b + 6);
  }
  if (o.title) { g.textAlign = "left"; g.textBaseline = "top"; g.fillText(o.title, pad.l, 4); }
  for (const s of series) {
    if (!s.pts.length) continue;
    g.strokeStyle = s.color; g.lineWidth = s.width || 2; g.lineJoin = "round";
    g.beginPath();
    s.pts.forEach((p, i) => (i ? g.lineTo(X(p[0]), Y(p[1])) : g.moveTo(X(p[0]), Y(p[1]))));
    g.stroke();
    if (o.dots !== false) {
      const p = s.pts[s.pts.length - 1];
      g.fillStyle = s.color;
      g.beginPath(); g.arc(X(p[0]), Y(p[1]), 3, 0, Math.PI * 2); g.fill();
    }
  }
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
}

export function fmtNum(v) {
  if (v === 0) return "0";
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 ? 1 : 0) + "k";
  if (Math.abs(v) >= 10) return Math.round(v).toString();
  if (Math.abs(v) >= 1) return v.toFixed(1).replace(/\.0$/, "");
  return v.toPrecision(2);
}

export function fmtTime(t, short = false) {
  if (t == null || !isFinite(t)) return "—";
  if (t < 60) return t.toFixed(2).replace(".", ",") + " s";
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
  if (h) return `${h} h ${String(m).padStart(2, "0")} min${short ? "" : " " + String(Math.floor(s)).padStart(2, "0") + " s"}`;
  return `${m}:${s.toFixed(2).padStart(5, "0").replace(".", ",")}`;
}
