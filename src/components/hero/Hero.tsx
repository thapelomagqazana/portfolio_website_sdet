import { Container } from '@/components/layout';
import { Eyebrow, Heading, Text } from '@/components/typography';
import { HeroActions } from './HeroActions';
import { ProofStrip } from './ProofStrip';

/**
 * Hero — primary identity section.
 *
 * Task P6-01: hero content
 *   - Eyebrow: positioning
 *   - Headline: value proposition
 *   - Supporting: technical focus
 *
 * Task P6-02: CTA cluster (via HeroActions)
 * Task P6-03: proof strip (via ProofStrip)
 *
 * Design System §24 — Hero is primarily typographic.
 * Design System §14 — Constrained content width.
 *
 * The hero is intentionally text-first. No decorative imagery;
 * the strongest visual asset is the writing itself.
 */
export function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="relative pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <Container>
        <div className="max-w-4xl">
          <Eyebrow className="mb-6">
            QA ENGINEER · TEST AUTOMATION · SOFTWARE QUALITY
          </Eyebrow>

          <Heading level={1} visual="display" id="hero-heading">
            I build, test and automate software for confidence.
          </Heading>

          <Text size="body-lg" tone="muted" className="mt-8 max-w-prose">
            QA Engineer focused on API, UI and CI/CD testing.
          </Text>

          <HeroActions className="mt-10" />
        </div>

        <ProofStrip className="mt-20 sm:mt-28" />
      </Container>
    </section>
  );
}
