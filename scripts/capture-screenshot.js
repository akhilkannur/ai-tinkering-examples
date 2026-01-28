const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

module.exports = async function captureScreenshot(url, filename) {
  // Config from memory: center-column cropping (x: 340, width: 600)
  const clip = { 
    x: 340, 
    y: 50, 
    width: 600, 
    height: 600 // Default height, capture enough context
  };

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // Set viewport to support the crop
    await page.setViewport({ width: 1280, height: 1024, deviceScaleFactor: 2 });
    
    console.log(`📸 Navigating to ${url}...`);
    // Timeout extended for X.com
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait for content to stabilize
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Clean up "Sign Up" / "Login" bottom bars if possible
    try {
        await page.evaluate(() => {
            const layers = document.querySelector('#layers');
            // Sometimes the login wall is in #layers, but removing it might break scrolling.
            // We'll leave it for now as we are just taking a screenshot of the top area.
        });
    } catch(e) {}

    const outputDir = path.join(process.cwd(), 'public', 'screenshots');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, filename);

    await page.screenshot({ path: outputPath, clip: clip });
    console.log(`✅ Screenshot saved to ${outputPath}`);
    
  } catch (error) {
    console.error("❌ Screenshot failed:", error.message);
  } finally {
    await browser.close();
  }
};
