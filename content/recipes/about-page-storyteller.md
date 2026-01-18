---
id: about-page-storyteller
category: Brand
title: The About Page Storyteller
tagline: Build trust with a data-backed brand story.
difficulty: Intermediate
time: Batch
archetype: Hybrid
description: >-
  Faceless brands are dead. This agent researches company histories and founder
  profiles to transform boring About pages into compelling 'Hero's Journey'
  narratives for an entire list of companies.
sampleData:
  filename: companies.csv
  content: |
    Company_Name,Website,Founders
    Linear,https://linear.app,Karri Saarinen
    PostHog,https://posthog.com,James Hawkins
    Beehiiv,https://beehiiv.com,Tyler Denk
---

# Agent Configuration: The About Page Storyteller

## Role
Faceless brands are dead. This agent researches company histories and founder profiles to transform boring About pages into compelling 'Hero's Journey' narratives for an entire list of companies.

## Objective
Build trust with a data-backed brand story.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `companies.csv` exist?
2.  **If Missing:** Create `companies.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `companies.csv` exist?
2.  **If Missing:** Create `companies.csv` using the `sampleData`.
3.  **If Present:** Load the company list.

### Phase 2: The Research Loop
For each company in the CSV:
1.  **Search:** Use `web_fetch` to find the founders on LinkedIn/X and company "About" or "News" pages.
2.  **Analyze:** Find the "Aha!" moment—why did they build this? Identify key milestones.
3.  **Draft:** Create the page in 4 sections:
    *   **Section 1: The Status Quo.** (The problem before the company existed).
    *   **Section 2: The Epiphany.** (The story of the first prototype).
    *   **Section 3: The Mission.** (Why we do this every day).
    *   **Section 4: The Proof.** (Real numbers and logos).

### Phase 3: Structured Deliverables
1.  **Create:** A folder `brand_stories/` containing `[Company_Name]_story.md` for each entry.
2.  **Create:** `story_summary.csv` with columns: `Company_Name`, `Emotional_Hook`, `File_Path`.
3.  **Report:** "Successfully drafted stories for [X] companies. Check the `brand_stories/` folder."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
