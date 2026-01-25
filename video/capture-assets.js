const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // 1. Capture Homepage (Mobile View for Vertical Video)
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  console.log('Navigating to Homepage...');
  await page.goto('https://realaiexamples.com', { waitUntil: 'networkidle0' });
  
  // Clean up any popups if possible (optional)
  
  await page.screenshot({ path: 'video/public/homepage.png', fullPage: true });
  console.log('Saved homepage.png');

  // 2. Capture Blueprint Page
  console.log('Navigating to Blueprint...');
  await page.goto('https://realaiexamples.com/blueprints/competitor-spy', { waitUntil: 'networkidle0' });
  
  // Scroll down a bit to show the content/copy button
  await page.evaluate(() => window.scrollBy(0, 200));
  
  await page.screenshot({ path: 'video/public/blueprint.png' });
  console.log('Saved blueprint.png');

  // 3. Capture Chat Interface (Mock or Real)
  // Since we can't easily login to ChatGPT/Claude, we'll stick to the "Copy" action on the site
  // or use the 'Spreadsheet' view if available.
  // For now, these 2 real screenshots are the core assets.

  await browser.close();
})();
