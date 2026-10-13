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

export const lastNDays = (n, from = new Date()) => {
  const keys = [];
  for (let i = 0; i < n; i += 1) {
    const d = new Date(from);
    d.setDate(d.getDate() - i);
    keys.push(todayKey(d));
  }
  return keys;
};

/* True when nothing is pending today: semua misi hari ini kelar dan semua
   kebiasaan aktif sudah check-in. Dipakai untuk pesan "hari ini menang". */
export const isAllDailyDone = (quests, habits, today) => {
  const todays = quests.filter((q) => q.date === today);
  const activeHabits = habits.filter((h) => h.isActive);
  return (
    todays.length + activeHabits.length > 0 &&
    todays.every((q) => q.completed) &&
    activeHabits.every((h) => (h.history || []).includes(today))
  );
};

export const LEVEL_STEP = 100;

/* Level = floor(XP / 100) + 1 (design.md §5) */
export const levelFromXP = (xp) => {
  const safe = Math.max(0, xp);
  const level = Math.floor(safe / LEVEL_STEP) + 1;
  const current = safe % LEVEL_STEP;
  return {
    level,
    current,
    needed: LEVEL_STEP,
    progress: current,
  };
};
