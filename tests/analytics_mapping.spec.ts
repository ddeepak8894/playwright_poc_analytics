import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
  await page.getByRole('link', { name: 'Analytics Setup' }).click();
  await expect(page.getByRole('button', { name: 'Create', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export to' })).toBeVisible();

  //delete analytics mapping

  await page.getByRole('link', { name: 'Analytics Mappings' }).click();

  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Countries');
  await page.getByPlaceholder('Search').press('Enter');

  await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("Countries")').getByRole('link', { name: 'Delete' }).click()
  await expect(page.getByText('Please Confirm')).toBeVisible();
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();

  //create analytics mapping
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics/mappings');
  await page.getByRole('button', { name: 'Create', exact: true }).click();
  await page.getByLabel('*Name').click();
  await page.getByLabel('*Name').fill('Countries');
  await page.getByLabel('*Unmapped Value').click();
  await page.getByLabel('*Unmapped Value').fill('nana');
  await page.getByRole('button', { name: 'Create', exact: true }).click();
  await expect(page.getByText('Your request to refresh')).toBeVisible();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics/mappings');
  
//verificationawait page.getByPlaceholder('Search').press('Enter');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Countries');
  await page.getByPlaceholder('Search').press('Enter');
  await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("Countries")').isVisible()
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics')

});