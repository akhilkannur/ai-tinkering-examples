require('dotenv').config();
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://realaiexamples.com';
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

const escapeXml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

async function generateSitemap() {
  console.log('🔄 Generating local-first production sitemap...');

  try {
    // 1. Static Pages
    const staticPages = [
      '', '/about', '/tools', '/blog', '/privacy', '/terms'
    ];

    // 2. Examples (Local Social Data)
    const socialDataPath = path.join(process.cwd(), 'lib/social-examples-data.ts');
    const socialDataRaw = fs.readFileSync(socialDataPath, 'utf8');
    const slugMatches = [...socialDataRaw.matchAll(/^    slug:\s*["']([^"']+)["']/gm)].map(m => m[1]);
    const dateMatches = [...socialDataRaw.matchAll(/^    publish_date:\s*["']([^"']+)["']/gm)].map(m => m[1]);
    const categoryMatches = [...socialDataRaw.matchAll(/^    category:\s*["']([^"']+)["']/gm)].map(m => m[1]);

    const examples = slugMatches.map((slug, i) => ({
      url: `${SITE_URL}/ai-examples/${slugify(categoryMatches[i] || 'uncategorized')}/${slug}`,
      lastmod: dateMatches[i] || new Date().toISOString()
    }));
    const categoryPages = [...new Set(categoryMatches.map(slugify))]
      .map(category => `${SITE_URL}/ai-examples/category/${category}`);

    // 3. Blog Posts (Local Files)
    const blogFiles = fs.existsSync(path.join(process.cwd(), 'content', 'blog')) 
      ? fs.readdirSync(path.join(process.cwd(), 'content', 'blog')).filter(f => f.endsWith('.md'))
      : [];
    const blogPosts = blogFiles.map(file => file.replace('.md', ''));

    // 4. Tools (Local Data)
    const toolsDataPath = path.join(process.cwd(), 'lib/ai-tools-data.ts');
    const toolsDataRaw = fs.readFileSync(toolsDataPath, 'utf8');
    // Four-space indentation identifies top-level tool fields and excludes maker.name.
    const toolNameMatches = [...toolsDataRaw.matchAll(/^    name:\s*["']([^"']+)["']/gm)].map(m => m[1]);
    const toolDateMatches = [...toolsDataRaw.matchAll(/^    dateAdded:\s*["']([^"']+)["']/gm)].map(m => m[1]);

    const currentDate = new Date().toISOString();
    const tools = toolNameMatches.map((name, i) => ({
      url: `${SITE_URL}/tools/${slugify(name)}`,
      lastmod: toolDateMatches[i] || currentDate
    }));

    const urls = [
      ...staticPages.map(page => ({ url: `${SITE_URL}${page}`, lastmod: currentDate })),
      ...categoryPages.map(url => ({ url, lastmod: currentDate })),
      ...examples,
      ...blogPosts.map(slug => {
        const file = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
        return { url: `${SITE_URL}/blog/${slug}`, lastmod: fs.statSync(file).mtime.toISOString() };
      }),
      ...tools,
    ];
    const uniqueUrls = [...new Map(urls.map(entry => [entry.url, entry])).values()];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    uniqueUrls.forEach(({ url, lastmod }) => {
      xml += `\n  <url><loc>${escapeXml(url)}</loc><lastmod>${lastmod}</lastmod></url>`;
    });

    xml += `\n</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    console.log(`✅ Local-First Sitemap Generated! Total URLs: ${uniqueUrls.length}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();
