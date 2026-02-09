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
    image: "https://www.google.com/s2/favicons?domain=invoplex.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=docutracker.io&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=menubartime.com&sz=128"
},
  {
    name: "CleanMark",
    description: "**Dual Functionality:**   - Remove text watermarks from NotebookLM PDFs (bottom-right corner)   - Remove watermarks from Gemini AI-generated images    🔬 **Advanced Technology:**   - Powered by OpenCV inpainting algorithms for seamless removal   - Directly processes embedded PDF images to maintain resolution   - Smart watermark detection that works on both light and dark backgrounds   - Supports large files up to 100MB    ✨ **User-Friendly Experience:**   - One-click upload and process   - Preview results before downloading   - No software installation required   - Batch processing support   - Fast processing (typically under 30 seconds)",
    url: "https://geminiwatermarkremover.net/",
    category: "Image Generation",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=geminiwatermarkremover.net&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.archrender.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.moduledge.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.techtwitter.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=bankpdfconverter.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=squaredaway.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=logostream.dev&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=getarchivist.org&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=bitvoiper.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=vitelnk.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.roomika.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.multic.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=thrive.fi&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=pressbeat.io&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=simpleseverance.co&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=cookieguard.co&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=simplyhabits.io&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=diffscout.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.test-lab.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=saasblueprint.app&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=bangas.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=shortsai.com&sz=128"
  },
  {
    name: "LinkedGrow",
    description: "AI-powered LinkedIn content creation tool designed to generate high-converting posts and boost professional engagement.",
    url: "https://linkedgrow.ai/beta",
    category: "Marketing",
    tags: {
      useCase: ["Business"],
      price: "Freemium",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=linkedgrow.ai&sz=128"
  },
  {
    name: "Credops",
    description: "Monitors credential expiry timelines for production environments, tracking metadata and dates without requiring secret values.",
    url: "https://www.credops.io/",
    category: "Productivity",
    tags: {
      useCase: ["Business"],
      price: "Freemium",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=www.credops.io&sz=128"
  },
  {
    name: "Podcept",
    description: "AI-driven platform to find perfect guests for your show or get booked on top-tier podcasts to grow your reach.",
    url: "https://www.podcept.com",
    category: "Marketing",
    tags: {
      useCase: ["Creative"],
      price: "Freemium",
      skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=www.podcept.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=roomstage.ai&sz=128"
  },
  {
    name: "Murmur",
    description: "Private, offline speech-to-text dictation for Windows powered by OpenAI Whisper for high-security environments.",
    url: "https://murmurvt.com",
    category: "Video & Audio",
    tags: {
      useCase: ["Business"],
      price: "Paid",
      skill: "Intermediate"
    },
    image: "https://www.google.com/s2/favicons?domain=murmurvt.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=trytails.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=neonchainx.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.roampads.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.flowly.tools&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=tryremote.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=userjam.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=medshotsai.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=mixels.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=emailverify.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=Stageflow.ai&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=getoneprofile.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=www.pdfseek.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=eleidon.com&sz=128"
},
  {
    name: "ChampSignal",
    description: "ChampSignal tracks your competitors 24/7 across websites, news, Reddit, ads, and SEO. When something important changes, you know the same day.  Most alerts are noise. ChampSignal uses AI to filter them so you only get notified when it actually matters. A price drop. A new feature launch. A shift in messaging. A Reddit thread gaining traction.  Set up in under two minutes. Enter your website and we find your competitors for you. You get your first insights right away.  What you get:  Website changes like pricing, features, and messaging. News and Reddit mentions. Google and Meta ad tracking. SEO rankings and backlinks. Email and Slack alerts on your schedule.  Need deeper analysis? Ask Champ, your AI competitive intelligence analyst. It knows everything we've tracked and gives you instant answers, battlecards, trend analysis, and positioning advice. No manual research needed.  A competitive intelligence analyst costs $80K+ a year. ChampSignal gives you the same coverage for $39/month.  Try it free for 14 days.",
    url: "https://champsignal.com",
    category: "Copywriting",
    tags: {
        useCase: ["Business"],
        price: "Free",
        skill: "Beginner"
    },
    image: "https://www.google.com/s2/favicons?domain=champsignal.com&sz=128"
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
    image: "https://www.google.com/s2/favicons?domain=GreatCompany.ai&sz=128"
}
];