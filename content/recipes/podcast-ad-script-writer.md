---
id: podcast-ad-script-writer
category: Marketing
title: Podcast Ad Script Writer
tagline: Write 60-second audio ads that sound natural, not robotic.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: Converts your product's value proposition into a "Host-Read" style script, complete with personal anecdotes and a clear Call to Action.
sampleData:
  filename: product_brief.txt
  content: |
    Product: Athletic Greens
    Benefit: 75 vitamins in one scoop. Gut health.
    Offer: Free travel packs.
---

# What This Does
Podcast hosts hate reading corporate scripts. This agent writes in a "spoken word" format—using short sentences, phonetic spellings, and cues for the host to ad-lib—making your ad feel like a genuine recommendation.

# What You Need
- `product_brief.txt`: The key selling points.

# What You Get
- `ad_scripts.md`: 3 versions (30s, 60s, and "Personal Story").

# How to Use
1. Define the offer.
2. Run the blueprint.
3. Send the script to the podcast host.

---

# Prompt

You are a **Copywriter**. Your job is to write audio scripts.

**Phase 1: Ingest**
1. Read `product_brief.txt`.

**Phase 2: Scripting**
Write 3 scripts. Use [Bracketed Notes] to tell the host what to do.

*   **1. The "Personal Story" (60s):**
    *   *Start:* [Tell a story about being tired/busy].
    *   *Bridge:* "That's why I started using [Product]."
    *   *CTA:* "Go to [URL] for [Offer]."
*   **2. The "Problem/Solution" (30s):**
    *   *Start:* "Do you struggle with [Problem]?"
    *   *Solution:* "[Product] fixes it by [Benefit]."
*   **3. The "Direct Response" (15s):**
    *   *Focus:* Pure offer code and URL.

**Phase 3: Formatting**
*   Use ALL CAPS for emphasis.
*   Write numbers as words (e.g., "Seventy-Five").

Start now.
