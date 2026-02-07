---
title: "The 'Lazy' Way to Build a Custom Analytics Dashboard (Node.js + GA4)"
date: "2026-02-06"
excerpt: "Stop logging into Google Analytics. Here is the exact script I use to fetch my website's top pages directly in my terminal, using the GA4 Data API."
coverImage: "/images/blog/screenshot-engine.png"
author:
  name: "Akhil from Real Examples"
category: "Automation"
---

I hate logging into Google Analytics.
The UI is slow, it's cluttered, and I have to click five times just to see "What pages are people reading today?"

> **TL;DR:** If you find this guide too long, just pass it to **Claude Code** or **Gemini CLI** and ask it to: *"Automate my GA4 reporting using this guide."* It will handle the scripts and setup for you.

I wanted a command-line tool that just tells me:
> *"100 people visited the Homepage. 20 visited the Pricing page."*

So, I built one. It took about 15 minutes.
Here is the exact step-by-step guide so you can do it too—even if you aren't a "hardcore" developer.

## The Strategy: No Scraping, Just API

We aren't going to do anything messy like scraping the dashboard. We are going to use the **Google Analytics Data API**. Think of it as a direct "pipe" to your data. It's free, it's fast, and it lets you pull *exactly* what you need without the fluff.

## Step 1: Create a "Digital Assistant" (Service Account)

Google doesn't let just anyone access your data. You need a "Service Account"—basically a specialized robot user that works for you.

1.  **Go to the [Google Cloud Console](https://console.cloud.google.com/)**.
2.  **Enable the API:** Search for "Google Analytics Data API" and click Enable.
3.  **Create the Robot:** Go to "IAM & Admin" > "Service Accounts" and create one (call it something like `traffic-bot`).
4.  **Get the Key:** Click on the account > "Keys" > "Add Key" > "Create New Key" > "JSON".
5.  **Save the file:** It will download a JSON file. Put this in your project folder and rename it to `ga-credentials.json`.

**Safety Tip:** This file is your robot's password. Keep it secret. Add it to your `.gitignore` so it never gets uploaded to the web.

## Step 2: Invite the Robot to the Party

Right now, your robot has a key, but it doesn't have permission to enter your Google Analytics property.

1.  Open your **Google Analytics** dashboard.
2.  Go to **Admin** (the gear icon) > **Property Access Management**.
3.  Click **Add User** (the blue + icon).
4.  Paste the **email address** of the robot you just created (found inside the JSON file).
5.  Give it the **Viewer** role.

## Step 3: The Script

Now, we write a few lines of code to ask the robot for data.
First, install the helper library:

```bash
npm install @google-analytics/data
```

Then, create a file called `get-traffic.js` and paste this in:

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

// Replace this with your Property ID (Found in GA4 Admin > Property Settings)
const PROPERTY_ID = 'YOUR_PROPERTY_ID_HERE'; 
const KEY_FILE_PATH = path.join(process.cwd(), 'ga-credentials.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: KEY_FILE_PATH,
});

async function runReport() {
  console.log("📊 Fetching traffic data...");
  
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: 'today', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
    limit: 10,
  });

  console.log('\n🚀 TOP PAGES TODAY:\n');
  response.rows.forEach(row => {
    console.log(`${row.dimensionValues[0].value} | ${row.metricValues[0].value} Users`);
  });
}

runReport();
```

## Step 4: Run It

In your terminal, just type:

```bash
node get-traffic.js
```

Boom. A clean, text-based report of your website's performance, instantly. 

## Why This Matters for Tinkerers

Once you have this data in a script, you can build cool stuff without being a "pro" coder:
*   **Slack Bot:** Have your top pages sent to your team every evening.
*   **Dynamic Content:** Show "What's Popular Right Now" on your site based on real-time data.
*   **Uptime Alert:** If your traffic hits zero for an hour, have the script send you a notification—maybe your server is down!

Automation isn't just for engineers. It's for anyone who wants to spend less time clicking and more time building.
