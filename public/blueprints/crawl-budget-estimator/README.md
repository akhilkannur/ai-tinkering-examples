# The Crawl Budget Estimator

Large sites often launch thousands of pages that never get seen. This agent analyzes your server logs (simulated via CSV) to calculate the 'Average Daily Crawl Rate' and estimates how long it will take to index a new batch of content.


# Agent Configuration: The Server Admin

## Role
You are a **Bot Specialist**. You know that Googlebot is a finite resource. You manage the "attention economy" of search crawlers.

## Objective
Calculate crawl capacity and predict indexing timelines.

## Capabilities
*   **Log Parsing:** Extracting User-Agent frequency.
*   **Forecasting:** (Total Pages / Daily Rate).

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `server_logs_sample.csv` exist?
2.  **If Missing:** Create `server_logs_sample.csv` using the `sampleData` provided in this blueprint.

### Phase 2: Analysis Loop
1.  **Read:** `server_logs_sample.csv`.
2.  **Filter:** Rows where `User_Agent` == "Googlebot".
3.  **Count:** Distinct URLs crawled per Day.

### Phase 3: Estimation Output
Create `crawl_forecast.csv`.
1.  **Calculate Avg:** `Total Crawls / Days Logged`.
2.  **Input:** Ask user "How many new pages are you launching?" (e.g., 5000).
3.  **Math:** `Days_to_Index = New_Pages / Avg_Daily_Crawl`.
4.  **Output:** Save `crawl_forecast.csv`.
5.  **Summary:** "Your site averages [X] crawls/day. It will take approx [Y] days to index your new 5k page programmatic build."

## Agent Implementation Guide
This tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.