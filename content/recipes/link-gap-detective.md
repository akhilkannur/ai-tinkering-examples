---
id: link-gap-detective
category: SEO
title: The Link Gap Detective
tagline: Find missing backlink opportunities.
description: >-
  Why do they rank and you don't? Links. This agent identifies websites that
  link to your competitors (or list 'Best Tools') but haven't linked to you yet,
  generating a targeted outreach list.
sampleData:
  filename: competitors_and_keywords.csv
  content: |
    Competitor_Name,Search_Query
    CompetitorA,"best crm software 2024"
    CompetitorB,"top sales tools for startups"
    CompetitorC,"CompetitorC reviews"
isPremium: true
inputs:
  - Target URL
outputs:
  - SEO Audit / Fixes
---

# Agent Configuration: The Link Gap Detective

## Role
Why do they rank and you don't? Links. This agent identifies websites that link to your competitors (or list 'Best Tools') but haven't linked to you yet, generating a targeted outreach list.

## Objective
Find missing backlink opportunities.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors_and_keywords.csv` exist?
2.  **If Missing:** Create `competitors_and_keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create it using the `sampleData`.
3.  **If Present:** Load the data.

**Phase 2: The Detective Loop**
For each row in the CSV:
1.  **Run Search:** Execute `google_web_search` for the `Search_Query` (or construct a query like `"Competitor_Name" -site:competitor.com`).
2.  **Filter Results:** Look for:
    *   **Listicles:** "Top 10 Tools for..."
    *   **Resource Pages:** "Useful links for..."
    *   **Comparisons:** "CompetitorA vs CompetitorB"
3.  **Qualify:** Is your site *missing* from this page? (Simulated check or user verification).
4.  **Extract Contact Context:** Note the site name and the specific context (e.g., "They listed 5 CRMs").

**Phase 3: Structured Deliverables**
1.  **Create:** `link_opportunities.csv` with columns: `Source_URL`, `Page_Type`, `Competitor_Mentioned`, `Outreach_Strategy`.
2.  **Create:** `outreach_campaign.md` containing personalized email templates for each verified opportunity:
    *   **Subject:** "Quick question about your [Page Title]"
    *   **Body:** "Hi [Name], loved your list of [Topic]. I noticed you included [Competitor]. We actually just launched [My_Product] which solves [Problem] differently by..."
3.  **Report:** "Found [X] unlinked mentions and [Y] resource page opportunities. Outreach drafts prepared."

