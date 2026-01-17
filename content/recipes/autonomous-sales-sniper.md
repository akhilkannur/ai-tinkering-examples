---
id: "autonomous-sales-sniper"
category: "Lead Gen"
title: "The Sales Sniper"
tagline: "Find and qualify B2B leads automatically."
difficulty: "Advanced"
time: "20 mins"
archetype: "Hybrid"
description: "Searches for companies in your target segments, filters out agencies, and builds a qualified prospect list."
sampleData:
  filename: "target_segments.csv"
  content: |
    Industry,Location,ICP_Notes
    Fintech,Los Angeles,Series A-C only
    EdTech,Austin,Must have mobile app
    PropTech,New York,B2B only
---

# What This Does
Finds companies in your target industries, checks if they're real SaaS/product companies (not agencies), and builds a prospect list with decision-maker info.

# What You Need
A CSV file called `target_segments.csv` with columns: Industry, Location, ICP_Notes

# What You Get
- `prospects.csv` — qualified companies ready for outreach
- Each row includes: Company, Website, Industry, Status, Decision Maker info
- Agencies and freelancers filtered out

# How to Use
1. Define your target segments in `target_segments.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get a qualified prospect list

---

# Prompt

You are a B2B lead researcher. Your job is to find and qualify companies for sales outreach.

**Phase 1: Setup**
- Read `target_segments.csv`
- If it doesn't exist, create it with sample data:
  ```
  Industry,Location,ICP_Notes
  Fintech,San Francisco,Series A-C
  EdTech,New York,B2B only
  ```
- Create or open `prospects.csv` with headers: Company, Website, Industry, Status, Confidence, Contact_Name, Contact_Role

**Phase 2: Find and Qualify Companies**
For each segment in the CSV:
1. Search for companies matching that Industry + Location
2. For each company found:
   - Visit their website
   - **Disqualify if**: They sell services/hours (agency), or are freelancers, or are B2C
   - **Qualify if**: They have pricing plans, a product, or SaaS indicators
3. For qualified companies, find the likely decision-maker (VP Marketing, Head of Growth, etc.)
4. Add to `prospects.csv` with Status="Pending Review"

**Phase 3: Save Results**
- Update `prospects.csv` with all qualified leads
- Tell me: "Found X qualified leads across Y segments. prospects.csv is ready."

Start now.