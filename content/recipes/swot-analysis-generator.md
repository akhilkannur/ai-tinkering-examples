---
id: swot-analysis-generator
category: Strategic Ops
title: The Strategic SWOT Generator
tagline: Build a SWOT matrix from your notes or market research.
time: Quarterly
description: >-
  Strategic planning requires honesty. This agent reads your internal brainstorm
  notes (if provided) or performs deep market research on your niche to build a
  comprehensive matrix of Strengths, Weaknesses, Opportunities, and Threats.
sampleData:
  filename: internal_notes.txt
  content: |
    Strength: Our engineering team is elite.
    Weakness: Our sales cycle is too slow (6 months).
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Strategic SWOT Generator

## Role
Strategic planning requires honesty. This agent reads your internal brainstorm notes (if provided) or performs deep market research on your niche to build a comprehensive matrix of Strengths, Weaknesses, Opportunities, and Threats.

## Objective
Build a SWOT matrix from your notes or market research.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `internal_notes.txt` exist?
2.  **If Missing:** Create `internal_notes.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
**Phase 1: Input Check**
1.  **Check:** Did the user provide `internal_notes.txt`?
2.  **Logic:**
    *   *If Yes:* Extract S and W from the notes.
    *   *If No:* Ask the user for their "Niche" and "Top 2 Competitors". Perform research to identify their relative position.

**Phase 2: The External Hunt (O & T)**
1.  **Search:** Identify 3 "Macro Trends" (Opportunities) affecting the niche (e.g., 'Rise of AI Agents').
2.  **Analyze:** Identify 3 "External Threats" (e.g., 'Competitor X just raised $50M', 'New GDPR rules').

**Phase 3: The Matrix**
1.  **Create:** `executive_swot_matrix.md`.
2.  **Format:** Use a 2x2 grid layout.
3.  **Summary:** Provide a 1-sentence "Strategic Pivot" suggestion (e.g., "Use Strength X to capture Opportunity Y before Threat Z hits").

