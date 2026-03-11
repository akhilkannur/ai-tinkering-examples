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
  'CEO Ops': 'Executive',
  'Strategic': 'Executive'
};

function determineBestTool(title, tagline, body) {
  const c = (title + ' ' + tagline + ' ' + body).toLowerCase();
  
  if (c.includes('claude code') || c.includes('terminal') || c.includes('local file')) {
    return { tool: "Claude Code", why: "It can directly read and write files on your computer, making it 10x faster for technical tasks." };
  }
  if (c.includes('make.com') || c.includes('zapier') || c.includes('automation') || c.includes('recurring')) {
    return { tool: "Make.com", why: "This works best as a set-it-and-forget-it system that connects your different business tools automatically." };
  }
  
  if ((c.includes('image') || c.includes('visual') || c.includes('design') || c.includes('screenshot') || c.includes('midjourney')) && 
      !(c.includes('launch') || c.includes('write') || c.includes('strategy'))) {
    return { tool: "Midjourney", why: "It generates professional, high-quality visuals that match your brand's aesthetic perfectly." };
  }
  
  if (c.includes('pdf') || c.includes('10-k') || c.includes('transcript') || c.includes('long report') || c.includes('analyze') || c.includes('narrative') || c.includes('legal')) {
    return { tool: "Claude", why: "Claude handles long documents and complex instructions with more nuance and accuracy than other tools." };
  }
  
  return { tool: "ChatGPT", why: "It is the most accessible tool for quick drafting, brainstorming, and general business research." };
}

function generateActionSteps(title, tagline, tool) {
  const t = (title + ' ' + tagline).toLowerCase();
  
  if (t.includes('negotiator') || t.includes('script') || t.includes('writer') || t.includes('chameleon') || t.includes('draft') || t.includes('respond') || t.includes('reply') || t.includes('comment')) {
    return [
      `Identify the specific document, email, or script you want to refine.`,
      `Paste the raw text into ${tool} and describe the tone you want to achieve.`,
      `Review the generated variations and pick the one that feels most natural for your brand.`
    ];
  }
  
  if (t.includes('hunter') || t.includes('detective') || t.includes('scout') || t.includes('scraper') || t.includes('miner') || t.includes('finder') || t.includes('source')) {
    return [
      `Choose a source where your target audience or data lives (e.g., a website, job board, or LinkedIn).`,
      `Supply the URL or raw data to ${tool} and ask it to filter for high-value signals.`,
      `Take the cleaned list and move it directly into your outreach process or CRM.`
    ];
  }
  
  if (t.includes('auditor') || t.includes('analyzer') || t.includes('heatmapper') || t.includes('scorer') || t.includes('matrix') || t.includes('monitor') || t.includes('check') || t.includes('audit')) {
    return [
      `Export a report of your current activity, like ad performance or support ticket logs.`,
      `Upload the data to ${tool} to spot the hidden trends that a manual review would miss.`,
      `Implement the suggested optimizations to stop wasting time or budget on what isn't working.`
    ];
  }
  
  if (t.includes('architect') || t.includes('builder') || t.includes('factory') || t.includes('optimizer') || t.includes('generator') || t.includes('launcher') || t.includes('onboarding') || t.includes('link')) {
    return [
      `Define the core goal of what you're trying to build or launch (e.g., a new internal linking strategy or onboarding flow).`,
      `Use ${tool} to generate a structured framework or initial draft based on industry best practices.`,
      `Refine the output and deploy it as a new standard process for your team.`
    ];
  }

  if (t.includes('locator') || t.includes('mapper') || t.includes('city') || t.includes('geo')) {
    return [
      `Gather your geographic data, like customer addresses or event locations.`,
      `Ask ${tool} to cluster the data and identify the high-density areas.`,
      `Use the map to decide where to focus your next physical event or local ad campaign.`
    ];
  }

  return [
    `Identify the manual process you want to simplify.`,
    `Paste your raw notes or data into ${tool} and ask for a strategic plan.`,
    `Execute the top 3 recommendations to reclaim your time.`
  ];
}

