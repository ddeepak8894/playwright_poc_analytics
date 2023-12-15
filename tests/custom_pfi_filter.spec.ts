import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL("https://clone-groupon-incremental-30.coupadev.com/user/home")
  // await page.setViewportSize({ width: 1600, height: 1080 });
  await page.goto("https://clone-groupon-incremental-30.coupadev.com/dashboard/advanced_benchmarking")
  

  await expect(page.locator('div').filter({ hasText: /^Filters$/ })).toBeVisible();
  await page.locator('div').filter({ hasText: /^Filters$/ }).click();
  await expect(page.getByText('Period')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Last 9 months' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Last 3 months' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Last month' })).toBeVisible();
 //apply filters
  await page.getByRole('link', { name: 'Last 9 months' }).click();
  await page.getByText('Manual Community Settings').click();
  await page.locator('#business_type').selectOption('business_administration_management|ALL');
  await page.locator('#region').selectOption('APAC');
  await page.locator('#company_size').selectOption('ALL');
  await page.getByRole('link', { name: 'Last 6 months' }).click();
  await page.getByRole('button', { name: 'Apply Filters' }).click();
  await expect(page.getByText('Business Type Business Administration and Management Transaction Region Asia')).toBeVisible();
  await expect(page.locator('#pageContentWrapper')).toContainText('Period Last 6 months ✕');

  //check for 3 mnths

  await page.locator('div').filter({ hasText: /^Filters$/ }).click();
  await page.getByRole('link', { name: 'Last 3 months' }).click();
  await page.locator('#account_type_id').selectOption('46');
  await page.getByText('Manual Community Settings').click();
  await page.locator('#business_type').selectOption('healthcare_services|healthcare_providers');
  await page.locator('#region').selectOption('NA');
  await page.locator('#company_size').selectOption('CORP');
  await page.getByRole('button', { name: 'Apply Filters' }).click();

  await expect(page.getByText('Chart of Accounts COA-IN ✕')).toBeVisible();
  
  await expect(page.locator('#pageContentWrapper')).toContainText('Chart of Accounts COA-IN ✕');
  await expect(page.locator('#pageContentWrapper')).toContainText('Business Type Healthcare Providers Transaction Region North America Company Size Smaller than $250M in revenue ✕');
});