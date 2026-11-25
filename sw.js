// Ganti angka versi setiap kali kamu mengubah file aplikasi, supaya HP mengambil versi terbaru.
const VERSION = 'dompetku-v9';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/icon-maskable-512.png',
  './fonts/jakarta-400.woff2', './fonts/jakarta-500.woff2', './fonts/jakarta-600.woff2',
  './fonts/jakarta-700.woff2', './fonts/jakarta-800.woff2'
];

// Ambil langsung dari server (bukan cache browser), supaya yang tersimpan benar-benar versi terbaru.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(FILES.map(u => new Request(u, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const OFFLINE_PAGE = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;background:#0D1012;color:#ECEFEC;display:grid;place-items:center;height:100vh;margin:0;text-align:center;padding:24px"><div><div style="font-size:48px">👛</div><h2>Dompetku belum tersimpan di HP</h2><p style="color:#8C9994">Buka sekali saat ada internet, lalu aplikasi bisa dipakai offline.</p></div>';

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // Halaman utama: langsung tampilkan yang tersimpan (cepat dan jalan offline),
  // sambil diam-diam mengambil versi terbaru untuk pembukaan berikutnya.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match('./index.html') || await cache.match('./');
      const fresh = fetch(req, {cache: 'no-cache'}).then(res => {
        if (res.ok) cache.put('./index.html', res.clone());
        return res;
      });
      if (cached) { e.waitUntil(fresh.catch(() => {})); return cached; }
      try { return await fresh; }
      catch { return new Response(OFFLINE_PAGE, {headers: {'Content-Type': 'text/html; charset=utf-8'}}); }
    })());
    return;
  }

  // Ikon, font, layar pembuka: pakai simpanan, ambil dari jaringan kalau belum ada lalu simpan.
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
