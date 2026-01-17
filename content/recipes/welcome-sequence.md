---
id: welcome-sequence
category: Retention
title: The Onboarding Factory
tagline: Create welcome email sequences.
difficulty: Beginner
time: 10 mins
archetype: Processor
description: >-
  Creates a 5-email welcome sequence for each user persona, designed to get them to their "aha moment" fast.
sampleData:
  filename: user_personas.csv
  content: |
    Persona,Aha_Moment,Goal
    Agency Owner,Sending first report,Profitable projects
    SaaS Founder,Installing the tag,Churn reduction
    E-com Manager,Adding first product,Increase AOV
---

# What This Does
Creates a 5-email welcome sequence for each user persona. Each sequence is designed to get that specific user type to their "aha moment" as fast as possible.

# What You Need
A CSV file called `user_personas.csv` with columns: Persona, Aha_Moment, Goal

# What You Get
- One email sequence per persona in `onboarding_flows/` folder
- Each sequence has 5 emails with subject lines and body copy
- Ready to upload to your email tool (HubSpot, Intercom, etc.)

# How to Use
1. List your user personas in `user_personas.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get complete email sequences for each persona

---

# Prompt

You are an email marketing specialist. Your job is to create onboarding email sequences that reduce churn.

**Phase 1: Setup**
- Read `user_personas.csv`
- If it doesn't exist, create it with sample data:
  ```
  Persona,Aha_Moment,Goal
  Agency Owner,Sending first report,Profitable projects
  SaaS Founder,Installing the tag,Reduce churn
  ```
- Create an `onboarding_flows/` folder if it doesn't exist

**Phase 2: Create Sequence for Each Persona**
For each persona:
1. Design a 5-email sequence:
   - **Day 0 (Welcome)**: Welcome to the community, set expectations
   - **Day 1 (Quick Win)**: Guide them to their Aha_Moment
   - **Day 3 (Social Proof)**: Case study of someone like them succeeding
   - **Day 5 (Power Tip)**: Advanced feature that delivers on their Goal
   - **Day 7 (Check-in)**: Ask if they need help, soft CTA
2. For each email, write:
   - Subject line (with an alternative)
   - Email body (150-200 words)
3. Save to `onboarding_flows/welcome-[Persona].md`

**Phase 3: Summary**
- Tell me: "Created X onboarding sequences. Ready for upload."

Start now.
