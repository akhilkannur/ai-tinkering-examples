---
id: technical-seo-doctor
category: SEO
title: The SEO Doctor
tagline: Technical Site Audit at scale.
difficulty: Advanced
time: Batch
description: >-
  Performs technical audits on multiple URLs simultaneously. This agent checks
  for critical failures like missing H1s, broken meta tags, and accessibility
  issues across your entire site.
sampleData:
  filename: landing_pages.csv
  content: |
    Page_Name,URL,Target_Keyword
    Homepage,https://mysite.com,SaaS Automation
    Features,https://mysite.com/features,Feature Workflow
    Pricing,https://mysite.com/pricing,SaaS Pricing
isPremium: true
---

# Agent Configuration: The SEO Doctor

## Role
Performs technical audits on multiple URLs simultaneously. This agent checks for critical failures like missing H1s, broken meta tags, and accessibility issues across your entire site.

## Objective
Technical Site Audit at scale.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `landing_pages.csv` exist?
2.  **If Missing:** Create `landing_pages.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `landing_pages.csv` exist?
2.  **If Missing:** Create `landing_pages.csv` using the `sampleData`.
3.  **If Present:** Load the URL list.

### Phase 2: The Diagnostic Loop
For each URL in the CSV:
1.  **Fetch Source:** Use `web_fetch` to ingest the HTML content.
2.  **Run Diagnostics:**
    *   **Heads:** Verify presence of `<title>` and `<meta name="description">`.
    *   **Structure:** Count `<h1>` tags (should be exactly 1) and check hierarchy.
    *   **Assets:** Identify images without `alt` attributes.
    *   **Links:** Flag generic anchor text like "click here".
3.  **Assign Grade:** Give a technical score (A-F) based on error density.
4.  **Draft Fixes:** List the top 3 critical issues to resolve immediately.
5.  **Output:** Save to `seo_audits/[Page_Name]_diagnostic.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `site_health_matrix.csv` with columns: `Page_Name`, `SEO_Grade`, `Missing_H1`, `Missing_Meta`, `File_Path`.
2.  **Report:** "Successfully audited [X] pages. [Y] pages flagged with failing grades (D/F) requiring urgent technical attention."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
