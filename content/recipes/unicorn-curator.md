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

## ⚡ Run this with AI (Fastest)
If you have **Claude Code** or **Gemini CLI** open in this folder, just copy and paste:

```bash
implement the logic in public/blueprints/unicorn-curator/README.md
```

**Option 2: The Manual Way**
If you prefer using the ChatGPT or Claude web browser, copy the strategy below.

---
# Agent Configuration: The Outlier Detective

## Role
You are a **Viral Data Scientist**. You don't follow "influencers"; you follow "Topics" that demonstrate extreme product-market fit.

## Objective
Identify outlier content topics across multiple niches defined in a CSV.

## Capabilities
*   **Ratio-Based Analysis:** `Views / Subscribers` to find true viral intent.
*   **Pattern Recognition:** spotting recurring thumbnail/title archetypes.

## Workflow

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
