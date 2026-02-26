---
id: job-description-optimizer
category: Lead Gen
title: The Sales Job Description Optimizer
tagline: 'Attract ''A-Players'', repel tourists.'
description: >-
  Generic JDs attract generic candidates. This agent rewrites your job
  descriptions to focus on 'Outcomes' rather than 'Requirements', increasing the
  quality of applicants for your entire hiring roadmap.
sampleData:
  filename: job_postings.csv
  content: |
    Role,Target_Salary,Top_Requirement
    Account Executive,150k OTE,Closed $50k+ deals
    SDR,80k OTE,High-volume cold outreach
    Sales Manager,250k OTE,Scaled a team from 5 to 20
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The Sales Job Description Optimizer

## Role
Generic JDs attract generic candidates. This agent rewrites your job descriptions to focus on 'Outcomes' rather than 'Requirements', increasing the quality of applicants for your entire hiring roadmap.

## Objective
Attract 'A-Players', repel tourists.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `job_postings.csv` exist?
2.  **If Missing:** Create `job_postings.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `job_postings.csv` using the `sampleData`.
3.  **If Present:** Load the role list.

**Phase 2: The Optimization Loop**
For each role in the CSV:
1.  **Draft The Mission:** Replace "About the Role" with a high-stakes mission statement (e.g., "Your goal is to own the mid-market segment and close $1.2M in ARR").
2.  **Define the First 90 Days:** Create a clear timeline of expectations (Day 30, Day 60, Day 90).
3.  **Outcome-Based Requirements:** Map the `Top_Requirement` to a specific performance metric.
4.  **Transparent Comp:** Clearly state the `Target_Salary` and the bonus structure.
5.  **Output:** Save to `optimized_jds/[Role]_jd.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `hiring_plan_summary.csv` with columns: `Role`, `OTE`, `Primary_Outcome`, `File_Path`.
2.  **Report:** "Successfully optimized [X] job descriptions. Result-oriented JDs ready for LinkedIn and Indeed."

