import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonStyles } from './buttonStyles';
import type { ButtonVariant, ButtonSize } from './buttonStyles';

/**
 * Button — primary interaction component.
 *
 * Design System §21 — Primary / Secondary / Tertiary hierarchy.
 * Design System §22 — CTA design rules.
 * NFR-006 — Keyboard accessible; visible focus ring.
 *
 * Motion:
 *   Primary buttons automatically receive data-cta, so the
 *   hover-lift and press-scale in src/styles/motion.css apply
 *   without callers having to remember (P22 effect 6).
 *   Secondary and tertiary buttons do not lift — the visual
 *   hierarchy is preserved (only the strongest action gets
 *   the physical affordance).
 *
 * This file exports only the component so Fast Refresh
 * continues to work. `buttonStyles` and the variant/size
 * types live in ./buttonStyles.ts and are re-exported
 * from ./index.ts for consumers.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional trailing icon (e.g., ArrowRight). */
  trailingIcon?: ReactNode;
  /** Optional leading icon. */
  leadingIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  trailingIcon,
  leadingIcon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      data-cta={variant === 'primary' ? '' : undefined}
      className={buttonStyles(variant, size, className)}
      {...rest}
    >
      {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </button>
  );
}
