const https = require('https');
const http = require('http');

async function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
      resolve({ url, status: res.statusCode, redirect: res.headers.location || null });
    });
    req.on('error', (err) => resolve({ url, status: 'ERROR', error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
    req.end();
  });
}

async function main() {
  console.log('Fetching sitemap...');
  const sitemapXml = await fetchSitemap('https://realaiexamples.com/sitemap.xml');
  
  // Extract URLs from sitemap
  const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = urlMatches.map(m => m.replace(/<\/?loc>/g, ''));
  
  console.log(`Found ${urls.length} URLs in sitemap. Checking for issues...\n`);
  
  const notFound = [];
  const redirects = [];
  const errors = [];
  
  // Check URLs in batches
  const batchSize = 20;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(checkUrl));
    
    for (const r of results) {
      if (r.status === 404) {
        notFound.push(r.url);
      } else if (r.status >= 300 && r.status < 400) {
        redirects.push({ url: r.url, status: r.status, to: r.redirect });
      } else if (r.status === 'ERROR' || r.status === 'TIMEOUT' || r.status >= 500) {
        errors.push(r);
      }
    }
    
    process.stdout.write(`Checked ${Math.min(i + batchSize, urls.length)}/${urls.length}\r`);
  }
  
  console.log('\n');
  
  if (notFound.length > 0) {
    console.log(`\n❌ 404 NOT FOUND (${notFound.length}):`);
    console.log('='.repeat(60));
    notFound.forEach(u => console.log(u));
  }
  
  if (redirects.length > 0) {
    console.log(`\n🔄 REDIRECTS (${redirects.length}):`);
    console.log('='.repeat(60));
    redirects.forEach(r => console.log(`${r.status}: ${r.url} -> ${r.to || 'unknown'}`));
  }
  
  if (errors.length > 0) {
    console.log(`\n⚠️ ERRORS (${errors.length}):`);
    console.log('='.repeat(60));
    errors.forEach(e => console.log(`${e.status}: ${e.url} - ${e.error || ''}`));
  }
  
  if (notFound.length === 0 && redirects.length === 0 && errors.length === 0) {
    console.log('✅ All URLs in sitemap are healthy!');
  }
  
  console.log(`\nSummary: ${notFound.length} 404s, ${redirects.length} redirects, ${errors.length} errors out of ${urls.length} URLs`);
}

main().catch(console.error);
