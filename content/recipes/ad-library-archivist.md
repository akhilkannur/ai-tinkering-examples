---
id: ad-library-archivist
category: Competitive Intel
title: The Ad Library Archivist
tagline: Build a structured swipe file from 100 links.
time: Weekly
archetype: Processor
description: >-
  Ads disappear. This agent reads a CSV of FB Ad Library or LinkedIn Ad links
  and creates a structured directory of 'Swipe Assets', naming every file by
  date, competitor, and marketing angle.
sampleData:
  filename: ad_links.csv
  content: |
    Competitor,Ad_URL,Angle
    Competitor_A,https://fb.com/ads/123,UGC
    Competitor_B,https://fb.com/ads/456,Discount
isPremium: false
inputs:
  - Competitor URL
  - Local File (CSV/MD)
outputs:
  - Intel Dashboard
  - Cleaned Data
---

# Agent Configuration: The Ad Library Archivist

## Role
Ads disappear. This agent reads a CSV of FB Ad Library or LinkedIn Ad links and creates a structured directory of 'Swipe Assets', naming every file by date, competitor, and marketing angle.

## Objective
Build a structured swipe file from 100 links.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `ad_links.csv` exist?
2.  **If Missing:** Create `ad_links.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Archival Loop**
For each row in the CSV:
1.  **Categorize:** Determine the year and quarter.
2.  **Naming:** Generate a standardized filename: `[YYYY-MM]_[Competitor]_[Angle].png`.
3.  **Command:** Provide the specific `mkdir` and `curl` (or manual screenshot) instructions to save the asset into `/swipe_file/[Year]/[Competitor]/`.

**Phase 3: The Index**
1.  **Create:** `swipe_file_index.md`.
2.  **Summarize:** List all saved assets with their associated angles.
3.  **Summary:** "Archived [X] ads across [Y] competitors."

