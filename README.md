
Playwright Automation Project – Automation Exercise
Overview

This project automates the UI testing of automationexercise.com
 using Playwright

It currently covers Signup, Login, and Account Management flows with data-driven testing and follows Page Object Model (POM) design for better maintainability.

🛠 Tech Stack

Playwright – UI test automation

JavaScript / Node.js

CSV – test data input

Page Object Model (POM) – clean test design

Project Structure
playwright-automationexercise/
│── pages/            # Page Object classes (SignupPage, AccountInfoPage, LogOutPage, etc.)
│── tests/            # Test specs (Signup, Login flows)
│── utils/            # Utility files (CSV reader)
│── config/           # Environment configs
│── testdata/         # CSV files for test data
│── playwright.config.js
│── package.json

 Features Implemented

Signup flow with CSV-driven test data

 Account Information Page automation (dropdowns, checkboxes, text fields)

 Login & Logout flows

 Auth test using storage state for faster login (avoiding repeated UI login)

 Tests running in headed/headless modes

 Debugging with page.pause()

 Running Tests
Install dependencies
npm install

Run all tests (headless by default)
npx playwright test

Run tests in headed mode
npx playwright test --headed

Run a specific test
npx playwright test tests/SignupTest.spec.js

Debug mode
npx playwright test --debug

Next Steps

 Add negative test cases with screenshots

 Implement parallel test execution

 Run in multiple browsers (Chromium, Firefox, WebKit)

 Integrate with CI/CD (GitHub Actions)

 Add custom reporting (Allure / HTML reports)

 Expand coverage to Cart, Checkout, and Orders modules

Author

Saranya Seenivasan – Aspiring SDET | Redmond, WA
🔗 GitHub Projects
