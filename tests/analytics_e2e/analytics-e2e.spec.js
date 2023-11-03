const {test, expect}= require('@playwright/test')
const fs = require('fs').promises;

// const INSTANCE_URL ='https://sanity2946r36.coupadev.com';
const INSTANCE_URL ='https://dashmaster-r36-analytics.coupadev.com';
// const INSTANCE_URL="https://clone-concentrix-analyticsr-38.coupadev.com";
// const INSTANCE_URL="https://clone-groupon-incremental-30-domain-migration.coupadev.com/";

function formatInstanceName(url) {
    const urlParts = url.split('//');
    const urlInstance = urlParts[1].split('.')[0];
    const formattedInstance = urlInstance.replace(/-/g, ' ');
    return titleize(formattedInstance);
  }
  
  function titleize(inputString) {
    return inputString.toLowerCase().replace(/(?:^|\s)\S/g, char => char.toUpperCase());
  }
  
  const INSTANCE_NAME = formatInstanceName(INSTANCE_URL);
  let prequisiteCreationFlag = false


test.describe.parallel("analytics e2e suite",()=>{

    test.beforeEach(async ({page})=>{
        await page.goto(`${INSTANCE_URL}/sessions/new`);
        await page.getByLabel('Username or Email Address').click();
        await page.getByLabel('Username or Email Address').fill('analytics_admin_user_login');
        await page.locator('body').click();
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('Temp@1234');
        await page.getByRole('button', { name: 'Sign In' }).click();
        const goodMorningBanner = page.getByRole('link', { name: 'Forms' })
        await expect(goodMorningBanner).toBeVisible()
    })

    test("verify if all prequisites present", async ({ page }) => {
        await page.goto(`${INSTANCE_URL}/analytics`);
        const shareFolder =  page.getByRole('link', { name: INSTANCE_NAME });
        await expect(shareFolder).toBeVisible();
        await shareFolder.click();
        const sharedFolderHeading = await page.getByText(`/ ${INSTANCE_NAME}`);
        await expect(sharedFolderHeading).toBeVisible();
        const dashboard_test = await page.getByRole('link', { name: 'dashboard_test' });
        const look_test = await page.getByRole('link', { name: 'look_test', exact: true });
      
        if (!(await dashboard_test.isVisible()) && !(await look_test.isVisible())) {
          prequisiteCreationFlag = true;
          console.log("as dashboard and look are not present setting the value of flag")
          console.log(prequisiteCreationFlag)
        }
        if(prequisiteCreationFlag){
           await page.goto(`${INSTANCE_URL}/analytics`);
           const shareFolder =  page.getByRole('link', { name: INSTANCE_NAME });
           await expect(shareFolder).toBeVisible();

            await page.getByRole('link', { name: 'Create New Report' }).click();
            await expect(
              page.getByText('STANDARD SPEND ANALYSIS').isVisible() ||
              page.getByText('SPEND ANALYSIS').isVisible()
            ).toBeTruthy();
            
            await page.getByRole('link', { name: 'Invoices' }).click();



            await page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search').isVisible();

            await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
            await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
            await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
            await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();

            await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();

            await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Save...' }).click();
            await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'As a Look' }).click();
            const filterByTitle = page.locator('lk-file-breadcrumbs').getByRole('button', { name: 'My folder' })
            
        
            await page.frameLocator('#analytics_iframe').locator('#qr-look-modal-title-field').fill('look_test');  
            await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).isVisible()
            await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
            await page.frameLocator('#analytics_iframe').locator('lk-file-navigator').getByRole('button', { name: 'My folder' }).click();
            await page.evaluate(() => {
              window.scrollBy(0, 300);
            })
            

            await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Save & View Look' }).click();
            
            await expect(page.frameLocator('#analytics_iframe').getByTitle('look_test')).toBeVisible()
            await page.waitForLoadState("domcontentloaded")
            
            
            await page.goto(`${INSTANCE_URL}/analytics`);
            await expect(page.getByRole('link', { name: 'redwood analytics-admin' })).toBeVisible()
            await page.getByRole('link', { name: 'redwood analytics-admin' }).click();
            await expect(page.getByRole('link', { name: 'look_test' })).toBeVisible()
            await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").isVisible()
            await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").click();
            await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).isVisible()
            
            await page.locator("div.spend-analysis-folder-contents",{hasText:"Looks"}).locator("tr",{hasText:"look_test"}).locator(".enable-bootstrap").locator(".dropdown-menu").locator("li",{hasText:"Move"}).click()
            await page.locator(".ui-dialog-content.ui-widget-content").locator("select").selectOption({label:INSTANCE_NAME})
            await page.getByRole('button', { name: 'Submit' }).click()
            
            
            await expect(page.getByRole('link', { name: 'look_test' })).not.toBeVisible()

            
            await page.goto(`${INSTANCE_URL}/analytics`);
            await expect(page.getByRole('link', { name: INSTANCE_NAME })).toBeVisible()
            
            await page.getByRole('link', { name: 'Invoicing' }).click();
            await page.getByRole('cell', { name: 'AP Manager', exact: true }).locator('i').click();
            await page.locator(".spend-analysis-folder-dashboards-content").locator("tr", { hasText: "AP Manager - Program Efficiency"}).locator(".enable-bootstrap").click()
            await page.locator(".spend-analysis-folder-dashboards-content").locator("tr", { hasText: "AP Manager - Program Efficiency"}).locator(".dropdown-menu").getByRole('link', { name: 'Copy' }).click();
            await page.locator('#folder_id').selectOption({label:INSTANCE_NAME})
            await page.locator('#dashboard_name').fill("dashboard_test")
            await page.getByRole('button', { name: 'Submit' }).click()
            
            await page.goto(`${INSTANCE_URL}/analytics`);
            await expect(page.getByRole('link', { name: INSTANCE_NAME })).toBeVisible()
            await page.getByRole('link', { name: INSTANCE_NAME }).click()
            
            await expect(page.getByRole('link', { name: 'dashboard_test' })).toBeVisible()
            await expect(page.getByRole('link', { name: 'look_test' })).toBeVisible()
         
        }else{
            console.log("all content already present!!")
        }
      });

  test('Test JSON download ', async ({ page }) => {



    await page.goto(`${INSTANCE_URL}/analytics`);
    await page.getByRole('link', { name: 'Create New Report' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    await expect( page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search')).toBeVisible()
    

    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
    await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Filename').fill("abcds.json")

    await expect(page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('heading', { name: 'Download' })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByLabel('Filename')).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Open in Browser' })).toBeVisible()
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'JSON' }).click();
    await page.waitForTimeout(700);
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
    const downloadPath ="/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/analytics_report_json.json"
    await download.saveAs(downloadPath)
    const fileContent = await fs.readFile(downloadPath, 'utf-8');
    const searchText = 'Invoice Line Reporting Total';
    const containsText = fileContent.includes(searchText);
  
    if (containsText) {
      console.log(`The file contains the text: "${searchText}"`);
    } else {
      console.log(`The file does not contain the text: "${searchText}"`);
    }
    const stats = await fs.stat(downloadPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
  
    if (fileSizeInKB > 1) {
      console.log(`Downloaded file size is greater than 1KB: ${fileSizeInKB} KB`);
    } else {
      console.log(`Downloaded file size is not greater than 1KB: ${fileSizeInKB} KB`);
    }

    expect(fileSizeInKB).toBeGreaterThan(0)
  })

  test('Test HTML download ', async ({ page }) => {



    await page.goto(`${INSTANCE_URL}/analytics`);
    await page.getByRole('link', { name: 'Create New Report' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    await expect( page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search')).toBeVisible()
    

    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
    await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Filename').fill("abcds.json")

    await expect(page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('heading', { name: 'Download' })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByLabel('Filename')).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Open in Browser' })).toBeVisible()
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'HTML' }).click();
    await page.waitForTimeout(700);
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
    const downloadPath ="/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/analytics_report_json.json"
    await download.saveAs(downloadPath)
    const fileContent = await fs.readFile(downloadPath, 'utf-8');
    const searchText = 'Invoice Line Reporting Total';
    const containsText = fileContent.includes(searchText);
  
    if (containsText) {
      console.log(`The file contains the text: "${searchText}"`);
    } else {
      console.log(`The file does not contain the text: "${searchText}"`);
    }
    const stats = await fs.stat(downloadPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
  
    if (fileSizeInKB > 1) {
      console.log(`Downloaded file size is greater than 1KB: ${fileSizeInKB} KB`);
    } else {
      console.log(`Downloaded file size is not greater than 1KB: ${fileSizeInKB} KB`);
    }

    expect(fileSizeInKB).toBeGreaterThan(0)
  })

  test('Test EXCEL download ', async ({ page }) => {



    await page.goto(`${INSTANCE_URL}/analytics`);
    await page.getByRole('link', { name: 'Create New Report' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    await expect( page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search')).toBeVisible()
    

    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
    await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Filename').fill("abcds.json")

    await expect(page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('heading', { name: 'Download' })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByLabel('Filename')).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Open in Browser' })).toBeVisible()
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'Excel Spreadsheet (Excel 2007 or later)' }).click();
    await page.waitForTimeout(700);
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
    const downloadPath ="/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/analytics_report_json.json"
    await download.saveAs(downloadPath)
    const fileContent = await fs.readFile(downloadPath, 'utf-8');
    const searchText = 'Invoice Line Reporting Total';
    const containsText = fileContent.includes(searchText);
  
    if (containsText) {
      console.log(`The file contains the text: "${searchText}"`);
    } else {
      console.log(`The file does not contain the text: "${searchText}"`);
    }
    const stats = await fs.stat(downloadPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
  
    if (fileSizeInKB > 1) {
      console.log(`Downloaded file size is greater than 1KB: ${fileSizeInKB} KB`);
    } else {
      console.log(`Downloaded file size is not greater than 1KB: ${fileSizeInKB} KB`);
    }

    expect(fileSizeInKB).toBeGreaterThan(0)
  })

  test('Test TEXT download ', async ({ page }) => {



    await page.goto(`${INSTANCE_URL}/analytics`);
    await page.getByRole('link', { name: 'Create New Report' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    await expect( page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search')).toBeVisible()
    

    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
    await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
    await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
    await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();
    await page.frameLocator('#analytics_iframe').getByLabel('Filename').fill("abcds.json")

    await expect(page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('heading', { name: 'Download' })).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByLabel('Filename')).toBeVisible()
    await expect(page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Open in Browser' })).toBeVisible()
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true }).click();
    await page.waitForTimeout(700);
    await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'TXT (tab-separated values)' }).click();
    await page.waitForTimeout(700);
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
    const downloadPath ="/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/analytics_report_json.json"
    await download.saveAs(downloadPath)
    const fileContent = await fs.readFile(downloadPath, 'utf-8');
    const searchText = 'Invoice Line Reporting Total';
    const containsText = fileContent.includes(searchText);
  
    if (containsText) {
      console.log(`The file contains the text: "${searchText}"`);
    } else {
      console.log(`The file does not contain the text: "${searchText}"`);
    }
    const stats = await fs.stat(downloadPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInKB = fileSizeInBytes / 1024;
  
    if (fileSizeInKB > 1) {
      console.log(`Downloaded file size is greater than 1KB: ${fileSizeInKB} KB`);
    } else {
      console.log(`Downloaded file size is not greater than 1KB: ${fileSizeInKB} KB`);
    }

    expect(fileSizeInKB).toBeGreaterThan(0)
  })
      
      test('Test PNG download', async ({ page ,browserName}) => {

        await page.goto(`${INSTANCE_URL}/analytics`);
        await page.getByRole('link', { name: 'Create New Report' }).click();
        await page.getByRole('link', { name: 'Invoices' }).click();

        await expect( page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search')).toBeVisible()

        await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
        await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
        await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
        await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
        await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
        await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
        await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();
        await page.frameLocator('#analytics_iframe').getByLabel('Filename').fill("abcds.json")

        await expect(page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true })).toBeVisible()
        await expect(page.frameLocator('#analytics_iframe').getByRole('heading', { name: 'Download' })).toBeVisible()
        await expect(page.frameLocator('#analytics_iframe').getByLabel('Filename')).toBeVisible()
        await expect(page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Open in Browser' })).toBeVisible()
        await page.waitForTimeout(700);
        await page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true }).click();
    
    
    
        await page.waitForTimeout(700);
    
        await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'PNG (Image of Visualization)' }).click();
      
        await page.waitForTimeout(700);
    
        if (browserName === 'chromium') {
          
          await page.frameLocator('#analytics_iframe').getByTestId('caret').locator('svg').click();
          // Add more test steps as needed for your PNG download test
        } else {
          console.log('This test is only intended to run in Chromium (Chrome).');
        }
      
        
      
        const downloadPage = page.waitForEvent('popup');
        await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Download' }).click();
        const page7 = await downloadPage;
        const download1Promise = page7.waitForEvent('download');
        const download= await download1Promise
        const downloadPath ="/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/analytics_report_png.png"
        await download.saveAs(downloadPath)
        const stats = await fs.stat(downloadPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInKB = fileSizeInBytes / 1024;

        if (fileSizeInKB > 1) {
            console.log(`Downloaded file size is greater than 1KB: ${fileSizeInKB} KB`);
        } else {
            console.log(`Downloaded file size is not greater than 1KB: ${fileSizeInKB} KB`);
        }
        expect(fileSizeInKB).toBeGreaterThan(0)
      
      })
      
      test('Markdown download test ', async ({ page }) => {

        await page.goto(`${INSTANCE_URL}/analytics`);
        await page.getByRole('link', { name: 'Create New Report' }).click();
        await page.getByRole('link', { name: 'Invoices' }).click();
        await expect( page.frameLocator('#analytics_iframe').getByPlaceholder('Start typing to search')).toBeVisible()

        await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Invoices', exact: true }).locator('svg').click();
        await page.frameLocator('#analytics_iframe').getByRole('treeitem', { name: 'Line Level Measures' }).locator('svg').click();
        await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Reporting Total', { exact: true }).click();
        await page.frameLocator('#analytics_iframe').getByLabel('Line Level Measures').getByText('Invoice Line Total').click();
        await page.frameLocator('#analytics_iframe').getByLabel('Run', { exact: true }).click();
        await page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Explore actions' }).click();
        await page.frameLocator('#analytics_iframe').getByRole('menuitem', { name: 'Download ⇧⌘L' }).click();
        await page.frameLocator('#analytics_iframe').getByLabel('Filename').fill("abcds.json")
        await expect(page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true })).toBeVisible()
        await expect(page.frameLocator('#analytics_iframe').getByRole('heading', { name: 'Download' })).toBeVisible()
        await expect(page.frameLocator('#analytics_iframe').getByLabel('Filename')).toBeVisible()
        await expect(page.frameLocator('#analytics_iframe').getByRole('button', { name: 'Open in Browser' })).toBeVisible()
        await page.waitForTimeout(700);
        await page.frameLocator('#analytics_iframe').getByLabel('Format', { exact: true }).click();
        await page.waitForTimeout(700);
        

        await page.frameLocator('#analytics_iframe').getByRole('option', { name: 'Markdown' }).click();
        await page.waitForTimeout(700);
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
        const downloadPath ="/Users/deepak.dhormare/Desktop/playwright_poc/playwright_poc_analytics/analytics_report_markdown.md"
        await download.saveAs(downloadPath)
        const fileContent = await fs.readFile(downloadPath, 'utf-8');

        // Check if the file content contains the desired text
        const searchText = 'Invoice Line Reporting Total';
        const containsText = fileContent.includes(searchText);
      
        if (containsText) {
          console.log(`The file contains the text: "${searchText}"`);
        } else {
          console.log(`The file does not contain the text: "${searchText}"`);
        }
        // Check the size of the downloaded file
        const stats = await fs.stat(downloadPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInKB = fileSizeInBytes / 1024;

        if (fileSizeInKB > 1) {
            console.log(`Downloaded file size is greater than 1KB: ${fileSizeInKB} KB`);
        } else {
            console.log(`Downloaded file size is not greater than 1KB: ${fileSizeInKB} KB`);
        }
        expect(fileSizeInKB).toBeGreaterThan(0)
      
      })

})