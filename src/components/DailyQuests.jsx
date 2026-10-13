import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { QUEST_THEME, CATEGORIES, categoryLabel } from "../lib/constants";
import { todayKey, isAllDailyDone } from "../lib/questLogic";
import { CELEBRATIONS, getRandomLine } from "../lib/celebrations";
import SectionCard from "./SectionCard";
import ConfirmDialog from "./ConfirmDialog";
import { SwordIcon, PlusIcon, CheckIcon, TrashIcon } from "./icons";

const DailyQuests = () => {
  const { dailyQuests, habits, addDailyQuest, toggleDailyQuest, deleteDailyQuest, notify } =
    useProductivity();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("Work");
  const [confirmQuest, setConfirmQuest] = useState(null);

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

  const commitToggle = (q) => {
    toggleDailyQuest(q.id);
    if (q.completed) {
      notify(`-${q.xpReward} XP · misi dibuka lagi`);
      return;
    }
    const after = dailyQuests.map((x) =>
      x.id === q.id ? { ...x, completed: true } : x
    );
    notify(
      isAllDailyDone(after, habits, today)
        ? getRandomLine(CELEBRATIONS.allDaily)
        : getRandomLine(CELEBRATIONS.quest[q.difficulty] || CELEBRATIONS.quest.easy)
    );
  };

  const toggle = (q) => {
    if (q.completed) commitToggle(q);
    else setConfirmQuest(q);
  };

  return (
    <SectionCard
      title="Misi Harian"
      icon={<SwordIcon className="h-5 w-5" />}
      count={todays.length}
      countLabel="misi hari ini"
      action={
        <span className="pixel text-[9px]" style={{ color: "var(--gold)" }}>
          {done}/{todays.length} selesai
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
            placeholder="Misi baru — mis. baca 20 halaman"
            aria-label="Judul misi baru"
          />
          <button type="submit" className="btn btn-primary btn-icon" aria-label="Tambah misi">
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            className="input"
            style={{ width: "auto" }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            aria-label="Tingkat kesulitan"
          >
            <option value="easy">Mudah · {QUEST_THEME.easy.xp} XP</option>
            <option value="medium">Sedang · {QUEST_THEME.medium.xp} XP</option>
            <option value="hard">Sulit · {QUEST_THEME.hard.xp} XP</option>
          </select>
          <select
            className="input"
            style={{ width: "auto" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Kategori"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {categoryLabel(c)}
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
          Belum ada misi untuk hari ini. Tambahkan misi pertamamu di atas.
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
                  aria-label={q.completed ? "Tandai misi belum selesai" : "Selesaikan misi"}
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
                    {theme.label} · {q.xpReward} XP · {categoryLabel(q.category)}
                  </p>
                </div>
                <button
                  className="btn"
                  style={{ padding: 8 }}
                  onClick={() => deleteDailyQuest(q.id)}
                  aria-label="Hapus misi"
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
            Hari sebelumnya ({dailyQuests.filter((q) => q.date !== today).length})
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
                    aria-label="Hapus misi"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </details>
      )}

      <ConfirmDialog
        open={!!confirmQuest}
        title="Selesaikan misi?"
        message={
          confirmQuest
            ? `"${confirmQuest.title}" akan ditandai selesai dan kamu mendapat +${confirmQuest.xpReward} XP.`
            : ""
        }
        onCancel={() => setConfirmQuest(null)}
        onConfirm={() => {
          commitToggle(confirmQuest);
          setConfirmQuest(null);
        }}
      />
    </SectionCard>
  );
};

export default DailyQuests;
