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
      className={buttonStyles(variant, size, className)}
      {...rest}
    >
      {leadingIcon ? <span aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </button>
  );
}
