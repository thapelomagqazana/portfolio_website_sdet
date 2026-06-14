import { describe, expect, it } from "vitest";
import {
  createSeededRandom,
  pickRandom,
  randomBetween,
  randomInteger,
} from "../../../src/visual/network";

describe("seeded random", () => {
  it("produces same sequence for same seed", () => {
    const first = createSeededRandom("same");
    const second = createSeededRandom("same");

    expect([first(), first(), first()]).toEqual([second(), second(), second()]);
  });

  it("produces different sequence for different seeds", () => {
    const first = createSeededRandom("a");
    const second = createSeededRandom("b");

    expect([first(), first(), first()]).not.toEqual([second(), second(), second()]);
  });

  it("keeps decimal values inside range", () => {
    const random = createSeededRandom("range");
    const value = randomBetween(random, 10, 20);

    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(20);
  });

  it("supports reversed range arguments", () => {
    const random = createSeededRandom("reverse");
    const value = randomBetween(random, 20, 10);

    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(20);
  });

  it("generates inclusive integer values", () => {
    const random = createSeededRandom("integer");
    const value = randomInteger(random, 1, 3);

    expect([1, 2, 3]).toContain(value);
  });

  it("throws on empty pick list", () => {
    const random = createSeededRandom("empty");

    expect(() => pickRandom(random, [])).toThrow("Cannot pick");
  });
});
