import { Section } from '@/components/layout';
import { principles, philosophyClosing } from '@/content/philosophy';
import { Principle } from './Principle';

/**
 * Philosophy — engineering principles.
 *
 * Task P12-01 — Four principles:
 *   01 Understand
 *   02 Challenge
 *   03 Automate
 *   04 Evidence
 *
 * Content Inventory §14 — The section that differentiates the
 * portfolio from a conventional CV. It shows *how* the author
 * thinks, not just what they've done.
 *
 * Layout: 2-column grid on tablet+, single column on mobile.
 * Each principle sits in its own column with a top border,
 * forming a clean editorial rhythm.
 */
export function Philosophy() {
  return (
    <Section id="philosophy" aria-labelledby="philosophy-heading" spacing="xl">
      <header className="mb-12 max-w-2xl">
        <p className="text-label mb-4">ENGINEERING PHILOSOPHY</p>
        <h2 id="philosophy-heading" className="text-h2">
          How I think about quality.
        </h2>
      </header>

      <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {principles.map((principle) => (
          <Principle key={principle.number} principle={principle} />
        ))}
      </ol>

      <p className="mt-16 border-t border-border pt-8 text-h3 text-foreground">
        {philosophyClosing}
      </p>
    </Section>
  );
}
