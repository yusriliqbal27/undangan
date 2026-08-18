# Undangan Digital

Website undangan digital yang seluruh isinya bisa diganti dari **satu file config**, tanpa perlu menyentuh kode HTML/CSS/JS-nya.

Dibuat sebagai static site murni — tidak ada framework, tidak ada build step, tidak ada server yang harus dibayar. Cukup upload foldernya, jadi.

---

## Daftar Isi

1. [Isi folder](#isi-folder)
2. [Coba dulu di komputer sendiri](#1-coba-dulu-di-komputer-sendiri)
3. [Mengganti isi undangan](#2-mengganti-isi-undangan)
4. [Menyalakan RSVP & buku tamu](#3-menyalakan-rsvp--buku-tamu)
5. [Upload ke internet (GitHub Pages)](#4-upload-ke-internet-github-pages)
6. [Membuat link personal per tamu](#5-membuat-link-personal-per-tamu)
7. [Menambah musik & foto](#6-menambah-musik--foto)
8. [Memakai ulang untuk acara lain](#7-memakai-ulang-untuk-acara-lain)
9. [Kalau ada masalah](#8-kalau-ada-masalah)

---

## Isi folder

```
undangan-digital/
│
├── index.html              ← halaman undangannya
├── editor.html             ← form visual untuk mengubah isi (tanpa ngoding)
├── tamu.html               ← bikin link personal untuk tiap tamu
│
├── assets/
│   ├── js/
│   │   ├── config.js       ← ⭐ SATU-SATUNYA FILE YANG PERLU KAMU EDIT
│   │   └── app.js          ← mesin render, tidak perlu disentuh
│   ├── css/style.css       ← tampilan, tidak perlu disentuh
│   ├── img/                ← taruh foto & logo di sini
│   └── audio/              ← taruh file musik .mp3 di sini
│
├── apps-script/Code.gs     ← backend RSVP (dipasang di Google Sheets)
│
└── contoh-config/
    ├── config-kosong.js    ← template kosong siap diisi
    └── config-khitanan.js  ← contoh untuk acara non-pernikahan
```

**Aturan emasnya:** kamu hanya perlu mengedit `assets/js/config.js`. Semua file lain biarkan apa adanya.

---

## 1. Coba dulu di komputer sendiri

Jangan buka `index.html` dengan klik dua kali — browser akan memblokir sebagian fiturnya karena alasan keamanan. Jalankan server lokal dulu:

**Kalau punya Python** (biasanya sudah ada di Mac & Linux):

```bash
cd undangan-digital
python3 -m http.server 8000
```

**Kalau punya Node.js:**

```bash
cd undangan-digital
npx serve
```

Lalu buka di browser:

| Halaman | Alamat |
|---|---|
| Undangan | http://localhost:8000/index.html |
| Editor visual | http://localhost:8000/editor.html |
| Generator link tamu | http://localhost:8000/tamu.html |

Untuk berhenti, tekan `Ctrl + C` di terminal.

---

## 2. Mengganti isi undangan

Ada dua cara. Pilih yang paling nyaman.

### Cara A — Lewat editor visual (disarankan)

1. Buka `http://localhost:8000/editor.html`
2. Ubah isian lewat form di kiri, hasilnya langsung terlihat di panel preview kanan
3. Klik **Download config.js**
4. Timpa file `assets/js/config.js` dengan file hasil download tadi

Editor punya 14 bagian di menu kiri: Info Dasar, Tema & Warna, Cover, Pembuka & Ayat, Mempelai, Waktu & Tempat, Hitung Mundur, Adab Walimah, Kisah Kami, Galeri, Amplop Digital, RSVP & Ucapan, Penutup, Musik & Share.

Tombol **Muat config** bisa dipakai untuk membuka file config lama dan mengeditnya lagi.

### Cara B — Edit langsung file config.js

Buka `assets/js/config.js` pakai text editor apa saja (VS Code, Notepad++, TextEdit).

Yang boleh diubah hanya tulisan di dalam tanda kutip:

```js
cover: {
  groomShort: "Iqbal",          ← ganti tulisan ini
  brideShort: "Hanan",          ← dan ini
  dateText: "23 Agustus 2026",  ← dan ini
},
```

**Yang perlu diperhatikan:**

- Jangan hapus tanda kutip `"`, koma `,`, kurung kurawal `{ }`, atau kurung siku `[ ]`
- Kalau butuh tanda kutip di dalam tulisan, tulis pakai garis miring terbalik: `"Beliau bilang \"selamat\""`
- `true` artinya fitur dinyalakan, `false` artinya dimatikan (bagiannya hilang dari halaman)
- Untuk baris baru di dalam tulisan, pakai `\n`

**Format yang wajib persis:**

| Isian | Format | Contoh |
|---|---|---|
| `date` pada acara | `YYYY-MM-DD` | `"2026-08-23"` |
| `target` pada countdown | `YYYY-MM-DDTHH:MM:SS` | `"2026-08-23T08:00:00"` |
| `timeStart` / `timeEnd` | `HH:MM` | `"08:00"` |
| Nomor WhatsApp | `62` + nomor tanpa `0` | `"628123456789"` |

### Menambah atau mengurangi bagian

Setiap bagian punya saklar `enabled`. Contoh, kalau tidak mau pakai galeri foto:

```js
gallery: {
  enabled: false,   ← bagian galeri hilang dari halaman
  ...
}
```

Untuk menambah acara, poin adab, cerita, atau rekening: salin satu blok yang sudah ada lalu tempel di bawahnya. Ingat tanda koma pemisahnya.

```js
list: [
  { name: "Akad Nikah", date: "2026-08-23", ... },
  { name: "Walimatul 'Urs", date: "2026-08-23", ... },   ← tambahkan blok baru di sini
],
```

Lewat editor visual, ini cukup klik tombol **Tambah acara**.

---

## 3. Menyalakan RSVP & buku tamu

Tanpa langkah ini, tombol kirim di form RSVP akan mengarah ke WhatsApp — tetap bisa dipakai, tapi ucapan tamu tidak muncul di halaman.

Supaya konfirmasi kehadiran dan ucapan tersimpan otomatis ke Google Spreadsheet:

1. Buka [sheets.google.com](https://sheets.google.com), buat spreadsheet baru
2. Klik menu **Ekstensi → Apps Script**
3. Hapus kode contoh yang muncul, tempel **seluruh isi** file `apps-script/Code.gs`
4. Klik ikon **Simpan** 💾
5. Klik **Deploy → New deployment**
   - Klik ikon gerigi di sebelah *Select type* → pilih **Web app**
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** ← wajib ini, bukan "Anyone with Google account"
   - Klik **Deploy**
6. Google minta izin → **Authorize access** → pilih akun → muncul peringatan "Google hasn't verified this app" → **Advanced** → **Go to (nama project) (unsafe)** → **Allow**

   Peringatan ini normal karena script buatan sendiri, bukan aplikasi publik.

7. Salin **Web app URL** yang muncul, bentuknya seperti:
   `https://script.google.com/macros/s/AKfycb...../exec`
8. Tempel URL itu ke `config.js`:

```js
rsvp: {
  endpoint: "https://script.google.com/macros/s/AKfycb...../exec",
}
```

Atau lewat editor visual, di bagian **RSVP & Ucapan** kolom *Link Google Apps Script*.

Selesai. Setiap tamu yang mengisi form otomatis masuk ke spreadsheet, dan ucapannya langsung tampil di halaman undangan.

> Kalau nanti kamu mengubah isi `Code.gs`, jangan lupa **Deploy → Manage deployments → ikon pensil → Version: New version → Deploy** supaya perubahannya aktif.

---

## 4. Upload ke internet (GitHub Pages)

Gratis, tanpa batas kuota, dan bisa pakai domain sendiri.

### Lewat website GitHub (tanpa perlu paham git)

1. Buat akun di [github.com](https://github.com) kalau belum punya
2. Klik **New repository**
   - *Repository name*: `undangan` (atau nama lain sesukamu)
   - Pilih **Public**
   - Klik **Create repository**
3. Di halaman repo yang baru dibuat, klik **uploading an existing file**
4. Seret **seluruh isi** folder `undangan-digital` ke jendela browser

   Yang di-upload adalah isinya, bukan foldernya. Jadi `index.html` harus berada di paling atas repo, bukan di dalam subfolder.

5. Klik **Commit changes**
6. Masuk ke tab **Settings → Pages**
   - *Source*: **Deploy from a branch**
   - *Branch*: `main` dan folder `/ (root)`
   - Klik **Save**
7. Tunggu 1–3 menit, lalu buka:

   `https://USERNAME.github.io/undangan/`

   Ganti `USERNAME` dengan username GitHub kamu.

### Lewat git (kalau sudah terbiasa)

```bash
cd undangan-digital
git init
git add .
git commit -m "undangan digital"
git branch -M main
git remote add origin https://github.com/USERNAME/undangan.git
git push -u origin main
```

Lalu atur **Settings → Pages** seperti langkah 6 di atas.

### Memperbarui isi setelah online

Cukup upload ulang file `assets/js/config.js` yang baru. Lewat website GitHub: buka file itu di repo → ikon pensil → tempel isi barunya → **Commit changes**. Perubahan aktif dalam 1–2 menit.

> Kalau perubahan belum kelihatan, buka halaman dengan mode penyamaran (incognito) atau tekan `Ctrl + Shift + R` — browser sering menyimpan versi lama.

### Pakai domain sendiri

Kalau punya domain (misalnya dari Niagahoster atau Domainesia):

1. Di **Settings → Pages → Custom domain**, isi domain kamu, klik **Save**
2. Di panel penyedia domain, tambahkan DNS record:

   | Type | Name | Value |
   |---|---|---|
   | CNAME | www | `USERNAME.github.io` |
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |

3. Tunggu sampai 24 jam, lalu centang **Enforce HTTPS**

---

## 5. Membuat link personal per tamu

Nama tamu diambil dari bagian `?to=` pada link. Jadi link yang sama bisa menampilkan nama berbeda-beda:

```
https://username.github.io/undangan/?to=Bapak Budi Santoso
https://username.github.io/undangan/?to=Rekan Rekan SD Muhammadiyah 4 Malang
```

Kalau dibuka tanpa `?to=`, yang tampil adalah tulisan default dari `cover.guestDefault`.

**Cara paling cepat:** buka `tamu.html`, tempel daftar nama tamu (satu nama per baris), klik **Buat Link**. Langsung jadi semua.

Kalau nomor WhatsApp-nya ikut ditulis setelah tanda koma, akan muncul tombol kirim WhatsApp dengan pesan yang sudah terisi otomatis:

```
Pak Budi Santoso, 08123456789
Bu Siti Aminah, 0857 1234 5678
Keluarga Bapak Hendra
```

Hasilnya juga bisa di-download sebagai CSV untuk dibuka di Excel atau Google Sheets.

---

## 6. Menambah musik & foto

### Musik latar

1. Taruh file `.mp3` di folder `assets/audio/`
2. Tulis nama filenya di config:

```js
music: {
  enabled: true,
  url: "assets/audio/backsound.mp3",
}
```

Musik mulai berputar saat tamu menekan tombol **Buka Undangan** — ini disengaja, karena browser modern memblokir suara yang berbunyi sendiri. Tamu tetap bisa mematikannya lewat tombol bulat di pojok kanan bawah.

Usahakan ukuran file di bawah 3 MB supaya cepat dimuat di jaringan seluler.

### Foto

1. Taruh foto di folder `assets/img/`
2. Untuk galeri:

```js
gallery: {
  enabled: true,
  images: [
    "assets/img/foto-1.jpg",
    "assets/img/foto-2.jpg",
  ],
}
```

3. Untuk foto mempelai:

```js
couple: {
  showPhotos: true,
  groom: { photo: "assets/img/pria.jpg", ... },
  bride: { photo: "assets/img/wanita.jpg", ... },
}
```

Kompres dulu fotonya (misalnya di [squoosh.app](https://squoosh.app)) supaya undangan tidak berat. Target di bawah 300 KB per foto.

### Gambar preview saat link di-share

Bikin gambar ukuran 1200 × 630 piksel, simpan di `assets/img/preview.jpg`, lalu:

```js
meta: { ogImage: "assets/img/preview.jpg" }
```

---

## 7. Memakai ulang untuk acara lain

Template ini tidak terkunci untuk pernikahan. Untuk acara lain, cukup ganti `config.js`-nya:

```bash
cp contoh-config/config-kosong.js assets/js/config.js
```

Lihat `contoh-config/config-khitanan.js` sebagai contoh acara dengan **satu tokoh utama** (khitanan, aqiqah, wisuda, tasyakuran). Triknya:

- `cover.brideShort` dikosongkan `""` → tanda `&` di cover otomatis hilang
- `couple.bride` diisi `null` → hanya satu orang yang ditampilkan
- Bagian yang tidak relevan dimatikan dengan `enabled: false`

### Ganti tema warna

```js
theme: { preset: "sage" }
```

Pilihan yang tersedia: `sage` (hijau lembut), `rose` (merah muda hangat), `navy` (biru tua elegan), `terracotta` (cokelat bata), atau `custom` untuk mengatur warna sendiri lewat `theme.colors`.

Motif ornamen bisa diganti lewat `theme.ornament`: `geometric`, `floral`, atau `minimal`.

Font bebas diambil dari [fonts.google.com](https://fonts.google.com) — tulis saja nama fontnya:

```js
theme: {
  fontDisplay: "Playfair Display",
  fontScript: "Great Vibes",
  fontBody: "Poppins",
}
```

---

## 8. Kalau ada masalah

| Gejala | Penyebab & solusi |
|---|---|
| Halaman putih, muncul tulisan "config.js tidak ditemukan" | Ada salah ketik di `config.js` — biasanya koma atau kurung yang kurang/kelebihan. Buka Console browser (`F12` → tab Console) untuk melihat baris yang bermasalah. Cara aman: pakai `editor.html` yang otomatis memvalidasi sebelum download. |
| Semua tulisan kosong / berantakan | Sama seperti di atas — `config.js` tidak terbaca sebagai JavaScript yang sah. |
| Font terlihat biasa saja, bukan huruf sambung | Belum terhubung internet, atau nama font di `theme.fontScript` salah ketik. Cek namanya di fonts.google.com. |
| Musik tidak bunyi | Wajar kalau tamu belum menekan tombol "Buka Undangan". Pastikan juga nama file di config sama persis dengan nama file aslinya (huruf besar-kecil ikut dihitung). |
| Ucapan tidak muncul | Cek `rsvp.endpoint` sudah terisi, dan saat deploy Apps Script pilihannya **Anyone** — bukan "Anyone with Google account". |
| Form RSVP tidak menyimpan | Setelah mengubah `Code.gs`, wajib **Deploy → Manage deployments → New version**. Versi lama tidak ikut berubah. |
| Perubahan tidak muncul setelah upload | Cache browser. Buka mode incognito atau tekan `Ctrl + Shift + R`. Tunggu juga 1–2 menit sampai GitHub Pages selesai memproses. |
| Nama tamu tidak berubah | Pastikan formatnya `?to=Nama` (bukan `&to=`) dan `?` hanya muncul sekali di link. |
| Hitung mundur salah | Format `countdown.target` wajib `2026-08-23T08:00:00` — pakai huruf `T` di tengah, tanpa spasi. |

### Cara melihat pesan error

Tekan `F12` di browser (atau klik kanan → *Inspect*), buka tab **Console**. Kalau `config.js` bermasalah, di situ akan muncul nomor barisnya.

---

## Catatan teknis

- Tidak ada dependensi, tidak ada build step. Semua file bisa langsung diupload apa adanya.
- Font dimuat dari Google Fonts. Kalau ingin sepenuhnya offline, unduh fontnya dan ubah `<link id="font-link">` di `index.html`.
- Halaman diberi `noindex` supaya tidak muncul di hasil pencarian Google. Kalau justru ingin terindeks, hapus baris `<meta name="robots">` di `index.html`.
- Data RSVP tersimpan di spreadsheet milikmu sendiri, tidak lewat pihak ketiga.
- Nomor rekening yang ditulis di config akan tampil di halaman publik — sama seperti undangan digital pada umumnya, tapi ada baiknya diketahui.
