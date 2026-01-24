---
id: lead-magnet-generator
category: Lead Gen
title: The Lead Magnet Factory
tagline: Build a library of assets from customer pains.
difficulty: Beginner
time: 20 mins
description: >-
  Why build one lead magnet? This agent reads a list of customer 'Pains' and
  'Desires' from a CSV and generates a complete asset brief (Outline, Title,
  Landing Page Copy) for every single one.
sampleData:
  filename: customer_segments.csv
  content: |
    Segment,Main_Pain,Desired_Outcome
    Agency Owners,Scope Creep,Profitable Projects
    SaaS Founders,Churn,High LTV
    Solo Creators,Time Management,Consistent Content
isPremium: true
---

# Agent Configuration: The Lead Magnet Factory

## Role
Why build one lead magnet? This agent reads a list of customer 'Pains' and 'Desires' from a CSV and generates a complete asset brief (Outline, Title, Landing Page Copy) for every single one.

## Objective
Build a library of assets from customer pains.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `customer_segments.csv` exist?
2.  **If Missing:** Create `customer_segments.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Production Loop**
For each segment in the CSV:
1.  **Ideate:** Create a "Utility Tool" idea (e.g., "The Profitability Calculator").
2.  **Outline:** Draft the 5 key sections of the asset.
3.  **Draft:** Write the Landing Page headline and subhead.

**Phase 3: Packaging**
1.  **Action:** Create a folder `lead_magnet_briefs/`.
2.  **Save:** Save each brief as `[Segment].md`.
3.  **Report:** "Generated [X] lead magnet briefs in /lead_magnet_briefs. Ready for design."

