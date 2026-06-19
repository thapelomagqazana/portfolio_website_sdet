import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAnimationPerformance } from "@/hooks/use-animation-performance";

vi.mock("motion/react", () => ({
  useReducedMotion: () => false,
}));

afterEach(() => cleanup());

describe("useAnimationPerformance", () => {
  it("returns animation performance state", () => {
    const { result } = renderHook(() => useAnimationPerformance());

    expect(result.current.shouldAnimate).toBe(true);
    expect(result.current.prefersReducedMotion).toBe(false);
    expect(result.current.frameBudgetMs).toBeLessThanOrEqual(16);
  });

  it("disables animation when not visible", () => {
    const { result } = renderHook(() => useAnimationPerformance({ isVisible: false }));

    expect(result.current.shouldAnimate).toBe(false);
  });

  it("disables animation when reduced CPU work is requested", () => {
    const { result } = renderHook(() =>
      useAnimationPerformance({
        reduceCpuWork: true,
      })
    );

    expect(result.current.shouldAnimate).toBe(false);
  });
});
