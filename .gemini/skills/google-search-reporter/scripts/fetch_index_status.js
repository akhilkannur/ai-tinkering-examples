const { google } = require('googleapis');
const path = require('path');

const PROPERTY_URL = 'sc-domain:realaiexamples.com';
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function fetchSitemaps() {
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    // List sitemaps to get indexing overview
    const response = await searchconsole.sitemaps.list({
      siteUrl: PROPERTY_URL,
    });

    if (!response.data.sitemap || response.data.sitemap.length === 0) {
      console.log('No sitemaps found.');
    } else {
      console.log('Sitemaps and Indexing Status:');
      console.log('='.repeat(80));
      response.data.sitemap.forEach(sitemap => {
        console.log(`\nSitemap: ${sitemap.path}`);
        console.log(`  Last Submitted: ${sitemap.lastSubmitted || 'N/A'}`);
        console.log(`  Last Downloaded: ${sitemap.lastDownloaded || 'N/A'}`);
        console.log(`  Warnings: ${sitemap.warnings || 0}`);
        console.log(`  Errors: ${sitemap.errors || 0}`);
        if (sitemap.contents) {
          sitemap.contents.forEach(content => {
            console.log(`  Type: ${content.type} | Submitted: ${content.submitted} | Indexed: ${content.indexed}`);
          });
        }
      });
    }
  } catch (error) {
    console.error('Error fetching sitemaps:', error.message);
  }
}

async function inspectUrl(urlToInspect) {
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    
    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: urlToInspect,
        siteUrl: PROPERTY_URL,
      },
    });

    const result = response.data.inspectionResult;
    console.log(`\nURL Inspection: ${urlToInspect}`);
    console.log('='.repeat(80));
    
    if (result.indexStatusResult) {
      const idx = result.indexStatusResult;
      console.log(`Coverage State: ${idx.coverageState}`);
      console.log(`Verdict: ${idx.verdict}`);
      console.log(`Robots.txt State: ${idx.robotsTxtState}`);
      console.log(`Indexing State: ${idx.indexingState}`);
      console.log(`Last Crawl Time: ${idx.lastCrawlTime || 'Never'}`);
      console.log(`Page Fetch State: ${idx.pageFetchState}`);
      console.log(`Google Canonical: ${idx.googleCanonical || 'N/A'}`);
      console.log(`User Canonical: ${idx.userCanonical || 'N/A'}`);
      
      if (idx.sitemap && idx.sitemap.length > 0) {
        console.log(`Sitemaps: ${idx.sitemap.join(', ')}`);
      }
    }
    
    if (result.mobileUsabilityResult) {
      console.log(`Mobile Usability: ${result.mobileUsabilityResult.verdict}`);
    }
    
  } catch (error) {
    console.error('Error inspecting URL:', error.message);
  }
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  // No URL provided, just fetch sitemaps
  fetchSitemaps();
} else {
  // Inspect specific URL
  inspectUrl(args[0]);
}
