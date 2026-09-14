/**
 * Engineering Notes types — Thapelo Magqazana Engineering Portfolio
 *
 * Task P14-02 — Article metadata.
 */

/** Metadata parsed from a note's front-matter. */
export interface Article {
  /** URL-safe identifier, matching the file name and the route. */
  slug: string;
  /** Human-readable title. */
  title: string;
  /** One-sentence description used in the index and meta tags. */
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Topic tags. */
  tags: string[];
  /** Estimated reading time in minutes. */
  readingTime: number;
}

/** A loaded note: metadata plus raw Markdown body. */
export interface LoadedArticle extends Article {
  /** Raw Markdown body (front-matter stripped). */
  body: string;
}
