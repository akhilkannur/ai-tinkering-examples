const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 2 });

  const outputDir = path.join(process.cwd(), 'internal-marketing', 'temp');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 1. Capture Archetypes Grid
  console.log("📸 Capturing Archetypes Grid...");
  await page.goto('https://realaiexamples.com/ai-workplace-quiz', { waitUntil: 'networkidle2' });
  
  // Try to find the section with archetypes or the intro
  await page.screenshot({ 
    path: path.join(outputDir, 'archetypes-raw.png'),
    clip: { x: 0, y: 0, width: 1200, height: 600 } 
  });

  await browser.close();
  console.log("✅ Archetype shot captured.");
}

capture();
