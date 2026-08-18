/* ============================================================================
 *  KONFIGURASI UNDANGAN DIGITAL
 * ============================================================================
 *
 *  INI SATU-SATUNYA FILE YANG PERLU KAMU EDIT.
 *
 *  Semua tulisan, nama, tanggal, warna, dan link ada di sini. File lain
 *  (app.js, style.css) tidak perlu disentuh sama sekali.
 *
 *  ATURAN MAIN:
 *  1. Yang boleh diubah = tulisan di dalam tanda kutip "seperti ini".
 *  2. JANGAN hapus tanda kutip, koma, kurung kurawal { }, atau kurung siku [ ].
 *  3. Kalau butuh tanda kutip DI DALAM tulisan, tulis pakai \" (backslash).
 *     Contoh: "Beliau bilang \"selamat\" pada kami"
 *  4. true  = fitur dinyalakan
 *     false = fitur dimatikan (section-nya hilang dari halaman)
 *  5. Untuk baris baru di dalam tulisan, pakai \n
 *
 *  MALAS EDIT MANUAL? Buka file editor.html di browser. Semua isi file ini
 *  bisa diubah lewat form, lalu tinggal klik download.
 *
 * ========================================================================== */

const CONFIG = {

  /* ==========================================================================
   *  1. META — judul tab browser & tampilan saat link di-share
   * ========================================================================== */
  meta: {
    // Judul yang muncul di tab browser dan saat link dibagikan
    title: "Walimatul 'Urs Hanan & Iqbal",

    // Deskripsi singkat saat link di-share ke WhatsApp/medsos
    description:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, " +
      "kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri walimatul 'urs kami.",

    // Gambar preview saat link di-share. Kosongkan "" kalau belum punya.
    // Taruh file gambarnya di folder assets/img/ lalu tulis: "assets/img/preview.jpg"
    ogImage: "",

    // Emoji atau path gambar untuk ikon tab browser
    favicon: "assets/img/favicon.svg",
  },


  /* ==========================================================================
   *  2. TEMA — warna & font
   * ========================================================================== */
  theme: {
    // Pilih salah satu: "sage" | "rose" | "navy" | "terracotta" | "custom"
    // Kalau pilih "custom", warna diambil dari "colors" di bawah.
    preset: "sage",

    // Hanya dipakai kalau preset = "custom"
    colors: {
      primary:   "#6B7F5E",  // warna utama (tombol, judul, garis)
      secondary: "#B08D57",  // warna aksen (ornamen, highlight)
      bg:        "#FBF9F4",  // warna latar halaman
      surface:   "#FFFFFF",  // warna latar kartu
      text:      "#3A3A35",  // warna tulisan utama
      muted:     "#7A7A70",  // warna tulisan sekunder
    },

    // Font judul & nama mempelai. Ambil nama font dari fonts.google.com
    fontDisplay: "Cormorant Garamond",   // untuk judul
    fontScript:  "Parisienne",           // untuk nama mempelai (tulisan tangan)
    fontBody:    "Jost",                 // untuk paragraf
    fontArabic:  "Amiri",                // untuk teks Arab

    // Motif ornamen: "geometric" | "floral" | "minimal"
    ornament: "geometric",
  },


  /* ==========================================================================
   *  3. MUSIK LATAR
   * ========================================================================== */
  music: {
    enabled: true,

    // Taruh file .mp3 di folder assets/audio/ lalu tulis nama filenya di sini.
    // Contoh: "assets/audio/backsound.mp3"
    // Bisa juga pakai link langsung ke file mp3 di internet.
    url: "assets/audio/backsound.mp3",

    // Judul lagu yang ditampilkan (opsional, kosongkan "" untuk sembunyikan)
    title: "",
  },


  /* ==========================================================================
   *  4. HALAMAN COVER — layar pertama sebelum undangan dibuka
   * ========================================================================== */
  cover: {
    // Tulisan kecil paling atas
    eyebrow: "The Wedding Of",

    // Jenis acara
    eventType: "Walimatul 'Urs",

    // Nama panggilan yang ditampilkan besar di cover
    groomShort: "Iqbal",
    brideShort: "Hanan",

    // Urutan nama di cover: "bride-first" (Hanan & Iqbal) atau "groom-first"
    nameOrder: "bride-first",

    // Tanggal yang ditampilkan di cover
    dateText: "23 Agustus 2026",

    // Label sebelum nama tamu
    guestLabel: "Kepada Yth.",

    // Nama tamu default kalau link dibuka tanpa ?to=
    guestDefault: "Bapak / Ibu / Saudara/i",

    // Tulisan di tombol buka undangan
    buttonText: "Buka Undangan",
  },


  /* ==========================================================================
   *  5. PEMBUKA — bismillah + ayat
   * ========================================================================== */
  opening: {
    enabled: true,

    bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",

    // Ayat / hadits pembuka
    verseArabic:
      "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا " +
      "وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",

    verseTranslation:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan " +
      "untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, " +
      "dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu " +
      "benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",

    verseSource: "QS. Ar-Rum : 21",

    // Salam & kalimat pengantar sebelum nama mempelai
    salam: "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",

    intro:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, " +
      "kami bermaksud menyelenggarakan walimatul 'urs putra-putri kami:",
  },


  /* ==========================================================================
   *  6. MEMPELAI
   * ========================================================================== */
  couple: {
    // false = tidak menampilkan foto mempelai (sesuai adab syar'i)
    showPhotos: false,

    // Urutan tampil: "bride-first" atau "groom-first"
    order: "groom-first",

    groom: {
      label: "Mempelai Pria",
      fullName: "Mohammad Yusril Iqbal Habibana",
      nickname: "Iqbal",
      // Anak ke berapa, kosongkan "" kalau tidak ingin ditampilkan
      childOrder: "Putra dari",
      fatherName: "Bapak ...........",
      motherName: "Ibu ...........",
      // Kosongkan "" kalau tidak mau tampilkan Instagram
      instagram: "",
      photo: "",
    },

    bride: {
      label: "Mempelai Wanita",
      fullName: "Hanan Amirah Nur Rahmi",
      nickname: "Hanan",
      childOrder: "Putri dari",
      fatherName: "Bapak ...........",
      motherName: "Ibu ...........",
      instagram: "",
      photo: "",
    },
  },


  /* ==========================================================================
   *  7. ACARA — bisa 1, 2, atau lebih. Tambah/hapus blok { ... } sesuai kebutuhan
   * ========================================================================== */
  events: {
    enabled: true,
    title: "Waktu & Tempat",
    subtitle: "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.",

    list: [
      {
        name: "Akad Nikah",
        // Format tanggal WAJIB: "YYYY-MM-DD" (tahun-bulan-tanggal)
        date: "2026-08-23",
        timeStart: "08:00",
        timeEnd: "09:30",
        timezone: "WIB",
        venueName: "Islamic Center Madiun",
        venueAddress: "Jl. Sumatera No. 6, Madiun Lor, Kec. Manguharjo, Kota Madiun, Jawa Timur",
        // Link Google Maps. Cara ambil: buka Google Maps > cari lokasi > Share > Copy link
        mapsUrl: "https://maps.google.com/?q=Islamic+Center+Madiun",
        note: "",
      },
      {
        name: "Walimatul 'Urs",
        date: "2026-08-23",
        timeStart: "11:30",
        timeEnd: "13:30",
        timezone: "WIB",
        venueName: "Islamic Center Madiun",
        venueAddress: "Jl. Sumatera No. 6, Madiun Lor, Kec. Manguharjo, Kota Madiun, Jawa Timur",
        mapsUrl: "https://maps.google.com/?q=Islamic+Center+Madiun",
        note: "Acara diselenggarakan secara infishal (terpisah antara tamu ikhwan dan akhwat).",
      },
    ],

    // Tombol "Simpan ke Google Calendar"
    calendarButton: true,
    calendarButtonText: "Simpan ke Kalender",
    mapsButtonText: "Lihat Lokasi",
  },


  /* ==========================================================================
   *  8. HITUNG MUNDUR
   * ========================================================================== */
  countdown: {
    enabled: true,
    title: "Menuju Hari Bahagia",
    // Format WAJIB: "YYYY-MM-DDTHH:MM:SS" — biasanya sama dengan acara pertama
    target: "2026-08-23T08:00:00",
    // Zona waktu acara: "+07:00" = WIB, "+08:00" = WITA, "+09:00" = WIT
    utcOffset: "+07:00",
    labels: { days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" },
    finishedText: "Alhamdulillah, acara telah terlaksana.",
  },


  /* ==========================================================================
   *  9. ADAB MENGHADIRI WALIMAH
   *  Tambah / hapus baris di dalam "items" sesuai kebutuhan.
   * ========================================================================== */
  adab: {
    enabled: true,
    title: "Adab Menghadiri Walimah",
    subtitle: "Beberapa hal yang kami harapkan dari para tamu undangan:",
    items: [
      "Acara diselenggarakan secara infishal, yaitu terpisah antara tamu ikhwan dan akhwat.",
      "Kami mengharapkan para tamu berpakaian sopan dan menutup aurat sesuai syariat.",
      "Mohon untuk tetap menjaga waktu shalat dan menyegerakannya.",
      "Mohon untuk tidak mengambil foto atau video tanpa izin dari pihak keluarga.",
      "Dimohon untuk mengambil makanan secukupnya dan menghabiskannya agar tidak mubazir.",
    ],
  },


  /* ==========================================================================
   *  10. KISAH KAMI (opsional) — set enabled: false kalau tidak dipakai
   * ========================================================================== */
  story: {
    enabled: true,
    title: "Kisah Kami",
    subtitle: "",
    items: [
      {
        date: "Perkenalan",
        title: "Awal Bertemu",
        text:
          "Kami dipertemukan di Institut Teknologi Bandung melalui perantara seorang " +
          "kenalan bersama. Dari perkenalan sederhana itu, kami menemukan banyak " +
          "kesamaan dalam memandang tujuan hidup.",
      },
      {
        date: "Proses",
        title: "Menuju Keseriusan",
        text:
          "Kami sepakat menempuh jalan yang diridhoi, menjaga batas, dan melibatkan " +
          "keluarga sejak awal. Semoga Allah meridhoi setiap langkah yang kami ambil.",
      },
      {
        date: "23 Agustus 2026",
        title: "Hari Bahagia",
        text:
          "Dengan mengharap ridho Allah Subhanahu wa Ta'ala, kami menyatukan niat " +
          "dalam ikatan pernikahan. Mohon doa restunya.",
      },
    ],
  },


  /* ==========================================================================
   *  11. GALERI FOTO (opsional)
   *  Taruh foto di folder assets/img/ lalu tulis path-nya di dalam list.
   * ========================================================================== */
  gallery: {
    enabled: false,
    title: "Galeri",
    subtitle: "",
    images: [
      // "assets/img/foto-1.jpg",
      // "assets/img/foto-2.jpg",
    ],
  },


  /* ==========================================================================
   *  12. RSVP & BUKU TAMU
   *
   *  endpoint = link Google Apps Script kamu.
   *  Cara mendapatkannya ada di README.md bagian "Setup Google Sheets".
   *  Selama endpoint masih kosong "", form akan otomatis mengarah ke WhatsApp.
   * ========================================================================== */
  rsvp: {
    enabled: true,
    title: "Konfirmasi Kehadiran",
    subtitle: "Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i agar kami dapat mempersiapkan dengan baik.",

    endpoint: "",

    // Nomor WhatsApp cadangan (dipakai kalau endpoint kosong)
    // Format: 62 diikuti nomor tanpa angka 0 di depan
    whatsappFallback: "628123456789",

    labels: {
      name: "Nama",
      namePlaceholder: "Nama lengkap Anda",
      attendance: "Konfirmasi Kehadiran",
      optionYes: "Insya Allah hadir",
      optionNo: "Maaf, berhalangan hadir",
      guestCount: "Jumlah Tamu",
      message: "Ucapan & Doa",
      messagePlaceholder: "Tulis ucapan dan doa terbaik Anda...",
      submit: "Kirim",
      sending: "Mengirim...",
      success: "Jazaakumullahu khairan, ucapan Anda sudah kami terima.",
      error: "Maaf, terjadi kendala. Silakan coba lagi.",
    },

    // Tampilkan jumlah tamu (untuk keperluan katering)
    showGuestCount: true,
  },

  wishes: {
    enabled: true,
    title: "Ucapan & Doa",
    emptyText: "Belum ada ucapan. Jadilah yang pertama memberikan doa.",
    // Berapa ucapan yang tampil sebelum tombol "Lihat lebih banyak"
    perPage: 5,
  },


  /* ==========================================================================
   *  13. AMPLOP DIGITAL / HADIAH
   *  Tambah / hapus blok rekening sesuai kebutuhan.
   * ========================================================================== */
  gift: {
    enabled: true,
    title: "Amplop Digital",
    subtitle:
      "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. " +
      "Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.",
    buttonText: "Kirim Hadiah",

    accounts: [
      {
        bank: "Bank Jago",
        number: "101828864007",
        holder: "MOHAMMAD YUSRIL IQBAL HABIBANA",
        logo: "", // opsional, path ke logo bank
      },
      {
        bank: "Bank Mandiri",
        number: "1310024438345",
        holder: "HANAN AMIRAH NUR RAHMI",
        logo: "",
      },
    ],

    // Alamat kirim kado fisik. Kosongkan "" kalau tidak dipakai.
    address: {
      enabled: false,
      label: "Kirim Hadiah",
      name: "",
      detail: "",
    },

    copyText: "Salin",
    copiedText: "Tersalin!",
  },


  /* ==========================================================================
   *  14. PENUTUP
   * ========================================================================== */
  closing: {
    enabled: true,

    text:
      "Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila " +
      "Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",

    duaArabic: "بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِيْ خَيْرٍ",

    duaTranslation:
      "Semoga Allah memberkahimu dan memberkahi atasmu, serta menyatukan " +
      "kalian berdua dalam kebaikan.",

    salam: "وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",

    thanks: "Kami yang berbahagia,",
    familyLine: "Keluarga Besar Kedua Mempelai",
  },


  /* ==========================================================================
   *  15. FOOTER & TOMBOL SHARE
   * ========================================================================== */
  footer: {
    // Tombol untuk mengirim link undangan ke tamu lewat WhatsApp
    shareButton: true,
    shareButtonText: "Bagikan Undangan",
    shareTemplate:
      "Assalamu'alaikum warahmatullahi wabarakatuh\n\n" +
      "Dengan memohon rahmat dan ridho Allah, kami mengundang Bapak/Ibu/Saudara/i " +
      "untuk menghadiri walimatul 'urs kami.\n\n" +
      "Berikut link undangan kami:\n{link}\n\n" +
      "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\n" +
      "Jazaakumullahu khairan.",

    credit: "Dibuat dengan penuh doa",
    creditName: "",
    creditUrl: "",
  },

};

/* ⚠️ JANGAN UBAH BARIS DI BAWAH INI —
   baris ini yang menyambungkan config ke halaman undangan. */
if (typeof window !== "undefined") { window.CONFIG = CONFIG; }
if (typeof module !== "undefined") { module.exports = CONFIG; }
