import { useEffect, useState } from 'react';

/**
 * useActiveSection — track which section is currently visible.
 *
 * Design System §35 — Selected states use the accent token.
 * Task P5-02 — Active section visible in navigation.
 *
 * Uses IntersectionObserver to mark the section whose topmost
 * edge is closest to the top of the viewport. Falls back to
 * `null` when no section is intersecting.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    /**
     * Root margin "-45% 0px -50% 0px" means: the observer
     * considers a section "active" when its top edge crosses
     * roughly the vertical centre of the viewport. This gives
     * a stable active state during scrolling.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const next = visible[0]?.target.id ?? null;
        setActiveId(next);
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0,
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
