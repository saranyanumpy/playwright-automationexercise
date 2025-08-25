// // pages/AccountInfoPage.js
// class AccountInfoPage {
//   constructor(page) {
//     this.page = page;

//     this.pageTitle = page.locator('text=Enter Account Information');

//     // Radios
//     this.genderFemale = page.locator('#id_gender2');
//     this.genderMale   = page.locator('#id_gender1');

//     // Account fields
//     this.passwordField = page.locator('#password');
//     this.dayDropdown   = page.locator('#days');
//     this.monthDropdown = page.locator('#months');
//     this.yearDropdown  = page.locator('#years');

//     // Opt-ins
//     this.newsLetterCheck = page.locator('#newsletter');
//     this.offersCheck     = page.locator('#optin');

//     // Address
//     this.firstName   = page.locator('#first_name');
//     this.lastName    = page.locator('#last_name');
//     this.companyName = page.locator('#company');
//     this.address1    = page.locator('#address1');
//     this.address2    = page.locator('#address2');
//     this.country     = page.locator('#country');
//     this.city        = page.locator('#city');
//     this.state       = page.locator('#state');
//     this.zipCode     = page.locator('#zipcode');
//     this.mobileNumber = page.locator('#mobile_number');

//     this.createAccount = page.locator('[data-qa="create-account"]');

//     // After account creation
//     this.accountCreatedMessage = page.locator('h2[data-qa="account-created"]');
//     this.continueButton        = page.locator('a[data-qa="continue-button"]');
//   }

//   async verifyPageTitleVisible() {
//     await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
//   }

//   // --- Helpers for gender radio ---
//   genderLocator(gender) {
//     if (!gender) return this.genderFemale; // default
//     const key = String(gender).replace('#','').toLowerCase();

//     if (key === 'female' || key === 'id_gender2' || key.includes('mrs')) return this.genderFemale;
//     if (key === 'male'   || key === 'id_gender1' || key.includes('mr'))  return this.genderMale;

//     // fallback: treat as an id or selector
//     return this.page.locator(key.startsWith('id_') ? `#${key}` : key);
//   }

//   async selectGender(gender) {
//     const radio = this.genderLocator(gender);
//     await radio.check();
//   }

//   /**
//    * Expects keys that match your CSV headers.
//    */
//   async fillAccountInfo({
//     gender,
//     password,
//     day, month, year,
//     firstName, lastName, company,
//     address1, address2, country,
//     city, state, zipCode, mobileNo,
//     subscribeNewsletter = false,
//     receiveOffers = false,
//   }) {
//     // Gender
//     await this.selectGender(gender);

//     // Credentials & DOB
//     await this.passwordField.fill(String(password ?? ''));

//     // day/year usually by value; month could be label like 'June' or numeric like '6'
//     await this.dayDropdown.selectOption(String(day));
//     try {
//       await this.monthDropdown.selectOption({ value: String(month) });
//     } catch {
//       await this.monthDropdown.selectOption({ label: String(month) });
//     }
//     await this.yearDropdown.selectOption(String(year));

//     // Name & address
//     await this.firstName.fill(String(firstName ?? ''));
//     await this.lastName.fill(String(lastName ?? ''));
//     await this.companyName.fill(String(company ?? ''));
//     await this.address1.fill(String(address1 ?? ''));
//     await this.address2.fill(String(address2 ?? ''));

//     // Country: try value then label
//     try {
//       await this.country.selectOption({ value: String(country) });
//     } catch {
//       await this.country.selectOption({ label: String(country) });
//     }

//     await this.city.fill(String(city ?? ''));
//     await this.state.fill(String(state ?? ''));
//     await this.zipCode.fill(String(zipCode ?? ''));
//     await this.mobileNumber.fill(String(mobileNo ?? ''));

//     if (subscribeNewsletter) await this.newsLetterCheck.check();
//     if (receiveOffers) await this.offersCheck.check();
//   }

//   async submitAccountInfo() {
//     await this.createAccount.click();
//   }

//   async waitForAccountCreated() {
//     await this.accountCreatedMessage.waitFor({ state: 'visible', timeout: 15000 });
//   }

//   async getAccountCreatedText() {
//     const text = await this.accountCreatedMessage.textContent();
//     return text?.trim();
//   }

