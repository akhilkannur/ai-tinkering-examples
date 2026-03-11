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

function determineIntelligence(title, tagline, body) {
  const c = (title + ' ' + tagline + ' ' + body).toLowerCase();
  
  // 1. Tool Logic
  let tool = "ChatGPT";
  let why = "It is the most accessible tool for quick drafting, brainstorming, and research.";
  
  if (c.includes('claude code') || c.includes('terminal') || c.includes('local file') || c.includes('file system')) {
    tool = "Claude Code";
    why = "It can directly read and write files on your computer, making it 10x faster for technical or repetitive tasks.";
  } else if (c.includes('pdf') || c.includes('10-k') || c.includes('transcript') || c.includes('long report') || c.includes('report') || c.includes('complex')) {
    tool = "Claude";
    why = "Claude handles long documents and complex instructions with more nuance and accuracy than other tools.";
  } else if (c.includes('make.com') || c.includes('zapier') || c.includes('automation') || c.includes('api') || c.includes('connect')) {
    tool = "Make.com";
    why = "This works best as a set-it-and-forget-it system that connects your different business tools automatically.";
  } else if (c.includes('image') || c.includes('visual') || c.includes('design') || c.includes('screenshot') || c.includes('thumbnail')) {
    tool = "Midjourney";
    why = "It generates professional, high-quality visuals that match your brand's aesthetic perfectly.";
  }

  // 2. ROI Logic
  let roi = "2-5 hours saved / week";
  if (c.includes('revenue') || c.includes('billing') || c.includes('savings') || c.includes('negotiat') || c.includes('cost')) {
    roi = "$5k+ saved / year";
  } else if (c.includes('premium') || c.includes('strategic')) {
    roi = "10+ hours saved / month";
  }

  // 3. Step Logic
  let steps = [
    `Export your data and paste it into ${tool}.`,
    `Ask ${tool} to identify the core patterns or specific business problems in the data.`,
    "Review the final report and apply the suggestions to your business."
  ];

  const workflowLines = body.split('\n').filter(l => l.match(/^\d+\.\s+/) || l.includes('Step') || l.includes('Phase'));
  if (workflowLines.length > 2) {
    steps = workflowLines.slice(0, 3).map(l => {
      let text = l.replace(/^\d+\.\s+/, '').replace(/\*\*/g, '').trim();
      text = text.replace(/agent/gi, 'tool').replace(/workflow/gi, 'process').replace(/execute/gi, 'run');
      if (!text.endsWith('.')) text += '.';
      return text;
    });
    // Inject tool into first step
    if (!steps[0].includes(tool)) steps[0] = `Paste your data into ${tool} and ${steps[0].toLowerCase()}`;
  }

  // 4. Strategic Problem Logic (Anti-Slop)
  let problem = tagline || "Stop wasting time on repetitive manual tasks.";
  if (problem.length < 15) problem = `Reclaim your time by automating ${title.toLowerCase()}.`;

  return { tool, why, roi, steps, problem };
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
      const intel = determineIntelligence(data.title, data.tagline, body);

      // Description logic (Full sentences only)
      let fullDesc = data.description || 'Automates repetitive manual tasks.';
      let sentences = fullDesc.match(/[^\.!\?]+[\.!\?]+/g) || [fullDesc];
      let desc = sentences.slice(0, 2).join(' ').trim();
      desc = desc.replace(/agent/gi, 'tool').replace(/workflow/gi, 'process').replace(/automation/gi, 'system');

      ideas.push({
        id: data.id || file.replace('.md', ''),
        name: data.title,
        vertical: verticalMap[data.category] || 'Ops',
        problem: intel.problem,
        what_ai_does: desc,
        howToDoIt: intel.steps,
        bestTool: intel.tool,
        whyThisTool: intel.why,
        time_saved: intel.roi,
        difficulty: data.difficulty === 'Beginner' ? 'Simple to Start' : data.difficulty === 'Intermediate' ? 'Practical' : 'Strategic',
        tools: "Practical Tool"
      });
    }
  });

  // Re-inject Synthetic Ideas (Highest Quality)
  const syntheticIdeas = [
    {
      "id": "employee-flight-risk-detector",
      "name": "Identify team burnout before someone quits",
      "vertical": "HR",
      "problem": "Burnout and 'Quiet Quitting' are invisible until a resignation letter hits the desk, costing 1.5x salary to replace.",
      "what_ai_does": "It notices when team frustration or 'quiet quitting' starts to happen in Slack so you can talk to them before they leave.",
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
      "what_ai_does": "It researches competitor prices and writes a polite but firm script for you to use to get a better deal on your software.",
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
