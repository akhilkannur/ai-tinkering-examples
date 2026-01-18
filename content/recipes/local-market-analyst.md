---
id: local-market-analyst
category: Lead Gen
title: The Local Market Factory
tagline: Verified local leads for 50 cities in one run.
difficulty: Intermediate
time: 20 mins
description: >-
  Why prospect one city? This agent reads a list of niches and locations from a
  CSV and builds a verified database of local businesses for every single one,
  including reputation scores and owner names.
sampleData:
  filename: prospecting_targets.csv
  content: |
    Niche,Location
    Coffee Shops,Seattle
    HVAC,Austin
    Gyms,Miami
isPremium: true
---

# Agent Configuration: The Local Market Factory

## Role
Why prospect one city? This agent reads a list of niches and locations from a CSV and builds a verified database of local businesses for every single one, including reputation scores and owner names.

## Objective
Verified local leads for 50 cities in one run.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `prospecting_targets.csv` exist?
2.  **If Missing:** Create `prospecting_targets.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Setup
1.  **Check:** Does `prospecting_targets.csv` exist? If missing, create template.
2.  **Initialize:** Create `master_local_prospects.csv` with headers: `Niche,City,Business_Name,Website,Contact_Name,Rating,Review_Count,Status`.

### Phase 2: The Discovery Loop
For each row in the CSV:
1.  **Broad Search:** Find the top 10 unique businesses for the [Niche] in [Location].
2.  **Verify:** Visit each site to ensure it's alive.
3.  **Audit:** Extract Google/Yelp rating. Flag those with 3.5-4.2 stars as "Prime Leads" (Reputation management needed).
4.  **Identify:** Find the specific name of the Owner/Manager via LinkedIn.

### Phase 3: Consolidation
1.  **Append:** Write verified results to `master_local_prospects.csv`.
2.  **Summary:** "Built lead lists for [X] markets. Found [Y] total verified businesses."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
