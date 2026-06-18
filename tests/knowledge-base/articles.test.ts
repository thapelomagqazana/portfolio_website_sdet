import { describe, expect, it } from "vitest";
import { knowledgeArticles } from "@/data/knowledge-base";
import {
  articleHasValidMetadata,
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticles,
  getRelatedArticles,
} from "@/lib/articles";

describe("articles utilities", () => {
  it("returns all articles", () => {
    expect(getAllArticles().length).toBe(knowledgeArticles.length);
  });

  it("validates metadata", () => {
    for (const article of knowledgeArticles) {
      expect(articleHasValidMetadata(article)).toBe(true);
    }
  });

  it("finds article by slug safely", () => {
    expect(getArticleBySlug("release-confidence")?.title).toContain("Release Confidence");
    expect(getArticleBySlug("missing")).toBeUndefined();
  });

  it("returns featured articles", () => {
    expect(getFeaturedArticles().length).toBeGreaterThan(0);
  });

  it("filters by category", () => {
    const articles = getArticlesByCategory("testing");
    expect(articles.every((article) => article.category === "testing")).toBe(true);
  });

  it("returns related articles", () => {
    const article = knowledgeArticles[0];
    expect(getRelatedArticles(article).every((item) => item.slug !== article.slug)).toBe(true);
  });
});
