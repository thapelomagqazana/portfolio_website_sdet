import { test, expect } from '@playwright/test';

test.describe('experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the section heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: /where i've worked and what i built/i,
      }),
    ).toBeVisible();
  });

  test('renders all three roles', async ({ page }) => {
    const experience = page.locator('#experience');
    await expect(
      experience.getByRole('heading', { level: 3, name: 'QINIS' }),
    ).toBeVisible();
    await expect(
      experience.getByRole('heading', {
        level: 3,
        name: 'Alula Technologies',
      }),
    ).toBeVisible();
    await expect(
      experience.getByRole('heading', {
        level: 3,
        name: 'C. Steinweg Bridge',
      }),
    ).toBeVisible();
  });

  test('QINIS is expanded by default', async ({ page }) => {
    const qinis = page.locator('#experience-qinis details');
    await expect(qinis).toHaveAttribute('open', '');
  });

  test('expanding a role reveals its responsibilities', async ({ page }) => {
    const alula = page.locator('#experience-alula');
    const summary = alula.locator('summary');

    // Collapsed initially
    await expect(alula.locator('details')).not.toHaveAttribute('open', '');

    await summary.click();

    await expect(
      alula.getByText(
        'Created and executed 100+ functional, regression, database and usability test scenarios.',
      ),
    ).toBeVisible();
  });

  test('evidence link navigates to the QINIS case study', async ({ page }) => {
    const link = page
      .locator('#experience-qinis')
      .getByRole('link', { name: /view qinis case study/i });

    await link.click();
    await expect(page).toHaveURL(/#\/work\/qinis$/);
  });
});