function cleanDescription(desc) {
  if (!desc) return 'Automates repetitive manual tasks.';
  
  let d = desc
    .replace(/This tool/gi, '')
    .replace(/This agent/gi, '')
    .replace(/This automation/gi, '')
    .replace(/This workflow/gi, '')
    .replace(/It scans/gi, 'Scan')
    .replace(/It finds/gi, 'Find')
    .replace(/It researches/gi, 'Research')
    .replace(/It drafts/gi, 'Draft')
    .replace(/It identifies/gi, 'Identify')
    .replace(/It analyzes/gi, 'Analyze')
    .replace(/It parses/gi, 'Parse')
    .replace(/It takes/gi, 'Use')
    .replace(/It checks/gi, 'Check')
    .replace(/It helps/gi, 'Use this to')
    .replace(/Parses /g, 'Scan ')
    .replace(/Takes /g, 'Use ')
    .replace(/Checks /g, 'Scan ')
    .replace(/helps /gi, 'Use this to ')
    .replace(/agent/gi, 'process')
    .replace(/workflow/gi, 'process')
    .replace(/automation/gi, 'process')
    .replace(/\n/g, ' ')
    .trim();
  
  d = d.charAt(0).toUpperCase() + d.slice(1);
  d = d.replace(/\s\s+/g, ' ');
  d = d.replace(/^Idea:\s+/i, '').replace(/^Process:\s+/i, '');
  
  return d;
}

function generateIdeas() {
  const files = fs.readdirSync(recipesDir);
  const ideas = [];

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
    const { data, content: body } = matter(content);

    const isUtility = (data.title || '').toLowerCase().includes('counter') || 
                      (data.title || '').toLowerCase().includes('calculator') && data.archetype === 'Processor' && !data.isPremium;
    
    const passes = data.archetype === 'Researcher' || 
                   data.archetype === 'Hybrid' || 
                   data.archetype === 'Analyst' || 
                   data.isPremium === true;

    if (passes && !isUtility) {
      const toolInfo = determineBestTool(data.title, data.tagline, body);
      const steps = generateActionSteps(data.title, data.tagline, toolInfo.tool);
      const desc = cleanDescription(data.description);

      let roi = data.isPremium ? '10+ hours saved / month' : '2-5 hours saved / week';
      if (data.title.toLowerCase().includes('negotiator') || data.title.toLowerCase().includes('savings')) roi = "$5k+ saved / year";

      ideas.push({
        id: data.id || file.replace('.md', ''),
        name: data.title,
        vertical: verticalMap[data.category] || 'Ops',
        problem: data.tagline || 'Stop wasting time on repetitive manual tasks.',
        what_ai_does: desc,
        howToDoIt: steps,
        bestTool: toolInfo.tool,
        whyThisTool: toolInfo.why,
        time_saved: roi,
        difficulty: data.difficulty === 'Beginner' ? 'Simple to Start' : data.difficulty === 'Intermediate' ? 'Practical' : 'Strategic',
        tools: "Practical Tool"
      });
    }
  });

  const syntheticIdeas = [
    {
      "id": "employee-flight-risk-detector",
      "name": "Identify team burnout before someone quits",
      "vertical": "HR",
      "problem": "Burnout and 'Quiet Quitting' are invisible until a resignation letter hits the desk, costing 1.5x salary to replace.",
      "what_ai_does": "Detect team frustration or 'quiet quitting' in Slack to identify burnout before it happens.",
      "howToDoIt": [
        "Export anonymized message data from your public Slack channels.",
        "Paste the data into Claude (or ChatGPT) and ask it to identify sentiment shifts—rising frustration, disengagement patterns, or mood changes.",
        "Review the results to identify which teams or departments need a 1-on-1 check-in."
      ],
      "bestTool": "Claude",
      "whyThisTool": "It's better at detecting subtle emotional nuances and reading between the lines in long transcripts than ChatGPT.",
      "time_saved": "$50k+ saved per prevented resignation",
      "difficulty": "Practical",
      "tools": "Practical Tool"
    },
    {
      "id": "market-comp-benchmarker",
      "name": "Lower your monthly software bills by 20%",
      "vertical": "Finance",
      "problem": "Companies overpay for software because they don't have time to research competitor deals or parity pricing.",
      "what_ai_does": "Lower monthly software bills by 20% by researching competitor prices and drafting negotiation scripts.",
      "howToDoIt": [
        "Enter the name of the software tool you are currently paying for into ChatGPT.",
        "Ask the tool to research current competitor pricing and 'switching promotions' for that specific product.",
        "Use the generated script to email your account manager and ask for a price match or discount."
      ],
      "bestTool": "ChatGPT",
      "whyThisTool": "ChatGPT is the fastest tool for drafting professional emails and quickly researching public list prices.",
      "time_saved": "20% saved on annual software spend",
      "difficulty": "Simple to Start",
      "tools": "Practical Tool"
    }
  ];

  const synthIds = new Set(syntheticIdeas.map(s => s.id));
  const finalDatabase = [...ideas.filter(i => !synthIds.has(i.id)), ...syntheticIdeas];

  fs.writeFileSync(outputFilePath, JSON.stringify(finalDatabase, null, 2));
  console.log(`Successfully generated ${finalDatabase.length} refined, intelligent ideas.`);
}

generateIdeas();
