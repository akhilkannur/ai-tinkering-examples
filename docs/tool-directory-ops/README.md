# AI Tool Directory Operations Guide

This guide outlines the process for managing tool submissions, verifying content, and notifying users via the Resend API.

## Workflow Overview

1.  **Add New Tools**: Update `lib/ai-tools-data.ts` with new submissions from `tools_submissions.csv`.
2.  **Verify & Clean**: Ensure descriptions are not truncated and represent the tool accurately. Use `web_fetch` to find missing descriptions.
3.  **Cross-Check**: Run the verification script to ensure all tools marked for emailing are actually live.
4.  **Send Emails**: Batch notify users that their tool is live.

---

## 1. Adding Tools
When a new submission arrives in `tools_submissions.csv`:
- Open `lib/ai-tools-data.ts`.
- Add a new object to the `aiTools` array.
- **Rule**: If the name looks like a URL (e.g., `https://example.com`), clean it to a brand name (e.g., `Example`).

## 2. Scripts Location
The scripts are located in `docs/tool-directory-ops/`:
- `generate_email_sample.py`: Preview the email for a specific tool.
- `verify_tools_list.py`: Check for discrepancies between the CSV and the live site.
- `send_emails.py`: The main sending script (includes Resend API logic).

## 3. Sending Notifications
To send emails to new tools:
1.  Open `docs/tool-directory-ops/send_emails.py`.
2.  Update the `ALREADY_SENT` set if needed (optional, the script checks against `lib/ai-tools-data.ts` anyway).
3.  Update the `cutoff_date` if you only want to send to the most recent submissions.
4.  Run the script:
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
