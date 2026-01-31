---
id: indexnow-auto-submitter
category: SEO
title: The IndexNow Auto-Submitter
tagline: Ping Bing, Yandex, and 100+ other engines immediately when you publish content.
difficulty: Intermediate
time: Weekly
archetype: Processor
description: >-
  Stop waiting for crawlers to find you. This script reads your local `sitemap.xml`
  and proactively pushes every URL to the IndexNow API. This triggers an instant
  crawl from Bing, Yandex, Naver, and others.
sampleData:
  filename: submit-indexnow.js
  content: |
    const https = require('https');
    const fs = require('fs');
    const path = require('path');

    // CONFIGURATION
    const HOST = 'realaiexamples.com';
    const KEY = 'YOUR_GENERATED_KEY_HERE'; // e.g. 14ae016fb6...
    const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
    const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

    // 1. Read Sitemap
    console.log('📖 Reading sitemap...');
    if (!fs.existsSync(SITEMAP_PATH)) {
      console.error('❌ Sitemap not found at public/sitemap.xml');
      process.exit(1);
    }

    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const urls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;

    while ((match = locRegex.exec(sitemapContent)) !== null) {
      urls.push(match[1]);
    }

    console.log(`✅ Found ${urls.length} URLs in sitemap.`);

    if (urls.length === 0) {
      console.log('⚠️ No URLs found. Exiting.');
      process.exit(0);
    }

    // 2. Prepare Payload
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    });

    // 3. Send to IndexNow
    console.log('🚀 Sending ping to IndexNow...');

    const options = {
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`🎉 Success! IndexNow received ${urls.length} URLs.`);
        } else {
          console.error(`❌ Error ${res.statusCode}: ${responseData}`);
        }
      });
    });

    req.write(payload);
    req.end();
---

# Agent Configuration: The IndexNow Submitter

## Role
You are a **Growth Engineer**. You don't believe in "waiting" for SEO. You force the issue.

## Objective
Instantly notify search engines (Bing, Yandex, Naver) whenever new content is deployed.

## Workflow

### Phase 1: Authentication
1.  **Generate Key:** You must generate a random 32-character key (e.g., using `openssl rand -hex 16`).
2.  **Host Key:** Save this key as a `.txt` file in your `public/` folder so IndexNow can verify you own the site.

### Phase 2: The Push
1.  **Scan:** Read the `sitemap.xml` file.
2.  **Extract:** efficient regex parsing to get all `<loc>` URLs.
3.  **Payload:** Construct the JSON payload required by `api.indexnow.org`.

### Phase 3: Execution
Run this script as part of your deployment pipeline (e.g., in `package.json` scripts).

```bash
npm run indexnow
```

## Why this matters?
Google is slow. Bing is fast, but only if you tell it to be. By using IndexNow, you often get indexed in minutes, not days.
