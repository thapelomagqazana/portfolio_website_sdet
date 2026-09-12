import { test, expect } from '@playwright/test';

test('homepage renders AppShell with landmarks', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Thapelo/i);
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  expect(errors).toEqual([]);
});

test('skip link becomes visible on keyboard focus', async ({ page }) => {
  await page.goto('/');

  const skipLink = page.getByRole('link', {
    name: /skip to main content/i,
  });

  // Skip link is present in the DOM from the first render.
  await expect(skipLink).toBeAttached();

  // Focus it directly. This bypasses browser-specific tab-order
  // initialization differences and tests the thing that matters:
  // the CSS that makes the skip link visible on focus.
  await skipLink.focus();

  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
});
