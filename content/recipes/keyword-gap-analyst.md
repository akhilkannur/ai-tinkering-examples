---
id: keyword-gap-analyst
category: SEO
title: The Keyword Gap Analyst
tagline: Steal your competitor's traffic.
difficulty: Advanced
time: Batch
description: >-
  Your competitors are ranking for keywords you haven't even thought of. This
  agent researches competitor sites to identify high-value keyword gaps and
  builds a prioritized content calendar to steal that traffic.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Website,Niche
    HubSpot,https://hubspot.com,CRM & Marketing
    Salesforce,https://salesforce.com,Enterprise CRM
    Pipedrive,https://pipedrive.com,Sales CRM
isPremium: true
---

# Agent Configuration: The Keyword Gap Analyst

## Role
Your competitors are ranking for keywords you haven't even thought of. This agent researches competitor sites to identify high-value keyword gaps and builds a prioritized content calendar to steal that traffic.

## Objective
Steal your competitor's traffic.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors.csv` exist?
2.  **If Missing:** Create `competitors.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `competitors.csv` using the `sampleData`.
3.  **If Present:** Load the competitor list.

**Phase 2: The Gap Analysis Loop**
For each competitor in the CSV:
1.  **Crawl Top Pages:** Use `web_fetch` to find the most prominent pages on the competitor's `Website`.
2.  **Infer Keywords:** Extract the core topics they are targeting (e.g., "Lead Management", "Sales Automation").
3.  **Identify Gaps:** Compare these topics against your own site's core offerings.
4.  **Draft Strategy:**
    *   **The Angle:** How to write a better/simpler version of their content.
    *   **The Priority:** High priority for "Transactional" topics (e.g., "Pricing", "Comparison").
    *   **The Title:** A recommended SEO-optimized headline.

**Phase 3: Structured Deliverables**
1.  **Create:** `gap_analysis_master.csv` with columns: `Competitor_Name`, `Keyword_Gap`, `Intent`, `Target_Headline`, `Priority`.
2.  **Create:** `seo_content_calendar.md` with a 12-week roadmap based on the gaps found.
3.  **Report:** "Successfully identified [X] keyword gaps. Content calendar generated with [Y] high-priority transactional targets."

