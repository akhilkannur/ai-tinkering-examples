---
id: sql-cohort-analyzer
category: Analytics
title: The SQL Cohort Builder
tagline: Standardize your retention metrics.
difficulty: Advanced
time: Batch
description: >-
  Retention is the lifeblood of SaaS. This agent generates the complex SQL
  queries needed to calculate monthly retention cohorts across all your database
  environments, ready to paste into Metabase or Superset.
sampleData:
  filename: database_schemas.csv
  content: |
    Environment,Users_Table,Events_Table,Signup_Date_Column
    Production,auth_users,user_events,created_at
    Staging,test_users,test_events,registered_on
    Legacy,member_db,activity_log,join_date
isPremium: true
---

# Agent Configuration: The SQL Cohort Builder

## Role
Retention is the lifeblood of SaaS. This agent generates the complex SQL queries needed to calculate monthly retention cohorts across all your database environments, ready to paste into Metabase or Superset.

## Objective
Standardize your retention metrics.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `database_schemas.csv` exist?
2.  **If Missing:** Create `database_schemas.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `database_schemas.csv` exist?
2.  **If Missing:** Create `database_schemas.csv` using the `sampleData`.
3.  **If Present:** Load the schema list.

### Phase 2: The Query Building Loop
For each environment in the CSV:
1.  **Define Cohorts:** Draft a CTE to truncate the `Signup_Date_Column` to the first of the month.
2.  **Map Activity:** Draft a second CTE to link `Users_Table` to `Events_Table` based on unique user IDs and event timestamps.
3.  **Calculate Retention:** Write the final `SELECT` statement to divide "Retained Users in Month X" by the "Total Users in Cohort".
4.  **Formatting:** Ensure all table and column names match the CSV input exactly.
5.  **Output:** Save to `queries/[Environment]_retention.sql`.

### Phase 3: Structured Deliverables
1.  **Create:** `analytics_manifest.csv` with columns: `Environment`, `Table_Join_Key`, `Retention_Logic_Used`, `File_Path`.
2.  **Report:** "Successfully generated [X] retention queries. Queries are optimized for performance and ready for your BI tool."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
