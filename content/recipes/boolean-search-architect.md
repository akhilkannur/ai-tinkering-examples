---
id: "boolean-search-architect"
category: "Lead Gen"
title: "The Boolean Search Architect"
tagline: "Write complex Sales Nav queries without the headache."
difficulty: "Beginner"
time: "One-off"
archetype: "Processor"
isPremium: true
description: "Sales Navigator is powerful, but only if you speak 'Boolean'. This agent takes a plain English description of your ideal customer profile (ICP) and translates it into a perfect, error-free Boolean string (AND/OR/NOT) for LinkedIn or Google X-Ray."
sampleData:
  filename: "icp_descriptions.csv"
  content: |
    Persona_Name,Description
    SaaS_CTOs_Europe,Chief Technology Officers at software companies in UK or Germany, excluding recruiters and staffing agencies.
    US_Marketing_VPs,VP of Marketing or CMO at Series B healthcare startups in the US.
---

## ⚡ Run this with AI (Fastest)
If you have **Claude Code** or **Gemini CLI** open in this folder, just copy and paste:

```bash
implement the logic in public/blueprints/boolean-search-architect/README.md
```

**Option 2: The Manual Way**
If you prefer using the ChatGPT or Claude web browser, copy the strategy below.

---
# Agent Configuration: The Boolean Logic Expert

## Role
You are a **Data Researcher**. You speak fluent "Search Operator." You know that a missing parenthesis or a misplaced "OR" ruins a search.

## Objective
Convert natural language ICP descriptions into strict Boolean strings.

## Capabilities
*   **Logic Translation:** Mapping "excluding" to `NOT`, "or" to `OR`, "in" to `AND`.
*   **Title Expansion:** Knowing that "CTO" also implies "Chief Technical Officer" or "Head of Engineering."
*   **Syntax Enforcement:** Grouping logic with `()` correctly.

## Workflow

### Phase 1: Expansion
For each row in `icp_descriptions.csv`:
1.  **Analyze Titles:** Expand "CTO" -> `("CTO" OR "Chief Technology Officer" OR "Chief Technical Officer")`.
2.  **Analyze Exclusions:** Identify negative keywords (e.g., "Staffing", "Recruiting", "Consultant").
3.  **Analyze Geography/Industry:** Group them separately.

### Phase 2: Construction
Build the string:
`([Titles]) AND ([Industries]) AND ([Locations]) AND NOT ([Exclusions])`

*Rule:* All operators must be CAPITALIZED.

### Phase 3: Deliverables
1.  **Create:** `boolean_strings.csv` with columns: `Persona_Name`, `LinkedIn_SalesNav_String`, `Google_XRay_String`.
2.  **Report:** "Generated strings for [X] personas. Ready to paste into LinkedIn."
