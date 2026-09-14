import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Text — body and support text.
 *
 * Design System §10 — Two type families maximum.
 * Design System §12 — Short, readable, conversational.
 *
 * Extends HTMLAttributes<HTMLElement> so callers can pass
 * data-* attributes (e.g. data-hero-reveal for the motion
 * system), aria-* attributes and standard HTML props. All
 * unrecognised props are forwarded to the rendered element.
 */
export type TextSize = 'body-lg' | 'body' | 'small';
export type TextTone = 'default' | 'muted' | 'subtle' | 'accent';
export type TextFamily = 'sans' | 'mono';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element type to render. Defaults to 'p'. */
  as?: ElementType;
  size?: TextSize;
  tone?: TextTone;
  family?: TextFamily;
  className?: string;
  children: ReactNode;
}

const sizeClass: Record<TextSize, string> = {
  'body-lg': 'text-body-lg',
  body: 'text-body',
  small: 'text-small',
};

const toneClass: Record<TextTone, string> = {
  default: 'text-foreground',
  muted: 'text-foreground-muted',
  subtle: 'text-foreground-subtle',
  accent: 'text-accent',
};

const familyClass: Record<TextFamily, string> = {
  sans: 'font-sans',
  mono: 'font-mono',
};

export function Text({
  as: Component = 'p',
  size = 'body',
  tone = 'default',
  family = 'sans',
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeClass[size],
        toneClass[tone],
        familyClass[family],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
