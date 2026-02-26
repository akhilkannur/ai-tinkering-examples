---
id: infinite-content-repurposer
category: Content Ops
title: The Infinite Repurposer Chain
tagline: 'One URL, 20+ assets.'
description: >-
  Why repurpose manually? This mega-chain takes a list of sources (YouTube URLs
  or Blog Posts) and generates complete content ecosystems: Blogs, Newsletters,
  Tweets, LinkedIn Posts, and TikTok hooks for an entire month of content.
sampleData:
  filename: sources.csv
  content: |
    Title,Source_URL,Target_Audience
    AI in 2024,https://youtube.com/watch?v=123,Tech Founders
    Remote Work Mastery,https://blog.com/remote,HR Managers
    Zero to One Summary,https://medium.com/summary,First-time Founders
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Infinite Repurposer Chain

## Role
Why repurpose manually? This mega-chain takes a list of sources (YouTube URLs or Blog Posts) and generates complete content ecosystems: Blogs, Newsletters, Tweets, LinkedIn Posts, and TikTok hooks for an entire month of content.

## Objective
One URL, 20+ assets.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `sources.csv` exist?
2.  **If Missing:** Create `sources.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `sources.csv` using the `sampleData`.
3.  **If Present:** Load the source list.

**Phase 2: The Factory Loop**
For each source in the CSV:
1.  **Ingest:** Use `web_fetch` to read the full content of the `Source_URL`.
2.  **Parallel Drafting:**
    *   **Blog:** 1,200-word SEO post tailored to the `Target_Audience`.
    *   **Newsletter:** A "Curated Value" email summary.
    *   **Social X:** An 8-tweet "Educational Thread".
    *   **Social LinkedIn:** 3 "Authority Building" posts.
    *   **Video Hooks:** 10 "Pattern Interrupt" hooks for TikTok/Reels.
3.  **Package:** Create a folder `campaigns/[Title]/` and save all assets within.

**Phase 3: Structured Deliverables**
1.  **Create:** `campaign_inventory.csv` with columns: `Title`, `Source_URL`, `Asset_Count`, `Folder_Path`.
2.  **Report:** "Successfully processed [X] sources. Total of [Y] assets generated and categorized."

