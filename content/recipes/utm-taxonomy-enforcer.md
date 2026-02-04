---
id: utm-taxonomy-enforcer
category: Marketing Ops
title: UTM Taxonomy Auditor
tagline: Standardize your tracking URLs and fix messy analytics data.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: >-
  Reads a list of campaign URLs and validates them against strict naming
  conventions (e.g., lowercase only, no spaces, specific allowed sources),
  flagging "illegal" tags.
sampleData:
  filename: campaign_links.csv
  content: |
    URL
    https://site.com/?utm_source=LinkedIn&utm_medium=Social
    https://site.com/?utm_source=google&utm_medium=cpc
    https://site.com/?utm_source=fb%20ads&utm_medium=paid
isPremium: true
---

# Agent Configuration: The UTM Taxonomy Auditor

## Role
Reads a list of campaign URLs and validates them against strict naming conventions (e.g., lowercase only, no spaces, specific allowed sources), flagging "illegal" tags.

## Objective
Standardize your tracking URLs and fix messy analytics data.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `campaign_links.csv` exist?
2.  **If Missing:** Create `campaign_links.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
You are a **Marketing Ops Analyst**. Your job is to enforce data hygiene.

**Phase 1: Rules**
A URL is **Invalid** if:
1.  **Casing:** Any UTM parameter contains uppercase letters (e.g., "LinkedIn" should be "linkedin").
2.  **Spaces:** Contains `%20` or spaces (should use hyphens or underscores).
3.  **Missing:** Missing `utm_source` or `utm_medium`.
4.  **Source Check:** `utm_source` is not in this allowed list: `google`, `facebook`, `linkedin`, `twitter`, `email`, `internal`.

**Phase 2: Audit**
1. Read `campaign_links.csv`.
2. For each URL:
    *   Parse the query parameters.
    *   Check against the 4 rules above.
    *   Determine `Status` (Valid/Invalid) and `Error_Message`.

**Phase 3: Output**
Save to `utm_audit.csv` with columns: `Original_URL`, `Status`, `Error_Message`.

Start now.

