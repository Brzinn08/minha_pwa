// Nome da "caixinha" onde vamos guardar os arquivos
const CACHE_NAME = 'minha-pwa-cache-v1';

// Lista de arquivos que precisam estar disponíveis offline
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// ── INSTALAR ──────────────────────────────────────────
// Guarda todos os arquivos no cache na primeira abertura
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Arquivos guardados no cache!');
        return cache.addAll(urlsToCache);
      })
  );
});

// ── BUSCAR ────────────────────────────────────────────
// Quando o app pedir um arquivo: verifica o cache primeiro
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // ✅ Encontrou no cache!
        }
        return fetch(event.request); // 🌐 Busca na internet
      })
  );
});

// ── ATIVAR ────────────────────────────────────────────
// Remove caches antigos quando há uma nova versão
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});