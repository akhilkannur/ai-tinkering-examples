---
id: schema-markup-generator
category: Technical SEO
title: Bulk Schema JSON-LD Generator
tagline: Get "Rich Snippets" on Google by generating valid Schema markup.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: Converts a CSV of product or event data into valid JSON-LD Schema markup blocks ready to be pasted into your website's header.
sampleData:
  filename: products.csv
  content: |
    Name,Price,Currency,Availability,Description
    Blue Widget,29.99,USD,InStock,The best widget for your home.
    Red Gear,45.00,USD,OutOfStock,High-durability gear.
---

# What This Does
Schema markup (JSON-LD) tells Google exactly what your product's price and rating are, which often results in "Rich Results" (stars, prices in search). Writing this code manually for 100 products is impossible. This agent does it in one go.

# What You Need
- `products.csv`: A list of your inventory or events.

# What You Get
- `schema_output.txt`: A text file containing all the JSON-LD blocks.

# How to Use
1. Prepare your product CSV.
2. Run the blueprint.
3. Paste the generated code into your page headers or use a Tag Manager.

---

# Prompt

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