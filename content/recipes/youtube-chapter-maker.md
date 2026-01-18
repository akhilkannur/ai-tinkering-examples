---
id: youtube-chapter-maker
category: YouTube
title: The Chapter Maker
tagline: Rank for key moments.
difficulty: Intermediate
time: Batch
description: >-
  Google indexes video chapters directly in search results. This agent processes
  your video transcripts, identifies topic shifts, and generates SEO-optimized
  'Chapter Lists' for your entire channel.
sampleData:
  filename: transcripts.csv
  content: |
    Video_Title,Transcript_File,Target_Keyword
    AI Agent Tutorial,transcripts/ai_agent.txt,Build AI agents
    Sales Cold Call,transcripts/cold_call.txt,Sales objection handling
    Growth Hacking 101,transcripts/growth.txt,Scalable growth strategies
isPremium: true
---

# Agent Configuration: The Chapter Maker

## Role
Google indexes video chapters directly in search results. This agent processes your video transcripts, identifies topic shifts, and generates SEO-optimized 'Chapter Lists' for your entire channel.

## Objective
Rank for key moments.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `transcripts.csv` exist?
2.  **If Missing:** Create `transcripts.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `transcripts.csv` exist?
2.  **If Missing:** Create `transcripts.csv` using the `sampleData`. Ensure the `transcripts/` folder exists.
3.  **If Present:** Load the transcript list.

### Phase 2: The Chaptering Loop
For each transcript in the CSV:
1.  **Analyze Content:** Scan the `Transcript_File` for timestamp markers (e.g., `[02:15]`) and topical shifts.
2.  **Identify Key Moments:**
    *   **00:00:** The Hook/Intro.
    *   **Topic Shifts:** Any time a new sub-topic or step is introduced.
    *   **The Pitch:** When the CTA or final summary occurs.
3.  **Draft Chapter Titles:** Create concise, descriptive titles incorporating the `Target_Keyword` where natural.
4.  **Formatting:** Ensure the output follows the YouTube "00:00 Title" format for instant copy-pasting.

### Phase 3: Structured Deliverables
1.  **Create:** `video_metadata_master.csv` with columns: `Video_Title`, `Total_Chapters`, `Primary_SEO_Chapter`, `Chapter_List_Raw`.
2.  **Report:** "Successfully generated chapters for [X] videos. SEO-optimized timestamps ready for your YouTube descriptions."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
