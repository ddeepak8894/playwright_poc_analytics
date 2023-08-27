// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // which tests to run
  testDir: './analytics_tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: false,
      },
    },
  ],
  workers: 3, // Number of parallel workers (adjust as needed)
});
