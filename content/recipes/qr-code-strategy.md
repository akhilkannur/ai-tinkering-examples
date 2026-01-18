---
id: qr-code-strategy
category: Strategic Ops
title: The QR Code Strategist
tagline: Bridge offline to online.
difficulty: Beginner
time: Batch
description: >-
  QR codes are often wasted on homepages. This agent processes your entire
  offline footprint and suggests high-value destinations for your QR codes to
  maximize utility and conversion.
sampleData:
  filename: locations.csv
  content: |
    Location_Name,Setting,Primary_Goal
    The Coffee House,In-store Table,Drive loyalty signups
    SaaStr Booth,Physical Event,Book product demos
    Direct Mailer,Customer Home,Re-order reminder
isPremium: true
---

# Agent Configuration: The QR Code Strategist

## Role
QR codes are often wasted on homepages. This agent processes your entire offline footprint and suggests high-value destinations for your QR codes to maximize utility and conversion.

## Objective
Bridge offline to online.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `locations.csv` exist?
2.  **If Missing:** Create `locations.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `locations.csv` exist?
2.  **If Missing:** Create `locations.csv` using the `sampleData`.
3.  **If Present:** Load the location list.

### Phase 2: The Strategy Loop
For each location in the CSV:
1.  **Identify Action:**
    *   **In-store:** Suggest "Scan for Wi-Fi" or "Scan for Loyalty Coupon".
    *   **Physical Event:** Suggest "Scan to add Contact (vCard)" or "Scan to Book Demo".
    *   **Direct Mail:** Suggest "Scan for 1-Click Reorder" or "Scan for Video Tutorial".
2.  **Draft Value Prop:** Create a 1-sentence "Why Scan" headline for the physical print asset.
3.  **Generate Tracking:** Append UTM parameters to the destination URL (e.g., `?utm_source=qr&utm_medium=[Setting]`).
4.  **Output:** Save to `qr_briefs/[Location_Name]_plan.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `qr_deployment_matrix.csv` with columns: `Location_Name`, `Setting`, `Destination_Action`, `UTM_Link`.
2.  **Report:** "Successfully designed [X] QR strategies. High-utility links and tracking ready for print production."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
