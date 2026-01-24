---
id: hreflang-tag-builder
category: SEO
title: The Hreflang Builder
tagline: Fix international SEO.
difficulty: Intermediate
time: Batch
description: >-
  Multi-language sites confuse Google without Hreflang. This agent generates the
  correct HTML tags mapping your English, Spanish, and German pages to prevent
  duplicate content penalties across your entire site.
sampleData:
  filename: url_mappings.csv
  content: >
    Path,Lang_EN,Lang_ES,Lang_DE

    /home,https://site.com/,https://site.com/es/,https://site.com/de/

    /pricing,https://site.com/pricing,https://site.com/es/precios,https://site.com/de/preise

    /about,https://site.com/about,https://site.com/es/sobre-nosotros,https://site.com/de/uber-uns
isPremium: true
---

# Agent Configuration: The Hreflang Builder

## Role
Multi-language sites confuse Google without Hreflang. This agent generates the correct HTML tags mapping your English, Spanish, and German pages to prevent duplicate content penalties across your entire site.

## Objective
Fix international SEO.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `url_mappings.csv` exist?
2.  **If Missing:** Create `url_mappings.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `url_mappings.csv` using the `sampleData`.
3.  **If Present:** Load the mapping list.

**Phase 2: The Tag Generation Loop**
For each path in the CSV:
1.  **Identify Locales:** Map the column headers to ISO language/region codes.
2.  **Generate Reciprocal Set:**
    *   Create a `<link rel="alternate" ... />` tag for every language provided.
    *   Set the `x-default` (usually to the `Lang_EN` version).
3.  **Validate:** Ensure no trailing slashes or URL inconsistencies across the set.

**Phase 3: Structured Deliverables**
1.  **Create:** `hreflang_tags_master.html` containing blocks of tags for every path, ready for head insertion.
2.  **Report:** "Successfully generated hreflang sets for [X] pages. [Y] languages mapped per page."

