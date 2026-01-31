# AI Tool Directory Operations Guide

This guide outlines the process for managing tool submissions, verifying content, and notifying users via the Resend API.

## Workflow Overview

1.  **Fetch Live Submissions**: The system fetches data directly from the [Google Sheet](https://docs.google.com/spreadsheets/d/1VL4dAgyQK8EZLo6WqZeQ0zOmsCQcxQLhixmFtsJWC3A/export?format=csv).
2.  **Add New Tools**: Update `lib/ai-tools-data.ts` with new submissions.
3.  **Resend Audience**: Approved users are automatically added to the "Tool submissions" Audience in Resend for future campaigns.
4.  **Send Emails**: notify users via HTML emails with tracking.

---

## 1. Adding Tools
When a new submission arrives:
- Run `check_new_submissions.py` to identify candidates (filters out already sent and rejected).
- Add to `lib/ai-tools-data.ts`.

## 2. Scripts Location
- `check_new_submissions.py`: Fetches live Google Sheet data and shows new candidates.
- `send_emails.py`: Fetches live data, sends HTML emails, and adds users to Resend Audience.
- `backfill_audience.py`: Utility to sync historical emails to the Resend Audience.
- `rejected_submissions.json`: List of emails to ignore (rejections).

## 3. Sending Notifications
The script now fetches the latest data automatically:
```bash
python3 docs/tool-directory-ops/send_emails.py
```

## 4. Email Template
**From**: `akhil@mail.realaiexamples.com`  
**Reply-To**: `akhil@realaiexamples.com`  
**Subject**: `{tool_name} is live on Real AI Examples`

**Content**:
> Hey there!
>
> I wanted to reach out because you submitted **{tool_name}** to the Tooling Around directory recently.
>
> Since Tooling Around is no longer being maintained, I have created a directory section in my new project, **Real AI Examples**, this week, which focuses on practical AI use cases. I hand-picked a few submissions that stood out, and yours made the cut.
>
> Your tool is now live at: https://realaiexamples.com/tools
>
> You don't need to do anything, but if you want to update any details or have questions, just reply to this email.
>
> Thanks,
> Akhil

## 5. Maintenance
- **Resend API Key**: Currently hardcoded in the scripts (`re_Jt7...`).
- **Domain Verification**: Ensure `mail.realaiexamples.com` is verified in the Resend dashboard.
