const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureScreenshot(url, outputName = 'screenshot.png', options = {}) {
  if (!url) {
    console.error('Please provide a URL');
    process.exit(1);
  }

  // Default clipping coordinates for focusing on main content
  // These can be adjusted based on the platform (Twitter, LinkedIn, etc.)
  const defaultClip = {
    x: 0,      // Starting x coordinate
    y: 0,      // Starting y coordinate
    width: 1280, // Width of the area to capture
    height: 800  // Height of the area to capture
  };

  // Platform-specific presets to focus on relevant content
  const presets = {
    twitter: { x: 340, y: 50, width: 600, height: 800 },  // Focus on centered tweet content (1280/2 - 600/2 = 340)
    x: { x: 340, y: 50, width: 600, height: 800 },       // Same as Twitter
    linkedin: { x: 150, y: 50, width: 900, height: 600 }, // Focus on feed with 25% margins
    github: { x: 0, y: 0, width: 1280, height: 800 },     // Full page for code repos
    default: defaultClip
  };

  // Determine which preset to use based on URL
  let clip = defaultClip;
  if (url.includes('twitter.com') || url.includes('x.com')) {
    clip = presets.twitter;
  } else if (url.includes('linkedin.com')) {
    clip = presets.linkedin;
  } else if (url.includes('github.com')) {
    clip = presets.github;
  }

  // Override with custom options if provided
  if (options.clip) {
    clip = { ...clip, ...options.clip };
  }

  console.log(`🚀 Launching browser to capture: ${url}`);
  console.log(`✂️  Using clipping coordinates:`, clip);

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
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });

    // Wait a bit for any lazy-loaded content
    await new Promise(resolve => setTimeout(resolve, 2000));

    const outputPath = path.join(process.cwd(), 'public', 'screenshots', outputName);

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log(`📸 Taking screenshot with clipping...`);
    await page.screenshot({
      path: outputPath,
      clip: clip,  // Apply the clipping rectangle
      type: 'jpeg', // Use JPEG for smaller file sizes
      quality: 85   // Good balance between quality and file size
    });

    console.log(`✅ Screenshot saved to: ${outputPath}`);

    return outputPath;
  } catch (error) {
    console.error(`❌ Error capturing screenshot: ${error.message}`);
  } finally {
    await browser.close();
  }
}

// Only parse command line arguments and run when executed directly
if (require.main === module) {
  // Parse command line arguments
  const url = process.argv[2];
  const output = process.argv[3];
  const customClip = process.argv[4] ? JSON.parse(process.argv[4]) : {};

  captureScreenshot(url, output, { clip: customClip });
}

module.exports = captureScreenshot;
