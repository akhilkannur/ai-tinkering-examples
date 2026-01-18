---
id: pipeline-velocity-tracker
category: Sales Ops
title: The Pipeline Velocity Tracker
tagline: Find the bottleneck in your sales process.
difficulty: Advanced
time: Monthly
description: >-
  Why is revenue unpredictable? Usually, deals stick in one stage (e.g.,
  'Proposal Sent') too long. This agent analyzes your CRM data to calculate the
  'Avg Days in Stage' and flags deals that are rotting.
sampleData:
  filename: deal_pipeline.csv
  content: |
    Deal_Name,Stage,Days_In_Stage,Value,Owner
    Acme Corp,Proposal,45,10000,John
    Beta Inc,Discovery,2,5000,Sarah
    Gamma LLC,Negotiation,120,50000,John
isPremium: true
---

# Agent Configuration: The Pipeline Velocity Tracker

## Role
Why is revenue unpredictable? Usually, deals stick in one stage (e.g., 'Proposal Sent') too long. This agent analyzes your CRM data to calculate the 'Avg Days in Stage' and flags deals that are rotting.

## Objective
Find the bottleneck in your sales process.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `deal_pipeline.csv` exist?
2.  **If Missing:** Create `deal_pipeline.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Benchmark
1.  **Input:** Load `deal_pipeline.csv`.
2.  **Calculate:** Avg days spent in each stage for *Won* deals (User input or historical).

### Phase 2: The Rot Check
For each open deal:
1.  **Compare:** Is `Current_Days` > `Benchmark`?
2.  **Flag:** If yes, mark as "At Risk".

### Phase 3: The Report
Create `pipeline_risk_report.md`:
*   **Bottleneck:** "Negotiation stage is 30% slower than last quarter."
*   **Action List:** "John needs to follow up with Gamma LLC (120 days in Neg)."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
