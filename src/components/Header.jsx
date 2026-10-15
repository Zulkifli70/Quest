import { useProductivity } from "../store/ProductivityContext";
import { todayKey } from "../lib/questLogic";
import { getTier, getTierColor, getTierBorderStyle } from "../lib/constants";
import { ZapIcon } from "./icons";

const SEGMENTS = 20;

const Header = () => {
  const { levelInfo, totalXP, dailyQuests, user } = useProductivity();

  const today = todayKey();
  const todays = dailyQuests.filter((q) => q.date === today);
  const pending = todays.filter((q) => !q.completed).length;

  const status =
    todays.length === 0
      ? "Belum ada misi untuk hari ini."
      : pending === 0
        ? "Semua misi hari ini beres."
        : `${pending} misi menunggu hari ini.`;

  const filled = Math.round((levelInfo.current / levelInfo.needed) * SEGMENTS);

  return (
    <header
      className="panel"
      style={{
        borderColor: getTierColor(levelInfo.level),
        borderStyle: getTierBorderStyle(levelInfo.level),
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="level-box"
            style={{
              borderColor: getTierColor(levelInfo.level),
              borderStyle: getTierBorderStyle(levelInfo.level),
            }}
          >
            <p className="pixel text-[8px]" style={{ color: "var(--mute)" }}>
              Level
            </p>
            <p
              className="pixel mt-2 text-[15px]"
              style={{ color: "var(--gold)" }}
            >
              {levelInfo.level}
            </p>
            <p
              className="pixel mt-1 text-[6px] uppercase"
              style={{ color: getTierColor(levelInfo.level) }}
            >
              {getTier(levelInfo.level)}
            </p>
          </div>
          <div>
            <h1 className="pixel text-[12px]" style={{ color: "var(--gold)" }}>
              Productivity Quest
            </h1>
            {user?.email && (
              <p className="mt-2 text-[15px]" style={{ color: "var(--mute)" }}>
                Halo, {user.email.split("@")[0]}
              </p>
            )}
            <p className="mt-2 text-[15px]" style={{ color: "var(--mute)" }}>
              {status}
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <ZapIcon className="h-4 w-4" />
          <span className="pixel text-[10px]">{totalXP} XP</span>
        </div>
      </div>

      <div className="mt-4">
        <div
          className="xpbar"
          role="progressbar"
          aria-label="Progres level"
          aria-valuemin={0}
          aria-valuemax={levelInfo.needed}
          aria-valuenow={levelInfo.current}
        >
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span key={i} className="xpseg" data-on={i < filled} />
          ))}
        </div>
        <p className="mt-2 text-[13px]" style={{ color: "var(--mute)" }}>
          {levelInfo.current} / {levelInfo.needed} XP menuju level{" "}
          {levelInfo.level + 1}
        </p>
      </div>
    </header>
  );
};

export default Header;
