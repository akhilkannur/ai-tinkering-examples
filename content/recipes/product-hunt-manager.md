---
id: product-hunt-manager
category: Strategic Ops
title: The Product Hunt Launch Manager
tagline: 'Get #1 Product of the Day.'
difficulty: Advanced
time: Batch
description: >-
  A launch is a project, not just a post. This agent creates complete 'Launch
  Day' schedules, writes the crucial 'Maker's Comment', and drafts community
  outreach messages for your entire product roadmap.
sampleData:
  filename: launches.csv
  content: |
    Product_Name,Core_Problem,Maker_Name,Launch_Date
    SocialSync,Managing 5 different social feeds is exhausting,Alex,2024-11-12
    FileVault,Sensitive files are easily leaked in Slack,Sarah,2024-11-19
    GameGuild,Finding pro teammates for casual play is hard,Mike,2024-11-26
isPremium: true
---

# Agent Configuration: The Product Hunt Launch Manager

## Role
A launch is a project, not just a post. This agent creates complete 'Launch Day' schedules, writes the crucial 'Maker's Comment', and drafts community outreach messages for your entire product roadmap.

## Objective
Get #1 Product of the Day.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `launches.csv` exist?
2.  **If Missing:** Create `launches.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `launches.csv` exist?
2.  **If Missing:** Create `launches.csv` using the `sampleData`.
3.  **If Present:** Load the launch list.

### Phase 2: The Launch Planning Loop
For each product in the CSV:
1.  **Design the Listing:**
    *   **Tagline:** "The [Adjective] way to solve [Core_Problem]."
    *   **Gallery Brief:** List 5 specific screenshots required (e.g., "The Magic Moment", "Integrations", "Pricing").
2.  **Draft Maker's Comment:** Create a 4-part narrative:
    *   **The Intro:** "Hi Hunters! 👋 I'm [Maker_Name]..."
    *   **The Problem:** Emphasize the `Core_Problem`.
    *   **The Solution:** Why [Product_Name] is the only logical answer.
    *   **The Ask:** Request feedback and offer a "Hunter Discount".
3.  **Map 24-Hour Schedule:** Create a timeline starting at 00:01 PST (Launch) through to 23:59 PST, including specific times for Twitter/X threads, newsletter blasts, and LinkedIn posts.
4.  **Output:** Save to `launch_kits/[Product_Name]_plan.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `launch_master_calendar.csv` with columns: `Product_Name`, `Launch_Date`, `Top_Tagline`, `File_Path`.
2.  **Report:** "Successfully designed [X] launch kits. Assets and schedules are ready for your next big ship."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
