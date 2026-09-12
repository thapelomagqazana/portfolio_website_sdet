import { ArrowRight } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons/BrandIcons';
import { cn } from '@/lib/cn';
import { Link } from '@/components/primitives';
import { heroPrimaryCta, heroSecondaryCta } from '@/content/ctas';

/**
 * HeroActions — primary and secondary CTAs for the hero.
 *
 * Task P6-02 acceptance:
 *   - Primary: "Explore My Work" → #work (internal)
 *   - Secondary: "LinkedIn" → external profile
 *   - Keyboard accessible with visible focus
 *   - External link opens in a new tab with a screen-reader
 *     hint and safe rel attributes
 *
 * Conversion Goals §3, §4, §7 — Explicit destination,
 * measurable event, correct hierarchy.
 *
 * Design System §21, §22 — Button hierarchy.
 *
 * Icon sources:
 *   - Lucide for UI icons (ArrowRight)
 *   - Local BrandIcons for brand logos (LinkedIn) — Lucide v1
 *     removed brand icons and Simple Icons dropped LinkedIn
 *     following a trademark request.
 */
export interface HeroActionsProps {
  className?: string;
}

export function HeroActions({ className }: HeroActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4',
        className,
      )}
    >
      <Link
        href={heroPrimaryCta.destination}
        variant="cta-primary"
        ctaSize="lg"
      >
        {heroPrimaryCta.label}
        <ArrowRight aria-hidden="true" size={18} />
      </Link>

      <Link
        href={heroSecondaryCta.destination}
        variant="cta-secondary"
        ctaSize="lg"
      >
        <LinkedinIcon size={18} />
        {heroSecondaryCta.label}
      </Link>
    </div>
  );
}
