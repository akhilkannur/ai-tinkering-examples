const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

  const outputDir = path.join(process.cwd(), 'internal-marketing', 'temp');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Capture Hero
  console.log("📸 Capturing Hero...");
  await page.goto('https://realaiexamples.com', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    // Hide newsletter popup if it exists
    const popup = document.querySelector('[class*="NewsletterPopup"]');
    if (popup) popup.style.display = 'none';
  });
  await page.screenshot({ 
    path: path.join(outputDir, 'hero-raw.png'),
    clip: { x: 0, y: 0, width: 1200, height: 600 } 
  });

  // 2. Capture Grid
  console.log("📸 Capturing Blueprints Grid...");
  // Scroll down to the grid
  await page.evaluate(() => {
    window.scrollTo(0, 800);
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({ 
    path: path.join(outputDir, 'grid-raw.png'), 
    clip: { x: 0, y: 800, width: 1200, height: 600 } 
  });

  await browser.close();
  console.log("✅ Raw shots captured in internal-marketing/temp/");
}

capture();
