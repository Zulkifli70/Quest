export const QUEST_THEME = {
  easy: {
    label: "Easy",
    xp: 10,
    accent: "text-emerald-300",
    ring: "border-emerald-500/40",
    badge: "bg-emerald-500/15 text-emerald-300",
    glow: "shadow-emerald-500/20",
  },
  medium: {
    label: "Medium",
    xp: 25,
    accent: "text-amber-300",
    ring: "border-amber-500/40",
    badge: "bg-amber-500/15 text-amber-300",
    glow: "shadow-amber-500/20",
  },
  hard: {
    label: "Hard",
    xp: 50,
    accent: "text-rose-300",
    ring: "border-rose-500/40",
    badge: "bg-rose-500/15 text-rose-300",
    glow: "shadow-rose-500/20",
  },
};

export const PRIORITY_THEME = {
  low: { label: "Low", badge: "bg-sky-500/15 text-sky-300", bar: "bg-sky-400" },
  medium: { label: "Medium", badge: "bg-amber-500/15 text-amber-300", bar: "bg-amber-400" },
  high: { label: "High", badge: "bg-rose-500/15 text-rose-300", bar: "bg-rose-400" },
};

export const CATEGORIES = ["Work", "Health", "Learning", "Personal", "Finance"];

export const DEFAULT_STATE = {
  dailyQuests: [],
  habits: [],
  bigGoals: [],
  totalXP: 0,
  level: 1,
  totalStreakDays: 0,
};
