---
id: seo-meta-tag-bulk-optimizer
category: Marketing
title: Bulk Meta Tag Writer
tagline: Fix missing or duplicate SEO titles and descriptions in seconds.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of URLs (from a site audit), identifies missing or poor meta tags, and rewrites them to include target keywords and stay within character limits.
sampleData:
  filename: site_audit.csv
  content: |
    URL,Current_Title,Target_Keyword
    /blog/cats,Cats,Cat Care Tips
    /products/shoes,,Running Shoes
    /about,About Us - Company Name,
---

# What This Does
Screaming Frog audits give you the problems (Missing Title, Duplicate Description), but not the solutions. This agent fixes the spreadsheet for you, writing click-worthy tags that fit Google's pixel width limits.

# What You Need
- `site_audit.csv`: List of pages that need fixing.

# What You Get
- `fixed_meta_tags.csv`: Ready for import.

# How to Use
1. Export "Missing Meta Details" from your SEO tool.
2. Run the blueprint.
3. Import the new tags into WordPress/CMS.

---

# Prompt

You are an **SEO Specialist**. Your job is to write high-CTR meta tags.

**Phase 1: Rules**
*   **Title:** Max 60 chars. Must include `Target_Keyword` near the front. Format: "Keyword | Benefit - Brand".
*   **Description:** Max 155 chars. Must include `Target_Keyword`. Must contain a Call to Action (e.g., "Learn more", "Shop now").

**Phase 2: Process**
1. Read `site_audit.csv`.
2. For each row:
    *   **Write Title:** If `Current_Title` is missing or weak (under 10 chars), write a new one using the `Target_Keyword`.
    *   **Write Description:** Write a persuasive summary of the page topic (infer from URL if needed).
    *   **Check Length:** Truncate if it exceeds limits.

**Phase 3: Output**
1.  Save to `fixed_meta_tags.csv` (Columns: `URL`, `New_Title`, `New_Description`, `Title_Length`, `Desc_Length`).

Start now.
