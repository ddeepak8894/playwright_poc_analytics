// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
 //which tests to run
  testDir: './analytics_tests',
  fullyParallel: false,
  timeout: 30*1000,
  expect: {
    timeout: 30*1000
  },
  reporter: 'html',
  use: {
    //all properties  mentioned here
    browserName : 'chromium',
    trace: 'on-first-retry',
    headless: false
  },
});

