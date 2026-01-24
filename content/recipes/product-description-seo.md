---
id: product-description-seo
category: E-commerce
title: The SKU SEO Factory
tagline: Rewrite 100 product descriptions for search in minutes.
difficulty: Beginner
time: 10 mins
description: >-
  Copy-pasted manufacturer descriptions hurt your SEO. This agent reads a CSV of
  your product catalog and rewrites every description to include long-tail
  keywords and benefit-driven bullets.
sampleData:
  filename: catalog_raw.csv
  content: >
    SKU,Name,Raw_Features,Target_Keyword

    HIK-01,Trekking Boots,Leather, waterproof,Vibram sole,Waterproof hiking
    boots

    TENT-02,Alpine Tent,2-person, 4-season, ultralight,Lightweight camping tent
isPremium: true
---

# Agent Configuration: The SKU SEO Factory

## Role
Copy-pasted manufacturer descriptions hurt your SEO. This agent reads a CSV of your product catalog and rewrites every description to include long-tail keywords and benefit-driven bullets.

## Objective
Rewrite 100 product descriptions for search in minutes.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `catalog_raw.csv` exist?
2.  **If Missing:** Create `catalog_raw.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Rewrite Loop**
For each row in the CSV:
1.  **Contextualize:** Read the `Raw_Features`.
2.  **Optimize:** Draft a 200-word description:
    *   *H1:* [Name] + [Target_Keyword].
    *   *Body:* Use the "PAS" framework.
    *   *Bullets:* Convert every tech spec into a user benefit.
3.  **Validate:** Ensure the `Target_Keyword` appears exactly twice.

**Phase 3: Catalog Export**
1.  **Create:** `optimized_catalog.csv` with columns: `SKU,Name,SEO_Description,Meta_Description`.
2.  **Report:** "Successfully optimized [X] product descriptions. Ready for Shopify/Amazon upload."

