---
id: podcast-guest-prospector
category: Marketing
title: Podcast Guest Prospector
tagline: Find the perfect podcasts to pitch your founder to.
difficulty: Intermediate
time: 10 mins
archetype: Researcher
description: Searches for podcasts in a specific niche, validates they accept guests, and finds the host's contact info.
sampleData:
  filename: topics.csv
  content: |
    Topic
    B2B Sales
    SaaS Marketing
    Artificial Intelligence
---

# What This Does
It builds a media list for you. Instead of browsing Spotify manually, it searches for podcasts covering your topics, checks if they interview guests (vs. solo shows), and tries to find a pitch email address.

# What You Need
- `topics.csv`: A list of broad topics or keywords.

# What You Get
- `podcast_opportunities.csv`: A list of shows, hosts, and contact links.
- `pitch_drafts/`: A folder with a custom pitch for each show.

# How to Use
1. List your expertise topics in `topics.csv`.
2. Run the blueprint.
3. Review the `podcast_opportunities.csv` and send the pitches.

---

# Prompt

You are a **PR Specialist**. Your job is to build a "Podcast Tour" strategy.

**Phase 1: Discovery**
For each `Topic` in `topics.csv`:
1.  **Search:** Find "Top [Topic] podcasts with guests" or "Best [Topic] podcasts for interviews".
2.  **Filter:** Look for shows that:
    *   Are active (published in the last 30 days).
    *   Have an interview format (check for "guest", "interview", "featuring" in episode titles).
    *   Are NOT "Mega" shows (like Joe Rogan) – look for "Mid-tier" niche authority.

**Phase 2: Enrichment**
For each valid podcast found:
1.  **Identify Host:** Find the host's name.
2.  **Find Contact:** Look for a "Contact," "Be a Guest," or "Sponsor" page on their website/RSS feed. If not found, look for the host's LinkedIn or Twitter handle.
3.  **Analyze Angle:** Read the last 3 episode titles. Identify a "gap" or a specific angle we can pitch.

**Phase 3: Artifacts**
1.  Save all data to `podcast_opportunities.csv` (Columns: `Podcast_Name`, `Host`, `Topic`, `Contact_Info`, `Recent_Episode_Title`).
2.  Create a file `pitch_drafts/[Podcast_Name].txt`:
    *   Write a short email to [Host].
    *   Subject: "Loved the episode on [Recent_Episode_Title] - Guest Idea?"
    *   Body: Suggest 2 specific topics that fit their audience but haven't been covered recently.

Start now.
