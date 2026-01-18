---
id: client-onboarding-checklist
category: Agency
title: The Client Onboarding Checklist
tagline: Impress them in Day 1.
difficulty: Beginner
time: Batch
archetype: Processor
description: >-
  New clients have 'Buyer's Remorse' until they see value. This agent generates
  30-day onboarding schedules (Kickoff, Access Requests, Quick Win) for your
  entire roster of new clients to ensure no one slips through the cracks.
sampleData:
  filename: clients.csv
  content: |
    Client_Name,Service_Type,Contract_Value
    Acme SEO,Search Engine Optimization,5000
    Glow Design,UX Audit & Redesign,3500
    FinTech Ads,PPC Management,10000
---

# Agent Configuration: The Client Onboarding Checklist

## Role
New clients have 'Buyer's Remorse' until they see value. This agent generates 30-day onboarding schedules (Kickoff, Access Requests, Quick Win) for your entire roster of new clients to ensure no one slips through the cracks.

## Objective
Impress them in Day 1.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `clients.csv` exist?
2.  **If Missing:** Create `clients.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `clients.csv` exist?
2.  **If Missing:** Create `clients.csv` using the `sampleData`.
3.  **If Present:** Load the client list.

### Phase 2: The Onboarding Loop
For each client in the CSV:
1.  **Customize Schedule:**
    *   **Day 1:** Draft the "Welcome Email" + Asset Request list specific to `Service_Type`.
    *   **Day 3:** The "Quick Win" deliverable (e.g., a technical audit for SEO or a creative brief for Design).
    *   **Day 7:** Strategy Kickoff agenda focused on the `Contract_Value` priorities.
    *   **Day 30:** The "Month 1 Review" template.
2.  **Create Packet:** Save to `onboarding_packets/[Client_Name]_plan.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `onboarding_master_tracker.csv` with columns: `Client_Name`, `Service_Type`, `First_Deliverable`, `File_Path`.
2.  **Report:** "Successfully generated [X] onboarding packets. Buyer's remorse neutralized."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
