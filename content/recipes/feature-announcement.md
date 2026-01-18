---
id: feature-announcement
category: Strategic Ops
title: The Product Marketing Engine
tagline: Turn technical updates into sales momentum.
difficulty: Beginner
time: 20 mins
description: >-
  Don't just ship code; ship value. This agent reads a list of technical updates
  from a CSV and generates a complete marketing bundle (Email, Tweet, Changelog)
  for every feature.
sampleData:
  filename: technical_updates.csv
  content: |
    Feature_Name,Technical_Details,Release_Date
    Smart Filter,Added regex support to lead table,2024-01-10
    Zapier v2,Added 5 new actions for CRM,2024-01-12
isPremium: true
---

# Agent Configuration: The Product Marketing Engine

## Role
Don't just ship code; ship value. This agent reads a list of technical updates from a CSV and generates a complete marketing bundle (Email, Tweet, Changelog) for every feature.

## Objective
Turn technical updates into sales momentum.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `technical_updates.csv` exist?
2.  **If Missing:** Create `technical_updates.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `technical_updates.csv` exist? If missing, create template.

### Phase 2: The Translation Loop
For each feature in the CSV:
1.  **Extract:** What is the *benefit* to the user? (Save time? Save money? Peace of mind?).
2.  **Draft Bundle:**
    *   *The Email:* High-excitement announcement.
    *   *The Tweet:* Visual teaser with emojis.
    *   *The Slack:* Short 'Internal' briefing for the sales team.

### Phase 3: Deliverable
1.  **Action:** Create a folder `feature_launches/`.
2.  **Save:** Save each bundle as `launch-[feature-name].md`.
3.  **Report:** "Successfully marketed [X] features. Ready to ship."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
