import { test, expect } from '@playwright/test';

test.describe('about', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the section heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: /engineering quality, not just finding bugs/i,
      }),
    ).toBeVisible();
  });

  test('renders all four pillars', async ({ page }) => {
    // Scope to the About section so global terms like
    // "QA Experience" from the hero proof strip don't
    // collide with the About pillar labels.
    const about = page.locator('#about-content');

    await expect(about.getByText('QA experience')).toBeVisible();
    await expect(about.getByText('Development background')).toBeVisible();
    await expect(about.getByText('Current studies')).toBeVisible();
    await expect(about.getByText('Career direction')).toBeVisible();
  });

  test('CTA scrolls to the Career Journey section', async ({ page }) => {
    // Emulate reduced motion so globals.css sets
    // scroll-behavior: auto. Otherwise the smooth-scroll animation
    // can still be running when toBeVisible() fires, causing a
    // false negative because the target heading is off-screen.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const cta = page.getByRole('link', {
      name: /more about my journey/i,
    });
    await expect(cta).toHaveAttribute('href', '#career');

    await cta.click();

    // URL updates immediately on hash navigation.
    await expect(page).toHaveURL(/#career$/);

    // With smooth scroll disabled, the target is already in the
    // viewport by the time the URL assertion passes.
    await expect(
      page.getByRole('heading', { level: 2, name: /career journey/i }),
    ).toBeVisible();
  });

  test('CTA is keyboard reachable', async ({ page }) => {
    const cta = page.getByRole('link', {
      name: /more about my journey/i,
    });
    await cta.focus();
    await expect(cta).toBeFocused();
  });
});
