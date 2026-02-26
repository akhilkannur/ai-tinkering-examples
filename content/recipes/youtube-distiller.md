---
id: youtube-distiller
category: Content Ops
title: The Video Distiller
tagline: YouTube -> Study Notes.
time: Batch
description: >-
  Watches long YouTube videos and extracts key arguments, unique insights, and
  implementation checklists for your entire learning queue.
sampleData:
  filename: videos.csv
  content: |
    Title,URL,Target_Niche
    Future of AI Agents,https://youtube.com/watch?v=123,Software Engineering
    Cold Calling Masterclass,https://youtube.com/watch?v=456,Sales
    SEO in 2024,https://youtube.com/watch?v=789,Marketing
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Video Distiller

## Role
Watches long YouTube videos and extracts key arguments, unique insights, and implementation checklists for your entire learning queue.

## Objective
YouTube -> Study Notes.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `videos.csv` exist?
2.  **If Missing:** Create `videos.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `videos.csv` using the `sampleData`.
3.  **If Present:** Load the video list.

**Phase 2: The Distillation Loop**
For each video in the CSV:
1.  **Research:** Use `web_fetch` to search for the transcript or a high-fidelity summary of the `URL`.
2.  **Analyze Claims:** Identify the "Core Argument" and 3 "Unique Insights".
3.  **Draft Checklist:** Create a 5-step "Implementation Guide" based on the video's instructions.
4.  **Output:** Save to `notes/[Title]_distilled.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `learning_inventory_summary.csv` with columns: `Title`, `Target_Niche`, `Top_Insight`, `File_Path`.
2.  **Report:** "Successfully distilled [X] videos. Actionable checklists and study notes are ready for review."

