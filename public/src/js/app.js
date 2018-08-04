let deferredPrompt

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    // .register('/sw.js', { scope: '/someDir'})
    .then(function() {
      console.log('serviceWorker Registered');
    })
    .catch(function(e) {
      console.log('[Service Worker] Error: ', e)
    })
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired')
  event.preventDefault()
  deferredPrompt = event
  return false
})