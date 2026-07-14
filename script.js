const fs = require("fs");
require('dotenv').config();
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true, // Use false only when testing locally
  });

  const page = await browser.newPage();

console.log("Opening page...");

const response = await page.goto(
  "https://www.instagram.com/accounts/login/",
  {
    waitUntil: "load",
    timeout: 60000,
  }
);

console.log("Status:", response?.status());
console.log("Final URL:", page.url());
console.log("Title:", await page.title());

await page.waitForTimeout(5000);

console.log("Body length:", (await page.content()).length);

await page.screenshot({
  path: "login-page.png",
  fullPage: true,
});

fs.writeFileSync("login-page.html", await page.content());

  console.log("Saved screenshot and HTML.");
/*  // Accept cookies if the button appears
  try {
    await page.getByRole('button', { name: /allow all cookies|accept all/i }).click({
      timeout: 5000,
    });
  } catch {}

  // Fill login form
  await page.locator('input[aria-label="Username, email address or mobile number"]').fill("konbola57");
  await page.locator('input[name="password"]').fill("8789522186a");

  // Click Log in
  await page.getByRole('button', { name: /log in/i }).click();

  // Wait for login to complete
  await page.waitForURL(/instagram\.com/, {
    timeout: 30000,
  });

  console.log("Logged in successfully!");

  // Visit a profile
  await page.goto('https://www.instagram.com/code.candyy/', {
    waitUntil: 'networkidle',
  });

// Go to profile
await page.goto('https://www.instagram.com/code.candyy/', {
  waitUntil: 'networkidle',
});

// Click the username in the profile header
await page.locator('header').getByText('code.candyy', { exact: true }).click();

// Wait for the menu
await page.waitForSelector('text=About this account');

// Open About this account
await page.getByText('About this account').click();

// Wait for dialog
await page.waitForSelector('text=Account based in');

const country = await page.locator(
  'span:has-text("Account based in") + span'
).textContent();

console.log(country?.trim());*/

  await browser.close();
})();
