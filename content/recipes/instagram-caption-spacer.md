---
id: instagram-caption-spacer
category: Content Ops
title: The Caption Formatting Factory
tagline: Format 30 days of social captions in seconds.
time: Daily
description: >-
  Instagram destroys formatting. This agent reads a CSV of raw post copy, adds
  invisible line breaks, formats lists with emojis, and organizes hashtags into
  a separate block for your entire monthly calendar.
sampleData:
  filename: monthly_captions.csv
  content: >
    Date,Raw_Copy,Hashtags

    2024-02-01,"Product launch day! We are so excited. Join us at 2pm.","launch,
    ai, startups"

    2024-02-02,"How to use the new filter. 1. Click open. 2. Drag.","tutorial,
    tips"
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Caption Formatting Factory

## Role
Instagram destroys formatting. This agent reads a CSV of raw post copy, adds invisible line breaks, formats lists with emojis, and organizes hashtags into a separate block for your entire monthly calendar.

## Objective
Format 30 days of social captions in seconds.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `monthly_captions.csv` exist?
2.  **If Missing:** Create `monthly_captions.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Production Loop**
For each row in the CSV:
1.  **Hook:** BOLD the first line.
2.  **Space:** Insert a dot-spacer after every 2 sentences.
3.  **Clean:** Move the `Hashtags` to the bottom of the block, separated by a dot-vertical line.
4.  **Emoji:** Add 2 relevant emojis to the body text if missing.

**Phase 3: The Social Queue**
1.  **Create:** `polished_social_queue.md`.
2.  **Summary:** "Formatted [X] posts. Content is now copy-paste ready for your scheduler."

