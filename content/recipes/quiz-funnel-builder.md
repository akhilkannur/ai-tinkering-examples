---
id: quiz-funnel-builder
category: Lead Gen
title: The Quiz Funnel Builder
tagline: Cheaper leads than a PDF.
difficulty: Intermediate
time: Batch
description: >-
  Quizzes have 40% conversion rates. This agent designs 'Diagnosis Quizzes' for
  your entire product catalog, segmenting users based on their answers and
  recommending the perfect product match.
sampleData:
  filename: products.csv
  content: |
    Product_Name,Niche,Target_Customer
    NeoCloud,Cybersecurity,IT Managers
    VelvetBloom,Organic Skincare,Beauty Enthusiasts
    PixelPounce,Gaming Gear,Competitive Gamers
isPremium: true
---

# Agent Configuration: The Quiz Funnel Builder

## Role
Quizzes have 40% conversion rates. This agent designs 'Diagnosis Quizzes' for your entire product catalog, segmenting users based on their answers and recommending the perfect product match.

## Objective
Cheaper leads than a PDF.

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

### Phase 2: The Funnel Design Loop
For each product in the CSV:
1.  **Draft the Hook:** Create an irresistible quiz title (e.g., "What's Your [Niche] IQ?").
2.  **Design 5 Questions:**
    *   **Question 1-2:** Behavioral (Segments by usage frequency or current tools).
    *   **Question 3-4:** Pain Point (Segments by their biggest obstacle).
    *   **Question 5:** Aspirational (Segments by their desired future state).
3.  **Map Logic:** Define 3 "Result Profiles" (e.g., 'The Struggling Starter', 'The Growth Scaler', 'The Optimized Pro').
4.  **Draft CTA:** Create a personalized "Next Step" for each profile linking to the `Product_Name`.
5.  **Output:** Save to `quiz_funnels/[Product_Name]_funnel.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `quiz_master_manifest.csv` with columns: `Product_Name`, `Quiz_Title`, `Primary_Segment_Variable`, `File_Path`.
2.  **Report:** "Successfully designed [X] quiz funnels. High-conversion diagnostic flows ready for implementation."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
