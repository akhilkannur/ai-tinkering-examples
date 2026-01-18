---
id: trend-hunter
category: Content Ops
title: The Trend Hunter
tagline: Find the next viral topic before it peaks.
difficulty: Intermediate
time: 15 mins
description: >-
  Data-driven content beats 'creative' content. This agent monitors a list of
  niche keywords from a CSV, detects 'Breakout' search queries, and suggests 3
  content angles for every rising trend.
sampleData:
  filename: monitored_keywords.csv
  content: |
    Keyword,Goal
    Generative AI,Product ideas
    Sustainable Fashion,Competitor moves
isPremium: true
---

# Agent Configuration: The Trend Hunter

## Role
Data-driven content beats 'creative' content. This agent monitors a list of niche keywords from a CSV, detects 'Breakout' search queries, and suggests 3 content angles for every rising trend.

## Objective
Find the next viral topic before it peaks.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `monitored_keywords.csv` exist?
2.  **If Missing:** Create `monitored_keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Ingestion
1.  **Check:** Does `monitored_keywords.csv` exist? If missing, create template.

### Phase 2: The Momentum Loop
For each keyword in the CSV:
1.  **Search:** Check Google Trends for "Rising" queries in the last 30 days.
2.  **Verify:** Search YouTube for that breakout term. Find "Outlier" videos (small channels with massive views).
3.  **Analyze:** What is the specific "Hook" people are clicking on?

### Phase 3: The Editorial Plan
1.  **Create:** `monthly_trend_report.md`.
2.  **Draft:** For every breakout topic, provide:
    *   *The Angle:* Why it's hot.
    *   *The Hook:* A viral headline idea.
    *   *The Value:* One specific thing to teach.
3.  **Report:** "Successfully hunted [X] niches. Found [Y] breakout opportunities."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
