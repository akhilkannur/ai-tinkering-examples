export interface AiTool {
  name: string;
  description: string;
  url: string;
  category: 'Copywriting' | 'Image Generation' | 'Code Assistance' | 'Productivity' | 'Video & Audio' | 'Marketing' | 'Design';
  tags: {
    useCase: ('Marketing' | 'Development' | 'Design' | 'Business' | 'Personal' | 'SEO' | 'Social Media' | 'Copywriting' | 'Debugging' | 'Documentation' | 'Code Completion' | 'Video Editing' | 'Audio Production' | 'Blog Writing' | 'Image Editing')[];
    price: 'Free' | 'Freemium' | 'Paid';
    skill: 'Beginner' | 'Intermediate' | 'Advanced';
  };
  image: string;
}

export const aiTools: AiTool[] = [
  // For Developers
  {
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer. Get suggestions for whole lines or entire functions right in your editor.',
    url: 'https://github.com/features/copilot',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Code Completion', 'Debugging'], price: 'Paid', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=GitHub+Copilot'
  },
  {
    name: 'Tabnine',
    description: 'AI assistant for software developers. Code completion that works in your favorite IDE.',
    url: 'https://www.tabnine.com/',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Code Completion'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=Tabnine'
  },
  {
    name: 'Replit Ghostwriter',
    description: 'An AI-powered coding assistant that helps you write better code, faster, inside the Replit IDE.',
    url: 'https://replit.com/ghostwriter',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Code Completion', 'Debugging'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=Ghostwriter'
  },
  {
    name: 'Mintlify',
    description: 'AI-powered documentation writer. Generate documentation from your code instantly.',
    url: 'https://mintlify.com/',
    category: 'Code Assistance',
    tags: { useCase: ['Development', 'Documentation'], price: 'Freemium', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/1E293B/FFFFFF/png?text=Mintlify'
  },

  // For Marketers
  {
    name: 'Jasper',
    description: 'The AI Content Platform that helps you and your team break through creative blocks to create amazing, original content 10X faster.',
    url: 'https://www.jasper.ai/',
    category: 'Copywriting',
    tags: { useCase: ['Marketing', 'Copywriting', 'Blog Writing', 'Social Media'], price: 'Paid', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/6366F1/FFFFFF/png?text=Jasper'
  },
  {
    name: 'Copy.ai',
    description: 'Generate high-quality marketing copy and content in seconds, from product descriptions to ad copy.',
    url: 'https://www.copy.ai/',
    category: 'Copywriting',
    tags: { useCase: ['Marketing', 'Copywriting', 'Social Media'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/6366F1/FFFFFF/png?text=Copy.ai'
  },
  {
    name: 'Semrush',
    description: 'AI-powered tools to help you with SEO, content marketing, competitor research, PPC, and social media marketing.',
    url: 'https://www.semrush.com/',
    category: 'Marketing',
    tags: { useCase: ['Marketing', 'SEO', 'Social Media'], price: 'Paid', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/6366F1/FFFFFF/png?text=Semrush'
  },

  // For Content Creators
  {
    name: 'Descript',
    description: 'All-in-one audio and video editor that makes editing as easy as a word doc. AI-powered features like transcription and voice cloning.',
    url: 'https://www.descript.com/',
    category: 'Video & Audio',
    tags: { useCase: ['Video Editing', 'Audio Production', 'Blog Writing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=Descript'
  },
  {
    name: 'RunwayML',
    description: 'A suite of AI magic tools for video and content creation, from text-to-video to automatic background removal.',
    url: 'https://runwayml.com/',
    category: 'Video & Audio',
    tags: { useCase: ['Video Editing', 'Image Editing', 'Design'], price: 'Freemium', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=RunwayML'
  },
  {
    name: 'Canva',
    description: 'Design anything. Magic Studio brings you a suite of AI tools to help you create stunning images, videos, and designs.',
    url: 'https://www.canva.com/magic-studio/',
    category: 'Design',
    tags: { useCase: ['Design', 'Image Editing', 'Social Media', 'Marketing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=Canva'
  },
  {
    name: 'ElevenLabs',
    description: 'Generate lifelike speech in any language and voice. Prime AI-powered text-to-speech and voice cloning.',
    url: 'https://elevenlabs.io/',
    category: 'Video & Audio',
    tags: { useCase: ['Audio Production', 'Video Editing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=ElevenLabs'
  },
  {
    name: 'CapCut',
    description: 'A free all-in-one video editor with a suite of AI-powered features for easy and creative video production.',
    url: 'https://www.capcut.com/',
    category: 'Video & Audio',
    tags: { useCase: ['Video Editing', 'Social Media'], price: 'Free', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/EC4899/FFFFFF/png?text=CapCut'
  },

  // General Purpose & Latest Models
  {
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI that can generate human-like text for a wide range of applications, powered by GPT-4o.',
    url: 'https://chat.openai.com/',
    category: 'Productivity',
    tags: { useCase: ['Business', 'Personal', 'Copywriting', 'Code Completion'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/22C55E/FFFFFF/png?text=ChatGPT'
  },
  {
    name: 'Claude 3',
    description: 'Anthropic\'s latest family of models (Haiku, Sonnet, Opus) offering a new standard in intelligence and speed.',
    url: 'https://www.anthropic.com/claude',
    category: 'Productivity',
    tags: { useCase: ['Business', 'Personal', 'Copywriting', 'Code Completion'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/22C55E/FFFFFF/png?text=Claude+3'
  },
  {
    name: 'Notion AI',
    description: 'Integrated AI assistant within Notion to help you write, brainstorm, edit, summarize, and more.',
    url: 'https://www.notion.so/product/ai',
    category: 'Productivity',
    tags: { useCase: ['Business', 'Personal', 'Blog Writing'], price: 'Paid', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/22C55E/FFFFFF/png?text=Notion+AI'
  },
  
  // Image Generation
  {
    name: 'Midjourney',
    description: 'A leading AI image generator known for its artistic and high-quality image outputs. Now on V6.',
    url: 'https://www.midjourney.com/',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Paid', skill: 'Intermediate' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=Midjourney'
  },
  {
    name: 'DALL-E 3',
    description: 'An AI system from OpenAI that can create realistic images and art from a description in natural language.',
    url: 'https://openai.com/dall-e-3',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=DALL-E+3'
  },
  {
    name: 'ImageFX',
    description: 'Google\'s generative AI image tool, powered by the Imagen 2 model, for creating high-quality images from text.',
    url: 'https://aistudio.google.com/app/imagefx',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Free', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=ImageFX'
  },
  {
    name: 'Leonardo.Ai',
    description: 'A generative AI art platform with a suite of tools for creating stunning visual assets, with a generous free tier.',
    url: 'https://leonardo.ai/',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing'], price: 'Freemium', skill: 'Beginner' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=Leonardo.Ai'
  },
  {
    name: 'Stable Diffusion 3',
    description: 'The latest open-source model from Stability AI for text-to-image generation, with improved prompt following.',
    url: 'https://stability.ai/stablediffusion3',
    category: 'Image Generation',
    tags: { useCase: ['Design', 'Image Editing', 'Development'], price: 'Freemium', skill: 'Advanced' },
    image: 'https://placehold.co/750x500/F59E0B/FFFFFF/png?text=Stable+Diffusion+3'
  }
,
  {
    name: "https://www.vidmix.ai",
    description: "AI Song Generator is an easy-to-use platform that creates high-quality, royalty-free music in various styles, perfect fo...",
    url: "sadasdsad",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=https%3A%2F%2Fwww.vidmix.ai"
},
  {
    name: "Ägglossning",
    description: "Vi har all information du kan tänka dig behöva kring ägglossning, som vad är symptom, ägglossnings kalkulator och mycket...",
    url: "https://xn--gglossning-p5a.se/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=%C3%84gglossning"
},
  {
    name: "Festklänningar",
    description: "Hitta din festklänning smidigt idag!",
    url: "https://xn--festklnning-q8a.se/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Festkl%C3%A4nningar"
},
  {
    name: "Overvisual",
    description: "Overvisual lets you create Instagram Story series in minutes. Upload your photos/videos and AI automatically places text...",
    url: "https://www.overvisual.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Overvisual"
},
  {
    name: "ChattyFit",
    description: "AI powered personal trainer in your pocket.",
    url: "https://chatty.fit",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=ChattyFit"
},
  {
    name: "SlideWhisper",
    description: "SlideWhisper",
    url: "https://www.slidewhisper.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=SlideWhisper"
},
  {
    name: "imejis.io",
    description: "Imejis.io is a bulk image generator and automated image creation platform that helps you create, customize, and generate...",
    url: "https://www.imejis.io",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=imejis.io"
},
  {
    name: "Email Ferret",
    description: "AI personal assistant for Gmail.",
    url: "https://emailferret.io",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Email%20Ferret"
},
  {
    name: "AgentGatePay",
    description: "Complete payment infrastructure for autonomous AI agents",
    url: "https://www.agentgatepay.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=AgentGatePay"
},
  {
    name: "Hypnotype",
    description: "The 'Kinetic Typography' engine for audio creators. Transforms podcasts and essays into high-retention text animations t...",
    url: "https://hypnotype.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Hypnotype"
},
  {
    name: "Computer Keyboard Shortcuts",
    description: "The ultimate guide to computer keyboard shortcuts and hotkeys for Windows and MacOS.",
    url: "https://computerkeyboardshortcuts.org/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Computer%20Keyboard%20Shortcuts"
},
  {
    name: "Kataloop",
    description: "Kataloop is a Berlin-based creative agency specializing in Webflow websites with high design and technical standards. In...",
    url: "https://www.kataloop.com/en",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Kataloop"
},
  {
    name: "Floowed",
    description: "Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, an...",
    url: "Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, and enriches application data using AI, flags risks and fraud, and lets teams design custom workflows and metrics without engineering.",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Floowed"
},
  {
    name: "StrideFuel",
    description: "Built for weight loss success—especially GLP-1 users. AI coaching, voice logging, photo recognition, HealthKit sync. You...",
    url: "https://stride-fuel.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=StrideFuel"
},
  {
    name: "Oravida AI",
    description: "Oravida AI",
    url: "https://orav.ai/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Oravida%20AI"
},
  {
    name: "AIRankPilot",
    description: "AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exac...",
    url: "AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exactly what to publish and helps you create content that search engines and AI can understand and recommend.",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=AIRankPilot"
},
  {
    name: "BookSwift",
    description: "Appointment scheduling app for independent service providers and small teams. Appointment scheduling app for independent...",
    url: "https://www.bookswift.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=BookSwift"
},
  {
    name: "SlidesCockpit",
    description: "Clone Viral TikToks For Your Product With AI & Auto-Post.",
    url: "https://slidescockpit.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=SlidesCockpit"
},
  {
    name: "3dSynth.app",
    description: "A browser-based tool that skips the STL/Slicer workflow entirely.",
    url: "https://3dSynth.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=3dSynth.app"
},
  {
    name: "Crypto News Navigator",
    description: "Crypto News Navigator is a trusted source for real-time crypto prices and market data. News and trends included.",
    url: "https://www.cryptonewsnavigator.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Crypto%20News%20Navigator"
},
  {
    name: "Suburb Stack",
    description: "Launch hundreds or thousands of locally targeted, conversion-optimized landing pages built to rank and convert for SEO a...",
    url: "https://suburbstack.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Suburb%20Stack"
},
  {
    name: "Cursor for Marketing Emails",
    description: "saas, marketing, email marketing, mailchimp, cursor",
    url: "https://sequenzy.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Cursor%20for%20Marketing%20Emails"
},
  {
    name: "Markeplay",
    description: "No-code AI-powered SaaS platform enabling rapid creation of complex, highly customizable e-commerce solutions for B2B ma...",
    url: "https://www.markeplay.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Markeplay"
},
  {
    name: "Qeeebo",
    description: "AI-curated question-and-answer platform built to become the world’s largest.",
    url: "https://www.qeeebo.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Qeeebo"
},
  {
    name: "feynn - Strategic Intelligence Platform",
    description: "Structured intelligence, powered by AI",
    url: "https://feynn.ai",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=feynn%20-%20Strategic%20Intelligence%20Platform"
},
  {
    name: "AI Thumbnail",
    description: "Create clickable YouTube thumbnails with AI by copying what already works and making it yours.",
    url: "https://aithumbnail.gg",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=AI%20Thumbnail"
},
  {
    name: "AyeWatch AI",
    description: "Personal AI Internet Monitor, that brings internet to you",
    url: "https://ayewatch.ai/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=AyeWatch%20AI"
},
  {
    name: "PentestMate",
    description: "Autonomous pentesting agents that test your app and deliver fix ready reports.",
    url: "https://pentestmate.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=PentestMate"
},
  {
    name: "Bolta",
    description: "Bolta.ai is a social media operating system that helps creators, founders, and teams plan, write, review, and publish co...",
    url: "https://bolta.ai/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Bolta"
},
  {
    name: "Sana Mujer",
    description: "We built Sana Mujer to solve a very specific access problem: millions of Spanish-speaking women live in the US, but most...",
    url: "https://www.sanamujer.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Sana%20Mujer"
},
  {
    name: "Beatable",
    description: "Beatable helps founders and investors validate business in seconds. The platform delivers in-depth competitor analysis, ...",
    url: "https://beatable.co",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Beatable"
},
  {
    name: "Map Your Voyage",
    description: "Plan trips from Instagram reels in minutes, not weeks!",
    url: "https://mapyourvoyage.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Map%20Your%20Voyage"
},
  {
    name: "AyeCreate",
    description: "Allscreenshots provides a screenshot API that helps developers and businesses capture, combine, and automate website scr...",
    url: "https://ayecreate.ai/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=AyeCreate"
},
  {
    name: "Nicegram",
    description: "Open‑source Telegram client, privacy‑first, with a non‑custodial multichain wallet, a built‑in AI assistant and Agent Ma...",
    url: "https://nicegram.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=Nicegram"
},
  {
    name: "The Gold Calculator",
    description: "The Gold Calculator - Calculate Melt Value of Your Scrap Gold",
    url: "https://thegoldcalculator.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://placehold.co/750x500/2563EB/FFFFFF/png?text=The%20Gold%20Calculator"
}

,
  {
    name: "https://www.vidmix.ai",
    description: "AI Song Generator is an easy-to-use platform that creates high-quality, royalty-free music in various styles, perfect fo...",
    url: "sadasdsad",
    category: "Video & Audio",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=example.com&sz=128"
},
  {
    name: "Ägglossning",
    description: "Vi har all information du kan tänka dig behöva kring ägglossning, som vad är symptom, ägglossnings kalkulator och mycket...",
    url: "https://xn--gglossning-p5a.se/",
    category: "Marketing",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=xn--gglossning-p5a.se&sz=128"
},
  {
    name: "Festklänningar",
    description: "Hitta din festklänning smidigt idag!",
    url: "https://xn--festklnning-q8a.se/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=xn--festklnning-q8a.se&sz=128"
},
  {
    name: "Overvisual",
    description: "Overvisual lets you create Instagram Story series in minutes. Upload your photos/videos and AI automatically places text...",
    url: "https://www.overvisual.com/",
    category: "Video & Audio",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.overvisual.com&sz=128"
},
  {
    name: "ChattyFit",
    description: "AI powered personal trainer in your pocket.",
    url: "https://chatty.fit",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=chatty.fit&sz=128"
},
  {
    name: "SlideWhisper",
    description: "SlideWhisper",
    url: "https://www.slidewhisper.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.slidewhisper.com&sz=128"
},
  {
    name: "imejis.io",
    description: "Imejis.io is a bulk image generator and automated image creation platform that helps you create, customize, and generate...",
    url: "https://www.imejis.io",
    category: "Image Generation",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.imejis.io&sz=128"
},
  {
    name: "Email Ferret",
    description: "AI personal assistant for Gmail.",
    url: "https://emailferret.io",
    category: "Copywriting",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=emailferret.io&sz=128"
},
  {
    name: "AgentGatePay",
    description: "Complete payment infrastructure for autonomous AI agents",
    url: "https://www.agentgatepay.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.agentgatepay.com&sz=128"
},
  {
    name: "Hypnotype",
    description: "The 'Kinetic Typography' engine for audio creators. Transforms podcasts and essays into high-retention text animations t...",
    url: "https://hypnotype.app",
    category: "Video & Audio",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=hypnotype.app&sz=128"
},
  {
    name: "Computer Keyboard Shortcuts",
    description: "The ultimate guide to computer keyboard shortcuts and hotkeys for Windows and MacOS.",
    url: "https://computerkeyboardshortcuts.org/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=computerkeyboardshortcuts.org&sz=128"
},
  {
    name: "Kataloop",
    description: "Kataloop is a Berlin-based creative agency specializing in Webflow websites with high design and technical standards. In...",
    url: "https://www.kataloop.com/en",
    category: "Image Generation",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.kataloop.com&sz=128"
},
  {
    name: "Floowed",
    description: "Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, an...",
    url: "Floowed is an AI credit workflow automation platform for credit and document-heavy processes. It extracts, validates, and enriches application data using AI, flags risks and fraud, and lets teams design custom workflows and metrics without engineering.",
    category: "Image Generation",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=example.com&sz=128"
},
  {
    name: "StrideFuel",
    description: "Built for weight loss success—especially GLP-1 users. AI coaching, voice logging, photo recognition, HealthKit sync. You...",
    url: "https://stride-fuel.com",
    category: "Image Generation",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=stride-fuel.com&sz=128"
},
  {
    name: "Oravida AI",
    description: "Oravida AI",
    url: "https://orav.ai/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=orav.ai&sz=128"
},
  {
    name: "AIRankPilot",
    description: "AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exac...",
    url: "AirRankPilot helps local businesses get discovered by Google and AI tools like ChatGPT and Perplexity. It shows you exactly what to publish and helps you create content that search engines and AI can understand and recommend.",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=example.com&sz=128"
},
  {
    name: "BookSwift",
    description: "Appointment scheduling app for independent service providers and small teams. Appointment scheduling app for independent...",
    url: "https://www.bookswift.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.bookswift.app&sz=128"
},
  {
    name: "SlidesCockpit",
    description: "Clone Viral TikToks For Your Product With AI & Auto-Post.",
    url: "https://slidescockpit.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=slidescockpit.com&sz=128"
},
  {
    name: "3dSynth.app",
    description: "A browser-based tool that skips the STL/Slicer workflow entirely.",
    url: "https://3dSynth.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=3dsynth.app&sz=128"
},
  {
    name: "Crypto News Navigator",
    description: "Crypto News Navigator is a trusted source for real-time crypto prices and market data. News and trends included.",
    url: "https://www.cryptonewsnavigator.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.cryptonewsnavigator.com&sz=128"
},
  {
    name: "Suburb Stack",
    description: "Launch hundreds or thousands of locally targeted, conversion-optimized landing pages built to rank and convert for SEO a...",
    url: "https://suburbstack.com/",
    category: "Marketing",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=suburbstack.com&sz=128"
},
  {
    name: "Cursor for Marketing Emails",
    description: "saas, marketing, email marketing, mailchimp, cursor",
    url: "https://sequenzy.com",
    category: "Copywriting",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=sequenzy.com&sz=128"
},
  {
    name: "Markeplay",
    description: "No-code AI-powered SaaS platform enabling rapid creation of complex, highly customizable e-commerce solutions for B2B ma...",
    url: "https://www.markeplay.com",
    category: "Code Assistance",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=www.markeplay.com&sz=128"
},
  {
    name: "Qeeebo",
    description: "AI-curated question-and-answer platform built to become the world’s largest.",
    url: "https://www.qeeebo.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.qeeebo.com&sz=128"
},
  {
    name: "feynn - Strategic Intelligence Platform",
    description: "Structured intelligence, powered by AI",
    url: "https://feynn.ai",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=feynn.ai&sz=128"
},
  {
    name: "AI Thumbnail",
    description: "Create clickable YouTube thumbnails with AI by copying what already works and making it yours.",
    url: "https://aithumbnail.gg",
    category: "Copywriting",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=aithumbnail.gg&sz=128"
},
  {
    name: "AyeWatch AI",
    description: "Personal AI Internet Monitor, that brings internet to you",
    url: "https://ayewatch.ai/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=ayewatch.ai&sz=128"
},
  {
    name: "PentestMate",
    description: "Autonomous pentesting agents that test your app and deliver fix ready reports.",
    url: "https://pentestmate.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=pentestmate.com&sz=128"
},
  {
    name: "Bolta",
    description: "Bolta.ai is a social media operating system that helps creators, founders, and teams plan, write, review, and publish co...",
    url: "https://bolta.ai/",
    category: "Copywriting",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=bolta.ai&sz=128"
},
  {
    name: "Sana Mujer",
    description: "We built Sana Mujer to solve a very specific access problem: millions of Spanish-speaking women live in the US, but most...",
    url: "https://www.sanamujer.com",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.sanamujer.com&sz=128"
},
  {
    name: "Beatable",
    description: "Beatable helps founders and investors validate business in seconds. The platform delivers in-depth competitor analysis, ...",
    url: "https://beatable.co",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=beatable.co&sz=128"
},
  {
    name: "Map Your Voyage",
    description: "Plan trips from Instagram reels in minutes, not weeks!",
    url: "https://mapyourvoyage.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=mapyourvoyage.com&sz=128"
},
  {
    name: "AyeCreate",
    description: "Allscreenshots provides a screenshot API that helps developers and businesses capture, combine, and automate website scr...",
    url: "https://ayecreate.ai/",
    category: "Image Generation",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=ayecreate.ai&sz=128"
},
  {
    name: "Nicegram",
    description: "Open‑source Telegram client, privacy‑first, with a non‑custodial multichain wallet, a built‑in AI assistant and Agent Ma...",
    url: "https://nicegram.app",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=nicegram.app&sz=128"
},
  {
    name: "The Gold Calculator",
    description: "The Gold Calculator - Calculate Melt Value of Your Scrap Gold",
    url: "https://thegoldcalculator.com/",
    category: "Productivity",
    tags: {
        useCase: [
            "Business"
        ],
        price: "Freemium",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=thegoldcalculator.com&sz=128"
}

];