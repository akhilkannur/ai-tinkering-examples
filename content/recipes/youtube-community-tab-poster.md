---
id: youtube-community-tab-poster
category: Content Ops
title: The Community Tab Poster
tagline: Keep subscribers alive between uploads.
difficulty: Beginner
time: Batch
description: >-
  Don't just post videos. This agent plans high-engagement 'Community Tab' posts
  - Polls, Behind-the-Scenes, and Teasers - for your entire YouTube channel
  portfolio to keep the algorithm active.
sampleData:
  filename: channels.csv
  content: |
    Channel_Name,Main_Topic,Next_Video_Topic
    AI Tinkering,AI Agent Tutorials,How to build a voice agent
    SDR Lab,Sales Cold Calling,Handle the 'I have no budget' objection
    Glow Design,UX & Brand,Redesigning the Apple Homepage
isPremium: true
---

# Agent Configuration: The Community Tab Poster

## Role
Don't just post videos. This agent plans high-engagement 'Community Tab' posts - Polls, Behind-the-Scenes, and Teasers - for your entire YouTube channel portfolio to keep the algorithm active.

## Objective
Keep subscribers alive between uploads.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `channels.csv` exist?
2.  **If Missing:** Create `channels.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `channels.csv` using the `sampleData`.
3.  **If Present:** Load the channel list.

**Phase 2: The Content Planning Loop**
For each channel in the CSV:
1.  **Draft Poll (The Feedback):** "Which [Main_Topic] struggle are you facing right now?" (4 specific options).
2.  **Draft Teaser (The Curiosity):** "Just finished filming the [Next_Video_Topic] guide. You won't believe [Specific Detail]. Dropping Tuesday! 🔔"
3.  **Draft Relatable Post (The Vibe):** A short, text-based joke or observation about the `Main_Topic` industry.
4.  **Draft CTA:** "Check the link in our bio for the free resource on [Main_Topic]."
5.  **Output:** Save to `community_plans/[Channel_Name]_week.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `community_engagement_manifest.csv` with columns: `Channel_Name`, `Poll_Topic`, `Teaser_Hook`, `File_Path`.
2.  **Report:** "Successfully designed [X] weeks of community content. Ready to keep your subscribers engaged between uploads."

