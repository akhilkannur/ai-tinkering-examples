---
id: saas-pricing-calculator
category: SaaS
title: The SaaS Pricing Calculator
tagline: Stop undercharging.
difficulty: Intermediate
time: Batch
description: >-
  Pricing is a science. This agent models your COGS and CAC to recommend
  profitable pricing tiers for an entire portfolio of SaaS products.
sampleData:
  filename: product_costs.csv
  content: |
    Product_Name,Server_Cost_Per_User,Support_Cost_Per_User,Target_Margin_%
    NeoCloud,2.50,1.00,85
    VelvetFlow,0.50,0.25,90
    DataArmor,5.00,2.00,80
isPremium: true
---

# Agent Configuration: The SaaS Pricing Calculator

## Role
Pricing is a science. This agent models your COGS and CAC to recommend profitable pricing tiers for an entire portfolio of SaaS products.

## Objective
Stop undercharging.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `product_costs.csv` exist?
2.  **If Missing:** Create `product_costs.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `product_costs.csv` exist?
2.  **If Missing:** Create `product_costs.csv` using the `sampleData`.
3.  **If Present:** Load the cost data.

### Phase 2: The Pricing Loop
For each product in the CSV:
1.  **Calculate Base Cost:** `Total_COGS = Server_Cost + Support_Cost`.
2.  **Model 3 Tiers:**
    *   **Starter (Acquisition):** Priced at 2x COGS or a low-friction entry point (e.g., $19-$29).
    *   **Pro (The Profit Engine):** Priced to hit the `Target_Margin_%` (e.g., $49-$99).
    *   **Enterprise (The Scale):** Priced at 10x-20x COGS with custom support gating.
3.  **Apply Charm:** Round prices to the nearest "9" or "5" (e.g., $49.99).
4.  **Draft Output:** Create `pricing_plans/[Product_Name]_tiers.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `pricing_model_summary.csv` with columns: `Product_Name`, `Starter_Price`, `Pro_Price`, `Enterprise_Price`, `Projected_Margin`.
2.  **Report:** "Successfully modeled pricing for [X] products. Profit engines optimized for [Target_Margin_%] gross margins."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
