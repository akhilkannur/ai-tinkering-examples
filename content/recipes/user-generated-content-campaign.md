---
id: user-generated-content-campaign
category: Content Ops
title: The UGC Campaign Planner
tagline: High-ROI content from your users.
time: Batch
description: >-
  Social proof is your best sales tool. This agent designs viral UGC contests
  and campaigns for your entire product line, incentivizing users to create
  high-quality marketing assets for you.
sampleData:
  filename: brands.csv
  content: |
    Brand_Name,Product_Category,Primary_Platform
    VelvetBloom,Skincare,Instagram/TikTok
    PixelPounce,Gaming Peripherals,X/Twitter
    BrewBase,Coffee Equipment,Instagram
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The UGC Campaign Planner

## Role
Social proof is your best sales tool. This agent designs viral UGC contests and campaigns for your entire product line, incentivizing users to create high-quality marketing assets for you.

## Objective
High-ROI content from your users.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `brands.csv` exist?
2.  **If Missing:** Create `brands.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `brands.csv` using the `sampleData`.
3.  **If Present:** Load the brand list.

**Phase 2: The Campaign Planning Loop**
For each brand in the CSV:
1.  **Select Concept:**
    *   **If [Skincare]:** "The 30-Day Glow Transformation."
    *   **If [Gaming]:** "The ultimate [Product] Battlestation Setup."
    *   **If [Coffee]:** "The First Sip Morning Routine."
2.  **Define Rules:** Set clear participation requirements (e.g., Tagging, Hashtags, 15-second minimum video).
3.  **Draft Incentive:** Recommend a "Grand Prize" and "Small Wins" (e.g., "$500 Gift Card" + "Repost on Official Account").
4.  **Write Announcement Copy:** Create high-tension launch posts for the `Primary_Platform`.
5.  **Output:** Save to `ugc_kits/[Brand_Name]_campaign.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `ugc_master_roadmap.csv` with columns: `Brand_Name`, `Campaign_Title`, `Top_Prize`, `File_Path`.
2.  **Report:** "Successfully designed [X] UGC campaigns. Content flywheels are ready for activation."

