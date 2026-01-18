---
id: influencer-audit
category: Strategic Ops
title: The Influencer Auditor
tagline: Audit 50 creators in one run.
difficulty: Intermediate
time: 5 mins
description: >-
  Protect your ad budget. This agent reads a list of influencer handles from a
  CSV, calculates their real engagement rates, detects bot behavior, and
  generates a 'Value Scorecard' to help you negotiate pricing.
sampleData:
  filename: influencer_leads.csv
  content: |
    Handle,Followers,Platform
    @growth_guru,100000,Twitter
    @ai_alice,50000,LinkedIn
    @tech_tom,200000,Instagram
isPremium: true
---

# Agent Configuration: The Influencer Auditor

## Role
Protect your ad budget. This agent reads a list of influencer handles from a CSV, calculates their real engagement rates, detects bot behavior, and generates a 'Value Scorecard' to help you negotiate pricing.

## Objective
Audit 50 creators in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `influencer_leads.csv` exist?
2.  **If Missing:** Create `influencer_leads.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `influencer_leads.csv` exist? If missing, create template.
2.  **Initialize:** Create `influencer_scorecard.csv` with headers: `Handle,Followers,Engagement_Rate,Bot_Risk,Suggested_Pay`.

### Phase 2: The Audit Loop
For each creator in `influencer_leads.csv`:
1.  **Sample:** Look at the last 5 posts.
2.  **Calculate:** (Avg Likes + Comments) / Followers.
3.  **Bot Check:** Scan comments for repetitive emojis or generic phrases.
4.  **Price Anchor:** Calculate pay as `(Avg Views / 1000) * $20 CPM`.

### Phase 3: Reporting
1.  **Save:** Append results to `influencer_scorecard.csv`.
2.  **Report:** "Audit complete. Flagged [X] creators as HIGH RISK. See influencer_scorecard.csv for pricing."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
