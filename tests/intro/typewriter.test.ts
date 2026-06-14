import { describe, expect, it } from "vitest";
import { getTypewriterText } from "../../src/intro";

describe("getTypewriterText", () => {
  it("returns empty text at zero progress", () => {
    expect(getTypewriterText("HELLO", 0)).toBe("");
  });

  it("returns full text at complete progress", () => {
    expect(getTypewriterText("HELLO", 1)).toBe("HELLO");
  });

  it("returns proportional text for partial progress", () => {
    expect(getTypewriterText("HELLO", 0.4)).toBe("HE");
  });

  it("clamps progress below zero", () => {
    expect(getTypewriterText("HELLO", -1)).toBe("");
  });

  it("clamps progress above one", () => {
    expect(getTypewriterText("HELLO", 2)).toBe("HELLO");
  });

  it("supports empty text", () => {
    expect(getTypewriterText("", 0.5)).toBe("");
  });
});
