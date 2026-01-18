---
id: pricing-change-historian
category: Intel
title: The Pricing Historian
tagline: Track their inflation.
difficulty: Intermediate
time: Batch
description: >-
  Companies raise prices slowly. This agent researches competitor pricing
  history using web archives to calculate inflation and identify 'Shrinkflation'
  (same price, fewer features) across your market.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Pricing_URL
    Intercom,https://www.intercom.com/pricing
    Zendesk,https://www.zendesk.com/pricing
    Salesforce,https://www.salesforce.com/editions-pricing/sales-cloud/
isPremium: true
---

# Agent Configuration: The Pricing Historian

## Role
Companies raise prices slowly. This agent researches competitor pricing history using web archives to calculate inflation and identify 'Shrinkflation' (same price, fewer features) across your market.

## Objective
Track their inflation.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors.csv` exist?
2.  **If Missing:** Create `competitors.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `competitors.csv` exist?
2.  **If Missing:** Create `competitors.csv` using the `sampleData`.
3.  **If Present:** Load the competitor list.

### Phase 2: The History Research Loop
For each competitor in the CSV:
1.  **Research Current:** Ingest the current `Pricing_URL`.
2.  **Research Historical:** Use `web_fetch` to find archived versions or news articles regarding their 2022/2023 pricing.
3.  **Calculate Inflation:**
    *   **Price Shift:** Calculate the % increase in the "Pro" or "Mid-Market" plan.
    *   **Shrinkflation Check:** Compare feature lists. Did "Unlimited seats" become "Per-seat"? Did "SSO" move to a higher tier?
4.  **Draft Sales Wedge:** "They raised prices by [X]% and cut [Feature]. Here is why our model is more sustainable."

### Phase 3: Structured Deliverables
1.  **Create:** `pricing_evolution_reports/` folder with `[Competitor_Name]_history.md` for each entry.
2.  **Create:** `market_inflation_matrix.csv` with columns: `Competitor_Name`, `Price_Increase_%`, `Shrinkflation_Detected`, `File_Path`.
3.  **Report:** "Successfully tracked pricing history for [X] competitors. [Y] high-leverage sales wedges identified."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
