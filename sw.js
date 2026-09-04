// Poker Semanal — Service Worker (app pessoal)
// Bump o número da versão sempre que publicar um index.html novo.
const CACHE_NAME = 'poker-semanal-v10';
const ASSETS = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    const net = fetch(e.request).then(r => { if (r.status===200 && e.request.url.startsWith(self.location.origin)) { const cl=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,cl)); } return r; }).catch(()=>cached);
    return cached || net;
  }));
});
