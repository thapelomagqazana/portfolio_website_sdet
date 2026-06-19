import { describe, expect, it } from "vitest";
import {
  animationBudget,
  isAnimationBudgetExceeded,
  propertyCanCauseLayoutThrashing,
  propertyIsGpuFriendly,
  shouldRunAnimation,
} from "@/lib/motion/performance";

describe("motion performance budget", () => {
  it("defines a 60 FPS budget", () => {
    expect(animationBudget.targetFps).toBe(60);
    expect(animationBudget.maxFrameTimeMs).toBeLessThanOrEqual(16);
  });

  it("detects budget exceedance", () => {
    expect(
      isAnimationBudgetExceeded({
        concurrentAnimations: 20,
        glowEffects: 1,
        blurLayers: 1,
        averageFrameTimeMs: 10,
      })
    ).toBe(true);
  });

  it("accepts GPU-friendly properties", () => {
    expect(propertyIsGpuFriendly("transform")).toBe(true);
    expect(propertyIsGpuFriendly("opacity")).toBe(true);
  });

  it("detects layout-thrashing properties", () => {
    expect(propertyCanCauseLayoutThrashing("width")).toBe(true);
    expect(propertyCanCauseLayoutThrashing("top")).toBe(true);
    expect(propertyCanCauseLayoutThrashing("box-shadow")).toBe(true);
  });

  it("disables animation for reduced motion", () => {
    expect(
      shouldRunAnimation({
        prefersReducedMotion: true,
        isVisible: true,
        documentHidden: false,
      })
    ).toBe(false);
  });

  it("disables animation when off-screen", () => {
    expect(
      shouldRunAnimation({
        prefersReducedMotion: false,
        isVisible: false,
        documentHidden: false,
      })
    ).toBe(false);
  });
});
