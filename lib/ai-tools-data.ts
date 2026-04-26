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
    name: "BlazeHive",
    description: "BlazeHive is an AI SEO agent that automates your entire content and search strategy - the same approach that's grown real websites past 100,000 monthly visitors. Point it at a single URL and it handles everything: keyword research, humanized content with custom diagrams, SEO validation, and automatic publishing to your CMS - every day, without you lifting a finger. 1- How it works BlazeHive starts by analyzing your URL to understand your niche, audience, and competitive landscape. It then identifies high-value keyword opportunities - from long-tail informational queries to bottom-funnel commercial terms - and builds a content roadmap designed to compound over time. Every piece of content is written to read like a human wrote it, enriched with custom diagrams and structured for both search engines and AI answer engines from the ground up. Before anything goes live, BlazeHive validates each page against on-page SEO best practices: proper heading structure, internal linking, meta data, semantic relevance, and topical authority signals. Once approved, it publishes automatically to your CMS on a daily cadence, building a growing library of search-optimized pages that work for you around the clock. 2- Built for Google and AI search Search is changing. Ranking on Google still matters, but increasingly, buyers are getting answers directly from AI tools like ChatGPT, Perplexity, and Google's AI Overviews. BlazeHive is built for both. Its content strategy targets traditional search rankings while structuring content in a way that gets cited by AI answer engines - giving your brand compounding visibility across every surface where your audience is searching. No agency. No content team. No bottleneck. Traditional SEO agencies charge $3,000\u2013$10,000 per month and take weeks to ship content. Hiring a content team adds overhead, management time, and inconsistency. BlazeHive replaces both - delivering enterprise-level SEO output at a fraction of the cost, with zero coordination required on your end. 3- Works with your existing stack BlazeHive integrates natively with WordPress, Ghost, Strapi, Webflow, Framer, Contentful, and Storyblok - so there's no migration, no new infrastructure, and no disruption to your current workflow. It plugs in and starts publishing. Whether you're a solo founder trying to compete with funded competitors, a",
    url: "https://www.blazehive.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.blazehive.io&sz=128",
    screenshot: "/screenshots/blazehive.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PropFirmCorner",
    description: "PropFirmCorner is a futures prop trading research platform that helps traders compare firms by rules, payouts, pricing, platforms, and discounts. It combines editorial reviews, side-by-side comparisons, and practical calculators to make prop firm selection easier.",
    url: "https://propfirmcorner.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=propfirmcorner.com&sz=128",
    screenshot: "/screenshots/propfirmcorner.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PipBack",
    description: "PipBack is a futures-only platform that helps traders compare prop firms, find live discounts, and manage the full journey from evaluation purchase to payout tracking. It also includes trader tools like firm recommendations, evaluation planning, and platform monitoring.",
    url: "https://pipback.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pipback.com&sz=128",
    screenshot: "/screenshots/pipback.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AlohaGo",
    description: "AlohaGo creates personalized, day-by-day Oahu itineraries tailored to your budget, travel style, personal preferences, and pace. Each plan includes daily maps, pace ratings, and downloadable guides, so you always know what to expect.",
    url: "https://alohago.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=alohago.ai&sz=128",
    screenshot: "/screenshots/alohago.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "IT Jobs Careers",
    description: "IT Jobs and 2,000+ Internships in Business, Finance, IT and Science",
    url: "https://www.itjobscareers.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.itjobscareers.com&sz=128",
    screenshot: "/screenshots/it-jobs-careers.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "KraflIO",
    description: "KraflIO is an AI LinkedIn post generator that captures your unique voice. Send a topic, image, PDF, or YouTube URL via Telegram, WhatsApp, or web \u2014 get a publication-ready LinkedIn post that sounds like you, not like AI.",
    url: "https://kraflio.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=kraflio.com&sz=128",
    screenshot: "/screenshots/kraflio.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "NoClick, Inc.",
    description: "Full-stack AI Automation Platform",
    url: "https://www.noclick.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.noclick.com&sz=128",
    screenshot: "/screenshots/noclick,-inc-.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LexDraft AI",
    description: "LexDraft AI",
    url: "https://lexdraft.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=lexdraft.ai&sz=128",
    screenshot: "/screenshots/lexdraft-ai.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AimLive AI",
    description: "AimLive is an AI-powered SaaS platform for self-discovery, relationships, and decision-making. It combines personality diagnostics with a system of six specialized AI agents: a Psychologist-Typologist, Goal Coach, Strategist, Dating Advisor, Relationship Harmonizer, and a Concierge Guide. Each conversation is personalized based on your psychological type, helping you better understand yourself, improve relationships, and make clearer decisions. Start for free, with optional premium features.",
    url: "https://Aimlive.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=Aimlive.ai&sz=128",
    screenshot: "/screenshots/aimlive-ai.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Creastor",
    description: "Sell digital products, courses, and coaching directly from your social media bio \u2014 no website needed.",
    url: "https://creastor.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=creastor.com&sz=128",
    screenshot: "/screenshots/creastor.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Algomizer",
    description: "Algomizer helps businesses achieve top rankings in AI search results.",
    url: "https://algomizer.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=algomizer.com&sz=128",
    screenshot: "/screenshots/algomizer.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "https://www.paddlerspick.com",
    description: "PaddlersPick is a pickleball gear review and education site built for beginners and intermediate players who want honest, practical guidance on equipment choices. Unlike sites run by expert reviewers or generic affiliate farms, PaddlersPick is written from the perspective of real beginner players learning the sport in real time \u2014 which means every recommendation is grounded in what actually matters for someone new to pickleball. The site covers the core gear decisions every pickleball player faces: choosing a paddle that matches their skill level and playing style, finding court shoes that provide proper support and traction, and picking the right bag, balls, and accessories for casual play or tournaments. Our content organizes recommendations by budget tier, skill level, and play style, making it easy for new players to find gear that fits their specific situation without being overwhelmed by technical jargon. What sets PaddlersPick apart: Beginner-focused perspective. Most pickleball content assumes reader knowledge that beginners don't have. We break down technical differences in plain language and explain why specific features matter for new players. Real playing experience. Our recommendations come from actually playing pickleball weekly, not just reading spec sheets. We include insights on how paddles and shoes actually feel during play, not just their marketing claims. Honest comparisons. When two products are genuinely similar, we say so. When one is clearly better for a specific use case, we explain why. No fluff, no exaggerated claims. Budget-conscious guidance. Pickleball gear ranges from $30 starter sets to $300+ premium paddles. We help readers understand what they actually need versus what's marketing hype.",
    url: "https://www.paddlerspick.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.paddlerspick.com&sz=128",
    screenshot: "/screenshots/https://www-paddlerspick-com.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "MVPLAB AI",
    description: "MVPLab.ai is an AI solutions agency that helps founders, product teams, and enterprises turn AI ideas into shipped products. We specialize in MVP development, AI automation, and AI consulting with a focus on building real systems that work in production, not demos that break the moment a user touches them. Our team combines 10+ years of senior SRE and platform engineering experience (AWS, Kubernetes, Terraform, GitOps) with deep expertise in frontier AI models, agent architectures, and LLM application development. That combination matters. Most AI agencies can prototype. Very few can take an AI product from zero to a reliable, observable, scalable service that a business can actually depend on. We are also AI researchers who work for AI safety. What we build: AI MVPs End-to-end product development for founders who need to validate an AI idea quickly. We handle architecture, model selection, frontend, backend, infrastructure, and deployment. Typical timeline: 4 to 8 weeks from kickoff to live product. AI Automation Custom workflows that replace manual operational work. Think document processing pipelines, customer support agents, research assistants, internal copilots, and data extraction systems built on top of Claude and other frontier models. AI Consulting Strategic and technical guidance for teams adopting AI. We help you pick the right models, design evaluation pipelines, set up observability, and avoid the expensive mistakes that come from treating LLMs like traditional software. Why teams work with us: We bring hands-on experience with AI across agents, tool use, RAG, fine-tuning, and production deployment patterns. We also publish independent research on model reliability and chain-of-thought faithfulness, which means we understand how these systems actually behave under load, not just how they look in marketing demos. Our founder has shipped multiple AI-powered SaaS products, including VoiceBrief.io and ResearchAudio.io, and brings a builder-first mindset to every engagement. We write code, we ship fast, and we are accountable for outcomes.",
    url: "https://mvplab.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=mvplab.ai&sz=128",
    screenshot: "/screenshots/mvplab-ai.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Pixelco",
    description: "Pixelco identifies both companies and individual visitors on your website \u2014 turning anonymous traffic into real emails, leads, and revenue.",
    url: "https://pixelco.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pixelco.io&sz=128",
    screenshot: "/screenshots/pixelco.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "cvoice.ai",
    description: "cvoice.ai is a 100% free and unlimited AI voice generator that lets users create high-quality voiceovers in 90+ languages.",
    url: "https://cvoice.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=cvoice.ai&sz=128",
    screenshot: "/screenshots/cvoice-ai.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "RepoRank",
    description: "Discover trending GitHub repos and products.",
    url: "https://reporank.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=reporank.co&sz=128",
    screenshot: "/screenshots/reporank.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "HUSL",
    description: "HUSL.io is a free, all-in-one mobile app for independent Australian hairdressers and beauty professionals to manage appointments, access wholesale products, and generate income through product dropshipping without holding inventory.",
    url: "https://husl.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=husl.io&sz=128",
    screenshot: "/screenshots/husl.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Brand Tracker by Conjointly",
    description: "Brand Tracker by Conjointly is an automated, enterprise-grade brand tracking solution that delivers sophisticated brand health and competitive metrics without the legacy overhead. Brand Tracker by Conjointly changes this model with automated, enterprise-grade tracking at a fraction of traditional costs. No bloat, no hidden costs, no multi-month delays.",
    url: "https://brandtracker.conjointly.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=brandtracker.conjointly.com&sz=128",
    screenshot: "/screenshots/brand-tracker-by-conjointly.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "mFax",
    description: "MFAX \u2014 online fax service that lets you send and receive faxes from any device, no hardware needed. Works via web, email, and API.",
    url: "https://mfax.to",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=mfax.to&sz=128",
    screenshot: "/screenshots/mfax.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Hi-Ai",
    description: "$5/month - AI Videos, music, voice, images, 3D, web search, news and reports.",
    url: "https://www.hi-ai.live",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.hi-ai.live&sz=128",
    screenshot: "/screenshots/hi-ai.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Meshes",
    description: "Every SaaS team builds the same integration code. Your signup event needs to reach HubSpot. Your payment failure needs to alert Salesforce. Your cancellation needs to trigger Intercom. So engineering teams write custom handlers, add retry logic, debug silent failures at 3am, and maintain it all forever \u2014 for every new destination, on every new product feature. Meshes replaces that entire layer. Emit one product event through the Meshes SDK or REST API, and we route it to every connected destination simultaneously \u2014 with automatic retries (exponential backoff + jitter), idempotent delivery, dead letter queues, and full event replay. Your app owns the product logic. Meshes owns the delivery machinery around it. Integrations include HubSpot, Salesforce, Intercom, Mailchimp, ActiveCampaign, SendGrid, Slack, Discord, Resend, Zoom, AWeber, MailerLite, and custom webhooks with HMAC signing and configurable auth schemes. **Built for multi-tenant SaaS.** Each customer, environment, or region gets an isolated workspace with its own connections, rules, credentials, and limits. OAuth tokens, API keys, and refresh cycles are handled per workspace so tenant boundaries stay clean \u2014 no more hand-rolled credential plumbing scattered across tables, flags, and env vars. **Embeddable customer workspaces.** White-label integration UIs let your users connect, configure, and monitor their own integrations directly inside your product. Mint a session, mount the launch URL in an iframe, and your customers get a full integration experience under your brand. JWT-based auth with claims-based permissions. **Not a workflow automation tool.** Meshes is infrastructure underneath tools like Zapier, n8n, or Make \u2014 not a replacement for them. Use it when you need reliable delivery guarantees, per-tenant isolation, and observability that visual workflow builders can't provide.",
    url: "https://meshes.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=meshes.io&sz=128",
    screenshot: "/screenshots/meshes.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "DevShip",
    description: "It started pretty simply: I was tired of the tools we were using to manage development work. Most were either way too heavy, too expensive as teams grew, or required stitching together a bunch of different apps just to run projects. So I built something simpler. DevShip is a workspace for engineering teams to manage work end-to-end: \u26a1 Track issues (bugs, features, tasks) \u23f1 Log time directly against work \ud83d\udcac Comment and collaborate with your team \ud83d\udce5 Triage incoming requests \ud83d\udc65 Manage team roles and access \ud83e\uddd1\u200d\ud83d\udcbb Let clients submit and track work \ud83d\udcca Export reports when you need them It\u2019s designed mainly for: \u2022 small dev teams \u2022 indie developers \u2022 agencies working with clients Basically teams that want a simple place to run projects without the usual tool sprawl.",
    url: "https://dev-ship.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=dev-ship.com&sz=128",
    screenshot: "/screenshots/devship.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "FlameProxies",
    description: "Premium proxies for scraping, ad verification, and research \u2014 fast, reliable, and secure.",
    url: "https://flameproxies.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=flameproxies.com&sz=128",
    screenshot: "/screenshots/flameproxies.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Expressify Ai",
    description: "24/7 AI-powered lead capture and customer service assistant built for service companies to respond to inquiries and book jobs automatically.",
    url: "https://www.expressify.ai",
    category: "Marketing",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.expressify.ai&sz=128",
    screenshot: "/screenshots/expressify-ai.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "Instant 24/7 lead response via chat and email",
      "Automated appointment booking and lead qualification",
      "Human-in-the-loop support for complex inquiries",
      "Multi-channel integration for service businesses"

    ]
  },
  {
    name: "shepi",
    description: "shepi",
    url: "https://shepi.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=shepi.ai&sz=128",
    screenshot: "/screenshots/shepi.webp",
    dateAdded: "2026-04-26",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "RFP Quest",
    description: "RFP software and RFP platform for UK teams. AI-powered bid writing, tender discovery, and proposal management to win more contracts. Our RFP platform is revolutionizing how UK businesses respond to tenders. From automated tender discovery to AI-powered bid writing, we're the complete RFP management platform that helps you win more contracts.",
    url: "https://rfp.quest",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=rfp.quest&sz=128",
    screenshot: "/screenshots/rfp-quest.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Idle Pilot",
    description: "Idle Pilot",
    url: "https://idlepilot.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=idlepilot.com&sz=128",
    screenshot: "/screenshots/idle-pilot.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Acira AI",
    description: "Your website, live in 10 minutes \u2014 updated in 10 seconds. Acira AI is the AI-powered website builder that asks the right questions first so your site launches with real content, not placeholder fluff. Just chat with our AI (or send an email!) and watch your professional website come to life. No coding. No drag-and-drop headaches. No technical skills needed. Get automatic translation in 64+ languages, built-in SEO tools, Google Search rank tracking, an AI chatbot for your visitors, and more. Start for free \u2014 not a trial, a real website with hosting, analytics, and contact forms included.",
    url: "https://www.acira.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.acira.ai&sz=128",
    screenshot: "/screenshots/acira-ai.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ArchGee",
    description: "ArchGee \u2014 The job platform built for architects and designers. AI-curated roles in architecture, interior design, landscape, BIM, and sustainability \u2014 all in one place.",
    url: "https://archgee.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=archgee.com&sz=128",
    screenshot: "/screenshots/archgee.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "emailfinder.dev",
    description: "emailfinder.dev",
    url: "https://www.emailfinder.dev",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.emailfinder.dev&sz=128",
    screenshot: "/screenshots/emailfinder-dev.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Celebranker",
    description: "Rate & Review your favorite celebrities",
    url: "https://celebranker.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=celebranker.com&sz=128",
    screenshot: "/screenshots/celebranker.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Ai Viral",
    description: "Aiviral is an all-in-one B2B AI lead generation SaaS designed to help businesses find, engage, and convert prospects faster than ever. Built for modern sales teams, agencies, and founders, Aiviral allows users to target any niche or industry and instantly generate fresh, high-quality leads tailored to their ideal customer profile. With its intelligent data engine, Aiviral continuously sources and updates lead information, ensuring you always have access to relevant and actionable contacts. Users can refine their search based on industry, job title, company size, location, and more\u2014making hyper-targeted prospecting simple and efficient. Beyond lead generation, Aiviral streamlines the entire outreach process. You can connect your email accounts directly within the platform and launch personalized cold email campaigns at scale. Its built-in AI sales email writer crafts compelling, human-like messages optimized for higher open and reply rates, saving hours of manual work while improving performance. Aiviral also enables automation of follow-ups, campaign scheduling, and inbox management, helping you nurture leads without missing opportunities. Whether you're running outbound campaigns, building partnerships, or scaling your client acquisition, Aiviral gives you the tools to execute faster with less effort. Designed with simplicity and scalability in mind, Aiviral eliminates the need for multiple tools by combining lead sourcing, enrichment, and outreach into a single platform. It empowers teams to focus on closing deals instead of spending time on repetitive tasks. If you're looking to grow your pipeline, increase conversions, and modernize your outbound strategy, Aiviral is your complete AI-powered sales growth engine.",
    url: "https://aiviral.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=aiviral.com&sz=128",
    screenshot: "/screenshots/ai-viral.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PeopleDB",
    description: "PeopleDB is a pay-per-lookup contact enrichment API. Pass in a LinkedIn or GitHub identifier and get back verified emails, phone numbers, and social profiles.",
    url: "https://peopledb.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=peopledb.co&sz=128",
    screenshot: "/screenshots/peopledb.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Pause",
    description: "Interrupt scrolling, tab overload, and AI autopilot",
    url: "https://pause.do",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pause.do&sz=128",
    screenshot: "/screenshots/pause.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Schemity",
    description: "Schemity is a native desktop ERD tool built for software engineers who need a fast, reliable way to design and document database schemas without the friction of cloud-based tools. Most ERD tools are either too primitive for real-world schema work or bloated with features you never use. Schemity sits in the middle: powerful enough for complex schemas, lightweight enough to install in seconds at just 9MB. It connects directly to PostgreSQL, MySQL, and SQL Server, reverse-engineering your existing database into a visual diagram instantly. From there, you have full control over the canvas. Relationship lines are freely routable, tables are freely positionable, and nothing is locked behind an auto-layout algorithm you cannot override. Key features include offline-first architecture, plain JSON schema storage, no account or internet connection required, N:N relationship support with automatic intermediate table generation, and one-time pricing with no subscription. Schemity is designed around how engineers actually think. You can organize your diagram to reflect domain boundaries, focus on specific areas of a large schema, and use keyboard-driven interactions to move fast. The schema file is plain JSON, so it lives in your repository alongside your code. It runs on Windows, macOS, and Linux, installs in under a minute, and does not require a cloud account or ongoing subscription. You pay once and own it. If you have spent time fighting with tools that are too limited, too slow, or require you to be online just to open a diagram, Schemity was built for you.",
    url: "https://schemity.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=schemity.com&sz=128",
    screenshot: "/screenshots/schemity.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Primefirms",
    description: "Primefirms",
    url: "https://www.primefirms.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.primefirms.co&sz=128",
    screenshot: "/screenshots/primefirms.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Credyt",
    description: "Billing infrastructure for AI products. Meter usage in real time, charge per token or call, and ship wallets and credit top-ups without building it yourself.",
    url: "https://credyt.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=credyt.ai&sz=128",
    screenshot: "/screenshots/credyt.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "WhiteClover",
    description: "WhiteClover is the all-in-one wedding planning platform built for modern couples. Create your wedding website, manage your guest list, send RSVP invitations via SMS & email, arrange your seating chart, and share photos \u2014 all from one place. No more spreadsheets, no more chasing guests. WhiteClover keeps everything organised so you can focus on what truly matters: your big day.",
    url: "https://whiteclover.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=whiteclover.io&sz=128",
    screenshot: "/screenshots/whiteclover.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Portrait Gift",
    description: "Turn your favorite photo into a custom portrait masterpiece, printed on canvas or delivered digitally. A unique, personalized gift made to surprise and impress.",
    url: "https://www.portraitgift.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.portraitgift.com&sz=128",
    screenshot: "/screenshots/portrait-gift.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Admark Go",
    description: "Admark Go is your on-demand agency for e-commerce. Forget expensive retainers or generic AI tools. Simply enter your store URL. In max 15 minutes, real marketing pros in the background deliver a ready-to-publish, on-brand post with design and strong copy. Thanks to human-in-the-loop, we guarantee absolute agency quality without annoying AI fluff. Flexible, lightning-fast, and with zero subscriptions.",
    url: "https://go.admark.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=go.admark.ai&sz=128",
    screenshot: "/screenshots/admark-go.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "RPC Fast",
    description: "RPC Fast is a Solana RPC SaaS built for teams that compete on speed. It serves HFT traders, AI trading agents, MEV bots, wallets, aggregators, DeFi apps, indexers, and analytics platforms that need faster access to Solana data and more reliable transaction delivery. The product is positioned for operators whose revenue depends on milliseconds, with messaging focused on detecting events sooner, propagating transactions faster, and maintaining stable inclusion in competitive blocks. What makes RPC Fast different is its focus on execution, not only access. Many providers sell \u201cRPC\u201d as a generic API endpoint. RPC Fast packages the parts serious Solana teams usually need to assemble themselves: JSON-RPC for reads and writes, WebSocket subscriptions for reactive updates, Yellowstone gRPC for structured validator-level streaming, Shredstream gRPC for lower-latency visibility, and Aperture gRPC for more advanced execution-sensitive workflows. The result is a single stack designed for products where speed, consistency, and real-time data flow matter more than cheap shared access. The platform is built around measurable performance claims. On its site, RPC Fast highlights under-20ms end-to-end actionable latency, sub-100ms signal delivery, 99.9% consistent data propagation, stable p95 and p99 behavior under pressure, and priority routing aimed at stronger same-block consistency during volatility. It also emphasizes tuned bare-metal infrastructure, leader-aware routing, and validator-connected pathways rather than generic cloud-first positioning. For Solana teams running latency-sensitive strategies, this framing is far more relevant than broad claims about throughput alone. RPC Fast is especially relevant for systems built around live event ingestion. Its documentation explains that gRPC streaming is best suited for high-frequency trading, real-time arbitrage engines, MEV systems, large-scale indexing, analytics pipelines, and applications handling thousands of updates per second. It also outlines why this matters: gRPC reduces JSON overhead, supports advanced filtering, and delivers structured data with lower latency and higher throughput than simpler polling or lightweight subscription patterns.",
    url: "https://rpcfast.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=rpcfast.com&sz=128",
    screenshot: "/screenshots/rpc-fast.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Frozen Security",
    description: "The physical private key",
    url: "https://frozensecurity.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=frozensecurity.com&sz=128",
    screenshot: "/screenshots/frozen-security.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SocialFinder",
    description: "AI-powered reverse face search \u2014 find anyone's dating profiles, OnlyFans, Instagram, TikTok and hidden social media accounts from just a photo. The best PimEyes and Social Catfish alternative.",
    url: "https://socialfinder.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=socialfinder.ai&sz=128",
    screenshot: "/screenshots/socialfinder.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Autopilot",
    description: "Autopilot is an all-in-one field service management and CRM platform that helps home service businesses run operations, manage calls and texts, and automate marketing from one place.",
    url: "https://autopilotapp.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=autopilotapp.io&sz=128",
    screenshot: "/screenshots/autopilot.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Speak Pro: Shadowing Lessons",
    description: "What is the app about? Speak Pro is an iOS language learning app designed to help you improve your speaking skills in English, Spanish, German, Dutch, French, Italian, and Portuguese. It uses the shadowing method with YouTube videos, turning them into speaking lessons. The app is primarily designed for learners from B1 level who already understand a language but want to speak more fluently and naturally. Speak Pro helps you activate your vocabulary. After 1 week practice for 15 minutes of record you will be speak much fluently. Speak Pro breaks video into sentence segments. This allows you to repeat each phrase without pausing or rewinding. Built around active speaking practice. How to use it? You listen to a sentence, repeat it after the speaker, and record your own version. Then you receive feedback on your pronunciation, helping you understand how closely you match the original. You can practice in short sessions, even 10\u201315 minutes a day is enough to see progress. You can use Speak Pro for free if you don\u2019t need pronunciation feedback. If you want deeper improvement, feedback helps you refine your accent and sound more natural. You can record for free up to 3 minutes per day with feedback. You can also save your favourite phrases and revisit them later, which is especially useful for practicing difficult or important expressions. What content does Speak Pro use? Speak Pro uses YouTube videos as learning material. There are already around 1,000+ lessons available, covering a wide range of topics and speaking styles. You can also add your own videos, for example, scenes from movies, vlogs, TED Talks, interviews, or educational content. What is the shadowing method? The shadowing method is a scientifically proven language learning technique used for decades, including in interpreter training. It involves listening to a native speaker and repeating what they say almost immediately, trying to match their pronunciation, rhythm, and intonation. Here\u2019s how it works step by step: 1. Listen to a short phrase 2. Repeat it right after the speaker 3. Try to match pronunciation and rhythm 4. Record yourself 5. Compare and improve This method train \u201cspeaking muscle memory,\u201d making it easier to speak automatically in real conversations. Regular YouTube is not ideal for shadowing because sentences are often too long, and you can only skip forward in fixed intervals",
    url: "https://speakpro.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=speakpro.app&sz=128",
    screenshot: "/screenshots/speak-pro:-shadowing-lessons.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SignalBoss",
    description: "SignalBoss is a Telegram bot that backtests trading signals against real market data. Forward any signal, get a detailed profit/loss report in 30 seconds.",
    url: "https://www.signalboss.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.signalboss.io&sz=128",
    screenshot: "/screenshots/signalboss.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Glasscribe",
    description: "Glasscribe is a macOS menu bar app for real-time speech-to-text transcription. 100% on-device, 22+ languages, live translation \u2014 your voice never leaves your Mac.",
    url: "https://glasscribe.toolab.dev",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=glasscribe.toolab.dev&sz=128",
    screenshot: "/screenshots/glasscribe.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "InstaRadar",
    description: "InstaRadar shows you what Instagram hides. See any public profile's followers and followings in chronological order, watch stories without appearing in the viewer list, and get alerts the moment they follow someone new.",
    url: "https://www.instaradar.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.instaradar.app&sz=128",
    screenshot: "/screenshots/instaradar.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "athletedata",
    description: "Your AI endurance coach that reaches out first",
    url: "https://athletedata.health",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=athletedata.health&sz=128",
    screenshot: "/screenshots/athletedata.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Mental Note",
    description: "MentalNote is a Microsoft Word add-in that generates structured clinical notes: SOAP, DAP, BIRP, and other therapy documentation formats in seconds, helping mental health professionals spend less time on paperwork and more time with clients.",
    url: "https://mentalnote.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=mentalnote.ai&sz=128",
    screenshot: "/screenshots/mental-note.webp",
    dateAdded: "2026-04-19",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Orbbit",
    description: "A platform for PMMs to track competitors, and for sales teams to find, qualify, and engage high-intent prospects.",
    url: "https://www.orbbit.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.orbbit.io&sz=128",
    screenshot: "/screenshots/orbbit.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Extralt",
    description: "Most ecommerce data is locked inside walled gardens or filtered through merchant feeds. Sellers report what they want you to see. Extralt gets what's actually there. We extract structured product data from any ecommerce site, normalize it to a universal schema, and match the same product across sellers. Four stages: Extract crawls sites and produces consistent structured data. Enrich translates to English, classifies with the Shopify taxonomy, pulls out category-specific attributes, and matches products across sellers. Extend finds the same product on different sites, surfaces alternatives, and links complements. Explore lets you search, compare prices, and run analytics across everything. You pay for Extract and Enrich. Extend and Explore are free. We built the extraction engine because scraping ecommerce is a maintenance nightmare. Traditional scrapers break when sites change layout. AI scrapers adapt but cost too much to run on every page. So we use AI once to generate each crawler, compile it to Rust, and run native code from there. Fast, nothing to maintain. Today, teams use it for competitor pricing, MAP compliance, catalog benchmarking, market research, and building data products on our API. Over time, AI agents will need this data too. Checkout protocols like OpenAI's ACP and Google's UCP handle how agents pay for things, but both only see products from merchants who submit feeds. The rest of the web is invisible to them. Extralt covers that. Independent product discovery from the open web, not merchant self-reporting.",
    url: "https://extralt.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=extralt.com&sz=128",
    screenshot: "/screenshots/extralt.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "TradeTab",
    description: "Mobile invoicing and payment platform designed for tradespeople to send professional estimates and invoices in seconds from the job site.",
    url: "https://tradetab.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=tradetab.co&sz=128",
    screenshot: "/screenshots/tradetab.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "Rapid 30-second mobile invoice creation",
      "AI-powered line item and pricing suggestions",
      "Integrated online payments for faster collection",
      "Job documentation with photo attachments"

    ]
  },
  {
    name: "Atomic Edge",
    description: "AtomicEdge delivers enterprise-grade WAF protection without the complexity of legacy tools. Deploy one-click OWASP rules, block AI bots/scrapers in real time, and apply granular protection per page/URI (rate limiting, CAPTCHA, geo-blocking, and more). Key differentiators: AI real-time threat detection | Block AI scrapers | Per-URI protection (independent controls) | WordPress-optimized rulesets | Real-time attack logs | Free tier (no credit card required).",
    url: "https://atomicedge.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=atomicedge.io&sz=128",
    screenshot: "/screenshots/atomic-edge.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PolyTest",
    description: "PolyTest is a Polymarket backtesting API that lets traders replay historical orderbooks and test trading strategies on crypto prediction markets.",
    url: "https://polytest.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=polytest.io&sz=128",
    screenshot: "/screenshots/polytest.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Kiqo",
    description: "An AI learning companion for K\u20135 that answers kids\u2019 questions in real time and gives parents clear insight into how they\u2019re learning.",
    url: "https://www.kiqo.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.kiqo.ai&sz=128",
    screenshot: "/screenshots/kiqo.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Furnea",
    description: "Furnea helps furniture and home decor brands turn product photos into realistic room scenes, visuals and videos for e commerce and marketing.",
    url: "https://furnea.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=furnea.ai&sz=128",
    screenshot: "/screenshots/furnea.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "TornadoAPI",
    description: "Tornado API is a bulk YouTube & Spotify download API \u2014 no rate limits, no \"Sign in to confirm you're not a bot\" errors. Built in Rust with direct cloud export to S3, GCS, and Azure at zero egress fees.",
    url: "https://tornadoapi.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=tornadoapi.io&sz=128",
    screenshot: "/screenshots/tornadoapi.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Datamagnet",
    description: "Datamagnet is a developer-first, real-time data infrastructure platform designed to provide structured, continuously updated people and company intelligence at web scale. It primarily targets SaaS platforms, revenue teams, and data-driven applications that require high-quality enrichment, monitoring, and signal-based automation. At its core, Datamagnet operates as a high-performance API layer that transforms unstructured web data\u2014particularly from professional networks such as LinkedIn\u2014into normalized, machine-readable JSON objects. The platform supports both on-demand enrichment and event-driven workflows, enabling systems to fetch or receive updates about individuals and organizations in near real time. Its architecture emphasizes low-latency responses (sub-200ms) and high availability, making it suitable for production-grade applications with strict performance requirements. A key technical capability of Datamagnet is real-time enrichment. Given an identifier such as a LinkedIn URL, the API resolves and returns structured attributes including professional metadata, company details, activity signals, and engagement data. This enrichment pipeline is optimized for high match rates and consistent schema output, allowing seamless ingestion into CRMs, analytics systems, or downstream data pipelines. The platform also introduces a signals-based data layer, which streams actionable events such as job changes, funding rounds, hiring spikes, and content activity. These signals are delivered via flexible mechanisms including REST APIs, polling endpoints, and webhook subscriptions. This event-driven design enables customers to build reactive systems\u2014for example, triggering outbound sales workflows when a decision-maker changes roles or when a company raises funding.",
    url: "https://www.datamagnet.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.datamagnet.co&sz=128",
    screenshot: "/screenshots/datamagnet.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Pond",
    description: "Pond is building the Amazon for applications to support funding and distribution.",
    url: "https://joinpond.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=joinpond.ai&sz=128",
    screenshot: "/screenshots/pond.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Market Ontology",
    description: "Market Ontology is an institutional\u2011grade macro, monetary\u2011policy and geopolitical intelligence platform. It synthesizes macro, markets and geopolitical data into a decision\u2011support platform aimed at analysts, portfolio managers and serious investors. It tracks central bank policy, recession\u2011probability models, cross\u2011asset flows, options analytics, AI\u2011driven scenario analysis and geopolitical risk monitoring.",
    url: "https://marketontology.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=marketontology.com&sz=128",
    screenshot: "/screenshots/market-ontology.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SaneBar",
    description: "SaneBar helps Mac users hide, organize, and instantly find menu bar icons without losing control of their desktop. It\u2019s a privacy-first Bartender alternative with Touch ID lock, smart triggers, and no subscription.",
    url: "https://SaneBar.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=SaneBar.com&sz=128",
    screenshot: "/screenshots/sanebar.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "1App Energy Ltd",
    description: "Stops Octopus EV charging from draining your home battery and wasting cheap energy.",
    url: "https://1app.energy",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=1app.energy&sz=128",
    screenshot: "/screenshots/1app-energy-ltd.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Blinknote",
    description: "Share long text as a clean link instead of flooding chats.",
    url: "https://blinknote.me",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=blinknote.me&sz=128",
    screenshot: "/screenshots/blinknote.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Cowork.ink",
    description: "\u0410, \u0447\u0451\u0440\u0442, \u043f\u043e\u043d\u044f\u043b \u2014 cowork.ink \u044d\u0442\u043e \u0441\u0432\u043e\u0439 \u043f\u0440\u043e\u0434\u0443\u043a\u0442, \u043d\u0435 \u0444\u043e\u0440\u043a OpenClaw. GoGogot \u2014 \u0432\u0430\u0448 open-source \u0434\u0432\u0438\u0436\u043e\u043a. \u041f\u0435\u0440\u0435\u043f\u0438\u0441\u044b\u0432\u0430\u044e: Fast, lightweight AI agent platform \u2014 open-source alternative to OpenClaw for $20/mo OpenClaw is cool, but it's heavy, local-only, and eats through your API budget. We built something different. cowork.ink is a fast, lightweight AI agent that runs in the cloud. Real browser, real file system, real code execution \u2014 without the setup pain. Powered by our own open-source engine GoGogot, not a fork of anything. Why people pick us over OpenClaw: $20/mo, everything included. All top AI models (Claude, DeepSeek, Gemini) bundled in. No API keys to manage, no token bills, no cost surprises. OpenClaw on your own hardware? That's $1,600+ in month one. Lightweight and fast. No bloated desktop app eating your RAM. Your agent runs on an isolated cloud machine \u2014 your laptop stays clean. 60-second deploy. No Mac Mini, no Docker, no config files. Sign up, describe your task, done. Zero maintenance. We handle servers, updates, uptime, model routing. You handle your business. Full agent capabilities: real browser that searches, fills forms, extracts data. Works with any file \u2014 CSV, PDF, images, spreadsheets. Sends emails, schedules meetings, writes and runs code. Persistent memory across sessions. Cron-like scheduled tasks that run while you sleep. Built for teams, not just solo use. Admin panel with roles, container isolation, scales to 200 agents per node, 1-minute Kubernetes deployment. Enterprise security without enterprise complexity. 100% open-source. GoGogot is our engine \u2014 every line on GitHub. No telemetry, no black boxes. Self-host for free or let us run it for you. 6 ready-made roles: Customer Support, Personal Assistant, Content Writer, Data Analyst, DevOps Engineer, Bookkeeper \u2014 pre-configured and ready to go.",
    url: "https://Cowork.ink",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=Cowork.ink&sz=128",
    screenshot: "/screenshots/cowork-ink.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Alcazar Security",
    description: "Dead Man\u2019s Switch keeps encrypted messages and files for people you trust. You check in on a schedule you set; reminders go to email, Signal, or Telegram if you miss one; when your grace period ends with no reply, only then does each contact get what you prepared for them.",
    url: "https://alcazarsec.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=alcazarsec.com&sz=128",
    screenshot: "/screenshots/alcazar-security.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Availsim",
    description: "Availsim",
    url: "https://www.availsim.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.availsim.com&sz=128",
    screenshot: "/screenshots/availsim.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ValidateFast",
    description: "ValidateFast gives you the complete validation loop build your page, reach your audience, and read the signals that tell you whether to build or pivot.",
    url: "https://validatefast.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=validatefast.co&sz=128",
    screenshot: "/screenshots/validatefast.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Berrys AI",
    description: "Berrys is a workflow-native creative infrastructure that eliminates inconsistencies by embedding \"Brand Memory\" directly into the AI generation loop. It empowers high-growth commerce brands to scale on-brand content production, turning raw product assets into high-performing marketing posts in minutes.",
    url: "https://berrys.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=berrys.io&sz=128",
    screenshot: "/screenshots/berrys-ai.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Reppit AI",
    description: "Reppit AI is a Reddit marketing tool that helps founders find and engage warm leads by scoring posts by buying intent.",
    url: "https://reppit.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=reppit.ai&sz=128",
    screenshot: "/screenshots/reppit-ai.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "jsonyaml",
    description: "A comprehensive collection of online tools designed for developers, DevOps engineers, and data professionals. Convert, validate, format, and manipulate data with our growing suite of developer utilities including JSON, YAML, Cron expressions, regular expressions, encoding, hashing, and more.",
    url: "https://jsonyaml.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=jsonyaml.com&sz=128",
    screenshot: "/screenshots/jsonyaml.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "VoiceBrief.io",
    description: "VoiceBrief is an AI-powered study platform that converts PDF documents or notes into engaging audio learning experiences. Students, researchers, and professionals upload any PDF and instantly get natural-sounding audio narration, AI-generated summaries, interactive podcasts, and study tools, all designed to help people learn faster by listening. The core problem VoiceBrief solves is simple: reading is slow, and most people don't have time to sit with a 300-page textbook. VoiceBrief lets you listen to your study materials while commuting, exercising, or doing chores, turning dead time into study time. Unlike basic text-to-speech tools that robotically read text aloud, VoiceBrief uses GPT-4o to actually understand your documents. It extracts key concepts, generates concise summaries, and creates audio that emphasizes what matters. The result sounds like a professor explaining the material, not a robot reading it. Key features include Audio Narration: Upload any PDF and get natural AI-voiced audio with sentence-by-sentence text highlighting that follows along as you listen. Download as MP3 for offline listening. Variable speed from 0.5x to 2x. AI Summaries: Get intelligent summaries that capture the core ideas from any document, whether it's a research paper, textbook chapter, or business report. Voice Chat: Have real-time voice conversations with an AI tutor about your document. Ask questions, get explanations, and explore concepts through natural dialogue. It's like having a personal professor available 24/7. AI Podcasts (Coming Soon) Transform dry study materials into engaging two-host podcast-style audio discussions, similar to Google's NotebookLM but integrated into a complete study workflow.",
    url: "https://voicebrief.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=voicebrief.io&sz=128",
    screenshot: "/screenshots/voicebrief-io.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Integrateapi",
    description: "CLI toolkit for installing production-ready API integrations into your Next.js project in one command.",
    url: "https://integrateapi.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=integrateapi.io&sz=128",
    screenshot: "/screenshots/integrateapi.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Selected Site",
    description: "The useful web for founders and creators.",
    url: "https://selected.site",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=selected.site&sz=128",
    screenshot: "/screenshots/selected-site.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Product Metrics",
    description: "Product Metrics - Increase ROAS by 25% with AI Product Segmentation",
    url: "https://www.productmetrics.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.productmetrics.io&sz=128",
    screenshot: "/screenshots/product-metrics.webp",
    dateAdded: "2026-04-12",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ZeroGen",
    description: "ZeroGen is an all-in-one online platform for image generation and editing. Create high-quality visuals in seconds with powerful tools like editing, outpainting, background removal, and style re-rendering.",
    url: "https://zerogen.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=zerogen.io&sz=128",
    screenshot: "/screenshots/zerogen.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Norte Wallet Intelligence",
    description: "Norte reveals hidden benefits, credits, and coverage in your credit cards and insurance policies. AI reads the fine print so you don\u2019t have to. No bank login required.",
    url: "https://norteapp.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=norteapp.io&sz=128",
    screenshot: "/screenshots/norte-wallet-intelligence.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Yibby",
    description: "Yibby is an AI-powered gift discovery platform that matches gifts to relationships and emotions, so you can stop guessing and start gifting with intention.",
    url: "https://yibby.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=yibby.ai&sz=128",
    screenshot: "/screenshots/yibby.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "CareerMeasure",
    description: "CareerMeasure helps people understand what feels off in their current career, improve what is fixable, and explore better-fit career paths.",
    url: "https://careermeasure.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=careermeasure.com&sz=128",
    screenshot: "/screenshots/careermeasure.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AI Girlfriend WTF",
    description: "Meet your perfect AI companion \u2014 customize their look, personality, and vibe, then chat, flirt, and roleplay without limits. Available on web, iOS, and Android.",
    url: "https://www.aigirlfriend.wtf",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.aigirlfriend.wtf&sz=128",
    screenshot: "/screenshots/ai-girlfriend-wtf.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "CallCow AI",
    description: "CallCow.ai is an AI-powered phone agent that answers business calls, captures leads, and automates customer conversations \u2014 so businesses never miss an opportunity. Instead of sending callers to voicemail, CallCow responds instantly with a natural voice conversation and follows up with SMS text and web chat. CallCow is the simplest way to connect your business with AI voicemail and text followup. Businesses can connect their phone number, configure their call flow, and deploy their AI phone agent in minutes without needing technical knowledge. Once active, the AI works 24/7 to ensure every call is answered \u2014 even outside business hours. CallCow collects lead information for each call, generate summaries, transcripts, and captured lead data. With mulitple calendar and CRM integrations already and more on the way, CallCow is the perfect platform for handling more leads. Got inbound sales calls? AI answers, qualifies the lead, and books them on your calendar. Running a service business? Be available 24\u00d77 and handle calls without hiring more staff or paying for expensive call centers. Managing a sales team? Let AI schedule appointments so your reps focus on closing not admin work. Running ads for clients? Prove ROI by showing exactly how many calls converted into bookings. Dealing with no-shows? AI sends reminders and confirmations so more people actually show up. Every missed call is money lost. CallCow makes sure you never miss a call again.",
    url: "https://callcow.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=callcow.ai&sz=128",
    screenshot: "/screenshots/callcow-ai.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Preuve AI",
    description: "Validate your startup idea in 60 seconds. Real data, not vibes.",
    url: "https://preuve.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=preuve.ai&sz=128",
    screenshot: "/screenshots/preuve-ai.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "JobJourney",
    description: "JobJourney is an AI-powered job search platform that takes you from resume to offer - all in one place. Most job seekers spend hours tailoring resumes, writing cover letters, and preparing for interviews using 5+ different tools. And after all that work, 75% of resumes still get rejected by ATS systems before a human ever sees them. JobJourney solves this. Upload your resume, paste a job description, and our AI instantly tailors your resume - optimizing keywords, rewriting bullet points, and boosting your ATS score while keeping your authentic voice. All in 2 clicks. What you get: ATS Resume Scoring & Analysis - Get your ATS compatibility score instantly. Identify keyword gaps, formatting issues, and optimization opportunities that prevent your resume from getting past automated filters. AI Resume Tailoring - One-click resume customization for any job description. Our AI rewrites and optimizes your bullet points to match what employers are looking for, without losing what makes you unique.",
    url: "https://www.jobjourney.pro",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.jobjourney.pro&sz=128",
    screenshot: "/screenshots/jobjourney.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "FLAEX AI",
    description: "Flaex AI is a curated AI builder hub where teams, creators, and builders can discover, compare, and evaluate AI tools, agents, and MCP servers with more context, better insights, and smarter workflow fit.",
    url: "https://www.flaex.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.flaex.ai&sz=128",
    screenshot: "/screenshots/flaex-ai.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "UpAgents",
    description: "Upwork for AI Agents",
    url: "https://www.upagents.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.upagents.app&sz=128",
    screenshot: "/screenshots/upagents.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "T2M URL Shortener is an all-in-one link management platform to create branded short links, track clicks with analytics, and manage campaigns using custom domains, QR codes, and APIs.",
    description: "T2M URL Shortener is an all-in-one link management platform to create branded short links, track clicks with analytics, and manage campaigns using custom domains, QR codes, and APIs.",
    url: "https://t2mio.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=t2mio.com&sz=128",
    screenshot: "/screenshots/t2m-url-shortener-is-an-all-in-one-link-management-platform-to-create-branded-short-links,-track-clicks-with-analytics,-and-manage-campaigns-using-custom-domains,-qr-codes,-and-apis-.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Manusights",
    description: "ManuSights is pre-submission quality control for the AI manuscript era. We help researchers catch citation, claim, and journal-fit risks before submission through live verification, diagnostic scoring, and manuscript-level review. Our goal is to make scientific publishing more trustworthy as AI accelerates manuscript production",
    url: "https://manusights.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=manusights.com&sz=128",
    screenshot: "/screenshots/manusights.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Flare Warden",
    description: "FlareWarden detects your SSL, DNS, payment providers, CDNs, and 700+ other dependencies in under 2 minutes \u2014 then verifies from 6 continents so you stop finding out about outages from your customers.",
    url: "https://flarewarden.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=flarewarden.com&sz=128",
    screenshot: "/screenshots/flare-warden.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AppLaunchFlow",
    description: "AI-powered tool to generate App Store screenshots, promo videos, social graphics, and ASO copy in minutes.",
    url: "https://applaunchflow.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=applaunchflow.com&sz=128",
    screenshot: "/screenshots/applaunchflow.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Mokaru",
    description: "Mokaru is an AI-powered job search assistant that helps people find jobs faster and with less frustration. Instead of juggling job boards, resumes, and spreadsheets, Mokaru brings everything into one place so you can manage your entire job search in a simple and organized way. The platform helps users create professional, ATS-friendly resumes that are optimized for the specific jobs they apply to. By analyzing a job description, Mokaru highlights the most relevant keywords and helps tailor the resume so it better matches what recruiters and applicant tracking systems are looking for. This increases the chances that a resume actually gets seen instead of being filtered out automatically. Mokaru also acts as a personal job search hub. Users can save interesting job listings, track applications, keep notes about companies, and follow the progress of each opportunity from application to interview. Instead of losing track of where you applied or which recruiter contacted you, everything stays organized in one dashboard. Another key goal of Mokaru is to reduce the time and stress involved in job hunting. Applying for jobs can quickly turn into a repetitive and discouraging process. Mokaru simplifies this by helping users prepare faster, stay organized, and focus on the opportunities that matter most. The platform is designed for real job seekers who want practical help, not just generic advice. It focuses on tools that make the job search process clearer, faster, and more manageable. Whether someone is applying to their first job, changing careers, or simply exploring new opportunities, Mokaru helps them move through the process more efficiently. In short, Mokaru is a smart co-pilot for your job search. It helps you prepare stronger resumes, keep track of your applications, and approach the job market in a more structured and effective way.",
    url: "https://www.mokaru.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.mokaru.ai&sz=128",
    screenshot: "/screenshots/mokaru.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Konstruction Group Inc.",
    description: "Konstruction Group Inc is a professional construction company based in Toronto, Ontario, specializing in comprehensive building services for residential and commercial projects. With over 15 years of industry experience, the company has established itself as a trusted partner for builders, developers, and homeowners throughout the Greater Toronto Area. Core Services Rough Framing Services Custom home framing from foundation to roof Multiplex construction (duplexes, triplexes, fourplexes) Garden suites and laneway houses Renovation framing and additions Metal stud framing (CFS) systems SIP panels for energy-efficient construction Structural Steel & Welding Moment frames and rigid connections Steel fabrication and custom structural steel I-beam and H-beam supply and installation Steel column installation Professional MIG, TIG, and stick welding Insulation Services Spray foam insulation (open and closed cell) Batt insulation (fiberglass and mineral wool) Attic insulation for energy efficiency Soundproofing solutions Basement and ductwork insulation Drywall Services Drywall installation and supply Professional taping and finishing Level 4 and Level 5 paint-ready finishes Fireproofing and fire separation systems Engineering Services Metal stud shop drawings Steel detailing and fabrication drawings Value engineering for cost optimization Material takeoffs and cost estimation",
    url: "https://Toronto Construction Company",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=Toronto Construction Company&sz=128",
    screenshot: "/screenshots/konstruction-group-inc-.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "GoldMine AI",
    description: "GoldMineAI turns any startup idea into market intelligence, customer profiles, and qualified leads \u2014 so founders build with conviction, not hunches.",
    url: "https://goldmineai.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=goldmineai.io&sz=128",
    screenshot: "/screenshots/goldmine-ai.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PrivateClawd",
    description: "PrivateClawd lets you deploy private OpenClaw AI agents in under a minute that run 24/7 on dedicated cloud infrastructure with browser automation and messaging integrations.",
    url: "https://privateclawd.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=privateclawd.com&sz=128",
    screenshot: "/screenshots/privateclawd.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AppGen",
    description: "AppGen is an AI app builder that helps you create real mobile and web apps by simply describing your idea. It can generate your app\u2019s design, flows, authentication, database, and other core features, so you can go from concept to working product much faster. Unlike tools that only create demo apps, AppGen is built for real app creation and launch. You can instantly preview your app, refine it with AI, and prepare it for the App Store, Google Play, or the web.",
    url: "https://appgen.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=appgen.com&sz=128",
    screenshot: "/screenshots/appgen.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Top Coloring Pages",
    description: "AI Coloring Page Generator",
    url: "https://topcoloringpages.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=topcoloringpages.com&sz=128",
    screenshot: "/screenshots/top-coloring-pages.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Scalify.ai",
    description: "We just launched Scalify.ai \u2014 the world's first platform where you can order your own website in minutes. Think about that for a second. You can order food, clothes, furniture \u2014 anything \u2014 online in minutes. But getting a professional website built? That still means overpaying an agency that takes months to deliver, spending weeks hunting for the right freelancer on a marketplace, or struggling through a website builder with limited time and technical skills. Stressful, expensive, and unreliable. Getting a website built for your business is straight up painful. Until now. Scalify.ai is the world's first website ordering platform, where you can order your own website in under 10 minutes. You pick your industry, choose your website design, submit your order directly on Scalify.ai, and a professional, unique website for your business will be built with our advanced website creator, Scalify AI. No calls. No chasing. No back-and-forth. No waiting. Just order it. And boom, your website will be built.",
    url: "https://www.scalify.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.scalify.ai&sz=128",
    screenshot: "/screenshots/scalify-ai.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Clearmargin",
    description: "Freelancers and small teams don't have a billing problem \u2014 they have a juggling problem. One app for proposals, another for time tracking, a spreadsheet for expenses, a third tool for invoices, and maybe QuickBooks because someone said they should. Things slip through the cracks. An invoice goes out late. Hours don't get logged. A cost gets eaten because nobody tracked it. The mental overhead of keeping it all straight is exhausting. Clearmargin puts proposals, time tracking, expenses, invoicing, and payments in one place. Build professional proposals with scope, timeline, and pricing. Track time with a quick-entry strip or running timer. Log expenses and assign them to projects \u2014 or split shared costs like software subscriptions across multiple clients automatically. When it's time to bill, generate invoices from project data in one click. Accept credit card and ACH payments directly through your invoices via Stripe Connect at standard processing rates \u2014 no platform fees, no per-invoice charges, no revenue sharing. Clearmargin's subscription is all you pay us; client payments go straight to you. This isn't accounting software. There's no chart of accounts, no general ledger (unless you want to see it), no double-entry bookkeeping. If you signed up for QuickBooks because you thought you were supposed to, Clearmargin is the escape hatch. Import your clients and history in minutes and get back to the work that actually matters.",
    url: "https://www.clearmargin.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.clearmargin.app&sz=128",
    screenshot: "/screenshots/clearmargin.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Supapin",
    description: "Supapin scans your site, generates stunning pin designs, writes SEO-optimized descriptions, and schedules them automatically. All on autopilot.",
    url: "https://supapin.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=supapin.com&sz=128",
    screenshot: "/screenshots/supapin.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "RankDraft",
    description: "RankDraft is an AI content pipeline that crawls your competitors, analyzes the SERP, and produces research-backed first drafts scored across 8 quality dimensions. Nothing publishes without human approval. From keyword to scored draft in minutes, not hours. Free tier available.",
    url: "https://rankdraft.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=rankdraft.io&sz=128",
    screenshot: "/screenshots/rankdraft.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Henrik Lippke",
    description: "Scrapx lets you monitor websites for changes visually, track text updates, extract structured data, and get instant alerts.",
    url: "https://www.scrapx.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.scrapx.io&sz=128",
    screenshot: "/screenshots/henrik-lippke.webp",
    dateAdded: "2026-04-05",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "esotericAI",
    description: "esotericAI is an innovative platform that combines ancient esoteric wisdom with modern artificial intelligence technology. It offers users personalized tarot readings, cosmic blueprint natal chart decoding, and insights based on current celestial transits. Designed for individuals seeking spiritual guidance and self-discovery, esotericAI provides a seamless experience to explore their destiny and deepen their understanding of the universe. Features AI-Powered Tarot Readings: Leverage advanced AI algorithms to generate accurate and personalized tarot readings that resonate with users' current life situations, helping them gain clarity and direction. Natal Chart Decoding: Decode your cosmic blueprint with detailed natal chart analysis, revealing insights into personality, strengths, and life path based on your birth data. Cosmic Transits & Insights: Receive real-time updates and interpretations of current planetary transits, enabling users to understand how cosmic movements influence their lives. Destined Connection Portraits: Explore archetype portraits that depict your destined relationships and connections, fostering self-awareness and relationship understanding. Tarot Tales & Real-Life Resonance: Access engaging tarot stories that relate to everyday experiences, making esoteric wisdom accessible and applicable to daily life.",
    url: "https://esotericai.xyz",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=esotericai.xyz&sz=128",
    screenshot: "/screenshots/esotericai.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "CustomJS",
    description: "CustomJS is a platform for modern automation workflows. It allows you to generate PDFs from HTML templates, merge documents, capture high-resolution screenshots, host HTML pages and forms, and process incoming emails via Mailhooks. With CustomJS, collected form data or incoming emails can trigger workflows directly in n8n or Make, making automations seamless and efficient. The built-in form builder simplifies data collection, while Mailhooks enable processing of email content and attachments without extra infrastructure. The platform also provides lightweight static hosting for landing pages, dashboards, or AI-generated HTML tools. Combined with automated document generation and screenshot capabilities, CustomJS streamlines reporting, invoicing, dashboards, and other workflow-heavy tasks. Whether you need PDFs, email processing, dynamic forms, or automated screenshots, CustomJS extends your workflow platforms with powerful, ready-to-use capabilities.",
    url: "https://www.customjs.space",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.customjs.space&sz=128",
    screenshot: "/screenshots/customjs.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "elimu.dev",
    description: "ELIMU is an AI-powered learning workspace that transforms any study material\u2014PDFs, documents, slides, or URLs\u2014into instant study tools: summaries, flashcards, quizzes, and interactive lesson chat. Built for students and instructors who want to go from information overload to exam-ready confidence.",
    url: "https://elimu.dev",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=elimu.dev&sz=128",
    screenshot: "/screenshots/elimu-dev.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "DisplayDetails",
    description: "isplayDetails by CrownTV is a Samsung-authorized commercial display reseller offering indoor, high-brightness window, outdoor, and video wall screens in 32\"\u201398\" sizes with free nationwide shipping and volume pricing. Backed by 13+ years of digital signage expertise and 5,000+ screens deployed, DisplayDetails provides expert guidance, free CMS trials, and installation support for retail, corporate, hospitality, healthcare, and government clients.",
    url: "https://displaydetails.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=displaydetails.com&sz=128",
    screenshot: "/screenshots/displaydetails.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Send personalized bulk emails directly from your own email account. Fast, simple, and without hidden costs.",
    description: "Listmailer is a professional yet simple email solution designed for people who just want to send emails. It allows you to send personalized bulk emails directly using Outlook, Gmail, or any SMTP provider\u2014no new platform or confusing dashboards required. With ListMailer, you can safely reach your audience without triggering \u201cPromotions\u201d tabs, thanks to plain-text-style emails and a persistent global opt-out list that protects your reputation. Upload your contact list from CSV, Google Sheets, or Airtable, map variables for personalized messaging, and connect your preferred provider. Pay only for what you send and avoid per-contact fees or monthly SaaS traps. From small personal campaigns to larger business outreach, ListMailer offers flexible yearly pricing, unlimited emails, and high-speed sending with full SMTP freedom. Whether you\u2019re using Google Workspace, Microsoft 365, or high-performance SMTP providers like Amazon SES or Mailjet, ListMailer combines cost efficiency, simplicity, and reliability\u2014helping you focus on connecting with your audience, not managing complicated software.",
    url: "https://www.listmailer.dev",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.listmailer.dev&sz=128",
    screenshot: "/screenshots/send-personalized-bulk-emails-directly-from-your-own-email-account-fast,-simple,-and-without-hidden-costs-.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Web Reveal",
    description: "eb Reveal instantly detects CMS, frameworks, hosting, analytics, plugins, and more.",
    url: "https://webreveal.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=webreveal.io&sz=128",
    screenshot: "/screenshots/web-reveal.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Miapi",
    description: "MIAPI is the most accurate web-grounded AI answers API at the lowest price point. At 89% on the SimpleQA benchmark, it outperforms Perplexity Sonar Large (~87%) and GPT-4o mini (~82%) \u2014 while costing $2.50-$3.60/1K queries vs Perplexity's $5-14 and OpenAI's $10-15. One API call returns a sourced answer with citations, confidence score, and source URLs. No RAG pipeline needed. OpenAI-compatible, with streaming, news search, and a free tier. Built by a solo developer. Try the playground.",
    url: "https://miapi.uk",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=miapi.uk&sz=128",
    screenshot: "/screenshots/miapi.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "EV24.africa",
    description: "EV24.africa is a pan-African electric vehicle marketplace designed to accelerate the adoption of electric mobility across the African continent. As demand for sustainable transportation grows globally, Africa is entering a pivotal phase where electric vehicles can dramatically reduce fuel costs, improve urban air quality, and provide more efficient mobility solutions for businesses and individuals alike. EV24.africa simplifies access to hybrid (HEV), plug-in hybrid (PHEV), range-extended electric (REEV), and fully electric vehicles (BEV) by connecting African buyers with a wide range of trusted global manufacturers and suppliers. Through a transparent and digital-first platform, EV24.africa enables customers to discover, compare, and purchase electric vehicles suited to African roads, climates, and economic realities. The platform offers vehicles across multiple categories including compact cars, SUVs, pickups, sedans, and commercial fleets, sourced from leading global brands such as BYD, Tesla, Toyota, Dongfeng, Wuling, Leapmotor, and others. EV24.africa focuses on vehicles that provide the best balance between affordability, reliability, battery range, and maintenance simplicity, ensuring that electric mobility becomes accessible beyond early adopters. One of the core challenges for EV adoption in Africa is logistics and trust. EV24.africa addresses this by offering an end-to-end purchase experience, including sourcing, quality verification, export handling, shipping, customs clearance, and delivery across multiple African countries. This integrated approach allows customers to purchase electric vehicles with confidence, even when the vehicles are imported from international markets.",
    url: "https://www.ev24.africa",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.ev24.africa&sz=128",
    screenshot: "/screenshots/ev24-africa.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "vuln0x",
    description: "Sentinel is an autonomous AI pentester that deploys 29+ Kali Linux tools to hack your app before real attackers do. Built for developers who ship fast with AI coding tools.",
    url: "https://vuln0x.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=vuln0x.com&sz=128",
    screenshot: "/screenshots/vuln0x.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Plot Travel",
    description: "Plot Travel guarantees you never overpay for a trip you've already booked. Travel prices are volatile, but constantly checking your specific flights and hotels to see if the rate went down is tedious and unrealistic. Just forward your confirmation emails, and the system takes over. It continuously monitors your exact bookings in the background. When a flight or hotel price drops, it instantly alerts you with the exact steps you need to take to claim the savings and put that money back in your wallet.",
    url: "https://www.plot.travel",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.plot.travel&sz=128",
    screenshot: "/screenshots/plot-travel.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Alaska Supreme Painting",
    description: "Alaska's Supreme Painting & Contracting LLC is a licensed, bonded, and insured general contractor located in Anchorage, Alaska. We have been providing services to all of Anchorage and surrounding areas for over 30 years. Here at Alaska's Supreme Painting & Contracting we provide services ranging from painting exterior and interior businesses and homes throughout Anchorage and surrounding areas, complete bathroom remodeling, kitchen remodels, complete deck building, home repairs, drywall services, tile work, demos, pressure washing, and much more. Alaska's Supreme Painting & Contracting is a family owned and operated company. We take pride in all our work and offer professional friendly service to all our customers. Our attention to detail is our top priority, we will always work hard for all our clients. We are Alaska's general contractor, let us be your first choice in providing you with great service for all your needs.",
    url: "https://alaskasupremepainting.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=alaskasupremepainting.com&sz=128",
    screenshot: "/screenshots/alaska-supreme-painting.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Seven by Radost IT is a privacy-first website analytics tool that provides powerful insights without cookies or intrusive tracking. It offers simple setup, clean dashboards, and full GDPR compliance.",
    description: "Seven by Radost IT is a modern, privacy-first analytics platform designed to give website owners meaningful insights without compromising user privacy. Unlike traditional analytics tools that rely on cookies and complex tracking systems, Seven eliminates cookies entirely, allowing businesses to analyze website performance while maintaining full respect for user data and privacy regulations. Built with simplicity and transparency in mind, Seven provides essential website analytics without unnecessary complexity. There are no cookies to manage, no intrusive consent banners to display, and no complicated compliance processes. This approach makes it significantly easier for website owners, developers, and businesses to stay aligned with privacy regulations such as GDPR while still gaining valuable insights into their website traffic. The platform delivers clear and actionable data through beautifully designed, minimalist dashboards. Users can quickly understand visitor behavior, traffic patterns, and site performance at a glance. With daily, monthly, and yearly insights available, it becomes easy to track growth trends and monitor the effectiveness of marketing or content strategies over time. Seven also provides detailed hourly traffic breakdowns, helping users identify when their audiences are most active. These insights enable better planning for content releases, campaigns, and updates. Additionally, the system automatically detects and filters bot traffic to ensure that analytics remain accurate and reliable. Another key advantage of Seven is its global infrastructure. Using a distributed edge network, the platform can track visitors from anywhere in the world while maintaining fast performance and reliable data collection. This ensures that businesses with international audiences can monitor traffic and engagement regardless of geographic location. Integration is intentionally straightforward. Users only need to add a single line of code to their website, and the analytics system is ready to start tracking immediately. The tool works seamlessly with virtually any website framework, allowing developers and website owners to set it up in under two minutes. Seven also offers transparent and affordable pricing. Plans are designed to support everyone from personal projects and small websites to growing businesses and enterprise-level platforms. With options that scale based on page views, number of websites, and team members, users can choose the plan",
    url: "https://seven.radostit.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=seven.radostit.com&sz=128",
    screenshot: "/screenshots/seven-by-radost-it-is-a-privacy-first-website-analytics-tool-that-provides-powerful-insights-without-cookies-or-intrusive-tracking-it-offers-simple-setup,-clean-dashboards,-and-full-gdpr-compliance-.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Zenpage",
    description: "MoodTrackMe is a digital diary for structured self-monitoring of one's mental health. The app allows users to regularly record their mood, sleep patterns, and other individually relevant factors such as physical symptoms, stress, or social events. This continuous documentation helps users better recognize changes in their well-being and makes personal patterns visible. A key feature of MoodTrackMe is the customizable emergency plan. Users can record personal early warning signs, proven coping strategies, and important contacts. Interactive skills and guided exercises based on established psychological methods are also available to provide support in stressful situations. The app was developed in collaboration with qualified professionals and has been tested and refined over an extended period in everyday therapeutic practice. The content of MoodTrackMe is based on current scientific findings, therapeutic manuals, and proven psychological exercises from clinical practice. MoodTrackMe is designed for both people already in therapy and those who want to strengthen their self-awareness independently. Regularly keeping a mood diary can help to better understand emotional processes, track developments, and react to changes early on. During development, particular emphasis was placed on user-friendliness and practicality. Subtle gamified elements\u2014such as collecting medals\u2014promote motivation and consistency in use. The app combines structured self-reflection with practical exercises, thus offering a personal space to support emotional well-being.",
    url: "https://moodtrack.me",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=moodtrack.me&sz=128",
    screenshot: "/screenshots/zenpage.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "OptionIncome",
    description: "OptionIncome is a fully automated options trading tracker that automatically syncs from your broker, delivering smart analytics and live market data to help you maximize your returns",
    url: "https://www.optionincome.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.optionincome.io&sz=128",
    screenshot: "/screenshots/optionincome.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Lunary",
    description: "Personalized AI astrology grounded in real astronomical data. Track cosmic transits, analyze your birth chart, and chat with an AI guide trained on your unique sky.",
    url: "https://lunary.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=lunary.app&sz=128",
    screenshot: "/screenshots/lunary.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "NASA-level astronomical birth chart analysis",
      "Daily cosmic dashboard with transits and moon phases",
      "AI Astral Guide grounded in your specific chart",
      "Educational grimoire for learning astrology and tarot"

    ]
  },
  {
    name: "Wafler",
    description: "IF YOU ARE A STARTUP LOOKING FOR A SECURE WEBSITE PROTECTION, WE CAN PROTECT YOU FOR FREE! Reach out to us on Discord and we'll see what we can do! Wafler provides advanced DDoS protection with next-gen technology to secure your infrastructure. You can benefit from real-time mitigation and EU-based privacy standards. Whether you are looking to protect small projects or large-scale digital assets, this service offers reliable security solutions with plans starting at just \u20ac5/mo. Wafler helps you maintain up-time and defend against sophisticated network attacks with confidence. If you wish to contact us, do not hesitate to write us an email or join our discord at https://wafler.one/discord",
    url: "https://wafler.one",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=wafler.one&sz=128",
    screenshot: "/screenshots/wafler.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Clarity Search AI",
    description: "Find out if AI recommends your business or your competitors, and get the exact optimizations to fix it.",
    url: "https://claritysearch.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=claritysearch.ai&sz=128",
    screenshot: "/screenshots/clarity-search-ai.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Dashtera",
    description: "Powerful 2D/3D data visualization platform, for Business Intelligence, Engineering, and Finance",
    url: "https://dashtera.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=dashtera.com&sz=128",
    screenshot: "/screenshots/dashtera.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Soul Wish",
    description: "SoulWish is a daily emotional wellness app that combines mood tracking with personalized audio affirmations. How it works: - Check in with how you're actually feeling (25+ emotions) - Share what's weighing on you \u2014 love, health, career, family, purpose - Receive a wish crafted for your exact moment - Listen to it spoken in a calm voice, on repeat Unlike generic affirmation apps, every wish is generated from your real emotions and concerns. The audio plays softly on repeat so the words can sink in. Features: - Personalized audio affirmations (4 voice styles) - Mood journal with selfie camera - Emotional calendar to spot patterns over time - Daily reminders and streaks - 2-minute daily practice Who it's for: Women focused on self-care, emotional health, and building a kinder relationship with themselves.",
    url: "https://soulwish.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=soulwish.app&sz=128",
    screenshot: "/screenshots/soul-wish.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "aiME Private AI",
    description: "aiME: Your always-available, 100% offline private AI companion. Run powerful language models directly on your device for absolute privacy.",
    url: "https://coticsy.com/aime.html",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=coticsy.com&sz=128",
    screenshot: "/screenshots/aime-private-ai.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Achiv",
    description: "Founders waste months blasting cold emails into the void and praying for a reply. Achiv stops the spam cycle by finding people on Reddit who are actively complaining about the exact problem you solve. You get qualified leads and an AI clone to practice your pitch on before you ever hit send.",
    url: "https://achiv.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=achiv.com&sz=128",
    screenshot: "/screenshots/achiv.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Melon Post",
    description: "Melon Post is an AI chatbot that lives in your WhatsApp environment you allready use and love. It will guide you through the creation of a custom postcard that can be sent to anywhere in the world for a flat fee.",
    url: "https://melonpost.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=melonpost.com&sz=128",
    screenshot: "/screenshots/melon-post.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Hairstyle AI",
    description: "Try any hairstyle on your photo with AI before going to the salon. Change hair color, length, and style in seconds.",
    url: "https://hairchanger.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=hairchanger.ai&sz=128",
    screenshot: "/screenshots/hairstyle-ai.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Pitchtank",
    description: "PitchTank is a platform where users submit startup ideas, the community votes on the best ones, and top-ranked ideas each month get built for free with a 70/30 revenue split in favor of the pitcher.",
    url: "https://pitchtank.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pitchtank.io&sz=128",
    screenshot: "/screenshots/pitchtank.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SafetyDocs Ltd",
    description: "SafetyDocs is a UK-based SaaS platform that transforms static event safety documents into live, synchronised, audit-ready compliance systems for venues, contractors, and event organisers.",
    url: "https://safetydocs.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=safetydocs.org&sz=128",
    screenshot: "/screenshots/safetydocs-ltd.webp",
    dateAdded: "2026-03-29",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Zenpage",
    description: "Zenpage is a free website builder for authors, designed around what writers actually need online: somewhere to show their books, connect with readers, and not pay $20/month for the privilege. You sign up, pick a template and color, fill in your details, and publish. About fifteen minutes. There's no page builder to wrestle with, no plugin system, no theme customizer with 200 settings. It's a form. You fill it in. Your site goes live. The templates were built after studying how real author websites work and what readers expect when they look someone up. Book pages with covers, descriptions, and buy links. Author bio. Blog. Newsletter signup that plugs into Mailchimp, ConvertKit, Substack, or Beehiiv. Technical stuff happens automatically. SEO, image optimization, CDN, free SSL, mobile layouts, RSS. Pages load in under a second. You don't configure any of it. Publish at yourname.zenpage.io or connect a domain you own. It's free. Not temporarily, not with conditions. Author websites are static pages: text, images, links. Hosting costs almost nothing. Zenpage was built by a reader who thought it was absurd that authors pay $15-40/month for generic builders when the real cost is pennies per site. If you write books and need a website, this gets you one in fifteen minutes for zero dollars. Doesn't matter if it's your first or your thirtieth publication.",
    url: "https://zenpage.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=zenpage.io&sz=128",
    screenshot: "/screenshots/zenpage.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Hale",
    description: "Got it. Here's a 400-500 word description for Hale: Hale is a HIPAA-compliant health AI assistant built for people managing complex medical situations and the 53 million Americans who serve as caregivers for family members. Managing chronic illness means tracking medications, remembering dosages, watching for interactions, and preparing for endless doctor appointments. Generic AI tools forget your history between conversations and aren't designed to handle sensitive medical information. Hale solves both problems\u2014it remembers your complete health profile and protects your data with the same legal standards required of hospitals and insurers. Users interact with Hale through natural conversation. Add medications by photographing pill bottles. Ask about drug interactions and get answers that account for everything you're taking. Track symptoms over time and surface patterns you might miss. When a doctor appointment approaches, Hale helps you prepare questions based on your recent symptoms, medication changes, and ongoing concerns. The difference becomes clear with everyday questions. Ask a generic AI \"Can I take ibuprofen?\" and you get a generic answer. Ask Hale the same question and it knows you're on blood thinners\u2014and responds accordingly. That context-awareness matters when you're juggling multiple conditions and medications. For caregivers, Hale's family plan allows one account holder to manage separate health profiles for aging parents, children, or spouses. Each profile maintains its own medications, conditions, appointments, and conversation history. Prepare for a parent's cardiology appointment in one profile, then switch to track a child's symptoms in another. Caregivers are managing not just their own health but their family's health too\u2014Hale was built for that reality. HIPAA compliance isn't just a checkbox. It means your health conversations are legally protected, not scraped for training data or exposed through casual data sharing. Hale maintains signed Business Associate Agreements with all infrastructure providers, ensuring your medical information receives the same legal protections as your hospital records. Hale was built by Jason Camp while managing 21 daily medications after two open-heart surgeries. \"I needed something that could remember everything I'm dealing with and give me answers that account for my specific situation,\" Camp said. \"Generic health advice isn't useful when you're on blood thinners, beta blockers, and immunosuppr",
    url: "https://hale.med",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=hale.med&sz=128",
    screenshot: "/screenshots/hale.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Alignmint",
    description: "Alignmint is an all-in-one nonprofit accounting and management platform built by nonprofit directors for nonprofit directors. It serves general nonprofits, churches, private schools, and fiscal sponsors with a single platform that replaces fragmented software stacks. The company is based in the United States and is committed to making professional-grade nonprofit tools accessible to organizations of every size.",
    url: "https://www.getalignmint.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.getalignmint.org&sz=128",
    screenshot: "/screenshots/alignmint.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SecVibe",
    description: "SecVibe is an AI-powered security copilot built for vibe coding, helping developers automatically detect and fix security risks in AI-generated code. It analyzes prompts and outputs in tools like Cursor and VS Code to enforce secure-by-design development from the first line of code.",
    url: "https://secvibe.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=secvibe.ai&sz=128",
    screenshot: "/screenshots/secvibe.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Transmit",
    description: "Your emails, your reputation. Isolated sending from $2/mo.",
    url: "https://xmit.sh",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=xmit.sh&sz=128",
    screenshot: "/screenshots/transmit.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LLMWISE",
    description: "LLMWise is the fastest way to compare, blend, and evaluate leading AI models \u2014 all from a single interface. Instead of juggling multiple AI subscriptions and browser tabs, LLMWise lets you send one prompt and see how GPT-5.2, Claude Sonnet 4.5, Gemini 3 Flash, DeepSeek R1, Grok 3, and more respond side-by-side in real time. Most professionals already use AI daily but remain locked into a single provider with no way to know if they're getting the best output. LLMWise solves this with five powerful modes: Chat \u2014 Talk to any model instantly. Built-in smart routing automatically picks the best model for your query \u2014 code questions go to GPT, creative writing to Claude, translation to Gemini \u2014 so you always get optimal results without thinking about it. Compare \u2014 Send one prompt to 2-4 models simultaneously and see responses stream in side-by-side. Perfect for evaluating which model handles your specific use case best, whether that's drafting emails, analyzing data, or writing code. Blend \u2014 Combines outputs from multiple models into a single, superior response. Uses Mixture-of-Agents architecture to synthesize the best reasoning from each model. The result consistently outperforms any individual model. Judge \u2014 Pit models against each other in a blind evaluation judged by a third AI model. Get an objective verdict on which model produces better output for your exact prompt, complete with scoring and reasoning. Mesh \u2014 Intelligent failover routing that automatically retries with backup models if your primary choice fails or is overloaded. Circuit-breaker protection ensures you always get a response. LLMWise is built for professionals who need reliable AI output without the overhead of managing multiple subscriptions. Key features include:",
    url: "https://llmwise.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=llmwise.ai&sz=128",
    screenshot: "/screenshots/llmwise.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "maptrics",
    description: "SEO monitoring, SEO health score, automated SEO audit, continuous SEO monitoring, deploy SEO check, site crawling, SEO regression detection, meta tag checker, OG tag validator, structured data validation, broken link checker, canonical tag monitor, robots meta checker, sitemap crawler, SEO issue tracker, page health score, SEO traffic drop, broken deploy SEO, SEO regression, post-deploy SEO check, SEO monitoring after deploy, catch SEO issues early, SEO change detection, SEO audit tool, SEO history tracking, continuous SEO vs one-time audit, real-time SEO monitoring, SEO score over time, SEO trend tracking, Vercel SEO monitoring, deploy webhook SEO, Google Search Console integration, SEO CI/CD, automated SEO testing, SEO monitoring for developers, SEO health check after deploy, track SEO changes over time, SEO audit with history, automatic SEO regression testing, SEO score dashboard, seo-monitoring, site-crawl, meta-tags, og-tags, structured-data, deploy-checks, health-score, link-checker, alt-text, canonical, seo-history, issue-tracking, vercel, sitemap",
    url: "https://www.maptrics.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.maptrics.io&sz=128",
    screenshot: "/screenshots/maptrics.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LogoLife",
    description: "LogoLife is a rapidly growing college counseling and mentorship organization that helps students develop meaningful achievements and long-term purpose while positioning them for acceptance into top universities.",
    url: "https://logolife.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=logolife.org&sz=128",
    screenshot: "/screenshots/logolife.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Organic Pilot",
    description: "With OrganicPilot, grow your organic traffic on auto pilot. Instead of juggling keywords, spreadsheets, and scattered drafts, OrganicPilot builds your entire content engine: \u2022 Generates topic clusters based on search demand \u2022 Creates a 30-day content plan with briefs \u2022 Scores content quality before publishing \u2022 Publishes directly to WordPress or your CMS It\u2019s built for agencies and SaaS teams who want to scale organic traffic without hiring a full SEO department. No fluff. No random AI content. Just structured organic growth.",
    url: "https://www.organicpilot.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.organicpilot.ai&sz=128",
    screenshot: "/screenshots/organic-pilot.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Luxoret",
    description: "AI / Creative Tools",
    url: "https://luxoret.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=luxoret.com&sz=128",
    screenshot: "/screenshots/luxoret.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "WeShop",
    description: "WeShop (NASDAQ: WSHP) is a social-commerce app and shoppable community that turns everyday purchases into real company ownership. Through its SEC-registered ShareBack\u2122 program, users ultimately receive equity in the WeShop business by shopping across 500+ retail partners with a combined catalog of over a billion products.",
    url: "https://we.shop",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=we.shop&sz=128",
    screenshot: "/screenshots/weshop.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Glad AI",
    description: "Most founders and marketers are sitting on a goldmine of expertise trapped in docs, old blogs, and messy notes. The current state of marketing is a manual grind: you spend hours trying to turn one idea into a post for LinkedIn, then realize you have to rewrite it for X, then figure out how to join the conversation on Reddit without getting banned for being \"spammy.\" Glad AI changes this. It acts as your dedicated assistant that ingests your raw data and transforms it into a multi-platform presence. Voice Cloning: The platform uses a Voice Consistency Engine to map your vocabulary and professional tone. Your output sounds like you, not a generic robot. Smart Extraction: Point the AI at your website or blogs. It finds the hooks and pillar topics that position you as an industry leader. Auto-Pilot Growth: From formatting for dwell time to predictive scheduling, your social presence is handled while you sleep. Visual Identity: On-brand graphics are generated for every post, ensuring your feed looks as good as it reads.",
    url: "https://iamglad.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=iamglad.ai&sz=128",
    screenshot: "/screenshots/glad-ai.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "now&here",
    description: "\ud83c\udf0d See any place in the world \u2014 right now. Now & Here connects people who need real-time video with locals who can capture it instantly. \ud83d\udcf9 Share public videos from your location or request custom videos from hotels, properties, events, or any place nearby. \ud83d\udcb0 Complete video tasks and earn by helping others see reality. \u2705 Perfect for travelers, real estate checks, and remote verification. \ud83d\udc49 Try it now on Google Play and explore the world live!",
    url: "https://nowahere.com/brand",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=nowahere.com&sz=128",
    screenshot: "/screenshots/now&here.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Traidies",
    description: "Traidies is an AI-powered platform that turns plain-English trading ideas into fully functional automated trading bots \u2014 complete with code generation, cloud compilation, and backtesting tools.",
    url: "https://www.traidies.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.traidies.com&sz=128",
    screenshot: "/screenshots/traidies.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "MiroMiro",
    description: "Extract colors, fonts, styles and ready-to-use code from any website in one click.",
    url: "https://miromiro.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=miromiro.app&sz=128",
    screenshot: "/screenshots/miromiro.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Status Central",
    description: "Monitor All Your Services In One Place. Get real-time status updates from all your critical services. Stay informed about outages and maintenance windows.",
    url: "https://www.statuscentral.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.statuscentral.io&sz=128",
    screenshot: "/screenshots/status-central.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Polyform",
    description: "Build beautiful forms in seconds. Polyform combines AI-powered form generation with advanced theming, conditional logic, and real-time analytics, so you never start from scratch",
    url: "https://polyform.to",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=polyform.to&sz=128",
    screenshot: "/screenshots/polyform.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Cold Email Kit",
    description: "Cold Email Kit is the internet's most focused directory for cold email tools \u2014 compare 50+ tools across outreach, leads, warmup, deliverability, and more, with verified reviews and transparent pricing, all in one place.",
    url: "https://coldemailkit.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=coldemailkit.com&sz=128",
    screenshot: "/screenshots/cold-email-kit.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PagerSync",
    description: "Bring Your On-Call Roster into Slack for Seamless Communication",
    url: "https://www.pagersync.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.pagersync.com&sz=128",
    screenshot: "/screenshots/pagersync.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Bitbiased AI",
    description: "BitBiased AI is a fast-growing AI newsletter delivering curated AI news, tools, and business insights, featuring Robi, its signature AI commentator.",
    url: "https://bitbiased.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bitbiased.ai&sz=128",
    screenshot: "/screenshots/bitbiased-ai.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "privatclaw",
    description: "PrivatClaw is a fully managed OpenClaw hosting service that gives you a dedicated, private virtual server with OpenClaw pre-installed and ready to use. No Docker, no terminal commands, no DevOps \u2014 just sign up and start chatting with your personal AI assistant. Every PrivatClaw instance runs on its own isolated VPS, meaning your data, conversations, and configurations belong entirely to you. Unlike shared hosting solutions, there is no shared infrastructure between users \u2014 your server is yours alone. We handle everything behind the scenes: initial deployment, OpenClaw configuration, security hardening, software updates, backups, and ongoing server maintenance. If something breaks at 2 AM, that's our problem, not yours. You focus on using your AI assistant \u2014 we keep it running. PrivatClaw connects to the messaging platforms you already use \u2014 Telegram, WhatsApp, Discord, Slack, and more. Your OpenClaw instance works 24/7 as a proactive AI agent that can browse the web, manage files, run automations, and remember your preferences across conversations. It's not just a chatbot \u2014 it's a personal AI teammate that actually gets things done. Whether you want a personal productivity assistant, a team-facing support bot, or an automation engine for your business workflows, PrivatClaw delivers the full power of OpenClaw without the technical overhead. Our support team is available to help with setup, configuration, custom skills, and any issues that come up along the way. Skip the self-hosting headaches. Get a production-ready OpenClaw instance that just works.",
    url: "https://privatclaw.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=privatclaw.com&sz=128",
    screenshot: "/screenshots/privatclaw.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "71vote",
    description: "71vote is an AI-powered thinking tool where multiple AI agents discuss your work or personal dilemmas in real time \u2014 including health, therapy, nutrition, and pet care \u2014 helping you see every angle before you decide.",
    url: "https://www.71vote.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.71vote.com&sz=128",
    screenshot: "/screenshots/71vote.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "TicketsData",
    description: "TicketsData is a unified API for real time ticket inventory and pricing across major marketplaces. Get normalized JSON for events, listings, and availability in seconds.",
    url: "https://ticketsdata.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=ticketsdata.com&sz=128",
    screenshot: "/screenshots/ticketsdata.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AiArtist",
    description: "AI motion graphics generator for Social Media and Ads",
    url: "https://www.aiartist.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.aiartist.io&sz=128",
    screenshot: "/screenshots/aiartist.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "watchflow",
    description: "Monitor SSL certificates, scheduled jobs, APIs, and more.",
    url: "https://www.watchflow.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.watchflow.io&sz=128",
    screenshot: "/screenshots/watchflow.webp",
    dateAdded: "2026-03-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "TransGull",
    description: "TransGull is an AI-powered multilingual translation platform designed for real-world communication. It helps users overcome language barriers in conversations, meetings, videos, images, and live speech. Unlike traditional translation tools that only convert text, TransGull uses contextual AI understanding to deliver more accurate and natural translations across multiple scenarios. Key Features: \u2022 Conversation Translation \u2013 Instantly translate real-time conversations with clear and structured outputs. \u2022 Two-Way Simultaneous Interpretation \u2013 Ideal for meetings, classes, and business discussions. Each participant can hear translations directly through headphones. \u2022 Image Translation \u2013 Capture and translate text from images with high accuracy. \u2022 Video & Audio Translation \u2013 Translate multimedia content efficiently. \u2022 Translation History \u2013 View and review past translations anytime for reinforcement and clarity. TransGull supports multiple languages including English, Japanese, Chinese, Korean, French, Spanish, German, Russian, Thai, Italian, and Vietnamese. The platform is built for international teams, global trade professionals, students, and travelers who need reliable multilingual communication tools without complex setup. With flexible pay-as-you-go usage and no mandatory subscription for premium features, users only pay for what they use. TransGull aims to make cross-language communication smooth, practical, and accessible anywhere in the world.",
    url: "https://transgull.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=transgull.com&sz=128",
    screenshot: "/screenshots/transgull.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PathwiseAI",
    description: "AI career platform that auto-finds job postings and generates tailored cover letters, resumes, negotiation emails, and interview prep \u2014 just type a company name and role.",
    url: "https://www.pathwiseai.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.pathwiseai.io&sz=128",
    screenshot: "/screenshots/pathwiseai.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Webcomparis",
    description: "Stop guessing why competitors win. Compare up to 5 websites with AI - technical performance, content quality, design analysis, and strategic market positioning. Professional PDF reports included.",
    url: "https://www.webcomparis.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.webcomparis.com&sz=128",
    screenshot: "/screenshots/webcomparis.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "InterMountain AI Consultants LLC",
    description: "iMeett \u2014 Meetings On Autopilot,Data In Your Drive If you're a consultant, freelancer, or business owner, your day runs on meetings \u2014 client calls, discovery sessions, project check-ins, vendor negotiations. But the time you spend writing up notes, chasing action items, and trying to remember who said what is time you can't bill for. iMeett is an AI-powered meeting assistant that automatically transcribes, summarizes, and organizes your conversations, then saves everything directly back to your own Google Drive. No third-party servers storing your client discussions. No bots sitting in your calls. Just smart, private meeting intelligence delivered to you within minutes. Your Client Conversations Stay Private When you're handling sensitive client information, NDAs, or confidential business discussions, where your data lives matters. With iMeett, privacy isn't a feature we bolted on \u2014 it's how the product was built from the ground up. Your recordings live in your Google Drive. Transcripts and summaries are written back to your Google Drive. Audio is processed securely and never stored on our servers. Whether you're a consultant discussing proprietary strategy, a business owner negotiating a deal, or a freelancer handling client deliverables, iMeett keeps your data exactly where it belongs \u2014 with you. You stay compliant, and your clients stay confident. Smart Organization That Saves You Hours Every meeting is automatically tagged by AI with a concise, meaningful label \u2014 like \"Client Onboarding\" or \"Q3 Budget Review\" \u2014 making it effortless to find past conversations weeks or months later. You can customize tags, filter by client or project, and generate monthly recaps to track how engagements evolve over time. Need to prepare for a follow-up call? Pull up every meeting tagged under that client in seconds. With tailored persona modes for Sales, Consulting, Legal, Executive, and more, every summary is structured around what actually matters for your work \u2014 action items, deliverables, timelines, and who owns what.",
    url: "https://app.imeett.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=app.imeett.ai&sz=128",
    screenshot: "/screenshots/intermountain-ai-consultants-llc.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "GreenPT",
    description: "Frida is built on a simple belief: AI assistants can be smart, green, and privacy-friendly.",
    url: "https://greenpt.nl/frida",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=greenpt.nl&sz=128",
    screenshot: "/screenshots/greenpt.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Levl",
    description: "Content today has a shelf life problem. A post gets published, maybe skimmed, liked, and then forgotten. Courses go unfinished. Communities go quiet. Even great creators struggle to keep audiences consistently engaged. Levl fixes that by turning content into a progression system. Levl is a gamification platform that helps creators transform static content into interactive journeys using levels, badges, streaks, XP, and AI-generated challenges. Instead of passively consuming content, audiences actively participate, track progress, and feel motivated to keep going. At its core, Levl is built around a simple idea: people engage more when progress is visible. Whether you\u2019re a creator, educator, or community builder, Levl gives you the tools to reward consistency, celebrate milestones, and make learning or participation feel fun rather than forced. Creators can take existing content like posts, videos, lessons, newsletters, or community prompts and instantly turn them into challenges or games. Fans earn XP by completing actions, unlock badges for achievements, and level up over time. Streaks encourage repeat engagement, while progress tracking gives users a clear sense of momentum. What makes Levl different is that it\u2019s not just points for the sake of points. The platform uses AI to intelligently suggest challenges and progression paths based on your content, so creators don\u2019t need to design complex systems from scratch. You focus on creating; Levl handles the engagement mechanics. Levl works especially well for: Creators who want deeper engagement, not just views Educators and course builders trying to improve completion rates Community leaders looking to keep members active and motivated Coaches and mentors who want to reward consistency and growth",
    url: "https://getlevl.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=getlevl.ai&sz=128",
    screenshot: "/screenshots/levl.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Bridgecall",
    description: "Bridgecall lets people who speak different languages have live voice calls in one browser link. Each person speaks naturally and hears translated speech in real time, so conversations feel direct and human.",
    url: "https://bridgecall.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bridgecall.app&sz=128",
    screenshot: "/screenshots/bridgecall.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Octopost.ai",
    description: "Octopost.ai is an AI-powered social media scheduling platform designed for marketers, creators, startups, and growing businesses who want to manage content efficiently without complexity or high costs. In today\u2019s fast-moving digital landscape, consistency is everything. Posting manually across Facebook, Instagram, LinkedIn, TikTok, and YouTube not only wastes time but also increases the risk of inconsistency, missed campaigns, and content burnout. Octopost.ai centralizes your entire social media workflow into one clean, intuitive dashboard. With Octopost.ai, you can: Connect and manage multiple social media accounts in one place Plan content visually using a smart calendar Schedule posts in advance across platforms Store and organize media assets (images and videos) Use AI to generate captions, optimize tone, and add smart emoji suggestions Automate repetitive publishing tasks Unlike complex enterprise tools that require long onboarding and expensive subscriptions, Octopost.ai focuses on simplicity, speed, and performance. It\u2019s built for users who want powerful functionality without unnecessary friction. One of the key advantages of Octopost.ai is its Free Forever plan, making it accessible for solo creators and small businesses that need a reliable social media scheduler without upfront investment. As your brand grows, the platform scales with you\u2014supporting more accounts, automation features, and AI-powered content optimization.",
    url: "https://octopost.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=octopost.ai&sz=128",
    screenshot: "/screenshots/octopost-ai.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PNGtoSTL",
    description: "PNGtoSTL is a free online AI converter that transforms PNG to STL 3D files. Perfect for Image to 3D, Image to STL, 3MF to STL, OBJ to STL and STP File Viewer",
    url: "https://pngtostl.xyz",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pngtostl.xyz&sz=128",
    screenshot: "/screenshots/pngtostl.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "DensOps",
    description: "DensOps is a geolocation prospecting platform that turns \u201ccustomers near me\u201d into export-ready lead lists for outreach and ads.",
    url: "https://densops.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=densops.com&sz=128",
    screenshot: "/screenshots/densops.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Borrowing Calculator",
    description: "Estimate how much you can borrow for a home loan in Australia in under 2 minutes, private, instant, and built around real Australian lending standards.",
    url: "https://borrowingcalculator.au",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=borrowingcalculator.au&sz=128",
    screenshot: "/screenshots/borrowing-calculator.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Stick Audio",
    description: "Unlimited Voice Cloning No Subscription, Pay as you go model. 5x Cheaper than 11Labs Web and API access using same credits Credits never expire",
    url: "https://stick.audio",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=stick.audio&sz=128",
    screenshot: "/screenshots/stick-audio.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LinkPilot",
    description: "LinkPilot \u2014 The AI Agent That Runs Your LinkedIn Like a Growth Machine Growing on LinkedIn is exhausting. You're staring at a blank screen every morning, posting inconsistently, watching competitors grow, and spending hours on posts that flop. LinkPilot fixes all of that. Unlike simple AI writing tools, LinkPilot is a complete LinkedIn growth system. Five specialized AI agents work together to handle research, strategy, content creation, scheduling, and analytics \u2014 so you can go from zero ideas to a full month of strategic content in minutes. How it works: The Research Agent monitors viral posts and tracks competitors to find what's working in your industry. The Strategy Agent builds a content plan aligned to your goal \u2014 whether that's growing followers, generating leads, or building authority. The Creation Agent generates posts, hooks, carousels, and images that actually sound like you (not generic AI), with 3 tone variants per generation. The Scheduling Agent publishes at data-backed optimal times and handles recurring content automatically. The Analytics Agent tracks performance, scores your profile health, and delivers weekly AI insights on what to improve. Key Features: - AI Content Generation \u2014 Posts, hooks, carousels, video scripts, and AI images. Multiple formats with industry-specific optimization and 3 tone variants per generation. - 30-Day Content Planner \u2014 Generate a full month of strategic, goal-aligned content in one click. Includes carousel and image posts, diverse hooks, and authentic human-sounding copy. - Viral Post Analysis \u2014 Reverse-engineer why posts went viral. Detect hook patterns, content structures (PAS, AIDA), and extract reusable frameworks. - Smart Scheduling \u2014 AI-optimized posting times, visual calendar, recurring posts, and direct LinkedIn publishing via OAuth. - Competitor Intelligence \u2014 Track competitor content, find topic gaps, compare content themes, and discover whitespace opportunities. - Analytics Dashboard \u2014 Post performance tracking, profile health scores, engagement trends, and weekly AI-powered improvement suggestions. - Free LinkedIn Tools \u2014 Carousel generator, best time to post calculator, and headline generator \u2014 no signup required. Who it's for: - Founders building personal brands on LinkedIn - B2B consultants and coaches who rely on LinkedIn for leads - LinkedIn ghostwriters managing multiple client accounts - Marketing teams needing coordinated content strategy Pricing: Free plan with 10 credits/month (no credit card required). Starter at $29/month with 100 credits and full features. Pro at $79/month with 300 credits, team collaboration, and API access. Results: 500+ active users, 10,000+ posts generated, 3x average engagement lift, 85% time saved.",
    url: "https://link-pilot.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=link-pilot.com&sz=128",
    screenshot: "/screenshots/linkpilot.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Ayudo",
    description: "Ayudo.ai is a multi-agent AI platform that helps customer support teams automate conversations and workflows across chat, email, WhatsApp, and voice\u2014reducing tickets while improving response quality and speed.",
    url: "https://www.ayudo.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.ayudo.ai&sz=128",
    screenshot: "/screenshots/ayudo.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "POSUSA",
    description: "Free POS system for restaurants, food trucks, and small businesses \u2014 no monthly fees, no contracts. Accept payments, manage orders, and sell online.",
    url: "https://www.posusa.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.posusa.com&sz=128",
    screenshot: "/screenshots/posusa.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Reports.Camera",
    description: "Reports.Camera is a camera reports app for film and digital production that helps camera departments, track digital mags, manage film stock inventory, and generate detailed reports. Available as a Next.js web app and native iOS app.",
    url: "https://www.reports.camera",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.reports.camera&sz=128",
    screenshot: "/screenshots/reports-camera.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "HighReach",
    description: "Create video ads and social content with AI in seconds",
    url: "https://highreach.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=highreach.ai&sz=128",
    screenshot: "/screenshots/highreach.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Burn After Reading",
    description: "Drop secret messages in the real world. Walk to discover them. Read once, then burn.",
    url: "https://readandburn.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=readandburn.app&sz=128",
    screenshot: "/screenshots/burn-after-reading.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LINO",
    description: "LINO automatically texts customers when you miss their call, sending them a booking link so they schedule themselves. Never lose a job to voicemail again.",
    url: "https://uselino.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=uselino.com&sz=128",
    screenshot: "/screenshots/lino.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "RiskOfficer",
    description: "RiskOfficer brings institutional-grade risk management to retail investors, offering sophisticated metrics like Value at Risk (VaR) and stress testing right on your iPhone. Analyze your portfolio with the same tools used by top hedge funds and investment banks.",
    url: "https://apps.apple.com/ru/app/riskofficer/id6757360596",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=apps.apple.com&sz=128",
    screenshot: "/screenshots/riskofficer.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Applytrackr",
    description: "ApplyTrackr is an AI-powered job search management platform that helps candidates track applications, tailor resumes, optimize for ATS, and manage their entire job hunt in one place.",
    url: "https://www.applytrackr.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.applytrackr.com&sz=128",
    screenshot: "/screenshots/applytrackr.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Taunusstar",
    description: "Taunusstar democratizes quantitative market analysis by bringing the same machine learning techniques used by top hedge funds directly to individual investors -- for free. The platform runs three independent CatBoost gradient-boosting models, each trained on 100+ engineered features drawn from macroeconomic indicators (FRED), market data (Yahoo Finance), and valuation metrics. Every trading day, these models produce a probability-based LONG or CASH signal for the S&P 500 across three time horizons: 3 months, 6 months, and 12 months. What makes Taunusstar unique is its multi-model consensus engine. Instead of relying on a single forecast, the platform aggregates signals from all three horizon models into a unified Consensus Strategy (invest only when 2+ models agree) and a Position Sizing Strategy (scale market exposure from 0% to 100% based on model agreement). This approach reduces false signals, manages downside risk, and has been stress-tested through every major market crisis in recent history. Full transparency is a core principle. Users can explore complete out-of-sample backtest results -- cumulative returns, drawdown analysis, monthly return heatmaps, calendar-year breakdowns, rolling Sharpe ratios, and crisis-period performance -- all validated using strict walk-forward cross-validation with zero look-ahead bias. Models retrain quarterly to adapt to evolving market conditions without overfitting to short-term noise. The result: an always-on, data-driven market signal that gives everyday investors the informational edge previously reserved for institutional quant desks.",
    url: "https://www.taunusstar.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.taunusstar.com&sz=128",
    screenshot: "/screenshots/taunusstar.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Resideline",
    description: "Resideline is an AI powered real estate analysis platform that estimates ARV, market rent, and returns in seconds to help investors spot profitable deals faster. Upload a CSV for bulk analysis or use our API to bring underwriting directly into your workflow.",
    url: "https://Resideline.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=Resideline.com&sz=128",
    screenshot: "/screenshots/resideline.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Encamera",
    description: "The iPhone's first truly encrypted camera that captures and protects your most private moments with military-grade security.",
    url: "https://encamera.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=encamera.app&sz=128",
    screenshot: "/screenshots/encamera.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Reply Champion",
    description: "Stop ignoring Google reviews. Reply Champion automatically writes personalized AI responses to every review. Set it and forget it. 14-day free trial.",
    url: "https://www.replychampion.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.replychampion.com&sz=128",
    screenshot: "/screenshots/reply-champion.webp",
    dateAdded: "2026-03-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "lube",
    description: "lube is building a hyper-specialized product development suite. We're starting with discovery. Support tickets and sales calls are great. You're hearing directly from users who care enough to reach out. But there's a whole universe of conversations you're missing. Users who'll never file a ticket but will write a 500-word Reddit rant. Who skip your survey but happily debate your product with strangers on Discord. Who share brutally honest takes on Twitter because they're not talking to you. Plus, your internal channels can't tell you what competitors are up to, what's shifting in the industry, or which shiny new tool your users are flirting with. All those conversations are happening right now. We help you tune in. lube makes product discovery frictionless. (Yeah, we went there.) Our first module monitors the communities where your users actually hang out. We surface the signals that matter. Workarounds. Users duct-taping hacky solutions because your product falls short? That's a feature begging to be built. Feature gaps. Requests buried in comment threads that never make it to your feedback portal. We find them so you don't have to doom-scroll at 2am. Churn signals. Users comparing alternatives, asking about migrations, venting frustration. We catch warning signs while you can still win them back. Industry shifts. New tools getting hyped, expectations changing. Stay ahead without dedicating your life to competitive research. But discovery is just the beginning. We're not building another task manager. The world doesn't need another kanban board. Another sprint planning tool. Another place to drag cards from \"To Do\" to \"Done\" and pretend that's progress. We're building tools with best practices baked in. Not as documentation you'll never read. As defaults that guide you toward better decisions. Opinionated tooling that makes good habits effortless. We're killing the collaboration friction between product, engineering, design, and go-to-market teams. Right now, product knowledge lives in silos. PMs have context engineers never see. Engineers understand constraints that make product wince. Marketing ships messaging that sounds nothing like how users actually talk. Everyone's grinding. But they're not working from the same playbook. lube gives every team a shared source of truth. What users need. What's actually buildable. What matters strategically. Not through more meetings or longer docs nobody reads. Through systems that just work.",
    url: "https://lube.gg",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=lube.gg&sz=128",
    screenshot: "/screenshots/lube.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "rhealth.dev",
    description: "rhealth.dev help you monitor websites, APIs, cron jobs, and internal services with clear failure reasons, multi-region checks, and reliable alerts.",
    url: "https://rhealth.dev",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=rhealth.dev&sz=128",
    screenshot: "/screenshots/rhealth-dev.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "GreatCompany.ai",
    description: "Track and optimize visibility in ChatGPT, Gemini and other AI Search engines to drive traffic to your website that converts.",
    url: "https://GreatCompany.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=GreatCompany.ai&sz=128",
    screenshot: "/screenshots/greatcompany-ai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ChampSignal",
    description: "ChampSignal tracks your competitors 24/7 across websites, news, Reddit, ads, and SEO. When something important changes, you know the same day. Most alerts are noise. ChampSignal uses AI to filter them so you only get notified when it actually matters. A price drop. A new feature launch. A shift in messaging. A Reddit thread gaining traction. Set up in under two minutes. Enter your website and we find your competitors for you. You get your first insights right away. What you get: Website changes like pricing, features, and messaging. News and Reddit mentions. Google and Meta ad tracking. SEO rankings and backlinks. Email and Slack alerts on your schedule. Need deeper analysis? Ask Champ, your AI competitive intelligence analyst. It knows everything we've tracked and gives you instant answers, battlecards, trend analysis, and positioning advice. No manual research needed. A competitive intelligence analyst costs $80K+ a year. ChampSignal gives you the same coverage for $39/month. Try it free for 14 days.",
    url: "https://champsignal.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=champsignal.com&sz=128",
    screenshot: "/screenshots/champsignal.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Eleidon",
    description: "Secure external messaging. The inbox that can't be phished.",
    url: "https://eleidon.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=eleidon.com&sz=128",
    screenshot: "/screenshots/eleidon.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "XIMA DIGITAL",
    description: "PDFSeek is an AI-powered platform that enables users to chat with PDFs, generate summaries, search content, and translate documents across multiple languages.",
    url: "https://www.pdfseek.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.pdfseek.com&sz=128",
    screenshot: "/screenshots/xima-digital.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Oneprofile",
    description: "Sync customer profiles and events between tools",
    url: "https://getoneprofile.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=getoneprofile.com&sz=128",
    screenshot: "/screenshots/oneprofile.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Stageflow.ai",
    description: "Stageflow: AI-Powered Product Photography for Online Sellers Creating product photos for online marketplaces is one of those tasks that sits in an awkward middle ground. Professional photography shoots are expensive\u2014often hundreds of dollars per session. DIY photography with your phone can work, but it's time-consuming and the results are inconsistent. For sellers managing multiple products or frequent launches, neither option scales well. Stageflow is a tool that uses AI to generate product lifestyle photos. You upload your product design (a logo, packaging artwork, or product image), select a scene style, and the system generates photorealistic images placing your product in various settings. The platform lets you choose the environment type (studio setup, lifestyle scene, outdoor setting, or minimalist composition) and framing angle (full shot, hero angle, close-up, or flatlay). You can also provide reference images to define the aesthetic style you're looking for\u2014color palettes, lighting moods, textures, and overall visual direction. After selecting these parameters, you describe your vision in a text prompt. The AI combines your inputs with its trained understanding of professional product photography to generate images. All outputs are automatically upscaled to meet marketplace requirements\u2014typically 2000+ pixels for platforms like Etsy. The editing system lets you refine images iteratively. If the first generation isn't quite right, you can give new instructions: adjust the lighting, change the background material, shift the composition. You can also upload a new design variant to see it in the same scene. Selection tools let you isolate specific areas of an image for targeted edits\u2014useful when you want to change just the background or adjust only part of the composition. There's an undo history if you want to revert changes. Generated images can be downloaded in standard resolution or upscaled to HD quality using 4k enhancement. You can organize your work in projects, keeping related product photos grouped together. The interface shows you all your generated variations in one place, making it easy to compare different approaches and choose the shots that work best for your listings. The platform is built for Etsy sellers, Shopify store owners, print-on-demand creators, and anyone else who needs product mockups regularly but doesn't",
    url: "https://Stageflow.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=Stageflow.ai&sz=128",
    screenshot: "/screenshots/stageflow-ai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "EmailVerify.ai",
    description: "Verify emails in real-time with 99.9% accuracy.",
    url: "https://emailverify.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=emailverify.ai&sz=128",
    screenshot: "/screenshots/emailverify-ai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Mixels.ai",
    description: "Free AI pixel art generator and pixel art editor \u2014 convert photos to pixel art, generate game-ready characters, items, and backgrounds with perfect grid alignment. Sign up and get 5 free credits instantly.",
    url: "https://mixels.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=mixels.ai&sz=128",
    screenshot: "/screenshots/mixels-ai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "MedShotsAI",
    description: "AI-Powered Headshots & Marketing shots for Medical professionals",
    url: "https://medshotsai.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=medshotsai.com&sz=128",
    screenshot: "/screenshots/medshotsai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Userjam",
    description: "AI turns realtime user activity into stories, not dashboards",
    url: "https://userjam.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=userjam.com&sz=128",
    screenshot: "/screenshots/userjam.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "TRYremote",
    description: "TRYremote is a job board focused on remote tech positions. It aggregates listings from companies worldwide looking to hire developers, engineers, and other tech professionals who can work remotely. Our main focus is making it easy to find jobs that match your tech stack. You can search by specific technologies and quickly see relevant positions. We also organize jobs by region since some companies hire worldwide while others need you in specific time zones or countries. The job posts cover a range of roles from junior developers to senior engineers and team leads, spanning software development, DevOps, QA, data engineering, and support positions.",
    url: "https://tryremote.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=tryremote.com&sz=128",
    screenshot: "/screenshots/tryremote.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Flowly Indicators",
    description: "Get orderflow for TradingView. Spot rekt traders and whales, liquidity pools, unusual volume & backtest it.",
    url: "https://www.flowly.tools",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.flowly.tools&sz=128",
    screenshot: "/screenshots/flowly-indicators.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Roampads",
    description: "Roampads helps digital nomads find work-friendly apartments with verified WiFi and proper workspace setups. A curated alternative to Airbnb, built for remote work and long-term stays.",
    url: "https://www.roampads.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.roampads.com&sz=128",
    screenshot: "/screenshots/roampads.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "NeonChainX",
    description: "Lightning-fast options trading platform for Interactive Brokers. Built for speed and simplicity, with direct IBKR integration and real-time execution.",
    url: "https://neonchainx.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=neonchainx.com&sz=128",
    screenshot: "/screenshots/neonchainx.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Tails, Co.",
    description: "Stop scrolling - Tails finds the right dog walker & sitter for your pet. Each match is based on who has proven success in your exact scenarios\u2014and explains why.",
    url: "https://trytails.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=trytails.com&sz=128",
    screenshot: "/screenshots/tails,-co-.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Murmur",
    description: "Turn your voice into text instantly with offline speech-to-text dictation for Windows \u2014 private, fast, and fully offline. Murmur is a powerful offline speech-to-text and voice dictation app for Windows, built on the OpenAI Whisper neural network. All voice processing happens entirely on your device. No internet connection, no cloud services, and no audio ever leaves your computer. Designed for productivity and privacy, Murmur lets you dictate text into any application using a single global hotkey. Just press the shortcut, speak naturally, and release \u2014 the transcribed text appears instantly at your cursor position so you can keep working without interruption. Murmur works everywhere: IDEs, terminals, browsers, chats, document editors, and enterprise applications. It is especially suited for corporate, offline, and NDA-restricted environments where cloud-based dictation tools are not allowed. Notebook is a PRO Feature Upgrade to PRO to unlock the Notebook feature and transcribe long recordings and files. * Transcribe audio and video files * Long recordings up to 3 hours * Export to TXT, PDF, DOCX, SRT * Unlimited saved transcriptions Key Features \ud83d\udd12 100% Offline & Private All speech recognition runs locally on your PC. No uploads, no tracking, no telemetry, and no external servers. \ud83e\udde0 Whisper AI Engine Accurate real-time speech recognition powered by OpenAI Whisper, supporting 99+ languages with automatic language detection. \u26a1 High Performance GPU acceleration with NVIDIA CUDA and Vulkan for fast transcription. Automatically falls back to CPU when GPU is unavailable. \u2328\ufe0f Global Hotkey Dictation Start and stop dictation instantly from any application using a customizable system-wide hotkey. \u270d\ufe0f Type Anywhere Transcribed text is automatically inserted into the active window or text field \u2014 no copy-paste, no app switching. \ud83d\uddc2 Local Transcription History All transcriptions are stored locally for browsing, editing, copying, and reuse. \ud83e\udeb6 Minimal Interface Clean, lightweight, distraction-free UI designed to stay out of your way while you work. \ud83d\udd10 Privacy by Design \u2022 Audio never leaves your device \u2022 All data stored locally \u2022 No account or sign-in required \u2022 No analytics or tracking Perfect For \u2022 Writing emails, documents, and messages \u2022 Dictating notes, documentation, and code comments \u2022 Developers working in IDEs and terminals \u2022 Journalists and writers who value privacy \u2022 Accessibility and hands-free typing \u2022 Working without internet access \u2022 Pr",
    url: "https://murmurvt.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=murmurvt.com&sz=128",
    screenshot: "/screenshots/murmur.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Roomstage AI",
    description: "AI Virtual Staging for Real Estate \u2014 Stage Rooms in 30 Seconds",
    url: "https://roomstage.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=roomstage.ai&sz=128",
    screenshot: "/screenshots/roomstage-ai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Podcept",
    description: "Find Perfect Guests for Your Show or Get Booked on Top Podcasts",
    url: "https://www.podcept.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.podcept.com&sz=128",
    screenshot: "/screenshots/podcept.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Credops",
    description: "CredOps monitors expiry timelines for the credentials that keep production running. Only metadata and expiry dates are tracked. Secret values are never required.",
    url: "https://www.credops.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.credops.io&sz=128",
    screenshot: "/screenshots/credops.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LinkedGrow",
    description: "LinkedIn content that actually converts",
    url: "https://linkedgrow.ai/beta",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=linkedgrow.ai&sz=128",
    screenshot: "/screenshots/linkedgrow.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ShortsAi",
    description: "Short AI Video Generator, from UGC Ads to YouTube Shorts",
    url: "https://shortsai.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=shortsai.com&sz=128",
    screenshot: "/screenshots/shortsai.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Bangas",
    description: "Prompt-free AI ads | Creative OS for performance marketers",
    url: "https://bangas.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bangas.ai&sz=128",
    screenshot: "/screenshots/bangas.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SaaS Blueprint",
    description: "Ship faster with a production-ready SaaS blueprint that includes auth, Stripe, protected routes, docs, and Cloudflare deployment out of the box.",
    url: "https://saasblueprint.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=saasblueprint.app&sz=128",
    screenshot: "/screenshots/saas-blueprint.webp",
    dateAdded: "2026-03-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Test-Lab.ai",
    description: "Automated QA with AI agents. Find critical UX & flow bugs before launch.",
    url: "https://www.test-lab.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.test-lab.ai&sz=128",
    screenshot: "/screenshots/test-lab-ai.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "DiffScout",
    description: "AI-powered price monitoring that tracks competitor prices on any website. Get instant alerts when prices change\u2014no scrapers or CSS selectors needed.",
    url: "https://diffscout.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=diffscout.com&sz=128",
    screenshot: "/screenshots/diffscout.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "sHabits",
    description: "Minimalist UI focused on building good habits first. \u00b7 Visual tracking, smart reminders, and neat home screen widgets keep you committed. Habits is a simple habit tracker for iOS to build better habits that last. Completely private with a pleasant, minimalist UI and handy tools, it helps create and track meaningful habits, and most importantly stay consistent. MINIMALIST UI Building habits shouldn't be complicated. Our free simple habit tracker is designed to help you focus on progress, not perfection, without the clutter. TOOLS TO BUILD GOOD HABITS From a habit checklist to a visual habit calendar, we provide the tools you need to transform your life. Habits gives you the structure to monitor your triggers and stay disciplined. HABITS APP FEATURES: \u00b7 Habit Streak Tracker: Watch your habit streak grow as you complete tasks. Visual feedback keeps you accountable and motivated to never break the chain. \u00b7 Beautiful Habit Calendar: Visualize your progress with an intuitive, color-coded heatmap. See your long-term consistency at a glance. \u00b7 Smart Habit Reminder: Never forget a task again. Set a custom habit reminder for any time of day to stay on track. \u00b7 Flexible Habit Counter: Track good habits and bad habits your way. Support for multiple completions per day and custom schedules (daily, weekly, or specific days). \u00b7 Habits Widget: Access your simple goal tracker directly from your home screen for even faster logging. At the end of the day, Habits is just a simple habit tracker that works. Use it as a habit checklist for your morning routine or a habit breaker app to improve your wellness. It\u2019s your choice.",
    url: "https://simplyhabits.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=simplyhabits.io&sz=128",
    screenshot: "/screenshots/shabits.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "CookieGuard",
    description: "CookieGuard is a free GDPR & CCPA cookie consent tool that helps websites manage cookie banners and user consent with minimal setup.",
    url: "https://cookieguard.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=cookieguard.co&sz=128",
    screenshot: "/screenshots/cookieguard.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SimpleSeverance",
    description: "Educational platform for severance",
    url: "https://simpleseverance.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=simpleseverance.co&sz=128",
    screenshot: "/screenshots/simpleseverance.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PressBeat",
    description: "AI-native PR agency. Get quoted in organic press on autopilot. 1 article guaranteed per month.",
    url: "https://pressbeat.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pressbeat.io&sz=128",
    screenshot: "/screenshots/pressbeat.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Thrive",
    description: "Master your portfolio. Maximize your potential. Crypto Market Intelligence for Traders.",
    url: "https://thrive.fi",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=thrive.fi&sz=128",
    screenshot: "/screenshots/thrive.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Multic - Multiplayer Comics",
    description: "GenAI Game Engine for Multiplayer Experiences",
    url: "https://www.multic.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.multic.com&sz=128",
    screenshot: "/screenshots/multic--multiplayer-comics.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Roomika",
    description: "Roomika is an AI-powered interior design and virtual staging platform that helps you redesign any room using a photo of your real space. Instead of starting from scratch with mood boards or generic inspiration images, Roomika lets you upload a room photo and instantly generate realistic design concepts that preserve the layout and architecture of your room \u2014 while transforming the style, furniture, and overall vibe. Whether you\u2019re decorating a new home, refreshing a living room, remodeling a kitchen, or trying to make a bedroom feel more modern and comfortable, Roomika makes it easy to explore professional-quality options in minutes. You can choose from a wide range of popular interior styles, from modern and contemporary to minimalist, Scandinavian, Japanese, rustic, and more. Each design is generated with a focus on photorealism so the results look believable, not cartoonish \u2014 and you can generate multiple variations to compare different looks side-by-side. Roomika is also a powerful tool for real estate professionals, Airbnb hosts, and property managers who need high-quality staging visuals fast. With Roomika\u2019s virtual staging features, you can furnish empty rooms, redesign outdated spaces, and create polished \u201cafter\u201d images that help buyers and renters imagine the potential of a property. This is especially useful when you want to test design directions without spending money on physical staging, renovations, or expensive design software. A key advantage of Roomika is its flexibility. You can upload your own inspiration images, describe the changes you want in plain English, and fine-tune designs until they match your taste. Want a brighter color palette? Different flooring? More modern furniture? A cozier aesthetic? Roomika makes it easy to iterate and explore. In addition to still images, Roomika can also generate short design videos that bring the transformation to life \u2014 perfect for sharing on social media, listing pages, or with friends and family. Roomika is built for anyone who wants to design their space with confidence, without needing design experience. It\u2019s fast, simple, and fun to use, while still producing results that feel like something an interior designer might deliver. If you want to quickly visualize design ideas, experiment with styles, or stage a home for sale or rent, Roomika turns your room photo into beautiful, realistic design concepts in just a few clicks.",
    url: "https://www.roomika.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.roomika.ai&sz=128",
    screenshot: "/screenshots/roomika.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "vitelnk",
    description: "Secure Video Sharing Built for Professionals",
    url: "https://vitelnk.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=vitelnk.com&sz=128",
    screenshot: "/screenshots/vitelnk.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Bitvoiper",
    description: "Browser-based calling with Username Proxy system and Comprehensive Call Center Features",
    url: "https://bitvoiper.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bitvoiper.com&sz=128",
    screenshot: "/screenshots/bitvoiper.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Archivist",
    description: "Turn AI-generated chaos into organized deliverables. Custom naming presets, smart collections, and bulk ZIP exports for all who've lost track of files.",
    url: "https://getarchivist.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=getarchivist.org&sz=128",
    screenshot: "/screenshots/archivist.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Binarium",
    description: "Binarium ($BNR) \u2014 The definitive store of value on BNB Chain. Scarce, mineable, and built natively for Binance Smart Chain with on-chain mining.",
    url: "https://binarium.supply",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=binarium.supply&sz=128",
    screenshot: "/screenshots/binarium.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "logostream",
    description: "Company logos & icons for modern travel and finance apps.",
    url: "https://logostream.dev",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=logostream.dev&sz=128",
    screenshot: "/screenshots/logostream.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Squared Away",
    description: "We've all been there. You're standing in your garage, staring at a wall of boxes, trying to remember which one has the camping gear. Or you're at the hardware store, wondering if you already own a 10mm socket set buried somewhere in your basement. The mental inventory we try to keep of our belongings inevitably fails us, and we end up wasting hours searching or buying things we already own. Squared Away is an AI-powered home inventory app that solves this problem by making it effortless to catalog everything you own. The magic is in the simplicity: just snap a photo of an item, and the app's AI does the rest. It automatically identifies what you're looking at, suggests an accurate name, assigns the right category, and generates relevant tags\u2014all in seconds. What used to require tedious manual data entry now happens with a single tap of your camera.",
    url: "https://squaredaway.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=squaredaway.ai&sz=128",
    screenshot: "/screenshots/squared-away.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Bitsave",
    description: "Crypto-fintech platform for emerging markets. Save in digital dollars (USDC) and Bitcoin with verifiable on-chain wallets and instant liquidity.",
    url: "https://bitsafve.com",
    category: "Finance",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bitsafve.com&sz=128",
    screenshot: "/screenshots/bitsave.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "Verifiable on-chain wallet infrastructure",
      "Hedge against inflation with USDC digital dollars",
      "Instant liquidity and mobile-first transactions",
      "Non-custodial design for transparent fund control"

    ],
    integrations: ["iOS", "Android", "Bitcoin", "USDC"]
  },
  {
    name: "Bank PDF Converter",
    description: "The most accurate bank statement converter. Convert PDF to Excel and CSV with automatic transaction validation\u2014works with any bank, any language.",
    url: "https://bankpdfconverter.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bankpdfconverter.com&sz=128",
    screenshot: "/screenshots/bank-pdf-converter.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Tech Twitter",
    description: "Finding signal on X is more difficult than it used to be on Twitter. We curate the best tweets on topics like AI, startups, and product development every weekday at 10 AM EST so you can focus on what matters.",
    url: "https://www.techtwitter.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.techtwitter.com&sz=128",
    screenshot: "/screenshots/tech-twitter.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Ai Angels",
    description: "AI Angels is an AI companion platform offering realistic conversations, emotional connection, and immersive virtual personalities, with free chat and the ability to unlock sexy videos from your AI companions for private and engaging digital interactions.",
    url: "https://www.aiangels.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.aiangels.io&sz=128",
    screenshot: "/screenshots/ai-angels.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ModulEdge",
    description: "ModulEdge is a tech-driven manufacturer of modular data centers that bridges the gap between high-load AI hardware and legacy enterprise IT infrastructure. By combining advanced hybrid cooling with specialized environmental hardening, we enable the rapid deployment of on-prem AI modular data centers, general compute clusters, and secure data backups. Unlike traditional construction, every ModulEdge system is factory-integrated and delivered in just 3\u20136 months, providing a plug-and-play solution for sites with power, cooling, or site constraints.",
    url: "https://www.moduledge.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.moduledge.com&sz=128",
    screenshot: "/screenshots/moduledge.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ArchRender",
    description: "Photorealistic AI Rendering for Architects & Designers",
    url: "https://www.archrender.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.archrender.ai&sz=128",
    screenshot: "/screenshots/archrender.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "CleanMark",
    description: "**Dual Functionality:** - Remove text watermarks from NotebookLM PDFs (bottom-right corner) - Remove watermarks from Gemini AI-generated images \ud83d\udd2c **Advanced Technology:** - Powered by OpenCV inpainting algorithms for seamless removal - Directly processes embedded PDF images to maintain resolution - Smart watermark detection that works on both light and dark backgrounds - Supports large files up to 100MB \u2728 **User-Friendly Experience:** - One-click upload and process - Preview results before downloading - No software installation required - Batch processing support - Fast processing (typically under 30 seconds)",
    url: "https://geminiwatermarkremover.net",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=geminiwatermarkremover.net&sz=128",
    screenshot: "/screenshots/cleanmark.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Time",
    description: "Time is a native macOS menu bar app for managing time zones and calendar events. Track unlimited zones, see when teammates are awake, and join meetings with one click.",
    url: "https://menubartime.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=menubartime.com&sz=128",
    screenshot: "/screenshots/time.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Docutracker",
    description: "Docutracker lets you see when and how people read your documents, providing real-time engagement analytics to optimize follow-ups. Docutracker lets you see when and how people read your documents, providing real-time engagement analytics to optimize follow-ups.",
    url: "https://docutracker.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=docutracker.io&sz=128",
    screenshot: "/screenshots/docutracker.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Invoplex",
    description: "Invoplex is an invoicing tool for freelancers, creators and service-based businesses to create quotes, send invoices, track payments, and manage clients without the bloated accounting software.",
    url: "https://invoplex.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=invoplex.com&sz=128",
    screenshot: "/screenshots/invoplex.webp",
    dateAdded: "2026-03-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Tekadio",
    description: "Automated test creation and evaluation powered by AI",
    url: "https://tekadio.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=tekadio.app&sz=128",
    screenshot: "/screenshots/tekadio.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Allscreenshots",
    description: "Allscreenshots provides a screenshot API that helps developers and businesses capture, combine, and automate website screenshots at scale. Our platform powers visual documentation, social media previews, competitive monitoring, and reporting workflows for teams who need reliable, programmatic screenshot generation. With features like multi-screenshot composition and flexible layout options, we make it easy to turn any URL into pixel-perfect images, without maintaining browser infrastructure. Capture the web, one screenshot at a time.",
    url: "https://allscreenshots.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=allscreenshots.com&sz=128",
    screenshot: "/screenshots/allscreenshots.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "POPJAM",
    description: "Agentic marketing suite to generate and creatives and simulate reactions of audience segments",
    url: "https://popjam.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=popjam.io&sz=128",
    screenshot: "/screenshots/popjam.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Argus AI",
    description: "The Argus Nav App turns existing DOT traffic cameras into real-time safety alerts for truck drivers. We detect crashes and abnormal slowdowns in under 10 seconds, then deliver simple, route\u2011aware notifications in the background while drivers use their existing navigation tools. Fleets can choose specific corridors or regions, and every alert is designed to reduce surprise events, secondary crashes, and lost time without adding distraction in the cab. Argus also surfaces truck\u2011specific points of interest for fleets and owner\u2011operators, including truck parking, fuel stops, DOT and weight scales, toll locations, hazmat road restrictions, and truck\u2011size\u2011aware routing across US and North American highways.",
    url: "https://www.getargus.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.getargus.ai&sz=128",
    screenshot: "/screenshots/argus-ai.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "CNTRCTRS",
    description: "cntrctrs takes the guesswork out of hiring home service professionals. We have pre-verified the top 1% of local experts in HVAC, plumbing, and electrical services so you don't have to scroll through endless reviews. Simply submit your project details once, and our data-driven matching system connects you with up to five licensed, insured, and reputation-checked professionals in your neighborhood. The service is completely free for homeowners, with no obligation to hire. Unlike other platforms, we prioritize quality over pay-to-play rankings, ensuring you only receive quotes from trusted experts who have passed our rigorous vetting protocol.",
    url: "https://www.cntrctrs.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.cntrctrs.com&sz=128",
    screenshot: "/screenshots/cntrctrs.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "LocalBiz",
    description: "LocalBiz is an AI-powered platform that helps service businesses grow local SEO by generating location-focused blog content.",
    url: "https://www.localbiz.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.localbiz.ai&sz=128",
    screenshot: "/screenshots/localbiz.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Ultimate Tools",
    description: "Ultimate Tools is a weekly newsletter and directory that helps you discover new marketing tools and incredibly useful websites.",
    url: "https://ultimatetools.eu",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=ultimatetools.eu&sz=128",
    screenshot: "/screenshots/ultimate-tools.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SnapToWindow",
    description: "Snap windows to halves, quarters, thirds, and more using keyboard shortcuts. Built with Tauri, Rust, and TypeScript for native performance and a small footprint.",
    url: "https://snaptowindow.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=snaptowindow.com&sz=128",
    screenshot: "/screenshots/snaptowindow.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "The Gold Calculator",
    description: "The Gold Calculator - Calculate Melt Value of Your Scrap Gold",
    url: "https://thegoldcalculator.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=thegoldcalculator.com&sz=128",
    screenshot: "/screenshots/the-gold-calculator.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Nicegram",
    description: "Open\u2011source Telegram client, privacy\u2011first, with a non\u2011custodial multichain wallet, a built\u2011in AI assistant and Agent Marketplace, escrow payments, and a trusted reputation \u2014 all inside your chats.",
    url: "https://nicegram.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=nicegram.app&sz=128",
    screenshot: "/screenshots/nicegram.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AyeCreate",
    description: "Allscreenshots provides a screenshot API that helps developers and businesses capture, combine, and automate website screenshots at scale. Our platform powers visual documentation, social media previews, competitive monitoring, and reporting workflows for teams who need reliable, programmatic screenshot generation. With features like multi-screenshot composition and flexible layout options, we make it easy to turn any URL into pixel-perfect images, without maintaining browser infrastructure. Capture the web, one screenshot at a time.",
    url: "https://ayecreate.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=ayecreate.ai&sz=128",
    screenshot: "/screenshots/ayecreate.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Map Your Voyage",
    description: "Plan trips from Instagram reels in minutes, not weeks!",
    url: "https://mapyourvoyage.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=mapyourvoyage.com&sz=128",
    screenshot: "/screenshots/map-your-voyage.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Beatable",
    description: "Beatable helps founders and investors validate business in seconds. The platform delivers in-depth competitor analysis, market intelligence, and actionable insights to uncover opportunities, assess risks, and understand the market landscape before making the next move.",
    url: "https://beatable.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=beatable.co&sz=128",
    screenshot: "/screenshots/beatable.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Sana Mujer",
    description: "We built Sana Mujer to solve a very specific access problem: millions of Spanish-speaking women live in the US, but most telehealth and clinic experiences are English-first. Sana Mujer is a niche telemedicine clinic in Spanish for women (18\u201350) living in the US, focused on: Contraceptives (pills, patch, ring, injection depending on state) Topical skin & hair treatments Common feminine infections (UTIs, candidiasis, BV) We provide treatment online in 26 states of the USA.",
    url: "https://www.sanamujer.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.sanamujer.com&sz=128",
    screenshot: "/screenshots/sana-mujer.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Bolta",
    description: "Bolta.ai is a social media operating system that helps creators, founders, and teams plan, write, review, and publish content consistently across platforms. Instead of juggling tools, Bolta brings scheduling, crossposting, and brand-consistent writing into one calm, structured workflow.",
    url: "https://bolta.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bolta.ai&sz=128",
    screenshot: "/screenshots/bolta.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "PentestMate",
    description: "Autonomous pentesting agents that test your app and deliver fix ready reports.",
    url: "https://pentestmate.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=pentestmate.com&sz=128",
    screenshot: "/screenshots/pentestmate.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AyeWatch AI",
    description: "Personal AI Internet Monitor, that brings internet to you",
    url: "https://ayewatch.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=ayewatch.ai&sz=128",
    screenshot: "/screenshots/ayewatch-ai.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AI Thumbnail",
    description: "Create clickable YouTube thumbnails with AI by copying what already works and making it yours.",
    url: "https://aithumbnail.gg",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=aithumbnail.gg&sz=128",
    screenshot: "/screenshots/ai-thumbnail.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "feynn - Strategic Intelligence Platform",
    description: "Structured intelligence, powered by AI",
    url: "https://feynn.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=feynn.ai&sz=128",
    screenshot: "/screenshots/feynn--strategic-intelligence-platform.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Qeeebo",
    description: "AI-curated question-and-answer platform built to become the world\u2019s largest.",
    url: "https://www.qeeebo.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.qeeebo.com&sz=128",
    screenshot: "/screenshots/qeeebo.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Markeplay",
    description: "No-code AI-powered SaaS platform enabling rapid creation of complex, highly customizable e-commerce solutions for B2B manufacturing companies and made-to-order product businesses.",
    url: "https://www.markeplay.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.markeplay.com&sz=128",
    screenshot: "/screenshots/markeplay.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Cursor for Marketing Emails",
    description: "saas, marketing, email marketing, mailchimp, cursor",
    url: "https://sequenzy.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=sequenzy.com&sz=128",
    screenshot: "/screenshots/cursor-for-marketing-emails.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Suburb Stack",
    description: "Launch hundreds or thousands of locally targeted, conversion-optimized landing pages built to rank and convert for SEO and Google Ads.",
    url: "https://suburbstack.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=suburbstack.com&sz=128",
    screenshot: "/screenshots/suburb-stack.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Crypto News Navigator",
    description: "Crypto News Navigator is a trusted source for real-time crypto prices and market data. News and trends included.",
    url: "https://www.cryptonewsnavigator.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.cryptonewsnavigator.com&sz=128",
    screenshot: "/screenshots/crypto-news-navigator.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "3dSynth.app",
    description: "A browser-based tool that skips the STL/Slicer workflow entirely.",
    url: "https://3dSynth.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=3dSynth.app&sz=128",
    screenshot: "/screenshots/3dsynth-app.webp",
    dateAdded: "2026-02-22",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SlidesCockpit",
    description: "Clone Viral TikToks For Your Product With AI & Auto-Post.",
    url: "https://slidescockpit.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=slidescockpit.com&sz=128",
    screenshot: "/screenshots/slidescockpit.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "BookSwift",
    description: "Appointment scheduling app for independent service providers and small teams. Appointment scheduling app for independent service providers and small teams. Appointment scheduling app for independent service providers and small teams. Appointment scheduling app for independent service providers and small teams.",
    url: "https://www.bookswift.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.bookswift.app&sz=128",
    screenshot: "/screenshots/bookswift.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AIRankPilot",
    description: "AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exactly what to publish and helps you create content that search engines and AI can understand and recommend.",
    url: "https://AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exactly what to publish and helps you create content that search engines and AI can understand and recommend.",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exactly what to publish and helps you create content that search engines and AI can understand and recommend.&sz=128",
    screenshot: "/screenshots/airankpilot.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Oravida AI",
    description: "Oravida AI",
    url: "https://orav.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=orav.ai&sz=128",
    screenshot: "/screenshots/oravida-ai.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "StrideFuel",
    description: "Built for weight loss success\u2014especially GLP-1 users. AI coaching, voice logging, photo recognition, HealthKit sync. Your trainer adapts to you. Free 7-day trial.",
    url: "https://stride-fuel.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=stride-fuel.com&sz=128",
    screenshot: "/screenshots/stridefuel.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Floowed",
    description: "Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, and enriches application data using AI, flags risks and fraud, and lets teams design custom workflows and metrics without engineering.",
    url: "https://Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, and enriches application data using AI, flags risks and fraud, and lets teams design custom workflows and metrics without engineering.",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, and enriches application data using AI, flags risks and fraud, and lets teams design custom workflows and metrics without engineering.&sz=128",
    screenshot: "/screenshots/floowed.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Kataloop",
    description: "Kataloop is a Berlin-based creative agency specializing in Webflow websites with high design and technical standards. In addition,",
    url: "https://www.kataloop.com/en",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.kataloop.com&sz=128",
    screenshot: "/screenshots/kataloop.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Computer Keyboard Shortcuts",
    description: "The ultimate guide to computer keyboard shortcuts and hotkeys for Windows and MacOS.",
    url: "https://computerkeyboardshortcuts.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=computerkeyboardshortcuts.org&sz=128",
    screenshot: "/screenshots/computer-keyboard-shortcuts.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Hypnotype",
    description: "The 'Kinetic Typography' engine for audio creators. Transforms podcasts and essays into high-retention text animations that force the viewer to read along.",
    url: "https://hypnotype.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=hypnotype.app&sz=128",
    screenshot: "/screenshots/hypnotype.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AgentGatePay",
    description: "Complete payment infrastructure for autonomous AI agents",
    url: "https://www.agentgatepay.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.agentgatepay.com&sz=128",
    screenshot: "/screenshots/agentgatepay.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Email Ferret",
    description: "AI personal assistant for Gmail.",
    url: "https://emailferret.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=emailferret.io&sz=128",
    screenshot: "/screenshots/email-ferret.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "imejis.io",
    description: "Imejis.io is a bulk image generator and automated image creation platform that helps you create, customize, and generate social media images at scale using prebuilt templates, public links, and automation.",
    url: "https://www.imejis.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.imejis.io&sz=128",
    screenshot: "/screenshots/imejis-io.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SlideWhisper",
    description: "SlideWhisper",
    url: "https://www.slidewhisper.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.slidewhisper.com&sz=128",
    screenshot: "/screenshots/slidewhisper.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ChattyFit",
    description: "AI powered personal trainer in your pocket.",
    url: "https://chatty.fit",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=chatty.fit&sz=128",
    screenshot: "/screenshots/chattyfit.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Overvisual",
    description: "Overvisual lets you create Instagram Story series in minutes. Upload your photos/videos and AI automatically places text, highlights key words, chooses backgrounds, and suggests interactive widgets. It detects faces, important objects, and context to design layouts that actually fit your content. Choose from multiple brand kits, styles, and moods.",
    url: "https://www.overvisual.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.overvisual.com&sz=128",
    screenshot: "/screenshots/overvisual.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Festkl\u00e4nningar",
    description: "Hitta din festkl\u00e4nning smidigt idag!",
    url: "https://xn--festklnning-q8a.se",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=xn--festklnning-q8a.se&sz=128",
    screenshot: "/screenshots/festklänningar.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "\u00c4gglossning",
    description: "Vi har all information du kan t\u00e4nka dig beh\u00f6va kring \u00e4gglossning, som vad \u00e4r symptom, \u00e4gglossnings kalkulator och mycket mer.",
    url: "https://xn--gglossning-p5a.se",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=xn--gglossning-p5a.se&sz=128",
    screenshot: "/screenshots/ägglossning.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "https://www.vidmix.ai",
    description: "AI Song Generator is an easy-to-use platform that creates high-quality, royalty-free music in various styles, perfect for videos, ads, and creative projects.",
    url: "https://sadasdsad",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=sadasdsad&sz=128",
    screenshot: "/screenshots/https://www-vidmix-ai.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "nanabanana-pro",
    description: "A powerful AI image generation platform delivering high-quality visuals from simple text prompts. Designed for fast creation, flexible styling, and efficient visual production across various creative needs.",
    url: "https://nanabanana-pro.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=nanabanana-pro.com&sz=128",
    screenshot: "/screenshots/nanabanana-pro.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "sdadsadsad",
    description: "asdad",
    url: "https://www.vidmix.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.vidmix.ai&sz=128",
    screenshot: "/screenshots/sdadsadsad.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "YouTube Transcript Generator \u2013 Free",
    description: "Instantly convert YouTube videos to text",
    url: "https://youtubetranscripts.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=youtubetranscripts.org&sz=128",
    screenshot: "/screenshots/youtube-transcript-generator-–-free.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Generate Metadata",
    description: "Generate Metadata is a CMS built for SEO, helping users automate or fine-tune metadata with AI. From indie hackers to SEO agencies and midsized companies, it makes optimizing websites easier, faster, and more effective.",
    url: "https://www.generate-metadata.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.generate-metadata.com&sz=128",
    screenshot: "/screenshots/generate-metadata.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "MakeBestMusic",
    description: "AI Music Generation Products.",
    url: "https://makebestmusic.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=makebestmusic.com&sz=128",
    screenshot: "/screenshots/makebestmusic.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "seedance",
    description: "https://www.seedance.ai/[Seedance AI](https://www.seedance.ai/Seedance deepens the link between movement, sound, and emotion. Dancers tune into not just the beat of the music but its nuances\u2014the rise and fall of a vocalist\u2019s tone, the swell of an orchestra, or the pause between notes.",
    url: "https://www.seedance.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.seedance.ai&sz=128",
    screenshot: "/screenshots/seedance.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SyncGTM",
    description: "GTM orchestration platform (formerly Reasonyx). Use AI research agents to source leads, enrich data via 30+ providers, and automate outreach based on buying signals.",
    url: "https://reasonyx.com",
    category: "Sales",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=reasonyx.com&sz=128",
    screenshot: "/screenshots/syncgtm.webp",
    dateAdded: "2026-02-15",
    features: [
      
      "Waterfall enrichment with 30+ data providers",
      "Autonomous AI research agents for lead qualification",
      "Real-time signal monitoring (LinkedIn, Reddit, Funding)",
      "No-code GTM workflow and automation builder"

    ],
    integrations: ["LinkedIn", "HubSpot", "Salesforce", "Slack", "REST API"]
  },
  {
    name: "SEO mode",
    description: "More backlinks. More traffic. More chances to get your first customers",
    url: "https://seomode.co",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=seomode.co&sz=128",
    screenshot: "/screenshots/seo-mode.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Generator AI Music Free Online",
    description: "AI Song Generator is an easy-to-use platform that creates high-quality, royalty-free music in various styles, perfect for videos, ads, and creative projects.",
    url: "https://www.generatoraimusic.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.generatoraimusic.com&sz=128",
    screenshot: "/screenshots/generator-ai-music-free-online.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "AI Song Generator Free Online",
    description: "AI Song Generator is an easy-to-use platform that creates high-quality, royalty-free music in various styles, perfect for videos, ads, and creative projects.",
    url: "https://aisongsgenerator.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=aisongsgenerator.com&sz=128",
    screenshot: "/screenshots/ai-song-generator-free-online.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ActionAgents AI",
    description: "ActionAgents.co is the world\u2019s #1 marketplace to hire AI Agents. From analyzing chats to building websites or finding gifts, our diverse agents cater to all needs",
    url: "https://www.linkedin.com/company/actionagents-ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.linkedin.com&sz=128",
    screenshot: "/screenshots/actionagents-ai.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Reachfast.ai",
    description: "Reachfast.ai is an Ai-powered contact lookup tool to find direct phone numbers and emails of 385M+ professionals just by using their linkedin urls With the Reachfast Application, you can streamline your outreach, enhance your CRM, and accelerate your workflow.",
    url: "https://reachfast.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=reachfast.ai&sz=128",
    screenshot: "/screenshots/reachfast-ai.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Fakeface",
    description: "Fakeface is a free unlimited video face swap tool with ease, speed, and top-notch quality.",
    url: "https://fakeface.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=fakeface.io&sz=128",
    screenshot: "/screenshots/fakeface.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "The Builder Market Moodboard",
    description: "The Builder Market Moodboards is a cutting-edge design tool that allows homeowners, interior designers, and professionals to create stunning, personalized moodboards with ease. Whether you're planning a renovation, redesigning a space, or gathering inspiration for your next home project, this intuitive platform helps bring your vision to life.",
    url: "https://thebuildermarket.com/content/moodboards",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=thebuildermarket.com&sz=128",
    screenshot: "/screenshots/the-builder-market-moodboard.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "websparks",
    description: "Build websites & apps faster with WebSparks, the AI software engineer. Empowering developers & non-coders to create production-ready applications quickly.",
    url: "https://websparkAs.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=websparkAs.ai&sz=128",
    screenshot: "/screenshots/websparks.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Acta ai AI Meeting Note Taker",
    description: "Acta is a cutting-edge platform designed to streamline meeting conversations, placeholder for all your meeting discussions and structured way of following up on Action points.",
    url: "https://acta.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=acta.ai&sz=128",
    screenshot: "/screenshots/acta-ai-ai-meeting-note-taker.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "BypassGPT",
    description: "Join 50,000+ Writers Using BypassGPT.org to Bypass AI Detection. BypassGPT: Transform AI Text into 100% Human Content Instantly! \ud83d\udd25 The Most Advanced AI Humanizer Tool. Free Forever!",
    url: "https://bypassgpt.org",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=bypassgpt.org&sz=128",
    screenshot: "/screenshots/bypassgpt.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ClyrBG",
    description: "Background removal shouldn't be a chore. ClyrBG's AI makes it a joyful experience.Remove, Change & Add custom background with the help of AI in a giffy",
    url: "https://clyrbg.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=clyrbg.com&sz=128",
    screenshot: "/screenshots/clyrbg.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Cloudbooklet AI",
    description: "Cloudbooklet AI: Your go-to platform for AI tools and image generation.",
    url: "https://www.cloudbooklet.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.cloudbooklet.com&sz=128",
    screenshot: "/screenshots/cloudbooklet-ai.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "JobsAICopilot",
    description: "JobsAICopilot is an advanced AI-driven platform designed to automate the entire job application process for job seekers.",
    url: "https://jobsaicopilot.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=jobsaicopilot.com&sz=128",
    screenshot: "/screenshots/jobsaicopilot.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Vidnoz AI",
    description: "Create Free AI Videos in Minutes with Vidnoz AI",
    url: "https://www.vidnoz.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.vidnoz.com&sz=128",
    screenshot: "/screenshots/vidnoz-ai.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Lightroom Preset Generator",
    description: "The Lightroom Preset Generator at Legendary Presets is an innovative AI tool designed for photographers who seek to streamline their editing process while maintaining creative control.",
    url: "https://legendarypresets.com/lightroom-preset-generator",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=legendarypresets.com&sz=128",
    screenshot: "/screenshots/lightroom-preset-generator.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "ThatsMyAI",
    description: "\"ThatsMyAI is a platform that helps individuals and businesses find the most suitable AI solutions for their specific needs. By providing AI-driven insights and tools, it empowers users to make informed decisions and stay ahead of the competition. \"",
    url: "https://thatsmy.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=thatsmy.ai&sz=128",
    screenshot: "/screenshots/thatsmyai.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Cognexo",
    description: "AI gamified learning & surveys.",
    url: "https://cognexo.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=cognexo.com&sz=128",
    screenshot: "/screenshots/cognexo.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Onion AI",
    description: "Streamlined AI-powered search engine aggregator that lets you switch seamlessly between various AI search engines with no login required.",
    url: "https://onionai.so",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=onionai.so&sz=128",
    screenshot: "/screenshots/onion-ai.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "Unified interface for multiple AI search engines",
      "No login required for instant search access",
      "Seamless switching between search models",
      "Privacy-focused with local storage only"

    ]
  },
  {
    name: "AI Chatbot Support",
    description: "Autonomous AI chatbot and unified customer support dashboard that centralizes communications from websites, WhatsApp, and social media.",
    url: "https://aichatbot.support",
    category: "Marketing",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=aichatbot.support&sz=128",
    screenshot: "/screenshots/ai-chatbot-support.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "Unified dashboard for WhatsApp, Instagram, and Web",
      "Autonomous AI training from website content and PDFs",
      "AI-powered message regeneration and smart replies",
      "Multi-lingual translation for global customer support"

    ]
  },
  {
    name: "Autopilot Shorts",
    description: "Autopilot Shorts is an AI tool designed for generating faceless video shorts. It allows users to create unique videos automatically, using advanced technologies such as GPT-4 and Claude Sonnet.",
    url: "https://autopilotshorts.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=autopilotshorts.com&sz=128",
    screenshot: "/screenshots/autopilot-shorts.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "JobBuddy",
    description: "JobBuddy is an AI-powered tool that simplifies the job application process, helping you create professional, tailored resumes and cover letters that stand out.",
    url: "https://jobbuddytech.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=jobbuddytech.com&sz=128",
    screenshot: "/screenshots/jobbuddy.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Roast My Landing Page",
    description: "RoastMyLandingPage.io is a tool that offers actionable, AI-driven feedback for optimizing landing pages.",
    url: "https://roastmylandingpage.io",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=roastmylandingpage.io&sz=128",
    screenshot: "/screenshots/roast-my-landing-page.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Tweet Fast",
    description: "TweetFast is a comprehensive AI-powered platform designed to revolutionize your Twitter content creation process.",
    url: "https://twtfast.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=twtfast.com&sz=128",
    screenshot: "/screenshots/tweet-fast.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Libretto.fm",
    description: "Libretto is a complete toolkit for audio and video creators, designed to simplify every step of the production process.",
    url: "https://libretto.fm",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=libretto.fm&sz=128",
    screenshot: "/screenshots/libretto-fm.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SubmitSaaS",
    description: "SubmitSaaS handles your submissions to 100+ directories, saving you time and improving SEO. We focus on high-quality platforms to help your SaaS attract more traffic, while you get a detailed report.",
    url: "https://submitsaas.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=submitsaas.com&sz=128",
    screenshot: "/screenshots/submitsaas.webp",
    dateAdded: "2026-02-08",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Good AI Tools",
    description: "GoodAITools.com helps you discover top AI tools for various needs. Explore AI applications for productivity, creativity, and more, categorized for easy access. Stay ahead with the best AI solutions.",
    url: "https://goodaitools.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=goodaitools.com&sz=128",
    screenshot: "/screenshots/good-ai-tools.webp",
    dateAdded: "2026-02-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Skail",
    description: "Skail.ai is an AI-powered email automation tool that crafts personalized emails in your unique style. It integrates with CRMs and datasets, learns from your writing, and can send messages autonomously. It\u2019s secure, adaptable, and privacy-focused.",
    url: "https://skail.ai",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=skail.ai&sz=128",
    screenshot: "/screenshots/skail.webp",
    dateAdded: "2026-02-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "SEO AI Bot",
    description: "SEO AI BOT automates content creation, SEO, and publishing, helping you quickly generate high-quality, search-optimized articles with minimal effort.",
    url: "https://www.seoaibot.com",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.seoaibot.com&sz=128",
    screenshot: "/screenshots/seo-ai-bot.webp",
    dateAdded: "2026-02-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "Dev Blocks",
    description: "Get the perfect product launch plan with Notion templates",
    url: "https://www.devblocks.app",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=www.devblocks.app&sz=128",
    screenshot: "/screenshots/dev-blocks.webp",
    dateAdded: "2026-02-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  },
  {
    name: "QuizCraft",
    description: "Generate customized quiz questions in seconds. Perfect for teachers, students and knowledge enthusiasts.",
    url: "https://quizcraft.de",
    category: "Productivity",
    tags: { price: "Freemium" },
    image: "https://www.google.com/s2/favicons?domain=quizcraft.de&sz=128",
    screenshot: "/screenshots/quizcraft.webp",
    dateAdded: "2026-02-01",
    features: [
      
      "AI-powered automation",
      "Streamlined workflow",
      "Easy integration"

    ]
  }
];
