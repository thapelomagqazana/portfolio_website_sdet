import type { Variants } from "motion/react";
import { motionDistance, motionOpacity } from "@/lib/motion/tokens";
import {
  buildFadeTransition,
  buildSpringTransition,
  buildStaggerTransition,
} from "@/lib/motion/utils";

/**
 * Centralized reusable motion variants.
 *
 * Components should consume these variants instead of defining one-off
 * animation objects inline.
 */

export const fadeIn: Variants = {
  hidden: {
    opacity: motionOpacity.hidden,
  },
  visible: {
    opacity: motionOpacity.visible,
    transition: buildFadeTransition(),
  },
};

export const slideUp: Variants = {
  hidden: {
    opacity: motionOpacity.hidden,
    y: motionDistance.md,
  },
  visible: {
    opacity: motionOpacity.visible,
    y: 0,
    transition: buildFadeTransition(),
  },
};

export const slideLeft: Variants = {
  hidden: {
    opacity: motionOpacity.hidden,
    x: motionDistance.md,
  },
  visible: {
    opacity: motionOpacity.visible,
    x: 0,
    transition: buildFadeTransition(),
  },
};

export const slideRight: Variants = {
  hidden: {
    opacity: motionOpacity.hidden,
    x: -motionDistance.md,
  },
  visible: {
    opacity: motionOpacity.visible,
    x: 0,
    transition: buildFadeTransition(),
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: motionOpacity.hidden,
    scale: 0.96,
  },
  visible: {
    opacity: motionOpacity.visible,
    scale: 1,
    transition: buildSpringTransition("soft"),
  },
};

export const revealWidth: Variants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: buildFadeTransition(),
  },
};

export const drawLine: Variants = {
  hidden: {
    pathLength: 0,
    opacity: motionOpacity.hidden,
  },
  visible: {
    pathLength: 1,
    opacity: motionOpacity.visible,
    transition: buildFadeTransition(),
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: buildStaggerTransition(),
  },
};

export const staggerItem: Variants = slideUp;

export const glowPulse: Variants = {
  hidden: {
    opacity: motionOpacity.faint,
    scale: 1,
  },
  visible: {
    opacity: [0.35, 1, 0.35],
    scale: [1, 1.04, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const float: Variants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: [0, -motionDistance.sm, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
