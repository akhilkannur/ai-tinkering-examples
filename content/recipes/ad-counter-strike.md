---
id: ad-counter-strike
category: Competitor Intel
title: The Ad Counter-Strike Factory
tagline: Steal traffic from 10 competitors at once.
difficulty: Advanced
time: 25 mins
description: >-
  Why attack one competitor? This agent reads a list of competitor landing pages
  from a CSV, identifies their core hooks, and generates a 'Counter-Ad' (Copy +
  Visual) for every single one to help you win their customers.
sampleData:
  filename: competitors_to_attack.csv
  content: |
    Name,URL,Main_Claim
    Competitor_A,https://competitor-a.com,Fastest setup
    Competitor_B,https://competitor-b.com,Cheapest price
---

# Agent Configuration: The Ad Counter-Strike Factory

## Role
Why attack one competitor? This agent reads a list of competitor landing pages from a CSV, identifies their core hooks, and generates a 'Counter-Ad' (Copy + Visual) for every single one to help you win their customers.

## Objective
Steal traffic from 10 competitors at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors_to_attack.csv` exist?
2.  **If Missing:** Create `competitors_to_attack.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Preparation
1.  **Check:** Does `competitors_to_attack.csv` exist? If missing, create it.

### Phase 2: The Strike Loop
For each competitor in the CSV:
1.  **Analyze:** Use 
web_fetch
 to read their current claims.
2.  **Draft:** Write a LinkedIn/FB Ad script (Primary Text + Headline) using the "Us vs Them" frame.
3.  **Visualize:** Design and generate a "Split Screen" comparison image representing the *old way* (dark/chaotic) vs the *new way* (bright/simple).

### Phase 3: Battlefield Deployment
1.  **Action:** Create a folder `counter_ads/`.
2.  **Save:** Save each campaign as `strike-[competitor].md`.
3.  **Report:** "Generated [X] conquesting ad campaigns. master_attack_plan.csv updated."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
