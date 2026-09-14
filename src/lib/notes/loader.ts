import type { Article, LoadedArticle } from './types';
import { parseFrontmatter } from './frontmatter';

/**
 * Note loader — reads all Markdown files in
 * src/content/notes/ at build time.
 *
 * Vite's import.meta.glob handles the file discovery and
 * inlines the raw content into the bundle. No filesystem
 * access at runtime, no server requirement, works on any
 * static host.
 *
 * Adding a new note is: drop a .md file with front-matter
 * into src/content/notes/. The next build picks it up.
 */

const rawModules = import.meta.glob('/src/content/notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * Estimate reading time in minutes.
 * 200 words per minute is a common conservative estimate.
 */
function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Coerce a front-matter value into the expected shape.
 * Throws if a required field is missing so build errors
 * surface immediately.
 */
function requireField<T>(
  data: Record<string, unknown>,
  key: string,
  slug: string,
): T {
  const value = data[key];
  if (value === undefined || value === null) {
    throw new Error(
      `Note "${slug}" is missing required front-matter field "${key}".`,
    );
  }
  return value as T;
}

function loadArticle(path: string, source: string): LoadedArticle {
  // Path: /src/content/notes/<slug>.md
  const slug = path.replace('/src/content/notes/', '').replace(/\.md$/, '');

  const { data, body } = parseFrontmatter(source);

  const article: LoadedArticle = {
    slug: requireField<string>(data, 'slug', slug),
    title: requireField<string>(data, 'title', slug),
    description: requireField<string>(data, 'description', slug),
    date: requireField<string>(data, 'date', slug),
    tags: (data['tags'] as string[] | undefined) ?? [],
    readingTime: estimateReadingTime(body),
    body,
  };

  return article;
}

/** All articles, sorted newest-first. */
export const articles: readonly LoadedArticle[] = Object.entries(rawModules)
  .map(([path, source]) => loadArticle(path, source))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Find an article by its slug. */
export function getArticleBySlug(slug: string): LoadedArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

/** All unique tags across articles, alphabetised. */
export function getAllTags(): readonly string[] {
  const tags = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}

/** Article metadata only (without body). */
export function toMetadata(article: LoadedArticle): Article {
  const { body: _body, ...metadata } = article;
  void _body;
  return metadata;
}
