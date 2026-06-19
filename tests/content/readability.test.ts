import { describe, expect, it } from "vitest";
import { countWords, headingIsConcise, paragraphIsScannable } from "@/lib/content/readability";

describe("content readability helpers", () => {
  it("counts words", () => {
    expect(countWords("Quality engineering builds release confidence.")).toBe(5);
  });

  it("checks scannable paragraphs", () => {
    expect(paragraphIsScannable("Short paragraph.")).toBe(true);
    expect(paragraphIsScannable("word ".repeat(130))).toBe(false);
  });

  it("checks concise headings", () => {
    expect(headingIsConcise("Building Confidence Into Every Release")).toBe(true);
    expect(headingIsConcise("")).toBe(false);
  });
});
