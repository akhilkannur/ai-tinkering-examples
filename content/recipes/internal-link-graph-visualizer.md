---
id: internal-link-graph-visualizer
category: SEO
title: The Link Graph Architect
tagline: Visualize your site structure.
time: Batch
description: >-
  Orphaned pages don't rank. This agent processes complex internal link data and
  generates Mermaid.js diagram code to visualize your site's architecture and
  identify silos.
sampleData:
  filename: site_links.csv
  content: |
    Source_Page,Target_Page,Link_Type
    /home,/pricing,Primary Nav
    /home,/about,Primary Nav
    /blog/post-1,/pricing,Contextual
    /blog/post-1,/home,Breadcrumb
    /services,/contact,CTA
isPremium: true
inputs:
  - Target URL
outputs:
  - SEO Audit / Fixes
---

# Agent Configuration: The Link Graph Architect

## Role
Orphaned pages don't rank. This agent processes complex internal link data and generates Mermaid.js diagram code to visualize your site's architecture and identify silos.

## Objective
Visualize your site structure.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `site_links.csv` exist?
2.  **If Missing:** Create `site_links.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `site_links.csv` using the `sampleData`.
3.  **If Present:** Load the link data.

**Phase 2: The Graph Generation Loop**
1.  **Map Relationships:** Transform each CSV row into a Mermaid relationship string: `[Source_Page] -- "[Link_Type]" --> [Target_Page]`.
2.  **Style Nodes:** Assign specific colors/shapes to nodes based on `Link_Type` (e.g., CTAs in red, Nav in blue).
3.  **Optimize Layout:** Choose the best orientation (`TD` for Top-Down or `LR` for Left-Right) based on the number of links.

**Phase 3: Structured Deliverables**
1.  **Create:** `site_structure_viz.md` containing the full Mermaid.js code block, ready for preview in Obsidian, GitHub, or Mermaid Live Editor.
2.  **Report:** "Successfully visualized [X] link relationships. [Y] potential orphaned pages detected."

