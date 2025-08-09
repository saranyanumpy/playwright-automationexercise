const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');  // Import HomePage class
const config = require('../config/config'); 

test('Verify homepage loads correctly', async ({ page }) => {
    const homePage = new HomePage(page);  // Create an instance of HomePage
    
    // Navigate to the homepage
    await homePage.page.goto(config.baseURL);

    // Assert that the title is correct
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Check if the logo, header, and footer are visible
    await homePage.checkLogoVisibility();  // Reuse the method from HomePage
    await homePage.checkHeaderVisibility();
    await homePage.checkFooterVisibility();
});
