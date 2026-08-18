/**
 * ============================================================================
 *  BACKEND RSVP & BUKU TAMU — Google Apps Script
 * ============================================================================
 *
 *  Script ini menyimpan konfirmasi kehadiran dan ucapan dari tamu ke
 *  Google Spreadsheet, sekaligus mengirimkan daftar ucapan kembali ke
 *  halaman undangan.
 *
 *  CARA PASANG (sekali saja, ± 5 menit):
 *
 *  1. Buka https://sheets.google.com lalu buat spreadsheet baru.
 *     Beri nama bebas, misalnya "RSVP Undangan".
 *
 *  2. Di spreadsheet itu, klik menu  Ekstensi → Apps Script.
 *
 *  3. Hapus semua kode contoh yang muncul, lalu tempel SELURUH isi file ini.
 *
 *  4. Klik ikon Simpan (💾).
 *
 *  5. Klik tombol  Deploy → New deployment.
 *       • Klik ikon gerigi di sebelah "Select type" → pilih  Web app
 *       • Description        : bebas, misalnya "v1"
 *       • Execute as         : Me
 *       • Who has access     : Anyone      ← WAJIB "Anyone", bukan "Anyone with Google account"
 *     Lalu klik  Deploy.
 *
 *  6. Google akan meminta izin. Klik  Authorize access  → pilih akun kamu →
 *     muncul peringatan "Google hasn't verified this app" → klik  Advanced  →
 *     klik  Go to (nama project) (unsafe)  → klik  Allow.
 *     (Peringatan ini normal karena script buatan sendiri, bukan aplikasi publik.)
 *
 *  7. Salin  Web app URL  yang muncul. Bentuknya seperti:
 *       https://script.google.com/macros/s/AKfycb....../exec
 *
 *  8. Tempel URL itu ke  assets/js/config.js  pada bagian:
 *       rsvp: { endpoint: "TEMPEL_URL_DI_SINI" }
 *     atau lewat editor.html di kolom "Link Google Apps Script".
 *
 *  SELESAI. Setiap tamu yang mengisi form akan otomatis masuk ke spreadsheet.
 *
 *  CATATAN: setiap kali kamu mengubah kode ini, kamu harus
 *  Deploy → Manage deployments → ikon pensil → Version: New version → Deploy
 *  supaya perubahannya aktif.
 * ========================================================================== */


/* ── Pengaturan ────────────────────────────────────────────────────────── */

var SHEET_NAME   = "RSVP";   // nama tab di dalam spreadsheet
var MAX_NAME     = 120;      // batas panjang nama
var MAX_MESSAGE  = 1000;     // batas panjang ucapan
var SHOW_LIMIT   = 300;      // maksimal ucapan yang dikirim ke halaman undangan

var HEADERS = ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan", "Link Tamu"];


/* ── Ambil / buat sheet ────────────────────────────────────────────────── */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);

  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
  }

  // Pasang baris header kalau sheet masih kosong
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#6B7F5E")
      .setFontColor("#FFFFFF");
    sh.setFrozenRows(1);
    sh.setColumnWidth(1, 160); // Waktu
    sh.setColumnWidth(2, 200); // Nama
    sh.setColumnWidth(3, 150); // Kehadiran
    sh.setColumnWidth(4, 100); // Jumlah Tamu
    sh.setColumnWidth(5, 420); // Ucapan
    sh.setColumnWidth(6, 220); // Link Tamu
  }

  return sh;
}


/* ── Bersihkan input dari tamu ─────────────────────────────────────────── */
function clean_(value, maxLength) {
  var s = String(value == null ? "" : value);
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");  // buang karakter kontrol
  s = s.replace(/^[=+\-@]+/, "");                  // cegah rumus tak sengaja di Sheets
  s = s.trim();
  if (s.length > maxLength) s = s.substring(0, maxLength);
  return s;
}


/* ══════════════════════════════════════════════════════════════════════════
   MENERIMA DATA DARI FORM  (dipanggil saat tamu klik "Kirim")
   ══════════════════════════════════════════════════════════════════════════ */
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    // Kunci sebentar supaya dua tamu yang mengirim bersamaan tidak saling menimpa baris
    lock.waitLock(20000);

    var p = (e && e.parameter) ? e.parameter : {};

    // Kalau dikirim sebagai JSON mentah, baca dari postData
    if (!p.name && e && e.postData && e.postData.contents) {
      try {
        var body = JSON.parse(e.postData.contents);
        for (var k in body) { if (!p[k]) p[k] = body[k]; }
      } catch (parseErr) { /* bukan JSON, abaikan */ }
    }

    var name = clean_(p.name, MAX_NAME);
    if (!name) return reply_(e, { ok: false, error: "Nama kosong." });

    var guests = parseInt(p.guests, 10);
    if (isNaN(guests) || guests < 0) guests = 0;
    if (guests > 20) guests = 20;

    getSheet_().appendRow([
      new Date(),
      name,
      clean_(p.attendance, 60),
      guests,
      clean_(p.message, MAX_MESSAGE),
      clean_(p.guestSlug, 200)
    ]);

    return reply_(e, { ok: true });

  } catch (err) {
    return reply_(e, { ok: false, error: String(err) });

  } finally {
    try { lock.releaseLock(); } catch (releaseErr) {}
  }
}


/* ══════════════════════════════════════════════════════════════════════════
   MENGIRIM DAFTAR UCAPAN KE HALAMAN UNDANGAN
   ══════════════════════════════════════════════════════════════════════════ */
function doGet(e) {
  try {
    var sh = getSheet_();
    var lastRow = sh.getLastRow();

    if (lastRow < 2) return reply_(e, []);

    // Ambil paling banyak SHOW_LIMIT baris terakhir
    var start = Math.max(2, lastRow - SHOW_LIMIT + 1);
    var rows = sh.getRange(start, 1, lastRow - start + 1, HEADERS.length).getValues();

    var out = [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var message = String(r[4] || "");

      // Baris tanpa ucapan tidak perlu ditampilkan di halaman
      if (!message) continue;

      out.push({
        timestamp: r[0] ? new Date(r[0]).toISOString() : "",
        name: String(r[1] || ""),
        attendance: String(r[2] || ""),
        message: message
      });
    }

    return reply_(e, out);

  } catch (err) {
    return reply_(e, []);
  }
}


/* ── Balasan: JSONP kalau ada parameter callback, selain itu JSON biasa ─── */
function reply_(e, obj) {
  var json = JSON.stringify(obj);
  var cb = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : "";

  // Hanya izinkan nama fungsi yang wajar, untuk keamanan
  if (cb && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(cb)) {
    return ContentService
      .createTextOutput(cb + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}


/* ══════════════════════════════════════════════════════════════════════════
   UJI COBA — jalankan fungsi ini dari editor Apps Script untuk memastikan
   sheet terbentuk dengan benar. Klik  Run  lalu pilih  ujiCoba.
   ══════════════════════════════════════════════════════════════════════════ */
function ujiCoba() {
  doPost({
    parameter: {
      name: "Tamu Percobaan",
      attendance: "Insya Allah hadir",
      guests: "2",
      message: "Barakallahu laka wa baraka alaika.",
      guestSlug: "uji-coba"
    }
  });
  Logger.log("Berhasil. Cek tab '" + SHEET_NAME + "' di spreadsheet.");
  Logger.log(doGet({ parameter: {} }).getContent());
}
