import { EnrichedExampleRecord } from './types';

export const localSocialExamples: EnrichedExampleRecord[] = [
  {
    id: "jordan-crawford-exa-ab-test",
    title: "A/B Testing Exa against itself",
    slug: "jordan-crawford-exa-ab-test",
    summary: "Jordan Crawford built a lead validation pipeline using Exa, a LinkedIn scraper, and Claude Haiku. He discovered that raw search data has a 39% error rate. The fix: a multi-step workflow that discovers, enriches, and validates every profile for just $0.04 per lead. Jordan is worth listening to when it comes to digging data gold with the help of LLMs, among many other things. I would recommend checking out his LinkedIn for useful tips.",
    screenshots: [
      {
        url: "/images/examples/2026-05-03-maja-voje-ab-testing-exa.webp",
        filename: "2026-05-03-maja-voje-ab-testing-exa.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-05-03-maja-voje-ab-testing-exa.webp" },
          large: { url: "/images/examples/2026-05-03-maja-voje-ab-testing-exa.webp" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "2026-06-02",
    original_link: "https://edge.blueprintgtm.com/p/i-ab-tested-exa-against-itself-the",
    author_name: "Jordan Crawford",
    author_link: "https://www.linkedin.com/in/jordancrawford/",
    tags: ["Lead Gen", "Validation", "Data Ops"],
  },
  {
    id: "tobias-schneider-deterministic-data-agents",
    title: "Building Reliable Data Pipelines with AI Agents",
    slug: "tobias-schneider-deterministic-data-agents",
    summary: "Tobias Schneider recommends using agents to write deterministic scripts rather than letting models transpose data directly. Direct LLM enrichment often leads to silent hallucinations across thousands of rows. Scripts are the only way to build reliable pipelines at scale. I have made the mistake of using LLMs to enrich web data on multiple occasions. Even with web fetch tools, the model may not actually access the site and still act like it did the work. If you ask later, it may admit it missed the page, but not explain where it went wrong. That is how you end up with a pile of garbage data.",
    screenshots: [
      {
        url: "/images/examples/2026-05-03-tobias-claude-artifacts.webp",
        filename: "2026-05-03-tobias-claude-artifacts.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-05-03-tobias-claude-artifacts.webp" },
          large: { url: "/images/examples/2026-05-03-tobias-claude-artifacts.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-06-01",
    original_link: "https://x.com/tobiaschneider/status/2048357912955769137",
    author_name: "Tobias Schneider",
    author_link: "https://x.com/tobiaschneider",
    tags: ["Data Ops", "Reliability", "Agents"],
  },
  {
    id: "gippp69-meeting-notes-agent",
    title: "The Expired Patent Arbitrage System",
    slug: "gippp69-expired-patent-arbitrage",
    summary: "@gippp69 uses Claude to filter millions of public domain patents for commercial viability. By scraping the USPTO Bulk Data portal and scoring expired utility patents based on manufacturing complexity and Amazon gaps, he identifies products that once worked but stopped being made. Examples include a self-watering planter ($1.80 cost vs $14 retail) and a snap-lock collapsible pet bowl ($0.95 cost). It is a pure arbitrage play: $0 for the blueprint, high margins on Amazon.",
    screenshots: [
      {
        url: "/images/examples/2026-05-04-gippp69-patent-system.png",
        filename: "2026-05-04-gippp69-patent-system.png",
        thumbnails: {
          small: { url: "/images/examples/2026-05-04-gippp69-patent-system.png" },
          large: { url: "/images/examples/2026-05-04-gippp69-patent-system.png" }
        }
      }
    ],
    category: "Productivity",
    publish_date: "2026-06-03",
    original_link: "https://x.com/gippp69/status/2049131801780658541",
    author_name: "@gippp69",
    author_link: "https://x.com/gippp69",
    tags: ["Productivity", "Ecommerce", "Claude", "Patents", "Automation"],
  },
  {
    id: "nikillinit-research-agent-army",
    title: "How to Build a Research Agent Army",
    slug: "nikillinit-research-agent-army",
    summary: "Nikhil Krishnan's takeaway from healthcare LLM workshops is simple: the first skill is not a workflow, it's learning to ask Claude for help when you're stuck. That means taking a screenshot, asking what to do next, using the model to improve the process itself, and pushing for explanations that match how you think. It is the same muscle as learning to Google well. The real lesson for readers is that AI becomes useful faster when you treat it like a debugging partner, not a person you wait on for answers.",
    screenshots: [
      {
        url: "/images/examples/2026-05-03-nikillinit-research-agent.webp",
        filename: "2026-05-03-nikillinit-research-agent.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-05-03-nikillinit-research-agent.webp" },
          large: { url: "/images/examples/2026-05-03-nikillinit-research-agent.webp" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "2026-06-02",
    original_link: "https://x.com/nikillinit/status/2049867803184804124",
    author_name: "Nikhil Krishnan",
    author_link: "https://x.com/nikillinit",
    tags: ["Marketing", "Research", "Agents"],
  },
  {
    id: "khalidwarsa-email-shortener",
    title: "The 50% Rule for Email Clarity",
    slug: "khalidwarsa-email-shortener",
    summary: "Khalid Warsame uses a simple prompt to cut corporate fluff from his inbox. He forces the AI to rewrite emails to be exactly 50% shorter. It kills the filler while keeping the core message and original tone intact.",
    screenshots: [
      {
        url: "/images/examples/2026-05-03-khalidwarsa-ai-agents.webp",
        filename: "2026-05-03-khalidwarsa-ai-agents.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-05-03-khalidwarsa-ai-agents.webp" },
          large: { url: "/images/examples/2026-05-03-khalidwarsa-ai-agents.webp" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "2026-05-08",
    original_link: "https://x.com/KhalidWarsa/status/2050211442842915184",
    author_name: "Khalid Warsame",
    author_link: "https://x.com/KhalidWarsa",
    tags: ["Email", "Productivity", "Writing"],
  },
  {
    id: "recap-david-claude-automation",
    title: "Claude Cowork Automation",
    slug: "recap-david-claude-automation",
    summary: "David Roberts automated his daily content marketing with Claude Cowork. Saved ~4 hours a week.",
    screenshots: [
      {
        url: "/images/examples/2026-01-21-david-roberts-recap-david-on-x.jpg",
        filename: "2026-01-21-david-roberts-recap-david-on-x.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-21-david-roberts-recap-david-on-x.jpg" },
          large: { url: "/images/examples/2026-01-21-david-roberts-recap-david-on-x.jpg" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-09",
    original_link: "https://x.com/recap_david/status/2013711400342818819",
    author_name: "David Roberts",
    author_link: "https://x.com/recap_david",
    tags: ["Automation", "Claude"],
  },
  {
    id: "lkr-connecting-stripe-with-claude-code",
    title: "Connecting Stripe with Claude Code",
    slug: "lkr-connecting-stripe-with-claude-code",
    summary: "Laura Roeder plugged Stripe into Claude Code with a read-only API key. Now it pulls her business data on demand. No more manual exports.",
    screenshots: [
      {
        url: "/images/examples/2026-01-22-lkr-connecting-stripe-with-claude-code.jpg",
        filename: "2026-01-22-lkr-connecting-stripe-with-claude-code.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-22-lkr-connecting-stripe-with-claude-code.jpg" },
          large: { url: "/images/examples/2026-01-22-lkr-connecting-stripe-with-claude-code.jpg" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-10",
    original_link: "https://x.com/lkr/status/2013653497120804994",
    author_name: "Laura Roeder",
    author_link: "https://x.com/lkr",
    tags: ["Automation"],
  },
  {
    id: "short-courses-automate-software-dev-creative-workflows-with-gemi",
    title: "Free Course: Gemini CLI for Dev & Creative Workflows",
    slug: "short-courses-automate-software-dev-creative-workflows-with-gemi",
    summary: "DeepLearning.AI released a free course on Gemini CLI + MCP. Shows you how to wire up local files with Google Workspace and Canva, then automate the boring parts.",
    screenshots: [
      {
        url: "/images/examples/2026-01-22-short-courses-automate-software-dev-creative-workflows-with-gemi.jpg",
        filename: "2026-01-22-short-courses-automate-software-dev-creative-workflows-with-gemi.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-22-short-courses-automate-software-dev-creative-workflows-with-gemi.jpg" },
          large: { url: "/images/examples/2026-01-22-short-courses-automate-software-dev-creative-workflows-with-gemi.jpg" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-10",
    original_link: "https://www.deeplearning.ai/short-courses/gemini-cli-code-and-create-with-an-open-source-agent/",
    author_name: "DeepLearning.AI",
    author_link: "https://www.deeplearning.ai",
    tags: ["Gemini", "CLI", "Automation", "Course"],
  },
  {
    id: "aiedge_-getting-started-w-claude-cowork-10-essential-workf",
    title: "Getting Started w/ Claude Cowork: 10 Essential Workflows (+ prompts)",
    slug: "aiedge_-getting-started-w-claude-cowork-10-essential-workf",
    summary: "AI Edge listed 10 ways to start using Claude Cowork. No setup headaches. Just copy the prompts and go.",
    screenshots: [
      {
        url: "/images/examples/2026-01-22-aiedge_-getting-started-w-claude-cowork-10-essential-workf.webp",
        filename: "2026-01-22-aiedge_-getting-started-w-claude-cowork-10-essential-workf.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-01-22-aiedge_-getting-started-w-claude-cowork-10-essential-workf.webp" },
          large: { url: "/images/examples/2026-01-22-aiedge_-getting-started-w-claude-cowork-10-essential-workf.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-10",
    original_link: "https://x.com/aiedge_/status/2013641070815650252",
    author_name: "AI Edge",
    author_link: "https://x.com/aiedge_",
    tags: ["Claude", "Automation", "Workflows"],
  },
  {
    id: "mehtabkarta-ai-workflow-2026-01-23",
    title: "Reverse-Engineer Any Competitor's Promo Calendar",
    slug: "mehtabkarta-ai-workflow-2026-01-23",
    summary: "MehtabKarta fed a competitor's Milled archive into Deep Research. One prompt spat out their entire annual promotion calendar. Seasonal offers, launch timing, the lot.",
    screenshots: [
      {
        url: "/images/examples/2026-01-23-mehtabkarta-ai-workflow.jpg",
        filename: "2026-01-23-mehtabkarta-ai-workflow.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-23-mehtabkarta-ai-workflow.jpg" },
          large: { url: "/images/examples/2026-01-23-mehtabkarta-ai-workflow.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-11",
    original_link: "https://x.com/MehtabKarta/status/2014392743204999396",
    author_name: "MehtabKarta",
    author_link: "https://x.com/MehtabKarta",
    tags: ["Deep Research", "Prompts", "Competitor Analysis"],
  },
  {
    id: "bucco-deep-research-company-overview",
    title: "Deep Research: 13-Point Company Overview",
    slug: "bucco-deep-research-company-overview",
    summary: "BuccoCapital shared a 13-point Deep Research prompt for company analysis. Goes way beyond valuation. Covers positioning, culture, competitive moats, everything.",
    screenshots: [
      {
        url: "/images/examples/2026-01-23-bucco-deep-research-prompt.jpg",
        filename: "2026-01-23-bucco-deep-research-prompt.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-23-bucco-deep-research-prompt.jpg" },
          large: { url: "/images/examples/2026-01-23-bucco-deep-research-prompt.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-11",
    original_link: "https://x.com/buccocapital/status/1995310794339176558",
    author_name: "BuccoCapital",
    author_link: "https://x.com/buccocapital",
    tags: ["Deep Research", "Strategy", "Due Diligence"],
  },
  {
    id: "github-copilot-agents-md-guide",
    title: "How to write a great agents.md",
    slug: "github-copilot-agents-md-guide",
    summary: "GitHub studied 2,500+ repos to find what makes a good agents.md. Three things mattered most: persona, commands, and clear boundaries.",
    screenshots: [
      {
        url: "/images/examples/github-agents-md-guide.jpg",
        filename: "github-agents-md-guide.jpg",
        thumbnails: {
          small: { url: "/images/examples/github-agents-md-guide.jpg" },
          large: { url: "/images/examples/github-agents-md-guide.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/",
    author_name: "GitHub Blog",
    author_link: "https://github.blog",
    tags: ["Agents", "Best Practices", "Copilot", "Blueprints"],
  },
  {
    id: "saastr-ai-agents-directory",
    title: "Scaling SaaS with 20+ AI Agents",
    slug: "saastr-ai-agents-directory",
    summary: "SaaStr runs 8-figure revenue with a tiny team and 20+ AI agents. They published the full directory: mentoring, pitch analysis, sales, the works.",
    screenshots: [
      {
        url: "/images/examples/saastr-ai-agents.jpg",
        filename: "saastr-ai-agents.jpg",
        thumbnails: {
          small: { url: "/images/examples/saastr-ai-agents.jpg" },
          large: { url: "/images/examples/saastr-ai-agents.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://saastr.ai/agents",
    author_name: "SaaStr",
    author_link: "https://saastr.ai",
    tags: ["Use Cases", "SaaS", "Scaling", "Directory"],
  },
  {
    id: "matzner-jon-competitive-podcast-intel",
    title: "Turning Podcasts into Competitive Intel",
    slug: "matzner-jon-competitive-podcast-intel",
    summary: "Jon Matzner feeds competitor podcast transcripts into NotebookLM. Asks one question: 'What can I exploit?' Pulls out strategy details their leadership never meant to share publicly.",
    screenshots: [
      {
        url: "/images/examples/matzner-jon-tweet.jpg",
        filename: "matzner-jon-tweet.jpg",
        thumbnails: {
          small: { url: "/images/examples/matzner-jon-tweet.jpg" },
          large: { url: "/images/examples/matzner-jon-tweet.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://x.com/MatznerJon/status/2006766272990921167",
    author_name: "Jon Matzner",
    author_link: "https://x.com/MatznerJon",
    tags: ["Competitive Intel", "NotebookLM", "Podcasts", "Strategy"],
  },
  {
    id: "doodlestein-deslopify-readme-prompt",
    title: "De-Slopify Your READMEs",
    slug: "doodlestein-deslopify-readme-prompt",
    summary: "Jeffrey Emanuel wrote a prompt that catches AI slop in your docs. Kills the em-dashes, the 'It's not just X' openers, all the robotic filler. One pass and it reads human again.",
    screenshots: [
      {
        url: "/images/examples/doodlestein-tweet.jpg",
        filename: "doodlestein-tweet.jpg",
        thumbnails: {
          small: { url: "/images/examples/doodlestein-tweet.jpg" },
          large: { url: "/images/examples/doodlestein-tweet.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://x.com/doodlestein/status/2007274424383250638",
    author_name: "Jeffrey Emanuel",
    author_link: "https://x.com/doodlestein",
    tags: ["Prompt Engineering", "Documentation", "Writing", "Claude"],
  },
  {
    id: "claude-company-newsletter-automation",
    title: "Build a Company Newsletter in Minutes with Claude",
    slug: "claude-company-newsletter-automation",
    summary: "Claude pulls from Slack, Drive, and Gmail, then spits out a polished company newsletter with charts. No design skills needed. Takes minutes instead of hours.",
    screenshots: [
      {
        url: "/images/examples/claude-company-newsletter.jpg",
        filename: "claude-company-newsletter.jpg",
        thumbnails: {
          small: { url: "/images/examples/claude-company-newsletter.jpg" },
          large: { url: "/images/examples/claude-company-newsletter.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://claude.com/resources/use-cases/create-a-company-newsletter",
    author_name: "Claude Resources",
    author_link: "https://claude.com",
    tags: ["Newsletter", "Automation", "Internal Comms", "Claude"],
  },
  {
    id: "suhail-ai-tutor-prompt",
    title: "The 'Step-by-Step' AI Tutor Prompt",
    slug: "suhail-ai-tutor-prompt",
    summary: "Suhail built a prompt that turns any research paper into a course. The AI won't move on until it quizzes you and you actually get it. Simple idea, surprisingly effective.",
    screenshots: [
      {
        url: "/images/examples/suhail-tweet.jpg",
        filename: "suhail-tweet.jpg",
        thumbnails: {
          small: { url: "/images/examples/suhail-tweet.jpg" },
          large: { url: "/images/examples/suhail-tweet.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://x.com/Suhail/status/1986156328096858361",
    author_name: "Suhail",
    author_link: "https://x.com/Suhail",
    tags: ["Learning", "Prompt Engineering", "Research", "Education"],
  },
  {
    id: "peter-kang-ai-context-and-scenarios",
    title: "Two Strategy Prompts Every Founder Should Steal",
    slug: "peter-kang-ai-context-and-scenarios",
    summary: "Peter Kang does two things with ChatGPT. First, he asks it to write everything it knows about his company (then corrects the mistakes). Second, he feeds it strategy docs and asks for 3-5 year future scenarios. Cheap crystal ball.",
    screenshots: [
      {
        url: "/images/examples/linkedin-post-7390468.jpg",
        filename: "linkedin-post-7390468.jpg",
        thumbnails: {
          small: { url: "/images/examples/linkedin-post-7390468.jpg" },
          large: { url: "/images/examples/linkedin-post-7390468.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-12",
    original_link: "https://www.linkedin.com/feed/update/urn:li:activity:7390468002904776704/",
    author_name: "Peter Kang",
    author_link: "https://www.linkedin.com/in/peterkang",
    tags: ["Strategy", "Scenario Planning", "Context Management", "ChatGPT"],
  },
  {
    id: "ema-totaro-sora-ugc-scripts",
    title: "Fake UGC Videos with Sora That Look Real",
    slug: "ema-totaro-sora-ugc-scripts",
    summary: "Emanuele Totaro wrote Sora prompts that generate 'secretly filmed' phone videos. Shaky camera, bad lighting, people whispering. Looks like real UGC. Works great for ads.",
    screenshots: [
      {
        url: "/images/examples/ema-totaro-tweet.jpg",
        filename: "ema-totaro-tweet.jpg",
        thumbnails: {
          small: { url: "/images/examples/ema-totaro-tweet.jpg" },
          large: { url: "/images/examples/ema-totaro-tweet.jpg" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-12",
    original_link: "https://x.com/ema_totaro/status/1979085561223680377",
    author_name: "Emanuele Totaro",
    author_link: "https://x.com/ema_totaro",
    tags: ["Video AI", "Sora", "UGC", "Ads"],
  },
  {
    id: "soniabaschez-yapping-as-a-service-writing-prompt",
    title: "'Yapping as a Service' Writing Prompt",
    slug: "soniabaschez-yapping-as-a-service-writing-prompt",
    summary: "Sonia Baschez shared her go-to writing prompt. She calls it 'Yapping as a Service.' High volume, high energy, sounds like her. Not the AI.",
    screenshots: [
      {
        url: "/images/examples/2026-01-28-soniabaschez-yapping-as-a-service-writing-prompt.jpg",
        filename: "2026-01-28-soniabaschez-yapping-as-a-service-writing-prompt.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-28-soniabaschez-yapping-as-a-service-writing-prompt.jpg" },
          large: { url: "/images/examples/2026-01-28-soniabaschez-yapping-as-a-service-writing-prompt.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-14",
    original_link: "https://x.com/SoniaBaschez/status/2016297236855194046",
    author_name: "Sonia Baschez",
    author_link: "https://x.com/SoniaBaschez",
    tags: ["Prompts", "Writing", "Content Automation"],
  },
  {
    id: "zarazhangrui-claude-skill-ai-powered-web-slides",
    title: "Claude Workflow That Builds Web Slides for You",
    slug: "zarazhangrui-claude-skill-ai-powered-web-slides",
    summary: "Zara Zhang built a Claude Workflow that generates interactive presentation slides right in the browser. Describe what you want, get a working deck.",
    screenshots: [
      {
        url: "/images/examples/2026-01-28-zarazhangrui-claude-skill-ai-powered-web-slides.jpg",
        filename: "2026-01-28-zarazhangrui-claude-skill-ai-powered-web-slides.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-28-zarazhangrui-claude-skill-ai-powered-web-slides.jpg" },
          large: { url: "/images/examples/2026-01-28-zarazhangrui-claude-skill-ai-powered-web-slides.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-14",
    original_link: "https://x.com/zarazhangrui/status/2016337615843434646",
    author_name: "Zara Zhang",
    author_link: "https://x.com/zarazhangrui",
    tags: ["Claude", "Workflows", "Presentations", "UI Automation"],
  },
  {
    id: "picotrex-awesome-nano-banana-images",
    title: "Awesome Nano Banana Images",
    slug: "picotrex-awesome-nano-banana-images",
    summary: "PicoTrex put together a prompt library for Gemini's Nano Banana extension. Tons of image gen examples with the exact prompts that made them.",
    screenshots: [
      {
        url: "/images/examples/2026-01-28-picotrex-awesome-nano-banana-images.jpg",
        filename: "2026-01-28-picotrex-awesome-nano-banana-images.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-28-picotrex-awesome-nano-banana-images.jpg" },
          large: { url: "/images/examples/2026-01-28-picotrex-awesome-nano-banana-images.jpg" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-14",
    original_link: "https://github.com/PicoTrex/Awesome-Nano-Banana-images",
    author_name: "PicoTrex",
    author_link: "https://x.com/PicoTrex",
    tags: ["Gemini", "Nano Banana", "Prompts", "Image Gen"],
  },
  {
    id: "nathanflurry-open-source-ai-engineer-agent",
    title: "Open Source AI Engineer Agent",
    slug: "nathanflurry-open-source-ai-engineer-agent",
    summary: "Nathan Flurry open-sourced an AI engineer agent that builds complex features on its own. Point it at a task, it figures out the rest.",
    screenshots: [
      {
        url: "/images/examples/2026-01-29-nathanflurry-open-source-ai-engineer-agent.jpg",
        filename: "2026-01-29-nathanflurry-open-source-ai-engineer-agent.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-29-nathanflurry-open-source-ai-engineer-agent.jpg" },
          large: { url: "/images/examples/2026-01-29-nathanflurry-open-source-ai-engineer-agent.jpg" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-15",
    original_link: "https://x.com/NathanFlurry/status/2015128922766381249",
    author_name: "Oliver Henry",
    author_link: "https://x.com/oliverhenry",
    tags: ["AI Agents", "Open Source", "Coding"],
  },
  {
    id: "benyaminholley-claude-code-docs-audit",
    title: "One Prompt to Audit All Your Docs",
    slug: "benyaminholley-claude-code-docs-audit",
    summary: "Benyamin Holley wrote a Claude Code prompt that audits your documentation automatically. Checks technical accuracy, fixes inconsistencies, keeps your brand voice intact.",
    screenshots: [
      {
        url: "/images/examples/2026-01-29-benyaminholley-benyamin-benyaminholley-on-x.jpg",
        filename: "2026-01-29-benyaminholley-benyamin-benyaminholley-on-x.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-01-29-benyaminholley-benyamin-benyaminholley-on-x.jpg" },
          large: { url: "/images/examples/2026-01-29-benyaminholley-benyamin-benyaminholley-on-x.jpg" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-15",
    original_link: "https://x.com/BenyaminHolley/status/2016727490417307689",
    author_name: "Benyamin Holley",
    author_link: "https://x.com/BenyaminHolley",
    tags: ["Claude Code", "Automation", "Documentation", "Prompts"],
  },
  {
    id: "steipete-openclaw-soul-personality",
    title: "Give Your OpenClaw Agent a Personality with SOUL.md",
    slug: "steipete-openclaw-soul-personality",
    summary: "Peter Steinberger dropped a SOUL.md into his OpenClaw agent and told it to rewrite its own instructions with that personality. Went from robotic to genuinely fun.",
    screenshots: [
      {
        url: "/images/examples/steipete-openclaw-soul-personality.webp",
        filename: "steipete-openclaw-soul-personality.webp",
        thumbnails: {
          small: { url: "/images/examples/steipete-openclaw-soul-personality.webp" },
          large: { url: "/images/examples/steipete-openclaw-soul-personality.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-17",
    original_link: "https://x.com/steipete/status/2020704611640705485",
    author_name: "Peter Steinberger",
    author_link: "https://x.com/steipete",
    tags: ["OpenClaw", "Agents", "Persona", "SOUL.md"],
  },
  {
    id: "austen-ai-design-secrets",
    title: "How to Force AI to Design Beautifully",
    slug: "austen-ai-design-secrets",
    summary: "Austen Allred asked X: 'How do you force AI to design something actually beautiful?' The replies are gold. Nothing mindblowing, just simple tricks that work.",
    screenshots: [
      {
        url: "/images/examples/austen-ai-design-secrets.webp",
        filename: "austen-ai-design-secrets.webp",
        thumbnails: {
          small: { url: "/images/examples/austen-ai-design-secrets.webp" },
          large: { url: "/images/examples/austen-ai-design-secrets.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-18",
    original_link: "https://x.com/Austen/status/2023629287350309251",
    author_name: "Austen Allred",
    author_link: "https://x.com/Austen",
    tags: ["Design", "Prompt Engineering", "UI/UX"],
  },
  {
    id: "oliverhenry-openclaw-content-creation-workflow",
    title: "How an OpenClaw Agent Got Millions of TikTok Views",
    slug: "oliverhenry-openclaw-content-creation-workflow",
    summary: "Oliver Henry built an OpenClaw agent called Larry that cranks out TikTok content. Millions of views in a week. Full step-by-step guide included.",
    screenshots: [
      {
        url: "/images/examples/oliverhenry-openclaw.webp",
        filename: "oliverhenry-openclaw.webp",
        thumbnails: {
          small: { url: "/images/examples/oliverhenry-openclaw.webp" },
          large: { url: "/images/examples/oliverhenry-openclaw.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-19",
    original_link: "https://x.com/oliverhenry/status/2022011925903667547",
    author_name: "Nathan Flurry",
    author_link: "https://x.com/oliverhenry",
    tags: ["Automation"],
  },
  {
    id: "shreyas-claude-chat-superpowers",
    title: "Using Claude to Discover Your Superpowers",
    slug: "shreyas-claude-chat-superpowers",
    summary: "Shreyas Doshi shared a Claude conversation that walks you through finding your superpowers and aligning your work to them. Deep, reflective stuff. Not a quick hack.",
    screenshots: [
      {
        url: "/images/examples/2026-01-28-shreyas-claude-chat-superpowers.webp",
        filename: "2026-01-28-shreyas-claude-chat-superpowers.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-01-28-shreyas-claude-chat-superpowers.webp" },
          large: { url: "/images/examples/2026-01-28-shreyas-claude-chat-superpowers.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-14",
    original_link: "https://x.com/shreyas/status/2016551938951962823",
    author_name: "Shreyas Doshi",
    author_link: "https://x.com/shreyas",
    tags: ["Claude", "Career"],
  },
  {
    id: "maxwellfinn-landing-page-friction-audit-prompt",
    title: "Recursive Prompt That Kills Landing Page Friction",
    slug: "maxwellfinn-landing-page-friction-audit-prompt",
    summary: "Maxwell Finn built a Claude skill that audits landing pages for 20-30 invisible friction points across cognitive, emotional, UX, and trust categories. The trick: recursive self-improvement loops that keep running until the output scores high enough.",
    screenshots: [
      {
        url: "/images/examples/2026-02-01-maxwellfinn-ai-agent-workflow.webp",
        filename: "2026-02-01-maxwellfinn-ai-agent-workflow.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-02-01-maxwellfinn-ai-agent-workflow.webp" },
          large: { url: "/images/examples/2026-02-01-maxwellfinn-ai-agent-workflow.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-16",
    original_link: "https://x.com/maxwellfinn/status/2018126248547864701",
    author_name: "Maxwell Finn",
    author_link: "https://x.com/maxwellfinn",
    tags: ["Claude", "Landing Pages", "Prompting"],
  },
  {
    id: "daniel-mac8-ai-interview-prompt",
    title: "Let AI Interview You Before Starting a Project",
    slug: "daniel-mac8-ai-interview-prompt",
    summary: "One prompt flips the script: tell AI to interview you until it's 95% confident about what you actually want. The gap between what you think you want and what you need is where most projects fail.",
    screenshots: [
      {
        url: "/images/examples/2026-03-28-daniel-mac8-ai-interview-prompt.webp",
        filename: "2026-03-28-daniel-mac8-ai-interview-prompt.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-03-28-daniel-mac8-ai-interview-prompt.webp" },
          large: { url: "/images/examples/2026-03-28-daniel-mac8-ai-interview-prompt.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-21",
    original_link: "https://x.com/daniel_mac8/status/2037915114322669698",
    author_name: "Daniel McAteer",
    author_link: "https://x.com/daniel_mac8",
    tags: ["Prompting"],
  },
  {
    id: "charles-seo-10-claude-cowork-seo-prompts",
    title: "10 Free SEO Prompts for Claude Cowork",
    slug: "charles-seo-10-claude-cowork-seo-prompts",
    summary: "Charles Floate dropped his personal Claude Cowork prompt stack. 10 prompts covering entity analysis, link profiles, content audits, and SEO dashboards. Built for operators, not beginners.",
    screenshots: [
      {
        url: "/images/examples/charles-seo-prompts.webp",
        filename: "charles-seo-prompts.webp",
        thumbnails: {
          small: { url: "/images/examples/charles-seo-prompts.webp" },
          large: { url: "/images/examples/charles-seo-prompts.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-25",
    original_link: "https://x.com/Charles_SEO/status/2044010207458853314",
    author_name: "Charles Floate",
    author_link: "https://x.com/Charles_SEO",
    tags: ["Claude", "SEO", "Prompting"],
  },
  {
    id: "dhruvtwt-nvidia-free-ai-models",
    title: "NVIDIA Is Hosting 80+ AI Models for Free",
    slug: "dhruvtwt-nvidia-free-ai-models",
    summary: "Dhruv spotted that NVIDIA is quietly offering ~80 AI models via free hosted APIs. MiniMax, GLM, Kimi, DeepSeek, GPT-OSS-120B, all of them. Plugs straight into OpenClaude, OpenCode, Zed IDE, and more.",
    screenshots: [
      {
        url: "/images/examples/2026-04-22-dhruvtwt-nvidia-free-ai-models.webp",
        filename: "2026-04-22-dhruvtwt-nvidia-free-ai-models.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-22-dhruvtwt-nvidia-free-ai-models.webp" },
          large: { url: "/images/examples/2026-04-22-dhruvtwt-nvidia-free-ai-models.webp" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-27",
    original_link: "https://x.com/dhruvtwt_/status/2047006444701274380",
    author_name: "Dhruv",
    author_link: "https://x.com/dhruvtwt_",
    tags: ["NVIDIA", "AI Models", "Free APIs"],
  },
  {
    id: "mtvmald-ai-video-ad-workflow",
    title: "Full Video Ad Made with Pinterest + Kling 3.0 + Claude",
    slug: "mtvmald-ai-video-ad-workflow",
    summary: "mtvmald made a polished video ad without a camera or crew. Grabbed a reference image from Pinterest, recreated it with nano banana, then animated it with Kling 3.0 and Claude. Whole thing is AI, start to finish.",
    screenshots: [
      {
        url: "/images/examples/2026-04-23-mtvmald-ai-video-ad-workflow.webp",
        filename: "2026-04-23-mtvmald-ai-video-ad-workflow.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-23-mtvmald-ai-video-ad-workflow.webp" },
          large: { url: "/images/examples/2026-04-23-mtvmald-ai-video-ad-workflow.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-28",
    original_link: "https://x.com/mtvmald/status/2047421832014524580",
    author_name: "mtvmald",
    author_link: "https://x.com/mtvmald",
    tags: ["Video AI", "Kling", "Ads", "Creative"],
  },
  {
    id: "startupideaspod-reverse-engineer-creator-style",
    title: "Reverse-Engineer Any Creator's Style with One Prompt",
    slug: "startupideaspod-reverse-engineer-creator-style",
    summary: "Startup Ideas Pod fed a 65-second video to an AI agent with one prompt: 'Break down the style, transcribe the script, and give me a replication plan.' Got back a full creative playbook.",
    screenshots: [
      {
        url: "/images/examples/2026-04-09-startupideaspod-reverse-engineer-creator-style.webp",
        filename: "2026-04-09-startupideaspod-reverse-engineer-creator-style.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-09-startupideaspod-reverse-engineer-creator-style.webp" },
          large: { url: "/images/examples/2026-04-09-startupideaspod-reverse-engineer-creator-style.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-24",
    original_link: "https://x.com/startupideaspod/status/2033232665823113471",
    author_name: "The Startup Ideas Podcast",
    author_link: "https://x.com/startupideaspod",
    tags: ["AI Agents", "Content Strategy", "Prompting"],
  },
  {
    id: "ikaustubhchavan-dtc-ad-creatives",
    title: "DTC Ad Creatives with Claude + GPT Images",
    slug: "ikaustubhchavan-dtc-ad-creatives",
    summary: "Kaustubh Chavan reverse-engineers top DTC brand ads, feeds them as references to Claude for copy and GPT for visuals. Gets polished static ad creatives without a designer.",
    screenshots: [
      {
        url: "/images/examples/2026-04-23-ikaustubhchavan-dtc-ad-creatives.webp",
        filename: "2026-04-23-ikaustubhchavan-dtc-ad-creatives.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-23-ikaustubhchavan-dtc-ad-creatives.webp" },
          large: { url: "/images/examples/2026-04-23-ikaustubhchavan-dtc-ad-creatives.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-28",
    original_link: "https://x.com/iKaustubhChavan/status/2047324683952120068",
    author_name: "Kaustubh Chavan",
    author_link: "https://x.com/iKaustubhChavan",
    tags: ["Ads", "Claude", "GPT", "DTC", "Creative"],
  },
  {
    id: "ecomchasedimond-one-prompt-campaign",
    title: "Full Campaign Design from One ChatGPT Prompt",
    slug: "ecomchasedimond-one-prompt-campaign",
    summary: "Chase Dimond typed one prompt into ChatGPT Images 2.0 and got a complete Father's Day campaign. Landing page, email, SMS, ad creative, popup. All matching, all consistent. Seconds, not days.",
    screenshots: [
      {
        url: "/images/examples/2026-04-23-ecomchasedimond-one-prompt-campaign.webp",
        filename: "2026-04-23-ecomchasedimond-one-prompt-campaign.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-23-ecomchasedimond-one-prompt-campaign.webp" },
          large: { url: "/images/examples/2026-04-23-ecomchasedimond-one-prompt-campaign.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-28",
    original_link: "https://x.com/ecomchasedimond/status/2047313886848925761",
    author_name: "Chase Dimond",
    author_link: "https://x.com/ecomchasedimond",
    tags: ["ChatGPT", "Campaign Design", "Email Marketing", "Creative"],
  },
  {
    id: "alexgoughcooper-nano-banana-2-tutorial",
    title: "Unlimited Image Ads with Nano Banana 2",
    slug: "alexgoughcooper-nano-banana-2-tutorial",
    summary: "Alex Cooper dropped a full YouTube tutorial on Nano Banana 2. Shows the exact process and prompts to generate unlimited AI image ads. 15 minutes, no fluff.",
    screenshots: [
      {
        url: "/images/examples/2026-04-06-alexgoughcooper-nano-banana-2-tutorial.webp",
        filename: "2026-04-06-alexgoughcooper-nano-banana-2-tutorial.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-06-alexgoughcooper-nano-banana-2-tutorial.webp" },
          large: { url: "/images/examples/2026-04-06-alexgoughcooper-nano-banana-2-tutorial.webp" }
        }
      }
    ],
    category: "Marketing",
    publish_date: "2026-05-23",
    original_link: "https://x.com/alexgoughcooper/status/2032154426585026669",
    author_name: "Alex Cooper",
    author_link: "https://x.com/alexgoughcooper",
    tags: ["Nano Banana", "Image Gen", "Ads", "Tutorial"],
  },
  {
    id: "gaelbreton-ai-evals-loop",
    title: "Stop Shipping AI on Vibes. Use Evals.",
    slug: "gaelbreton-ai-evals-loop",
    summary: "Gael Breton spent months shipping AI 'improvements' with no way to prove they actually helped. His fix: collect real examples, run a 20-question yes/no eval, only commit if the score goes up. Simple loop, massive difference.",
    screenshots: [
      {
        url: "/images/examples/2026-04-20-gaelbreton-ai-evals-loop.webp",
        filename: "2026-04-20-gaelbreton-ai-evals-loop.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-20-gaelbreton-ai-evals-loop.webp" },
          large: { url: "/images/examples/2026-04-20-gaelbreton-ai-evals-loop.webp" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-26",
    original_link: "https://x.com/GaelBreton/status/2046167150881296469",
    author_name: "Gael Breton",
    author_link: "https://x.com/GaelBreton",
    tags: ["AI Evals", "Engineering", "Workflow"],
  },
  {
    id: "alexfinn-claude-code-workflow",
    title: "The Claude Code Creator's 8-Step Dev Workflow",
    slug: "alexfinn-claude-code-workflow",
    summary: "Alex Finn broke down Boris Cherny's (creator of Claude Code) development workflow into 8 steps. The mental models and processes the guy who built the tool actually uses. Video walkthrough included.",
    screenshots: [
      {
        url: "/images/examples/2026-01-27-alexfinn-claude-code-workflow.webp",
        filename: "2026-01-27-alexfinn-claude-code-workflow.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-01-27-alexfinn-claude-code-workflow.webp" },
          large: { url: "/images/examples/2026-01-27-alexfinn-claude-code-workflow.webp" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-13",
    original_link: "https://x.com/AlexFinn/status/2009022334683013599",
    author_name: "Alex Finn",
    author_link: "https://x.com/AlexFinn",
    tags: ["Claude Code", "Workflow", "Dev"],
  },
  {
    id: "juliangoldieseo-hermes-workspace-setup",
    title: "Hermes Workspace: One Command, Full AI Environment",
    slug: "juliangoldieseo-hermes-workspace-setup",
    summary: "Julian Goldie shows how Hermes Workspace killed the setup tax. One curl command and you get gateway, UI, models, memory, and skills. All auto-configured. Minutes, not hours.",
    screenshots: [
      {
        url: "/images/examples/2026-04-23-juliangoldieseo-hermes-workspace-setup.webp",
        filename: "2026-04-23-juliangoldieseo-hermes-workspace-setup.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-23-juliangoldieseo-hermes-workspace-setup.webp" },
          large: { url: "/images/examples/2026-04-23-juliangoldieseo-hermes-workspace-setup.webp" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-28",
    original_link: "https://x.com/JulianGoldieSEO/status/2047446841558802647",
    author_name: "Julian Goldie",
    author_link: "https://x.com/JulianGoldieSEO",
    tags: ["Hermes", "Setup", "AI Tools"],
  },
  {
    id: "alexhillman-andrew-chen-email-assistant",
    title: "Build Your Own AI Email Assistant in Claude Code",
    slug: "alexhillman-andrew-chen-email-assistant",
    summary: "Andrew Chen posted a $150k/year problem: he wants an AI that watches his inbox, scores importance, references his knowledge base, drafts replies, and files emails. Alex Hillman retweeted saying you can build this right now in Claude Code - just describe what you want and add 'ask me clarifying questions until you know what I want to build and walk me through the setup step by step.'",
    screenshots: [
      {
        url: "/images/examples/alexhillman-email-assistant.webp",
        filename: "alexhillman-email-assistant.webp",
        thumbnails: {
          small: { url: "/images/examples/alexhillman-email-assistant.webp" },
          large: { url: "/images/examples/alexhillman-email-assistant.webp" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-29",
    original_link: "https://x.com/alexhillman/status/2023770470428926449",
    author_name: "Alex Hillman",
    author_link: "https://x.com/alexhillman",
    tags: ["Claude Code", "Email", "AI Assistant"],
  },
  {
    id: "bentossell-agents-wrong",
    title: "We Got Agents Wrong",
    slug: "bentossell-agents-wrong",
    summary: "Ben Tossell spent 3 billion tokens in four months, all through a terminal watching an agent write code he couldn't write. He doesn't read the code but reads the agent output religiously, picking up knowledge on how code works, where things fail, and where they succeed. That's his version of learning to program. The new technical class.",
    screenshots: [
      {
        url: "/images/examples/bentossell-we-got-agents-wrong.webp",
        filename: "bentossell-we-got-agents-wrong.webp",
        thumbnails: {
          small: { url: "/images/examples/bentossell-we-got-agents-wrong.webp" },
          large: { url: "/images/examples/bentossell-we-got-agents-wrong.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-22",
    original_link: "https://x.com/bentossell/status/2006352820140749073",
    author_name: "Ben Tossell",
    author_link: "https://x.com/bentossell",
    tags: ["Agents", "Coding", "Vibe Coding"],
  },
  {
    id: "eda-claude-code-beginners-guide",
    title: "A Beginner's Guide to Claude Code (No Coding Required)",
    slug: "eda-claude-code-beginners-guide",
    summary: "Eda Akturk built a full packing list app with zero lines of code using Claude Code. Here's her step-by-step guide to building your first app.",
    screenshots: [
      {
        url: "/images/examples/eda-claude-code-beginners-guide.webp",
        filename: "eda-claude-code-beginners-guide.webp",
        thumbnails: {
          small: { url: "/images/examples/eda-claude-code-beginners-guide.webp" },
          large: { url: "/images/examples/eda-claude-code-beginners-guide.webp" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-20",
    original_link: "https://edatweets.substack.com/p/a-beginners-guide-to-claude-code",
    author_name: "Eda Akturk",
    author_link: "https://substack.com/@edatweets",
    tags: ["Claude Code", "Beginners", "No-Code"],
  },
  {
    id: "effortlessacademic-claude-code-academics",
    title: "Claude Code for Academics: The Beginner’s Guide",
    slug: "effortlessacademic-claude-code-academics",
    summary: "Effortless Academic breaks down how to use Claude Code to manage the messy middle of research. It maps local folders to the AI, uses /init to set project rules, and employs @ mentions to keep context tight while organizing notes and PDFs.",
    screenshots: [
      {
        url: "/images/examples/2026-04-24-effortlessacademic-claude-code-guide.webp",
        filename: "2026-04-24-effortlessacademic-claude-code-guide.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-24-effortlessacademic-claude-code-guide.webp" },
          large: { url: "/images/examples/2026-04-24-effortlessacademic-claude-code-guide.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-31",
    original_link: "https://effortlessacademic.com/claude-code-and-cowork-for-academics-beginner-guide-part-1/",
    author_name: "Effortless Academic",
    author_link: "https://effortlessacademic.com/",
    tags: ["Academic Ops", "Claude Code", "Research"],
  },
  {
    id: "michaelcrist-claude-code-guide",
    title: "The Non-Technical Guide to Claude Code",
    slug: "michaelcrist-claude-code-guide",
    summary: "Michael Crist explains why Claude Code is an agent with hands for non-coders. The secret is moving from simple prompts to briefings (CLAUDE.md) that give the AI full context of your business rules and project goals.",
    screenshots: [
      {
        url: "/images/examples/2026-04-24-michaelcrist-claude-code.webp",
        filename: "2026-04-24-michaelcrist-claude-code.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-24-michaelcrist-claude-code.webp" },
          large: { url: "/images/examples/2026-04-24-michaelcrist-claude-code.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-14",
    original_link: "https://michaelcrist.substack.com/p/claude-code",
    author_name: "Michael Crist",
    author_link: "https://michaelcrist.substack.com/",
    tags: ["Claude Code", "Productivity", "Non-Technical"],
  },
  {
    id: "michael-fritzell-claude-equity-research",
    title: "How I Use Claude for Equity Research",
    slug: "michael-fritzell-claude-equity-research",
    summary: "Michael Fritzell systematized his equity research by turning Claude into an automated analyst. He uses Projects to run Bull/Bear cases instantly and Cowork to extract financial data from PDFs directly into formatted Excel tables.",
    screenshots: [
      {
        url: "/images/examples/2026-04-24-asiancenturystocks-claude-equity-research.webp",
        filename: "2026-04-24-asiancenturystocks-claude-equity-research.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-24-asiancenturystocks-claude-equity-research.webp" },
          large: { url: "/images/examples/2026-04-24-asiancenturystocks-claude-equity-research.webp" }
        }
      }
    ],
    category: "Finance Ops",
    publish_date: "2026-06-01",
    original_link: "https://www.asiancenturystocks.com/how-to-use-claude-for-equity-resear/",
    author_name: "Michael Fritzell",
    author_link: "https://www.asiancenturystocks.com/",
    tags: ["Equity Research", "Claude Projects", "Finance"],
  },
  {
    id: "leadershipinchange-claude-skills-marketing",
    title: "My 3-Skill System for Marketing with Claude",
    slug: "leadershipinchange-claude-skills-marketing",
    summary: "Stop paying the 'Blank Slate Tax' by using Claude Skills—markdown files that encode your brand voice and audience. This system uses three core workflows: an Email Sequence Builder, a Competitor Intelligence Brief, and an SEO Article Optimizer.",
    screenshots: [
      {
        url: "/images/examples/2026-04-24-leadershipinchange-claude-skills-marketing.webp",
        filename: "2026-04-24-leadershipinchange-claude-skills-marketing.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-24-leadershipinchange-claude-skills-marketing.webp" },
          large: { url: "/images/examples/2026-04-24-leadershipinchange-claude-skills-marketing.webp" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "2026-05-15",
    original_link: "https://leadershipinchange.com/p/claude-skills-for-marketing-2026",
    author_name: "Leadership in Change",
    author_link: "https://leadershipinchange.com/",
    tags: ["Claude Skills", "Marketing Ops", "Brand Voice"],
  },
  {
    id: "marketermilk-seo-ai-agent-guide",
    title: "How to Build a Custom SEO AI Agent",
    slug: "marketermilk-seo-ai-agent-guide",
    summary: "Marketer Milk explains how to build an SEO agent by documenting your expertise into markdown 'skills'. Use Claude Projects for solo work or Gumloop for team workflows, then connect them to real-time data via MCP to automate audits and content decay tracking.",
    screenshots: [
      {
        url: "/images/examples/2026-04-24-marketermilk-seo-ai-agent.webp",
        filename: "2026-04-24-marketermilk-seo-ai-agent.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-04-24-marketermilk-seo-ai-agent.webp" },
          large: { url: "/images/examples/2026-04-24-marketermilk-seo-ai-agent.webp" }
        }
      }
    ],
    category: "SEO",
    publish_date: "2026-05-15",
    original_link: "https://www.marketermilk.com/blog/seo-ai-agent",
    author_name: "Marketer Milk",
    author_link: "https://www.marketermilk.com/",
    tags: ["SEO Agents", "Claude Projects", "Gumloop", "MCP"],
  },
  {
    id: "parth-shah-claude-non-coding-uses",
    title: "4 Unique Ways to Use Claude (That Have Nothing to Do with Coding)",
    slug: "parth-shah-claude-non-coding-uses",
    summary: "Parth Shah shares four non-coding ways to get the most out of Claude: Google Drive file search, Finder automation with Claude Cowork, Obsidian vault generation, and Canva design suggestions via the AI connector.",
    screenshots: [
      {
        url: "/images/examples/2026-04-22-parth-shah-claude-non-coding-uses.jpg",
        filename: "2026-04-22-parth-shah-claude-non-coding-uses.jpg",
        thumbnails: {
          small: { url: "/images/examples/2026-04-22-parth-shah-claude-non-coding-uses.jpg" },
          large: { url: "/images/examples/2026-04-22-parth-shah-claude-non-coding-uses.jpg" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-05-30",
    original_link: "https://www.xda-developers.com/unique-ways-use-claude-to-get-the-best-out-of-it/",
    author_name: "Parth Shah",
    author_link: "https://www.xda-developers.com/author/parth-shah/",
    tags: ["Claude", "Productivity", "Workflows", "Google Drive", "Obsidian", "Canva"],
  },
  {
    id: "growthx-ai-prep-agent",
    title: "Build an AI Prep Agent in 90 Mins",
    slug: "growthx-ai-prep-agent",
    summary: "GrowthX walks you through building an AI meeting prep agent with Google Apps Script, Claude, and Google Sheets. Fetches emails, groups threads by participants, and generates meeting briefs automatically.",
    screenshots: [
      {
        url: "/images/examples/2026-04-24-growthx-ai-prep-agent.png",
        filename: "2026-04-24-growthx-ai-prep-agent.png",
        thumbnails: {
          small: { url: "/images/examples/2026-04-24-growthx-ai-prep-agent.png" },
          large: { url: "/images/examples/2026-04-24-growthx-ai-prep-agent.png" }
        }
      }
    ],
    category: "Vibe Coding",
    publish_date: "2026-05-31",
    original_link: "https://shorts.growthx.club/p/build-an-ai-prep-agent-in-90-mins",
    author_name: "GrowthX",
    author_link: "https://substack.com/@growthxclub",
    tags: ["AI Agents", "Google Apps Script", "Claude", "Tutorial", "Meetings"],
  },
  {
    id: "gtmstrategist-claude-code-campaigns",
    title: "How to Build GTM Campaigns Your Prospects Would Pay to Receive",
    slug: "gtmstrategist-claude-code-campaigns",
    summary: "Maja Voje and Jordan Crawford show how to use Claude Code as a GTM operating system - context engineering, persistent memory, database queries, and permissionless value props that actually get responses.",
    screenshots: [
      {
        url: "/images/examples/2026-04-25-gtmstrategist-claude-code-campaigns.png",
        filename: "2026-04-25-gtmstrategist-claude-code-campaigns.png",
        thumbnails: {
          small: { url: "/images/examples/2026-04-25-gtmstrategist-claude-code-campaigns.png" },
          large: { url: "/images/examples/2026-04-25-gtmstrategist-claude-code-campaigns.png" }
        }
      }
    ],
    category: "GTM",
    publish_date: "2026-06-01",
    original_link: "https://knowledge.gtmstrategist.com/p/how-to-build-gtm-campaigns-with-claude-code",
    author_name: "Maja Voje",
    author_link: "https://substack.com/@majavoje",
    tags: ["Claude Code", "GTM", "Outbound", "Context Engineering", "Campaigns"],
  },
  {
    id: "novatool-review-assistant",
    title: "Build an AI Review Assistant with Make.com",
    slug: "novatool-review-assistant",
    summary: "A step-by-step guide to building an AI review monitoring system using Make.com and OpenAI. It watches Google My Business reviews, filters by sentiment, analyzes with GPT, drafts personalized responses, logs everything to Google Sheets, and sends Slack alerts for critical negative reviews. Handles 200+ reviews per week, cutting average response time from 18 hours to 2 hours.",
    screenshots: [
      {
        url: "/images/examples/2026-05-11-novatool-review-assistant.webp",
        filename: "2026-05-11-novatool-review-assistant.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-05-11-novatool-review-assistant.webp" },
          large: { url: "/images/examples/2026-05-11-novatool-review-assistant.webp" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "2026-06-05",
    original_link: "https://novatool.org/build-an-ai-review-assistant-with-make-com-for-free-complete-2026-beginner-guide/",
    author_name: "NovaTool",
    author_link: "https://novatool.org",
    tags: ["Make.com", "OpenAI", "Review Management", "Sentiment Analysis", "Slack Alerts"],
  },
  {
    id: "nitin-support-triage-agent",
    title: "Building a Customer Support Triage Agent with Claude",
    slug: "nitin-support-triage-agent",
    summary: "A triage agent that reads support emails, pulls order context from Google Sheets, applies a structured returns policy, drafts responses in the brand's voice, and queues them for one-click human approval. Built with Claude Projects, Gmail connector, and a decision-tree policy document. Handles 70% of cases autonomously, pre-processes the rest.",
    screenshots: [
      {
        url: "/images/examples/2026-05-05-nitin-support-triage-agent.png",
        filename: "2026-05-05-nitin-support-triage-agent.png",
        thumbnails: {
          small: { url: "/images/examples/2026-05-05-nitin-support-triage-agent.png" },
          large: { url: "/images/examples/2026-05-05-nitin-support-triage-agent.png" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "2026-06-04",
    original_link: "https://medium.com/@nitin_26346/building-a-customer-support-triage-agent-with-claude-a-walkthrough-89a812cc09bf",
    author_name: "Nit~n",
    author_link: "https://medium.com/@nitin_26346",
    tags: ["Claude", "Customer Support", "Triage", "DTC", "Automation"],
  },
  {
    id: "saniaspeaks-judgment-first-workflow",
    title: "The 'Judgment-First' Creative Workflow",
    slug: "saniaspeaks-judgment-first-workflow",
    summary: "Sania (@saniaspeaks_) cut her content production time by 50% by delegating execution to AI while reclaiming her time for 'creative judgment.' She uses Perplexity for research, Claude for narrative arcs, and Seedream for visuals, all anchored in an intelligent canvas. Punchy, personal, and avoids the app-hopping trap.",
    screenshots: [
      {
        url: "/images/examples/2026-05-18-saniaspeaks-ai-creative-workflow.webp",
        filename: "2026-05-18-saniaspeaks-ai-creative-workflow.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-05-18-saniaspeaks-ai-creative-workflow.webp" },
          large: { url: "/images/examples/2026-05-18-saniaspeaks-ai-creative-workflow.webp" }
        }
      }
    ],
    category: "Content Ops",
    publish_date: "2026-06-06",
    original_link: "https://x.com/saniaspeaks_/status/2052329779206991962",
    author_name: "Sania",
    author_link: "https://x.com/saniaspeaks_",
    tags: ["Content Ops", "Workflow", "Creative Judgment", "Claude"],
  },
  {
    id: "viralops-technical-seo-agent",
    title: "Building an Autonomous Technical SEO Agent",
    slug: "viralops-technical-seo-agent",
    summary: "@ViralOps_ built an autonomous SEO agent that crawls sites, identifies indexing bottlenecks, and drafts 'fix tickets' for developers. It uses a custom MCP server to query Search Console data and cross-reference it with live crawl results. No more manual auditing spreadsheets.",
    screenshots: [
      {
        url: "/images/examples/2026-05-18-viralops-technical-seo-agent.png",
        filename: "2026-05-18-viralops-technical-seo-agent.png",
        thumbnails: {
          small: { url: "/images/examples/2026-05-18-viralops-technical-seo-agent.png" },
          large: { url: "/images/examples/2026-05-18-viralops-technical-seo-agent.png" }
        }
      }
    ],
    category: "SEO",
    publish_date: "2026-06-06",
    original_link: "https://x.com/ViralOps_/status/2052392383715938701",
    author_name: "ViralOps",
    author_link: "https://x.com/ViralOps_",
    tags: ["SEO", "Agents", "Automation", "MCP"],
  },
  {
    id: "businessbarista-highest-roi-prompt",
    title: "What is the highest ROI prompt you use weekly?",
    slug: "businessbarista-highest-roi-prompt",
    summary: "Alex Lieberman asked his audience what prompt gives them the most return every week. The thread has a few interesting real-world AI workflows people actually rely on.",
    screenshots: [
      {
        url: "/images/examples/2026-06-07-businessbarista-highest-roi-prompt.webp",
        filename: "2026-06-07-businessbarista-highest-roi-prompt.webp",
        thumbnails: {
          small: { url: "/images/examples/2026-06-07-businessbarista-highest-roi-prompt.webp" },
          large: { url: "/images/examples/2026-06-07-businessbarista-highest-roi-prompt.webp" }
        }
      }
    ],
    category: "General",
    publish_date: "2026-06-07",
    original_link: "https://x.com/businessbarista/status/2062217925759471657",
    author_name: "Alex Lieberman",
    author_link: "https://x.com/businessbarista",
    tags: ["Prompts", "Workflow", "Community"],
  },
];
