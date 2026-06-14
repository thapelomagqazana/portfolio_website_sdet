"use client";

import { useEffect, useMemo, useState } from "react";

export type ActiveSectionOptions = {
  rootMargin?: string;
  threshold?: number;
};

/**
 * Tracks the currently visible section by ID.
 *
 * Design rules:
 * - No synchronous setState inside the effect body.
 * - Empty section lists are handled through derived return value.
 * - Missing DOM elements are ignored safely.
 * - IntersectionObservers are cleaned up on unmount.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  options: ActiveSectionOptions = {}
) {
  const stableSectionKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  const [activeSection, setActiveSection] = useState<string>(() => sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (!element) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSection((currentSection) => {
              if (currentSection === id) {
                return currentSection;
              }

              return id;
            });
          }
        },
        {
          root: null,
          rootMargin: options.rootMargin ?? "-40% 0px -50% 0px",
          threshold: options.threshold ?? 0.1,
        }
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [stableSectionKey, options.rootMargin, options.threshold]);

  return sectionIds.length === 0 ? "" : activeSection;
}
