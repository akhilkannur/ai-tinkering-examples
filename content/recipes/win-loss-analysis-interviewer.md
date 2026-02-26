---
id: win-loss-analysis-interviewer
category: Sales Ops
title: The Win/Loss Forensics Agent
tagline: Uncover the real reasons you lost.
time: Batch
description: >-
  Sales reps rarely hear the full truth. This agent processes your internal
  'Closed-Lost' notes or researches competitor G2 reviews to uncover the real
  reasons deals fail across your entire pipeline.
sampleData:
  filename: lost_deals.csv
  content: |
    Deal_Name,Rep_Notes,Main_Competitor
    MegaCorp,Liked the tool but CFO blocked it due to price,Salesforce
    StartupInc,Chose an alternative with better API docs,Vanta
    TechFlow,No response after pricing proposal,Pipedrive
isPremium: true
inputs:
  - Lead Data (CSV)
outputs:
  - CRM-Ready Export
---

# Agent Configuration: The Win/Loss Forensics Agent

## Role
Sales reps rarely hear the full truth. This agent processes your internal 'Closed-Lost' notes or researches competitor G2 reviews to uncover the real reasons deals fail across your entire pipeline.

## Objective
Uncover the real reasons you lost.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `lost_deals.csv` exist?
2.  **If Missing:** Create `lost_deals.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `lost_deals.csv` using the `sampleData`.
3.  **If Present:** Load the deal list.

**Phase 2: The Forensics Loop**
For each deal in the CSV:
1.  **Sentiment Audit:** Analyze the `Rep_Notes`. Is the reason given (e.g., Price) consistent with the `Main_Competitor`'s known strengths?
2.  **Competitive Research:** Use `web_fetch` to research the `Main_Competitor`'s G2/Capterra reviews for the same timeframe. Identify common "Switching Stories".
3.  **Root Cause Analysis:** Categorize the loss into: `Product Gap`, `Sales Execution`, `Pricing`, or `Competitor Advantage`.
4.  **Draft Script:** Generate a 3-question "Exit Interview" script specifically for this deal's context.
5.  **The Fix:** Suggest one specific change to the sales deck or roadmap to prevent this loss pattern.

**Phase 3: Structured Deliverables**
1.  **Create:** `win_loss_forensics_master.csv` with columns: `Deal_Name`, `Root_Cause_Category`, `Real_Reason_Inferred`, `Recommended_Action`.
2.  **Create:** `reports/win_loss_summary.md` with a high-level executive breakdown.
3.  **Report:** "Successfully analyzed [X] lost deals. [Y]% of losses were due to [Primary Category]. Full forensics report ready."

