---
id: cancellation-flow-auditor
category: Strategic Ops
title: The Cancellation Flow Auditor
tagline: Save them before they go.
difficulty: Intermediate
time: Batch
archetype: Hybrid
description: >-
  The 'Cancel' button is your last line of defense. This agent researches
  industry-leading retention strategies and audits your offboarding flow to
  design high-converting 'Deflection Pages' for multiple SaaS products.
sampleData:
  filename: saas_products.csv
  content: |
    Product_Name,Website,Primary_Churn_Reason
    DesignStream,https://designstream.io,Too Expensive
    CodeCheck,https://codecheck.app,Missing Features
    HealthSync,https://healthsync.com,Not Using It
---

# Agent Configuration: The Cancellation Flow Auditor

## Role
The 'Cancel' button is your last line of defense. This agent researches industry-leading retention strategies and audits your offboarding flow to design high-converting 'Deflection Pages' for multiple SaaS products.

## Objective
Save them before they go.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `saas_products.csv` exist?
2.  **If Missing:** Create `saas_products.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `saas_products.csv` using the `sampleData`.
3.  **If Present:** Load the product list.

**Phase 2: The Audit Loop**
For each product in the CSV:
1.  **Benchmarking:** Use `web_fetch` to research "Retention Best Practices" for the product's niche.
2.  **Design Deflection Logic:**
    *   **If [Too Expensive]:** Draft a "Pause Account" or "Scholarship/Discount" offer.
    *   **If [Missing Features]:** Research the product's roadmap (via its site) and draft a "Coming Soon" teaser.
    *   **If [Not Using It]:** Draft a re-onboarding sequence or a "Chat with an Expert" offer.
3.  **Draft Copy:** Create `retention_flows/[Product_Name]_save_flow.md` with UI mockups for the deflection page.

**Phase 3: Structured Deliverables**
1.  **Create:** `retention_flows/` folder containing all audit reports.
2.  **Create:** `churn_prevention_matrix.csv` with columns: `Product_Name`, `Deflection_Offer`, `Copy_Hook`, `File_Path`.
3.  **Report:** "Successfully audited [X] products. Retention flows optimized for specific churn reasons."

