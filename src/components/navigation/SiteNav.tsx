import { Container } from '@/components/layout';
import { navItems } from '@/content/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Nav } from './Nav';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

/**
 * SiteNav — nav content for the header landmark.
 *
 * Renders the logo, desktop nav, theme toggle and mobile menu.
 * Does NOT render a <header> element — that's owned by
 * AppShell, which wraps this content in its own <Header>
 * landmark.
 *
 * Design System §23 — Navigation remains simple.
 * NFR-006 — Keyboard accessible.
 */
const SECTION_IDS = navItems.map((item) => item.sectionId);

export function SiteNav() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <Container className="flex h-16 items-center justify-between">
      <a
        href="#top"
        className="text-label rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        THAPELO MAGQAZANA
      </a>

      <div className="flex items-center gap-4">
        <Nav activeSection={activeSection} className="hidden md:block" />

        {/* Theme toggle — visible from sm upward. On smaller
            viewports the same control lives inside the mobile
            drawer (see MobileMenu.tsx). */}
        <ThemeToggle className="hidden sm:inline-flex" />

        <MobileMenu activeSection={activeSection} />
      </div>
    </Container>
  );
}
