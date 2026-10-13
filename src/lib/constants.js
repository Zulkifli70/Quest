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
  { min: 1, label: "Recruit", color: "var(--mute)" },
  { min: 11, label: "Adventurer", color: "var(--good)" },
  { min: 21, label: "Knight", color: "var(--gold)" },
  { min: 31, label: "Commander", color: "var(--ember)" },
  { min: 41, label: "Viscount", color: "#b08df8" },
  { min: 51, label: "Marquess", color: "#4da6ff" },
  { min: 61, label: "Duke", color: "#22d3ee" },
  { min: 71, label: "Hero", color: "#fb7185" },
  { min: 81, label: "King", color: "#facc15" },
  { min: 91, label: "Legend", color: "#f97316" },
  { min: 101, label: "Myth", color: "#e879f9" },
  { min: 111, label: "Immortal", color: "#ffffff" },
];

export const getTier = (level) =>
  [...LEVEL_TIERS].reverse().find((t) => level >= t.min)?.label ?? "Recruit";

export const getTierColor = (level) =>
  [...LEVEL_TIERS].reverse().find((t) => level >= t.min)?.color ?? "var(--mute)";

export const DEFAULT_STATE = {
  dailyQuests: [],
  habits: [],
  bigGoals: [],
  totalXP: 0,
  level: 1,
  totalStreakDays: 0,
};
