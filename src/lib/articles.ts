import { articleCategoryLabels, knowledgeArticles } from "@/data/knowledge-base";
import type { ArticleCategory, KnowledgeArticle } from "@/data/knowledge-base";

/**
 * Returns all articles sorted newest first.
 */
export function getAllArticles(
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): readonly KnowledgeArticle[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/**
 * Returns featured articles.
 */
export function getFeaturedArticles(
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): readonly KnowledgeArticle[] {
  return getAllArticles(articles).filter((article) => article.featured);
}

/**
 * Safely resolves an article by slug.
 */
export function getArticleBySlug(
  slug: string,
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): KnowledgeArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Filters articles by category.
 */
export function getArticlesByCategory(
  category: ArticleCategory | "all",
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): readonly KnowledgeArticle[] {
  if (category === "all") return getAllArticles(articles);
  return getAllArticles(articles).filter((article) => article.category === category);
}

/**
 * Returns related articles by shared category or tags.
 */
export function getRelatedArticles(
  article: KnowledgeArticle,
  articles: readonly KnowledgeArticle[] = knowledgeArticles,
  limit = 3
): readonly KnowledgeArticle[] {
  const tagSet = new Set(article.tags.map(normalizeSearchValue));

  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => tagSet.has(normalizeSearchValue(tag)));
      const categoryScore = candidate.category === article.category ? 5 : 0;
      return {
        article: candidate,
        score: categoryScore + sharedTags.length,
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((candidate) => candidate.article);
}

/**
 * Search ranking:
 * title > tags > category > description.
 */
export function searchArticles(
  query: string,
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): readonly KnowledgeArticle[] {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) return getAllArticles(articles);

  return articles
    .map((article) => ({
      article,
      score: scoreArticle(article, normalizedQuery),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.article);
}

/**
 * Validates required article metadata.
 */
export function articleHasValidMetadata(article: KnowledgeArticle): boolean {
  return (
    article.slug.trim().length > 0 &&
    article.title.trim().length > 0 &&
    article.description.trim().length > 0 &&
    Boolean(articleCategoryLabels[article.category]) &&
    article.readingMinutes > 0 &&
    article.tags.some((tag) => tag.trim().length > 0)
  );
}

function scoreArticle(article: KnowledgeArticle, query: string): number {
  let score = 0;

  if (normalizeSearchValue(article.title).includes(query)) score += 100;

  if (article.tags.some((tag) => normalizeSearchValue(tag).includes(query))) {
    score += 60;
  }

  if (normalizeSearchValue(article.category).includes(query)) score += 35;
  if (normalizeSearchValue(article.description).includes(query)) score += 20;

  return score;
}

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase();
}
