import { ArrowRight } from 'lucide-react';
import { RouteLink } from '@/lib/router';
import { ProjectTag } from '@/components/projects/ProjectTag';
import { ArchitectureFlow } from '@/components/projects/ArchitectureFlow';
import { qinis, qinisProblem, qinisTech } from '@/content/qinis';

/**
 * QinisCard — Selected Work card for QINIS.
 *
 * Tasks P8-01..04:
 *   - Summary: QINIS + tagline
 *   - Problem
 *   - Architecture visual
 *   - Technology tags
 *   - CTA → /work/qinis (P8-05 case study)
 *
 * Design System §26 — Projects feel like case studies rather
 * than portfolio thumbnails.
 * Content Inventory §11 — QINIS positioning as evidence of
 * capability, not the primary brand.
 */
export function QinisCard() {
  return (
    <article id="qinis" className="border-t border-border pt-12 sm:pt-16">
      {/* Header: name + tagline + status */}
      <header className="mb-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="text-h2 text-foreground">{qinis.name}</h3>
          <span className="text-label text-foreground-subtle">
            · {qinis.status === 'ongoing' ? 'ONGOING PROJECT' : ''}
          </span>
        </div>
        <p className="mt-4 max-w-prose text-body-lg text-foreground-muted">
          {qinis.tagline}
        </p>
      </header>

      {/* Two-column: problem + architecture */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <section aria-labelledby="qinis-problem-heading">
          <h4 id="qinis-problem-heading" className="text-label mb-4">
            {qinisProblem.heading}
          </h4>
          <p className="text-body text-foreground-muted">{qinisProblem.body}</p>
        </section>

        <section aria-labelledby="qinis-architecture-heading">
          <h4 id="qinis-architecture-heading" className="text-label mb-4">
            Architecture
          </h4>
          <ArchitectureFlow />
        </section>
      </div>

      {/* Technology */}
      <section aria-labelledby="qinis-tech-heading" className="mt-10">
        <h4 id="qinis-tech-heading" className="text-label mb-4">
          Technology
        </h4>
        <ul className="flex flex-wrap gap-2">
          {qinisTech.map((tech) => (
            <li key={tech}>
              <ProjectTag>{tech}</ProjectTag>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-12">
        <RouteLink
          to="/work/qinis"
          className="inline-flex items-center gap-2 text-body font-medium text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          Explore QINIS
          <ArrowRight aria-hidden="true" size={16} />
        </RouteLink>
      </div>
    </article>
  );
}
