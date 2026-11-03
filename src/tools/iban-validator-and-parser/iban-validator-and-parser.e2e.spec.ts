import { type Page, expect, test } from '@playwright/test';

async function extractIbanInfo({ page }: { page: Page }) {
  const itemsLines = await page
    .locator('.c-key-value-list__item').all();

  return await Promise.all(
    itemsLines.map(async item => [
      (await item.locator('.c-key-value-list__key').textContent() ?? '').trim(),
      (await item.locator('.c-key-value-list__value').textContent() ?? '').trim(),
    ]),
  );
}

test.describe('Tool - Iban validator and parser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iban-validator-and-parser');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Validador de IBAN - IT Tools');
  });

  test('iban info are extracted from a valid iban', async ({ page }) => {
    await page.getByTestId('iban-input').fill('DE89370400440532013000');

    const ibanInfo = await extractIbanInfo({ page });

    expect(ibanInfo).toEqual([
      ['O IBAN é válido?', 'Sim'],
      ['É um QR-IBAN?', 'Não'],
      ['Código do país', 'DE'],
      ['BBAN', '370400440532013000'],
      ['IBAN em formato legível', 'DE89 3704 0044 0532 0130 00'],
    ]);
  });

  test('invalid iban errors are displayed', async ({ page }) => {
    await page.getByTestId('iban-input').fill('FR7630006060011234567890189');

    const ibanInfo = await extractIbanInfo({ page });

    expect(ibanInfo).toEqual([
      ['O IBAN é válido?', 'Não'],
      ['Erros do IBAN', 'Wrong account bank branch checksum Wrong IBAN checksum'],
      ['É um QR-IBAN?', 'Não'],
      ['Código do país', 'N/A'],
      ['BBAN', 'N/A'],
      ['IBAN em formato legível', 'FR76 3000 6060 0112 3456 7890 189'],
    ]);
  });
});
