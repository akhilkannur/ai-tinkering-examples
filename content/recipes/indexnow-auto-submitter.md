---
id: indexnow-auto-submitter
category: SEO
title: The IndexNow Auto-Submitter
tagline: >-
  Ping Bing, Yandex, and 100+ other engines immediately when you publish
  content.
difficulty: Intermediate
time: Weekly
archetype: Processor
description: >-
  Stop waiting for crawlers to find you. This script reads your local
  `sitemap.xml` and proactively pushes every URL to the IndexNow API. This
  triggers an instant crawl from Bing, Yandex, Naver, and others.
sampleData:
  filename: submit-indexnow.js
  content: "const https = require('https');\nconst fs = require('fs');\nconst path = require('path');\n\n// CONFIGURATION\nconst HOST = 'realaiexamples.com';\nconst KEY = 'YOUR_GENERATED_KEY_HERE'; // e.g. 14ae016fb6...\nconst KEY_LOCATION = `https://${HOST}/${KEY}.txt`;\nconst SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');\n\n// 1. Read Sitemap\nconsole.log('\U0001F4D6 Reading sitemap...');\nif (!fs.existsSync(SITEMAP_PATH)) {\n  console.error('❌ Sitemap not found at public/sitemap.xml');\n  process.exit(1);\n}\n\nconst sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');\nconst urls = [];\nconst locRegex = /<loc>(.*?)<\\/loc>/g;\nlet match;\n\nwhile ((match = locRegex.exec(sitemapContent)) !== null) {\n  urls.push(match[1]);\n}\n\nconsole.log(`✅ Found ${urls.length} URLs in sitemap.`);\n\nif (urls.length === 0) {\n  console.log('⚠️ No URLs found. Exiting.');\n  process.exit(0);\n}\n\n// 2. Prepare Payload\nconst payload = JSON.stringify({\n  host: HOST,\n  key: KEY,\n  keyLocation: KEY_LOCATION,\n  urlList: urls\n});\n\n// 3. Send to IndexNow\nconsole.log('\U0001F680 Sending ping to IndexNow...');\n\nconst options = {\n  hostname: 'api.indexnow.org',\n  path: '/indexnow',\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json',\n    'Content-Length': payload.length\n  }\n};\n\nconst req = https.request(options, (res) => {\n  let responseData = '';\n  res.on('data', (chunk) => { responseData += chunk; });\n  res.on('end', () => {\n    if (res.statusCode >= 200 && res.statusCode < 300) {\n      console.log(`\U0001F389 Success! IndexNow received ${urls.length} URLs.`);\n    } else {\n      console.error(`❌ Error ${res.statusCode}: ${responseData}`);\n    }\n  });\n});\n\nreq.write(payload);\nreq.end();\n"
isPremium: true
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
