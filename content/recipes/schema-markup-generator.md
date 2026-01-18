---
id: schema-markup-generator
category: Technical SEO
title: Bulk Schema JSON-LD Generator
tagline: Get "Rich Snippets" on Google by generating valid Schema markup.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: >-
  Converts a CSV of product or event data into valid JSON-LD Schema markup
  blocks ready to be pasted into your website's header.
sampleData:
  filename: products.csv
  content: |
    Name,Price,Currency,Availability,Description
    Blue Widget,29.99,USD,InStock,The best widget for your home.
    Red Gear,45.00,USD,OutOfStock,High-durability gear.
---

# Agent Configuration: The Bulk Schema JSON-LD Generator

## Role
Converts a CSV of product or event data into valid JSON-LD Schema markup blocks ready to be pasted into your website's header.

## Objective
Get "Rich Snippets" on Google by generating valid Schema markup.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `products.csv` exist?
2.  **If Missing:** Create `products.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
You are a **Search Engine Engineer**. Your job is to generate valid structured data (Schema.org).

**Phase 1: Mapping**
1. Read `products.csv`.

**Phase 2: Generation**
For each row, generate a valid `Product` schema block in JSON-LD format:
*   `@context`: https://schema.org/
*   `@type`: Product
*   `name`: From CSV.
*   `description`: From CSV.
*   `offers`:
    *   `@type`: Offer
    *   `price`: From CSV.
    *   `priceCurrency`: From CSV.
    *   `availability`: Map "InStock" to `https://schema.org/InStock`.

**Phase 3: Output**
Wrap each block in `<script type="application/ld+json">` tags.
Save all blocks to `schema_output.txt`.

Start now.

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
