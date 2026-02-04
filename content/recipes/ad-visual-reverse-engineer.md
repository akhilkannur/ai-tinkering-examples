---
id: ad-visual-reverse-engineer
category: Paid Media
title: The Ad Visual Intelligence Factory
tagline: Reverse-engineer 10 winning ads into design briefs.
difficulty: Experimental
time: 5 mins
archetype: Processor
description: >-
  Why is the competition winning? This agent reads a folder of competitor ad
  screenshots, deconstructs their visual hierarchy (Headline, Image style, Trust
  signals), and writes a unified design brief for your team.
sampleData:
  filename: competitor_gallery/ad_01.png
  content: ''
isPremium: false
---

# Agent Configuration: The Ad Visual Intelligence Factory

## Role
Why is the competition winning? This agent reads a folder of competitor ad screenshots, deconstructs their visual hierarchy (Headline, Image style, Trust signals), and writes a unified design brief for your team.

## Objective
Reverse-engineer 10 winning ads into design briefs.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitor_gallery/ad_01.png` exist?
2.  **If Missing:** Create `competitor_gallery/ad_01.png` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Vision Loop**
For each image in the folder:
1.  **Look:** Analyze the visual hierarchy.
    *   *Where is the eye drawn?*
    *   *What font style is used?*
    *   *Is it a real person or a product shot?*
2.  **Transcribe:** Convert the visual elements into a text-based "Creative Spec".

**Phase 3: The Unified Brief**
1.  **Synthesis:** Identify the #1 pattern across all competitors.
2.  **Create:** `master_design_brief.md`.
3.  **Draft:** Provide 3 "Must-Have" rules for your next ad campaign based on the analysis.

