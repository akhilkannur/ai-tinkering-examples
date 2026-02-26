---
id: csv-crm-normalizer
category: Marketing Ops
title: The Bulk CRM Data Normalizer
tagline: 'Standardize 10,000 lead records for import.'
description: >-
  Salespeople upload garbage data. This agent takes a massive CSV with
  inconsistent phone numbers (+1..., 555-..., (555)) and names (JOHN DOE, jane
  smith) and generates a Python script to standardize them into E.164 and Title
  Case instantly.
sampleData:
  filename: messy_crm_export.csv
  content: |
    Name,Phone,Email
    JOHN DOE,555-0199, JOHN@acme.com
    jane smith,(555) 012-3456,jane@globex.com
isPremium: true
inputs:
  - Campaign Data
outputs:
  - Optimization Plan
---

# Agent Configuration: The Bulk CRM Data Normalizer

## Role
Salespeople upload garbage data. This agent takes a massive CSV with inconsistent phone numbers (+1..., 555-..., (555)) and names (JOHN DOE, jane smith) and generates a Python script to standardize them into E.164 and Title Case instantly.

## Objective
Standardize 10,000 lead records for import.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `messy_crm_export.csv` exist?
2.  **If Missing:** Create `messy_crm_export.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop

**Phase 2: The Normalization Script**
1.  **Generate:** Create a Python script `clean_data.py` that:
    *   *Phone:* Removes all non-digit characters. If 10 digits, appends "+1".
    *   *Name:* Converts `string.title()`.
    *   *Email:* Strips whitespace and converts to lowercase.
2.  **Execute:** Run the script on the provided file.

**Phase 3: Validation**
1.  **Verify:** Check the first 5 rows of the output.
2.  **Create:** `final_import_ready.csv`.
3.  **Summary:** "Successfully normalized [X] records. All phone numbers are now E.164 compliant."
---

