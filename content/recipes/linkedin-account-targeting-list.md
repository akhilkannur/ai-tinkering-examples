---
id: linkedin-account-targeting-list
category: Sales Ops
title: LinkedIn Account Targeting Builder
tagline: Turn a list of domains into a matched audience for LinkedIn Ads.
difficulty: Intermediate
time: 10 mins
archetype: Researcher
description: Takes a list of company domains, finds their official LinkedIn Company Page URLs, and formats them for LinkedIn Matched Audiences.
sampleData:
  filename: domains.csv
  content: |
    Domain
    stripe.com
    airtable.com
    notion.so
    figma.com
    linear.app
---

# What This Does
This agent takes a simple list of company websites (domains) and researches their corresponding LinkedIn Company Page URLs. It then formats this data into a CSV ready for upload to LinkedIn Campaign Manager as a "Account Matched Audience".

# What You Need
- A CSV file named `domains.csv` containing a column `Domain`.

# What You Get
- `linkedin_matched_audience.csv`: A file formatted strictly for LinkedIn's bulk upload.
- `report.md`: A summary of match rates.

# How to Use
1. Create a file named `domains.csv` with your target accounts.
2. Open your AI agent (Claude Code, Gemini CLI, etc.) in the folder.
3. Copy and paste the prompt below.
4. Upload the resulting CSV to LinkedIn Campaign Manager > Plan > Audiences.

---

# Prompt

You are a **Marketing Operations Specialist**. Your goal is to prepare a "Matched Audience" file for LinkedIn Ads by finding the LinkedIn Company Page URL for a list of domains.

**Phase 1: Setup**
1. Read `domains.csv`.
2. If it doesn't exist, create it with the sample data provided above.
3. Initialize a new CSV `linkedin_matched_audience.csv` with headers: `companyname`, `companywebsite`, `linkedinprofileurl`.

**Phase 2: Research & Match**
For each domain in `domains.csv`:
1.  **Search:** Perform a search for `site:linkedin.com/company "Domain Name"`.
2.  **Verify:** Select the result that matches the pattern `linkedin.com/company/[company-name]`. Exclude `/showcase/` or employee profiles.
3.  **Extract:** Get the clean URL.
4.  **Format:**
    *   `companyname`: Extract from the domain (e.g., "stripe.com" -> "Stripe").
    *   `companywebsite`: The original domain (e.g., "stripe.com").
    *   `linkedinprofileurl`: The URL you found.

**Phase 3: Output**
1.  Save valid matches to `linkedin_matched_audience.csv`.
2.  Save a `report.md` summarizing:
    *   Total domains processed.
    *   Match rate (%).
    *   List of domains where no LinkedIn page was found.

Start now.
