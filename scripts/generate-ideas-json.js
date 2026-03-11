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
    "name": "Identify team burnout before someone quits",
    "vertical": "HR",
    "problem": "Burnout and 'Quiet Quitting' are invisible until a resignation letter hits the desk, costing 1.5x salary to replace.",
    "what_ai_does": "It notices when team frustration or 'quiet quitting' starts to happen in Slack so you can talk to them before they leave.",
    "howToDoIt": [
      "Export anonymized message data from your public Slack channels.",
      "Upload the data to a private AI tool to scan for sentiment shifts (e.g., rising frustration or disengagement).",
      "Review the 'Friction Report' to identify which departments or teams need a 1-on-1 check-in."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Claude is excellent at detecting subtle emotional nuances and 'reading between the lines' in long transcripts.",
    "time_saved": "$50k+ (Per Hire)",
    "difficulty": "Practical",
    "tools": "Practical Tool"
  },
  {
    "id": "market-comp-benchmarker",
    "name": "Market Comp Benchmarker",
    "vertical": "HR",
    "problem": "Lower your monthly software bills by 20%.",
    "what_ai_does": "It researches competitor prices and writes a polite but firm script for you to use to get a better deal on your software.",
    "howToDoIt": [
      "Enter the name of the software tool you are currently paying for.",
      "The tool researches current competitor pricing and 'switching promotions'.",
      "It drafts a high-leverage negotiation script based on the cheaper alternatives it found."
    ],
    "bestTool": "ChatGPT",
    "whyThisTool": "ChatGPT is great for quickly drafting persuasive, professional emails and researching list prices.",
    "time_saved": "$20k (Consultant Fee)",
    "difficulty": "Simple to Start",
    "tools": "Practical Tool"
  },
  {
    "id": "board-deck-narrative-factory",
    "name": "Stop sending messy spreadsheets to your board",
    "vertical": "Executive",
    "problem": "Founders send raw metrics to the Board; directors get confused because the story behind the numbers is missing.",
    "what_ai_does": "It looks at your numbers and helps you write a clear story about what's working and what needs to change for your directors.",
    "howToDoIt": [
      "Upload your P&L or Sales metrics CSV for the quarter.",
      "Identify the 'Top 3 Wins' and 'Top 3 Bottlenecks' using AI analysis.",
      "Generate the narrative text for a 5-slide strategic update (The Win, The Gap, The Pivot)."
    ],
    "bestTool": "Claude",
    "whyThisTool": "Claude handles complex data analysis and narrative structure better than most tools, keeping the 'CEO voice' consistent.",
    "time_saved": "15 hours / quarter",
    "difficulty": "Strategic",
    "tools": "Practical Tool"
  }
];

function extractSteps(content) {
  const steps = [];
  const lines = content.split('\n');
  let inWorkflow = false;
  
  for (const line of lines) {
    if (line.includes('## Workflow')) inWorkflow = true;
    if (inWorkflow && line.match(/^\d+\.\s+\*\*.*\*\*/)) {
      steps.push(line.replace(/^\d+\.\s+\*\*(.*)\*\*.*$/, '$1').trim());
    } else if (inWorkflow && line.match(/^\d+\.\s+/)) {
      steps.push(line.replace(/^\d+\.\s+/, '').trim());
    }
    if (steps.length >= 5) break;
  }
  
  if (steps.length === 0) {
    return ["Upload your data to the AI tool.", "Analyze the results for patterns.", "Export the final report."];
  }
  return steps;
}

function determineBestTool(id, title, content) {
  const c = (title + ' ' + content).toLowerCase();
  if (c.includes('claude code') || c.includes('terminal') || c.includes('local file')) return { tool: "Claude Code", why: "This task requires direct interaction with your local files and terminal for maximum speed." };
  if (c.includes('pdf') || c.includes('10-k') || c.includes('transcript') || c.includes('long report')) return { tool: "Claude", why: "Claude has a larger 'memory' (context window) and handles long, complex documents with high accuracy." };
  if (c.includes('make.com') || c.includes('zapier') || c.includes('automation') || c.includes('api')) return { tool: "Make.com", why: "This idea works best as a recurring automation that connects different software tools together." };
  if (c.includes('image') || c.includes('visual') || c.includes('screenshot') || c.includes('design')) return { tool: "Midjourney", why: "Midjourney is currently the gold standard for high-quality, branded business visuals." };
  return { tool: "ChatGPT", why: "ChatGPT is the most accessible tool for quick brainstorming, drafting, and general research." };
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
      let desc = data.description ? data.description.split('.')[0] + '.' : 'Automates repetitive manual tasks.';
      desc = desc.replace(/agent/gi, 'tool').replace(/workflow/gi, 'process').replace(/automation/gi, 'system');

      const toolInfo = determineBestTool(data.id, data.title, body);

      ideas.push({
        id: data.id || file.replace('.md', ''),
        name: data.title,
        vertical: verticalMap[data.category] || 'Ops',
        problem: data.tagline || 'Stop wasting time on repetitive manual tasks.',
        what_ai_does: desc,
        howToDoIt: extractSteps(body),
        bestTool: toolInfo.tool,
        whyThisTool: toolInfo.why,
        time_saved: data.isPremium ? '10+ hours / month' : '2-5 hours / week',
        difficulty: data.difficulty === 'Beginner' ? 'Simple to Start' : data.difficulty === 'Intermediate' ? 'Practical' : 'Strategic',
        tools: "Practical Tool"
      });
    }
  });

  const finalDatabase = [...ideas, ...syntheticIdeas];

  fs.writeFileSync(outputFilePath, JSON.stringify(finalDatabase, null, 2));
  console.log(`Successfully generated ${finalDatabase.length} ideas with detailed steps in lib/ideas-data.json`);
}

generateIdeas();
