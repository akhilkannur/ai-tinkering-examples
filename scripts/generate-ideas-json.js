const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const recipesDir = path.join(process.cwd(), 'content/recipes');
const outputFilePath = path.join(process.cwd(), 'lib/ideas-data.json');

const verticalMap = {
  'Marketing': 'Marketing',
  'Marketing Ops': 'Marketing',
  'Paid Media': 'Marketing',
  'Content Ops': 'Marketing',
  'SEO': 'Marketing',
  'SEO Ops': 'Marketing',
  'CRO': 'Marketing',
  'Sales': 'Sales',
  'Sales Ops': 'Sales',
  'Lead Gen': 'Sales',
  'Competitive Intel': 'Sales',
  'Strategic Ops': 'Ops',
  'Ops': 'Ops',
  'RevOps': 'Ops',
  'Finance Ops': 'Finance',
  'Finance': 'Finance',
  'Product Ops': 'Product',
  'Product': 'Product',
  'Customer Success': 'Customer Success',
  'CS': 'Customer Success',
  'People Ops': 'HR',
  'HR': 'HR',
  'Legal': 'Legal',
  'Legal Ops': 'Legal',
  'Executive Ops': 'Executive',
  'CEO Ops': 'Executive',
  'Strategic': 'Executive'
};

function determineBestTool(title, tagline, body) {
  const c = (title + ' ' + tagline + ' ' + body).toLowerCase();
  
  if (c.includes('claude code') || c.includes('terminal') || c.includes('local file')) {
    return { tool: "Claude Code", why: "It can directly read and write files on your computer, making it 10x faster for technical tasks." };
  }
  if (c.includes('make.com') || c.includes('zapier') || c.includes('automation') || c.includes('recurring')) {
    return { tool: "Make.com", why: "This works best as a set-it-and-forget-it system that connects your different business tools automatically." };
  }
  
  if ((c.includes('image') || c.includes('visual') || c.includes('design') || c.includes('screenshot') || c.includes('midjourney')) && 
      !(c.includes('launch') || c.includes('write') || c.includes('strategy'))) {
    return { tool: "Midjourney", why: "It generates professional, high-quality visuals that match your brand's aesthetic perfectly." };
  }
  
  if (c.includes('pdf') || c.includes('10-k') || c.includes('transcript') || c.includes('long report') || c.includes('analyze') || c.includes('narrative') || c.includes('legal')) {
    return { tool: "Claude", why: "Claude handles long documents and complex instructions with more nuance and accuracy than other tools." };
  }
  
  return { tool: "ChatGPT", why: "It is the most accessible tool for quick drafting, brainstorming, and general business research." };
}

function generateActionSteps(title, tagline, tool) {
  const t = (title + ' ' + tagline).toLowerCase();
  
  if (t.includes('negotiator') || t.includes('script') || t.includes('writer') || t.includes('chameleon') || t.includes('draft') || t.includes('respond') || t.includes('reply') || t.includes('comment')) {
    return [
      `Identify the specific document, email, or script you want to refine.`,
      `Paste the raw text into ${tool} and describe the tone you want to achieve.`,
      `Review the generated variations and pick the one that feels most natural for your brand.`
    ];
  }
  
  if (t.includes('hunter') || t.includes('detective') || t.includes('scout') || t.includes('scraper') || t.includes('miner') || t.includes('finder') || t.includes('source')) {
    return [
      `Choose a source where your target audience or data lives (e.g., a website, job board, or LinkedIn).`,
      `Supply the URL or raw data to ${tool} and ask it to filter for high-value signals.`,
      `Take the cleaned list and move it directly into your outreach process or CRM.`
    ];
  }
  
  if (t.includes('auditor') || t.includes('analyzer') || t.includes('heatmapper') || t.includes('scorer') || t.includes('matrix') || t.includes('monitor') || t.includes('check') || t.includes('audit')) {
    return [
      `Pull a report of your latest performance metrics—like ad spend, sales call logs, or website visits.`,
      `Upload the file to ${tool} and ask it to highlight the top 3 bottlenecks where you're losing money.`,
      `Implement the suggested optimizations to stop wasting time or budget on what isn't working.`
    ];
  }
  
  if (t.includes('architect') || t.includes('builder') || t.includes('factory') || t.includes('optimizer') || t.includes('generator') || t.includes('launcher') || t.includes('onboarding') || t.includes('link')) {
    return [
      `Define the core goal of what you're trying to build or launch (e.g., a new internal linking strategy or onboarding flow).`,
      `Use ${tool} to generate a structured framework or initial draft based on industry best practices.`,
      `Refine the output and deploy it as a new standard process for your team.`
    ];
  }

  if (t.includes('locator') || t.includes('mapper') || t.includes('city') || t.includes('geo')) {
    return [
      `Gather your geographic data, like customer addresses or event locations.`,
      `Ask ${tool} to cluster the data and identify the high-density areas.`,
      `Use the map to decide where to focus your next physical event or local ad campaign.`
    ];
  }

  return [
    `Identify the manual process you want to simplify.`,
    `Paste your raw notes or data into ${tool} and ask for a strategic plan.`,
    `Execute the top 3 recommendations to reclaim your time.`
  ];
}

function cleanDescription(desc) {
  if (!desc) return 'Automates repetitive manual tasks.';
  
  let d = desc
    .replace(/This tool/gi, '')
    .replace(/This agent/gi, '')
    .replace(/This automation/gi, '')
    .replace(/This workflow/gi, '')
    .replace(/It scans/gi, 'Scan')
    .replace(/It finds/gi, 'Find')
    .replace(/It researches/gi, 'Research')
    .replace(/It drafts/gi, 'Draft')
    .replace(/It identifies/gi, 'Identify')
    .replace(/It analyzes/gi, 'Analyze')
    .replace(/It parses/gi, 'Parse')
    .replace(/It takes/gi, 'Use')
    .replace(/It checks/gi, 'Check')
    .replace(/It helps/gi, 'Use this to')
    .replace(/Parses /g, 'Scan ')
    .replace(/Takes /g, 'Use ')
    .replace(/Checks /g, 'Scan ')
    .replace(/helps /gi, 'Use this to ')
    .replace(/agent/gi, 'process')
    .replace(/workflow/gi, 'process')
    .replace(/automation/gi, 'process')
    .replace(/\n/g, ' ')
    .trim();
  
  d = d.charAt(0).toUpperCase() + d.slice(1);
  d = d.replace(/\s\s+/g, ' ');
  d = d.replace(/^Idea:\s+/i, '').replace(/^Process:\s+/i, '');
  
  return d;
}

