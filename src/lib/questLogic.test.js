import { describe, expect, it } from "vitest";
import { advanceStreak, levelFromXP } from "./questLogic";

const khs = (xp) => {
  const { level, current, needed, progress } = levelFromXP(xp);
  return { level, current, needed, progress };
};

describe("levelFromXP", () => {
  it("level 1 butuh 100 XP", () => {
    expect(khs(0)).toEqual({ level: 1, current: 0, needed: 100, progress: 0 });
    expect(khs(99)).toEqual({ level: 1, current: 99, needed: 100, progress: 99 });
  });

  it("butuh XP makin besar tiap level: 100, 150, 200, ...", () => {
    expect(khs(100)).toEqual({ level: 2, current: 0, needed: 150, progress: 0 });
    expect(khs(249)).toEqual({ level: 2, current: 149, needed: 150, progress: 149 });
    expect(khs(250)).toEqual({ level: 3, current: 0, needed: 200, progress: 0 });
    expect(khs(700)).toEqual({ level: 5, current: 0, needed: 300, progress: 0 });
  });

  it("negatif XP dibulatkan ke nol", () => {
    expect(khs(-10).level).toBe(1);
  });
});

describe("advanceStreak", () => {
  const S = (current, best, lastActiveDay) => ({ current, best, lastActiveDay });
  const D = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  it("hari pertama: current 1, best 1", () => {
    expect(advanceStreak(S(0, 0, null), D(0))).toEqual(S(1, 1, D(0)));
  });

  it("lanjut berturut-turut", () => {
    expect(advanceStreak(S(3, 5, D(1)), D(0))).toEqual(S(4, 5, D(0)));
  });

  it("bolong sehari: current mulai dari 1 lagi", () => {
    expect(advanceStreak(S(3, 5, D(3)), D(0))).toEqual(S(1, 5, D(0)));
  });

  it("best ikut naik saat menembus rekor", () => {
    expect(advanceStreak(S(4, 4, D(1)), D(0))).toEqual(S(5, 5, D(0)));
  });

  it("double-call hari sama tidak menambah", () => {
    const after = advanceStreak(S(2, 2, D(1)), D(0));
    expect(advanceStreak(after, D(0))).toBe(after);
  });
});