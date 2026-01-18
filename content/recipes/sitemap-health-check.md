---
id: sitemap-health-check
category: Technical SEO
title: Sitemap Health Auditor
tagline: Find broken links and non-indexable pages in your sitemap.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: Parses an XML sitemap file, checks the HTTP status code of every URL, and flags any that are broken (404), redirected (301), or server errors (500).
sampleData:
  filename: sitemap.xml
  content: |
    <urlset>
      <url><loc>https://example.com/page1</loc></url>
      <url><loc>https://example.com/broken-page</loc></url>
    </urlset>
---

# What This Does
Your sitemap is your map for Google. If it contains broken links, you are wasting your "Crawl Budget." This agent acts like a mini "Screaming Frog," validating that every page you tell Google to index actually exists.

# What You Need
- `sitemap.xml`: Download it from yoursite.com/sitemap.xml.

# What You Get
- `sitemap_report.csv`: Status codes for every URL.

# How to Use
1. Download your sitemap.
2. Run the blueprint.
3. Remove any non-200 URLs from your CMS.

---

# Prompt

You are a **Technical SEO**. Your job is to validate site architecture.

**Phase 1: Parsing**
1. Read `sitemap.xml`.
2. Extract all URLs between `<loc>` tags.

**Phase 2: Validation**
For each URL:
1.  **Check:** Simulate an HTTP GET request (conceptually).
2.  **Classify:**
    *   **200 OK:** Good.
    *   **301/302 Redirect:** Bad (Sitemaps should point to the final destination).
    *   **404 Not Found:** Critical Error.
    *   **5xx Error:** Server issue.

**Phase 3: Output**
Save to `sitemap_report.csv` (Columns: `URL`, `Status_Code`, `Action`).
*   *Action Logic:*
    *   If 200 -> "Keep".
    *   If 301 -> "Update to Final URL".
    *   If 404 -> "Remove from Sitemap".

Start now.