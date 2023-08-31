const {test, expect}= require('@playwright/test')



test("All pre-requisite added for test", async ({browser,page})=>{
//    const context = await browser.newContext()
//    const page=(await context).newPage();
// const INTANCE_URL ="https://clone-groupon-incremental-30.coupadev.com"
const INTANCE_URL ="https://sanity2946r36.coupadev.com"
function formatInstanceName(url) {
    const urlParts = url.split('//');
    const urlInstance = urlParts[1].split('.')[0];
    const formattedInstance = urlInstance.replace(/-/g, ' ');
    return titleize(formattedInstance);
  }
  function titleize(inputString) {
    return inputString.toLowerCase().replace(/(?:^|\s)\S/g, char => char.toUpperCase());
  }
const INSTANCE_NAME=formatInstanceName(INTANCE_URL)

await page.goto(`${INTANCE_URL}/sessions/new`);

await page.getByLabel('Username or Email Address').click();
await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
await page.locator('body').click();
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Temp@1234');
await page.getByRole('button', { name: 'Sign In' }).click();
await page.goto(`${INTANCE_URL}/analytics`);
await page.getByRole('link', { name: 'Create New Report' }).click();
await page.getByRole('link', { name: 'Invoices' }).click();
await page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search').isVisible();
await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Save...' }).click();
await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'As a Look' }).click();
await page.frameLocator('#analytics_iframe').locator('#qr-look-modal-title-field').click();
await page.frameLocator('#analytics_iframe').locator('#qr-look-modal-title-field').fill('look_test');
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).isVisible()
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();

await page.evaluate(() => {
  window.scrollBy(0, 300);
})
await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Save & View Look' }).click();

await page.waitForLoadState("domcontentloaded")


await page.goto(`${INTANCE_URL}/analytics`);
await expect(page.getByRole('link', { name: 'redwood analytics-admin' })).toBeTruthy()
await page.getByRole('link', { name: 'redwood analytics-admin' }).click();
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").isVisible()
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").click();
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).isVisible()

await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).click()
await page.locator(".ui-dialog-content.ui-widget-content").locator("select").selectOption({label:INSTANCE_NAME})
await page.getByRole('button', { name: 'Submit' }).click()


await expect(page.getByRole('alert').getByText('Look successfully moved')).toBeVisible()

await page.goto(`${INTANCE_URL}/analytics`);
await expect(page.getByRole('link', { name: INSTANCE_NAME })).toBeVisible()

await page.getByRole('link', { name: 'Invoicing' }).click();
await page.getByRole('cell', { name: 'AP Manager', exact: true }).locator('i').click();
await page.locator(".spend-analysis-folder-dashboards-content").locator("tr", { hasText: "AP Manager - Program Efficiency"}).locator(".enable-bootstrap").click()
await page.locator(".spend-analysis-folder-dashboards-content").locator("tr", { hasText: "AP Manager - Program Efficiency"}).locator(".dropdown-menu").getByRole('link', { name: 'Copy' }).click();
await page.locator('#folder_id').selectOption({label:INSTANCE_NAME})
await page.locator('#dashboard_name').fill("dashboard_test")
await page.getByRole('button', { name: 'Submit' }).click()

await expect(page.getByRole('alert').getByText('Dashboard successfully copied')).toBeVisible()
await page.goto(`${INTANCE_URL}/analytics`);
await expect(page.getByRole('link', { name: INSTANCE_NAME })).toBeVisible()
await page.getByRole('link', { name: INSTANCE_NAME }).click()

await expect(page.getByRole('link', { name: 'dashboard_test' })).toBeVisible()
await expect(page.getByRole('link', { name: 'look_test' })).toBeVisible()
})

test('Test JSON download ', async ({ page }) => {
  const INSTANCE_URL ="https://sanity2946r36.coupadev.com"
  await page.goto(`${INSTANCE_URL}/sessions/new`);
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto(`${INSTANCE_URL}/analytics`);
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
  await page.frameLocator('#analytics_iframe').getByText('JSON').isVisible()
  await page.frameLocator('#analytics_iframe').getByText('JSON').click();
  await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('svg').click();


  // const download1Promise = page.waitForEvent('download');
  // await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  // const download1 = await download1Promise;
  // await download1.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/test1212.csv")
 
  page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).isVisible()
  const downloadPromise = page.waitForEvent('download');
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  })
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;
  await download.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/deepak11.json")

})

test('Test PNG download', async ({ page }) => {
  const INTANCE_URL ="https://sanity2946r36.coupadev.com"

  await page.goto(`${INTANCE_URL}/sessions/new`);
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto(`${INTANCE_URL}/analytics`);
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

  await page.waitForLoadState('networkidle')

  // await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('svg').click();


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
  
  await download.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/edge.png")

})

test('Markdown download test ', async ({ page }) => {
  const INSTANCE_URL ="https://sanity2946r36.coupadev.com"
  await page.goto(`${INSTANCE_URL}/sessions/new`);
  await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Temp@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto(`${INSTANCE_URL}/analytics`);
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
  await page.frameLocator('#analytics_iframe').getByText('Markdown').isVisible()
  await page.frameLocator('#analytics_iframe').getByText('Markdown').click();
  await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('svg').click();


  // const download1Promise = page.waitForEvent('download');
  // await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  // const download1 = await download1Promise;
  // await download1.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/test1212.csv")
 
  page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).isVisible()
  const downloadPromise = page.waitForEvent('download');
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  })
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;
  await download.saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/Markdown.png")

})



