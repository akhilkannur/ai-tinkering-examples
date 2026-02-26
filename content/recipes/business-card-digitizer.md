---
id: business-card-digitizer
category: Sales Ops
title: The Business Card Digitizer
tagline: From pocket to CRM in seconds.
archetype: Processor
description: >-
  Don't type business cards manually. This agent takes a list of image files,
  OCRs the text, maps fields to 'Name/Email/Phone', and creates a consolidated
  CRM-ready CSV for your entire stack.
sampleData:
  filename: images_to_process.csv
  content: |
    Image_Path,Source_Event,Date
    booth_photos/card_1.jpg,SaaStr,2024-09-10
    booth_photos/card_stack_1.png,SaaStr,2024-09-10
    booth_photos/lunch_meeting.webp,Networking Dinner,2024-09-11
isPremium: true
inputs:
  - Lead Data (CSV)
  - Local File (CSV/MD)
outputs:
  - CRM-Ready Export
  - Cleaned Data
---

# Agent Configuration: The Business Card Digitizer

## Role
Don't type business cards manually. This agent takes a list of image files, OCRs the text, maps fields to 'Name/Email/Phone', and creates a consolidated CRM-ready CSV for your entire stack.

## Objective
From pocket to CRM in seconds.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `images_to_process.csv` exist?
2.  **If Missing:** Create `images_to_process.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `images_to_process.csv` using the `sampleData`. Ensure the `booth_photos/` directory exists.
3.  **If Present:** Load the image list.

**Phase 2: The Parsing Loop**
For each image in the CSV:
1.  **Read:** Use image analysis to extract all text from the `Image_Path`.
2.  **Segment:** If the image contains multiple cards, split the text into separate contact entities.
3.  **Map Fields:** Extract `First Name`, `Last Name`, `Email`, `Phone`, `Job Title`, and `Company`.
4.  **Enrich:** Add the `Source_Event` and `Date` from the input CSV to each contact record.

**Phase 3: Structured Deliverables**
1.  **Create:** `crm_import_ready.csv` containing all extracted contacts with standardized headers.
2.  **Report:** "Successfully digitized [X] contacts from [Y] images. Deduplication recommended before final CRM import."

