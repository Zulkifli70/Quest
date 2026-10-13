import { useProductivity } from "../store/ProductivityContext";
import { todayKey } from "../lib/questLogic";
import { ZapIcon } from "./icons";

const SEGMENTS = 20;

const Header = () => {
  const { levelInfo, totalXP, dailyQuests } = useProductivity();

  const today = todayKey();
  const todays = dailyQuests.filter((q) => q.date === today);
  const pending = todays.filter((q) => !q.completed).length;

  const status =
    todays.length === 0
      ? "No quests lined up for today."
      : pending === 0
        ? "All of today's quests are done."
        : `${pending} ${pending === 1 ? "quest" : "quests"} waiting today.`;

  const filled = Math.round((levelInfo.current / levelInfo.needed) * SEGMENTS);

  return (
    <header className="panel">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="level-box">
            <p className="pixel text-[8px]" style={{ color: "var(--mute)" }}>
              Level
            </p>
            <p className="pixel mt-2 text-[15px]" style={{ color: "var(--gold)" }}>
              {levelInfo.level}
            </p>
          </div>
          <div>
            <h1 className="pixel text-[12px]" style={{ color: "var(--gold)" }}>
              Productivity Quest
            </h1>
            <p className="mt-2 text-[15px]" style={{ color: "var(--mute)" }}>
              {status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2" style={{ color: "var(--gold)" }}>
          <ZapIcon className="h-4 w-4" />
          <span className="pixel text-[10px]">{totalXP} XP</span>
        </div>
      </div>

      <div className="mt-4">
        <div
          className="xpbar"
          role="progressbar"
          aria-label="Level progress"
          aria-valuemin={0}
          aria-valuemax={levelInfo.needed}
          aria-valuenow={levelInfo.current}
        >
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span key={i} className="xpseg" data-on={i < filled} />
          ))}
        </div>
        <p className="mt-2 text-[13px]" style={{ color: "var(--mute)" }}>
          {levelInfo.current} / {levelInfo.needed} XP to level {levelInfo.level + 1}
        </p>
      </div>
    </header>
  );
};

export default Header;
