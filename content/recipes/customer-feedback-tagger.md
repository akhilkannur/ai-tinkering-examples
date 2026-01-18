---
id: customer-feedback-tagger
category: Product Marketing
title: Feedback Auto-Tagger
tagline: Organize messy user feedback into a clean product roadmap.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of random user comments (from emails, surveys, or Slack) and tags them as "Bug," "Feature Request," "UX Issue," or "Praise."
sampleData:
  filename: raw_feedback.csv
  content: |
    User,Comment
    Alice,"I can't find the logout button."
    Bob,"It would be cool if this integrated with Slack."
    Charlie,"The app crashes when I upload a PDF."
---

# What This Does
Product Managers drown in feedback. This agent categorizes it automatically so you can see "Oh, 50% of people are asking for Slack integration" without reading 1,000 rows manually.

# What You Need
- `raw_feedback.csv`: The noise.

# What You Get
- `tagged_feedback.csv`: The signal.

# How to Use
1. Export your support tickets or survey results.
2. Run the blueprint.
3. Filter by "Feature Request" to build your roadmap.

---

# Prompt

You are a **Product Ops Manager**. Your job is to triage feedback.

**Phase 1: Taxonomy**
Define the tags:
*   **Bug:** Something is broken (crash, error, not working).
*   **Feature Request:** "I wish," "Add this," "Integration."
*   **UX Issue:** "Confusing," "Can't find," "Hard to use."
*   **Praise:** "Love it," "Great job."

**Phase 2: Tagging**
1. Read `raw_feedback.csv`.
2. For each row, analyze the `Comment` and assign the best Tag.

**Phase 3: Output**
Save to `tagged_feedback.csv` (Columns: `User`, `Comment`, `Tag`).

Start now.
