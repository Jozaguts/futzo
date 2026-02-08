import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test('renders dashboard sections', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('dashboard-metrics-grid')).toBeVisible()
    await expect(page.getByTestId('dashboard-next-games')).toBeVisible()
    await expect(page.getByTestId('dashboard-actions')).toBeVisible()
    await expect(page.getByTestId('dashboard-activity')).toBeVisible()
  })

  test('mobile order shows actions before next games', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      storageState: 'playwright/.auth/user.json',
    })
    const page = await context.newPage()
    await page.goto('/dashboard')

    const actionsBox = await page.getByTestId('dashboard-actions').boundingBox()
    const nextGamesBox = await page.getByTestId('dashboard-next-games').boundingBox()
    const activityBox = await page.getByTestId('dashboard-activity').boundingBox()

    expect(actionsBox && nextGamesBox && activityBox).toBeTruthy()
    if (actionsBox && nextGamesBox && activityBox) {
      expect(actionsBox.y).toBeLessThan(nextGamesBox.y)
      expect(nextGamesBox.y).toBeLessThan(activityBox.y)
    }

    await context.close()
  })

  test('shows toast on server error', async ({ browser }) => {
    const context = await browser.newContext({
      extraHTTPHeaders: {
        'X-Test-Error': '500',
      },
      storageState: 'playwright/.auth/user.json',
    })
    const page = await context.newPage()
    await page.goto('/dashboard')

    await expect(page.locator('.headlessTitle')).toContainText('Error del servidor')

    await context.close()
  })
})
