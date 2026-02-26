---
id: semantic-keyword-clusterer
category: SEO
title: The Keyword Clusterer
tagline: Group keywords in seconds.
description: >-
  Keyword stuffing is dead. This agent takes a raw list of keywords and groups
  them into 'Semantic Clusters' to help you plan Hub & Spoke content strategies
  at scale.
sampleData:
  filename: keywords.csv
  content: |
    Keyword,Search_Volume
    best crm for startups,5000
    crm reviews 2024,1200
    crm alternatives to salesforce,3000
    top startup crms,800
    what is a crm,20000
isPremium: true
inputs:
  - Target URL
outputs:
  - SEO Audit / Fixes
---

# Agent Configuration: The Keyword Clusterer

## Role
Keyword stuffing is dead. This agent takes a raw list of keywords and groups them into 'Semantic Clusters' to help you plan Hub & Spoke content strategies at scale.

## Objective
Group keywords in seconds.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `keywords.csv` exist?
2.  **If Missing:** Create `keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `keywords.csv` using the `sampleData`.
3.  **If Present:** Load the keyword list.

**Phase 2: The Clustering Loop**
For each keyword in the CSV:
1.  **Extract Intent:** Identify if the keyword is Informational (How/What), Transactional (Buy/Pricing), or Navigational (Brand).
2.  **Group by Root:** Group keywords sharing a common semantic root (e.g., "CRM").
3.  **Define Hubs:** Designate high-volume, generic keywords as "Hubs" and specific, long-tail keywords as "Spokes".
4.  **Audit Modifiers:** Group by modifiers like "Best", "Alternative", "vs", and "Review".

**Phase 3: Structured Deliverables**
1.  **Create:** `semantic_content_clusters.csv` with columns: `Hub_Topic`, `Spoke_Keyword`, `Intent`, `Search_Volume`.
2.  **Report:** "Successfully clustered [X] keywords into [Y] distinct topics. Your Hub & Spoke strategy is ready for implementation."

