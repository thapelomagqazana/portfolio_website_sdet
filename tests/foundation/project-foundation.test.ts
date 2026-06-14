import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Resolves a path from the repository root.
 *
 * These tests protect the project foundation from accidental deletion,
 * script drift, or configuration regression.
 */
function fromRoot(...segments: string[]): string {
  return path.join(process.cwd(), ...segments);
}

/**
 * Reads and parses package.json.
 */
function readPackageJson(): Record<string, unknown> {
  const raw = readFileSync(fromRoot("package.json"), "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

describe("project foundation", () => {
  it("has required project configuration files", () => {
    expect(existsSync(fromRoot("package.json"))).toBe(true);
    expect(existsSync(fromRoot("tsconfig.json"))).toBe(true);
    expect(existsSync(fromRoot(".prettierrc"))).toBe(true);
    expect(existsSync(fromRoot(".prettierignore"))).toBe(true);
    expect(existsSync(fromRoot("eslint.config.mjs"))).toBe(true);
  });

  it("has required source directories", () => {
    const requiredDirectories = [
      "src/app",
      "src/components/ui",
      "src/components/layout",
      "src/components/visual",
      "src/components/motion",
      "src/sections",
      "src/data",
      "src/hooks",
      "src/lib",
      "src/types",
      "src/styles",
      "src/utils",
    ];

    for (const directory of requiredDirectories) {
      expect(existsSync(fromRoot(directory)), `${directory} should exist`).toBe(true);
    }
  });

  it("has production-grade verification scripts", () => {
    const packageJson = readPackageJson();
    const scripts = packageJson.scripts as Record<string, string>;

    expect(scripts.dev).toContain("next dev");
    expect(scripts.build).toBe("pnpm tokens:generate && next build");
    expect(scripts.lint).toBe("eslint .");
    expect(scripts.format).toContain("prettier --write");
    expect(scripts["format:check"]).toContain("prettier --check");
    expect(scripts.typecheck).toBe("tsc --noEmit");
    expect(scripts.test).toBe("vitest run --config vitest.config.ts");
    expect(scripts.verify).toContain("pnpm build");
  });

  it("has lint-staged configured for safe pre-commit checks", () => {
    const packageJson = readPackageJson();

    expect(packageJson["lint-staged"]).toBeDefined();
  });

  it("rejects missing critical folder assumptions", () => {
    expect(existsSync(fromRoot("src/non-existent-folder"))).toBe(false);
  });
});
