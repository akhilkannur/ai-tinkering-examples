---
id: alternative-to-builder
category: SEO
title: The 'Alternative To' Hub Builder
tagline: Steal traffic from all your competitors at once.
time: 30 mins
archetype: Hybrid
description: >-
  High-intent buyers search for 'Alternatives to [Competitor]'. This agent reads
  a list of competitors from a CSV, researches their weaknesses, and generates a
  library of comparison landing pages that position YOUR product as the winner.
sampleData:
  filename: competitors_to_compare.csv
  content: |
    Competitor_Name,Main_Use_Case
    Salesforce,Enterprise CRM
    HubSpot,Marketing Automation
    Pipedrive,SMB Sales
isPremium: false
inputs:
  - Target URL
  - Local File + Search
outputs:
  - SEO Audit / Fixes
  - Enriched Document
---

# Agent Configuration: The 'Alternative To' Hub Builder

## Role
High-intent buyers search for 'Alternatives to [Competitor]'. This agent reads a list of competitors from a CSV, researches their weaknesses, and generates a library of comparison landing pages that position YOUR product as the winner.

## Objective
Steal traffic from all your competitors at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors_to_compare.csv` exist?
2.  **If Missing:** Create `competitors_to_compare.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Intel Loop**
For each competitor in the CSV:
1.  **Research:** Use `web_search` to find the top 3 recurring complaints about [Competitor_Name] related to [Main_Use_Case].
2.  **Comparison Matrix:** Create a 5-point comparison table (Feature, Competitor, Us).
3.  **Draft:** Write the "Switching Story" (Why migrate now?).

**Phase 3: Hub Generation**
1.  **Action:** Create a folder `comparison_pages/`.
2.  **Save:** Save each page as `alternative-to-[competitor].md`.
3.  **Report:** "Generated [X] comparison pages in /comparison_pages. Ready for Webflow/Wordpress upload."

