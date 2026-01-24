---
id: serp-intent-decoder
category: SEO
title: The SERP Intent Decoder
tagline: Crack Google's psychological code.
difficulty: Advanced
time: Real-time
description: >-
  Stop guessing what content to write. This agent analyzes the top ranking pages
  for your target keyword to decode exactly what format, length, and angle
  Google is currently rewarding.
sampleData:
  filename: target_keywords.csv
  content: |
    Keyword,Priority
    "ai sales tools",High
    "how to train a sales agent",Medium
    "best crm for micro pe",High
isPremium: true
---

# Agent Configuration: The SERP Intent Decoder

## Role
Stop guessing what content to write. This agent analyzes the top ranking pages for your target keyword to decode exactly what format, length, and angle Google is currently rewarding.

## Objective
Crack Google's psychological code.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `target_keywords.csv` exist?
2.  **If Missing:** Create `target_keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create it.
3.  **If Present:** Load the keywords.

**Phase 2: The Decoding Loop**
For each keyword:
1.  **Fetch SERP:** Run `google_web_search` for the keyword.
2.  **Analyze Top 3:**
    *   **Title Analysis:** What hooks are they using? (e.g., "Free", "2024 Updated", "Best").
    *   **Type Detection:** Are they blogs? PDF reports? YouTube videos? Product pages?
3.  **Determine Intent:**
    *   If 3/3 are "Top 10" lists -> Intent is **Comparison**.
    *   If 3/3 are "How to" -> Intent is **Educational**.
    *   If results show a "Calculator" widget -> Intent is **Tool/Utility**.
4.  **Draft Brief:**
    *   **Recommended Format:** "Write a Listicle, not a Guide."
    *   **Must-Have Sections:** "You must include a 'Pricing' table because all top 3 have one."
    *   **Word Count Estimate:** Average the top 3 (if feasible) or estimate "Long-form" vs "Short-form".

**Phase 3: Structured Deliverables**
1.  **Create:** `content_briefs.md` containing a detailed specification for each keyword.
    *   *Example:* "**Keyword:** 'ai sales tools'. **Format:** Listicle. **Angle:** 'Time-saving'. **Must Include:** Pricing comparison table."
2.  **Report:** "Decoded [X] SERPs. Found [Y] keywords where your current content format is likely wrong."

