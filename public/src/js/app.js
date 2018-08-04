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


fetch('https://httpbin.org/get')
  .then(function(response) {
    console.log('[fetch]', response)
    return response.json()
})
.then(function(data) {
  console.log('[fetch data]', data)
})
.catch(function(err) {
  console.log('[fetch error]', err)
})

var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    // resolve('This is executed once the timer is done!')
    reject({ code: 500, message: 'An ERROR occurred!' })
    // console.log('executed after 3 seconds');
  }, 3000)
})

promise.then(function(text) {
  return text
}, function(err) {
  console.log(err.code, err.message)
}).then(function(newText) {
  console.log(newText)
})

console.log('This is executed right after setTimeout');

