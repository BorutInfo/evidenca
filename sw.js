const CACHE_NAME = 'evidenca-v1';
const ASSETS = [
  'urnik3.html',
  'manifest.json'
];

// Shranjevanje datotek v lokalni pomnilnik ob prvi namestitvi
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivacija in čiščenje starih različic pomnilnika
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Prestrezanje zahtevkov – če ni omrežja, vzemi iz lokalnega pomnilnika
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});