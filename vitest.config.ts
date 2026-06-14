import path from "node:path";
import { defineConfig } from "vitest/config";

/**
 * Vitest configuration for React component and utility tests.
 */
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: [path.resolve(__dirname, "tests/setup.ts")],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
