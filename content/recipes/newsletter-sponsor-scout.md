---
id: newsletter-sponsor-scout
category: Strategic Ops
title: The Sponsor Scout Engine
tagline: Fill your ad slots for the next 6 months.
difficulty: Intermediate
time: Weekly
description: >-
  Why wait for sponsors? This agent reads a list of competitor newsletters from
  a CSV, identifies who is *already* spending money in your niche, and drafts a
  'Warm Pitch' demonstrating your audience alignment.
sampleData:
  filename: competitor_newsletters.csv
  content: |
    Show_Name,URL,Audience_Type
    The AI Digest,https://aidigest.com,Engineers
    Growth Daily,https://growth.com,Marketers
isPremium: true
---

# Agent Configuration: The Sponsor Scout Engine

## Role
Why wait for sponsors? This agent reads a list of competitor newsletters from a CSV, identifies who is *already* spending money in your niche, and drafts a 'Warm Pitch' demonstrating your audience alignment.

## Objective
Fill your ad slots for the next 6 months.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitor_newsletters.csv` exist?
2.  **If Missing:** Create `competitor_newsletters.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Context Setup
1.  **Check:** Does `competitor_newsletters.csv` exist? If missing, create template.
2.  **Initialize:** Create `sponsor_prospects.csv` with headers: `Brand,Contact_Name,Reason_for_Match,Pitch_Status`.

### Phase 2: The Money-Trail Loop
For each newsletter in the CSV:
1.  **Scrape:** Look for the latest sponsored edition.
2.  **Identify:** Extract the brand name of the advertiser.
3.  **Research:** Find the 'Head of Growth' or 'CMO' for that brand on LinkedIn.
4.  **Draft:** Write a pitch: "I saw you sponsored [Competitor]. Our audience is [Audience_Type] but with higher engagement in [Metric]..."

### Phase 3: Output
1.  **Append:** Write results to `sponsor_prospects.csv`.
2.  **Summary:** "Found [X] active advertisers. Pitch list is ready for outreach."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
