---
name: reddit-opportunity-scanner
description: Scans specific subreddits (r/SaaS, r/salesops, etc.) for high-intent questions related to AI automation, sheets, and sales tools. Use when the user wants to find posts to comment on.
---

# Reddit Opportunity Scanner

This skill identifies one high-quality Reddit post at a time that matches our "Tinkerer" keywords (Clay, Apollo, Sheets, Automation).

## Usage

```bash
node .gemini/tmp/reddit-opportunity-scanner/scripts/scan.js
```

## Policy
*   **One at a time:** Only provide one post per request as per user preference.
*   **Format:** Always include the Subreddit name, Title, and URL.