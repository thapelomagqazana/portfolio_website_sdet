import { describe, expect, it } from "vitest";
import { commandPaletteItems, filterCommandPaletteItems } from "../../src/data/command-palette";

describe("command palette data", () => {
  it("contains commands", () => {
    expect(commandPaletteItems.length).toBeGreaterThan(0);
  });

  it("contains navigation commands", () => {
    expect(commandPaletteItems.some((item) => item.type === "navigate")).toBe(true);
  });

  it("contains quick action commands", () => {
    expect(commandPaletteItems.some((item) => item.type === "external")).toBe(true);
    expect(commandPaletteItems.some((item) => item.type === "email")).toBe(true);
    expect(commandPaletteItems.some((item) => item.type === "download")).toBe(true);
  });

  it("returns all commands for empty query", () => {
    expect(filterCommandPaletteItems(commandPaletteItems, "")).toHaveLength(
      commandPaletteItems.length
    );
  });

  it("filters by label", () => {
    expect(filterCommandPaletteItems(commandPaletteItems, "BrikByteOS")[0].id).toBe(
      "go-brikbyteos"
    );
  });

  it("filters by keyword", () => {
    expect(filterCommandPaletteItems(commandPaletteItems, "quality gate")[0].id).toBe(
      "go-brikbyteos"
    );
  });

  it("returns empty array for unknown query", () => {
    expect(filterCommandPaletteItems(commandPaletteItems, "zzzzzz")).toEqual([]);
  });
});
