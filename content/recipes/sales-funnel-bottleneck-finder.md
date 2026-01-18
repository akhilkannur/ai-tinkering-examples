---
id: sales-funnel-bottleneck-finder
category: RevOps
title: Pipeline Leak Detector
tagline: Find exactly where your deals are dying.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of deal stages and conversion rates, identifies the stage with the biggest drop-off compared to industry benchmarks, and suggests fixes.
sampleData:
  filename: funnel_metrics.csv
  content: |
    Stage,Leads_In,Leads_Out,Conversion_Rate
    Lead to Meeting,1000,50,5%
    Meeting to Opp,50,40,80%
    Opp to Close,40,10,25%
---

# What This Does
You are missing quota, but why? Is it bad leads? Bad demos? Bad closing? This agent performs a "Root Cause Analysis" on your funnel to tell you exactly which part of the machine is broken.

# What You Need
- `funnel_metrics.csv`: Export from Salesforce/HubSpot.

# What You Get
- `diagnosis.md`: The fix.

# How to Use
1. Get your conversion numbers.
2. Run the blueprint.
3. Focus your training on the broken stage.

---

# Prompt

You are a **RevOps Consultant**. Your job is to optimize the funnel.

**Phase 1: Benchmarking**
1. Read `funnel_metrics.csv`.
2. Compare against standard SaaS Benchmarks:
    *   *Lead to Meeting:* Target > 10%.
    *   *Meeting to Opp:* Target > 60%.
    *   *Opp to Close:* Target > 20%.

**Phase 2: Diagnosis**
Identify the **Primary Bottleneck** (the stage with the biggest negative gap vs benchmark).
*   *If Lead->Meeting is low:* "Problem: SDR outreach or Lead Quality."
*   *If Meeting->Opp is low:* "Problem: Account Executives are unqualified demos."
*   *If Opp->Close is low:* "Problem: Negotiation skills or Competitive pressure."

**Phase 3: Prescription**
Create `diagnosis.md`.
*   **The Leak:** State the broken stage clearly.
*   **The Fix:** Suggest 1 specific tactic to fix it (e.g., "Implement double-dialing for SDRs").

Start now.
