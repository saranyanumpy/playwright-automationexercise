const { expect } = require('@playwright/test');  // Import expect
class LogOutPage {
    constructor(page) {
        this.page = page;
        
        // Locators for the signup form elements
        this.logOutButton = page.locator('a[href="/logout"]');  // Logout button field
       // this.Login to your account
       }
       
       // Action to submit the signup form
    async logOutButtonAction() {
        await this.logOutButton.click();  // Click the logout button
    }
}

module.exports = { LogOutPage };
