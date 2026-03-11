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
  if (c.includes('claude code') || c.includes('terminal') || c.includes('local file')) return { tool: "Claude Code", why: "It can directly read and write files on your computer, making it 10x faster for technical tasks." };
  if (c.includes('pdf') || c.includes('10-k') || c.includes('transcript') || c.includes('long report') || c.includes('analyze')) return { tool: "Claude", why: "Claude handles long documents and complex instructions with more nuance and accuracy than other tools." };
  if (c.includes('make.com') || c.includes('zapier') || c.includes('automation') || c.includes('api')) return { tool: "Make.com", why: "This works best as a recurring system that connects your different business tools automatically." };
  if (c.includes('image') || c.includes('visual') || c.includes('design') || c.includes('screenshot')) return { tool: "Midjourney", why: "It generates professional, high-quality visuals that match your brand's aesthetic perfectly." };
  return { tool: "ChatGPT", why: "It is the most accessible tool for quick drafting, brainstorming, and general research." };
}

function generateActionSteps(title, tagline, tool) {
  const t = title.toLowerCase();
  let step1 = `Find your relevant data (like a CSV, report, or list of notes) related to ${t}.`;
  let step2 = `Paste that data into ${tool} and ask it to find the most important patterns or "low-hanging fruit".`;
  let step3 = `Apply the results to your next project or share the summary report with your team.`;

  if (t.includes('negotiator') || t.includes('script') || t.includes('writer')) {
    step1 = `Find the original text or bill you want to rewrite (e.g., a software invoice or a boring email).`;
    step2 = `Paste the text into ${tool} and ask it to draft 3 high-leverage variations based on your goal.`;
    step3 = `Send the best version to your contact and track the response.`;
  } else if (t.includes('hunter') || t.includes('detective') || t.includes('miner') || t.includes('scout')) {
    step1 = `Identify the source you want to research (e.g., a LinkedIn search, a competitor website, or a job board).`;
    step2 = `Paste the URL or raw text into ${tool} and ask it to extract specific leads that fit your ICP.`;
    step3 = `Import the list into your CRM and trigger a personalized outreach campaign.`;
  } else if (t.includes('auditor') || t.includes('analyzer') || t.includes('calculator')) {
    step1 = `Export your raw performance data (e.g., a week of ad stats or a month of sales calls).`;
    step2 = `Paste the data into ${tool} and ask it to pinpoint exactly where you are losing time or money.`;
    step3 = `Use the audit to adjust your budget or change your team's workflow for the following week.`;
  }
  return [step1, step2, step3];
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

      let desc = data.description || 'Automates repetitive manual tasks.';
      
      // Pivot to 'Idea' language: remove 'This tool', 'This agent', 'It scans', etc.
      desc = desc
        .replace(/This tool/gi, 'Idea:')
        .replace(/This agent/gi, 'Idea:')
        .replace(/This automation/gi, 'Idea:')
        .replace(/This workflow/gi, 'Idea:')
        .replace(/It scans/gi, 'Scan')
        .replace(/It finds/gi, 'Find')
        .replace(/It researches/gi, 'Research')
        .replace(/It drafts/gi, 'Draft')
        .replace(/It identifies/gi, 'Identify')
        .replace(/It analyzes/gi, 'Analyze')
        .replace(/It parses/gi, 'Parse')
        .replace(/It takes/gi, 'Take')
        .replace(/It checks/gi, 'Check')
        .replace(/Parses /g, 'Scan ')
        .replace(/Takes /g, 'Use ')
        .replace(/Checks /g, 'Scan ')
        .replace(/agent/gi, 'process')
        .replace(/workflow/gi, 'process')
        .replace(/automation/gi, 'process')
        .replace(/\n/g, ' ')
        .trim();
      
      // Clean up "Idea: " prefixes if they look weird
      desc = desc.replace(/^Idea: /i, '').replace(/Idea: /g, '');

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
