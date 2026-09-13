import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Link — internal route navigation for the hash router.
 *
 * Prepends "#" to the href and preserves normal anchor
 * behaviour (keyboard, middle-click, copy link).
 *
 * This file exports only the component. Props types are
 * co-located because they're tightly bound to the component
 * (not shared), so they don't trip Fast Refresh.
 */
export interface RouteLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  /** Route path without the leading "#", e.g. "/work/qinis". */
  to: string;
  children: ReactNode;
}

export function Link({ to, className, children, ...rest }: RouteLinkProps) {
  return (
    <a href={`#${to}`} className={cn(className)} {...rest}>
      {children}
    </a>
  );
}
