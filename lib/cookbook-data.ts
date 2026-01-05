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
  sampleData?: {
    filename: string;
    content: string;
  };
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
    description: "Automates a headless browser to search Google Maps, scroll results to load all items, and extract rich details.",
    blueprint: `# Project: Google Maps Lead Miner

## 1. Context
We need to build a targeted lead list of local businesses (e.g., \"Plumbers in Austin\") by scraping Google Maps results, including phone numbers and websites.

## 2. Requirements
- **Input:** A search term string (e.g., \"Dentists in Miami\").
- **Output:** 
 leads_google_maps.csv with columns: Name, Phone, Website, Rating, Review_Count.
- **Tech Stack:** Python, playwright (for rendering/scrolling), pandas

## 3. Step-by-Step Logic
1. **Setup Browser:** Launch Playwright in headless=False mode (to avoid instant bot detection).
2. **Search:** Navigate to google.com/maps and input the search term. Press Enter.
3. **Scroll Strategy:** The left sidebar lazy-loads results. Implement a loop that:
   - Selects the results container.
   - Scrolls to the bottom (container.evaluate("el => el.scrollTop = el.scrollHeight"))).
   - Waits for the \"You've reached the end\" message OR for the list length to stop increasing.
4. **Extraction:** For each result card:
   - Click the card to open the detail panel.
   - Wait for the \"Website\" and \"Phone\" icons to render.
   - Extract text using specific aria-labels or icon locators.
5. **Data Cleaning:** Handle missing fields (e.g., if no website, set to \"N/A\").
6. **Export:** Save the list of dictionaries to CSV using Pandas.\`,
    sampleData: {
      filename: "search_terms.txt",
      content: "Plumbers in Austin, TX\nDentists in Miami, FL\nCoffee Shops in Seattle, WA"
    }
  },
  {
    id: 'linkedin-comment-export',
    category: 'Lead Gen',
    title: "LinkedIn Comment Scraper",
    tagline: "Steal leads from viral posts.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Extracts high-intent leads who engaged with a specific viral post in your niche.",
    blueprint: `# Project: LinkedIn Viral Post Leecher

## 1. Context
Identify high-intent leads by scraping users who commented on a specific viral LinkedIn post.

## 2. Requirements
- **Input:** A specific LinkedIn Post URL.
- **Auth:** Requires valid LinkedIn cookies (exported via \"EditThisCookie\" extension) to avoid login challenges.
- **Output:** 
 post_leads.json containing commenter Name, Headline, and Profile URL.

## 3. Step-by-Step Logic
1. **Session Handling:** Load cookies from cookies.json into the Selenium/Playwright driver.
2. **Navigation:** Go to the target Post URL.
3. **Expansion Loop:**
   - Locate the \"Load more comments\" button.
   - Click it repeatedly in a while loop until it disappears.
   - Add a random time.sleep(2, 5) between clicks to mimic human behavior.
4. **Parsing:**
   - Iterate through all comment containers.
   - Extract the Author Name (text), Headline (text), and Profile Link (href).
   - Ignore \"Reply\" threads (nested comments) to keep it simple, or recurse if needed.
5. **Filtering:** Filter out \"LinkedIn Member\" (private profiles).
6. **Save:** Dump the structured data to JSON.\`,
    sampleData: {
      filename: "target_posts.txt",
      content: "https://www.linkedin.com/posts/jasonlemkin_saas-sales-activity-7123456789\nhttps://www.linkedin.com/posts/alexhormozi_ai-startup-advice-987654321"
    }
  },
  {
    id: 'crunchbase-monitor',
    category: 'Lead Gen',
    title: "Funding Alert Scraper",
    tagline: "Find startups who just raised $$$.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Monitors news feeds to identify companies that just announced Series A/B funding rounds.",
    blueprint: `# Project: Startup Funding Tracker

## 1. Context
We need a daily list of companies that just announced funding rounds to target them for sales.

## 2. Requirements
- **Sources:** TechCrunch \"Startup\" RSS feed OR Crunchbase News.
- **Output:** 
 funding_rounds_today.csv (Company, Round Type, Article URL).
- **Libraries:** feedparser, requests, BeautifulSoup, spacy (optional for NER).

## 3. Step-by-Step Logic
1. **Fetch Feed:** Parse the TechCrunch RSS feed.
2. **Filter:** Iterate through article titles. Keep only those matching keywords: [\"Raises\", \"Series A\", \"Series B\", \"Seed\", \"Funding\"].
3. **Extraction (NER):**
   - For matching articles, extract the Company Name.
   - *Simple Method:** Assume the company name is the first proper noun before the word \"raises\".
   - *Advanced Method:* Use Spacy's Named Entity Recognition (ORG label).
4. **Validation:** Check if the extracted name looks like a company (not \"US\", \"AI\", \"Tech\").
5. **Enrichment:** (Optional) Use Google Search API to find the company's homepage URL.
6. **Alert:** If new companies found, print to console or append to CSV.\`,
    sampleData: {
      filename: "config_keywords.json",
      content: "{\n  \"include_terms\": [\"Series A\", \"Series B\", \"Seed Round\", \"Raises\"],\n  \"exclude_terms\": [\"Crypto\", \"Biotech\"]\n}"
    }
  },
  {
    id: 'github-email-finder',
    category: 'Lead Gen',
    title: "GitHub Dev Finder",
    tagline: "Find emails of contributors to Repo X.",
    difficulty: 'Intermediate',
    time: '25 mins',
    description: "Mining public commit history to find the personal emails of developers contributing to specific open source projects.",
    blueprint: `# Project: GitHub Contributor Miner

## 1. Context
Build a list of developers interested in \"React\" (or any topic) by mining public commit metadata from GitHub repositories.

## 2. Requirements
- **Input:** Target Repository Name (e.g., \"vercel/next.js\").
- **Auth:** GitHub Personal Access Token (to avoid rate limits).
- **Output:** 
 dev_leads.csv (Name, Email, GitHub Profile).

## 3. Step-by-Step Logic
1. **API Connection:** Initialize PyGithub with your token.
2. **Fetch Commits:** Get the last 500-1000 commits from the repo's default branch.
3. **Iterate & Extract:**
   - For each commit, access commit.author.
   - Check if commit.author.email exists and is not None.
4. **Clean & Filter:**
   - Exclude generic emails (ends with @users.noreply.github.com).
   - Deduplicate based on email address.
5. **Enrich:** Get the user's 'Bio' and 'Location' from their profile object if available.
6. **Rate Limiting:** Monitor API headers for X-RateLimit-Remaining. Sleep if low.\`,
    sampleData: {
      filename: "target_repos.txt",
      content: "vercel/next.js\nfacebook/react\nshadcn-ui/ui"
    }
  },
  {
    id: 'producthunt-launcher',
    category: 'Lead Gen',
    title: "ProductHunt Scraper",
    tagline: "Get today's top launched founders.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Identify the makers behind today's trending products for partnership outreach.",
    blueprint: `# Project: ProductHunt Maker Extractor

## 1. Context
Find the Twitter handles and websites of founders who launched products today.

## 2. Requirements
- **Input:** None (Target URL is producthunt.com/leaderboard/daily).
- **Output:** 
 makers_today.csv.
- **Libraries:** requests, BeautifulSoup (ProductHunt has static HTML for the list).

## 3. Step-by-Step Logic
1. **Fetch Leaderboard:** Request the daily leaderboard page.
2. **Parse Products:** Find the container for the top 5-10 products.
3. **Deep Dive:**
   - For each product, extract the link to its detail page.
   - Request the detail page.
4. **Extract Makers:**
   - Find the \"Makers\" section in the sidebar.
   - Extract Name, Profile URL, and \"Twitter/X\" link if present.
5. **Extract Product:** Get the \"Website\" link (redirect) for the product itself.
6. **Save:** Aggregate Product Name, Maker Name, Twitter URL.\`,
    sampleData: {
      filename: "config.json",
      content: "{\n  \"max_products\": 10,\n  \"include_twitter\": true\n}"
    }
  },
  {
    id: 'directory-scraper',
    category: 'Lead Gen',
    title: "SaaS Directory Scraper",
    tagline: "Scrape Capterra/G2 reviews.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Target companies unhappy with your competitor by scraping negative reviews.",
    blueprint: `# Project: Competitor Review Poacher

## 1. Context
Identify users who gave 1-3 star reviews to [Competitor] on G2/Capterra. Note: These sites have heavy anti-bot protection.

## 2. Requirements
- **Input:** Competitor Review Page URL.
- **Tech Stack:** playwright (stealth plugin essential) or manual HTML save + local parse.
- **Output:** 
 disgruntled_users.csv.

## 3. Step-by-Step Logic
1. **Stealth Browing:** Launch Playwright with stealth_min_user_agent.
2. **Navigation:** Go to the reviews page. Handle \"Verify you are human\" manually if needed (script should wait for user input).
3. **Filtering:** Click filters to show \"1 Star\" and \"2 Star\" reviews.
4. **Extraction:**
   - Loop through review cards.
   - Extract: Review Title, Date, \"What I disliked\" text.
   - Extract: Reviewer Name, Job Title, and Company Name (often hidden behind \"Validated User\" - grab what is visible).
5. **Company Resolution:** If Company is \"Verified User in [Industry]\". search the review text for clues, otherwise mark as \"Anonymous\".`
  },
  {
    id: 'instagram-hashtag-scraper',
    category: 'Lead Gen',
    title: "Insta Tag Monitor",
    tagline: "Find influencers using #niche.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Build an influencer list by monitoring specific hashtags.",
    blueprint: `# Project: Instagram Hashtag Monitor

## 1. Context
Find micro-influencers posting about #skincare (or your niche).

## 2. Requirements
- **Input:** Hashtag (e.g., \"saasgrowth\").
- **Lib:** instaloader (handles session/auth better than raw requests).
- **Output:** 
 influencers.csv (Handle, Followers, Bio).

## 3. Logic
1. **Init:** Create Instaloader instance. Login (risky) or use session file.
2. **Search:** Load posts from NodeHashtag.from_name().
3. **Filter:** Iterate recent posts.
   - Discard if Likes < 50 (too small) or > 5000 (too big/bot).
   - Discard if Post Date > 7 days ago.
4. **Profile Check:** Access post.owner_profile.
   - Check Follower Count (e.g., 1k - 50k range).
   - Check Bio for \"Email\" or \"DM\".
5. **Rate Limit:** Add random sleep (10-30s) between profile lookups to avoid soft ban.`
  },
  {
    id: 'twitter-bio-search',
    category: 'Lead Gen',
    title: "Twitter Bio Search",
    tagline: "Find users with 'CMO' in bio.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Use advanced search operators to find targeted professional profiles on Twitter.",
    blueprint: `# Project: Twitter Bio Crawler

## 1. Context
Find \"Fractional CMOs\" or \"Founders\" via Twitter bios.

## 2. Requirements
- **Input:** Search query (e.g., \"bio:founder bio:saas\").
- **Lib:** snscrape (unofficial API) or Nitter scraping.
- **Output:** 
 twitter_leads.csv.

## 3. Logic
1. **Query Construction:** Build search string: (bio:\"marketing director\") near:\"New York\" within:50mi.
2. **Scrape Stream:** Use snscrape.modules.twitter.TwitterUserScraper.
3. **Iterate:** Loop through results (limit to 100).
4. **Extraction:**
   - Get Username, Display Name, Bio, Website URL.
   - Check 'Website' for Linktree/Carrd (high value).
5. **Quality Check:** Filter users inactive for > 6 months (check last tweet date).`
  },
  {
    id: 'podcast-guest-finder',
    category: 'Lead Gen',
    title: "Podcast Guest Scout",
    tagline: "Find people interviewed on podcasts.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Podcast guests are great leads—they are public figures and reachable. Scrape episode titles to find them.",
    blueprint: `# Project: Podcast Guest Miner

## 1. Context
Find people who have been interviewed on \"Marketing\" podcasts (they are likely thought leaders).

## 2. Requirements
- **Input:** Topic keyword (e.g., \"AI Marketing\").
- **API:** iTunes Search API (free, no auth).
- **Output:** 
 guest_list.csv.

## 3. Logic
1. **Search:** Query iTunes API for podcasts matching the keyword. Get IDs of top 20 shows.
2. **Episode Fetch:** For each Show ID, fetch the RSS feed URL.
3. **Parse RSS:** Use feedparser. Loop through recent 50 episodes.
4. **Pattern Match:** Check Title for guest patterns:
   - \"interview with [Name]\")
   - [Name]: How to...
   - feat. [Name]
5. **Extraction:** Use Regex to extract the [Name] part.
6. **Enrich:** (Optional) Search Name + \"LinkedIn\" on Google to get profile.`
  },
  {
    id: 'conference-attendee-match',
    category: 'Lead Gen',
    title: "Event Lead Matcher",
    tagline: "Match 'John - Acme' to LinkedIn.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "You have a list of names/companies from a conference badge scan. You need their LinkedIn profiles.",
    blueprint: `# Project: Event List Enricher

## 1. Context
Enrich a CSV of \"Name + Company\" with LinkedIn Profile URLs.

## 2. Requirements
- **Input:** attendees.csv (Columns: Name, Company).
- **Lib:** googlesearch-python.
- **Output:** Enriched CSV.

## 3. Logic
1. **Load Data:** Read CSV with pandas.
2. **Loop Rows:** For each attendee:
   - Construct Query: site:linkedin.com/in/ \"{Name}\" \"{Company}\".
   - Call Google Search API (or scrape).
   - Get the first result URL.
3. **Validation:** Ensure URL matches linkedin.com/in/.
4. **Throttling:** **Critical**. Sleep 2-5 seconds between requests to avoid Google 429.
5. **Save:** Write URL to new 'LinkedIn_Link' column.`
  },
  {
    id: 'substack-recommender',
    category: 'Lead Gen',
    title: "Newsletter Sponsor Finder",
    tagline: "Find Substacks in your niche.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Map the Substack ecosystem to find sponsorship opportunities.",
    blueprint: `# Project: Substack Network Mapper

## 1. Context
Find niche newsletters to sponsor by crawling the \"Recommendations\" feature on Substack.

## 2. Requirements
- **Input:** A starting newsletter URL (e.g., \"lenny.substack.com\").
- **Output:** 
 newsletters.csv (Name, URL, Recommending_Count).

## 3. Logic
1. **Visit:** Go to [subdomain].substack.com/recommendations.
2. **Scrape:** Extract the list of newsletters they recommend.
3. **Snowball:** Add these new URLs to a queue.
4. **Recurse:** Visit the recommendations page of the *new* newsletters (Depth = 2).
5. **Count:** Track how many times a specific newsletter is recommended across the network.
6. **Rank:** Sort by \"Recommendation Count\" to find the most influential newsletters in the cluster.`
  },
  {
    id: 'youtube-channel-scraper',
    category: 'Lead Gen',
    title: "YouTuber Contact Info",
    tagline: "Get email from 'About' page.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Find YouTubers for influencer marketing. Extract emails from their description.",
    blueprint: `# Project: YouTube Influencer Finder

## 1. Context
Build a list of YouTuber emails for sponsorship outreach.

## 2. Requirements
- **Input:** Keywords (e.g., \"Tech Reviews\").
- **API:** YouTube Data API v3 (Get API Key from Google Console).
- **Output:** 
 creators.csv.

## 3. Logic
1. **Search:** Call search.list with keyword to get Channel IDs.
2. **Details:** Call channels.list with part=snippet,brandingSettings.
3. **Email Extraction:**
   - Check snippet.description for email patterns (regex: [a-zA-Z0-9]+@[a-zA-Z]+.com).
   - Note: The official \"Business Email\" button is protected by Captcha and hard to scrape. Focus on description text.
4. **Socials:** Extract Twitter/Instagram links from the channel header.
5. **Filter:** Only keep channels with > 10k subscribers.`
  },
  {
    id: 'technology-lookup',
    category: 'Lead Gen',
    title: "Tech Stack Hunter",
    tagline: "Find sites using Shopify.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Identify what software a website is running by analyzing its source code.",
    blueprint: `# Project: Technographic Profiler

## 1. Context
Find if a list of leads uses specific tools (e.g., Shopify, HubSpot, Intercom).

## 2. Requirements
- **Input:** domains.csv.
- **Signatures:** A dictionary of patterns (e.g., "Shopify": "cdn.shopify.com", "HubSpot": "js.hs-scripts.com").
- **Lib:** requests, concurrent.futures (for speed).

## 3. Logic
1. **Load List:** Read domains.
2. **Fetch:** Send GET request (Timeout=5s).
3. **Analyze HTML:**
   - Search response text for Signature patterns.
   - Search response headers (e.g., Server: nginx, X-Powered-By).
4. **Analyze Cookies:** Check set-cookie headers for tool-specific cookies.
5. **Tag:** Add boolean columns Uses_Shopify, Uses_HubSpot.`
  },
  {
    id: 'new-domain-monitor',
    category: 'Lead Gen',
    title: "New Domain Watch",
    tagline: "Catch 'get[competitor].com'.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Monitor newly registered domains for keywords to detect phishing or new competitors.",
    blueprint: `# Project: Zone File Monitor

## 1. Context
Watch the daily stream of registered .com domains for specific keywords.

## 2. Requirements
- **Input:** Keyword list (e.g., \"crypto\", \"gpt\", \"stripe\").
- **Source:** CertStream (Real-time SSL logs) OR Daily Zone Files (WhoisDS).
- **Lib:** certstream (Python library).

## 3. Logic
1. **Connect:** Open websocket connection to CertStream.
2. **Stream:** Listen for messages.
3. **Filter:** On each message:
   - Extract data.leaf_cert.all_domains.
   - Check if any domain string contains a Keyword.
4. **Alert:** If match found, log to file or send Slack webhook.
5. **Run:** Keep script running in background (daemon).`
  },
  {
    id: 'glassdoor-intent',
    category: 'Lead Gen',
    title: "Review Intent",
    tagline: "Companies reviewing competitors.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Identify companies that are actively evaluating competitors by scraping 'Alternative' pages.",
    blueprint: `# Project: Intent Scraper

## 1. Context
Find out which companies are paying for \"Sponsored\" placement on competitor comparison pages (e.g., Capterra \"Best CRM\").

## 2. Requirements
- **Input:** URL (e.g., "capterra.com/customer-relationship-management-software").
- **Lib:** playwright.

## 3. Logic
1. **Visit:** Load the category page.
2. **Identify Ads:** Look for the \"Sponsored\" label on listing cards.
3. **Extract:**
   - Company Name.
   - Bidding Position (1st, 2nd, 3rd).
4. **Pagination:** Click \"Next\" to see lower-tier bidders.
5. **Insight:** Companies bidding here are aggressive on marketing spend. Add to prospect list.`
  },

  // --- ENRICHMENT (16-25) ---
  {
    id: 'email-permutator',
    category: 'Enrichment',
    title: "Email Permutator",
    tagline: "Guess corporate email formats.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Generate potential email addresses for a prospect based on their name and company domain.",
    blueprint: `# Project: Email Permutation Engine

## 1. Context
We have a name (John Doe) and domain (acme.com) but no email. We need to generate the likely formats to test.

## 2. Requirements
- **Input:** First Name, Last Name, Domain.
- **Output:** List of strings.

## 3. Logic
1. **Clean:** Strip whitespace, lowercase all inputs.
2. **Generate Patterns:**
   - {first}@{domain}
   - {first}.{last}@{domain}
   - {first}{last}@{domain}
   - {f}{last}@{domain}
   - {first}{l}@{domain}
   - {first}_{last}@{domain}
3. **Export:** Return the list for validation (e.g., use with SMTP Validator).`
  },
  {
    id: 'logo-fetcher',
    category: 'Enrichment',
    title: "Company Logo API",
    tagline: "Get logos for deck.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Automatically download the best quality logo for a list of domains.",
    blueprint: `# Project: Brand Asset Fetcher

## 1. Context
Get logos for a slide deck of 50 prospect logos.

## 2. Requirements
- **Input:** domains.csv.
- **Output:** Folder /logos with png files.

## 3. Logic
1. **Method A (Clearbit):** Try https://logo.clearbit.com/{domain}. Check if response is 200.
2. **Method B (Google):** Try https://www.google.com/s2/favicons?domain={domain}&sz=128.
3. **Method C (Scrape):**
   - Fetch Homepage.
   - Look for <link rel="icon"> or <meta property="og:image">
   - Resolve relative URLs.
4. **Save:** Stream response content to file {domain}.png.`
  },
  {
    id: 'ceo-finder',
    category: 'Enrichment',
    title: "CEO Finder",
    tagline: "Add 'CEO Name' to domain list.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Find the CEO of a company using Google Search snippets.",
    blueprint: `# Project: Executive Search Bot

## 1. Context
Fill in the \"Decision Maker\" column for a list of accounts.

## 2. Requirements
- **Input:** companies.csv (Name column).
- **Lib:** googlesearch-python.

## 3. Logic
1. **Loop:** For each company name.
2. **Query:** "{Company Name}" CEO LinkedIn.
3. **Parse Snippet:**
   - Get the title of the first result.
   - Extract text before the \" - \" or | separator.
   - Remove \" | LinkedIn\" suffix.
4. **Refine:**
   - If result contains \"Former\", skip to next result.
5. **Save:** Update CSV with \"CEO Name\" and \"Source URL\".`
  },
  {
    id: 'location-enricher',
    category: 'Enrichment',
    title: "HQ Location Filler",
    tagline: "Add City/State to leads.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrape the company website to find their physical address for territory mapping.",
    blueprint: `# Project: HQ Address Scraper

## 1. Context
Determine the state/country of a domain to assign it to the right Sales Territory.

## 2. Requirements
- **Input:** domains.csv.
- **Lib:** requests, BeautifulSoup, re.

## 3. Logic
1. **Fetch:** Get Homepage.
2. **Search Footer:** Look for address patterns (Regex for Zip Codes: \d{5} or State codes \b[A-Z]{2}\b).
3. **Contact Page:** If not found, try finding link to /contact or /about and scrape that.
4. **Heuristic:** Look for keywords \"Headquarters\", \"HQ\", \"Office\".
5. **Extract:** Grab the containing <div> text.
6. **Save:** Clean newlines and save to CSV.`
  },
  {
    id: 'social-handle-extractor',
    category: 'Enrichment',
    title: "Social Link Scraper",
    tagline: "Find Twitter/LinkedIn on homepage.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Find a company's social media presence by scanning their website.",
    blueprint: `# Project: Social Footprint Scraper

## 1. Context
Find the LinkedIn and Twitter pages for a list of domains.

## 2. Requirements
- **Input:** domains.csv.
- **Output:** Columns LinkedIn_URL, Twitter_URL.

## 3. Logic
1. **Fetch:** Request URL.
2. **Parse:** BeautifulSoup(html).
3. **Find Links:** soup.find_all('a', href=True).
4. **Filter:**
   - If href contains "linkedin.com/company", save as LinkedIn.
   - If href contains "twitter.com" or "x.com", save as Twitter.
5. **Clean:** Remove query parameters (?ref=...) from links.
6. **Priority:** If multiple found, prefer links in the <footer> or <header>.`
  },
  {
    id: 'employee-count-estimator',
    category: 'Enrichment',
    title: "Team Size Estimator",
    tagline: "Guess size from LinkedIn.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Estimate company size by scraping public LinkedIn company pages.",
    blueprint: `# Project: LinkedIn Size Scraper

## 1. Context
Segment leads by size (SMB vs Enterprise) using employee count.

## 2. Requirements
- **Input:** LinkedIn Company URL.
- **Lib:** requests (headers must spoof browser).

## 3. Logic
1. **Fetch:** Get the LinkedIn Company Page (public view).
2. **Parse:** Look for the text "See all [number] employees".
3. **Regex:** Extract the number/digits.
4. **Mapping:**
   - < 50 -> SMB
   - 50-500 -> Mid-Market
   - > 500 -> Enterprise
5. **Fallback:** If blocked, try Google Search: site:linkedin.com/in/ "at [Company]" and estimate based on result count (inaccurate but useful proxy).`
  },
  {
    id: 'traffic-estimator',
    category: 'Enrichment',
    title: "Traffic Tier",
    tagline: "Est. monthly visits.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Get traffic estimates from SimilarWeb's public pages.",
    blueprint: `# Project: SimilarWeb Scraper

## 1. Context
Qualify leads based on their web traffic volume.

## 2. Requirements
- **Input:** domain.com.
- **Lib:** selenium or playwright (SimilarWeb blocks simple requests).

## 3. Logic
1. **Navigate:** similarweb.com/website/{domain}.
2. **Wait:** Wait for charts to load.
3. **Extract:** Locate the \"Total Visits\" element (often class engagement-list-item__value).
4. **Parse:** Convert \"500K\", \"1.2M\" to integers.
5. **Store:** Save metadata.`
  },
  {
    id: 'meta-title-enricher',
    category: 'Enrichment',
    title: "Tagline Extractor",
    tagline: "What does this company do?",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Get a one-sentence description of a company from their SEO tags.",
    blueprint: `# Project: Description Enricher

## 1. Context
Add a \"Description\" column to leads so sales reps know what they pitch.

## 2. Requirements
- **Input:** URL List.
- **Lib:** requests, bs4.

## 3. Logic
1. **Fetch:** GET request.
2. **Title:** Extract <title> tag.
3. **Description:** Extract <meta name="description" content="...">
4. **OG Tags:** Extract <meta property="og:description" content="...">
5. **Selection:** Prefer Meta Description. If empty, use OG. If empty, use Title.`
  },
  {
    id: 'validate-email-smtp',
    category: 'Enrichment',
    title: "SMTP Validator",
    tagline: "Check if email bounces.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Validate emails technically by handshaking with the mail server.",
    blueprint: `# Project: SMTP Verifier

## 1. Context
Check if an email exists without sending an actual email (reduce bounce rate).

## 2. Requirements
- **Input:** Email Address.
- **Lib:** dns.resolver, smtplib.

## 3. Logic
1. **Get MX:** Query DNS for MX records of the domain.
2. **Connect:** Connect to the highest priority MX server on port 25.
3. **HELO:** Identify yourself.
4. **MAIL FROM:** Set dummy sender.
5. **RCPT TO:** Send the target email.
6. **Interpret:**
   - Code 250 = Valid.
   - Code 550 = Invalid (User unknown).
   - Code 4xx = Temporary Error (Greylisting).`
  },
  {
    id: 'phone-formatting',
    category: 'Enrichment',
    title: "E.164 Formatter",
    tagline: "Fix phone numbers.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Clean up messy phone data for CRM import.",
    blueprint: `# Project: Phone Number Normalizer

## 1. Context
Convert formats like "(555) 123-4567" and "555.123.4567" to standard +15551234567.

## 2. Requirements
- **Input:** CSV with 'Phone' column.
- **Lib:** phonenumbers (Google's library port).

## 3. Logic
1. **Load:** Iterate rows.
2. **Parse:** phonenumbers.parse(number, "US") (Assuming US default, or infer from Country col).
3. **Format:** phonenumbers.format_number(obj, phonenumbers.PhoneNumberFormat.E164).
4. **Validate:** Check is_valid_number().
5. **Save:** Overwrite column.`
  },

  // --- CONTENT OPS (26-45) ---
  {
    id: 'video-clipper',
    category: 'Content Ops',
    title: "Webinar Slicer",
    tagline: "Cut viral clips from Zoom.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Auto-extract clips from a video based on transcript keywords.",
    blueprint: `# Project: Semantic Video Trimmer

## 1. Context
Turn a 60m webinar into 5 clips mentioning \"AI\" or \"Revenue\".

## 2. Requirements
- **Input:** video.mp4, transcript.vtt.
- **Lib:** moviepy, webvtt-py.

## 3. Logic
1. **Parse:** Load VTT into list of (Start, End, Text).
2. **Search:** Find segments where Text contains keyword.
3. **Buffer:** Add 5 seconds before and after the timestamp.
4. **Merge:** If clips overlap, merge them into one segment.
5. **Cut:** Use ffmpeg_extract_subclip.
6. **Export:** Save as clip_{i}.mp4.`
  },
  {
    id: 'blog-to-tweet',
    category: 'Content Ops',
    title: "Thread Maker",
    tagline: "Blog post -> 10 Tweets.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Turn a block of text into a threaded series of tweets.",
    blueprint: `# Project: Text Chunking Engine

## 1. Context
Split long-form content into tweet-sized chunks (280 chars) logically.

## 2. Requirements
- **Input:** blog.txt.
- **Lib:** nltk (sentence tokenizer) or simple string splitting.

## 3. Logic
1. **Read:** Load file.
2. **Split:** Split by paragraphs.
3. **Measure:** Check char length.
4. **Logic:**
   - If < 280, keep.
   - If > 280, split by sentence.
5. **Thread:** Add (1/n) counters.
6. **Output:** Print to console or save JSON.`
  },
  {
    id: 'thumbnail-text',
    category: 'Content Ops',
    title: "Thumb Gen",
    tagline: "Bulk create blog covers.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Programmatically generate images by drawing text onto a background.",
    blueprint: `# Project: Opengraph Image Generator

## 1. Context
Create 100 featured images for 100 blog posts using their titles.

## 2. Requirements
- **Input:** titles.csv, template.jpg, font.ttf.
- **Lib:** Pillow (PIL).

## 3. Logic
1. **Load:** Open Template Image.
2. **Font:** Load TTF font size 60.
3. **Wrap:** Implement text wrapping function (split string into lines based on image width).
4. **Draw:** draw.text((x,y), wrapped_text, font=font).
5. **Loop:** Repeat for every title.
6. **Save:** output/{slug}.jpg.`
  },
  {
    id: 'transcription-local',
    category: 'Content Ops',
    title: "Local Whisper",
    tagline: "Free audio transcription.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Use OpenAI's Whisper model locally to transcribe audio without API costs.",
    blueprint: `# Project: Local Transcriber

## 1. Context
Convert MP3 interview to Text securely and for free.

## 2. Requirements
- **Input:** audio.mp3.
- **Lib:** openai-whisper, ffmpeg (installed on system).

## 3. Logic
1. **Load:** model = whisper.load_model("base").
2. **Process:** result = model.transcribe("audio.mp3").
3. **Extract:** Get result["text"].
4. **Timestamps:** Iterate result["segments"] to write a VTT file format.
5. **Save:** Write transcript.txt and transcript.vtt.`
  },
  {
    id: 'gif-converter',
    category: 'Content Ops',
    title: "Video to GIF",
    tagline: "Make email embed GIFs.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Convert video highlights to optimized GIFs for email newsletters.",
    blueprint: `# Project: Email GIF Maker

## 1. Context
Create lightweight GIFs (< 2MB) from video clips.

## 2. Requirements
- **Input:** video.mp4.
- **Lib:** moviepy.

## 3. Logic
1. **Load:** Import VideoFileClip.
2. **Trim:** clip.subclip(0, 3) (First 3 seconds).
3. **Resize:** clip.resize(width=480) (Email width).
4. **Optimize:** Reduce FPS to 10.
5. **Export:** clip.write_gif("output.gif", colors=64) (Low palette size for small file).`
  },
  {
    id: 'watermark-batch',
    category: 'Content Ops',
    title: "Logo Stamper",
    tagline: "Watermark 50 images.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Adds logo to corner of image batch.",
    blueprint: `# Project: Batch Watermarker

## 1. Context
Add a small logo to the bottom-right corner of 100 product images.

## 2. Requirements
- **Input:** Folder of images, logo.png.
- **Lib:** Pillow.

## 3. Logic
1. **Load Logo:** Open logo file.
2. **Loop Images:** Iterate through input folder.
3. **Open Image:** Open current image.
4. **Calculate Position:** Get image dimensions, place logo bottom-right with padding.
5. **Paste:** logo.paste(img, position, mask=logo) (Use mask for transparency).
6. **Save:** Overwrite original or save to output folder.`
  },
  {
    id: 'podcast-rss',
    category: 'Content Ops',
    title: "RSS Generator",
    tagline: "MP3 Folder -> XML Feed.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Generates podcast RSS from local files.",
    blueprint: `# Project: Local Podcast RSS Feed

## 1. Context
Create a valid RSS feed for a podcast hosted on a simple file server.

## 2. Requirements
- **Input:** Folder of MP3 files.
- **Lib:** 
 feedgen

## 3. Logic
1. **Scan Folder:** Get list of MP3s.
2. **Metadata:** For each MP3, extract Title (from filename), Duration (using mutagen), Description (optional file).
3. **Build Feed:** Use feedgen to create the XML structure.
   - Add channel info (title, link, description).
   - Add items for each MP3.
4. **Save:** Write feed.xml.`
  },
  {
    id: 'markdown-blog',
    category: 'Content Ops',
    title: "Static Blog Builder",
    tagline: "MD -> HTML.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Compiles markdown folder to static site.",
    blueprint: `# Project: Markdown SSG

## 1. Context
Build a simple static blog from Markdown files.

## 2. Requirements
- **Input:** Folder of .md files.
- **Template:** Jinja2 HTML template.
- **Lib:** 
 markdown
 jinja2

## 3. Logic
1. **Scan:** Find all .md files.
2. **Parse:** Convert Markdown to HTML using markdown.markdown().
3. **Front Matter:** Extract metadata (title, date) from YAML front matter.
4. **Render:** Pass HTML content and metadata to Jinja2 template.
5. **Save:** Write rendered HTML to output folder.`
  },
  {
    id: 'social-resize',
    category: 'Content Ops',
    title: "Social Cropper",
    tagline: "Landscape -> Story (9:16).",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Smart crops images for different platforms.",
    blueprint: `# Project: Social Media Image Resizer

## 1. Context
Adapt a landscape image for Instagram Story (9:16) and Feed (1:1).

## 2. Requirements
- **Input:** image.jpg.
- **Lib:** Pillow.

## 3. Logic
1. **Load:** Open image.
2. **Story Crop:** Calculate center 9:16 crop. Resize if needed.
3. **Square Crop:** Calculate center 1:1 crop.
4. **Save:** Save as 
 story.jpg
 square.jpg.`
  },
  {
    id: 'srt-fixer',
    category: 'Content Ops',
    title: "SRT Syncer",
    tagline: "Shift subtitles by 2s.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Offsets subtitle timestamps.",
    blueprint: `# Project: SRT Time Shifter

## 1. Context
Adjust all timestamps in an SRT file by a fixed offset (e.g., +2000ms).

## 2. Requirements
- **Input:** subtitles.srt, offset_ms (integer).
- **Lib:** 
 pysrt

## 3. Logic
1. **Parse:** Load SRT file.
2. **Iterate:** For each SubRip object:
   - Add offset to start and end timestamps.
3. **Save:** Write modified SRT.`
  },
  {
    id: 'readability-score',
    category: 'Content Ops',
    title: "Flesch-Kincaid Scorer",
    tagline: "Grade your copy complexity.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Scores text readability.",
    blueprint: `# Project: Readability Scorer

## 1. Context
Check if blog post copy is easy to understand (e.g., 8th grade level).

## 2. Requirements
- **Input:** text.txt.
- **Lib:** 
 textstat

## 3. Logic
1. **Read:** Load text.
2. **Calculate:** 
 textstat.flesch_reading_ease(text)
 textstat.flesch_kincaid_grade(text)
3. **Output:** Print scores.`
  },
  {
    id: 'keyword-density',
    category: 'Content Ops',
    title: "Keyword Counter",
    tagline: "SEO Density Check.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Counts target phrase frequency.",
    blueprint: `# Project: Keyword Density Analyzer

## 1. Context
Check if target keywords are used sufficiently (but not excessively) in an article.

## 2. Requirements
- **Input:** text.txt, target_keyword (string).
- **Lib:** 
 re

## 3. Logic
1. **Read:** Load text.
2. **Count:** Use regex to find all occurrences of the keyword (case-insensitive).
3. **Total Words:** Count total words.
4. **Calculate:** (Keyword Count / Total Words) * 100.`
  },
  {
    id: 'headline-case',
    category: 'Content Ops',
    title: "Title Case Fixer",
    tagline: "Fix capitalization.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Standardizes headline casing.",
    blueprint: `# Project: Title Case Converter

## 1. Context
Ensure all headlines follow Title Case rules (e.g., 'The Quick Brown Fox').

## 2. Requirements
- **Input:** Headline string.
- **Lib:** 
 titlecase

## 3. Logic
1. **Convert:** titlecase.titlecase(headline).`
  },
  {
    id: 'emoji-stripper',
    category: 'Content Ops',
    title: "Emoji Remover",
    tagline: "Clean text for print.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Removes unicode emojis.",
    blueprint: `# Project: Emoji Stripper

## 1. Context
Remove emojis from text before sending to a system that doesn't support them.

## 2. Requirements
- **Input:** Text string.
- **Lib:** 
 regex

## 3. Logic
1. **Pattern:** Use regex to match Unicode emoji ranges.
2. **Replace:** Replace matches with empty string.`
  },
  {
    id: 'pdf-compressor',
    category: 'Content Ops',
    title: "PDF Shrinker",
    tagline: "Compress huge ebooks.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Reduces PDF size for email.",
    blueprint: `# Project: PDF Size Reducer

## 1. Context
Shrink large PDF files for easier emailing.

## 2. Requirements
- **Input:** large.pdf.
- **Lib:** 
 PyMuPDF

## 3. Logic
1. **Open:** Load PDF.
2. **Optimize:** Use 
 doc.save(output.pdf, garbage=4, deflate=True)
3. **Check Size:** Compare input/output size.`
  },
  {
    id: 'palette-extract',
    category: 'Content Ops',
    title: "Brand Color Grabber",
    tagline: "Get Hex codes from logo.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Extracts dominant colors.",
    blueprint: `# Project: Dominant Color Extractor

## 1. Context
Get the main brand colors from a logo image.

## 2. Requirements
- **Input:** logo.png.
- **Lib:** 
 colorgram.py

## 3. Logic
1. **Load:** Load image.
2. **Extract:** colorgram.extract(image, 5) # Get top 5 colors.
3. **Format:** Convert RGB tuples to Hex codes.`
  },
  {
    id: 'markdown-table',
    category: 'Content Ops',
    title: "Table Formatter",
    tagline: "Align MD tables.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Pretty prints markdown tables.",
    blueprint: `# Project: Markdown Table Aligner

## 1. Context
Format raw markdown table data for better readability.

## 2. Requirements
- **Input:** Raw markdown table string.
- **Lib:** 
 pandas

## 3. Logic
1. **Parse:** Read string into DataFrame.
2. **Format:** Use 
 df.to_markdown(index=False)
3. **Output:** Print formatted string.`
  },
  {
    id: 'qr-generator',
    category: 'Content Ops',
    title: "QR Batcher",
    tagline: "URLs to QR Images.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Generates QR codes.",
    blueprint: `# Project: QR Code Generator

## 1. Context
Create QR codes for a list of URLs.

## 2. Requirements
- **Input:** urls.csv.
- **Lib:** 
 qrcode

## 3. Logic
1. **Loop:** Read each URL.
2. **Generate:** 
 qr_img = qrcode.make(url)
3. **Save:** Save as {url_slug}.png.`
  },
  {
    id: 'lorem-gen',
    category: 'Content Ops',
    title: "Lorem Ipsum CLI",
    tagline: "Generate dummy text.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Prints placeholder text.",
    blueprint: `# Project: Lorem Ipsum Generator

## 1. Context
Generate placeholder text for design mockups.

## 2. Requirements
- **Input:** Number of paragraphs.
- **Lib:** 
 loremipsum

## 3. Logic
1. **Generate:** loremipsum.generate_paragraphs(num_paragraphs).
2. **Print:** Output the text.`
  },
  {
    id: 'exif-nuke',
    category: 'Content Ops',
    title: "Metadata Wiper",
    tagline: "Remove GPS from photos.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Privacy cleaner.",
    blueprint: `# Project: EXIF Data Remover

## 1. Context
Remove sensitive metadata (like GPS location) from images.

## 2. Requirements
- **Input:** image.jpg.
- **Lib:** 
 piexif
 Pillow

## 3. Logic
1. **Load:** Open image.
2. **Remove:** piexif.dump({})
3. **Save:** Save image without EXIF data.`
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
    blueprint: `# Project: Sitemap Link Checker

## 1. Context
Ensure all URLs listed in sitemap.xml are crawlable and return a 200 OK status.

## 2. Requirements
- **Input:** sitemap.xml.
- **Lib:** 
 requests
 xml.etree.ElementTree

## 3. Logic
1. **Parse:** Load XML.
2. **Extract URLs:** Get all <loc> values.
3. **Check:** For each URL, make a HEAD request.
4. **Report:** Log any non-200 status codes.`
  },
  {
    id: '404-crawler',
    category: 'SEO',
    title: "Broken Link Spider",
    tagline: "Crawl site for 404s.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Internal link crawler.",
    blueprint: `# Project: Broken Link Finder

## 1. Context
Find all broken internal links (404s) on a website.

## 2. Requirements
- **Input:** Base URL.
- **Lib:** 
 scrapy

## 3. Logic
1. **Crawl:** Configure Scrapy to follow internal links only.
2. **Check Status:** In the item pipeline, check response status code.
3. **Log:** If status is 404, log the Request URL and Referrer.`
  },
  {
    id: 'serp-tracker',
    category: 'SEO',
    title: "Mini Rank Tracker",
    tagline: "Check position for Keyword.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Checks Google position (requires proxy).",
    blueprint: `# Project: Keyword Rank Checker

## 1. Context
Track the Google search ranking for a specific keyword.

## 2. Requirements
- **Input:** Keyword, Domain.
- **Lib:** 
 requests (or a SERP API wrapper)

## 3. Logic
1. **Query:** Use a SERP API (e.g., SerpApi, Scale SERP) or scrape Google results.
2. **Parse:** Find your domain in the results.
3. **Extract Rank:** Get the position.
4. **Store:** Log date, keyword, rank.`
  },
  {
    id: 'meta-audit',
    category: 'SEO',
    title: "Meta Tag Check",
    tagline: "Missing Titles/Descriptions.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes headers for SEO tags.",
    blueprint: `# Project: Meta Tag Auditor

## 1. Context
Ensure all pages have unique, optimized Title and Meta Description tags.

## 2. Requirements
- **Input:** List of URLs.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Loop:** Fetch each URL.
2. **Extract:** Get <title> and <meta name="description">
3. **Check:** Validate length (Title < 60 chars, Desc < 160 chars).
4. **Report:** List pages with missing or suboptimal tags.`
  },
  {
    id: 'image-alt-audit',
    category: 'SEO',
    title: "Alt Text Finder",
    tagline: "Find images missing Alt.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Accessibility audit.",
    blueprint: `# Project: Image Alt Text Checker

## 1. Context
Find images missing alt text for accessibility and SEO.

## 2. Requirements
- **Input:** URL.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Fetch:** Get page HTML.
2. **Find Images:** Find all <img> tags.
3. **Check Alt:** If 
 img.get('alt') == '' or not img.get('alt'):
   - Log the image source URL and page URL.`
  },
  {
    id: 'backlink-checker',
    category: 'SEO',
    title: "Backlink Validtor",
    tagline: "Are partners still linking?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Checks partner pages for your link.",
    blueprint: `# Project: Backlink Monitor

## 1. Context
Verify that partner websites still link back to your domain.

## 2. Requirements
- **Input:** List of partner URLs.
- **Target:** Your domain name.

## 3. Logic
1. **Loop:** Visit each partner URL.
2. **Search:** Look for href containing your domain.
3. **Report:** List partners who have removed the link.`
  },
  {
    id: 'pagespeed-bulk',
    category: 'SEO',
    title: "Bulk Core Vitals",
    tagline: "Speed test 50 pages.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Uses PSI API.",
    blueprint: `# Project: PageSpeed Insights Bulk Tester

## 1. Context
Test the Core Web Vitals for a list of important landing pages.

## 2. Requirements
- **Input:** List of URLs.
- **API:** Google PageSpeed Insights API.

## 3. Logic
1. **Loop:** For each URL.
2. **Request:** Call PSI API with URL and strategy=desktop/mobile.
3. **Extract:** Get LCP, FID, CLS scores.
4. **Save:** Append to CSV.`
  },
  {
    id: 'redirect-chain',
    category: 'SEO',
    title: "Redirect Tracer",
    tagline: "Find long 301 chains.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Traces hop trace.",
    blueprint: `# Project: Redirect Chain Analyzer

## 1. Context
Identify redirect chains longer than 3 hops, which hurt SEO and user experience.

## 2. Requirements
- **Input:** Starting URL.
- **Lib:** 
 requests

## 3. Logic
1. **Follow Redirects:** Use 
 requests.get(url, allow_redirects=True)
2. **Count Hops:** Check response.history list length.
3. **Report:** If length > 3, log the chain.`
  },
  {
    id: 'schema-validator',
    category: 'SEO',
    title: "Schema Validator",
    tagline: "Check JSON-LD.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Validates structured data.",
    blueprint: `# Project: JSON-LD Schema Validator

## 1. Context
Validate that structured data (JSON-LD) on a page is correctly formatted.

## 2. Requirements
- **Input:** URL.
- **Lib:** 
 extruct

## 3. Logic
1. **Extract:** Use extruct.extract(url) to get JSON-LD.
2. **Validate:** Check for required properties based on schema type (e.g., @type, name, url).
3. **Report:** Log errors.`
  },
  {
    id: 'canonical-check',
    category: 'SEO',
    title: "Canonical Audit",
    tagline: "Self-referencing check.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Ensures canonical tag matches URL.",
    blueprint: `# Project: Canonical Tag Checker

## 1. Context
Verify that the canonical URL tag correctly points to the primary version of a page.

## 2. Requirements
- **Input:** URL.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Fetch:** Get page HTML.
2. **Extract Canonical:** Find <link rel="canonical" href="...">
3. **Compare:** Check if canonical URL matches the current URL (or expected version).
4. **Report:** Log mismatches.`
  },
  {
    id: 'log-analyzer',
    category: 'SEO',
    title: "Log File SEO",
    tagline: "Googlebot Hit Counter.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Parses server logs for Googlebot.",
    blueprint: `# Project: Server Log Analyzer for SEO

## 1. Context
Analyze server logs to understand Googlebot's crawling behavior.

## 2. Requirements
- **Input:** Access logs (e.g., Apache common log format).
- **Lib:** 
 re
 pandas

## 3. Logic
1. **Filter:** Select lines where User-Agent contains 'Googlebot'.
2. **Extract:** Get the requested URL path from each line.
3. **Aggregate:** Count hits per URL.
4. **Report:** Identify top crawled pages and any unexpected 404s.`
  },
  {
    id: 'robots-checker',
    category: 'SEO',
    title: "Robots.txt Monitor",
    tagline: "Did we block the bot?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Alerts on Disallow changes.",
    blueprint: `# Project: Robots.txt Change Detector

## 1. Context
Get alerted if the robots.txt file accidentally blocks important pages.

## 2. Requirements
- **Input:** Domain URL.
- **Lib:** 
 requests

## 3. Logic
1. **Fetch:** Download robots.txt.
2. **Parse:** Check for lines starting with 'Disallow:'.
3. **Compare:** Store current disallowed paths and compare against a historical baseline.
4. **Alert:** Notify if significant paths are added to Disallow.`
  },
  {
    id: 'heading-hierarchy',
    category: 'SEO',
    title: "H1-H6 Outliner",
    tagline: "Visualise page structure.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Extracts headers in order.",
    blueprint: `# Project: Heading Structure Analyzer

## 1. Context
Visualize the H1-H6 heading structure of a page to ensure logical flow.

## 2. Requirements
- **Input:** URL.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Fetch:** Get page HTML.
2. **Find Headings:** Find all h1, h2, h3, h4, h5, h6 tags.
3. **Order:** Store them in order of appearance.
4. **Output:** Print an indented tree structure.`
  },
  {
    id: 'keyword-cannibal',
    category: 'SEO',
    title: "Cannibalization Check",
    tagline: "Duplicate titles.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Finds pages with same title.",
    blueprint: `# Project: Keyword Cannibalization Detector

## 1. Context
Identify pages competing for the same keywords by checking for duplicate title tags.

## 2. Requirements
- **Input:** List of URLs.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Loop:** Fetch each URL.
2. **Extract Title:** Get the <title> tag content.
3. **Compare:** Group URLs by identical title tags.
4. **Report:** List groups of pages targeting the same terms.`
  },
  {
    id: 'ssl-check',
    category: 'SEO',
    title: "SSL Expiry",
    tagline: "Cert monitor.",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Alerts before expiry.",
    blueprint: `# Project: SSL Certificate Expiry Monitor

## 1. Context
Get alerted before an SSL certificate expires to prevent website downtime.

## 2. Requirements
- **Input:** Domain name.
- **Lib:** 
 ssl
 socket
 datetime

## 3. Logic
1. **Connect:** Establish SSL connection to the domain.
2. **Get Expiry:** Retrieve certificate information, including expiry date.
3. **Compare:** Check if expiry date is within the next 30 days.
4. **Alert:** Send notification if nearing expiry.`
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
    blueprint: `# Project: Competitor Pricing Monitor

## 1. Context
Track competitor pricing changes to inform our own pricing strategy.

## 2. Requirements
- **Input:** Competitor pricing page URL.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Fetch:** Get the pricing page HTML.
2. **Extract:** Locate price elements (e.g., using CSS selectors).
3. **Compare:** Store current prices and compare against historical data.
4. **Alert:** Notify on significant changes.`
  },
  {
    id: 'visual-diff',
    category: 'Competitor Intel',
    title: "Visual Regression",
    tagline: "Screenshot comparison.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Highlights pixel changes on homepage.",
    blueprint: `# Project: Visual Change Detector

## 1. Context
Detect visual changes on a competitor's homepage automatically.

## 2. Requirements
- **Input:** URL.
- **Lib:** 
 playwright
 Pillow (ImageChops)

## 3. Logic
1. **Screenshot:** Take a screenshot of the URL (T=0).
2. **Wait:** Wait 24 hours.
3. **Screenshot:** Take another screenshot (T=1).
4. **Compare:** Use ImageChops.difference() to find pixel differences.
5. **Report:** Save diff image if changes detected.`
  },
  {
    id: 'ad-library',
    category: 'Competitor Intel',
    title: "Ad Library Archiver",
    tagline: "Save competitor ads.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Scrapes FB Ad Library.",
    blueprint: `# Project: Facebook Ad Library Scraper

## 1. Context
Archive competitor ads from the Facebook Ad Library for creative inspiration.

## 2. Requirements
- **Input:** Competitor Page Name.
- **Lib:** 
 selenium (to handle dynamic loading)

## 3. Logic
1. **Navigate:** Go to Ad Library, search for the page.
2. **Scroll:** Scroll down to load all ads.
3. **Extract:** For each ad, save:
   - Image/Video URL
   - Ad Text
   - Call To Action
4. **Store:** Save to a database or JSON file.`
  },
  {
    id: 'job-posting-scan',
    category: 'Competitor Intel',
    title: "Hiring Signals",
    tagline: "Count 'Engineer' roles.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Infers strategy from careers page.",
    blueprint: `# Project: Competitor Hiring Analysis

## 1. Context
Analyze competitor job postings to infer hiring trends and strategic focus.

## 2. Requirements
- **Input:** Competitor Careers Page URL.
- **Lib:** 
 requests
 bs4

## 3. Logic
1. **Fetch:** Get careers page HTML.
2. **Extract:** Find job titles and descriptions.
3. **Count:** Tally occurrences of keywords (e.g., 'Engineer', 'Sales', 'Marketing', 'AI').
4. **Report:** Summarize hiring focus.`
  },
  {
    id: 'news-alert',
    category: 'Competitor Intel',
    title: "News Monitor",
    tagline: "Competitor headlines.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes Google News.",
    blueprint: `# Project: Competitor News Aggregator

## 1. Context
Stay updated on news mentions of key competitors.

## 2. Requirements
- **Input:** List of competitor names.
- **API:** Google News RSS feed or News API.

## 3. Logic
1. **Query:** Search Google News for each competitor name.
2. **Parse:** Extract headlines and links.
3. **Filter:** Remove irrelevant results.
4. **Alert:** Send daily digest via email or Slack.`
  },
  {
    id: 'whois-age',
    category: 'Competitor Intel',
    title: "Domain Age Check",
    tagline: "When did they launch?",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "Checks creation date.",
    blueprint: `# Project: Domain Age Checker

## 1. Context
Estimate when a competitor launched based on their domain registration date.

## 2. Requirements
- **Input:** Domain name.
- **Lib:** 
 python-whois

## 3. Logic
1. **Query:** Use python-whois library.
2. **Extract:** Get 'creation_date'.
3. **Calculate:** Determine domain age.`
  },
  {
    id: 'sitemap-spy',
    category: 'Competitor Intel',
    title: "New Page Alert",
    tagline: "Detect new landing pages.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Diffs sitemap.xml.",
    blueprint: `# Project: Sitemap Change Detector

## 1. Context
Monitor competitor sitemaps for newly added pages.

## 2. Requirements
- **Input:** Competitor sitemap URL.
- **Lib:** 
 requests
 xml.etree.ElementTree

## 3. Logic
1. **Fetch:** Download current sitemap.xml.
2. **Parse:** Extract all URLs.
3. **Compare:** Compare against a previously saved list of URLs.
4. **Report:** List new URLs found.`
  },
  {
    id: 'social-growth',
    category: 'Competitor Intel',
    title: "Follower Tracker",
    tagline: "Log Twitter growth.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scrapes follower count daily.",
    blueprint: `# Project: Social Media Follower Tracker

## 1. Context
Track the follower growth of competitors on social media.

## 2. Requirements
- **Input:** Competitor social media profile URL (e.g., Twitter).
- **Lib:** 
 requests (or API wrapper)

## 3. Logic
1. **Fetch:** Scrape the profile page.
2. **Extract:** Find the follower count element.
3. **Log:** Record date and follower count.
4. **Analyze:** Plot growth over time.`
  },
  {
    id: 'newsletter-archive',
    category: 'Competitor Intel',
    title: "Newsletter Saver",
    tagline: "Archive competitor emails.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Saves emails from Gmail label.",
    blueprint: `# Project: Competitor Newsletter Archiver

## 1. Context
Save competitor newsletters to a swipe file for analysis.

## 2. Requirements
- **Input:** Gmail label (e.g., 'Competitor Newsletters').
- **Lib:** 
 imaplib
 email

## 3. Logic
1. **Connect:** Connect to Gmail IMAP.
2. **Search:** Fetch emails with the specified label.
3. **Extract:** Get email body (HTML).
4. **Save:** Save HTML to a local folder.`
  },
  {
    id: 'review-aggregation',
    category: 'Competitor Intel',
    title: "Review Aggregator",
    tagline: "Summarize G2 reviews.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Scrapes and summarizes sentiment.",
    blueprint: `# Project: Review Sentiment Analyzer

## 1. Context
Summarize customer sentiment from competitor reviews on sites like G2.

## 2. Requirements
- **Input:** Competitor review page URL.
- **Lib:** 
 requests
 bs4
 nltk (for sentiment analysis)

## 3. Logic
1. **Scrape:** Extract review text.
2. **Analyze:** Use NLTK's VADER or similar to get sentiment scores (positive/negative).
3. **Summarize:** Calculate average sentiment and identify common themes (positive/negative keywords).`
  },
  {
    id: 'tech-lookup-comp',
    category: 'Competitor Intel',
    title: "Stack Detective",
    tagline: "Do they use Hubspot?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Checks headers for tools.",
    blueprint: `# Project: Competitor Tech Stack Analyzer

## 1. Context
Identify the technology stack used by competitors.

## 2. Requirements
- **Input:** Competitor URL.
- **Lib:** 
 requests

## 3. Logic
1. **Fetch Headers:** Get HTTP response headers.
2. **Analyze JS:** Fetch homepage HTML, look for script tags pointing to known CDNs (e.g., google-analytics.com, hubspot.com).
3. **Report:** List detected technologies.`
  },
  {
    id: 'keyword-gap',
    category: 'Competitor Intel',
    title: "Content Gap",
    tagline: "What do they rank for?",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Compares keywords (requires API).",
    blueprint: `# Project: Keyword Gap Analyzer

## 1. Context
Find keywords competitors rank for that you don't.

## 2. Requirements
- **Input:** Your domain, Competitor domain.
- **API:** SEMrush, Ahrefs, or similar keyword data provider.

## 3. Logic
1. **Fetch:** Get top keywords for both domains via API.
2. **Compare:** Find keywords in competitor list but not yours.
3. **Report:** List potential content opportunities.`
  },
  {
    id: 'wayback-download',
    category: 'Competitor Intel',
    title: "Time Travel",
    tagline: "Download old homepage.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Fetches from Archive.org.",
    blueprint: `# Project: Wayback Machine Downloader

## 1. Context
Download historical versions of a competitor's website.

## 2. Requirements
- **Input:** URL, Date.
- **API:** Internet Archive API.

## 3. Logic
1. **Query:** Use Wayback Machine API to find available snapshots.
2. **Fetch:** Download the HTML for the specified date.
3. **Save:** Store the HTML file.`
  },
  {
    id: 'ip-monitor',
    category: 'Competitor Intel',
    title: "Hosting Change",
    tagline: "Did they switch servers?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Logs IP address.",
    blueprint: `# Project: IP Address Monitor

## 1. Context
Track the IP address of a domain to detect hosting changes.

## 2. Requirements
- **Input:** Domain name.
- **Lib:** 
 socket

## 3. Logic
1. **Resolve:** Use socket.gethostbyname(domain).
2. **Log:** Record the IP address and date.
3. **Compare:** Alert if the IP address changes.`
  },
  {
    id: 'text-diff-comp',
    category: 'Competitor Intel',
    title: "Copy Change",
    tagline: "Did they change messaging?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Diffs homepage text.",
    blueprint: `# Project: Website Copy Change Detector

## 1. Context
Detect changes in website copy to understand competitor messaging shifts.

## 2. Requirements
- **Input:** URL.
- **Lib:** 
 requests
 bs4
 difflib

## 3. Logic
1. **Fetch:** Get homepage text content.
2. **Compare:** Use difflib.SequenceMatcher to compare current text with historical text.
3. **Report:** Highlight significant additions or deletions.`
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
    blueprint: `# Project: Fuzzy Company Name Deduplicator

## 1. Context
Merge duplicate company records where names are slightly different (e.g., 'Acme Corp.' vs 'Acme Corporation Inc.').

## 2. Requirements
- **Input:** List of company names.
- **Lib:** 
 fuzzywuzzy
 pandas

## 3. Logic
1. **Load:** Read company names into a pandas DataFrame.
2. **Process:** Use 
 process.extractOne() or similar to find close matches.
3. **Threshold:** Set a similarity threshold (e.g., 85%).
4. **Merge:** Group similar names and choose a canonical name.`
  },
  {
    id: 'format-names',
    category: 'CRM Ops',
    title: "Name Case Fix",
    tagline: "JOHN DOE -> John Doe.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Fixes capitalization.",
    blueprint: `# Project: Name Case Normalizer

## 1. Context
Standardize names to Title Case (e.g., 'john doe' -> 'John Doe').

## 2. Requirements
- **Input:** List of names.
- **Lib:** 
 titlecase

## 3. Logic
1. **Apply:** Use titlecase.titlecase() on each name.`
  },
  {
    id: 'zip-mapper',
    category: 'CRM Ops',
    title: "Territory Mapper",
    tagline: "Zip -> Sales Rep.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Assigns owner by Zip range.",
    blueprint: `# Project: Sales Territory Mapper

## 1. Context
Assign leads to sales reps based on their geographic territory (defined by ZIP codes).

## 2. Requirements
- **Input:** List of ZIP codes, Territory definitions (ZIP range -> Rep).
- **Lib:** 
 pandas
 bisect

## 3. Logic
1. **Load:** Load territory data into sorted lists/arrays.
2. **Lookup:** For each lead's ZIP code, use 
 bisect_left() to find the correct territory.
3. **Assign:** Map the territory to the Sales Rep.`
  },
  {
    id: 'lead-score',
    category: 'CRM Ops',
    title: "Lead Scorer",
    tagline: "Calc priority.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Scores leads based on Title/Company.",
    blueprint: `# Project: Lead Scoring Engine

## 1. Context
Prioritize leads based on their fit and engagement signals.

## 2. Requirements
- **Input:** Lead data (Title, Company, Website visits, etc.).
- **Rules:** Define scoring rules (e.g., +10 for 'VP' title, +5 for 'SaaS' company, +20 for demo request).

## 3. Logic
1. **Iterate:** Process each lead.
2. **Apply Rules:** Sum scores based on lead attributes.
3. **Assign Score:** Categorize leads (e.g., A, B, C) based on total score.`
  },
  {
    id: 'domain-extract',
    category: 'CRM Ops',
    title: "Domain Parser",
    tagline: "Email -> Website.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Extracts domain from email.",
    blueprint: `# Project: Email Domain Extractor

## 1. Context
Get the website domain from an email address.

## 2. Requirements
- **Input:** Email address string.

## 3. Logic
1. **Split:** Split the email string at the '@' symbol.
2. **Return:** Return the second part (the domain).`
  },
  {
    id: 'job-title-normalize',
    category: 'CRM Ops',
    title: "Title Normalizer",
    tagline: "VP Sales -> Exec.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Maps specific titles to levels.",
    blueprint: `# Project: Job Title Normalizer

## 1. Context
Standardize job titles into broader categories for segmentation (e.g., 'VP of Sales', 'Sales Director' -> 'Sales Leadership').

## 2. Requirements
- **Input:** List of job titles.
- **Mapping:** Dictionary of keywords to categories.

## 3. Logic
1. **Iterate:** Process each title.
2. **Match:** Check if title contains keywords from the mapping.
3. **Assign:** Assign the corresponding category.`
  },
  {
    id: 'csv-merge',
    category: 'CRM Ops',
    title: "List Merger",
    tagline: "Combine CSVs.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Stacks files.",
    blueprint: `# Project: CSV File Merger

## 1. Context
Combine multiple CSV files into a single master list.

## 2. Requirements
- **Input:** List of CSV file paths.
- **Lib:** 
 pandas

## 3. Logic
1. **Load:** Read each CSV into a DataFrame.
2. **Concat:** Use 
 pd.concat() to stack them.
3. **Save:** Write the combined DataFrame to a new CSV.`
  },
  {
    id: 'anomaly-detect',
    category: 'CRM Ops',
    title: "Bad Data Find",
    tagline: "Find outliers.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Detects anomalies in fields.",
    blueprint: `# Project: Data Anomaly Detector

## 1. Context
Identify unusual values in CRM data that might indicate errors or fraud.

## 2. Requirements
- **Input:** CRM data (pandas DataFrame).
- **Lib:** 
 sklearn.ensemble.IsolationForest

## 3. Logic
1. **Select Features:** Choose relevant numerical columns.
2. **Train:** Fit an Isolation Forest model.
3. **Predict:** Predict anomalies (output -1).
4. **Report:** List records flagged as anomalies.`
  },
  {
    id: 'null-report',
    category: 'CRM Ops',
    title: "Empty Field Report",
    tagline: "Who is missing phone?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Counts missing values.",
    blueprint: `# Project: Missing Data Reporter

## 1. Context
Generate a report of fields with missing values in the CRM.

## 2. Requirements
- **Input:** CRM data (pandas DataFrame).

## 3. Logic
1. **Check Nulls:** Use 
 df.isnull().sum()
2. **Calculate Percentage:** Divide null counts by total rows.
3. **Report:** Display fields with the highest percentage of missing values.`
  },
  {
    id: 'splitter',
    category: 'CRM Ops',
    title: "List Splitter",
    tagline: "Divide for SDRs.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Chunks CSV.",
    blueprint: `# Project: List Splitter

## 1. Context
Divide a large list of leads into smaller chunks for distribution to SDRs.

## 2. Requirements
- **Input:** Master CSV, number of chunks.
- **Lib:** 
 pandas

## 3. Logic
1. **Load:** Read the master CSV.
2. **Chunk:** Use 
 np.array_split() to divide the DataFrame.
3. **Save:** Save each chunk to a separate CSV file.`
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
    blueprint: `# Project: Buffer CSV Exporter

## 1. Context
Format social media posts into a CSV file compatible with Buffer's bulk uploader.

## 2. Requirements
- **Input:** List of posts (text, image path, date).
- **Lib:** 
 pandas

## 3. Logic
1. **Create DataFrame:** Columns: 'Text', 'Image', 'Day of Week', 'Time'.
2. **Format:** Adjust data to match Buffer's expected format.
3. **Save:** Write to buffer_import.csv.`
  },
  {
    id: 'image-quote',
    category: 'Social Automation',
    title: "Quote Maker",
    tagline: "Text -> Image.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Generates quote card.",
    blueprint: `# Project: Quote Image Generator

## 1. Context
Create visually appealing quote graphics for social media.

## 2. Requirements
- **Input:** Quote text, author name, background image.
- **Lib:** 
 Pillow

## 3. Logic
1. **Load:** Open background image.
2. **Draw Text:** Add quote and author text with appropriate styling (font, size, color, wrapping).
3. **Save:** Save as quote.jpg.`
  },
  {
    id: 'trend-alert',
    category: 'Social Automation',
    title: "Trend Watch",
    tagline: "Twitter Trends.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Alerts on keywords.",
    blueprint: `# Project: Twitter Trend Monitor

## 1. Context
Get alerted when specific keywords start trending on Twitter.

## 2. Requirements
- **Input:** List of keywords.
- **API:** Twitter API (v2).

## 3. Logic
1. **Fetch Trends:** Get current trending topics for a specific location.
2. **Check Keywords:** See if any input keywords are present in the trends.
3. **Alert:** Send notification if a keyword is trending.`
  },
  {
    id: 'auto-dm',
    category: 'Social Automation',
    title: "DM List Maker",
    tagline: "Prepare DMs.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Merges name into template.",
    blueprint: `# Project: Personalized DM Template

## 1. Context
Create personalized direct message templates for outreach.

## 2. Requirements
- **Input:** List of names, message template string (e.g., "Hi {{Name}}, ...").

## 3. Logic
1. **Loop:** Iterate through names.
2. **Format:** Use string formatting to insert name into template.
3. **Output:** Generate list of personalized messages.`
  },
  {
    id: 'bio-updater',
    category: 'Social Automation',
    title: "Bio Rotator",
    tagline: "Update link weekly.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Updates Twitter Bio URL.",
    blueprint: `# Project: Twitter Bio Link Rotator

## 1. Context
Automatically update the link in your Twitter bio to promote different content weekly.

## 2. Requirements
- **Input:** List of URLs, schedule (e.g., weekly).
- **API:** Twitter API v2.

## 3. Logic
1. **Schedule:** Run script weekly.
2. **Get Next URL:** Select the next URL from the list.
3. **Update Profile:** Use Twitter API to update the profile_url field.
4. **Log:** Record the updated URL.`
  },
  {
    id: 'follower-diff',
    category: 'Social Automation',
    title: "Follower Audit",
    tagline: "Who unfollowed?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Compares friend lists.",
    blueprint: `# Project: Follower Change Detector

## 1. Context
Identify users who recently unfollowed you on social media.

## 2. Requirements
- **Input:** Twitter API access.

## 3. Logic
1. **Get Followers (T=0):** Fetch current follower list.
2. **Wait:** Wait 24 hours.
3. **Get Followers (T=1):** Fetch follower list again.
4. **Compare:** Find users in (T=0) list but not in (T=1) list.
5. **Report:** List unfollowers.`
  },
  {
    id: 'activity-log',
    category: 'Social Automation',
    title: "Engagement Log",
    tagline: "Track your replies.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Logs your activity.",
    blueprint: `# Project: Social Media Activity Logger

## 1. Context
Keep a record of your own social media activity (replies, posts) for auditing.

## 2. Requirements
- **Input:** Twitter API access.

## 3. Logic
1. **Fetch Timeline:** Get your own tweets and replies.
2. **Extract Data:** Save tweet text, timestamp, URL, engagement metrics.
3. **Store:** Append to a log file or database.`
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
    blueprint: `# Project: Personalized Email Sender

## 1. Context
Send personalized emails to a list of leads using Gmail.

## 2. Requirements
- **Input:** CSV with leads (Name, Email, Custom Field), email template.
- **Lib:** 
 smtplib
 email.mime.text

## 3. Logic
1. **Load Data:** Read CSV.
2. **Loop:** For each lead:
   - Format the email template with lead data.
   - Connect to Gmail SMTP server.
   - Send the email.
3. **Log:** Track sent emails.`
  },
  {
    id: 'warmup-generator',
    category: 'Outreach',
    title: "Warmup Text Gen",
    tagline: "Generate AI openers.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Uses LLM for first lines.",
    blueprint: `# Project: AI Email Opener Generator

## 1. Context
Generate personalized opening lines for cold emails based on prospect's LinkedIn profile.

## 2. Requirements
- **Input:** Prospect Name, Company, LinkedIn URL.
- **API:** OpenAI API.

## 3. Logic
1. **Scrape:** Get key info from LinkedIn profile (recent posts, company description).
2. **Prompt:** Create a prompt for GPT asking for a relevant opening line based on the info.
3. **Generate:** Call OpenAI API.
4. **Output:** Provide the generated text.`
  },
  {
    id: 'subject-line-tester',
    category: 'Outreach',
    title: "Subject Line Grade",
    tagline: "Rate email subjects.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Checks length/keywords.",
    blueprint: `# Project: Email Subject Line Grader

## 1. Context
Score email subject lines based on best practices (length, keywords, personalization).

## 2. Requirements
- **Input:** Subject line string.

## 3. Logic
1. **Check Length:** Ensure it's within optimal range (e.g., 40-60 chars).
2. **Keywords:** Check for spam trigger words.
3. **Personalization:** Check for presence of name/company.
4. **Score:** Assign a score (e.g., 1-5).`
  },
  {
    id: 'ab-calc',
    category: 'CRO',
    title: "Significance Calc",
    tagline: "Is A better than B?",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Stats calculator.",
    blueprint: `# Project: A/B Test Significance Calculator

## 1. Context
Determine if the results of an A/B test are statistically significant.

## 2. Requirements
- **Input:** Control group data (visitors, conversions), Test group data.
- **Lib:** 
 scipy.stats

## 3. Logic
1. **Calculate:** Use 
 stats.proportions_ztest() to compare conversion rates.
2. **Output:** P-value. If p < 0.05, declare significance.`
  },
  {
    id: 'heat-map-gen',
    category: 'CRO',
    title: "Click Heatmap",
    tagline: "Plot clicks on image.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Visualizes coords.",
    blueprint: `# Project: Click Heatmap Generator

## 1. Context
Visualize user clicks on a webpage screenshot.

## 2. Requirements
- **Input:** List of click coordinates (x, y), screenshot image.
- **Lib:** 
 Pillow

## 3. Logic
1. **Load:** Open screenshot image.
2. **Draw:** For each click coordinate, draw a small circle or dot.
3. **Save:** Save the annotated image.`
  },
  {
    id: 'funnel-viz',
    category: 'CRO',
    title: "Funnel Graph",
    tagline: "Visualize dropoff.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Draws funnel chart.",
    blueprint: `# Project: Conversion Funnel Visualizer

## 1. Context
Visualize user drop-off at each stage of a conversion funnel.

## 2. Requirements
- **Input:** Funnel stage data (e.g., Visits, Signups, Purchases).
- **Lib:** 
 plotly
 pandas

## 3. Logic
1. **Create DataFrame:** Structure funnel data.
2. **Plot:** Use 
 plotly.graph_objects.Figure() with type='funnel'.
3. **Display:** Show or save the chart.`
  },
  {
    id: 'form-tester',
    category: 'CRO',
    title: "Form Health",
    tagline: "Check form submit.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Auto-submits test lead.",
    blueprint: `# Project: Automated Form Tester

## 1. Context
Ensure website forms are working correctly by submitting test data.

## 2. Requirements
- **Input:** Form URL, test data.
- **Lib:** 
 playwright

## 3. Logic
1. **Navigate:** Go to the form page.
2. **Fill Fields:** Input test data into form fields.
3. **Submit:** Click the submit button.
4. **Verify:** Check for success message or redirect.
5. **Report:** Log success/failure.`
  },
  {
    id: 'utm-builder',
    category: 'Lead Gen',
    title: "UTM Factory",
    tagline: "Build links.",
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Standard generator.",
    blueprint: `# Project: UTM Parameter Builder

## 1. Context
Generate clean, consistent UTM parameters for marketing links.

## 2. Requirements
- **Input:** Base URL, Source, Medium, Campaign.

## 3. Logic
1. **Construct:** Append UTM parameters to the base URL using standard format.
2. **Output:** Provide the full tracking URL.`
  },
  // --- ADVANCED SEO (31-45) ---
  {
    id: 'sitemap-stress-test',
    category: 'SEO',
    title: "Sitemap Stress-Tester",
    tagline: "Validate 10,000+ links async.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Async link validator that parses massive XML sitemaps and follows all redirect chains to find soft 404s.",
    blueprint: `# Project: Async Sitemap Auditor

## 1. Context
Audit massive site structures by stress-testing every URL in the XML sitemap.

## 2. Requirements
- **Input:** XML Sitemap URL.
- **Tech Stack:** Python, \`aiohttp\`, \`lxml\`.

## 3. Logic
1. **Fetch:** Download the XML. Recursively fetch child sitemaps if it's an index.
2. **Queue:** Add all <loc> URLs to an async queue.
3. **Async HEAD:** Request headers only first to save bandwidth.
4. **Follow:** If 3xx, follow until a 200 or error is reached. Count the "hops".
5. **Report:** Export status codes, redirect counts, and response times to CSV.`
  },
  {
    id: 'internal-link-equity',
    category: 'SEO',
    title: "Link Equity Mapper",
    tagline: "Identify orphaned pages.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Crawls your internal site structure to build a graph of link distribution and find pages with zero internal inbound links.",
    blueprint: `# Project: Internal Link Graph

## 1. Context
Map your site's "Link Juice" flow and find disconnected pages.

## 2. Logic
1. **Recursive Crawl:** Limited to internal domain.
2. **Edge Extraction:** For every page, find all <a> tags pointing to internal pages.
3. **Graphing:** Add nodes (URLs) and edges (Links) to a NetworkX object.
4. **Centrality:** Calculate In-degree centrality (most linked pages).
5. **Output:** List all URLs with 0 incoming internal links.`
  },
  {
    id: 'serp-volatility-monitor',
    category: 'SEO',
    title: "Algorithm Flux Watcher",
    tagline: "Detect niche ranking changes.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Daily tracker for top 10 results across 50 keywords. Flags algorithm updates when positions shift significantly overnight.",
    blueprint: `# Project: SERP Volatility Tracker

## 1. Context
Know if a Google update is hitting your specific niche before the news outlets.

## 2. Logic
1. **Daily Pull:** Fetch top 10 results for each keyword in 'keywords.csv'.
2. **History:** Compare against yesterday's results in 'rankings.db'.
3. **Flux Calc:** Sum the absolute change in positions across all keywords.
4. **Threshold:** If average flux > 3.0, print a "High Algorithm Activity" alert.`
  },
  {
    id: 'log-file-seo-miner',
    category: 'SEO',
    title: "Googlebot Log Miner",
    tagline: "Audit your crawl budget.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Parses Nginx/Apache logs to find exactly when and where Googlebot is visiting, highlighting wasted crawl budget on low-value pages.",
    blueprint: `# Project: Crawl Budget Auditor

## 1. Context
Stop wasting Google's attention on non-indexable or low-value pages.

## 2. Logic
1. **Filter:** Read raw server logs. Filter lines where User-Agent contains 'Googlebot'.
2. **Verify:** Perform reverse DNS lookup on IP to ensure it's a real bot.
3. **Aggregate:** Count hits per URL path.
4. **Compare:** Match hits against 'low_value_urls.txt'.
5. **Output:** Summary of 'Crawl Waste %'."`
  },
  {
    id: 'bulk-psi-audit',
    category: 'SEO',
    title: "Core Vitals Matrix",
    tagline: "Speed test 100 pages at once.",
    difficulty: 'Advanced',
    time: '20 mins',
    description: "Automated PageSpeed Insights auditor that checks LCP, CLS, and FID across your entire site via API.",
    blueprint: `# Project: Bulk Lighthouse Auditor

## 1. Context
Identify slow product pages at scale without manual testing.

## 2. Logic
1. **Queue:** Load list of 100 priority URLs.
2. **API:** Loop through URLs, calling the PSI API strategy=mobile.
3. **Extract:** Grab 'largest-contentful-paint' and 'cumulative-layout-shift' scores.
4. **Categorize:** Label each URL as "Pass" or "Fail" based on Google thresholds.
5. **Save:** Output to 'vitals_matrix.csv'.`
  },

  // --- COMPETITIVE INTEL PRO (46-60) ---
  {
    id: 'visual-regression-spy',
    category: 'Competitor Intel',
    title: "Visual Change Watchtower",
    tagline: "Spot 'invisible' pricing tests.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Uses computer vision to compare competitor homepage screenshots. Highlights changed pixels—catching new A/B tests instantly.",
    blueprint: `# Project: Visual Diff Tracker

## 1. Context
Detect changes in competitor layouts or CTA colors that text-scrapers miss.

## 2. Logic
1. **Capture:** Headless browser takes full-page screenshot of competitor.
2. **Compare:** Use Pillow 'ImageChops.difference' vs yesterday's screenshot.
3. **Threshold:** Filter out minor noise (e.g., date changes).
4. **Highlight:** Create a new image with changed areas highlighted in neon red.
5. **Notify:** Save to /alerts/ if change percentage > 1%.`
  },
  {
    id: 'ad-creative-archiver',
    category: 'Competitor Intel',
    title: "Ad Library Swipe-Bot",
    tagline: "Auto-save competitor creatives.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Crawls the FB/Meta Ad Library for a specific brand and downloads every image/video plus ad copy into a local swipe file.",
    blueprint: `# Project: Ad Library Scraper

## 1. Context
Maintain a local archive of every ad a competitor runs for creative inspiration.

## 2. Logic
1. **Render:** Navigate to Ad Library with Playwright.
2. **Scroll:** Scroll to load 50+ active ad cards.
3. **Identify:** Find ad containers. Extract Ad ID, Copy text, and Media SRC.
4. **Download:** Save videos to /video/ and images to /img/ using Ad ID as filename.
5. **Dedupe:** Cross-check with 'downloaded_ads.db' to only grab new ones.`
  },
  {
    id: 'job-board-strategy-spy',
    category: 'Competitor Intel',
    title: "Hiring Signal Scanner",
    tagline: "Predict their next big move.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Monitors a competitor's /careers page. Categorizes job titles to predict if they are moving into a new industry or region.",
    blueprint: `# Project: Hiring Intelligence Bot

## 1. Context
If a competitor hires 5 "Salesforce Architects", they are going Enterprise. Know before they announce it.

## 2. Logic
1. **Scrape:** Extract all job titles from the careers page.
2. **Categorize:** Group by: Engineering, Sales, Product, Marketing.
3. **Trend:** Compare total count vs last month.
4. **Signal:** Flag high-value keywords (e.g., "Mobile", "International", "Legacy").
5. **Output:** 3-bullet executive summary of their likely roadmap.`
  },
  {
    id: 'sitemap-delta-monitor',
    category: 'Competitor Intel',
    title: "Stealth Launch Detector",
    tagline: "See new landing pages first.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Monitors competitor sitemap.xml for new URLs. Detects new product launches or blog posts the second they are published.",
    blueprint: `# Project: Sitemap Spy

## 1. Context
Get an alert when a competitor launches a new feature page.

## 2. Logic
1. **Fetch:** Download competitor's sitemap.xml daily.
2. **Set Diff:** \`new = today_urls - yesterday_urls\`.
3. **Clean:** Ignore generic category/tag additions.
4. **Log:** Print "NEW PAGE: [URL]" to terminal.
5. **Save:** Archive today's set for tomorrow's comparison.`
  },
  {
    id: 'tech-stack-drift-watcher',
    category: 'Competitor Intel',
    title: "Stack Drift Watcher",
    tagline: "Alert when they switch CRM.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Scans competitor site headers daily. Alerts you if they switch from Intercom to Zendesk or Shopify to BigCommerce.",
    blueprint: `# Project: Technographic Monitor

## 1. Context
Know when a competitor upgrades their tech stack—a signal of growth or shift in vendor strategy.

## 2. Logic
1. **Fetch:** Get homepage HTML.
2. **Detect:** Run signatures for 50 common SaaS tools.
3. **History:** Compare detected tools against 'stack_yesterday.json'.
4. **Identify:** Find "Removed" or "Added" tools.
5. **Alert:** "Competitor just installed Segment.io (Signal: Investing in Data)." `
  },

  // --- CONTENT ENGINEERING PRO (61-100) ---
  {
    id: 'webinar-action-item-cli',
    category: 'Content Ops',
    title: "Action Item Extractor",
    tagline: "Extract tasks from transcripts.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Reads a Zoom/Teams transcript. Uses regex and NLP to identify speaker commitments ('I will', 'Let's') and outputs a todo list.",
    blueprint: `# Project: Meeting Task Miner

## 1. Context
Convert 1 hour of rambling transcript into 5 clear action items.

## 2. Logic
1. **Parse VTT:** Extract timestamp, Speaker, and text.
2. **Filter:** Search for task-related phrases ("I'll send", "Can you handle", "Action item:").
3. **Speaker Map:** Attribute each task to the person who said it.
4. **Save:** Output as 'Next_Steps.md' formatted for project management.`
  },
  {
    id: 'auto-subtitle-burner-pro',
    category: 'Content Ops',
    title: "Social Caption Burner",
    tagline: "Burn SRT into MP4 locally.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Automated FFMPEG transcode that hard-codes stylized subtitles onto a video file—perfect for LinkedIn/Twitter native video.",
    blueprint: `# Project: Automated Captioner

## 1. Context
Avoid manual video editing just to add subtitles.

## 2. Logic
1. **Init:** Load video.mp4 and captions.srt.
2. **Filter:** Construct FFMPEG 'subtitles' filter with font/color/alignment settings.
3. **Transcode:** Run command locally.
4. **Output:** Save as 'video_with_captions.mp4'.`
  },
  {
    id: 'image-alt-batch-vision',
    category: 'Content Ops',
    title: "AI Alt-Text Batcher",
    tagline: "Describe 100 images for SEO.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Uses a local or API Vision model to analyze a folder of images and generate high-quality SEO alt-tags for your CMS.",
    blueprint: `# Project: Vision SEO Batcher

## 1. Context
Automate the tedious task of writing alt-text for product catalogs.

## 2. Logic
1. **Loop:** Iterate through a folder of .jpg/.png.
2. **Analyze:** Send image to Vision model (GPT-4o/Claude).
3. **Prompt:** "Generate a 10-word SEO alt-tag for this product image."
4. **Metadata:** Save filename and description to a master CSV.`
  },
  {
    id: 'podcast-guest-prep-bot',
    category: 'Content Ops',
    title: "Guest Briefing Bot",
    tagline: "Instant interview research.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Input a name. The script scrapes their LinkedIn, Twitter, and personal site to generate 5 deep-dive interview questions.",
    blueprint: `# Project: Interview Researcher

## 1. Context
Stop asking generic questions. Get guest-specific insights in seconds.

## 2. Logic
1. **Scrape:** Visit guest's LinkedIn profile and most recent posts.
2. **Analyze:** Identify "Career Pivots" or unique opinions in their content.
3. **Synthesis:** Combine bio data with recent activity.
4. **Output:** 1-page briefing doc with "Topics to Avoid" and "Must-Ask Questions".`
  },
  {
    id: 'broken-backlink-reclaimer-pro',
    category: 'SEO',
    title: "Backlink Reclaimer",
    tagline: "Fix 404s with inbound juice.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Matches your 404 error list against your inbound backlink list. Prioritizes fixing URLs that are actually losing SEO authority.",
    blueprint: `# Project: Link Equity Saver

## 1. Context
Stop wasting hard-earned backlinks on dead pages.

## 2. Logic
1. **Inputs:** \`errors.csv\` (404s) and \`backlinks.csv\` (from Ahrefs).
2. **Merge:** Match on Target URL.
3. **Score:** Sort by "Number of Linking Domains" per 404.
4. **Output:** List of top 10 URLs to 301 redirect immediately.`
  },
  // --- ENRICHMENT & DATA OPS (46-60) ---
  {
    id: 'fuzzy-company-matcher',
    category: 'CRM Ops',
    title: "Company Deduplicator",
    tagline: "Merge 'Apple' and 'Apple Inc.'",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Uses fuzzy string matching to identify duplicate company records in your CRM that standard exact-match tools miss.",
    blueprint: `# Project: Fuzzy CRM Deduper

## 1. Context
Clean up a messy CRM where company names aren't standardized.

## 2. Requirements
- **Input:** \`leads.csv\`.
- **Lib:** \`thefuzz\` (fuzzywuzzy).

## 3. Logic
1. **Pre-clean:** Remove 'Inc', 'LLC', 'Ltd' and punctuation.
2. **Matrix:** For each row, compare Name to every other row.
3. **Score:** Calculate Levenshtein Distance score.
4. **Threshold:** If match > 90%, flag as potential duplicate.
5. **Group:** Assign a common 'Cluster ID' to matched rows for manual review.`
  },
  {
    id: 'technographic-profiler-async',
    category: 'Enrichment',
    title: "Tech Stack Profiler",
    tagline: "Scan 500 sites/min for HubSpot.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "A high-speed technographic scanner that uses async requests to detect the software stack of thousands of leads concurrently.",
    blueprint: `# Project: Async Stack Scanner

## 1. Context
Qualify thousands of domains based on their installed tools (e.g., finding Intercom users).

## 2. Logic
1. **Queue:** Add 500 domains to a \`Queue\`.
2. **Async Workers:** Start 20 concurrent \`aiohttp\` workers.
3. **Detection:** Search HTML for tool signatures (\`js.hs-scripts.com\`).
4. **Resilience:** Handle timeouts and DNS errors without crashing the whole script.
5. **Save:** Stream results to CSV as they are found.`
  },
  {
    id: 'linkedin-experience-extractor',
    category: 'Enrichment',
    title: "Career Pivot Detector",
    tagline: "Find leads who just started new roles.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Scrapes the 'Experience' section of a LinkedIn profile to detect if someone has been in their role for less than 90 days—a massive intent signal.",
    blueprint: `# Project: New Role Detector

## 1. Context
Reach out to decision-makers in their "First 90 Days" when they are most likely to buy new tools.

## 2. Logic
1. **Input:** List of LinkedIn URLs.
2. **Scrape:** Access public profile (or via API).
3. **Parse Dates:** Find the top-most item in the Experience list.
4. **Calc:** Calculate \`months_in_role\`.
5. **Filter:** Keep only those where \`months < 3\`.`
  },
  {
    id: 'glassdoor-salary-enricher',
    category: 'Enrichment',
    title: "Budget Tier Estimator",
    tagline: "Estimate lead budget via Glassdoor.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Infers company budget tier by scraping Glassdoor salary ranges for common roles. High salaries = High tool budgets.",
    blueprint: `# Project: Budget Tier Intelligence

## 1. Context
Guess the "buying power" of an account by looking at what they pay their engineers/marketers.

## 2. Logic
1. **Search:** Query Glassdoor for "[Company] Salaries".
2. **Extract:** Get the salary range for "Software Engineer" or "Marketing Manager".
3. **Normalize:** Convert hourly to annual.
4. **Bucket:** Categorize company as Tier 1, 2, or 3 based on median salary.`
  },
  {
    id: 'reddit-mention-bot',
    category: 'Competitor Intel',
    title: "Reddit Keyword Monitor",
    tagline: "Alert when someone mentions [Topic].",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Listens to specific subreddits for keywords related to your product. Perfect for jumping into conversations early.",
    blueprint: `# Project: Reddit Watcher

## 1. Context
Real-time intent monitoring on Reddit.

## 2. Requirements
- **Lib:** \`praw\` (Python Reddit API Wrapper).

## 3. Logic
1. **Stream:** \`subreddit.stream.comments()\`.
2. **Match:** If keyword in comment body.
3. **Filter:** Ignore your own posts or known bot accounts.
4. **Notify:** Send Slack alert with Link to comment and context snippet.`
  },

  // --- OUTREACH & CRO (61-75) ---
  {
    id: 'local-mail-merge-pro',
    category: 'Outreach',
    title: "Ghost Mail-Merge",
    tagline: "Send 1:1 emails via Gmail API.",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "A local mail-merge tool that sends personalized emails through your own Gmail account—avoiding the 'Promotions' tab of bulk ESPs.",
    blueprint: `# Project: Custom Mail Merge

## 1. Context
Send 50 high-touch personalized emails without using a mass-mailing tool.

## 2. Logic
1. **Input:** \`list.csv\` with columns: \`Email\`, \`Name\`, \`Specific_Fact\`.
2. **Template:** Use \`jinja2\` to render a personalized HTML/Text body.
3. **Handshake:** Connect to Gmail API (OAuth).
4. **Send:** Loop with random delay (30-90s) between sends.
5. **Log:** Update CSV with 'Sent_Timestamp'.`
  },
  {
    id: 'ai-opener-generator',
    category: 'Outreach',
    title: "Personalized Opener Bot",
    tagline: "Generate 50 'First Lines' using GPT-4.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Takes a LinkedIn profile summary and generates a unique, human-sounding 'Icebreaker' for cold outreach.",
    blueprint: `# Project: Icebreaker AI

## 1. Context
Automate the most time-consuming part of cold emailing: the first sentence.

## 2. Logic
1. **Input:** \`bio_data.csv\`.
2. **Prompt:** "Based on this bio: '{bio}', write a one-sentence observation that shows I've researched them. Don't be creepy."
3. **Execution:** Batch process via OpenAI API.
4. **Safety:** Flag any responses containing "AI", "Assistant", or generic praise.
5. **Output:** CSV ready for Mail-Merge.`
  },
  {
    id: 'subject-line-ab-tester',
    category: 'CRO',
    title: "Subject Line Predictor",
    tagline: "Score subject lines for Open Rate.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Analyzes 10 subject lines against known 'Spam' triggers and 'High Open' patterns. Uses an LLM to predict which will win.",
    blueprint: `# Project: Subject Line Grader

## 1. Context
Increase open rates by auditing subject lines before hitting send.

## 2. Logic
1. **Checks:** Flag "Urgent", "FREE", all-caps, or over 60 chars.
2. **Sentiment:** Measure curiosity-gap score.
3. **AI Prediction:** Ask LLM to rank the list from 1-10 based on typical B2B conversion data.
4. **Export:** Report with "Suggested Fixes".`
  },
  {
    id: 'ab-test-significance-pro',
    category: 'CRO',
    title: "Statistical Sig-Check",
    tagline: "Is your test result actually valid?",
    difficulty: 'Intermediate',
    time: '10 mins',
    description: "A professional-grade Z-test calculator for A/B tests that tells you the 'Confidence Level' and 'Days to Reach Significance'.",
    blueprint: `# Project: A/B Test Validator

## 1. Context
Stop calling winners too early. Use math to prove it.

## 2. Logic
1. **Inputs:** Control (Visitors, Conv), Variant (Visitors, Conv).
2. **Calculation:** Calculate Standard Error and Z-Score.
3. **Confidence:** Determine P-value.
4. **Verdict:** If P < 0.05, print "WINNER". Otherwise, calculate how many more visitors are needed.`
  },
  {
    id: 'lead-magnet-quiz-gen',
    category: 'CRO',
    title: "Lead Magnet Builder",
    tagline: "Generate a custom quiz from a prompt.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Input a topic (e.g., 'SEO Audit') and this script generates a fully functional HTML/JS quiz file you can upload to your site instantly.",
    blueprint: `# Project: Auto-Quiz Generator

## 1. Context
Rapidly deploy high-converting lead magnets.

## 2. Logic
1. **Prompt:** "Generate 5 questions about {Topic} with 4 multiple choice answers each."
2. **Structure:** Map into a JSON object.
3. **Render:** Inject JSON into a pre-styled HTML/Tailwind template.
4. **Logic:** Add JS for scoring and a final 'Email Opt-in' form.
5. **Save:** Output \`quiz.html\`.`
  },
  // --- FINAL PRO-GRADE TOOLS (76-100) ---
  {
    id: 'competitor-ad-creative-detector',
    category: 'Competitor Intel',
    title: "Ad Creative Detector",
    tagline: "Detect 'Winner' ads by spend duration.",
    difficulty: 'Advanced',
    time: '45 mins',
    description: "Monitors competitor ads over 14 days. If an ad remains active for the full duration, it flags it as a 'Winner' (high spend/high performance).",
    blueprint: `# Project: Winning Ad Hunter

## 1. Context
Identify high-ROI creative strategies by tracking their longevity.

## 2. Logic
1. **Daily Scrape:** Record all active Ad IDs from FB Ad Library.
2. **Persistence Check:** Compare today's IDs vs 14 days ago.
3. **Filter:** Isolate IDs present in every single daily check.
4. **Report:** Output the Media/Copy of these "Lifer" ads.`
  },
  {
    id: 'local-seo-gap-analyst',
    category: 'SEO',
    title: "Local SEO Gap Analyst",
    tagline: "Who ranks above you in the '3-pack'?",
    difficulty: 'Advanced',
    time: '35 mins',
    description: "Scrapes the Google Maps 'Local Pack' for 50 zip codes. Identifies which competitors are consistently beating you in specific neighborhoods.",
    blueprint: `# Project: Map Pack Dominance Audit

## 1. Context
Visualize your local SEO coverage across a city.

## 2. Logic
1. **Iterate Zips:** Load list of target zip codes.
2. **Search:** Request Maps for "Service in {Zip}".
3. **Parse Rank:** Save the Name and Rank (1, 2, 3) of businesses.
4. **Pivot:** Create a heatmap of "Market Share %" per competitor.`
  },
  {
    id: 'broken-link-email-hunter',
    category: 'Lead Gen',
    title: "Link-Building Prospector",
    tagline: "Find broken links on blogs + author emails.",
    difficulty: 'Advanced',
    time: '40 mins',
    description: "Crawls high-authority blogs, finds broken external links, and automatically looks up the author's contact info for 'Broken Link' outreach.",
    blueprint: `# Project: Outreach Spider

## 1. Context
Scale broken link building by finding the target and the contact in one go.

## 2. Logic
1. **Crawl:** Scan top 50 blogs in your niche.
2. **Detect:** HEAD request all external links. Find 404s.
3. **Enrich:** For pages with 404s, find the 'Author' name in the metadata.
4. **Contact:** Scrape the /about or use Email Permutator to guess the author's email.`
  },
  {
    id: 'automated-case-study-builder',
    category: 'Content Ops',
    title: "Case Study Drafter",
    tagline: "Turn customer calls into PDF drafts.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Takes a raw interview transcript and an LLM prompt to generate a formatted 'Challenge, Solution, Result' case study draft.",
    blueprint: `# Project: PDF Story Generator

## 1. Context
Accelerate content creation by automating the first draft of social proof.

## 2. Logic
1. **Digest:** Extract "Pain Points" and "KPI improvements" from transcript.
2. **Draft:** Feed data to LLM with Case Study template.
3. **PDF Render:** Use \`ReportLab\` to create a branded PDF with the text.`
  },
  {
    id: 'instagram-engagement-bot-lite',
    category: 'Social Automation',
    title: "Engagement Analyst",
    tagline: "Find your most active fans.",
    difficulty: 'Intermediate',
    time: '25 mins',
    description: "Analyzes the last 20 posts on your account. Identifies users who liked/commented on >50% of them for VIP outreach.",
    blueprint: `# Project: Superfan Detector

## 1. Context
Reward your most loyal social followers.

## 2. Logic
1. **Fetch:** Get commenters/likers for the last 20 posts.
2. **Count:** Create a frequency map of Usernames.
3. **Filter:** Top 10% of users.
4. **Export:** List of handles ready for manual DMs.`
  },
  {
    id: 'twitter-trend-hijack-alert',
    category: 'Social Automation',
    title: "Trend Hijacker",
    tagline: "Alert when niche topics go viral.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Monitors the Twitter 'Trending' API. Alerts if keywords like 'SaaS', 'SEO', or '[Competitor]' appear in the global or local top 50.",
    blueprint: `# Project: Newsjacking Monitor

## 1. Context
Be the first to comment on viral industry news.

## 2. Logic
1. **Poll:** Query Twitter Trends every 15 mins.
2. **Match:** Intersection check with your Keyword list.
3. **Webhook:** Post to Slack: "Topic X is trending! Draft a post now."`
  },
  {
    id: 'semantic-search-prospector',
    category: 'Lead Gen',
    title: "Semantic Prospector",
    tagline: "Find sites that *sound* like your best customers.",
    difficulty: 'Advanced',
    time: '50 mins',
    description: "Uses 'Vector Embeddings' to compare website descriptions. Feed it your best customer's URL, and it finds 50 other sites with similar core messaging.",
    blueprint: `# Project: AI Lookalike Finder

## 1. Context
Find competitors or similar businesses that aren't in the same industry category but have the same "vibe" or business model.

## 2. Logic
1. **Embed:** Convert your "Seed" company's description into a vector.
2. **Crawl:** Scrape descriptions of 500 potential leads.
3. **Compare:** Use Cosine Similarity to find the closest matches.
4. **Rank:** Sort by similarity score.`
  },
  {
    id: 'automated-form-qa-pro',
    category: 'CRO',
    title: "Form Conversion Guard",
    tagline: "Test your funnel for 404s every hour.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "A heartbeat monitor for your checkout/lead form. Uses Playwright to fill the form and verify the 'Thank You' page appears.",
    blueprint: `# Project: Funnel Watchdog

## 1. Context
Don't wait for a customer to tell you the 'Submit' button is broken.

## 2. Logic
1. **Scripted Journey:** Visit /landing, click CTA, fill dummy data.
2. **Success Check:** Assert that the final URL contains "/success".
3. **Failure:** If any step fails, capture a screenshot and email the team.`
  },
  {
    id: 'linkedin-connection-personalizer',
    category: 'Outreach',
    title: "Connection Personalizer",
    tagline: "Draft 20 custom invites in 10 mins.",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Input a list of LinkedIn URLs. The script finds a specific recent post they made and drafts a 'I loved your point about X' connection request.",
    blueprint: `# Project: Contextual Inviter

## 1. Context
Stop sending generic "I'd like to join your network" requests.

## 2. Logic
1. **Post Scrape:** Find the most recent post with > 5 likes.
2. **Summarize:** Use LLM to extract the core thesis of that post.
3. **Draft:** "Hey {Name}, saw your post about {Thesis}. Would love to connect."`
  },
  {
    id: 'broken-schema-fixer',
    category: 'SEO',
    title: "JSON-LD Repair Kit",
    tagline: "Find and fix broken Schema.org tags.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Crawls your product pages, validates the JSON-LD schema, and flags missing required fields (like 'Price' or 'Availability').",
    blueprint: `# Project: Schema Validator

## 1. Context
Ensure your rich snippets (stars, prices) show up in Google.

## 2. Logic
1. **Extract:** Get JSON-LD block from HTML.
2. **Validate:** Use a library to check against Schema.org definitions.
3. **Alert:** Log missing 'Required' properties per Product type.`
  },
  {
    id: 'competitor-newsletter-spy',
    category: 'Competitor Intel',
    title: "Newsletter Subject Watcher",
    tagline: "Track their email hook strategy.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Connects to a dummy Gmail account. Every time a competitor sends a newsletter, it logs the Subject, Send Time, and Word Count to a tracker.",
    blueprint: `# Project: Inbox Intel

## 1. Context
Reverse-engineer the email frequency and hook strategy of competitors.

## 2. Logic
1. **Auth:** Connect via IMAP to 'newsletter-burner@gmail.com'.
2. **Filter:** Search for 'From: [Competitor]'.
3. **Log:** Append to a master Google Sheet (or CSV).`
  },
  {
    id: 'image-size-audit-pro',
    category: 'SEO',
    title: "The Bloat Finder",
    tagline: "Find images > 500KB killing your speed.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "A quick audit of your site's images. Reports any file that is uncompressed or in an old format (like .tiff or huge .png).",
    blueprint: `# Project: Image Audit

## 1. Logic
1. **Crawl:** Find all <img> tags.
2. **Check:** Perform a HEAD request to get 'Content-Length'.
3. **Flag:** List all URLs where size > 500,000 bytes.`
  },
  {
    id: 'brand-mention-tracker-all-web',
    category: 'Competitor Intel',
    title: "Web Mention Tracker",
    tagline: "Track brand mentions without a $99/mo tool.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Scrapes Google News and Bing search daily for your brand name + 'review' or 'scam' to catch PR issues early.",
    blueprint: `# Project: PR Alert System

## 1. Logic
1. **Query:** Run daily searches for brand keywords.
2. **Dedupe:** Cross-reference against 'known_mentions.db'.
3. **Notify:** Slack the team when a new blog post mentions the brand.`
  },
  {
    id: 'utm-click-analyzer',
    category: 'CRM Ops',
    title: "UTM Effectiveness Audit",
    tagline: "Which campaign is actually closing?",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Joins your 'Closed Won' deals CSV with your 'Web Leads' CSV via Email to see which UTM_Campaign generated the most revenue.",
    blueprint: `# Project: Revenue Attribution Joiner

## 1. Logic
1. **Load:** Read Sales CSV and Analytics CSV.
2. **Join:** Merge on 'Email' column.
3. **Group:** \`df.groupby('utm_campaign')['Revenue'].sum()\`.
4. **Result:** Real ROI reporting.`
  },
  {
    id: 'form-email-domain-validator',
    category: 'CRO',
    title: "B2B Lead Guard",
    tagline: "Block 'gmail.com' in real-time.",
    difficulty: 'Beginner',
    time: '10 mins',
    description: "A snippet of JS (and the terminal script to generate it) that prevents users from submitting forms with personal email addresses.",
    blueprint: `# Project: B2B Email Enforcer

## 1. Logic
1. **Regex:** Define blocklist: ['gmail', 'yahoo', 'hotmail'].
2. **Event:** On blur of Email field, check domain.
3. **Action:** Show error "Please use a work email." if match found.`
  },
  {
    id: 'video-audio-normalizer',
    category: 'Content Ops',
    title: "Podcast Audio Leveler",
    tagline: "Make all guest voices same volume.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Uses 'ffmpeg-normalize' to ensure your podcast doesn't have one quiet guest and one loud host.",
    blueprint: `# Project: Audio Leveler

## 1. Logic
1. **Analyze:** Check peak and RMS levels.
2. **Normalize:** Apply EBU R128 loudness normalization.
3. **Export:** Save as 'mastered_audio.mp3'.`
  },
  {
    id: 's3-media-backup',
    category: 'Content Ops',
    title: "Cloud Media Mirror",
    tagline: "Backup all site assets to S3.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Crawls your site, finds all image/video files, and mirrors them to an AWS S3 bucket for permanent backup.",
    blueprint: `# Project: Media Mirror

## 1. Logic
1. **Crawl:** List all URLs ending in .jpg, .png, .mp4.
2. **Download:** Fetch file to temp storage.
3. **Upload:** Use boto3 to push to S3 bucket.`
  },
  {
    id: 'competitor-traffic-source-spy',
    category: 'Competitor Intel',
    title: "Traffic Source Analyzer",
    tagline: "Where do they get their traffic?",
    difficulty: 'Advanced',
    time: '25 mins',
    description: "Uses the SimilarWeb API (or scraping fallback) to determine if a competitor is driven by Search, Social, or Direct.",
    blueprint: `# Project: Referral Detective

## 1. Logic
1. **Query:** SimilarWeb API for 'referral_sources'.
2. **Categorize:** Group by 'Top 5 Referring Domains'.
3. **Insight:** Target these same referrers for your own partnerships.`
  },
  {
    id: 'lead-response-time-tracker',
    category: 'CRM Ops',
    title: "SDR Response Audit",
    tagline: "How fast did we reply?",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Calculates the delta between 'Lead Created' and 'First Activity' in your CRM logs to identify bottlenecks.",
    blueprint: `# Project: Speed-to-Lead Audit

## 1. Logic
1. **Parse:** Load timestamps for creation and first outbound email.
2. **Calculate:** \`response_time = contact_time - lead_time\`.
3. **Report:** Average response time by Rep.`
  },
  {
    id: 'keyword-intent-classifier',
    category: 'SEO',
    title: "Intent Classifier",
    tagline: "Tag 1000 keywords as 'Buy' or 'Learn'.",
    difficulty: 'Advanced',
    time: '30 mins',
    description: "Uses an LLM to categorize keywords into: Informational, Navigational, or Transactional intent.",
    blueprint: `# Project: SEO Intent Engine

## 1. Logic
1. **Batch:** Load keyword list.
2. **Prompt:** "Classify this keyword into [Buy, Compare, Learn, Find]."
3. **Export:** CSV with Intent column for content planning.`
  },
  {
    id: 'automated-screenshot-grid',
    category: 'Content Ops',
    title: "Product Feature Grid",
    tagline: "Generate a UI comparison grid.",
    difficulty: 'Intermediate',
    time: '25 mins',
    description: "Takes screenshots of 5 competitor UI dashboards and assembles them into a single comparison image for your blog.",
    blueprint: `# Project: Visual Matrix Gen

## 1. Logic
1. **Screenshots:** Capture dashboard area of 5 sites.
2. **Stitch:** Use PIL to create a 5-column canvas.
3. **Label:** Add text labels for each brand.`
  },
  {
    id: 'twitter-list-builder',
    category: 'Lead Gen',
    title: "Auto-List Builder",
    tagline: "Follow every 'Top Founder' automatically.",
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Scrapes a list of people from a conference and adds them all to a private Twitter List for monitoring.",
    blueprint: `# Project: Social List Automator

## 1. Logic
1. **Search:** Find Twitter handles for names.
2. **API:** \`tweepy.add_list_member(list_id, handle)\`.
3. **Done:** Immediate monitoring stream.`
  },
  {
    id: 'seo-internal-anchor-audit',
    category: 'SEO',
    title: "Anchor Text Auditor",
    tagline: "Are you over-using 'click here'?",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Crawls your site and extracts every internal link anchor text. Identifies pages with poor SEO anchor diversity.",
    blueprint: `# Project: Anchor Diversity Check

## 1. Logic
1. **Extract:** Find every <a> tag.
2. **Pivot:** Count anchor text strings per target URL.
3. **Flag:** Alert if "click here" is > 10% of total links.`
  },
  {
    id: 'competitor-page-speed-bench',
    category: 'Competitive Intel',
    title: "Speed Benchmark",
    tagline: "Compare your LCP vs Competitors.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Runs a Lighthouse audit on you and 5 competitors. Generates a 'Winner' badge for the fastest site.",
    blueprint: `# Project: Speed Leaderboard

## 1. Logic
1. **Run:** PSI API for list [You, Comp1, Comp2...].
2. **Compare:** Sort by Performance Score.
3. **Report:** "You are 20% slower than Comp1. Action needed."`
  },
  {
    id: 'logo-svg-converter',
    category: 'Content Ops',
    title: "SVG Logo Grabber",
    tagline: "Extract vector logos from sites.",
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Specifically hunts for .svg files in the homepage source to get the highest quality brand assets.",
    blueprint: `# Project: Vector Asset Hunter

## 1. Logic
1. **Search:** Scrape HTML for '.svg' in <img> or <svg> tags.
2. **Filter:** Discard small icons (menu, social).
3. **Save:** Download files to /assets/.`
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