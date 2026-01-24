---
id: facebook-ad-creative-brief
category: Paid Media
title: The Facebook Ad Creative Brief
tagline: High-converting visual concepts at scale.
difficulty: Intermediate
time: Batch
description: >-
  The creative is the most important targeting lever. This agent takes a list of
  products and generates distinct visual concepts (UGC, Static, Carousel) with
  detailed instructions for your design team.
sampleData:
  filename: campaigns.csv
  content: |
    Product_Name,Target_Audience,Primary_Benefit
    NeoCloud,IT Managers,Unbreakable encryption
    VelvetBloom,Busy Moms,Instant skin hydration
    PixelPounce,Pro Gamers,Zero lag performance
isPremium: true
---

# Agent Configuration: The Facebook Ad Creative Brief

## Role
The creative is the most important targeting lever. This agent takes a list of products and generates distinct visual concepts (UGC, Static, Carousel) with detailed instructions for your design team.

## Objective
High-converting visual concepts at scale.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `campaigns.csv` exist?
2.  **If Missing:** Create `campaigns.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `campaigns.csv` using the `sampleData`.
3.  **If Present:** Load the campaign list.

**Phase 2: The Concepting Loop**
For each product in the CSV:
1.  **Ideate 3 Angles:**
    *   **Concept 1 (UGC/Relatability):** iPhone-style footage focusing on the `Primary_Benefit` in a real-world setting.
    *   **Concept 2 (Comparison/Logic):** A "Us vs. Them" split screen or before/after visual.
    *   **Concept 3 (Authority/Social Proof):** A testimonial-led layout with a high-authority backdrop.
2.  **Draft Visual Brief:** Specify background colors, font styles (e.g., bold sans-serif), and "The Hook" (text on image).
3.  **Draft Primary Text:** Write 2 variations of the ad caption (one short, one long).
4.  **Output:** Save to `creative_briefs/[Product_Name]_brief.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `creative_production_summary.csv` with columns: `Product_Name`, `Target_Audience`, `Primary_Hook`, `File_Path`.
2.  **Report:** "Successfully designed [X] ad concepts. Visual briefs and copy variations ready for your design team."

