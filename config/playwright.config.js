// // config/playwright.config.js
// const { defineConfig } = require('@playwright/test');
// const config = require('./config');  // Import custom config file

// module.exports = defineConfig({
//   testDir: './tests',               // Directory where your test classes/specs are stored
//   timeout: 30000,                   // How long (in ms) each test can run — 30 seconds
//   retries: 0,                       // How many times to retry a failed test (like RetryAnalyzer)
//   use: {
//     headless: false,                // Run browser in headless mode (false = see browser, true = run in background)
//     baseURL: config.baseURL,        // Use base URL from config.js
//     screenshot: 'only-on-failure',  // Capture screenshot only if the test fails
//     video: 'retain-on-failure',     // Record video and keep it only if the test fails
//   },
// projects: [
//     {
//       name: 'setup',                        // 1. runs only the setup spec
//       testMatch: /SignupTest\.spec\.js/,
//     },
//     {
//       name: 'authenticated',                // 2. depends on setup
//       testMatch: /ReloginUsingStorage\.spec\.js/,
//       use: { storageState: 'storage/auth.json' },
//       dependencies: ['setup'],
//     },
//   ],
// });

// // config/playwright.config.js
// const { defineConfig } = require('@playwright/test');
// const path = require('path');

// // ⚠️ Avoid name conflict with Playwright "config"
// const siteConfig = require('./config'); // your config/config.js next to this file

// // Resolve absolute path to /storage/auth.json at repo root
// const storageStatePath = path.resolve(process.cwd(), 'storage', 'auth.json');

// module.exports = defineConfig({
//   testDir: './tests',
//   timeout: 30000,
//   retries: 0,
//   use: {
//     headless: false,
//     baseURL: siteConfig.baseURL,
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//   },
//   projects: [
//     {
//       name: 'setup',
//       testMatch: /SignupTest\.spec\.js/,
//     },
//     {
//       name: 'authenticated',
//       testMatch: /ReloginUsingStorage\.spec\.js/,
//       use: { storageState: storageStatePath }, // <-- absolute path
//       dependencies: ['setup'],
//     },
//   ],
// });
// config/playwright.config.js
// config/playwright.config.js
// config/playwright.config.js
// config/playwright.config.js
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// Your site config lives next to this file: config/config.js
// It should export { baseURL: 'https://...' }
const siteConfig = require('./config');

// Absolute path to tests folder (repo root /tests)
const testsDir = path.resolve(process.cwd(), 'tests');

// Absolute path to storage/auth.json (repo root /storage/auth.json)
const storageStatePath = path.resolve(process.cwd(), 'storage', 'auth.json');

module.exports = defineConfig({
  testDir: testsDir,
  timeout: 30_000,
  retries: 0,
  use: {
    headless: false, // show browser windows; set true in CI if you want
    baseURL: siteConfig.baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    // 1) Setup (creates storage/auth.json)
    {
      name: 'setup',
      testMatch: /SignupTest\.spec\.js/,
    },

    // 2) AUTHENTICATED projects (logged in) – only relogin tests here
    {
      name: 'chromium-auth',
      use: { ...devices['Desktop Chrome'], storageState: storageStatePath },
      testMatch: /ReloginUsingStorage\.spec\.js/,
      dependencies: ['setup'],
    },
    {
      name: 'firefox-auth',
      use: { ...devices['Desktop Firefox'], storageState: storageStatePath },
      testMatch: /ReloginUsingStorage\.spec\.js/,
      dependencies: ['setup'],
    },
    {
      name: 'webkit-auth',
      use: { ...devices['Desktop Safari'], storageState: storageStatePath },
      testMatch: /ReloginUsingStorage\.spec\.js/,
      dependencies: ['setup'],
    },

    // 3) CLEAN projects (no storage) – homepage + signup navigation here
    {
      name: 'chromium-clean',
      use: { ...devices['Desktop Chrome'] }, // no storageState
      testMatch: /HomePageTest\.spec\.js/,
    },
    {
      name: 'firefox-clean',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /HomePageTest\.spec\.js/,
    },
    {
      name: 'webkit-clean',
      use: { ...devices['Desktop Safari'] },
      testMatch: /HomePageTest\.spec\.js/,
    },
  ],
});

