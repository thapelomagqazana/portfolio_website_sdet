/**
 * SEO helpers for content integrity checks and future metadata generation.
 */

/**
 * Normalizes text for keyword matching.
 */
export function normalizeSeoText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Returns true when text contains a keyword case-insensitively.
 */
export function containsKeyword(text: string, keyword: string): boolean {
  return normalizeSeoText(text).includes(normalizeSeoText(keyword));
}

/**
 * Counts how many SEO keywords are present in a content blob.
 */
export function countMatchedKeywords(text: string, keywords: readonly string[]): number {
  return keywords.filter((keyword) => containsKeyword(text, keyword)).length;
}

/**
 * Joins content modules into one searchable text blob.
 */
export function createContentBlob(...content: readonly unknown[]): string {
  return JSON.stringify(content);
}
