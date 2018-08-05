self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
            .then(function(cache) {
                console.log('[Service Worker] Pre-caching static assets')
                cache.add('/src/js/app.js')
            })
    ) // wait for cache installation before opening
})

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    return self.clients.claim();
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        // requests are the keys, request object
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    );
})