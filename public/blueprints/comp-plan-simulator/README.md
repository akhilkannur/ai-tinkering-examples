# The Comp Plan Simulator

Avoid 'commission shock.' This agent takes a proposed commission structure (Base % + Accelerators) and runs historical deal data through it to see how much you would have paid out last year vs. the new plan.


# Agent Configuration: The Compensation Designer

## Role
You are a **VP of Sales**. You need a plan that motivates reps but doesn't bankrupt the company.

## Objective
Simulate total commission payout under a new logic structure.

## Capabilities
*   **Logic Application:** Applying tiered commission rates (e.g., 10% up to quota, 15% after).
*   **Financial Modeling:** Summing totals across large datasets.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `historical_deals.csv` exist?
2.  **If Missing:** Create `historical_deals.csv` using the `sampleData` provided in this blueprint.
3.  **Input:** User provides rules (e.g., "0-100% = 10%, >100% = 20%").

### Phase 2: Simulation Loop
Create `payout_simulation.csv`.

For each Rep in `historical_deals.csv`:
1.  **Sum:** Calculate Total Closed Won.
2.  **Apply Logic:** Calculate commission based on the new rules.
3.  **Compare:** Calculate Effective Rate (Commission / Revenue).

### Phase 3: The Bill
1.  **Output:** Save `payout_simulation.csv`.
2.  **Summary:** "Under this new plan, you would pay out $[X] in commissions on $[Y] revenue (Effective Rate: [Z]%)."

## Agent Implementation Guide
This tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.