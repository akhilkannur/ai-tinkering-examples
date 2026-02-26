---
id: case-study-reverse-engineer
category: Competitive Intel
title: The Case Study Decoder
tagline: Who are they really selling to?
time: Batch
archetype: Hybrid
description: >-
  Logos reveal strategy. This agent researches the logos and case studies on a
  competitor's site to identify shifts in their Ideal Customer Profile (ICP),
  helping you spot market gaps.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Website,Primary_Product
    Vanta,https://vanta.com,Compliance
    Mercury,https://mercury.com,Banking
    Loom,https://loom.com,Video Messaging
isPremium: false
inputs:
  - Competitor URL
  - Local File + Search
outputs:
  - Intel Dashboard
  - Enriched Document
---

# Agent Configuration: The Case Study Decoder

## Role
Logos reveal strategy. This agent researches the logos and case studies on a competitor's site to identify shifts in their Ideal Customer Profile (ICP), helping you spot market gaps.

## Objective
Who are they really selling to?

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors.csv` exist?
2.  **If Missing:** Create `competitors.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `competitors.csv` using the `sampleData`.
3.  **If Present:** Load the competitor list.

**Phase 2: The Audit Loop**
For each competitor in the CSV:
1.  **Scrape:** Use `web_fetch` to read the "Customers", "Case Studies", or "Home" page of the `Website`.
2.  **Analyze Logos:** Identify the top 5-10 logos.
3.  **Segment:**
    *   **Startup:** High-growth, venture-backed companies.
    *   **Mid-Market:** Established brands (50-1000 employees).
    *   **Enterprise:** Fortune 500 or global conglomerates.
4.  **Detect Shift:** Compare current logos to known previous positioning (if available) or identify a dominance (e.g., "80% of logos are Enterprise").

**Phase 3: Structured Deliverables**
1.  **Create:** `market_positioning_audit.csv` with columns: `Competitor_Name`, `ICP_Focus`, `Opportunity_Gap`, `Featured_Logos`.
2.  **Create:** `reports/[Competitor_Name]_shift.md` with a detailed breakdown of their strategy.
3.  **Report:** "Successfully decoded [X] competitor strategies. Strategic gaps identified for your sales team."

