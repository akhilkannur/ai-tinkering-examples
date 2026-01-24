---
id: social-intent-scout
category: Lead Gen
title: The Social Signal Engine
tagline: Find 100 leads asking for help across Reddit & LinkedIn.
difficulty: Advanced
time: 20 mins
description: >-
  Leads with intent convert 10x better. This agent reads a list of 'Pain Point
  Keywords' from a CSV, scans social communities for people explicitly asking
  for help, and builds a prioritized outreach list.
sampleData:
  filename: intent_keywords.csv
  content: |
    Keyword,Platform
    "need a crm",Reddit
    "email deliverability issues",LinkedIn
isPremium: true
---

# Agent Configuration: The Social Signal Engine

## Role
Leads with intent convert 10x better. This agent reads a list of 'Pain Point Keywords' from a CSV, scans social communities for people explicitly asking for help, and builds a prioritized outreach list.

## Objective
Find 100 leads asking for help across Reddit & LinkedIn.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `intent_keywords.csv` exist?
2.  **If Missing:** Create `intent_keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Listening Loop**
For each row in the CSV:
1.  **Execute:** Run advanced search queries for `[Keyword] "looking for"` or `[Keyword] "help needed"`.
2.  **Filter:** Ignore vendor spam and bot posts. Keep only genuine users.
3.  **Audit:** Categorize the "Pain" (Price vs UX vs Gap).
4.  **Score:** Assign an Urgency Score (1-10) based on the time-sensitivity of the post.

**Phase 3: Lead Export**
1.  **Create:** `high_intent_social_leads.csv` with columns: `Source_URL,Category,Urgency,Contact_Handle`.
2.  **Summary:** "Processed [X] signals. Identified [Y] high-urgency leads ready for DMing."

