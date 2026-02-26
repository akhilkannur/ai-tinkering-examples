---
id: trend-surfer-alert
category: Content Ops
title: The Trend Surfer
tagline: Be first to the story.
description: >-
  Content is a timing game. This agent monitors your entire target keyword list
  for search volume spikes and auto-drafts 'Newsjacking' posts whenever a trend
  is detected.
sampleData:
  filename: keywords.csv
  content: |
    Keyword,Niche,Alert_Threshold_%
    Generative AI,Tech,50
    Remote Work,HR,30
    Sustainable Fashion,Lifestyle,40
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Trend Surfer

## Role
Content is a timing game. This agent monitors your entire target keyword list for search volume spikes and auto-drafts 'Newsjacking' posts whenever a trend is detected.

## Objective
Be first to the story.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `keywords.csv` exist?
2.  **If Missing:** Create `keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `keywords.csv` using the `sampleData`.
3.  **If Present:** Load the keyword list.

**Phase 2: The Monitoring Loop**
For each keyword in the CSV:
1.  **Check Pulse:** Use `web_fetch` to research recent news and volume trends for the `Keyword`.
2.  **Detect Spike:** Compare current activity to known historical averages. If activity > `Alert_Threshold_%`, trigger the alert.
3.  **Research Context:** Identify the top 3 news stories explaining the spike.
4.  **Draft Newsjack:**
    *   **The Hook:** "Why everyone is talking about [Keyword] right now."
    *   **The Pivot:** Connect the trend to the provided `Niche`.
    *   **The Opinion:** Draft a 3-paragraph social post providing a unique angle on the news.
5.  **Output:** Save to `alerts/[Keyword]_spike.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `trend_activity_report.csv` with columns: `Keyword`, `Spike_Detected_Y/N`, `Momentum_Score`, `File_Path`.
2.  **Report:** "Successfully monitored [X] keywords. [Y] viral spikes detected. Newsjacking drafts ready for review."

