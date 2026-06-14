/**
 * Default frame rate for normal animation.
 */
export const DEFAULT_TARGET_FPS = 60;

/**
 * Lower frame rate for reduced motion, low power, or heavy pages.
 */
export const LOW_POWER_TARGET_FPS = 30;

/**
 * Maximum canvas pixel ratio.
 *
 * This prevents high-DPI screens from creating huge animated backing stores.
 */
export const MAX_PIXEL_RATIO = 2;

/**
 * Minimum canvas dimension to avoid invalid zero-sized backing stores.
 */
export const MIN_CANVAS_SIZE = 1;
