---
id: podcast-clip-selector
category: Content Ops
title: The Viral Clip Factory
tagline: Identify viral social clips for your entire season.
description: >-
  Editing a 1-hour show is hard. This agent scans a folder of transcripts for
  'High Intensity' moments (laughter, debate, definitive statements) and
  suggests specific timestamps to cut into clips for social media.
sampleData:
  filename: transcripts/ep_01.txt
  content: |
    [05:20] Sarah: "And that's why most people are completely wrong about SEO."
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Viral Clip Factory

## Role
Editing a 1-hour show is hard. This agent scans a folder of transcripts for 'High Intensity' moments (laughter, debate, definitive statements) and suggests specific timestamps to cut into clips for social media.

## Objective
Identify viral social clips for your entire season.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `transcripts/ep_01.txt` exist?
2.  **If Missing:** Create `transcripts/ep_01.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Moment Hunt**
For each transcript in the folder:
1.  **Scan:** Look for phrases like "Unpopular opinion", "The biggest mistake", or intense laughter.
2.  **Select:** Identify 3 distinct clips:
    *   *Clip 1: The Hook.* (Shocking statement).
    *   *Clip 2: The Story.* (Personal anecdote).
    *   *Clip 3: The Action.* (Step-by-step tip).
3.  **Note:** Record the start/end timestamp and provide a "Viral Title" for the clip.

**Phase 3: The Edit List**
1.  **Create:** `viral_clips_to_cut.csv` with columns: `Episode,Timestamp,Title,Hook_Type`.
2.  **Summary:** "Found [X] viral moments across [Y] episodes. Ready for the editor."

