import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buttonStyles } from './buttonStyles';
import type { ButtonVariant, ButtonSize } from './buttonStyles';

/**
 * Link — anchor primitive.
 *
 * Design System §21 — Matches Button hierarchy when styled as CTA.
 * Design System §36 — Meaningful link text; distinguishable external.
 *
 * External links automatically receive `target="_blank"`,
 * `rel="noopener noreferrer"` and an accessible label suffix.
 */
export type LinkVariant =
  'inline' | 'cta-primary' | 'cta-secondary' | 'cta-tertiary';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  /** CTA button size when variant is a CTA. */
  ctaSize?: ButtonSize;
  children: ReactNode;
}

const inlineClass =
  'text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm';

const ctaVariantMap: Record<Exclude<LinkVariant, 'inline'>, ButtonVariant> = {
  'cta-primary': 'primary',
  'cta-secondary': 'secondary',
  'cta-tertiary': 'tertiary',
};

export function Link({
  variant = 'inline',
  ctaSize = 'md',
  className,
  href,
  children,
  ...rest
}: LinkProps) {
  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);

  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};

  const resolvedClass =
    variant === 'inline'
      ? cn(inlineClass, className)
      : buttonStyles(ctaVariantMap[variant], ctaSize, className);

  return (
    <a href={href} className={resolvedClass} {...externalProps} {...rest}>
      {children}
      {isExternal ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
