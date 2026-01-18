---
id: event-sponsorship-roi-calculator
category: Marketing
title: Booth ROI Estimator
tagline: Should you sponsor that conference? Do the math first.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Calculates the "Break-Even Point" for a trade show sponsorship based on ticket cost, booth cost, expected foot traffic, and your average deal size.
sampleData:
  filename: event_costs.csv
  content: |
    Event_Name,Sponsorship_Cost,Travel_Cost,Attendees,Avg_Deal_Size
    SaaStr Annual,50000,10000,10000,15000
    Local Tech Meetup,500,0,100,5000
---

# What This Does
Marketers love branding, but CFOs love math. This agent predicts exactly how many leads and closed deals you need to generate to justify the expense of a booth, helping you say "No" to bad events.

# What You Need
- `event_costs.csv`: The numbers from the sponsorship deck.

# What You Get
- `roi_projection.md`: A clear "Go/No-Go" recommendation.

# How to Use
1. Plug in the costs.
2. Run the blueprint.
3. Show the math to your boss.

---

# Prompt

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
