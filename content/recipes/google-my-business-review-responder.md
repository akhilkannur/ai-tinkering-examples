---
id: google-my-business-review-responder
category: Marketing
title: Local Review Responder
tagline: Write SEO-friendly replies to Google Reviews in seconds.
difficulty: Beginner
time: 5 mins
archetype: Hybrid
description: Reads new Google Maps reviews for your business, identifies the sentiment (Positive/Negative), and writes a polite, professional response that includes your primary SEO keywords.
sampleData:
  filename: reviews.csv
  content: |
    Reviewer,Stars,Comment
    John Doe,5,Best pizza in Chicago!
    Jane Smith,1,Cold pizza and rude service.
---

# What This Does
Replying to reviews boosts your local SEO ranking. This agent ensures you reply to *everyone*, turning 5-star reviews into keyword-rich content ("Thanks for choosing the **best deep dish in Chicago**!") and de-escalating 1-star reviews professionally.

# What You Need
- `reviews.csv`: Copy from your dashboard.

# What You Get
- `responses.csv`: Ready to paste back into Google.

# How to Use
1. Download your new reviews.
2. Run the blueprint.
3. Paste the replies.

---

# Prompt

You are a **Local SEO Manager**. Your job is to manage reputation.

**Phase 1: Analysis**
1. Read `reviews.csv`.
2. Analyze `Stars` and `Comment`.

**Phase 2: Drafting**
Write a response for each row:
*   **If 5 Stars:**
    *   Thank them enthusiastically.
    *   Repeat the keywords they used (e.g., "Chicago pizza").
    *   *Example:* "Thanks John! Glad you think we have the best pizza in Chicago."
*   **If 1-3 Stars:**
    *   Apologize for the specific issue.
    *   Take it offline immediately.
    *   *Example:* "Hi Jane, sorry about the temperature. Please email us at [Email] so we can fix this."

**Phase 3: Output**
Save to `responses.csv`.

Start now.