//   async clickContinueAfterSignup() {
//     await this.continueButton.click();
//     await this.page.waitForLoadState('load');
//   }
// }

// module.exports = { AccountInfoPage };

// pages/AccountInfoPage.js
const { expect } = require('@playwright/test');

class AccountInfoPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle = page.locator('text=Enter Account Information');
    this.genderSelect = page.locator('#id_gender1, #id_gender2'); // pick based on CSV value
    this.passwordField = page.locator('#password');
    this.dayDropdown = page.locator('#days');
    this.monthDropdown = page.locator('#months');
    this.yearDropdown = page.locator('#years');
    this.newsLetterCheck = page.locator('#newsletter');
    this.offersCheck = page.locator('#optin');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.companyName = page.locator('#company');
    this.address1 = page.locator('#address1');
    this.address2 = page.locator('#address2');
    this.country = page.locator('#country');
    this.city = page.locator('#city');
    this.state = page.locator('#state');
    this.zipCode = page.locator('#zipcode');
    this.mobileNumber = page.locator('#mobile_number');
    this.createAccount = page.locator('[data-qa="create-account"]');
    this.continueButton = this.page.locator('a[data-qa="continue-button"]:visible').first();


  }

  async verifyPageTitle() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 15000 });
  }

  // --- helpers ---
  static monthToNumber(input) {
    if (!input) return null;
    const s = String(input).trim();
    // numeric: 6 or 06 -> '6'
    if (/^\d{1,2}$/.test(s)) {
      const n = parseInt(s, 10);
      return n >= 1 && n <= 12 ? String(n) : null;
    }
    // names: June, jun, JUN, September, Sept, etc.
    const map = {
      january: 1, jan: 1,
      february: 2, feb: 2,
      march: 3, mar: 3,
      april: 4, apr: 4,
      may: 5,
      june: 6, jun: 6,
      july: 7, jul: 7,
      august: 8, aug: 8,
      september: 9, sept: 9, sep: 9,
      october: 10, oct: 10,
      november: 11, nov: 11,
      december: 12, dec: 12,
    };
    const key = s.toLowerCase();
    return map[key] ? String(map[key]) : null;
  }

  async selectByValueOrLabel(locator, input) {
    // Try value first (for numeric month/day/year/country values)
    try {
      await locator.selectOption({ value: String(input) });
      return;
    } catch { /* fall through */ }
    // Then try visible text label
    await locator.selectOption({ label: String(input) });
  }

  async fillAccountInfo({
    gender, password, day, month, year,
    firstName, lastName, company, address1, address2,
    country, city, state, zipCode, mobileNo,
    newsletter = false, offers = false,
  }) {
    await this.verifyPageTitle();

    // Gender: your CSV uses id like "id_gender2"
    if (gender) {
      await this.page.locator(`#${gender}`).check({ force: true });
    }

    await this.passwordField.fill(password);

    // Day
    await this.selectByValueOrLabel(this.dayDropdown, String(day).trim());

    // Month (handle "June" or "6")
    const monthValue = AccountInfoPage.monthToNumber(month) ?? month;
    // Try value (e.g., '6'); if that fails, try label ('June')
    try {
      await this.monthDropdown.selectOption({ value: String(monthValue) });
    } catch {
      await this.monthDropdown.selectOption({ label: String(month) });
    }

    // Year (value usually equals the visible text)
    await this.selectByValueOrLabel(this.yearDropdown, String(year).trim());

    if (newsletter) await this.newsLetterCheck.check();
    if (offers) await this.offersCheck.check();

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.companyName.fill(company || '');
    await this.address1.fill(address1);
    await this.address2.fill(address2 || '');
    await this.selectByValueOrLabel(this.country, country); // works for "United States"
    await this.city.fill(city);
    await this.state.fill(state);
    await this.zipCode.fill(String(zipCode));
    await this.mobileNumber.fill(String(mobileNo));
  }

async submitCreateAccount() {
//  await this.page.pause();
  await this.createAccount.click();
}

 async clickContinueAfterSignup() {
  const continueBtn = this.page.locator('a[data-qa="continue-button"]');
  await continueBtn.waitFor({ state: 'visible' });
  await Promise.all([
    this.page.waitForLoadState('domcontentloaded'),
    continueBtn.click()
  ]);
}
}
module.exports = { AccountInfoPage };
