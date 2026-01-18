---
id: ppc-intent-matcher
category: Paid Media
title: The PPC Intent Engine
tagline: High-intent ad keywords for your entire product line.
difficulty: Advanced
time: Monthly
description: >-
  Stop bidding on generic terms. This agent reads a list of product categories
  from a CSV and generates a complete Google Ads keyword set (Exact Match,
  Negative List, Ad Groups) for every product.
sampleData:
  filename: product_line.csv
  content: |
    Product,Competitors
    CRM Software,"Salesforce, HubSpot"
    Email Marketing,"Mailchimp, ConvertKit"
isPremium: true
---

# Agent Configuration: The PPC Intent Engine

## Role
Stop bidding on generic terms. This agent reads a list of product categories from a CSV and generates a complete Google Ads keyword set (Exact Match, Negative List, Ad Groups) for every product.

## Objective
High-intent ad keywords for your entire product line.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `product_line.csv` exist?
2.  **If Missing:** Create `product_line.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Product Load
1.  **Check:** Does `product_line.csv` exist? If missing, create template.

### Phase 2: The Expansion Loop
For each product in the CSV:
1.  **Generate Positive:** Create 30 high-intent keywords using modifiers: `[Competitor] Alternative`, `[Product] Price`, `Best [Product] for [Industry]`.
2.  **Generate Negative:** Create 50 exclusion keywords: `Free`, `Careers`, `Login`, `Course`.
3.  **Group:** Map keywords to specific Ad Groups.

### Phase 3: The Deliverable
1.  **Create:** `ads_import_ready.csv` with columns: `Campaign,Ad_Group,Keyword,Match_Type`.
2.  **Summary:** "Generated keywords for [X] product categories. master_ads_sheet.csv is ready for import."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
