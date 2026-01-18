---
id: white-label-dashboard-setup
category: Agency
title: The White Label Dashboard Setup
tagline: Standardize your client reporting.
difficulty: Beginner
time: Batch
description: >-
  Agencies need to look professional and automate transparency. This agent
  designs standardized client-facing portals for your entire roster, ensuring
  clients can see their live stats without manual reporting.
sampleData:
  filename: clients.csv
  content: |
    Client_Name,Primary_Goal,Data_Source
    Glow Skincare,Direct Sales,Shopify & Meta Ads
    TechFlow SaaS,Demo Bookings,HubSpot & Google Ads
    Urban Coffee,In-store Traffic,Google Maps & Square
isPremium: true
---

# Agent Configuration: The White Label Dashboard Setup

## Role
Agencies need to look professional and automate transparency. This agent designs standardized client-facing portals for your entire roster, ensuring clients can see their live stats without manual reporting.

## Objective
Standardize your client reporting.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `clients.csv` exist?
2.  **If Missing:** Create `clients.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `clients.csv` exist?
2.  **If Missing:** Create `clients.csv` using the `sampleData`.
3.  **If Present:** Load the client list.

### Phase 2: The Setup Loop
For each client in the CSV:
1.  **Define Scorecards:** Select 3 high-impact metrics (e.g., "ROAS", "CPA", "Net New Revenue").
2.  **Plan the Layout:**
    *   **Header:** Branded client logo and date range toggle.
    *   **The Big Three:** Scorecard row for the primary metrics.
    *   **The Trend:** 30-day performance graph.
    *   **The Detail:** Raw data table for transparency.
3.  **Map Data Sources:** List the specific integrations required (e.g., "Connect [Data_Source] via Zapier or Fivetran").
4.  **Output:** Save to `dashboard_specs/[Client_Name]_config.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `reporting_operations_summary.csv` with columns: `Client_Name`, `Primary_KPI`, `Source_Integration`, `File_Path`.
2.  **Report:** "Successfully architected [X] white-label dashboards. Technical specs and layout briefs are ready for your systems team."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
