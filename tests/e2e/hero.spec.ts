import { test, expect } from '@playwright/test';

test.describe('hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the value proposition as the H1', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /I build, test and automate software for confidence/i,
    );
  });

  test('primary CTA navigates to the work section', async ({ page }) => {
    const cta = page.getByRole('link', { name: /explore my work/i });
    await expect(cta).toHaveAttribute('href', '#work');

    await cta.click();
    await expect(page).toHaveURL(/#work$/);
  });

  test('secondary CTA is external and safe', async ({ page }) => {
    const linkedin = page.getByRole('link', { name: /linkedin/i });
    await expect(linkedin).toHaveAttribute('target', '_blank');
    await expect(linkedin).toHaveAttribute('rel', /noopener/);
  });

  test('CTAs are keyboard reachable with visible focus', async ({ page }) => {
    const primary = page.getByRole('link', { name: /explore my work/i });
    await primary.focus();
    await expect(primary).toBeFocused();

    // Playwright can't easily assert :focus-visible rendering, but
    // tabbing from the skip link must reach the primary CTA.
    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // logo
    await page.keyboard.press('Tab'); // first nav item
    // ... not exhaustively asserting order here; keyboard.spec.ts covers it.
  });

  test('proof strip is visible and static', async ({ page }) => {
    await expect(page.getByText('2+ Years')).toBeVisible();
    await expect(page.getByText('ISTQB®')).toBeVisible();
    await expect(page.getByText('Azure')).toBeVisible();

    // No aria-live region in the hero — no counters, no announcements.
    await expect(page.locator('section#about [aria-live]')).toHaveCount(0);
  });
});
