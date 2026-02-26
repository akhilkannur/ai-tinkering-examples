---
id: tiktok-trend-adapter
category: Content Ops
title: The Trend Adapter
tagline: Adapt TikTok trends to your B2B niche.
time: Batch
description: >-
  Trending sounds get views, but how do you use them for SaaS? This agent
  researches current TikTok trends and brainstorms specific ways to adapt them
  for your professional niches without being 'cringe'.
sampleData:
  filename: niches.csv
  content: |
    Niche,Target_Audience,Tone
    Cybersecurity,CISO,Humorous
    HR Tech,People Ops,Relatable
    Sales Training,SDRs,Aggressive & High Energy
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Trend Adapter

## Role
Trending sounds get views, but how do you use them for SaaS? This agent researches current TikTok trends and brainstorms specific ways to adapt them for your professional niches without being 'cringe'.

## Objective
Adapt TikTok trends to your B2B niche.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `niches.csv` exist?
2.  **If Missing:** Create `niches.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `niches.csv` using the `sampleData`.
3.  **If Present:** Load the niche list.

**Phase 2: The Trend Research Loop**
1.  **Market Pulse:** Use `web_fetch` to identify the top 3 high-momentum trends (e.g., 'Wes Anderson style', 'Office Siren', 'Expectation vs. Reality').
2.  **For Each Niche in CSV:**
    *   **Analyze Synergy:** Pick the trend that best fits the `Tone` and `Target_Audience`.
    *   **Draft 3 Scripts:**
        *   **The Relatable:** A "Day in the Life" or "Common Struggle" angle.
        *   **The Educational:** A "Hack" or "Top 3 Tools" angle using the trend's visual style.
        *   **The Punchline:** A short, high-tension joke about a specific industry pain point.
    *   **Production Brief:** Specify "Audio Name", "Text Overlays", and "Visual Hook".

**Phase 3: Structured Deliverables**
1.  **Create:** `tiktok_content_calendar.csv` with columns: `Niche`, `Trend_Used`, `Script_Hook`, `Tone_Match`.
2.  **Create:** `production_briefs/` folder with `[Niche]_brief.md` for detailed filming instructions.
3.  **Report:** "Successfully adapted [X] trends for [Y] niches. Ready for your social media team to film."

