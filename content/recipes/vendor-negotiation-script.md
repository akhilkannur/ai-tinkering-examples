---
id: vendor-negotiation-script
category: Strategic Ops
title: The Vendor Negotiator
tagline: Save 20% on your software stack from a bill or a name.
difficulty: Intermediate
time: Annual
description: >-
  Everything is negotiable. This agent reads your current vendor bill (if
  provided) or researches a specific tool to find competitor deals and parity
  pricing, then drafts a high-leverage negotiation script for you.
sampleData:
  filename: vendor_bill.txt
  content: |
    Service: HubSpot Pro. Monthly: $800. Renewing in 30 days.
isPremium: true
---

# Agent Configuration: The Vendor Negotiator

## Role
Everything is negotiable. This agent reads your current vendor bill (if provided) or researches a specific tool to find competitor deals and parity pricing, then drafts a high-leverage negotiation script for you.

## Objective
Save 20% on your software stack from a bill or a name.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `vendor_bill.txt` exist?
2.  **If Missing:** Create `vendor_bill.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
**Phase 1: The Choice**
1.  **Check:** Did the user provide a `vendor_bill.txt`?
2.  **Logic:**
    *   *If Yes:* Extract the current price and renewal date.
    *   *If No:* Ask for the "Tool Name".

**Phase 2: The Leverage Scan**
1.  **Search:** Find the top 2 competitors for that tool.
2.  **Audit:** Do the competitors have a "Switching Promotion" or cheaper list price?
3.  **Intel:** Look for G2 reviews mentioning "They gave me a 20% discount when I tried to cancel".

**Phase 3: The Scripting**
1.  **Draft:** Create a 2-part email sequence:
    *   *Email 1 (The Soft Close):* "We are reviewing our stack. Competitor X is significantly cheaper. Can you help us stay?"
    *   *Email 2 (The Cancellation Pivot):* "If we can't find a way to align on price, we'll need to begin the migration."

**Phase 4: Output**
1.  **Save:** Create `negotiation_playbook.md`.
2.  **Summary:** "Identified [X] leverage points. Your script is ready."

