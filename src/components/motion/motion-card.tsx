"use client";

import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { cardHover, panelReveal } from "@/animations";

type MotionCardProps = HTMLMotionProps<"div">;

/**
 * MotionCard is the default animated wrapper for dashboard cards,
 * project cards, metric panels, and command-center surfaces.
 *
 * It uses Motion's native HTMLMotionProps because Motion overrides some
 * React DOM event prop types such as onAnimationStart and drag handlers.
 */
export function MotionCard({ children, className, ...props }: MotionCardProps) {
  return (
    <motion.div
      className={className}
      variants={panelReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={cardHover}
      {...props}
    >
      {children}
    </motion.div>
  );
}
