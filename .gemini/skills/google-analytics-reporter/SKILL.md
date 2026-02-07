---
name: google-analytics-reporter
description: Fetches real-time traffic data from Google Analytics 4 (GA4). Use when the user asks for traffic stats, top pages, or active users.
---

# Google Analytics Reporter

This skill connects to the `realaiexamples.com` GA4 property (Property ID: 506136292) using a service account.

## Usage

### 1. Get Today's Traffic
```bash
node .gemini/tmp/google-analytics-reporter/scripts/fetch_report.js
```

### 2. Get Custom Date Range
```bash
node .gemini/tmp/google-analytics-reporter/scripts/fetch_report.js 2026-02-01 2026-02-07
```

## Tips
*   Always summarize the results for the user.
*   Mention that data is fetched in real-time.