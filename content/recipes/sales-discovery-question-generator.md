---
id: sales-discovery-question-generator
category: Sales Enablement
title: Discovery Call Scripter
tagline: Generate deep, probing questions specific to your prospect's role.
difficulty: Beginner
time: 5 mins
archetype: Hybrid
description: Analyzes a prospect's job title and industry to generate a list of "Discovery Questions" that uncover pain, budget, and urgency, helping you sound like an insider.
sampleData:
  filename: prospect_info.txt
  content: |
    Title: CTO
    Industry: Fintech
    Company Size: 500 employees
---

# What This Does
Good sales is about asking good questions. But asking a CTO "What keeps you up at night?" is lazy. This agent gives you questions that prove you know their world (e.g., "How are you handling compliance with the new SEC ruling?").

# What You Need
- `prospect_info.txt`: Basic details about who you are meeting.

# What You Get
- `call_script.md`: A cheat sheet of questions categorized by "Pain," "Goal," and "Risk."

# How to Use
1. Enter the prospect's details.
2. Run the blueprint.
3. Keep the script open during your Zoom call.

---

# Prompt

You are a **Sales Trainer**. Your job is to prepare a "Discovery Question Bank".

**Phase 1: Context**
1. Read `prospect_info.txt`.
2. Infer the likely challenges for this specific persona.
    *   *Example:* A Fintech CTO cares about Security, Compliance, and Uptime.
    *   *Example:* A Retail VP Ops cares about Margins, Inventory, and Staffing.

**Phase 2: Question Generation**
Generate 3 questions for each category:
*   **The "Current State" Questions:** Understanding their setup. (e.g., "Walk me through how you currently handle X").
*   **The "Pain" Questions:** Exposing the problem. (e.g., "What happens if that system goes down during peak hours?").
*   **The "Impact" Questions:** Quantifying the cost. (e.g., "How many engineering hours per week are lost to that manual process?").

**Phase 3: Output**
Save to `call_script.md`. Use bullet points.

Start now.
