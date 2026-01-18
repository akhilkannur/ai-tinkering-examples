---
id: content-refresh-detector
category: SEO
title: The Portfolio Refresh Engine
tagline: Revive dead content across 10 domains.
difficulty: Intermediate
time: Monthly
description: >-
  Google punishes stale sites. This agent reads a list of domains from a CSV,
  crawls their sitemaps to find posts older than 12 months, and generates a
  prioritized 'Refresh List' to regain rankings.
sampleData:
  filename: site_portfolio.csv
  content: |
    Site_Name,Sitemap_URL
    Main_Blog,https://yoursite.com/sitemap.xml
    Microsite_A,https://microsite.com/sitemap.xml
isPremium: true
---

# Agent Configuration: The Portfolio Refresh Engine

## Role
Google punishes stale sites. This agent reads a list of domains from a CSV, crawls their sitemaps to find posts older than 12 months, and generates a prioritized 'Refresh List' to regain rankings.

## Objective
Revive dead content across 10 domains.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `site_portfolio.csv` exist?
2.  **If Missing:** Create `site_portfolio.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Portfolio Setup
1.  **Check:** Does `site_portfolio.csv` exist? If missing, create template.

### Phase 2: The Audit Loop
For each site in the CSV:
1.  **Parse:** Read the sitemap to find all URLs.
2.  **Filter:** Keep only those where `Last_Modified` > 1 year ago.
3.  **Audit:** For the "Stale" links, check the Title. If it contains an old year (e.g., "2022"), mark as CRITICAL.
4.  **Prescribe:** Generate a refresh action: "Update Year", "Add new stats", or "Remove dead links".

### Phase 3: The Triage Masterlist
1.  **Create:** `portfolio_refresh_triage.csv` with columns: `Site,URL,Age,Severity,Action`.
2.  **Summary:** "Processed [X] sites. Found [Y] posts that are losing authority due to age."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
