# Dompetku (versi offline)

Pencatat keuangan pribadi yang bisa dipasang ke layar utama HP dan dipakai tanpa internet.

## Fitur

- Transaksi, transfer antar dompet, pencarian di semua bulan
- Kalkulator di kolom jumlah: `12.000+8rb`, `3x15000`, `1,5jt`
- Saran "Sering dicatat" untuk transaksi yang berulang
- Budget per kategori, dengan peringatan saat 80% dan saat terlewati
- Target tabungan dengan saran setoran per bulan
- Tagihan rutin, termasuk catat otomatis untuk autodebet
- Penanda transaksi usaha dan laporan laba toko (Ringkasan, lalu Usaha)
- Sesuaikan saldo agar sama dengan saldo asli m-banking
- Kelola kategori: tambah, ganti nama, ikon, warna, hapus
- Aset, utang-piutang, kekayaan bersih
- Impor dari Money Manager, cadangkan dan pulihkan data

## Isi folder

- `index.html`: aplikasinya
- `sw.js`: service worker yang menyimpan aplikasi supaya bisa dibuka offline
- `manifest.webmanifest`: nama, ikon, dan warna saat dipasang ke layar utama
- `icons/`: logo aplikasi
- `splash/`: layar pembuka saat aplikasi dibuka di iPhone
- `fonts/`: huruf Plus Jakarta Sans (disimpan lokal, tidak butuh internet)

## Pasang di GitHub Pages

1. Buat repository baru di GitHub, misalnya `dompetku`. Bisa public atau private (private butuh GitHub Pro untuk Pages).
2. Upload **semua isi folder ini** ke repository (Add file, lalu Upload files). Pastikan `index.html` ada di paling atas, bukan di dalam subfolder.
3. Buka **Settings**, lalu **Pages**. Di bagian *Source*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1 sampai 2 menit. Alamatnya akan jadi `https://USERNAME.github.io/dompetku/`.

## Pasang ke layar utama iPhone

1. Buka alamat tadi di **Safari** (harus Safari, bukan Chrome).
2. Ketuk **Bagikan**, lalu **Tambah ke Layar Utama**. Kalau ada pilihan *Buka sebagai Aplikasi Web*, nyalakan. Lalu ketuk **Tambah**.
3. Tutup Safari, buka Dompetku dari ikonnya selagi masih online. Setelah itu bisa dipakai offline.

Penting: aplikasi yang terpasang punya penyimpanan sendiri, terpisah dari Safari. Jadi pulihkan data cadanganmu **dari dalam aplikasi yang dibuka lewat ikon**, bukan dari tab Safari.

## Pasang di Android

Buka alamatnya di Chrome, ketuk menu ⋮, lalu **Instal aplikasi**.

## Pindahkan data lama

Di versi Claude: **Atur**, lalu **Cadangkan data**. Di versi offline: **Atur**, lalu **Pulihkan data**, dan pilih file cadangan tadi. File Money Manager juga bisa langsung dipulihkan.

## Penting

- Data hanya tersimpan di HP itu. Kalau ikon Dompetku dihapus dari layar utama, datanya ikut terhapus.
- Cadangkan rutin lewat **Atur**, lalu **Cadangkan data**. Simpan file-nya di Files, Google Drive, atau kirim ke WhatsApp sendiri. Aplikasi akan mengingatkan kalau sudah 14 hari belum dicadangkan.

## Kalau mengubah aplikasi

Setelah mengedit `index.html`, ganti `VERSION` di baris atas `sw.js` (misalnya `dompetku-v3`), lalu upload ulang. HP akan mengambil versi baru saat dibuka online, lalu memberi tahu untuk membuka ulang aplikasi.

## Memperbarui dari versi sebelumnya

Upload ulang semua file (timpa yang lama). Data di HP tidak hilang. Buka aplikasinya saat online, tunggu muncul pesan *Versi baru siap*, lalu tutup dan buka lagi.
