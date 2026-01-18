---
id: saas-customer-onboarding-plan-generator
category: Customer Success
title: Custom Onboarding Plan Builder
tagline: Generate a personalized "30-60-90 Day Plan" for new clients.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a new customer's "Desired Outcome" (e.g., "Reduce spend by 10%") and generates a checklist of tasks they need to complete in your software to achieve it.
sampleData:
  filename: new_client.txt
  content: |
    Client: Acme Corp
    Goal: Automate their monthly billing reporting.
    Users: 5 Finance Team members.
---

# What This Does
The first 90 days determine if a customer stays forever or churns. This agent creates a professional-looking "Success Plan" that you can send to the client, showing them exactly what steps to take to get value quickly.

# What You Need
- `new_client.txt`: Basic notes from the sales handoff.

# What You Get
- `success_plan.md`: A dated checklist for the customer.

# How to Use
1. Paste the client notes.
2. Run the blueprint.
3. Export to PDF and email to the champion.

---

# Prompt

You are a **Customer Success Manager**. Your job is to drive adoption.

**Phase 1: Goal Alignment**
1. Read `new_client.txt`.
2. Identify the **"First Value Moment"**: What is the *one* thing they need to do to see the result they bought? (e.g., "Connect Bank Account" -> "Run First Report").

**Phase 2: Planning**
Create a timeline:
*   **Week 1 (Setup):** Technical tasks (Inviting users, integrations).
*   **Week 2 (Training):** Learning the specific feature related to their `Goal`.
*   **Week 4 (value):** Running the process live.

**Phase 3: Output**
Create `success_plan.md`:
*   **Executive Summary:** "We are working together to [Goal]."
*   **The Checklist:** Broken down by week.
*   **Resources:** Placeholders for help articles relevant to the goal.

Start now.
