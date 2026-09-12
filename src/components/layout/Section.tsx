import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import type { ContainerSize } from './Container';

/**
 * Section — vertical rhythm block with optional heading slot.
 *
 * Design System §13 — Generous vertical spacing for large sections.
 * Design System §54 — Semantic HTML (`<section>` with aria-labelledby).
 *
 * Wrap each page section in `<Section>` to guarantee consistent
 * spacing and accessibility landmarks.
 */
export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl';
export type SectionSurface = 'background' | 'surface' | 'elevated';

export interface SectionProps {
  /** Anchor id — used for in-page navigation (#work, #about). */
  id?: string;
  /** Visible section heading text; also used for aria-labelledby. */
  heading?: string;
  /** Vertical padding scale. */
  spacing?: SectionSpacing;
  /** Surface level. Defaults to page background. */
  surface?: SectionSurface;
  /** Max content width. */
  containerSize?: ContainerSize;
  /** Additional class names on the outer wrapper. */
  className?: string;
  /** Section content. */
  children: ReactNode;
}

const spacingClass: Record<SectionSpacing, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-24 sm:py-32',
  xl: 'py-32 sm:py-48',
};

const surfaceClass: Record<SectionSurface, string> = {
  background: 'bg-background text-foreground',
  surface: 'bg-surface text-foreground',
  elevated: 'bg-surface-elevated text-foreground',
};

export function Section({
  id,
  heading,
  spacing = 'lg',
  surface = 'background',
  containerSize = 'default',
  className,
  children,
}: SectionProps) {
  const headingId = heading ? `${id ?? 'section'}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(spacingClass[spacing], surfaceClass[surface], className)}
    >
      <Container size={containerSize}>
        {heading ? (
          <h2 id={headingId} className="text-h2 mb-12 sm:mb-16 text-foreground">
            {heading}
          </h2>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
