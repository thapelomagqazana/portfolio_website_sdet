"use client";

import { useEffect, useMemo, useState } from "react";

export type ActiveSectionOptions = {
  readonly rootMargin?: string;
  readonly threshold?: number;
};

/**
 * Tracks the currently visible page section.
 *
 * Important:
 * - Uses IntersectionObserver.
 * - Ignores missing DOM nodes.
 * - Cleans up observers on unmount.
 * - Does not call setState synchronously inside the effect body.
 * - Returns the first section ID as a safe initial value.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  options: ActiveSectionOptions = {}
): string {
  const stableSectionKey = useMemo(() => sectionIds.join("|"), [sectionIds]);
  const defaultSectionId = sectionIds[0] ?? "";
  const [activeSection, setActiveSection] = useState(defaultSectionId);

  useEffect(() => {
    if (sectionIds.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? "-35% 0px -55% 0px",
        threshold: options.threshold ?? 0.1,
      }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [stableSectionKey, sectionIds, options.rootMargin, options.threshold]);

  return activeSection;
}
