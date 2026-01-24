---
id: contract-risk-detector
category: Strategic Ops
title: The Contract Risk Detector
tagline: Find the 'gotchas' in the PDF.
difficulty: Experimental
time: Batch
description: >-
  Sales contracts often hide 3-year lock-ins or auto-renewals in the fine print.
  This agent scans multiple PDF agreements, highlights high-risk clauses, and
  suggests red-lines to protect your budget.
sampleData:
  filename: contracts_to_audit.csv
  content: |
    Vendor_Name,Contract_File,Priority
    CloudScale,contracts/cloudscale_msa.pdf,High
    AdsManager,contracts/ads_terms.pdf,Medium
    SaaSPro,contracts/saaspro_agreement.png,High
isPremium: true
---

# Agent Configuration: The Contract Risk Detector

## Role
Sales contracts often hide 3-year lock-ins or auto-renewals in the fine print. This agent scans multiple PDF agreements, highlights high-risk clauses, and suggests red-lines to protect your budget.

## Objective
Find the 'gotchas' in the PDF.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `contracts_to_audit.csv` exist?
2.  **If Missing:** Create `contracts_to_audit.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `contracts_to_audit.csv` using the `sampleData`. Ensure the `contracts/` folder exists.
3.  **If Present:** Load the contract list.

**Phase 2: The Red Flag Loop**
For each contract in the CSV:
1.  **Ingest:** Read the full text from the `Contract_File`.
2.  **Scan for 'Gotchas':**
    *   **Term & Renewal:** Identify initial term length and auto-renewal notice periods (e.g., 90-day windows).
    *   **Financials:** Check for annual price escalators and Net-30+ payment terms.
    *   **Termination:** Look for "Termination for Convenience" vs. "Termination for Cause".
3.  **Draft Red-lines:** Suggest specific language changes to mitigate identified risks.
4.  **Assign Risk Score:** Grade the contract (High/Medium/Low Risk).

**Phase 3: Structured Deliverables**
1.  **Create:** `risk_assessments/` folder with `[Vendor_Name]_audit.md` for each entry.
2.  **Create:** `contract_risk_matrix.csv` with columns: `Vendor_Name`, `Risk_Score`, `Main_Concern`, `File_Path`.
3.  **Report:** "Successfully audited [X] contracts. [Y] critical risks identified in [Vendor_Name] agreement."

