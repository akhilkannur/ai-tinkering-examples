---
id: people-also-ask-scraper
category: SEO
title: The PAA Scraper
tagline: Answer what they are asking.
difficulty: Intermediate
time: Batch
description: >-
  Google's 'People Also Ask' box is a content goldmine. This agent takes a list
  of keywords and researches the exact questions users are asking on Google,
  generating comprehensive FAQ briefs for your entire site.
sampleData:
  filename: keywords.csv
  content: |
    Keyword,Industry
    Best CRM for small business,SaaS
    How to start a garden,Home & Garden
    Remote work security,Cybersecurity
isPremium: true
---

# Agent Configuration: The PAA Scraper

## Role
Google's 'People Also Ask' box is a content goldmine. This agent takes a list of keywords and researches the exact questions users are asking on Google, generating comprehensive FAQ briefs for your entire site.

## Objective
Answer what they are asking.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `keywords.csv` exist?
2.  **If Missing:** Create `keywords.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `keywords.csv` exist?
2.  **If Missing:** Create `keywords.csv` using the `sampleData`.
3.  **If Present:** Load the keyword list.

### Phase 2: The PAA Research Loop
For each keyword in the CSV:
1.  **Search:** Use `web_fetch` to see what questions Google features in the PAA box for the `Keyword`.
2.  **Expand:** Identify at least 10-20 high-relevance questions.
3.  **Cluster:** Group the questions into a logical hierarchy (e.g., "Beginner Questions", "Pricing Inquiries").
4.  **Draft Brief:**
    *   **The Answer:** Draft a 1-paragraph "Snippet-Ready" answer for the top 3 questions.
    *   **The Structure:** Recommend an FAQ schema-ready layout for the page.

### Phase 3: Structured Deliverables
1.  **Create:** `faq_briefs/` folder containing `[Keyword]_brief.md` for each entry.
2.  **Create:** `paa_master_list.csv` with columns: `Keyword`, `Question_Count`, `Top_Question`, `File_Path`.
3.  **Report:** "Successfully mined [X] questions for [Y] keywords. FAQ briefs are ready for your content team."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
