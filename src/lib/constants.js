export const QUEST_THEME = {
  easy: { label: "Easy", xp: 10, color: "var(--good)" },
  medium: { label: "Medium", xp: 25, color: "var(--gold)" },
  hard: { label: "Hard", xp: 50, color: "var(--ember)" },
};

export const PRIORITY_THEME = {
  low: { label: "Low", color: "var(--mute)" },
  medium: { label: "Medium", color: "var(--gold)" },
  high: { label: "High", color: "var(--ember)" },
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
