const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const url = require('url');

async function crawlDocs(baseEntryUrl, maxPages = 30) {
  console.log(`🚀 Starting crawl for: ${baseEntryUrl}`);
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const visited = new Set();
  const queue = [baseEntryUrl];
  const domain = new URL(baseEntryUrl).hostname;
  const basePath = new URL(baseEntryUrl).pathname;
  
  let combinedMarkdown = `# Documentation: ${domain}
Source: ${baseEntryUrl}
Generated: ${new Date().toISOString()}

---

`;
  let pageCount = 0;

  while (queue.length > 0 && pageCount < maxPages) {
    const currentUrl = queue.shift();
    if (visited.has(currentUrl)) continue;
    
    console.log(`   [${pageCount + 1}/${maxPages}] Scouring: ${currentUrl}`);
    visited.add(currentUrl);
    
    try {
      await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // 1. Extract Main Content
      const content = await page.evaluate(() => {
        // Common documentation selectors for main content
        const selectors = [
          'main', 'article', '.content', '#content', 
          '.documentation', '.docs-content', '.markdown-body',
          '[role="main"]'
        ];
        
        let mainElement = null;
        for (const s of selectors) {
          const el = document.querySelector(s);
          if (el) {
            mainElement = el;
            break;
          }
        }
        
        if (!mainElement) mainElement = document.body;

        // Clone to avoid modifying the live page
        const clone = mainElement.cloneNode(true);
        
        // Remove noise
        const noise = clone.querySelectorAll('nav, footer, script, style, .sidebar, .table-of-contents, .ads, .newsletter, button');
        noise.forEach(n => n.remove());
        
        return {
          title: document.title,
          html: clone.innerHTML,
          text: clone.innerText
        };
      });

      // 2. Simple HTML to Markdown Conversion (Basic for prototype)
      let md = `## ${content.title}
URL: ${currentUrl}

${content.text}

---

`;
      combinedMarkdown += md;
      pageCount++;

      // 3. Find Internal Links
      const links = await page.evaluate((baseDomain, basePath) => {
        return Array.from(document.querySelectorAll('a'))
          .map(a => a.href)
          .filter(href => {
            try {
              const u = new URL(href);
              return u.hostname === baseDomain && u.pathname.startsWith(basePath);
            } catch (e) {
              return false;
            }
          });
      }, domain, basePath);

      for (const link of links) {
        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }

    } catch (err) {
      console.error(`   ❌ Failed to load ${currentUrl}: ${err.message}`);
    }
  }

  await browser.close();
  
  // Save Output
  const outputDir = path.join(process.cwd(), 'public', 'context');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const fileName = domain.replace(/\./g, '-') + '.md';
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, combinedMarkdown);
  
  console.log(`
✅ Done! Context file saved to: public/context/${fileName}`);
  console.log(`📄 Total pages bundled: ${pageCount}`);
}

// CLI Execution: node scripts/docs-to-context.js <url>
const targetUrl = process.argv[2];
if (targetUrl) {
  crawlDocs(targetUrl);
} else {
  console.log('Usage: node scripts/docs-to-context.js <url>');
  console.log('Example: node scripts/docs-to-context.js https://docs.apollo.io/reference');
}
