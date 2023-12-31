const {test}= require('@playwright/test')

test.only("Download as png", async ({browser,page})=>{
    const INTANCE_URL ="https://clone-groupon-incremental-30.coupadev.com"
    // const INTANCE_URL ="https://e2e-analytics-looker.coupadev.com"
    function formatInstanceName(url) {
        const urlParts = url.split('/');
        const urlInstance = urlParts[2].split('.')[0];
        const formattedInstance = urlInstance.replace(/-/g, ' ').charAt(0).toUpperCase() + urlInstance.substring(1);
        return formattedInstance;
      }
    const INSTANCE_NAME=formatInstanceName(INTANCE_URL)
    
    await page.goto(`${INTANCE_URL}/sessions/new`);
    
    await page.getByLabel('Username or Email Address').click();
    await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
    await page.locator('body').click();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Temp@1234');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
    await page.getByRole('link', { name: 'Invoicing' }).click();
    await page.getByRole('cell', { name: 'AP Manager', exact: true }).locator('i').click();
    await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics/embed/dashboard/488-ap-manager-program-efficiency');

    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'is in the last 12 months' }).click();
    await page.frameLocator('#analytics_iframe').getByRole('textbox').first().click();
    await page.frameLocator('#analytics_iframe').getByText('is any time').click();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Update' }).isVisible();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Update' }).click();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Reload' }).isDisabled()
    await page.frameLocator('#analytics_iframe').getByRole('region', { name: 'Invoices in Progress' }).getByRole('button').nth(1).isVisible();
    
    await page.frameLocator('#analytics_iframe').getByRole('region', { name: 'Invoices in Progress' }).getByRole('button').nth(1).click();
    await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download data' }).isVisible();
    await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download data' }).click();
    await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('path').nth(1).click();
    await page.frameLocator('#analytics_iframe').getByText('PNG (Image of Visualization)').click();
    const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  const page2 = await page2Promise;
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Dashboard actions' }).click();
  
  await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘D' }).click();
  await page.frameLocator('#analytics_iframe').getByPlaceholder('Format').click();
  await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'PDF' }).click();
  const page3Promise = page.waitForEvent('popup');
  const download = page.waitForEvent('download');
  await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
  const page3 = await download;
  (await download).saveAs("/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/test.pdf")
 


})

test("All pre-requisite added for test", async ({browser,page})=>{
//    const context = await browser.newContext()
//    const page=(await context).newPage();
const INTANCE_URL ="https://clone-groupon-incremental-30.coupadev.com"
// const INTANCE_URL ="https://e2e-analytics-looker.coupadev.com"
function formatInstanceName(url) {
    const urlParts = url.split('/');
    const urlInstance = urlParts[2].split('.')[0];
    const formattedInstance = urlInstance.replace(/-/g, ' ').charAt(0).toUpperCase() + urlInstance.substring(1);
    return formattedInstance;
  }
const INSTANCE_NAME=formatInstanceName(INTANCE_URL)

await page.goto(`${INTANCE_URL}/sessions/new`);

await page.getByLabel('Username or Email Address').click();
await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
await page.locator('body').click();
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Temp@1234');
await page.getByRole('button', { name: 'Sign In' }).click();
await page.pause()
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
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Save & View Look' }).click();
await page.goto(`${INTANCE_URL}/analytics`);
await page.getByRole('link', { name: 'redwood analytics-admin' }).click();
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").isVisible()
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").click();
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).isVisible()

await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).click()
await page.locator(".ui-dialog-content.ui-widget-content").locator("select").selectOption({label:"Clone Groupon Incremental 30"})
await page.getByRole('button', { name: 'Submit' }).click()
await page.goto(`${INTANCE_URL}/analytics`);
await page.getByRole('link', { name: 'Invoicing' }).click();
await page.getByRole('cell', { name: 'AP Manager', exact: true }).locator('i').click();
await page.locator(".spend-analysis-folder-dashboards-content").locator("tr", { hasText: "AP Manager - Program Efficiency"}).locator(".enable-bootstrap").click()
await page.locator(".spend-analysis-folder-dashboards-content").locator("tr", { hasText: "AP Manager - Program Efficiency"}).locator(".dropdown-menu").getByRole('link', { name: 'Copy' }).click();
await page.locator('#folder_id').selectOption({label:"Clone Groupon Incremental 30"})
await page.getByRole('button', { name: 'Submit' }).click()


})

