---
id: churn-survey-analyzer
category: Customer Success
title: Churn Autopsy
tagline: Find out the real reason customers are leaving.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads unstructured "Why did you cancel?" survey responses, groups them into root causes (Price, Product, Service), and calculates the "% of Revenue Lost" for each category.
sampleData:
  filename: exit_surveys.csv
  content: |
    Customer,ARR,Reason
    Acme,10000,"Too expensive for what it does."
    Beta,50000,"Missing the SSO feature."
    Gamma,5000,"Found a cheaper alternative."
---

# What This Does
You can't fix churn if you don't know why it's happening. This agent quantifies the pain. It tells you: "We lost $50k because of Feature X, but only $15k because of Price."

# What You Need
- `exit_surveys.csv`: Export from Typeform/Stripe.

# What You Get
- `churn_report.md`: A prioritized hit list for Product.

# How to Use
1. Export your cancellations.
2. Run the blueprint.
3. Show the "Revenue Lost by Category" chart to your CPO.

---

# Prompt

You are a **Product Analyst**. Your job is to reduce churn.

**Phase 1: Categorization**
1. Read `exit_surveys.csv`.
2. Tag each `Reason`:
    *   **Price:** "Expensive," "Budget," "Cheaper."
    *   **Product Gap:** "Missing," "Feature," "Bug."
    *   **Support:** "Rude," "Slow," "Help."
    *   **Unknown:** Everything else.

**Phase 2: Aggregation**
1. Sum the `ARR` for each Category.
2. Count the `Customer`s for each Category.

**Phase 3: Reporting**
Create `churn_report.md`.
*   **Top Churn Driver (by $):** Which category cost the most money?
*   **Top Churn Driver (by Volume):** Which category lost the most logos?
*   **Recommendation:** "If we build [Missing Feature], we save $[Amount]."

Start now.
