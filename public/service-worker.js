const CACHE_NAME = 'my-cache-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
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
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.startsWith('/_nuxt/')) {
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
  } else {
    event.respondWith(fetch(event.request));
  }
});

function fetchAndCache(request) {
  return fetch(request).then((response) => {
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }
    const responseToCache = response.clone();
    caches.open(CACHE_NAME).then((cache) => {
      const headers = new Headers(responseToCache.headers);
      headers.append('date', new Date().toUTCString());
      const responseWithDate = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers,
      });
      cache.put(request, responseWithDate);
    });
    return response;
  });
}