import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').click();
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.setViewportSize({ width: 1600, height: 1080 });
  await page.getByRole('menuitem', { name: 'Reports' }).click();
  await page.locator('div').filter({ hasText: /^Filters$/ }).click();
  await page.getByRole('link', { name: 'Last 9 months' }).click();
  await page.getByText('Manual Community Settings').click();
  await page.locator('#business_type').selectOption('business_administration_management|ALL');
  await page.locator('#region').selectOption('APAC');
  await page.locator('#company_size').selectOption('ALL');
  await page.getByRole('link', { name: 'Last 6 months' }).click();
  await page.getByRole('button', { name: 'Apply Filters' }).click();
});