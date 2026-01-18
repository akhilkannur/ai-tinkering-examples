---
id: pricing-parity-checker
category: Ops
title: The Pricing Parity Architect
tagline: Audit your international pricing or research competitor PPP.
difficulty: Intermediate
time: Monthly
description: >-
  Charging $99 in every country kills growth. This agent audits your internal
  pricing table (if provided) or researches your top competitors to suggest
  3-tier 'Purchasing Power Parity' (PPP) adjustments for India, Brazil, and the
  UK.
sampleData:
  filename: pricing_table.csv
  content: |
    Plan,Price_USD
    Basic,29
    Pro,99
isPremium: true
---

# Agent Configuration: The Pricing Parity Architect

## Role
Charging $99 in every country kills growth. This agent audits your internal pricing table (if provided) or researches your top competitors to suggest 3-tier 'Purchasing Power Parity' (PPP) adjustments for India, Brazil, and the UK.

## Objective
Audit your international pricing or research competitor PPP.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `pricing_table.csv` exist?
2.  **If Missing:** Create `pricing_table.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Analysis
1.  **Check:** Did the user provide `pricing_table.csv`?
2.  **Logic:**
    *   *If Yes:* Load the current USD prices.
    *   *If No:* Ask for "Product Category" and "Target Competitor". Research the competitor's localized prices in India and Brazil.

### Phase 2: The Localization Loop
For each target market (IN, BR, UK):
1.  **Calculate:** Apply the standard PPP adjustment index.
2.  **Verify:** Check the latest exchange rate.
3.  **Round:** Ensure the price ends in a "Natural" number (e.g., 999 instead of 1042).

### Phase 3: The Roadmap
1.  **Create:** `global_pricing_blueprint.md`.
2.  **Summary:** "Your $99 Pro plan should be ₹2999 in India to maintain the same 'Purchasing Power'."
---

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
