---
id: ghost-job-hunter
category: Lead Gen
title: The Ghost Job Engine
tagline: Uncover 50 hidden openings across 10 niches.
description: >-
  High-growth startups often have budget to hire before they have the time to
  post a job. This agent reads a list of niches from a CSV, finds recently
  funded startups, identifies key leadership gaps, and drafts 'Ready-to-Send'
  pitches.
sampleData:
  filename: niches_to_hunt.csv
  content: |
    Niche,Target_Role
    Fintech,Head of Sales
    Cybersecurity,Founding Engineer
    Web3,Growth Marketer
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The Ghost Job Engine

## Role
High-growth startups often have budget to hire before they have the time to post a job. This agent reads a list of niches from a CSV, finds recently funded startups, identifies key leadership gaps, and drafts 'Ready-to-Send' pitches.

## Objective
Uncover 50 hidden openings across 10 niches.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `niches_to_hunt.csv` exist?
2.  **If Missing:** Create `niches_to_hunt.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Signal Loop**
For each niche in the CSV:
1.  **Search:** Find companies in [Niche] that raised >$10M in the last 60 days.
2.  **Audit:** Visit their Careers page. Verify they do NOT have a listing for the `Target_Role`.
3.  **Identify:** Find the CEO/Founder on LinkedIn.
4.  **Hypothesize:** Based on the funding announcement, draft a "Hypothesis of Need" (e.g., "They raised to launch in Asia, but don't have a GM for APAC").

**Phase 3: The Pitch Kit**
1.  **Draft:** Create 3 pitches for each valid opportunity.
2.  **Save:** Create `ghost_job_opportunities.md` with the full dossiers.
3.  **Summary:** "Found [X] ghost job opportunities. pitches are ready for DMing."

