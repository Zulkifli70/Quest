import { useProductivity } from "../store/ProductivityContext";
import { StarIcon, ZapIcon, FlameIcon } from "./icons";

const Header = () => {
  const { levelInfo, totalXP, totalStreakDays } = useProductivity();

  return (
    <header className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl shadow-amber-500/5">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80">
            Questlog
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-50">
            Productivity <span className="text-amber-400">Quest</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Turn your daily grind into an adventure.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-2">
            <StarIcon className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/70">
                Level
              </p>
              <p className="text-lg font-black leading-none text-amber-300">
                {levelInfo.level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-2">
            <FlameIcon className="h-5 w-5 text-orange-400" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-300/70">
                Streak
              </p>
              <p className="text-lg font-black leading-none text-orange-300">
                {totalStreakDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-amber-300">
            <ZapIcon className="h-3.5 w-3.5" />
            {totalXP} XP
          </span>
          <span className="text-slate-400">
            {levelInfo.current} / {levelInfo.needed} XP to level {levelInfo.level + 1}
          </span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800 ring-1 ring-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-500"
            style={{ width: `${levelInfo.progress}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
