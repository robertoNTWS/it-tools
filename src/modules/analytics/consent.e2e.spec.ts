import process from 'node:process';
import { expect, test } from '@playwright/test';

// Sem VITE_GA_ID no build: não há aviso de cookies nem chamada ao Google
test.describe('Consentimento e analytics', () => {
  test('sem GA configurado, não mostra o aviso nem chama o Google', async ({ page }) => {
    test.skip(Boolean(process.env.VITE_GA_ID), 'build com VITE_GA_ID');
    const googleRequests: string[] = [];
    page.on('request', (r) => {
      if (/google(tagmanager|-analytics)\.com/.test(r.url())) {
        googleRequests.push(r.url());
      }
    });
    await page.goto('/');
    await expect(page.getByTestId('consent-banner')).toHaveCount(0);
    expect(googleRequests).toEqual([]);
  });

  // Rodar com um build feito com VITE_GA_ID (ex.: VITE_GA_ID=G-TESTE pnpm build)
  test('recusar não chama o Google; aceitar carrega o GA sem a query string', async ({ page }) => {
    test.skip(!process.env.VITE_GA_ID, 'requer build com VITE_GA_ID');
    const googleRequests: string[] = [];
    await page.route(/google(tagmanager|-analytics)\.com/, (route) => {
      googleRequests.push(route.request().url());
      return route.abort();
    });

    await page.goto('/regex-tester?regex=segredo');
    await page.getByTestId('consent-reject').click();
    await page.reload();
    await expect(page.getByTestId('consent-banner')).toHaveCount(0);
    expect(googleRequests).toEqual([]);

    await page.getByRole('button', { name: 'Preferências de cookies' }).click();
    await page.getByTestId('consent-accept').click();
    await page.waitForTimeout(400);
    expect(googleRequests.some(u => u.includes('googletagmanager.com/gtag/js'))).toBe(true);
    const pageView = await page.evaluate(() => (window.dataLayer as IArguments[]).map(a => [...a]).find(a => a[1] === 'page_view'));
    expect(JSON.stringify(pageView)).not.toContain('segredo');
  });
});
