import {
  Users, Zap, Globe, Search, BarChart,
  PenTool, Share2, Mail, Database, Target
} from 'lucide-react';

export type Category =
  | 'Lead Gen'
  | 'Enrichment'
  | 'Content Ops'
  | 'SEO'
  | 'Competitor Intel'
  | 'CRO'
  | 'CRM Ops'
  | 'Social Automation'
  | 'Outreach';

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
  // --- LEAD GENERATION (1-15) ---
  {
    id: 'gmaps-scraper',
    category: 'Lead Gen',
    title: "G-Maps Local Miner",
    tagline: "Scrape 'Plumbers in Austin' -> CSV.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Automates a headless browser to search Google Maps, scroll results, and extract Business Name, Phone, Website, and Rating into a clean list.",
    blueprint: "# Blueprint: Maps Miner\n\nGoal: Lead List.\n\nStack: Python, Playwright\n\nLogic:\n1. Input Search Term.\n2. Visit Google Maps.\n3. Loop Results.\n4. Click to expand details.\n5. Extract Phone/Web.\n6. Save CSV."
  },
  {
    id: 'linkedin-comment-export',
    category: 'Lead Gen',
    title: "LinkedIn Comment Scraper",
    tagline: "Steal leads from viral posts.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Find a viral post in your niche. This script expands all comments and extracts the Name, Headline, and Profile URL of everyone who commented.",
    blueprint: "# Blueprint: Comment Leech\n\nGoal: High-intent leads.\n\nStack: Python, Selenium\n\nLogic:\n1. Login LinkedIn.\n2. Visit Post URL.\n3. Click 'Load more comments' until end.\n4. Parse commenter Name/Headline.\n5. Filter by keyword (e.g., 'Founder')."
  },
  {
    id: 'crunchbase-monitor',
    category: 'Lead Gen',
    title: "Funding Alert Scraper",
    tagline: "Find startups who just raised $$$.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Monitors TechCrunch or Crunchbase news feeds. Extracts company names mentioned in 'Series A' articles today.",
    blueprint: "# Blueprint: Fund Watch\n\nGoal: New money.\n\nStack: Python, Requests, BS4\n\nLogic:\n1. Scrape TechCrunch Funding page.\n2. Filter titles for 'Raises', 'Series A'.\n3. Extract Company Name.\n4. Enrich with Website search."
  },
  {
    id: 'github-email-finder',
    category: 'Lead Gen',
    title: "GitHub Dev Finder",
    tagline: "Find emails of contributors to Repo X.",
    difficulty: 'Intermediate',
    time: '25 mins',
    description: "Selling dev tools? Scrape the commit history of a competitor's repo. Extract author names and emails from the git metadata.",
    blueprint: "# Blueprint: Git Miner\n\nGoal: Dev leads.\n\nStack: Python, PyGithub\n\nLogic:\n1. Input Repo (e.g., 'facebook/react').\n2. Iterate last 1000 commits.\n3. Extract commit.author.email.\n4. Dedupe & Filter 'users.noreply'."
  },
  {
    id: 'producthunt-launcher',
    category: 'Lead Gen',
    title: "ProductHunt Scraper",
    tagline: "Get today's top launched founders.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes the 'Makers' list from today's top 5 products on ProductHunt.",
    blueprint: "# Blueprint: PH Maker List\n\nGoal: Founder outreach.\n\nStack: Python, Requests\n\nLogic:\n1. Fetch producthunt.com.\n2. Identify Top 5 posts.\n3. Follow links.\n4. Extract Maker names/Twitter handles."
  },
  {
    id: 'directory-scraper',
    category: 'Lead Gen',
    title: "SaaS Directory Scraper",
    tagline: "Scrape Capterra/G2 reviews.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Extracts negative reviews of your competitor. Captures the Reviewer Name and Company (if public) to pitch your alternative.",
    blueprint: "# Blueprint: Review Poach\n\nGoal: Competitor dissatisfaction.\n\nStack: Python, Playwright\n\nLogic:\n1. Visit G2 Product Page.\n2. Filter 1-3 star reviews.\n3. Extract Text & User details.\n4. Save for outreach."
  },
  {
    id: 'instagram-hashtag-scraper',
    category: 'Lead Gen',
    title: "Insta Tag Monitor",
    tagline: "Find influencers using #niche.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Monitors a hashtag. Exports users who posted with >100 likes. (Requires session handling).",
    blueprint: "# Blueprint: IG Tag Search\n\nGoal: Influencers.\n\nStack: Python, Instaloader\n\nLogic:\n1. Input Hashtag.\n2. Iterate recent posts.\n3. Filter by Like Count > 100.\n4. Save Username & Bio."
  },
  {
    id: 'twitter-bio-search',
    category: 'Lead Gen',
    title: "Twitter Bio Search",
    tagline: "Find users with 'CMO' in bio.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Uses search operators (site:twitter.com 'bio: * cmo') or API to build a list of profiles.",
    blueprint: "# Blueprint: Bio Crawler\n\nGoal: Targeted personas.\n\nStack: Python, SNScrape or Nitter\n\nLogic:\n1. Construct Query.\n2. Scrape results stream.\n3. Extract Handle & Website.\n4. Save CSV."
  },
  {
    id: 'podcast-guest-finder',
    category: 'Lead Gen',
    title: "Podcast Guest Scout",
    tagline: "Find people interviewed on podcasts.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Searches podcast directories for episodes with titles like 'Founder of [Keyword]'. Extracts guest name.",
    blueprint: "# Blueprint: Guest Scout\n\nGoal: Outreach list.\n\nStack: Python, Requests\n\nLogic:\n1. Query iTunes API for topic.\n2. Parse Title ('...with John Doe').\n3. Extract Name.\n4. Dedupe."
  },
  {
    id: 'conference-attendee-match',
    category: 'Lead Gen',
    title: "Event Lead Matcher",
    tagline: "Match 'John - Acme' to LinkedIn.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Input a list of names from a conference app. Script searches LinkedIn to find their Profile URL.",
    blueprint: "# Blueprint: Event Enrich\n\nGoal: LinkedIn URLs.\n\nStack: Python, googlesearch-python\n\nLogic:\n1. Read 'names.csv'.\n2. Query: 'site:linkedin.com/in/ [Name] [Company]'.\n3. Save top URL."
  },
  {
    id: 'substack-recommender',
    category: 'Lead Gen',
    title: "Newsletter Sponsor Finder",
    tagline: "Find Substacks in your niche.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Crawls Substack 'Recommendations' to map the network of newsletters in a specific category.",
    blueprint: "# Blueprint: Substack Graph\n\nGoal: Sponsorships.\n\nStack: Python, BS4\n\nLogic:\n1. Start at top newsletter.\n2. Scrape '/recommendations'.\n3. Recurse 1 level.\n4. List emails/authors."
  },
  {
    id: 'youtube-channel-scraper',
    category: 'Lead Gen',
    title: "YouTuber Contact Info",
    tagline: "Get email from 'About' page.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Finds channels matching keywords. Attempts to solve the 'View Email' captcha or find email in description.",
    blueprint: "# Blueprint: YT Emails\n\nGoal: Creator list.\n\nStack: Python, YouTube API\n\nLogic:\n1. Search Keyword.\n2. Get Channel ID.\n3. Check description for 'mailto:'.\n4. Save."
  },
  {
    id: 'technology-lookup',
    category: 'Lead Gen',
    title: "Tech Stack Hunter",
    tagline: "Find sites using Shopify.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Scans a list of domains headers/source code to detect specific technologies.",
    blueprint: "# Blueprint: Tech Detect\n\nGoal: Technographics.\n\nStack: Python, Requests\n\nLogic:\n1. Read Domain List.\n2. Fetch HTML.\n3. Check for signatures ('cdn.shopify.com', 'wp-content').\n4. Tag CSV."
  },
  {
    id: 'new-domain-monitor',
    category: 'Lead Gen',
    title: "New Domain Watch",
    tagline: "Catch 'get[competitor].com'.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Monitors daily registered domain lists (zone files) for keywords.",
    blueprint: "# Blueprint: Zone Watch\n\nGoal: Brand protection/Sales.\n\nStack: Python\n\nLogic:\n1. Download daily zone file (if avail) or CertStream.\n2. Stream log.\n3. Alert on keyword match."
  },
  {
    id: 'glassdoor-intent',
    category: 'Lead Gen',
    title: "Review Intent",
    tagline: "Companies reviewing competitors.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Scrape 'Alternatives to X' pages to see who is sponsoring or appearing.",
    blueprint: "# Blueprint: Intent Scrape\n\nGoal: Ad targets.\n\nStack: Python, Playwright\n\nLogic:\n1. Visit 'Best CRM Software'.\n2. Extract sponsored positions.\n3. Identify active bidders."
  },

  // --- ENRICHMENT (16-25) ---
  {
    id: 'email-permutator',
    category: 'Enrichment',
    title: "Email Permutator",
    tagline: "Guess corporate email formats.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Input Name/Domain; outputs 30 variations (f.last@, first@) to test.",
    blueprint: "# Blueprint: Permutator\n\nGoal: Guess email.\n\nStack: Python\n\nLogic:\n1. Input Name, Domain.\n2. Generate permutations.\n3. Output list."
  },
  {
    id: 'logo-fetcher',
    category: 'Enrichment',
    title: "Company Logo API",
    tagline: "Get logos for deck.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Finds high-res logo from domain metadata.",
    blueprint: "# Blueprint: Logo Get\n\nGoal: Branding.\n\nStack: Python, Requests\n\nLogic:\n1. Try Clearbit API.\n2. Fallback: Scrape og:image.\n3. Save .png."
  },
  {
    id: 'ceo-finder',
    category: 'Enrichment',
    title: "CEO Finder",
    tagline: "Add 'CEO Name' to domain list.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Uses Google Search snippet extraction to find the CEO of a company.",
    blueprint: "# Blueprint: CEO Search\n\nGoal: Decision Maker.\n\nStack: Python, googlesearch\n\nLogic:\n1. Query: 'site:linkedin.com/in/ CEO [Company]'.\n2. Extract Name from title.\n3. Update CSV."
  },
  {
    id: 'location-enricher',
    category: 'Enrichment',
    title: "HQ Location Filler",
    tagline: "Add City/State to leads.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes the 'Contact' or 'Footer' of a website to find the address.",
    blueprint: "# Blueprint: Address Find\n\nGoal: Territory mapping.\n\nStack: Python, BS4\n\nLogic:\n1. Visit Homepage.\n2. Search footer for Zip Regex.\n3. If fail, visit /contact.\n4. Extract Address block."
  },
  {
    id: 'social-handle-extractor',
    category: 'Enrichment',
    title: "Social Link Scraper",
    tagline: "Find Twitter/LinkedIn on homepage.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Crawls a domain to find social media icons and extracts the links.",
    blueprint: "# Blueprint: Social Scrape\n\nGoal: Find handles.\n\nStack: Python, BS4\n\nLogic:\n1. Fetch HTML.\n2. Find hrefs containing 'twitter.com', 'linkedin.com'.\n3. Save to cols."
  },
  {
    id: 'employee-count-estimator',
    category: 'Enrichment',
    title: "Team Size Estimator",
    tagline: "Guess size from LinkedIn.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Scrapes the 'See all X employees' text from a company LinkedIn page (public view).",
    blueprint: "# Blueprint: Size Check\n\nGoal: Qualification.\n\nStack: Python, Requests\n\nLogic:\n1. Search LinkedIn Company page.\n2. Fetch public HTML.\n3. Regex find 'digits employees'.\n4. Estimate tier."
  },
  {
    id: 'traffic-estimator',
    category: 'Enrichment',
    title: "Traffic Tier",
    tagline: "Est. monthly visits.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: " Queries SimilarWeb (free public page) to get traffic estimate.",
    blueprint: "# Blueprint: Traffic Check\n\nGoal: Qualify inbound.\n\nStack: Python, Selenium\n\nLogic:\n1. Visit similarweb.com/website/domain.\n2. Extract 'Total Visits'.\n3. Save."
  },
  {
    id: 'meta-title-enricher',
    category: 'Enrichment',
    title: "Tagline Extractor",
    tagline: "What does this company do?",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Fetches Homepage <title> and Meta Description to summarize the business.",
    blueprint: "# Blueprint: Tagline Get\n\nGoal: Context.\n\nStack: Python, requests\n\nLogic:\n1. Fetch URL.\n2. Extract <title>.\n3. Extract <meta name='description'>.\n4. Save."
  },
  {
    id: 'validate-email-smtp',
    category: 'Enrichment',
    title: "SMTP Validator",
    tagline: "Check if email bounces.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Pings the mail server (HELO/RCPT TO) to see if the user exists without sending mail.",
    blueprint: "# Blueprint: Verify Email\n\nGoal: Clean list.\n\nStack: Python, smtplib, dns.resolver\n\nLogic:\n1. Get MX record.\n2. Connect SMTP.\n3. Send HELO.\n4. Send RCPT TO.\n5. Check response code (250=Valid)."
  },
  {
    id: 'phone-formatting',
    category: 'Enrichment',
    title: "E.164 Formatter",
    tagline: "Fix phone numbers.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Standardizes '(555) 123 4567' to '+15551234567'.",
    blueprint: "# Blueprint: Phone Fix\n\nGoal: CRM Ready.\n\nStack: Python, phonenumbers\n\nLogic:\n1. Read CSV.\n2. Parse phone string.\n3. Format E.164.\n4. Save."
  },

  // --- CONTENT OPS (26-45) ---
  {
    id: 'video-clipper',
    category: 'Content Ops',
    title: "Webinar Slicer",
    tagline: "Cut viral clips from Zoom.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Uses transcript keywords to auto-cut video segments.",
    blueprint: "# Blueprint: Auto Clip\n\nGoal: Shorts.\n\nStack: Python, moviepy\n\nLogic:\n1. Read VTT.\n2. Find high-energy keywords.\n3. Get timestamps.\n4. FFMPEG slice."
  },
  {
    id: 'blog-to-tweet',
    category: 'Content Ops',
    title: "Thread Maker",
    tagline: "Blog post -> 10 Tweets.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Summarizes text into threaded short-form copy.",
    blueprint: "# Blueprint: Threader\n\nGoal: Repurpose.\n\nStack: Python\n\nLogic:\n1. Read text.\n2. Extract 5 headers.\n3. Rewrite as hooks.\n4. Format output."
  },
  {
    id: 'thumbnail-text',
    category: 'Content Ops',
    title: "Thumb Gen",
    tagline: "Bulk create blog covers.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Overlays title text onto a background image template.",
    blueprint: "# Blueprint: Image Gen\n\nGoal: Assets.\n\nStack: Python, PIL\n\nLogic:\n1. Load Template.\n2. Draw Title Text.\n3. Save 'post-slug.jpg'."
  },
  {
    id: 'transcription-local',
    category: 'Content Ops',
    title: "Local Whisper",
    tagline: "Free audio transcription.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Transcribes MP3s locally using OpenAI Whisper.",
    blueprint: "# Blueprint: Transcribe\n\nGoal: Text.\n\nStack: Python, whisper\n\nLogic:\n1. Load Model.\n2. Transcribe Audio.\n3. Save .txt."
  },
  {
    id: 'gif-converter',
    category: 'Content Ops',
    title: "Video to GIF",
    tagline: "Make email embed GIFs.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Converts start of video to optimized GIF.",
    blueprint: "# Blueprint: Gif Maker\n\nGoal: Email asset.\n\nStack: Python, moviepy\n\nLogic:\n1. Load video.\n2. Subclip(0,3).\n3. Write GIF (optimize palette)."
  },
  {
    id: 'watermark-batch',
    category: 'Content Ops',
    title: "Logo Stamper",
    tagline: "Watermark 50 images.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Adds logo to corner of image batch.",
    blueprint: "# Blueprint: Watermark\n\nGoal: Branding.\n\nStack: Python, PIL\n\nLogic:\n1. Load Logo.\n2. Loop Images.\n3. Paste Logo bottom-right.\n4. Save."
  },
  {
    id: 'podcast-rss',
    category: 'Content Ops',
    title: "RSS Generator",
    tagline: "MP3 Folder -> XML Feed.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Generates podcast RSS from local files.",
    blueprint: "# Blueprint: RSS Gen\n\nGoal: Podcasting.\n\nStack: Python, XML\n\nLogic:\n1. Scan MP3s.\n2. Get Duration/Size.\n3. Build <item> tags.\n4. Write feed.xml."
  },
  {
    id: 'markdown-blog',
    category: 'Content Ops',
    title: "Static Blog Builder",
    tagline: "MD -> HTML.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Compiles markdown folder to static site.",
    blueprint: "# Blueprint: SSG\n\nGoal: Blog.\n\nStack: Python, Jinja2\n\nLogic:\n1. Read MD.\n2. Render Template.\n3. Output HTML."
  },
  {
    id: 'social-resize',
    category: 'Content Ops',
    title: "Social Cropper",
    tagline: "Landscape -> Story (9:16).",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Smart crops images for different platforms.",
    blueprint: "# Blueprint: Crop\n\nGoal: Sizes.\n\nStack: Python, PIL\n\nLogic:\n1. Center Crop 1080x1920.\n2. Center Crop 1080x1080.\n3. Save."
  },
  {
    id: 'srt-fixer',
    category: 'Content Ops',
    title: "SRT Syncer",
    tagline: "Shift subtitles by 2s.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Offsets subtitle timestamps.",
    blueprint: "# Blueprint: Time Shift\n\nGoal: Sync.\n\nStack: Python\n\nLogic:\n1. Parse Time.\n2. Add Offset.\n3. Rewrite."
  },
  {
    id: 'readability-score',
    category: 'Content Ops',
    title: "Flesch-Kincaid Scorer",
    tagline: "Grade your copy complexity.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Scores text readability.",
    blueprint: "# Blueprint: Grade Level\n\nGoal: Clarity.\n\nStack: Python, textstat\n\nLogic:\n1. Read File.\n2. Calc Score.\n3. Print Grade."
  },
  {
    id: 'keyword-density',
    category: 'Content Ops',
    title: "Keyword Counter",
    tagline: "SEO Density Check.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Counts target phrase frequency.",
    blueprint: "# Blueprint: Density\n\nGoal: SEO.\n\nStack: Python\n\nLogic:\n1. Count Matches.\n2. Calc % of total words."
  },
  {
    id: 'headline-case',
    category: 'Content Ops',
    title: "Title Case Fixer",
    tagline: "Fix capitalization.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Standardizes headline casing.",
    blueprint: "# Blueprint: TitleCase\n\nGoal: Style.\n\nStack: Python\n\nLogic:\n1. Lowercase small words.\n2. Capitalize others."
  },
  {
    id: 'emoji-stripper',
    category: 'Content Ops',
    title: "Emoji Remover",
    tagline: "Clean text for print.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Removes unicode emojis.",
    blueprint: "# Blueprint: De-Emoji\n\nGoal: Plain text.\n\nStack: Python, regex\n\nLogic:\n1. Regex match unicode range.\n2. Remove."
  },
  {
    id: 'pdf-compressor',
    category: 'Content Ops',
    title: "PDF Shrinker",
    tagline: "Compress huge ebooks.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Reduces PDF size for email.",
    blueprint: "# Blueprint: Compress\n\nGoal: Size.\n\nStack: Python, PDFNet\n\nLogic:\n1. Optimize images.\n2. Save compressed."
  },
  {
    id: 'palette-extract',
    category: 'Content Ops',
    title: "Brand Color Grabber",
    tagline: "Get Hex codes from logo.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Extracts dominant colors.",
    blueprint: "# Blueprint: Palette\n\nGoal: Hex codes.\n\nStack: Python, colorgram\n\nLogic:\n1. Cluster pixels.\n2. Return top 5 Hex."
  },
  {
    id: 'markdown-table',
    category: 'Content Ops',
    title: "Table Formatter",
    tagline: "Align MD tables.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Pretty prints markdown tables.",
    blueprint: "# Blueprint: Align\n\nGoal: Format.\n\nStack: Python\n\nLogic:\n1. Calc column widths.\n2. Pad cells."
  },
  {
    id: 'qr-generator',
    category: 'Content Ops',
    title: "QR Batcher",
    tagline: "URLs to QR Images.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Generates QR codes.",
    blueprint: "# Blueprint: QR\n\nGoal: Offline links.\n\nStack: Python, qrcode\n\nLogic:\n1. Read URL.\n2. Generate PNG."
  },
  {
    id: 'lorem-gen',
    category: 'Content Ops',
    title: "Lorem Ipsum CLI",
    tagline: "Generate dummy text.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Prints placeholder text.",
    blueprint: "# Blueprint: Lorem\n\nGoal: Filler.\n\nStack: Python\n\nLogic:\n1. Print N paragraphs."
  },
  {
    id: 'exif-nuke',
    category: 'Content Ops',
    title: "Metadata Wiper",
    tagline: "Remove GPS from photos.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Privacy cleaner.",
    blueprint: "# Blueprint: Exif Nuke\n\nGoal: Privacy.\n\nStack: Python, PIL\n\nLogic:\n1. Save without metadata."
  },

  // --- SEO (46-60) ---
  {
    id: 'sitemap-audit',
    category: 'SEO',
    title: "Sitemap Health",
    tagline: "Validate XML links.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Checks every link in sitemap.xml.",
    blueprint: "# Blueprint: Sitemap Check\n\nGoal: No 404s.\n\nStack: Python, requests\n\nLogic:\n1. Parse XML.\n2. Ping URLs.\n3. Report Status."
  },
  {
    id: '404-crawler',
    category: 'SEO',
    title: "Broken Link Spider",
    tagline: "Crawl site for 404s.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Internal link crawler.",
    blueprint: "# Blueprint: Spider\n\nGoal: Health.\n\nStack: Python, Scrapy\n\nLogic:\n1. Crawl Internal.\n2. Log Errors."
  },
  {
    id: 'serp-tracker',
    category: 'SEO',
    title: "Mini Rank Tracker",
    tagline: "Check position for Keyword.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Checks Google position (requires proxy).",
    blueprint: "# Blueprint: Rank Check\n\nGoal: Monitoring.\n\nStack: Python, API\n\nLogic:\n1. Query SERP API.\n2. Find Domain.\n3. Log Rank."
  },
  {
    id: 'meta-audit',
    category: 'SEO',
    title: "Meta Tag Check",
    tagline: "Missing Titles/Descriptions.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes headers for SEO tags.",
    blueprint: "# Blueprint: Meta Scan\n\nGoal: On-page.\n\nStack: Python, BS4\n\nLogic:\n1. Extract <title>, <meta desc>.\n2. Check lengths."
  },
  {
    id: 'image-alt-audit',
    category: 'SEO',
    title: "Alt Text Finder",
    tagline: "Find images missing Alt.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Accessibility audit.",
    blueprint: "# Blueprint: Alt Check\n\nGoal: Accessibility.\n\nStack: Python, BS4\n\nLogic:\n1. Find <img>.\n2. Check alt attribute."
  },
  {
    id: 'backlink-checker',
    category: 'SEO',
    title: "Backlink Validtor",
    tagline: "Are partners still linking?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Checks partner pages for your link.",
    blueprint: "# Blueprint: Link Watch\n\nGoal: Off-page.\n\nStack: Python\n\nLogic:\n1. Visit Partner Page.\n2. Find href to MyDomain."
  },
  {
    id: 'pagespeed-bulk',
    category: 'SEO',
    title: "Bulk Core Vitals",
    tagline: "Speed test 50 pages.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Uses PSI API.",
    blueprint: "# Blueprint: Speed\n\nGoal: Performance.\n\nStack: Python, PSI API\n\nLogic:\n1. Loop URLs.\n2. Fetch Score.\n3. Save CSV."
  },
  {
    id: 'redirect-chain',
    category: 'SEO',
    title: "Redirect Tracer",
    tagline: "Find long 301 chains.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Traces hop trace.",
    blueprint: "# Blueprint: Hops\n\nGoal: Tech SEO.\n\nStack: Python, requests\n\nLogic:\n1. Get history.\n2. Count hops.\n3. Alert if > 3."
  },
  {
    id: 'schema-validator',
    category: 'SEO',
    title: "Schema Validator",
    tagline: "Check JSON-LD.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Validates structured data.",
    blueprint: "# Blueprint: Schema\n\nGoal: Rich Snippets.\n\nStack: Python, extruct\n\nLogic:\n1. Extract JSON-LD.\n2. Validate keys."
  },
  {
    id: 'canonical-check',
    category: 'SEO',
    title: "Canonical Audit",
    tagline: "Self-referencing check.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Ensures canonical tag matches URL.",
    blueprint: "# Blueprint: Canonical\n\nGoal: Dupes.\n\nStack: Python\n\nLogic:\n1. Compare URL to <link rel=canonical>."
  },
  {
    id: 'log-analyzer',
    category: 'SEO',
    title: "Log File SEO",
    tagline: "Googlebot Hit Counter.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Parses server logs for Googlebot.",
    blueprint: "# Blueprint: Log Analysis\n\nGoal: Crawl Budget.\n\nStack: Python, Regex\n\nLogic:\n1. Filter User-Agent 'Googlebot'.\n2. Count hits per URL."
  },
  {
    id: 'robots-checker',
    category: 'SEO',
    title: "Robots.txt Monitor",
    tagline: "Did we block the bot?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Alerts on Disallow changes.",
    blueprint: "# Blueprint: Robots\n\nGoal: Safety.\n\nStack: Python\n\nLogic:\n1. Fetch robots.txt.\n2. Check for 'Disallow: /'."
  },
  {
    id: 'heading-hierarchy',
    category: 'SEO',
    title: "H1-H6 Outliner",
    tagline: "Visualise page structure.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Extracts headers in order.",
    blueprint: "# Blueprint: Outline\n\nGoal: Structure.\n\nStack: Python\n\nLogic:\n1. Find h1-h6.\n2. Print indented tree."
  },
  {
    id: 'keyword-cannibal',
    category: 'SEO',
    title: "Cannibalization Check",
    tagline: "Duplicate titles.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Finds pages with same title.",
    blueprint: "# Blueprint: Dupes\n\nGoal: Uniqueness.\n\nStack: Python\n\nLogic:\n1. Scrape Titles.\n2. Find duplicates."
  },
  {
    id: 'ssl-check',
    category: 'SEO',
    title: "SSL Expiry",
    tagline: "Cert monitor.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Alerts before expiry.",
    blueprint: "# Blueprint: SSL\n\nGoal: Uptime.\n\nStack: Python, ssl\n\nLogic:\n1. Get Expiry Date."
  },

  // --- COMPETITOR INTEL (61-75) ---
  {
    id: 'pricing-monitor',
    category: 'Competitor Intel',
    title: "Pricing Watcher",
    tagline: "Alert on price change.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Checks competitor pricing page.",
    blueprint: "# Blueprint: Price Watch\n\nGoal: Alerts.\n\nStack: Python\n\nLogic:\n1. Scrape Price.\n2. Compare to Last.\n3. Alert."
  },
  {
    id: 'visual-diff',
    category: 'Competitor Intel',
    title: "Visual Regression",
    tagline: "Screenshot comparison.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Highlights pixel changes on homepage.",
    blueprint: "# Blueprint: Visual Diff\n\nGoal: Design changes.\n\nStack: Python, Playwright, Pillow\n\nLogic:\n1. Screenshot A & B.\n2. ImageChops.difference()."
  },
  {
    id: 'ad-library',
    category: 'Competitor Intel',
    title: "Ad Library Archiver",
    tagline: "Save competitor ads.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Scrapes FB Ad Library.",
    blueprint: "# Blueprint: Ad Swipe\n\nGoal: Creative.\n\nStack: Python, Selenium\n\nLogic:\n1. Scroll Ad Lib.\n2. Download Images."
  },
  {
    id: 'job-posting-scan',
    category: 'Competitor Intel',
    title: "Hiring Signals",
    tagline: "Count 'Engineer' roles.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Infers strategy from careers page.",
    blueprint: "# Blueprint: Jobs\n\nGoal: Strategy.\n\nStack: Python\n\nLogic:\n1. Scrape Careers.\n2. Count Keywords."
  },
  {
    id: 'news-alert',
    category: 'Competitor Intel',
    title: "News Monitor",
    tagline: "Competitor headlines.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes Google News.",
    blueprint: "# Blueprint: News\n\nGoal: PR.\n\nStack: Python\n\nLogic:\n1. Fetch RSS.\n2. Filter Competitor Name."
  },
  {
    id: 'whois-age',
    category: 'Competitor Intel',
    title: "Domain Age Check",
    tagline: "When did they launch?",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Checks creation date.",
    blueprint: "# Blueprint: Whois\n\nGoal: Intel.\n\nStack: Python, whois\n\nLogic:\n1. Query Whois."
  },
  {
    id: 'sitemap-spy',
    category: 'Competitor Intel',
    title: "New Page Alert",
    tagline: "Detect new landing pages.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Diffs sitemap.xml.",
    blueprint: "# Blueprint: Page Alert\n\nGoal: Intel.\n\nStack: Python\n\nLogic:\n1. Fetch Sitemap.\n2. Compare to History."
  },
  {
    id: 'social-growth',
    category: 'Competitor Intel',
    title: "Follower Tracker",
    tagline: "Log Twitter growth.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes follower count daily.",
    blueprint: "# Blueprint: Social Stats\n\nGoal: Growth.\n\nStack: Python\n\nLogic:\n1. Scrape Profile.\n2. Extract Count."
  },
  {
    id: 'newsletter-archive',
    category: 'Competitor Intel',
    title: "Newsletter Saver",
    tagline: "Archive competitor emails.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Saves emails from Gmail label.",
    blueprint: "# Blueprint: Email Archive\n\nGoal: Swipe file.\n\nStack: Python, IMAP\n\nLogic:\n1. Fetch 'Label:Competitor'.\n2. Save HTML."
  },
  {
    id: 'review-aggregation',
    category: 'Competitor Intel',
    title: "Review Aggregator",
    tagline: "Summarize G2 reviews.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Scrapes and summarizes sentiment.",
    blueprint: "# Blueprint: Reviews\n\nGoal: Intel.\n\nStack: Python, NLP\n\nLogic:\n1. Scrape Reviews.\n2. Keyword freq."
  },
  {
    id: 'tech-lookup-comp',
    category: 'Competitor Intel',
    title: "Stack Detective",
    tagline: "Do they use Hubspot?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Checks headers for tools.",
    blueprint: "# Blueprint: Stack\n\nGoal: Intel.\n\nStack: Python\n\nLogic:\n1. Check Headers/JS."
  },
  {
    id: 'keyword-gap',
    category: 'Competitor Intel',
    title: "Content Gap",
    tagline: "What do they rank for?",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Compares keywords (requires API).",
    blueprint: "# Blueprint: Gap\n\nGoal: SEO.\n\nStack: Python, API\n\nLogic:\n1. Fetch Rankings."
  },
  {
    id: 'wayback-download',
    category: 'Competitor Intel',
    title: "Time Travel",
    tagline: "Download old homepage.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Fetches from Archive.org.",
    blueprint: "# Blueprint: Wayback\n\nGoal: History.\n\nStack: Python\n\nLogic:\n1. Query Archive API.\n2. Fetch."
  },
  {
    id: 'ip-monitor',
    category: 'Competitor Intel',
    title: "Hosting Change",
    tagline: "Did they switch servers?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Logs IP address.",
    blueprint: "# Blueprint: IP\n\nGoal: Infra.\n\nStack: Python\n\nLogic:\n1. Resolve DNS."
  },
  {
    id: 'text-diff-comp',
    category: 'Competitor Intel',
    title: "Copy Change",
    tagline: "Did they change messaging?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Diffs homepage text.",
    blueprint: "# Blueprint: Copy Diff\n\nGoal: Messaging.\n\nStack: Python, difflib\n\nLogic:\n1. Extract Text.\n2. Diff."
  },

  // --- CRM OPS (76-85) ---
  {
    id: 'fuzzy-dedupe',
    category: 'CRM Ops',
    title: "Fuzzy Dedupe",
    tagline: "Merge 'Inc' and 'LLC'.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Fuzzy matches company names.",
    blueprint: "# Blueprint: Dedupe\n\nGoal: Clean Data.\n\nStack: Python, FuzzyWuzzy\n\nLogic:\n1. Compare Strings.\n2. Threshold Match."
  },
  {
    id: 'format-names',
    category: 'CRM Ops',
    title: "Name Case Fix",
    tagline: "JOHN DOE -> John Doe.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Fixes capitalization.",
    blueprint: "# Blueprint: Title Case\n\nGoal: Clean.\n\nStack: Python\n\nLogic:\n1. Title Case."
  },
  {
    id: 'zip-mapper',
    category: 'CRM Ops',
    title: "Territory Mapper",
    tagline: "Zip -> Sales Rep.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Assigns owner by Zip range.",
    blueprint: "# Blueprint: Assign\n\nGoal: Routing.\n\nStack: Python, bisect\n\nLogic:\n1. Range Lookup."
  },
  {
    id: 'lead-score',
    category: 'CRM Ops',
    title: "Lead Scorer",
    tagline: "Calc priority.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scores leads based on Title/Company.",
    blueprint: "# Blueprint: Score\n\nGoal: Prioritize.\n\nStack: Python\n\nLogic:\n1. Points for Keywords."
  },
  {
    id: 'domain-extract',
    category: 'CRM Ops',
    title: "Domain Parser",
    tagline: "Email -> Website.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Extracts domain from email.",
    blueprint: "# Blueprint: Domain\n\nGoal: Extract.\n\nStack: Python\n\nLogic:\n1. Split @."
  },
  {
    id: 'job-title-normalize',
    category: 'CRM Ops',
    title: "Title Normalizer",
    tagline: "VP Sales -> Exec.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Maps specific titles to levels.",
    blueprint: "# Blueprint: Levels\n\nGoal: Segment.\n\nStack: Python\n\nLogic:\n1. Map Keywords."
  },
  {
    id: 'csv-merge',
    category: 'CRM Ops',
    title: "List Merger",
    tagline: "Combine CSVs.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Stacks files.",
    blueprint: "# Blueprint: Merge\n\nGoal: Combine.\n\nStack: Python, Pandas\n\nLogic:\n1. Concat."
  },
  {
    id: 'anomaly-detect',
    category: 'CRM Ops',
    title: "Bad Data Find",
    tagline: "Find outliers.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Detects anomalies in fields.",
    blueprint: "# Blueprint: Anomaly\n\nGoal: QA.\n\nStack: Python, sklearn\n\nLogic:\n1. IsolationForest."
  },
  {
    id: 'null-report',
    category: 'CRM Ops',
    title: "Empty Field Report",
    tagline: "Who is missing phone?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Counts missing values.",
    blueprint: "# Blueprint: Nulls\n\nGoal: QA.\n\nStack: Python\n\nLogic:\n1. Count Nulls."
  },
  {
    id: 'splitter',
    category: 'CRM Ops',
    title: "List Splitter",
    tagline: "Divide for SDRs.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Chunks CSV.",
    blueprint: "# Blueprint: Split\n\nGoal: Ops.\n\nStack: Python\n\nLogic:\n1. Chunk rows."
  },

  // --- SOCIAL AUTO (86-92) ---
  {
    id: 'buffer-csv',
    category: 'Social Automation',
    title: "Buffer CSV Gen",
    tagline: "Format for Buffer.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Formats text for upload.",
    blueprint: "# Blueprint: Buffer\n\nGoal: Schedule.\n\nStack: Python\n\nLogic:\n1. Format Columns."
  },
  {
    id: 'image-quote',
    category: 'Social Automation',
    title: "Quote Maker",
    tagline: "Text -> Image.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Generates quote card.",
    blueprint: "# Blueprint: Quote\n\nGoal: Content.\n\nStack: Python, PIL\n\nLogic:\n1. Draw Text."
  },
  {
    id: 'trend-alert',
    category: 'Social Automation',
    title: "Trend Watch",
    tagline: "Twitter Trends.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Alerts on keywords.",
    blueprint: "# Blueprint: Trends\n\nGoal: News.\n\nStack: Python, API\n\nLogic:\n1. Fetch Trends."
  },
  {
    id: 'auto-dm',
    category: 'Social Automation',
    title: "DM List Maker",
    tagline: "Prepare DMs.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Merges name into template.",
    blueprint: "# Blueprint: DM\n\nGoal: Outreach.\n\nStack: Python\n\nLogic:\n1. Replace {{Name}}."
  },
  {
    id: 'bio-updater',
    category: 'Social Automation',
    title: "Bio Rotator",
    tagline: "Update link weekly.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Updates Twitter Bio URL.",
    blueprint: "# Blueprint: Bio\n\nGoal: Promo.\n\nStack: Python, API\n\nLogic:\n1. Update Profile."
  },
  {
    id: 'follower-diff',
    category: 'Social Automation',
    title: "Follower Audit",
    tagline: "Who unfollowed?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Compares friend lists.",
    blueprint: "# Blueprint: Unfollows\n\nGoal: Stats.\n\nStack: Python\n\nLogic:\n1. Diff Sets."
  },
  {
    id: 'activity-log',
    category: 'Social Automation',
    title: "Engagement Log",
    tagline: "Track your replies.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Logs your activity.",
    blueprint: "# Blueprint: Log\n\nGoal: Audit.\n\nStack: Python, API\n\nLogic:\n1. Fetch User Timeline."
  },

  // --- OUTREACH & CRO (93-100) ---
  {
    id: 'mail-merge',
    category: 'Outreach',
    title: "Local Mail Merge",
    tagline: "Send emails via Gmail.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Sends personalized emails.",
    blueprint: "# Blueprint: Merge\n\nGoal: Send.\n\nStack: Python, SMTP\n\nLogic:\n1. Send Emails."
  },
  {
    id: 'warmup-generator',
    category: 'Outreach',
    title: "Warmup Text Gen",
    tagline: "Generate AI openers.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Uses LLM for first lines.",
    blueprint: "# Blueprint: Opener\n\nGoal: Personalize.\n\nStack: Python, OpenAI\n\nLogic:\n1. Generate Text."
  },
  {
    id: 'subject-line-tester',
    category: 'Outreach',
    title: "Subject Line Grade",
    tagline: "Rate email subjects.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Checks length/keywords.",
    blueprint: "# Blueprint: Subject\n\nGoal: Open Rate.\n\nStack: Python\n\nLogic:\n1. Score string."
  },
  {
    id: 'ab-calc',
    category: 'CRO',
    title: "Significance Calc",
    tagline: "Is A better than B?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Stats calculator.",
    blueprint: "# Blueprint: Stat Sig\n\nGoal: Math.\n\nStack: Python\n\nLogic:\n1. Z-Score."
  },
  {
    id: 'heat-map-gen',
    category: 'CRO',
    title: "Click Heatmap",
    tagline: "Plot clicks on image.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Visualizes coords.",
    blueprint: "# Blueprint: Heatmap\n\nGoal: Viz.\n\nStack: Python, PIL\n\nLogic:\n1. Plot Points."
  },
  {
    id: 'funnel-viz',
    category: 'CRO',
    title: "Funnel Graph",
    tagline: "Visualize dropoff.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Draws funnel chart.",
    blueprint: "# Blueprint: Funnel\n\nGoal: Viz.\n\nStack: Python, Plotly\n\nLogic:\n1. Draw Funnel."
  },
  {
    id: 'form-tester',
    category: 'CRO',
    title: "Form Health",
    tagline: "Check form submit.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Auto-submits test lead.",
    blueprint: "# Blueprint: QA\n\nGoal: Uptime.\n\nStack: Python, Playwright\n\nLogic:\n1. Submit Form."
  },
  {
    id: 'utm-builder',
    category: 'Marketing Ops',
    title: "UTM Factory",
    tagline: "Build links.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Standard generator.",
    blueprint: "# Blueprint: UTM\n\nGoal: Tracking.\n\nStack: Python\n\nLogic:\n1. Concat strings."
  }
];

export const categoryIcons: Record<Category, any> = {
  'Lead Gen': Users,
  'Enrichment': Database,
  'Content Ops': PenTool,
  'SEO': Globe,
  'Competitor Intel': Search,
  'CRO': BarChart,
  'CRM Ops': Zap,
  'Social Automation': Share2,
  'Outreach': Mail
};
