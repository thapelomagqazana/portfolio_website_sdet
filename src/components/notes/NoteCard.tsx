import { RouteLink } from '@/lib/router';
import type { Article } from '@/lib/notes';
import { ProjectTag } from '@/components/projects';

/**
 * NoteCard — one article in the Insights index.
 *
 * Task P14-03 — Article list.
 * Displays: title, description, date, tags, reading time.
 *
 * Design System §45 — Writing should look editorial rather
 * than like a blog template.
 */
export interface NoteCardProps {
  article: Article;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function NoteCard({ article }: NoteCardProps) {
  return (
    <li className="border-t border-border first:border-t-0">
      <RouteLink
        to={`/insights/${article.slug}`}
        className="block py-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <time
            dateTime={article.date}
            className="text-small text-foreground-subtle font-mono"
          >
            {formatDate(article.date)}
          </time>
          <span className="text-small text-foreground-subtle">
            · {article.readingTime} min read
          </span>
        </div>

        <h3 className="mt-2 text-h3 text-foreground transition-colors duration-fast">
          {article.title}
        </h3>

        <p className="mt-3 max-w-prose text-body text-foreground-muted">
          {article.description}
        </p>

        {article.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag}>
                <ProjectTag>{tag}</ProjectTag>
              </li>
            ))}
          </ul>
        ) : null}
      </RouteLink>
    </li>
  );
}
