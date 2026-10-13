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

export const LEVEL_TIERS = [
  { min: 1, label: "Recruit" },
  { min: 11, label: "Adventurer" },
  { min: 21, label: "Knight" },
  { min: 31, label: "Commander" },
  { min: 41, label: "Viscount" },
  { min: 51, label: "Marquess" },
  { min: 61, label: "Duke" },
  { min: 71, label: "Hero" },
  { min: 81, label: "King" },
  { min: 91, label: "Legend" },
  { min: 101, label: "Myth" },
  { min: 111, label: "Immortal" },
];

export const getTier = (level) =>
  [...LEVEL_TIERS].reverse().find((t) => level >= t.min)?.label ?? "Recruit";

export const DEFAULT_STATE = {
  dailyQuests: [],
  habits: [],
  bigGoals: [],
  totalXP: 0,
  level: 1,
  totalStreakDays: 0,
};
