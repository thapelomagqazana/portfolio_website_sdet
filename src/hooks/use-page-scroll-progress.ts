"use client";

import { useScroll } from "motion/react";

/**
 * Exposes page scroll progress for progress indicators and
 * scroll-linked command-center transitions.
 */
export function usePageScrollProgress() {
  const { scrollYProgress } = useScroll();

  return {
    scrollYProgress,
  };
}
