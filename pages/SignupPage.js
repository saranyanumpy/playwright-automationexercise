const { expect } = require('@playwright/test');  // Import expect

class SignupPage {
    constructor(page) {
        this.page = page;
        
        // Locators for the signup form elements
        this.nameField = page.locator('input[name="name"]');  // Name input field
        this.emailField = page.locator('input[data-qa="signup-email"]');  // Email input field
      //  this.passwordField = page.locator('#password');  // Password input field
        this.signupButton = page.locator('button[data-qa="signup-button"]');  // Signup button
       this.enterAccountText = page.locator('text=Enter Account Information');
    }

    // Action to fill the signup form
    async fillSignupForm(name, email, password) {
        await this.nameField.fill(name);  // Fill in the name
        await this.emailField.fill(email);  // Fill in the email
     //   await this.passwordField.fill(password);  // Fill in the password
    }

    // Action to submit the signup form
    async submitSignupForm() {
        await this.signupButton.click();  // Click the signup button
    }

    // Action to verify if the confirmation message is visible
    async verifyConfirmationMessage() {
        await expect(this.enterAccountText).toBeVisible();  // Check if the confirmation message is visible
    }
}

module.exports = { SignupPage };
