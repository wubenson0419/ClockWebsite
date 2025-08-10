const CACHE_NAME = "clock-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap",
  "https://raw.githubusercontent.com/wubenson0419/ClockWebsite_TWtime/refs/heads/main/clockwebsite_twtime_icon.png",
  "https://github.com/wubenson0419/ClockWebsite_TWtime/blob/main/iPhoneClock_04_19.png?raw=true"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});