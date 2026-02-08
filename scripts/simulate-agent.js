const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(process.cwd(), '.gemini/logs/current.json');
const OUTPUT_DIR = path.join(process.cwd(), 'public/outputs');

const session = {
  id: 'session_' + Date.now(),
  agent: process.argv[2] || 'General Agent',
  status: 'running',
  startTime: new Date().toISOString(),
  logs: [],
  artifacts: []
};

const steps = [
  { msg: "Initializing Agentic Environment...", type: "system", delay: 1000 },
  { msg: "Loading blueprint: " + session.agent, type: "system", delay: 800 },
  { msg: "Searching Google for high-intent B2B leads in SaaS...", type: "action", delay: 2000 },
  { msg: "Found 42 potential targets on LinkedIn and Twitter.", type: "system", delay: 1500 },
  { msg: "Extracting contact data for 'Founder' roles...", type: "action", delay: 2500 },
  { msg: "Writing results to CSV...", type: "action", delay: 1200 },
  { 
    msg: "SUCCESS: Lead list generated.", 
    type: "success", 
    delay: 500, 
    artifact: { name: "leads.csv", type: "csv", url: "/outputs/leads.csv" } 
  },
  { msg: "Analyzing lead quality using LLM...", type: "action", delay: 2000 },
  { 
    msg: "Generated summary report.", 
    type: "success", 
    delay: 500, 
    artifact: { name: "summary.md", type: "markdown", url: "/outputs/summary.md" } 
  },
  { msg: "Session Complete. Total Runtime: 14.5s", type: "system", delay: 500 }
];

async function run() {
  console.log(`🚀 Starting Mission Control Session: ${session.id}`);
  
  // Clear old artifacts
  if (fs.existsSync(path.join(OUTPUT_DIR, 'leads.csv'))) fs.unlinkSync(path.join(OUTPUT_DIR, 'leads.csv'));
  if (fs.existsSync(path.join(OUTPUT_DIR, 'summary.md'))) fs.unlinkSync(path.join(OUTPUT_DIR, 'summary.md'));

  for (const step of steps) {
    session.logs.push({
      timestamp: new Date().toISOString(),
      message: step.msg,
      type: step.type
    });

    if (step.artifact) {
      session.artifacts.push(step.artifact);
      // Create dummy file
      fs.writeFileSync(path.join(OUTPUT_DIR, step.artifact.name), `Generated content for ${step.artifact.name}`);
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify(session, null, 2));
    console.log(`[${step.type.toUpperCase()}] ${step.msg}`);
    
    await new Promise(resolve => setTimeout(resolve, step.delay));
  }

  session.status = 'completed';
  fs.writeFileSync(LOG_FILE, JSON.stringify(session, null, 2));
  console.log("✅ Session Logged to Mission Control.");
}

run();
