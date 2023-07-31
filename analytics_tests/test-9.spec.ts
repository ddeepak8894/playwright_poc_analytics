import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
  await page.getByRole('link', { name: 'Invoicing' }).click();
  await page.getByRole('cell', { name: 'AP Manager', exact: true }).locator('i').click();
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics/embed/dashboard/488-ap-manager-program-efficiency');
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Cancel' }).isVisible()
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Cancel' }).click();
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'is in the last 12 months' }).click();
  await page.frameLocator('#analytics_iframe').getByRole('textbox').first().click();
  await page.frameLocator('#analytics_iframe').getByText('is any time').click();
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Update' }).click();
  await page.frameLocator('#analytics_iframe').getByRole('region', { name: 'Invoices in Progress' }).hover()
  await page.frameLocator('#analytics_iframe').getByRole('region', { name: 'Invoices in Progress' }).getByRole('button').nth(1).click();
  await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download data' }).isVisible()
  await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download data' }).click();
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).isVisible()

  page.on('download', data => {})
  // const downloadPromise = page.waitForEvent('download');
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  await page.waitForTimeout(10000);

  await page.getByRole('heading', { name: 'Download Invoices in Progress' }).isHidden()
  // const download = await downloadPromise;
  // download.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/test.png")
  
});