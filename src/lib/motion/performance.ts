/**
 * Motion performance utilities.
 *
 * Centralizes animation budgets, frame timing helpers, GPU-safe class names,
 * and diagnostics so animation performance does not drift across components.
 */

export type AnimationBudget = {
  readonly targetFps: number;
  readonly maxFrameTimeMs: number;
  readonly maxConcurrentAnimations: number;
  readonly maxGlowEffects: number;
  readonly maxBlurLayers: number;
};

export type FrameRateSample = {
  readonly fps: number;
  readonly averageFrameTimeMs: number;
  readonly droppedFrames: number;
  readonly sampleCount: number;
};

export const animationBudget: AnimationBudget = {
  targetFps: 60,
  maxFrameTimeMs: 16,
  maxConcurrentAnimations: 12,
  maxGlowEffects: 4,
  maxBlurLayers: 3,
} as const;

export const gpuSafeMotionClassNames =
  "will-change-transform transform-gpu backface-hidden" as const;

export const animationPerformanceCopy = {
  label: "Motion Performance",
  target: "60 FPS",
  strategy: "Transform and opacity first. Pause off-screen. Respect reduced motion.",
} as const;

/**
 * Returns the ideal frame time for a target frame rate.
 */
export function getFrameBudgetMs(targetFps = animationBudget.targetFps): number {
  if (!Number.isFinite(targetFps) || targetFps <= 0) return animationBudget.maxFrameTimeMs;
  return Math.round(1000 / targetFps);
}

/**
 * Calculates FPS from frame timestamps.
 */
export function calculateFramesPerSecond(frameTimestamps: readonly number[]): FrameRateSample {
  if (frameTimestamps.length < 2) {
    return {
      fps: 0,
      averageFrameTimeMs: 0,
      droppedFrames: 0,
      sampleCount: frameTimestamps.length,
    };
  }

  const frameTimes = frameTimestamps
    .slice(1)
    .map((timestamp, index) => timestamp - frameTimestamps[index])
    .filter((time) => Number.isFinite(time) && time >= 0);

  const averageFrameTimeMs =
    frameTimes.reduce((total, frameTime) => total + frameTime, 0) / Math.max(frameTimes.length, 1);

  const fps = averageFrameTimeMs > 0 ? Math.round(1000 / averageFrameTimeMs) : 0;

  return {
    fps,
    averageFrameTimeMs,
    droppedFrames: countDroppedFrames(frameTimes),
    sampleCount: frameTimestamps.length,
  };
}

/**
 * Counts frames that exceed the motion frame budget.
 */
export function countDroppedFrames(
  frameTimes: readonly number[],
  maxFrameTimeMs = animationBudget.maxFrameTimeMs
): number {
  return frameTimes.filter((frameTime) => frameTime > maxFrameTimeMs).length;
}

/**
 * Returns true when the current frame metrics exceed budget.
 */
export function isAnimationBudgetExceeded(input: {
  readonly concurrentAnimations: number;
  readonly glowEffects: number;
  readonly blurLayers: number;
  readonly averageFrameTimeMs: number;
}): boolean {
  return (
    input.concurrentAnimations > animationBudget.maxConcurrentAnimations ||
    input.glowEffects > animationBudget.maxGlowEffects ||
    input.blurLayers > animationBudget.maxBlurLayers ||
    input.averageFrameTimeMs > animationBudget.maxFrameTimeMs
  );
}

/**
 * Returns true when the animated CSS property is GPU-friendly.
 */
export function propertyIsGpuFriendly(property: string): boolean {
  return ["transform", "opacity"].includes(property.trim().toLowerCase());
}

/**
 * Returns true when the property can trigger layout or expensive paint work.
 */
export function propertyCanCauseLayoutThrashing(property: string): boolean {
  return [
    "width",
    "height",
    "left",
    "right",
    "top",
    "bottom",
    "margin",
    "padding",
    "font-size",
    "border-width",
    "box-shadow",
    "filter",
  ].includes(property.trim().toLowerCase());
}

/**
 * Chooses whether an animation should run.
 */
export function shouldRunAnimation(input: {
  readonly prefersReducedMotion: boolean;
  readonly isVisible: boolean;
  readonly documentHidden: boolean;
  readonly reduceCpuWork?: boolean;
}): boolean {
  return (
    !input.prefersReducedMotion && input.isVisible && !input.documentHidden && !input.reduceCpuWork
  );
}
