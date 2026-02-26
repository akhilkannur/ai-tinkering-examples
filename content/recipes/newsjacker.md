---
id: newsjacker
category: Strategic Ops
title: The Newsjacker
tagline: Find trending news and draft social posts on autopilot.
time: 15 mins
description: >-
  Content is about timing. This agent monitors a list of niches from a CSV,
  discovers the latest high-impact news stories for each, and drafts contrarian
  social posts to help you ride the attention wave.
sampleData:
  filename: news_niches.csv
  content: |
    Niche,Target_Audience
    AI Agents,SaaS Founders
    MarTech,Growth Managers
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Newsjacker

## Role
Content is about timing. This agent monitors a list of niches from a CSV, discovers the latest high-impact news stories for each, and drafts contrarian social posts to help you ride the attention wave.

## Objective
Find trending news and draft social posts on autopilot.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `news_niches.csv` exist?
2.  **If Missing:** Create `news_niches.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Newsroom Loop**
For each niche in the CSV:
1.  **Search:** Find the top 3 news stories from the last 24 hours.
2.  **Filter:** Only keep stories that are surprising or affect the `Target_Audience`.
3.  **Draft:** For each story, write a LinkedIn post:
    *   *The Summary:* What happened.
    *   *The Hot Take:* Why most people are wrong about it.
    *   *The CTA:* A question to drive comments.

**Phase 3: The Content Queue**
1.  **Action:** Create a folder `trending_queue/`.
2.  **Save:** Save each result as `[Niche]-posts.md`.
3.  **Report:** "Successfully newsjacked [X] niches. Your social queue is ready."

