// scripts/post-to-pinterest.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;

// Configuration
const RECIPES_DIR = path.join(process.cwd(), 'content/recipes');
const BASE_URL = 'https://realaiexamples.com';

// Cloudinary Setup
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function postToPinterest() {
  try {
    // 1. Pick a recipe
    const specificId = process.argv[2];
    let recipeFile;
    
    if (specificId) {
      recipeFile = `${specificId}.md`;
      if (!fs.existsSync(path.join(RECIPES_DIR, recipeFile))) {
        console.error(`❌ Recipe not found: ${specificId}`);
        process.exit(1);
      }
    } else {
      const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
      recipeFile = files[Math.floor(Math.random() * files.length)];
    }

    const filePath = path.join(RECIPES_DIR, recipeFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    if (!data.title || !data.category) {
      console.error('❌ Invalid recipe data');
      return;
    }

    console.log(`📌 Preparing Pinterest Pin for: ${data.title}`);

    // 2. Generate Image URL (Reuse 1080x1080 Instagram format)
    const ogUrl = `${BASE_URL}/api/og?format=insta&title=${encodeURIComponent(data.title)}&category=${encodeURIComponent(data.category)}&tagline=${encodeURIComponent(data.tagline || '')}`;
    
    // 3. Capture the image using Puppeteer
    console.log('📸 Capturing screenshot...');
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080 });
    await page.goto(ogUrl, { waitUntil: 'networkidle0' });
    
    const outputPath = path.join(process.cwd(), 'public/temp_pinterest.jpg');
    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 90 });
    await browser.close();

    // 4. Upload to Cloudinary
    console.log('☁️ Uploading to Cloudinary...');
    const uploadResult = await cloudinary.uploader.upload(outputPath, {
      folder: 'pinterest_pins',
      public_id: `pin_${data.id}_${Date.now()}`,
    });
    const publicImageUrl = uploadResult.secure_url;

    // 5. Prepare Pin Data
    const title = `AI Blueprint: ${data.title}`;
    const description = `${data.description || data.tagline} - Build this AI workflow at Real AI Examples. #AI #Automation #WorkFlow #SaaS`;
    const targetLink = `${BASE_URL}/skills/${data.id}`;

    // 6. Post to Pinterest API (V5)
    const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
    const boardId = process.env.PINTEREST_BOARD_ID;

    if (!accessToken || !boardId) {
      console.log('⚠️ Pinterest API credentials missing (PINTEREST_ACCESS_TOKEN, PINTEREST_BOARD_ID).');
      console.log('Public Image URL:', publicImageUrl);
      console.log('Target Link:', targetLink);
      console.log('Skipping actual post.');
      return;
    }

    console.log('🚀 Publishing Pin...');
    
    const response = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        link: targetLink,
        media_source: {
          source_type: 'image_url',
          url: publicImageUrl,
        },
        board_id: boardId,
      }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(`Pinterest API Error: ${result.message || JSON.stringify(result.error)}`);
    }

    console.log('✅ SUCCESS! Pin published.');
    console.log(`Pin URL: https://www.pinterest.com/pin/${result.id}/`);

    // Cleanup
    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

postToPinterest();
