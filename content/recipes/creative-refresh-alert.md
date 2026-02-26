---
id: creative-refresh-alert
category: Paid Media
title: The Fatigue Detector
tagline: Know when to swap ads.
time: Batch
description: >-
  Ad fatigue raises CPA. This agent analyzes your ad performance reports,
  flagging ads with High Frequency and declining CTR, signaling exactly when to
  launch new creative across all your campaigns.
sampleData:
  filename: ad_performance.csv
  content: |
    Ad_ID,Campaign_Name,Frequency,CTR,Spend
    AD_001,Summer Sale,4.5,0.8,500
    AD_002,Summer Sale,2.1,2.5,1200
    AD_003,Retargeting,5.2,0.4,300
    AD_004,Prospecting,1.5,3.2,2000
isPremium: true
inputs:
  - Ad Account Data
outputs:
  - Performance Report
---

# Agent Configuration: The Fatigue Detector

## Role
Ad fatigue raises CPA. This agent analyzes your ad performance reports, flagging ads with High Frequency and declining CTR, signaling exactly when to launch new creative across all your campaigns.

## Objective
Know when to swap ads.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `ad_performance.csv` exist?
2.  **If Missing:** Create `ad_performance.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `ad_performance.csv` using the `sampleData`.
3.  **If Present:** Load the performance data.

**Phase 2: The Fatigue Analysis Loop**
For each ad in the CSV:
1.  **Calculate Fatigue Status:**
    *   **CRITICAL FATIGUE:** If `Frequency` > 4.5 AND `CTR` < 1.0%.
    *   **WARNING:** If `Frequency` > 3.0 AND `CTR` has dropped 20% WoW (if history provided) or is < 1.5%.
    *   **HEALTHY:** All other ads.
2.  **Action Item:**
    *   **For CRITICAL:** "PAUSE & REPLACE IMMEDIATELY."
    *   **For WARNING:** "Draft new creative for next week."
3.  **Efficiency Check:** If `Spend` is high on a fatigued ad, mark as `High Priority`.

**Phase 3: Structured Deliverables**
1.  **Create:** `creative_refresh_list.csv` with columns: `Ad_ID`, `Campaign_Name`, `Fatigue_Status`, `Action_Required`, `Priority`.
2.  **Report:** "Successfully audited [X] ads. [Y] critical refreshes identified. Total 'At Risk' spend: $[Z]."

