import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import prettier from "prettier";
import { designSystem } from "../src/styles/design-system";

/**
 * Converts camelCase token names to kebab-case CSS variable names.
 */
function toKebabCase(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Flattens nested token objects into CSS variable tuples.
 */
function flattenTokens(
  input: Record<string, unknown>,
  prefix: string[] = []
): Array<[string, string]> {
  return Object.entries(input).flatMap(([key, value]) => {
    const nextPrefix = [...prefix, toKebabCase(key)];

    if (typeof value === "string") {
      return [[nextPrefix.join("-"), value]];
    }

    if (value && typeof value === "object") {
      return flattenTokens(value as Record<string, unknown>, nextPrefix);
    }

    throw new Error(`Unsupported design token value at ${nextPrefix.join(".")}`);
  });
}

/**
 * Generates Tailwind v4 @theme variables from the design system.
 */
function generateCss(): string {
  const tokenGroups = [
    ["color", designSystem.colors],
    ["font", designSystem.typography.fontFamily],
    ["text", designSystem.typography.fontSize],
    ["leading", designSystem.typography.lineHeight],
    ["spacing", designSystem.spacing],
    ["radius", designSystem.radius],
    ["shadow", designSystem.shadows],
    ["duration", designSystem.motion.duration],
    ["ease", designSystem.motion.easing],
    ["z", designSystem.zIndex],
    ["breakpoint", designSystem.breakpoints],
  ] as const;

  const lines = tokenGroups.flatMap(([namespace, tokens]) =>
    flattenTokens(tokens).map(([name, value]) => `  --${namespace}-${name}: ${value};`)
  );

  return `/**
 * AUTO-GENERATED FILE.
 *
 * Do not edit manually.
 * Source: src/styles/design-system.ts
 */

@theme {
${lines.join("\n")}
}
`;
}

/**
 * Generates, formats, and writes the design-system CSS output.
 *
 * Formatting generated files inside the generator prevents verify failures
 * caused by generated output drifting from Prettier rules.
 */
async function main() {
  const outputDir = path.join(process.cwd(), "src", "styles");
  const outputFile = path.join(outputDir, "design-system.generated.css");

  const rawCss = generateCss();
  const formattedCss = await prettier.format(rawCss, {
    parser: "css",
  });

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, formattedCss, "utf8");

  console.log(`Generated ${outputFile}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
