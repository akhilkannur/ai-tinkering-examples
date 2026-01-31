
const puppeteer = require('puppeteer');
(async () => {
  try {
    console.log("Launching...");
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log("Launched!");
    const page = await browser.newPage();
    await page.goto('https://example.com');
    console.log("Title:", await page.title());
    await browser.close();
  } catch (e) {
    console.error("Fail:", e.message);
  }
})();
