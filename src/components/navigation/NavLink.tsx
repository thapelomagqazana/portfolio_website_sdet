import { cn } from '@/lib/cn';

/**
 * NavLink — single navigation link with an active state.
 *
 * Design System §7  — Accent used for selected states only.
 * Design System §35 — Selected state must be visible.
 * NFR-006 — Keyboard accessible with visible focus.
 */
export interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  /** Called when the link is activated (used to close mobile menus). */
  onClick?: () => void;
  className?: string;
}

export function NavLink({
  href,
  label,
  active,
  onClick,
  className,
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'relative inline-flex items-center px-3 py-2 text-small font-medium',
        'rounded-sm transition-colors duration-fast ease-standard',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        active
          ? 'text-foreground'
          : 'text-foreground-muted hover:text-foreground',
        className,
      )}
    >
      {label}
      {/* Active indicator — subtle underline using the accent token */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-3 right-3 -bottom-px h-px',
          'bg-accent transition-opacity duration-fast',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
    </a>
  );
}
