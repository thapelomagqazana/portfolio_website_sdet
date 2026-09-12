import { cn } from '@/lib/cn';
import { proofItems } from '@/content/proof';

/**
 * ProofStrip — factual metadata under the hero.
 *
 * Task P6-03:
 *   - 2+ Years QA Experience
 *   - ISTQB Certified
 *   - Azure Certified
 *   - Python
 *   - Java
 *   - No animated counters
 *
 * Design System §25 — Numbers must be factually supported.
 * Design System §30 — No decorative animation.
 *
 * Accessibility note:
 *   ARIA's `list` role does NOT support an accessible name,
 *   so `aria-label` on a <dl> is ignored. To give the
 *   strip a name that screen readers announce, we wrap it
 *   in a <section aria-labelledby>. The <section> exposes
 *   the `region` role and accepts a name; the <dl> inside
 *   remains a plain list.
 */
export interface ProofStripProps {
  className?: string;
}

export function ProofStrip({ className }: ProofStripProps) {
  const labelId = 'proof-strip-label';

  return (
    <section
      aria-labelledby={labelId}
      className={cn('border-t border-border pt-8', className)}
    >
      {/* Visually hidden but screen-reader accessible.
          Provides the accessible name for the region. */}
      <h2 id={labelId} className="sr-only">
        Professional proof points
      </h2>

      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
        {proofItems.map((item) => (
          <div key={`${item.value}-${item.label}`} className="min-w-0">
            <dt className="text-mono font-medium text-foreground">
              {item.value}
            </dt>
            <dd className="mt-1 text-small text-foreground-subtle">
              {item.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
