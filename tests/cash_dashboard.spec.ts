import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://cash-qas.io.coupadev.com/sessions/new');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('deepak.dhormare@coupa.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Ddepak7794@');
  await page.getByText('Keep me signed in').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Select' }).nth(1).click();
  await page.waitForURL('https://cash-qas.io.coupadev.com/')

  await expect(page.getByText('Coupa Analytics Hub')).toBeVisible();
  await expect(page.getByRole('link', { name: ' Dashboard' })).toBeVisible();
  await page.getByRole('link', { name: ' Dashboard' }).click();
  await expect(page.getByRole('heading', { name: 'ETL Status' })).toBeVisible();
  await page.getByText('CASH38.0 · CANAL38.0').click();
  await expect(page.getByText('CASH38.0 · CANAL38.0')).toBeVisible();


  //instance list 
  await page.goto('https://cash-qas.io.coupadev.com/');
  await page.getByRole('link', { name: ' Instances' }).first().click();

await page.getByRole('textbox').click();
await page.locator('#instance-search-form').getByRole('textbox').fill('clone-groupon-incremental-30.coupadev.com')
await page.getByText('Search').click();

  await expect(page.getByRole('link', { name: 'clone_groupon_incremental_30' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Extract' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Transformation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Load' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Export' })).toBeVisible();
  await expect(page.getByText('Enablements')).toBeVisible();
  await expect(page.getByText('Analytics Enabled')).toBeVisible();
  await expect(page.getByText('Analytics Internal Enabled')).toBeVisible();
  await expect(page.getByText('Sandbox Refresh Enabled')).toBeVisible();
  await expect(page.locator('#instance-search-form').getByText('US', { exact: true })).toBeVisible();
  await expect(page.locator('#instance-search-form').getByText('QAS')).toBeVisible();


  //analytics preview
  await page.goto('https://cash-qas.io.coupadev.com/');
  await page.getByRole('link', { name: ' Previews' }).click();
  await page.getByRole('checkbox').nth(1).check();
  await expect(page.getByRole('heading', { name: 'Found ' })).toBeVisible();
  await page.getByRole('checkbox').nth(2).check();
  

  
  await expect(page.getByRole('heading', { name: 'Found ' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Enable Analytics Preview' }).first()).toBeVisible();
  await expect(page.getByRole('textbox')).toBeVisible();


  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('app_platform_master_int4');
  await page.getByText('Search').click();
  await expect(page.getByRole('link', { name: 'https://app-platform-master-' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Enable Analytics Preview' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Yes' })).toBeVisible();
  await page.getByRole('cell', { name: 'Completed' }).click();

// status page and jobs

await page.goto('https://cash-qas.io.coupadev.com/');
await page.getByRole('link', { name: ' Statuses' }).click();
await expect(page.getByRole('link', { name: 'clone_groupon_incremental_30', exact: true })).toBeVisible();
await expect(page.getByRole('link', { name: 'dashmaster_r38_analytics' })).toBeVisible();
await expect(page.getByRole('link', { name: 'clone_capitalone_incremental_30' })).toBeVisible();


await page.goto('https://cash-qas.io.coupadev.com/')

await page.getByRole('link', { name: ' Jobs', exact: true }).click();
await expect(page.getByText('Date', { exact: true })).toBeVisible();
await expect(page.getByText('Products')).toBeVisible();
await expect(page.locator('#job-search-form').getByText('Statuses')).toBeVisible();
await expect(page.getByRole('link', { name: 'clear instance' })).toBeVisible();


await page.locator('div:nth-child(5) > div > .form-check-input').first().check();
await expect(page.locator('body')).toContainText('Extract');
await page.locator('div:nth-child(5) > div > .form-check-input').first().uncheck();


await page.locator('div:nth-child(5) > div:nth-child(6) > .form-check-input').check();
await expect(page.locator('body')).toContainText('Transformation');
await page.locator('div:nth-child(5) > div:nth-child(6) > .form-check-input').uncheck();

//archive
await page.goto('https://cash-qas.io.coupadev.com/')
await page.getByRole('link', { name: ' Archives' }).click();
await expect(page.locator('body')).toContainText('job_state_5');
await expect(page.getByRole('paragraph')).toContainText('Extract Job Archive');

//enterprise schema
await page.goto('https://cash-qas.io.coupadev.com/')

await page.getByRole('link', { name: ' Enterprise Schema' }).click();

await expect(page.locator('table').filter({ hasText: 'Field Type Null Default supplier_id integer YES NULL payment_term_id integer' }).locator('th').nth(3)).toBeVisible();

await expect(page.locator('#enterprise-schema-search-form')).toContainText('Source');
await expect(page.locator('#enterprise-schema-search-form')).toContainText('Target');

//Looker 

await page.goto('https://cash-qas.io.coupadev.com/looker/instances');

await expect(page.locator('body')).toContainText('Add Looker Instance');
await expect(page.locator('tbody')).toContainText('Action');
await expect(page.locator('tbody')).toContainText('coupaanalytics-dev.coupadev.com');
await expect(page.locator('tbody')).toContainText('Available');

//Looker content

await page.goto('https://cash-qas.io.coupadev.com/looker/contents');
await expect(page.locator('tbody')).toContainText('coupadev.looker.com');
await expect(page.locator('tbody')).toContainText('coupabsm.looker.com');

//snowflake

await page.goto('https://cash-qas.io.coupadev.com/admin/snowflake_instances');

await expect(page.locator('body')).toContainText('Add Snowflake Instance');
await expect(page.locator('tbody')).toContainText('coupaanalytics');
await expect(page.locator('tbody')).toContainText('Available');
await expect(page.locator('tbody')).toContainText('US');
await expect(page.locator('body')).toContainText('* Instance is not configured for this environment');

//snowflake databases


await page.goto('https://cash-qas.io.coupadev.com/admin/snowflake_databases');
await page.getByText('Snowflake Databases', { exact: true }).click();
await expect(page.locator('body')).toContainText('All Snowflake Databases');
await expect(page.locator('thead')).toContainText('Name');

//metrics 

//performance
await page.goto('https://cash-qas.io.coupadev.com/metrics/performance');
await expect(page.locator('body')).toContainText('Performance');
await expect(page.getByText('Past 60 minutes')).toBeVisible();
await expect(page.locator('body')).toContainText('Looker Instances');
await expect(page.locator('body')).toContainText('Model & Explores');
await expect(page.locator('body')).toContainText('Queries Executed');



//jobs
await page.goto('https://cash-qas.io.coupadev.com/metrics/jobs');

await expect(page.locator('body')).toContainText('ETL Job Activity');
await expect(page.locator('body')).toContainText('Job Metrics');
await expect(page.getByRole('heading', { name: 'ENTERPRISE\n·\nAZURE\n·\nFULL' })).toBeVisible();

await expect(page.getByRole('heading', { name: 'ENTERPRISE\n·\nUS\n·\nFULL' })).toBeVisible();


//users

await page.goto('https://cash-qas.io.coupadev.com/metrics/users');
await expect(page.locator('body')).toContainText('User Activity');
await expect(page.locator('body')).toContainText('Total Users');
await expect(page.locator('body')).toContainText('Admin/Developers');
await expect(page.locator('body')).toContainText('Content Creators');
await expect(page.locator('body')).toContainText('User Queries per Day (6 Weeks)');

//content
await page.getByRole('link', { name: ' Contents' }).click();
await expect(page.locator('body')).toContainText('Content Activity');
await expect(page.locator('body')).toContainText('Dasbhoards');
await expect(page.locator('body')).toContainText('Looks');
await expect(page.locator('body')).toContainText('Scheduled Plans');
await expect(page.locator('body')).toContainText('Dashboard Usage');
await expect(page.locator('body')).toContainText('Look Usage');

//api

await page.getByRole('link', { name: ' API' }).click();

await expect(page.locator('body')).toContainText('API Activity');

//databases
await page.getByRole('link', { name: ' Databases' }).click();
await expect(page.locator('body')).toContainText('Database Performance');
await expect(page.locator('body')).toContainText('Results from Cache (Last 30 Days)');
await expect(page.locator('body')).toContainText('Query Runtimes by Issuer Source (Last 30 Days)');
//errors
await page.getByRole('link', { name: ' Errors' }).click();

await expect(page.locator('body')).toContainText('Errors and Broken Content');
await expect(page.locator('body')).toContainText('Metrics');
await expect(page.locator('body')).toContainText('Errors (Last 30 Days)');


await page.getByRole('link', { name: ' CASH' }).click();
await expect(page.locator('body')).toContainText('CASH');
await expect(page.locator('body')).toContainText('x86_64-linux');
await expect(page.locator('body')).toContainText('8.0.28');
await expect(page.locator('body')).toContainText('Tables');
await expect(page.locator('tbody')).toContainText('users_roles');



await page.getByRole('link', { name: ' Enterprise' }).click();
await expect(page.locator('body')).toContainText('Enterprise');
await expect(page.frameLocator('iframe >> nth=1').locator('h1')).toContainText('Index Page Performance');
await page.frameLocator('iframe >> nth=0').getByRole('heading', { name: 'Since 12 hours ago' }).click();
await expect(page.frameLocator('iframe >> nth=3').locator('h1')).toContainText('Analytics Page Performance By Customer');



//Admin background jobs


await page.goto('https://cash-qas.io.coupadev.com/admin/background_jobs');
await expect(page.locator('body')).toContainText('Background Jobs');
await expect(page.locator('select[name="period"]')).toBeVisible();
await expect(page.locator('select[name="job_type"]')).toBeVisible();
await expect(page.locator('select[name="job_state"]')).toBeVisible();
await expect(page.getByPlaceholder('Search')).toBeVisible();
await page.locator('select[name="job_type"]').selectOption('analytics_preview_disablement');
await page.getByRole('button', { name: 'Search' }).click();
await expect(page.locator('tbody')).toContainText('Analytics Preview Disablement');
await expect(page.locator('tbody')).toContainText('Completed');


//support
await page.goto('https://cash-qas.io.coupadev.com/admin/support');

await expect(page.locator('body')).toContainText('CASH Environment Settings');
await expect(page.locator('body')).toContainText('cash-qas.io.coupadev.com');


//analytics mapping
await page.goto('https://cash-qas.io.coupadev.com/admin/analytics_mappings');
await expect(page.locator('body')).toContainText('Add Analytics Mapping');

await expect(page.locator('tbody')).toContainText('coupadev');
await expect(page.locator('tbody')).toContainText('coupaanalytics');
await expect(page.locator('body')).toContainText('Analytics Mappings');

await page.getByRole('button', { name: 'Add Analytics Mapping' }).click();
await expect(page.getByText('Looker Host')).toBeVisible();
await expect(page.getByText('Snowflake Host')).toBeVisible();
await expect(page.getByText('Region', { exact: true })).toBeVisible();
await expect(page.getByText('Environment')).toBeVisible();
await expect(page.locator('#new_analytics_mapping')).toContainText('Cancel');
await expect(page.locator('input[name="commit"]')).toContainText('Save');

await page.getByRole('button', { name: 'Save' }).click();
await expect(page.locator('body')).toContainText('must exist, Looker Host must be specified, Region must be specified, Environment must be specified');
await page.getByRole('link', { name: 'Cancel' }).click();
await expect(page.getByRole('button', { name: 'Add Analytics Mapping' })).toBeVisible();

//jobs
await page.goto('https://cash-qas.io.coupadev.com/admin/jobs');

await expect(page.locator('body')).toContainText('Add Job');
await expect(page.locator('body')).toContainText('Jobs');
await expect(page.locator('body')).toContainText('job_state/development/enterprise_etl/us/');

//regions


await page.goto('https://cash-qas.io.coupadev.com/admin/regions');
await expect(page.locator('body')).toContainText('Add Region');
await expect(page.locator('body')).toContainText('Regions');

//users
await page.goto('https://cash-qas.io.coupadev.com/admin/users');

await expect(page.locator('tbody')).toContainText('View');
await expect(page.locator('tbody')).toContainText('Edit');
await expect(page.locator('body')).toContainText('Users');
await expect(page.locator('body')).toContainText('All Users');

//roles

await page.goto('https://cash-qas.io.coupadev.com/admin/roles');

await expect(page.locator('body')).toContainText('All Roles');
await expect(page.locator('body')).toContainText('Roles');
await expect(page.locator('body')).toContainText('Create');


await page.getByRole('cell', { name: 'Full system access to setup' }).click();



  

});