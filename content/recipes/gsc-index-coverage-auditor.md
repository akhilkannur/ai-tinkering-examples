---
id: gsc-index-coverage-auditor
category: SEO
title: GSC Index Coverage Auditor
tagline: Find "Ghost Pages" (Indexed 404s) and Sitemap errors.
time: 15 mins
archetype: Processor
description: >-
  Compares your Google Search Console "Index Coverage" report against your live
  Sitemap to find "Ghost Pages" (URLs Google thinks exist but are actually 404s)
  and "Zombie Links" (Sitemap URLs that redirect).
sampleData:
  filename: gsc_coverage.csv
  content: |
    URL,Status,Reason
    https://example.com/page1,Indexed,Submitted and indexed
    https://example.com/old-page,Error,Submitted URL not found (404)
    https://example.com/ghost-page,Indexed,Submitted and indexed
sampleOutput: |
  **Audit Report**
  1. **Ghost Pages (Urgent):** 1 found.
     - `https://example.com/ghost-page` is Indexed by Google, but returns 404 Live. 
     - *Action:* 301 Redirect or "Validate Fix" in GSC.
  2. **Sitemap Rot:** 0 found.
     - All sitemap URLs return 200 OK.
inputs:
  - Target URL
  - Local File (CSV/MD)
outputs:
  - SEO Audit / Fixes
  - Cleaned Data
---

# What This Does
Google Search Console (GSC) often gets out of sync with your real website. It might think a deleted page (`/old-page`) is still "Indexed", or it might claim a fixed 404 is still broken.

This agent cross-references your **GSC Coverage Report** with your **Live Site Status** to give you a definitive "Fix List".

# What You Need
1.  **GSC Export:** Go to GSC > Pages > Export > CSV. Save the main table as `gsc_coverage.csv`.
2.  **Sitemap:** Your `sitemap.xml` file.

# What You Get
-   `ghost_pages.csv`: URLs Google lists as "Indexed" but are actually broken (404) or redirects (301) on your live site.
-   `sitemap_errors.csv`: URLs in your sitemap that aren't actually live (200 OK).
-   `action_plan.md`: A summary of which GSC issues are "Real" vs "False Positives" (so you can click "Validate Fix").

# How to Use
1.  Export your coverage report from Google Search Console.
2.  Save it as `gsc_coverage.csv` in your folder.
3.  Ensure your `sitemap.xml` is also in the folder.
4.  Run this blueprint.

---

# Prompt

You are a **Technical SEO Auditor**. Your goal is to reconcile the difference between "What Google Thinks" (GSC Data) and "What Is Real" (Live Site Status).

**Phase 1: Ingest Data**
1.  Read `gsc_coverage.csv`. (Key columns: `URL`, `Status`).
2.  Read `sitemap.xml`. (Extract all `<loc>` URLs).

**Phase 2: Live Diagnostics**
For every URL found in EITHER file, perform a **Live Status Check**:
-   **Fetch:** Curl/Get the URL.
-   **Record:** HTTP Status Code (200, 301, 404, 500).
-   **Record:** Final Destination (if redirected).

**Phase 3: Analysis Logic**
Categorize every URL into one of these buckets:
1.  **👻 Ghost Page (High Priority):**
    -   *Condition:* GSC Status = "Indexed" AND Live Status = 404/5xx.
    -   *Meaning:* Google is sending traffic to a dead page.
    -   *Action:* "Immediate 301 Redirect".
2.  **🧟 Zombie Redirect:**
    -   *Condition:* Sitemap = Yes AND Live Status = 301/308.
    -   *Meaning:* Your sitemap is dirty. It points to a redirect, not the final page.
    -   *Action:* "Update Sitemap to point to [Final Destination]".
3.  **✅ False Alarm (Validate Fix):**
    -   *Condition:* GSC Status = "Error/404" AND Live Status = 301 (Redirected) OR 200 (Fixed).
    -   *Meaning:* You fixed it, but Google hasn't updated.
    -   *Action:* "Click 'Validate Fix' in GSC".

**Phase 4: Output**
1.  Save `audit_results.csv` with columns: `URL`, `GSC_Status`, `Live_Status`, `Sitemap_Present`, `Category`, `Recommended_Action`.
2.  Generate a summary `action_plan.md`:
    -   List top 5 "Ghost Pages" to fix immediately.
    -   Count of "False Alarms" where the user should just click "Validate Fix".

Start now.
