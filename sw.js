// Ganti angka versi setiap kali kamu mengubah file aplikasi, supaya HP mengambil versi terbaru.
const VERSION = 'dompetku-v8';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/icon-maskable-512.png',
  './fonts/jakarta-400.woff2', './fonts/jakarta-500.woff2', './fonts/jakarta-600.woff2',
  './fonts/jakarta-700.woff2', './fonts/jakarta-800.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Halaman: coba ambil versi terbaru dulu, kalau offline pakai simpanan.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  // Ikon dan font: pakai simpanan, ambil dari jaringan kalau belum ada.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
