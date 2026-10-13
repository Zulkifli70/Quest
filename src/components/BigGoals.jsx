import { useState } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { PRIORITY_THEME, CATEGORIES, categoryLabel } from "../lib/constants";
import SectionCard from "./SectionCard";
import ConfirmDialog from "./ConfirmDialog";
import { TargetIcon, PlusIcon, TrashIcon, CheckIcon } from "./icons";

const BigGoals = () => {
  const {
    bigGoals,
    addBigGoal,
    deleteBigGoal,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    notify,
  } = useProductivity();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [xpReward, setXpReward] = useState(300);
  const [category, setCategory] = useState("Work");
  const [steps, setSteps] = useState("");
  const [drafts, setDrafts] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [confirmSub, setConfirmSub] = useState(null);

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
      subtasks: steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((t) => ({ title: t })),
    });
    setShowForm(false);
    setTitle("");
    setDescription("");
    setSteps("");
    setTargetDate("");
    setPriority("medium");
    setXpReward(300);
    setCategory("Work");
  };

  const submitSubtask = (e, goalId) => {
    e.preventDefault();
    const text = (drafts[goalId] || "").trim();
    if (!text) return;
    addSubtask(goalId, text);
    setDrafts((d) => ({ ...d, [goalId]: "" }));
  };

  const commitToggle = (goal, subtask) => {
    const others = (goal.subtasks || []).filter((t) => t.id !== subtask.id);
    const willComplete =
      !subtask.done && others.every((t) => t.done) && others.length > 0;
    toggleSubtask(goal.id, subtask.id);

    if (subtask.done) {
      notify(`-5 XP · ${subtask.title}`);
    } else if (willComplete) {
      notify(`+${goal.xpReward} XP · tujuan tercapai!`);
    } else {
      notify(`+5 XP · ${subtask.title}`);
    }
  };

  const toggle = (goal, subtask) => {
    if (subtask.done) commitToggle(goal, subtask);
    else setConfirmSub({ goal, subtask });
  };

  const subWillComplete =
    confirmSub &&
    (confirmSub.goal.subtasks || []).length > 1 &&
    (confirmSub.goal.subtasks || [])
      .filter((t) => t.id !== confirmSub.subtask.id)
      .every((t) => t.done);

  return (
    <SectionCard
      title="Tujuan Besar"
      icon={<TargetIcon className="h-5 w-5" />}
      count={bigGoals.length}
      countLabel="tujuan aktif"
      action={
        <button
          className="btn btn-icon btn-primary"
          onClick={() => setShowForm((s) => !s)}
          aria-label="Tambah tujuan besar"
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
            placeholder="Tujuan — mis. persiapan wawancara"
            aria-label="Judul tujuan"
          />
          <textarea
            className="input resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi"
            rows={2}
            aria-label="Deskripsi tujuan"
          />
          <textarea
            className="input resize-none"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder={
              "Rincikan jadi langkah kecil — satu per baris\npelajari DSA\npelajari fungsi JS\npelajari pembuatan UI"
            }
            rows={4}
            aria-label="Langkah, satu per baris"
          />
          <div className="flex flex-wrap gap-3">
            <select
              className="input"
              style={{ width: "auto" }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Prioritas"
            >
              <option value="low">Rendah</option>
              <option value="medium">Sedang</option>
              <option value="high">Tinggi</option>
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
            <select
              className="input"
              style={{ width: "auto" }}
              value={xpReward}
              onChange={(e) => setXpReward(e.target.value)}
              aria-label="Hadiah XP"
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
              aria-label="Tanggal target"
            />
            <button type="submit" className="btn btn-primary">
              Buat
            </button>
          </div>
        </form>
      )}

      {bigGoals.length === 0 ? (
        <p
          className="mt-2 border-2 border-dashed px-4 py-6 text-center text-[15px]"
          style={{ borderColor: "var(--ink)", color: "var(--mute)" }}
        >
          Belum ada tujuan. Tambahkan satu, lalu rincikan jadi langkah kecil.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {bigGoals.map((g) => {
            const theme = PRIORITY_THEME[g.priority];
            const subtasks = g.subtasks || [];
            const done = subtasks.filter((t) => t.done).length;
            const percent = subtasks.length
              ? Math.round((done / subtasks.length) * 100)
              : Math.min(100, Math.max(0, g.currentProgress || 0));
            const target = g.targetDate || "tanpa tanggal";

            return (
              <div
                key={g.id}
                className="border-4 p-3"
                style={{
                  borderColor: "var(--ink)",
                  background: "var(--panel2)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <TargetIcon
                      className="h-5 w-5"
                      style={{ color: theme.color }}
                    />
                    <div className="min-w-0">
                      <p
                        className="pixel text-[9px]"
                        style={{ color: "var(--gold)" }}
                      >
                        {g.title}
                      </p>
                      <p
                        className="mt-1 text-[13px]"
                        style={{ color: "var(--mute)" }}
                      >
                        {theme.label} · {target} · {g.xpReward} XP
                      </p>
                    </div>
                  </div>
                  <span
                    className="pixel text-[9px]"
                    style={{ color: "var(--gold)" }}
                  >
                    {percent}%
                  </span>
                </div>

                <div className="bar mt-3">
                  <span style={{ width: `${percent}%` }} />
                </div>

                {subtasks.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {subtasks.map((t) => (
                      <div key={t.id} className="tree-child">
                        <button
                          className="check"
                          data-done={t.done}
                          onClick={() => toggle(g, t)}
                          aria-pressed={t.done}
                          aria-label={
                            t.done
                              ? `Batalkan ${t.title}`
                              : `Selesaikan ${t.title}`
                          }
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <span
                          className="min-w-0 flex-1 text-[15px]"
                          style={{
                            color: t.done ? "var(--mute)" : "var(--text)",
                            textDecoration: t.done ? "line-through" : "none",
                          }}
                        >
                          {t.title}
                        </span>
                        {editingId === g.id && (
                          <button
                            className="btn"
                            style={{ padding: 6 }}
                            onClick={() => deleteSubtask(g.id, t.id)}
                            aria-label={`Hapus ${t.title}`}
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {editingId === g.id && (
                  <form
                    onSubmit={(e) => submitSubtask(e, g.id)}
                    className="mt-3 flex gap-3"
                  >
                    <input
                      className="input"
                      value={drafts[g.id] || ""}
                      onChange={(e) =>
                        setDrafts((d) => ({ ...d, [g.id]: e.target.value }))
                      }
                      placeholder="Tambah langkah — mis. pelajari DSA"
                      aria-label={`Tambah langkah ke ${g.title}`}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary btn-icon"
                      aria-label="Tambah langkah"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className="pixel text-[8px]"
                    style={{ color: "var(--mute)" }}
                  >
                    {done}/{subtasks.length} langkah
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn"
                      onClick={() =>
                        setEditingId((id) => (id === g.id ? null : g.id))
                      }
                      aria-pressed={editingId === g.id}
                      aria-label={
                        editingId === g.id
                          ? `Selesai mengubah ${g.title}`
                          : `Ubah ${g.title}`
                      }
                    >
                      <span className="pixel text-[8px]">
                        {editingId === g.id ? "Selesai" : "Ubah"}
                      </span>
                    </button>
                    <button
                      className="btn"
                      onClick={() => deleteBigGoal(g.id)}
                      aria-label="Hapus tujuan"
                    >
                      <TrashIcon className="h-4 w-4 text-(--ember)" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmSub}
        title={subWillComplete ? "Tuntaskan tujuan?" : "Selesaikan langkah?"}
        message={
          confirmSub
            ? subWillComplete
              ? `"${confirmSub.subtask.title}" langkah terakhir. Tujuan "${confirmSub.goal.title}" akan tuntas (+${confirmSub.goal.xpReward} XP).`
              : `Tandai langkah "${confirmSub.subtask.title}" selesai? (+5 XP)`
            : ""
        }
        confirmLabel={subWillComplete ? "Ya, tuntaskan" : "Ya, selesaikan"}
        onCancel={() => setConfirmSub(null)}
        onConfirm={() => {
          commitToggle(confirmSub.goal, confirmSub.subtask);
          setConfirmSub(null);
        }}
      />
    </SectionCard>
  );
};

export default BigGoals;
