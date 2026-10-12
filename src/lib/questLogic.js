export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const todayKey = (date = new Date()) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const daysBetween = (fromKey, toKey) => {
  const a = new Date(`${fromKey}T00:00:00`);
  const b = new Date(`${toKey}T00:00:00`);
  return Math.round((b - a) / 86400000);
};

export const xpNeededForLevel = (level) => 100 + (level - 1) * 50;

export const levelFromXP = (xp) => {
  let level = 1;
  let remaining = Math.max(0, xp);
  while (remaining >= xpNeededForLevel(level)) {
    remaining -= xpNeededForLevel(level);
    level += 1;
  }
  const needed = xpNeededForLevel(level);
  return {
    level,
    current: remaining,
    needed,
    progress: needed === 0 ? 0 : Math.round((remaining / needed) * 100),
  };
};

export const computeStreak = (lastCompleted, currentStreak, today = todayKey()) => {
  if (!lastCompleted) return 1;
  const gap = daysBetween(lastCompleted, today);
  if (gap === 0) return currentStreak;
  if (gap === 1) return currentStreak + 1;
  return 1;
};
