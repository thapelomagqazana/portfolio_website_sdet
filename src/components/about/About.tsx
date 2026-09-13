import { Section } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import { aboutHeading, aboutIntro, aboutPillars } from '@/content/about';
import { AboutActions } from './AboutActions';

/**
 * About — concise professional narrative.
 *
 * Task P7-01:
 *   - Heading: "Engineering quality, not just finding bugs."
 *   - Four pillars: QA experience, Development background,
 *     Current studies, Career direction
 *
 * Design System §12 — Short, strong, specific.
 * Design System §40 — Progressive disclosure: short intro,
 * then evidence, then optional deep dive.
 *
 * Layout: two-column on desktop — heading and intro on the
 * left, pillars on the right. This creates editorial asymmetry
 * without extra decoration.
 *
 * Accessibility: the <h2> lives inside the two-column grid
 * rather than above it, so we name the section explicitly with
 * aria-labelledby="about-heading" instead of using Section's
 * built-in `heading` prop.
 */
export function About() {
  return (
    <Section
      id="about-content"
      aria-labelledby="about-heading"
      spacing="lg"
      surface="surface"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column — heading + intro */}
        <div className="lg:col-span-5">
          <Heading level={2} visual="h2" id="about-heading">
            {aboutHeading}
          </Heading>
          <Text size="body-lg" tone="muted" className="mt-6">
            {aboutIntro}
          </Text>
          <AboutActions className="mt-8" />
        </div>

        {/* Right column — pillars */}
        <div className="lg:col-span-7">
          <dl className="grid gap-8 sm:grid-cols-2">
            {aboutPillars.map((pillar) => (
              <div key={pillar.label}>
                <dt className="text-label mb-3">{pillar.label}</dt>
                <dd className="text-body text-foreground-muted">
                  {pillar.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
