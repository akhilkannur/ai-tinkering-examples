---
name: seo-maintenance-engine
description: Automates technical SEO tasks: generating sitemaps, RSS feeds, llms.txt, and submitting updates to search engines via IndexNow.
---

# SEO Maintenance Engine

Use this skill after making significant changes to the site's content (adding blog posts, recipes, or tools).

## The Maintenance Routine

Run these in order to ensure the site's metadata is perfectly in sync:

1.  **Generate Sitemap**: `node scripts/generate-sitemap.js`
2.  **Generate RSS**: `node scripts/generate-rss.js`
3.  **Update LLMS.txt**: `node scripts/generate-llms-txt.js` (The robot "cheat sheet")
4.  **Submit to IndexNow**: `node scripts/submit-indexnow.js` (Pings Bing/Yandex/Google)

## Combined Command
```bash
npm run build && node scripts/submit-indexnow.js
```
*(Note: Use `npm run build` only if necessary, as it can be slow.)*

## Why it matters
*   **IndexNow**: Speeds up indexing of new pages from weeks to minutes.
*   **LLMS.txt**: Ensures AI agents (like ChatGPT) have a clean, text-only map of your 700+ blueprints.