---
id: competitor-hiring-spy
category: Competitive Intel
title: The Market Hiring Spy
tagline: Track the roadmap of your top 10 competitors.
difficulty: Intermediate
time: Monthly
description: >-
  Job boards reveal secret strategies. This agent reads a list of competitor job
  pages from a CSV, identifies new departments they are building (e.g., 'Hiring
  5 Enterprise reps'), and predicts their next move.
sampleData:
  filename: competitor_job_boards.csv
  content: |
    Company,Careers_URL
    Competitor_A,https://competitor-a.com/jobs
    Competitor_B,https://competitor-b.com/careers
---

# Agent Configuration: The Market Hiring Spy

## Role
Job boards reveal secret strategies. This agent reads a list of competitor job pages from a CSV, identifies new departments they are building (e.g., 'Hiring 5 Enterprise reps'), and predicts their next move.

## Objective
Track the roadmap of your top 10 competitors.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitor_job_boards.csv` exist?
2.  **If Missing:** Create `competitor_job_boards.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Preparation
1.  **Check:** Does `competitor_job_boards.csv` exist? If missing, create template.

### Phase 2: The Spy Loop
For each competitor in the CSV:
1.  **Fetch:** Scrape the current job titles from the `Careers_URL`.
2.  **Cluster:** Group roles by department (Engineering, Sales, Marketing).
3.  **Identify Spikes:** Highlight departments with the most new openings.
4.  **Hypothesize:** Write 1-2 sentences on what this means (e.g., "Competitor B is pivoting to Enterprise").

### Phase 3: The Market Intelligence Report
1.  **Create:** `market_hiring_report.md`.
2.  **Summary:** Use a table to compare hiring focus across the market.
3.  **Action:** "They are all hiring CS. We should attack on 'Better Support'."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
