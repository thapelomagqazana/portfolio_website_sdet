"use client";

import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { sectionRevealProps, slideUp } from "@/animations";

type MotionSectionProps = HTMLMotionProps<"section">;

/**
 * MotionSection is the default animated wrapper for major page sections.
 *
 * It uses Motion's native HTMLMotionProps instead of React's normal section
 * props because Motion overrides certain event types such as drag events.
 */
export function MotionSection({ children, className, id, ...props }: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={slideUp}
      {...sectionRevealProps}
      {...props}
    >
      {children}
    </motion.section>
  );
}
