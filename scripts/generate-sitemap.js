require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const matter = require('gray-matter');

const SITE_URL = 'https://realaiexamples.com';
const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const EXAMPLES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples';
const CATEGORIES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CATEGORIES_TABLE || 'Categories';

// Helper for Airtable requests
function fetchAirtable(tableName, view = '') {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return Promise.resolve([]);
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}${view ? '?view=' + encodeURIComponent(view) : ''}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.records || []);
          } catch (e) {
            resolve([]);
          }
        } else {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.on('timeout', () => { req.destroy(); resolve([]); });
    req.end();
  });
}

async function generateSitemap() {
  console.log('🔄 Starting high-coverage sitemap generation...');

  try {
    // 1. Fetch Categories (Airtable)
    const categoriesRaw = await fetchAirtable(CATEGORIES_TABLE);
    const airtableCategoryMap = {};
    categoriesRaw.forEach(r => { if (r.fields.Name) airtableCategoryMap[r.id] = r.fields.Name; });

    // 2. Fetch Examples (Airtable)
    const examplesRaw = await fetchAirtable(EXAMPLES_TABLE);
    const examples = examplesRaw
      .filter(r => r.fields.Published)
      .map(r => {
        const title = r.fields.Title;
        const slug = r.fields.Slug || title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        let categoryName = 'uncategorized';
        if (r.fields.Category?.[0] && airtableCategoryMap[r.fields.Category[0]]) {
          categoryName = airtableCategoryMap[r.fields.Category[0]].toLowerCase().replace(/\s+/g, '-');
        }
        return { slug, category: categoryName, lastmod: r.fields['Publish date'] || new Date().toISOString() };
      });

    // 3. Process Recipes and Blueprint Categories (Local Files)
    console.log('   Processing 600+ blueprints...');
    const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
    const blueprintCategories = new Set();
    const recipes = recipeFiles.map(file => {
      const id = file.replace('.md', '');
      const rawContent = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf8');
      const { data } = matter(rawContent);
      if (data.category) blueprintCategories.add(data.category);
      return { id };
    });

    // 4. Define Static Pages
    const staticPages = [
      '', '/about', '/learn-ai', '/ai-examples', '/investors', '/jobs', '/ai-workplace-quiz',
      '/tools', '/tools/for-content-creators', '/tools/for-developers', '/tools/for-marketers',
      '/tools/free-ai-tools', '/tools/utm-builder', '/privacy', '/terms', 
      '/500-ways-to-use-llms-for-work', '/state-of-ai-2026', '/how-to', '/build-club',
      '/how-to/market-saas-zero-budget'
    ];

    const currentDate = new Date().toISOString();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Pages (Priority 1.0 - 0.8)
    staticPages.forEach(page => {
      xml += `\n  <url><loc>${SITE_URL}${page}</loc><lastmod>${currentDate}</lastmod><changefreq>daily</changefreq><priority>${page === '' ? '1.0' : '0.8'}</priority></url>`;
    });

    // Examples (Priority 0.7)
    examples.forEach(ex => {
      xml += `\n  <url><loc>${SITE_URL}/ai-examples/${ex.category}/${ex.slug}</loc><lastmod>${ex.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    });

    // Recipes (Priority 0.7)
    // We generate "How To" pages for these
    recipes.forEach(r => {
      // "How To" Page (High Intent)
      // Note: We assume all recipes have taglines for now, or the page will just use title. 
      // The page generation logic handles the fallback, but for sitemap we just need the ID.
      xml += `\n  <url><loc>${SITE_URL}/how-to/automate-${r.id}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    });

    // Role & Category Hub Pages (Priority 0.9 - High Value)
    blueprintCategories.forEach(cat => {
      // Slugify logic matching utils/slugify.ts
      const catSlug = cat.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
        
      xml += `\n  <url><loc>${SITE_URL}/role/${catSlug}</loc><lastmod>${currentDate}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
      xml += `\n  <url><loc>${SITE_URL}/blueprints/category/${catSlug}</loc><lastmod>${currentDate}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
    });

    // Legacy Category Pages (Airtable)
    Object.values(airtableCategoryMap).forEach(catName => {
      const catSlug = catName.toLowerCase().replace(/\s+/g, '-');
      xml += `\n  <url><loc>${SITE_URL}/ai-examples/category/${catSlug}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>`;
    });

    xml += `\n</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    console.log(`✅ Sitemap perfect! Total URLs: ${staticPages.length + examples.length + recipes.length + blueprintCategories.size + Object.keys(airtableCategoryMap).length}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();