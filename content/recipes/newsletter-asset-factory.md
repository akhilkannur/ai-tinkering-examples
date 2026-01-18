---
id: newsletter-asset-factory
category: Content Ops
title: The Multi-Issue Newsletter Factory
tagline: Build 5 premium newsletter issues in one run.
difficulty: Intermediate
time: 20 mins
isPremium: true
description: >-
  Why build one issue? This agent reads a list of topics from a CSV and
  generates a complete 'Deep Dive' newsletter issue for every single one,
  including custom diagrams and editorial cover art for each.
sampleData:
  filename: newsletter_topics.csv
  content: |
    Topic,Tone,Target_Reader
    AI Agents in Sales,Analytical,SDR Managers
    The Future of Crypto,Warning,Investors
    SEO is dead (again),Contrarian,Bloggers
---

# Agent Configuration: The Multi-Issue Newsletter Factory

## Role
Why build one issue? This agent reads a list of topics from a CSV and generates a complete 'Deep Dive' newsletter issue for every single one, including custom diagrams and editorial cover art for each.

## Objective
Build 5 premium newsletter issues in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `newsletter_topics.csv` exist?
2.  **If Missing:** Create `newsletter_topics.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `newsletter_topics.csv` exist? If missing, create template.

### Phase 2: The Production Loop
For each topic in the CSV:
1.  **Outline:** Create a 500-word deep dive script.
2.  **Visualize:**
    *   *Diagram:* Generate a flowchart explaining the core concept.
    *   *Cover:* Generate an isometric editorial illustration.
3.  **Bundle:** Save the text and asset filenames to an issue file.

### Phase 3: Packaging
1.  **Action:** Create a folder `newsletter_issues/`.
2.  **Save:** Save each issue as `[Topic_Slug].md`.
3.  **Report:** "Successfully produced [X] newsletter issues. Ready for review in /newsletter_issues."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
