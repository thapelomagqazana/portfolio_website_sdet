import { test, expect } from '@playwright/test';

test.describe('philosophy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the section heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: /how i think about quality/i,
      }),
    ).toBeVisible();
  });

  test('renders all four principles with numbers', async ({ page }) => {
    const section = page.locator('#philosophy');

    const expected = [
      { number: '01', title: 'Understand' },
      { number: '02', title: 'Challenge' },
      { number: '03', title: 'Automate' },
      { number: '04', title: 'Evidence' },
    ];

    for (const { number, title } of expected) {
      await expect(
        section.getByRole('heading', { level: 3, name: title }),
      ).toBeVisible();
      await expect(section.getByText(number, { exact: true })).toBeVisible();
    }
  });

  test('renders the closing statement', async ({ page }) => {
    await expect(
      page
        .locator('#philosophy')
        .getByText('Build. Test. Automate. Ship with confidence.'),
    ).toBeVisible();
  });
});
