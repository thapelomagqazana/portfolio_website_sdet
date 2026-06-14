import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { designSystem } from "../../src/styles/design-system";

function readFile(filePath: string): string {
  return readFileSync(path.join(process.cwd(), filePath), "utf8");
}

describe("BrikByte Command Design System", () => {
  it("defines required color tokens", () => {
    expect(designSystem.colors.background.deep).toBe("#070B14");
    expect(designSystem.colors.accent.blue).toBe("#00D4FF");
    expect(designSystem.colors.accent.green).toBe("#00F5A0");
    expect(designSystem.colors.text.primary).toBe("#FFFFFF");
  });

  it("defines typography, spacing, motion, and z-index tokens", () => {
    expect(designSystem.typography.fontFamily.sans).toContain("--font-inter");
    expect(designSystem.spacing.sectionDesktop).toBe("8rem");
    expect(designSystem.motion.duration.micro).toBe("120ms");
    expect(designSystem.zIndex.navbar).toBe("50");
  });

  it("does not use pure black as the main background", () => {
    expect(designSystem.colors.background.deep.toLowerCase()).not.toBe("#000000");
  });

  it("keeps success green dedicated to positive system state", () => {
    expect(designSystem.colors.accent.green).toBe("#00F5A0");
  });

  it("generates a Tailwind theme CSS file", () => {
    expect(existsSync(path.join(process.cwd(), "src/styles/design-system.generated.css"))).toBe(
      true
    );
  });

  it("generated CSS exposes Tailwind theme variables", () => {
    const css = readFile("src/styles/design-system.generated.css");

    expect(css).toContain("@theme");
    expect(css).toContain("--color-background-deep");
    expect(css).toContain("--color-accent-blue");
    expect(css).toContain("--text-display-xl");
    expect(css).toContain("--duration-standard");
  });

  it("global CSS imports generated design system CSS", () => {
    const css = readFile("src/app/globals.css");

    expect(css).toContain('@import "../styles/design-system.generated.css"');
  });
});
