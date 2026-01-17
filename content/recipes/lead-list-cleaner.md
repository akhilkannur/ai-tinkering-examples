---
id: lead-list-cleaner
category: Sales Ops
title: The Lead List Cleaner
tagline: Never bounce an email again.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: >-
  30% of purchased leads have dead websites. This checks each company's website and separates the good leads from the dead ones.
sampleData:
  filename: leads.csv
  content: |
    Company,Website,Contact_Name,Email
    Acme Corp,https://www.google.com,John Doe,john@acme.com
    Dead Startup,https://thisdomaindefinitelydoesnotexist12345.com,Jane Smith,jane@deadstartup.com
    Stripe,https://stripe.com,Patrick,patrick@stripe.com
    Broken Link,https://httpstat.us/404,Test User,test@broken.com
---

# What This Does
Checks if company websites in your lead list are still alive. Separates good leads from dead ones.

# What You Need
A CSV file called `leads.csv` with columns: Company, Website, Contact_Name, Email

# What You Get
- `verified_leads.csv` — companies with working websites
- `dead_leads.csv` — companies with broken/dead websites
- Summary of how many were good vs dead

# How to Use
1. Save your lead list as `leads.csv` in a folder
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Wait — you'll get two cleaned files

---

# Prompt

You are a lead list cleaner. Your job is to verify which company websites are still active.

**Phase 1: Setup**
- Read `leads.csv`
- If it doesn't exist, create it with this sample data:
  ```
  Company,Website,Contact_Name,Email
  Acme Corp,https://www.google.com,John Doe,john@acme.com
  Test Company,https://httpstat.us/404,Jane Smith,jane@test.com
  ```

**Phase 2: Check Each Website**
For each row in the CSV:
- Try to access the Website URL
- If it returns 200, 301, or 302 → mark as "alive"
- If it returns 404, 500, or times out → mark as "dead"

**Phase 3: Save Results**
- Save all alive leads to `verified_leads.csv`
- Save all dead leads to `dead_leads.csv`
- Tell me: "Found X verified leads and Y dead leads."

Start now.
