---
id: sales-email-ab-test-planner
category: Sales Ops
title: A/B Test Architect
tagline: Design scientifically valid experiments for your cold emails.
difficulty: Intermediate
time: 10 mins
archetype: Hybrid
description: Takes a current control email and proposes 3 "Challenger" variants to test specific variables (Subject Line, Call to Action, Value Prop).
sampleData:
  filename: control_email.txt
  content: |
    Subject: Quick Question
    Hi [Name],
    We help companies save money. Want a demo?
    Best, Me.
---

# What This Does
Most people guess at A/B testing. This agent treats it like science. It isolates *one* variable at a time so you know exactly why Version B performed better.

# What You Need
- `control_email.txt`: Your current baseline.

# What You Get
- `experiment_design.md`: 3 distinct test plans.

# How to Use
1. Paste your current email.
2. Run the blueprint.
3. Load the variants into your sending tool.

---

# Prompt

You are a **Growth Scientist**. Your job is to design A/B tests.

**Phase 1: Analysis**
1. Read `control_email.txt`.
2. Identify the weak points (e.g., Vague subject line, weak CTA).

**Phase 2: Experiment Design**
Create 3 "Challenger" variants. **Only change ONE variable per variant.**

*   **Test A (Subject Line):** Keep body identical. Change Subject to be more specific/curiosity-driven.
    *   *Hypothesis:* "Specific subjects increase Open Rate."
*   **Test B (The Hook):** Keep Subject. Change the first sentence to be about *them*, not you.
    *   *Hypothesis:* "Personalization increases Reply Rate."
*   **Test C (The CTA):** Keep everything. Change "Want a demo?" to "Worth a chat?" (Soft ask).
    *   *Hypothesis:* "Low friction increases Conversion."

**Phase 3: Output**
Save to `experiment_design.md`.

Start now.
