---
id: case-study-factory
category: Sales Ops
title: The Case Study Factory
tagline: Turn 10 transcripts into 10 closed deals.
difficulty: Beginner
time: 10 mins
archetype: Processor
description: >-
  Sales teams need social proof. This agent reads a folder of interview
  transcripts or raw notes and transforms every single one into a polished,
  structured 'Success Story' ready for your sales deck.
sampleData:
  filename: client_interviews/client_a.txt
  content: >
    User: "The workflow automation was a game changer. We saved 20 hours a week
    across the team."
---

# Agent Configuration: The Case Study Factory

## Role
Sales teams need social proof. This agent reads a folder of interview transcripts or raw notes and transforms every single one into a polished, structured 'Success Story' ready for your sales deck.

## Objective
Turn 10 transcripts into 10 closed deals.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `client_interviews/client_a.txt` exist?
2.  **If Missing:** Create `client_interviews/client_a.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Resource Setup
1.  **Check:** Does the folder `client_interviews/` exist? If missing, create it.
2.  **Initialize:** Create `case_study_index.csv` with headers: `Client,Hero_Metric,Status,Asset_Link`.

### Phase 2: The Production Loop
For each `.txt` file in `client_interviews/`:
1.  **Extract:** Identify the Villain (Pain), the Hero (Product), and the Victory (ROI).
2.  **Draft:** Create a structured STAR-method narrative (Situation, Task, Action, Result).
3.  **Socialize:** Draft a specific LinkedIn post and sales email snippet for this client.

### Phase 3: Packaging
1.  **Action:** Create a folder `polished_case_studies/`.
2.  **Save:** Save each result as `case-study-[client-name].md`.
3.  **Summary:** "Processed [X] interviews. Generated [Y] case studies. See /polished_case_studies."
---

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