const manualOverrides = {
  "10k-report-prospector": {
    "problem": "Sales reps waste hours reading 100-page financial reports to find a relevant hook for enterprise prospects.",
    "what_ai_does": "It scans 10-K \"Risk Factors\" to find specific threats your product solves, then drafts an email citing their own report as the reason for reaching out.",
    "howToDoIt": [
      "Find the **Item 1A (Risk Factors)** section of a prospect's latest 10-K.",
      "Paste that text into Claude and ask it to list 3 threats related to your product's niche.",
      "Use the generated \"Risk-to-Solution\" bridge to draft a hyper-relevant outreach email."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Better for long financial docs"
  },
  "abandoned-cart-sms": {
    "problem": "Generic recovery texts (\"You forgot something!\") are annoying and convert poorly because they lack specific product value.",
    "what_ai_does": "It scrapes your live product page to find unique benefits (like \"Lifetime Warranty\" or \"Organic Cotton\") and weaves them into a persuasive 3-part SMS sequence.",
    "howToDoIt": [
      "Paste your product URL into ChatGPT and ask for the #1 unique selling point mentioned on the page.",
      "Have the tool draft a 3-part SMS sequence: a gentle nudge, a value-based reminder (the \"Hook\"), and a scarcity-driven final call.",
      "Review the drafts for character limits before sending."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast drafting and character counting"
  },
  "abm-campaign-asset-builder": {
    "problem": "Marketing teams struggle to scale personalized landing pages for high-value accounts, resulting in generic copy that misses the mark.",
    "what_ai_does": "It researches a target company's current strategic goals from news and annual reports to write landing page headlines using their specific internal language.",
    "howToDoIt": [
      "Enter your target company name into Claude and ask for their \"top 3 strategic priorities for this fiscal year.\"",
      "Use those priorities to write 3 variations of a landing page headline that positions your product as a catalyst for those specific goals.",
      "Draft a \"Why Now\" section for the page citing a recent news event or milestone you found."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Sophisticated research capabilities"
  },
  "abm-personal-gift-recommender": {
    "problem": "Sending generic corporate swag (like cheap mugs) results in low ROI and budget waste because it doesn't build a real connection.",
    "what_ai_does": "It researches a prospect's social media interests to suggest a personalized $50 gift that actually matches their hobbies or personal brand.",
    "howToDoIt": [
      "Paste a prospect's public LinkedIn or X profile handle into ChatGPT.",
      "Ask it to identify 3 distinct personal interests (e.g., \"Enthusiastic Golfer\", \"Sci-Fi Fan\").",
      "Review the curated list of 3 specific gift ideas under $50 that match those interests."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Creative personal research"
  },
  "about-page-storyteller": {
    "problem": "Faceless \"corporate\" about pages fail to build trust with customers who want to know the people and mission behind the brand.",
    "what_ai_does": "It transforms boring company facts and founder bios into a compelling \"Hero's Journey\" story that highlights the \"Aha!\" moment and the mission.",
    "howToDoIt": [
      "Paste your current \"About\" text and a founder's bio into Claude.",
      "Ask it to structure the story into 4 phases: The Problem (Status Quo), The Epiphany (The Prototype), The Mission, and The Proof.",
      "Review the draft to ensure the tone sounds human and mission-driven, not corporate."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Better narrative flow and \"voice\""
  },
  "ad-copy-character-counter": {
    "problem": "Marketers waste hours manually trying to fit their value props into the strict, varying character limits of Google, FB, and LinkedIn.",
    "what_ai_does": "It takes a single headline and automatically generates 10 platform-perfect variants that maximize CTR while strictly adhering to character limits.",
    "howToDoIt": [
      "Paste your rough headline into ChatGPT.",
      "Specify your target platforms (e.g., \"Google 30 char, FB 40 char\").",
      "Select the highest-converting angle for each platform."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast drafting and character counting"
  },
  "ad-counter-strike": {
    "problem": "Blindly attacking competitors is less effective than targeting the specific pain points their customers are already complaining about.",
    "what_ai_does": "It scans competitor review sites (G2/Capterra) to find recurring complaints and writes \"Switching\" ads that highlight your strength in those exact areas.",
    "howToDoIt": [
      "Paste 10 recent negative reviews of a competitor into Claude.",
      "Ask it to find the #1 recurring complaint (e.g., \"Hidden Fees\" or \"Bad Support\").",
      "Draft a direct-attack ad that positions you as the transparent or reliable alternative."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Pattern recognition"
  },
  "affiliate-application-auto-screener": {
    "problem": "Manual screening of affiliate applications is slow and prone to approving spammy \"coupon farm\" websites that hurt your brand.",
    "what_ai_does": "It automatically audits an applicant's website to flag low-quality content, adult content, or parked domains, approving only real content creators.",
    "howToDoIt": [
      "Export your list of affiliate applicant URLs.",
      "Paste them into ChatGPT and ask it to categorize each site type (e.g., \"Coupon Farm,\" \"Blog,\" \"Review Site\").",
      "Review the \"Approve\" list for legitimate influencers and creators."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Quick classification"
  },
  "affiliate-program-launcher": {
    "problem": "Building a commission-only sales team is daunting without a structured recruitment and commission strategy.",
    "what_ai_does": "It benchmarks competitor affiliate programs and drafts personalized recruitment pitches for potential industry partners.",
    "howToDoIt": [
      "Paste 3 competitor affiliate program URLs into Claude.",
      "Ask it to outline a competitive commission structure for your niche.",
      "Draft 5 personalized outreach emails for potential partners found via LinkedIn."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Market benchmarking"
  },
  "agent-context-builder": {
    "problem": "AI tools give generic or bad answers when they don't understand your specific project structure and file rules.",
    "what_ai_does": "It scans your project directory to create a \"ReadMe for Robots\" that makes every future AI interaction 10x faster and more accurate.",
    "howToDoIt": [
      "Open your project folder in Claude Code (Terminal).",
      "Ask the tool to \"Generate an AGENTS.md project map\".",
      "Review the file to ensure your coding conventions and file locations are clearly documented for the AI."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Local file access"
  },
  "ai-internal-linking-agent": {
    "problem": "Manual internal linking is the highest-ROI SEO task but is incredibly tedious to do across 100+ blog posts.",
    "what_ai_does": "It maps your entire content library to find the exact spots where old posts should link to new content to boost your domain authority.",
    "howToDoIt": [
      "Crawl your sitemap to get a list of all informational blog post URLs.",
      "Provide your top 5 \"Money Pages\" (high-conversion products) to Claude Code.",
      "Ask the tool to identify semantic gaps in your blog posts where a link to a \"Money Page\" would be natural and helpful."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "File system access and semantic analysis"
  },
  "alternative-to-builder": {
    "problem": "Most brands miss out on high-intent \"Alternative to [Competitor]\" search traffic because they don't have comparison pages.",
    "what_ai_does": "It researches competitor weaknesses to generate a library of comparison landing pages that position your product as the better choice.",
    "howToDoIt": [
      "List your top 3 competitors in a text file.",
      "Paste the list into Claude and ask for the top 3 recurring complaints for each from public forums.",
      "Draft a comparison matrix for each competitor highlighting your unique strengths."
    ],
    "bestTool": "Claude",
    "whyThisTool": "In-depth competitor analysis and content generation"
  },
  "alumni-network-miner": {
    "problem": "Cold outreach is often ignored; the warmest paths to decision-makers are often hidden in shared university backgrounds.",
    "what_ai_does": "It matches your executive team's university alumni networks with decision-makers at target accounts to facilitate warm introductions.",
    "howToDoIt": [
      "List your executive team's universities in a CSV.",
      "Use ChatGPT to generate LinkedIn search operators for \"Alumni at [Target Company] in [Role]\".",
      "Identify the strongest overlap and draft a \"fellow alum\" intro email."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Generating targeted search queries and outreach copy"
  },
  "angel-investor-portfolio-scanner": {
    "problem": "It's hard to find early-stage leads who are backed by investors you already have a relationship with.",
    "what_ai_does": "It scans the public portfolios of specific Angel Investors to find growing startups that fit your ICP, leveraging the \"friendly investor\" angle.",
    "howToDoIt": [
      "Paste an Angel Investor's portfolio URL into ChatGPT.",
      "Ask it to filter the companies by industry and size to match your ICP.",
      "Draft an outreach email mentioning the shared investor connection."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Extracting and filtering data from web pages"
  },
  "annual-report-keyword-hunter": {
    "problem": "Public companies reveal their buying intent in 10-K reports, but manually hunting for budget signals across 100 companies is slow.",
    "what_ai_does": "It scans annual reports for keywords like \"Digital Transformation\" or \"AI Adoption\" to pinpoint accounts with budget for your solution.",
    "howToDoIt": [
      "Export a list of 10-K or 10-Q filings for your target accounts.",
      "Paste the text into Claude and ask it to find any mention of \"budget allocation\" for your specific category.",
      "Review the \"Budget Signal\" report to prioritize your outreach."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Analyzing large text documents for specific signals"
  },
  "app-store-screenshot-optimizer": {
    "problem": "App screenshots are your billboard, but most are unoptimized and fail to address the core \"search intent\" of the user.",
    "what_ai_does": "It researches top-ranking competitors in your category to draft optimized \"Caption Text\" for your first 5 screenshots to maximize conversion.",
    "howToDoIt": [
      "Paste your App Store URL and your top competitor's URL into ChatGPT.",
      "Ask it to compare the value propositions in the first 3 screenshots.",
      "Draft a 5-slide narrative for your own screenshots that addresses the #1 pain point found."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Comparative analysis and creative content generation"
  },
  "autonomous-sales-sniper": {
    "problem": "Sales pipelines are often clogged with low-quality service leads (like agencies) that will never buy your SaaS product.",
    "what_ai_does": "It automatically searches your target segments and filters out service providers to build a highly qualified, SaaS-only prospect list.",
    "howToDoIt": [
      "Define your target industry and location.",
      "Use ChatGPT to find a list of companies in that niche.",
      "Ask the tool to \"disqualify anyone who sells hours or services\" based on their website copy."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Lead filtering and qualification based on rules"
  },
  "b2b-marketplace-scraper": {
    "problem": "Identifying tech-forward companies in specific software ecosystems (like Shopify or HubSpot) is a manual research task.",
    "what_ai_does": "It scrapes B2B app stores to find companies that are active players in specific ecosystems, providing a list of tech-savvy prospects.",
    "howToDoIt": [
      "Choose a marketplace (e.g., Salesforce AppExchange).",
      "Use ChatGPT to identify the top 20 apps in a specific category (e.g., \"Analytics\").",
      "Export the list of developer companies to target as potential partners."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Extracting and categorizing data from web pages"
  },
  "bad-review-poacher": {
    "problem": "The easiest leads to close are users who are actively unhappy with your competitors, but finding them in real-time is hard.",
    "what_ai_does": "It monitors review sites for 1-3 star reviews of your competitors and prepares a \"solution\" pitch based on their specific complaint.",
    "howToDoIt": [
      "Paste 5 recent negative reviews of a competitor into Claude.",
      "Ask it to extract the specific \"unresolved frustration\" from each reviewer.",
      "Draft a personalized outreach message offering to solve that specific frustration."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Analyzing sentiment and extracting pain points from reviews"
  },
  "beta-tester-recruiter": {
    "problem": "New features often fail because companies get low-quality feedback from the \"wrong\" users instead of their power users.",
    "what_ai_does": "It identifies your most active users and drafts exclusive, high-urgency invites for your beta program to ensure quality feedback.",
    "howToDoIt": [
      "Export a list of users who logged in >5 times this week.",
      "Paste the list into ChatGPT and ask it to draft a \"Secret Beta\" invite email.",
      "Review the drafts for a tone of exclusivity and high urgency."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Identifying active users and drafting persuasive copy"
  },
  "billing-contact-verification": {
    "problem": "Bounced invoices are the fastest way to lose paying customers, but most companies don't audit their billing contacts until it's too late.",
    "what_ai_does": "It audits your billing database to identify \"dead\" contacts and suggests fallback finance emails (like finance@company.com) to rescue revenue.",
    "howToDoIt": [
      "Export your billing contact list with \"Bounce Status\" from your email tool.",
      "Paste the list into ChatGPT and ask it to generate fallback emails for any \"Hard Bounce\".",
      "Update your CRM with the new finance department contacts."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Identifying bounced contacts and generating recovery options"
  },
  "billing-frequency-upsell": {
    "problem": "Many monthly users are stable enough for Annual plans, but companies miss the cash flow boost by not identifying them.",
    "what_ai_does": "It filters your stable monthly customers (>6 months tenure) to create a prioritized target list for Annual pre-pay conversion campaigns.",
    "howToDoIt": [
      "Export your customer list with \"Signup Date\" and \"Plan Type\".",
      "Use ChatGPT to filter for monthly users with a tenure over 6 months.",
      "Draft an \"Annual Plan Discount\" email targeting this specific stable segment."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Customer segmentation and campaign drafting"
  },
  "bio-link-optimizer": {
    "problem": "Most \"Link in Bio\" pages suffer from choice paralysis, leading to low click-through rates on the primary offer.",
    "what_ai_does": "It audits your current link structure to suggest a prioritized layout that drives users toward your most profitable business goal.",
    "howToDoIt": [
      "Paste your current \"Link in Bio\" URL into ChatGPT.",
      "Ask it to identify the \"conversion bottleneck\" based on the number of links.",
      "Select the top 3 links and rewrite their headlines to be more benefit-driven."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Auditing and optimizing call-to-action placement"
  },
  "blueprint-architect": {
    "problem": "High-value manual processes are hard to standardize and scale across a team without a structured workflow document.",
    "what_ai_does": "It turns any messy manual process description into a standardized, 3-Phase AI Blueprint that anyone on your team can follow.",
    "howToDoIt": [
      "Record a quick voice note or write a paragraph explaining a manual task you do.",
      "Paste the text into Claude and ask it to \"Generate a 3-Phase Blueprint\".",
      "Review the structured workflow for clarity and tool-agnostic logic."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Structuring complex information into actionable steps"
  },
  "board-member-network-mapper": {
    "problem": "Bypassing the standard sales process requires high-level intros, but most teams don't know who their board members are connected to.",
    "what_ai_does": "It maps shared board memberships between your investors and target accounts to find \"side door\" entry points into the C-suite.",
    "howToDoIt": [
      "List your board members and your top 10 target companies.",
      "Use ChatGPT to research which other boards your members sit on.",
      "Identify any direct or 2nd-degree board connections to your target accounts."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Mapping professional networks and identifying warm introductions"
  },
  "booth-design-checklist": {
    "problem": "Trade show booths are often generic and fail to attract the right audience, leading to low booth traffic and wasted event budget.",
    "what_ai_does": "It researches the specific attendee profile of your target events to design custom booth layouts, catchy slogans (\"hooks\"), and relevant swag strategies for each show.",
    "howToDoIt": [
      "List your upcoming events and booth sizes in a CSV.",
      "Use AI to research the \"Attendee Persona\" and \"Major Sponsors\" for each event URL.",
      "Generate a \"Big Statement\" for your booth's back wall and a \"Demo Flow\" optimized for your specific booth footprint."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Better at creative design and audience research"
  },
  "booth-scan-lead-router": {
    "problem": "Event leads often sit in a CSV for days or weeks because manual routing to the correct regional or industry sales rep is slow and error-prone.",
    "what_ai_does": "It automatically processes bulk badge scan exports and instantly routes leads to the correct sales rep based on your custom territory logic (e.g., State or Industry).",
    "howToDoIt": [
      "Export your raw badge scan CSV from the event app.",
      "Define your territory mapping (e.g., \"CA/NY -> Team West\", \"Finance -> Team A\") in a prompt.",
      "Let AI categorize every lead and output a \"Cleaned & Routed\" file ready for your CRM."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and mapping"
  },
  "brand-voice-guidelines": {
    "problem": "As a team grows, the company's \"voice\" becomes inconsistent across social media, emails, and blogs, making the brand feel unprofessional or \"schizophrenic.\"",
    "what_ai_does": "It audits your existing website and top-performing content to create a standardized \"Brand Voice Bible\" with specific Do's/Don'ts and a unique vocabulary.",
    "howToDoIt": [
      "Paste links to your homepage and 3 best-performing blog posts or social threads into the AI.",
      "Ask it to identify 3 core adjectives (e.g., \"Minimalist, Direct, Empathetic\") and create a \"This, Not That\" word list.",
      "Save the resulting \"Voice Bible\" as a PDF for all employees and new hires."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at capturing and codifying subtle tone nuances"
  },
  "brand-voice-rewriter": {
    "problem": "Technical documentation or rough drafts often sound boring and \"robotic,\" failing to engage the target audience or match your brand's personality.",
    "what_ai_does": "It takes any rough draft and instantly rewrites it into multiple distinct styles—like \"Enterprise Trust,\" \"Witty Startup,\" or \"Direct Minimalist\"—while keeping the core facts intact.",
    "howToDoIt": [
      "Paste your rough text or technical notes into the AI.",
      "Provide a sample of your ideal \"Brand Voice\" or choose a preset style (e.g., \"Challenger Brand\").",
      "Review the rewritten variations and pick the one that matches your specific campaign goal."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for fast style-switching and creative drafting"
  },
  "builtwith-tech-pivot": {
    "problem": "Raw BuiltWith reports are massive and \"noisy,\" making it hard for sales teams to find the specific high-revenue companies using a competitor's product.",
    "what_ai_does": "It filters raw technology reports against your specific ICP (Ideal Customer Profile) to pinpoint the most valuable \"displacement\" opportunities.",
    "howToDoIt": [
      "Download a raw \"Technology Report\" (CSV) for a specific competitor.",
      "Use AI to filter the list based on revenue, industry, or company size.",
      "Generate a \"Displacement Angle\" for each account (e.g., \"Company X is likely overpaying for Tech Y at this scale\")."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Handles CSV data filtering and logical grouping quickly"
  },
  "business-card-digitizer": {
    "problem": "Collecting business cards at events is great, but manually typing them into a CRM is a slow, mind-numbing task that often results in lost leads.",
    "what_ai_does": "It scans stacks of business card photos, extracts contact info via OCR, and maps them into a clean, CRM-ready CSV file in seconds.",
    "howToDoIt": [
      "Take photos of your collected business cards in batches (even multiple cards per photo).",
      "Upload the images to an AI with vision capabilities.",
      "Ask it to \"Extract Name, Company, Email, and Title into a CSV table\" and download the result."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Best-in-class image analysis and data extraction"
  },
  "buying-committee-gap-analyzer": {
    "problem": "Deals often stall or die because sales reps haven't identified or engaged the full \"Buying Committee\" (e.g., Finance, IT, or Security), leaving invisible blockers to kill the deal late in the cycle.",
    "what_ai_does": "It audits your current CRM contact list for target accounts to instantly flag missing key roles like CTO, Finance, or User Lead, ensuring you have a complete map of decision-makers.",
    "howToDoIt": [
      "Export a list of your open opportunities and associated contacts from your CRM.",
      "Provide the list to AI and define your \"Required Roles\" (e.g., \"Must have 1 Executive and 1 Technical contact\").",
      "Review the generated \"Gap Report\" to see exactly which accounts need more prospecting to find the missing stakeholders."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and logical gap analysis"
  },
  "buying-signal-heatmapper": {
    "problem": "Sales teams waste time cold-calling accounts that aren't ready to buy, while missing \"hot\" accounts that are actively hiring for roles related to their product.",
    "what_ai_does": "It aggregates disparate intent signals—like new job postings, recent funding news, and website visits—into a single \"Heat Score\" to tell you exactly which accounts to prioritize today.",
    "howToDoIt": [
      "Feed a CSV of recent \"signals\" (e.g., from LinkedIn or Google Alerts) into the AI.",
      "Assign weighted points to different signals (e.g., \"Hiring = 20 pts\", \"Pricing Page Visit = 50 pts\").",
      "Let AI sum the scores per account and output a prioritized \"Hot List\" for your sales team."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for scoring logic and data aggregation"
  },
  "call-sentiment-win-correlation": {
    "problem": "Sales managers know some calls go better than others, but they can't manually listen to 1,000 recordings to find the specific \"Winning Tone\" or phrases that actually lead to closed deals.",
    "what_ai_does": "It cross-references sentiment scores from thousands of call transcripts with actual deal outcomes (Won/Lost) to identify the linguistic predictors of sales success.",
    "howToDoIt": [
      "Export your call sentiment scores (from a tool like Gong or Chorus) and your deal outcomes from your CRM.",
      "Provide the two lists to AI and ask it to \"Find the correlation between average sentiment and win rate.\"",
      "Review the \"Winning Tone\" report to train your team on the specific conversational styles that drive revenue."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at identifying subtle patterns and correlations in large text datasets"
  },
  "cancellation-flow-auditor": {
    "problem": "Most SaaS companies have a generic \"Are you sure?\" cancellation button that does nothing to prevent churn, missing one last chance to save a customer.",
    "what_ai_does": "It researches industry-leading retention tactics and audits your offboarding flow to design custom \"Deflection Pages\" that offer tailored alternatives based on the customer's specific reason for leaving.",
    "howToDoIt": [
      "Paste your current \"Cancel\" button copy and common churn reasons into the AI.",
      "Ask it to design a 3-step deflection logic (e.g., \"If [Price], offer a 2-month discount; If [No Use], offer a free expert training session\").",
      "Implement the drafted copy and UI flow to start \"saving\" customers before they finalize their cancellation."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Better at strategic design and empathetic, persuasive copywriting"
  },
  "canonical-tag-auditor": {
    "problem": "Technical SEO errors like \"Self-referencing Canonical\" conflicts or accidental \"NoIndex\" tags are invisible to the naked eye but can wipe your site's traffic off Google overnight.",
    "what_ai_does": "It crawls your live pages to find the \"Big 3\" silent killers of SEO—canonical mismatches, accidental NoIndex tags, and broken internal links—before they impact your rankings.",
    "howToDoIt": [
      "Paste a list of your top 20 URLs or your XML sitemap into the AI.",
      "Ask it to \"Check for Canonical vs. URL mismatches and NoIndex tags\" on each page.",
      "Review the \"SEO Triage Report\" and hand it to your developers to fix critical indexing blockers."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl URLs and analyze technical HTML structure with high precision"
  },
  "case-study-factory": {
    "problem": "Sales teams desperately need social proof, but turning raw client interview transcripts into polished, persuasive case studies takes hours of manual writing and editing.",
    "what_ai_does": "It reads through a folder of raw interview notes or transcripts and instantly transforms them into structured \"Success Stories\" using the STAR method (Situation, Task, Action, Result).",
    "howToDoIt": [
      "Upload your raw client interview transcripts or Zoom call notes to the AI.",
      "Ask it to \"Identify the Villain (Pain), the Hero (Product), and the Victory (ROI)\" for each client.",
      "Generate a polished case study, a LinkedIn post, and a sales email snippet for every success story."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast drafting and excellent at following structured formats like the STAR method"
  },
  "case-study-interviewer-bot": {
    "problem": "Most case study interviews are shallow because the interviewer forgets to ask for the specific \"Before vs. After\" metrics that actually close deals.",
    "what_ai_does": "It generates a custom interview script tailored to the specific \"Win\" your customer experienced, ensuring you extract high-impact \"Hero's Journey\" soundbites and ROI data.",
    "howToDoIt": [
      "Provide the AI with brief notes about a client's success (e.g., \"Company X saved 20 hours/week using our automation\").",
      "Ask it to generate a 5-question interview guide focused on the \"Breaking Point,\" the \"After Metric,\" and the \"Soundbite.\"",
      "Use the script during your next client call to capture the specific data points needed for a world-class case study."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at conversational design and narrative structure"
  },
  "category-growth-trends": {
    "problem": "E-commerce brands often buy inventory based on last month's sales data, only to realize too late that the trend is already \"cooling down,\" leading to dead stock and wasted capital.",
    "what_ai_does": "It calculates \"Trend Momentum\" by analyzing the second derivative of your sales data (Acceleration), identifying if a category is \"Surging\" (Buy More) or \"Peaking\" (Liquidate Now).",
    "howToDoIt": [
      "Export your last 3 months of category-level sales data into a CSV.",
      "Provide the data to the AI and ask it to \"Calculate Velocity and Acceleration\" for each category.",
      "Review the \"Inventory Buying Guide\" to decide which products to double down on and which to put on clearance."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for fast math and logical trend labeling"
  },
  "ceo-podcast-tour-tracker": {
    "problem": "Identifying the perfect \"icebreaker\" for a high-value CEO is hard, yet many executives reveal their current priorities and \"intent signals\" during recent podcast interviews.",
    "what_ai_does": "It monitors recent podcast guest appearances by CEOs in your niche, providing you with time-sensitive context (e.g., \"Heard you on [Podcast] talking about X\") for hyper-personalized outreach.",
    "howToDoIt": [
      "List your target CEOs and their companies in a CSV.",
      "Ask the AI to search for recent podcast interviews (after a specific date) and summarize the core topics discussed.",
      "Use the generated \"Topic Hooks\" to draft outreach emails that prove you've done your homework."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Better at summarizing long audio transcripts and drafting sophisticated outreach hooks"
  },
  "challenger-brand-identifier": {
    "problem": "Selling to Fortune 500 giants is slow; the most aggressive buyers are often \"Challenger Brands\" (Series B/C) that are actively trying to unseat market leaders.",
    "what_ai_does": "It identifies high-growth competitors that are explicitly positioning themselves as \"The [Incumbent] Killer,\" giving you a list of tech-forward prospects with high buying intent.",
    "howToDoIt": [
      "Provide a list of market leaders (e.g., \"Salesforce\", \"Zoom\") to the AI.",
      "Ask it to search for \"Challenger Brands\" appearing in \"Top 10 Alternatives\" lists and comparison pages (e.g., `domain.com/vs-competitor`).",
      "Filter the list by funding stage and target these \"aggressive buyers\" who are willing to take risks on new technology."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at market landscape analysis and identifying strategic positioning"
  },
  "champion-movement-tracker": {
    "problem": "Your best sales leads are previous happy customers who just changed jobs, but manually tracking \"Champion\" movements across LinkedIn for thousands of contacts is impossible.",
    "what_ai_does": "It compares your list of known \"Champions\" (previous buyers) against new market contact exports to flag when a fan has moved into a new target account.",
    "howToDoIt": [
      "Export a list of your previous buyers (Champions) and a new market lead export.",
      "Ask the AI to perform a \"Fuzzy Match\" on names to identify anyone who has changed their company domain.",
      "Prioritize these \"Warm Leads\" as your #1 outreach target for the quarter."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data matching and identity verification across large lists"
  },
  "changelog-marketer": {
    "problem": "Product teams work hard on new features, but they often \"hide\" their work in boring, technical changelogs that users never read, missing a massive marketing opportunity.",
    "what_ai_does": "It transforms technical commit messages or Jira tickets into high-energy, benefit-driven \"New & Improved\" marketing assets, including social media threads and customer emails.",
    "howToDoIt": [
      "Provide a CSV of recent technical release notes or Jira tickets to the AI.",
      "Ask it to rewrite each update into 3 paragraphs: The Why (Problem), The What (Update), and The Victory (Benefit).",
      "Use the generated assets for your next product newsletter or X/Twitter announcement."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for style transformation and high-volume copywriting"
  },
  "checkout-funnel-dropoff": {
    "problem": "Most e-commerce stores lose 50%+ of their potential revenue at the checkout, but they don't know if the \"friction\" is happening at the Shipping Info or the Payment step.",
    "what_ai_does": "It analyzes your checkout funnel data to pinpoint the exact step where users are abandoning their carts, allowing you to focus your optimization efforts on the highest-impact \"bottleneck.\"",
    "howToDoIt": [
      "Export your \"Checkout Steps\" data (Users Entered vs. Users Completed) from Google Analytics or Shopify.",
      "Provide the data to the AI and ask it to \"Calculate the drop-off percentage per step.\"",
      "Review the \"Checkout Friction Report\" to decide whether to simplify your shipping forms or add more payment options."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and logical funnel analysis"
  },
  "cold-email-personalization-at-scale": {
    "problem": "Generic cold emails are instantly deleted; the only way to get a 20%+ open rate is through hyper-personalization, which is impossible to do manually for 1,000 leads.",
    "what_ai_does": "It researches recent news, podcasts, or blog posts for every company in your lead list and automatically drafts a unique, authentic \"icebreaker\" line for every single contact.",
    "howToDoIt": [
      "Upload a CSV of your target leads (Company and Contact Name) to the AI.",
      "Ask it to \"Search for recent news or interviews from the last 90 days\" and draft a 1-sentence opening line for each.",
      "Export the enriched CSV and import it into your email tool (like Instantly or Apollo) to launch a hyper-personalized campaign."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at web research and drafting authentic, non-salesy opening lines"
  },
  "comment-section-nurturer": {
    "problem": "Social media comments are high-intent signals, but most brands either ignore them or reply with a generic \"Thanks!\", missing a massive opportunity to move the conversation to a lead.",
    "what_ai_does": "It categorizes every comment by intent (Fan, Question, or Objection) and drafts a specific, high-conversion reply that moves the user toward a DM, a newsletter signup, or a demo.",
    "howToDoIt": [
      "Export a list of recent comments from your X/Twitter or LinkedIn posts into a CSV.",
      "Ask the AI to \"Classify each comment's intent\" and draft a reply tailored to that specific category.",
      "Copy-paste the \"Draft Replies\" back into your social platform to nurture your audience and capture more leads."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for fast style-switching and drafting conversational replies"
  },
  "competitor-ad-library-spy": {
    "problem": "It's hard to know which ad angles are working for your competitors without spending thousands of dollars on your own testing.",
    "what_ai_does": "It reverse-engineers your competitor's ad strategy by analyzing their live ad library, grouping their ads by \"Hook Type\" (e.g., Pain Point vs. Social Proof), and identifying their winning value propositions.",
    "howToDoIt": [
      "Copy-paste the ad copy text from your competitor's Facebook or LinkedIn Ad Library into a text file.",
      "Ask the AI to \"Tag the Hook Type and identify the primary Value Prop\" for every ad.",
      "Review the \"Ad Strategy Analysis\" to find the gaps in their strategy and write \"Counter-Hooks\" that attack their weak spots."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at pattern recognition and strategic marketing analysis"
  },
  "competitor-price-watchdog": {
    "problem": "Competitors often change their pricing or launch new tiers quietly, leaving you \"blind\" to their latest market moves until you've already lost a deal.",
    "what_ai_does": "It automatically monitors your competitor's pricing pages and generates a unified alert report the second any price, currency, or feature name changes are detected.",
    "howToDoIt": [
      "List your competitor's pricing page URLs in a CSV.",
      "Use the AI to \"Fetch the current page text and compare it against a previous snapshot.\"",
      "Review the \"Pricing Alerts\" report to adjust your own pricing strategy or prepare your sales team for new competitor objections."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl URLs and perform high-precision text comparisons"
  },
  "competitor-onboarding-spy": {
    "problem": "You want to improve your product's \"Aha!\" moment but don't have the time to sign up for and manually audit 10 different competitor onboarding flows.",
    "what_ai_does": "It processes screenshots and emails from multiple competitor signup flows to reverse-engineers their activation strategies into a single, side-by-side comparison report.",
    "howToDoIt": [
      "Upload screenshots and emails from your competitor's onboarding flows to a folder.",
      "Ask the AI to \"Identify the 'Aha!' moment and calculate a 'Friction Score' for each competitor.\"",
      "Review the \"Onboarding Landscape Analysis\" to identify 3 high-impact \"steals\" for your own product roadmap."
    ],
    "bestTool": "ChatGPT (Vision)",
    "whyThisTool": "Best-in-class image and email analysis for UX benchmarking"
  },
  "clawback-calculator": {
    "problem": "Sales teams often pay out commissions on deals that churn within the first 90 days, leading to \"phantom revenue\" and significant financial loss if not manually tracked and recouped.",
    "what_ai_does": "It automatically cross-references your recent churn events against your commission payout logs to flag any deals that qualify for a \"Clawback\" based on your company's clawback window.",
    "howToDoIt": [
      "Export a list of recent churned customers and your commission payout history into a CSV.",
      "Provide the data to the AI and define your clawback rule (e.g., \"If churned < 90 days from start\").",
      "Generate a \"Clawback Report\" to hand to finance for payroll adjustments."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and logical reconciliation between disparate lists"
  },
  "client-onboarding-checklist": {
    "problem": "New clients often \"ghost\" during the technical setup phase, which is the #1 predictor of early churn, but manual tracking of onboarding velocity across 100+ clients is impossible.",
    "what_ai_does": "It analyzes your onboarding logs to calculate the \"Time in Stage\" for every client and automatically flags any accounts that have stalled beyond your expected benchmarks.",
    "howToDoIt": [
      "Upload your onboarding progress logs (Client, Current Step, Date Entered) to the AI.",
      "Ask it to \"Identify Red Flags\" for any client taking 2x longer than the expected benchmark for their current stage.",
      "Generate a specific \"Unblock Email\" for every stalled client to offer technical help and restart the momentum."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for velocity calculation and drafting empathetic intervention emails"
  },
  "cloud-bill-shock-prospector": {
    "problem": "Companies scaling rapidly often experience \"Cloud Bill Shock\" from unoptimized AWS or Azure costs, making them high-intent leads for FinOps services if you can find them at the right time.",
    "what_ai_does": "It correlates \"Engineering Hiring Sprees\" (DevOps/SRE roles) with recent funding rounds to pinpoint companies likely struggling with exploding cloud infrastructure costs.",
    "howToDoIt": [
      "Use the AI to search for companies that have recently raised Series B+ funding and are currently hiring for 3+ DevOps or FinOps roles.",
      "Ask it to verify their primary Cloud Provider (AWS/Azure/GCP) using technographic search.",
      "Draft a hyper-relevant outreach email focused on \"Cloud Cost Efficiency\" for their specific tech stack."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at complex web research and correlating disparate signals (hiring + funding + tech stack)"
  },
  "cold-call-objection-simulator": {
    "problem": "Sales reps often fumble difficult objections like \"Just send me an email\" or \"We have no budget\" on live calls because they haven't practiced their responses in a low-stakes environment.",
    "what_ai_does": "It acts as a \"Grumpy Prospect\" (e.g., a busy VP of Engineering) that throws common objections at you and grades your ability to handle them with empathy and professional pivots.",
    "howToDoIt": [
      "Provide your standard sales pitch to the AI and start the \"Roleplay Mode.\"",
      "Respond to the AI's objections in real-time, attempting to build rapport and book a meeting.",
      "Review the \"Coaching Report\" at the end to see your grade and get specific tips on how to improve your objection-handling logic."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Better at nuanced, role-specific personas and providing detailed coaching feedback"
  },
  "cold-dm-personalizer": {
    "problem": "Sliding into DMs with a generic message looks like a bot and results in zero replies; the only way to get a response is to mention a specific \"emotional hook\" from their recent content.",
    "what_ai_does": "It analyzes the latest posts from a list of LinkedIn or X (Twitter) profiles to find specific sentences or ideas that relate to your target topic, drafting custom opening lines for every prospect.",
    "howToDoIt": [
      "Upload a CSV of your target prospects and their profile URLs to the AI.",
      "Ask it to \"Analyze their last 3 posts for emotional hooks related to [Target Topic]\" and draft 2 distinct opening lines for each.",
      "Use the generated \"Observational\" or \"Value-Add\" lines to launch a personalized DM campaign that actually gets replies."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at web-fetching social content and drafting authentic, conversational opening lines"
  },
  "cold-email-spam-checker": {
    "problem": "Using words like \"Free,\" \"Guaranteed,\" or \"100%\" in your cold emails can trigger spam filters and ruin your domain's deliverability, even if your offer is legitimate.",
    "what_ai_does": "It scans your email drafts for common spam trigger words and automatically rewrites them using \"safer\" alternatives that are more likely to land in the primary inbox.",
    "howToDoIt": [
      "Paste your email subject lines and body drafts into the AI.",
      "Ask it to \"Flag spam triggers and assign a Risk Score (1-10)\" for each draft.",
      "Review the \"Sanitized Versions\" to replace high-risk words with proven, deliverability-friendly alternatives like \"Complimentary\" or \"Proven.\""
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for fast text transformation and keyword-based risk analysis"
  },
  "commission-payout-calculator": {
    "problem": "Changing a sales commission plan is a massive financial risk; if you set the \"accelerators\" too high, you could accidentally wipe out your company's entire profit margin on a single good quarter.",
    "what_ai_does": "It uses your historical deal data to simulate exactly how much you would have paid out under three different payout models (e.g., \"Aggressive Hunter\" vs. \"Stable Base\"), helping you find the perfect balance before rolling it out.",
    "howToDoIt": [
      "Export your last 12 months of deal data (Rep, Revenue, Quota) into a CSV.",
      "Provide the data to the AI and define your 3 proposed payout models (e.g., \"Model A: 10% flat; Model B: 5% base + 20% over quota\").",
      "Review the \"Comp Plan Simulation\" to see which model incentivizes your top performers without exceeding your total budget."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and logical simulation of complex financial models"
  },
  "community-sentiment-watchdog": {
    "problem": "In large Discord or Slack communities, toxic trends or \"Admin Hate\" can bubble up and explode before a human moderator even notices, leading to mass departures or brand damage.",
    "what_ai_does": "It ingests the last 1,000 messages from your community's general channel to cluster sentiments and instantly flag rising \"Feature Frustration\" or \"Toxicity\" topics that require immediate intervention.",
    "howToDoIt": [
      "Export the last 24 hours of message data from your public community channels.",
      "Ask the AI to \"Identify rising sentiment clusters\" and flag any patterns of frustration or anger.",
      "Review the \"Community Health Report\" to decide where to jump in for a 1-on-1 or an official announcement."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at detecting subtle emotional nuances and clustering complex conversational themes"
  },
  "competitor-change-monitor": {
    "problem": "Competitors change their website messaging or raise their prices quietly, but manually checking their homepages every week is a tedious task that most marketing teams eventually stop doing.",
    "what_ai_does": "It compares \"Before\" and \"After\" snapshots of a competitor's homepage to instantly highlight strategic messaging shifts—like a pivot from \"SMB\" to \"Enterprise\" or a new pricing tier.",
    "howToDoIt": [
      "Provide a competitor's URL to the AI to establish a baseline snapshot.",
      "Run a weekly check to \"Compare the current text content against the baseline.\"",
      "Review the \"Messaging Shift Alert\" to see exactly which headlines, feature lists, or prices were updated."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl URLs and perform high-precision text-diffing of HTML content"
  },
  "competitor-employee-churn-monitor": {
    "problem": "Internal turmoil at a competitor (like a VP of Sales or Product Lead quitting) is the ultimate \"Buy Signal\" for their customers, but these departures are often hard to spot in real-time.",
    "what_ai_does": "It monitors LinkedIn signal data for key leadership roles at your competitors, flagging \"Executive Churn\" as an opportunity for your sales team to move in on their accounts.",
    "howToDoIt": [
      "Provide a list of key roles (e.g., \"VP Sales\", \"CTO\") and target competitor companies to the AI.",
      "Ask it to \"Identify any recent departures or status changes\" for those specific roles.",
      "Review the \"Brain Drain Alert\" and prioritize outreach to that competitor's biggest accounts while their leadership is in flux."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at researching professional networks and identifying high-impact leadership changes"
  },
  "competitor-feature-parity": {
    "problem": "Manual feature comparison matrices are always out of date, leading your sales team to get blindsided by a prospect saying, \"But your competitor just added Feature X last week.\"",
    "what_ai_does": "It automatically scrapes competitor pricing and feature pages to build a live \"Feature Gap Matrix,\" identifying what they have that you're missing (and where you still have a massive advantage).",
    "howToDoIt": [
      "List your top 5 competitor pricing or feature URLs in a CSV.",
      "Ask the AI to \"Scrape the 'Included' lists and categorize every feature\" found on those pages.",
      "Compare the results against your own product roadmap to identify your next 3 highest-priority feature releases."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl complex pages and perform high-accuracy semantic grouping of feature lists"
  },
  "competitor-news-digest-builder": {
    "problem": "Marketing and sales teams need to stay on top of competitor moves, but manually reading dozens of press releases and blog posts every week is a \"time-sink\" that often gets ignored.",
    "what_ai_does": "It automatically searches for the latest press releases, funding news, or major blog posts from your competitors and summarizes them into a clean, executive-level \"Weekly Intel Brief.\"",
    "howToDoIt": [
      "Provide a list of your top competitors to the AI.",
      "Ask it to \"Search for news, launches, and hires from the last 7 days\" for each company.",
      "Review the summarized \"Intel Brief\" to identify strategic shifts you need to respond to in your own marketing."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at summarizing long-form news and identifying strategic business signals"
  },
  "competitor-pricing-alert-system": {
    "problem": "Competitors often test new pricing tiers or \"hidden\" discounts that can steal your deals before you even know their pricing has changed.",
    "what_ai_does": "It monitors competitor pricing pages and uses high-precision text-diffing to detect even minor changes in dollar amounts, currency, or feature bullet points.",
    "howToDoIt": [
      "List your competitor's pricing URLs in a CSV.",
      "Establish a \"Baseline Snapshot\" of their current pricing text using the AI.",
      "Run a weekly check to \"Flag any changes in numbers or features\" and append them to a permanent change log."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl URLs and perform high-accuracy text comparison while ignoring minor UI changes"
  },
  "competitor-promo-code-tracker": {
    "problem": "Knowing a competitor's \"discount aggression\" (e.g., are they running a secret 20% off?) is crucial for your own pricing strategy, but these codes are often hidden in newsletters or checkout pages.",
    "what_ai_does": "It monitors competitor checkout pages and public deal sites to log active promo codes and their \"discount depth,\" helping you understand their current customer acquisition strategy.",
    "howToDoIt": [
      "Provide the AI with a list of competitor checkout or \"deals\" URLs.",
      "Ask it to \"Identify active promo codes and calculate the average discount percentage\" found.",
      "Review the \"Discount War Report\" to decide if you need to launch your own promotion to stay competitive."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at navigating complex web pages and extracting specific data points like promo codes"
  },
  "competitor-tech-stack-spy": {
    "problem": "You can tell a lot about a competitor's strategy by the tools they use; for example, if they install an ABM tool like 6sense, they are likely moving upmarket to target enterprise accounts.",
    "what_ai_does": "It audits the tech stacks of your entire market in bulk, identifying hidden scripts for Intent, ABM, CRM, and Analytics to score each competitor's \"Marketing Maturity.\"",
    "howToDoIt": [
      "Upload a CSV of competitor URLs to the AI.",
      "Ask it to \"Identify signatures for Intent, CRM, and Ads tools\" (e.g., 6sense, HubSpot, Facebook Pixel) in their HTML source.",
      "Review the \"Tech Landscape Report\" to see which competitors are becoming more sophisticated in their targeting."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly fetch and analyze raw HTML source code for specific software signatures"
  },
  "conference-networking-planner": {
    "problem": "Conference attendee lists are massive and full of noise (students, consultants, recruiters), making it hard for your sales team to prioritize who they should actually meet.",
    "what_ai_does": "It filters raw conference attendee lists against your ICP (Ideal Customer Profile) to create a prioritized \"Hit List\" of VPs and C-Level executives, including custom icebreakers for each.",
    "howToDoIt": [
      "Upload a CSV of conference attendees (Name, Title, Company) to the AI.",
      "Ask it to \"Exclude non-ICP roles\" and tier the remaining leads into \"Must Meet\" (Tier 1) vs. \"Nice to Meet\" (Tier 2).",
      "Generate a specific \"Icebreaker Question\" for your top 5 targets to use at the event."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and excellent at following inclusion/exclusion logic"
  },
  "content-decay-alerter": {
    "problem": "Informational blog posts often lose their \"Semantic Relevance\" over time as competitors start covering new entities or questions that you aren't, leading to a slow but steady drop in traffic.",
    "what_ai_does": "It analyzes your content performance and compares it against the current top-ranking pages to identify \"Semantic Gaps\" and specific sections that need a refresh to stay competitive.",
    "howToDoIt": [
      "Export your blog traffic data (URL, Traffic, Last Updated) into a CSV.",
      "Ask the AI to \"Identify pages with a >10% traffic drop\" and compare them against current top competitors for their target keyword.",
      "Review the \"Refresh Recipe\" for each decaying page, including new sub-sections and updated entity coverage."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl your site and your competitors' sites to perform deep semantic gap analysis"
  },
  "cto-github-activity-tracker": {
    "problem": "Technical decision-makers (CTOs, VP Eng) are notoriously hard to reach via traditional cold email, but they reveal their current \"tech stack intent\" every time they star or fork a repository on GitHub.",
    "what_ai_does": "It monitors specific open-source repositories (e.g., \"Next.js\" or \"Supabase\") to identify technical leaders who are actively exploring that tech, providing you with a high-intent lead list for developer tools.",
    "howToDoIt": [
      "List your target GitHub repositories in a CSV.",
      "Use the AI to fetch recent \"Stargazers\" or \"Forks\" and enrich their profiles to find their company and job title.",
      "Review the \"GitHub Leads\" list to find CTOs at real companies who are signaling intent to use your specific tech stack."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at researching technical profiles and correlating GitHub activity with professional identities"
  },
  "customer-domain-extractor": {
    "problem": "Lead lists often come with personal emails (gmail, yahoo) or messy data that makes it impossible to find the official company website for technographic research or outreach.",
    "what_ai_does": "It automatically parses bulk email lists to extract the corporate domain while filtering out generic providers, giving you a clean list of company websites in seconds.",
    "howToDoIt": [
      "Upload a CSV of your leads' email addresses to the AI.",
      "Ask it to \"Extract the corporate domains and filter out all generic providers like Gmail or Outlook.\"",
      "Export the resulting \"Domain List\" to use for website scraping or CRM enrichment."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast string parsing and excellent at following simple exclusion/inclusion rules"
  },
  "customer-feedback-tagger": {
    "problem": "User feedback from surveys, emails, and Slack is often a \"messy pile\" of text that takes hours to manually categorize into actionable product insights.",
    "what_ai_does": "It automatically triages raw user comments into structured categories like \"Bug,\" \"Feature Request,\" \"UX Issue,\" or \"Praise,\" helping you build a data-driven product roadmap.",
    "howToDoIt": [
      "Upload a CSV of raw user feedback to the AI.",
      "Define your taxonomy (e.g., \"Bug = something is broken\") and ask the AI to tag every comment.",
      "Review the \"Tagged Feedback\" CSV to see which feature requests or bugs are appearing most frequently."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent at semantic classification and following structured tagging rules"
  },
  "customer-health-score": {
    "problem": "Customer Success managers often wait for a \"Cancellation Email\" before they realize an account is at risk, missing the chance to save the customer earlier in the journey.",
    "what_ai_does": "It aggregates three key metrics—Login Frequency, NPS, and Payment Status—into a simple \"Traffic Light\" health score (Red/Yellow/Green) for every account in your portfolio.",
    "howToDoIt": [
      "Upload your customer metrics (Last Login, NPS Score, Payment Status) to the AI.",
      "Ask it to assign a health status based on specific rules (e.g., \"Red = 0 logins OR Overdue payment\").",
      "Prioritize your outreach to the \"Red\" and \"Yellow\" accounts to prevent churn before it happens."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data aggregation and logical scoring based on multiple disparate signals"
  },
  "customer-journey-mapper": {
    "problem": "Every customer persona (e.g., \"Tech Founder\" vs. \"Marketing Lead\") has a different path to purchase, but most brands use a generic \"one-size-fits-all\" journey that ignores specific friction points.",
    "what_ai_does": "It reads your target persona descriptions and maps their unique 5-stage journeys (Awareness to Advocacy), identifying the #1 \"Friction Point\" that stops each group from converting.",
    "howToDoIt": [
      "Provide your target persona descriptions and their main goals to the AI.",
      "Ask it to \"Map the 5-stage journey\" for each persona, including the specific questions they ask at each stage.",
      "Review the \"Journey Maps\" to identify the specific content (e.g., a case study or a technical doc) needed to unblock each persona."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at empathetic persona mapping and understanding psychological friction points"
  },
  "customer-share-of-wallet-estimator": {
    "problem": "Just because a customer spends $500/mo doesn't mean they are a \"small\" account; they could be a \"Sleeping Giant\" with a $50k/mo budget that you haven't captured yet.",
    "what_ai_does": "It estimates the \"Total Addressable Spend\" of your accounts based on their employee count and industry benchmarks, flagging \"Low Penetration\" accounts that are ripe for 10x expansion.",
    "howToDoIt": [
      "Upload a CSV of your customers (with Employee Count and Current Spend) to the AI.",
      "Ask it to \"Calculate the potential budget per head\" and identify accounts with <15% penetration.",
      "Prioritize your \"Sleeping Giants\" for an Executive Alignment pitch to consolidate their entire spend onto your platform."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and excellent at performing benchmark-based calculations"
  },
  "decision-maker-change-tracker": {
    "problem": "When a key decision-maker changes jobs, it creates TWO massive risks: one at their new company (where they might bring in your competitor), and one at the old company (where the new hire wants to cut costs).",
    "what_ai_does": "It monitors the LinkedIn profiles of your past \"Champions\" to detect job changes, instantly triggering a dual outreach plan to secure both the new and old accounts.",
    "howToDoIt": [
      "Upload a CSV of your past buyers and their LinkedIn URLs to the AI.",
      "Ask it to \"Verify current employment\" and flag anyone who has moved to a new company.",
      "Review the \"Job Change Alerts\" and send a \"Congrats & Expansion\" email to the new company and a \"Continuity\" email to the old one."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at researching professional networks and identifying strategic \"trigger events\" from job changes"
  },
  "demo-call-scripter": {
    "problem": "Most sales demos are boring \"feature tours\" that fail to address the specific pain points of different industries, leading to low conversion rates from demo to trial.",
    "what_ai_does": "It reads a list of your target industries and their top pains to generate a library of \"Narrative Demo\" scripts that only show the 3 features most relevant to that specific audience.",
    "howToDoIt": [
      "Provide a CSV of your target industries (e.g., \"Fintech,\" \"E-commerce\") and their biggest bottlenecks to the AI.",
      "Ask it to \"Draft a 15-minute narrative demo script\" for each, including a specific \"Old Way\" vs. \"New Way\" story.",
      "Use the customized scripts to ensure every demo feels hyper-relevant to the prospect's day-to-day struggle."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for high-volume creative drafting and following structured narrative formats"
  },
  "demo-no-show-analyzer": {
    "problem": "High \"No-Show\" rates are a silent killer of sales productivity, but managers often don't know if the problem is a specific lead source (e.g., LinkedIn Ads) or a specific rep's follow-up style.",
    "what_ai_does": "It analyzes your raw demo logs to calculate no-show rates by Lead Source and Rep, identifying exactly where your scheduling and reminder process is breaking down.",
    "howToDoIt": [
      "Export your demo logs (Rep, Source, Outcome) from your CRM or booking tool into a CSV.",
      "Ask the AI to \"Calculate the no-show percentage per source\" and identify the biggest outliers.",
      "Review the \"No-Show Analysis\" to decide if you need to adjust your ad targeting or implement a more aggressive reminder sequence."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and excellent at identifying correlations between source and outcome"
  },
  "discount-code-strategist": {
    "problem": "Slashing prices with generic discount codes (like \"SUMMER20\") can devalue your brand and train customers to never pay full price again, leading to long-term margin erosion.",
    "what_ai_does": "It designs a \"Smart Promo\" strategy for every event on your holiday calendar, using targeted mechanisms like \"Upgrade to Annual\" or \"Mystery Bundles\" to drive volume without brand damage.",
    "howToDoIt": [
      "Provide your annual holiday list and revenue goals to the AI.",
      "Ask it to \"Design a unique promotion logic\" for each event that protects your margins while maximizing urgency.",
      "Review the \"Annual Promo Plan\" and use the generated \"Value-Driven\" email scripts for your next campaign."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at strategic campaign design and drafting sophisticated, persuasive promotional copy"
  },
  "discovery-question-compliance": {
    "problem": "Sales calls are often wasted when a rep forgets to ask critical \"MEDDIC\" questions (like Budget or Timeline), but managers can't manually audit 100 transcripts every week to catch these gaps.",
    "what_ai_does": "It scans your call transcripts for the specific *absence* of key discovery criteria and immediately drafts a \"Deal Rescue Email\" for the rep to send to the prospect to fill the gaps.",
    "howToDoIt": [
      "Upload your recent call transcripts or Zoom AI summaries to the AI.",
      "Ask it to \"Identify missing Budget, Authority, or Timeline discussions\" for every call.",
      "Use the generated \"P.S. Email Blurbs\" to follow up with prospects and get the missing information before the deal stalls."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at detecting the absence of concepts in complex conversations and drafting professional follow-ups"
  },
  "docs-freshness-auditor": {
    "problem": "Outdated help articles that reference old UI or deprecated features are a major source of customer frustration and unnecessary support tickets.",
    "what_ai_does": "It crawls your help center to identify articles that haven't been updated in over a year or contain mentions of old features, flagging exactly what needs a refresh to stay accurate.",
    "howToDoIt": [
      "Provide the URL of your help center or a CSV of article update dates to the AI.",
      "Ask it to \"Flag articles referencing deprecated features\" (e.g., \"Old Dashboard\") or those older than 12 months.",
      "Review the \"Freshness Audit\" and prioritize your content refresh based on the most-visited articles."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Can directly crawl your documentation and perform high-accuracy semantic checks for outdated UI references"
  },
  "crawl-budget-estimator": {
    "problem": "Programmatic SEO projects often fail because they flood Googlebot with too many low-value pages, causing it to ignore your \"money pages\" and delay your rankings by months.",
    "what_ai_does": "It analyzes your server logs to identify \"Crawl Waste\" (e.g., hits to search parameters or filters) and generates specific robots.txt rules to redirect Googlebot's energy toward your most important content.",
    "howToDoIt": [
      "Upload your recent server logs (CSV) to the AI.",
      "Ask it to \"Calculate the percentage of hits to low-value URLs\" and identify your daily crawl capacity.",
      "Review the \"Crawl Optimization Plan\" and implement the suggested robots.txt blocks to speed up indexing of your new pages."
    ],
    "bestTool": "Claude Code",
    "whyThisTool": "Superior at analyzing large server logs and generating precise technical SEO configuration rules"
  },
  "creative-refresh-alert": {
    "problem": "Ad creative fatigue quietly raises your CPA; when users see the same ad too many times (High Frequency), your CTR drops and you start wasting thousands of dollars on ineffective impressions.",
    "what_ai_does": "It monitors your ad performance reports to identify \"Critical Fatigue\" in real-time, signaling exactly when you need to pause and replace specific creatives across all your campaigns.",
    "howToDoIt": [
      "Export your ad performance data (Frequency, CTR, Spend) from Facebook or Google Ads into a CSV.",
      "Ask the AI to \"Flag any ads with Frequency > 4.5 and CTR < 1.0%\" as critical refreshes.",
      "Review the \"Creative Refresh List\" to prioritize which ads to swap out based on their total at-risk spend."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and excellent at applying conditional logic to performance metrics"
  },
  "credit-card-dunning-recovery": {
    "problem": "Up to 50% of SaaS churn is actually \"Involuntary\" (failed credit cards), but generic retry schedules often fail because they don't account for bank fraud filters or payday timing.",
    "what_ai_does": "It optimizes your payment retry schedule based on the failure reason and card type, like rescheduling Amex corporate card retries to avoid weekend blocks or aligning retries with common paydays.",
    "howToDoIt": [
      "Upload a CSV of your failed payments (Card Type, Failure Reason, Last Attempt) to the AI.",
      "Ask it to \"Generate a smart retry schedule\" that avoids weekend blocks for corporate cards and targets the 1st/15th of the month for insufficient funds errors.",
      "Import the \"Retry Queue\" into your billing tool (like Stripe or ProfitWell) to rescue at-risk revenue."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for logical scheduling and identifying patterns in payment failure data"
  },
  "dark-funnel-illuminator": {
    "problem": "Marketing teams struggle to justify \"Direct\" website traffic spikes, often missing the correlation between their outbound email blasts and the indirect visits they generate.",
    "what_ai_does": "It correlates spikes in your \"Direct\" traffic with your regional outbound activity (e.g., email blasts or cold calls), providing a clearer picture of the indirect impact of your marketing efforts.",
    "howToDoIt": [
      "Upload a CSV of your daily direct traffic visits and your outbound activity (by region/date) to the AI.",
      "Ask it to \"Find dates where visits spiked >50% above baseline\" within 48 hours of an outbound blast.",
      "Review the \"Dark Funnel Impact Report\" to attribute your direct traffic to specific top-of-funnel campaigns."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for correlation analysis and finding statistical links between two disparate data sets"
  },
  "dark-social-mention-tracker": {
    "problem": "Potential customers are often talking about your brand in \"Dark Social\" channels like Slack or Discord communities, but these leads are invisible to traditional marketing tools.",
    "what_ai_does": "It scans community exports or simulated chat logs for brand keywords and specific \"intent questions,\" identifying high-value leads that are currently hiding in private social conversations.",
    "howToDoIt": [
      "Upload a CSV or text export from your target Slack or Discord communities to the AI.",
      "Ask it to \"Find mentions of [BrandName] or questions about [Niche]\" and extract the user's context.",
      "Review the \"Community Mentions\" report to identify warm entry points for a non-salesy, helpful intervention."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at conversational analysis and extracting specific intent from informal chat logs"
  },
  "deal-rotting-alert-system": {
    "problem": "Sales pipelines are often clogged with \"rotting\" deals that haven't moved in weeks, but managers don't have the time to manually audit every single opportunity for stagnation.",
    "what_ai_does": "It automatically identifies deals that have been stuck in the same stage for more than 14 days, flagging them for immediate manager intervention to unblock or disqualify them.",
    "howToDoIt": [
      "Export your open opportunities (Deal Name, Stage, Last Stage Change) from your CRM into a CSV.",
      "Ask the AI to \"Calculate the days since last change\" and flag any deal that has been stagnant for >14 days.",
      "Review the \"Rotting Deals\" report to decide whether to nudge the prospect, offer a discount, or close the deal as lost."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data processing and excellent at performing date-based calculations for pipeline management"
  },
  "consultant-partnership-finder": {
    "problem": "Finding the right agencies or consultants to resell your product is a slow research task, but these \"Channel Partners\" are the fastest way to scale your sales without hiring more reps.",
    "what_ai_does": "It identifies service businesses (agencies, SIs) that are already implementing solutions adjacent to yours—like \"Asana Experts\" or \"Shopify CRO Agencies\"—making them ideal candidates for a referral program.",
    "howToDoIt": [
      "Define your target software ecosystem (e.g., \"HubSpot\") and partner type in a CSV.",
      "Use the AI to search official partner directories and LinkedIn for agencies with 1-50 employees specializing in that tool.",
      "Review the \"Potential Partners\" list and pitch them on a co-marketing or reseller agreement."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at complex web research and identifying niche service providers in software ecosystems"
  },
  "contract-auto-renewal-forecaster": {
    "problem": "Relying on \"Auto-Renew\" contracts is a complacency trap; if a customer hasn't logged in for 60 days, their auto-renewal will likely lead to an angry cancellation or a chargeback.",
    "what_ai_does": "It cross-references your contract renewal dates with actual product usage data to identify \"Silent Churn\" risks and prioritize manual intervention for your high-value accounts.",
    "howToDoIt": [
      "Upload a CSV of your active contracts and their last login dates to the AI.",
      "Ask it to assign a \"Defense Level\" (e.g., \"Code Red\" for inactive auto-renews) to every account.",
      "Generate a \"Value Realization Email\" for at-risk accounts to restart engagement before the renewal date hits."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for risk-scoring logic and drafting empathetic customer success emails"
  },
  "contract-risk-detector": {
    "problem": "Sales contracts often hide 3-year lock-ins, 90-day cancellation windows, or annual price escalators in the fine print that can wreck your department's budget.",
    "what_ai_does": "It scans your vendor agreements (PDFs or images) to instantly highlight high-risk clauses and suggest specific \"red-line\" language to protect your company's interests.",
    "howToDoIt": [
      "Upload your vendor contracts or MSA documents to an AI with vision/document analysis capabilities.",
      "Ask it to \"Scan for Term & Renewal, Price Escalators, and Termination for Convenience\" clauses.",
      "Review the \"Risk Assessment\" report and use the suggested red-lines during your next negotiation."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at legal document analysis and drafting nuanced, protective contract language"
  },
  "crm-field-utilization-analyzer": {
    "problem": "CRMs become \"data graveyards\" when they have hundreds of custom fields that nobody fills out, making it impossible for managers to get clean reporting on the health of the business.",
    "what_ai_does": "It analyzes a raw export of your CRM data to calculate the \"Fill Rate\" for every single column, identifying exactly which fields should be deprecated or made mandatory.",
    "howToDoIt": [
      "Export a full CSV of your CRM records (Contacts or Deals) including all custom fields.",
      "Provide the CSV to the AI and ask it to \"Calculate the percentage of non-empty values for every column.\"",
      "Review the \"Field Health Report\" to clean up your CRM and simplify the data entry process for your sales team."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Fast data profiling and logical identification of \"garbage\" data fields"
  },
  "cross-sell-whitespace-mapper": {
    "problem": "Sales teams often miss easy \"Cross-Sell\" revenue because they don't have a clear visual of which existing customers haven't bought their other products yet.",
    "what_ai_does": "It transforms your raw customer/product list into a \"Whitespace Matrix,\" a grid that highlights exactly where the gaps are in your product penetration across your entire client base.",
    "howToDoIt": [
      "Upload a CSV of your customers and the products they currently own to the AI.",
      "Ask it to \"Pivot the data into a grid\" with Customers as rows and Products as columns.",
      "Identify the \"0\" cells (Whitespace) and use them to launch a targeted cross-sell campaign for those specific accounts."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "Excellent for data manipulation and transforming lists into structured matrices"
  },
  "cta-button-optimizer": {
    "problem": "Generic button text like \"Submit\" or \"Buy Now\" increases psychological friction and kills conversion rates on high-traffic landing pages.",
    "what_ai_does": "It rewrites your Call-to-Action (CTA) buttons to be benefit-driven and zero-risk (e.g., \"Start My Free Trial\") while suggesting visual tweaks to make them stand out.",
    "howToDoIt": [
      "Provide a list of your landing page names and their current CTA text to the AI.",
      "Ask it to \"Draft 3 variations: Benefit-Led, Action-Led, and Zero-Risk\" for every button.",
      "Implement the top-rated variation and add a suggested \"visual tweak\" (like a contrast color or icon) to boost CTR."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Superior at persuasive copywriting and understanding micro-conversion psychology"
  }
};

const processedIdeas = {}; // To store the rewrites as I go

function generateIdeas() {
  const files = fs.readdirSync(recipesDir);
  let ideas = []; // Use 'let' to allow modification

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
    const { data, content: body } = matter(content);

    const isUtility = (data.title || '').toLowerCase().includes('counter') || 
                      (data.title || '').toLowerCase().includes('calculator') && data.archetype === 'Processor' && !data.isPremium;
    
    const passes = data.archetype === 'Researcher' || 
                   data.archetype === 'Hybrid' || 
                   data.archetype === 'Analyst' || 
                   data.isPremium === true;

    if (passes && !isUtility) {
      const id = data.id || file.replace('.md', '');
      let ideaData = {};

      // If already manually processed, use the override
      if (manualOverrides[id]) {
        ideaData = manualOverrides[id];
      } else {
        // Fallback to previous "smart" logic for non-manual entries
        const toolInfo = determineBestTool(data.title, data.tagline, body);
        const steps = generateActionSteps(data.title, data.tagline, toolInfo.tool);
        const desc = cleanDescription(data.description);

        let roi = data.isPremium ? '10+ hours saved / month' : '2-5 hours saved / week';
        if (data.title.toLowerCase().includes('negotiator') || data.title.toLowerCase().includes('savings')) roi = "$5k+ saved / year";
        
        ideaData = {
          id: id,
          name: data.title,
          vertical: verticalMap[data.category] || 'Ops',
          problem: data.tagline || 'Stop wasting time on repetitive manual tasks.',
          what_ai_does: desc,
          howToDoIt: steps,
          bestTool: toolInfo.tool,
          whyThisTool: toolInfo.why,
          time_saved: roi,
          difficulty: data.difficulty === 'Beginner' ? 'Simple to Start' : data.difficulty === 'Intermediate' ? 'Practical' : 'Strategic',
          tools: "Practical Tool"
        };
      }
      ideas.push(ideaData);
    }
  });

  const finalDatabase = ideas; // No more separate synthetics, all go into manualOverrides

  fs.writeFileSync(outputFilePath, JSON.stringify(finalDatabase, null, 2));
  console.log(`Successfully generated ${finalDatabase.length} refined, intelligent ideas.`);
}

// Ensure manualOverrides are applied correctly
const manualOverridesArray = Object.values(manualOverrides);
const synthIds = new Set(manualOverridesArray.map(s => s.id));

generateIdeas();
