---
id: commission-calculator
category: Lead Gen
title: The Sales Comp Designer
tagline: Design a commission plan that drives growth.
difficulty: Advanced
time: Hybrid
description: >-
  Bad incentives kill sales performance. This agent researches industry
  standards and designs tiered commission plans (Base + OTE + Accelerators) for
  your entire sales roster.
sampleData:
  filename: roles.csv
  content: |
    Role,Avg_Deal_Size,Target_Annual_Revenue
    Account Executive,50000,1000000
    SDR,5000,200000
    Customer Success,15000,500000
isPremium: true
---

# Agent Configuration: The Sales Comp Designer

## Role
Bad incentives kill sales performance. This agent researches industry standards and designs tiered commission plans (Base + OTE + Accelerators) for your entire sales roster.

## Objective
Design a commission plan that drives growth.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `roles.csv` exist?
2.  **If Missing:** Create `roles.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Use `web_fetch` to research industry standard comp structures for a typical "Seed Stage SaaS" or "Creative Agency" and create a `benchmark_report.md`.
3.  **If Present:** Load the role list for custom modeling.

**Phase 2: The Comp Design Loop**
For each role in the CSV:
1.  **Calculate Quota:** Set quota at 5x-8x the industry standard OTE for the `Avg_Deal_Size`.
2.  **Define Split:** Determine the Base/OTE split (e.g., 50/50 for AEs, 70/30 for CS).
3.  **Model Commission:**
    *   **Base Rate:** (e.g., 10% of closed revenue).
    *   **Accelerators:** (e.g., 15% for revenue above 100% of quota).
    *   **Multi-year Bonus:** Add logic for increased commissions on longer contracts.
4.  **Draft Plan:** Create `comp_plans/[Role]_comp_structure.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `sales_org_comp_summary.csv` with columns: `Role`, `Base_Salary`, `OTE`, `Quota`, `File_Path`.
2.  **Report:** "Successfully designed [X] comp plans. Accelerators and clawback logic included in each file."

