const {test}= require('@playwright/test')

test("first_case to start the poc of analytics page", async ({browser,page})=>{
//    const context = await browser.newContext()
//    const page=(await context).newPage();

await page.goto('https://clone-groupon-incremental-30.coupadev.com/sessions/new');

await page.getByLabel('Username or Email Address').click();
await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
await page.locator('body').click();
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Temp@1234');
await page.getByRole('button', { name: 'Sign In' }).click();
await page.pause()
await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
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
await page.frameLocator('#analytics_iframe').locator('#qr-look-modal-title-field').fill('look_test_12366');
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Save & View Look' }).click();
await page.goto('https://clone-groupon-incremental-30.coupadev.com/analytics');
await page.getByRole('link', { name: 'redwood analytics-admin' }).click();
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test_12366"}).locator(".enable-bootstrap").isVisible()
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test_12366"}).locator(".enable-bootstrap").click();
await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test_12366"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).isVisible()

await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test_12366"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).click()
await page.locator(".ui-dialog-content.ui-widget-content").locator("select").selectOption({label:"Clone Groupon Incremental 30"})
await page.getByRole('button', { name: 'Submit' }).click()





})