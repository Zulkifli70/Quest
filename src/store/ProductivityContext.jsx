import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_STATE, QUEST_THEME } from "../lib/constants";
import { uid, todayKey, levelFromXP } from "../lib/questLogic";

/* eslint-disable react-refresh/only-export-components */
const STORAGE_KEY = "zulk-coin:productivity:v1";

const ProductivityContext = createContext(null);

const HABIT_XP = 8;
const SUBTASK_XP = 5;

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
  return { ...DEFAULT_STATE };
};

export const ProductivityProvider = ({ children }) => {
  const [state, setState] = useState(loadState);
  const [toast, setToast] = useState(null);
  const [levelUp, setLevelUp] = useState(null);
  const prevLevel = useRef(levelFromXP(state.totalXP).level);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const level = levelFromXP(state.totalXP).level;
    if (level > prevLevel.current) setLevelUp({ level });
    prevLevel.current = level;
  }, [state.totalXP]);

  const value = useMemo(() => {
    return {
      ...state,
      levelInfo: levelFromXP(state.totalXP),
      toast,
      notify: (message) => setToast({ id: uid(), message }),
      levelUp,
      dismissLevelUp: () => setLevelUp(null),

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

      resetAll: () => setState({ ...DEFAULT_STATE }),

      gainXP: (amount) =>
        setState((s) => ({ ...s, totalXP: Math.max(0, s.totalXP + amount) })),
    };
  }, [state, toast, levelUp]);

  return (
    <ProductivityContext.Provider value={value}>{children}</ProductivityContext.Provider>
  );
};

export const useProductivity = () => {
  const ctx = useContext(ProductivityContext);
  if (!ctx) throw new Error("useProductivity must be used within ProductivityProvider");
  return ctx;
};
