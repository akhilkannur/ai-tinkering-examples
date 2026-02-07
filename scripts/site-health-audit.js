const fs = require('fs');
const path = require('path');
const https = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => {
      resolve('ERROR');
    });
    req.setTimeout(10000, () => {
      req.destroy();
      resolve('TIMEOUT');
    });
  });
}

async function runAudit() {
  const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ public/sitemap.xml not found. Run generate-sitemap first.');
    return;
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urls = content.match(/<loc>(.*?)<\/loc>/g).map(u => u.replace(/<\/?loc>/g, ''));

  console.log('🔍 Found ' + urls.length + ' URLs in sitemap. Checking status codes...\n');

  const results = [];
  const batchSize = 5;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(async (url) => {
      const status = await checkUrl(url);
      return { url, status };
    }));
    results.push(...batchResults);
    process.stdout.write('Checked ' + results.length + '/' + urls.length + '\r');
  }

  console.log('\n\n--- 🚨 AUDIT REPORT 🚨 ---');
  const broken = results.filter(r => r.status === 404 || r.status === 'ERROR');
  const redirects = results.filter(r => r.status === 301 || r.status === 302);
  const timeouts = results.filter(r => r.status === 'TIMEOUT');

  if (broken.length > 0) {
    console.log('\n❌ Broken Links (' + broken.length + '):');
    broken.forEach(r => console.log('   - ' + r.url + ' (Status: ' + r.status + ')'));
  } else {
    console.log('\n✅ No broken links found.');
  }

  if (redirects.length > 0) {
    console.log('\n⚠️ Redirects (' + redirects.length + '):');
    redirects.forEach(r => console.log('   - ' + r.url + ' (Status: ' + r.status + ')'));
  }

  if (timeouts.length > 0) {
    console.log('\n🕒 Timeouts (' + timeouts.length + '):');
    timeouts.forEach(r => console.log('   - ' + r.url));
  }

  console.log('\n--------------------------');
}

runAudit();