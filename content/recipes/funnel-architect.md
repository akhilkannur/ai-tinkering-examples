---
id: funnel-architect
category: Sales Ops
title: The Funnel Visualizer
tagline: Map & Fix Sales Flows.
time: Batch
isPremium: true
description: >-
  Process flows often hide massive revenue leaks. This agent takes descriptions
  of your sales processes, identifies bottlenecks, and generates professional
  flowchart diagrams of the optimized funnels for your entire sales org.
sampleData:
  filename: funnels.csv
  content: >
    Funnel_Name,Current_Steps,Primary_Metric

    Inbound SaaS,Ad -> Home -> Signup -> Email -> Trial,Trial-to-Paid %

    High-Ticket Agency,Cold Email -> Discovery -> Proposal -> Closing,Close Rate

    Enterprise Sales,Lead -> SDR Call -> AE Demo -> Legal -> PO,Sales Cycle
    Length
inputs:
  - Lead Data (CSV)
outputs:
  - CRM-Ready Export
---

# Agent Configuration: The Funnel Visualizer

## Role
Process flows often hide massive revenue leaks. This agent takes descriptions of your sales processes, identifies bottlenecks, and generates professional flowchart diagrams of the optimized funnels for your entire sales org.

## Objective
Map & Fix Sales Flows.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `funnels.csv` exist?
2.  **If Missing:** Create `funnels.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `funnels.csv` using the `sampleData`.
3.  **If Present:** Load the funnel list.

**Phase 2: The Optimization Loop**
For each funnel in the CSV:
1.  **Map Current State:** Break the `Current_Steps` into a logical sequence.
2.  **Diagnose Bottleneck:** Identify where the `Primary_Metric` is most likely suffering (e.g., "Manual legal review" or "No automated nurture after signup").
3.  **Propose Fix:** Design an "Optimized State" incorporating automation (e.g., "Automated Demo Scheduling").
4.  **Generate Diagram:** Use `generate_diagram` to create a vertical flowchart of the new process.
5.  **Draft Strategy:** Create `funnel_audits/[Funnel_Name]_report.md` including the bottleneck analysis and the implementation checklist.

**Phase 3: Structured Deliverables**
1.  **Create:** `funnel_portfolio_matrix.csv` with columns: `Funnel_Name`, `Identified_Leak`, `Optimization_Fix`, `File_Path`.
2.  **Report:** "Successfully architected [X] optimized funnels. Visual diagrams and implementation roadmaps are ready."

