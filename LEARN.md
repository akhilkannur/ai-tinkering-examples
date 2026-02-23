# AI Agent Lessons Learned

This file tracks mistakes, constraints, and optimization patterns to ensure the AI agent continuously improves and avoids repeating errors.

## Technical Constraints
- **ask_user tool**: Maximum of 4 options allowed in the `options` array. For larger lists, use multiple calls or filtering.
- **CSV Parsing**: Shell tools like `awk` can fail on CSVs with embedded commas in fields (like descriptions). Use specialized parsers or manual line-by-step reading.

## SEO & Content Quality
- **Thin Content**: Google flags pages with empty or very short descriptions (e.g., `/tools/pngtostl`) as "Crawled - currently not indexed". Always ensure a minimum of 2-3 descriptive sentences.
- **Duplicate Content**: Avoid identical boilerplate structures across hundreds of dynamic pages (e.g., `/skills/*`). Each page needs unique phrasing or specific data points to be indexed reliably.
- **Sitemap Cleanliness**: Never include redirecting URLs (301/308) in the `sitemap.xml`. This triggers validation errors in Search Console.

## Workflow Preferences
- **Tool Directory**: Always fetch the live CSV from Google Sheets before processing.
- **Tool Logos**: Do NOT take screenshots of tool homepages. Use the Google Favicon API instead for tool logos: `https://www.google.com/s2/favicons?domain=TOOL_DOMAIN&sz=128`.
- **Summarization**: Provide a table-based summary of new tools for user verification before adding to the codebase.
- **Timestamp Cutoff**: After adding a batch of tools, manually update the `cutoff_date` in `scripts/check_new_submissions.py` and `docs/tool-directory-ops/send_emails.py` to the timestamp of the last tool added. This prevents duplicates in the next run.
