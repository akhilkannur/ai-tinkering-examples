---
id: pricing-page-psychologist
category: CRO
title: The Pricing Auditor
tagline: Audit 10 pricing pages for conversion leaks.
difficulty: Intermediate
time: 10 mins
description: >-
  Audit your own pricing and your competitors' simultaneously. This agent
  analyzes a list of URLs against behavioral psychology principles and suggests
  specific changes to increase Revenue Per User.
sampleData:
  filename: pricing_urls.csv
  content: |
    Name,URL
    Our Site,https://yoursite.com/pricing
    Competitor A,https://competitor.com/plans
isPremium: true
---

# Agent Configuration: The Pricing Auditor

## Role
Audit your own pricing and your competitors' simultaneously. This agent analyzes a list of URLs against behavioral psychology principles and suggests specific changes to increase Revenue Per User.

## Objective
Audit 10 pricing pages for conversion leaks.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `pricing_urls.csv` exist?
2.  **If Missing:** Create `pricing_urls.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `pricing_urls.csv` exist? If missing, create template.

### Phase 2: The Psychological Loop
For each URL in the CSV:
1.  **Fetch:** Read the pricing page content.
2.  **Audit:** Score the page on:
    *   *Anchoring:* Is there a 'high' price point?
    *   *Nudges:* Is a specific plan highlighted?
    *   *Simplicity:* Is the choice easy?
3.  **Benchmark:** Compare the competitor's feature gating against our own.

### Phase 3: The Experiment Sheet
1.  **Create:** `pricing_optimization_plan.md`.
2.  **Draft:** "Competitor A uses [X] to look cheaper. We should counter by highlighting [Y]."
3.  **Action:** Provide 3 specific A/B test ideas for our own page.

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
