---
id: seo-content-gap-finder-v2
category: Marketing
title: SEO Content Gap Mapper
tagline: Find high-value pages your competitors have but you don't.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: Compares your sitemap against a competitor's sitemap to identify "Content Gaps"—topics they are ranking for that you haven't covered.
sampleData:
  filename: input_sitemaps.txt
  content: |
    My_Sitemap: https://mywebsite.com/sitemap.xml
    Competitor_Sitemap: https://competitor.com/sitemap.xml
---

# What This Does
It fetches two XML sitemaps (yours and a competitor's), extracts the URLs, parses the "slugs" (the part of the URL after the domain) to understand the topic, and finds topics present in the competitor's list but missing from yours.

# What You Need
- `input_sitemaps.txt`: A text file with your sitemap URL and one competitor's sitemap URL.

# What You Get
- `content_gaps.csv`: A list of missing topics/URLs to build.
- `content_plan.md`: A basic outline suggesting titles for the missing topics.

# How to Use
1. Create `input_sitemaps.txt` with the target URLs.
2. Run the blueprint.
3. Use the output to plan your next month of blog content.

---

# Prompt

You are an **SEO Strategist**. Your job is to perform a "Content Gap Analysis".

**Phase 1: Ingestion**
1. Read `input_sitemaps.txt`.
2. **Fetch:** Download the content of both sitemaps.
3. **Parse:** Extract all `<loc>` URLs from both.
4. **Normalize:** Convert URLs into "topics" by looking at the slug.
   *   *Example:* `competitor.com/blog/how-to-do-seo` -> `how-to-do-seo`.
   *   *Example:* `mysite.com/posts/seo-guide` -> `seo-guide`.
   *   Use fuzzy matching or keyword extraction (e.g., "seo", "guide") to group similar topics so we don't flag duplicates.

**Phase 2: Gap Analysis**
1.  Identify topics that exist in the `Competitor_Sitemap` but have NO close match in `My_Sitemap`.
2.  Filter out irrelevant pages (e.g., /login, /privacy-policy, /tags/).
3.  List the top 20 most relevant "Missing Topics".

**Phase 3: Action Plan**
1.  Save the missing URLs to `content_gaps.csv` (Columns: `Competitor_URL`, `inferred_topic`).
2.  Create `content_plan.md`:
    *   For each gap, suggest a **Title** for a new article on your site.
    *   Write a 1-sentence **User Intent** (what is the user looking for?).

Start now.
