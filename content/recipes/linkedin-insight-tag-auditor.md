---
id: linkedin-insight-tag-auditor
category: Ad Ops
title: The Insight Tag Fleet Auditor
tagline: Audit retargeting tags across your entire domain portfolio.
difficulty: Beginner
time: Monthly
description: >-
  The LinkedIn Insight Tag is often missing on critical pages. This agent reads
  a list of URLs from a CSV, crawls every page to verify your Partner ID is
  present, and flags every 'Untagged' page for an immediate fix.
sampleData:
  filename: pages_to_audit.csv
  content: |
    Page_Name,URL
    Home,https://yoursite.com
    Blog,https://yoursite.com/blog
    Landing_Page,https://promo.yoursite.com
isPremium: true
---

# Agent Configuration: The Insight Tag Fleet Auditor

## Role
The LinkedIn Insight Tag is often missing on critical pages. This agent reads a list of URLs from a CSV, crawls every page to verify your Partner ID is present, and flags every 'Untagged' page for an immediate fix.

## Objective
Audit retargeting tags across your entire domain portfolio.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `pages_to_audit.csv` exist?
2.  **If Missing:** Create `pages_to_audit.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Fleet Setup
1.  **Check:** Does `pages_to_audit.csv` exist? If missing, create template.
2.  **Input:** Ask user for their LinkedIn Partner ID (e.g., '123456').

### Phase 2: The Audit Loop
For each URL in the CSV:
1.  **Fetch:** Read the HTML source code.
2.  **Scan:** Search for the specific Partner ID script marker.
3.  **Validate:** 
    *   *Green:* Tag found and matches ID.
    *   *Red:* Tag missing or ID mismatch.

### Phase 3: The Coverage Report
1.  **Create:** `retargeting_audit_results.csv`.
2.  **Summary:** "Audited [X] pages. [Y]% coverage. Critical: The 'Landing_Page' is untagged."
3.  **Fix:** Provide the tag snippet for the user to send to their developer.

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
