/* ============================================================================
 *  TEMPLATE KOSONG — UNDANGAN PERNIKAHAN
 * ============================================================================
 *
 *  Cara pakai:
 *  1. Salin file ini ke  assets/js/config.js  (timpa yang lama).
 *  2. Ganti semua tulisan yang bertanda [ ... ] dengan data acaramu.
 *  3. Buka index.html di browser untuk melihat hasilnya.
 *
 *  Atau lebih gampang: buka editor.html, klik "Muat config", pilih file ini,
 *  lalu isi lewat form.
 * ========================================================================== */

const CONFIG = {

  meta: {
    title: "Undangan Pernikahan [Nama Pria] & [Nama Wanita]",
    description:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, " +
      "kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.",
    ogImage: "",
    favicon: "assets/img/favicon.svg",
  },

  theme: {
    preset: "sage",              // sage | rose | navy | terracotta | custom
    colors: {
      primary: "#6B7F5E", secondary: "#B08D57", bg: "#FBF9F4",
      surface: "#FFFFFF", text: "#3A3A35", muted: "#7A7A70",
    },
    fontDisplay: "Cormorant Garamond",
    fontScript: "Parisienne",
    fontBody: "Jost",
    fontArabic: "Amiri",
    ornament: "geometric",       // geometric | floral | minimal
  },

  music: {
    enabled: false,
    url: "assets/audio/backsound.mp3",
    title: "",
  },

  cover: {
    eyebrow: "The Wedding Of",
    eventType: "Walimatul 'Urs",
    groomShort: "[Panggilan Pria]",
    brideShort: "[Panggilan Wanita]",
    nameOrder: "bride-first",
    dateText: "[1 Januari 2027]",
    guestLabel: "Kepada Yth.",
    guestDefault: "Bapak / Ibu / Saudara/i",
    buttonText: "Buka Undangan",
  },

  opening: {
    enabled: true,
    bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    verseArabic:
      "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا " +
      "وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    verseTranslation:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan " +
      "untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, " +
      "dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    verseSource: "QS. Ar-Rum : 21",
    salam: "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
    intro:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, " +
      "kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:",
  },

  couple: {
    showPhotos: false,
    order: "groom-first",
    groom: {
      label: "Mempelai Pria",
      fullName: "[Nama Lengkap Mempelai Pria]",
      nickname: "[Panggilan]",
      childOrder: "Putra [pertama] dari",
      fatherName: "Bapak [Nama Ayah]",
      motherName: "Ibu [Nama Ibu]",
      instagram: "",
      photo: "",
    },
    bride: {
      label: "Mempelai Wanita",
      fullName: "[Nama Lengkap Mempelai Wanita]",
      nickname: "[Panggilan]",
      childOrder: "Putri [pertama] dari",
      fatherName: "Bapak [Nama Ayah]",
      motherName: "Ibu [Nama Ibu]",
      instagram: "",
      photo: "",
    },
  },

  events: {
    enabled: true,
    title: "Waktu & Tempat",
    subtitle: "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.",
    list: [
      {
        name: "Akad Nikah",
        date: "2027-01-01",          // WAJIB format YYYY-MM-DD
        timeStart: "08:00",
        timeEnd: "10:00",
        timezone: "WIB",
        venueName: "[Nama Gedung / Masjid]",
        venueAddress: "[Alamat lengkap]",
        mapsUrl: "",
        note: "",
      },
      {
        name: "Resepsi",
        date: "2027-01-01",
        timeStart: "11:00",
        timeEnd: "14:00",
        timezone: "WIB",
        venueName: "[Nama Gedung]",
        venueAddress: "[Alamat lengkap]",
        mapsUrl: "",
        note: "",
      },
    ],
    calendarButton: true,
    calendarButtonText: "Simpan ke Kalender",
    mapsButtonText: "Lihat Lokasi",
  },

  countdown: {
    enabled: true,
    title: "Menuju Hari Bahagia",
    target: "2027-01-01T08:00:00",   // WAJIB format YYYY-MM-DDTHH:MM:SS
    utcOffset: "+07:00",             // +07:00 WIB | +08:00 WITA | +09:00 WIT
    labels: { days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" },
    finishedText: "Alhamdulillah, acara telah terlaksana.",
  },

  adab: {
    enabled: false,
    title: "Adab Menghadiri Walimah",
    subtitle: "Beberapa hal yang kami harapkan dari para tamu undangan:",
    items: [
      "[Poin pertama]",
      "[Poin kedua]",
    ],
  },

  story: {
    enabled: false,
    title: "Kisah Kami",
    subtitle: "",
    items: [
      { date: "[Tahun]", title: "[Judul]", text: "[Ceritanya di sini]" },
    ],
  },

  gallery: {
    enabled: false,
    title: "Galeri",
    subtitle: "",
    images: [],
  },

  rsvp: {
    enabled: true,
    title: "Konfirmasi Kehadiran",
    subtitle: "Mohon konfirmasi kehadiran Bapak/Ibu/Saudara/i agar kami dapat mempersiapkan dengan baik.",
    endpoint: "",                          // isi dengan link Google Apps Script
    whatsappFallback: "628123456789",      // dipakai kalau endpoint kosong
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
      success: "Terima kasih, ucapan Anda sudah kami terima.",
      error: "Maaf, terjadi kendala. Silakan coba lagi.",
    },
    showGuestCount: true,
  },

  wishes: {
    enabled: true,
    title: "Ucapan & Doa",
    emptyText: "Belum ada ucapan. Jadilah yang pertama memberikan doa.",
    perPage: 5,
  },

  gift: {
    enabled: false,
    title: "Amplop Digital",
    subtitle:
      "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. " +
      "Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.",
    buttonText: "Kirim Hadiah",
    accounts: [
      { bank: "[Nama Bank]", number: "[Nomor Rekening]", holder: "[ATAS NAMA]", logo: "" },
    ],
    address: { enabled: false, label: "Kirim Hadiah", name: "", detail: "" },
    copyText: "Salin",
    copiedText: "Tersalin!",
  },

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

  footer: {
    shareButton: true,
    shareButtonText: "Bagikan Undangan",
    shareTemplate:
      "Assalamu'alaikum warahmatullahi wabarakatuh\n\n" +
      "Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.\n\n" +
      "Berikut link undangan kami:\n{link}\n\n" +
      "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.",
    credit: "Dibuat dengan penuh doa",
    creditName: "",
    creditUrl: "",
  },

};

/* ⚠️ JANGAN UBAH BARIS DI BAWAH INI. */
if (typeof window !== "undefined") { window.CONFIG = CONFIG; }
if (typeof module !== "undefined") { module.exports = CONFIG; }
