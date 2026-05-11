const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const LOG_FILE = path.join(process.cwd(), 'indexed_google.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

async function indexUrls() {
  console.log('📖 Reading sitemap...');
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ Sitemap not found');
    return;
  }

  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    // Only index tool pages as requested
    if (match[1].includes('/tools/')) {
      urls.push(match[1]);
    }
  }

  console.log(`✅ Found ${urls.length} tool URLs in sitemap.`);

  let indexedUrls = [];
  if (fs.existsSync(LOG_FILE)) {
    indexedUrls = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  }

  const toIndex = urls.filter(url => !indexedUrls.includes(url));
  console.log(`🚀 ${toIndex.length} URLs need indexing.`);

  if (toIndex.length === 0) {
    console.log('🎉 All tool URLs already indexed in this session log.');
    return;
  }

  const indexing = google.indexing('v3');

  // Google Indexing API limit is usually 200 per day
  const BATCH_SIZE = 190; 
  const currentBatch = toIndex.slice(0, BATCH_SIZE);

  for (const url of currentBatch) {
    try {
      console.log(`🔗 Indexing: ${url}`);
      await indexing.urlNotifications.publish({
        auth,
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      indexedUrls.push(url);
      // Small delay to be nice
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Error indexing ${url}:`, error.message);
      if (error.message.includes('quota') || error.message.includes('LimitExceeded')) {
        console.log('🛑 Quota hit. Stopping for today.');
        break;
      }
    }
  }

  fs.writeFileSync(LOG_FILE, JSON.stringify(indexedUrls, null, 2));
  console.log(`\n📝 Updated log. Total indexed: ${indexedUrls.length}`);
  if (toIndex.length > BATCH_SIZE) {
    console.log(`⏳ ${toIndex.length - BATCH_SIZE} URLs remaining for tomorrow.`);
  }
}

indexUrls();
