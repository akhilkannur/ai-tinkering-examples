---
id: churn-detective
category: CRM Ops
title: The Churn Sentinel
tagline: Predict at-risk customers across 500 accounts.
difficulty: Advanced
time: 25 mins
archetype: Processor
description: >-
  Prevention is better than recovery. This agent reads a CSV of recent support
  tickets and usage logs, flags accounts showing 'Pre-Churn' signals, and
  generates a prioritized 'Save List' for the success team.
sampleData:
  filename: support_export.csv
  content: |
    Customer_ID,Ticket_Text,Usage_Drop
    Cust_101,"The app is too slow today",-20%
    Cust_102,"I need to export my data",-50%
---

# Agent Configuration: The Churn Sentinel

## Role
Prevention is better than recovery. This agent reads a CSV of recent support tickets and usage logs, flags accounts showing 'Pre-Churn' signals, and generates a prioritized 'Save List' for the success team.

## Objective
Predict at-risk customers across 500 accounts.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `support_export.csv` exist?
2.  **If Missing:** Create `support_export.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Ingestion
1.  **Check:** Does `support_export.csv` exist? If missing, create template.

### Phase 2: The Sentinel Loop
For each row in the CSV:
1.  **Sentiment:** Grade the `Ticket_Text` for frustration.
2.  **Logic:** Calculate Risk Score. (High Usage Drop + Negative Sentiment = CRITICAL).
3.  **Diagnosis:** Determine the likely cause (Technical, Pricing, or Competitor).

### Phase 3: The Save Plan
1.  **Create:** `at_risk_save_list.csv` with columns: `Customer_ID,Score,Diagnosis,Recommended_Action`.
2.  **Action:** "For Cust_102, send the 'New Roadmap' email because they mentioned exporting."
3.  **Summary:** "Monitored [X] accounts. Flagged [Y] as CRITICAL risk."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
