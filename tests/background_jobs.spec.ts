import { test, expect } from '@playwright/test';


const later = new Date(Date.now() + 2 * 60 * 1000); // Get the time 2 minutes later
const utcSeconds = later.getUTCSeconds();
const utcMinutes = later.getUTCMinutes();
const utcHours = later.getUTCHours();

const cronExpression = `${utcSeconds} ${utcMinutes} ${utcHours} * * *`;
console.log(cronExpression); 

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');

  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('autosupport');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('CoupaSupport1');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto('https://clone-groupon-incremental-30.coupadev.com/scheduled_jobs');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_data_refresh_expiration');
  await page.getByRole('button', { name: 'Search', exact: true }).click();

  //activate the job
await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")')
const element = await page.locator('');

  await expect(page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').getByText('Yes')).toBeVisible();
  await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').getByRole('link', { name: 'Edit' }).click();

  await page.getByLabel('*Cron').click();
  await page.getByLabel('*Cron').fill(cronExpression);
  await page.getByRole('button', { name: 'Save' }).click();

  await page.goto('https://clone-groupon-incremental-30.coupadev.com/background_jobs');

  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_data_refresh_expiration');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('#data_source_row_5740723')).toContainText('2023-12-15T09:49:15Z');

  const trElement = await page.locator('tr.stripe_even.coupa_datatable_row.selected')
  .getByText('2023-12-15')
  

});