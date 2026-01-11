require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://realaiexamples.com';
const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const EXAMPLES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples';
const CATEGORIES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CATEGORIES_TABLE || 'Categories';

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('❌ Missing Airtable configuration. Skipping sitemap generation.');
  process.exit(1);
}

// Helper for Airtable requests
function fetchAirtable(tableName, view = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}${view ? '?view=' + encodeURIComponent(view) : ''}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
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
            reject(e);
          }
        } else {
          reject(new Error(`Airtable API Error: ${res.statusCode} ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

// Fetch all data
async function generateSitemap() {
  console.log('🔄 Starting static sitemap generation...');

  try {
    // 1. Fetch Categories for mapping
    console.log('   Fetching categories...');
    const categoriesRaw = await fetchAirtable(CATEGORIES_TABLE);
    const categoryMap = {};
    categoriesRaw.forEach(r => {
      categoryMap[r.id] = r.fields.Name;
    });

    // 2. Fetch Examples
    console.log('   Fetching examples...');
    // We filter for published records manually if needed, or rely on a view if one exists.
    // The original code filtered by formula: {Published}
    // Simple fetch of all and filter in JS for robustness
    const examplesRaw = await fetchAirtable(EXAMPLES_TABLE);
    const examples = examplesRaw
      .filter(r => r.fields.Published) // Ensure published
      .map(r => {
        const title = r.fields.Title;
        const slug = r.fields.Slug || title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        
        let categoryName = 'uncategorized';
        if (r.fields.Category && r.fields.Category.length > 0) {
          const catId = r.fields.Category[0];
          if (categoryMap[catId]) {
            categoryName = categoryMap[catId].toLowerCase().replace(/\s+/g, '-');
          }
        }
        
        return {
          slug,
          category: categoryName,
          lastmod: r.fields['Publish date'] || new Date().toISOString()
        };
      });

    // 3. Get Recipes from Files
    console.log('   Reading recipe files...');
    const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
    const recipes = recipeFiles.map(file => {
      const id = file.replace('.md', '');
      return { id };
    });

    // 4. Define Static Pages
    const staticPages = [
      '',
      '/about',
      '/learn-ai',
      '/ai-examples',
      '/blueprints',
      '/investors',
      '/jobs',
      '/ai-workplace-quiz',
      '/tools',
      '/tools/for-content-creators',
      '/tools/for-developers',
      '/tools/for-marketers',
      '/tools/free-ai-tools',
      '/tools/utm-builder',
    ];

    // 5. Build XML
    const currentDate = new Date().toISOString();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Pages
    staticPages.forEach(page => {
      const priority = page === '' ? '1.0' : '0.8';
      const changefreq = (page === '' || page === '/ai-examples' || page === '/blueprints') ? 'daily' : 'monthly';
      xml += `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    // Examples
    examples.forEach(ex => {
      xml += `
  <url>
    <loc>${SITE_URL}/ai-examples/${ex.category}/${ex.slug}</loc>
    <lastmod>${ex.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Recipes
    recipes.forEach(r => {
      xml += `
  <url>
    <loc>${SITE_URL}/blueprints/${r.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Categories (from map)
    Object.values(categoryMap).forEach(catName => {
      const catSlug = catName.toLowerCase().replace(/\s+/g, '-');
      xml += `
  <url>
    <loc>${SITE_URL}/ai-examples/category/${catSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    // 6. Write to file
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    console.log(`✅ Sitemap generated with ${examples.length} examples, ${recipes.length} recipes, and ${Object.keys(categoryMap).length} categories.`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
