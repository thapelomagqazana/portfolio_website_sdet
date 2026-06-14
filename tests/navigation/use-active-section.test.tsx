import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useActiveSection } from "../../src/hooks/use-active-section";

afterEach(() => {
  cleanup();
});

describe("useActiveSection", () => {
  it("returns first section by default", () => {
    const { result } = renderHook(() => useActiveSection(["hero", "about"]));

    expect(result.current).toBe("hero");
  });

  it("returns empty string when no sections exist", () => {
    const { result } = renderHook(() => useActiveSection([]));

    expect(result.current).toBe("");
  });

  it("does not crash when DOM sections are missing", () => {
    const { result } = renderHook(() => useActiveSection(["missing"]));

    expect(result.current).toBe("missing");
  });
});
