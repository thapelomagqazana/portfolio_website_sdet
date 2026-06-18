import {
  intelligenceSearchConfig,
  intelligenceSearchIndex,
  searchCategoryLabels,
} from "@/data/intelligence-search";
import type { SearchEntity, SearchResult } from "@/data/intelligence-search";

/**
 * Normalizes a search query for predictable matching.
 */
export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Splits a query into unique non-empty tokens.
 */
export function tokenizeSearchQuery(query: string): readonly string[] {
  return removeDuplicateTokens(normalizeSearchQuery(query).split(" ").filter(Boolean));
}

/**
 * Removes duplicate tokens while preserving order.
 */
export function removeDuplicateTokens(tokens: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const token of tokens) {
    const normalized = normalizeSearchQuery(token);
    if (!normalized || seen.has(normalized)) continue;

    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

/**
 * Main search entry point.
 *
 * Search is intentionally O(n) and metadata-first so it remains fast and easy
 * to replace later with Fuse.js, MiniSearch, Lunr, or vector search.
 */
export function searchEngineeringIntelligence(
  query: string,
  index: readonly SearchEntity[] = intelligenceSearchIndex,
  maxResults: number = intelligenceSearchConfig.maxResults
): readonly SearchResult[] {
  const tokens = tokenizeSearchQuery(query);

  if (tokens.length === 0) return [];

  return sortSearchResults(buildSearchResults(index, tokens)).slice(0, maxResults);
}

/**
 * Scores every entity and returns only matching results.
 */
export function buildSearchResults(
  index: readonly SearchEntity[],
  tokens: readonly string[]
): readonly SearchResult[] {
  const deduped = new Map<string, SearchResult>();

  for (const entity of index) {
    const score = scoreEntity(entity, tokens);
    if (score <= 0) continue;

    const existing = deduped.get(entity.id);
    const result: SearchResult = {
      entity,
      score,
      highlights: buildHighlights(entity, tokens),
    };

    if (!existing || result.score > existing.score) {
      deduped.set(entity.id, result);
    }
  }

  return [...deduped.values()];
}

/**
 * Sorts results by score, then title for deterministic output.
 */
export function sortSearchResults(results: readonly SearchResult[]): readonly SearchResult[] {
  return [...results].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entity.title.localeCompare(b.entity.title);
  });
}

/**
 * Scores one entity against query tokens.
 */
export function scoreEntity(entity: SearchEntity, tokens: readonly string[]): number {
  const title = normalizeSearchQuery(entity.title);
  const description = normalizeSearchQuery(entity.description);
  const category = normalizeSearchQuery(searchCategoryLabels[entity.category] ?? entity.category);
  const keywords = entity.keywords.map(normalizeSearchQuery);

  let score = 0;

  for (const token of tokens) {
    if (title === token) score += intelligenceSearchConfig.weights.titleExact;
    if (title.includes(token)) score += intelligenceSearchConfig.weights.titlePartial;
    if (keywords.some((keyword) => keyword.includes(token))) {
      score += intelligenceSearchConfig.weights.keyword;
    }
    if (category.includes(token) || entity.category.includes(token)) {
      score += intelligenceSearchConfig.weights.category;
    }
    if (description.includes(token)) {
      score += intelligenceSearchConfig.weights.description;
    }
  }

  return score;
}

/**
 * Returns short text snippets containing matched tokens.
 */
export function buildHighlights(
  entity: SearchEntity,
  tokens: readonly string[]
): readonly string[] {
  const fields = [entity.title, entity.description, ...entity.keywords];
  const highlights: string[] = [];

  for (const field of fields) {
    const normalizedField = normalizeSearchQuery(field);
    if (tokens.some((token) => normalizedField.includes(token))) {
      highlights.push(field);
    }

    if (highlights.length >= 3) break;
  }

  return removeDuplicateTokens(highlights.map((item) => item.trim())) as readonly string[];
}

/**
 * Splits text into highlighted and non-highlighted segments.
 */
export function getHighlightedSegments(
  text: string,
  query: string
): readonly { readonly text: string; readonly match: boolean }[] {
  const tokens = tokenizeSearchQuery(query);
  if (tokens.length === 0) return [{ text, match: false }];

  const escaped = tokens.map(escapeRegExp).join("|");
  const regex = new RegExp(`(${escaped})`, "gi");

  return text
    .split(regex)
    .filter((segment) => segment.length > 0)
    .map((segment) => ({
      text: segment,
      match: tokens.includes(normalizeSearchQuery(segment)),
    }));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
