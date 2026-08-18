/* ============================================================================
 *  CONTOH: UNDANGAN KHITANAN
 * ============================================================================
 *
 *  File ini menunjukkan bahwa template yang sama bisa dipakai untuk acara
 *  selain pernikahan. Yang berubah hanya isi config-nya — kode website tidak
 *  disentuh sama sekali.
 *
 *  Triknya:
 *  - brideShort dikosongkan  -> tanda "&" di cover otomatis hilang
 *  - couple.bride dikosongkan -> hanya satu tokoh utama yang ditampilkan
 *  - couple.groom dipakai untuk anak yang dikhitan
 *
 *  Pola yang sama berlaku untuk aqiqah, tasyakuran, wisuda, atau ulang tahun.
 *
 *  Cara pakai: salin file ini ke  assets/js/config.js
 * ========================================================================== */

const CONFIG = {

  meta: {
    title: "Undangan Khitanan Ahmad Zaidan",
    description:
      "Dengan memohon rahmat Allah Subhanahu wa Ta'ala, kami mengundang " +
      "Bapak/Ibu/Saudara/i untuk menghadiri syukuran khitanan putra kami.",
    ogImage: "",
    favicon: "assets/img/favicon.svg",
  },

  theme: {
    preset: "terracotta",
    colors: {
      primary: "#A25E43", secondary: "#C2A05E", bg: "#FCF6F0",
      surface: "#FFFFFF", text: "#3D3029", muted: "#82706A",
    },
    fontDisplay: "Cormorant Garamond",
    fontScript: "Parisienne",
    fontBody: "Jost",
    fontArabic: "Amiri",
    ornament: "floral",
  },

  music: { enabled: false, url: "", title: "" },

  cover: {
    eyebrow: "Syukuran",
    eventType: "Walimatul Khitan",
    groomShort: "Zaidan",
    brideShort: "",              // ← dikosongkan, jadi tidak ada "&"
    nameOrder: "groom-first",
    dateText: "12 Juli 2027",
    guestLabel: "Kepada Yth.",
    guestDefault: "Bapak / Ibu / Saudara/i",
    buttonText: "Buka Undangan",
  },

  opening: {
    enabled: true,
    bismillah: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    verseArabic: "اَلْفِطْرَةُ خَمْسٌ: اَلْخِتَانُ، وَالْاِسْتِحْدَادُ، وَنَتْفُ الْاِبِطِ، وَتَقْلِيْمُ الْاَظْفَارِ، وَقَصُّ الشَّارِبِ",
    verseTranslation:
      "Fitrah itu ada lima: khitan, mencukur bulu kemaluan, mencabut bulu ketiak, " +
      "memotong kuku, dan memangkas kumis.",
    verseSource: "HR. Bukhari & Muslim",
    salam: "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
    intro:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, " +
      "kami bermaksud menyelenggarakan syukuran khitanan putra kami:",
  },

  couple: {
    showPhotos: false,
    order: "groom-first",
    groom: {
      label: "Ananda",
      fullName: "Ahmad Zaidan Alfarizi",
      nickname: "Zaidan",
      childOrder: "Putra kedua dari",
      fatherName: "Bapak Muhammad Ridwan",
      motherName: "Ibu Siti Aminah",
      instagram: "",
      photo: "",
    },
    bride: null,                 // ← dikosongkan, hanya satu tokoh utama
  },

  events: {
    enabled: true,
    title: "Waktu & Tempat",
    subtitle: "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.",
    list: [
      {
        name: "Syukuran Khitan",
        date: "2027-07-12",
        timeStart: "09:00",
        timeEnd: "13:00",
        timezone: "WIB",
        venueName: "Kediaman Keluarga",
        venueAddress: "Jl. Melati No. 21, Kec. Lowokwaru, Kota Malang, Jawa Timur",
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
    target: "2027-07-12T09:00:00",
    utcOffset: "+07:00",
    labels: { days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" },
    finishedText: "Alhamdulillah, acara telah terlaksana.",
  },

  adab: { enabled: false, title: "", subtitle: "", items: [] },
  story: { enabled: false, title: "", subtitle: "", items: [] },
  gallery: { enabled: false, title: "Galeri", subtitle: "", images: [] },

  rsvp: {
    enabled: true,
    title: "Konfirmasi Kehadiran",
    subtitle: "Mohon konfirmasi kehadiran agar kami dapat mempersiapkan dengan baik.",
    endpoint: "",
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

  gift: { enabled: false, title: "", subtitle: "", buttonText: "", accounts: [],
          address: { enabled: false, label: "", name: "", detail: "" },
          copyText: "Salin", copiedText: "Tersalin!" },

  closing: {
    enabled: true,
    text:
      "Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila " +
      "Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
    duaArabic: "بَارَكَ اللهُ لَكُمْ وَجَعَلَهُ وَلَدًا صَالِحًا",
    duaTranslation: "Semoga Allah memberkahi kalian dan menjadikannya anak yang shalih.",
    salam: "وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
    thanks: "Kami yang berbahagia,",
    familyLine: "Keluarga Bapak Muhammad Ridwan",
  },

  footer: {
    shareButton: true,
    shareButtonText: "Bagikan Undangan",
    shareTemplate:
      "Assalamu'alaikum warahmatullahi wabarakatuh\n\n" +
      "Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri syukuran khitanan putra kami.\n\n" +
      "Berikut link undangannya:\n{link}\n\n" +
      "Merupakan suatu kehormatan bagi kami apabila berkenan hadir.",
    credit: "Dibuat dengan penuh doa",
    creditName: "",
    creditUrl: "",
  },

};

/* ⚠️ JANGAN UBAH BARIS DI BAWAH INI. */
if (typeof window !== "undefined") { window.CONFIG = CONFIG; }
if (typeof module !== "undefined") { module.exports = CONFIG; }
