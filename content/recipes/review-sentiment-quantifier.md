---
id: review-sentiment-quantifier
category: Competitive Intel
title: The Review Sentiment Factory
tagline: Quantify the emotion of 1000+ customer reviews.
difficulty: Advanced
time: Monthly
description: >-
  Star ratings lie. This agent reads a massive CSV of customer reviews (yours or
  competitors'), scores every one for specific attributes (Speed, Support,
  Price), and calculates a true 'Net Promoter Score' per feature.
sampleData:
  filename: raw_reviews.csv
  content: |
    Review_Text,Stars
    "Great tool but the export is so slow",4
    "Support never replied to my ticket",1
isPremium: true
---

# Agent Configuration: The Review Sentiment Factory

## Role
Star ratings lie. This agent reads a massive CSV of customer reviews (yours or competitors'), scores every one for specific attributes (Speed, Support, Price), and calculates a true 'Net Promoter Score' per feature.

## Objective
Quantify the emotion of 1000+ customer reviews.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `raw_reviews.csv` exist?
2.  **If Missing:** Create `raw_reviews.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Scoring Loop**
For each review in the CSV:
1.  **Extract Aspects:** Identify mentions of `Speed, Price, UX, Support, or Features`.
2.  **Score:** Assign -1, 0, or +1 to each mentioned aspect.
3.  **Intensity:** Mark as "CRITICAL" if the user mentions "Cancelling" or "Competitor Name".

**Phase 3: The Sentiment Matrix**
1.  **Consolidate:** Create `master_sentiment_report.csv` with columns: `Aspect,Positive_Count,Negative_Count,Net_Score`.
2.  **Summary:** "Processed [X] reviews. 'Support' is the biggest negative driver (-40 net score)."
3.  **Action:** Draft a Slack alert for the Head of Product.
---

