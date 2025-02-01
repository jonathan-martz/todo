module.exports = {
    globDirectory: '.output/',
    globPatterns: [
      '**/*.{html,js,css,png,jpg,svg}'
    ],
    swDest: 'public/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: ({ url }) => url.origin === 'https://todos.martz.cloud',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  };