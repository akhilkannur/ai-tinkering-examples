import {
  Twitter, Globe, Database, Mail, Briefcase, FileSpreadsheet,
  Layout, GraduationCap, Image as ImageIcon, Video, Mic,
  Search, Shield, DollarSign, Calendar, MapPin,
  Smartphone, Code, Zap, BarChart, PenTool, Users
} from 'lucide-react';

export type Category =
  | 'Marketing'
  | 'Sales'
  | 'Operations'
  | 'Data'
  | 'Content'
  | 'Research'
  | 'Legal'
  | 'Productivity'
  | 'Web'
  | 'Finance';

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
  // --- MARKETING (1-12) ---
  {
    id: 'content-recycler',
    category: 'Marketing',
    title: "The Content Recycler",
    tagline: "Turn blog posts into tweets & LinkedIn posts.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Reads a text file and generates threaded tweets and LinkedIn formatting.",
    blueprint: "# Blueprint: Content Repurposer\n\nGoal: Turn 'source.txt' into social media formats.\n\nStack: Python\n\nLogic:\n1. Read source text.\n2. Extract 3 key points.\n3. Format Point 1 as Twitter Thread.\n4. Format Point 2 as LinkedIn Post.\n5. Save to 'socials.md'."
  },
  {
    id: 'utm-generator',
    category: 'Marketing',
    title: "The UTM Architect",
    tagline: "Bulk generate error-free tracking links.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Input a base URL and a list of sources; outputs a CSV of tagged URLs.",
    blueprint: "# Blueprint: Bulk UTM Generator\n\nGoal: Create tracking links from a CSV list of sources.\n\nStack: Python, Pandas\n\nLogic:\n1. Ask for Base URL.\n2. Read 'sources.csv'.\n3. Append utm_source, utm_medium to Base URL.\n4. Export 'tagged_links.csv'."
  },
  {
    id: 'seo-sitemap-validator',
    category: 'Marketing',
    title: "Sitemap Validator",
    tagline: "Check every link in your XML sitemap.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Parses an XML sitemap and pings every URL to ensure it returns a 200 OK.",
    blueprint: "# Blueprint: Sitemap Health Check\n\nGoal: Validate all URLs in sitemap.xml.\n\nStack: Python, requests, xml.etree\n\nLogic:\n1. Fetch sitemap.xml.\n2. Parse <loc> tags.\n3. HEAD request each URL.\n4. Log 404s to 'errors.csv'."
  },
  {
    id: 'keyword-density',
    category: 'Marketing',
    title: "Keyword Density Analyzer",
    tagline: "Analyze usage of target keywords in text.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Checks a content draft for over/under-usage of specific SEO keywords.",
    blueprint: "# Blueprint: Keyword Density\n\nGoal: Count keyword frequency in 'draft.txt'.\n\nStack: Python\n\nLogic:\n1. Load 'keywords.txt' and 'draft.txt'.\n2. Normalize text (lowercase, remove punctuation).\n3. Count occurrences.\n4. Calc % density.\n5. Alert if > 2.5%."
  },
  {
    id: 'meta-tag-audit',
    category: 'Marketing',
    title: "Meta Tag Auditor",
    tagline: "Ensure all pages have title/desc tags.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Scrapes a list of URLs to verify Meta Title and Meta Description exist and are correct length.",
    blueprint: "# Blueprint: Meta Tag Audit\n\nGoal: Check SEO tags for list of URLs.\n\nStack: Python, BeautifulSoup\n\nLogic:\n1. Read 'urls.txt'.\n2. Fetch HTML.\n3. Extract <title> and <meta name='description'>.\n4. Check character counts.\n5. Save 'audit_report.csv'."
  },
  {
    id: 'review-sentiment',
    category: 'Marketing',
    title: "Review Sentiment Analyzer",
    tagline: "Classify reviews as Positive/Negative.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Uses a basic word-list approach to score customer reviews from a CSV.",
    blueprint: "# Blueprint: Sentiment Scorer\n\nGoal: Score reviews in 'reviews.csv'.\n\nStack: Python, TextBlob (or simple list)\n\nLogic:\n1. Load CSV.\n2. For each review, count positive/negative words.\n3. Assign polarity score.\n4. Filter 'High Negative' for manual review."
  },
  {
    id: 'competitor-price-watch',
    category: 'Marketing',
    title: "Competitor Price Watch",
    tagline: "Monitor pricing changes on a specific page.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Checks a competitor's pricing page daily for changes in numbers.",
    blueprint: "# Blueprint: Price Monitor\n\nGoal: Detect price changes.\n\nStack: Python, BeautifulSoup\n\nLogic:\n1. Fetch URL.\n2. Find price element (by class/ID).\n3. Compare with 'last_price.txt'.\n4. If different, print ALERT and update file."
  },
  {
    id: 'email-list-cleaner',
    category: 'Marketing',
    title: "Email List Sanity Check",
    tagline: "Remove obvious bad emails from CSV.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Filters out emails with invalid formats or temporary domains.",
    blueprint: "# Blueprint: Email Cleaner\n\nGoal: Clean 'subscribers.csv'.\n\nStack: Python, regex\n\nLogic:\n1. Iterate rows.\n2. Regex check for valid email format.\n3. Check domain against 'blocklist.txt' (temp mail).\n4. Save valid rows to 'clean_list.csv'."
  },
  {
    id: 'google-trends-logger',
    category: 'Marketing',
    title: "Trend Logger",
    tagline: "Log Google Trends data for keywords.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Uses pytrends to fetch and save interest over time for a keyword list.",
    blueprint: "# Blueprint: Trend Fetcher\n\nGoal: Get trend data for keywords.\n\nStack: Python, pytrends\n\nLogic:\n1. Load 'keywords.txt'.\n2. Fetch interest_over_time().\n3. Save to 'trends_data.csv'."
  },
  {
    id: 'social-bio-formatter',
    category: 'Marketing',
    title: "Social Bio Formatter",
    tagline: "Center text or add special fonts for bios.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Converts standard text into unicode 'bold' or 'italic' styles for Twitter/Insta bios.",
    blueprint: "# Blueprint: Unicode Text Formatter\n\nGoal: Convert text to pseudo-font styles.\n\nStack: Python\n\nLogic:\n1. Create mapping dict {'a': '𝗮', ...}.\n2. Input string.\n3. Replace chars.\n4. Print result."
  },
  {
    id: 'campaign-url-decoder',
    category: 'Marketing',
    title: "Campaign URL Decoder",
    tagline: "Reverse engineer UTM links.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Parses a long tracking URL back into its component parts (Source, Medium, Campaign).",
    blueprint: "# Blueprint: UTM Decoder\n\nGoal: Extract params from URL.\n\nStack: Python, urllib\n\nLogic:\n1. Input URL.\n2. Parse query parameters.\n3. Print formatted list of tags."
  },
  {
    id: 'broken-image-finder',
    category: 'Marketing',
    title: "Broken Image Finder",
    tagline: "Find 404 images on your landing page.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Scans a URL for <img> tags and checks if the source loads.",
    blueprint: "# Blueprint: Image Checker\n\nGoal: Find broken images.\n\nStack: Python, requests, bs4\n\nLogic:\n1. Fetch page.\n2. Find all <img> src.\n3. HEAD request each src.\n4. Report non-200s."
  },

  // --- SALES (13-24) ---
  {
    id: 'lead-domain-extractor',
    category: 'Sales',
    title: "Domain Extractor",
    tagline: "Get company domains from email addresses.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Reads a list of emails and outputs a clean list of unique company domains.",
    blueprint: "# Blueprint: Domain Extractor\n\nGoal: Get domains from 'emails.csv'.\n\nStack: Python\n\nLogic:\n1. Read CSV.\n2. Split email at '@'.\n3. Dedup domains.\n4. Exclude generic (gmail, yahoo).\n5. Export 'domains.csv'."
  },
  {
    id: 'linkedin-search-builder',
    category: 'Sales',
    title: "Boolean Search Builder",
    tagline: "Create complex LinkedIn search strings.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Input job titles and locations; outputs a perfect Boolean string for LinkedIn/Google.",
    blueprint: "# Blueprint: Boolean Builder\n\nGoal: Generate search string.\n\nStack: Python\n\nLogic:\n1. Input list of Roles.\n2. Input list of Exclusions.\n3. Join with OR/AND/NOT operators.\n4. Print string."
  },
  {
    id: 'csv-deduper',
    category: 'Sales',
    title: "The Lead Deduper",
    tagline: "Remove duplicate leads from merged lists.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Intelligently removes duplicates based on Email OR Phone matches.",
    blueprint: "# Blueprint: Smart Dedupe\n\nGoal: Clean lead list.\n\nStack: Python, Pandas\n\nLogic:\n1. Load 'leads.csv'.\n2. Drop duplicates on ['email'].\n3. Drop duplicates on ['phone'].\n4. Save 'unique_leads.csv'."
  },
  {
    id: 'email-permutator',
    category: 'Sales',
    title: "Email Permutator",
    tagline: "Guess corporate email formats.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Input Name and Domain; outputs 30 common email variations (f.last@, first@, etc).",
    blueprint: "# Blueprint: Email Permutator\n\nGoal: Generate email variations.\n\nStack: Python\n\nLogic:\n1. Input First, Last, Domain.\n2. Generate list: [first.last, first, f.last, last.f...].\n3. Append @domain.com.\n4. Output list."
  },
  {
    id: 'company-name-cleaner',
    category: 'Sales',
    title: "Company Name Normalizer",
    tagline: "Clean 'Inc.', 'LLC' from names.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Standardizes company names for CRM import (e.g., 'Apple Inc.' -> 'Apple').",
    blueprint: "# Blueprint: Name Cleaner\n\nGoal: Clean company names.\n\nStack: Python, regex\n\nLogic:\n1. List of suffixes (Inc, LLC, Ltd).\n2. Read 'companies.csv'.\n3. Regex remove suffixes (case insensitive).\n4. Trim whitespace.\n5. Save."
  },
  {
    id: 'meeting-prep-sheet',
    category: 'Sales',
    title: "Meeting Prep Sheet",
    tagline: "Create a summary sheet for a prospect.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Takes a domain, fetches meta description, and creates a text file summary.",
    blueprint: "# Blueprint: Prep Sheet\n\nGoal: Summarize prospect.\n\nStack: Python, requests\n\nLogic:\n1. Input Domain.\n2. Fetch homepage title/meta.\n3. Create 'Prep_Domain.txt' with headers for Notes, Decision Makers."
  },
  {
    id: 'local-biz-finder',
    category: 'Sales',
    title: "Local Biz Scraper",
    tagline: "Mockup of a Google Maps extractor.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Note: Requires API or careful scraping. Extracts business names from a search results HTML page.",
    blueprint: "# Blueprint: Maps Result Parser\n\nGoal: Parse saved HTML from Maps.\n\nStack: Python, BS4\n\nLogic:\n1. Read 'results.html'.\n2. Identify business card elements.\n3. Extract Name, Rating, Address.\n4. CSV Export."
  },
  {
    id: 'phone-formatter',
    category: 'Sales',
    title: "Phone Number Formatter",
    tagline: "Standardize numbers to E.164.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Fixes messy phone numbers ((555) 123-4567 -> +15551234567).",
    blueprint: "# Blueprint: Phone Fixer\n\nGoal: Standardize phones.\n\nStack: Python, phonenumbers (lib)\n\nLogic:\n1. Read CSV.\n2. Parse phone column.\n3. Format to E.164.\n4. Handle errors gracefully."
  },
  {
    id: 'follow-up-scheduler',
    category: 'Sales',
    title: "Follow-Up Calc",
    tagline: "Generate follow-up dates.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Input a start date; outputs a list of dates for Day 1, Day 3, Day 7, Day 14.",
    blueprint: "# Blueprint: Drip Calculator\n\nGoal: Calc dates.\n\nStack: Python, datetime\n\nLogic:\n1. Input Start Date.\n2. Add deltas [1, 3, 7, 14, 30].\n3. Print formatted list."
  },
  {
    id: 'proposal-placeholder',
    category: 'Sales',
    title: "Proposal Personalizer",
    tagline: "Fill placeholders in text proposals.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Replaces {{NAME}} and {{PRICE}} in a proposal template.",
    blueprint: "# Blueprint: Proposal Filler\n\nGoal: Customize template.\n\nStack: Python\n\nLogic:\n1. Load 'template.txt'.\n2. Dict of replacements {key: value}.\n3. Iterate and replace.\n4. Save new file."
  },
  {
    id: 'quota-calculator',
    category: 'Sales',
    title: "Quota Retro-Calc",
    tagline: "Calculate daily activity needed for goal.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Input Revenue Goal and conversion rates; outputs 'Calls per Day' needed.",
    blueprint: "# Blueprint: Reverse Quota\n\nGoal: Calc daily activity.\n\nStack: Python\n\nLogic:\n1. Inputs: Goal, Avg Deal Size, Close Rate, Demo Rate, Call Rate.\n2. Back-calculate needed calls.\n3. Divide by working days."
  },
  {
    id: 'deal-aging-alert',
    category: 'Sales',
    title: "Deal Aging Alert",
    tagline: "Flag deals stuck in pipeline.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Reads a CSV of deals and dates; highlights any unchanged for >30 days.",
    blueprint: "# Blueprint: Stale Deal Checker\n\nGoal: Find old deals.\n\nStack: Python, Pandas\n\nLogic:\n1. Load CSV.\n2. Calc 'Days Since Last Stage Change'.\n3. Filter > 30.\n4. Print Alert List."
  },

  // --- OPERATIONS (25-36) ---
  {
    id: 'invoice-ripper',
    category: 'Operations',
    title: "The Invoice Ripper",
    tagline: "Extract data from folder of PDFs.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Extracts Vendor, Date, Total from PDF invoices.",
    blueprint: "# Blueprint: PDF Scraper\n\nGoal: Extract invoice data.\n\nStack: Python, pypdf\n\nLogic:\n1. Loop folder.\n2. Extract text.\n3. Regex find 'Total: $\d+'.\n4. CSV append."
  },
  {
    id: 'file-organizer',
    category: 'Operations',
    title: "The Desktop Janitor",
    tagline: "Sort files by extension.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Moves files into /Images, /Docs, /Zips folders.",
    blueprint: "# Blueprint: File Sorter\n\nGoal: Organize folder.\n\nStack: Python, shutil\n\nLogic:\n1. Scan dir.\n2. Check extension.\n3. Move to subfolder (create if missing)."
  },
  {
    id: 'bulk-renamer',
    category: 'Operations',
    title: "Bulk Renamer",
    tagline: "Rename files with timestamp/sequence.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Renames 'IMG_001.jpg' to 'Project_2025_01.jpg'.",
    blueprint: "# Blueprint: Bulk Rename\n\nGoal: Standardize filenames.\n\nStack: Python, os\n\nLogic:\n1. Loop files.\n2. Construct new name (Prefix + Count + Ext).\n3. os.rename()."
  },
  {
    id: 'roster-generator',
    category: 'Operations',
    title: "Shift Roster Generator",
    tagline: "Assign shifts randomly/fairly.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Distributes 5 employees across 7 days ensuring 2 days off.",
    blueprint: "# Blueprint: Roster Gen\n\nGoal: Create schedule.\n\nStack: Python, random\n\nLogic:\n1. List Employees.\n2. List Shifts.\n3. Assign ensuring constraints (max 5 days).\n4. Print Grid."
  },
  {
    id: 'qr-code-batcher',
    category: 'Operations',
    title: "QR Batcher",
    tagline: "Generate QR codes for a list of URLs.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Reads 'urls.csv' and saves a QR png for each.",
    blueprint: "# Blueprint: QR Gen\n\nGoal: Batch QRs.\n\nStack: Python, qrcode\n\nLogic:\n1. Read URLs.\n2. qrcode.make(url).\n3. Save 'qr_{row_id}.png'."
  },
  {
    id: 'inventory-forecast',
    category: 'Operations',
    title: "Inventory Alert",
    tagline: "Predict when stock runs out.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Based on 'Avg Daily Sales', calculates days until stock = 0.",
    blueprint: "# Blueprint: Stock Runout\n\nGoal: Calc runout date.\n\nStack: Python\n\nLogic:\n1. Input Current Stock, Avg Sales.\n2. Days = Stock / Sales.\n3. Date = Today + Days.\n4. Alert if < 7 days."
  },
  {
    id: 'contract-filler',
    category: 'Operations',
    title: "Contract Filler",
    tagline: "Fill standard agreements.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Fills Client Name/Date in a text agreement.",
    blueprint: "# Blueprint: Doc Fill\n\nGoal: Fill contract.\n\nStack: Python\n\nLogic:\n1. Read template.\n2. Replace {{CLIENT}}.\n3. Save."
  },
  {
    id: 'time-zone-converter',
    category: 'Operations',
    title: "Global Meeting Planner",
    tagline: "Find overlapping hours.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Given 3 cities, finds best meeting slots.",
    blueprint: "# Blueprint: Timezone Match\n\nGoal: Find slots.\n\nStack: Python, pytz\n\nLogic:\n1. Define zones (NY, London, Tokyo).\n2. Loop 9am-5pm in NY.\n3. Check time in others.\n4. Print valid overlaps."
  },
  {
    id: 'pwd-generator',
    category: 'Operations',
    title: "Secure Pass Gen",
    tagline: "Bulk generate secure passwords.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Creates 50 strong passwords for new user accounts.",
    blueprint: "# Blueprint: Pass Gen\n\nGoal: Make passwords.\n\nStack: Python, secrets\n\nLogic:\n1. Charset = letters + digits + symbols.\n2. Loop 50 times.\n3. Select 16 chars.\n4. Save CSV."
  },
  {
    id: 'folder-tree-printer',
    category: 'Operations',
    title: "Folder Tree Map",
    tagline: "Visualize folder structure.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Prints a text-based tree of a directory for documentation.",
    blueprint: "# Blueprint: Tree Printer\n\nGoal: Visual map of dir.\n\nStack: Python, os\n\nLogic:\n1. Walk directory.\n2. Print indent based on depth.\n3. Print filename."
  },
  {
    id: 'duplicate-file-finder',
    category: 'Operations',
    title: "Duplicate Finder",
    tagline: "Find waste by file hash.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Hashes files to find exact duplicates, even with different names.",
    blueprint: "# Blueprint: Dupe Finder\n\nGoal: Find dupes.\n\nStack: Python, hashlib\n\nLogic:\n1. Walk dir.\n2. Calc MD5 hash of file.\n3. Store in dict {hash: [paths]}.\n4. Print hash keys with >1 path."
  },
  {
    id: 'csv-splitter',
    category: 'Operations',
    title: "CSV Splitter",
    tagline: "Split giant CSV into chunks.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Splits a 100k row CSV into 10 files of 10k rows.",
    blueprint: "# Blueprint: Splitter\n\nGoal: Chunk CSV.\n\nStack: Python, Pandas\n\nLogic:\n1. Read large CSV.\n2. Loop chunks of N rows.\n3. Save 'part_X.csv'."
  },

  // --- CONTENT (37-48) ---
  {
    id: 'transcript-cleaner',
    category: 'Content',
    title: "Transcript Cleaner",
    tagline: "Remove timestamps and speaker names.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Cleans a VTT/SRT file into pure paragraph text.",
    blueprint: "# Blueprint: VTT Cleaner\n\nGoal: Extract text.\n\nStack: Python, regex\n\nLogic:\n1. Read file.\n2. Regex remove timestamps.\n3. Remove 'Speaker:', empty lines.\n4. Join lines."
  },
  {
    id: 'image-watermarker',
    category: 'Content',
    title: "Batch Watermarker",
    tagline: "Stamp logo on folder of images.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Adds a PNG logo to the bottom-right of every image.",
    blueprint: "# Blueprint: Watermarker\n\nGoal: Add logo.\n\nStack: Python, PIL (Pillow)\n\nLogic:\n1. Open Base Image.\n2. Open Logo.\n3. Calc position (width - logo_w - padding).\n4. Paste logo.\n5. Save."
  },
  {
    id: 'youtube-tag-generator',
    category: 'Content',
    title: "Tag Extractor",
    tagline: "Extract keywords from text.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Reads a script and outputs 20 comma-separated keywords.",
    blueprint: "# Blueprint: Tag Gen\n\nGoal: Keywords.\n\nStack: Python, collections\n\nLogic:\n1. Read text.\n2. Remove stopwords.\n3. Count top words.\n4. Format as tag string."
  },
  {
    id: 'thumbnail-resizer',
    category: 'Content',
    title: "Social Resizer",
    tagline: "Crop images to 1:1, 16:9, 9:16.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Takes an image and generates versions for Insta, Stories, and Twitter.",
    blueprint: "# Blueprint: Multi-Crop\n\nGoal: Social sizes.\n\nStack: Python, PIL\n\nLogic:\n1. Open img.\n2. Center crop 1080x1080.\n3. Center crop 1080x1920.\n4. Save variants."
  },
  {
    id: 'markdown-blog-gen',
    category: 'Content',
    title: "Static Blog Gen",
    tagline: "MD files to HTML.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Compiles a folder of Markdown files into a simple HTML blog.",
    blueprint: "# Blueprint: SSG\n\nGoal: MD to HTML.\n\nStack: Python, markdown\n\nLogic:\n1. Read .md files.\n2. Parse Metadata (Title).\n3. Convert Body to HTML.\n4. Inject into 'template.html'."
  },
  {
    id: 'subtitle-shifter',
    category: 'Content',
    title: "Subtitle Syncer",
    tagline: "Shift SRT timing by X seconds.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Fixes out-of-sync subtitles by adding/subtracting time.",
    blueprint: "# Blueprint: SRT Shift\n\nGoal: Offset time.\n\nStack: Python, regex\n\nLogic:\n1. Parse timestamps (00:00:01).\n2. Convert to ms.\n3. Add Offset.\n4. Convert back.\n5. Rewrite file."
  },
  {
    id: 'color-palette-extract',
    category: 'Content',
    title: "Palette Extractor",
    tagline: "Get dominant colors from image.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Extracts top 5 hex codes from an image.",
    blueprint: "# Blueprint: Color Extract\n\nGoal: Get Hex codes.\n\nStack: Python, colorgram/PIL\n\nLogic:\n1. Resize img (speed).\n2. K-means clustering on pixels.\n3. Return top 5 centers as Hex."
  },
  {
    id: 'gif-maker',
    category: 'Content',
    title: "Video to GIF",
    tagline: "Convert MP4 clip to GIF.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Converts seconds 0-5 of a video to a GIF.",
    blueprint: "# Blueprint: Gif Maker\n\nGoal: MP4 to GIF.\n\nStack: Python, moviepy\n\nLogic:\n1. Load clip.\n2. Subclip(0, 5).\n3. write_gif()."
  },
  {
    id: 'podcast-rss-gen',
    category: 'Content',
    title: "RSS Feed Gen",
    tagline: "Create podcast XML.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scans folder of MP3s and generates an RSS.xml for podcast players.",
    blueprint: "# Blueprint: RSS Gen\n\nGoal: Make XML.\n\nStack: Python, os\n\nLogic:\n1. Scan mp3s.\n2. Get file size/duration.\n3. Generate <item> tags.\n4. Save RSS.xml."
  },
  {
    id: 'readability-scorer',
    category: 'Content',
    title: "Readability Check",
    tagline: "Flesch-Kincaid score for text.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Rates your blog post reading level.",
    blueprint: "# Blueprint: Readability\n\nGoal: Score text.\n\nStack: Python, textstat\n\nLogic:\n1. Read text.\n2. Calc sentence count, syllable count.\n3. Apply formula.\n4. Print Grade Level."
  },
  {
    id: 'headline-capitalizer',
    category: 'Content',
    title: "Title Case Fixer",
    tagline: "Standardize headline casing.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Converts 'hello world' to 'Hello World' (excluding small words).",
    blueprint: "# Blueprint: Title Case\n\nGoal: Fix headers.\n\nStack: Python\n\nLogic:\n1. List exceptions (a, an, the, in).\n2. Split string.\n3. Capitalize if not in exceptions or is first word."
  },
  {
    id: 'ascii-art-gen',
    category: 'Content',
    title: "ASCII Art Gen",
    tagline: "Image to Text Art.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Converts an image into ASCII characters.",
    blueprint: "# Blueprint: ASCII\n\nGoal: Img to Text.\n\nStack: Python, PIL\n\nLogic:\n1. Resize img small.\n2. Grayscale.\n3. Map pixel brightness to chars (@%#*+=-:. ).\n4. Print grid."
  },

  // --- DATA (49-60) ---
  {
    id: 'excel-merger',
    category: 'Data',
    title: "The Excel Merger",
    tagline: "Combine multiple xlsx files.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Stacks all Excel files in a folder into one.",
    blueprint: "# Blueprint: Merge Excel\n\nGoal: Combine files.\n\nStack: Python, Pandas\n\nLogic:\n1. Glob *.xlsx.\n2. Pandas.read_excel().\n3. Pandas.concat().\n4. To CSV."
  },
  {
    id: 'pivot-table-gen',
    category: 'Data',
    title: "Pivot Table Gen",
    tagline: "Auto-summarize sales data.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Groups data by 'Category' and sums 'Revenue'.",
    blueprint: "# Blueprint: Pivot\n\nGoal: Summarize.\n\nStack: Python, Pandas\n\nLogic:\n1. Read CSV.\n2. df.groupby('Category')['Revenue'].sum().\n3. Save result."
  },
  {
    id: 'currency-converter',
    category: 'Data',
    title: "Currency Batcher",
    tagline: "Convert column to USD.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Reads CSV with mixed currencies and converts to USD using API.",
    blueprint: "# Blueprint: Forex\n\nGoal: Convert rates.\n\nStack: Python, requests\n\nLogic:\n1. Fetch rates API.\n2. Read CSV.\n3. Apply rate multiplier based on Currency col.\n4. Save."
  },
  {
    id: 'column-splitter',
    category: 'Data',
    title: "Name Splitter",
    tagline: "Split 'Full Name' to First/Last.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Splits one column into two.",
    blueprint: "# Blueprint: Split Col\n\nGoal: Split name.\n\nStack: Python, Pandas\n\nLogic:\n1. Read CSV.\n2. df['Name'].str.split().\n3. Assign to First, Last.\n4. Save."
  },
  {
    id: 'json-to-csv',
    category: 'Data',
    title: "JSON to CSV",
    tagline: "Flatten JSON data.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Converts a JSON file into a spreadsheet.",
    blueprint: "# Blueprint: JSON Convert\n\nGoal: Flatten.\n\nStack: Python, pandas\n\nLogic:\n1. pd.read_json().\n2. pd.json_normalize().\n3. to_csv()."
  },
  {
    id: 'sql-seeder',
    category: 'Data',
    title: "SQL Mock Data",
    tagline: "Generate INSERT statements.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Creates fake data and outputs SQL insert scripts.",
    blueprint: "# Blueprint: SQL Gen\n\nGoal: Mock Data.\n\nStack: Python, faker\n\nLogic:\n1. Loop N times.\n2. Generate Fake Name, Email.\n3. Print 'INSERT INTO users VALUES...'"
  },
  {
    id: 'outlier-detector',
    category: 'Data',
    title: "Outlier Detector",
    tagline: "Find anomalies in data.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Flags rows where value is > 3 std devs from mean.",
    blueprint: "# Blueprint: Outlier\n\nGoal: Find anomalies.\n\nStack: Python, Pandas\n\nLogic:\n1. Calc Mean, StdDev.\n2. Z-score = (Val - Mean)/Std.\n3. Filter abs(Z) > 3."
  },
  {
    id: 'missing-data-report',
    category: 'Data',
    title: "Null Checker",
    tagline: "Report missing values.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Reports % of missing data per column.",
    blueprint: "# Blueprint: Nulls\n\nGoal: Audit quality.\n\nStack: Python, Pandas\n\nLogic:\n1. Read CSV.\n2. df.isnull().mean().\n3. Print report."
  },
  {
    id: 'log-parser',
    category: 'Data',
    title: "Server Log Parser",
    tagline: "Extract Errors from logs.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Reads a .log file and exports all 'ERROR' lines.",
    blueprint: "# Blueprint: Log Parse\n\nGoal: Get errors.\n\nStack: Python\n\nLogic:\n1. Read lines.\n2. If 'ERROR' in line: save.\n3. Export."
  },
  {
    id: 'chart-generator',
    category: 'Data',
    title: "Quick Chart",
    tagline: "CSV to PNG Plot.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Generates a bar chart from a CSV.",
    blueprint: "# Blueprint: Plotter\n\nGoal: Vis data.\n\nStack: Python, matplotlib\n\nLogic:\n1. Read CSV.\n2. plt.bar(x, y).\n3. plt.savefig('chart.png')."
  },
  {
    id: 'geocoder',
    category: 'Data',
    title: "Batch Geocoder",
    tagline: "Address to Lat/Lon.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Converts addresses to coordinates (using OSM/Nominatim).",
    blueprint: "# Blueprint: Geocode\n\nGoal: Get coords.\n\nStack: Python, geopy\n\nLogic:\n1. Read Address.\n2. geolocator.geocode().\n3. Save Lat/Lon."
  },
  {
    id: 'sampling-tool',
    category: 'Data',
    title: "Random Sampler",
    tagline: "Get random 10% of rows.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Extracts a random sample for auditing.",
    blueprint: "# Blueprint: Sample\n\nGoal: Random subset.\n\nStack: Python, Pandas\n\nLogic:\n1. Read CSV.\n2. df.sample(frac=0.1).\n3. Save."
  },

  // --- RESEARCH (61-72) ---
  {
    id: 'paper-summarizer',
    category: 'Research',
    title: "The PDF Interrogator",
    tagline: "Summarize academic papers.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Extracts abstract/conclusion from PDF folder.",
    blueprint: "# Blueprint: Paper Sum\n\nGoal: Extract sections.\n\nStack: Python, pypdf\n\nLogic:\n1. Find 'Abstract'.\n2. Find 'Conclusion'.\n3. Extract text between.\n4. Save."
  },
  {
    id: 'news-scraper',
    category: 'Research',
    title: "News Headline Scraper",
    tagline: "Get top headlines.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes headlines from a news site list.",
    blueprint: "# Blueprint: News Fetch\n\nGoal: Get headlines.\n\nStack: Python, BS4\n\nLogic:\n1. Request URL.\n2. Find <h2> tags.\n3. Print text."
  },
  {
    id: 'amazon-review-fetch',
    category: 'Research',
    title: "Review Fetcher",
    tagline: "Get reviews from page.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Scrapes reviews from a product page (carefully).",
    blueprint: "# Blueprint: Review Get\n\nGoal: Scrape text.\n\nStack: Python, requests (headers)\n\nLogic:\n1. Spoof User-Agent.\n2. Find review container.\n3. Extract Text, Star Rating.\n4. Save."
  },
  {
    id: 'subreddit-monitor',
    category: 'Research',
    title: "Subreddit Watcher",
    tagline: "Track keywords in Reddit.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Uses JSON feed to find keywords in new posts.",
    blueprint: "# Blueprint: Reddit Watch\n\nGoal: Keyword alert.\n\nStack: Python, requests\n\nLogic:\n1. Fetch .json of subreddit.\n2. Loop children.\n3. Check title for keyword.\n4. Print matches."
  },
  {
    id: 'whois-lookup',
    category: 'Research',
    title: "Bulk Whois",
    tagline: "Check domain expiry.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Checks expiry dates for a list of domains.",
    blueprint: "# Blueprint: Whois\n\nGoal: Expiry check.\n\nStack: Python, python-whois\n\nLogic:\n1. Loop domains.\n2. whois.query().\n3. Print expiration_date."
  },
  {
    id: 'ssl-checker',
    category: 'Research',
    title: "SSL Expiry Check",
    tagline: "Verify cert validity.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Checks when SSL certs expire for sites.",
    blueprint: "# Blueprint: SSL Check\n\nGoal: Cert check.\n\nStack: Python, ssl, socket\n\nLogic:\n1. Connect 443.\n2. getpeercert().\n3. Parse 'notAfter'.\n4. Alert if < 30 days."
  },
  {
    id: 'text-diff',
    category: 'Research',
    title: "Text Diff Tool",
    tagline: "Compare two documents.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Shows line-by-line differences between two files.",
    blueprint: "# Blueprint: Diff\n\nGoal: Compare files.\n\nStack: Python, difflib\n\nLogic:\n1. Read A and B.\n2. HtmlDiff().make_file().\n3. Open in browser."
  },
  {
    id: 'citation-generator',
    category: 'Research',
    title: "BibTex Generator",
    tagline: "Format URLs to citations.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Fetches page title/author and makes a BibTex entry.",
    blueprint: "# Blueprint: Citation\n\nGoal: Make BibTex.\n\nStack: Python, BS4\n\nLogic:\n1. Fetch URL.\n2. Get <title>, <author>.\n3. Format string."
  },
  {
    id: 'youtube-comment-scraper',
    category: 'Research',
    title: "YT Comment Scraper",
    tagline: "Get video comments.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Uses API (or Selenium) to get comments.",
    blueprint: "# Blueprint: YT Comments\n\nGoal: Get feedback.\n\nStack: Python, youtube-api\n\nLogic:\n1. Call commentThreads().\n2. Page through results.\n3. Save text."
  },
  {
    id: 'broken-link-spider',
    category: 'Research',
    title: "Link Spider",
    tagline: "Crawl site for dead links.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Crawls internal links to find 404s.",
    blueprint: "# Blueprint: Spider\n\nGoal: Find 404s.\n\nStack: Python, requests\n\nLogic:\n1. Queue URLs.\n2. Visit, find links.\n3. Check Status.\n4. Add new links to queue (depth limit)."
  },
  {
    id: 'weather-logger',
    category: 'Research',
    title: "Weather History",
    tagline: "Log daily temp.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Logs current weather to CSV daily.",
    blueprint: "# Blueprint: Weather Log\n\nGoal: History.\n\nStack: Python, requests (weatherapi)\n\nLogic:\n1. Call API.\n2. Get Temp.\n3. Append Date, Temp to CSV."
  },
  {
    id: 'stock-ticker',
    category: 'Research',
    title: "Stock Price Fetcher",
    tagline: "Get closing prices.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Fetches end-of-day stock price.",
    blueprint: "# Blueprint: Stocks\n\nGoal: Price check.\n\nStack: Python, yfinance\n\nLogic:\n1. Ticker('AAPL').\n2. history(period='1d').\n3. Print Close."
  },

  // --- LEGAL / FINANCE (73-82) ---
  {
    id: 'nda-gen',
    category: 'Legal',
    title: "NDA Generator",
    tagline: "Quick custom NDA.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Fills boilerplate NDA.",
    blueprint: "# Blueprint: NDA\n\nGoal: Fill doc.\n\nStack: Python\n\nLogic:\n1. Replace {{Names}} in txt.\n2. Save."
  },
  {
    id: 'invoice-gen',
    category: 'Finance',
    title: "Simple Invoice Gen",
    tagline: "Create PDF invoice.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Calculates totals and renders PDF.",
    blueprint: "# Blueprint: Invoice\n\nGoal: Make PDF.\n\nStack: Python, fpdf\n\nLogic:\n1. Input items.\n2. Calc Tax/Total.\n3. Draw tables in PDF."
  },
  {
    id: 'expense-categorizer',
    category: 'Finance',
    title: "Expense Categorizer",
    tagline: "Tag bank export.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Keywords -> Category (Uber -> Transport).",
    blueprint: "# Blueprint: Expense Tag\n\nGoal: Categorize.\n\nStack: Python, Pandas\n\nLogic:\n1. Map {keyword: category}.\n2. Check Description col.\n3. Assign Category."
  },
  {
    id: 'loan-calc',
    category: 'Finance',
    title: "Loan Amortization",
    tagline: "Calc monthly payments.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Generates payment schedule.",
    blueprint: "# Blueprint: Loan\n\nGoal: Schedule.\n\nStack: Python\n\nLogic:\n1. Input Principal, Rate, Term.\n2. Apply formula.\n3. Loop months to show Balance."
  },
  {
    id: 'vat-calc',
    category: 'Finance',
    title: "VAT/Tax Calc",
    tagline: "Add/Remove Tax.",
    difficulty: 'Beginner',
    time: '2 mins',
    description: "Simple CLI tax calculator.",
    blueprint: "# Blueprint: Tax\n\nGoal: Calc tax.\n\nStack: Python\n\nLogic:\n1. Input Amount, Rate.\n2. Print Net, Gross, Tax."
  },
  {
    id: 'crypto-alert',
    category: 'Finance',
    title: "Crypto Price Alert",
    tagline: "Bitcoin threshold alert.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Alerts when price crosses limit.",
    blueprint: "# Blueprint: Crypto\n\nGoal: Alert.\n\nStack: Python, requests\n\nLogic:\n1. Fetch CoinGecko.\n2. If > Limit: print 'SELL'."
  },
  {
    id: 'budget-tracker',
    category: 'Finance',
    title: "Simple Budget CLI",
    tagline: "Log daily spend.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Appends spend to text file.",
    blueprint: "# Blueprint: Budget\n\nGoal: Log.\n\nStack: Python\n\nLogic:\n1. Input Item, Cost.\n2. Append to 'budget.txt'.\n3. Print Monthly Total."
  },
  {
    id: 'compound-interest',
    category: 'Finance',
    title: "Compound Calc",
    tagline: "Project savings growth.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Years to millionaire.",
    blueprint: "# Blueprint: Compound\n\nGoal: Forecast.\n\nStack: Python\n\nLogic:\n1. Input Monthly Save, Rate, Years.\n2. Loop calc.\n3. Print Final."
  },
  {
    id: 'currency-table',
    category: 'Finance',
    title: "Forex Table",
    tagline: "Cheat sheet for travel.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Prints 1, 5, 10, 20 USD to Local Currency.",
    blueprint: "# Blueprint: Travel Table\n\nGoal: Cheat sheet.\n\nStack: Python\n\nLogic:\n1. Input Rate.\n2. Print list of conversions."
  },
  {
    id: 'receipt-renamer',
    category: 'Finance',
    title: "Receipt Renamer",
    tagline: "Date-prefix receipts.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Prefixes file with date created.",
    blueprint: "# Blueprint: Receipt Rename\n\nGoal: Sort.\n\nStack: Python, os\n\nLogic:\n1. Get file create date.\n2. Rename 'scan.jpg' -> '2025-01-01_scan.jpg'."
  },

  // --- PRODUCTIVITY / UTILS (83-92) ---
  {
    id: 'clipboard-history',
    category: 'Productivity',
    title: "Clipboard Logger",
    tagline: "Save copy history.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Saves copied text to file.",
    blueprint: "# Blueprint: Clip Log\n\nGoal: History.\n\nStack: Python, pyperclip\n\nLogic:\n1. Loop check clipboard.\n2. If new: append to 'log.txt'."
  },
  {
    id: 'pomodoro-timer',
    category: 'Productivity',
    title: "Terminal Pomodoro",
    tagline: "Focus timer.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "25 min countdown with beep.",
    blueprint: "# Blueprint: Timer\n\nGoal: Focus.\n\nStack: Python, time\n\nLogic:\n1. Sleep 25 mins.\n2. Print 'Break!'.\n3. Play sound (print \\a)."
  },
  {
    id: 'todo-cli',
    category: 'Productivity',
    title: "CLI To-Do",
    tagline: "Task list in terminal.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Add/List/Done tasks.",
    blueprint: "# Blueprint: Todo\n\nGoal: List.\n\nStack: Python\n\nLogic:\n1. Parse args (add, list).\n2. Read/Write 'todo.txt'."
  },
  {
    id: 'quick-note',
    category: 'Productivity',
    title: "Quick Note",
    tagline: "Append to daily journal.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Timestamped one-liner.",
    blueprint: "# Blueprint: Note\n\nGoal: Journal.\n\nStack: Python\n\nLogic:\n1. Input text.\n2. Append 'Time - Text' to 'today.md'."
  },
  {
    id: 'startup-launcher',
    category: 'Productivity',
    title: "Workspace Launcher",
    tagline: "Open 5 apps at once.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Opens Chrome, Slack, VS Code.",
    blueprint: "# Blueprint: Launch\n\nGoal: Startup.\n\nStack: Python, subprocess\n\nLogic:\n1. Call system open commands."
  },
  {
    id: 'json-pretty',
    category: 'Productivity',
    title: "JSON Prettifier",
    tagline: "Format ugly JSON.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Indents minified JSON.",
    blueprint: "# Blueprint: Pretty\n\nGoal: Format.\n\nStack: Python, json\n\nLogic:\n1. Read stdin.\n2. json.dumps(indent=2).\n3. Print."
  },
  {
    id: 'base64-tool',
    category: 'Productivity',
    title: "Base64 Encoder",
    tagline: "Encode/Decode text.",
    difficulty: 'Beginner',
    time: '2 mins',
    description: "Quick convert.",
    blueprint: "# Blueprint: B64\n\nGoal: Convert.\n\nStack: Python, base64\n\nLogic:\n1. Input text.\n2. b64encode()."
  },
  {
    id: 'countdown-days',
    category: 'Productivity',
    title: "Days Until...",
    tagline: "Count to deadline.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Days left in year/project.",
    blueprint: "# Blueprint: Count\n\nGoal: Deadline.\n\nStack: Python, datetime\n\nLogic:\n1. Target Date - Today.\n2. Print Days."
  },
  {
    id: 'file-size-map',
    category: 'Productivity',
    title: "Disk Hog Finder",
    tagline: "Find huge files.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "List largest files in dir.",
    blueprint: "# Blueprint: Size Map\n\nGoal: Cleanup.\n\nStack: Python, os\n\nLogic:\n1. Walk dir.\n2. Get size.\n3. Sort desc.\n4. Print top 10."
  },
  {
    id: 'dummy-file-gen',
    category: 'Productivity',
    title: "Dummy File Gen",
    tagline: "Create test files.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Creates 100 empty files for testing.",
    blueprint: "# Blueprint: Dummy\n\nGoal: Test data.\n\nStack: Python\n\nLogic:\n1. Loop N times.\n2. Create file 'test_X.txt'."
  },

  // --- WEB / DEV-LITE (93-100) ---
  {
    id: 'simple-server',
    category: 'Web',
    title: "Instant Web Server",
    tagline: "Serve local files.",
    difficulty: 'Beginner',
    time: '1 min',
    description: "Hosts current folder on localhost.",
    blueprint: "# Blueprint: Server\n\nGoal: Host.\n\nStack: Python, http.server\n\nLogic:\n1. Run module."
  },
  {
    id: 'color-picker-app',
    category: 'Web',
    title: "Color Picker",
    tagline: "HTML Color tool.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Single HTML file color picker.",
    blueprint: "# Blueprint: Picker\n\nGoal: UI.\n\nStack: HTML/JS\n\nLogic:\n1. <input type='color'>.\n2. Show Hex."
  },
  {
    id: 'markdown-preview',
    category: 'Web',
    title: "MD Previewer",
    tagline: "Live MD edit.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Browser textarea -> Preview.",
    blueprint: "# Blueprint: MD View\n\nGoal: Editor.\n\nStack: HTML/JS (marked.js)\n\nLogic:\n1. Textarea input.\n2. Render div.\n3. Update on keyup."
  },
  {
    id: 'lorem-ipsum-gen',
    category: 'Web',
    title: "Lorem Ipsum API",
    tagline: "Text generator.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "CLI to print N paragraphs.",
    blueprint: "# Blueprint: Lorem\n\nGoal: Filler.\n\nStack: Python, lorem\n\nLogic:\n1. Input N.\n2. Generate.\n3. Print."
  },
  {
    id: 'favicon-fetcher',
    category: 'Web',
    title: "Favicon Grabber",
    tagline: "Get site icon.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Downloads favicon.ico from URL.",
    blueprint: "# Blueprint: Icon\n\nGoal: Download.\n\nStack: Python, requests\n\nLogic:\n1. Try root/favicon.ico.\n2. Try HTML link tag."
  },
  {
    id: 'port-scanner',
    category: 'Web',
    title: "Open Port Check",
    tagline: "Check local ports.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Scans localhost for open ports.",
    blueprint: "# Blueprint: Port Scan\n\nGoal: Security.\n\nStack: Python, socket\n\nLogic:\n1. Loop ports 1-1024.\n2. Try connect.\n3. Print open ones."
  },
  {
    id: 'dns-checker',
    category: 'Web',
    title: "DNS Prop Check",
    tagline: "Resolve domain IP.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Checks A record.",
    blueprint: "# Blueprint: DNS\n\nGoal: Resolve.\n\nStack: Python, socket\n\nLogic:\n1. gethostbyname().\n2. Print IP."
  },
  {
    id: 'header-inspector',
    category: 'Web',
    title: "Header Inspector",
    tagline: "View HTTP headers.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Prints response headers.",
    blueprint: "# Blueprint: Headers\n\nGoal: Debug.\n\nStack: Python, requests\n\nLogic:\n1. HEAD request.\n2. Print headers dict."
  }
];

export const categoryIcons: Record<Category, any> = {
  Marketing: Globe,
  Sales: Briefcase,
  Operations: Zap,
  Data: Database,
  Content: Video,
  Research: Search,
  Legal: Shield,
  Productivity: Calendar,
  Web: Code,
  Finance: DollarSign
};
