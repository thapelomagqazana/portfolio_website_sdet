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

  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', {
    name: /skip to main content/i,
  });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
});
