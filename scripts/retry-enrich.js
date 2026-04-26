const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function enrichAndCapture(url, slug) {
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    
    console.log(`🔍 Retrying ${url}...`);
    
    // Try multiple wait strategies
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch (e) {
        console.log(`⚠️ Networkidle2 failed for ${url}, trying domcontentloaded...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }
    
    await new Promise(r => setTimeout(r, 5000));

    // 1. Scrape Content
    const data = await page.evaluate(() => {
      const getMeta = (name) => {
        const el = document.querySelector(`meta[name="${name}"], meta[property="og:${name}"], meta[property="twitter:${name}"]`);
        return el ? el.getAttribute('content') : '';
      };

      const bodyText = document.body.innerText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 30)
        .slice(0, 100)
        .join('\n');

      return {
        title: document.title,
        description: getMeta('description'),
        bodyText: bodyText.substring(0, 5000)
      };
    });

    // 2. Capture Screenshot
    const outputDir = path.join(process.cwd(), 'public', 'screenshots');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    
    const screenshotPath = path.join(outputDir, `${slug}.webp`);
    await page.screenshot({ path: screenshotPath, type: 'webp', quality: 80 });
    
    console.log(`✅ Captured ${slug}.webp`);
    return { ...data, screenshot: `/screenshots/${slug}.webp` };

  } catch (error) {
    console.error(`❌ Failed ${url}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function runRetryBatch() {
  const missingTools = JSON.parse(fs.readFileSync('missing_tools.json', 'utf8'));
  const results = [];

  for (const tool of missingTools) {
    const slug = tool.name.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
    const enriched = await enrichAndCapture(tool.url, slug);
    if (enriched) {
      results.push({
        ...tool,
        scraped: enriched
      });
    } else {
        results.push({ ...tool, failed: true });
    }
  }

  fs.writeFileSync('retry_results.json', JSON.stringify(results, null, 2));
  console.log(`\n🚀 Retry batch complete. Data saved to retry_results.json`);
}

runRetryBatch();
