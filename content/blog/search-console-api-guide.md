---
title: "The 'Smart' Way to Find High-Intent Keywords with Search Console"
date: "2026-02-07"
excerpt: "Stop manually checking keyword rankings. Here is how to use automation to pull your top-performing queries directly from Search Console into your own tools."
coverImage: "/images/blog/screenshot-engine.png"
author:
  name: "Akhil from Real Examples"
category: "Automation"
---

I love Google Search Console (GSC), but I hate the manual "SEO chore" of checking it every morning. 

> **TL;DR:** If you find this guide too long, just pass this project to **Claude Code** or **Gemini CLI** and ask it to: *"Set up the Google Search Console API for this project following this guide"* and it will handle the heavy lifting for you.

You know the drill: Click property. Click Performance. Filter by date. Export to CSV. It’s a lot of friction for a task that should be a one-click automated report.

I wanted a way to run a simple command in my terminal and instantly see which keywords are driving clicks. No dashboards, no filters—just the raw "intent" of my audience. 

Here is the "non-technical" breakdown of how I hooked my site up to the **Search Console API**.

## The Logic: Hiring a Digital Robot

We aren't doing anything complex here. We are basically creating a **Service Account**—think of it as a specialized "robot user" that you add to your team. You give this robot a key (a JSON file), invite it to your Search Console property just like a regular person, and then tell it to go fetch your data.

## Step 1: Create the "Robot" (Service Account)

If you've already set up the [Google Analytics API](/blog/google-analytics-api-guide), you can use the same robot! If not, here is the 2-minute version:

1.  **Open the [Google Cloud Console](https://console.cloud.google.com/)**.
2.  **Enable the API:** Search for "Google Search Console API" and hit Enable.
3.  **Create the Account:** Go to "IAM & Admin" > "Service Accounts" and create one.
4.  **Get the Key:** Click on your new account > "Keys" > "Add Key" > "Create New Key" > "JSON".
5.  **Save it:** A file will download. Move it to your project folder and name it `gsc-credentials.json`.

**Important:** Never share this file or upload it to GitHub. It’s your robot’s private password.

## Step 2: Give the Robot Permission

Now, you need to tell Google that this robot is allowed to see your data.

1.  Go to your **[Search Console Settings](https://search.google.com/search-console/settings/users)**.
2.  Click **Add User**.
3.  Paste the `client_email` from your `gsc-credentials.json` file.
4.  Set the permission to **Full**.

## Step 3: The Script

We’ll use a simple script to talk to the API. Don't worry about the code—you can just copy/paste this into a file named `fetch-search.js`.

```bash
npm install googleapis
```

```javascript
const { google } = require('googleapis');
const path = require('path');

// Change these to your site's details
const PROPERTY_URL = 'sc-domain:yourdomain.com'; // Use 'sc-domain:' for domain properties
const KEY_FILE_PATH = path.join(process.cwd(), 'gsc-credentials.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function getTopQueries() {
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  // GSC data usually has a 3-day delay
  const date = new Date();
  date.setDate(date.getDate() - 3); 
  const dateString = date.toISOString().split('T')[0];

  const response = await searchconsole.searchanalytics.query({
    siteUrl: PROPERTY_URL,
    requestBody: {
      startDate: dateString,
      endDate: dateString,
      dimensions: ['query'],
      rowLimit: 10,
    },
  });

  console.log(`\n🚀 TOP SEARCHES FOR ${dateString}:`);
  console.table(response.data.rows.map(row => ({
    Keyword: row.keys[0],
    Clicks: row.clicks,
    Impressions: row.impressions,
    Position: row.position.toFixed(1)
  })));
}

getTopQueries();
```

## The "Tinkerer" Nuances

*   **The 3-Day Delay**: Search Console isn't "live." If you try to fetch data from today or yesterday, you’ll get zero results. Aim for 3-4 days ago.
*   **The `sc-domain:` Prefix**: If you are using a Domain Property in GSC, the API needs you to write it exactly as `sc-domain:yourdomain.com`.

## Why This Wins

By turning your SEO data into a script, you stop being a "dashboard checker" and start being a "builder." You can now send these keywords to an AI to brainstorm new blog post ideas, or have them emailed to you every Monday morning automatically.

SEO isn't about looking at graphs; it's about acting on data. Automation just makes that action faster.
