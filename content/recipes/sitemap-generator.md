---
id: sitemap-generator
category: SEO Ops
title: High-Coverage Sitemap Generator
tagline: Generate a perfect XML sitemap for thousands of dynamic pages.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: >-
  Crawls your local content and database to build a comprehensive sitemap.xml
  for Google.
sampleData:
  filename: content-manifest.json
  content: |
    [
      { "slug": "page-1", "updated": "2023-10-01" },
      { "slug": "page-2", "updated": "2023-10-05" }
    ]
isPremium: true
---

# What This Does
It scans your static pages, dynamic content (like blog posts or recipes), and database entries to generate a single, perfectly formatted `sitemap.xml` file that ensures Google indexes every corner of your site.

# What You Need
- A list of your site's routes or a connection to your CMS/Database
- Node.js environment

# What You Get
- A valid `public/sitemap.xml` file ready for Google Search Console
- Automatic priority and last-modified dates for better SEO

# How to Use
1. Identify where your content lives (files, API, database)
2. Open Claude Code, Gemini CLI, or Cursor
3. Copy and paste the prompt below
4. Run the script to generate your sitemap

---

# Prompt

You are a Technical SEO Specialist. Your job is to build a **High-Coverage Sitemap Generator** script in Node.js.

**Phase 1: Setup**
- Create a mock `content-manifest.json` if it doesn't exist (representing your database of pages).
- Define your base site URL (e.g., `https://example.com`).

**Phase 2: The Generator Script (`generate-sitemap.js`)**
Create a script that:
1. **Static Pages:** defined a list of hardcoded static routes (e.g., `/`, `/about`, `/pricing`).
2. **Dynamic Pages:** Reads `content-manifest.json` (or a directory of markdown files) to get slugs for dynamic content.
3. **XML Construction:** Builds a standard XML string adhering to the sitemap schema `http://www.sitemaps.org/schemas/sitemap/0.9`.
   - Include `<loc>` (URL)
   - Include `<lastmod>` (Date)
   - Include `<priority>` (1.0 for home, 0.8 for main pages, 0.6 for posts)
   - Include `<changefreq>` (daily, weekly, monthly)
4. **Validation:** Ensures there are no duplicate URLs.

**Phase 3: Output**
- Save the string to `public/sitemap.xml`.
- Log the stats: "✅ Generated sitemap with X URLs (Y Static, Z Dynamic)."

Start now.
