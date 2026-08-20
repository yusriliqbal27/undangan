/* ============================================================================
 *  KONFIGURASI UNDANGAN DIGITAL
 *  Dibuat lewat editor.html pada 18/8/2026, 21.31.56
 *
 *  Ubah tulisan di dalam tanda kutip. Jangan hapus koma, kurung kurawal { },
 *  atau kurung siku [ ]. Bisa juga diedit ulang lewat editor.html.
 * ========================================================================== */

const CONFIG = {
  /* ── 1. META — judul tab browser & tampilan saat link di-share ───── */
  meta: {
    "title": "Syukuran Nikah Hanan & Iqbal",
    "description": "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri Syukuran Nikah kami.",
    "ogImage": "",
    "favicon": "assets/img/favicon.svg"
  },

  /* ── 2. TEMA — warna & font ──────────────────────────────────────── */
  theme: {
    "preset": "custom",
    "colors": {
      "primary": "#aa7942",
      "secondary": "#e5b38e",
      "bg": "#FBF9F4",
      "surface": "#FFFFFF",
      "text": "#3A3A35",
      "muted": "#7A7A70"
    },
    "fontDisplay": "Cormorant Garamond",
    "fontScript": "Parisienne",
    "fontBody": "Jost",
    "fontArabic": "Amiri",
    "ornament": "floral"
  },

  /* ── 3. MUSIK LATAR ──────────────────────────────────────────────── */
  music: {
    "enabled": true,
    "url": "assets/audio/u_f2xdbvliwl-oud-and-nigh-397424.mp3",
    "title": ""
  },

  /* ── 4. HALAMAN COVER — layar pertama sebelum undangan dibuka ────── */
  cover: {
    "eyebrow": "The Wedding Of",
    "eventType": "Syukuran Nikah",
    "groomShort": "Iqbal",
    "brideShort": "Hanan",
    "nameOrder": "bride-first",
    "dateText": "29 Agustus 2026",
    "guestLabel": "Kepada Yth.",
    "guestDefault": "Bapak / Ibu / Saudara/i",
    "buttonText": "Buka Undangan"
  },

  /* ── 5. PEMBUKA — bismillah + ayat ───────────────────────────────── */
  opening: {
    "enabled": true,
    "bismillah": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    "verseArabic": "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    "verseTranslation": "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    "verseSource": "QS. Ar-Rum : 21",
    "salam": "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
    "intro": "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan Syukuran Pernikahan putra-putri kami:"
  },

  /* ── 6. MEMPELAI ─────────────────────────────────────────────────── */
  couple: {
    "showPhotos": false,
    "order": "groom-first",
    "groom": {
      "label": "Mempelai Pria",
      "fullName": "Mohammad Yusril Iqbal Habibana",
      "nickname": "Iqbal",
      "childOrder": "Putra dari",
      "fatherName": "Bapak Nurul Susianto",
      "motherName": "Ibu Yuli Wijayati",
      "instagram": "@yusril_iqbal",
      "photo": ""
    },
    "bride": {
      "label": "Mempelai Wanita",
      "fullName": "Hanan Amirah Nur Rahmi",
      "nickname": "Hanan",
      "childOrder": "Putri dari",
      "fatherName": "Bapak Rahyudin",
      "motherName": "Ibu Eny Umiyati",
      "instagram": "@hanananr",
      "photo": ""
    }
  },

  /* ── 7. ACARA ────────────────────────────────────────────────────── */
  events: {
    "enabled": true,
    "title": "Waktu & Tempat",
    "subtitle": "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.",
    "list": [
      {
        "name": "Syukuran Nikah",
        "date": "2026-08-29",
        "timeStart": "10.30",
        "timeEnd": "12.00",
        "timezone": "WIB",
        "venueName": "Latar SD Muhammadiyah 4 Malang",
        "venueAddress": "Jl. Sudimoro No.19, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142",
        "mapsUrl": "https://maps.app.goo.gl/x9CLe42f9DykvKaf6",
        "note": "Note: Acara ini diadakan sebagai rangkaian acara Akad dan Resepsi yang telah dilakukan di Madiun pada 23 Agustus 2026, sebagai pertimbangan rekan rekan kami di Malang yang belum dapat mampir pada acara tersebut"
      }
    ],
    "calendarButton": true,
    "calendarButtonText": "Simpan ke Kalender",
    "mapsButtonText": "Lihat Lokasi"
  },

  /* ── 8. HITUNG MUNDUR ────────────────────────────────────────────── */
  countdown: {
    "enabled": true,
    "title": "Menuju Hari Penuh Kesyukuran",
    "target": "2026-08-29T10:30:00",
    "utcOffset": "+07:00",
    "labels": {
      "days": "Hari",
      "hours": "Jam",
      "minutes": "Menit",
      "seconds": "Detik"
    },
    "finishedText": "Alhamdulillah, acara telah terlaksana."
  },

  /* ── 9. ADAB MENGHADIRI WALIMAH ──────────────────────────────────── */
  adab: {
    "enabled": true,
    "title": "Adab Menghadiri Acara:",
    "subtitle": "Beberapa hal yang kami harapkan dari para tamu undangan:",
    "items": [
      "Kami mengharapkan para tamu berpakaian sopan dan khususnya muslimah kami harapkan dapat menutup aurat sesuai syariat.",
      "Dimohon untuk mengambil makanan secukupnya dan menghabiskannya agar tidak mubazir.",
      "Kami mengharapkan dapat hadir sesuai waktu yang telah diberikan."
    ]
  },

  /* ── 10. KISAH KAMI ──────────────────────────────────────────────── */
  story: {
    "enabled": true,
    "title": "Kisah Kami",
    "subtitle": "",
    "items": [
      {
        "date": "Perkenalan",
        "title": "Awal Bertemu",
        "text": "Kami dipertemukan di Institut Teknologi Bandung melalui perantara seorang kenalan bersama. Dari perkenalan sederhana itu, kami menemukan banyak kesamaan dalam memandang tujuan hidup."
      },
      {
        "date": "Proses",
        "title": "Menuju Keseriusan",
        "text": "Kami sepakat menempuh jalan yang diridhoi, menjaga batas, dan melibatkan keluarga sejak awal. Semoga Allah meridhoi setiap langkah yang kami ambil."
      },
      {
        "date": "23 Agustus 2026",
        "title": "Hari Bahagia",
        "text": "Dengan mengharap ridho Allah Subhanahu wa Ta'ala, kami menyatukan niat dalam ikatan pernikahan. Mohon doa restunya."
      },
      {
        "date": "29 Agustus 2026",
        "title": "Syukuran Nikah",
        "text": "Sebagai rasa syukur atas nikmat yang Allah SWT berikan, kami juga ingin membagikan kebahagiaan kepada rekan kami lainnya di Malang"
      }
    ]
  },

  /* ── 11. GALERI FOTO ─────────────────────────────────────────────── */
  gallery: {
    "enabled": false,
    "title": "Galeri",
    "subtitle": "",
    "images": []
  },

  /* ── 12. RSVP ────────────────────────────────────────────────────── */
  rsvp: {
    "enabled": true,
    "title": "Konfirmasi Kehadiran",
    "subtitle": "Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i agar kami dapat mempersiapkan dengan baik.",
    "endpoint": "https://script.google.com/macros/s/AKfycbwMhd4Fm_0fcOoQFXI0TZqMbQj0KoEtRwC59naG7XuhwCXW4mc--M_oFyMDe7Z6WdaFSg/exec",
    "whatsappFallback": "6285731422416",
    "labels": {
      "name": "Nama",
      "namePlaceholder": "Nama lengkap Anda",
      "attendance": "Konfirmasi Kehadiran",
      "optionYes": "Insya Allah hadir",
      "optionNo": "Maaf, berhalangan hadir",
      "guestCount": "Jumlah Tamu",
      "message": "Ucapan & Doa",
      "messagePlaceholder": "Tulis ucapan dan doa terbaik Anda...",
      "submit": "Kirim",
      "sending": "Mengirim...",
      "success": "Jazaakumullahu khairan, ucapan Anda sudah kami terima.",
      "error": "Maaf, terjadi kendala. Silakan coba lagi."
    },
    "showGuestCount": true
  },

  /* ── 13. BUKU TAMU ───────────────────────────────────────────────── */
  wishes: {
    "enabled": true,
    "title": "Ucapan & Doa",
    "emptyText": "Belum ada ucapan. Jadilah yang pertama memberikan doa.",
    "perPage": 5
  },

  /* ── 14. AMPLOP DIGITAL / HADIAH ─────────────────────────────────── */
  gift: {
    "enabled": true,
    "title": "Amplop Digital",
    "subtitle": "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.",
    "buttonText": "Kirim Hadiah",
    "accounts": [
      {
        "bank": "Bank Jago",
        "number": "101828864007",
        "holder": "MOHAMMAD YUSRIL IQBAL HABIBANA",
        "logo": ""
      },
      {
        "bank": "Bank Mandiri",
        "number": "1310024438345",
        "holder": "HANAN AMIRAH NUR RAHMI",
        "logo": ""
      }
    ],
    "address": {
      "enabled": true,
      "label": "Kirim Hadiah",
      "name": "Mohammad Yusril Iqbal Habibana",
      "detail": "Jalan Sudimoro No 26, Gang VI, RT 5, RW 7, Mojolangu, Lowokwaru, Kota Malang, Jawa Timur, 65142"
    },
    "copyText": "Salin",
    "copiedText": "Tersalin!"
  },

  /* ── 15. PENUTUP ─────────────────────────────────────────────────── */
  closing: {
    "enabled": true,
    "text": "Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
    "duaArabic": "بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِيْ خَيْرٍ",
    "duaTranslation": "Semoga Allah memberkahimu dan memberkahi atasmu, serta menyatukan kalian berdua dalam kebaikan.",
    "salam": "وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
    "thanks": "Kami yang berbahagia,",
    "familyLine": "Keluarga Besar Kedua Mempelai"
  },

  /* ── 16. FOOTER & TOMBOL SHARE ───────────────────────────────────── */
  footer: {
    "shareButton": false,
    "shareButtonText": "Bagikan Undangan",
    "shareTemplate": "Assalamu'alaikum warahmatullahi wabarakatuh\n\nDengan memohon rahmat dan ridho Allah, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri Syukuran Pernikahan kami.\n\nInformasi undangan kami dapat diakses pada link berikut:\n{link}\n\nMerupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nJazaakumullahu khairan.",
    "credit": "Dibuat dengan penuh doa",
    "creditName": "",
    "creditUrl": ""
  },
};

/* ⚠️ JANGAN UBAH BARIS DI BAWAH INI —
   baris ini yang menyambungkan config ke halaman undangan. */
if (typeof window !== "undefined") { window.CONFIG = CONFIG; }
if (typeof module !== "undefined") { module.exports = CONFIG; }
