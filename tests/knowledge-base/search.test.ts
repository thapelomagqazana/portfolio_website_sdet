import { describe, expect, it } from "vitest";
import { searchArticles } from "@/lib/articles";

describe("article search", () => {
  it("returns all articles for empty query", () => {
    expect(searchArticles("").length).toBeGreaterThan(0);
  });

  it("matches by title", () => {
    expect(searchArticles("Release Confidence")[0]?.slug).toBe("release-confidence");
  });

  it("matches by tag", () => {
    expect(
      searchArticles("playwright").some((article) => article.slug === "playwright-best-practices")
    ).toBe(true);
  });

  it("returns empty result for unknown query", () => {
    expect(searchArticles("zzzzzz-no-match")).toHaveLength(0);
  });
});
