const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://realaiexamples.com';
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'feed.xml');

function generateRSS() {
  console.log('📰 Generating RSS feed...');

  if (!fs.existsSync(BLOG_DIR)) {
    console.log('⚠️ No blog directory found. Skipping RSS generation.');
    return;
  }

  // 1. Get Blog Posts
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  const posts = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return {
      title: data.title,
      description: data.excerpt || data.description || '',
      date: data.date ? new Date(data.date) : new Date(),
      slug: file.replace('.md', ''),
      author: data.author?.name || 'Real AI Examples'
    };
  });

  // 2. Sort by Date (Newest first)
  posts.sort((a, b) => b.date - a.date);

  // 3. Build XML
  const itemsXml = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>${post.author}</author>
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Real AI Examples Blog</title>
    <link>${SITE_URL}</link>
    <description>Practical AI Blueprints, Recipes, and Guides for Operations, Marketing, and Sales.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  // 4. Write File
  fs.writeFileSync(OUTPUT_FILE, rssXml);
  console.log(`✅ RSS feed generated at public/feed.xml with ${posts.length} posts.`);
}

generateRSS();
