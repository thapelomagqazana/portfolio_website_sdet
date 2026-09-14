import { ArrowLeft } from 'lucide-react';
import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import {
  ArchitecturePipeline,
  ProjectTag,
  TerminalDemo,
} from '@/components/projects';
import { RouteLink } from '@/lib/router';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { brikbyteCaseStudy, brikbyteos } from '@/content/brikbyteos';

/**
 * BrikBytePage — full case study for BrikByteOS.
 *
 * Task P8-09 sections:
 *   Problem
 *   Solution
 *   Architecture
 *   CLI
 *   Evidence
 *   Quality Gates
 *   CI/CD
 *   Technology
 *   Lessons
 *   GitHub
 *
 * Task P18 — Per-route document metadata via useDocumentMeta.
 * The hook updates <title>, meta description, canonical and
 * og:url while the page is mounted, and restores the previous
 * values on unmount.
 *
 * Design System §26 — Case study, not portfolio thumbnail.
 * Design System §28 — Terminal moment as evidence.
 */

const CANONICAL_URL = 'https://thapelo-magqazana.netlify.app/#/work/brikbyteos';

const BRIKBYTE_TECH: readonly string[] = [
  'Go',
  'CLI',
  'Quality Gates',
  'CI/CD',
  'Evidence',
] as const;

export function BrikBytePage() {
  useDocumentMeta({
    title: 'BrikByteOS — Case Study | Thapelo Magqazana',
    description:
      'An open-source Release Confidence CLI bringing testing, security, quality signals and evidence-based quality gates into software delivery.',
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
      {/* Back to home */}
      <Container className="pt-8">
        <RouteLink
          to="/"
          className="inline-flex items-center gap-2 text-small text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to work
        </RouteLink>
      </Container>

      {/* Hero */}
      <Section spacing="md" className="pt-8">
        <header className="max-w-4xl">
          <p className="text-label mb-6">CASE STUDY</p>
          <h1 className="text-h1 text-foreground">{brikbyteos.name}</h1>
          <p className="mt-6 text-body-lg text-foreground-muted">
            {brikbyteos.tagline}
          </p>
        </header>

        {/* Terminal hero moment */}
        <div className="mt-12 max-w-2xl">
          <TerminalDemo />
        </div>
      </Section>

      {/* Sections */}
      <Section spacing="md">
        <div className="mx-auto max-w-3xl">
          {brikbyteCaseStudy.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="mb-16 last:mb-0"
            >
              <h2 className="text-h3 text-foreground mb-4">{section.title}</h2>
              <p className="text-body text-foreground-muted">{section.body}</p>

              {section.bullets ? (
                <ul className="mt-6 flex flex-col gap-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="border-l-2 border-border pl-4 text-body text-foreground-muted"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Inline architecture pipeline in the Architecture section */}
              {section.id === 'architecture' ? (
                <div className="mt-8">
                  <ArchitecturePipeline />
                </div>
              ) : null}
            </article>
          ))}

          {/* Technology block */}
          <article id="technology" className="mb-16">
            <h2 className="text-h3 text-foreground mb-4">Technology</h2>
            <ul className="flex flex-wrap gap-2">
              {BRIKBYTE_TECH.map((tech) => (
                <li key={tech}>
                  <ProjectTag>{tech}</ProjectTag>
                </li>
              ))}
            </ul>
          </article>

          {/* Back link */}
          <div className="mt-24 border-t border-border pt-8">
            <RouteLink
              to="/"
              className="inline-flex items-center gap-2 text-small text-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to work
            </RouteLink>
          </div>
        </div>
      </Section>
    </AppShell>
  );
}
