
// life cycle events [install, activate ]
self.addEventListener('install', function(event) {
    console.log('[Service worker] Installing Service Worker...', event);
})

self.addEventListener('activate', function(event) {
    console.log('[Service worker] Activating Service Worker...', event);
    return self.clients.claim();
})

// service worker is a network proxy
self.addEventListener('fetch', function(event) {
    console.log('[Service Worker]', event);
    event.respondWith(fetch(event.request));
})