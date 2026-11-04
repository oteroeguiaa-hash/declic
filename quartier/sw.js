/* Balade 3D : service worker (appli installable, ouverture rapide).
   Seuls les fichiers du jeu sont mis en cache ; les images 3D viennent de Google en direct. */
const VERSION = "quartier-v10";
const FILES = ["./", "./index.html", "./app.js", "./manifest.webmanifest", "./leaflet.css", "./icons/icon-192.png", "./icons/icon-512.png",
  "./draco/draco_decoder.js", "./draco/draco_decoder.wasm", "./draco/draco_wasm_wrapper.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("quartier-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord (toujours la dernière version), cache si pas de réseau.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./")))
  );
});
