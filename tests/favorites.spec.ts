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
  await page.getByRole('menuitem', { name: 'Analytics' }).click();
  await page.getByRole('link', { name: 'Invoicing' }).click();
  await page.getByRole('cell', { name: 'AP Manager' }).click();
  await page.getByRole('cell', { name: 'AP Manager' }).click();
  await page.getByRole('cell', { name: 'AP Manager' }).click();
  await page.getByRole('cell', { name: 'AP Manager' }).locator('i').click();
  await page.getByRole('row', { name: 'AP Manager - Cycle Time Efficiency' }).locator('img').click();
  await page.getByRole('cell', { name: 'AP Manager - Cycle Time Efficiency 5 Views' }).click();
  await page.getByRole('row', { name: 'AP Manager - Cycle Time Efficiency 5 Views' }).locator('img').click();
});