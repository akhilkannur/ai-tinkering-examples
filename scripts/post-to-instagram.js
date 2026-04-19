// scripts/post-to-instagram.js
// Load .env.local first (overrides)
require('dotenv').config({ path: '.env.local' });
// Load .env (defaults)
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

async function uploadToCloudinary(filePath) {
  console.log(`☁️ Uploading ${path.basename(filePath)} to Cloudinary...`);
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: 'instagram_posts',
    public_id: `insta_${path.basename(filePath, path.extname(filePath))}_${Date.now()}`,
  });
  return uploadResult.secure_url;
}

async function createContainer(instaId, accessToken, imageUrl, isCarouselItem = false) {
  const url = `https://graph.facebook.com/v18.0/${instaId}/media`;
  const body = {
    image_url: imageUrl,
    access_token: accessToken,
    is_carousel_item: isCarouselItem
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (data.error) throw new Error(`Container Error: ${data.error.message}`);
  return data.id;
}

async function publishMedia(instaId, accessToken, creationId) {
  const url = `https://graph.facebook.com/v18.0/${instaId}/media_publish`;
  const body = {
    creation_id: creationId,
    access_token: accessToken,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (data.error) throw new Error(`Publish Error: ${data.error.message}`);
  return data.id;
}

async function postCarousel(instaId, accessToken, imagePaths, caption) {
  console.log(`🚀 Preparing Carousel with ${imagePaths.length} images...`);
  
  // 1. Upload all images and create Item Containers
  const containerIds = [];
  for (const imgPath of imagePaths) {
    const publicUrl = await uploadToCloudinary(imgPath);
    const containerId = await createContainer(instaId, accessToken, publicUrl, true);
    containerIds.push(containerId);
    console.log(`   - Created Item Container: ${containerId}`);
  }

  // 2. Create Carousel Container
  console.log('📦 Creating Carousel Container...');
  const url = `https://graph.facebook.com/v18.0/${instaId}/media`;
  const body = {
    media_type: 'CAROUSEL',
    children: containerIds,
    caption: caption,
    access_token: accessToken,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (data.error) throw new Error(`Carousel Container Error: ${data.error.message}`);
  const creationId = data.id;

  // 3. Wait for processing (Carousel containers take time)
  console.log('⏳ Waiting 30 seconds for Instagram to process the carousel...');
  await new Promise(resolve => setTimeout(resolve, 30000));

  // 4. Publish
  console.log(`🚀 Publishing Carousel (ID: ${creationId})...`);
  const publishId = await publishMedia(instaId, accessToken, creationId);
  console.log(`✅ SUCCESS! Carousel published. Post ID: ${publishId}`);
}

async function postSingleImage(instaId, accessToken, imagePath, caption) {
  const publicUrl = await uploadToCloudinary(imagePath);
  
  // Create Media Container with caption
  const url = `https://graph.facebook.com/v18.0/${instaId}/media`;
  const body = {
    image_url: publicUrl,
    caption: caption,
    access_token: accessToken,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (data.error) throw new Error(`Media Container Error: ${data.error.message}`);
  
  const publishId = await publishMedia(instaId, accessToken, data.id);
  console.log(`✅ SUCCESS! Post published. Post ID: ${publishId}`);
}

async function main() {
  try {
    const mode = process.argv[2]; // 'carousel' or 'single' (or recipe ID for single)
    const instaId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!instaId || !accessToken) {
      console.error('⚠️ Instagram API credentials missing.');
      return;
    }

    if (mode === 'carousel') {
      // Usage: node scripts/post-to-instagram.js carousel <caption_file> <img1> <img2> ...
      const captionFile = process.argv[3];
      const imageArgs = process.argv.slice(4);

      if (!captionFile || imageArgs.length === 0) {
        console.error("Usage: node scripts/post-to-instagram.js carousel <caption_file> <img1> <img2> ...");
        return;
      }

      if (!fs.existsSync(captionFile)) {
        console.error(`❌ Caption file not found: ${captionFile}`);
        return;
      }

      const caption = fs.readFileSync(captionFile, 'utf8');
      
      // Resolve paths relative to CWD
      const validFiles = imageArgs
        .map(p => path.resolve(process.cwd(), p))
        .filter(p => fs.existsSync(p));

      if (validFiles.length === 0) {
        console.error('❌ No valid images found.');
        return;
      }

      console.log(`Found ${validFiles.length} images to post.`);
      await postCarousel(instaId, accessToken, validFiles, caption);

    } else {
      // Default / Single mode (existing logic adapted)
      // 1. Pick a recipe
      let recipeFile;
      if (mode) {
        recipeFile = `${mode}.md`;
        if (!fs.existsSync(path.join(RECIPES_DIR, recipeFile))) {
          console.error(`❌ Recipe not found: ${mode}`);
          process.exit(1);
        }
      } else {
        const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
        recipeFile = files[Math.floor(Math.random() * files.length)];
      }

      const filePath = path.join(RECIPES_DIR, recipeFile);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      // Generate Image (using same logic as before, simplified here)
      const ogUrl = `${BASE_URL}/api/og?format=insta&title=${encodeURIComponent(data.title)}&category=${encodeURIComponent(data.category)}&tagline=${encodeURIComponent(data.tagline || '')}`;
      
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

      const caption = `🤖 NEW AI BLUEPRINT: ${data.title.toUpperCase()}

${data.description || data.tagline}

Build it yourself at realaiexamples.com/

#AI #Automation #AIBlueprints`;

      await postSingleImage(instaId, accessToken, outputPath, caption);
      fs.unlinkSync(outputPath);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
