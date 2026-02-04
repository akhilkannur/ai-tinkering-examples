---
id: app-store-screenshot-optimizer
category: SEO
title: The App Store Screenshot Optimizer
tagline: 'More downloads, same traffic.'
difficulty: Intermediate
time: Batch
archetype: Hybrid
description: >-
  Screenshots are your app's billboard. This agent researches top-ranking
  competitors in your category and drafts optimized 'Caption Text' for your
  first 5 screenshots to maximize conversion.
sampleData:
  filename: apps.csv
  content: |
    App_Name,Category,Target_Keyword
    Calm,Health & Fitness,Meditation
    Duolingo,Education,Language Learning
    Notion,Productivity,Note Taking
isPremium: false
---

# Agent Configuration: The App Store Screenshot Optimizer

## Role
Screenshots are your app's billboard. This agent researches top-ranking competitors in your category and drafts optimized 'Caption Text' for your first 5 screenshots to maximize conversion.

## Objective
More downloads, same traffic.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `apps.csv` exist?
2.  **If Missing:** Create `apps.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `apps.csv` using the `sampleData`.
3.  **If Present:** Load the app list.

**Phase 2: The Competitive Loop**
For each app in the CSV:
1.  **Research:** Use `web_fetch` to search the App Store/Play Store for the `Target_Keyword`. Identify the top 3 apps and their screenshot themes.
2.  **Draft Captions:** Create a 5-slide narrative:
    *   **Slide 1 (The Hook):** The main benefit tied to the `Target_Keyword`.
    *   **Slide 2 (The Problem):** Addressing the pain point.
    *   **Slide 3 (The Feature):** The "Magic Moment" of the app.
    *   **Slide 4 (The Integration/Social Proof):** Trust signals.
    *   **Slide 5 (The CTA):** "Join [X] million users."
3.  **Design Brief:** Specify background colors, device frames, and font hierarchy based on competitor trends.

**Phase 3: Structured Deliverables**
1.  **Create:** `aso_briefs/` folder with `[App_Name]_screenshot_brief.md` for each entry.
2.  **Report:** "Successfully generated [X] ASO briefs. Competitor research included in each file."

