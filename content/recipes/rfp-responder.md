---
id: rfp-responder
category: Lead Gen
title: The RFP Responder
tagline: Draft complex proposals instantly.
description: >-
  Responding to RFPs is a time-sink. This agent processes a list of RFP
  requirements and auto-drafts structured responses based on your standard
  service offerings and compliance standards.
sampleData:
  filename: rfps.csv
  content: >
    Project_Name,Requirement_Text,Budget_Tier

    City Bank Security,Must support SAML SSO and have SOC2 Type 2
    compliance,Enterprise

    EduGrowth Portal,Must support 10k concurrent users and mobile
    responsive,Mid-Market

    GovNet Audit,Must have on-premise deployment option and 24/7 support,Public
    Sector
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The RFP Responder

## Role
Responding to RFPs is a time-sink. This agent processes a list of RFP requirements and auto-drafts structured responses based on your standard service offerings and compliance standards.

## Objective
Draft complex proposals instantly.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `rfps.csv` exist?
2.  **If Missing:** Create `rfps.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `rfps.csv` using the `sampleData`.
3.  **If Present:** Load the RFP list.

**Phase 2: The Drafting Loop**
For each RFP in the CSV:
1.  **Decompose:** Extract individual requirements from the `Requirement_Text`.
2.  **Map Capabilities:** For each point:
    *   **Confirm:** State "Yes, we support this" or "Supported via [Mechanism]".
    *   **Detail:** Add 1-2 sentences of technical or operational detail.
    *   **Proof:** Add a placeholder `[LINK: Relevant Case Study]`.
3.  **Draft Executive Summary:** Create a 3-paragraph summary focused on the `Budget_Tier` and why the company is the lowest-risk partner.
4.  **Output:** Save to `drafts/[Project_Name]_response.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `rfp_pipeline_tracker.csv` with columns: `Project_Name`, `Requirement_Count`, `Compliance_Match_%`, `File_Path`.
2.  **Report:** "Successfully drafted [X] RFP responses. High-priority 'Public Sector' requirements flagged for legal review."

