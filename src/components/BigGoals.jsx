import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { PRIORITY_THEME, CATEGORIES } from "../lib/constants";
import SectionCard from "./SectionCard";
import { TargetIcon, TrashIcon, ChevronDownIcon, FlameIcon, ZapIcon } from "./icons";

const BigGoals = () => {
  const {
    bigGoals,
    setGoalProgress,
    toggleMilestone,
    addBigGoal,
    deleteBigGoal,
    gainXP,
  } = useProductivity();
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newXP, setNewXP] = useState(300);
  const [newCategory, setNewCategory] = useState("Work");

  const submit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addBigGoal({
      title: newTitle.trim(),
      description: newDesc || undefined,
      targetDate: newDate,
      priority: newPriority,
      category: newCategory,
      xpReward: parseInt(newXP) || 300,
      milestones: [],
    });
    setShowForm(false);
    setNewTitle("");
    setNewDesc("");
    setNewDate("");
    setNewPriority("medium");
    setNewXP(300);
    setNewCategory("Work");
  };

  return (
    <SectionCard
      title="Big Goals"
      count={bigGoals.length}
      countLabel="active goal"
      icon={<TargetIcon className="h-5 w-5 text-amber-300" />}
      accent="bg-amber-500/15 border border-amber-500/20"
      action={
        <button
          onClick={() => setShowForm(true)}
          className="grid h-8 w-8 place-items-center rounded-xl bg-amber-500 text-slate-950 transition hover:bg-amber-400"
          aria-label="Add big goal"
        >
          <TargetIcon className="h-4 w-4" />
        </button>
      }
    >
      {showForm && (
        <form onSubmit={submit} className="mb-4 flex flex-col gap-4 rounded-2xl border border-amber-500/20 bg-slate-800/70 p-5">
          <div className="flex flex-col gap-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Goal title"
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description"
              rows={2}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none resize-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={newXP}
              onChange={(e) => setNewXP(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 outline-none"
            >
              <option value={150}>150 XP</option>
              <option value={300}>300 XP</option>
              <option value={500}>500 XP</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none"
            />
            <button
              type="submit"
              className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-slate-950 transition hover:bg-amber-400"
              aria-label="Create goal"
            >
              <TargetIcon className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3.5">
        {bigGoals.length === 0 && (
          <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 px-4 py-6 text-center text-sm text-slate-500">
            No big goals yet. What do you want to achieve this season?
          </p>
        )}
        {bigGoals.map((g) => {
          const priorityTheme = PRIORITY_THEME[g.priority];
          const percent = Math.min(100, Math.max(0, g.currentProgress));

          const completedMilestones = g.milestones.filter((m) => m.achieved);
          const uncompleted = g.milestones.filter((m) => !m.achieved);

          return (
            <div
              key={g.id}
              className={`flex flex-col rounded-3xl border bg-slate-800/70 shadow-lg transition ${g.priority === "high" ? "border-rose-500/40 ring-rose-500/20" : g.priority === "medium" ? "border-amber-500/40 ring-amber-500/20" : "border-sky-500/40 ring-sky-500/20"}`}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${priorityTheme.badge}`}>
                    <TargetIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-100">{g.title}</h3>
                    <p className="text-xs text-slate-400 truncate">{g.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {priorityTheme.label}
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-slate-300 bg-slate-800/70">{g.xpReward} XP</span>
                </div>
              </div>

              <div className="px-5 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-100">{g.title}</p>
                    <p className="text-xs text-slate-400 truncate">{g.targetDate}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-bold ${priorityTheme.bar} text-slate-100`}>
                    {percent}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-700"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {uncompleted.length > 0 && (
                  <details className="mt-3 rounded-xl border border-slate-700/60 bg-slate-800/30 p-3">
                    <summary className="cursor-pointer list-none flex items-center gap-2 text-xs text-slate-400">
                      <ChevronDownIcon className="h-3.5 w-3.5 text-slate-500" />
                      Milestones
                    </summary>
                    <div className="mt-2 space-y-1">
                      {uncompleted.map((m) => (
                        <div
                          key={m.id}
                          className={`flex items-center gap-2 rounded-xl bg-slate-700/50 px-3 py-1.5 text-xs ${m.achieved ? "text-emerald-400 opacity-80 line-through" : "text-slate-300"}`}
                        >
                          {m.title}
                          {m.targetProgress > 0 && (
                            <span className="ml-auto rounded-full bg-slate-800/50 px-2 py-0.5 text-[9px] font-bold text-slate-400">
                              {m.targetProgress}%
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {completedMilestones.length > 0 && (
                  <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                    <span className="font-semibold">Completed milestones:</span>
                    <span className="ml-2 text-emerald-400">{completedMilestones.length}</span>
                  </div>
                )}
              </div>

              <div className="px-5 py-2 flex items-center justify-between border-t border-slate-700/60">
                <button
                  onClick={() => setGoalProgress(g.id, (percent + 25) % 100)}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition"
                  aria-label="Increment progress"
                >
                  <FlameIcon className="h-3.5 w-3.5 text-amber-400" /> Progress
                </button>
                <button
                  onClick={() => {
                    toggleMilestone(g.id, g.milestones.find((m) => !m.achieved)?.id || "");
                    gainXP(15);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition"
                  aria-label="Toggle milestone"
                >
                  <ZapIcon className="h-3.5 w-3.5 text-amber-400" /> Milestone
                </button>
              </div>

              <button
                onClick={() => deleteBigGoal(g.id)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-400 hover:bg-rose-500/15 transition"
                aria-label="Delete goal"
              >
                <TrashIcon className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default BigGoals;