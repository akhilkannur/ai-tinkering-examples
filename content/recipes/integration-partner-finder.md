---
id: integration-partner-finder
category: Strategic Ops
title: The Strategic Integration Factory
tagline: Find 50 potential partners across 10 niches.
time: One-off
description: >-
  Why build one integration? This agent reads a list of adjacent tool categories
  from a CSV and identifies the top 5 high-leverage partners in each, drafting a
  'Better Together' pitch for every category.
sampleData:
  filename: partner_niches.csv
  content: |
    Niche,Target_Audience,Pain_Point
    E-com CRM,Merchants,Cart abandonment
    HR Tech,VPs of HR,Employee churn
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Strategic Integration Factory

## Role
Why build one integration? This agent reads a list of adjacent tool categories from a CSV and identifies the top 5 high-leverage partners in each, drafting a 'Better Together' pitch for every category.

## Objective
Find 50 potential partners across 10 niches.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `partner_niches.csv` exist?
2.  **If Missing:** Create `partner_niches.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Prospecting Loop**
For each niche in the CSV:
1.  **Search:** Find the top 5 players in the [Niche] that target [Target_Audience].
2.  **Verify:** Check if they have an active Partner Program page.
3.  **Draft:** Write a pitch: "Our [Product] users are asking for [Niche] automation. If we integrated, we could solve [Pain_Point] for [Target_Audience]."

**Phase 3: The Partner Map**
1.  **Create:** `strategic_partner_map.csv` with columns: `Niche,Company,URL,Partnership_Type,Draft_Email`.
2.  **Summary:** "Processed [X] niches. Identified [Y] Tier-1 partners. Ecosystem strategy is ready."
---

