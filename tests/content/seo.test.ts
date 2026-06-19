import { describe, expect, it } from "vitest";
import { coreSeoKeywords, siteSeo } from "@/data/seo";
import { containsKeyword, countMatchedKeywords, normalizeSeoText } from "@/lib/content/seo";

describe("content SEO helpers", () => {
  it("normalizes SEO text", () => {
    expect(normalizeSeoText("  Release   Confidence ")).toBe("release confidence");
  });

  it("matches keywords case-insensitively", () => {
    expect(containsKeyword("release confidence infrastructure", "Release Confidence")).toBe(true);
  });

  it("counts matched keywords", () => {
    expect(
      countMatchedKeywords(
        "Software Development Engineer in Test focused on Quality Engineering and BrikByteOS.",
        coreSeoKeywords
      )
    ).toBeGreaterThanOrEqual(3);
  });

  it("defines site SEO metadata", () => {
    expect(siteSeo.title).toContain("Thapelo Magqazana");
    expect(siteSeo.description).toContain("Software Development Engineer in Test");
    expect(coreSeoKeywords.length).toBeGreaterThan(0);
  });
});
