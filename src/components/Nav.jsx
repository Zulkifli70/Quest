import { SwordIcon, FlameIcon, TargetIcon as TI } from "./icons";

const TABS = [
  { id: "quests", label: "Quests", icon: SwordIcon, accent: "text-amber-300", active: "border-amber-500/50 bg-amber-500/10" },
  { id: "habits", label: "Habits", icon: FlameIcon, accent: "text-orange-300", active: "border-orange-500/50 bg-orange-500/10" },
  { id: "goals", label: "Big Goals", icon: TI, accent: "text-emerald-300", active: "border-emerald-500/50 bg-emerald-500/10" },
];

const Nav = ({ tab, setTab }) => (
  <nav className="flex gap-2">
    {TABS.map(({ id, label, icon: Icon, accent, active }) => (
      <button
        key={id}
        onClick={() => setTab(id)}
        className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
          tab === id ? `${active} ${accent}` : "border-slate-700/60 bg-slate-900/50 text-slate-400 hover:border-slate-600"
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
    ))}
  </nav>
);

export { TABS, Nav };