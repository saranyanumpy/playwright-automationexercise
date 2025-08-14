// // const { test, expect } = require('@playwright/test');  // Import Playwright's test and expect
// // const { SignupPage } = require('../pages/SignupPage');  // Import SignupPage class (Page Object)
// // const config = require('../config/config');  // Import config for baseURL

// // test('Verify user can sign up successfully', async ({ page }) => {
// //     const signupPage = new SignupPage(page);  // Create an instance of SignupPage
    
// //     // Navigate to the signup page
// //     await page.goto(config.baseURL + '/login', {
// //       waitUntil: 'domcontentloaded',
// //       timeout: 60000
// //     });


// //     // Fill out the signup form
// //     await signupPage.fillSignupForm('Test User', 'testsara@example.com', 'password123');
    
// //     // Submit the form
// //     await signupPage.submitSignupForm();
    
// //     // Verify that the user is redirected to the account page after signup
// //     await expect(page).toHaveURL(config.baseURL + '/signup');
    
// //     // Verify that the confirmation message is visible after signup
// //     await signupPage.verifyConfirmationMessage();
// // });

// // const { test, expect } = require('@playwright/test');
// // const { readCsvFile } = require('../utils/csvReader');
// // const { SignupPage } = require('../pages/SignupPage');
// // const { AccountInfoPage } = require('../pages/AccountInfoPage');
// // const config = require('../config/config');

// // // Read CSV data
// // const users = readCsvFile('testdata/users.csv');

// // test.describe('UI Tests Suite', () => {

// //   test('Verify AccountInfoPage locators are visible', async ({ page }) => {
// //     const accountInfoPage = new AccountInfoPage(page);

// //     // Navigate to Account Info page directly if possible
// //     await page.goto(config.baseURL + '/account_info_url');  // Replace with correct Account Info page URL

// //     // Assertions for AccountInfoPage elements
// //     await expect(accountInfoPage.pageTitle).toBeVisible();
// //     await expect(accountInfoPage.genderSelect).toBeVisible();
// //     await expect(accountInfoPage.passwordField).toBeVisible();
// //     await expect(accountInfoPage.dayDropdown).toBeVisible();
// //     await expect(accountInfoPage.createAccount).toBeVisible();
// //   });

// //   test.describe('Signup tests from CSV data', () => {
// //     for (const user of users) {
// //       test(`Signup test for ${user.email}`, async ({ page }) => {
// //         const signupPage = new SignupPage(page);

// //         await page.goto(config.baseURL + '/login', {
// //           waitUntil: 'domcontentloaded',
// //           timeout: 60000
// //         });

// //         await signupPage.fillSignupForm(user.name, user.email, user.password);
// //         await signupPage.submitSignupForm();

// //         await expect(page).toHaveURL(config.baseURL + '/signup');
// //         await signupPage.verifyConfirmationMessage();
// //       });
// //     }
// //   });

// // });

// const { test, expect } = require('@playwright/test');
// const { readCsvFile } = require('../utils/csvReader');
// const { SignupPage } = require('../pages/SignupPage');
// const { AccountInfoPage } = require('../pages/AccountInfoPage');
// const config = require('../config/config');

// // Read CSV data once
// const users = readCsvFile('testdata/users.csv');

// test('Verify AccountInfoPage locators are visible after signup using CSV data', async ({ page }) => {
//   const signupPage = new SignupPage(page);
//   const accountInfoPage = new AccountInfoPage(page);

//   // Pick the first user from CSV (or loop over users if you want)
//   const user = users[0];

//   await page.goto(config.baseURL + '/login');

//   // Use CSV data to fill the signup form
//   await signupPage.fillSignupForm(user.name, user.email, user.password);
//   await signupPage.submitSignupForm();

//   // Wait for navigation to Account Info page
//   await page.waitForURL(config.baseURL + '/signup'); // adjust as needed

//   // Verify AccountInfoPage elements are visible
//   await expect(accountInfoPage.pageTitle).toBeVisible();
// await expect(accountInfoPage.genderLocator(user.gender)).toBeVisible();
// await expect(accountInfoPage.passwordField).toBeVisible();
// await expect(accountInfoPage.dayDropdown).toBeVisible();
// await expect(accountInfoPage.createAccount).toBeVisible();

// await accountInfoPage.fillAccountInfo(user);
// await expect(accountInfoPage.genderLocator(user.gender)).toBeChecked();

// await accountInfoPage.submitAccountInfo();
// await accountInfoPage.waitForAccountCreated();
// await expect(accountInfoPage.accountCreatedMessage).toBeVisible();
// await expect(accountInfoPage.accountCreatedMessage).toHaveText(/Account Created!/);


// });

// tests/SignupTest.spec.js
// tests/SignupTest.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { readCsvFile } = require('../utils/csvReader');
const { AccountInfoPage } = require('../pages/AccountInfoPage');
const { SignupPage } = require('../pages/SignupPage');
const config = require('../config/config');

const rows = readCsvFile(path.join('testdata', 'users.csv'));

for (const row of rows) {
  test(`Signup flow for ${row.email}`, async ({ page }) => {
    // 1) Go to login/signup
    await page.goto(`${config.baseURL}/login`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // 2) Fill initial signup
    const signup = new SignupPage(page);
    await signup.fillSignupForm(row['name'], row['email'], row['password']);
    await signup.submitSignupForm();

    // 3) Account info page (resilient to month names like "June" or numbers like "6")
    const account = new AccountInfoPage(page);
    await account.fillAccountInfo({
      gender: row['gender'],        // e.g., id_gender2
      password: row['password'],
      day: row['day'],              // e.g., 15
      month: row['month'],          // e.g., June (handled)
      year: row['year'],            // e.g., 1990
      firstName: row['firstName'],
      lastName: row['lastName'],
      company: row['company'],
      address1: row['address1'],
      address2: row['address2'],
      country: row['country'],      // e.g., United States
      city: row['city'],
      state: row['state'],
      zipCode: row['zipCode'],
      mobileNo: row['mobileNo'],
    });

    await account.submitCreateAccount();

    // 4) Assert success
    await expect(page.getByText('Account Created!')).toBeVisible({ timeout: 20000 });
  });
}
