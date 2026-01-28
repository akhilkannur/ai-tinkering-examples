const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

module.exports = async function captureScreenshot(url, filename) {
  // Reverting to "Saved" Config from SCREENSHOT_AUTOMATION.md
  // This provides a wider capture that doesn't cut off text
  const clip = { 
    x: 150, 
    y: 50, 
    width: 900, 
    height: 600 
  };

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // Set a realistic User-Agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    
    // Set viewport to support the crop
    await page.setViewport({ width: 1280, height: 1024, deviceScaleFactor: 2 });
    
    console.log(`📸 Navigating to ${url}...`);
    // Use 'domcontentloaded' as X can take a long time to 'networkidle2'
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    
    // Wait for the main tweet container to appear
    try {
        await page.waitForSelector('article[data-testid="tweet"]', { timeout: 30000 });
    } catch (e) {
        console.log("⚠️ Tweet article not found, waiting 10s anyway...");
    }
    
    // Wait for content to stabilize
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Clean up "Sign Up" / "Login" bottom bars and overlays
    try {
        await page.evaluate(() => {
            // Remove the login wall/signup prompt if it exists
            const layers = document.querySelector('#layers');
            if (layers) {
                // Check if it's a login wall (usually has a high z-index and fixed position)
                const layerContent = layers.innerText || '';
                if (layerContent.includes('Sign up') || layerContent.includes('Log in') || layerContent.includes('Don’t miss what’s happening')) {
                    layers.style.display = 'none';
                }
            }

            // Remove the bottom "Don't miss what's happening" bar
            const bottomBar = document.querySelector('div[data-testid="BottomBar"]');
            if (bottomBar) bottomBar.style.display = 'none';

            // Remove any other common overlays
            const cookieBanner = document.querySelector('#cookie-banner');
            if (cookieBanner) cookieBanner.style.display = 'none';
        });
    } catch(e) {
        console.log("⚠️ Failed to clean up overlays:", e.message);
    }

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
