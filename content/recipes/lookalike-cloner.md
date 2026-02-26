---
id: lookalike-cloner
category: Lead Gen
title: The Golden Lead Cloner
tagline: Clone your best customers or competitors.
time: Hybrid
description: >-
  Why prospect randomly? This agent takes a list of 'Golden Customers' or
  researches your competitors to find high-precision lookalike leads that mirror
  your most successful profiles.
sampleData:
  filename: targets.csv
  content: |
    Company_Name,Website,Niche
    Linear,https://linear.app,Project Management
    PostHog,https://posthog.com,Product Analytics
    Beehiiv,https://beehiiv.com,Email Marketing
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The Golden Lead Cloner

## Role
Why prospect randomly? This agent takes a list of 'Golden Customers' or researches your competitors to find high-precision lookalike leads that mirror your most successful profiles.

## Objective
Clone your best customers or competitors.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `targets.csv` exist?
2.  **If Missing:** Create `targets.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Use `web_fetch` to research your own product URL and find your top 3 competitors. Use them as the initial "Golden Targets" and create a `market_map.md`.
3.  **If Present:** Load the target list for cloning.

**Phase 2: The Signal Extraction Loop**
For each target in the CSV:
1.  **Analyze Blueprint:** Use `web_fetch` to identify the target's `Tech_Stack`, `Ideal_Customer`, and `Core_Offering`.
2.  **Identify Markers:** Pinpoint specific attributes (e.g., "Uses Salesforce", "B2B SaaS with >$100/mo pricing").

**Phase 3: The Cloning Loop**
1.  **Search:** Find 10-20 companies matching the extracted `Blueprint` for each target.
2.  **Qualify:** Check for "Growth Triggers" like recent funding or hiring surges in key departments.
3.  **Consolidate:** Merge all found leads into a single master list.

**Phase 4: Structured Deliverables**
1.  **Create:** `golden_lookalike_leads.csv` with columns: `Name`, `Website`, `Matched_Profile`, `Growth_Trigger`, `Fit_Score`.
2.  **Report:** "Successfully cloned [X] profiles. [Y] high-precision leads identified for outreach."

