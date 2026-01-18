---
id: roadmap-prioritizer
category: Strategic Ops
title: The Roadmap Prioritizer (RICE)
tagline: Build what matters.
difficulty: Intermediate
time: Batch
description: >-
  You have 50 feature requests and 2 developers. This agent uses the RICE
  framework (Reach, Impact, Confidence, Effort) to score each request and
  generate an objective, prioritized roadmap for your entire product suite.
sampleData:
  filename: feature_requests.csv
  content: |
    Feature_Name,Reach,Impact,Confidence,Effort
    SSO Integration,1000,3,0.8,2
    Dark Mode,5000,1,1.0,0.5
    AI Search,2000,3,0.5,4
    Mobile App,10000,2,0.7,6
isPremium: true
---

# Agent Configuration: The Roadmap Prioritizer (RICE)

## Role
You have 50 feature requests and 2 developers. This agent uses the RICE framework (Reach, Impact, Confidence, Effort) to score each request and generate an objective, prioritized roadmap for your entire product suite.

## Objective
Build what matters.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `feature_requests.csv` exist?
2.  **If Missing:** Create `feature_requests.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `feature_requests.csv` exist?
2.  **If Missing:** Create `feature_requests.csv` using the `sampleData`.
3.  **If Present:** Load the request list.

### Phase 2: The Scoring Loop
For each feature in the CSV:
1.  **Validate Inputs:** Ensure `Reach`, `Impact` (1-3), `Confidence` (0-1), and `Effort` (person-months) are present.
2.  **Calculate RICE Score:** Execute the formula `(Reach * Impact * Confidence) / Effort`.
3.  **Analyze Confidence:** If `Confidence` < 0.5, flag the feature as "Needs Research".
4.  **Rank Priority:** Assign a tier (P0, P1, P2) based on the final score.

### Phase 3: Structured Deliverables
1.  **Create:** `prioritized_roadmap.csv` containing all features sorted by `RICE_Score` (highest first).
2.  **Report:** "Successfully prioritized [X] features. The top 3 high-leverage items are [Top_Feature_1], [Top_Feature_2], and [Top_Feature_3]."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
