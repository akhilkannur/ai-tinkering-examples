const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const recipesDir = path.join(process.cwd(), 'content/recipes');
const outputFilePath = path.join(process.cwd(), 'lib/ideas-data.json');

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
    "problem": "Identify team burnout before someone quits.",
    "what_ai_does": "It notices when team frustration or 'quiet quitting' starts to happen in Slack so you can talk to them before they leave.",
    "time_saved": "$50k+ (Per Hire)",
    "difficulty": "Intermediate",
    "tools": "Practical Tool"
  },
  {
    "id": "market-comp-benchmarker",
    "name": "Market Comp Benchmarker",
    "vertical": "HR",
    "problem": "Lower your monthly software bills by 20%.",
    "what_ai_does": "It researches competitor prices and writes a polite but firm script for you to use to get a better deal on your software.",
    "time_saved": "$20k (Consultant Fee)",
    "difficulty": "Beginner",
    "tools": "Practical Tool"
  },
  {
    "id": "benefits-simplifier",
    "name": "The Benefits Simplifier",
    "vertical": "HR",
    "problem": "Answer repetitive benefits questions instantly.",
    "what_ai_does": "Turns complex benefits PDFs into a simple assistant that answers employee questions instantly, 24/7.",
    "time_saved": "5 hours / week",
    "difficulty": "Beginner",
    "tools": "Practical Tool"
  },
  {
    "id": "cultural-sentiment-pulse",
    "name": "Cultural Sentiment Pulse",
    "vertical": "HR",
    "problem": "Catch management frustration before it boils over.",
    "what_ai_does": "Processes weekly pulse survey comments to identify rising frustration topics and sentiment shifts in plain English.",
    "time_saved": "10 hours / month",
    "difficulty": "Beginner",
    "tools": "Practical Tool"
  },
  {
    "id": "automated-onboarding-checklist",
    "name": "The Automated Onboarding Checklist",
    "vertical": "HR",
    "problem": "Standardize new hire success in minutes.",
    "what_ai_does": "Generates personalized '30-Day Success Checklists' based on the new hire's role and the tools they actually need to use.",
    "time_saved": "3 hours / hire",
    "difficulty": "Beginner",
    "tools": "Practical Tool"
  },
  {
    "id": "board-deck-narrative-factory",
    "name": "The Board Deck Narrative Factory",
    "vertical": "Executive",
    "problem": "Stop sending messy spreadsheets to your board.",
    "what_ai_does": "It looks at your numbers and helps you write a clear story about what's working and what needs to change for your directors.",
    "time_saved": "15 hours / quarter",
    "difficulty": "Intermediate",
    "tools": "Practical Tool"
  },
  {
    "id": "investor-faq-clusterer",
    "name": "Investor FAQ Clusterer",
    "vertical": "Executive",
    "problem": "Update your pitch deck based on real investor concerns.",
    "what_ai_does": "Analyzes transcripts from investor meetings to identify top concerns and suggests clear ways to address them in your deck.",
    "time_saved": "10 hours / week",
    "difficulty": "Intermediate",
    "tools": "Practical Tool"
  },
  {
    "id": "quarterly-ceo-narrative",
    "name": "The Quarterly CEO Narrative",
    "vertical": "Executive",
    "problem": "Write your founder's letter in minutes, not hours.",
    "what_ai_does": "Transforms raw financial data and team wins into a plain-English letter in the CEO's specific voice.",
    "time_saved": "10 hours / quarter",
    "difficulty": "Intermediate",
    "tools": "Practical Tool"
  },
  {
    "id": "competitive-ceo-tracker",
    "name": "The Competitive CEO Tracker",
    "vertical": "Executive",
    "problem": "Know exactly when a competitor shifts strategy.",
    "what_ai_does": "Monitors public activity and hiring patterns of competitor CEOs to flag strategic shifts in real-time.",
    "time_saved": "5 hours / week",
    "difficulty": "Beginner",
    "tools": "Practical Tool"
  },
  {
    "id": "executive-time-audit-police",
    "name": "Executive Time-Audit Police",
    "vertical": "Executive",
    "problem": "Reclaim 40% of your day from low-ROI meetings.",
    "what_ai_does": "Analyzes calendar data to identify time-wasters and suggest a high-ROI Focus Schedule.",
    "time_saved": "10 hours / week",
    "difficulty": "Beginner",
    "tools": "Practical Tool"
  }
];

function generateIdeas() {
  const files = fs.readdirSync(recipesDir);
  const ideas = [];

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
    const { data } = matter(content);

    const isUtility = (data.title || '').toLowerCase().includes('counter') || 
                      (data.title || '').toLowerCase().includes('calculator') && data.archetype === 'Processor' && !data.isPremium;
    
    const passes = data.archetype === 'Researcher' || 
                   data.archetype === 'Hybrid' || 
                   data.archetype === 'Analyst' || 
                   data.isPremium === true;

    if (passes && !isUtility) {
      // Clean up the description to remove technical jargon
      let desc = data.description ? data.description.split('.')[0] + '.' : 'Automates repetitive manual tasks.';
      desc = desc.replace(/agent/gi, 'tool').replace(/workflow/gi, 'process').replace(/automation/gi, 'system');

      ideas.push({
        id: data.id || file.replace('.md', ''),
        name: data.title,
        vertical: verticalMap[data.category] || 'Ops',
        problem: data.tagline || 'Stop wasting time on repetitive manual tasks.',
        what_ai_does: desc,
        time_saved: data.isPremium ? '10+ hours / month' : '2-5 hours / week',
        difficulty: data.difficulty || 'Intermediate',
        tools: "Practical Tool"
      });
    }
  });

  const finalDatabase = [...ideas, ...syntheticIdeas];

  fs.writeFileSync(outputFilePath, JSON.stringify(finalDatabase, null, 2));
  console.log(`Successfully generated ${finalDatabase.length} ideas in lib/ideas-data.json`);
}

generateIdeas();
