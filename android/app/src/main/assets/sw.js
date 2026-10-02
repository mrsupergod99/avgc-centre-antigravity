/**
 * KONKANIGO PWA SERVICE WORKER
 * Cache-first offline support for local lessons, cultural stories, and 3D assets.
 */

const CACHE_NAME = "konkanigo-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/main.css",
  "./css/mascot.css",
  "./css/components.css",
  "./css/tourist.css",
  "./js/app.js",
  "./js/mascot.js",
  "./js/data/knowledgeBase.js",
  "./js/data/lessons.js",
  "./js/data/culture.js",
  "./js/data/tourist.js",
  "./js/data/mapData.js",
  "./js/services/progressService.js",
  "./js/services/ttsService.js",
  "./js/services/aiTutorService.js",
  "./js/services/threeViewer.js",
  "./js/services/qrService.js",
  "./js/views/homeView.js",
  "./js/views/learnView.js",
  "./js/views/exploreView.js",
  "./js/views/aiView.js",
  "./js/views/touristView.js",
  "./js/views/qrView.js",
  "./js/views/profileView.js",
  "./js/views/onboardingView.js",
  "./assets/icons/app-icon.jpg",
  "./assets/icons/app-icon.png",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn("Service worker cache prefetch note:", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // If requesting external Gemini API or fonts, pass through network
  if (event.request.url.includes("generativelanguage.googleapis.com") || event.request.url.includes("fonts.googleapis.com")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    }).catch(() => caches.match("./index.html"))
  );
});
