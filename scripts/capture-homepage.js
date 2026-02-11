const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // High resolution for crisp screenshots
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const outputDir = path.join(process.cwd(), 'internal-marketing');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log("📸 Navigating to https://realaiexamples.com...");
  await page.goto('https://realaiexamples.com', { waitUntil: 'networkidle2' });
  
  // Wait for content to settle
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 1. Hero Shot (Standard 1200x630 for directories/social)
  console.log("📸 Capturing Hero Shot...");
  await page.screenshot({ 
    path: path.join(outputDir, 'homepage-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 750 } 
  });

  // 2. Full Desktop Shot
  console.log("📸 Capturing Full Desktop Shot...");
  await page.screenshot({ 
    path: path.join(outputDir, 'homepage-desktop.png')
  });

  await browser.close();
  console.log("✅ Screenshots saved to internal-marketing/");
}

capture();
