import { useCallback, useId, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { navItems } from '@/content/navigation';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

/**
 * MobileMenu — accessible hamburger drawer.
 *
 * Task P5-02 acceptance:
 *   - Mobile navigation works
 *   - Escape closes the menu
 *   - Focus returns to the trigger on close
 *   - Focus is trapped inside the drawer while open
 *   - Active section is visible
 *
 * Task P5-03 integration:
 *   - Theme toggle available inside the drawer for viewports
 *     below `sm`, where the header toggle is hidden
 *
 * Design System §23 — Same five items as desktop.
 * Design System §35 — Escape dismisses overlays.
 * NFR-006 — Full keyboard operability.
 *
 * Rendered only below `md`; the desktop Nav handles larger viewports.
 */
export interface MobileMenuProps {
  /** Section id currently in view, if any. */
  activeSection: string | null;
}

export function MobileMenu({ activeSection }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEscapeKey(open, close);
  useFocusTrap(open, panelRef, triggerRef);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-haspopup="dialog"
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-md',
          'text-foreground hover:bg-surface-elevated',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          'transition-colors duration-fast',
        )}
      >
        <Menu aria-hidden="true" size={20} />
      </button>

      {/* Backdrop + drawer */}
      <div
        className={cn(
          'fixed inset-0 z-overlay',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={close}
          className={cn(
            'absolute inset-0 bg-background/70 backdrop-blur-sm',
            'transition-opacity duration-base ease-standard',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Panel */}
        <div
          ref={panelRef}
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-hidden={!open}
          className={cn(
            'absolute right-0 top-0 h-dvh w-72 max-w-[85vw]',
            'bg-surface border-l border-border',
            'flex flex-col',
            'transition-transform duration-base ease-standard',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <span id={headingId} className="text-label">
              NAVIGATION
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close navigation menu"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-md',
                'text-foreground hover:bg-surface-elevated',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                'transition-colors duration-fast',
              )}
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto p-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    active={activeSection === item.sectionId}
                    onClick={close}
                    className="w-full text-body-lg"
                  />
                </li>
              ))}
            </ul>

            {/* Theme toggle — mirrors the header toggle for
                viewports below `sm` where the header copy is hidden. */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-label mb-3">THEME</p>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
