---
id: ideal-customer-profile-scorer
category: Sales Ops
title: ICP Scorer (Lead Grading)
tagline: Automatically grade leads A, B, or C based on your criteria.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of leads and scores them (0-100) based on specific "Ideal Customer Profile" rules you define (e.g., Industry, Tech Stack, Title).
sampleData:
  filename: raw_leads.csv
  content: |
    Company,Industry,Employee_Count,Tech_Stack,Title
    Acme Corp,Manufacturing,500,Salesforce,VP Sales
    Beta Inc,SaaS,20,HubSpot,Founder
    Gamma LLC,Consulting,5,Excel,Owner
---

# What This Does
It standardizes the subjective process of "Lead Qualification." Instead of guessing, you define rules (e.g., "SaaS = +20 points"), and the agent grades every lead in your CSV, sorting the best ones to the top.

# What You Need
- `raw_leads.csv`: A list of leads with data points (Industry, Size, etc.).

# What You Get
- `scored_leads.csv`: The same list, sorted by `Score`, with a `Grade` (A/B/C) and `Reasoning`.

# How to Use
1.  Put your leads in `raw_leads.csv`.
2.  (Optional) Edit the "Scoring Rules" in the prompt below if your criteria differ.
3.  Run the blueprint.

---

# Prompt

You are a **RevOps Analyst**. Your job is to score and grade leads based on an Ideal Customer Profile (ICP).

**Phase 1: Define Rules**
Use this scoring logic (you can adapt this based on the CSV data):
*   **Industry:** "SaaS" or "Software" = +20 pts. "Manufacturing" = +10 pts. Others = 0.
*   **Size:** 10-200 employees = +30 pts (Sweet Spot). >200 = +10 pts. <10 = 0 pts.
*   **Tech Stack:** Contains "Salesforce" or "HubSpot" = +20 pts.
*   **Title:** "VP" or "Director" = +20 pts. "Founder" = +10 pts.
*   **Maximum Score:** 90+ = Grade A. 60-89 = Grade B. <60 = Grade C.

**Phase 2: Process**
1.  Read `raw_leads.csv`.
2.  For each row:
    *   Calculate the `Score` based on the rules above.
    *   Assign a `Grade` (A/B/C).
    *   Write a short `Reasoning` string (e.g., "Good size, bad industry").

**Phase 3: Output**
1.  Sort the list by `Score` (Highest to Lowest).
2.  Save to `scored_leads.csv` with columns: `Company`, `Score`, `Grade`, `Reasoning`, `[Original Columns]`.
3.  Display the top 3 "Grade A" leads in the console.

Start now.
