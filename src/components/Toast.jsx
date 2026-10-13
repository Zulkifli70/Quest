import { useEffect } from "react";
import { useProductivity } from "../store/ProductivityContext";
import { getTier, getTierColor, getTierBorderStyle } from "../lib/constants";

const ToastHost = () => {
  const { toast, levelUp, dismissLevelUp } = useProductivity();

  useEffect(() => {
    if (!levelUp) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") dismissLevelUp();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [levelUp, dismissLevelUp]);

  return (
    <>
      {toast && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="toast" role="status" aria-live="polite">
            {toast.message}
          </div>
        </div>
      )}

      {levelUp && (
        <div
          className="help-backdrop"
          style={{ display: "grid", placeItems: "center", padding: 16 }}
          onClick={dismissLevelUp}
        >
<div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="levelup-title"
            className="panel w-full max-w-sm text-center"
            style={{ borderColor: getTierColor(levelUp.level), borderStyle: getTierBorderStyle(levelUp.level) }}
            onClick={(e) => e.stopPropagation()}
          >
            <p id="levelup-title" className="pixel text-[12px]" style={{ color: "var(--gold)" }}>
              Selamat!
            </p>
            <p className="pixel mt-4 text-[20px]" style={{ color: "var(--text)" }}>
              Level {levelUp.level}
            </p>
            <p
              className="pixel mt-1 text-[10px] uppercase"
              style={{ color: getTierColor(levelUp.level) }}
            >
              {getTier(levelUp.level)}
            </p>
            <p className="mt-3 text-[15px]" style={{ color: "var(--mute)" }}>
              Kamu naik level. Terus gaskeun!
            </p>
            <button className="btn btn-primary mt-5" onClick={dismissLevelUp} autoFocus>
              <span className="pixel text-[8px]">Tutup</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastHost;