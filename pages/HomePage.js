// const { test, expect } = require('@playwright/test');
// const {BasePage}=require('./BasePage');

// test('Homepage loads correctly', async ({ page }) => {
//   const  basepage =new BasePage(page);
//   //await basepage.NavigationHistoryEntry('https://automationexercise.com/test_cases');
//   await basepage.NavigationHistoryEntry('/test_cases');

//   await expect(page).toHaveTitle(/Automation Exercise/);

//   await expect(page).toHaveURL(url);

//   const header=page.locator('header');
//   await expect(header).toBeVisible();

//   const footer=page.locator('footer');
//   await expect(footer).toBeVisible();

//   const logoLink=page.locator('a[href="/"] img');
//   await expect(logoLink).toBeVisible();

//   //const loadTime=await page.evaluate(() => performance.timing.l)

// });
// \
class HomePage {
    constructor(page) {
        this.page = page;
        
        // Define locators
        this.logo = page.locator('a[href="/"] img');  // Locator for logo image
        this.header = page.locator('header');  // Locator for header
        this.footer = page.locator('footer');  // Locator for footer
    }

    // Actions (methods to interact with the elements)
    async checkLogoVisibility() {
        await this.logo.isVisible();  // Check if the logo is visible
    }

    async checkHeaderVisibility() {
        await this.header.isVisible();  // Check if the header is visible
    }

    async checkFooterVisibility() {
        await this.footer.isVisible();  // Check if the footer is visible
    }
}

module.exports = { HomePage };

