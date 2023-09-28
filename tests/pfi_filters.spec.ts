import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('menuitem', { name: 'More...' }).isVisible();
  await page.getByRole('menuitem', { name: 'More...' }).hover()
  await page.getByRole('menuitem', { name: 'More...' }).hover()
  await page.getByRole('menuitem', { name: 'More...' }).hover()
  await page.setViewportSize({ width: 1600, height: 1080 });
  await page.getByRole('menuitem', { name: 'Reports' }).click();
  await page.locator('div').filter({ hasText: /^Filters$/ }).click();
  await page.getByRole('link', { name: 'Last 9 months' }).click();
  await page.getByRole('button', { name: 'Apply Filters' }).click();
  await page.getByText('Period Last 9 months ✕').click();
});