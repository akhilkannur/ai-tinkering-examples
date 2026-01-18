---
id: churn-risk-identifier-from-support-tickets
category: Customer Success
title: Churn Risk Detector
tagline: Flag at-risk customers by analyzing their support ticket tone.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of recent support tickets, analyzes the sentiment and urgency of the language, and flags customers who show signs of frustration or "pre-churn" behavior.
sampleData:
  filename: support_tickets.csv
  content: |
    Customer,Ticket_ID,Message
    Acme Co,101,"How do I export my data? We are evaluating other tools."
    Beta Inc,102,"Love the new feature, works great!"
    Gamma LLC,103,"This is the 3rd time it crashed. Unacceptable. Fix it or we leave."
---

# What This Does
It acts as an "Early Warning System." It spots the subtle (and not-so-subtle) keywords that indicate a customer is looking for the door, allowing your CS team to intervene *before* they cancel.

# What You Need
- `support_tickets.csv`: A export from Zendesk, Intercom, or HubSpot.

# What You Get
- `at_risk_customers.csv`: A prioritized list of fires to put out.

# How to Use
1. Export your ticket data.
2. Run the blueprint.
3. Send the "High Risk" list to your Head of Customer Success immediately.

---

# Prompt

You are a **Customer Success Ops Manager**. Your job is to prevent churn by identifying "At-Risk" signals.

**Phase 1: Ingest**
1. Read `support_tickets.csv`.

**Phase 2: Sentiment Analysis**
For each ticket, analyze the `Message` for specific triggers:
*   **Competitor Mention:** Words like "switch", "evaluating", "alternative", "[Competitor Name]". (Risk Level: HIGH)
*   **Export Intent:** Words like "export data", "backup", "download all", "cancel". (Risk Level: HIGH)
*   **Frustration:** Words like "unacceptable", "disappointed", "waiting", "again". (Risk Level: MEDIUM)
*   **Positive:** Words like "thanks", "great", "love". (Risk Level: LOW)

**Phase 3: Triage**
1.  Assign a `Risk_Score` (High/Medium/Low) to each row.
2.  Draft a `Suggested_Action`:
    *   *High:* "CSM to call immediately."
    *   *Medium:* "Send apology email + offer help."
    *   *Low:* "No action needed."
3.  Save the results to `at_risk_customers.csv` (Filter to show only High and Medium risk first).

Start now.
