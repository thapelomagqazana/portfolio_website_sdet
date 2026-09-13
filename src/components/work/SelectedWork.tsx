import { Section } from '@/components/layout';
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
 * Design System §26 — Projects feel like case studies.
 * Design System §43 — Artifact → Context → Interpretation.
 */
export function SelectedWork() {
  return (
    <Section id="work" spacing="xl">
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
    </Section>
  );
}
