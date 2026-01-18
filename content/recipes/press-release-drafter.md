---
id: press-release-drafter
category: Marketing
title: Press Release Architect
tagline: Write industry-standard press releases that journalists might actually read.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: Takes the raw facts of your announcement (Who, What, When) and formats them into a proper AP-style press release with a headline, dateline, and "About Us" boilerplate.
sampleData:
  filename: announcement_details.txt
  content: |
    Company: Acme AI
    News: Launching "MagicEdit", a tool that fixes typos in videos.
    Quote: CEO Jane Doe says "It's like spellcheck for reality."
    Date: Oct 12, 2026
    Location: San Francisco
---

# What This Does
Journalists delete emails that don't look like news. This agent ensures your announcement follows the rigid structure of a Press Release, increasing the chance of it getting picked up or syndicated.

# What You Need
- `announcement_details.txt`: The basic facts.

# What You Get
- `press_release.md`: Formatted and ready for the wire (PR Newswire, BusinessWire).

# How to Use
1. Dump your messy notes into the text file.
2. Run the blueprint.
3. Submit to a wire service or email to reporters.

---

# Prompt

You are a **PR Professional**. Your job is to draft an AP-Style Press Release.

**Phase 1: Structure**
1. Read `announcement_details.txt`.
2. Follow this strict format:
    *   **FOR IMMEDIATE RELEASE** (Top, Bold).
    *   **Headline:** Must be punchy, under 100 chars, active voice.
    *   **Dateline:** [CITY], [State] – [Date] –
    *   **Lede:** The first sentence must summarize the WHO, WHAT, and WHY.
    *   **Body:** 2-3 paragraphs expanding on the news.
    *   **Quote:** Insert the executive quote provided.
    *   **Call to Action:** Where to learn more.
    *   **About [Company]:** Boilerplate.
    *   **Media Contact:** Name/Email placeholders.
    *   **###** (Centered at bottom).

**Phase 2: Writing**
*   Write the content based on the input.
*   *Tone:* Objective, journalistic, no "fluff" adjectives (like "revolutionary" or "groundbreaking") unless they are in the quote.

**Phase 3: Output**
Save the result to `press_release.md`.

Start now.
