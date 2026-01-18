---
id: redirect-chain-fixer
category: Technical SEO
title: Redirect Chain Flattener
tagline: Fix "Redirect Hops" to improve site speed and SEO.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of redirects (Source -> Destination), identifies chains where Page A goes to Page B, and Page B goes to Page C, and provides a "Flattened" list (Page A -> Page C).
sampleData:
  filename: redirects.csv
  content: |
    Source,Destination
    /old-page,/new-page
    /new-page,/final-page
    /blog/old-post,/blog/new-post
---

# What This Does
Redirect chains (A -> B -> C) slow down your website and lose "Link Juice." This agent identifies these multi-step hops and gives you a clean list to update in your `.htaccess` or CMS so every redirect is one-to-one.

# What You Need
- `redirects.csv`: A list of your current site redirects.

# What You Get
- `fixed_redirects.csv`: A list of cleaned, 1-step redirects.

# How to Use
1. Export your redirect list.
2. Run the blueprint.
3. Import the flattened list to your server.

---

# Prompt

You are a **Performance Engineer**. Your job is to optimize redirect logic.

**Phase 1: Analysis**
1. Read `redirects.csv`.
2. Build a map of all `Source` -> `Destination` pairs.

**Phase 2: Chain Detection**
1.  Iterate through the list.
2.  If a `Destination` in one row is also a `Source` in another row, you have found a chain.
3.  **Flatten:** Follow the chain to the very end.
    *   *Example:* A->B and B->C becomes A->C.
    *   *Example:* A->B, B->C, C->D becomes A->D.

**Phase 3: Output**
Save to `fixed_redirects.csv`:
1.  All original 1-step redirects.
2.  All newly flattened redirects.
3.  Include a column `Type` ("Original" or "Flattened").

Start now.