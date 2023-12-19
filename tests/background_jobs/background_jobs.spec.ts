import { test, expect } from '@playwright/test';


const later = new Date(Date.now() +  30 * 1000); // Get the time 2 minutes later
const utcSeconds = String(later.getUTCSeconds()).padStart(2, '0');
const utcMinutes = String(later.getUTCMinutes()).padStart(2, '0');
const utcHours = String(later.getUTCHours()).padStart(2, '0');

const cronExpression = `${utcSeconds} ${utcMinutes} ${utcHours} * * *`;
const startTime = `${utcHours}:${utcMinutes}`;
console.log(cronExpression); 
console.log(startTime); 
process.env['startTime'] = startTime

console.log(process.env['startTime'])
// https://clone-capitalone-analyticsr-33.coupadev.com
const INSTANCE_URL ='https://clone-capitalone-analyticsr-33.coupadev.com';

test.describe.parallel('background jobs', () => {
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
//for for background_analytics_data_refresh_expiration
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_data_refresh_expiration');
  await page.getByPlaceholder('Search').press('Enter');
  let isActive=await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').locator("td.s-datatable-cell-active").textContent();
  await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').getByText('No', { exact: true })
  if(isActive?.trim()!="Yes"){
    console.log(isActive)
    console.log("radha radha");
    await page.getByRole('link', { name: 'activate!' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  }
  
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_data_refresh_expiration');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').getByText('Yes')).toBeVisible();
  await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('*Cron').click();
  await page.getByLabel('*Cron').fill(cronExpression);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_data_refresh_expiration")').locator("td.s-datatable-cell-cron")).toContainText(cronExpression); 
  

  });

  test('background_analytics_cash_update', async ({ page }) => {
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_cash_update');
  await page.getByPlaceholder('Search').press('Enter');
  const isActive=await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_cash_update")').locator("td.s-datatable-cell-active").textContent();
  
  if(isActive?.trim()!="Yes"){
    console.log(isActive)
    console.log("radha radha");
    await page.getByRole('link', { name: 'activate!' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  }
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('background_analytics_cash_update');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_cash_update")').getByText('Yes')).toBeVisible();
  await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_cash_update")').getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('*Cron').click();
  await page.getByLabel('*Cron').fill(cronExpression);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_analytics_cash_update")').locator("td.s-datatable-cell-cron")).toContainText(cronExpression); 

  });

  test('process_market_values_calculation', async ({ page }) => {
await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('process_market_values_calculation');
  await page.getByPlaceholder('Search').press('Enter');
  const isActive=await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("process_market_values_calculation")').locator("td.s-datatable-cell-active").textContent();
  
  if(isActive?.trim()!="Yes"){
    console.log(isActive)
    console.log("radha radha");
    await page.getByRole('link', { name: 'activate!' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  }
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('process_market_values_calculation');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('.stripe_even.coupa_datatable_row.selected:has-text("process_market_values_calculation")').getByText('Yes')).toBeVisible();
  await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("process_market_values_calculation")').getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('*Cron').click();
  await page.getByLabel('*Cron').fill(cronExpression);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("process_market_values_calculation")').locator("td.s-datatable-cell-cron")).toContainText(cronExpression); 
  
  });

  test('process_benchmarking_metrics_calculation', async ({ page }) => {
 await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('process_benchmarking_metrics_calculation');
  await page.getByPlaceholder('Search').press('Enter');
  const isActive=await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("process_benchmarking_metrics_calculation")').locator("td.s-datatable-cell-active").textContent();
  
  if(isActive?.trim()!="Yes"){
    console.log(isActive)
    console.log("radha radha");
    await page.getByRole('link', { name: 'activate!' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
  }
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('process_benchmarking_metrics_calculation');
  await page.getByPlaceholder('Search').press('Enter');
  await expect(page.locator('.stripe_even.coupa_datatable_row.selected:has-text("process_benchmarking_metrics_calculation")').getByText('Yes')).toBeVisible();
  await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("process_benchmarking_metrics_calculation")').getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('*Cron').click();
  await page.getByLabel('*Cron').fill(cronExpression);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
  await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("process_benchmarking_metrics_calculation")').locator("td.s-datatable-cell-cron")).toContainText(cronExpression); 

  });

  test('background_update_business_value_insights', async ({ page }) => {

await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
await page.getByPlaceholder('Search').click();
await page.getByPlaceholder('Search').fill('background_update_business_value_insights');
await page.getByPlaceholder('Search').press('Enter');
const isActive=await page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_update_business_value_insights")').locator("td.s-datatable-cell-active").textContent();

if(isActive?.trim()!="Yes"){
  console.log(isActive)
  console.log("radha radha");
  await page.getByRole('link', { name: 'activate!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
}
await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
await page.getByPlaceholder('Search').click();
await page.getByPlaceholder('Search').fill('background_update_business_value_insights');
await page.getByPlaceholder('Search').press('Enter');
await expect(page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_update_business_value_insights")').getByText('Yes')).toBeVisible();
await page.locator('.stripe_even.coupa_datatable_row.selected:has-text("background_update_business_value_insights")').getByRole('link', { name: 'Edit' }).click();
await page.getByLabel('*Cron').click();
await page.getByLabel('*Cron').fill(cronExpression);
await page.getByRole('button', { name: 'Save' }).click();
await page.goto(`${INSTANCE_URL}/scheduled_jobs`);
await expect(page.locator('tr.stripe_even.coupa_datatable_row.selected:has-text("background_update_business_value_insights")').locator("td.s-datatable-cell-cron")).toContainText(cronExpression); 

  });



  // ... Add more test cases as needed
});


