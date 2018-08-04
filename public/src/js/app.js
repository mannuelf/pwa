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

var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('This is executed once the timer is done!')
    // console.log('executed after 3 seconds');
  }, 3000)
})

promise.then(function(text) {
  return text
}).then(function(newText) {
  console.log(newText)
})

console.log('This is executed right after setTimeout');

