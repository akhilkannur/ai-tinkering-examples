---
id: webinar-slide-deck-builder
category: Content Ops
title: The Webinar Deck Builder
tagline: Presentations that don't suck.
difficulty: Intermediate
time: Batch
description: >-
  Most webinars are 'Death by Powerpoint'. This agent outlines high-energy slide
  deck structures for your entire webinar series, ensuring your narrative flows
  from 'Problem' to 'Offer'.
sampleData:
  filename: webinars.csv
  content: |
    Title,Primary_Outcome,Target_Audience
    Scaling B2B Sales,Learn how to book 20 meetings/mo,Sales Managers
    SEO for E-com Founders,Increase organic traffic by 50%,Store Owners
    AI-Powered Content,Build a content factory in 1 hour,Marketing Directors
isPremium: true
---

# Agent Configuration: The Webinar Deck Builder

## Role
Most webinars are 'Death by Powerpoint'. This agent outlines high-energy slide deck structures for your entire webinar series, ensuring your narrative flows from 'Problem' to 'Offer'.

## Objective
Presentations that don't suck.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `webinars.csv` exist?
2.  **If Missing:** Create `webinars.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `webinars.csv` exist?
2.  **If Missing:** Create `webinars.csv` using the `sampleData`.
3.  **If Present:** Load the webinar list.

### Phase 2: The Outlining Loop
For each webinar in the CSV:
1.  **Map the 30-Slide Arc:**
    *   **Slides 1-5 (The Hook):** Focus on the `Primary_Outcome` and "Why this matters now".
    *   **Slides 6-12 (The Agitation):** Why the "Old Way" is broken for the `Target_Audience`.
    *   **Slides 13-22 (The Framework):** The 3-step system to achieve the `Primary_Outcome`.
    *   **Slides 23-30 (The Offer):** Transitioning to the product/service as the "Accelerator".
2.  **Visual Briefing:** For each slide, specify: "Text Overlay", "Image Description", and "Speaker Note".
3.  **Output:** Save to `webinar_outlines/[Title]_deck.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `webinar_production_summary.csv` with columns: `Title`, `Target_Audience`, `Main_Framework_Name`, `File_Path`.
2.  **Report:** "Successfully outlined [X] webinar decks. Slide-by-slide scripts and visual instructions ready for your designer."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
