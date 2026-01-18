---
id: invoice-chaser-sequence
category: Finance
title: The Invoice Chaser Engine
tagline: Recover $10k+ in overdue payments without being awkward.
difficulty: Beginner
time: Weekly
description: >-
  Unpaid invoices kill cash flow. This agent reads a CSV of overdue accounts,
  categorizes them by 'Days Overdue', and drafts a 3-step personalized dunning
  sequence for every client.
sampleData:
  filename: overdue_invoices.csv
  content: |
    Client_Name,Email,Amount,Days_Overdue
    MegaCorp,billing@megacorp.com,5000,5
    SmallStart,founder@small.com,1200,35
isPremium: true
---

# Agent Configuration: The Invoice Chaser Engine

## Role
Unpaid invoices kill cash flow. This agent reads a CSV of overdue accounts, categorizes them by 'Days Overdue', and drafts a 3-step personalized dunning sequence for every client.

## Objective
Recover $10k+ in overdue payments without being awkward.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `overdue_invoices.csv` exist?
2.  **If Missing:** Create `overdue_invoices.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `overdue_invoices.csv` exist? If missing, create template.

### Phase 2: The Chaser Loop
For each row in the CSV:
1.  **Categorize:**
    *   *1-7 Days:* The "Friendly Reminder" (Helpful tone).
    *   *8-30 Days:* The "Firm Nudge" (Direct tone).
    *   *30+ Days:* The "Final Notice" (Serious tone).
2.  **Draft:** Write the email body using the appropriate tone. Mention the specific `Amount` and provide a placeholder for the payment link.

### Phase 3: The Dashboard
1.  **Create:** `collections_emails_ready.md`.
2.  **Summary:** "Processed [X] accounts. [Y] are in the 'Critical' (>30 days) bucket."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
