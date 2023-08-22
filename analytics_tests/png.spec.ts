import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
  await page.getByRole('link', { name: 'Create New Report' }).click();
  await page.getByRole('link', { name: 'Invoices' }).click();
  await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
  await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
  await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
  await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
  await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
  await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();

  await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('svg').click();
  await page.frameLocator('#analytics_iframe').getByText('PNG (Image of Visualization)').isVisible()
  await page.frameLocator('#analytics_iframe').getByText('PNG (Image of Visualization)').click();
  await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('svg').click();


  // const download1Promise = page.waitForEvent('download');
  // await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  // const download1 = await download1Promise;
  // await download1.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/test1212.csv")
 
  // page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).isVisible()
  // const downloadPromise = page.waitForEvent('download');
  // await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  // const download = await downloadPromise;
  // await download.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/test3X232.png")
  
  const downloadPage = page.waitForEvent('popup');
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  const page7 = await downloadPage;
  const download1Promise = page7.waitForEvent('download');
  const download= await download1Promise
  
  await download.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/krushnaradha.png")

});