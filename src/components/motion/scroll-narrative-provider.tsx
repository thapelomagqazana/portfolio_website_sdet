"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { narrativeStages, scrollNarrativeConfig } from "@/data/scroll-narrative";
import type { NarrativeSection, NarrativeStage, ScrollDirection } from "@/data/scroll-narrative";
import {
  calculateScrollDirection,
  getNarrativeProgress,
  narrativeStagesAreValid,
  sortNarrativeStages,
} from "@/lib/motion/scroll-narrative";

export type ScrollNarrativeContextValue = {
  readonly stages: readonly NarrativeStage[];
  readonly activeSection: NarrativeSection | undefined;
  readonly previousSection: NarrativeSection | undefined;
  readonly direction: ScrollDirection;
  readonly progress: number;
  readonly isTransitioning: boolean;
  readonly prefersReducedMotion: boolean;
  readonly registerSection: (section: NarrativeSection, element: HTMLElement | null) => void;
};

export const ScrollNarrativeContext = createContext<ScrollNarrativeContextValue | undefined>(
  undefined
);

export type ScrollNarrativeProviderProps = {
  readonly children: React.ReactNode;
  readonly stages?: readonly NarrativeStage[];
};

/**
 * Global Scroll Narrative Provider.
 *
 * Tracks the active section, previous section, scroll direction, and overall
 * story progress. It uses IntersectionObserver for performance and avoids
 * continuous scroll event calculations except for lightweight direction
 * detection.
 */
export function ScrollNarrativeProvider({
  children,
  stages = narrativeStages,
}: ScrollNarrativeProviderProps) {
  const validStages = narrativeStagesAreValid(stages)
    ? sortNarrativeStages(stages)
    : sortNarrativeStages(narrativeStages);

  const prefersReducedMotion = Boolean(useReducedMotion());
  const sectionElements = useRef(new Map<NarrativeSection, HTMLElement>());
  const previousScrollY = useRef(0);

  const [activeSection, setActiveSection] = useState<NarrativeSection | undefined>(
    validStages[0]?.id
  );
  const [previousSection, setPreviousSection] = useState<NarrativeSection | undefined>();
  const [direction, setDirection] = useState<ScrollDirection>("idle");

  const registerSection = useCallback((section: NarrativeSection, element: HTMLElement | null) => {
    if (!element) {
      sectionElements.current.delete(section);
      return;
    }

    sectionElements.current.set(section, element);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    previousScrollY.current = window.scrollY;

    function handleScroll() {
      const nextDirection = calculateScrollDirection(previousScrollY.current, window.scrollY);
      previousScrollY.current = window.scrollY;
      setDirection(nextDirection);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const bestEntry = visibleEntries[0];

        if (!bestEntry) return;

        const section = bestEntry.target.getAttribute(
          "data-narrative-section"
        ) as NarrativeSection | null;

        if (!section) return;

        setActiveSection((current) => {
          if (current === section) return current;

          setPreviousSection(current);
          return section;
        });
      },
      {
        root: null,
        rootMargin: scrollNarrativeConfig.rootMargin,
        threshold: [...scrollNarrativeConfig.threshold],
      }
    );

    sectionElements.current.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [validStages]);

  const progress = getNarrativeProgress(activeSection, validStages);
  const isTransitioning = Boolean(previousSection && previousSection !== activeSection);

  const value = useMemo(
    () => ({
      stages: validStages,
      activeSection,
      previousSection,
      direction,
      progress,
      isTransitioning,
      prefersReducedMotion,
      registerSection,
    }),
    [
      validStages,
      activeSection,
      previousSection,
      direction,
      progress,
      isTransitioning,
      prefersReducedMotion,
      registerSection,
    ]
  );

  return (
    <ScrollNarrativeContext.Provider value={value}>{children}</ScrollNarrativeContext.Provider>
  );
}
