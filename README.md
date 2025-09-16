# AI Tinkering Examples

Minimal Next.js + Airtable site for short, visual AI examples.

## Setup
1. Copy `.env.example` to `.env.local` and fill the Airtable values.
2. Create an Airtable base (table name matches NEXT_PUBLIC_AIRTABLE_TABLE or "Examples") with the schema described below.
3. `npm install`
4. `npm run dev`

## Airtable schema (table: Examples)
- Title (single line)
- Slug (single line) — optional
- Summary (long text)
- Screenshots (attachment) — 1–2 images
- Category (single select)
- Read time (number)
- Publish date (date)
- Workflow steps (long text)
- Original link (url)
- Tags (multiple select)
- Author name (single line)
- Author link (url)

## Deploy
Deploy to Vercel and add environment variables in Vercel dashboard. Set `REVALIDATE_SECRET` to protect `/api/revalidate`.
