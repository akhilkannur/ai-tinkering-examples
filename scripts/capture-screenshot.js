const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureScreenshot(url, outputName = 'screenshot.png') {
  if (!url) {
    console.error('Please provide a URL');
    process.exit(1);
  }

  console.log(`🚀 Launching browser to capture: ${url}`);
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait a bit for any lazy-loaded content
    await new Promise(resolve => setTimeout(resolve, 2000));

    const outputPath = path.join(process.cwd(), 'public', 'screenshots', outputName);
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log(`📸 Taking screenshot...`);
    await page.screenshot({
      path: outputPath,
      fullPage: false // Change to true if full page is needed
    });

    console.log(`✅ Screenshot saved to: ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.error(`❌ Error capturing screenshot: ${error.message}`);
  } finally {
    await browser.close();
  }
}

const url = process.argv[2];
const output = process.argv[3];

if (require.main === module) {
  captureScreenshot(url, output);
}

module.exports = captureScreenshot;
