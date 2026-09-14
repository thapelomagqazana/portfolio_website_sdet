import { Section } from '@/components/layout';
import { journeyNarrative, journeyStages } from '@/content/journey';
import { JourneyStage } from './JourneyStage';

/**
 * Journey — the career timeline and narrative.
 *
 * Task P13-01 — Vertical timeline:
 *   Construction → Systems Development → Software Testing →
 *   QA Engineering → Test Automation → Quality Engineering
 *
 * Task P13-02 — Narrative paragraph.
 *
 * Content Inventory §13 — The journey communicates
 * progression rather than unrelated job changes.
 *
 * Anchor: #career — target of the About section CTA
 * ("More about my journey →").
 */
export function Journey() {
  return (
    <Section
      id="career"
      aria-labelledby="journey-heading"
      spacing="xl"
      surface="surface"
    >
      <header className="mb-12 max-w-2xl">
        <p className="text-label mb-4">CAREER JOURNEY</p>
        <h2 id="journey-heading" className="text-h2">
          From construction to quality engineering.
        </h2>
      </header>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column — timeline */}
        <ol aria-label="Career progression" className="lg:col-span-7">
          {journeyStages.map((stage) => (
            <JourneyStage key={stage.id} stage={stage} />
          ))}
        </ol>

        {/* Right column — narrative */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <blockquote
            aria-label="Career narrative"
            className="border-l-2 border-accent pl-6"
          >
            {journeyNarrative.map((paragraph) => (
              <p
                key={paragraph}
                className="text-body-lg italic text-foreground-muted"
              >
                {paragraph}
              </p>
            ))}
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
