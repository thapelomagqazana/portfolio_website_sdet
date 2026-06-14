/**
 * Data passed into each render frame callback.
 *
 * Renderers should use this model instead of reading timestamps directly.
 */
export type RenderFrame = {
  readonly timestamp: number;
  readonly deltaMs: number;
  readonly elapsedMs: number;
};

/**
 * Options for the network render loop.
 */
export type RenderLoopOptions = {
  readonly enabled: boolean;
  readonly targetFps: number;
  readonly onFrame: (frame: RenderFrame) => void;
};

/**
 * Canvas dimensions in CSS pixels and physical backing-store pixels.
 */
export type CanvasSize = {
  readonly cssWidth: number;
  readonly cssHeight: number;
  readonly pixelWidth: number;
  readonly pixelHeight: number;
  readonly pixelRatio: number;
};

/**
 * Rendering quality profile.
 */
export type RenderQuality = "low" | "medium" | "high";
