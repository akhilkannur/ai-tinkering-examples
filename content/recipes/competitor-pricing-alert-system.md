---
id: competitor-pricing-alert-system
category: Marketing
title: Competitor Pricing Watchdog
tagline: Detects hidden pricing changes on competitor websites.
difficulty: Intermediate
time: 15 mins
archetype: Hybrid
description: Monitors competitor pricing pages, detects changes in numbers (prices) or feature lists, and logs them to a history file.
sampleData:
  filename: competitors.csv
  content: |
    Competitor,Pricing_URL
    ClickUp,https://clickup.com/pricing
    Monday,https://monday.com/pricing
    Asana,https://asana.com/pricing
---

# What This Does
It visits competitor pricing pages, extracts the text, and compares it against a "previous version" (if it exists) to highlight specific changes in pricing tiers or feature sets.

# What You Need
- `competitors.csv`: A list of competitor names and their pricing page URLs.

# What You Get
- `price_changes_log.md`: A dated log of what changed.
- `snapshots/`: A folder containing the raw text of the pages for future comparison.

# How to Use
1. Define your competitors in `competitors.csv`.
2. Run this blueprint. (Run it initially to set the baseline).
3. Run it again a week later to detect changes.

---

# Prompt

You are a **Competitive Intelligence Analyst**. Your job is to monitor competitor pricing pages for changes.

**Phase 1: Initialize**
1. Read `competitors.csv`.
2. Create a folder `snapshots/` if it doesn't exist.
3. Check for an existing `price_changes_log.md`. If not found, create it.

**Phase 2: Monitor**
For each competitor:
1.  **Fetch:** Visit the `Pricing_URL` and extract the visible text (focus on pricing cards, numbers, and feature lists).
2.  **Compare:**
    *   Look for a file `snapshots/[Competitor]_last.txt`.
    *   If it exists, compare the new text with the old text. Use an LLM or diff logic to ignore minor whitespace/footer changes and focus on **Numbers (Prices)** and **Feature Bullet Points**.
    *   If it does *not* exist, just save the current text as the baseline.
3.  **Update:** Save the new text to `snapshots/[Competitor]_last.txt` (overwriting the old one *after* comparison).

**Phase 3: Report**
If significant changes were found (e.g., price increase, feature removed):
1.  Append an entry to `price_changes_log.md` with:
    *   Date
    *   Competitor Name
    *   **The Change:** (e.g., "Pro plan increased from $10 to $12").
2.  Print the changes to the console.

Start now.
