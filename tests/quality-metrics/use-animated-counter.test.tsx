import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAnimatedCounter } from "../../src/hooks/use-animated-counter";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("useAnimatedCounter", () => {
  it("returns initial value when animation starts", () => {
    const { result } = renderHook(() =>
      useAnimatedCounter({
        from: 0,
        to: 100,
        suffix: "%",
      })
    );

    expect(result.current.displayValue).toBe("0%");
    expect(result.current.isComplete).toBe(false);
  });

  it("returns target value immediately for reduced motion", () => {
    const { result } = renderHook(() =>
      useAnimatedCounter({
        from: 0,
        to: 97.3,
        precision: 1,
        suffix: "%",
        reducedMotion: true,
      })
    );

    expect(result.current.displayValue).toBe("97.3%");
    expect(result.current.value).toBe(97.3);
    expect(result.current.isComplete).toBe(true);
  });

  it("handles invalid duration safely", () => {
    const { result } = renderHook(() =>
      useAnimatedCounter({
        from: 0,
        to: 85,
        durationMs: Number.NaN,
        suffix: "%",
      })
    );

    expect(result.current.displayValue).toBe("0%");
  });

  it("does not crash with invalid values", () => {
    const { result } = renderHook(() =>
      useAnimatedCounter({
        from: Number.NaN,
        to: Number.NaN,
        reducedMotion: true,
        suffix: "%",
      })
    );

    expect(result.current.displayValue).toBe("0%");
  });
});
