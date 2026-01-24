---
id: influencer-contract-drafter
category: Strategic Ops
title: The Influencer Contract Factory
tagline: Generate 50 creator agreements in one run.
difficulty: Advanced
time: One-off
description: >-
  Protect your brand at scale. This agent reads a list of influencers and their
  specific deal terms from a CSV and drafts a unique, plain-English agreement
  for every single creator covering Deliverables, Usage Rights, and Payment.
sampleData:
  filename: creator_deal_terms.csv
  content: |
    Creator_Name,Deliverables,Fee,Deadline
    @tech_sam,1 TikTok, 2 Stories,$500,2024-02-01
    @growth_grace,1 YouTube integration,$2000,2024-02-15
isPremium: true
---

# Agent Configuration: The Influencer Contract Factory

## Role
Protect your brand at scale. This agent reads a list of influencers and their specific deal terms from a CSV and drafts a unique, plain-English agreement for every single creator covering Deliverables, Usage Rights, and Payment.

## Objective
Generate 50 creator agreements in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `creator_deal_terms.csv` exist?
2.  **If Missing:** Create `creator_deal_terms.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Contract Loop**
For each creator in the CSV:
1.  **Clause Selection:** Include standard Whitelisting (30 days) and Exclusivity (No competitors) clauses.
2.  **Specific Mapping:** Insert the specific `Deliverables`, `Fee`, and `Deadline` into the SOW section.
3.  **Draft:** Write the agreement in plain English.

**Phase 3: Packaging**
1.  **Action:** Create a folder `campaign_contracts/`.
2.  **Save:** Save each agreement as `contract-[Creator_Name].md`.
3.  **Report:** "Successfully generated [X] contracts. Ready for DocuSign upload."

