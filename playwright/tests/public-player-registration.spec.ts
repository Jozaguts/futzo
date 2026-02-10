import { test, expect } from '@playwright/test';

const closedTeamSlug = process.env.PW_PUBLIC_TEAM_SLUG_CLOSED;

test.describe('Public player registration', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.skip(!closedTeamSlug, 'Define PW_PUBLIC_TEAM_SLUG_CLOSED to run this test.');

  test('redirects when team registration is closed', async ({ page }) => {
    await page.goto(`/equipos/${closedTeamSlug}/jugadores/inscripcion`, { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(new RegExp(`/equipos/${closedTeamSlug}/inscripcion-cerrada`));
    await expect(page.getByText('Registro no disponible')).toBeVisible();
  });
});
