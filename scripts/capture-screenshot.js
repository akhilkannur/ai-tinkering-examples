const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

module.exports = async function captureScreenshot(url, filename) {
  const isGithub = url.includes('github.com');
  
  // Platform-specific config
  const config = isGithub ? {
    clip: { x: 0, y: 0, width: 1280, height: 800 },
    waitFor: '.application-main',
    viewport: { width: 1280, height: 800, deviceScaleFactor: 2 }
  } : {
    // Default / Twitter config
    clip: { x: 150, y: 50, width: 900, height: 600 },
    waitFor: 'article[data-testid="tweet"]',
    viewport: { width: 1280, height: 1024, deviceScaleFactor: 2 }
  };

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // Set a realistic User-Agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    
    // Set viewport
    await page.setViewport(config.viewport);
    
    console.log(`📸 Navigating to ${url}...`);
    // Use 'domcontentloaded' as X can take a long time to 'networkidle2'
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    
    // Wait for the main content to appear
    try {
        await page.waitForSelector(config.waitFor, { timeout: 30000 });
    } catch (e) {
        console.log(`⚠️ Selector ${config.waitFor} not found, waiting 10s anyway...`);
    }
    
    // Wait for content to stabilize
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Clean up "Sign Up" / "Login" bottom bars and overlays (Mainly for Twitter)
    if (!isGithub) {
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
    }

    const outputDir = path.join(process.cwd(), 'public', 'screenshots');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, filename);

    await page.screenshot({ path: outputPath, clip: config.clip });
    console.log(`✅ Screenshot saved to ${outputPath}`);
    
  } catch (error) {
    console.error("❌ Screenshot failed:", error.message);
  } finally {
    await browser.close();
  }
};
