const CACHE_NAME = 'sw-cache-9';
const toCache = [
  '/',
  '/select',
  '/settings',
  '/simulate?h=0&a=0',
  '/view/menu.html',
  '/view/settings.html',
  '/view/selectTeam.html',
  '/view/startMatch.ejs',
  '/js/manifest.json',
  '/js/pwa.js',
  '/js/events.js',
  '/js/game.js',
  '/js/data.js',
  "/js/config.js",
  '/css/apple-touch.png',
  '/css/splash-screen.png',
  "/css/style.css",
  "css/btn-bgrnd.jpeg",
  "/css/background.jpeg",
  "/css/world-cup.jpg",
  "/css/goal.mp3",
  "/css/whistle.mp3",
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request, {'ignoreSearch' : true})
          })
      })
  )
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})
