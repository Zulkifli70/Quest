import { SwordIcon, FlameIcon, TargetIcon } from "./icons";

const TABS = [
  { id: "quests", label: "Quests", icon: SwordIcon },
  { id: "habits", label: "Habits", icon: FlameIcon },
  { id: "goals", label: "Goals", icon: TargetIcon },
];

const Nav = ({ tab, setTab }) => (
  <nav className="mt-4 flex gap-3">
    {TABS.map(({ id, label, icon: Icon }) => (
      <button
        key={id}
        onClick={() => setTab(id)}
        className="tab"
        data-active={tab === id}
        aria-pressed={tab === id}
      >
        <Icon className="h-4 w-4" />
        <span className="pixel text-[8px]">{label}</span>
      </button>
    ))}
  </nav>
);

export { TABS, Nav };
