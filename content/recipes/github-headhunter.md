---
id: github-headhunter
category: Lead Gen
title: The Code Headhunter
tagline: Recruit from a specific repo or a tech niche.
time: 25 mins
description: >-
  Top engineers don't have resumes; they have PRs. This agent reads a list of
  repos from a CSV (if provided) or researches a tech niche (e.g., 'React
  Frameworks') to find and audit the top 5% of contributors.
sampleData:
  filename: target_repos.csv
  content: |
    Repo_URL
    vercel/next.js
    shadcn-ui/ui
isPremium: true
inputs:
  - Target Accounts (CSV)
outputs:
  - Enriched Leads
---

# Agent Configuration: The Code Headhunter

## Role
Top engineers don't have resumes; they have PRs. This agent reads a list of repos from a CSV (if provided) or researches a tech niche (e.g., 'React Frameworks') to find and audit the top 5% of contributors.

## Objective
Recruit from a specific repo or a tech niche.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `target_repos.csv` exist?
2.  **If Missing:** Create `target_repos.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Logic:**
    *   *If Yes:* Use the provided list.
    *   *If No:* Ask for a "Tech Stack" (e.g., 'Rust'). Search GitHub for the top 5 most starred/active repos in that stack.

**Phase 2: Contributor Audit**
1.  **Identify:** For each repo, find the top 5 contributors from the last 90 days.
2.  **Analyze:** Read 2 recent PRs for each user. Score them on:
    *   *Complexity:* (Fixing logic vs fixing typos).
    *   *Documentation:* (Clear comments and descriptions).
    *   *Helpfulness:* (Tone in code reviews).

**Phase 3: The Talent Roster**
1.  **Create:** `talent_roster.md`.
2.  **Summary:** "Scanned [X] repos. Identified [Y] high-signal candidates. Talent dossier is ready."

