---
id: sales-quota-calculator
category: Sales Ops
title: Quota Math Calculator
tagline: Work backwards from your revenue goal to daily activity targets.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Takes your monthly quota and conversion rates (Cold Call -> Meeting -> Close), and calculates exactly how many dials or emails you need to do *today* to hit your number.
sampleData:
  filename: my_stats.csv
  content: |
    Quota,Average_Deal_Size,Close_Rate,Meeting_Book_Rate
    50000,10000,0.20,0.05
---

# What This Does
Sales is a math problem. If you need \$50k and your average deal is \$10k, you need 5 deals. If you close 20% of meetings, you need 25 meetings. This agent does the math and gives you a "Daily Scorecard".

# What You Need
- `my_stats.csv`: Your historical performance numbers.

# What You Get
- `daily_activity_plan.md`: Your marching orders.

# How to Use
1. Input your stats.
2. Run the blueprint.
3. Stick to the plan.

---

# Prompt

You are a **Sales Manager**. Your job is to set activity targets.

**Phase 1: The Math**
1. Read `my_stats.csv`.
2. **Deals Needed:** `Quota` / `Average_Deal_Size` (e.g., 5).
3. **Meetings Needed:** `Deals Needed` / `Close_Rate` (e.g., 25).
4. **Outreach Needed:** `Meetings Needed` / `Meeting_Book_Rate` (e.g., 500).
5. **Daily Target:** `Outreach Needed` / 20 (working days in a month).

**Phase 2: The Plan**
Create `daily_activity_plan.md`:
*   **The Goal:** "To hit \$[Quota], you need [Deals] deals."
*   **The Funnel:** "You need [Meetings] meetings this month."
*   **The Grind:** "You must make **[Daily Target]** attempts per day."

**Phase 3: Motivation**
Add a "Slump Breaker" tip: "If you are behind, focus on [Meeting_Book_Rate]—improving your pitch is faster than making more calls."

Start now.
