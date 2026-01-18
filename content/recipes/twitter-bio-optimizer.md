---
id: twitter-bio-optimizer
category: Strategic Ops
title: The Twitter Bio Optimizer
tagline: Get followed at a glance.
difficulty: Beginner
time: Batch
description: >-
  Your bio is your personal landing page. This agent rewrites your Twitter bios
  to include the 'Who', 'What', and 'Proof' elements, ensuring new visitors hit
  the 'Follow' button for your entire team or portfolio of accounts.
sampleData:
  filename: profiles.csv
  content: |
    Name,Role,Company,Achievement,Topic
    Alex Rivera,SDR Lead,TechFlow,Scaled to $1M ARR,Sales Automation
    Sarah Chen,Head of Design,Glow,Ex-Airbnb,UX for SaaS
    Mike Ross,SEO Lead,GrowthLabs,Ranked #1 for 'AI Tools',Search Strategy
isPremium: true
---

# Agent Configuration: The Twitter Bio Optimizer

## Role
Your bio is your personal landing page. This agent rewrites your Twitter bios to include the 'Who', 'What', and 'Proof' elements, ensuring new visitors hit the 'Follow' button for your entire team or portfolio of accounts.

## Objective
Get followed at a glance.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `profiles.csv` exist?
2.  **If Missing:** Create `profiles.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `profiles.csv` exist?
2.  **If Missing:** Create `profiles.csv` using the `sampleData`.
3.  **If Present:** Load the profile list.

### Phase 2: The Optimization Loop
For each profile in the CSV:
1.  **Draft 3 Variations:**
    *   **The Authority:** "[Role] @[Company]. [Achievement]. Sharing insights on [Topic]."
    *   **The Outcome-Led:** "Helping you [Result from Topic]. [Role] @[Company]. [Achievement]."
    *   **The Minimalist:** "[Topic] | [Role] @[Company] | [Achievement]."
2.  **Character Audit:** Ensure all variations are < 160 characters.
3.  **Emoji Placement:** Add 1-2 relevant emojis to break up text and add visual interest.

### Phase 3: Structured Deliverables
1.  **Create:** `twitter_bio_matrix.csv` with columns: `Name`, `Primary_Bio`, `Minimalist_Bio`, `Character_Count`.
2.  **Report:** "Successfully optimized [X] bios. Authority-driven profiles ready for profile updates."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
