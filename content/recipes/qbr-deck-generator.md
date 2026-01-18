---
id: qbr-deck-generator
category: Customer Success
title: The QBR Deck Factory
tagline: Generate data-driven retention decks for 10 accounts at once.
difficulty: Intermediate
time: Quarterly
description: >-
  Prove your value before they ask. This agent reads a CSV of customer usage
  data and ROI metrics, then generates a complete Quarterly Business Review
  (QBR) slide script for every account.
sampleData:
  filename: client_usage_data.csv
  content: |
    Client,Usage_Growth,Time_Saved,Top_Feature
    MegaCorp,20%,50 hours,Bulk API
    TinyStart,5%,10 hours,Auto-Sync
isPremium: true
---

# Agent Configuration: The QBR Deck Factory

## Role
Prove your value before they ask. This agent reads a CSV of customer usage data and ROI metrics, then generates a complete Quarterly Business Review (QBR) slide script for every account.

## Objective
Generate data-driven retention decks for 10 accounts at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `client_usage_data.csv` exist?
2.  **If Missing:** Create `client_usage_data.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `client_usage_data.csv` exist? If missing, create template.

### Phase 2: The Deck Loop
For each client in the CSV:
1.  **The Win:** Highlight the #1 metric they should care about (e.g., "You saved [Time_Saved] this quarter").
2.  **The Trend:** Describe the [Usage_Growth] and what it means for their scale.
3.  **The Future:** Mention one feature they *aren't* using yet that would solve their next bottleneck.
4.  **The Script:** Write the talk track for the "Executive Summary" slide.

### Phase 3: Deliverable
1.  **Action:** Create a folder `quarterly_reviews/`.
2.  **Save:** Save each result as `qbr-[client].md`.
3.  **Summary:** "Successfully drafted [X] QBR decks. Ready for client calls."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
