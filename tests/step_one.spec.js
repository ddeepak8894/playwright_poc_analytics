const {test}= require('@playwright/test')

test("first_case to start the poc of analytics page", async ({browser,page})=>{
//    const context = await browser.newContext()
//    const page=(await context).newPage();

   await page.goto("https://downergroup-analytics.coupadev.com/sessions/new")
   console.log("=====================================")
   console.log(await page.title())

})