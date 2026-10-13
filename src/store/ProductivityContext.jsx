import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_STATE, QUEST_THEME } from "../lib/constants";
import { uid, todayKey, levelFromXP } from "../lib/questLogic";

/* eslint-disable react-refresh/only-export-components */
const STORAGE_KEY = "zulk-coin:productivity:v1";

const ProductivityContext = createContext(null);

const HABIT_XP = 8;
const SUBTASK_XP = 5;

const seedState = () => {
  const today = todayKey();
  return {
    ...DEFAULT_STATE,
    dailyQuests: [
      {
        id: uid(),
        title: "Minum air 2L",
        description: "Jaga hidrasi sepanjang hari",
        date: today,
        completed: false,
        xpReward: QUEST_THEME.easy.xp,
        difficulty: "easy",
        category: "Health",
        createdAt: new Date().toISOString(),
      },
      {
        id: uid(),
        title: "Selesaikan proposal proyek",
        description: "Susun draf dan kerangka roadmap Q3",
        date: today,
        completed: false,
        xpReward: QUEST_THEME.hard.xp,
        difficulty: "hard",
        category: "Work",
        createdAt: new Date().toISOString(),
      },
    ],
    habits: [
      {
        id: uid(),
        name: "Lari pagi",
        description: "Jogging 30 menit",
        targetFrequency: 7,
        history: [],
        category: "Health",
        isActive: true,
      },
    ],
    bigGoals: [
      {
        id: uid(),
        title: "Persiapan wawancara",
        description: "Dapatkan posisi frontend — belajar, latihan, dan membangun",
        targetDate: new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10),
        currentProgress: 0,
        priority: "high",
        xpReward: 300,
        category: "Learning",
        completed: false,
        subtasks: [
          { id: uid(), title: "Pelajari DSA", done: true },
          { id: uid(), title: "Pelajari fungsi JS", done: false },
          { id: uid(), title: "Pelajari pembuatan UI", done: false },
          { id: uid(), title: "Simulasi wawancara", done: false },
        ],
      },
      {
        id: uid(),
        title: "Rilis aplikasi produktivitas",
        description: "Luncurkan aplikasi produktivitas bertema misi v1",
        targetDate: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
        currentProgress: 0,
        priority: "medium",
        xpReward: 500,
        category: "Work",
        completed: false,
        subtasks: [
          { id: uid(), title: "Model data inti", done: true },
          { id: uid(), title: "UI misi", done: true },
          { id: uid(), title: "Simpan data & poles", done: false },
        ],
      },
    ],
  };
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        bigGoals: (parsed.bigGoals || []).map((g) => ({
          ...g,
          subtasks: g.subtasks || [],
          completed: g.completed || false,
        })),
      };
    }
  } catch {
    /* ignore */
  }
  return seedState();
};

export const ProductivityProvider = ({ children }) => {
  const [state, setState] = useState(loadState);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(() => {
    return {
      ...state,
      levelInfo: levelFromXP(state.totalXP),
      toast,
      notify: (message) => setToast({ id: uid(), message }),

      addDailyQuest: ({ title, description = "", difficulty = "easy", category = "Personal" }) =>
        setState((s) => ({
          ...s,
          dailyQuests: [
            {
              id: uid(),
              title,
              description,
              date: todayKey(),
              completed: false,
              xpReward: QUEST_THEME[difficulty].xp,
              difficulty,
              category,
              createdAt: new Date().toISOString(),
            },
            ...s.dailyQuests,
          ],
        })),

      toggleDailyQuest: (id) =>
        setState((s) => {
          let delta = 0;
          const dailyQuests = s.dailyQuests.map((q) => {
            if (q.id !== id) return q;
            delta = q.completed ? -q.xpReward : q.xpReward;
            return { ...q, completed: !q.completed };
          });
          return { ...s, dailyQuests, totalXP: Math.max(0, s.totalXP + delta) };
        }),

      deleteDailyQuest: (id) =>
        setState((s) => ({ ...s, dailyQuests: s.dailyQuests.filter((q) => q.id !== id) })),

      addHabit: ({ name, description = "", targetFrequency = 7, category = "Personal" }) =>
        setState((s) => ({
          ...s,
          habits: [
            {
              id: uid(),
              name,
              description,
              targetFrequency,
              history: [],
              category,
              isActive: true,
            },
            ...s.habits,
          ],
        })),

      completeHabit: (id) =>
        setState((s) => {
          const today = todayKey();
          let gained = 0;
          const habits = s.habits.map((h) => {
            if (h.id !== id) return h;
            const history = h.history || [];
            if (history.includes(today)) return h;
            gained = HABIT_XP;
            return { ...h, history: [...history, today] };
          });
          return { ...s, habits, totalXP: s.totalXP + gained };
        }),

      deleteHabit: (id) =>
        setState((s) => ({ ...s, habits: s.habits.filter((h) => h.id !== id) })),

      addBigGoal: ({
        title,
        description = "",
        targetDate,
        priority = "medium",
        category = "Personal",
        xpReward = 300,
        subtasks = [],
      }) =>
        setState((s) => ({
          ...s,
          bigGoals: [
            {
              id: uid(),
              title,
              description,
              targetDate,
              currentProgress: 0,
              priority,
              xpReward,
              category,
              completed: false,
              subtasks: subtasks.map((t) => ({
                id: uid(),
                title: t.title,
                done: false,
              })),
            },
            ...s.bigGoals,
          ],
        })),

      addSubtask: (goalId, title) =>
        setState((s) => ({
          ...s,
          bigGoals: s.bigGoals.map((g) =>
            g.id === goalId
              ? { ...g, subtasks: [...(g.subtasks || []), { id: uid(), title, done: false }] }
              : g
          ),
        })),

      toggleSubtask: (goalId, subtaskId) =>
        setState((s) => {
          let delta = 0;
          const bigGoals = s.bigGoals.map((g) => {
            if (g.id !== goalId) return g;
            const subtasks = (g.subtasks || []).map((t) => {
              if (t.id !== subtaskId) return t;
              delta += t.done ? -SUBTASK_XP : SUBTASK_XP;
              return { ...t, done: !t.done };
            });
            const allDone = subtasks.length > 0 && subtasks.every((t) => t.done);
            if (allDone && !g.completed) delta += g.xpReward;
            if (!allDone && g.completed) delta -= g.xpReward;
            return { ...g, subtasks, completed: allDone };
          });
          return { ...s, bigGoals, totalXP: Math.max(0, s.totalXP + delta) };
        }),

      deleteSubtask: (goalId, subtaskId) =>
        setState((s) => ({
          ...s,
          bigGoals: s.bigGoals.map((g) =>
            g.id === goalId
              ? { ...g, subtasks: (g.subtasks || []).filter((t) => t.id !== subtaskId) }
              : g
          ),
        })),

      deleteBigGoal: (id) =>
        setState((s) => ({ ...s, bigGoals: s.bigGoals.filter((g) => g.id !== id) })),

      resetAll: () => setState(seedState()),

      gainXP: (amount) =>
        setState((s) => ({ ...s, totalXP: Math.max(0, s.totalXP + amount) })),
    };
  }, [state, toast]);

  return (
    <ProductivityContext.Provider value={value}>{children}</ProductivityContext.Provider>
  );
};

export const useProductivity = () => {
  const ctx = useContext(ProductivityContext);
  if (!ctx) throw new Error("useProductivity must be used within ProductivityProvider");
  return ctx;
};
