"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/knowledge-base/article-card";
import { FeaturedArticle } from "@/components/knowledge-base/featured-article";
import {
  articleCategoryLabels,
  engineeringIntelligenceCopy,
  knowledgeArticles,
} from "@/data/knowledge-base";
import type { ArticleCategory } from "@/data/knowledge-base";
import { getArticlesByCategory, getFeaturedArticles, searchArticles } from "@/lib/articles";

type CategoryFilter = ArticleCategory | "all";

export function EngineeringIntelligenceSection() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const featured = getFeaturedArticles()[0];

  const visibleArticles = useMemo(() => {
    const filtered = getArticlesByCategory(category, knowledgeArticles);
    return searchArticles(query, filtered);
  }, [category, query]);

  return (
    <section
      id="engineering-intelligence"
      aria-labelledby="engineering-intelligence-heading"
      className="px-4 py-20 sm:px-6 lg:px-8"
      data-testid="engineering-intelligence-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-accent-green font-mono text-xs tracking-[0.3em] uppercase">
            {engineeringIntelligenceCopy.eyebrow}
          </p>

          <h2
            id="engineering-intelligence-heading"
            className="font-display text-text-primary mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
          >
            {engineeringIntelligenceCopy.heading}
          </h2>

          <p className="text-text-secondary mt-5 text-base leading-8">
            {engineeringIntelligenceCopy.description}
          </p>
        </div>

        {featured ? (
          <div className="mt-8">
            <FeaturedArticle article={featured} />
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
          <label className="block">
            <span className="text-text-muted font-mono text-xs tracking-[0.2em] uppercase">
              Search articles
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="text-text-primary focus:border-accent-blue/50 mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none"
              placeholder="Search release engineering, testing, BrikByteOS..."
              data-testid="article-search-input"
            />
          </label>

          <div className="flex flex-wrap gap-2" aria-label="Article categories">
            <button
              type="button"
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
              className="text-text-secondary rounded-full border border-white/10 px-4 py-2 font-mono text-xs"
            >
              All
            </button>

            {Object.entries(articleCategoryLabels).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={category === id}
                onClick={() => setCategory(id as ArticleCategory)}
                className="text-text-secondary rounded-full border border-white/10 px-4 py-2 font-mono text-xs"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-testid="article-grid">
          {visibleArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {visibleArticles.length === 0 ? (
          <p className="text-text-secondary mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            No engineering intelligence articles matched your search.
          </p>
        ) : null}
      </div>
    </section>
  );
}
