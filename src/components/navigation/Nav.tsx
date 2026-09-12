import { navItems } from '@/content/navigation';
import { NavLink } from './NavLink';

/**
 * Nav — desktop navigation.
 *
 * Design System §23 — Five items, no more.
 * NFR-006 — Keyboard accessible; focus order follows DOM order.
 *
 * Hidden below `md`. The mobile drawer (MobileMenu) handles
 * small viewports.
 */
export interface NavProps {
  /** Section id currently in view, if any. */
  activeSection: string | null;
  className?: string;
}

export function Nav({ activeSection, className }: NavProps) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              label={item.label}
              active={activeSection === item.sectionId}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
