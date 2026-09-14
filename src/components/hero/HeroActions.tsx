import type { HTMLAttributes } from 'react';
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
 * Motion:
 *   - Each CTA carries data-cta. The motion system in
 *     src/styles/motion.css applies a 1px lift on hover and
 *     a subtle press on :active (P22 effect 6).
 *   - The outer wrapper accepts data-hero-reveal="4" from
 *     Hero so the CTA cluster enters as part of the hero's
 *     staggered entrance.
 *
 * Icon sources:
 *   - Lucide for UI icons (ArrowRight)
 *   - Local BrandIcons for brand logos (LinkedIn) — Lucide v1
 *     removed brand icons and Simple Icons dropped LinkedIn
 *     following a trademark request.
 */
export interface HeroActionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function HeroActions({ className, ...rest }: HeroActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4',
        className,
      )}
      {...rest}
    >
      <Link
        href={heroPrimaryCta.destination}
        variant="cta-primary"
        ctaSize="lg"
        data-cta
      >
        {heroPrimaryCta.label}
        <ArrowRight aria-hidden="true" size={18} />
      </Link>

      <Link
        href={heroSecondaryCta.destination}
        variant="cta-secondary"
        ctaSize="lg"
        data-cta
      >
        <LinkedinIcon size={18} />
        {heroSecondaryCta.label}
      </Link>
    </div>
  );
}
