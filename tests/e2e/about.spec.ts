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
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const cta = page.getByRole('link', {
      name: /more about my journey/i,
    });
    await expect(cta).toHaveAttribute('href', '#career');

    await cta.click();

    await expect(page).toHaveURL(/#career$/);

    // The Journey section renders with id="career" and its <h2>
    // reads "From construction to quality engineering." — see
    // src/components/journey/Journey.tsx.
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: /from construction to quality engineering/i,
      }),
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
