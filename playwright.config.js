// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // which tests to run
  testDir: 'tests/',
  timeout: 100 * 1000,
  expect: {
    timeout: 100 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
      },
    }
  ],
  workers: 3, // Number of parallel workers (adjust as needed)
});
