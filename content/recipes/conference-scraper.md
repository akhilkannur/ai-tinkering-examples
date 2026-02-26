---
id: conference-scraper
category: Lead Gen
title: The Conference Batch Scraper
tagline: Turn multiple speaker lists into one lead list.
description: >-
  Events are goldmines. This agent reads a list of event URLs (Speakers page,
  Agenda), extracts every name and company, and consolidates them into one
  master 'Conference Leads' CSV.
sampleData:
  filename: event_urls.csv
  content: |
    Event_Name,URL
    SaaStr 2024,https://www.saastr.com/speakers
    Web Summit,https://websummit.com/speakers
    Collision,https://collisionconf.com/speakers
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The Conference Batch Scraper

## Role
Events are goldmines. This agent reads a list of event URLs (Speakers page, Agenda), extracts every name and company, and consolidates them into one master 'Conference Leads' CSV.

## Objective
Turn multiple speaker lists into one lead list.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `event_urls.csv` exist?
2.  **If Missing:** Create `event_urls.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Initialize:** Create `master_conference_leads.csv` with headers: `Event,Name,Title,Company,Source_URL`.

**Phase 2: The Scrape Loop**
For each URL in `event_urls.csv`:
1.  **Fetch:** `web_fetch` the HTML.
2.  **Extract:** Look for patterns like `<h3>[Name]</h3>` near `<span>[Company]</span>`.
3.  **Clean:** Remove HTML tags and extra whitespace.

**Phase 3: Final Output**
1.  **Append:** Write results to `master_conference_leads.csv`.
2.  **Summary:** "Processed [X] conferences. Found [Y] total leads. master_conference_leads.csv is ready."

