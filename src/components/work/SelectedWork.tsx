import { Section } from '@/components/layout';
import { useReveal } from '@/hooks/useReveal';
import { QinisCard } from './QinisCard';
import { BrikByteCard } from './BrikByteCard';

/**
 * SelectedWork — the portfolio's core evidence section.
 *
 * Tasks P8-01..08:
 *   - QINIS card (P8-01..04)
 *   - BrikByteOS card (P8-06..08)
 *
 * Each card is a self-contained case-study preview. The full
 * case studies live at /work/qinis and /work/brikbyteos.
 *
 * Motion:
 *   The section fades up on scroll entry via useReveal +
 *   data-reveal (P22 effect 1). The internal cards
 *   (QinisCard, BrikByteCard) reveal as part of the section —
 *   they are not wrapped individually.
 *
 * Design System §26 — Projects feel like case studies.
 * Design System §43 — Artifact → Context → Interpretation.
 */
export function SelectedWork() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <Section id="work" spacing="xl">
      <div ref={ref} data-reveal="false">
        <header className="mb-16">
          <p className="text-label mb-4">SELECTED WORK</p>
          <h2 className="text-h2 max-w-2xl">
            Projects that demonstrate engineering thinking.
          </h2>
        </header>

        <div className="flex flex-col gap-24">
          <QinisCard />
          <BrikByteCard />
        </div>
      </div>
    </Section>
  );
}
