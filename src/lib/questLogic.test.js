import { describe, expect, it } from "vitest";
import { levelFromXP } from "./questLogic";

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