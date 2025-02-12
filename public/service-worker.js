self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    self.skipWaiting(); // Force the waiting service worker to become the active service worker
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
    event.waitUntil(self.clients.claim()); // Take control of all open clients
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      clients.forEach(client => client.navigate(client.url)); // Reload all open clients
    });
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    event.respondWith(fetch(event.request));
  });