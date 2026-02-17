const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// --- CONSTANTS ---
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/carousels');
const TEMP_DIR = path.join(process.cwd(), '.gemini/tmp');

// --- HELPER: Swiss CSS Generator ---
function getSwissCSS(accentColor = '#F04E30') {
  return `
    body {
      margin: 0; padding: 100px; width: 1080px; height: 1080px;
      background-color: #F5F5F0;
      font-family: 'Inter', Helvetica, Arial, sans-serif;
      display: flex; flex-direction: column; justify-content: center;
      box-sizing: border-box; 
      border-top: 30px solid ${accentColor};
      position: relative;
    }
    .badge {
      align-self: flex-start;
      padding: 12px 32px;
      border: 3px solid #111;
      border-radius: 100px;
      font-size: 24px; font-weight: 700; text-transform: uppercase; color: #111; letter-spacing: 0.05em; 
      margin-bottom: 80px;
    }
    .title {
      font-size: 150px; font-weight: 900; color: #111; line-height: 0.85; margin-bottom: 50px; letter-spacing: -0.06em;
    }
    .title span { color: ${accentColor}; }
    .tagline {
      font-size: 48px; color: #555; font-weight: 500; line-height: 1.3; max-width: 900px;
      margin-top: 20px;
    }
    .footer {
      margin-top: auto; 
      font-size: 20px; color: #888; font-weight: 600; letter-spacing: 0.1em; font-family: monospace; text-transform: uppercase;
      width: 100%; border-top: 1px solid #ddd; padding-top: 30px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .swipe-indicator {
      display: flex; align-items: center; gap: 10px;
      font-size: 24px; color: #111; font-weight: 700;
    }
    .arrow-circle {
      width: 60px; height: 60px; border-radius: 50%; border: 3px solid #111;
      display: flex; align-items: center; justify-content: center;
      font-size: 32px;
    }
  `;
}

// --- HELPER: HTML Generator ---
function generateHTML(data, index, total, accentColor) {
  const isLastSlide = index === total;
  const footerRight = isLastSlide 
    ? '<span>Link in Bio 🔗</span>' 
    : `<div class="swipe-indicator">SWIPE <div class="arrow-circle">&rarr;</div></div>`;

  // Highlight logic: Wrap numbers, "Stop", "Formula" in span
  const highlightedTitle = data.title.replace(/(\d+%?|Stop|Formula|Alert|❌|✅)/g, '<span>$1</span>');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=1080, height=1080, initial-scale=1.0">
      <style>${getSwissCSS(accentColor)}</style>
    </head>
    <body>
      <div class="badge">${data.category}</div>
      <div class="title">${highlightedTitle}</div>
      <div class="tagline">${data.tagline || ''}</div>
      <div class="footer">
        <span>Series 01 // Slide ${index}/${total}</span>
        ${footerRight}
      </div>
    </body>
    </html>
  `;
}

// --- MAIN: Generation Logic ---
async function generateCarousel(inputJSON) {
  console.log(`🎨 Generating ${inputJSON.slides.length} slides for: ${inputJSON.topic}`);
  
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = Date.now();
  const filePaths = [];

  for (let i = 0; i < inputJSON.slides.length; i++) {
    const slide = inputJSON.slides[i];
    const index = i + 1;
    const html = generateHTML(slide, index, inputJSON.slides.length, inputJSON.accentColor);
    
    const tempHtmlPath = path.join(TEMP_DIR, `carousel_${timestamp}_${index}.html`);
    fs.writeFileSync(tempHtmlPath, html);

    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
    
    // Clean topic name for filename
    const safeTopic = inputJSON.topic.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const outputPath = path.join(OUTPUT_DIR, `${safeTopic}-slide-${index}.png`);
    
    await page.screenshot({ path: outputPath });
    filePaths.push(outputPath);
    console.log(`   ✅ Slide ${index} saved: ${outputPath}`);

    fs.unlinkSync(tempHtmlPath); // Cleanup temp HTML
  }

  await browser.close();
}

// --- CLI ENTRY POINT ---
// Usage: node generate_carousel.js <json_file_path>
const jsonPath = process.argv[2];

if (!jsonPath) {
  console.error("Usage: node generate_carousel.js <path_to_content.json>");
  process.exit(1);
}

try {
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  generateCarousel(content);
} catch (e) {
  console.error("❌ Error reading JSON or generating slides:", e.message);
}