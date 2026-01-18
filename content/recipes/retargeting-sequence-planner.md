---
id: retargeting-sequence-planner
category: Paid Media
title: The Retargeting Sequence Planner
tagline: The 'Stalker' ad strategy.
difficulty: Advanced
time: Batch
description: >-
  98% of visitors don't buy on the first visit. This agent maps out 30-day
  retargeting ad sequences for your entire product catalog, ensuring you stay
  top-of-mind without being annoying.
sampleData:
  filename: products.csv
  content: |
    Product_Name,Primary_Benefit,Top_Objection
    NeoCloud,Encryption Security,Too technical to setup
    VelvetBloom,Organic Ingredients,Expensive compared to drugstore
    PixelPounce,1ms Latency,Is it worth the premium price?
isPremium: true
---

# Agent Configuration: The Retargeting Sequence Planner

## Role
98% of visitors don't buy on the first visit. This agent maps out 30-day retargeting ad sequences for your entire product catalog, ensuring you stay top-of-mind without being annoying.

## Objective
The 'Stalker' ad strategy.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `products.csv` exist?
2.  **If Missing:** Create `products.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `products.csv` exist?
2.  **If Missing:** Create `products.csv` using the `sampleData`.
3.  **If Present:** Load the product list.

### Phase 2: The Planning Loop
For each product in the CSV:
1.  **Draft Stage 1 (Day 1-3): The Reminder.** Focus on the `Primary_Benefit`. "Did you forget this? [Product_Name] is still waiting for you."
2.  **Draft Stage 2 (Day 4-10): The Social Proof.** Use testimonials and "Logo Clouds" to build trust.
3.  **Draft Stage 3 (Day 11-20): The Objection Crusher.** Directly address the `Top_Objection` (e.g., "See how we simplified our setup" or "Why organic costs more").
4.  **Draft Stage 4 (Day 21-30): The Closer.** Introduce a limited-time discount or scarcity (e.g., "10% off for the next 24 hours").
5.  **Output:** Save to `ad_plans/[Product_Name]_sequence.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `retargeting_master_manifest.csv` with columns: `Product_Name`, `Primary_Hook`, `Objection_Handled`, `File_Path`.
2.  **Report:** "Successfully designed [X] retargeting sequences. Creative briefs and copy variations ready for your designer."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
