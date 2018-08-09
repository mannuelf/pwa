self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
        .then(function (cache) {
            console.log('[Service Worker] Pre-caching static assets')
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/js/material.min.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/src/images/main-image.jpg',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
            ])
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
        .then(function (response) {
            if (response) {
                return response
            } else {
                return fetch(event.request)
                    .then(function (res) {
                        return caches.open('dynamic')
                            .then(function (cache) {
                                cache.put(event.request.url, res.clone())
                                return res
                            })
                    })
                    .catch(function (err) {
                        console.log('error: ', err)
                    })
            }
        })
    );
})