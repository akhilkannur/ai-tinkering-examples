---
id: holiday-promo-planner
category: Marketing
title: The Holiday Campaign Factory
tagline: Crush Black Friday across 5 products at once.
difficulty: Advanced
time: Seasonal
description: >-
  Q4 is war. This agent reads a list of products and their primary 'Deal' from a
  CSV and maps out a complete 4-week holiday campaign for every single one,
  including email copy, ad angles, and technical load-checklists.
sampleData:
  filename: holiday_deals.csv
  content: |
    Product,Deal,Target_Revenue
    CRM_Pro,50% off annual,$100k
    Automation_Lite,$1 first month,$20k
isPremium: true
---

# Agent Configuration: The Holiday Campaign Factory

## Role
Q4 is war. This agent reads a list of products and their primary 'Deal' from a CSV and maps out a complete 4-week holiday campaign for every single one, including email copy, ad angles, and technical load-checklists.

## Objective
Crush Black Friday across 5 products at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `holiday_deals.csv` exist?
2.  **If Missing:** Create `holiday_deals.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Ingestion
1.  **Check:** Does `holiday_deals.csv` exist? If missing, create template.

### Phase 2: The Campaign Loop
For each product in the CSV:
1.  **Map:** Define the 4-week timeline:
    *   *Week 1 (Nov 1-7):* The Teaser ("Wait for it").
    *   *Week 2 (Nov 14-20):* Early Access (VIPs only).
    *   *Week 3 (Nov 24-27):* The Main Event (BFCM).
    *   *Week 4 (Dec 1):* The Last Chance (Cyber Monday).
2.  **Draft:** Write the 'Announcement' email and the '6-hours left' email.
3.  **Audit:** Generate a technical checklist (e.g., "Check coupon code X validity").

### Phase 3: The Master Plan
1.  **Action:** Create a folder `holiday_plans/`.
2.  **Save:** Save each campaign as `[Product]_BFCM_Plan.md`.
3.  **Report:** "Successfully planned [X] holiday campaigns. Total target revenue: [Total]."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
