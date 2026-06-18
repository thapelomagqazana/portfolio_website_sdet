import type { Transition, Variants } from "motion/react";

export type MotionDurationToken = "instant" | "fast" | "normal" | "medium" | "slow" | "slower";
export type MotionDistanceToken = "xs" | "sm" | "md" | "lg" | "xl";
export type MotionDelayToken = "none" | "xs" | "sm" | "md" | "lg";
export type MotionEaseToken = "standard" | "emphasized" | "entrance" | "exit";
export type MotionSpringToken = "soft" | "medium" | "snappy";

export type MotionVariant = Variants;
export type MotionTransition = Transition;

export type MotionConfig = {
  readonly prefersReducedMotion: boolean;
  readonly shouldAnimate: boolean;
  readonly durationScale: number;
  readonly transitionFactory: (transition?: Transition) => Transition;
};
