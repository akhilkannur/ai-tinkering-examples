// scripts/post-to-instagram.js
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

async function postToInstagram() {
  try {
    // 1. Pick a recipe (either from argument or random)
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

    console.log(`🎨 Preparing Instagram post for: ${data.title}`);

    // 2. Generate Instagram Image URL
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
    
    const outputPath = path.join(process.cwd(), 'public/temp_insta.jpg');
    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 90 });
    await browser.close();
    console.log(`✅ Screenshot saved to ${outputPath}`);

    // 4. Upload to Cloudinary (required for Instagram API to fetch)
    console.log('☁️ Uploading to Cloudinary...');
    const uploadResult = await cloudinary.uploader.upload(outputPath, {
      folder: 'instagram_posts',
      public_id: `insta_${data.id}_${Date.now()}`,
    });
    const publicImageUrl = uploadResult.secure_url;
    console.log(`✅ Public URL: ${publicImageUrl}`);

    // 5. Prepare Caption
    const caption = `🤖 NEW AI BLUEPRINT: ${data.title.toUpperCase()}

${data.description || data.tagline}

Build it yourself at realaiexamples.com/skills/${data.id}

#AI #Automation #AIBlueprints #FutureOfWork #SaaS #BuildInPublic #AIWorkflow`;

    console.log(`\n--- CAPTION PREVIEW ---`);
    console.log(caption);
    console.log(`-----------------------\n`);

    // 6. Post to Instagram (Requires Graph API)
    const instaId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!instaId || !accessToken) {
      console.log('⚠️ Instagram API credentials missing (INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN).');
      console.log('Skipping actual post. You can use the Cloudinary URL above to post manually.');
      return;
    }

    console.log('🚀 Publishing to Instagram...');
    
    // Step 1: Create media container
    const containerResponse = await fetch(`https://graph.facebook.com/v18.0/${instaId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: publicImageUrl,
        caption: caption,
        access_token: accessToken,
      }),
    });
    
    const containerData = await containerResponse.json();
    if (containerData.error) {
      throw new Error(`Media Container Error: ${containerData.error.message}`);
    }

    const creationId = containerData.id;

    // Step 2: Publish the container
    const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${instaId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    });

    const publishData = await publishResponse.json();
    if (publishData.error) {
      throw new Error(`Publish Error: ${publishData.error.message}`);
    }

    console.log('✅ SUCCESS! Post published to Instagram.');
    console.log(`Post ID: ${publishData.id}`);

    // Cleanup local file
    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

postToInstagram();
