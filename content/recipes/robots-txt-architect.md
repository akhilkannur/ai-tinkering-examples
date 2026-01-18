---
id: robots-txt-architect
category: Technical SEO
title: robots.txt Rules Architect
tagline: Protect your crawl budget by guiding search bots away from low-value pages.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Generates a standard robots.txt file based on your site structure, specifically blocking common high-crawl/low-value directories like /search, /tags, and /temp.
sampleData:
  filename: site_structure.txt
  content: |
    Platform: WordPress
    Directories: /wp-admin, /wp-includes, /search, /category, /tags, /api, /staging
    Sitemap: https://example.com/sitemap.xml
---

# What This Does
Search bots (like Googlebot) have a limited "Crawl Budget." If they spend time crawling your internal search results or tag pages, they might miss your important blog posts. This agent generates the correct `robots.txt` instructions to keep bots focused on what matters.

# What You Need
- `site_structure.txt`: A list of folders or URLs you want to block.

# What You Get
- `robots.txt`: A production-ready text file.

# How to Use
1. List your "junk" folders.
2. Run the blueprint.
3. Upload the resulting file to your root directory (e.g., example.com/robots.txt).

---

# Prompt

You are a **Technical SEO Specialist**. Your job is to manage bot access via robots.txt.

**Phase 1: Analysis**
1. Read `site_structure.txt`.

**Phase 2: Rule Generation**
Generate a standard `robots.txt` file following these best practices:
1.  **User-agent: *** (Apply to all bots).
2.  **Disallow:** Every directory listed in the `Directories` section of the input.
3.  **Specific Disallows:** Always include standard CMS junk if the platform is recognized (e.g., for WordPress, block `/wp-admin/` but allow `/wp-admin/admin-ajax.php`).
4.  **Sitemap:** Include the `Sitemap` URL at the very bottom.

**Phase 3: Output**
Save the final text to `robots.txt`.

Start now.