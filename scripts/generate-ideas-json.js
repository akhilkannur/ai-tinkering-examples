const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const recipesDir = path.join(process.cwd(), 'content/recipes');
const outputFilePath = path.join(process.cwd(), 'lib/ideas-data.json');

// Mapping for vertical normalization
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
  'CEO Ops': 'Executive'
};

const syntheticIdeas = [
  {
    "id": "employee-flight-risk-detector",
    "name": "The Employee Flight Risk Detector",
    "vertical": "HR",
    "problem": "Burnout and 'Quiet Quitting' are invisible until a resignation letter hits the desk, costing 1.5x salary to replace.",
    "what_ai_does": "Analyzes anonymized sentiment trends in Slack/Public channels to flag rising friction or 'disengagement clusters'.",
    "time_saved": "$50k+ (Per Hire)",
    "difficulty": "Intermediate",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "market-comp-benchmarker",
    "name": "Market Comp Benchmarker",
    "vertical": "HR",
    "problem": "Founders guess at salary bands or pay $20k for 'Compensation Reports' that are outdated.",
    "what_ai_does": "Scrapes live job postings for similar roles/titles to provide real-time salary and equity benchmarks.",
    "time_saved": "$20k (Consultant Fee)",
    "difficulty": "Beginner",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "benefits-simplifier",
    "name": "The Benefits Simplifier",
    "vertical": "HR",
    "problem": "HR teams are buried in repetitive questions because employees won't read 50-page benefits PDFs.",
    "what_ai_does": "Turns complex benefits PDFs into a searchable 'Chat with your Benefits' agent for instant employee answers.",
    "time_saved": "5 hours / week",
    "difficulty": "Beginner",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "cultural-sentiment-pulse",
    "name": "Cultural Sentiment Pulse",
    "vertical": "HR",
    "problem": "Annual surveys are too slow; frustration boils over before HR can react to management changes.",
    "what_ai_does": "Processes weekly pulse survey comments to identify 'Rising Friction' topics and sentiment shifts.",
    "time_saved": "10 hours / month",
    "difficulty": "Beginner",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "automated-onboarding-checklist",
    "name": "The Automated Onboarding Checklist",
    "vertical": "HR",
    "problem": "New hires feel lost because generic onboarding doesn't match their specific role or tech stack.",
    "what_ai_does": "Generates personalized '30-Day Success Checklists' based on the new hire's role, manager, and required tools.",
    "time_saved": "3 hours / hire",
    "difficulty": "Beginner",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "board-deck-narrative-factory",
    "name": "The Board Deck Narrative Factory",
    "vertical": "Executive",
    "problem": "Founders send raw metrics to the Board; directors get confused because the story behind the numbers is missing.",
    "what_ai_does": "Ingests P&L and Sales data to draft the core narrative slides: The Win, The Bottleneck, and The Pivot.",
    "time_saved": "15 hours / quarter",
    "difficulty": "Intermediate",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "investor-faq-clusterer",
    "name": "Investor FAQ Clusterer",
    "vertical": "Executive",
    "problem": "Founders answer the same 10 objections but forget to update the pitch deck to address them proactively.",
    "what_ai_does": "Analyzes transcripts from investor meetings to identify top concerns and drafts deck revisions.",
    "time_saved": "10 hours / week",
    "difficulty": "Intermediate",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "quarterly-ceo-narrative",
    "name": "The Quarterly CEO Narrative",
    "vertical": "Executive",
    "problem": "Drafting the quarterly 'Founder Letter' takes the CEO 10+ hours of focus time every three months.",
    "what_ai_does": "Transforms raw financial data and team wins into a plain-English letter in the CEO's specific voice.",
    "time_saved": "10 hours / quarter",
    "difficulty": "Intermediate",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "competitive-ceo-tracker",
    "name": "The Competitive CEO Tracker",
    "vertical": "Executive",
    "problem": "Competitors pivot strategies silently; founders miss signals like 'The CEO of X just started hiring 10 AI engineers'.",
    "what_ai_does": "Monitors public activity and hiring patterns of competitor CEOs to flag strategic shifts in real-time.",
    "time_saved": "5 hours / week",
    "difficulty": "Beginner",
    "tools": "ChatGPT, Claude, Gemini"
  },
  {
    "id": "executive-time-audit-police",
    "name": "Executive Time-Audit Police",
    "vertical": "Executive",
    "problem": "CEOs waste 40% of their day on low-ROI meetings and context switching without a system to flag the waste.",
    "what_ai_does": "Analyzes calendar data to identify 'Deep Work' leaks and suggest a high-ROI Focus Schedule.",
    "time_saved": "10 hours / week",
    "difficulty": "Beginner",
    "tools": "ChatGPT, Claude, Gemini"
  }
];

function generateIdeas() {
  const files = fs.readdirSync(recipesDir);
  const ideas = [];

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
    const { data } = matter(content);

    // Filter Logic: Standards check
    // Rejects basic 'Processor' archetypes that are just simple counters/utilities
    const isUtility = (data.title || '').toLowerCase().includes('counter') || 
                      (data.title || '').toLowerCase().includes('calculator') && data.archetype === 'Processor' && !data.isPremium;
    
    // Pass researchers, hybrids, analysts, and premium processors
    const passes = data.archetype === 'Researcher' || 
                   data.archetype === 'Hybrid' || 
                   data.archetype === 'Analyst' || 
                   data.isPremium === true;

    if (passes && !isUtility) {
      ideas.push({
        id: data.id || file.replace('.md', ''),
        name: data.title,
        vertical: verticalMap[data.category] || 'Ops',
        problem: data.tagline || 'Generic operational bottleneck.',
        what_ai_does: data.description ? data.description.split('.')[0] + '.' : 'Automates manual data workflows.',
        time_saved: data.isPremium ? '10+ hours / month' : '2-5 hours / week',
        difficulty: data.difficulty || 'Intermediate',
        tools: "ChatGPT, Claude, Gemini"
      });
    }
  });

  // Combine with synthetic ideas
  const finalDatabase = [...ideas, ...syntheticIdeas];

  fs.writeFileSync(outputFilePath, JSON.stringify(finalDatabase, null, 2));
  console.log(`Successfully generated ${finalDatabase.length} ideas in lib/ideas-data.json`);
}

generateIdeas();
