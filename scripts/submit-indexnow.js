const https = require('https');
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const HOST = 'realaiexamples.com';
const KEY = '14ae016fb6ca333de38554bc499b50e9'; // The file we just created
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// 1. Read Sitemap
console.log('📖 Reading sitemap...');
if (!fs.existsSync(SITEMAP_PATH)) {
  console.error('❌ Sitemap not found at public/sitemap.xml');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urls = [];
const locRegex = /<loc>(.*?)<\/loc>/g;
let match;

while ((match = locRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`✅ Found ${urls.length} URLs in sitemap.`);

if (urls.length === 0) {
  console.log('⚠️ No URLs found. Exiting.');
  process.exit(0);
}

// 2. Prepare Payload
const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
});

// 3. Send to IndexNow
console.log('🚀 Sending ping to IndexNow...');

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

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`🎉 Success! IndexNow received ${urls.length} URLs.`);
      console.log('   Bing/Yandex will now prioritize crawling these pages.');
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
