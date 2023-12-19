import { test, expect } from '@playwright/test';


const startTime=process.env['startTime'];

console.log(startTime); 
//https://clone-capitalone-analyticsr-33.coupadev.com/
const INSTANCE_URL ='https://clone-capitalone-analyticsr-33.coupadev.com';

test.describe.parallel('Background job run check', () => {
  // Before all tests in the suite
  test.beforeEach(async ({ page }) => {
    await page.goto(`${INSTANCE_URL}/sessions/new`);

    await page.getByLabel('Username or Email Address').click();
    await page.getByLabel('Username or Email Address').fill('autosupport');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('CoupaSupport1');
    await page.getByRole('button', { name: 'Sign In' }).click();
  });

  // Individual test cases
  test('background_analytics_data_refresh_expiration', async ({ page }) => {
  //check in background jobs background_analytics_data_refresh_expiration
  await page.goto(`${INSTANCE_URL}/background_jobs`);
  
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_data_refresh_expiration');
  await page.getByPlaceholder('Search').press('Enter');
 //

  
 await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-created_at")).toContainText(startTime);
 await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-parameters")).toContainText("background_analytics_data_refresh_expiration");
  let jobStatus=await page.locator('tr.stripe_even.coupa_datatable_row.selected').locator('td.s-datatable-cell-status').textContent()
  if(jobStatus?.trim()=="done"){
    expect(1).toEqual(1)
  }else{
    expect(1).toEqual(2)
  }
  });

  test('background_analytics_cash_update', async ({ page }) => {
  //background_analytics_cash_update
  await page.goto(`${INSTANCE_URL}/background_jobs`);
  
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_cash_update');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-created_at")).toContainText(startTime);
 await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-parameters")).toContainText("background_analytics_cash_update");
  
  let jobStatus=await page.locator('tr.stripe_even.coupa_datatable_row.selected').locator('td.s-datatable-cell-status').textContent()
  if(jobStatus?.trim()=="done"){
    expect(1).toEqual(1)
  }else{
    expect(1).toEqual(2)
  } 
  })

   test('background_update_business_value_insights', async ({ page }) => {
      //background_update_business_value_insights
      await page.goto(`${INSTANCE_URL}/background_jobs`);

      await page.getByPlaceholder('Search').click();
      await page.getByPlaceholder('Search').fill('background_update_business_value_insights');
      await page.getByPlaceholder('Search').press('Enter');
      await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-created_at")).toContainText(startTime);
     await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-parameters")).toContainText("background_update_business_value_insights");
      
      let jobStatus=await page.locator('tr.stripe_even.coupa_datatable_row.selected').locator('td.s-datatable-cell-status').textContent()
      if(jobStatus?.trim()=="done"){
        expect(1).toEqual(1)
      }else{
        expect(1).toEqual(2)
      }
  });

  test('process_benchmarking_metrics_calculation', async ({ page }) => {
    //background_update_business_value_insights
    await page.goto(`${INSTANCE_URL}/background_jobs`);

    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('process_benchmarking_metrics_calculation');
    await page.getByPlaceholder('Search').press('Enter');
    await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-created_at")).toContainText(startTime);
   await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-parameters")).toContainText("process_benchmarking_metrics_calculation");
    
    let jobStatus=await page.locator('tr.stripe_even.coupa_datatable_row.selected').locator('td.s-datatable-cell-status').textContent()
    if(jobStatus?.trim()=="done"){
      expect(1).toEqual(1)
    }else{
      expect(1).toEqual(2)
    }
});

test('process_market_values_calculation', async ({ page }) => {
  //background_update_business_value_insights
  await page.goto(`${INSTANCE_URL}/background_jobs`);

  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('process_market_values_calculation');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-created_at")).toContainText(startTime);
 await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected').locator("td.s-datatable-cell-parameters")).toContainText("process_market_values_calculation");
  
  let jobStatus=await page.locator('tr.stripe_even.coupa_datatable_row.selected').locator('td.s-datatable-cell-status').textContent()
  if(jobStatus?.trim()=="done"){
    expect(1).toEqual(1)
  }else{
    expect(1).toEqual(2)
  }
});



});


