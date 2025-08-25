// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // 1. Test location
  testDir: './tests',

  // 2. Timeout for each test (in ms)
  timeout: 30 * 1000, // 30 seconds

  // 3. Retry failed tests
  retries: 1,

  // 4. Parallel execution control (optional for CI)
  workers: process.env.CI ? 1 : undefined, // run 1 worker in CI

  // 5. Common settings for all tests
  use: {
    baseURL: 'https://automationexercise.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },

  // 6. Cross-browser testing setup
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],

  // 7. Reporter configuration
  reporter: [
    ['list'], // shows real-time log
    ['html', { outputFolder: 'report', open: 'never' }],
  ],

  // 8. Optional: Run only tests with specific tags
  // To run: npx playwright test --grep @smoke
  grep: process.env.GREP ? new RegExp(process.env.GREP) : undefined,
});
