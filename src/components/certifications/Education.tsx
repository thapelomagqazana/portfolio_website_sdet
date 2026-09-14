import { GraduationCap } from 'lucide-react';
import { Section } from '@/components/layout';
import { education } from '@/content/credentials';

/**
 * Education — academic and technical foundation.
 *
 * Task P11-02:
 *   UNISA            BSc Computer Science & Mathematics    2026–Present
 *   WeThinkCode_     NQF 5 Systems Development             2022–2024
 *   Wits             BSc Construction Studies              2017–2021
 *
 * Content Inventory §10 — Do not apologise for the
 * Construction Studies degree. It forms part of the career
 * journey: construction → systems development → software
 * testing → QA engineering.
 *
 * Rendered as an ordered list, newest-first.
 */
export function Education() {
  return (
    <Section
      id="education"
      aria-labelledby="education-heading"
      spacing="lg"
      surface="surface"
    >
      <header className="mb-10 max-w-2xl">
        <p className="text-label mb-4">EDUCATION</p>
        <h2 id="education-heading" className="text-h2">
          Academic and technical foundation.
        </h2>
      </header>

      <ol className="flex flex-col">
        {education.map((entry) => (
          <li
            key={entry.id}
            id={`education-${entry.id}`}
            className="grid gap-4 border-t border-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
          >
            {/* Left: institution + programme */}
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <GraduationCap
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-foreground-subtle"
                />
                <h3 className="text-h3 text-foreground">{entry.institution}</h3>
              </div>
              <p className="mt-2 text-body text-foreground-muted">
                {entry.programme}
              </p>
              {entry.location ? (
                <p className="mt-1 text-small text-foreground-subtle">
                  {entry.location}
                </p>
              ) : null}
            </div>

            {/* Right: dates */}
            <span className="text-small text-foreground-subtle sm:text-right sm:whitespace-nowrap">
              {entry.dates}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
