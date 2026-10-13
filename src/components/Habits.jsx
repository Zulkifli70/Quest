import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { CATEGORIES } from "../lib/constants";
import { todayKey, lastNDays } from "../lib/questLogic";
import SectionCard from "./SectionCard";
import { FlameIcon, PlusIcon, CheckIcon, TrashIcon } from "./icons";

const Habits = () => {
  const { habits, addHabit, completeHabit, deleteHabit, notify } = useProductivity();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Health");
  const [target, setTarget] = useState(7);
  const [showForm, setShowForm] = useState(false);

  const today = todayKey();
  const week = lastNDays(7);
  const active = habits.filter((h) => h.isActive);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit({ name: name.trim(), category, targetFrequency: Number(target) });
    setName("");
    setShowForm(false);
  };

  const checkIn = (h) => {
    if ((h.history || []).includes(today)) return;
    completeHabit(h.id);
    notify(`+8 XP · ${h.name}`);
  };

  return (
    <SectionCard
      title="Habits"
      icon={<FlameIcon className="h-5 w-5" />}
      count={active.length}
      countLabel={active.length === 1 ? "habit" : "habits"}
      action={
        <button
          className="btn btn-icon"
          onClick={() => setShowForm((s) => !s)}
          aria-label="Add habit"
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Habit name — e.g. meditate"
            aria-label="Habit name"
          />
          <div className="flex flex-wrap gap-3">
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
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              aria-label="Weekly target"
            >
              <option value={3}>3x / week</option>
              <option value={5}>5x / week</option>
              <option value={7}>7x / week</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      )}

      {active.length === 0 ? (
        <p
          className="mt-2 border-2 border-dashed px-4 py-6 text-center text-[15px]"
          style={{ borderColor: "var(--ink)", color: "var(--mute)" }}
        >
          No habits yet. Add one and build the week.
        </p>
      ) : (
        <div className="flex flex-col">
          {active.map((h) => {
            const history = h.history || [];
            const doneToday = history.includes(today);
            const count = history.filter((k) => week.includes(k)).length;
            const filled = Math.min(count, h.targetFrequency);

            return (
              <div key={h.id} className="item-row">
                <button
                  className="check"
                  data-done={doneToday}
                  onClick={() => checkIn(h)}
                  disabled={doneToday}
                  aria-pressed={doneToday}
                  aria-label={doneToday ? "Already checked in today" : `Check in ${h.name}`}
                >
                  <CheckIcon className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[16px]">{h.name}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="dots" aria-hidden="true">
                      {Array.from({ length: h.targetFrequency }).map((_, i) => (
                        <span key={i} className="dot" data-on={i < filled} />
                      ))}
                    </span>
                    <span className="pixel text-[8px]" style={{ color: "var(--mute)" }}>
                      {count}/{h.targetFrequency} this week
                    </span>
                  </div>
                </div>
                <button
                  className="btn"
                  style={{ padding: 8 }}
                  onClick={() => deleteHabit(h.id)}
                  aria-label="Delete habit"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </SectionCard>
  );
};

export default Habits;
