import { DEFAULT_TARGET_FPS, MAX_PIXEL_RATIO, MIN_CANVAS_SIZE } from "./render.constants";
import type { CanvasSize } from "./render.types";

/**
 * Clamps a number between a minimum and maximum value.
 */
function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a safe device pixel ratio for canvas rendering.
 *
 * High-DPI screens can report values like 3 or 4. Rendering an animated
 * full-screen canvas at that ratio can create unnecessary GPU/CPU pressure.
 */
export function getSafePixelRatio(
  devicePixelRatio: number | undefined,
  maxPixelRatio: number = MAX_PIXEL_RATIO
): number {
  if (!Number.isFinite(devicePixelRatio) || !devicePixelRatio || devicePixelRatio < 1) {
    return 1;
  }

  if (!Number.isFinite(maxPixelRatio) || maxPixelRatio < 1) {
    return 1;
  }

  return clamp(devicePixelRatio, 1, maxPixelRatio);
}

/**
 * Calculates safe CSS and physical canvas dimensions.
 */
export function getCanvasSize(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio?: number
): CanvasSize {
  const safeCssWidth = Math.max(Math.round(cssWidth), MIN_CANVAS_SIZE);
  const safeCssHeight = Math.max(Math.round(cssHeight), MIN_CANVAS_SIZE);
  const pixelRatio = getSafePixelRatio(devicePixelRatio);

  return {
    cssWidth: safeCssWidth,
    cssHeight: safeCssHeight,
    pixelWidth: Math.max(Math.round(safeCssWidth * pixelRatio), MIN_CANVAS_SIZE),
    pixelHeight: Math.max(Math.round(safeCssHeight * pixelRatio), MIN_CANVAS_SIZE),
    pixelRatio,
  };
}

/**
 * Determines whether the current frame should render based on target FPS.
 */
export function shouldRenderFrame(
  lastFrameTimestamp: number | null,
  currentTimestamp: number,
  targetFps: number = DEFAULT_TARGET_FPS
): boolean {
  if (lastFrameTimestamp === null) {
    return true;
  }

  if (!Number.isFinite(targetFps) || targetFps <= 0) {
    return true;
  }

  return currentTimestamp - lastFrameTimestamp >= 1000 / targetFps;
}

/**
 * Calculates safe frame delta in milliseconds.
 */
export function getFrameDeltaMs(
  previousTimestamp: number | null,
  currentTimestamp: number
): number {
  if (previousTimestamp === null) {
    return 0;
  }

  return Math.max(currentTimestamp - previousTimestamp, 0);
}

/**
 * Checks document visibility.
 *
 * Defaults to true for SSR, tests, and environments where visibility state
 * is unavailable.
 */
export function isDocumentVisible(documentVisibilityState?: DocumentVisibilityState): boolean {
  if (!documentVisibilityState) {
    return true;
  }

  return documentVisibilityState === "visible";
}
