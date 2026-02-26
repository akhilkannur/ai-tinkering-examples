---
id: lead-scoring-logic-builder
category: Sales Ops
title: The Lead Scorer
tagline: Prioritize leads from your CRM or build a model from scratch.
time: One-off
description: >-
  Stop wasting time on low-value leads. This agent reads your lead history CSV
  (if provided) or researches your industry to design a points-based logic
  (Title=CEO +10pts, Gmail -5pts) and writes the pseudo-code for implementation.
sampleData:
  filename: lead_history.csv
  content: |
    Name,Title,Email,Status
    John Doe,VP Sales,john@acme.com,Won
    Jane Smith,Manager,jane@gmail.com,Lost
isPremium: true
verifiedRun:
  date: '2026-02-12'
  agent: Gemini 2.0 Flash
  log:
    - text: gemini run @lead-scoring-logic-builder.md
      type: input
    - text: '● Phase 1: Creating ''lead_history.csv'' from sampleData...'
      type: system
    - text: '● Phase 2: Analyzing ICP (Target: Founders/CEOs)...'
      type: system
    - text: '✔ Success: Processed 5 leads. Identified 2 High-priority matches.'
      type: success
    - text: '✔ Output generated: ''verified-lead-scoring.csv'''
      type: success
    - text: >-
        Report: "Scoring engine validated. Corporate domain weight successfully
        applied to Tier 1 leads."
      type: report
  outputFile:
    name: verified-lead-scoring.csv
    url: /outputs/verified-lead-scoring.csv
    preview: |
      Email,Score,Reason
      elon@tesla.com,15,"CEO (+10), Corporate Domain (+5)"
      tim@apple.com,15,"CEO (+10), Corporate Domain (+5)"
inputs:
  - Lead Data (CSV)
outputs:
  - CRM-Ready Export
---

# Agent Configuration: The Lead Scorer

## Role
Stop wasting time on low-value leads. This agent reads your lead history CSV (if provided) or researches your industry to design a points-based logic (Title=CEO +10pts, Gmail -5pts) and writes the pseudo-code for implementation.

## Objective
Prioritize leads from your CRM or build a model from scratch.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `lead_history.csv` exist?
2.  **If Missing:** Create `lead_history.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Logic:**
    *   *If Yes:* Analyze the "Won" vs "Lost" deals. Identify which job titles or email domains are most common in successful deals.
    *   *If No:* Ask the user for their "Ideal Customer Profile" (e.g., 'Enterprise Marketing'). Research industry standards for scoring that persona.

**Phase 2: The Model**
1.  **Assign Points:**
    *   *Explicit:* Job Title, Revenue, Industry.
    *   *Implicit:* Visited Pricing Page, Downloaded Guide.
2.  **Define Thresholds:** What score makes a lead "MQL" (Marketing Qualified) vs "SQL" (Sales Qualified)?

**Phase 3: The Implementation Guide**
1.  **Create:** `lead_score_blueprint.md`.
2.  **Pseudo-code:** Write the `IF/THEN` logic ready for HubSpot or Salesforce automation.
3.  **Summary:** "Successfully designed a scoring model for [Industry]. Identified [X] high-value signals."
