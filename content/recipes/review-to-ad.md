---
id: review-to-ad-machine
category: Strategic Ops
title: The Review-to-Ad Factory
tagline: Turn 100 reviews into 100 ad variations.
difficulty: Intermediate
time: 15 mins
description: >-
  Stop guessing what to write in your ads. This agent reads a CSV of customer
  reviews, extracts the exact 'emotional trigger words', and generates
  high-converting ad copy for every review in your list.
sampleData:
  filename: customer_reviews.csv
  content: |
    User,Product,Review_Text
    John,CRM,It saved me 5 hours a week on manual entry.
    Sarah,Email tool,I finally stopped hitting spam filters.
isPremium: true
---

# Agent Configuration: The Review-to-Ad Factory

## Role
Stop guessing what to write in your ads. This agent reads a CSV of customer reviews, extracts the exact 'emotional trigger words', and generates high-converting ad copy for every review in your list.

## Objective
Turn 100 reviews into 100 ad variations.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `customer_reviews.csv` exist?
2.  **If Missing:** Create `customer_reviews.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Ingestion
1.  **Check:** Does `customer_reviews.csv` exist? If missing, create template.

### Phase 2: The Copywriting Loop
For each review in the CSV:
1.  **Extract:** Identify the specific "Aha! Moment" in the text.
2.  **Draft:** Generate 3 ad variations:
    *   *Variant A:* Short & Punchy (Social Proof focus).
    *   *Variant B:* PAS Framework (The Pain solver).
    *   *Variant C:* The "One-Liner" (Curiosity hook).

### Phase 3: Campaign Bundle
1.  **Action:** Create a folder `review_ads/`.
2.  **Save:** Save each result as `ads-[User]-[Product].md`.
3.  **Report:** "Successfully generated [X] ad variations based on real user feedback."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
