---
id: zero-search-volume-hunter
category: SEO
title: The Zero-Volume Hunter
tagline: Rank for keywords tools ignore.
difficulty: Advanced
time: Batch
description: >-
  SEO tools are often wrong about volume. This agent identifies 'Zero Volume'
  keywords that actually have high intent and low competition, perfect for
  sniping traffic across your entire product line.
sampleData:
  filename: topics.csv
  content: |
    Topic,Niche,Target_Customer
    Notion,Productivity,Small Business Owners
    Stripe,Payments,SaaS Developers
    PostHog,Analytics,Product Managers
isPremium: true
---

# Agent Configuration: The Zero-Volume Hunter

## Role
SEO tools are often wrong about volume. This agent identifies 'Zero Volume' keywords that actually have high intent and low competition, perfect for sniping traffic across your entire product line.

## Objective
Rank for keywords tools ignore.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `topics.csv` exist?
2.  **If Missing:** Create `topics.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `topics.csv` exist?
2.  **If Missing:** Create `topics.csv` using the `sampleData`.
3.  **If Present:** Load the topic list.

### Phase 2: The Research Loop
For each topic in the CSV:
1.  **Autocomplete Expansion:** Use `web_fetch` to research common "Problem" and "Comparison" queries (e.g., "[Topic] for [Niche]", "[Topic] vs [Obscure Competitor]").
2.  **Forum Deep-Dive:** Search Reddit and StackOverflow for specific phrases or error codes related to the `Topic`.
3.  **Validate Opportunity:** Check the number of direct search results. If < 50 high-quality results, flag as a "Golden Nugget".
4.  **Draft Brief:**
    *   **The Keyword:** The exact "Zero Volume" string.
    *   **The Intent:** Why a user is searching for this.
    *   **The Angle:** A recommended content structure to win the snippet.
5.  **Output:** Save to `keyword_nuggets/[Topic]_opportunities.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `zero_volume_master_list.csv` with columns: `Topic`, `Niche`, `Golden_Nugget_Keyword`, `Difficulty_Score`, `File_Path`.
2.  **Report:** "Successfully identified [X] zero-volume opportunities. High-intent traffic targets ready for your content team."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
