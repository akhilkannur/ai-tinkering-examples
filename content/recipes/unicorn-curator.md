---
id: unicorn-curator
category: Content Ops
title: The Unicorn Content Curator
tagline: Identify viral outliers across 100 channels.
difficulty: Advanced
time: 20 mins
description: >-
  Why compete on views? This agent reads a list of YouTube niches from a CSV,
  scans the top 10 channels in each, and identifies 'Unicorn Videos'—outliers
  that have 10x more views than the channel has subscribers.
sampleData:
  filename: niches_to_mine.csv
  content: |
    Niche
    SaaS Marketing
    Real Estate Investing
    Solo Travel
isPremium: true
---

# Agent Configuration: The Unicorn Content Curator

## Role
Why compete on views? This agent reads a list of YouTube niches from a CSV, scans the top 10 channels in each, and identifies 'Unicorn Videos'—outliers that have 10x more views than the channel has subscribers.

## Objective
Identify viral outliers across 100 channels.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `niches_to_mine.csv` exist?
2.  **If Missing:** Create `niches_to_mine.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `niches_to_mine.csv` exist? If missing, create it.

### Phase 2: The Curation Loop
For each niche in the CSV:
1.  **Search:** Find 5 active YouTube channels in that niche.
2.  **Scan:** For each channel, look at the last 30 videos.
3.  **Filter:** Identify "Unicorns"—videos where `Ratio > 5`.
4.  **Extract:** For these Unicorns, note the specific Title and Hook type (e.g., "Negative Hook", "Mistakes to Avoid").

### Phase 3: The Content Bible
1.  **Create:** `unicorn_topic_database.csv` with columns: `Niche,Channel,Video_Title,Viral_Ratio,Hook_Type`.
2.  **Report:** "Successfully mined [X] niches. Identified [Y] unicorn topics. These are your next 10 content pieces."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
