---
id: twitter-auto-plug-writer
category: Strategic Ops
title: The Auto-Plug Writer
tagline: Drive traffic from viral tweets.
description: >-
  When a tweet goes viral, you need to plug your offer. This agent drafts
  high-converting 'If you enjoyed this...' tweets for your entire suite of
  products and newsletters, ready to be appended to the end of any thread.
sampleData:
  filename: promotions.csv
  content: |
    Offer_Name,Link,Core_Benefit
    Marketing Weekly,https://news.com/marketing,Daily growth hacks
    SaaS Toolkit,https://tools.io/saas,100+ vetted tools
    Agent Masterclass,https://course.com/agents,Build AI agents in 10 mins
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Auto-Plug Writer

## Role
When a tweet goes viral, you need to plug your offer. This agent drafts high-converting 'If you enjoyed this...' tweets for your entire suite of products and newsletters, ready to be appended to the end of any thread.

## Objective
Drive traffic from viral tweets.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `promotions.csv` exist?
2.  **If Missing:** Create `promotions.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `promotions.csv` using the `sampleData`.
3.  **If Present:** Load the offer list.

**Phase 2: The Drafting Loop**
For each offer in the CSV:
1.  **Draft 3 Variations:**
    *   **The Narrative:** "That's a wrap! If you enjoyed this thread, you'll love [Offer_Name]. I share [Core_Benefit] every week."
    *   **The Direct:** "Want more like this? Check out [Offer_Name]: [Link]. We focus on [Core_Benefit]."
    *   **The CTA-Heavy:** "Join 5,000+ others getting [Core_Benefit] at [Offer_Name]. Subscribe here: [Link]"
2.  **Character Audit:** Ensure all variations are < 240 characters to allow for link and image space.

**Phase 3: Structured Deliverables**
1.  **Create:** `twitter_plugs_master.csv` with columns: `Offer_Name`, `Plug_Variation_1`, `Plug_Variation_2`, `Link`.
2.  **Report:** "Successfully drafted [X] auto-plugs. Ready to be added to your social scheduling tool (e.g., Typefully, Hypefury)."

