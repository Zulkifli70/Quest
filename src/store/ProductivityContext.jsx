import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_STATE, QUEST_THEME } from "../lib/constants";
import { uid, todayKey, levelFromXP } from "../lib/questLogic";

/* eslint-disable react-refresh/only-export-components */
const STORAGE_KEY = "zulk-coin:productivity:v1";

const ProductivityContext = createContext(null);

const HABIT_XP = 8;

const seedState = () => {
  const today = todayKey();
  return {
    ...DEFAULT_STATE,
    dailyQuests: [
      {
        id: uid(),
        title: "Drink 2L of water",
        description: "Stay hydrated throughout the day",
        date: today,
        completed: false,
        xpReward: QUEST_THEME.easy.xp,
        difficulty: "easy",
        category: "Health",
        createdAt: new Date().toISOString(),
      },
      {
        id: uid(),
        title: "Finish project proposal",
        description: "Draft and outline the Q3 roadmap",
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
        name: "Morning run",
        description: "30 minutes jog",
        targetFrequency: 7,
        history: [],
        category: "Health",
        isActive: true,
      },
    ],
    bigGoals: [
      {
        id: uid(),
        title: "Ship the productivity app",
        description: "Launch quest-themed productivity app v1",
        targetDate: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
        currentProgress: 35,
        priority: "high",
        xpReward: 500,
        category: "Work",
        completed: false,
        milestones: [
          { id: uid(), title: "Core models", targetProgress: 25, achieved: true, achievedAt: new Date().toISOString() },
          { id: uid(), title: "Quest UI", targetProgress: 50, achieved: false, achievedAt: null },
          { id: uid(), title: "Persist & polish", targetProgress: 75, achieved: false, achievedAt: null },
        ],
      },
    ],
  };
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
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
        milestones = [],
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
              milestones: milestones.map((m) => ({
                id: uid(),
                title: m.title,
                targetProgress: m.targetProgress,
                achieved: false,
                achievedAt: null,
              })),
            },
            ...s.bigGoals,
          ],
        })),

      setGoalProgress: (id, progress) =>
        setState((s) => ({
          ...s,
          bigGoals: s.bigGoals.map((g) =>
            g.id === id
              ? {
                  ...g,
                  currentProgress: Math.min(100, Math.max(0, progress)),
                  milestones: g.milestones.map((m) => ({
                    ...m,
                    achieved: m.targetProgress <= progress ? true : m.achieved,
                    achievedAt:
                      m.targetProgress <= progress && !m.achievedAt
                        ? new Date().toISOString()
                        : m.achievedAt,
                  })),
                }
              : g
          ),
        })),

      toggleMilestone: (goalId, milestoneId) =>
        setState((s) => ({
          ...s,
          bigGoals: s.bigGoals.map((g) =>
            g.id !== goalId
              ? g
              : {
                  ...g,
                  milestones: g.milestones.map((m) =>
                    m.id !== milestoneId
                      ? m
                      : { ...m, achieved: !m.achieved, achievedAt: !m.achieved ? new Date().toISOString() : null }
                  ),
                }
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
