import { ArrowRight } from 'lucide-react';
import { RouteLink } from '@/lib/router';
import { ProjectTag } from '@/components/projects/ProjectTag';
import { TerminalDemo } from '@/components/projects/TerminalDemo';
import { brikbyteos } from '@/content/brikbyteos';

/**
 * BrikByteCard — Selected Work card for BrikByteOS.
 *
 * Tasks P8-06..08:
 *   - Summary: name + tagline
 *   - Terminal demonstration
 *   - Architecture pipeline
 *   - CTA → /work/brikbyteos (P8-09 case study)
 *
 * Design System §26 — Case study, not portfolio thumbnail.
 * Design System §28 — Small terminal moment, not the whole
 *   aesthetic.
 * Design System §43 — Artifact → Context → Interpretation.
 */
const BRIKBYTE_TECH: readonly string[] = [
  'Go',
  'CLI',
  'Quality Gates',
  'CI/CD',
  'Evidence',
] as const;

export function BrikByteCard() {
  return (
    <article id="brikbyteos" className="border-t border-border pt-12 sm:pt-16">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="text-h2 text-foreground">{brikbyteos.name}</h3>
          <span className="text-label text-foreground-subtle">
            · OPEN-SOURCE PROJECT
          </span>
        </div>
        <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
          {brikbyteos.tagline}
        </p>
      </header>

      {/* Two-column: terminal + problem framing */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <section aria-labelledby="brikbyte-terminal-heading">
          <h4 id="brikbyte-terminal-heading" className="text-label mb-4">
            What it does
          </h4>
          <TerminalDemo />
        </section>

        <section aria-labelledby="brikbyte-problem-heading">
          <h4 id="brikbyte-problem-heading" className="text-label mb-4">
            Why it exists
          </h4>
          <p className="text-body text-foreground-muted">
            Release decisions are often made on partial information. BrikByteOS
            orchestrates tests, security scans and quality checks into a single
            command — and produces an explicit, evidence-backed release
            decision.
          </p>

          {/* Technology tags */}
          <h5 className="text-label mt-8 mb-4">Technology</h5>
          <ul className="flex flex-wrap gap-2">
            {BRIKBYTE_TECH.map((tech) => (
              <li key={tech}>
                <ProjectTag>{tech}</ProjectTag>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-12">
        <RouteLink
          to="/work/brikbyteos"
          className="inline-flex items-center gap-2 text-body font-medium text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          Explore BrikByteOS
          <ArrowRight aria-hidden="true" size={16} />
        </RouteLink>
      </div>
    </article>
  );
}
