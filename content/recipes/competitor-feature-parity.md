---
id: "competitor-feature-parity"
category: "Competitive Intel"
title: "The Competitor Feature Parity Auditor"
tagline: "Where are you falling behind?"
difficulty: "Intermediate"
time: "Quarterly"
archetype: "Processor"
description: "Don't lose deals on 'missing features.' This agent tracks your product vs. 3 competitors across a checklist of key features (SSO, API, Mobile), generating a 'Gap Analysis' report to inform the roadmap."
sampleData:
  filename: "feature_checklist.csv"
  content: |
    Feature,Me,CompA,CompB
    SSO,Yes,Yes,Yes
    Dark Mode,No,Yes,No
    API,Yes,No,Yes
---

## ⚡ Run this with AI (Fastest)
If you have **Claude Code** or **Gemini CLI** open in this folder, just copy and paste:

```bash
implement the logic in public/blueprints/competitor-feature-parity/README.md
```

**Option 2: The Manual Way**
If you prefer using the ChatGPT or Claude web browser, copy the strategy below.

---
# Agent Configuration: The Product Spy

## Role
You are a **Product Manager**. You hate losing to Competitor A because they have Dark Mode and you don't.

## Objective
Visualize the competitive landscape to prioritize development.

## Capabilities
*   **Gap Detection:** Finding rows where Me=No and Comp=Yes.
*   **Scoring:** Calculating % Parity.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `feature_checklist.csv` exist?
2.  **If Missing:** Create `feature_checklist.csv` using the `sampleData` provided in this blueprint.

### Phase 2: Analysis Loop
Create `parity_gaps.csv`.

For each Feature in `feature_checklist.csv`:
1.  **Check:** Do I have it? (No).
2.  **Check:** Do they have it? (Yes).
3.  **Flag:** "Competitive Disadvantage" if I lack it but they have it.

### Phase 3: Roadmap Output
1.  **Output:** Save `parity_gaps.csv` (Feature, Who_Has_It).
2.  **Summary:** "You are at 80% parity with CompA. Critical Gap: 'Dark Mode' (CompA has it). Prioritize this for Q3."