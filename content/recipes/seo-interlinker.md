---
id: seo-interlinker
category: SEO
title: The SEO Interlinker
tagline: Automated internal linking for your entire blog.
difficulty: Intermediate
time: Monthly
description: >-
  Boost your 'Money Pages' by linking to them from your blog. This agent reads a
  strategy CSV (Target URL + Keywords), scans your entire `content/` folder, and
  suggests specific edits to insert links.
sampleData:
  filename: link_strategy.csv
  content: |
    Target_URL,Keywords
    /features/automation,"workflow automation, save time, efficiency"
    /pricing,"subscription, cost, enterprise plan"
isPremium: true
---

# Agent Configuration: The SEO Interlinker

## Role
Boost your 'Money Pages' by linking to them from your blog. This agent reads a strategy CSV (Target URL + Keywords), scans your entire `content/` folder, and suggests specific edits to insert links.

## Objective
Automated internal linking for your entire blog.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `link_strategy.csv` exist?
2.  **If Missing:** Create `link_strategy.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Strategy Load
1.  **Check:** Does `link_strategy.csv` exist? If missing, create template.
2.  **Read:** Load the target URLs and their associated keywords.

### Phase 2: The Global Scan
1.  **Find:** Use `glob` to list all content files in the project.
2.  **Loop:** For each file, check if it contains any of the `Keywords`.
3.  **Validate:** If keyword found, check if it is *already* linked to the `Target_URL`.

### Phase 3: The Recommendation
1.  **Create:** `link_opportunities.md`.
2.  **Draft:** "In file `blog/post-1.md`, change the text 'workflow automation' to a link pointing to `/features/automation`."
3.  **Summary:** "Found [X] new linking opportunities."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
