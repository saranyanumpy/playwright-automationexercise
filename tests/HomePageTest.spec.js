const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');  // Import HomePage class
const config = require('../config/config');  // Import config for baseURL

test('Verify homepage loads correctly and navigate to signup page', async ({ page }) => {
    const homePage = new HomePage(page);  // Create an instance of HomePage
    
    // Navigate to the homepage
    await page.goto(config.baseURL);

    // Assert that the title is correct
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Check if the logo, header, and footer are visible
    await homePage.checkLogoVisibility();  // Reuse the method from HomePage
    await homePage.checkHeaderVisibility();
    await homePage.checkFooterVisibility();

    // Click on the signup button
    await homePage.clickSignUp();

    // Wait for the signup page to load and verify the URL
    await expect(page).toHaveURL(config.baseURL + '/login');  // Replace '/login' with the correct path if needed
});
