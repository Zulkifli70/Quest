import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { QUEST_THEME, CATEGORIES } from "../lib/constants";
import { todayKey } from "../lib/questLogic";
import SectionCard from "./SectionCard";
import { SwordIcon, PlusIcon, CheckIcon, TrashIcon } from "./icons";

const DailyQuests = () => {
  const { dailyQuests, addDailyQuest, toggleDailyQuest, deleteDailyQuest, notify } =
    useProductivity();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("Work");

  const today = todayKey();
  const todays = dailyQuests.filter((q) => q.date === today);
  const done = todays.filter((q) => q.completed).length;
  const progress = todays.length ? Math.round((done / todays.length) * 100) : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addDailyQuest({ title: title.trim(), difficulty, category });
    setTitle("");
  };

  const toggle = (q) => {
    toggleDailyQuest(q.id);
    notify(`${q.completed ? "-" : "+"}${q.xpReward} XP · ${q.completed ? "quest reopened" : "quest complete"}`);
  };

  return (
    <SectionCard
      title="Daily Quests"
      icon={<SwordIcon className="h-5 w-5" />}
      count={todays.length}
      countLabel={todays.length === 1 ? "quest today" : "quests today"}
      action={
        <span className="pixel text-[9px]" style={{ color: "var(--gold)" }}>
          {done}/{todays.length} done
        </span>
      }
    >
      <div className="bar mb-4">
        <span style={{ width: `${progress}%` }} />
      </div>

      <form onSubmit={submit} className="mb-4 flex flex-col gap-3">
        <div className="flex gap-3">
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New quest — e.g. read 20 pages"
            aria-label="New quest title"
          />
          <button type="submit" className="btn btn-primary btn-icon" aria-label="Add quest">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            className="input"
            style={{ width: "auto" }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            aria-label="Difficulty"
          >
            <option value="easy">Easy · {QUEST_THEME.easy.xp} XP</option>
            <option value="medium">Medium · {QUEST_THEME.medium.xp} XP</option>
            <option value="hard">Hard · {QUEST_THEME.hard.xp} XP</option>
          </select>
          <select
            className="input"
            style={{ width: "auto" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </form>

      {todays.length === 0 ? (
        <p
          className="mt-2 border-2 border-dashed px-4 py-6 text-center text-[15px]"
          style={{ borderColor: "var(--ink)", color: "var(--mute)" }}
        >
          No quests for today. Add your first quest above.
        </p>
      ) : (
        <div className="flex flex-col">
          {todays.map((q) => {
            const theme = QUEST_THEME[q.difficulty];
            return (
              <div key={q.id} className="item-row">
                <button
                  className="check"
                  data-done={q.completed}
                  onClick={() => toggle(q)}
                  aria-pressed={q.completed}
                  aria-label={q.completed ? "Mark quest incomplete" : "Complete quest"}
                >
                  <CheckIcon className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[16px]"
                    style={{
                      color: q.completed ? "var(--mute)" : "var(--text)",
                      textDecoration: q.completed ? "line-through" : "none",
                    }}
                  >
                    {q.title}
                  </p>
                  <p className="pixel mt-2 text-[8px]" style={{ color: theme.color }}>
                    {theme.label} · {q.xpReward} XP · {q.category}
                  </p>
                </div>
                <button
                  className="btn"
                  style={{ padding: 8 }}
                  onClick={() => deleteDailyQuest(q.id)}
                  aria-label="Delete quest"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {dailyQuests.filter((q) => q.date !== today).length > 0 && (
        <details
          className="mt-4 border-2 border-dashed p-3"
          style={{ borderColor: "var(--ink)" }}
        >
          <summary className="pixel cursor-pointer text-[8px]" style={{ color: "var(--mute)" }}>
            Previous days ({dailyQuests.filter((q) => q.date !== today).length})
          </summary>
          <div className="mt-3 flex flex-col gap-2">
            {dailyQuests
              .filter((q) => q.date !== today)
              .slice(0, 6)
              .map((q) => (
                <div key={q.id} className="flex items-center justify-between gap-3 text-[14px]">
                  <span style={{ color: q.completed ? "var(--mute)" : "var(--text)" }}>
                    {q.title} · {q.date}
                  </span>
                  <button
                    className="btn"
                    style={{ padding: 6 }}
                    onClick={() => deleteDailyQuest(q.id)}
                    aria-label="Delete quest"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </details>
      )}
    </SectionCard>
  );
};

export default DailyQuests;
