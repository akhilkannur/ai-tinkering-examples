---
id: viral-loop-calculator
category: Growth
title: The Viral Loop Calculator
tagline: Will it grow itself?
difficulty: Intermediate
time: Batch
description: >-
  Virality is math, not magic. This agent calculates the K-Factor for your
  entire product line based on invite frequency and conversion rates,
  identifying which features are truly viral.
sampleData:
  filename: growth_metrics.csv
  content: |
    Product_Name,Invites_Sent_Per_User,Invite_Conversion_Rate
    SocialSync,5.2,0.25
    FileVault,1.1,0.10
    GameGuild,12.5,0.15
isPremium: true
---

# Agent Configuration: The Viral Loop Calculator

## Role
Virality is math, not magic. This agent calculates the K-Factor for your entire product line based on invite frequency and conversion rates, identifying which features are truly viral.

## Objective
Will it grow itself?

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `growth_metrics.csv` exist?
2.  **If Missing:** Create `growth_metrics.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `growth_metrics.csv` exist?
2.  **If Missing:** Create `growth_metrics.csv` using the `sampleData`.
3.  **If Present:** Load the metric data.

### Phase 2: The Calculation Loop
For each product in the CSV:
1.  **Calculate K-Factor:** `K = Invites_Sent * Conversion_Rate`.
2.  **Determine Verdict:**
    *   **K > 1.0:** "EXPONENTIAL VIRALITY" (True viral growth).
    *   **K 0.5 - 1.0:** "STRONG ASSIST" (Virality is reducing CAC significantly).
    *   **K < 0.5:** "LINEAR GROWTH" (Product relies on paid/organic acquisition).
3.  **Identify Bottleneck:** Suggest if they should focus on "Invites Sent" (Mechanism) or "Conversion" (Onboarding).
4.  **Forecast:** Estimate the "Viral Cycle Time" needed to double the user base.

### Phase 3: Structured Deliverables
1.  **Create:** `viral_health_audit.csv` with columns: `Product_Name`, `K_Factor`, `Verdict`, `Primary_Bottleneck`.
2.  **Report:** "Successfully audited [X] products. [Y] products identified as having true viral potential."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
