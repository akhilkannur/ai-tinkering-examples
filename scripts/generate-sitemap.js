require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const matter = require('gray-matter');
const slugify = require('../utils/slugify');

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
      const rawContent = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf8');
      const { data } = matter(rawContent);
      const id = data.id || file.replace('.md', '');
      if (data.category) blueprintCategories.add(data.category);
      return { 
        id, 
        title: data.title || id, 
        category: data.category || 'Automation', 
        tagline: data.tagline || ''
      };
    });

    // 4. Define Static Pages
    const staticPages = [
      '', '/about', '/learn-ai', '/investors', '/jobs', '/ai-workplace-quiz',
      '/tools', '/tools/for-content-creators', '/tools/for-developers', '/tools/for-marketers',
      '/tools/free-ai-tools', '/tools/utm-builder', '/privacy', '/terms', 
      '/500-ways-to-use-llms-for-work', '/state-of-ai-2026', '/how-to', '/build-club',
      '/how-to/market-saas-zero-budget', '/prompt-bundle', '/context', '/ai-workplace-personality'
    ];

    // 5. Blog Posts
    const blogFiles = fs.existsSync(path.join(process.cwd(), 'content', 'blog')) 
      ? fs.readdirSync(path.join(process.cwd(), 'content', 'blog')).filter(f => f.endsWith('.md'))
      : [];
    const blogPosts = blogFiles.map(file => file.replace('.md', ''));

    // 6. AI Tools (Parse from lib/ai-tools-data.ts)
    const toolsData = fs.readFileSync(path.join(process.cwd(), 'lib', 'ai-tools-data.ts'), 'utf8');
    const toolNames = [];
    // More robust regex to catch name: "..." or name: '...'
    const toolNameRegex = /name:\s*["']([^"']+)["']/g;
    let match;
    while ((match = toolNameRegex.exec(toolsData)) !== null) {
      toolNames.push(match[1]);
    }
    
    // Slugify helper matching pages/tools/[slug].tsx
    const slugifyTool = (text) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    };

    // 7. Playbooks (Parse from lib/playbooks.ts)
    const playbooksData = fs.readFileSync(path.join(process.cwd(), 'lib', 'playbooks.ts'), 'utf8');
    const playbookSlugs = [];
    // Robust regex for slug: '...' or slug: "..."
    const playbookSlugRegex = /slug:\s*["']([^"']+)["']/g;
    while ((match = playbookSlugRegex.exec(playbooksData)) !== null) {
      playbookSlugs.push(match[1]);
    }

    // 8. Tool Collection Pages (New)
    const toolCollections = ['claude-code', 'gemini-cli', 'chatgpt', 'cursor'];

    // 9. Task Generators (New)
    const taskGenerators = ['audit', 'lead-gen', 'competitor-intel', 'pricing', 'sales-automation', 'docs-to-context'];

    // 10. Define manual redirects to exclude from the sitemap
    const manualRedirects = [
      'partner-program-hunter',
      'partner-hunter',
      'review-to-ad'
    ];

    // 11. Helper to escape XML characters
    const escapeXml = (unsafe) => {
      if (!unsafe) return '';
      return unsafe.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const currentDate = new Date().toISOString();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    // Static Pages (Priority 1.0 - 0.8)
    staticPages.forEach(page => {
      xml += `\n  <url><loc>${SITE_URL}${page}</loc><lastmod>${currentDate}</lastmod><changefreq>daily</changefreq><priority>${page === '' ? '1.0' : '0.8'}</priority></url>`;
    });

    // Tool Collections (Priority 0.9)
    toolCollections.forEach(tool => {
      xml += `\n  <url><loc>${SITE_URL}/tools/for/${tool}-blueprints</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`;
    });

    // Task Generators (Priority 0.9)
    taskGenerators.forEach(task => {
      xml += `\n  <url><loc>${SITE_URL}/generators/${task}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`;
    });

    // Examples (Priority 0.7)
    examples.forEach(ex => {
      xml += `\n  <url><loc>${SITE_URL}/ai-examples/${ex.category}/${ex.slug}</loc><lastmod>${ex.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    });

    // Recipes (How-To pages are now 301 to Skills, and Skills are noindexed. No longer in sitemap)
    // recipes
    //   .filter(r => !manualRedirects.includes(r.id))
    //   .forEach(r => {
    //     const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(r.title)}&category=${encodeURIComponent(r.category)}&tagline=${encodeURIComponent(r.tagline || '')}`;
    //     const imageBlock = `
    // <image:image>
    //   <image:loc>${escapeXml(ogImageUrl)}</image:loc>
    //   <image:title>${escapeXml(r.title)} AI Agent Blueprint</image:title>
    //   <image:caption>${escapeXml(r.tagline || r.title)}</image:caption>
    // </image:image>`;
    //     // "How To" Page (High Intent)
    //     xml += `\n  <url>
    // <loc>${SITE_URL}/how-to/automate-${r.id}</loc>
    // <lastmod>${currentDate}</lastmod>
    // <changefreq>weekly</changefreq>
    // <priority>0.8</priority>${imageBlock}
    // </url>`;
    //     // Technical Skill Page
    //     xml += `\n  <url>
    // <loc>${SITE_URL}/skills/${r.id}</loc>
    // <lastmod>${currentDate}</lastmod>
    // <changefreq>weekly</changefreq>
    // <priority>0.7</priority>${imageBlock}
    // </url>`;
    //   });

    // Blog Posts (Priority 0.8)
    blogPosts.forEach(slug => {
      xml += `\n  <url><loc>${SITE_URL}/blog/${slug}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    });

    // Tools (Priority 0.6)
    toolNames.forEach(name => {
      const slug = slugifyTool(name);
      xml += `\n  <url><loc>${SITE_URL}/tools/${slug}</loc><lastmod>${currentDate}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`;
    });

    // Playbooks (Priority 0.9)
    playbookSlugs.forEach(slug => {
      xml += `\n  <url><loc>${SITE_URL}/playbook/${slug}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`;
    });

    // Role & Category Hub Pages (Priority 0.9 - High Value)
    blueprintCategories.forEach(cat => {
      const catSlug = slugify(cat);
        
      xml += `\n  <url><loc>${SITE_URL}/skills/category/${catSlug}</loc><lastmod>${currentDate}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
    });

    xml += `\n</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    const totalCount = staticPages.length + examples.length + 
                       blogPosts.length + toolNames.length + playbookSlugs.length + 
                       blueprintCategories.size;
    console.log(`✅ Sitemap perfect! Total URLs: ${totalCount}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();