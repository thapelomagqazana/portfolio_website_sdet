import { ArrowLeft } from 'lucide-react';
import { AppShell, Container, Section } from '@/components/layout';
import { SiteNav } from '@/components/navigation';
import { ArchitectureFlow, ProjectTag } from '@/components/projects';
import { RouteLink } from '@/lib/router';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { qinis, qinisCaseStudy, qinisTech } from '@/content/qinis';

/**
 * QinisPage — full case study for QINIS.
 *
 * Task P8-05 sections:
 *   Overview
 *   Problem
 *   Architecture
 *   Engineering Decisions
 *   Quality Model
 *   Implementation
 *   Current Status
 *   Lessons
 *   Repository
 *
 * Task P18 — Per-route document metadata via useDocumentMeta.
 *
 * Design System §26 — Case study, not portfolio thumbnail.
 * Design System §43 — Artifact → Context → Interpretation.
 */

const CANONICAL_URL = 'https://thapelo-magqazana.netlify.app/#/work/qinis';

export function QinisPage() {
  useDocumentMeta({
    title: 'QINIS — Case Study | Thapelo Magqazana',
    description:
      'Engineering intelligence for software quality and release confidence. An ongoing engineering project by Thapelo Magqazana.',
    canonical: CANONICAL_URL,
  });

  // Order the sections exactly as specified in P8-05.
  const sections = qinisCaseStudy;

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
          <h1 className="text-h1 text-foreground">{qinis.name}</h1>
          <p className="mt-6 text-body-lg text-foreground-muted">
            {qinis.tagline}
          </p>
        </header>
      </Section>

      {/* Sections */}
      <Section spacing="md">
        <div className="mx-auto max-w-3xl">
          {sections.map((section) => (
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

              {/* Inline architecture visual in the Architecture section */}
              {section.id === 'architecture' ? (
                <div className="mt-8">
                  <ArchitectureFlow />
                </div>
              ) : null}
            </article>
          ))}

          {/* Technology — grouped separately since it's a list, not prose */}
          <article id="technology" className="mb-16">
            <h2 className="text-h3 text-foreground mb-4">Technology</h2>
            <ul className="flex flex-wrap gap-2">
              {qinisTech.map((tech) => (
                <li key={tech}>
                  <ProjectTag>{tech}</ProjectTag>
                </li>
              ))}
            </ul>
          </article>

          {/* Repository anchor — matches P8-05 section list */}
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
