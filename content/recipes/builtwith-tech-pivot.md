---
id: builtwith-tech-pivot
category: Sales Ops
title: The Tech Displacement Factory
tagline: Find every user of 10 competitors in one run.
difficulty: Intermediate
time: Weekly
archetype: Processor
description: >-
  BuiltWith reports are noisy. This agent reads a list of target technologies
  (competitors) from a CSV and filters a raw technology report to find
  high-value displacement opportunities matching your ICP.
sampleData:
  filename: competitor_tech_list.csv
  content: |
    Tech_Name,ICP_Revenue_Min
    Marketo,10000000
    HubSpot,1000000
---

# Agent Configuration: The Tech Displacement Factory

## Role
BuiltWith reports are noisy. This agent reads a list of target technologies (competitors) from a CSV and filters a raw technology report to find high-value displacement opportunities matching your ICP.

## Objective
Find every user of 10 competitors in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitor_tech_list.csv` exist?
2.  **If Missing:** Create `competitor_tech_list.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Read:** Load the `competitor_tech_list.csv`.

**Phase 2: The Pivot Loop**
For each technology in the list:
1.  **Filter:** Extract all rows from `builtwith_raw.csv` where `Tech` == [Tech_Name].
2.  **Qualify:** Keep only rows where `Revenue` > [ICP_Revenue_Min].
3.  **Enrich:** Add a column `Displacement_Angle` (e.g., "HubSpot is getting too expensive for this size").

**Phase 3: Segmented Export**
1.  **Action:** Create a folder `displacement_lists/`.
2.  **Save:** Save each filtered list as `users-of-[tech].csv`.
3.  **Report:** "Found [X] total displacement opportunities across [Y] competitors."

