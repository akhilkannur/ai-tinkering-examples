const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

async function generateCard(recipeId) {
  const filePath = path.join(process.cwd(), 'content/recipes', `${recipeId}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Recipe not found: ${recipeId}`);
    return;
  }

  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  const baseUrl = 'https://realaiexamples.com';
  const ogUrl = `${baseUrl}/api/og?format=insta&title=${encodeURIComponent(data.title)}&category=${encodeURIComponent(data.category)}&tagline=${encodeURIComponent(data.tagline || '')}`;

  console.log(`📸 Generating card for: ${data.title}`);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
  await page.goto(ogUrl, { waitUntil: 'networkidle0' });
  
  const outputDir = path.join(process.cwd(), 'public/images/recipes');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${recipeId}-card.png`);
  await page.screenshot({ path: outputPath });
  await browser.close();
  
  console.log(`✅ Success! Card saved to ${outputPath}`);
}

const recipeId = process.argv[2];
if (!recipeId) {
  console.error("Please provide a recipe ID.");
} else {
  generateCard(recipeId);
}
