---
id: partner-page-scraper
category: Competitive Intel
title: The Partner Page Scraper
tagline: Poach their agencies.
description: >-
  Agency partners drive massive distribution. This agent researches competitor
  partner directories to identify high-value service partners you can recruit to
  your own ecosystem.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Partner_Directory_URL
    Klaviyo,https://www.klaviyo.com/partners/agency
    Shopify,https://experts.shopify.com
    HubSpot,https://www.hubspot.com/solutions-directory
isPremium: true
inputs:
  - Competitor URL
outputs:
  - Intel Dashboard
---

# Agent Configuration: The Partner Page Scraper

## Role
Agency partners drive massive distribution. This agent researches competitor partner directories to identify high-value service partners you can recruit to your own ecosystem.

## Objective
Poach their agencies.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors.csv` exist?
2.  **If Missing:** Create `competitors.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `competitors.csv` using the `sampleData`.
3.  **If Present:** Load the competitor directory list.

**Phase 2: The Scraping Loop**
For each competitor in the CSV:
1.  **Crawl Directory:** Use `web_fetch` to ingest the `Partner_Directory_URL`.
2.  **Extract Entities:** Identify partner names, logos, and descriptions.
3.  **Validate Links:** Find the direct website URL for each agency.
4.  **Tier Identification:** Note if an agency is a "Platinum", "Gold", or "Elite" partner (indicating high volume).

**Phase 3: The Recruitment Pitch**
1.  **Personalize:** For each extracted agency, draft a "Switch Pitch": "I see you are a [Tier] Partner for [Competitor_Name]. We've built [Unique Feature] that helps agencies like yours increase margins."
2.  **Asset Creation:** Generate `pitches/[Agency_Name]_invite.md`.

**Phase 4: Structured Deliverables**
1.  **Create:** `potential_partners_master.csv` with columns: `Agency_Name`, `Website`, `Competitor_Affiliation`, `Tier`, `File_Path`.
2.  **Report:** "Successfully mined [X] agency partners across [Y] competitors. High-tier recruits flagged for immediate outreach."

