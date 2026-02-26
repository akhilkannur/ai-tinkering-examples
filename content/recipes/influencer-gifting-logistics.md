---
id: influencer-gifting-logistics
category: E-commerce
title: The Gifting Fulfillment Engine
tagline: Ship product to 100 creators without errors.
description: >-
  Manual gifting is slow and error-prone. This agent reads a list of influencer
  addresses and their chosen product variant from a CSV, cleans the data for
  shipping labels, and drafts the personalized tracking emails.
sampleData:
  filename: gifting_list.csv
  content: |
    Name,Address,City,SKU,IG_Handle
    Sarah Jones,123 Main St Apt 4,Austin,BOOTS-BRN,@sarah_walks
    Mike Chen,456 Oak Rd,Seattle,TENT-UL,@mike_outdoors
isPremium: true
inputs:
  - Product Data
outputs:
  - Shopify-Ready Update
---

# Agent Configuration: The Gifting Fulfillment Engine

## Role
Manual gifting is slow and error-prone. This agent reads a list of influencer addresses and their chosen product variant from a CSV, cleans the data for shipping labels, and drafts the personalized tracking emails.

## Objective
Ship product to 100 creators without errors.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `gifting_list.csv` exist?
2.  **If Missing:** Create `gifting_list.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Logistics Loop**
For each row in the CSV:
1.  **Verify:** Check if the SKU is in stock (if provided) and format the address for a shipping label.
2.  **Personalize:** Write a 2-sentence note for the box insert referencing their `@IG_Handle`.
3.  **Draft:** Create the "Your package is on the way" email with a placeholder for the tracking link.

**Phase 3: The Manifest**
1.  **Create:** `shipping_manifest_ready.csv` formatted for UPS/FedEx upload.
2.  **Save:** Create a file `box_insert_notes.md` with all personalized notes.
3.  **Summary:** "Processed [X] packages. Manifest is ready for export."

