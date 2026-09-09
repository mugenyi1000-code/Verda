/* Verda — minimal offline app-shell cache for remote industrial sites with
   patchy connectivity. Caches the static shell on install; falls back to
   cache when the network is unavailable. Data itself lives in localStorage
   and is already offline-first (no network round-trip required to use it). */

const CACHE_NAME = "verda-shell-v1";
const SHELL_FILES = [
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./ai.js",
  "./map.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(event.request).then((cached) => {
        if (cached) return cached;
        // Only a page navigation may fall back to the app shell. Serving
        // index.html for a missed script or style request hands HTML to a
        // JS/CSS parser ("Unexpected token '<'") and breaks the whole app.
        if (event.request.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504, statusText: "Offline and not cached" });
      }))
  );
});
