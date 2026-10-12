import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { QUEST_THEME, CATEGORIES } from "../lib/constants";
import { todayKey } from "../lib/questLogic";
import SectionCard from "./SectionCard";
import { SwordIcon, PlusIcon, CheckIcon, TrashIcon } from "./icons";

const DailyQuests = () => {
  const { dailyQuests, addDailyQuest, toggleDailyQuest, deleteDailyQuest } = useProductivity();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("Personal");
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

  return (
    <SectionCard
      title="Daily Quests"
      count={todays.length}
      countLabel={todays.length === 1 ? "quest today" : "quests today"}
      icon={<SwordIcon className="h-5 w-5 text-amber-300" />}
      accent="bg-amber-500/15 border border-amber-500/20"
      action={
        <span className="text-xs font-bold text-amber-300">
          {done}/{todays.length} done
        </span>
      }
    >
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form onSubmit={submit} className="mb-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New quest — e.g. Read 20 pages"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
          />
          <button
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-slate-950 transition hover:bg-amber-400"
            aria-label="Add quest"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 outline-none"
          >
            <option value="easy">Easy (+10 XP)</option>
            <option value="medium">Medium (+25 XP)</option>
            <option value="hard">Hard (+50 XP)</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="flex flex-col gap-2.5">
        {todays.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 px-4 py-6 text-center text-sm text-slate-500">
            No quests for today. Add your first quest above.
          </p>
        )}
        {todays.map((q) => {
          const theme = QUEST_THEME[q.difficulty];
          return (
            <div
              key={q.id}
              className={`group flex items-center gap-3 rounded-2xl border bg-slate-800/70 px-3 py-3 transition ${q.completed ? "border-emerald-500/30 opacity-75" : `border-slate-700 ${theme.ring}`}`}
            >
              <button
                onClick={() => toggleDailyQuest(q.id)}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 transition ${q.completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-600 bg-slate-900 text-transparent hover:border-amber-500/50"}`}
                aria-label={q.completed ? "Mark incomplete" : "Complete quest"}
              >
                <CheckIcon className="h-4 w-4" />
              </button>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-semibold ${q.completed ? "text-slate-400 line-through" : "text-slate-100"}`}>
                  {q.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${theme.badge}`}>
                    {theme.label} · {q.xpReward} XP
                  </span>
                  <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    {q.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteDailyQuest(q.id)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-slate-500 opacity-0 transition hover:bg-rose-500/15 hover:text-rose-400 group-hover:opacity-100"
                aria-label="Delete quest"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      {dailyQuests.filter((q) => q.date !== today).length > 0 && (
        <details className="mt-4 rounded-xl border border-slate-700/60 bg-slate-800/30 px-3 py-2">
          <summary className="cursor-pointer list-none text-xs font-semibold text-slate-400">
            Previous days ({dailyQuests.filter((q) => q.date !== today).length})
          </summary>
          <div className="mt-2 flex flex-col gap-2">
            {dailyQuests
              .filter((q) => q.date !== today)
              .slice(0, 6)
              .map((q) => (
                <div key={q.id} className="flex items-center justify-between rounded-xl bg-slate-800 px-3 py-2 text-xs">
                  <span className={q.completed ? "text-slate-500 line-through" : "text-slate-300"}>
                    {q.title} · {q.date}
                  </span>
                  <button onClick={() => deleteDailyQuest(q.id)} className="text-slate-500 hover:text-rose-400">
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
