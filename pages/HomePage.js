const { expect } = require('@playwright/test');  // Import expect

class HomePage {
    constructor(page) {
        this.page = page;
        
        // Define locators
        this.logo = page.locator('a[href="/"] img');  // Locator for logo image
        this.header = page.locator('header');  // Locator for header
        this.footer = page.locator('footer');  // Locator for footer
        this.signupButton = page.locator('a[href="/login"]');  // Locator for signup button
    }

    // Actions (methods to interact with the elements)
    async checkLogoVisibility() {
        await expect(this.logo).toBeVisible();  // Assert the logo is visible
    }

    async checkHeaderVisibility() {
        await expect(this.header).toBeVisible();  // Assert the header is visible
    }

    async checkFooterVisibility() {
        await expect(this.footer).toBeVisible();  // Assert the footer is visible
    }

    // Action to click the signup button
    async clickSignUp() {
        await this.signupButton.click();  // Click the signup button
    }
}

module.exports = { HomePage };
