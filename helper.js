async function createDashboard(page) {
    await page.goto("https://www.example.com");
}

async function createLook(page) {
    await page.waitForSelector('h5');
    
}

module.exports = {
    loadHomePage,
    assertTitle
};
