export const CELEBRATIONS = {
  quest: {
    easy: ["Kelar. Ezz banget.", "Auto kelar. Lanjut gas.", "Kecil, tapi tetap kehitung ya.", "Done. Gampang kan kalau udah mulai?"],
    medium: ["Mantap, ini lumayan bikin capek dan kamu tetap kelarin.", "Gak kabur pas mulai berat. Respect.", "Quest tumbang. Peta kamu maju lagi.", "Gak gampang, tapi kamu gercep juga ternyata."],
    hard: ["Bos tumbang. Kamu yang masih berdiri, bro.", "Yang bikin kamu deg-degan dari pagi, sekarang udah kelar.", "Ini yang bedain “rencana doang” sama “beneran jalan”. Kamu beneran jalan.", "Hal susah barusan jadi hal yang udah pernah kamu taklukin. Keren abis."],
  },
  allDaily: [
    "Papan quest bersih. Hari ini kamu menang.",
    "Gak ada utang ke hari ini. Rebahan dulu sana.",
    "Semua kelar. Besok mulai dari nol, tanpa beban lama.",
    "Hari ini kamu nepatin janji ke diri sendiri. Jarang loh itu.",
    "Daftar kosong. Saatnya santuy.",
  ],
  subtask: [
    "Satu potongan peta kepasang. Tujuan makin keliatan.",
    "Satu langkah dari jalan panjang. Sisanya tinggal dikit-dikit.",
    "Barnya gerak. Kamu bisa liat sendiri hasilnya.",
    "Yang gede gak pernah kelar sekaligus. Ini salah satu bagiannya.",
  ],
  subtaskHalf: "Udah setengah jalan, gak kerasa kan?",
  subtaskLast: "Tinggal dikit lagi nih, jangan kendor.",
  goal: [
    "Quest tamat. Yang tadinya cuma niat, sekarang beneran jadi.",
    "Dari janji jadi hasil. Itu gak kecil.",
    "Satu bab ketutup. Kamu nulisnya pakai tindakan, bukan cuma wacana.",
    "Kelar. Inget gak betapa jauhnya ini terasa pas awal mulai?",
    "Setiap langkah kecil akan membawamu ke tujuan. tetap berjuang!!",
  ],
  allGoals: [
    "Seluruh peta tuntas. Sangat sedikit orang yang sampai sini.",
    "Semua yang kamu mulai, kamu kelarin. Itu langka banget.",
    "Gak ada tujuan tersisa. Waktunya cari wilayah baru.",
    "Kamu udah jadi orang yang nyelesaiin, bukan cuma yang bikin rencana.",
  ],
};

export const getRandomLine = (arr) => arr[Math.floor(Math.random() * arr.length)];
