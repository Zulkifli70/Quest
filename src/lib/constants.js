export const QUEST_THEME = {
  easy: { label: "Mudah", xp: 10, color: "var(--good)" },
  medium: { label: "Sedang", xp: 25, color: "var(--gold)" },
  hard: { label: "Sulit", xp: 50, color: "var(--ember)" },
};

export const PRIORITY_THEME = {
  low: { label: "Rendah", color: "var(--mute)" },
  medium: { label: "Sedang", color: "var(--gold)" },
  high: { label: "Tinggi", color: "var(--ember)" },
};

/* Nilai tetap bahasa Inggris agar data lama tetap kompatibel; yang
   diterjemahkan hanya tampilannya. */
export const CATEGORIES = ["Work", "Health", "Learning", "Personal", "Finance"];

export const CATEGORY_LABELS = {
  Work: "Kerja",
  Health: "Kesehatan",
  Learning: "Belajar",
  Personal: "Pribadi",
  Finance: "Keuangan",
};

export const categoryLabel = (c) => CATEGORY_LABELS[c] || c;

export const DEFAULT_STATE = {
  dailyQuests: [],
  habits: [],
  bigGoals: [],
  totalXP: 0,
  level: 1,
  totalStreakDays: 0,
};
