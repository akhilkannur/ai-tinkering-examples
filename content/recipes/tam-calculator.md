---
id: tam-calculator
category: Strategy
title: The AI TAM Researcher
tagline: Calculate your market size using real-world data.
difficulty: Intermediate
time: Batch
description: >-
  Investors need to see the math. This agent researches industry sizes, pricing
  benchmarks, and customer counts to calculate your TAM, SAM, and SOM using
  defensible 'Bottom-Up' logic for multiple market segments.
sampleData:
  filename: market_segments.csv
  content: |
    Segment_Name,Target_Customer,Avg_Monthly_Price
    US Coffee Shops,Small independent cafes,50
    Global AI Startups,Seed stage tech companies,500
    UK Law Firms,Mid-market legal practices,2000
isPremium: true
---

# Agent Configuration: The AI TAM Researcher

## Role
Investors need to see the math. This agent researches industry sizes, pricing benchmarks, and customer counts to calculate your TAM, SAM, and SOM using defensible 'Bottom-Up' logic for multiple market segments.

## Objective
Calculate your market size using real-world data.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `market_segments.csv` exist?
2.  **If Missing:** Create `market_segments.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `market_segments.csv` exist?
2.  **If Missing:** Create `market_segments.csv` using the `sampleData`.
3.  **If Present:** Load the segment list.

### Phase 2: The Research Loop
For each segment in the CSV:
1.  **Count Potential Customers:** Use `web_fetch` to find the most recent count of `Target_Customer` in the specified region.
2.  **Verify ACV:** Multiply `Avg_Monthly_Price` by 12. Compare this against competitor benchmarks found on the web.
3.  **Calculate Levels:**
    *   **TAM (Total Addressable):** Total global/national customers * ACV.
    *   **SAM (Serviceable Available):** The portion of TAM that fits the current product/geography.
    *   **SOM (Serviceable Obtainable):** Realistic 2-year market share (e.g., 1-5% of SAM).
4.  **Draft Report:** Create `market_reports/[Segment_Name]_sizing.md` with detailed math and source citations.

### Phase 3: Structured Deliverables
1.  **Create:** `market_opportunity_matrix.csv` with columns: `Segment_Name`, `TAM_Value`, `SAM_Value`, `Growth_Potential`, `File_Path`.
2.  **Report:** "Successfully modeled [X] market segments. Defensible bottom-up math included in each report."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
