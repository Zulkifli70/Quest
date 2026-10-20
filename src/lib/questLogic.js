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

/* Streak naik sekali per hari aktif (misi selesai, habit check-in, atau
   subtask dicentang). Bolong sehari current kembali ke 0 saat mulai lagi;
   best tetap tersimpan. Uncheck tidak mengembalikan streak (disepakati). */
export const advanceStreak = (streak, today) => {
  if (streak.lastActiveDay === today) return streak;
  const gap = streak.lastActiveDay
    ? daysBetween(streak.lastActiveDay, today)
    : null;
  const current = gap === 1 ? streak.current + 1 : 1;
  return { current, best: Math.max(streak.best || 0, current), lastActiveDay: today };
};

export const LEVEL_STEP = 100;
const LEVEL_GROWTH = 50;

/* XP menuju level berikutnya naik tiap level: 100, 150, 200, ...
   ponytail: linear +50/level; ganti ke kurva perkalian (mis. ×1.2) kalau
   pacing level tinggi perlu makin curam. */
export const levelFromXP = (xp) => {
  const safe = Math.max(0, xp);
  let level = 1;
  let current = safe;
  while (current >= LEVEL_STEP + (level - 1) * LEVEL_GROWTH) {
    current -= LEVEL_STEP + (level - 1) * LEVEL_GROWTH;
    level += 1;
  }
  return {
    level,
    current,
    needed: LEVEL_STEP + (level - 1) * LEVEL_GROWTH,
    progress: current,
  };
};
