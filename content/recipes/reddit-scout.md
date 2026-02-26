---
id: reddit-scout
category: Lead Gen
title: The Reddit Signal Scout
tagline: Monitor 50 subreddits for buying signals.
time: Daily
description: >-
  Reddit is full of people asking 'What's the best tool for X?'. This agent
  reads a list of keywords and subreddits from a CSV, identifies high-intent
  threads, and drafts non-spammy responses.
sampleData:
  filename: reddit_monitor.csv
  content: |
    Subreddit,Keyword,Intent_Signal
    r/SaaS,Best CRM,Looking for recommendations
    r/Marketing,Automate email,Process pain
    r/Entrepreneur,Alternative to HubSpot,Switching intent
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The Reddit Signal Scout

## Role
Reddit is full of people asking 'What's the best tool for X?'. This agent reads a list of keywords and subreddits from a CSV, identifies high-intent threads, and drafts non-spammy responses.

## Objective
Monitor 50 subreddits for buying signals.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `reddit_monitor.csv` exist?
2.  **If Missing:** Create `reddit_monitor.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Sweep Loop**
For each row in the CSV:
1.  **Search:** Look for posts in `Subreddit` containing `Keyword` from the last 48 hours.
2.  **Filter:** Only keep posts that match the `Intent_Signal`.
3.  **Draft:** Write a comment:
    *   *Step 1:* Validate their problem ("I struggled with X too").
    *   *Step 2:* Give generic advice ("You should look for a tool that does Y").
    *   *Step 3:* Mention product ("We built [Product] specifically for this...").

**Phase 3: Deliverable**
1.  **Create:** `reddit_opportunities.md` listing the Post URL and the Draft Comment.
2.  **Summary:** "Found [X] buying signals across [Y] subreddits."

