import { test, expect } from '@playwright/test';

/**
 * Theme toggle E2E tests — P5-03
 *
 * Covers:
 *   - Default mode (system)
 *   - Light / dark selection with persistence
 *   - Emulated OS preference (both directions)
 *   - Reduced-motion respected on <body>
 *
 * Notes on the reduced-motion test:
 *   Browsers serialize the 0.01ms sentinel from globals.css
 *   as "0s", "0.00001s" or "1e-05s". The test parses the value
 *   numerically and asserts it is below a perceptible threshold
 *   (10ms) rather than comparing exact strings.
 */
test.describe('theme toggle', () => {
  test('defaults to system preference', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme-mode',
      'system',
    );
  });

  test('switches to light and persists across reload', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await page
      .getByRole('button', { name: /light theme/i })
      .first()
      .click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme-mode',
      'light',
    );
  });

  test('switches to dark and persists', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await page
      .getByRole('button', { name: /dark theme/i })
      .first()
      .click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('honours emulated system dark preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('honours emulated system light preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('respects reduced motion — no perceptible transition', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Runs inside the browser. Reads the computed transition-duration
    // of <body> and returns the numeric value in seconds.
    //
    // The callback must be self-contained: page.evaluate serializes
    // it and runs it in the browser, where Node modules and imports
    // are not available.
    //
    // tsconfig.node.json intentionally excludes the DOM lib, so we
    // declare the minimal browser surface inline. No `any`, no
    // unsafe access, no eslint disables.
    const durationSeconds = await page.evaluate((): number => {
      const g = globalThis as unknown as {
        document: { body: unknown };
        getComputedStyle: (el: unknown) => { transitionDuration: string };
      };
      const raw = g.getComputedStyle(g.document.body).transitionDuration;
      // Browsers produce "0s", "0.00001s" or "1e-05s"; parseFloat
      // handles all three (including scientific notation).
      return Number.parseFloat(raw);
    });

    // The reduced-motion CSS sets duration to 0.01ms (≈1e-5s).
    // Any value below 10ms confirms the transition is effectively
    // disabled for users who prefer reduced motion.
    expect(durationSeconds).toBeLessThan(0.01);
  });
});
