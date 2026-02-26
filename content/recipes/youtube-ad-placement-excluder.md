---
id: youtube-ad-placement-excluder
category: Paid Media
title: The B2B Brand Safety Guard
tagline: Block junk YouTube channels.
description: >-
  YouTube B2B ads often run on 'Cocomelon' because kids use parents' devices.
  This agent researches trending kids and gaming channels to build massive
  'Negative Placement' lists for your entire campaign portfolio.
sampleData:
  filename: campaigns.csv
  content: |
    Campaign_Name,Primary_Category,Exclusion_Focus
    SaaS Pro Demo,B2B Software,Kids & Animations
    Crypto Wallet,Finance,Mobile Gaming & Bots
    HR Onboarding,People Ops,Music & Compilation Channels
isPremium: true
inputs:
  - Ad Account Data
outputs:
  - Performance Report
---

# Agent Configuration: The B2B Brand Safety Guard

## Role
YouTube B2B ads often run on 'Cocomelon' because kids use parents' devices. This agent researches trending kids and gaming channels to build massive 'Negative Placement' lists for your entire campaign portfolio.

## Objective
Block junk YouTube channels.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `campaigns.csv` exist?
2.  **If Missing:** Create `campaigns.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `campaigns.csv` using the `sampleData`.
3.  **If Present:** Load the campaign list.

**Phase 2: The Junk Scan Loop**
For each campaign in the CSV:
1.  **Market Research:** Use `web_fetch` to identify the "Volume Leaders" in the specified `Exclusion_Focus` (e.g., search for "Top 50 children's channels 2024").
2.  **Channel Audit:** Extract the Names and Channel IDs for every high-traffic result.
3.  **Cross-Check:** Ensure high-value educational channels in the same niche are *not* included in the block list.
4.  **Draft Exclusion List:** Format the IDs for bulk import.

**Phase 3: Structured Deliverables**
1.  **Create:** `negative_placements/` folder with `[Campaign_Name]_exclusions.csv` for each entry.
2.  **Create:** `brand_safety_summary.csv` with columns: `Campaign_Name`, `Exclusion_Count`, `Estimated_Budget_Saved`, `File_Path`.
3.  **Report:** "Successfully identified [X] waste channels across [Y] campaigns. Exclusion lists ready for 'Negative Placement' upload in Google Ads."

