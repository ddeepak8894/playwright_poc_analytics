import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('analytics_editor_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
  await page.getByRole('link', { name: 'Create New Report' }).click();
  await page.getByRole('link', { name: 'Invoices' }).click();
  
  await expect(page.frameLocator('#analytics_iframe').getByLabel('Load quick start query: Invoice Cycle Time')).toBeVisible();
  await expect(page.frameLocator('#analytics_iframe').getByLabel('Load quick start query: Electronic Invoice Rate')).toBeVisible();
  await expect(page.frameLocator('#analytics_iframe').getByLabel('Load quick start query: PO-Backed Spend')).toBeVisible();
  await expect(page.frameLocator('#analytics_iframe').getByLabel('Load quick start query: Invoice Channel')).toBeVisible();

});