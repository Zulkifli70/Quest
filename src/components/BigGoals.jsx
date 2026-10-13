import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { PRIORITY_THEME, CATEGORIES } from "../lib/constants";
import SectionCard from "./SectionCard";
import { TargetIcon, PlusIcon, TrashIcon, CheckIcon, FlameIcon } from "./icons";

const clamp = (n) => Math.min(100, Math.max(0, n));

const BigGoals = () => {
  const {
    bigGoals,
    setGoalProgress,
    toggleMilestone,
    addBigGoal,
    deleteBigGoal,
    notify,
  } = useProductivity();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [xpReward, setXpReward] = useState(300);
  const [category, setCategory] = useState("Work");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addBigGoal({
      title: title.trim(),
      description: description || undefined,
      targetDate,
      priority,
      category,
      xpReward: Number(xpReward) || 300,
      milestones: [],
    });
    setShowForm(false);
    setTitle("");
    setDescription("");
    setTargetDate("");
    setPriority("medium");
    setXpReward(300);
    setCategory("Work");
  };

  const advance = (g, percent) => {
    const next = (percent + 25) % 100;
    setGoalProgress(g.id, next);
    notify(`Quest progress · ${next}%`);
  };

  const toggle = (g, m) => {
    toggleMilestone(g.id, m.id);
    notify(`${m.achieved ? "-" : "+"}15 XP · ${m.achieved ? "milestone undone" : "milestone done"}`);
  };

  return (
    <SectionCard
      title="Big Goals"
      icon={<TargetIcon className="h-5 w-5" />}
      count={bigGoals.length}
      countLabel={bigGoals.length === 1 ? "active goal" : "active goals"}
      action={
        <button
          className="btn btn-icon"
          onClick={() => setShowForm((s) => !s)}
          aria-label="Add big goal"
          aria-expanded={showForm}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      }
    >
      {showForm && (
        <form
          onSubmit={submit}
          className="mb-4 flex flex-col gap-3 border-2 p-3"
          style={{ borderColor: "var(--gold-d)" }}
        >
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal title"
            aria-label="Goal title"
          />
          <textarea
            className="input resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={2}
            aria-label="Goal description"
          />
          <div className="flex flex-wrap gap-3">
            <select
              className="input"
              style={{ width: "auto" }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
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
            <select
              className="input"
              style={{ width: "auto" }}
              value={xpReward}
              onChange={(e) => setXpReward(e.target.value)}
              aria-label="XP reward"
            >
              <option value={150}>150 XP</option>
              <option value={300}>300 XP</option>
              <option value={500}>500 XP</option>
            </select>
            <input
              className="input"
              style={{ width: "auto" }}
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              aria-label="Target date"
            />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      )}

      {bigGoals.length === 0 ? (
        <p
          className="mt-2 border-2 border-dashed px-4 py-6 text-center text-[15px]"
          style={{ borderColor: "var(--ink)", color: "var(--mute)" }}
        >
          No big goals yet. What do you want to achieve this season?
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {bigGoals.map((g) => {
            const percent = clamp(g.currentProgress);
            const theme = PRIORITY_THEME[g.priority];
            const target = g.targetDate || "no date";

            return (
              <div
                key={g.id}
                className="border-4 p-3"
                style={{ borderColor: "var(--ink)", background: "var(--panel2)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <TargetIcon className="h-5 w-5" style={{ color: theme.color }} />
                    <div className="min-w-0">
                      <p className="pixel text-[9px]" style={{ color: "var(--gold)" }}>
                        {g.title}
                      </p>
                      <p className="mt-1 text-[13px]" style={{ color: "var(--mute)" }}>
                        {theme.label} · {target} · {g.xpReward} XP
                      </p>
                    </div>
                  </div>
                  <span className="pixel text-[9px]" style={{ color: "var(--gold)" }}>
                    {percent}%
                  </span>
                </div>

                <div className="bar mt-3">
                  <span style={{ width: `${percent}%` }} />
                </div>

                {g.milestones.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {g.milestones.map((m) => (
                      <div key={m.id} className="tree-child">
                        <button
                          className="check"
                          data-done={m.achieved}
                          onClick={() => toggle(g, m)}
                          aria-pressed={m.achieved}
                          aria-label={`Milestone ${m.title}`}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-[15px]"
                            style={{
                              color: m.achieved ? "var(--mute)" : "var(--text)",
                              textDecoration: m.achieved ? "line-through" : "none",
                            }}
                          >
                            {m.title}
                          </p>
                        </div>
                        <span className="pixel text-[8px]" style={{ color: "var(--mute)" }}>
                          {clamp(m.targetProgress)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between gap-3">
                  <button
                    className="btn"
                    onClick={() => advance(g, percent)}
                    aria-label="Advance goal progress"
                  >
                    <span className="flex items-center gap-2">
                      <FlameIcon className="h-4 w-4" /> Progress
                    </span>
                  </button>
                  <button
                    className="btn"
                    onClick={() => deleteBigGoal(g.id)}
                    aria-label="Delete goal"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
};

export default BigGoals;
