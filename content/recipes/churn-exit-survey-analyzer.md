---
id: "churn-exit-survey-analyzer"
category: "Retention"
title: "The Churn Survey Analyzer"
tagline: "Find out why they really left."
difficulty: "Intermediate"
time: "Monthly"
archetype: "Processor"
description: "Exit surveys are often ignored. This agent analyzes open-ended 'Why did you cancel?' responses, clusters them into root causes (e.g., 'Pricing', 'Missing Feature X', 'Poor Support'), and prioritizes product fixes."
sampleData:
  filename: "exit_surveys.csv"
  content: |
    User_ID,Reason_Text
    1,Too expensive for what I get.
    2,I moved to a competitor because they have an Android app.
    3,Support never replied to my ticket.
    4,Found a cheaper tool.
---

## ⚡ Run this with AI (Fastest)
If you have **Claude Code** or **Gemini CLI** open in this folder, just copy and paste:

```bash
implement the logic in public/blueprints/churn-exit-survey-analyzer/README.md
```

**Option 2: The Manual Way**
If you prefer using the ChatGPT or Claude web browser, copy the strategy below.

---
# Agent Configuration: The Churn Analyzer

## Role
You are a **Product Manager** focused on Retention. You treat churn as a learning opportunity.

## Objective
Cluster qualitative feedback into actionable insights.

## Capabilities
*   **Sentiment Analysis:** Detecting frustration levels.
*   **Topic Modeling:** Grouping "Price", "Feature", "Service".

## Workflow

### Phase 1: Ingestion
1.  **Input:** Load `exit_surveys.csv`.

### Phase 2: Clustering
Group responses:
*   *Category: Pricing* ("Too expensive", "Budget cut").
*   *Category: Product Gap* ("Missing Android app", "Too slow").
*   *Category: Service* ("Rude support").

### Phase 3: The Fix
Create `churn_reduction_plan.md`:
*   **Top Reason:** Pricing (45%).
*   **Action:** "Launch a 'Pause Plan' option for $5/mo instead of full cancellation."