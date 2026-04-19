require('dotenv').config();
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://realaiexamples.com';

async function generateSitemap() {
  console.log('🔄 Generating local-first production sitemap...');

  try {
    // 1. Static Pages
    const staticPages = [
      '', '/about', '/tools', '/blog', '/privacy', '/terms', 
      '/500-ways-to-use-llms-for-work',
      '/prompt-bundle', '/ideas-database'
    ];

// 2. Examples (Local Social Data) - Read directly to avoid TS-Node issues in JS script
    const socialDataPath = path.join(process.cwd(), 'lib/social-examples-data.ts');
    const socialDataRaw = fs.readFileSync(socialDataPath, 'utf8');
    // Extract slugs and dates using simple regex since it's a static file
    const slugMatches = [...socialDataRaw.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
    const dateMatches = [...socialDataRaw.matchAll(/publish_date:\s*["']([^"']+)["']/g)].map(m => m[1]);
    const categoryMatches = [...socialDataRaw.matchAll(/category:\s*["']([^"']+)["']/g)].map(m => m[1]);

    const examples = slugMatches.map((slug, i) => ({
      url: `${SITE_URL}/ai-examples/${categoryMatches[i]?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'}/${slug}`,
      lastmod: dateMatches[i] || new Date().toISOString()
    }));

    // 3. Blog Posts (Local Files)
    const blogFiles = fs.existsSync(path.join(process.cwd(), 'content', 'blog')) 
      ? fs.readdirSync(path.join(process.cwd(), 'content', 'blog')).filter(f => f.endsWith('.md'))
      : [];
    const blogPosts = blogFiles.map(file => file.replace('.md', ''));

    const currentDate = new Date().toISOString();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    staticPages.forEach(page => {
      xml += `\n  <url><loc>${SITE_URL}${page}</loc><lastmod>${currentDate}</lastmod><changefreq>daily</changefreq><priority>${page === '' ? '1.0' : '0.8'}</priority></url>`;
    });

    examples.forEach(ex => {
      xml += `\n  <url><loc>${ex.url}</loc><lastmod>${ex.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    });

    blogPosts.forEach(slug => {
      xml += `\n  <url><loc>${SITE_URL}/blog/${slug}</loc><lastmod>${currentDate}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    });

    xml += `\n</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    console.log(`✅ Local-First Sitemap Generated! Total URLs: ${staticPages.length + examples.length + blogPosts.length}`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();
