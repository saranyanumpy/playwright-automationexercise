
// const { test, expect } = require('@playwright/test');
// const path = require('path');
// const { readCsvFile } = require('../utils/csvReader');
// const { AccountInfoPage } = require('../pages/AccountInfoPage');
// const { SignupPage } = require('../pages/SignupPage');
// const { LogOutPage } = require('../pages/LogOutPage');
// const config = require('../config/config');

// const rows = readCsvFile(path.join('testdata', 'users.csv'));

// for (const row of rows) {
//   test(`Signup flow for ${row.email}`, async ({ page }) => {
//     // 1) Go to login/signup
//     await page.goto(`${config.baseURL}/login`, {
//       waitUntil: 'domcontentloaded',
//       timeout: 60000
//     });

//     // 2) Fill initial signup
//     const signup = new SignupPage(page);
//     await signup.fillSignupForm(row['name'], row['email'], row['password']);
//     await signup.submitSignupForm();

//     // 3) Account info page (resilient to month names like "June" or numbers like "6")
//     const account = new AccountInfoPage(page);
//     await account.fillAccountInfo({
//       gender: row['gender'],        // e.g., id_gender2
//       password: row['password'],
//       day: row['day'],              // e.g., 15
//       month: row['month'],          // e.g., June (handled)
//       year: row['year'],            // e.g., 1990
//       firstName: row['firstName'],
//       lastName: row['lastName'],
//       company: row['company'],
//       address1: row['address1'],
//       address2: row['address2'],
//       country: row['country'],      // e.g., United States
//       city: row['city'],
//       state: row['state'],
//       zipCode: row['zipCode'],
//       mobileNo: row['mobileNo'],
//     });

//     await account.submitCreateAccount();

//     // 4) Assert success
//     await expect(page.getByText('Account Created!')).toBeVisible();
//     //{ timeout: 20000 }
//   });

//   const account = new LogOutPage(page);
//   await LogOutPage.logOutButtonAction();
//   await expect(page).toHaveURL(`${config.baseURL}/login`);
// }
const { test, expect } = require('@playwright/test');
const path = require('path');
const { readCsvFile } = require('../utils/csvReader');
const { AccountInfoPage } = require('../pages/AccountInfoPage');
const { SignupPage } = require('../pages/SignupPage');
const { LogOutPage } = require('../pages/LogOutPage');
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
    await expect(page.getByText('Account Created!')).toBeVisible();

await account.clickContinueAfterSignup();
await page.context().storageState({path: 'storage/auth.json' });
    // 5) Logout (inside the test, using an instance method)
    // const logout = new LogOutPage(page);
    // await logout.logOutButtonAction();
    // await expect(page).toHaveURL(`${config.baseURL}/login`);
  });
}
