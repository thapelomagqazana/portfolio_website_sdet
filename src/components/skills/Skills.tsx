import { Section } from '@/components/layout';
import { useReveal } from '@/hooks/useReveal';
import { skillGroups } from '@/content/skills';
import { SkillGroup } from './SkillGroup';

/**
 * Skills — technical capability section.
 *
 * Task P10-01 — Four groups:
 *   Test, Automate, Build, Deliver
 *
 * Design System §48 — No skill bars, no percentage ratings.
 * Content Inventory §8 — Capabilities presented as a
 *   categorised list, not a self-rated hierarchy.
 *
 * Motion:
 *   The section fades up on scroll entry (P22 effect 1).
 *   Individual SkillGroup cards are not wrapped — the four
 *   groups reveal together as one capability statement.
 *
 * Accessibility:
 *   The section heading lives inside a custom <header> (with
 *   an eyebrow above it), so Section's built-in `heading`
 *   prop is not usable. We name the section with an explicit
 *   aria-labelledby pointing at the <h2>.
 */
export function Skills() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section
      id="skills"
      aria-labelledby="skills-heading"
      spacing="xl"
      surface="surface"
    >
      <div ref={ref} data-reveal="false">
        <header className="mb-12 max-w-2xl">
          <p className="text-label mb-4">TECHNICAL CAPABILITY</p>
          <h2 id="skills-heading" className="text-h2">
            What I work with, grouped by purpose.
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </Section>
  );
}
