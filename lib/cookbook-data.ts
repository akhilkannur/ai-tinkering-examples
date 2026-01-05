import { 
  Globe, Database, Zap, Search, Shield, 
  BarChart, PenTool, Users, Briefcase, FileSpreadsheet, 
  Video, Calendar, Code, Terminal
} from 'lucide-react';

export type Category = 
  | 'Marketing Ops' 
  | 'Sales Intelligence' 
  | 'RevOps & Data' 
  | 'Content Engineering' 
  | 'Competitive Intel' 
  | 'Legal & Compliance' 
  | 'Executive Admin';

export interface Recipe {
  id: string;
  category: Category;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  description: string;
  blueprint: string;
}

export const recipes: Recipe[] = [
  // --- SALES INTELLIGENCE (Real Enrichment) ---
  {
    id: 'prospect-dossier',
    category: 'Sales Intelligence',
    title: "The 'Due Diligence' Dossier",
    tagline: "Generate a 1-page PDF briefing on any company.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Input a domain (e.g., 'stripe.com'). The script crawls their 'About', 'Team', and 'Pricing' pages, extracts executive names, pricing tiers, and office locations, and generates a formatted PDF briefing doc for your sales call.",
    blueprint: `# Blueprint: Executive Briefing Generator

## 1. Goal
Create a PDF one-pager summarizing a target company for a sales meeting.

## 2. Input
- A list of domains in 'targets.csv'.

## 3. The Logic Chain
1. **Crawl**: Visit homepage. Find links to "About", "Pricing", "Contact", "Team".
2. **Scrape**: 
   - Extract "Mission Statement" from About.
   - Extract "Pricing Tiers" ($ amounts) from Pricing.
   - Extract proper nouns (likely names) from Team.
3. **Enrich**: Use Python 'googlesearch-python' to find "[Company] CEO" and "[Company] HQ address".
4. **Synthesize**: Summarize scraped text into 3 bullet points per section.
5. **Output**: Use 'fpdf' to write a clean PDF with a header, sections, and the date.

## 4. Stack
- Python
- Libraries: 'crawl4ai' (or requests/bs4), 'fpdf', 'googlesearch-python'.
`
  },
  {
    id: 'technographic-profiler',
    category: 'Sales Intelligence',
    title: "The Technographic Profiler",
    tagline: "Reveal the tech stack of 100 leads.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Don't ask 'Do you use Shopify?'. Run this script on a CSV of domains. It scans their HTML headers and scripts to detect Stripe, HubSpot, Shopify, Segment, or React, and columns the results.",
    blueprint: `# Blueprint: Tech Stack Detector

## 1. Goal
Analyze a list of domains to identify what software they run (e.g., Analytics, eCommerce, CMS).

## 2. Input
- 'leads.csv' with a 'Domain' column.

## 3. The Logic Chain
1. **Define Signatures**: Create a dictionary of code snippets:
   - "shopify.com" -> Shopify
   - "hs-scripts" -> HubSpot
   - "stripe.js" -> Stripe
   - "fbevents.js" -> Facebook Pixel
2. **Batch Request**: Async fetch the HTML source of 50 sites concurrently.
3. **Pattern Match**: Check each HTML file against the Signature Dictionary.
4. **Score**: Calculate a "Tech Sophistication Score" (count of tools).
5. **Output**: Append columns 'Has_Stripe', 'Has_HubSpot', 'Tech_Score' to the CSV.

## 4. Stack
- Python
- Libraries: 'aiohttp' (for speed), 'pandas'.
`
  },
  {
    id: 'fuzzy-lead-matcher',
    category: 'RevOps & Data',
    title: "The CRM 'Launderer'",
    tagline: "Merge Salesforce & HubSpot lists with fuzzy matching.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "You have 'Acme Inc' in one file and 'Acme Corp' in another. Excel VLOOKUP fails. This script uses 'FuzzyWuzzy' string matching to identify duplicates with >90% similarity and merges their data history.",
    blueprint: `# Blueprint: Fuzzy CRM Deduplicator

## 1. Goal
Merge two dirty CSVs where company names don't match exactly.

## 2. Input
- 'salesforce_export.csv' (Master)
- 'hubspot_export.csv' (New Leads)

## 3. The Logic Chain
1. **Pre-clean**: Normalize names (lowercase, remove 'inc', 'ltd', 'co', punctuation).
2. **Block**: Group companies by the first 2 letters to avoid comparing everyone vs everyone (efficiency).
3. **Fuzzy Match**: Run 'Levenshtein Distance' on names in the same block.
4. **Threshold**: If match score > 85/100 -> Flag as Match.
5. **Merge**: If Match, fill missing email/phone from HubSpot into Salesforce record. If No Match, append as new row.
6. **Report**: Generate 'conflicts.csv' for rows where emails differ for the same matched company.

## 4. Stack
- Python
- Libraries: 'pandas', 'thefuzz' (or fuzzywuzzy).
`
  },

  // --- CONTENT ENGINEERING (Pipeline Automation) ---
  {
    id: 'video-content-slicer',
    category: 'Content Engineering',
    title: "The Webinar Slicer",
    tagline: "Extract viral clips from a 60min Zoom recording.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Feed it a video file and a VTT transcript. It analyzes the transcript for 'high energy' moments (keywords, laughter, questions), finds the timestamps, and uses FFMPEG to physically cut the video into 3-5 short clips for social media.",
    blueprint: `# Blueprint: Automated Video Clipper

## 1. Goal
Cut long-form video into social clips based on transcript keywords.

## 2. Input
- 'webinar.mp4'
- 'transcript.vtt'

## 3. The Logic Chain
1. **Parse VTT**: Read transcript into objects {start_time, end_time, text}.
2. **Sentiment Analysis**: Score each sentence for "virality" (keywords: "secret", "mistake", "hack", "revenue").
3. **Cluster**: Find 30-60 second windows with high scores.
4. **Cut**: Construct an FFMPEG command to slice the video at those timestamps (with 2sec buffer).
5. **Transcode**: Save clips as 'Clip_1_TopicName.mp4' optimized for mobile (vertical crop if possible, or center).

## 4. Stack
- Python
- Libraries: 'moviepy' (wrapper for ffmpeg), 'webvtt-py'.
`
  },
  {
    id: 'seo-content-audit',
    category: 'Content Engineering',
    title: "The 'Rotting Content' Finder",
    tagline: "Find blogs losing traffic and suggest updates.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Connects to Google Search Console (via CSV export). Identifies pages that have dropped >20% in impressions. Scrapes the current page content, checks if dates are old (e.g., '2023'), and outputs a prioritized 'To-Update' list.",
    blueprint: `# Blueprint: Content Decay Auditor

## 1. Goal
Identify SEO articles that are losing rank and need a refresh.

## 2. Input
- 'gsc_data.csv' (Export from Google Search Console: Date, Page, Impressions).

## 3. The Logic Chain
1. **Trend Analysis**: Calculate the slope of impressions over the last 90 days for each URL.
2. **Filter**: Isolate URLs with negative slope (decay).
3. **Scrape**: Visit the decaying URLs.
4. **Check Freshness**: Look for old years (CurrentYear - 1, CurrentYear - 2) in the <title> or <h1>.
5. **Prioritize**: Sort by (High Traffic Volume * High Decay Rate).
6. **Output**: 'Action_Plan.csv' with columns: URL, Decay_Rate, Has_Old_Year.

## 4. Stack
- Python
- Libraries: 'pandas', 'requests', 'beautifulsoup4'.
`
  },

  // --- COMPETITIVE INTEL (Active Monitoring) ---
  {
    id: 'pricing-page-diff',
    category: 'Competitive Intel',
    title: "The 'Visual Diff' Watchtower",
    tagline: "Screenshot and highlight competitor changes.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Text scrapers miss layout changes. This tool uses a headless browser (Playwright) to take a full-page screenshot of a competitor's pricing page, overlays it with yesterday's screenshot, and creates a 'Heatmap' image showing exactly what changed.",
    blueprint: `# Blueprint: Visual Regression Monitor

## 1. Goal
Detect subtle changes in competitor pricing/landing pages using screenshots.

## 2. Input
- List of URLs.

## 3. The Logic Chain
1. **Headless Browse**: Launch Playwright (chromium). Visit URL.
2. **Screenshot**: Capture full-page png. Save as 'today.png'.
3. **Compare**: Load 'yesterday.png'. Use 'ImageChops.difference' (PIL) to find changed pixels.
4. **Threshold**: If changed pixels > 1% of total area:
   - Draw a red rectangle around the changed area.
   - Save 'diff_alert.png'.
5. **Notify**: (Optional) Send an email/Slack webhook with the image.

## 4. Stack
- Python
- Libraries: 'playwright', 'Pillow' (PIL), 'numpy'.
`
  },
  {
    id: 'ad-library-scraper',
    category: 'Competitive Intel',
    title: "Ad Library Archiver",
    tagline: "Build a swipe file of competitor ads.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Monitors the Facebook/LinkedIn Ad Library page for a specific brand. When new cards appear, it downloads the image/video and saves the copy to a local Markdown swipe file.",
    blueprint: `# Blueprint: Ad Creative Archiver

## 1. Goal
Auto-save competitor ad creatives to a local folder.

## 2. Input
- URL to Competitor's FB Ad Library page.

## 3. The Logic Chain
1. **Scroll & Load**: Use Selenium/Playwright to scroll the infinite load page.
2. **Identify Cards**: Find ad container elements.
3. **Dedupe**: Check ad ID against 'downloaded_ads.db' (sqlite or text file).
4. **Download**: 
   - Save image to /swipes/images/.
   - Save text to /swipes/copy.txt.
5. **Metadata**: Save date_first_seen.

## 4. Stack
- Python
- Libraries: 'selenium' (needed for dynamic js loading).
`
  },

  // --- MARKETING OPS (Efficiency) ---
  {
    id: 'campaign-taxonomy-validator',
    category: 'Marketing Ops',
    title: "Campaign Taxonomy Police",
    tagline: "Reject bad UTMs before they go live.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Reads a CSV of planned social posts. Validates every link against a strict regex schema (e.g., must be 'social-linkedin-q3'). Checks if the landing page actually exists (200 OK). Outputs a 'Pass/Fail' report.",
    blueprint: `# Blueprint: UTM Governance Validator

## 1. Goal
Ensure all marketing links follow strict naming conventions and are valid.

## 2. Input
- 'campaign_calendar.csv' (Cols: Post_Date, Destination_URL).

## 3. The Logic Chain
1. **Parse URLs**: Extract utm_source, utm_medium, utm_campaign.
2. **Validate Logic**:
   - Source must be in ['linkedin', 'twitter', 'facebook'].
   - Medium must be in ['cpc', 'organic'].
   - Campaign must start with '202X-'.
3. **Live Check**: HEAD request the full URL to ensure no 404s.
4. **Report**: Create 'validation_errors.csv' listing specific violations (e.g., "Row 4: Invalid Source 'ig'").

## 4. Stack
- Python
- Libraries: 'pandas', 'urllib'.
`
  },

  // --- LEGAL & COMPLIANCE ---
  {
    id: 'pii-redactor',
    category: 'Legal & Compliance',
    title: "The PII Redactor",
    tagline: "Scrub credit cards/SSNs from customer logs.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "You have a messy support chat log dump. Before sharing it with an agency, run this script. It uses regex patterns to identify phone numbers, emails, and credit card patterns and replaces them with [REDACTED].",
    blueprint: `# Blueprint: Bulk PII Scrubber

## 1. Goal
Anonymize a dataset by removing sensitive info.

## 2. Input
- Folder of text/csv logs.

## 3. The Logic Chain
1. **Define Patterns**: Compile regex for:
   - Email
   - Phone (E.164 and local)
   - Credit Card (Luhn algorithm check ideally, or basic 16-digit)
   - SSN
2. **Stream Process**: Read files line-by-line (to handle large files).
3. **Replace**: sub() matches with '***'.
4. **Audit**: Output a count of redactions ("Removed 450 emails, 12 CCs").
5. **Save**: Write to '/clean_logs/'.

## 4. Stack
- Python
- Libraries: 're' (regex).
`
  },

  // --- EXECUTIVE ADMIN ---
  {
    id: 'inbox-triage-bot',
    category: 'Executive Admin',
    title: "The 'Zero Inbox' Triage Bot",
    tagline: "Draft replies to recurring emails.",
    difficulty: 'Advanced',
    time: '45 mins',
    description: "Connects to Gmail via API. Reads unread emails. Classifies them (e.g., 'Newsletter', 'Sales Pitch', 'Urgent Team'). Archives the junk. Drafts a generic 'Not interested' reply for sales pitches. Leaves the urgent stuff for you.",
    blueprint: `# Blueprint: AI Email Triage

## 1. Goal
Auto-label and draft replies for Gmail.

## 2. Input
- Gmail API credentials.

## 3. The Logic Chain
1. **Fetch**: Get unread messages (snippet, sender, subject).
2. **Classify**: (Rule-based or simple keywords)
   - "unsubscribe" -> Newsletter -> Label 'Low Priority'
   - "demo", "synergy" -> Sales Pitch -> Label 'Sales' -> Draft "No thanks" reply.
   - Domain matches '@mycompany.com' -> Label 'Internal'.
3. **Action**: Apply labels via API. Create drafts.
4. **Safety**: Do NOT send. Only draft.

## 4. Stack
- Python
- Libraries: 'google-api-python-client', 'base64'.
`
  },
  {
    id: 'calendar-audit',
    category: 'Executive Admin',
    title: "The Calendar Auditor",
    tagline: "Visualize where your time actually goes.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Exports your Google Calendar. Categorizes meetings by attendee domain (Internal vs External) and Duration. Generates a pie chart: '30% Recruiting', '50% Internal Status', '20% Deep Work'.",
    blueprint: `# Blueprint: Time Audit Visualization

## 1. Goal
Analyze calendar ics/export to see time allocation.

## 2. Input
- 'calendar.ics' file.

## 3. The Logic Chain
1. **Parse ICS**: Iterate events. Extract Duration, Attendees, Subject.
2. **Tag**:
   - If > 3 attendees: "Large Meeting"
   - If attendee domain != mydomain: "External/Sales"
   - If Subject contains "1:1": "Management"
3. **Aggregte**: Sum hours per category.
4. **Visualize**: Generate a Pie Chart using matplotlib.
5. **Insight**: Calculate "Context Switching Cost" (number of <30min gaps between meetings).

## 4. Stack
- Python
- Libraries: 'ics', 'matplotlib', 'pandas'.
`
  },
  
  // --- REVOPS ---
  {
    id: 'territory-mapper',
    category: 'RevOps & Data',
    title: "Territory Mapper",
    tagline: "Assign leads to sales reps by zip code.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Takes a list of 10,000 leads with Zip Codes. Maps them to Sales Rep territories (defined in a separate mapping CSV). appends 'Owner_Email' to the lead list.",
    blueprint: `# Blueprint: Zip-to-Territory Mapper

## 1. Goal
Assign leads to owners based on geography.

## 2. Input
- 'leads.csv' (Lead_ID, Zip)
- 'territories.csv' (Zip_Start, Zip_End, Rep_Name)

## 3. The Logic Chain
1. **Load Map**: Read territories. Because zips are ranges, sorting is key.
2. **Optimize**: Use Python's 'bisect' module for fast range lookups (O(log n)) instead of iterating all territories for every lead.
3. **Assign**:
   - For each lead zip, find the territory range it falls into.
   - Assign Rep.
4. **Fallback**: If no match, assign "Round Robin Queue".
5. **Export**: 'assigned_leads.csv'.

## 4. Stack
- Python
- Libraries: 'pandas', 'bisect'.
`
  },
  
  // --- NEW PRO RECIPES ---
  {
    id: 'linkedin-profile-parser',
    category: 'Sales Intelligence',
    title: "LinkedIn Profile Parser",
    tagline: "Turn Profile URLs into JSON resume data.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Uses a scraper to visit public LinkedIn profiles and extract: Current Title, Company, Duration, and About section into a structured format for your CRM.",
    blueprint: "# Blueprint: LinkedIn Parser\n\nGoal: Structurize profile data.\n\nStack: Python, Selenium (Login required)\n\nLogic:\n1. Log in to LinkedIn (cookies).\n2. Visit URL.\n3. Extract 'experience-section'.\n4. Parse 'Job Title' and 'Company Name'.\n5. Save to JSON."
  },
  {
    id: 'contract-clause-extractor',
    category: 'Legal & Compliance',
    title: "Clause Hunter",
    tagline: "Find 'Indemnification' in 50 PDFs.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Don't open every contract. This script scans a folder of PDF agreements, OCRs them if needed, and extracts every paragraph containing specific legal keywords.",
    blueprint: "# Blueprint: Clause Search\n\nGoal: Extract legal clauses.\n\nStack: Python, pypdf, regex\n\nLogic:\n1. Keyword List: ['indemnification', 'liability', 'termination'].\n2. Loop PDFs.\n3. Extract text.\n4. Regex match paragraph containing keyword.\n5. Export: 'File | Clause Type | Text Snippet'."
  },
  {
    id: 'maps-lead-miner',
    category: 'Sales Intelligence',
    title: "G-Maps Lead Miner",
    tagline: "Scrape local businesses (Plumbers in Austin).",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Automates Google Maps search to build a lead list. Extracts: Business Name, Phone, Website, and Rating.",
    blueprint: "# Blueprint: Maps Scraper\n\nGoal: Build local lead list.\n\nStack: Python, Playwright\n\nLogic:\n1. Input: Search Term ('Plumbers in Austin').\n2. Visit Maps.\n3. Scroll sidebar to load results.\n4. Click each result to reveal Phone/Website.\n5. Save to CSV."
  },
  {
    id: 'screenshot-reporter',
    category: 'Marketing Ops',
    title: "Batch Screenshotter",
    tagline: "Turn a URL list into a visual PDF report.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Great for verifying ad placements or landing pages. Visits 50 URLs, captures full-page screenshots, and compiles them into a single PDF with timestamps.",
    blueprint: "# Blueprint: Visual Report\n\nGoal: Evidence of placement.\n\nStack: Python, Playwright, FPDF\n\nLogic:\n1. Read URLs.\n2. Screenshot each (headless).\n3. Resize images.\n4. Add to PDF page with URL label.\n5. Export 'Verification_Report.pdf'."
  },
  {
    id: 'action-item-extractor',
    category: 'Executive Admin',
    title: "The 'Action Item' Hunter",
    tagline: "Extract tasks from meeting transcripts.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Reads a Zoom/Teams transcript (VTT). Uses regex/NLP to find phrases like 'I will', 'can you', 'let's', and 'action item', then lists them by Speaker.",
    blueprint: "# Blueprint: Task Extractor\n\nGoal: Find commitments.\n\nStack: Python, regex (or API for NLP)\n\nLogic:\n1. Parse VTT (Time, Speaker, Text).\n2. Filter sentences starting with ['I will', 'I'll', 'Todo'].\n3. Group by Speaker.\n4. Output 'Action_Plan.txt'."
  },
  {
    id: 'broken-backlink-finder',
    category: 'Content Engineering',
    title: "Broken Backlink Reclaimer",
    tagline: "Find 404s that have inbound links.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Combines a crawl of your site (to find 404s) with an Ahrefs/Semrush export (to find links). Identifies 'High Value' 404s that are wasting SEO juice.",
    blueprint: "# Blueprint: Link Reclaimer\n\nGoal: Fix broken equity.\n\nStack: Python, pandas\n\nLogic:\n1. Input: 'site_crawl.csv' (Status Codes), 'backlinks.csv' (External Links).\n2. Filter Crawl for 404s.\n3. Match against Backlink target URLs.\n4. Sum 'Domain Authority' of lost links.\n5. Sort by impact."
  },
  {
    id: 'logo-grabber',
    category: 'Marketing Ops',
    title: "High-Res Logo Fetcher",
    tagline: "Get vector logos for a client list.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Takes a domain list. Tries to find 'logo.svg' or high-res PNGs from the homepage metadata (og:image) or Clearbit's free Logo API.",
    blueprint: "# Blueprint: Asset Fetcher\n\nGoal: Download logos.\n\nStack: Python, requests\n\nLogic:\n1. Try Clearbit API (logo.clearbit.com/domain).\n2. Fallback: Scrape Homepage <link rel='icon'> or <meta property='og:image'>.\n3. Save to '/logos/domain.png'."
  },
  {
    id: 'podcast-guest-finder',
    category: 'Content Engineering',
    title: "Podcast Guest Scout",
    tagline: "Find guests who match a topic.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Searches podcast directories for episodes with titles like 'Founder of [Keyword]'. Extracts the guest name from the title to build an outreach list.",
    blueprint: "# Blueprint: Guest Scout\n\nGoal: Outreach list.\n\nStack: Python, requests (iTunes Search API)\n\nLogic:\n1. Query API for 'AI Founder'.\n2. Iterate Results.\n3. Regex parse Title ('...with John Doe').\n4. Dedupe names.\n5. Export."
  },
  {
    id: 'conference-matcher',
    category: 'Sales Intelligence',
    title: "Conference Attendee Matcher",
    tagline: "Match nametags to LinkedIn profiles.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Input a list of names/companies from a conference app. Script searches Google/LinkedIn to find their Profile URL and current Title.",
    blueprint: "# Blueprint: Event Lead Enrich\n\nGoal: Add LinkedIn URLs.\n\nStack: Python, googlesearch-python\n\nLogic:\n1. Read 'names.csv'.\n2. Query: 'site:linkedin.com/in/ [Name] [Company]'.\n3. Take top result.\n4. Sleep 2s (avoid rate limit).\n5. Save URL."
  },
  {
    id: 'slack-standup-bot',
    category: 'RevOps & Data',
    title: "Auto-Standup Bot",
    tagline: "Post Git activity to Slack.",
    difficulty: 'Intermediate',
    time: '25 mins',
    description: "Why type 'I fixed a bug'? This script reads your Git log for the last 24h, summarizes commits using an LLM (optional) or simple list, and posts it to #daily-standup.",
    blueprint: "# Blueprint: Git-to-Slack\n\nGoal: Auto-status.\n\nStack: Python, gitpython, requests\n\nLogic:\n1. Repo.iter_commits(since='24h').\n2. Format messages.\n3. Post to Slack Webhook URL."
  },
  {
    id: 'image-metadata-stripper',
    category: 'Marketing Ops',
    title: "EXIF Nuke",
    tagline: "Remove GPS/Camera data from images.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Privacy tool. Batch removes all metadata (EXIF) from a folder of photos before publishing.",
    blueprint: "# Blueprint: Metadata Cleaner\n\nGoal: Privacy.\n\nStack: Python, PIL\n\nLogic:\n1. Open Image.\n2. Create new Image (data=image.getdata()).\n3. Save without exif kwarg."
  },
  {
    id: 'sentiment-cloud-gen',
    category: 'Content Engineering',
    title: "Sentiment Word Cloud",
    tagline: "Visualize 'Angry' vs 'Happy' reviews.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Generates two word clouds from a CSV of reviews: one for 1-star reviews (red) and one for 5-star reviews (green).",
    blueprint: "# Blueprint: Dual WordCloud\n\nGoal: Visualize feedback.\n\nStack: Python, wordcloud, matplotlib\n\nLogic:\n1. Split CSV by Rating.\n2. Generate Cloud A (Negative).\n3. Generate Cloud B (Positive).\n4. Save images."
  },
  {
    id: 'pdf-table-extractor',
    category: 'RevOps & Data',
    title: "PDF Table Unlocker",
    tagline: "Convert PDF banking statements to CSV.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Uses 'pdfplumber' or 'camelot' to detect grid lines in a PDF and extract the data structure into an editable Excel file.",
    blueprint: "# Blueprint: Table Extract\n\nGoal: PDF to CSV.\n\nStack: Python, pdfplumber\n\nLogic:\n1. Open PDF.\n2. page.extract_table().\n3. Clean None values.\n4. DataFrame -> CSV."
  },
  {
    id: 'video-transcriber-local',
    category: 'Content Engineering',
    title: "Local Video Transcriber",
    tagline: "Free transcription using Whisper.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Uses OpenAI's open-source Whisper model to transcribe video files locally on your machine (no API cost).",
    blueprint: "# Blueprint: Local Whisper\n\nGoal: Free transcripts.\n\nStack: Python, openai-whisper\n\nLogic:\n1. Install ffmpeg.\n2. model = whisper.load_model('base').\n3. result = model.transcribe('video.mp4').\n4. Save result['text']."
  },
  {
    id: 'competitor-sitemap-tracker',
    category: 'Competitive Intel',
    title: "Competitor Page Launcher",
    tagline: "Alert when they publish new pages.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Checks a competitor's sitemap.xml daily. If a new URL appears (e.g., /blog/new-feature), sends you a Slack alert.",
    blueprint: "# Blueprint: New Page Alert\n\nGoal: Detect new content.\n\nStack: Python, requests\n\nLogic:\n1. Fetch sitemap.xml.\n2. Compare set(urls) with 'known_urls.txt'.\n3. Identify new_urls.\n4. Alert + Update file."
  }
];

export const categoryIcons: Record<Category, any> = {
  'Marketing Ops': Zap,
  'Sales Intelligence': Users,
  'RevOps & Data': Database,
  'Content Engineering': Video,
  'Competitive Intel': Shield,
  'Legal & Compliance': Shield,
  'Executive Admin': Briefcase
};