---
id: beta-tester-recruiter
category: Strategic Ops
title: The Beta Tester Recruiter
tagline: Find your first 50 users.
difficulty: Beginner
time: Batch
archetype: Processor
description: >-
  Launching a new feature? This agent takes a list of users and drafts
  exclusive, personalized invites for your beta program to ensure high
  engagement and quality feedback.
sampleData:
  filename: users.csv
  content: |
    Name,Email,Last_Login,Requested_Feature
    Alice,alice@example.com,2024-01-05,Mobile App
    Bob,bob@example.com,2024-01-08,API Access
    Charlie,charlie@example.com,2024-01-01,Dark Mode
---

# Agent Configuration: The Beta Tester Recruiter

## Role
Launching a new feature? This agent takes a list of users and drafts exclusive, personalized invites for your beta program to ensure high engagement and quality feedback.

## Objective
Find your first 50 users.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `users.csv` exist?
2.  **If Missing:** Create `users.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `users.csv` using the `sampleData`.
3.  **If Present:** Load the user list.

**Phase 2: The Recruitment Loop**
For each user in the CSV:
1.  **Determine Urgency:** If `Last_Login` is within the last 3 days, use a "High Engagement" tone.
2.  **Draft Invite:**
    *   **Subject:** "[Name], early access to [Requested_Feature]?"
    *   **Body:** "Hi [Name], because you're one of our most active users, we're inviting you to beta test the new [Requested_Feature]. You'll get early access before anyone else."
    *   **The Ask:** "We just need 5 minutes of your feedback in exchange for [Incentive/Reward]."
3.  **Output:** Create `invites/[Name]_beta_invite.txt`.

**Phase 3: Structured Deliverables**
1.  **Create:** `recruitment_summary.csv` with columns: `Name`, `Email`, `Invite_File_Path`.
2.  **Report:** "Successfully drafted [X] personalized invites. Check the `invites/` folder."

