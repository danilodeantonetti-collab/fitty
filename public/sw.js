const CACHE_NAME = 'fitty-v2';

// Nur statische, nicht-personalisierte Dateien cachen.
// Eingeloggte Seiten (/dashboard, /progress, ...) und Supabase-Antworten
// dürfen NIE in den gemeinsamen Cache — sonst sieht auf einem geteilten
// Gerät der nächste Nutzer offline die Daten des vorherigen.
const STATIC_ASSETS = ['/', '/icon.svg', '/manifest.json'];

const isCacheable = (request) => {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false; // nie fremde Origins (Supabase, YouTube)
  if (url.pathname.startsWith('/_next/static/')) return true; // unveränderliche Build-Assets
  return STATIC_ASSETS.includes(url.pathname);
};

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!isCacheable(event.request)) return; // Netz durchreichen, nichts cachen
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
