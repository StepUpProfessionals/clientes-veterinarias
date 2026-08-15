const CACHE = "romeo-v2";
const ASSETS = [
  "./", 
  "./index.html", 
  "./manifest.json", 
  "./icons/icon-192.png", 
  "./icons/icon-512.png",
  // Agregamos las fotos exactas de tu nuevo Micro-Álbum para que funcione sin internet
  "./images/portada.jpg",
  "./images/visita-clinica.jpg",
  "./images/siestas-1.jpg",
  "./images/travesuras-1.jpg",
  "./images/familia-1.jpg",
  "./images/cierre.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});