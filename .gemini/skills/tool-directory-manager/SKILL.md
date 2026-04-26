---
name: tool-directory-manager
description: Automates the lifecycle of the AI tools directory. It fetches new submissions from Google Sheets, summarizes them for approval, and triggers the screenshot engine for approved tools.
---

# Tool Directory Manager

This skill manages the intake and visual processing of new AI tools submitted to the directory.

## Workflow

### 1. Fetch & Summarize Submissions
Run this to see what's new. It fetches the live CSV directly from Google Sheets.

```bash
curl -L "https://docs.google.com/spreadsheets/d/1VL4dAgyQK8EZLo6WqZeQ0zOmsCQcxQLhixmFtsJWC3A/export?format=csv" > latest_submissions.csv && python3 scripts/check_new_submissions.py
```

*   **Policy**: You MUST present the summarized list of new tools to the user and ask for approval (or which ones to include) before proceeding to the next step.

### 2. Enrichment & Capture
For each approved tool, do not rely solely on the submission. You MUST visit the live site to extract high-quality data.

```bash
# Visit site, scrape content, and capture local screenshot (unlimited)
node scripts/enrich-batch.js
```

*   **Scraping Policy**: Extract the meta description, headers, and body text to understand the real value proposition.
*   **Enrichment**: Based on the scrape, generate:
    *   **4 Key Features**: Actionable, benefit-driven bullet points.
    *   **Pricing Details**: Identify if it's Free, Freemium, or Paid with specific tiers if visible.
    *   **Integrations**: List specific platforms/APIs the tool works with.
*   **Visuals**: Capture a high-res WebP screenshot locally to `public/screenshots/`. NO Microlink required.

### 3. Merge & Update
Generate the TypeScript object for `lib/ai-tools-data.ts`. Ensure the `slugify` logic matches (dots to dashes).



### 4. Notify Submitters

After merging, notify the submitters that their tool is live.



```bash

RESEND_API_KEY=$(grep RESEND_API_KEY .env.local | cut -d'=' -f2 | tr -d '"') python3 docs/tool-directory-ops/send_emails.py

```



*   **Email Copy Policy**: Use a direct, conversational, and "human" tone. Acknowledge that the tool was submitted and that it has been handpicked for the directory section of Real AI Examples.

*   **Approval**: You MUST show the exact email copy to the user for approval before running the script.

*   **Verification**: Always confirm exactly which emails the script will send to before execution.

*   **Cleanup**: After a successful run, update the `ALREADY_SENT` list in `docs/tool-directory-ops/send_emails.py` with the new emails and push to `main`.



## Tips

*   Always check the `latest_submissions.csv` timestamp to find tools submitted after the last update.

*   The site is primarily a library of practical AI blueprints; the directory is a section to feature handpicked tools that help people get practical work done.

*   If a tool name contains titles like "Dr" or "Coach," or if it's a University/Mega-Corp, flag it for the user as per the project's QC rules.

*   Never use "AI slop" or overhyped marketing language in communications.
