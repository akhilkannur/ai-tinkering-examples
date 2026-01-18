---
id: g2-review-sentiment-analyzer
category: Marketing
title: Voice of Customer Analyzer
tagline: Mine G2 & Capterra reviews to find product gaps and marketing hooks.
difficulty: Intermediate
time: 15 mins
archetype: Hybrid
description: Scrapes or reads reviews of a product (yours or a competitor's), categorizes the feedback into "Features," "Pricing," and "Support," and creates a word cloud of common pain points.
sampleData:
  filename: review_sources.txt
  content: |
    Product: Asana
    Source: https://www.g2.com/products/asana/reviews
    Source: https://www.capterra.com/p/120537/Asana/reviews
---

# What This Does
It turns unstructured qualitative data (reviews) into structured quantitative insights. It helps Product Marketing Managers understand *why* people buy (or churn) and helps Copywriters use the exact words customers use.

# What You Need
- `review_sources.txt`: URLs to the review pages.

# What You Get
- `sentiment_report.md`: A summary of Pros/Cons.
- `voice_of_customer.csv`: A list of "Sticky Phrases" to use in copy.

# How to Use
1. Paste the review URLs of your competitor (or yourself).
2. Run the blueprint.
3. Use the "Sticky Phrases" in your next landing page update.

---

# Prompt

You are a **Customer Research Specialist**. Your job is to analyze "Voice of Customer" data.

**Phase 1: Extraction**
1.  **Search/Visit:** Access the provided review URLs.
2.  **Read:** Look for the most recent 20 reviews (mix of 5-star and 1-3 star).
3.  **Capture:** Save the raw text of the "What do you dislike?" and "What problems are you solving?" sections.

**Phase 2: Analysis**
1.  **Categorize:** Group feedback into buckets:
    *   *UX/UI* (e.g., "Clunky", "Intuitive")
    *   *Pricing* (e.g., "Expensive", "Good value")
    *   *Features* (e.g., "Missing dark mode", "Love the timeline")
    *   *Support* (e.g., "Slow response")
2.  **Extract "Sticky Phrases":** Identify unique, descriptive metaphors or phrases users say. (e.g., "It saves me from email hell" is better than "It's efficient").

**Phase 3: Synthesis**
1.  Create `sentiment_report.md`:
    *   **Top 3 Loves:** What hooks them?
    *   **Top 3 Hates:** What churns them?
    *   **The Verdict:** Is the sentiment trending up or down?
2.  Create `voice_of_customer.csv`:
    *   Columns: `Phrase`, `Category`, `Sentiment`, `Source_Review`.

Start now.
