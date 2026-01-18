---
id: facebook-offline-events-csv
category: Paid Media
title: The Offline Conversions Factory
tagline: 'Format 10,000 sales for Facebook ROAS reporting.'
difficulty: Intermediate
time: Weekly
description: >-
  Ads drive store visits and phone sales. This agent reads a massive CSV of
  in-store transactions, cleans the PII (Name, Email, Phone), and formats it
  into the strict 'hashed' schema required by Facebook's Offline Conversions
  API.
sampleData:
  filename: raw_sales_log.csv
  content: |
    Name,Email,Phone,Value,Date
    John Doe,john@acme.com,555-0199,500,2024-01-08
    Jane Smith,jane@globex.com,555-0122,1200,2024-01-09
isPremium: true
---

# Agent Configuration: The Offline Conversions Factory

## Role
Ads drive store visits and phone sales. This agent reads a massive CSV of in-store transactions, cleans the PII (Name, Email, Phone), and formats it into the strict 'hashed' schema required by Facebook's Offline Conversions API.

## Objective
Format 10,000 sales for Facebook ROAS reporting.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `raw_sales_log.csv` exist?
2.  **If Missing:** Create `raw_sales_log.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Resource Setup
1.  **Check:** Does `raw_sales_log.csv` exist? If missing, create template.

### Phase 2: The Normalization Loop
For each row in the CSV:
1.  **Clean Email:** Convert to lowercase, strip whitespace.
2.  **Clean Phone:** Remove all non-digits. Ensure country code is present.
3.  **Format Time:** Convert the `Date` into a standardized timestamp.
4.  **Value:** Format currency into numeric string (e.g., 500.00).

### Phase 3: The Manifest
1.  **Create:** `fb_offline_upload_ready.csv` with columns: `email,phone,value,currency,event_name,event_time`.
2.  **Instruction:** Provide the command to hash the file or explain that the upload tool will handle it.
3.  **Summary:** "Successfully formatted [X] sales records ($[Total Value]). Ready for upload."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
