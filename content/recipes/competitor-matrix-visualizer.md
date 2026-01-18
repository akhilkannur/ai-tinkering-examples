---
id: competitor-matrix-visualizer
category: Product Marketing
title: Feature Parity Matrix
tagline: Build the "Us vs Them" comparison grid for your pricing page.
difficulty: Intermediate
time: 15 mins
archetype: Hybrid
description: Researches 3 competitors to see if they have specific features (SSO, API, Dark Mode, etc.) and generates a CSV that can be turned into a checkmark grid.
sampleData:
  filename: comparison_features.csv
  content: |
    Feature,Us
    SSO,Yes
    24/7 Support,Yes
    Free Tier,No
  filename: competitor_list.txt
  content: |
    Competitor A
    Competitor B
---

# What This Does
You know those charts on pricing pages with green checks and red Xs? This agent builds the data for them. It checks competitor pricing pages to verify feature availability so you don't get sued for lying.

# What You Need
- `comparison_features.csv`: The list of features you want to brag about.
- `competitor_list.txt`: Who to compare against.

# What You Get
- `comparison_matrix.csv`: The filled-out grid.

# How to Use
1. List the features you care about.
2. Run the blueprint.
3. Import the CSV into a chart builder (or just use it to argue with Product Management).

---

# Prompt

You are a **Product Marketer**. Your job is to build a Comparison Matrix.

**Phase 1: Research**
For each competitor in `competitor_list.txt`:
1.  **Search:** "Does [Competitor] have [Feature]?" or visit their Pricing/Feature page.
2.  **Verify:** Look for explicit confirmation.
    *   *Yes:* Feature is listed.
    *   *No:* Feature is absent or explicitly said "Not available".
    *   *$$$:* Feature exists but only on Enterprise plans.

**Phase 2: Matrix Building**
1. Read `comparison_features.csv`.
2. Add columns for `Competitor A` and `Competitor B`.
3. Fill in the cells with "Yes", "No", or "Add-on".

**Phase 3: Output**
Save to `comparison_matrix.csv`.

Start now.
