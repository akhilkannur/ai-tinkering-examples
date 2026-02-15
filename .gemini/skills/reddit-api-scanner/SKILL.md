---
name: reddit-api-scanner
description: Scans specific subreddits for keyworded posts using the official Reddit API, offering more reliability and better rate limits than the unauthenticated method.
---

# Reddit API Opportunity Scanner

This skill uses the official Reddit API with authentication to identify high-quality posts matching specific keywords. It is more robust and efficient than the unauthenticated scanner.

## Prerequisites

You must have a `REDDIT_CLIENT_ID` and `REDDIT_CLIENT_SECRET` set in your `.env.local` file.

## Usage

Before running the script, ensure you have loaded the environment variables. A simple way is to use `dotenv` with Node.js:

```bash
node -r dotenv/config .gemini/skills/reddit-api-scanner/scripts/scan_with_api.js
```

This will generate a `reddit_api_opportunities.json` file with the results.
