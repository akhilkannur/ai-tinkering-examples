---
name: google-search-reporter
description: Fetches organic search data from Google Search Console (GSC). Use when the user asks about keyword rankings, impressions, or search performance.
---

# Google Search Reporter

This skill connects to the `sc-domain:realaiexamples.com` property.

## Usage

### 1. Get Top Queries (Defaults to 3 days ago)
```bash
node .gemini/tmp/google-search-reporter/scripts/fetch_search.js
```

### 2. Get Specific Date
```bash
node .gemini/tmp/google-search-reporter/scripts/fetch_search.js 2026-02-01
```

## Tips
*   GSC data usually has a **48-72 hour delay**.
*   Remind the user of the delay if they ask for "today's" search data.