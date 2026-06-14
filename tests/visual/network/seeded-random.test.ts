import { describe, expect, it } from "vitest";
import {
  createSeededRandom,
  pickRandom,
  randomBetween,
  randomInteger,
} from "../../../src/visual/network";

describe("seeded random", () => {
  it("produces the same sequence for the same seed", () => {
    const first = createSeededRandom("same");
    const second = createSeededRandom("same");

    expect([first(), first(), first()]).toEqual([second(), second(), second()]);
  });

  it("produces different sequences for different seeds", () => {
    const first = createSeededRandom("a");
    const second = createSeededRandom("b");

    expect([first(), first(), first()]).not.toEqual([second(), second(), second()]);
  });

  it("generates values between min and max", () => {
    const random = createSeededRandom("range");
    const value = randomBetween(random, 10, 20);

    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(20);
  });

  it("generates integer values within inclusive range", () => {
    const random = createSeededRandom("int");
    const value = randomInteger(random, 1, 3);

    expect([1, 2, 3]).toContain(value);
  });

  it("throws when picking from an empty list", () => {
    const random = createSeededRandom("empty");

    expect(() => pickRandom(random, [])).toThrow("Cannot pick");
  });
});
