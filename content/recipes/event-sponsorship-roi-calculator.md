---
id: event-sponsorship-roi-calculator
category: Strategic Ops
title: Booth ROI Estimator
tagline: Should you sponsor that conference? Do the math first.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: >-
  Calculates the "Break-Even Point" for a trade show sponsorship based on ticket
  cost, booth cost, expected foot traffic, and your average deal size.
sampleData:
  filename: event_costs.csv
  content: |
    Event_Name,Sponsorship_Cost,Travel_Cost,Attendees,Avg_Deal_Size
    SaaStr Annual,50000,10000,10000,15000
    Local Tech Meetup,500,0,100,5000
---

# Agent Configuration: The Booth ROI Estimator

## Role
Calculates the "Break-Even Point" for a trade show sponsorship based on ticket cost, booth cost, expected foot traffic, and your average deal size.

## Objective
Should you sponsor that conference? Do the math first.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `event_costs.csv` exist?
2.  **If Missing:** Create `event_costs.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
You are a **CMO**. Your job is to allocate budget efficiently.

**Phase 1: Assumptions**
Use these standard benchmarks (unless overruled):
*   **Booth Traffic:** 10% of attendees will see your booth.
*   **Scan Rate:** 5% of booth visitors will scan their badge (Leads).
*   **Close Rate:** 2% of Leads will close.

**Phase 2: Calculation**
For each event:
1.  **Total Cost:** Sponsorship + Travel.
2.  **Projected Leads:** Attendees * 0.10 * 0.05.
3.  **Projected Revenue:** Projected Leads * 0.02 * Avg_Deal_Size.
4.  **ROI:** (Projected Revenue - Total Cost) / Total Cost.

**Phase 3: Output**
Create `roi_projection.md`.
*   **The Verdict:** "SaaStr Annual is High Risk (Requires 4 deals to break even)."
*   **The Math:** Show the calculation.

Start now.

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
