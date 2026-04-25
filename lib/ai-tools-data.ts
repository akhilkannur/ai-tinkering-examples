export interface AiTool {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: {
    price: string;
  };
  image: string;
  screenshot?: string;
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=vidmix.ai&sz=128",
    screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.vidmix.ai&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.overvisual.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.overvisual.com%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=chatty.fit&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fchatty.fit&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.slidewhisper.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.slidewhisper.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.imejis.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.imejis.io&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=emailferret.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Femailferret.io&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.agentgatepay.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.agentgatepay.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=hypnotype.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fhypnotype.app&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=computerkeyboardshortcuts.org&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fcomputerkeyboardshortcuts.org%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=floowed.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ffloowed.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=stride-fuel.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fstride-fuel.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=orav.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Forav.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=airankpilot.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fairankpilot.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.bookswift.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.bookswift.app&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=slidescockpit.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fslidescockpit.com%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=3dSynth.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2F3dSynth.app&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=www.cryptonewsnavigator.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.cryptonewsnavigator.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=suburbstack.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsuburbstack.com%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=sequenzy.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsequenzy.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.markeplay.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.markeplay.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.qeeebo.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.qeeebo.com&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=feynn.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ffeynn.ai&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=aithumbnail.gg&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Faithumbnail.gg&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=ayewatch.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fayewatch.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=pentestmate.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fpentestmate.com%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=bolta.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fbolta.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
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
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.sanamujer.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.sanamujer.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-22",
    maker: {
        name: "Damián Capdevila",
        role: "Founder",
        twitter: "damiancap",
        image: "https://unavatar.io/twitter/damiancap"
    },
    features: [
      "Spanish-first asynchronous telehealth for US-based women",
      "Prescriptions for contraceptives, skin/hair care, and female infections",
      "10-minute online clinical questionnaire for medical review within 1 business day",
      "WhatsApp integration for patient onboarding and support",
      "HIPAA-compliant platform with LegitScript approval"
    ],
    pricingDetails: "Subscriptions from $18.26/mo (Contraceptives) | One-time consultations: $45",
    integrations: ["WhatsApp", "Local Pharmacies", "LegitScript", "Senja"]
},
  {
    name: "Beatable",
    description: "Business validation platform providing competitor analysis and market intelligence to assess risks and opportunities.",
    url: "https://beatable.co",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=beatable.co&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fbeatable.co&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-16",
    features: [
      "Instant AI business idea validation and viability assessment",
      "Automated competitor discovery and market landscape overview",
      "Opportunity & Risk assessment to identify untapped market gaps",
      "Searchable database of startups and validated ideas",
      "Private validation mode for secure, non-shareable results"
    ],
    pricingDetails: "Free access available | Freemium model with Pro tiers",
    integrations: ["Google SSO", "Apple SSO", "LinkedIn"]
},
  {
    name: "Map Your Voyage",
    description: "AI-powered travel planner that transforms Instagram reels and social content into actionable trip itineraries.",
    url: "https://mapyourvoyage.com/",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=mapyourvoyage.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fmapyourvoyage.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-17",
    maker: {
        name: "Anuj J.",
        role: "Indie Maker",
        twitter: "pameeks96",
        image: "https://unavatar.io/twitter/pameeks96"
    },
    features: [
      "DM-to-Plan workflow: Identify travel locations by DMing Instagram Reels",
      "AI location detection from video footage with 99.8% accuracy",
      "Automated country-specific bucket lists and day-wise itinerary generation",
      "Integrated travel booking with lowest price match guarantee (10-30% savings)",
      "Real-footage based planning to avoid AI hallucinations"
    ],
    pricingDetails: "Free | Pro: $1.49/mo or $11/year",
    integrations: ["Instagram", "Google Maps", "YouTube", "Expedia", "Viator", "Klook"]
},
  {
    name: "AyeCreate",
    description: "Unified AI studio for cinematic video and image generation using premium models like Sora, Veo, and Flux.",
    url: "https://ayecreate.ai/",
    category: "Image Generation",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=ayecreate.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fayecreate.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-18",
    maker: {
        name: "Michael Coleman",
        role: "Indie Maker",
        twitter: "michaellcoleman7",
        image: "https://unavatar.io/twitter/michaellcoleman7"
    },
    features: [
      "Unified access to high-end AI models (Sora 2, Veo 3.1, Flux 2 Pro, Kling AI)",
      "StylePack marketplace for consistent visual aesthetics and brand styles",
      "Advanced face consistency tools for cross-generation accuracy",
      "One-click AI photo suite for upscaling and background removal",
      "Image-to-Video generation starting from static visuals"
    ],
    pricingDetails: "Pay-as-you-go credits | No monthly subscription",
    integrations: ["Sora", "Veo", "Kling AI", "Flux", "Gemini", "SDXL"]
},
  {
    name: "Nicegram",
    description: "Privacy-focused Telegram client featuring a built-in AI assistant, multichain wallet, and agent marketplace.",
    url: "https://nicegram.app",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=nicegram.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fnicegram.app&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-19",
    maker: {
        name: "Sergey Sheleg",
        role: "CPO",
        twitter: "sergeysheleg",
        image: "https://unavatar.io/twitter/sergeysheleg"
    },
    features: [
      "Non-custodial multichain wallet supporting TON, Solana, Ethereum, and EVM",
      "Built-in AI Assistant for summaries, translations, and task routing",
      "NiceID on-chain reputation system (NiceScore) and escrow services",
      "AI Agent Marketplace to deploy specialized bots for productivity",
      "Privacy-first 'Double Bottom' mode for hidden accounts and chats"
    ],
    pricingDetails: "Free to use | Usage-based fees for escrow and AI credits",
    integrations: ["Telegram API", "TON", "Solana", "Base", "EVM"]
},
  {
    name: "LocalBiz",
    description: "AI-powered platform that helps service businesses grow local SEO by generating location-focused blog content.",
    url: "https://www.localbiz.ai",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.localbiz.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.localbiz.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-20",
    maker: {
        name: "Abhi Dwivedi",
        role: "Software Creator",
        twitter: "abhidwivedi",
        image: "https://unavatar.io/twitter/abhidwivedi"
    },
    features: [
      "Automated Local SEO blogs: Generates 30 city-specific posts per month",
      "Hyper-local targeting for cities, counties, and specific neighborhoods",
      "AEO & GEO optimization for ChatGPT, Gemini, and AI search engines",
      "Built-in scheduling dashboard for consistent hands-off publishing",
      "Tone and detail customization to match brand voice and service areas"
    ],
    pricingDetails: "$84/mo (Includes 30 posts and 7-day Free Trial)",
    integrations: ["WordPress", "CMS Compatible", "Google Maps"]
},
  {
    name: "Argus AI",
    description: "Real-time safety alert app for truck drivers that uses AI to detect crashes and slowdowns via existing DOT cameras.",
    url: "https://www.getargus.ai",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.getargus.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.getargus.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-21",
    features: [
      "Sub-10-second crash detection via computer vision analysis",
      "Monitors 45,000+ DOT cameras across 50+ metro areas",
      "Real-time safety alerts and proactive rerouting for truckers",
      "Truck-specific navigation: Low bridge and HazMat compliance",
      "Fuel & IFTA optimization with pump price/tank level timing"
    ],
    pricingDetails: "$19.99/mo (Annual: $199.99/year) | First month: $9.99",
    integrations: ["DOT Camera Networks", "IFTA", "Traffic Incident API"]
},
  {
    name: "POPJAM",
    description: "Agentic marketing suite that simulates audience segments to generate and test highly personalized ad creatives and copy.",
    url: "https://popjam.io",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=popjam.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fpopjam.io&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-22",
    features: [
      "Synthetic Audience Creation: Build personas to 'test before you spend'",
      "Real-time Reaction Simulation: Get feedback on hooks and blind spots",
      "Psychographic Focus Groups at scale (simulate 10,000 customers)",
      "Autonomous Ad Maker: Generates on-brand creatives and copy automatically",
      "AI Editor Agent: Natural language adjustments for visuals and text"
    ],
    pricingDetails: "Free (500 credits) | Enterprise custom plans",
    integrations: ["Meta", "Google Ads", "TikTok", "LinkedIn", "Reddit"]
},
  {
    name: "Tekadio",
    description: "AI platform for teachers that automates test creation and grading, including semantic evaluation of open-ended answers.",
    url: "https://tekadio.app",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=tekadio.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ftekadio.app&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-16",
    maker: {
        name: "Andreas Binder",
        role: "Founder",
        twitter: "andreas_binder",
        image: "https://unavatar.io/twitter/andreas_binder"
    },
    features: [
      "Automated Test Creation from PDFs, images, URLs, or topics",
      "Semantic Grading: Understands synonyms and context in open-ended answers",
      "Human-in-the-Loop review for low-confidence AI grading cases",
      "Class Management & Performance Heatmaps to track student progress",
      "Student 'Magic Links' for password-free access to assessments"
    ],
    pricingDetails: "Free to start | Custom plans for schools and districts",
    integrations: ["PDF", "URLs", "Images", "LMS Export"]
},
  {
    name: "Invoplex",
    description: "Invoplex is an invoicing tool for freelancers, creators and service-based businesses to create quotes, send invoices, track payments, and manage clients without the bloated accounting software.",
    url: "https://invoplex.com/",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=invoplex.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Finvoplex.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-09",
    features: [
      "Instant Quote & Invoice creation with one-click conversion",
      "Branded PDF templates with customizable logos and layouts",
      "Client & Project management centralized database",
      "Real-time revenue dashboard and payment status tracking",
      "Multi-currency support for international freelancers"
    ],
    pricingDetails: "Free to use (Currently in early access/beta)",
    integrations: ["Email", "PDF Export", "Project Tracking"]
},
  {
    name: "Docutracker",
    description: "Docutracker lets you see when and how people read your documents, providing real-time engagement analytics to optimize follow-ups. Docutracker lets you see when and how people read your documents, providing real-time engagement analytics to optimize follow-ups.",
    url: "https://docutracker.io",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=docutracker.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fdocutracker.io&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-10",
    maker: {
        name: "Mohamed Ibrahim",
        role: "Maker",
        twitter: "mo_ibrahim",
        image: "https://unavatar.io/twitter/mo_ibrahim"
    },
    features: [
      "Real-time tracking: Instant alerts when prospects open or read documents",
      "Page-level analytics: See time spent on each page to identify interests",
      "Hottest Leads ranking based on engagement frequency and behavior",
      "Integrated legally binding e-signatures to close deals in-platform",
      "Template library for Agency SOWs, Proposals, and MSAs"
    ],
    pricingDetails: "Free (3 docs) | Starter: $15/mo | Business: $25/mo",
    integrations: ["CRM Add-on", "Email", "Signature Platforms"]
},
  {
    name: "Time",
    description: "Time is a native macOS menu bar app for managing time zones and calendar events. Track unlimited zones, see when teammates are awake, and join meetings with one click.",
    url: "https://menubartime.com",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=menubartime.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fmenubartime.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-11",
    features: [
      "Unlimited timezone tracking directly in the macOS menu bar",
      "Time Scroller: Scroll up to 24 hours forward/backward to visualize time shifts",
      "One-click join for Zoom, Google Meet, and Microsoft Teams",
      "Smart Event Display with progress bars for ongoing meetings",
      "Day/Night visual awareness to identify sleep/wake status of global teammates"
    ],
    pricingDetails: "One-time purchase (Personal: ~$15) | 30-day Free Trial",
    integrations: ["macOS Calendar", "iCloud", "Google Calendar", "Outlook", "Zoom"]
},
  {
    name: "CleanMark",
    description: "Dual Functionality: - Remove text watermarks from NotebookLM PDFs (bottom-right corner) - Remove watermarks from Gemini AI-generated images. Advanced Technology: - Powered by OpenCV inpainting algorithms for seamless removal - Directly processes embedded PDF images to maintain resolution - Smart watermark detection that works on both light and dark backgrounds - Supports large files up to 100MB. User-Friendly Experience: - One-click upload and process - Preview results before downloading - No software installation required - Batch processing support - Fast processing (typically under 30 seconds)",
    url: "https://geminiwatermarkremover.net/",
    category: "Image Generation",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=geminiwatermarkremover.net&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fgeminiwatermarkremover.net%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-12",
    features: [
      "Specialized AI removal for 'Created with NotebookLM' text and logos",
      "High-fidelity preservation of original PDF quality and formatting",
      "Interactive Side-by-Side preview comparison before downloading",
      "Automated batch processing for multi-page document cleaning",
      "Advanced computer vision and inpainting algorithms for seamless results"
    ],
    pricingDetails: "Free to preview | Credit-based downloads (5 credits/doc)",
    integrations: ["Google NotebookLM", "PDF", "OpenCV"]
},
  {
    name: "ArchRender",
    description: "Photorealistic AI Rendering for Architects & Designers",
    url: "https://www.archrender.ai/",
    category: "Image Generation",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=www.archrender.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.archrender.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-13",
    features: [
      "Photorealistic AI conversion of elevation drawings and 3D models",
      "Environmental Controls: Adjust seasons, time of day, and lighting",
      "Mood Board integration to interpret custom colors, finishes, and styles",
      "High-resolution 4K upscaling for professional client presentations",
      "Version-controlled project folders with built-in storage management"
    ],
    pricingDetails: "Basic: $39/mo | Pro: $59/mo | Studio: $139/mo",
    integrations: ["OBJ", "FBX", "GPL", "Elevation Drawings"]
},
  {
    name: "ModulEdge",
    description: "ModulEdge is a tech-driven manufacturer of modular data centers that bridges the gap between high-load AI hardware and legacy enterprise IT infrastructure. By combining advanced hybrid cooling with specialized environmental hardening, we enable the rapid deployment of on-prem AI modular data centers, general compute clusters, and secure data backups. Unlike traditional construction, every ModulEdge system is factory-integrated and delivered in just 3-6 months, providing a plug-and-play solution for sites with power, cooling, or site constraints.",
    url: "https://www.moduledge.com/",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=www.moduledge.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.moduledge.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-14",
    features: [
      "Modular data centers (MDCs) scalable from 5 kW to 150 kW per rack",
      "Specialized direct-to-chip liquid cooling for high-density AI hardware",
      "Environmental hardening ruggedized for extreme climates (-35°C to +52°C)",
      "Tier III/IV resilience with optional EMP/IEMI Faraday-grade shielding",
      "Rapid deployment: Factory-integrated systems delivered in 3-6 months"
    ],
    pricingDetails: "Custom Quote (Tiered options for Enterprise and OEM partners)",
    integrations: ["NVIDIA (B200, H200)", "AMD GPU", "Vertiv", "Cummins", "Solar-ready"]
},
  {
    name: "Tech Twitter",
    description: "Finding signal on X is more difficult than it used to be on Twitter. We curate the best tweets on topics like AI, startups, and product development every weekday at 10 AM EST so you can focus on what matters.",
    url: "https://www.techtwitter.com",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=www.techtwitter.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.techtwitter.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-15",
    features: [
      "Daily weekday curation of high-signal tweets on AI and startups",
      "Real-time monitoring of tech discussions and trending threads",
      "Topic-specific browsing for Claude, Cursor, and SaaS growth",
      "Integrated search (⌘K) to find specific tech personalities and insights",
      "Curated email newsletter delivering top tech news and articles"
    ],
    pricingDetails: "Free (Newsletter & Web Index)",
    integrations: ["Twitter/X", "RSS", "Email"]
},
  {
    name: "Bank PDF Converter",
    description: "The most accurate bank statement converter. Convert PDF to Excel and CSV with automatic transaction validation—works with any bank, any language.",
    url: "https://bankpdfconverter.com/",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=bankpdfconverter.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fbankpdfconverter.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-09",
    features: [
      "Automatic balance reconciliation against opening/closing totals",
      "Bulk processing: Convert a full year of statements in one batch",
      "Side-by-side 'Quick Compare' for manual PDF-to-data verification",
      "Auto-renaming based on bank name, date, and account holder",
      "deterministic extraction ensures zero 'AI-invented' numbers"
    ],
    pricingDetails: "Free (10 pgs/wk) | Basic: $29.95/mo | Business: $99.95/mo",
    integrations: ["REST API", "Excel (XLSX)", "CSV", "QuickBooks", "Xero"]
},
  {
    name: "Squared Away",
    description: "We've all been there. You're standing in your garage, staring at a wall of boxes, trying to remember which one has the camping gear. Or you're at the hardware store, wondering if you already own a 10mm socket set buried somewhere in your basement. The mental inventory we try to keep of our belongings inevitably fails us, and we end up wasting hours searching or buying things we already own.  Squared Away is an AI-powered home inventory app that solves this problem by making it effortless to catalog everything you own. The magic is in the simplicity: just snap a photo of an item, and the app's AI does the rest. It automatically identifies what you're looking at, suggests an accurate name, assigns the right category, and generates relevant tags—all in seconds. What used to require tedious manual data entry now happens with a single tap of your camera.",
    url: "https://squaredaway.ai",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=squaredaway.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsquaredaway.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-10",
    features: [
      "AI multi-item recognition: Photograph a room or bin to auto-catalog items",
      "Natural language inventory search: 'Where are the 2-inch screws?'",
      "Maintenance tracking with automated reminders for appliances/equipment",
      "Compliance-ready reporting for insurance claims and tax audits",
      "Cross-platform syncing across iOS, Android, and Web interfaces"
    ],
    pricingDetails: "Starter: $29/mo | Pro: $79/mo | Business: $149/mo",
    integrations: ["Shopify", "WooCommerce", "REST API", "Mobile App"]
},
  {
    name: "logostream",
    description: "Company logos & icons for modern travel and finance apps.",
    url: "https://logostream.dev",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=logostream.dev&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Flogostream.dev&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-11",
    features: [
      "Access to 380,000+ company logos (Stocks, ETFs, Banks, Airlines)",
      "Real-time logo updates for corporate actions (M&A, rebranding)",
      "Native support for 12,000+ cryptocurrency logos across major chains",
      "Enterprise-grade CDN with <100ms global delivery latency",
      "Flexible querying via Ticker, ISIN, WKN, or Crypto symbols"
    ],
    pricingDetails: "Enterprise Quote (Contact for customized volume plans)",
    integrations: ["REST API", "React", "Python", "JavaScript"]
},
  {
    name: "Archivist",
    description: "Turn AI-generated chaos into organized deliverables. Custom naming presets, smart collections, and bulk ZIP exports for all who've lost track of files.",
    url: "https://getarchivist.org/",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=getarchivist.org&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fgetarchivist.org%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-12",
    features: [
      "AI-Powered renaming: Generates descriptive names by analyzing image content",
      "Custom Naming Presets using variables (Date, Context, Content, Source)",
      "One-click secure client sharing with auto-expiring download links",
      "Smart Collections for batch-renaming and organizing AI variation sets",
      "Support for major AI generators: Midjourney, DALL-E, and Stable Diffusion"
    ],
    pricingDetails: "Free trial (3 renames) | Pro: €7/month",
    integrations: ["Midjourney", "DALL-E", "Stable Diffusion", "ZIP Export"]
},
  {
    name: "Bitvoiper",
    description: "Browser-based calling with Username Proxy system and Comprehensive Call Center Features",
    url: "https://bitvoiper.com",
    category: "Productivity",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=bitvoiper.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fbitvoiper.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-13",
    features: [
      "Browser-based VoIP calling via WebRTC (no app download required)",
      "Username Proxy system to keep personal and business numbers private",
      "AI-powered real-time call translation and automated captions",
      "Virtual phone numbers from 120+ countries and 1,000+ cities",
      "Smart call forwarding and advanced voicemail routing for global teams"
    ],
    pricingDetails: "Lifetime Deal (LTD): ~$100 | Monthly: ~$12.99/mo",
    integrations: ["Yealink", "Grandstream", "Zoho CRM", "HubSpot", "Salesforce"]
},
  {
    name: "vitelnk",
    description: "Secure Video Sharing Built for Professionals",
    url: "https://vitelnk.com/",
    category: "Video & Audio",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=vitelnk.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fvitelnk.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-14",
    features: [
      "Secure HLS streaming: Blocks right-click downloads and browser extensions",
      "Engagement heatmaps: Identify exactly which video sections hold interest",
      "Smart Access: Create single-use or timed links with viewer registration",
      "Post-video CTAs: Redirect viewers to Calendly, Stripe, or invoices",
      "Custom branded thumbnails and GIF previews for email outreach"
    ],
    pricingDetails: "Pro: €19/mo | Lifetime: €99 | 14-day Free Trial",
    integrations: ["Calendly", "Stripe", "HLS Streaming", "Email GIFs"]
},
  {
    name: "Roomika",
    description: "Roomika is an AI-powered interior design and virtual staging platform that helps you redesign any room using a photo of your real space. Instead of starting from scratch with mood boards or generic inspiration images, Roomika lets you upload a room photo and instantly generate realistic design concepts that preserve the layout and architecture of your room — while transforming the style, furniture, and overall vibe.  Whether you’re decorating a new home, refreshing a living room, remodeling a kitchen, or trying to make a bedroom feel more modern and comfortable, Roomika makes it easy to explore professional-quality options in minutes. You can choose from a wide range of popular interior styles, from modern and contemporary to minimalist, Scandinavian, Japanese, rustic, and more. Each design is generated with a focus on photorealism so the results look believable, not cartoonish — and you can generate multiple variations to compare different looks side-by-side.  Roomika is also a powerful tool for real estate professionals, Airbnb hosts, and property managers who need high-quality staging visuals fast. With Roomika’s virtual staging features, you can furnish empty rooms, redesign outdated spaces, and create polished “after” images that help buyers and renters imagine the potential of a property. This is especially useful when you want to test design directions without spending money on physical staging, renovations, or expensive design software.  A key advantage of Roomika is its flexibility. You can upload your own inspiration images, describe the changes you want in plain English, and fine-tune designs until they match your taste. Want a brighter color palette? Different flooring? More modern furniture? A cozier aesthetic? Roomika makes it easy to iterate and explore. In addition to still images, Roomika can also generate short design videos that bring the transformation to life — perfect for sharing on social media, listing pages, or with friends and family.  Roomika is built for anyone who wants to design their space with confidence, without needing design experience. It’s fast, simple, and fun to use, while still producing results that feel like something an interior designer might deliver. If you want to quickly visualize design ideas, experiment with styles, or stage a home for sale or rent, Roomika turns your room photo into beautiful, realistic design concepts in just a few clicks.",
    url: "https://www.roomika.ai",
    category: "Video & Audio",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.roomika.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.roomika.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-15",
    features: [
      "AI Redesign: Transform rooms into 20+ styles in under 30 seconds",
      "Virtual Staging: Automatically furnish empty spaces with realistic decor",
      "Match a Room: Apply aesthetics from Pinterest/Instagram to your own photo",
      "Object Removal: Clear existing furniture in one click for a blank canvas",
      "AI Video: Generate walk-through before-and-after videos of redesigned spaces"
    ],
    pricingDetails: "One-time Pass: $15 | Basic: $20/mo | Pro: $35/mo",
    integrations: ["JPG/PNG Export", "Instagram", "Pinterest", "MLS Compatible"]
},
  {
    name: "Multic - Multiplayer Comics",
    description: "GenAI Game Engine for Multiplayer Experiences",
    url: "https://www.multic.com",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.multic.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.multic.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-09",
    features: [
      "GenAI Game Engine specifically designed for multiplayer interactive comics",
      "Node-graph storytelling interface for branching path narrative logic",
      "Real-time collaboration tools for artists and writers",
      "AI-assisted asset generation and animation for narratives",
      "Cross-platform publishing support for iOS and Android"
    ],
    pricingDetails: "Free (Seedance 2.0) | Early Access plans available",
    integrations: ["iOS", "Android", "Node Graph", "ComfyUI"]
},
  {
    name: "Thrive",
    description: "Master your portfolio. Maximize your potential. Crypto Market Intelligence for Traders.",
    url: "https://thrive.fi/",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=thrive.fi&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fthrive.fi%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-02",
    features: [
      "On-chain analysis: Deep-dive blockchain data for market trends",
      "Smart Money Data: Track whale movements and institutional capital",
      "Real-time market signals and alerts for trade entry/exit",
      "AI-powered pattern tracking and personalized trading insights",
      "Unified portfolio management to monitor holdings across major chains"
    ],
    pricingDetails: "Free (Basic data) | Premium tiers for advanced signals",
    integrations: ["Ethereum", "Solana", "Telegram", "Discord", "Crypto Exchanges"]
},
  {
    name: "PressBeat",
    description: "AI-native PR agency. Get quoted in organic press on autopilot. 1 article guaranteed per month.",
    url: "https://pressbeat.io",
    category: "Marketing",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=pressbeat.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fpressbeat.io&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-03",
    features: [
      "Organic Press Autopilot: AI-driven research and targeted journalist pitching",
      "Guaranteed DR50+ mentions in editorial, non-sponsored publications",
      "AI Search Visibility: Boosts citations in ChatGPT and Perplexity via PR",
      "White-label PR engine for agencies to resell with custom margins",
      "Built-in AI toolkit: Press Kit, PR Angle, and Company Analyzer generators"
    ],
    pricingDetails: "$500 per Article (Performance-based | 100% Money-back guarantee)",
    integrations: ["Zapier", "Make.com", "n8n", "REST API", "MCP Server"]
},
  {
    name: "SimpleSeverance",
    description: "Educational platform for severance",
    url: "https://simpleseverance.co",
    category: "Productivity",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=simpleseverance.co&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsimpleseverance.co&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-04",
    features: [
      "Severance Estimator: Instant payout ranges based on state and tenure",
      "Private Leverage Analysis: 4-minute assessment to identify negotiation ammunition",
      "Ready-to-use negotiation scripts for counter-offers and deadlines",
      "State-specific compensation benchmarks for accurate market context",
      "Lawyer Referral Network: Connect with vetted employment attorneys"
    ],
    pricingDetails: "Free (Estimator & Assessments) | Full Negotiation Plan: $49",
    integrations: ["Legal Referral Network", "Attorney Portal", "State Employment Data"]
  },
  {
    name: "CookieGuard",
    description: "CookieGuard is a free GDPR & CCPA cookie consent tool that helps websites manage cookie banners and user consent with minimal setup.",
    url: "https://cookieguard.co",
    category: "Code Assistance",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=cookieguard.co&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fcookieguard.co&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-05",
    features: [
      "Global Compliance: Support for GDPR, CCPA, LGPD, and PIPL standards",
      "Automated Cookie Scanning: Detects and categorizes trackers for transparency",
      "Location-Aware Banners: Automatically adapts based on visitor region",
      "Audit Logs: Maintains detailed consent records for legal proof (Enterprise)",
      "Granular User Control: Allow visitors to opt-out by category (Marketing, Analytics)"
    ],
    pricingDetails: "Free (2k impressions) | Essential: $8/mo | Professional: $18/mo",
    integrations: ["Shopify", "WooCommerce", "WordPress", "Webflow", "Squarespace"]
  },
  {
    name: "sHabits",
    description: "Minimalist UI focused on building good habits first. Visual tracking, smart reminders, and neat home screen widgets keep you committed.",
    url: "https://simplyhabits.io/",
    category: "Productivity",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=simplyhabits.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsimplyhabits.io%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-06",
    features: [
      "Minimalist habit tracking with focused, distraction-free UI",
      "Customizable Home Screen widgets for instant progress viewing",
      "Smart local reminders to keep routine streaks alive",
      "100% offline functionality with no data collection or analytics",
      "Native Apple widget integration for rapid habit completion"
    ],
    pricingDetails: "Free basic tracking | Lifetime unlock: One-time payment",
    integrations: ["Apple Home Screen", "iOS Notifications"]
  },
  {
    name: "DiffScout",
    description: "AI-powered price monitoring that tracks competitor prices on any website. Get instant alerts when prices change—no scrapers or CSS selectors needed.",
    url: "https://diffscout.com",
    category: "Productivity",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=diffscout.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fdiffscout.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-07",
    features: [
      "AI vision-based price monitoring: Works on any site without CSS selectors",
      "Instant email alerts with old/new prices and screenshot verification",
      "Custom alert thresholds: Only notify for significant % changes",
      "Variant tracking: Monitor multiple sizes, colors, and SKUs per page",
      "Historical price archiving with timestamped screenshot audit trails"
    ],
    pricingDetails: "Free (5 checks/mo) | Starter: $29/mo | Business: $99/mo",
    integrations: ["Slack", "Zapier", "Browser Extension", "Webhooks"]
  },
  {
    name: "Test-Lab.ai",
    description: "Automated QA with AI agents. Find critical UX & flow bugs before launch.",
    url: "https://www.test-lab.ai/",
    category: "Code Assistance",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=www.test-lab.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.test-lab.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-08",
    features: [
      "Plain English test writing - no scripts, selectors, or code required",
      "Self-healing tests that adapt to UI changes automatically",
      "AI-powered autonomous agents that navigate like real users",
      "Quick and Deep test modes for fast feedback or thorough exploration",
      "CI/CD integration with GitHub Actions, GitLab, and Slack alerts"
    ],
    pricingDetails: "Free: $3 credits | Pay-as-you-go: $0/mo + credits | Scale: $149/mo",
    integrations: ["GitHub Actions", "GitLab CI", "Slack", "Playwright", "Jira", "Linear"]
  },
  {
    name: "SaaS Blueprint",
    description: "Ship faster with a production-ready SaaS blueprint that includes auth, Stripe, protected routes, docs, and Cloudflare deployment out of the box.",
    url: "https://saasblueprint.app",
    category: "Code Assistance",
    tags: {
      price: "Paid"
      },
    image: "https://www.google.com/s2/favicons?domain=saasblueprint.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsaasblueprint.app&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-02",
    maker: {
        name: "Mihai Sandu",
        role: "Software Developer",
        twitter: "mihais77",
        image: "https://unavatar.io/twitter/mihais77"
    },
    features: [
      "Production-ready SaaS codebase with auth, sessions, and protected routes",
      "Stripe billing integration with webhooks and customer portal wired end-to-end",
      "shadcn UI component system with opinionated patterns and layouts",
      "Cloudflare-first deployment with Vercel as alternative option",
      "Complete documentation from setup to production launch"
    ],
    pricingDetails: "$149 one-time (lifetime access with updates)",
    integrations: ["Stripe", "Cloudflare", "Vercel", "shadcn UI", "Next.js"]
  },
  {
    name: "Bangas",
    description: "Prompt-free AI ads | Creative OS for performance marketers",
    url: "https://bangas.ai",
    category: "Marketing",
    tags: {
      price: "Paid"
      },
    image: "https://www.google.com/s2/favicons?domain=bangas.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fbangas.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-03",
    features: [
      "Prompt-free AI ad creation for Meta and Facebook ads at scale",
      "Meta ads bulk launch with integrated project management",
      "Centralized creative operations: scripts, assets, approvals, and launches",
      "Data-driven insights with automation and optimization prompts",
      "84x more creative output per dollar with 98.4% better ROI"
    ],
    pricingDetails: "Paid tool (pricing not publicly disclosed)",
    integrations: ["Meta Ads API", "Facebook Ads", "Google Ads"]
  },
  {
    name: "ShortsAi",
    description: "AI-powered short video generator for TikTok, YouTube Shorts, Instagram Reels, and UGC ads",
    url: "https://shortsai.com",
    category: "Video & Audio",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=shortsai.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fshortsai.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-04",
    maker: {
        name: "Marko Denic",
        role: "Developer",
        twitter: "denicmarko",
        image: "https://unavatar.io/twitter/denicmarko"
    },
    features: [
      "AI Short Video Generator for TikTok, Instagram Reels, and YouTube Shorts",
      "AI Influencer Generator for creating virtual UGC characters",
      "AI UGC Video Generator for authentic-looking promotional videos",
      "Wall-of-Text Videos with images, GIFs, video clips, and text overlay",
      "Multiple visual styles: Realistic, Lego, Ghibli, Anime, Minecraft, Sketch"
    ],
    pricingDetails: "Freemium (Free to use, paid plans available)",
    integrations: ["TikTok", "YouTube", "Instagram", "Facebook", "LinkedIn", "X/Twitter", "Pinterest", "Reddit"]
  },
  {
    name: "LinkedGrow",
    description: "AI-powered LinkedIn content creation tool designed to generate high-converting posts and boost professional engagement.",
    url: "https://linkedgrow.ai/beta",
    category: "Marketing",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=linkedgrow.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Flinkedgrow.ai%2Fbeta&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-05",
    maker: {
        name: "Ambika Sarawgi",
        role: "Founder",
        twitter: "ambika_sarawgi",
        image: "https://unavatar.io/twitter/ambika_sarawgi"
    },
    features: [
      "AI Post Generator with voice training that matches your writing style",
      "Carousel Generator for multi-slide professional content",
      "Content repurposing: turn YouTube, Reddit, blogs, and web pages into LinkedIn posts",
      "Smart scheduling with optimal posting time suggestions",
      "Bring Your Own Key (BYOK) model - use your own OpenAI/Claude/Gemini API keys"
    ],
    pricingDetails: "Free: 3 posts/month | Pro: $19-79/month + ~$4 API usage",
    integrations: ["LinkedIn", "OpenAI", "Anthropic Claude", "Google Gemini", "Perplexity", "Kimi"]
  },
  {
    name: "Credops",
    description: "Monitors credential expiry timelines for production environments, tracking metadata and dates without requiring secret values.",
    url: "https://www.credops.io/",
    category: "Productivity",
    tags: {
      price: "Free"
      },
    image: "https://www.google.com/s2/favicons?domain=www.credops.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.credops.io%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-06",
    maker: {
        name: "Prasada Prabhu",
        role: "Founder",
        twitter: "prasadaprabhu_",
        image: "https://unavatar.io/twitter/prasadaprabhu_"
    },
    features: [
      "Tracks SSL certificates and credential expiry timelines",
      "Slack-based alerts with custom reminder windows (30/14/7/1 day)",
      "Institutional memory - credentials tracked in Slack, not with individuals",
      "Custom mapping to different Slack channels per credential",
      "Shared responsibility - any authorized engineer can view and update"
    ],
    pricingDetails: "Free: 7-day trial | Premium: $25/month | Enterprise: Contact for pricing",
    integrations: ["Slack"]
  },
  {
    name: "Podcept",
    description: "AI-driven platform to find perfect guests for your show or get booked on top-tier podcasts to grow your reach.",
    url: "https://www.podcept.com",
    category: "Marketing",
    tags: {
      price: "Paid"
      },
    image: "https://www.google.com/s2/favicons?domain=www.podcept.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.podcept.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-07",
    features: [
      "Podcast guest booking service for hosts - research, vet, and book guests",
      "Guest placement service for professionals and founders",
      "Personalized outreach with custom pitches (no mass emails)",
      "Full scheduling, coordination, and timezone management",
      "Guest briefs and talking points or interview preparation included"
    ],
    pricingDetails: "Paid service (per-booking and monthly retainer options available)",
    integrations: ["200+ podcasts in network"]
  },
  {
    name: "Roomstage AI",
    description: "AI virtual staging for real estate that transforms empty room photos into beautifully staged spaces in 30 seconds.",
    url: "https://roomstage.ai",
    category: "Image Generation",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=roomstage.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Froomstage.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-08",
    features: [
      "Virtual staging for empty rooms in ~30 seconds",
      "6 styles: Modern, Scandinavian, Coastal, Luxury, Contemporary, Rustic",
      "MLS-compliant output with before/after labeling",
      "Batch processing and API integration available",
      "Unlimited re-renders and style changes"
    ],
    pricingDetails: "Starter: ₹0/mo (overage ₹20.75/image) | Pro: ₹0/mo (overage ₹12.45/image) | Studio: ₹0/mo (overage ₹4.15/image)",
    integrations: ["REST API", "Property Management Software", "MLS platforms"]
  },
  {
    name: "Murmur",
    description: "Private, offline speech-to-text dictation for Windows powered by OpenAI Whisper for high-security environments.",
    url: "https://murmurvt.com",
    category: "Productivity",
    tags: {
      price: "Freemium"
      },
    image: "https://www.google.com/s2/favicons?domain=murmurvt.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fmurmurvt.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-03-09",
    maker: {
        name: "Chase Adams",
        role: "Founder",
        twitter: "chaseadamsio",
        image: "https://unavatar.io/twitter/chaseadamsio"
    },
    features: [
      "OpenAI Whisper-powered with 95%+ accuracy",
      "100% offline - all processing happens locally on device",
      "Works in any application at cursor position",
      "90+ languages with automatic detection",
      "GPU-accelerated transcription for instant results"
    ],
    pricingDetails: "Free: 150 transcriptions/mo | Pro Daily: $0.99/day | Pro Annual: $12.99/year",
    integrations: ["Windows 10/11", "Microsoft Store", "CUDA", "Vulkan"]
  },
  {
    name: "Tails, Co.",
    description: "A specialized pet care matching service that pairs dogs with vetted providers based on breed, energy level, and temperament. Features real-time GPS tracking and mood reports.",
    url: "https://trytails.com/",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=trytails.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ftrytails.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-23",
    features: [
      "Breed-Specific Matching based on temperament",
      "Vetted Providers with skill verification",
      "Real-Time GPS Tracking and photo updates",
      "Detailed care reports (food, bathroom, mood)",
      "Guaranteed backup coverage if provider cancels"
    ],
    pricingDetails: "Free to match | Pay per booking | No subscription required",
    integrations: ["iOS", "Android", "GPS Tracking"]
  },
  {
    name: "NeonChainX",
    description: "A professional options trading desktop interface for Interactive Brokers (IBKR) featuring a multi-chain view and automated risk management tools.",
    url: "https://neonchainx.com/",
    category: "Productivity",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=neonchainx.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fneonchainx.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-24",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    },
    features: [
      "Multi-Chain View: View multiple strikes and expirations simultaneously",
      "Smart Automation: TP/SL with dual triggers (underlying and premium)",
      "Low-Latency Execution: Direct integration with TWS/IB Gateway",
      "Real-Time Risk Tracking and live P&L monitoring"
    ],
    pricingDetails: "7-day free trial | Paid license key required",
    integrations: ["Interactive Brokers", "TWS", "IB Gateway"]
  },
  {
    name: "Roampads",
    description: "A marketplace for work-ready stays vetted for digital nomads and remote professionals, featuring verified high-speed WiFi and ergonomic setups.",
    url: "https://www.roampads.com/",
    category: "Productivity",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.roampads.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.roampads.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-25",
    features: [
      "Verified Infrastructure with speedtest results",
      "Nomad Hubs in cities like Bangkok, Mexico City, Warsaw",
      "Roampilot concierge for custom housing searches",
      "Direct Booking discounts with hosting partners"
    ],
    pricingDetails: "Monthly stays from $400 - $17,000+ | Free Roampilot requests",
    integrations: ["WiFi Speedtests", "Nomad Cities"]
  },
  {
    name: "Flowly Indicators",
    description: "Professional-grade orderflow and volume indicators for TradingView that reveal hidden market flows and smart money movements.",
    url: "https://www.flowly.tools/",
    category: "Productivity",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=www.flowly.tools&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.flowly.tools%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-26",
    features: [
      "SubFlow Terminal: Includes liquidity heatmaps and liquidation tracking",
      "Market Scanner: Scan hundreds of markets for volume events",
      "Evidence-Based Insights: Stats on historical volume and price impact",
      "Custom Alerts: Multi-condition alerts via email",
      "Open Source tools: 11 open source indicators available"
    ],
    pricingDetails: "7-day free trial | Starts at $20/month (billed annually)",
    integrations: ["TradingView", "Email Alerts"]
  },
  {
    name: "TRYremote",
    description: "A specialized job board for discovering top-tier remote tech jobs across Software Engineering, Data Science, and DevOps globally.",
    url: "https://tryremote.com",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=tryremote.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ftryremote.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-27",
    features: [
      "Skill-Based Filtering: Node.js, Python, React, Go, etc.",
      "Location Filtering: Worldwide, US, Europe, EMEA, LATAM",
      "Weekly Job Newsletter subscription",
      "Employer Portal for posting remote talent needs"
    ],
    pricingDetails: "Free for job seekers",
    integrations: ["Email"]
  },
  {
    name: "Userjam",
    description: "Turns messy product analytics data into plain-English updates delivered directly to Slack or email, eliminating complex dashboards.",
    url: "https://userjam.com",
    category: "Marketing",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=userjam.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fuserjam.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-28",
    features: [
      "AI-generated daily narrative reports",
      "Real-time Slack/Email alerts for VIP user actions",
      "User news feeds for team visibility",
      "1-line snippet integration",
      "Works with Mixpanel, Amplitude, PostHog, Segment"
    ],
    pricingDetails: "Early Access (Free for early adopters)",
    integrations: ["Mixpanel", "Amplitude", "Segment", "PostHog", "Slack"]
  },
  {
    name: "MedShotsAI",
    description: "Professional AI headshot generator tailored for healthcare professionals, creating profile photos and marketing shots in clinical attire.",
    url: "https://medshotsai.com",
    category: "Image Generation",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=medshotsai.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fmedshotsai.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-23",
    features: [
      "Role-Aware Attire: Scrubs, lab coats, business formal",
      "Clinical Backgrounds and professional settings",
      "Group Photo Generation from individual headshots",
      "4K Ultra HD resolution output",
      "22+ Free Photo Tools (analyzer, optimizer)"
    ],
    pricingDetails: "$4.99 (5 credits) | Subscriptions from $19.99/mo",
    integrations: ["LinkedIn", "Google Business", "Team dashboards"]
  },
  {
    name: "Mixels.ai",
    description: "AI pixel art generator and online studio that creates game-ready, grid-perfect 8-bit assets, characters, and backgrounds in seconds.",
    url: "https://mixels.ai/",
    category: "Image Generation",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=mixels.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fmixels.ai%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-24",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    },
    features: [
      "Text-to-Pixel Art generation",
      "Photo-to-Pixel conversion",
      "Full browser-based pixel editor (Aseprite alternative)",
      "Background removal and asset management",
      "Embedded metadata for game engines"
    ],
    pricingDetails: "Free (10 credits) | Pro: $12.95/mo | Studio: $99.95/mo"
},
{
    name: "EmailVerify.ai",
    description: "Verify emails in real-time with 99.9% accuracy. Now called BillionVerify.",
    url: "https://emailverify.ai",
    category: "Copywriting",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=emailverify.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Femailverify.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-25",
    features: [
      "Real-time email verification with 99.9% accuracy",
      "MCP Server for Claude and Cursor integration",
      "Disposable and role-based email detection",
      "Spam trap detection and catch-all verification",
      "Bulk email verification for lists"
    ],
    pricingDetails: "Free tier available | Paid plans for volume",
    integrations: ["HubSpot", "Salesforce", "Mailchimp", "Zapier", "Make", "LangChain"]
},
{
    name: "Stageflow.ai",
    description: "AI-Powered Product Photography for Online Sellers",
    url: "https://Stageflow.ai",
    category: "Image Generation",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=Stageflow.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2FStageflow.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-26",
    features: [
      "AI product lifestyle photo generation",
      "Scene styles: studio, lifestyle, outdoor, minimalist",
      "Auto-upscaling to 2000+ pixels for marketplaces",
      "Iterative editing and refinement tools",
      "Reference image support for style matching"
    ],
    pricingDetails: "Free to try",
    integrations: ["Etsy", "Marketplace platforms"]
  },
  {
    name: "Oneprofile",
    description: "An affordable Customer Data Platform (CDP) that unifies customer profiles and syncs data across tools without engineering resources.",
    url: "https://getoneprofile.com",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=getoneprofile.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fgetoneprofile.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-27",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    },
    features: [
      "Identity Resolution across multiple platforms",
      "Tool-to-Tool Sync (e.g., Stripe to Intercom)",
      "User Segmentation and behavioral triggers",
      "REST API access for Enterprise plans",
      "100+ native integrations"
    ],
    pricingDetails: "Free (100k syncs) | Team: $100/mo | Enterprise: $2,000/mo",
    integrations: ["Stripe", "Intercom", "Segment", "HubSpot"]
},
  {
    name: "PDFSeek",
    description: "AI-powered document assistant that enables users to chat with PDFs, generate summaries, and translate documents with citations.",
    url: "https://www.pdfseek.com",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "https://www.google.com/s2/favicons?domain=www.pdfseek.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.pdfseek.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-28",
    features: [
      "AI Translation for multi-language documents",
      "Multi-file Chat and folder organization",
      "Side-by-side verification view",
      "Academic and professional research assistance",
      "Built-in citation management"
    ],
    pricingDetails: "Free to use"
},
  {
    name: "Eleidon",
    description: "The identity layer for agentic email, providing cryptographic signing and verification to prevent fraud in AI agent communications.",
    url: "https://eleidon.com",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=eleidon.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Feleidon.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-23",
    features: [
      "Cryptographic signing of outbound agent emails",
      "Confidence scores for inbound email verification",
      "Comprehensive Audit Trail for agent actions",
      "REST API and TypeScript/Python SDKs",
      "MCP Server for Claude/Cursor integration"
    ],
    pricingDetails: "Signing is Free | Verifications: Free (100/mo) | Paid from $9/mo",
    integrations: ["Claude", "Cursor", "TypeScript", "Python", "REST API"]
},
  {
    name: "ChampSignal",
    description: "Competitive intelligence suite for B2B SaaS that monitors competitors across websites, ads, news, and SEO with AI filtering.",
    url: "https://champsignal.com",
    category: "Copywriting",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=champsignal.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fchampsignal.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-24",
    features: [
      "AI-Filtered Alerts for relevant competitor changes",
      "Champ AI Agent for deep competitor analysis",
      "Google and Meta Ad tracking",
      "Competitor Finder API for discovery integration",
      "Email and Slack notifications"
    ],
    pricingDetails: "14-day Free Trial | Focused: $39/mo | Competitive: $99/mo",
    integrations: ["Slack", "REST API", "Email"]
},
  {
    name: "GreatCompany.ai",
    description: "AI Visibility Platform (GEO) that monitors and optimizes how your business appears in AI search engines like ChatGPT and Gemini.",
    url: "https://GreatCompany.ai",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=GreatCompany.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2FGreatCompany.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-25",
    maker: {
        name: "Alex Freas",
        role: "Software Engineer",
        twitter: "alex_freas",
        image: "https://unavatar.io/twitter/alex_freas"
    },
    features: [
      "Technical GEO (Generative Engine Optimization) Audits",
      "Visibility testing for specific AI prompts",
      "Website AI readability scans",
      "Competitor AI visibility tracking",
      "AI Crawler access management"
    ],
    pricingDetails: "Free: 25-page scan | Pro: €39/mo for daily monitoring"
},
  {
    name: "Reply Champion",
    description: "AI-powered Google review management platform for small businesses that automates personalized, context-aware responses and drives new review growth.",
    url: "https://www.replychampion.com",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "Personalized AI Replies: Context-aware responses that avoid generic templates",
      "Review Request Campaigns: Automated email flows to solicit new customer feedback",
      "Multilingual Support: Native-level detection and response in 50+ languages",
      "Industry Safeguards: Built-in ethical screening for HIPAA and legal compliance",
      "Live Reviews Widget: Free snippet to embed real-time Google reviews on any site"
    ],
    pricingDetails: "Starts at 0/mo | 7-day Free Trial (No credit card)",
    integrations: ["Google Business Profile", "Web Widgets"],
    image: "/screenshots/reply-champion.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.replychampion.com&screenshot=true&meta=false&embed=screenshot.url",
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
    description: "Privacy-first encrypted camera app for iOS that captures photos and videos with military-grade security that even Apple can't access.",
    url: "https://encamera.app",
    category: "Video & Audio",
    tags: { price: "Paid" },
    features: [
      "Instant Encryption: Media is secured before touching the device camera roll",
      "Zero-Knowledge Storage: Local or iCloud storage with no developer access",
      "Stealth Mode: Disguise secure albums or hide the app icon entirely",
      "Secure Content Import: Encrypt and move existing files from standard library",
      "Biometric Security: Multi-factor unlock via Face ID, PIN, or password"
    ],
    pricingDetails: "Monthly and Annual Subscriptions | Free to start",
    integrations: ["iCloud", "iOS Widgets", "Face ID"],
    image: "/screenshots/encamera.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fencamera.app&screenshot=true&meta=false&embed=screenshot.url",
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
    description: "AI-powered real estate analysis platform that helps residential investors quickly identify and underwrite profitable investment opportunities.",
    url: "https://Resideline.com",
    category: "Productivity",
    tags: { price: "Free" },
    features: [
      "Automated Valuation Models (AVM) for instant ARV estimates",
      "Market Rent Analysis for buy-and-hold residential strategy",
      "Deal-Level ROI Forecasting with automated underwriting",
      "Property data aggregation for residential off-market hunting"
    ],
    pricingDetails: "Free Access",
    integrations: ["Property Data Feeds"],
    image: "/screenshots/resideline.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2FResideline.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-18"
},
  {
    name: "Applytrackr",
    description: "AI job search OS that automates resume tailoring, tracks applications across boards, and finds recruiter contact info in seconds.",
    url: "https://www.applytrackr.com/",
    category: "Productivity",
    tags: { price: "Freemium" },
    features: [
      "ATS Resume Tailoring: Matches resumes to job descriptions with scoring",
      "Automated App Tracking: Captures job data from any board via extension",
      "Recruiter Finder: Automatically retrieves verified email addresses",
      "One-Click Auto-Fill for repetitive application forms",
      "AI Cover Letter Generator tailored to specific role requirements"
    ],
    pricingDetails: "Free Tier | Pro Plan available",
    integrations: ["Chrome Extension", "LinkedIn", "Job Boards"],
    image: "/screenshots/applytrackr.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.applytrackr.com%2F&screenshot=true&meta=false&embed=screenshot.url",
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
    description: "Missed call recovery platform for local service businesses that uses AI to automate SMS follow-ups and capture lost leads instantly.",
    url: "https://uselino.com/",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "Autonomous Missed Call Detection and instant SMS response",
      "Lead Capture automation for plumbers, HVAC, and service trades",
      "Two-way AI conversation to qualify and book appointments",
      "Revenue Recovery dashboard tracking saved leads"
    ],
    pricingDetails: "Paid Subscription",
    integrations: ["Twilio", "Google Business Profile", "CRM Connectors"],
    image: "/screenshots/lino.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fuselino.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-20"
},
  {
    name: "HighReach",
    description: "AI creative studio that generates ready-to-run video, image, and UGC-style ads for social platforms directly from a product link.",
    url: "https://highreach.ai",
    category: "Video & Audio",
    tags: { price: "Paid" },
    features: [
      "Link-to-Ad: Pulls product data from Shopify/Amazon for instant ad generation",
      "AI UGC Avatars: Diverse digital presenters for testimonial-style content",
      "Studio Photo Generator: Transforms raw photos into high-end lifestyle shots",
      "Auto-Captions: Social-optimized subtitles in 75+ languages",
      "Batch Ad Production for rapid multi-creative testing"
    ],
    pricingDetails: "Starter: 9/mo | Pro: 9/mo | Ultra: 49/mo | 7-day Trial",
    integrations: ["Shopify", "Amazon", "Meta", "TikTok", "Google", "YouTube"],
    image: "/screenshots/highreach.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fhighreach.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-21"
},
  {
    name: "Ayudo",
    description: "Agentic customer support platform that automates complex queries and end-to-end resolutions using a workforce of AI agents.",
    url: "https://www.ayudo.ai",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "Agentic Workflows: AI-led management of complex support flows",
      "Omnichannel Inbox: Unified support across WhatsApp, Slack, and Discord",
      "Real-Time Knowledge Sync: Pulls data from G-Drive, PDFs, and URLs",
      "Insight Agent: Surface hidden patterns and knowledge gaps automatically",
      "Human-Agent Copilot: Proactive reply suggestions for human teams"
    ],
    pricingDetails: "Demo-based (Custom Enterprise plans)",
    integrations: ["Zendesk", "Salesforce", "Intercom", "Twilio", "Slack"],
    image: "/screenshots/ayudo.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.ayudo.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-22"
},
  {
    name: "LinkPilot",
    description: "AI LinkedIn content system that researches authority gaps and writes voice-matched posts based on competitor intelligence.",
    url: "https://link-pilot.com",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "/screenshots/linkpilot.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Flink-pilot.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-16",
    features: [
      "Voice-Matched AI writing system",
      "30-day authority gap content planner",
      "Competitor content tracking",
      "Outcome-focused analytics (leads vs vanity)",
      "REST API access for Pro/Agency tiers"
    ],
    pricingDetails: "Free (10 credits) | Solo: $29/mo | Pro: $79/mo | Agency: $199/mo",
    integrations: ["LinkedIn", "REST API"]
},
  {
    name: "Stick Audio",
    description: "Natural AI text-to-speech platform featuring unlimited voice cloning and high-quality API access for developers.",
    url: "https://stick.audio",
    category: "Video & Audio",
    tags: {
        price: "Freemium"
        },
    image: "/screenshots/stick-audio.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fstick.audio&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-17",
    features: [
      "Unlimited Voice Cloning",
      "Natural-sounding AI voices",
      "Pay-as-you-go credit system",
      "REST API with Node.js/Python examples",
      "Bulk audio generation"
    ],
    pricingDetails: "Free (2k chars) | Starter: $10 | Creator: $20 | Pro: $50",
    integrations: ["REST API", "Node.js", "Python"]
},
  {
    name: "DensOps",
    description: "Local business lead generation tool using natural language search to build pinpoint accurate prospecting lists.",
    url: "https://densops.com",
    category: "Marketing",
    tags: {
        price: "Paid"
        },
    image: "/screenshots/densops.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fdensops.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-18",
    features: [
      "Natural Language Search (e.g. 'plumbers in Miami')",
      "Auto-enrichment of emails, phones, and socials",
      "One-click CSV export for CRM import",
      "Pay-once model (no subscriptions)",
      "Verified local business data"
    ],
    pricingDetails: "Free (1 search) | Unlock Forever: €9 (5 searches) | Top-up packs"
},
  {
    name: "PNGtoSTL",
    description: "Specialized 2D to 3D converter for turning PNG/JPG images into 3D-printable STL files.",
    url: "https://pngtostl.xyz",
    category: "Productivity",
    tags: {
        price: "Free"
        },
    image: "/screenshots/pngtostl.png",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fpngtostl.xyz&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-19",
    features: [
      "Image-to-3D model conversion",
      "Heightmap and depth generation",
      "Basic 3D model adjustments",
      "STL file export for 3D printing",
      "Browser-based tool"
    ],
    pricingDetails: "Free to use"
},
{
    name: "Octopost.ai",
    description: "AI-powered social media scheduling platform centralizing workflows across FB, IG, LinkedIn, TikTok, and YouTube.",
    url: "https://octopost.ai",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=octopost.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Foctopost.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-20",
    features: [
      "Schedule across 8 platforms simultaneously",
      "AI Content Studio for captions",
      "REST API and media library",
      "MCP integration for AI agents",
      "OpenClaw autonomous agent support"
    ],
    pricingDetails: "Free forever tier available",
    integrations: ["Meta", "Instagram", "TikTok", "LinkedIn", "X", "YouTube", "Pinterest"]
  },
{
    name: "Bridgecall",
    description: "Browser-based real-time voice translation tool for multilingual calls via a simple link.",
    url: "https://bridgecall.app",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=bridgecall.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fbridgecall.app&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-21",
    features: [
      "Real-time video call translation",
      "One-link instant join (no app required)",
      "Translated voice and live subtitles",
      "50+ languages supported",
      "Group call translation"
    ],
    pricingDetails: "Free: 30 min | Starter: $19/mo | Pro: $49/mo"
  },
{
    name: "Levl",
    description: "Gamification platform for content creators that turns videos and articles into seasonal competitions with AI challenges.",
    url: "https://getlevl.ai",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=getlevl.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fgetlevl.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-22",
    features: [
      "Seasonal leaderboards and XP systems",
      "AI-generated daily/weekly challenges",
      "Subscriber retention and engagement tools",
      "Content consumption tracking",
      "Transaction-based revenue share"
    ],
    pricingDetails: "No monthly fees | 10% transaction fee (5% for early signups)"
  },
{
    name: "GreenPT",
    description: "Privacy-focused AI assistant (Frida) designed with a minimal carbon footprint and EU hosting.",
    url: "https://greenpt.nl/frida",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=greenpt.nl&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fgreenpt.nl%2Ffrida&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-16",
    features: [
      "Landscaping/Green industry specialized AI (Frida)",
      "Automated quoting from photos",
      "Project planning and customer CRM",
      "GDPR compliant, EU-hosted infrastructure",
      "40% lower CO2 than hyperscale AI"
    ],
    pricingDetails: "Free | Individual: €49.99/mo | Pro: €149.99/mo",
    integrations: ["WordPress", "Slack", "WhatsApp", "Discord", "Shopify"]
  },
{
    name: "iMeett",
    description: "Private AI meeting assistant that transcribes, summarizes, and organizes conversations directly into your Google Drive.",
    url: "https://app.imeett.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    features: [
      "Chat with Meetings: AI-powered Q&A based on meeting transcripts",
      "Telegram Command Center: Summaries and meeting management via Telegram",
      "Persona Modes: Tailors summaries for specific roles (HR, Sales, Legal, etc.)",
      "Two-Tier Summaries: Provides a quick scan followed by a detailed breakdown",
      "99+ Language Support: Automatic detection of the spoken language"
    ],
    pricingDetails: "Essentials: .99 one-time | Growth: 2.99/mo | Freedom: 2.99/mo",
    integrations: ["Google Drive", "Telegram", "Zoom", "Any video platform"],
    image: "https://www.google.com/s2/favicons?domain=app.imeett.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fapp.imeett.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-09"
  },
{
    name: "Webcomparis",
    description: "AI-powered technical, SEO, and design audit tool for comparing up to five websites simultaneously to identify market gaps.",
    url: "https://www.webcomparis.com",
    category: "Marketing",
    tags: { price: "Freemium" },
    features: [
      "Multi-Site Comparison: Audit up to 5 websites side-by-side",
      "AI Technical SEO Audit: Deep scans for rendering and indexing issues",
      "Competitive Benchmarking: Map your features against industry leaders",
      "Professional PDF Reports: White-labeled audits for client presentations"
    ],
    pricingDetails: "Freemium",
    integrations: ["SEO Tools"],
    image: "https://www.google.com/s2/favicons?domain=www.webcomparis.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.webcomparis.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-10"
  },
{
    name: "PathwiseAI",
    description: "AI-driven career platform (now Corveno) that automates the job search journey from resume scoring to salary negotiation.",
    url: "https://www.pathwiseai.io/",
    category: "Productivity",
    tags: { price: "Freemium" },
    features: [
      "Resume Lab: AI scoring and ATS optimization bank",
      "Interview Prep: Mock questions and STAR story bank builder",
      "LinkedIn Studio: Profile optimization and headline generation",
      "Salary & Offers: Offer comparison tools and negotiation scripts"
    ],
    pricingDetails: "Free (5 credits) | Paid from /mo |  per doc",
    integrations: ["LinkedIn", "Common App"],
    image: "https://www.google.com/s2/favicons?domain=www.pathwiseai.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.pathwiseai.io%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-11"
  },
{
    name: "TransGull",
    description: "Contextual AI translation for live speech, images, and videos with desktop apps for seamless simultaneous interpretation.",
    url: "https://transgull.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    features: [
      "Simultaneous Interpretation: Real-time recognition for meetings and lectures",
      "Video Translation: Generates bilingual subtitles for local or web video",
      "Image Translation: High-quality OCR and inference for vertical/complex text",
      "Dialog Translation: Context-aware voice and text for natural flow"
    ],
    pricingDetails: "Pay-as-you-go (Shells) | Credits never expire",
    integrations: ["Windows", "Mac", "YouTube"],
    image: "https://www.google.com/s2/favicons?domain=transgull.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ftransgull.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-12"
  },
{
    name: "Watchflow",
    description: "Infrastructure monitoring suite for SSL certificates, scheduled heartbeat jobs, and API schema changes.",
    url: "https://watchflow.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    features: [
      "SSL Monitoring: Auto-detects self-renewing certs and new subdomains",
      "Heartbeat Monitoring: Dead man's switch for cron jobs and ETL pipelines",
      "API Monitoring: Tracks response times and breaking schema changes",
      "Native Automation: Drag-and-drop modules for Make.com and n8n",
      "Custom Metrics: Track specific business data points in real-time"
    ],
    pricingDetails: "Free until May 2026 | Starter: 9/mo | Pro: 9/mo",
    integrations: ["Slack", "Teams", "Webhooks", "Make.com", "n8n", "Power Automate"],
    image: "https://www.google.com/s2/favicons?domain=watchflow.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwatchflow.io&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-13"
  },
{
    name: "TicketsData",
    description: "Real-time ticket inventory and pricing API across major marketplaces for arbitrage and analytics.",
    url: "https://ticketsdata.com",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "Real-Time Data: Instant seatmaps and availability without stale caching",
      "10+ Marketplaces: Ticketmaster, StubHub, SeatGeek, VividSeats, and more",
      "Arbitrage Intelligence: Identifies price spreads across markets",
      "Developer SDKs: Ready-to-use libraries for Python, Node.js, Go, and PHP"
    ],
    pricingDetails: "Starter: 99/mo | Pro: ,499/mo",
    integrations: ["Ticketmaster", "StubHub", "Eventbrite", "SeatGeek", "Viagogo"],
    image: "https://www.google.com/s2/favicons?domain=ticketsdata.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fticketsdata.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-15"
  },
{
    name: "71vote",
    description: "AI decision-making platform where 20+ specialized AI experts debate your dilemmas in real-time using structured methods.",
    url: "https://www.71vote.com",
    category: "Productivity",
    tags: { price: "Free" },
    features: [
      "AI Expert Panels: Debate with Doctors, Dietitians, or Business Strategists",
      "Structured Methods: Socratic, Red/Blue Team, and Pre-mortem analysis",
      "Real-time Debate: Watch agents discuss multiple perspectives on your query",
      "Decision Archiving: Track the logic behind your major life and work choices"
    ],
    pricingDetails: "Free Access",
    integrations: [],
    image: "https://www.google.com/s2/favicons?domain=www.71vote.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.71vote.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-09"
  },
{
    name: "PrivatClaw",
    description: "Fully managed OpenClaw hosting service on dedicated VPS infrastructure for high-security autonomous AI assistants.",
    url: "https://privatclaw.com",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "Dedicated VPS: Every instance runs on its own isolated virtual server",
      "Managed Hosting: Automated updates, security hardening, and backups",
      "Omnichannel Access: Connect to Telegram, WhatsApp, Discord, and Slack",
      "Proactive Agents: 24/7 autonomous agents that browse and manage files"
    ],
    pricingDetails: "Paid Managed Hosting",
    integrations: ["Telegram", "WhatsApp", "Discord", "Slack"],
    image: "https://www.google.com/s2/favicons?domain=privatclaw.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fprivatclaw.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-10"
  },
{
    name: "PagerSync",
    description: "Syncs PagerDuty on-call rosters with Slack User Groups to ensure alerts reach the right person instantly.",
    url: "https://www.pagersync.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    features: [
      "Slack Group Sync: Automatically updates @oncall aliases in Slack",
      "Multi-Team Aliases: Create aliases that span multiple engineering teams",
      "Rotation Announcements: Auto-post updates when rotations change",
      "Multi-Schedule Support: Link multiple PagerDuty schedules to one alias"
    ],
    pricingDetails: "Premium: 5/mo | 7-day Free Trial",
    integrations: ["PagerDuty", "Slack", "xMatters"],
    image: "https://www.google.com/s2/favicons?domain=www.pagersync.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.pagersync.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-11"
  },
{
    name: "Polyform",
    description: "AI-powered form builder that creates beautiful, intelligent forms with branching logic via natural language.",
    url: "https://polyform.to",
    category: "Productivity",
    tags: { price: "Free" },
    features: [
      "Polly AI Agent: Build and edit forms through a simple chat interface",
      "Conditional Logic: Create dynamic branching paths based on responses",
      "Real-time Collaboration: Instant syncing and team chat for builders",
      "Journey Tracking: Visualize respondent interaction and drop-off points"
    ],
    pricingDetails: "Free (Unlimited forms) | Pro: 9/mo (AI features)",
    integrations: ["Zapier", "Slack", "Google Sheets", "HubSpot", "Webhooks"],
    image: "https://www.google.com/s2/favicons?domain=polyform.to&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fpolyform.to&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-12"
  },
{
    name: "Status Central",
    description: "Multi-source status aggregation platform for real-time service monitoring across cloud providers and critical infrastructure.",
    url: "https://www.statuscentral.io/",
    category: "Productivity",
    tags: { price: "Free" },
    features: [
      "Status Aggregation: Consolidates multiple provider status pages into one",
      "Branded Status Pages: Create public status pages for your own users",
      "Cloud Monitoring: Real-time tracking for AWS, Azure, and Google Cloud",
      "Incident Timelines: Detailed impact analysis and post-mortem logs"
    ],
    pricingDetails: "Free (5 services) | Pro: 9/mo",
    integrations: ["AWS", "Azure", "Google Cloud", "SaaS Status Pages"],
    image: "https://www.google.com/s2/favicons?domain=www.statuscentral.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.statuscentral.io%2F&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-13"
  },
{
    name: "MiroMiro",
    description: "Extracts code, assets, and design tokens from any website for instant use in Cursor, Claude, and Tailwind projects.",
    url: "https://miromiro.app",
    category: "Code Assistance",
    tags: { price: "Freemium" },
    features: [
      "Tailwind Export: Converts any web element into clean Tailwind HTML",
      "Asset Extractor: One-click download for SVGs, images, and Lottie files",
      "Design System Scan: Pulls colors and fonts into a config file",
      "Lottie Detection: Instant preview and download of web animations"
    ],
    pricingDetails: "Pro: €9.5/mo | Lifetime: €99 | 24h Free Trial",
    integrations: ["Cursor", "Claude", "Lovable", "Bolt", "v0"],
    image: "https://www.google.com/s2/favicons?domain=miromiro.app&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fmiromiro.app&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-14"
  },
{
    name: "Traidies",
    description: "Converts plain-English trading ideas into automated MQL5 bots and Expert Advisors in seconds.",
    url: "https://www.traidies.com",
    category: "Code Assistance",
    tags: { price: "Freemium" },
    features: [
      "AI Strategy Parser: Converts trading talk into precise MQL5 code",
      "Expert Advisor Generation: Production-ready bots for MetaTrader 5",
      "Automated Backtesting: Instant historical testing of generated strategies",
      "Pine Script Conversion: Turn TradingView scripts into MT5 bots"
    ],
    pricingDetails: "Free to start",
    integrations: ["MetaTrader 5", "MQL5"],
    image: "https://www.google.com/s2/favicons?domain=www.traidies.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.traidies.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-15"
  },
{
    name: "SecVibe",
    description: "AI-powered security copilot for vibe coding, detecting and fixing risks in applications developed with AI assistants.",
    url: "https://secvibe.ai",
    category: "Code Assistance",
    tags: { price: "Freemium" },
    features: [
      "Specialized Detection: Identifies risks unique to AI-generated code",
      "Real-Time Analysis: Continuous monitoring as you code in Cursor",
      "Context-Aware Controls: Adaptive security that adjusts to your stack",
      "Intelligent Auto-Fix: Contextual remediation for detected vulnerabilities"
    ],
    pricingDetails: "Waitlist (Early Access)",
    integrations: ["Cursor", "VS Code", "SAST tools"],
    image: "https://www.google.com/s2/favicons?domain=secvibe.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fsecvibe.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-06"
  },
{
    name: "Alignmint",
    description: "All-in-one nonprofit accounting and management platform combining fund accounting, donor CRM, and volunteer tracking.",
    url: "https://www.getalignmint.org",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "True Fund Accounting: Restricted funds, grants, and Form 990 reports",
      "Donor CRM: Self-service portals and automated receipting",
      "Minty AI: Assistant that answers questions about your organization data",
      "Volunteer Tracking: Manage hours, skills, and background checks"
    ],
    pricingDetails: "Free Plan available | Contact for custom quotes",
    integrations: ["Bank feeds", "Online Payments"],
    image: "https://www.google.com/s2/favicons?domain=www.getalignmint.org&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.getalignmint.org&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-07"
  },
{
    name: "Glad AI",
    description: "Automated LinkedIn content assistant that learns your voice to generate authentic posts and visuals.",
    url: "https://iamglad.ai",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=iamglad.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fiamglad.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-09",
    features: [
      "Voice learning from websites/blogs",
      "AI post generation and formatting",
      "Predictive scheduling and analytics",
      "On-brand visual generation",
      "AI Text Humanizer utility"
    ],
    pricingDetails: "Free (15 credits) | Starter: $29/mo | Authority: $89/mo"
  },
{
    name: "Organic Pilot",
    description: "Automates organic traffic growth by planning, writing, and publishing SEO-optimized content with backlink building.",
    url: "https://www.organicpilot.ai",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.organicpilot.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.organicpilot.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-02",
    features: [
      "30-day AI-generated content plans",
      "Direct publishing to WordPress/Webflow",
      "Automated backlink building",
      "SEO article editor",
      "API and Webhook integration for teams"
    ],
    pricingDetails: "Free entry | Paid plans for scale",
    integrations: ["WordPress", "Webflow", "REST API", "Webhooks"]
  },
{
    name: "maptrics",
    description: "SEO monitoring and health scoring platform that detects broken meta tags and explains traffic changes in plain language.",
    url: "https://www.maptrics.io",
    category: "Marketing",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=www.maptrics.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fwww.maptrics.io&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-03",
    features: [
      "SEO Health Score monitoring",
      "Plain-language traffic change analysis",
      "Sitemap discovery and validation",
      "Broken Meta/OG tag detection",
      "Webhook integration (Vercel supported)"
    ],
    pricingDetails: "Free forever for small sites",
    integrations: ["Vercel", "Webhooks", "Google Search Console"]
  },
{
    name: "LLMWISE",
    description: "Management platform for LLM prompts and models with cost optimization, A/B testing, and performance tracking.",
    url: "https://llmwise.ai",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=llmwise.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fllmwise.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-04",
    features: [
      "Prompt Versioning and A/B testing",
      "Unified Cost Monitoring across providers",
      "Blind evaluation (Judge mode)",
      "Smart Routing for performance/cost",
      "REST API and SDK for integration"
    ],
    pricingDetails: "Free/Hobby tier | Pro: ~$25/mo",
    integrations: ["OpenAI", "Anthropic", "Google Gemini", "REST API"]
  },
{
    name: "Transmit",
    description: "Email infrastructure for transactional and marketing messages with 99.2% inbox placement and AI-powered deliverability tools.",
    url: "https://xmit.sh",
    category: "Productivity",
    tags: { price: "Paid" },
    features: [
      "Deliverability Suite: Domain warmup, validation, and reputation isolation",
      "AI Composer: Design emails by describing them in plain text",
      "BYOK Mode: Bring your own AWS account for full infrastructure control",
      "MCP Server: Manage campaigns directly from Cursor or Claude"
    ],
    pricingDetails: "Managed: /mo | BYOK: /usr/bin/bash-49/mo + AWS costs",
    integrations: ["AWS SES", "Claude", "Cursor", "Clerk", "Auth0"],
    image: "https://www.google.com/s2/favicons?domain=xmit.sh&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fxmit.sh&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-02-05"
  },
{
    name: "Docutracker",
    description: "Document tracking and e-signature platform that provides real-time engagement analytics to optimize sales follow-ups.",
    url: "https://docutracker.io",
    category: "Productivity",
    tags: {
        price: "Freemium"
        },
    image: "https://www.google.com/s2/favicons?domain=docutracker.io&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Fdocutracker.io&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-01-20",
    features: [
      "Real-time open and read notifications",
      "Page-level time spent analytics",
      "Integrated E-Signatures",
      "Document templates and management",
      "CRM integration for teams"
    ],
    pricingDetails: "Free (3 docs) | Starter: $15/mo | Business: $25/mo"
  },
{
    name: "URL Genius",
    description: "Deep linking and QR code platform that opens mobile apps directly to increase conversion rates for social and ad campaigns.",
    url: "https://urlgenius.com",
    category: "Marketing",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=urlgenius.com&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Furlgenius.com&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-04-25",
    features: [
      "App-to-App deep linking (IG, Amazon, YouTube)",
      "Branded short links and custom domains",
      "Dynamic QR code generator",
      "Detailed click and conversion analytics",
      "Programmatic API for link creation"
    ],
    pricingDetails: "Free basic links | Pro starts at $10/mo + Pay-per-click",
    integrations: ["Instagram", "Amazon", "YouTube", "REST API"]
},
{
    name: "TextHuman",
    description: "AI text humanizer that rewrites generated content to bypass detection tools while maintaining natural readability.",
    url: "https://texthuman.ai",
    category: "Copywriting",
    tags: {
        price: "Paid"
        },
    image: "https://www.google.com/s2/favicons?domain=texthuman.ai&sz=128",
        screenshot: "https://api.microlink.io?url=https%3A%2F%2Ftexthuman.ai&screenshot=true&meta=false&embed=screenshot.url",
    dateAdded: "2026-04-25",
    features: [
      "AI Detection Bypass (GPTZero, Originality.ai)",
      "Tone and style adjustment",
      "Natural readability preservation",
      "Bulk processing support",
      "Multi-language humanization"
    ],
    pricingDetails: "Starts at $10/mo | Credit-based options available"
  }
];