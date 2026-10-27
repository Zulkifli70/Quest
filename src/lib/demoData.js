export const DEMO_INITIAL_STATE = {
  totalXP: 340,
  level: 4,
  streak: { current: 5, best: 12, lastActiveDay: null },
  dailyQuests: [
    {
      id: "dq-1",
      title: "Selesaikan Laporan Proyek Q3",
      description: "Tinjau ulang metrik performa tim dan buat ringkasan.",
      date: new Date().toISOString().slice(0, 10),
      completed: true,
      xpReward: 50,
      difficulty: "hard",
      category: "Work",
      createdAt: new Date().toISOString(),
    },
    {
      id: "dq-2",
      title: "Olahraga Kardio 30 Menit",
      description: "Jogging ringan atau senam pagi di rumah.",
      date: new Date().toISOString().slice(0, 10),
      completed: false,
      xpReward: 25,
      difficulty: "medium",
      category: "Health",
      createdAt: new Date().toISOString(),
    },
    {
      id: "dq-3",
      title: "Baca Buku Minimal 15 Halaman",
      description: "Lanjutkan membaca buku pengembangan diri.",
      date: new Date().toISOString().slice(0, 10),
      completed: false,
      xpReward: 10,
      difficulty: "easy",
      category: "Learning",
      createdAt: new Date().toISOString(),
    }
  ],
  habits: [
    {
      id: "hb-1",
      name: "Minum Air Putih 2 Liter",
      description: "Jaga hidrasi tubuh sepanjang hari.",
      targetFrequency: 7,
      history: [new Date().toISOString().slice(0, 10)],
      category: "Health",
      isActive: true,
    },
    {
      id: "hb-2",
      name: "Meditasi 10 Menit",
      description: "Pagi atau malam sebelum tidur.",
      targetFrequency: 5,
      history: [],
      category: "Personal",
      isActive: true,
    }
  ],
  bigGoals: [
    {
      id: "bg-1",
      title: "Sertifikasi Cloud Profesional",
      description: "Belajar materi arsitektur cloud dan kerjakan latihan ujian.",
      targetDate: "2026-12-31",
      currentProgress: 60,
      priority: "high",
      xpReward: 300,
      category: "Learning",
      completed: false,
      subtasks: [
        { id: "st-1", title: "Pelajari Modul Jaringan", done: true },
        { id: "st-2", title: "Pelajari Modul Keamanan", done: true },
        { id: "st-3", title: "Ujian Percobaan Praktik", done: false },
      ]
    }
  ]
};
