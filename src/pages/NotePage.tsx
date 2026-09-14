import { ArrowLeft } from 'lucide-react';
import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import { Markdown } from '@/components/notes';
import { RouteLink } from '@/lib/router';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { getArticleBySlug } from '@/lib/notes';

/**
 * NotePage — single article view.
 *
 * Task P14-03 — Renders the selected note by slug.
 * Task P18    — Per-route metadata, conditioned on whether
 *               the article exists.
 *
 * Rules of Hooks note:
 *   useDocumentMeta is called unconditionally. Only its
 *   ARGUMENT varies based on the article lookup. Conditional
 *   hook calls would violate React's rules and cause a
 *   "rendered fewer hooks than expected" error when the
 *   article transitions from found to not-found (or vice
 *   versa).
 */

const SITE_URL = 'https://thapelo-magqazana.netlify.app';
const NOTES_INDEX_URL = `${SITE_URL}/#/insights`;

export interface NotePageProps {
  slug: string;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function NotePage({ slug }: NotePageProps) {
  const article = getArticleBySlug(slug);

  // Called unconditionally — the argument varies, not the call.
  useDocumentMeta(
    article
      ? {
          title: `${article.title} | Thapelo Magqazana`,
          description: article.description,
          canonical: `${SITE_URL}/#/insights/${article.slug}`,
        }
      : {
          title: 'Note not found | Thapelo Magqazana',
          description: 'The requested note could not be found.',
          canonical: NOTES_INDEX_URL,
        },
  );

  if (!article) {
    return (
      <AppShell
        header={<SiteNav />}
        footer={
          <Container className="py-12">
            <p className="text-small text-foreground-subtle">
              © 2026 Thapelo Magqazana
            </p>
          </Container>
        }
      >
        <Container className="pt-24">
          <h1 className="text-h2">Note not found</h1>
          <p className="mt-4 text-body text-foreground-muted">
            The note you&rsquo;re looking for doesn&rsquo;t exist or has been
            renamed.
          </p>
          <RouteLink
            to="/insights"
            className="mt-8 inline-flex items-center gap-2 text-body text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to insights
          </RouteLink>
        </Container>
      </AppShell>
    );
  }

  return (
    <AppShell
      header={<SiteNav />}
      footer={
        <Container className="py-12">
          <p className="text-small text-foreground-subtle">
            © 2026 Thapelo Magqazana
          </p>
        </Container>
      }
    >
      <Container className="pt-8">
        <RouteLink
          to="/insights"
          className="inline-flex items-center gap-2 text-small text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to insights
        </RouteLink>
      </Container>

      <Section spacing="md" className="pt-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <time
                dateTime={article.date}
                className="font-mono text-small text-foreground-subtle"
              >
                {formatDate(article.date)}
              </time>
              <span className="text-small text-foreground-subtle">
                · {article.readingTime} min read
              </span>
            </div>
            <h1 className="mt-4 text-h1 text-foreground">{article.title}</h1>
            <p className="mt-6 text-body-lg text-foreground-muted">
              {article.description}
            </p>
          </header>

          <Markdown source={article.body} />

          <footer className="mt-16 border-t border-border pt-8">
            <RouteLink
              to="/insights"
              className="inline-flex items-center gap-2 text-small text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to insights
            </RouteLink>
          </footer>
        </article>
      </Section>
    </AppShell>
  );
}
