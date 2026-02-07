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

### 2. Capture Screenshots
For approved tools, use the screenshot engine.

```bash
node scripts/capture-screenshot.js "https://tool-url.com" "tool-slug.png"
```

*   **Config**: The engine automatically handles cropping for Twitter (X), LinkedIn, and GitHub.
*   **Output**: Saved to `public/screenshots/`.

### 3. Merge & Update
If the user approves adding them to the database:
```bash
python3 scripts/merge_tools_csv.py
```

## Tips
*   Always check the `latest_submissions.csv` timestamp to find tools submitted after the last update.
*   If a tool name contains titles like "Dr" or "Coach," or if it's a University/Mega-Corp, flag it for the user as per the project's QC rules.