export interface AiTool {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: {
    useCase: string[];
    price: string;
    skill: string;
  };
  image: string;
  dateAdded: string;
  featured?: boolean;
  maker?: {
    name: string;
    image: string;
    role?: string;
    twitter?: string;
  };
  // Enrichment fields
  features?: string[];
  pricingDetails?: string;
  integrations?: string[];
}

export const aiTools: AiTool[] = [
  {
    name: "Vidmix.ai",
    description: "AI video generator that transforms text and images into professional videos using advanced models like Sora 2 and Veo 3.1.",
    url: "https://www.vidmix.ai",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=vidmix.ai&sz=128",
    dateAdded: "2026-03-30",
    features: [
      "Text-to-Video generation using Sora 2 and Veo 3.1 models",
      "Image-to-Video conversion with 98% motion consistency",
      "AI Avatar Generator with photorealistic lip-syncing",
      "Hollywood-grade cinematic effects and auto-soundtracks"
    ],
    pricingDetails: "Starts at $9/month (Basic) to $59/month (Premium)",
    integrations: ["Sora 2", "Veo 3.1", "Kling 2.6", "Flux 2", "Discord"]
},
  {
    name: "Overvisual",
    description: "AI-powered Instagram Story series creator. Upload photos/videos and AI automatically places text, highlights keywords, and suggests interactive layouts.",
    url: "https://www.overvisual.com/",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.overvisual.com&sz=128",
    dateAdded: "2026-03-31",
    maker: {
        name: "Ignas Sinkevičius",
        role: "Indie Maker",
        twitter: "ignassinkevicius",
        image: "https://unavatar.io/twitter/ignassinkevicius"
    },
    features: [
      "Niche Trend Analysis to identify viral content ideas",
      "One-Click creation of 30 days of stories and carousels",
      "Auto-Pilot scheduling and direct social posting",
      "Multi-Language support for 25+ different languages"
    ],
    pricingDetails: "Freemium (Offers 14-day money-back guarantee)",
    integrations: ["Instagram", "LinkedIn"]
},
  {
    name: "ChattyFit",
    description: "AI powered personal trainer in your pocket providing customized workouts and health guidance.",
    url: "https://chatty.fit",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=chatty.fit&sz=128",
    dateAdded: "2026-04-01",
    maker: {
        name: "Vladimir Brejcha",
        role: "iOS Developer",
        twitter: "vladbrejcha",
        image: "https://unavatar.io/twitter/vladbrejcha"
    },
    features: [
      "Equipment-Aware workout customization based on your gear",
      "Real-Time AI Coaching for exercise swaps and form help",
      "Apple HealthKit and Apple Watch native integration",
      "Privacy-First design with secure iCloud synchronization"
    ],
    pricingDetails: "Free to download (Optional paid features)",
    integrations: ["Apple HealthKit", "Apple Watch", "iCloud"]
},
  {
    name: "SlideWhisper",
    description: "AI presentation partner that automates slide narration and facilitates live Q&A, transforming static slides into engaging experiences.",
    url: "https://www.slidewhisper.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.slidewhisper.com&sz=128",
    dateAdded: "2026-04-02",
    maker: {
        name: "Stanislav Sedov",
        role: "Software Engineer",
        twitter: "stanislavsedov",
        image: "https://unavatar.io/twitter/stanislavsedov"
    },
    features: [
      "AI Narration for PDF and Google Slides imports",
      "Interactive Live Q&A answered by AI in real-time",
      "Engagement Analytics to track audience attention spans",
      "Green Room Editor for script and narration refinement"
    ],
    pricingDetails: "Free to start (Premium tiers available)",
    integrations: ["Google Slides", "PDF"]
},
  {
    name: "imejis.io",
    description: "Automated bulk image generation platform for marketers. Create and generate social media images at scale using prebuilt templates and automation.",
    url: "https://www.imejis.io",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.imejis.io&sz=128",
    dateAdded: "2026-04-03",
    maker: {
        name: "Dharmik Jagodana",
        role: "CTO & Maker",
        twitter: "dharmikjagodana",
        image: "https://unavatar.io/twitter/dharmikjagodana"
    },
    features: [
      "API-Driven automation for scalable image generation",
      "No-Code Public Links for form-based image creation",
      "Branded Template Editor with Unsplash integration",
      "Bulk Generation from spreadsheets and data sources"
    ],
    pricingDetails: "Freemium (No credit card required to start)",
    integrations: ["Zapier", "Airtable", "Google Sheets", "Webflow", "Stripe"]
},
  {
    name: "Email Ferret",
    description: "AI personal assistant for Gmail that helps manage, organize, and respond to emails more efficiently.",
    url: "https://emailferret.io",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=emailferret.io&sz=128",
    dateAdded: "2026-03-30",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    },
    features: [
      "AI Cold Outreach Detection using 15+ heuristic signals",
      "Transparent Risk Scoring (0-100%) for flagged emails",
      "Smart Auto-Organization into 10+ folders (Billing, Recruiting, etc.)",
      "Privacy-first: In-memory content analysis with no data storage"
    ],
    pricingDetails: "$5 per mailbox/month (14-day free trial available)",
    integrations: ["Gmail", "Google Workspace"]
},
  {
    name: "AgentGatePay",
    description: "Complete payment infrastructure for autonomous AI agents to facilitate secure, automated transactions.",
    url: "https://www.agentgatepay.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=www.agentgatepay.com&sz=128",
    dateAdded: "2026-03-31",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    },
    features: [
      "Secure payment endpoints for autonomous AI agent transactions",
      "Programmable digital wallets designed for non-human entities",
      "Spending limits and permission-based usage guardrails",
      "Real-time transaction monitoring and auditing for compliance"
    ],
    pricingDetails: "Enterprise Pricing (Contact for details)",
    integrations: ["Stripe", "Ethereum", "OpenAI", "Anthropic", "REST API"]
},
  {
    name: "Hypnotype",
    description: "Kinetic typography engine that synchronizes word-level animations with voice audio for high-retention video storytelling.",
    url: "https://hypnotype.app",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=hypnotype.app&sz=128",
    dateAdded: "2026-04-01",
    maker: {
        name: "Fabien Boco",
        role: "AI Developer",
        twitter: "valtiel",
        image: "https://unavatar.io/twitter/valtiel"
    },
    features: [
      "AI Sync Engine for frame-perfect text-to-audio synchronization",
      "Retention-first 'Premium-Minimalist' video templates",
      "100% cloud-based video production and rendering pipeline",
      "Synchronized visual audio waveforms for voice content"
    ],
    pricingDetails: "$29/mo (Creator) to $80/mo (Pro)",
    integrations: ["YouTube", "TikTok", "Substack", "Spotify"]
},
  {
    name: "Computer Keyboard Shortcuts",
    description: "The ultimate guide to computer keyboard shortcuts and hotkeys for Windows and MacOS productivity.",
    url: "https://computerkeyboardshortcuts.org/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=computerkeyboardshortcuts.org&sz=128",
    dateAdded: "2026-03-23",
    maker: {
        name: "Daniel",
        role: "Indie Maker",
        twitter: "danielba777_",
        image: "https://unavatar.io/twitter/danielba777_"
    },
    features: [
      "Cross-Platform database for Windows, MacOS, and Linux hotkeys",
      "Application-specific mapping for Terminal, IDEs, and Browsers",
      "Downloadable PDF and PNG cheatsheets for offline reference",
      "Searchable responsive index for rapid shortcut lookup"
    ],
    pricingDetails: "Free / Open Access",
    integrations: ["Windows", "MacOS", "Linux", "Chrome", "Firefox"]
},
  {
    name: "Floowed",
    description: "AI-powered credit workflow automation platform that extracts, validates, and enriches application data while flagging risks.",
    url: "https://floowed.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=floowed.com&sz=128",
    dateAdded: "2026-03-24",
    maker: {
        name: "Arunima",
        role: "SaaS Builder",
        twitter: "saasdiff",
        image: "https://unavatar.io/twitter/saasdiff"
    },
    features: [
      "Intelligent Document Processing (IDP) with 99% extraction accuracy",
      "No-code 'AI Flows' for end-to-end document routing and logic",
      "Human-in-the-Loop verification for low-confidence data points",
      "Automated custom business logic and validation rule engine"
    ],
    pricingDetails: "Enterprise (14-day Free Trial available)",
    integrations: ["Salesforce", "HubSpot", "KYC Providers", "REST API"]
},
  {
    name: "StrideFuel",
    description: "AI-powered nutrition and weight loss companion featuring voice logging and adaptive coaching specifically designed for GLP-1 users.",
    url: "https://stride-fuel.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=stride-fuel.com&sz=128",
    dateAdded: "2026-03-25",
    maker: {
        name: "Dave Moggio",
        role: "Full-stack Developer",
        twitter: "davemoggio",
        image: "https://unavatar.io/twitter/davemoggio"
    },
    features: [
      "Multimodal AI Logging via photo, voice, and barcode scanning",
      "Specialized GLP-1 support module for Ozempic/Wegovy users",
      "6 distinct AI trainer personalities for adaptive coaching",
      "Predictive analytics for weight loss velocity and health trends"
    ],
    pricingDetails: "$9.99/mo (Plus) with 7-day free trial",
    integrations: ["Apple Health", "HealthKit", "iOS"]
},
  {
    name: "Oravida AI",
    description: "Transforms career stories into dynamic, AI-powered profiles that highlight work with media and identify skill gaps.",
    url: "https://orav.ai/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=orav.ai&sz=128",
    dateAdded: "2026-03-26",
    maker: {
        name: "Joakim",
        role: "Indie Maker",
        twitter: "Infinity-Joakim-106",
        image: "https://unavatar.io/twitter/Infinity-Joakim-106"
    },
    features: [
      "Resume-to-Profile transformation for interactive pages",
      "AI-Powered skill gap analysis for career growth",
      "Dynamic portfolio hosting for media-rich case studies",
      "Intelligence-driven career suggestions and trends"
    ],
    pricingDetails: "Free to build (Premium tiers available)",
    integrations: ["LinkedIn"]
},
  {
    name: "AIRankPilot",
    description: "Helps local businesses get discovered by search engines and AI tools by suggesting optimized content strategies.",
    url: "https://airankpilot.com",
    category: "SEO",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=airankpilot.com&sz=128",
    dateAdded: "2026-03-27",
    maker: {
        name: "Neel Patel",
        role: "SEO Expert",
        twitter: "neelpatel_seo",
        image: "https://unavatar.io/twitter/neelpatel_seo"
    },
    features: [
      "AI Visibility Audit for ChatGPT and Perplexity",
      "Automated Local SEO content strategy and generation",
      "Google Business Profile (GBP) post automation",
      "LASI Score monitoring for AI search index performance"
    ],
    pricingDetails: "$49/mo (Basic) to $199/mo (Pro)",
    integrations: ["WordPress", "Google Business Profile"]
},
  {
    name: "BookSwift",
    description: "Simplified appointment scheduling platform for independent service providers and small teams to manage bookings.",
    url: "https://www.bookswift.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.bookswift.app&sz=128",
    dateAdded: "2026-03-28",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    },
    features: [
      "AI Voice Assistant for 24/7 reception and booking",
      "Multi-channel automation (Phone, SMS, WhatsApp)",
      "Smart IVR call routing for professional triage",
      "Automated follow-ups and confirmation reminders"
    ],
    pricingDetails: "Starts at $39/mo (14-day Free Trial)",
    integrations: ["Google Calendar", "WhatsApp", "SMS"]
},
  {
    name: "SlidesCockpit",
    description: "AI tool to clone viral TikTok content for your product and automate posting across platforms.",
    url: "https://slidescockpit.com/",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=slidescockpit.com&sz=128",
    dateAdded: "2026-03-29",
    maker: {
        name: "Daniel",
        role: "App Builder",
        twitter: "danielba777_",
        image: "https://unavatar.io/twitter/danielba777_"
    },
    features: [
      "Viral Content Cloning for TikTok slideshow formats",
      "AI-powered intelligent remixing of visuals and CTAs",
      "Automated multi-account posting and scheduling",
      "Built-in hooks and captions optimized for app growth"
    ],
    pricingDetails: "$19/mo (Starter) to $129/mo (Pro)",
    integrations: ["TikTok", "Chrome Extension"]
},
  {
    name: "3dSynth.app",
    description: "A browser-based tool that simplifies the 3D printing workflow by skipping complex STL/Slicer steps.",
    url: "https://3dSynth.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=3dSynth.app&sz=128",
    dateAdded: "2026-03-30",
    maker: {
        name: "Nic Polotnianko",
        role: "Indie Hacker",
        twitter: "nikpolale",
        image: "https://unavatar.io/twitter/nikpolale"
    },
    features: [
      "Procedural Toolpath Engine for direct G-code generation",
      "SynthBlocks node-based visual logic environment",
      "31+ Procedural modifiers (Fractals, Noise, Ripples)",
      "Real-time G-code visualization and Monaco editor sync"
    ],
    pricingDetails: "Free in-browser (Desktop commercial: $39 one-time)",
    integrations: ["Bambu Lab", "Prusa", "Creality", "Voron"]
},
  {
    name: "Crypto News Navigator",
    description: "Trusted source for real-time crypto prices, market data, and trending blockchain news.",
    url: "https://www.cryptonewsnavigator.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.cryptonewsnavigator.com&sz=128",
    dateAdded: "2026-03-24",
    maker: {
        name: "Katerina Kulikovska",
        role: "Crypto Analyst",
        twitter: "katerinakulikovska",
        image: "https://unavatar.io/twitter/katerinakulikovska"
    },
    features: [
      "Real-time prices and data for 19,000+ cryptocurrencies",
      "Automated news sentiment analysis (Bullish/Bearish)",
      "Fear & Greed Index and Altcoin Season tracking",
      "Crypto Academy for DeFi and blockchain onboarding"
    ],
    pricingDetails: "Free (Ad-supported intelligence hub)",
    integrations: ["Exchange APIs", "50+ News RSS feeds"]
},
  {
    name: "Suburb Stack",
    description: "Landing page builder for service businesses that launches locally targeted, conversion-optimized pages for SEO dominance.",
    url: "https://suburbstack.com/",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=suburbstack.com&sz=128",
    dateAdded: "2026-03-25",
    maker: {
        name: "Nic Polotnianko",
        role: "Indie Hacker",
        twitter: "nikpolale",
        image: "https://unavatar.io/twitter/nikpolale"
    },
    features: [
      "Programmatic SEO for thousands of location-specific pages",
      "Google Local Ads optimization for higher Quality Scores",
      "No-code drag-and-drop builder for mobile-responsive layouts",
      "Multi-client performance tracking for SEO agencies"
    ],
    pricingDetails: "Starts at $119/mo (14-day Free Trial)",
    integrations: ["Google Ads", "GSC", "Facebook", "Instagram"]
},
  {
    name: "Sequenzy",
    description: "Email marketing tool for SaaS that uses AI to build email infrastructures, generate templates, and create copy.",
    url: "https://sequenzy.com",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=sequenzy.com&sz=128",
    dateAdded: "2026-03-26",
    maker: {
        name: "Nic Polotnianko",
        role: "Indie Hacker",
        twitter: "nikpolale",
        image: "https://unavatar.io/twitter/nikpolale"
    },
    features: [
      "AI Sequence Builder from natural language prompts",
      "Billing-event triggers (Stripe/Paddle failed payments)",
      "Developer-first infrastructure with REST API and SDKs",
      "Revenue attribution analytics powered by ClickHouse"
    ],
    pricingDetails: "Free (up to 2,500 emails/mo) | Paid from $19/mo",
    integrations: ["Stripe", "Paddle", "Zapier", "Claude", "Cursor"]
},
  {
    name: "Markeplay",
    description: "No-code AI platform for manufacturing companies to build complex, customizable B2B e-commerce solutions and automated workflows.",
    url: "https://www.markeplay.com",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=www.markeplay.com&sz=128",
    dateAdded: "2026-03-27",
    maker: {
        name: "Nic Polotnianko",
        role: "Indie Hacker",
        twitter: "nikpolale",
        image: "https://unavatar.io/twitter/nikpolale"
    },
    features: [
      "Multi-channel content engine for brand-voice ad copy",
      "Predictive analytics for optimal posting engagement",
      "Automated asset creation for marketing visuals",
      "Customizable B2B e-commerce solution for manufacturing"
    ],
    pricingDetails: "Starts from $29/mo (Tiered subscriptions)",
    integrations: ["Shopify", "WordPress", "Instagram", "LinkedIn"]
},
  {
    name: "Qeeebo",
    description: "AI-curated question-and-answer platform built to organize and scale global knowledge.",
    url: "https://www.qeeebo.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.qeeebo.com&sz=128",
    dateAdded: "2026-03-16",
    maker: {
        name: "Nic Polotnianko",
        role: "Indie Hacker",
        twitter: "nikpolale",
        image: "https://unavatar.io/twitter/nikpolale"
    },
    features: [
      "Intelligent task automation using natural language",
      "Smart document processing for invoices and receipts",
      "Custom no-code workflow builder for cross-app logic",
      "Automated knowledge base organization and scaling"
    ],
    pricingDetails: "Starts from $49/mo (Pay-as-you-go available)",
    integrations: ["Slack", "Salesforce", "Google Workspace", "HubSpot"]
},
  {
    name: "feynn - Strategic Intelligence Platform",
    description: "Structured strategic intelligence platform powered by AI for market research and competitive analysis.",
    url: "https://feynn.ai",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=feynn.ai&sz=128",
    dateAdded: "2026-03-17",
    maker: {
        name: "Nic Polotnianko",
        role: "Indie Hacker",
        twitter: "nikpolale",
        image: "https://unavatar.io/twitter/nikpolale"
    },
    features: [
      "Multi-Agent research with automated source verification",
      "Strategic Posture mapping across innovation domains",
      "Innovation Horizon tracking for disruptive tech shifts",
      "Scenario simulation to model competitive trade-offs"
    ],
    pricingDetails: "Token-based Pricing (Standard & Enterprise plans)",
    integrations: ["Market Data APIs", "RSS Feeds"]
},
  {
    name: "AI Thumbnail",
    description: "AI tool to create clickable YouTube thumbnails by analyzing successful designs and adapting them for your content.",
    url: "https://aithumbnail.gg",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=aithumbnail.gg&sz=128",
    dateAdded: "2026-03-18",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    },
    features: [
      "AI Thumbnail generator with MRR/CTR style replication",
      "Multi-device preview and potential CTR performance audit",
      "Built-in creator toolkit with font AI and emoji titles",
      "Automated SEO tag and description generation for YouTube"
    ],
    pricingDetails: "Free (2/wk) | Starter (~$12.90/mo) | Premium (~$29.90/mo)",
    integrations: ["YouTube", "Chrome Extension"]
},
  {
    name: "AyeWatch AI",
    description: "Personal AI Internet Monitor that tracks relevant web content and delivers updates directly to you.",
    url: "https://ayewatch.ai/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=ayewatch.ai&sz=128",
    dateAdded: "2026-03-19",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    },
    features: [
      "SOUL Watcher AI multi-agent filtering system",
      "24/7 autonomous monitoring for topics and keywords",
      "Automated AI summaries to skip reading full articles",
      "Real-time push notifications on iOS, Android, and Web"
    ],
    pricingDetails: "Free (3 topics) | Pro ($9/mo) | Pro+ ($19/mo)",
    integrations: ["iOS", "Android", "Web"]
},
  {
    name: "PentestMate",
    description: "Autonomous pentesting agents that test your applications and deliver detailed, fix-ready security reports.",
    url: "https://pentestmate.com/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Paid",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=pentestmate.com&sz=128",
    dateAdded: "2026-03-20",
    maker: {
        name: "Aditya Sharma",
        role: "Security Expert",
        twitter: "adityasharmasec",
        image: "https://unavatar.io/twitter/adityasharmasec"
    },
    features: [
      "Autopilot Red Team for continuous 24/7 security scanning",
      "Automatic issue integration with GitHub and Jira",
      "Detects IDOR injections and exposed cloud endpoints",
      "Fix-ready reports with actionable remediation steps"
    ],
    pricingDetails: "Trial ($1 for 3 days) | All-in-One ($59/mo)",
    integrations: ["GitHub", "Jira", "Vercel", "AWS"]
},
  {
    name: "Bolta",
    description: "Social media operating system that helps teams plan, write, and publish content across multiple channels using AI.",
    url: "https://bolta.ai/",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=bolta.ai&sz=128",
    dateAdded: "2026-03-21",
    maker: {
        name: "Max",
        role: "Product Builder",
        twitter: "bolta_ai",
        image: "https://unavatar.io/twitter/bolta_ai"
    },
    features: [
      "AI Reply generator for context-aware DM and comment replies",
      "Agentic scheduling for autonomous content management",
      "Brand Voice builder for authentic caption generation",
      "Native support for Instagram, Threads, and X"
    ],
    pricingDetails: "Explorer (~$8/mo) | Premium (~$29/mo) | 14-day Free Trial",
    integrations: ["Instagram", "Threads", "LinkedIn", "Twitter/X"]
},
  {
    name: "Sana Mujer",
    description: "Spanish-first telehealth clinic providing specialized women's health services for the Spanish-speaking community in the US.",
    url: "https://www.sanamujer.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.sanamujer.com&sz=128",
    dateAdded: "2026-03-22",
    maker: {
        name: "Damián Capdevila",
        role: "Founder",
        twitter: "damiancap",
        image: "https://unavatar.io/twitter/damiancap"
    }
},
  {
    name: "Beatable",
    description: "Business validation platform providing competitor analysis and market intelligence to assess risks and opportunities.",
    url: "https://beatable.co",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=beatable.co&sz=128",
    dateAdded: "2026-03-16"
},
  {
    name: "Map Your Voyage",
    description: "AI-powered travel planner that transforms Instagram reels and social content into actionable trip itineraries.",
    url: "https://mapyourvoyage.com/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=mapyourvoyage.com&sz=128",
    dateAdded: "2026-03-17",
    maker: {
        name: "Anuj J.",
        role: "Indie Maker",
        twitter: "pameeks96",
        image: "https://unavatar.io/twitter/pameeks96"
    }
},
  {
    name: "AyeCreate",
    description: "Screenshot API that helps businesses capture, combine, and automate website screenshots for marketing and monitoring.",
    url: "https://ayecreate.ai/",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=ayecreate.ai&sz=128",
    dateAdded: "2026-03-18",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    }
},
  {
    name: "Nicegram",
    description: "Privacy-focused Telegram client featuring a built-in AI assistant, multichain wallet, and agent marketplace.",
    url: "https://nicegram.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=nicegram.app&sz=128",
    dateAdded: "2026-03-19",
    maker: {
        name: "Sergey Sheleg",
        role: "CPO",
        twitter: "sergeysheleg",
        image: "https://unavatar.io/twitter/sergeysheleg"
    }
},
  {
    name: "LocalBiz",
    description: "AI-powered platform that helps service businesses grow local SEO by generating location-focused blog content.",
    url: "https://www.localbiz.ai",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.localbiz.ai&sz=128",
    dateAdded: "2026-03-20",
    maker: {
        name: "Abhi Dwivedi",
        role: "Software Creator",
        twitter: "abhidwivedi",
        image: "https://unavatar.io/twitter/abhidwivedi"
    }
},
  {
    name: "Argus AI",
    description: "Real-time safety alert app for truck drivers that uses AI to detect crashes and slowdowns via existing DOT cameras.",
    url: "https://www.getargus.ai",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.getargus.ai&sz=128",
    dateAdded: "2026-03-21"
},
  {
    name: "POPJAM",
    description: "Agentic marketing suite that simulates audience segments to generate and test highly personalized ad creatives and copy.",
    url: "https://popjam.io",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=popjam.io&sz=128",
    dateAdded: "2026-03-22"
},
  {
    name: "Tekadio",
    description: "AI platform for teachers that automates test creation and grading, including semantic evaluation of open-ended answers.",
    url: "https://tekadio.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=tekadio.app&sz=128",
    dateAdded: "2026-03-16",
    maker: {
        name: "Andreas Binder",
        role: "Founder",
        twitter: "andreas_binder",
        image: "https://unavatar.io/twitter/andreas_binder"
    }
},
  {
    name: "Invoplex",
    description: "Invoplex is an invoicing tool for freelancers, creators and service-based businesses to create quotes, send invoices, track payments, and manage clients without the bloated accounting software.",
    url: "https://invoplex.com/",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=invoplex.com&sz=128",
    dateAdded: "2026-03-09"
},
  {
    name: "Docutracker",
    description: "Docutracker lets you see when and how people read your documents, providing real-time engagement analytics to optimize follow-ups. Docutracker lets you see when and how people read your documents, providing real-time engagement analytics to optimize follow-ups.",
    url: "https://docutracker.io",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=docutracker.io&sz=128",
    dateAdded: "2026-03-10",
    maker: {
        name: "Mohamed Ibrahim",
        role: "Maker",
        twitter: "mo_ibrahim",
        image: "https://unavatar.io/twitter/mo_ibrahim"
    }
},
  {
    name: "Time",
    description: "Time is a native macOS menu bar app for managing time zones and calendar events. Track unlimited zones, see when teammates are awake, and join meetings with one click.",
    url: "https://menubartime.com",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=menubartime.com&sz=128",
    dateAdded: "2026-03-11"
},
  {
    name: "CleanMark",
    description: "Dual Functionality: - Remove text watermarks from NotebookLM PDFs (bottom-right corner) - Remove watermarks from Gemini AI-generated images. Advanced Technology: - Powered by OpenCV inpainting algorithms for seamless removal - Directly processes embedded PDF images to maintain resolution - Smart watermark detection that works on both light and dark backgrounds - Supports large files up to 100MB. User-Friendly Experience: - One-click upload and process - Preview results before downloading - No software installation required - Batch processing support - Fast processing (typically under 30 seconds)",
    url: "https://geminiwatermarkremover.net/",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=geminiwatermarkremover.net&sz=128",
    dateAdded: "2026-03-12"
},
  {
    name: "ArchRender",
    description: "Photorealistic AI Rendering for Architects & Designers",
    url: "https://www.archrender.ai/",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.archrender.ai&sz=128",
    dateAdded: "2026-03-13"
},
  {
    name: "ModulEdge",
    description: "ModulEdge is a tech-driven manufacturer of modular data centers that bridges the gap between high-load AI hardware and legacy enterprise IT infrastructure. By combining advanced hybrid cooling with specialized environmental hardening, we enable the rapid deployment of on-prem AI modular data centers, general compute clusters, and secure data backups. Unlike traditional construction, every ModulEdge system is factory-integrated and delivered in just 3-6 months, providing a plug-and-play solution for sites with power, cooling, or site constraints.",
    url: "https://www.moduledge.com/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.moduledge.com&sz=128",
    dateAdded: "2026-03-14"
},
  {
    name: "Tech Twitter",
    description: "Finding signal on X is more difficult than it used to be on Twitter. We curate the best tweets on topics like AI, startups, and product development every weekday at 10 AM EST so you can focus on what matters.",
    url: "https://www.techtwitter.com",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.techtwitter.com&sz=128",
    dateAdded: "2026-03-15"
},
  {
    name: "Bank PDF Converter",
    description: "The most accurate bank statement converter. Convert PDF to Excel and CSV with automatic transaction validation—works with any bank, any language.",
    url: "https://bankpdfconverter.com/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=bankpdfconverter.com&sz=128",
    dateAdded: "2026-03-09"
},
  {
    name: "Squared Away",
    description: "We've all been there. You're standing in your garage, staring at a wall of boxes, trying to remember which one has the camping gear. Or you're at the hardware store, wondering if you already own a 10mm socket set buried somewhere in your basement. The mental inventory we try to keep of our belongings inevitably fails us, and we end up wasting hours searching or buying things we already own.  Squared Away is an AI-powered home inventory app that solves this problem by making it effortless to catalog everything you own. The magic is in the simplicity: just snap a photo of an item, and the app's AI does the rest. It automatically identifies what you're looking at, suggests an accurate name, assigns the right category, and generates relevant tags—all in seconds. What used to require tedious manual data entry now happens with a single tap of your camera.",
    url: "https://squaredaway.ai",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=squaredaway.ai&sz=128",
    dateAdded: "2026-03-10"
},
  {
    name: "logostream",
    description: "Company logos & icons for modern travel and finance apps.",
    url: "https://logostream.dev",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=logostream.dev&sz=128",
    dateAdded: "2026-03-11"
},
  {
    name: "Archivist",
    description: "Turn AI-generated chaos into organized deliverables. Custom naming presets, smart collections, and bulk ZIP exports for all who've lost track of files.",
    url: "https://getarchivist.org/",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=getarchivist.org&sz=128",
    dateAdded: "2026-03-12"
},
  {
    name: "Bitvoiper",
    description: "Browser-based calling with Username Proxy system and Comprehensive Call Center Features",
    url: "https://bitvoiper.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=bitvoiper.com&sz=128",
    dateAdded: "2026-03-13"
},
  {
    name: "vitelnk",
    description: "Secure Video Sharing Built for Professionals",
    url: "https://vitelnk.com/",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=vitelnk.com&sz=128",
    dateAdded: "2026-03-14"
},
  {
    name: "Roomika",
    description: "Roomika is an AI-powered interior design and virtual staging platform that helps you redesign any room using a photo of your real space. Instead of starting from scratch with mood boards or generic inspiration images, Roomika lets you upload a room photo and instantly generate realistic design concepts that preserve the layout and architecture of your room — while transforming the style, furniture, and overall vibe.  Whether you’re decorating a new home, refreshing a living room, remodeling a kitchen, or trying to make a bedroom feel more modern and comfortable, Roomika makes it easy to explore professional-quality options in minutes. You can choose from a wide range of popular interior styles, from modern and contemporary to minimalist, Scandinavian, Japanese, rustic, and more. Each design is generated with a focus on photorealism so the results look believable, not cartoonish — and you can generate multiple variations to compare different looks side-by-side.  Roomika is also a powerful tool for real estate professionals, Airbnb hosts, and property managers who need high-quality staging visuals fast. With Roomika’s virtual staging features, you can furnish empty rooms, redesign outdated spaces, and create polished “after” images that help buyers and renters imagine the potential of a property. This is especially useful when you want to test design directions without spending money on physical staging, renovations, or expensive design software.  A key advantage of Roomika is its flexibility. You can upload your own inspiration images, describe the changes you want in plain English, and fine-tune designs until they match your taste. Want a brighter color palette? Different flooring? More modern furniture? A cozier aesthetic? Roomika makes it easy to iterate and explore. In addition to still images, Roomika can also generate short design videos that bring the transformation to life — perfect for sharing on social media, listing pages, or with friends and family.  Roomika is built for anyone who wants to design their space with confidence, without needing design experience. It’s fast, simple, and fun to use, while still producing results that feel like something an interior designer might deliver. If you want to quickly visualize design ideas, experiment with styles, or stage a home for sale or rent, Roomika turns your room photo into beautiful, realistic design concepts in just a few clicks.",
    url: "https://www.roomika.ai",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.roomika.ai&sz=128",
    dateAdded: "2026-03-15"
},
  {
    name: "Multic - Multiplayer Comics",
    description: "GenAI Game Engine for Multiplayer Experiences",
    url: "https://www.multic.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.multic.com&sz=128",
    dateAdded: "2026-03-09"
},
  {
    name: "Thrive",
    description: "Master your portfolio. Maximize your potential. Crypto Market Intelligence for Traders.",
    url: "https://thrive.fi/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=thrive.fi&sz=128",
    dateAdded: "2026-03-02"
},
  {
    name: "PressBeat",
    description: "AI-native PR agency. Get quoted in organic press on autopilot. 1 article guaranteed per month.",
    url: "https://pressbeat.io",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=pressbeat.io&sz=128",
    dateAdded: "2026-03-03"
},
  {
    name: "SimpleSeverance",
    description: "Educational platform for severance",
    url: "https://simpleseverance.co",
    category: "Productivity",
    tags: {
      useCase: ["Personal"],
      price: "Free",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=simpleseverance.co&sz=128",
    dateAdded: "2026-03-04"
  },
  {
    name: "CookieGuard",
    description: "CookieGuard is a free GDPR & CCPA cookie consent tool that helps websites manage cookie banners and user consent with minimal setup.",
    url: "https://cookieguard.co",
    category: "Code Assistance",
    tags: {
      useCase: ["Business"],
      price: "Free",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=cookieguard.co&sz=128",
    dateAdded: "2026-03-05"
  },
  {
    name: "sHabits",
    description: "Minimalist UI focused on building good habits first. Visual tracking, smart reminders, and neat home screen widgets keep you committed.",
    url: "https://simplyhabits.io/",
    category: "Productivity",
    tags: {
      useCase: ["Personal"],
      price: "Free",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=simplyhabits.io&sz=128",
    dateAdded: "2026-03-06"
  },
  {
    name: "DiffScout",
    description: "AI-powered price monitoring that tracks competitor prices on any website. Get instant alerts when prices change—no scrapers or CSS selectors needed.",
    url: "https://diffscout.com",
    category: "Marketing",
    tags: {
      useCase: ["Business"],
      price: "Freemium",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=diffscout.com&sz=128",
    dateAdded: "2026-03-07"
  },
  {
    name: "Test-Lab.ai",
    description: "Automated QA with AI agents. Find critical UX & flow bugs before launch.",
    url: "https://www.test-lab.ai/",
    category: "Code Assistance",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Advanced"
    },
    image: "https://www.google.com/s2/favicons?domain=www.test-lab.ai&sz=128",
    dateAdded: "2026-03-08"
  },
  {
    name: "SaaS Blueprint",
    description: "Ship faster with a production-ready SaaS blueprint that includes auth, Stripe, protected routes, docs, and Cloudflare deployment out of the box.",
    url: "https://saasblueprint.app",
    category: "Code Assistance",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Advanced"
    },
    image: "https://www.google.com/s2/favicons?domain=saasblueprint.app&sz=128",
    dateAdded: "2026-03-02",
    maker: {
        name: "Mihai Sandu",
        role: "Software Developer",
        twitter: "mihais77",
        image: "https://unavatar.io/twitter/mihais77"
    }
  },
  {
    name: "Bangas",
    description: "Prompt-free AI ads | Creative OS for performance marketers",
    url: "https://bangas.ai",
    category: "Marketing",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=bangas.ai&sz=128",
    dateAdded: "2026-03-03"
  },
  {
    name: "ShortsAi",
    description: "Short AI Video Generator, from UGC Ads to YouTube Shorts",
    url: "https://shortsai.com",
    category: "Video & Audio",
    tags: {
      useCase: ["Creative"],
      price: "Freemium",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=shortsai.com&sz=128",
    dateAdded: "2026-03-04",
    maker: {
        name: "Marko Denic",
        role: "Developer",
        twitter: "denicmarko",
        image: "https://unavatar.io/twitter/denicmarko"
    }
  },
  {
    name: "LinkedGrow",
    description: "AI-powered LinkedIn content creation tool designed to generate high-converting posts and boost professional engagement.",
    url: "https://linkedgrow.ai/beta",
    category: "Marketing",
    tags: {
      useCase: ["Business"],
      price: "Freemium",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=linkedgrow.ai&sz=128",
    dateAdded: "2026-03-05",
    maker: {
        name: "Ambika Sarawgi",
        role: "Founder",
        twitter: "ambika_sarawgi",
        image: "https://unavatar.io/twitter/ambika_sarawgi"
    }
  },
  {
    name: "Credops",
    description: "Monitors credential expiry timelines for production environments, tracking metadata and dates without requiring secret values.",
    url: "https://www.credops.io/",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Free",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=www.credops.io&sz=128",
    dateAdded: "2026-03-06",
    maker: {
        name: "Prasada Prabhu",
        role: "Founder",
        twitter: "prasadaprabhu_",
        image: "https://unavatar.io/twitter/prasadaprabhu_"
    }
  },
  {
    name: "Podcept",
    description: "AI-driven platform to find perfect guests for your show or get booked on top-tier podcasts to grow your reach.",
    url: "https://www.podcept.com",
    category: "Marketing",
    tags: {
      useCase: ["Business"],
      price: "Freemium",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.podcept.com&sz=128",
    dateAdded: "2026-03-07"
  },
  {
    name: "Roomstage AI",
    description: "AI virtual staging for real estate that transforms empty room photos into beautifully staged spaces in 30 seconds.",
    url: "https://roomstage.ai",
    category: "Image Generation",
    tags: {
      useCase: ["Business"],
      price: "Freemium",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=roomstage.ai&sz=128",
    dateAdded: "2026-03-08"
  },
  {
    name: "Murmur",
    description: "Private, offline speech-to-text dictation for Windows powered by OpenAI Whisper for high-security environments.",
    url: "https://murmurvt.com",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=murmurvt.com&sz=128",
    dateAdded: "2026-03-09",
    maker: {
        name: "Chase Adams",
        role: "Founder",
        twitter: "chaseadamsio",
        image: "https://unavatar.io/twitter/chaseadamsio"
    }
  },
  {
    name: "Tails, Co.",
    description: "AI-powered matching service that finds the right dog walkers and sitters based on proven success in specific pet scenarios.",
    url: "https://trytails.com/",
    category: "Productivity",
    tags: {
      useCase: ["Personal"],
      price: "Free",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=trytails.com&sz=128",
    dateAdded: "2026-02-23"
  },
  {
    name: "NeonChainX",
    description: "High-speed options trading platform with direct Interactive Brokers integration for real-time execution and simplicity.",
    url: "https://neonchainx.com/",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Advanced"
    },
    image: "https://www.google.com/s2/favicons?domain=neonchainx.com&sz=128",
    dateAdded: "2026-02-24",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
  },
  {
    name: "Roampads",
    description: "Curated apartment search for digital nomads featuring verified WiFi and dedicated workspace setups for remote work.",
    url: "https://www.roampads.com/",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Free",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.roampads.com&sz=128",
    dateAdded: "2026-02-25",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
  },
  {
    name: "Flowly Indicators",
    description: "Orderflow indicators for TradingView to spot whale activity, liquidity pools, and unusual volume with backtesting support.",
    url: "https://www.flowly.tools/",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Advanced"
    },
    image: "https://www.google.com/s2/favicons?domain=www.flowly.tools&sz=128",
    dateAdded: "2026-02-26"
  },
  {
    name: "TRYremote",
    description: "Remote tech job board that allows searching by specific tech stacks and organizing listings by global regions.",
    url: "https://tryremote.com",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Free",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=tryremote.com&sz=128",
    dateAdded: "2026-02-27"
  },
  {
    name: "Userjam",
    description: "AI platform that transforms real-time user activity into actionable narratives rather than static dashboards.",
    url: "https://userjam.com",
    category: "Marketing",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=userjam.com&sz=128",
    dateAdded: "2026-02-28"
  },
  {
    name: "MedShotsAI",
    description: "AI-powered professional headshots and marketing imagery specifically tailored for medical professionals.",
    url: "https://medshotsai.com",
    category: "Image Generation",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=medshotsai.com&sz=128",
    dateAdded: "2026-02-23"
  },
  {
    name: "Mixels.ai",
    description: "Free AI pixel art generator and pixel art editor — convert photos to pixel art, generate game-ready characters, items, and backgrounds with perfect grid alignment. Sign up and get 5 free credits instantly.",
    url: "https://mixels.ai/",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=mixels.ai&sz=128",
    dateAdded: "2026-02-24",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
},
  {
    name: "EmailVerify.ai",
    description: "Verify emails in real-time with 99.9% accuracy.",
    url: "https://emailverify.ai",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=emailverify.ai&sz=128",
    dateAdded: "2026-02-25"
},
  {
    name: "Stageflow.ai",
    description: "Stageflow: AI-Powered Product Photography for Online Sellers Creating product photos for online marketplaces is one of those tasks that sits in an awkward middle ground. Professional photography shoots are expensive—often hundreds of dollars per session. DIY photography with your phone can work, but it's time-consuming and the results are inconsistent. For sellers managing multiple products or frequent launches, neither option scales well. Stageflow is a tool that uses AI to generate product lifestyle photos. You upload your product design (a logo, packaging artwork, or product image), select a scene style, and the system generates photorealistic images placing your product in various settings. The platform lets you choose the environment type (studio setup, lifestyle scene, outdoor setting, or minimalist composition) and framing angle (full shot, hero angle, close-up, or flatlay). You can also provide reference images to define the aesthetic style you're looking for—color palettes, lighting moods, textures, and overall visual direction. After selecting these parameters, you describe your vision in a text prompt. The AI combines your inputs with its trained understanding of professional product photography to generate images. All outputs are automatically upscaled to meet marketplace requirements—typically 2000+ pixels for platforms like Etsy. The editing system lets you refine images iteratively. If the first generation isn't quite right, you can give new instructions: adjust the lighting, change the background material, shift the composition. You can also upload a new design variant to see it in the same scene. Selection tools let you isolate specific areas of an image for targeted edits—useful when you want to change just the background or adjust only part of the composition. There's an undo history if you want to revert changes. Generated images can be downloaded in standard resolution or upscaled to HD quality using 4k enhancement. You can organize your work in projects, keeping related product photos grouped together. The interface shows you all your generated variations in one place, making it easy to compare different approaches and choose the shots that work best for your listings. The platform is built for Etsy sellers, Shopify store owners, print-on-demand creators, and anyone else who needs product mockups regularly but doesn't",
    url: "https://Stageflow.ai",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=Stageflow.ai&sz=128",
    dateAdded: "2026-02-26"
},
  {
    name: "Oneprofile",
    description: "Sync customer profiles and events between tools",
    url: "https://getoneprofile.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=getoneprofile.com&sz=128",
    dateAdded: "2026-02-27",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
},
  {
    name: "XIMA DIGITAL",
    description: "PDFSeek is an AI-powered platform that enables users to chat with PDFs, generate summaries, search content, and translate documents across multiple languages.",
    url: "https://www.pdfseek.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.pdfseek.com&sz=128",
    dateAdded: "2026-02-28"
},
  {
    name: "Eleidon",
    description: "Secure external messaging. The inbox that can't be phished.",
    url: "https://eleidon.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=eleidon.com&sz=128",
    dateAdded: "2026-02-23"
},
  {
    name: "ChampSignal",
    description: "ChampSignal tracks your competitors 24/7 across websites, news, Reddit, ads, and SEO. When something important changes, you know the same day.  Most alerts are noise. ChampSignal uses AI to filter them so you only get notified when it actually matters. A price drop. A new feature launch. A shift in messaging. A Reddit thread gaining traction.  Set up in under two minutes. Enter your website and we find your competitors for you. You get your first insights right away.  What you get:  Website changes like pricing, features, and messaging. News and Reddit mentions. Google and Meta ad tracking. SEO rankings and backlinks. Email and Slack alerts on your schedule.  Need deeper analysis? Ask Champ, your AI competitive intelligence analyst. It knows everything we've tracked and gives you instant answers, battlecards, trend analysis, and positioning advice. No manual research needed.  A competitive intelligence analyst costs $80K+ a year. ChampSignal gives you the same coverage at a fraction of the cost. Try it free for 14 days.",
    url: "https://champsignal.com",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=champsignal.com&sz=128",
    dateAdded: "2026-02-24"
},
  {
    name: "GreatCompany.ai",
    description: "Track and optimize visibility in ChatGPT, Gemini and other AI Search engines to drive traffic to your website that converts.",
    url: "https://GreatCompany.ai",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=GreatCompany.ai&sz=128",
    dateAdded: "2026-02-25",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
},
  {
    name: "Reply Champion",
    description: "Reply Champion is an automated Google review management tool built for small business owners who don't have time to respond to every review manually. Google reviews pile up. Customers expect replies. But between running your business and everything else on your plate, responding ...",
    url: "https://www.replychampion.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "/screenshots/reply-champion.png",
    dateAdded: "2026-02-16",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
},
  {
    name: "Encamera",
    description: "Encamera is the world's first truly encrypted camera app designed for those who understand that some moments are meant to stay private. Our mission is to give you complete control over your photos and videos with military-grade security that even we or Apple can't access. Store y...",
    url: "https://encamera.app",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "/screenshots/encamera.png",
    dateAdded: "2026-02-17",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
},
  {
    name: "Resideline",
    description: "Resideline is an AI powered real estate analysis platform that helps investors quickly identify profitable residential opportunities. Using advanced AVMs, automated valuation models, Resideline estimates after repair value, market rent, and deal level returns so you can underwrit...",
    url: "https://Resideline.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "/screenshots/resideline.png",
    dateAdded: "2026-02-18"
},
  {
    name: "Applytrackr",
    description: "ApplyTrackr is an all-in-one AI-powered job search management platform built to help job seekers stay organized, competitive, and confident throughout their job hunt. Searching for a job today is fragmented and overwhelming - candidates juggle spreadsheets, multiple resume versio...",
    url: "https://www.applytrackr.com/",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "/screenshots/applytrackr.png",
    dateAdded: "2026-02-19",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    }
},
  {
    name: "LINO",
    description: "LINO is a missed call recovery platform built for local service businesses plumbers, HVAC technicians, electricians, salons, dental practices, and other appointment-based businesses that lose revenue every time a call goes unanswered. Here's the problem: when a potential customer...",
    url: "https://uselino.com/",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "/screenshots/lino.png",
    dateAdded: "2026-02-20"
},
  {
    name: "HighReach",
    description: "HighReach helps you create video ads and social content with AI in seconds. Paste your product link generate multiple ready-to-use video and image ads without cameras, editors, or agencies. Built for founders, marketers, and small teams who want to test more creatives faster and ...",
    url: "https://highreach.ai",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "/screenshots/highreach.png",
    dateAdded: "2026-02-21"
},
  {
    name: "Ayudo",
    description: "AI-native customer support platform that automates customer queries, resolutions, and follow-ups using a built-in workforce of AI agents.",
    url: "https://www.ayudo.ai",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "/screenshots/ayudo.png",
    dateAdded: "2026-02-22"
},
  {
    name: "LinkPilot",
    description: "AI-powered LinkedIn growth platform that assists with strategy, analysis, and execution. It helps generate viral content, analyze competitors, and schedule posts.",
    url: "https://link-pilot.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "/screenshots/linkpilot.png",
    dateAdded: "2026-02-16"
},
  {
    name: "Stick Audio",
    description: "AI Text-to-Speech Generator that allows users to convert text into natural-sounding speech using AI-powered voices, with features like voice cloning and API access.",
    url: "https://stick.audio",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "/screenshots/stick-audio.png",
    dateAdded: "2026-02-17"
},
  {
    name: "DensOps",
    description: "A modern prospecting and go-to-market platform designed for businesses that sell to brick-and-mortar locations, helping users build local business lists with pinpoint accuracy.",
    url: "https://densops.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "/screenshots/densops.png",
    dateAdded: "2026-02-18"
},
  {
    name: "PNGtoSTL",
    description: "A free online converter that turns 2D PNG images into 3D-printable STL files. Upload your image, and the tool automatically generates a 3D model suitable for printing.",
    url: "https://pngtostl.xyz",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "/screenshots/pngtostl.png",
    dateAdded: "2026-02-19"
},
{
    name: "Octopost.ai",
    description: "AI-powered social media scheduling platform that centralizes workflows across Facebook, Instagram, LinkedIn, TikTok, and YouTube. It simplifies content distribution for creators and startups with a focused, intuitive dashboard.",
    url: "https://octopost.ai",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=octopost.ai&sz=128",
    dateAdded: "2026-02-20"
},
{
    name: "Bridgecall",
    description: "Real-time voice translation tool that enables multilingual calls through a simple browser link. Each participant speaks naturally and hears translated speech instantly, facilitating seamless cross-border communication.",
    url: "https://bridgecall.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=bridgecall.app&sz=128",
    dateAdded: "2026-02-21"
},
{
    name: "Levl",
    description: "Engagement and reward platform for course builders and community leaders. It uses AI-generated challenges and consistency rewards to transform passive content consumption into active, motivated participation.",
    url: "https://getlevl.ai",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=getlevl.ai&sz=128",
    dateAdded: "2026-02-22"
},
{
    name: "GreenPT",
    description: "A green, privacy-focused AI assistant (Frida) designed with a minimal carbon footprint. It prioritizes user data protection while delivering smart, efficient AI interactions.",
    url: "https://greenpt.nl/frida",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=greenpt.nl&sz=128",
    dateAdded: "2026-02-16"
},
{
    name: "iMeett",
    description: "Private AI meeting assistant that transcribes, summarizes, and organizes conversations directly into your Google Drive. It ensures data ownership by processing audio securely without third-party server storage.",
    url: "https://app.imeett.ai",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=app.imeett.ai&sz=128",
    dateAdded: "2026-02-09"
},
{
    name: "Webcomparis",
    description: "Competitive analysis tool that uses AI to audit and compare up to five websites simultaneously. It provides technical, SEO, and design insights through professional PDF reports to identify market gaps.",
    url: "https://www.webcomparis.com",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.webcomparis.com&sz=128",
    dateAdded: "2026-02-10"
},
{
    name: "PathwiseAI",
    description: "AI-driven career platform that automates job searching and application preparation. It generates tailored cover letters, resumes, and interview prep materials by simply providing a company name and role.",
    url: "https://www.pathwiseai.io/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.pathwiseai.io&sz=128",
    dateAdded: "2026-02-11"
},
{
    name: "TransGull",
    description: "Multilingual translation platform that uses contextual AI for real-world conversations, videos, and meetings. It moves beyond simple text conversion to provide natural, accurate translations in real-time.",
    url: "https://transgull.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=transgull.com&sz=128",
    dateAdded: "2026-02-12"
},
{
    name: "Watchflow",
    description: "Infrastructure monitoring suite for SSL certificates, scheduled jobs, and APIs. It delivers instant alerts via Slack and Teams to ensure critical services remain uptime and security certificates stay valid.",
    url: "https://watchflow.io",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=watchflow.io&sz=128",
    dateAdded: "2026-02-13"
},
  {
    name: "AiArtist",
    description: "AI motion graphics generator for Social Media and Ads",
    url: "https://www.aiartist.io",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.aiartist.io&sz=128",
    dateAdded: "2026-02-14"
},
  {
    name: "TicketsData",
    description: "TicketsData is a unified API for real time ticket inventory and pricing across major marketplaces. Get normalized JSON for events, listings, and availability in seconds.",
    url: "https://ticketsdata.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=ticketsdata.com&sz=128",
    dateAdded: "2026-02-15"
},
  {
    name: "71vote",
    description: "71vote is an AI-powered thinking tool where multiple AI agents discuss your work or personal dilemmas in real time — including health, therapy, nutrition, and pet care — helping you see every angle before you decide.",
    url: "https://www.71vote.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.71vote.com&sz=128",
    dateAdded: "2026-02-09"
},
  {
    name: "privatclaw",
    description: "PrivatClaw is a fully managed OpenClaw hosting service that gives you a dedicated, private virtual server with OpenClaw pre-installed and ready to use. No Docker, no terminal commands, no DevOps — just sign up and start chatting with your personal AI assistant. Every PrivatClaw instance runs on its own isolated VPS, meaning your data, conversations, and configurations belong entirely to you. Unlike shared hosting solutions, there is no shared infrastructure between users — your server is yours alone. We handle everything behind the scenes: initial deployment, OpenClaw configuration, security hardening, software updates, backups, and ongoing server maintenance. If something breaks at 2 AM, that's our problem, not yours. You focus on using your AI assistant — we keep it running. PrivatClaw connects to the messaging platforms you already use — Telegram, WhatsApp, Discord, Slack, and more. Your OpenClaw instance works 24/7 as a proactive AI agent that can browse the web, manage files, run automations, and remember your preferences across conversations. It's not just a chatbot — it's a personal AI teammate that actually gets things done. Whether you want a personal productivity assistant, a team-facing support bot, or an automation engine for your business workflows, PrivatClaw delivers the full power of OpenClaw without the technical overhead. Our support team is available to help with setup, configuration, custom skills, and any issues that come up along the way. Skip the self-hosting headaches. Get a production-ready OpenClaw instance that just works.",
    url: "https://privatclaw.com",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=privatclaw.com&sz=128",
    dateAdded: "2026-02-10"
},
  {
    name: "PagerSync",
    description: "Bring Your On-Call Roster into Slack for Seamless Communication",
    url: "https://www.pagersync.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.pagersync.com&sz=128",
    dateAdded: "2026-02-11"
},
  {
    name: "Polyform",
    description: "Build beautiful forms in seconds. Polyform combines AI-powered form generation with advanced theming, conditional logic, and real-time analytics, so you never start from scratch",
    url: "https://polyform.to",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=polyform.to&sz=128",
    dateAdded: "2026-02-12"
},
  {
    name: "Status Central",
    description: "Monitor All Your Services In One Place. Get real-time status updates from all your critical services. Stay informed about outages and maintenance windows.",
    url: "https://www.statuscentral.io/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.statuscentral.io&sz=128",
    dateAdded: "2026-02-13"
},
  {
    name: "MiroMiro",
    description: "Extract colors, fonts, styles and ready-to-use code from any website in one click.",
    url: "https://miromiro.app",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=miromiro.app&sz=128",
    dateAdded: "2026-02-14"
},
  {
    name: "Traidies",
    description: "Traidies is an AI-powered platform that turns plain-English trading ideas into fully functional automated trading bots — complete with code generation, cloud compilation, and backtesting tools.",
    url: "https://www.traidies.com",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.traidies.com&sz=128",
    dateAdded: "2026-02-15"
},
  {
    name: "Glad AI",
    description: "Most founders and marketers are sitting on a goldmine of expertise trapped in docs, old blogs, and messy notes. The current state of marketing is a manual grind: you spend hours trying to turn one idea into a post for LinkedIn, then realize you have to rewrite it for X, then figure out how to join the conversation on Reddit without getting banned for being \"spammy.\"  Glad AI changes this. It acts as your dedicated assistant that ingests your raw data and transforms it into a multi-platform presence.   Voice Cloning: The platform uses a Voice Consistency Engine to map your vocabulary and professional tone. Your output sounds like you, not a generic robot.  Smart Extraction: Point the AI at your website or blogs. It finds the hooks and pillar topics that position you as an industry leader.  Auto-Pilot Growth: From formatting for dwell time to predictive scheduling, your social presence is handled while you sleep.  Visual Identity: On-brand graphics are generated for every post, ensuring your feed looks as good as it reads.",
    url: "https://iamglad.ai",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=iamglad.ai&sz=128",
    dateAdded: "2026-02-09"
},
  {
    name: "Organic Pilot",
    description: "With OrganicPilot, grow your organic traffic on auto pilot. Instead of juggling keywords, spreadsheets, and scattered drafts, OrganicPilot builds your entire content engine:  • Generates topic clusters based on search demand • Creates a 30-day content plan with briefs • Scores content quality before publishing • Publishes directly to WordPress or your CMS  It’s built for agencies and SaaS teams who want to scale organic traffic without hiring a full SEO department.  No fluff. No random AI content. Just structured organic growth.",
    url: "https://www.organicpilot.ai",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.organicpilot.ai&sz=128",
    dateAdded: "2026-02-02"
},
  {
    name: "maptrics",
    description: "SEO monitoring, SEO health score, automated SEO audit, continuous SEO monitoring, deploy SEO check, site crawling, SEO regression detection, meta tag checker, OG tag validator, structured data validation, broken link checker, canonical tag monitor, robots meta checker, sitemap crawler, SEO issue tracker, page health score, SEO traffic drop, broken deploy SEO, SEO regression, post-deploy SEO check, SEO monitoring after deploy, catch SEO issues early, SEO change detection, SEO audit tool, SEO history tracking, continuous SEO vs one-time audit, real-time SEO monitoring, SEO score over time, SEO trend tracking, Vercel SEO monitoring, deploy webhook SEO, Google Search Console integration, SEO CI/CD, automated SEO testing, SEO monitoring for developers, SEO health check after deploy, track SEO changes over time, SEO audit with history, automatic SEO regression testing, SEO score dashboard, seo-monitoring, site-crawl, meta-tags, og-tags, structured-data, deploy-checks, health-score, link-checker, alt-text, canonical, seo-history, issue-tracking, vercel, sitemap",
    url: "https://www.maptrics.io",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.maptrics.io&sz=128",
    dateAdded: "2026-02-03"
},
  {
    name: "LLMWISE",
    description: "LLMWise is the fastest way to compare, blend, and evaluate leading AI models — all from a single interface. Instead of juggling multiple AI subscriptions and browser   tabs, LLMWise lets you send one prompt and see how GPT-5.2, Claude Sonnet 4.5, Gemini 3 Flash, DeepSeek R1, Grok 3, and more respond side-by-side in real time.    Most professionals already use AI daily but remain locked into a single provider with no way to know if they're getting the best output. LLMWise solves this with five   powerful modes:    Chat — Talk to any model instantly. Built-in smart routing automatically picks the best model for your query — code questions go to GPT, creative writing to Claude,   translation to Gemini — so you always get optimal results without thinking about it.    Compare — Send one prompt to 2-4 models simultaneously and see responses stream in side-by-side. Perfect for evaluating which model handles your specific use case best,   whether that's drafting emails, analyzing data, or writing code.    Blend — Combines outputs from multiple models into a single, superior response. Uses Mixture-of-Agents architecture to synthesize the best reasoning from each model. The    result consistently outperforms any individual model.    Judge — Pit models against each other in a blind evaluation judged by a third AI model. Get an objective verdict on which model produces better output for your exact   prompt, complete with scoring and reasoning.    Mesh — Intelligent failover routing that automatically retries with backup models if your primary choice fails or is overloaded. Circuit-breaker protection ensures you   always get a response.    LLMWise is built for professionals who need reliable AI output without the overhead of managing multiple subscriptions. Key features include:",
    url: "https://llmwise.ai",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=llmwise.ai&sz=128",
    dateAdded: "2026-02-04"
},
  {
    name: "Transmit",
    description: "Your emails, your reputation. Isolated sending from $2/mo.",
    url: "https://xmit.sh",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=xmit.sh&sz=128",
    dateAdded: "2026-02-05"
},
  {
    name: "SecVibe",
    description: "SecVibe is an AI-powered security copilot built for vibe coding, helping developers automatically detect and fix security risks in AI-generated code. It analyzes prompts and outputs in tools like Cursor and VS Code to enforce secure-by-design development from the first line of code.",
    url: "https://secvibe.ai",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=secvibe.ai&sz=128",
    dateAdded: "2026-02-06"
},
  {
    name: "Alignmint",
    description: "Alignmint is an all-in-one nonprofit accounting and management platform built by nonprofit directors for nonprofit directors. It serves general nonprofits, churches, private schools, and fiscal sponsors with a single platform that replaces fragmented software stacks. The company is based in the United States and is committed to making professional-grade nonprofit tools accessible to organizations of every size.",
    url: "https://www.getalignmint.org",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.getalignmint.org&sz=128",
    dateAdded: "2026-02-07"
}
];