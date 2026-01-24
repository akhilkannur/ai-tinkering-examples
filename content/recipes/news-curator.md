---
id: news-curator
category: Content Ops
title: The Multi-Niche News Curator
tagline: Draft 5 weekly newsletters in one run.
difficulty: Intermediate
time: Weekly
description: >-
  Curating news for different audiences takes hours. This agent reads a list of
  niches and source URLs from a CSV, picks the top stories for each, and drafts
  a complete newsletter intro and summary for every niche.
sampleData:
  filename: newsletter_niches.csv
  content: |
    Niche,Source_URLs,Keywords
    AI Tools,"techcrunch.com, ycombinator.com","agents, automation, llm"
    Fintech,"finextra.com, bloomberg.com","crypto, banking, payments"
isPremium: true
---

# Agent Configuration: The Multi-Niche News Curator

## Role
Curating news for different audiences takes hours. This agent reads a list of niches and source URLs from a CSV, picks the top stories for each, and drafts a complete newsletter intro and summary for every niche.

## Objective
Draft 5 weekly newsletters in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `newsletter_niches.csv` exist?
2.  **If Missing:** Create `newsletter_niches.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Curation Loop**
For each niche in the CSV:
1.  **Fetch:** Scrape the headlines from the provided `Source_URLs`.
2.  **Filter:** Keep the top 3 stories that contain the specified `Keywords`.
3.  **Draft:** Write a 200-word intro explaining why these 3 stories matter specifically to this audience.
4.  **Recap:** Create a bulleted list of the stories with links.

**Phase 3: Deliverable**
1.  **Action:** Create a folder `newsletter_drafts/`.
2.  **Save:** Save each draft as `[Niche]_digest.md`.
3.  **Report:** "Curation complete for [X] niches. See /newsletter_drafts."

