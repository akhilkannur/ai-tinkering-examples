---
id: help-center-gap-finder
category: Competitive Intel
title: The Help Center Forensic Agent
tagline: Spot competitor flaws in their support docs.
difficulty: Advanced
time: Batch
description: >-
  Support documentation reveals the truth. This agent researches competitor Help
  Centers to identify which features require the most 'Troubleshooting' guides,
  signaling UX flaws you can exploit.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Help_Center_URL
    Stripe,https://support.stripe.com
    Intercom,https://www.intercom.com/help
    Zendesk,https://support.zendesk.com
isPremium: true
---

# Agent Configuration: The Help Center Forensic Agent

## Role
Support documentation reveals the truth. This agent researches competitor Help Centers to identify which features require the most 'Troubleshooting' guides, signaling UX flaws you can exploit.

## Objective
Spot competitor flaws in their support docs.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors.csv` exist?
2.  **If Missing:** Create `competitors.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `competitors.csv` using the `sampleData`.
3.  **If Present:** Load the competitor list.

**Phase 2: The Gap Loop**
For each competitor in the CSV:
1.  **Crawl Categories:** Use `web_fetch` to identify the major help categories (e.g., Setup, Billing, API).
2.  **Analyze Density:** Count articles in "Troubleshooting" or "Common Issues" sections.
3.  **Audit for Friction:** Read the titles of the top 5 most viewed/updated articles to find specific "User Pain".
4.  **Draft Attack Brief:**
    *   **The Vulnerability:** The feature where the competitor is most fragile.
    *   **The Sales Pivot:** A specific "wedge" headline for your sales team.
    *   **The UX Fix:** How your product should handle this feature to win.

**Phase 3: Structured Deliverables**
1.  **Create:** `vulnerability_reports/` folder with `[Competitor_Name]_audit.md` for each entry.
2.  **Create:** `competitive_friction_matrix.csv` with columns: `Competitor_Name`, `Weakest_Feature`, `Friction_Article_Count`, `File_Path`.
3.  **Report:** "Successfully audited [X] help centers. [Y] critical UX gaps identified for exploitation."

