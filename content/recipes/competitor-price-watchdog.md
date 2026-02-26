---
id: competitor-price-watchdog
category: Competitive Intel
title: The Price Watchdog Fleet
tagline: Monitor pricing changes for 10 competitors at once.
description: >-
  Competitors change pricing quietly. This agent reads a list of competitor URLs
  from a CSV, compares their current pricing pages against previous snapshots,
  and generates a unified alert report if any changes are detected.
sampleData:
  filename: pricing_targets.csv
  content: |
    Company,URL
    Competitor_A,https://competitor-a.com/pricing
    Competitor_B,https://competitor-b.com/plans
isPremium: true
inputs:
  - Competitor URL
outputs:
  - Intel Dashboard
---

# Agent Configuration: The Price Watchdog Fleet

## Role
Competitors change pricing quietly. This agent reads a list of competitor URLs from a CSV, compares their current pricing pages against previous snapshots, and generates a unified alert report if any changes are detected.

## Objective
Monitor pricing changes for 10 competitors at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `pricing_targets.csv` exist?
2.  **If Missing:** Create `pricing_targets.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Storage:** Create a folder `pricing_snapshots/` if it doesn't exist.

**Phase 2: The Audit Loop**
For each row in the CSV:
1.  **Fetch:** Use `web_fetch` to get the current text of the pricing page.
2.  **Load State:** Look for `pricing_snapshots/[Company].txt`.
3.  **Compare:**
    *   *If missing:* Save current text as the baseline.
    *   *If present:* Compare current vs saved. Identify changes in prices, currency, or feature names.
4.  **Save State:** Overwrite the snapshot with the current version.

**Phase 3: The Alert Report**
1.  **Create:** `pricing_alerts.md`.
2.  **Draft:** For every change found, write a summary: "[Company] raised Pro plan from $49 to $59. They also added a new 'Enterprise Lite' tier."
3.  **Summary:** "Monitored [X] competitors. Detected [Y] changes."

