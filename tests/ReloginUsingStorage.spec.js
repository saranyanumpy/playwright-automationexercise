const { test, expect } = require('@playwright/test');
const config = require('../config/config');

test.use({ storageState: 'storage/auth.json' });

test('Open site already logged in (no UI login)', async ({ page }) => {
  await page.goto(config.baseURL, { waitUntil: 'domcontentloaded' });

  // Replace with your app’s signed-in indicator (e.g., username, Logout button)
  await expect(page.getByText('Logout')).toBeVisible();
});