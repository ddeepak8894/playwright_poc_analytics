// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // which tests to run
  
  timeout: 50 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  use:{
    headless: true,
    viewport: {width:1280, height: 720},
    actionTimeout: 15000,
    video: "retain-on-failure",
    screenshot: "only-on-failure"
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
   // Number of parallel workers (adjust as needed)
});
