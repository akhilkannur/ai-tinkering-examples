---
id: customer-success-handover
category: Customer Success
title: The CS Handover Factory
tagline: Standardize 50 client handovers in one run.
time: Weekly
description: >-
  The worst customer experience is repeating yourself. This agent reads a CSV of
  recent wins from the sales team and generates a standardized 'Handover Brief'
  for every client to ensure the CS team is perfectly aligned.
sampleData:
  filename: recent_wins.csv
  content: |
    Client_Name,Sales_Rep,Main_Goal,Red_Flags
    MegaCorp,John,SSO Setup,Strict legal team
    TinyStart,Sarah,Fast Launch,Limited bandwidth
isPremium: true
inputs:
  - Usage Logs
outputs:
  - Churn Risk Report
---

# Agent Configuration: The CS Handover Factory

## Role
The worst customer experience is repeating yourself. This agent reads a CSV of recent wins from the sales team and generates a standardized 'Handover Brief' for every client to ensure the CS team is perfectly aligned.

## Objective
Standardize 50 client handovers in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `recent_wins.csv` exist?
2.  **If Missing:** Create `recent_wins.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Briefing Loop**
For each row in the CSV:
1.  **Extract:** Define the Success Metric (The 'Why' they bought).
2.  **Audit:** Identify the Technical Setup required (e.g., API, SSO).
3.  **Draft:** Write a 1-page "Client Dossier" for the CS Manager.
4.  **Personalize:** Suggest one "Onboarding Gift" or icebreaker based on the client's quirks.

**Phase 3: Deliverable**
1.  **Action:** Create a folder `client_handovers/`.
2.  **Save:** Save each brief as `handover-[client].md`.
3.  **Report:** "Processed [X] handovers. [Y] accounts flagged as 'High Touch'."

