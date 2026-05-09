const https = require('https');
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const HOST = 'realaiexamples.com';
const KEY = '14ae016fb6ca333de38554bc499b50e9'; 
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXED_LOG_PATH = path.join(process.cwd(), 'indexed_tools.json');
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const TOOLS_DATA_PATH = path.join(process.cwd(), 'lib', 'ai-tools-data.ts');

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

// 1. Read already indexed URLs/slugs
let indexedItems = [];
if (fs.existsSync(INDEXED_LOG_PATH)) {
  try {
    indexedItems = JSON.parse(fs.readFileSync(INDEXED_LOG_PATH, 'utf8'));
  } catch (e) {
    console.error('⚠️ Could not parse indexed_tools.json, starting fresh.');
  }
}

const allUrlsToIndex = [];

// 2. Get URLs from Sitemap
console.log('📖 Reading sitemap...');
if (fs.existsSync(SITEMAP_PATH)) {
  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    allUrlsToIndex.push(match[1]);
  }
}

// 3. Get URLs from tools data (in case they are not in sitemap yet)
console.log('📖 Reading tools data...');
if (fs.existsSync(TOOLS_DATA_PATH)) {
  const toolsContent = fs.readFileSync(TOOLS_DATA_PATH, 'utf8');
  const toolRegex = /name:\s*"(.*?)"/g;
  let match;
  while ((match = toolRegex.exec(toolsContent)) !== null) {
    const slug = slugify(match[1]);
    const toolUrl = `https://${HOST}/tools/${slug}`;
    if (!allUrlsToIndex.includes(toolUrl)) {
      allUrlsToIndex.push(toolUrl);
    }
  }
}

// 4. Filter for items that haven't been indexed yet
// We check if the full URL or the slug is in the indexedItems list
const toIndex = allUrlsToIndex.filter(url => {
  const isIndexed = indexedItems.some(item => url.endsWith(item) || url === item);
  return !isIndexed;
});

console.log(`✅ Found ${allUrlsToIndex.length} total URLs. ${toIndex.length} are new.`);

if (toIndex.length === 0) {
  console.log('🎉 All items are already indexed!');
  process.exit(0);
}

// Limit batch size (e.g., 100 at a time)
const BATCH_SIZE = 100;
const currentBatch = toIndex.slice(0, BATCH_SIZE);

console.log(`🚀 Preparing to index ${currentBatch.length} items...`);

// 5. Prepare Payload
const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: currentBatch
});

// 6. Send to IndexNow
const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => { responseData += chunk; });
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`🎉 Success! IndexNow received ${currentBatch.length} URLs.`);
      
      // Update log with full URLs to be safe
      const newIndexedList = [...indexedItems, ...currentBatch];
      fs.writeFileSync(INDEXED_LOG_PATH, JSON.stringify(newIndexedList, null, 2));
      console.log(`📝 Updated ${INDEXED_LOG_PATH} with ${currentBatch.length} new entries.`);
      
      if (toIndex.length > BATCH_SIZE) {
        console.log(`⏳ ${toIndex.length - BATCH_SIZE} items remaining for next run.`);
      }
    } else {
      console.error(`❌ Error ${res.statusCode}: ${responseData}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request error: ${e.message}`);
});

req.write(payload);
req.end();
