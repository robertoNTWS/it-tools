import { expect, test } from '@playwright/test';

test.describe('Tool - Token generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/token-generator');
  });

  test('Has title', async ({ page }) => {
    await expect(page).toHaveTitle('Gerador de senha e token aleatório - Canidev Suíço');
  });

  test('New token on refresh', async ({ page }) => {
    const initialToken = await page.getByPlaceholder('O token...').inputValue();
    await page.getByRole('button', { name: 'Gerar novamente' }).click();
    const newToken = await page.getByPlaceholder('O token...').inputValue();

    expect(newToken).not.toEqual(initialToken);
  });
});
