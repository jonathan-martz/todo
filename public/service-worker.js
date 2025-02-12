const CACHE_NAME = 'my-cache-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([]);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        const dateHeader = cachedResponse.headers.get('date');
        if (dateHeader) {
          const dateCached = new Date(dateHeader);
          const now = new Date();
          if (now - dateCached > CACHE_DURATION) {
            return fetchAndCache(event.request);
          }
        }
        return cachedResponse;
      }
      return fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(request) {
  return fetch(request).then((response) => {
    return caches.open(CACHE_NAME).then((cache) => {
      cache.put(request, response.clone());
      return response;
    });
  });
}