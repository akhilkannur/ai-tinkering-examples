---
id: canonical-tag-auditor
category: SEO
title: The Canonical Fleet Auditor
tagline: Audit duplicate content across 1000 pages.
difficulty: Intermediate
time: Monthly
archetype: Processor
description: >-
  Duplicate content kills rankings. This agent reads your `sitemap.xml` (or a
  list of URLs), crawls every page to verify the Canonical tag is correct, and
  identifies pages that are 'cannibalizing' your main traffic.
sampleData:
  filename: target_urls.csv
  content: |
    URL
    https://yoursite.com/
    https://yoursite.com/blog/post-1
---

# Agent Configuration: The Canonical Fleet Auditor

## Role
Duplicate content kills rankings. This agent reads your `sitemap.xml` (or a list of URLs), crawls every page to verify the Canonical tag is correct, and identifies pages that are 'cannibalizing' your main traffic.

## Objective
Audit duplicate content across 1000 pages.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `target_urls.csv` exist?
2.  **If Missing:** Create `target_urls.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `target_urls.csv` exist? If missing, read `sitemap.xml` to generate it.

### Phase 2: The Audit Loop
For each URL in the list:
1.  **Fetch:** Read the HTML source.
2.  **Scan:** Find the canonical tag.
3.  **Validate:**
    *   *Self-Referencing?* (Good).
    *   *Pointing elsewhere?* (Verify if intentional).
    *   *Missing?* (Flag as Error).
4.  **Compare:** If tag points to a *different* URL, check if that URL is alive.

### Phase 3: The Error Log
1.  **Create:** `canonical_audit_report.csv` with columns: `URL,Canonical_Found,Status,Issue`.
2.  **Summary:** "Audited [X] pages. Found [Y] missing tags and [Z] mismatched tags."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
