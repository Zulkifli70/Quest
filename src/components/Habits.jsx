import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { CATEGORIES } from "../lib/constants";
import { todayKey } from "../lib/questLogic";
import SectionCard from "./SectionCard";
import { FlameIcon, PlusIcon, CheckIcon, TrashIcon } from "./icons";

const Habits = () => {
  const { habits, addHabit, completeHabit, deleteHabit } = useProductivity();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Personal");
  const [showForm, setShowForm] = useState(false);
  const today = todayKey();
  const active = habits.filter((h) => h.isActive);
  const doneToday = habits.filter((h) => h.lastCompleted === today).length;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit({ name: name.trim(), category });
    setName("");
    setShowForm(false);
  };

  return (
    <SectionCard
      title="Habits"
      count={active.length}
      countLabel={`${active.length === 1 ? "habit" : "habits"} · ${doneToday} done today`}
      icon={<FlameIcon className="h-5 w-5 text-orange-300" />}
      accent="bg-orange-500/15 border border-orange-500/20"
      action={
        <button
          onClick={() => setShowForm((s) => !s)}
          className="grid h-8 w-8 place-items-center rounded-xl bg-orange-500 text-slate-950 transition hover:bg-orange-400"
          aria-label="Add habit"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      }
    >
      {showForm && (
        <form onSubmit={submit} className="mb-4 flex flex-col gap-2 rounded-2xl border border-orange-500/20 bg-slate-800/70 p-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Habit name — e.g. Meditate"
            autoFocus
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
          />
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-orange-400"
            >
              Add
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-2.5">
        {active.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 px-4 py-6 text-center text-sm text-slate-500">
            No habits yet. Build your streak — click + to start.
          </p>
        )}
        {active.map((h) => {
          const completedToday = h.lastCompleted === today;
          return (
            <div
              key={h.id}
              className={`group flex items-center gap-3 rounded-2xl border bg-slate-800/70 px-3 py-3 ${completedToday ? "border-orange-500/30" : "border-slate-700"}`}
            >
              <button
                onClick={() => completeHabit(h.id)}
                disabled={completedToday}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 transition ${completedToday ? "border-orange-500 bg-orange-500 text-white" : "border-slate-600 bg-slate-900 text-transparent hover:border-orange-500/50 hover:text-orange-500/40"}`}
                aria-label={completedToday ? "Completed today" : "Complete habit"}
              >
                <CheckIcon className="h-4 w-4" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-100">{h.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold text-orange-300">
                    <FlameIcon className="h-3 w-3" />
                    {h.currentStreak}d streak
                  </span>
                  <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    Best {h.longestStreak}d · {h.totalCompletions} total
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteHabit(h.id)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-slate-500 opacity-0 transition hover:bg-rose-500/15 hover:text-rose-400 group-hover:opacity-100"
                aria-label="Delete habit"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default Habits;
