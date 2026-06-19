/**
 * Lightweight readability helpers.
 */

/**
 * Counts words in a string.
 */
export function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Returns true when a paragraph is easy to scan.
 */
export function paragraphIsScannable(value: string, maxWords = 120): boolean {
  return countWords(value) <= maxWords;
}

/**
 * Returns true when a heading is concise.
 */
export function headingIsConcise(value: string, maxCharacters = 120): boolean {
  return value.trim().length > 0 && value.length <= maxCharacters;
}
