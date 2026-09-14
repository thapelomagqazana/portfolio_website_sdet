import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import { NoteCard } from '@/components/notes';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { articles } from '@/lib/notes';

/**
 * InsightsPage — index of Engineering Notes.
 *
 * Task P14-03 — Article list with tags, date and reading time.
 * Task P18    — Per-route document metadata via useDocumentMeta.
 *
 * Design System §45 — Editorial presentation.
 */

const CANONICAL_URL = 'https://thapelo-magqazana.netlify.app/#/insights';

export function InsightsPage() {
  useDocumentMeta({
    title: 'Engineering Notes | Thapelo Magqazana',
    description:
      'Short essays on software quality, test automation and engineering discipline.',
    canonical: CANONICAL_URL,
  });

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
      <Section id="insights" aria-labelledby="insights-heading" spacing="xl">
        <header className="mb-12 max-w-2xl">
          <p className="text-label mb-4">ENGINEERING NOTES</p>
          <h1 id="insights-heading" className="text-h1">
            Writing about quality, automation and engineering discipline.
          </h1>
          <p className="mt-6 text-body-lg text-foreground-muted">
            Short essays on how I think about building and testing software. Not
            tutorials — working notes.
          </p>
        </header>

        {articles.length === 0 ? (
          <p className="text-body text-foreground-muted">
            No notes published yet.
          </p>
        ) : (
          <ul className="flex flex-col">
            {articles.map((article) => (
              <NoteCard key={article.slug} article={article} />
            ))}
          </ul>
        )}
      </Section>
    </AppShell>
  );
}
