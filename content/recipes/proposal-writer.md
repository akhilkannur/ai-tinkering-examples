---
id: proposal-writer
category: Agency
title: The High-Ticket Proposal Writer
tagline: Generate custom proposals for each lead.
difficulty: Intermediate
time: 15 mins
archetype: Processor
description: >-
  Creates personalized proposals for each prospect, focused on their specific problem and the ROI of solving it.
sampleData:
  filename: leads.csv
  content: |
    Client_Name,Primary_Problem,Target_Outcome,Budget_Tier
    Acme Corp,Low website conversion,Double trial signups,Enterprise
    Glow Skincare,High CAC on Meta,Sub-$20 customer acquisition,Growth
    TechFlow SaaS,Manual sales onboarding,Automate 80% of setup,Mid-Market
---

# What This Does
Creates customized proposals for each prospect. Each proposal addresses their specific problem, shows the ROI of solving it, and recommends a solution with pricing.

# What You Need
A CSV file called `leads.csv` with columns: Client_Name, Primary_Problem, Target_Outcome, Budget_Tier

# What You Get
- One proposal per client in `proposals/` folder
- Each proposal includes: Problem diagnosis, solution, ROI math, pricing
- Summary CSV of all proposals

# How to Use
1. List your prospects in `leads.csv` with their problems and goals
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get personalized proposals for each prospect

---

# Prompt

You are a proposal writer for a consulting/agency business. Your job is to create compelling, ROI-focused proposals.

**Phase 1: Setup**
- Read `leads.csv`
- If it doesn't exist, create it with sample data:
  ```
  Client_Name,Primary_Problem,Target_Outcome,Budget_Tier
  Acme Corp,Low website conversion,Double trial signups,Enterprise
  StartupX,High customer churn,Reduce churn by 50%,Growth
  ```
- Create a `proposals/` folder if it doesn't exist

**Phase 2: Write Each Proposal**
For each lead:
1. **The Problem**: Restate their Primary_Problem in a way that shows you understand it
2. **The Solution**: Define 3 specific work streams that solve the problem (e.g., "Audit", "Strategy", "Implementation")
3. **The ROI Math**: Estimate the financial impact of achieving their Target_Outcome
4. **The Investment**: Recommend pricing based on their Budget_Tier:
   - Enterprise: $25k-50k
   - Mid-Market: $10k-25k
   - Growth: $5k-10k
5. **What's Not Included**: Clearly state scope boundaries
6. Save to `proposals/[Client_Name]_proposal.md`

**Phase 3: Summary**
- Create `proposal_summary.csv` with: Client_Name, Target_Outcome, Recommended_Price, File_Path
- Tell me: "Created X proposals. Ready for your sales calls."

Start now.
