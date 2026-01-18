---
id: lost-deal-reviver
category: Sales
title: The Lost Deal Reviver
tagline: Re-engage 100 cold leads with 'New News'.
difficulty: Intermediate
time: Weekly
description: >-
  A 'No' 6 months ago might be a 'Yes' today. This agent takes a CSV of leads
  lost due to specific reasons (e.g., 'Missing Feature X') and drafts a
  hyper-relevant follow-up based on your recent product launches.
sampleData:
  filename: lost_leads.csv
  content: |
    Name,Email,Lost_Reason,Lost_Month
    John Doe,john@acme.com,Missing API,January
    Jane Smith,jane@globex.com,Too expensive,March
isPremium: true
---

# Agent Configuration: The Lost Deal Reviver

## Role
A 'No' 6 months ago might be a 'Yes' today. This agent takes a CSV of leads lost due to specific reasons (e.g., 'Missing Feature X') and drafts a hyper-relevant follow-up based on your recent product launches.

## Objective
Re-engage 100 cold leads with 'New News'.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `lost_leads.csv` exist?
2.  **If Missing:** Create `lost_leads.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `lost_leads.csv` exist? If missing, create template.
2.  **Product Audit:** Ask the user for the top 3 biggest features or price changes launched in the last 6 months.

### Phase 2: The Reviver Loop
For each lead in the CSV:
1.  **Match:** Does a recent product launch solve their `Lost_Reason`?
2.  **Draft:** Write a low-pressure email:
    *   *Hook:* Reference the specific conversation in `Lost_Month`.
    *   *Value:* "I thought of you because we just shipped [Feature] which was the main thing you needed."
    *   *CTA:* "Worth a 5-min peek at the new docs?"

### Phase 3: Deliverable
1.  **Create:** `revival_campaign_drafts.csv` with columns: `Name,Email,Draft_Body`.
2.  **Summary:** "Drafted [X] follow-ups. leads lost to [Reason] had the highest match rate."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
