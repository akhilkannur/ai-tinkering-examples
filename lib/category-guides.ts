export interface FAQ {
  question: string;
  answer: string;
}

export interface CategoryContent {
  title: string;
  intro?: string;
  guideTitle: string;
  guide: string[]; // Array of paragraphs for the main guide
  faqs: FAQ[];
}

export const categoryGuides: Record<string, CategoryContent> = {
  'sales-ops': {
    title: "Sales Operations Automation",
    intro: "Stop fixing CRM data manually. Use these blueprints to automate lead routing, enrichment, and territory management.",
    guideTitle: "How to Automate Sales Ops with AI",
    guide: [
      "Sales Operations is often the unsung hero of a revenue organization, but it's also the department most bogged down by 'grunt work.' If you're manually assigning leads in HubSpot or Salesforce, checking LinkedIn profiles to verify job titles, or calculating commission payouts in Excel, you are wasting valuable strategic time.",
      "The blueprints in this collection focus on three core pillars: **Data Hygiene**, **Lead Enrichment**, and **Process Automation**. For example, instead of manually checking if a lead is 'qualified,' you can use a script to cross-reference their domain with a 'Target Account' list, check their tech stack using a scraper, and then update the CRM status automatically.",
      "A common high-impact workflow is **'The CRM Janitor'**. This agent periodically scans your contacts for missing fields (like 'Industry' or 'Country'), searches the web to find the missing data, and fills it in. This ensures your territory mapping and segmentation reports are always accurate without human intervention."
    ],
    faqs: [
      {
        question: "Can these blueprints write to my Salesforce/HubSpot?",
        answer: "Yes. Most blueprints output a clean CSV. You can then use the 'Zapier Logic Architect' blueprint or a simple Python script to push that CSV back into your CRM via API."
      },
      {
        question: "How do I handle commission calculations with AI?",
        answer: "Use the 'Commission Calculator' blueprint. It takes your raw deal data and your commission logic (tiers, accelerators) as inputs, and outputs a detailed payout report. It removes the human error from complex math."
      },
      {
        question: "Is this safe for PII data?",
        answer: "Since these agents run locally on your machine (via Claude Code or Gemini CLI), your customer data stays on your device until you decide to upload it. You aren't pasting confidential client lists into a public ChatGPT window."
      }
    ]
  },
  'marketing-ops': {
    title: "Marketing Operations & Analytics",
    intro: "Fix your attribution, standardize UTMs, and audit your tracking pixels automatically.",
    guideTitle: "Mastering Marketing Ops Automation",
    guide: [
      "Marketing Ops is the backbone of growth, but it breaks easily. A single wrong UTM parameter can ruin a month's worth of attribution data. The workflows here are designed to be your 'Safety Net.' They enforce discipline on your data so you can trust your dashboards.",
      "One of the most popular tools is the **'UTM Taxonomy Enforcer'**. It takes a list of campaign URLs and validates them against a strict set of rules (e.g., lowercase only, no spaces, specific source names). If it finds a violation, it flags it before the campaign goes live.",
      "Another critical area is **Tracking Pixel Audits**. It is surprisingly common for high-growth companies to lose data because a Facebook Pixel or Google Analytics tag fell off a landing page during a deployment. Our 'Pixel Detective' blueprint crawls your key pages daily to verify that all required tracking scripts are present and firing."
    ],
    faqs: [
      {
        question: "Can this help with GA4 migration?",
        answer: "Yes. We have blueprints that audit your existing UA tags and map them to GA4 events, ensuring you don't lose historical context during the transition."
      },
      {
        question: "How do I automate weekly reporting?",
        answer: "Use the 'Marketing Report Generator'. You feed it raw CSV exports from your ad platforms (FB, Google, LinkedIn), and it aggregates the spend, impressions, and conversions into a unified view, calculating your blended CAC and ROAS automatically."
      }
    ]
  },
  'seo': {
    title: "Programmatic SEO & Technical Audits",
    intro: "Scale your traffic without scaling your headcount. Automate internal linking, content updates, and technical health checks.",
    guideTitle: "Agentic Workflows for SEO",
    guide: [
      "SEO is no longer just about writing good blog posts. It's about architecture and scale. The blueprints here help you manage thousands of pages as easily as ten. This is **Programmatic SEO** made accessible.",
      "Start with **'The Internal Link Architect'**. This agent scans your blog posts, identifies semantic relationships between them, and suggests specific anchor text and links to connect them. This builds a strong topical mesh that Google loves, without you having to manually re-read old posts.",
      "For content maintenance, the **'Content Decay Detector'** is essential. It connects to your Search Console data, identifies pages that have lost traffic over the last 6 months, and flags them for a 'Refresh.' This keeps your content library performing at peak efficiency."
    ],
    faqs: [
      {
        question: "Do these tools replace Ahrefs or Semrush?",
        answer: "No, they complement them. You use Ahrefs for data (keywords, backlinks), and you use these agents to *act* on that data—like clustering thousands of keywords or auditing 500 pages for missing H1 tags."
      },
      {
        question: "Can I generate articles automatically?",
        answer: "Yes, but be careful. We recommend 'Human-in-the-loop' workflows. Use the 'Brief Generator' to create detailed outlines, then write the content yourself or edit the AI's draft heavily to ensure quality and E-E-A-T."
      }
    ]
  },
  'lead-gen': {
    title: "Outbound Sales & Lead Generation",
    intro: "Build high-intent lists, write personalized icebreakers at scale, and verify emails to protect your sender reputation.",
    guideTitle: "Modern Outbound: Precision at Scale",
    guide: [
      "The 'Spray and Pray' era of outbound sales is dead. Spam filters are too smart, and buyers are too annoyed. To win today, you need **Signal-Based Selling**. This means reaching out only when there is a compelling reason, like a new hire, a funding round, or a tech stack change.",
      "Our **'Signal Scraper'** blueprints allow you to monitor specific triggers. For example, you can scan a list of 500 target domains to see which ones installed 'HubSpot' in the last month. That is a perfect trigger for a HubSpot consultant to reach out.",
      "Once you have the list, use the **'Icebreaker Writer'**. It reads the prospect's LinkedIn 'About' section or recent posts and generates a genuine, relevant opening line for your email. This dramatically increases reply rates compared to generic templates."
    ],
    faqs: [
      {
        question: "How do I verify email addresses?",
        answer: "The 'Email Verifier' blueprint connects to SMTP servers to ping the address without sending an actual email. It classifies emails as Valid, Invalid, or Catch-All, saving your domain reputation."
      },
      {
        question: "What is the best data source for these agents?",
        answer: "They work best with LinkedIn Sales Navigator exports, Apollo data, or even simple Google Maps scrapes. The agent cleans and enriches whatever raw data you provide."
      }
    ]
  },
  'content-ops': {
    title: "Content Operations & Repurposing",
    intro: "Turn one video into ten tweets. Automate your editorial calendar and ensure brand voice consistency.",
    guideTitle: "Scale Your Content Engine",
    guide: [
      "Creating content is expensive. Distributing it shouldn't be. **Content Ops** is about squeezing every drop of value from the assets you create. If you record a podcast, that audio should become a blog post, a newsletter, five tweets, and three LinkedIn posts.",
      "The **'Repurposing Engine'** blueprint takes a transcript (or a YouTube URL) and outputs these assets automatically, formatting them for each platform's specific constraints (e.g., character limits, hashtag usage).",
      "For teams, the **'Brand Voice Police'** is a lifesaver. It checks draft content against your style guide. Does it use the Oxford comma? Is the tone 'Helpful' or 'Arrogant'? It catches these nuances before you hit publish."
    ],
    faqs: [
      {
        question: "Can I use this for video editing?",
        answer: "For text-based tasks, yes. For actual video editing, we recommend tools like Descript. However, our agents can generate the *timestamps* and *captions* for those clips perfectly."
      }
    ]
  }
};
