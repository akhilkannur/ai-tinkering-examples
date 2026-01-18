---
id: lookalike-audience-seeder
category: Paid Media
title: The LAL Seeder Factory
tagline: 'Standardize 10,000 customers for ''Custom Audience'' upload.'
difficulty: Intermediate
time: Monthly
description: >-
  High-quality lookalikes need high-quality seeds. This agent reads your massive
  customer database, filters for the 'Top 10%' by LTV or Frequency, and formats
  the PII for secure upload to Facebook or LinkedIn.
sampleData:
  filename: customer_db.csv
  content: |
    Name,Email,Lifetime_Value,Purchase_Count
    John Doe,john@acme.com,5000,12
    Jane Smith,jane@globex.com,1200,3
isPremium: true
---

# Agent Configuration: The LAL Seeder Factory

## Role
High-quality lookalikes need high-quality seeds. This agent reads your massive customer database, filters for the 'Top 10%' by LTV or Frequency, and formats the PII for secure upload to Facebook or LinkedIn.

## Objective
Standardize 10,000 customers for 'Custom Audience' upload.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `customer_db.csv` exist?
2.  **If Missing:** Create `customer_db.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `customer_db.csv` exist? If missing, create template.

### Phase 2: The Segmentation Loop
1.  **Filter:** Identify users where `Lifetime_Value` > $1000 OR `Purchase_Count` > 5.
2.  **Qualify:** Discard internal/test emails.
3.  **Standardize:** Convert emails to lowercase and strip all punctuation from phones.

### Phase 3: The Export
1.  **Create:** `vip_lal_seed.csv` with columns: `email,phone,first_name,last_name,country`.
2.  **Summary:** "Processed [X] customers. Identified [Y] VIPs for your Lookalike seed. Total seed value: $[Total]."
---

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
