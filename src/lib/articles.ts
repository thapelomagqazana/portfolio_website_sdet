import { articleCategoryLabels, knowledgeArticles } from "@/data/knowledge-base";
import type { ArticleCategory, KnowledgeArticle } from "@/data/knowledge-base";

/**
 * Returns all articles sorted newest first.
 *
 * Sorting also falls back to title order when dates are equal so the result is
 * deterministic across tests and builds.
 */
export function getAllArticles(
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): readonly KnowledgeArticle[] {
  return [...articles].sort((firstArticle, secondArticle) => {
    const dateComparison = secondArticle.publishedAt.localeCompare(firstArticle.publishedAt);

    if (dateComparison !== 0) return dateComparison;

    return firstArticle.title.localeCompare(secondArticle.title);
  });
}

/**
 * Returns featured articles in deterministic newest-first order.
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
  const normalizedSlug = normalizeSearchValue(slug);

  if (!normalizedSlug) return undefined;

  return articles.find((article) => normalizeSearchValue(article.slug) === normalizedSlug);
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
 *
 * Ranking:
 * - same category receives stronger weight
 * - shared tags add additional relevance
 * - newest article wins ties
 */
export function getRelatedArticles(
  article: KnowledgeArticle,
  articles: readonly KnowledgeArticle[] = knowledgeArticles,
  limit = 3
): readonly KnowledgeArticle[] {
  const safeLimit = Math.max(0, Math.floor(limit));
  const tagSet = new Set(article.tags.map(normalizeSearchValue));

  if (safeLimit === 0) return [];

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
    .sort((firstCandidate, secondCandidate) => {
      if (secondCandidate.score !== firstCandidate.score) {
        return secondCandidate.score - firstCandidate.score;
      }

      return secondCandidate.article.publishedAt.localeCompare(firstCandidate.article.publishedAt);
    })
    .slice(0, safeLimit)
    .map((candidate) => candidate.article);
}

/**
 * Returns previous and next articles based on the current sorted reading order.
 */
export function getArticleReadingProgression(
  slug: string,
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): {
  readonly previous: KnowledgeArticle | undefined;
  readonly next: KnowledgeArticle | undefined;
} {
  const orderedArticles = getAllArticles(articles);
  const articleIndex = orderedArticles.findIndex((article) => article.slug === slug);

  if (articleIndex < 0) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  return {
    previous: orderedArticles[articleIndex + 1],
    next: orderedArticles[articleIndex - 1],
  };
}

/**
 * Search ranking:
 * - title exact match
 * - title partial match
 * - tag match
 * - category match
 * - description match
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
    .sort((firstResult, secondResult) => {
      if (secondResult.score !== firstResult.score) {
        return secondResult.score - firstResult.score;
      }

      return secondResult.article.publishedAt.localeCompare(firstResult.article.publishedAt);
    })
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
    article.publishedAt.trim().length > 0 &&
    article.tags.some((tag) => tag.trim().length > 0)
  );
}

/**
 * Detects duplicate article slugs.
 */
export function hasDuplicateArticleSlugs(articles: readonly KnowledgeArticle[]): boolean {
  const seen = new Set<string>();

  for (const article of articles) {
    const normalizedSlug = normalizeSearchValue(article.slug);

    if (seen.has(normalizedSlug)) return true;

    seen.add(normalizedSlug);
  }

  return false;
}

/**
 * Returns true when every article has complete metadata.
 */
export function allArticlesHaveValidMetadata(
  articles: readonly KnowledgeArticle[] = knowledgeArticles
): boolean {
  return articles.every(articleHasValidMetadata);
}

function scoreArticle(article: KnowledgeArticle, query: string): number {
  const title = normalizeSearchValue(article.title);
  const description = normalizeSearchValue(article.description);
  const category = normalizeSearchValue(article.category);
  const tags = article.tags.map(normalizeSearchValue);

  let score = 0;

  if (title === query) score += 150;
  if (title.includes(query)) score += 100;

  if (tags.some((tag) => tag === query)) score += 80;
  if (tags.some((tag) => tag.includes(query))) score += 60;

  if (category.includes(query)) score += 35;
  if (description.includes(query)) score += 20;

  return score;
}

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}
