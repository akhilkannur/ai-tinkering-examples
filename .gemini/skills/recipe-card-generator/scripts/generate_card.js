const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

async function generateCard(recipeId, style = 'editorial') {
  const filePath = path.join(process.cwd(), 'content/recipes', `${recipeId}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Recipe not found: ${recipeId}`);
    return;
  }

  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  
  let css = '';
  let bodyContent = '';

  if (style === 'swiss') {
    css = `
      body {
        margin: 0; padding: 100px; width: 1080px; height: 1080px;
        background-color: #F5F5F0;
        font-family: 'Inter', Helvetica, Arial, sans-serif;
        display: flex; flex-direction: column; justify-content: center;
        box-sizing: border-box; 
        border-top: 30px solid #F04E30; /* International Orange Top Bar */
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
      .title span { color: #F04E30; }
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
    bodyContent = `
      <div class="badge">${data.category || 'Work Automation'}</div>
      <div class="title">${data.title.replace(/(\d+%?|Stop|Formula|Alert)/g, '<span>$1</span>')}</div>
      <div class="tagline">${data.tagline || ''}</div>
      <div class="footer">
        <span>Series 01 // Blueprint</span>
        <div class="swipe-indicator">
          SWIPE
          <div class="arrow-circle">&rarr;</div>
        </div>
      </div>
    `;
  } else if (style === 'raw') {
    css = `
      body {
        margin: 0; padding: 120px; width: 1080px; height: 1080px;
        background-color: #FDFBF7;
        background-image: linear-gradient(#E1E1E1 1px, transparent 1px);
        background-size: 100% 60px;
        font-family: 'Courier New', monospace;
        display: flex; flex-direction: column; justify-content: flex-start;
        box-sizing: border-box;
      }
      .badge {
        display: inline-block; border: 4px solid #000; padding: 16px 32px;
        font-size: 32px; font-weight: 700; text-transform: uppercase; color: #000; margin-bottom: 80px;
        align-self: flex-start;
      }
      .title {
        font-size: 100px; font-weight: 700; color: #000; line-height: 1.1; margin-bottom: 60px;
      }
      .tagline {
        font-size: 42px; color: #444; line-height: 1.5; max-width: 850px;
      }
      .footer {
        margin-top: auto; font-size: 28px; color: #000; border-top: 4px solid #000; padding-top: 40px; width: 100%; display: flex; justify-content: space-between;
      }
    `;
    bodyContent = `
      <div class="badge">${data.category || 'Work Automation'}</div>
      <div class="title">${data.title}</div>
      <div class="tagline">${data.tagline || ''}</div>
      <div class="footer">
        <span>// realaiexamples.com</span>
        <span>Blueprint #${Math.floor(Math.random() * 1000)}</span>
      </div>
    `;
  } else {
    // Default 'Editorial Dark'
    css = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
      body {
        margin: 0; padding: 0; width: 1080px; height: 1080px;
        background-color: #111111;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        box-sizing: border-box; position: relative; overflow: hidden; border: 20px solid #111111;
      }
      .noise {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        z-index: 1; pointer-events: none;
      }
      .badge {
        background-color: #D4FF00; color: #111111; padding: 16px 48px; border-radius: 100px;
        font-size: 36px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 60px; z-index: 2;
        box-shadow: 0 10px 30px rgba(212, 255, 0, 0.2);
      }
      .content { display: flex; flex-direction: column; align-items: center; text-align: center; z-index: 2; width: 900px; }
      .title { font-size: 140px; font-weight: 900; color: white; line-height: 0.9; margin-bottom: 50px; letter-spacing: -0.04em; text-shadow: 0 10px 30px rgba(0,0,0,0.5); }
      .title span { color: #D4FF00; }
      .tagline { font-size: 56px; color: #94a3b8; font-weight: 500; line-height: 1.3; max-width: 800px; }
      .footer { position: absolute; bottom: 80px; display: flex; justify-content: center; align-items: center; z-index: 2; width: 100%; }
      .brand { font-size: 32px; color: #475569; font-weight: 600; letter-spacing: 0.05em; font-family: monospace; opacity: 0.8; }
    `;
    bodyContent = `
      <div class="noise"></div>
      <div class="badge">${data.category || 'Work Automation'}</div>
      <div class="content">
        <div class="title">${data.title.replace(/(\d+%?|Stop|Formula|Alert)/g, '<span>$1</span>')}</div>
        <div class="tagline">${data.tagline || ''}</div>
      </div>
      <div class="footer"><div class="brand">realaiexamples.com</div></div>
    `;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=1080, height=1080, initial-scale=1.0">
      <style>${css}</style>
    </head>
    <body>${bodyContent}</body>
    </html>
  `;

  // Save to a temp file
  const tempHtmlPath = path.join(process.cwd(), '.gemini/tmp', `temp_card_${recipeId}.html`);
  if (!fs.existsSync(path.dirname(tempHtmlPath))) {
      fs.mkdirSync(path.dirname(tempHtmlPath), { recursive: true });
  }
  fs.writeFileSync(tempHtmlPath, htmlContent);

  console.log(`📸 Generating card for: ${data.title} [Style: ${style}]`);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
  
  const outputDir = path.join(process.cwd(), 'public/images/recipes');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${recipeId}-${style}.png`);
  await page.screenshot({ path: outputPath });
  await browser.close();
  
  // Cleanup
  fs.unlinkSync(tempHtmlPath);
  
  console.log(`✅ Success! Card saved to ${outputPath}`);
}

const recipeIdArg = process.argv[2];
const styleArg = process.argv[3];
if (!recipeIdArg) {
  console.error("Please provide a recipe ID.");
} else {
  generateCard(recipeIdArg, styleArg);
}
