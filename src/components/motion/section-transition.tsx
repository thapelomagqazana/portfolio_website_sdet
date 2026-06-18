"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { NarrativeSection } from "@/data/scroll-narrative";
import { useScrollNarrative } from "@/hooks/use-scroll-narrative";
import { motionDuration, motionEase } from "@/lib/motion/tokens";

export type SectionTransitionMode = "fade" | "slide" | "reveal";

export type SectionTransitionProps = {
  readonly stage: NarrativeSection;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly mode?: SectionTransitionMode;
};

/**
 * Narrative section wrapper.
 *
 * Registers the section with the Scroll Narrative Provider and applies a
 * consistent reveal transition that respects reduced motion.
 */
export function SectionTransition({
  stage,
  children,
  className,
  mode = "slide",
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { activeSection, registerSection, prefersReducedMotion } = useScrollNarrative();

  const isActive = activeSection === stage;

  useEffect(() => {
    registerSection(stage, ref.current);
    return () => registerSection(stage, null);
  }, [registerSection, stage]);

  const hiddenState =
    mode === "fade"
      ? { opacity: 0.75 }
      : mode === "reveal"
        ? { opacity: 0.8, scale: 0.985 }
        : { opacity: 0.78, y: 18 };

  const visibleState =
    mode === "fade"
      ? { opacity: 1 }
      : mode === "reveal"
        ? { opacity: 1, scale: 1 }
        : { opacity: 1, y: 0 };

  return (
    <motion.section
      ref={ref}
      data-narrative-section={stage}
      data-narrative-active={isActive}
      className={className}
      initial={prefersReducedMotion ? false : hiddenState}
      whileInView={prefersReducedMotion ? undefined : visibleState}
      viewport={{ once: false, amount: 0.18 }}
      transition={{
        duration: prefersReducedMotion ? 0 : motionDuration.medium,
        ease: motionEase.entrance,
      }}
    >
      {children}
    </motion.section>
  );
}
