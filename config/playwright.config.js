// config/playwright.config.js
const { defineConfig } = require('@playwright/test');
const config = require('./config');  // Import custom config file

module.exports = defineConfig({
  testDir: './tests',               // Directory where your test classes/specs are stored
  timeout: 30000,                   // How long (in ms) each test can run — 30 seconds
  retries: 0,                       // How many times to retry a failed test (like RetryAnalyzer)
  use: {
    headless: false,                // Run browser in headless mode (false = see browser, true = run in background)
    baseURL: config.baseURL,        // Use base URL from config.js
    screenshot: 'only-on-failure',  // Capture screenshot only if the test fails
    video: 'retain-on-failure',     // Record video and keep it only if the test fails
  },
});
