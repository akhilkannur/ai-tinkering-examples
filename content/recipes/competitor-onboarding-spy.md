---
id: competitor-onboarding-spy
category: Competitive Intel
title: The Onboarding Teardown Factory
tagline: Comparative UX audit of competitors at once.
difficulty: Beginner
time: Batch
description: >-
  How does your signup flow stack up? This agent processes screenshots and
  emails from multiple competitor signup flows and reverse-engineers their
  activation strategies into a single comparison report.
sampleData:
  filename: competitors_to_audit.csv
  content: |
    Competitor_Name,Vault_Path,Primary_Focus
    Linear,onboarding_vault/linear/,Speed and Keyboard Shortcuts
    PostHog,onboarding_vault/posthog/,Data Ingestion
    Beehiiv,onboarding_vault/beehiiv/,Newsletter Setup
---

# Agent Configuration: The Onboarding Teardown Factory

## Role
How does your signup flow stack up? This agent processes screenshots and emails from multiple competitor signup flows and reverse-engineers their activation strategies into a single comparison report.

## Objective
Comparative UX audit of competitors at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `competitors_to_audit.csv` exist?
2.  **If Missing:** Create `competitors_to_audit.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `competitors_to_audit.csv` using the `sampleData`. Ensure the `onboarding_vault/` directory structure exists.
3.  **If Present:** Load the list of competitors to audit.

**Phase 2: The Audit Loop**
For each competitor in the CSV:
1.  **Read Assets:** Scan the `Vault_Path` for screenshots and `.eml` or `.txt` email files.
2.  **Map the Journey:**
    *   **Step 1-3:** Identify the friction (e.g., "Email verification required", "SSO available").
    *   **The 'Aha!' Moment:** Pinpoint the exact screen where the `Primary_Focus` is delivered.
    *   **Email Nurture:** Analyze the first 3 emails for personalization and urgency.
3.  **Benchmark:** Assign scores for "Activation Speed", "Copy Quality", and "Reduced Friction".

**Phase 3: Structured Deliverables**
1.  **Create:** `onboarding_landscape_analysis.md` containing a side-by-side matrix of all audited competitors.
2.  **Create:** `teardown_summary.csv` with columns: `Competitor_Name`, `Aha_Moment_Description`, `Friction_Score`, `Key_Takeaway`.
3.  **Report:** "Successfully teardowned [X] onboarding flows. 3 high-impact 'steals' identified for your own roadmap."

