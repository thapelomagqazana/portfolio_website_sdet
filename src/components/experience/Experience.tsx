import { Section } from '@/components/layout';
import { useReveal } from '@/hooks/useReveal';
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
 * Motion:
 *   The whole section fades up on scroll entry (P22 effect 1).
 *   Individual ExperienceItem entries are NOT wrapped in their
 *   own reveal — the timeline reads as a single continuous
 *   block, and one reveal preserves that continuity.
 *
 * Design System §26 — Case study feel, not a resume.
 * Design System §40 — Progressive disclosure via expandable
 *   rows.
 */
export function Experience() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section id="experience" spacing="xl">
      <div ref={ref} data-reveal="false">
        <header className="mb-12 max-w-2xl">
          <p className="text-label mb-4">EXPERIENCE</p>
          <h2 className="text-h2">Where I've worked and what I built.</h2>
        </header>

        <ol className="flex flex-col">
          {experience.map((entry) => (
            <ExperienceItem key={entry.id} entry={entry} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
