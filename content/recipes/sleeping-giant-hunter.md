---
id: sleeping-giant-hunter
category: Lead Gen
title: The Sleeping Giant Hunter
tagline: Find 50 enterprise companies using legacy tech.
difficulty: Advanced
time: 25 mins
description: >-
  Legacy tech is a buying signal. This agent reads a list of 'Old Tech' markers
  from a CSV, hunts for enterprise companies still running that software, and
  identifies the newly hired executives most likely to want a change.
sampleData:
  filename: legacy_tech_markers.csv
  content: |
    Tech_Marker,Ideal_Industry
    "powered by older-crm",Manufacturing
    "jQuery v1",Finance
isPremium: true
---

# Agent Configuration: The Sleeping Giant Hunter

## Role
Legacy tech is a buying signal. This agent reads a list of 'Old Tech' markers from a CSV, hunts for enterprise companies still running that software, and identifies the newly hired executives most likely to want a change.

## Objective
Find 50 enterprise companies using legacy tech.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `legacy_tech_markers.csv` exist?
2.  **If Missing:** Create `legacy_tech_markers.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Hunt Loop**
For each row in the CSV:
1.  **Discovery:** Find 10 domains in the `Ideal_Industry` using the `Tech_Marker`.
2.  **Qualify:** Use search snippets to verify company size (>500 employees).
3.  **Enrich:** Find the name of the "CTO" or "VP Engineering" hired in the last 6 months.
4.  **Calculate:** Estimate the "Cost of Inaction" (e.g., security risk or speed loss).

**Phase 3: The Target List**
1.  **Create:** `sleeping_giants_list.csv` with columns: `Company,Legacy_Tech,Key_Contact,Hypothesis_of_Pain`.
2.  **Summary:** "Found [X] enterprise accounts stuck on [Tech]. High-value list is ready."

