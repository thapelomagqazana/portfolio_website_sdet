/**
 * buttonStyles — shared button styling function.
 *
 * Exported separately from `<Button>` so the same visual
 * treatment can be applied to `<a>`, `<Link>` and other
 * elements without importing a React component.
 *
 * Extracted from Button.tsx to satisfy
 * `react-refresh/only-export-components`.
 */
import { cn } from '@/lib/cn';

/** Visual hierarchy. See Design System §21. */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

/** Size scale. md = default; lg = hero CTA. */
export type ButtonSize = 'md' | 'lg';

const baseClass = [
  'inline-flex items-center justify-center gap-2',
  'font-medium rounded-md',
  'transition-[color,background-color,border-color] duration-fast ease-standard',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
  'disabled:opacity-50 disabled:pointer-events-none',
].join(' ');

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-background hover:bg-accent-hover border border-transparent',
  secondary:
    'bg-surface text-foreground border border-border hover:border-border-strong hover:bg-surface-elevated',
  tertiary:
    'bg-transparent text-foreground-muted border border-transparent hover:text-foreground',
};

const sizeClass: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-small',
  lg: 'h-12 px-6 text-body',
};

/**
 * Compose the className string for a button-styled element.
 *
 * @example
 *   <a href="/work" className={buttonStyles('primary', 'lg')}>View Work</a>
 */
export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(baseClass, variantClass[variant], sizeClass[size], className);
}
