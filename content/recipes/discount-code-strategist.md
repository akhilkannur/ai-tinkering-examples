---
id: discount-code-strategist
category: Strategic Ops
title: The Annual Promo Strategist
tagline: 'Your entire year of sales, without brand damage.'
time: Seasonal
description: >-
  Don't slash prices; drive value. This agent reads your annual holiday list
  from a CSV and designs a 'Smart Promo' strategy for every event, ensuring you
  maximize revenue while protecting your margins.
sampleData:
  filename: holiday_calendar.csv
  content: |
    Event,Month,Goal
    Black Friday,November,Maximum volume
    New Year,January,Annual retention
    Summer Sale,July,Move old inventory
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Annual Promo Strategist

## Role
Don't slash prices; drive value. This agent reads your annual holiday list from a CSV and designs a 'Smart Promo' strategy for every event, ensuring you maximize revenue while protecting your margins.

## Objective
Your entire year of sales, without brand damage.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `holiday_calendar.csv` exist?
2.  **If Missing:** Create `holiday_calendar.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Strategy Loop**
For each event in the CSV:
1.  **Design:** Choose the best mechanism based on the `Goal`.
    *   *Volume:* "Buy 2, Get 1."
    *   *Retention:* "Upgrade to Annual for 20% off."
    *   *Clearance:* "Mystery Bundle."
2.  **Naming:** Generate a unique, brand-aligned discount code.
3.  **Scarcity:** Define the urgency logic (e.g., "Only 100 uses available").

**Phase 3: The Master Plan**
1.  **Create:** `annual_promo_plan.md`.
2.  **Summarize:** Create a table listing the Event, Code, Offer, and "The Script" for the email teaser.
3.  **Report:** "Successfully planned [X] promotions for the year."
---

