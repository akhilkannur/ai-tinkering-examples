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

function determineBestTool(title, body) {
  const c = (title + ' ' + body).toLowerCase();
  if (c.includes('claude code') || c.includes('terminal') || c.includes('local file')) {
    return { tool: "Claude Code", why: "It can directly read and write files on your computer, making it 10x faster for technical tasks." };
  }
  if (c.includes('pdf') || c.includes('10-k') || c.includes('transcript') || c.includes('long report') || c.includes('analyze')) {
    return { tool: "Claude", why: "Claude handles long documents and complex instructions with more accuracy and nuance than other tools." };
  }
  if (c.includes('make.com') || c.includes('zapier') || c.includes('automation') || c.includes('recurring')) {
    return { tool: "Make.com", why: "This works best as a set-it-and-forget-it system that connects your different business tools automatically." };
  }
  if (c.includes('image') || c.includes('visual') || c.includes('screenshot') || c.includes('design') || c.includes('thumbnail')) {
    return { tool: "Midjourney", why: "It generates professional, high-quality visuals that match your brand's aesthetic perfectly." };
  }
  return { tool: "ChatGPT", why: "It is the most accessible tool for quick drafting, brainstorming, and general business research." };
}

function refineSteps(body, bestTool) {
  const steps = [];
  const lines = body.split('\n');
  let inWorkflow = false;
  
  for (const line of lines) {
    if (line.includes('## Workflow')) inWorkflow = true;
    if (inWorkflow && (line.match(/^\d+\.\s+\*\*.*\*\*/) || line.match(/^\d+\.\s+/))) {
      let stepText = line.replace(/^\d+\.\s+/, '').replace(/\*\*/g, '').trim();
      
      stepText = stepText
        .replace(/Check:? /gi, '')
        .replace(/If Missing:? /gi, '')
        .replace(/Run script/gi, 'Paste your data')
        .replace(/Execute/gi, 'Ask the tool to')
        .replace(/Open file/gi, 'Export your data')
        .replace(/CSV/g, 'data')
        .split('.')[0] + '.';

      if (stepText.length < 5) continue;
      steps.push(stepText);
    }
    if (steps.length >= 3) break;
  }
  
  if (steps.length > 0 && !steps[0].includes(bestTool)) {
    steps[0] = `Paste your data into ${bestTool}.`;
  }

  if (steps.length < 3) {
    return [
      `Export your relevant data and paste it into ${bestTool}.`,
      `Ask ${bestTool} to identify patterns or specific opportunities based on your goal.`,
      "Review the results and apply the suggestions to your workflow."
    ];
  }
  return steps;
}

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
  }
];

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
      let fullDesc = data.description || 'Automates repetitive manual tasks.';
      // Get the first two sentences for a complete, robust description
      let sentences = fullDesc.match(/[^\.!\?]+[\.!\?]+/g) || [fullDesc];
      let desc = sentences.slice(0, 2).join(' ').trim();
      
      desc = desc.replace(/agent/gi, 'tool').replace(/workflow/gi, 'process').replace(/automation/gi, 'system');

      const toolInfo = determineBestTool(data.title, body);

      let roi = data.isPremium ? '10+ hours saved / month' : '2-5 hours saved / week';
      if (data.title.toLowerCase().includes('negotiator') || data.title.toLowerCase().includes('savings')) roi = '$5k+ saved / year';

      ideas.push({
        id: data.id || file.replace('.md', ''),
        name: data.title,
        vertical: verticalMap[data.category] || 'Ops',
        problem: data.tagline || 'Stop wasting time on repetitive manual tasks.',
        what_ai_does: desc,
        howToDoIt: refineSteps(body, toolInfo.tool),
        bestTool: toolInfo.tool,
        whyThisTool: toolInfo.why,
        time_saved: roi,
        difficulty: data.difficulty === 'Beginner' ? 'Simple to Start' : data.difficulty === 'Intermediate' ? 'Practical' : 'Strategic',
        tools: "Practical Tool"
      });
    }
  });

  const synthIds = new Set(syntheticIdeas.map(s => s.id));
  const finalDatabase = [...ideas.filter(i => !synthIds.has(i.id)), ...syntheticIdeas];

  fs.writeFileSync(outputFilePath, JSON.stringify(finalDatabase, null, 2));
  console.log(`Successfully generated ${finalDatabase.length} refined ideas.`);
}

generateIdeas();
