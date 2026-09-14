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
 * Motion:
 *   data-hero-reveal="1"…"5" on each element drives a
 *   staggered fade-up on mount (see src/styles/motion.css).
 *   The stagger is 80ms per step — the hero assembles in
 *   reading order over ~640ms.
 *
 *   Under prefers-reduced-motion, the animation is skipped
 *   entirely and every element is visible immediately.
 *   No JS is required for the animation; the site works
 *   identically without it.
 *
 * Design System §24 — Hero is primarily typographic.
 * Design System §14 — Constrained content width.
 * Design System §32 — Motion communicates, does not decorate.
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
          <Eyebrow className="mb-6" data-hero-reveal="1">
            QA ENGINEER · TEST AUTOMATION · SOFTWARE QUALITY
          </Eyebrow>

          <Heading
            level={1}
            visual="display"
            id="hero-heading"
            data-hero-reveal="2"
          >
            I build, test and automate software for confidence.
          </Heading>

          <Text
            size="body-lg"
            tone="muted"
            className="mt-8 max-w-prose"
            data-hero-reveal="3"
          >
            QA Engineer focused on API, UI and CI/CD testing.
          </Text>

          <HeroActions className="mt-10" data-hero-reveal="4" />

          <ProofStrip className="mt-20 sm:mt-28" data-hero-reveal="5" />
        </div>
      </Container>
    </section>
  );
}
