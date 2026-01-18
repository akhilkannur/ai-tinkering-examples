---
id: monthly-report-generator
category: Agency
title: The Monthly Report Generator
tagline: Prove your worth.
difficulty: Intermediate
time: Batch
description: >-
  Clients cancel when they don't see results. This agent processes performance
  data for your entire client roster and generates 'Value-First' monthly reports
  that prioritize revenue and lead wins.
sampleData:
  filename: client_performance.csv
  content: |
    Client_Name,Spend,Revenue,Leads,Prev_Month_Revenue
    Glow Skincare,5000,25000,120,20000
    TechFlow SaaS,10000,45000,350,42000
    Urban Coffee,2000,8000,45,7500
isPremium: true
---

# Agent Configuration: The Monthly Report Generator

## Role
Clients cancel when they don't see results. This agent processes performance data for your entire client roster and generates 'Value-First' monthly reports that prioritize revenue and lead wins.

## Objective
Prove your worth.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `client_performance.csv` exist?
2.  **If Missing:** Create `client_performance.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `client_performance.csv` exist?
2.  **If Missing:** Create `client_performance.csv` using the `sampleData`.
3.  **If Present:** Load the performance data.

### Phase 2: The Reporting Loop
For each client in the CSV:
1.  **Calculate Growth:** Determine MoM Revenue growth: `((Revenue - Prev_Month_Revenue) / Prev_Month_Revenue) * 100`.
2.  **Draft Executive Summary:** Lead with the "Big Win" (e.g., "This month we generated $[Revenue], representing a [X]% growth").
3.  **Structure the Report:**
    *   **The Wins:** Revenue, Leads, and ROAS.
    *   **The Work:** A summary of tasks completed (e.g., "Launched 5 new campaigns").
    *   **The Insights:** What the data tells us about the audience.
    *   **The Roadmap:** Top 3 priorities for next month.
4.  **Output:** Save to `client_reports/[Client_Name]_monthly_report.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `portfolio_performance_summary.csv` with columns: `Client_Name`, `Revenue_Growth_%`, `ROAS`, `File_Path`.
2.  **Report:** "Successfully generated [X] monthly reports. High-growth clients flagged for upsell opportunities."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
