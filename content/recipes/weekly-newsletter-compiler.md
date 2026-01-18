---
id: weekly-newsletter-compiler
category: Marketing
title: Newsletter Content Curator
tagline: Automate the research for your "Weekly Round-Up" email.
difficulty: Intermediate
time: 15 mins
archetype: Hybrid
description: Visits 3-5 specific industry news sites or blogs, summarizes the top headlines from the last 7 days, and drafts a curated newsletter intro.
sampleData:
  filename: sources.txt
  content: |
    https://techcrunch.com/apps/
    https://www.theverge.com/tech
    https://news.ycombinator.com/
---

# What This Does
Writing a "Curated" newsletter usually means having 50 tabs open. This agent does the browsing for you, extracting the most interesting stories and summarizing them into bullet points so you can just add your commentary and hit send.

# What You Need
- `sources.txt`: A list of URLs to check.

# What You Get
- `newsletter_draft.md`: A structured draft with "Top Story," "Quick Hits," and links.

# How to Use
1. Define your favorite news sources.
2. Run the blueprint.
3. Edit the tone and send.

---

# Prompt

You are a **Newsletter Editor**. Your job is to curate the week's top news.

**Phase 1: Research**
For each URL in `sources.txt`:
1.  **Visit:** Go to the page.
2.  **Scan:** Look for articles published in the last 7 days.
3.  **Select:** Pick the 1 most "clickable" or significant story from each source.

**Phase 2: Summarize**
For the selected stories (limit to top 5 total):
1.  **Headline:** Catchy title.
2.  **The Gist:** A 2-sentence summary of *why* it matters.
3.  **Link:** The URL.

**Phase 3: Draft**
Create `newsletter_draft.md` with this structure:
*   **Subject Line Ideas:** 3 options.
*   **The Deep Dive:** Pick the biggest story and write a short paragraph about it.
*   **Quick Hits:** Bullet points for the other 4 stories.
*   **Tweet of the Week:** (Placeholder).

Start now.
