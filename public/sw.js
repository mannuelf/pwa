const CACHE_STATIC_NAME = 'static-08'
const CACHE_DYNAMIC_NAME = 'dynamic-07'

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
        .then(function (cache) {
            console.log('[Service Worker] Pre-caching static assets')
            cache.addAll([
                '/',
                '/index.html',
                '/offline.html',
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
    event.waitUntil(
        caches.keys()
        .then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                    console.log('[Service Worker] Removing old cache.', key)
                    return caches.delete(key)
                }
            })) // waits for all the promises to finish
        })
    )
    return self.clients.claim();
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .catch(function(err) {
               return caches.match(event.request)
            })
    );
})

/*
caches.match(event.request) // requests are the keys, request object
        .then(function (response) {
            if (response) {
                return response
            } else {
                return fetch(event.request)
                    .then(function (res) {
                        return caches.open(CACHE_DYNAMIC_NAME)
                            .then(function (cache) {
                                cache.put(event.request.url, res.clone())
                                return res
                            })
                    })
                    .catch(function (err) {
                        return caches.open(CACHE_STATIC_NAME)
                            .then(function(cache) {
                                return cache.match('/offline.html')
                            })
                        console.log('error: ', err)
                    })
            }
        })
*/