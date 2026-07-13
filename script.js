const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/');

  // Log in manually the first time or automate login.

  await page.goto('https://www.instagram.com/exampleuser/');

  // Click the "About this account" button
  await page.getByText('About this account').click();

  const text = await page.locator('body').innerText();

  const match = text.match(/Account based in\s+(.+)/);

  if (match) {
    console.log(match[1]);
  }

  await browser.close();
})();
