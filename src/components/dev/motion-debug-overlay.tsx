"use client";

import { useAnimationPerformance } from "@/hooks/use-animation-performance";

export type MotionDebugOverlayProps = {
  readonly activeAnimations?: number;
  readonly glowEffects?: number;
  readonly blurLayers?: number;
};

/**
 * Development-only motion diagnostics overlay.
 *
 * This component renders nothing in production.
 */
export function MotionDebugOverlay({
  activeAnimations = 0,
  glowEffects = 0,
  blurLayers = 0,
}: MotionDebugOverlayProps) {
  const metrics = useAnimationPerformance();

  if (process.env.NODE_ENV === "production") return null;

  return (
    <aside
      className="bg-background-deep/90 text-text-secondary fixed right-4 bottom-4 z-[100] w-72 rounded-2xl border border-white/10 p-4 font-mono text-xs shadow-2xl backdrop-blur-xl"
      aria-label="Motion performance diagnostics"
      data-testid="motion-debug-overlay"
    >
      <p className="text-accent-green">Motion Debug</p>

      <dl className="mt-3 grid gap-2">
        <div className="flex justify-between">
          <dt>FPS</dt>
          <dd>{metrics.fps || "Sampling"}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Frame Time</dt>
          <dd>{metrics.averageFrameTimeMs.toFixed(2)}ms</dd>
        </div>

        <div className="flex justify-between">
          <dt>Dropped Frames</dt>
          <dd>{metrics.droppedFrames}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Reduced Motion</dt>
          <dd>{metrics.prefersReducedMotion ? "Yes" : "No"}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Document Hidden</dt>
          <dd>{metrics.documentHidden ? "Yes" : "No"}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Active Animations</dt>
          <dd>{activeAnimations}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Glow Effects</dt>
          <dd>{glowEffects}</dd>
        </div>

        <div className="flex justify-between">
          <dt>Blur Layers</dt>
          <dd>{blurLayers}</dd>
        </div>
      </dl>
    </aside>
  );
}
