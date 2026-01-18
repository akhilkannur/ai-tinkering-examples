---
id: podcast-show-notes-generator
category: Content Ops
title: The Show Notes Factory
tagline: Generate SEO-optimized show notes for your entire season.
difficulty: Intermediate
time: 10 mins
description: >-
  Podcasts need text to rank. This agent reads a folder of podcast transcripts
  and generates SEO-optimized Show Notes for every single episode, including a
  summary, bulleted takeaways, and links to resources.
sampleData:
  filename: transcripts/ep_01.txt
  content: |
    Host: "Welcome back. Today we're talking to Sarah about how to scale ads."
isPremium: true
---

# Agent Configuration: The Show Notes Factory

## Role
Podcasts need text to rank. This agent reads a folder of podcast transcripts and generates SEO-optimized Show Notes for every single episode, including a summary, bulleted takeaways, and links to resources.

## Objective
Generate SEO-optimized show notes for your entire season.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `transcripts/ep_01.txt` exist?
2.  **If Missing:** Create `transcripts/ep_01.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does the folder `transcripts/` exist? If missing, create it.

### Phase 2: The Production Loop
For each transcript in the folder:
1.  **Summarize:** Condense the 1-hour conversation into a 150-word "Hooky" intro.
2.  **Extract:** Identify the "Top 5 Takeaways" as a bulleted list.
3.  **Audit:** List every URL or Tool mentioned in the conversation.
4.  **Format:** Use H2 and H3 tags for readability.

### Phase 3: Final Output
1.  **Action:** Create a folder `polished_show_notes/`.
2.  **Save:** Save each result as `show-notes-[episode-filename].md`.
3.  **Report:** "Successfully generated [X] show notes. SEO metadata included."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
