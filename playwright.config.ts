import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration — Thapelo Magqazana Engineering Portfolio
 *
 * Scope:
 *   - E2E tests live in `tests/e2e/`
 *   - Unit/component tests (Vitest) live next to source under `src/`
 *
 * Coverage alignment:
 *   - NFR-004 Responsive : 320 → 1440 viewport projects
 *   - NFR-005 Browser    : Chromium, Firefox, WebKit
 *   - NFR-006 Keyboard   : assertions live in tests, projects run everywhere
 *   - NFR-009 Deployment : webServer builds + previews so CI tests the real artifact
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Browsers (NFR-005)
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },

    // Responsive coverage (NFR-004)
    { name: 'mobile-320',   use: { viewport: { width: 320, height: 640 } } },
    { name: 'mobile-390',   use: { ...devices['iPhone 13'] } },
    { name: 'desktop-1440', use: { viewport: { width: 1440, height: 900 } } },
  ],

  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});