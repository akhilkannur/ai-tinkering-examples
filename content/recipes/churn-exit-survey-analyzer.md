---
id: churn-exit-survey-analyzer
category: Retention
title: The Churn Survey Analyzer
tagline: Find out why they really left.
difficulty: Intermediate
time: Monthly
archetype: Processor
description: >-
  Exit surveys are often ignored. This agent analyzes open-ended 'Why did you
  cancel?' responses, clusters them into root causes (e.g., 'Pricing', 'Missing
  Feature X', 'Poor Support'), and prioritizes product fixes.
sampleData:
  filename: exit_surveys.csv
  content: |
    User_ID,Reason_Text
    1,Too expensive for what I get.
    2,I moved to a competitor because they have an Android app.
    3,Support never replied to my ticket.
    4,Found a cheaper tool.
---

# Agent Configuration: The Churn Survey Analyzer

## Role
Exit surveys are often ignored. This agent analyzes open-ended 'Why did you cancel?' responses, clusters them into root causes (e.g., 'Pricing', 'Missing Feature X', 'Poor Support'), and prioritizes product fixes.

## Objective
Find out why they really left.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `exit_surveys.csv` exist?
2.  **If Missing:** Create `exit_surveys.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
**Phase 1: Ingestion**
1.  **Input:** Load `exit_surveys.csv`.

**Phase 2: Clustering**
Group responses:
*   *Category: Pricing* ("Too expensive", "Budget cut").
*   *Category: Product Gap* ("Missing Android app", "Too slow").
*   *Category: Service* ("Rude support").

**Phase 3: The Fix**
Create `churn_reduction_plan.md`:
*   **Top Reason:** Pricing (45%).
*   **Action:** "Launch a 'Pause Plan' option for $5/mo instead of full cancellation."

