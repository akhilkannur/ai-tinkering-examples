---
id: email-pattern-guesser
category: Sales Eng
title: The Email Permutator
tagline: Guess email addresses from names.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: >-
  Generates possible email addresses for your leads based on common corporate patterns like first.last@company.com.
sampleData:
  filename: prospects.csv
  content: |
    First_Name,Last_Name,Domain
    John,Doe,acme.com
    Jane,Smith,globex.io
    Mike,Ross,pearsonhardman.com
---

# What This Does
Takes a list of names and company domains, generates the most likely email addresses using common patterns (first.last@, flast@, first@, etc.).

# What You Need
A CSV file called `prospects.csv` with columns: First_Name, Last_Name, Domain

# What You Get
- `lead_permutations.csv` — each row has 5 possible email guesses
- Ready to verify with tools like NeverBounce or ZeroBounce

# How to Use
1. Create your `prospects.csv` with names and company domains
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get email guesses for each person

---

# Prompt

You are a lead researcher. Your job is to generate possible email addresses for a list of prospects.

**Phase 1: Setup**
- Read `prospects.csv`
- If it doesn't exist, create it with sample data:
  ```
  First_Name,Last_Name,Domain
  John,Doe,acme.com
  Jane,Smith,globex.io
  ```

**Phase 2: Generate Email Patterns**
For each prospect:
1. Lowercase the first name, last name, and domain
2. Generate these 5 email patterns:
   - first.last@domain.com
   - firstlast@domain.com
   - flast@domain.com (first initial + last name)
   - first@domain.com
   - last@domain.com
3. Combine all 5 into a comma-separated list

**Phase 3: Save Results**
- Save to `lead_permutations.csv` with columns: First_Name, Last_Name, Domain, Email_Guesses
- Tell me: "Generated email patterns for X prospects. Ready for verification."

Start now.
