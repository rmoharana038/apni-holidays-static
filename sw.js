const CACHE_NAME = 'apni-holidays-v1';
const ASSETS = [
  'index.html',
  'packages.html',
  'style.css',
  'script.js',
  'manifest.json',
  'assets/favicon.png',
  'assets/hero.jpg',
  'assets/manali.jpg',
  'assets/goa.jpg',
  'assets/kerala.jpg',
  'assets/rajasthan.jpg',
  'assets/fallback.jpg',
  'packages.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
