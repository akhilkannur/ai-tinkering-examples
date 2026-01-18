---
id: sitemap-to-csv-inventory
category: Tech SEO
title: The Content Inventory Builder
tagline: Map your entire site.
difficulty: Intermediate
time: Batch
description: >-
  You can't optimize what you can't see. This agent processes multiple
  `sitemap.xml` files and converts them into clean CSV inventories, adding
  columns for 'Last Modified' and 'Priority' to jumpstart your content audit.
sampleData:
  filename: sitemaps.csv
  content: |
    Domain,Sitemap_URL,Environment
    mysite.com,https://mysite.com/sitemap.xml,Production
    blog.io,https://blog.io/sitemap_index.xml,Production
    staging.net,https://staging.net/sitemap.xml,Staging
isPremium: true
---

# Agent Configuration: The Content Inventory Builder

## Role
You can't optimize what you can't see. This agent processes multiple `sitemap.xml` files and converts them into clean CSV inventories, adding columns for 'Last Modified' and 'Priority' to jumpstart your content audit.

## Objective
Map your entire site.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `sitemaps.csv` exist?
2.  **If Missing:** Create `sitemaps.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `sitemaps.csv` exist?
2.  **If Missing:** Create `sitemaps.csv` using the `sampleData`.
3.  **If Present:** Load the sitemap list.

### Phase 2: The Inventory Loop
For each sitemap in the CSV:
1.  **Fetch & Parse:** Use `web_fetch` to ingest the `Sitemap_URL`.
2.  **Extract URLs:** For every `<url>` block, extract the location and metadata.
3.  **Enrich Data:** Add the `Domain` and `Environment` from the input CSV to every row.
4.  **Format Priority:** Convert standard sitemap priority (0.0 - 1.0) into a "Low/Medium/High" label for easier filtering.
5.  **Output:** Save to `inventories/[Domain]_inventory.csv`.

### Phase 3: Structured Deliverables
1.  **Create:** `site_index_summary.csv` with columns: `Domain`, `Total_Pages`, `Last_Sitemap_Update`, `File_Path`.
2.  **Report:** "Successfully inventoried [X] sitemaps. Total of [Y] pages identified for audit."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
