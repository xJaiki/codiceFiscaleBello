const codiceFiscale = "codice-fiscale-v1"
const assets = [
  "/",
  "/index.html",
  "/style/reset.css",
  "/style/style.css",
  "/script/comuni.json",
  "/script/codiceFiscaleLogic.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(codiceFiscale).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
        })
    )}
)

