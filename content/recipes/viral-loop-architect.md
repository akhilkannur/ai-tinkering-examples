---
id: viral-loop-architect
category: CRO
title: The Growth Loop Architect
tagline: Design referral engines for every user segment.
difficulty: Advanced
time: 30 mins
isPremium: true
description: >-
  A single referral program isn't enough. This agent reads a list of user
  segments from a CSV and designs a specialized 'Viral Loop' for each, including
  custom flow diagrams and incentive math.
sampleData:
  filename: user_segments.csv
  content: |
    Segment,Usage_Context,Value_Unit
    Power Users,Bulk exporting,Credits
    Managers,Team reporting,Seats
    Creators,Publishing,Reach
---

# Agent Configuration: The Growth Loop Architect

## Role
A single referral program isn't enough. This agent reads a list of user segments from a CSV and designs a specialized 'Viral Loop' for each, including custom flow diagrams and incentive math.

## Objective
Design referral engines for every user segment.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `user_segments.csv` exist?
2.  **If Missing:** Create `user_segments.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Architect Loop**
For each segment in the CSV:
1.  **Strategy:** Define the double-sided reward logic (e.g., "Give a Seat, Get a Seat").
2.  **Visualize:** Generate a sequence diagram of the user journey from Invitation to Reward.
3.  **Draft:** Write the invite email copy specifically for that segment's context.

**Phase 3: Deliverable**
1.  **Action:** Create a folder `growth_loops/`.
2.  **Save:** Save each spec as `loop-[segment].md`.
3.  **Report:** "Successfully architected [X] growth loops. Ready for technical implementation."

