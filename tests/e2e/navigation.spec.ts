import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('desktop nav exposes five links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const nav = page.getByRole('navigation', { name: 'Primary' }).first();
    await expect(nav.getByRole('link')).toHaveCount(5);
  });

  test('clicking a nav link updates aria-current', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const workLink = page.getByRole('link', { name: 'Work' }).first();
    await workLink.click();

    await expect(workLink).toHaveAttribute('aria-current', 'true');
  });

  test('mobile menu opens, traps focus, and closes on Escape', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });

    const trigger = page.getByRole('button', { name: /open navigation menu/i });
    await trigger.click();

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(
      page.getByRole('dialog', { name: /navigation/i }),
    ).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('mobile menu closes after selecting a link', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });

    await page.getByRole('button', { name: /open navigation menu/i }).click();
    await page
      .getByRole('dialog')
      .getByRole('link', { name: 'Contact' })
      .click();

    await expect(
      page.getByRole('button', { name: /open navigation menu/i }),
    ).toHaveAttribute('aria-expanded', 'false');
  });
});
