/* Lisière : service worker. Tout le jeu est mis en cache pour jouer hors connexion. */
const VERSION = "lisiere-v7";
const FILES = [
  "./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png",
  "./vendor/three.module.min.js", "./vendor/addons/Sky.js", "./vendor/addons/BufferGeometryUtils.js",
  "./src/main.js", "./src/world.js", "./src/noise.js", "./src/sky.js", "./src/props.js", "./src/creatures.js",
  "./src/structures.js", "./src/player.js", "./src/input.js", "./src/audio.js", "./src/ui.js", "./src/items.js", "./src/trees.js", "./src/post.js", "./src/reflection.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("lisiere-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord (toujours la dernière version), cache si hors connexion.
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
