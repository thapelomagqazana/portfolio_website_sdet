import { Section } from '@/components/layout';
import { experience } from '@/content/experience';
import { ExperienceItem } from './ExperienceItem';

/**
 * Experience — chronological timeline of roles and projects.
 *
 * Task P9-01 — Chronological timeline:
 *   QINIS               2026–Present
 *   Alula Technologies  2025–2026
 *   C. Steinweg Bridge  2024
 *
 * Employment and independent project work are visually
 * distinguished (EMPLOYMENT vs INDEPENDENT PROJECT badge)
 * to honour Content Inventory §21.
 *
 * Design System §26 — Case study feel, not a resume.
 * Design System §40 — Progressive disclosure via expandable
 *   rows.
 */
export function Experience() {
  return (
    <Section id="experience" spacing="xl">
      <header className="mb-12 max-w-2xl">
        <p className="text-label mb-4">EXPERIENCE</p>
        <h2 className="text-h2">Where I've worked and what I built.</h2>
      </header>

      <ol className="flex flex-col">
        {experience.map((entry) => (
          <ExperienceItem key={entry.id} entry={entry} />
        ))}
      </ol>
    </Section>
  );
}
