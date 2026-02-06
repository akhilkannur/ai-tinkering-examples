---
title: "The 'Lazy' Way to Build a Custom Analytics Dashboard (Node.js + GA4)"
date: "2026-02-06"
excerpt: "Stop logging into Google Analytics. Here is the exact script I use to fetch my website's top pages directly in my terminal, using the GA4 Data API."
coverImage: "/images/blog/screenshot-engine.png"
author:
  name: "Akhil from Real Examples"
category: "Engineering"
---

I hate logging into Google Analytics.
The UI is slow, it's cluttered, and I have to click five times just to see "What pages are people reading today?"

I wanted a command-line tool that just tells me:
> *"100 people visited the Homepage. 20 visited the Pricing page."*

So, I built one. It took about 15 minutes.
Here is the exact step-by-step guide so you can do it too.

## The Strategy

We aren't going to scrape the dashboard. We are going to use the **Google Analytics Data API**.
It's free, it's fast, and it lets you pull *exactly* the data you want.

## Step 1: Create a "Service Robot"

Google doesn't let just anyone access your data. You need a "Service Account" (basically a robot user).

1.  Go to the **[Google Cloud Console](https://console.cloud.google.com/)**.
2.  Create a new project (or select an existing one).
3.  Search for **"Google Analytics Data API"** in the library and click **Enable**.
4.  Go to **IAM & Admin > Service Accounts**.
5.  Click **Create Service Account**. Give it a name (like `ga-reader`).
6.  Once created, click on the email address > **Keys** > **Add Key** > **Create New Key** > **JSON**.
7.  A file will download. **Save this file.** This is your key. Rename it to `ga-credentials.json`.

**Safety Tip:** If you are using Git, add `ga-credentials.json` to your `.gitignore` file immediately. Do not push this to GitHub.

## Step 2: Invite the Robot

Right now, your robot has a key, but it doesn't have permission to enter your house.

1.  Open your **Google Analytics** dashboard.
2.  Go to **Admin** (Gear Icon) > **Property Access Management**.
3.  Click **Add User**.
4.  Paste the **email address** of the Service Account you just created (it looks like `ga-reader@project-name.iam.gserviceaccount.com`).
5.  Give it the **Viewer** role.

## Step 3: The Script

Now, we write the code.
You need the `@google-analytics/data` package.

```bash
npm install @google-analytics/data
```

Here is the script `test-ga4.js`:

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
    dateRanges: [
      {
        startDate: 'today', // Magic keyword
        endDate: 'today',
      },
    ],
    dimensions: [
      { name: 'pagePath' }, // What pages?
    ],
    metrics: [
      { name: 'activeUsers' }, // How many people?
      { name: 'screenPageViews' } // How many views?
    ],
    limit: 10,
  });

  console.log('
🚀 TOP PAGES TODAY:
');
  response.rows.forEach(row => {
    console.log(`${row.dimensionValues[0].value} | ${row.metricValues[0].value} Users`);
  });
}

runReport();
```

## Step 4: Run It

In your terminal:

```bash
node test-ga4.js
```

Boom. A clean, text-based report of your website's performance, instantly. No loading screens, no complex dashboards. Just the data.

## Why This Matters

Once you have this data in code, you can do anything:
*   **Slack Bot:** Send a "Daily Digest" to your team channel.
*   **Dynamic Content:** Show "Trending Articles" on your homepage based on real-time views.
*   **Alerts:** Get a text message if traffic drops to zero (server down?).

Automation isn't just about saving clicks. It's about owning your data.
