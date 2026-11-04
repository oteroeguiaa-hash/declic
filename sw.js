/* Déclic : service worker (appli installable, ouverture rapide, page hors connexion).
   Règle d'or : on ne met JAMAIS en cache les appels /api, Supabase, Stripe ou Anthropic. */
const VERSION = "declic-v2";
const CORE = ["/", "/i18n.js", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png", "/icons/favicon-32.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

const OFFLINE = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Déclic : hors connexion</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#08080a;color:#f4f2ee;font:16px/1.5 system-ui,sans-serif;text-align:center;padding:24px}
h1{font:400 48px Georgia,serif;margin:0 0 8px;background:linear-gradient(100deg,#c9c2ff,#ff6b9d,#ff8a5c);-webkit-background-clip:text;background-clip:text;color:transparent}
button{margin-top:18px;padding:12px 26px;border:0;border-radius:99px;font-weight:700;background:linear-gradient(110deg,#c9c2ff,#ff6b9d,#ff8a5c);color:#140f1c}</style></head>
<body><div><h1>Déclic</h1><p>Pas de connexion Internet pour le moment.<br>Reconnecte-toi pour créer tes annonces.</p><button onclick="location.reload()">Réessayer</button></div></body></html>`;

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // Supabase, Stripe, polices… : réseau direct
  if (url.pathname.startsWith("/api/")) return;             // données toujours fraîches
  if (url.pathname === "/jeu" || url.pathname.startsWith("/jeu/")) return; // le jeu a son propre service worker
  if (url.pathname === "/quartier" || url.pathname.startsWith("/quartier/")) return; // balade 3D : tuiles Google en direct

  // Pages : réseau d'abord (toujours la dernière version), cache si hors connexion
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put("/", copy)); return res; })
        .catch(() => caches.match("/").then((r) => r || new Response(OFFLINE, { headers: { "content-type": "text/html; charset=utf-8" } })))
    );
    return;
  }
  // Fichiers (icônes, traductions) : cache d'abord, mise à jour en arrière-plan
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
