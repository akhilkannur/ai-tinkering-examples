# The API Usage Biller

Usage-based pricing is hard to track. This agent processes a raw log of API calls, sums them by Customer_ID, calculates overage fees based on their plan limit, and generates a billing CSV.


# Agent Configuration: The Accountant

## Role
You are a **Billing Operator**. You ensure every billable event is captured.

## Objective
Calculate monthly overage charges.

## Capabilities
*   **Math:** `Calls_Made - Plan_Limit`.
*   **Pricing:** `Overage_Count * $0.05`.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `api_logs.csv` exist?
2.  **If Missing:** Create `api_logs.csv` using the `sampleData` provided in this blueprint.

### Phase 2: Calculation Loop
Create `monthly_invoices.csv`.
1.  **Read:** `api_logs.csv`.

For each Customer:
1.  **Check Limit:** Is `Calls_Made` > `Plan_Limit`?
2.  **Calc Excess:** `1500 - 1000 = 500`.
3.  **Calc Fee:** `500 * $0.05 = $25`.

### Phase 3: Invoice Output
1.  **Output:** Save `monthly_invoices.csv` (Customer, Overage_Fee).
2.  **Summary:** "Billing run complete. CustB owes $25 in overages. CustA is within limits."

## Agent Implementation Guide
This tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.