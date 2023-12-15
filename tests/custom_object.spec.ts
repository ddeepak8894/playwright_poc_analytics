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
  await page.getByRole('link', { name: 'Custom Objects Configuration' }).click();
  //custom object page check 

  await expect(page.getByRole('cell', { name: 'Custom Object Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Linked Standard Object Type' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Linked Field' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Custom Objects Configuration' })).toBeVisible();

  //custom object deletion scenario

  await page.locator('#spend-analysis-view').getByRole('link').first().click();
  await expect(page.getByRole('dialog')).toContainText('All custom dashboards and reports using this custom object will break or show incorrect data');
  await page.getByRole('button', { name: 'OK' }).click();
  
 //custom object creation scenario


  await page.locator('#custom_object_1_object_definition_id').selectOption('33');
  await page.locator('#custom_object_1_object_definition_type').selectOption('QuoteRequest');
  await page.locator('#custom_object_1_object_definition_field').selectOption('1316');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('If you have updated the')).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();

  //duplicatioin scenario


  await page.locator('#custom_object_2_object_definition_id').selectOption('33');
  await page.locator('#custom_object_2_object_definition_type').selectOption('QuoteRequest');
  await page.locator('#custom_object_2_object_definition_field').selectOption('1316');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.locator('tbody')).toContainText('Custom Object Name has already been selected');

});