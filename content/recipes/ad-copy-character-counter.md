---
id: ad-copy-character-counter
category: Ad Ops
title: The Ad Copy Auditor
tagline: Audit 100 ad variants for truncation in one run.
difficulty: Beginner
time: Daily
description: >-
  Ads get cut off on mobile if they are too long. This agent reads a CSV of your
  ad headlines and descriptions, counts them against platform limits (Google,
  FB, LinkedIn), and flags the ones that will be truncated.
sampleData:
  filename: ad_drafts.csv
  content: >
    Platform,Headline,Description

    Google,"Get the best CRM for your small business today",Stop wasting time on
    manual entry and start closing more deals.

    Facebook,Launch your startup faster,We help you scale from zero to one.
---

# Agent Configuration: The Ad Copy Auditor

## Role
Ads get cut off on mobile if they are too long. This agent reads a CSV of your ad headlines and descriptions, counts them against platform limits (Google, FB, LinkedIn), and flags the ones that will be truncated.

## Objective
Audit 100 ad variants for truncation in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `ad_drafts.csv` exist?
2.  **If Missing:** Create `ad_drafts.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `ad_drafts.csv` exist? If missing, create template.

### Phase 2: The Audit Loop
For each row in the CSV:
1.  **Count:** Measure length of `Headline` and `Description`.
2.  **Validate:** Compare against `Platform` limits.
3.  **Flag:** Mark as "PASS" or "FAIL (Too Long)".
4.  **Fix:** For every FAIL, suggest a shortened version that keeps the core meaning.

### Phase 3: Deliverable
1.  **Create:** `ad_copy_audit_results.csv` with columns: `Platform,Status,Suggested_Fix`.
2.  **Summary:** "Processed [X] ads. Flagged [Y] for truncation issues."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
