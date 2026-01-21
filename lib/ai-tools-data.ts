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
  featured?: boolean;
}

export const aiTools: AiTool[] = [
  {
    name: "Vidmix.ai",
    description: "AI video generator that transforms text and images into professional videos using advanced models like Sora 2 and Veo 3.1.",
    url: "https://www.vidmix.ai",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=vidmix.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.overvisual.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=chatty.fit&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.slidewhisper.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.imejis.io&sz=128"
},
  {
    name: "Email Ferret",
    description: "AI personal assistant for Gmail that helps manage, organize, and respond to emails more efficiently.",
    url: "https://emailferret.io",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=emailferret.io&sz=128"
},
  {
    name: "AgentGatePay",
    description: "Complete payment infrastructure for autonomous AI agents to facilitate secure, automated transactions.",
    url: "https://www.agentgatepay.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.agentgatepay.com&sz=128"
},
  {
    name: "Hypnotype",
    description: "Kinetic typography engine that synchronizes word-level animations with voice audio for high-retention video storytelling.",
    url: "https://hypnotype.app",
    category: "Video & Audio",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=hypnotype.app&sz=128"
},
  {
    name: "Computer Keyboard Shortcuts",
    description: "The ultimate guide to computer keyboard shortcuts and hotkeys for Windows and MacOS productivity.",
    url: "https://computerkeyboardshortcuts.org/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=computerkeyboardshortcuts.org&sz=128"
},
  {
    name: "Floowed",
    description: "AI-powered credit workflow automation platform that extracts, validates, and enriches application data while flagging risks.",
    url: "https://floowed.com",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=floowed.com&sz=128"
},
  {
    name: "StrideFuel",
    description: "AI-powered nutrition and weight loss companion featuring voice logging and adaptive coaching specifically designed for GLP-1 users.",
    url: "https://stride-fuel.com",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=stride-fuel.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=orav.ai&sz=128"
},
  {
    name: "AIRankPilot",
    description: "Helps local businesses get discovered by search engines and AI tools by suggesting optimized content strategies.",
    url: "https://airankpilot.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=airankpilot.com&sz=128"
},
  {
    name: "BookSwift",
    description: "Simplified appointment scheduling platform for independent service providers and small teams to manage bookings.",
    url: "https://www.bookswift.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.bookswift.app&sz=128"
},
  {
    name: "SlidesCockpit",
    description: "AI tool to clone viral TikTok content for your product and automate posting across platforms.",
    url: "https://slidescockpit.com/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=slidescockpit.com&sz=128"
},
  {
    name: "3dSynth.app",
    description: "A browser-based tool that simplifies the 3D printing workflow by skipping complex STL/Slicer steps.",
    url: "https://3dSynth.app",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=3dsynth.app&sz=128"
},
  {
    name: "Crypto News Navigator",
    description: "Trusted source for real-time crypto prices, market data, and trending blockchain news.",
    url: "https://www.cryptonewsnavigator.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.cryptonewsnavigator.com&sz=128"
},
  {
    name: "Suburb Stack",
    description: "Landing page builder for service businesses that launches locally targeted, conversion-optimized pages for SEO dominance.",
    url: "https://suburbstack.com/",
    category: "Marketing",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=suburbstack.com&sz=128"
},
  {
    name: "Sequenzy",
    description: "Email marketing tool for SaaS that uses AI to build email infrastructures, generate templates, and create copy.",
    url: "https://sequenzy.com",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=sequenzy.com&sz=128"
},
  {
    name: "Markeplay",
    description: "No-code AI platform for manufacturing companies to build complex, customizable B2B e-commerce solutions and automated workflows.",
    url: "https://www.markeplay.com",
    category: "Code Assistance",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=www.markeplay.com&sz=128"
},
  {
    name: "Qeeebo",
    description: "AI-curated question-and-answer platform built to organize and scale global knowledge.",
    url: "https://www.qeeebo.com",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.qeeebo.com&sz=128"
},
  {
    name: "feynn - Strategic Intelligence Platform",
    description: "Structured strategic intelligence platform powered by AI for market research and competitive analysis.",
    url: "https://feynn.ai",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=feynn.ai&sz=128"
},
  {
    name: "AI Thumbnail",
    description: "AI tool to create clickable YouTube thumbnails by analyzing successful designs and adapting them for your content.",
    url: "https://aithumbnail.gg",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=aithumbnail.gg&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=ayewatch.ai&sz=128"
},
  {
    name: "PentestMate",
    description: "Autonomous pentesting agents that test your applications and deliver detailed, fix-ready security reports.",
    url: "https://pentestmate.com/",
    category: "Productivity",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=pentestmate.com&sz=128"
},
  {
    name: "Bolta",
    description: "Social media operating system that helps teams plan, write, and publish content across multiple channels using AI.",
    url: "https://bolta.ai/",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=bolta.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.sanamujer.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=beatable.co&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=mapyourvoyage.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=ayecreate.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=nicegram.app&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.localbiz.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.getargus.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=popjam.io&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=tekadio.app&sz=128"
}
];