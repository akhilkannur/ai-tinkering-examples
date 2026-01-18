---
id: direct-mail-campaign-planner
category: Strategic Ops
title: The ABM Direct Mail Engine
tagline: High-impact mailers for your top 100 accounts.
difficulty: Advanced
time: One-off
description: >-
  Direct mail breaks through the noise. This agent reads a list of target
  accounts and their 'Tier' from a CSV and plans a customized physical mailer
  campaign (Lumpy mail vs Postcard) for every group.
sampleData:
  filename: abm_targets.csv
  content: |
    Company,Tier,Main_Problem
    MegaCorp,Tier 1,Infrastructure scale
    TinyStart,Tier 3,Fast setup
isPremium: true
---

# Agent Configuration: The ABM Direct Mail Engine

## Role
Direct mail breaks through the noise. This agent reads a list of target accounts and their 'Tier' from a CSV and plans a customized physical mailer campaign (Lumpy mail vs Postcard) for every group.

## Objective
High-impact mailers for your top 100 accounts.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `abm_targets.csv` exist?
2.  **If Missing:** Create `abm_targets.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Tier Setup
1.  **Check:** Does `abm_targets.csv` exist? If missing, create it.

### Phase 2: The Campaign Loop
For each row in the CSV:
1.  **Selection:** 
    *   *Tier 1:* High-value gift (e.g., Coffee Kit).
    *   *Tier 2:* Useful utility (e.g., Notebook).
    *   *Tier 3:* High-impact postcard.
2.  **Personalize:** Draft the "Handwritten Note" text based on the `Main_Problem`.
3.  **Track:** Generate the UTM-tagged URL for the QR code.

### Phase 3: Deployment Plan
1.  **Create:** `direct_mail_logistics.csv` with columns: `Company,Tier,Gift_Item,Note_Text,QR_URL`.
2.  **Summary:** "Planned mailers for [X] accounts. [Y] Tier 1 'Lumpy' packages ready for fulfillment."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
