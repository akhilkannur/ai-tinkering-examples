const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SOURCE_DIR = path.join(process.cwd(), 'content', 'recipes');
const DEST_DIR = path.join(process.cwd(), 'marketing-agent-blueprints');
const PROMPTS_DEST = path.join(DEST_DIR, 'prompts');
const TOOLS_DEST = path.join(DEST_DIR, 'tools');

// Clean start
if (fs.existsSync(DEST_DIR)) {
  fs.rmSync(DEST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEST_DIR);
fs.mkdirSync(PROMPTS_DEST);
fs.mkdirSync(TOOLS_DEST);

// --- SELECTION LOGIC ---
// We want "No Slop". 
// 1. Must be a "Processor" or "Researcher" (implies active work).
// 2. Or be one of our manually flagged "High Value" tools.
const HIGH_VALUE_TOOLS = ['screenshot-automation', 'sitemap-generator', 'llms-txt-generator'];

const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.md'));
let addedCount = 0;
const categories = {};

console.log('🔍 Analyzing 200+ recipes for quality...');

files.forEach(file => {
  const content = fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8');
  const { data, content: body } = matter(content);
  const id = data.id || file.replace('.md', '');

  // 1. Handle "Tools" (Code-based)
  if (HIGH_VALUE_TOOLS.includes(id)) {
    // Create a dedicated folder for the tool
    const toolDir = path.join(TOOLS_DEST, id);
    fs.mkdirSync(toolDir);
    
    // Copy the README (blueprint)
    fs.writeFileSync(path.join(toolDir, 'README.md'), content);
    
    // Create a mock package.json to make it look "real" 
    const pkgJson = {
      name: id,
      version: "1.0.0",
      description: data.description,
      scripts: { "start": "node index.js" }
    };
    fs.writeFileSync(path.join(toolDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
    
    // Create a placeholder index.js
    const indexJs = `// ${data.title}
// Run this script to execute the logic.
console.log("See README.md for the AI prompt to generate this script.");
`;
    fs.writeFileSync(path.join(toolDir, 'index.js'), indexJs);
    
    return; // Done with tool
  }

  // 2. Handle "Prompts" (Text-based)
  // Filter for Quality: Must be Processor/Researcher OR explicitly "Intermediate/Advanced"
  // Skip "Beginner" unless it's a Researcher/Processor
  const isActionable = data.archetype === 'Processor' || data.archetype === 'Researcher';
  const isComplex = data.difficulty === 'Intermediate' || data.difficulty === 'Advanced';
  
  if (isActionable || isComplex) {
    const cat = data.category || 'General';
    const catDir = path.join(PROMPTS_DEST, cat.toLowerCase().replace(/\s+/g, '-'));
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir);

    // Write the prompt file
    fs.writeFileSync(path.join(catDir, file), content);

    // Track for README
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ title: data.title, file: `${cat.toLowerCase().replace(/\s+/g, '-')}/${file}`, desc: data.description });
    addedCount++;
  }
});

// --- GENERATE README ---
console.log(`✨ Selected ${addedCount} high-quality prompts + 3 tools.`);

let readme = `# Marketing Agent Blueprints 🤖

A curated collection of **System Prompts** and **MCP Tools** for building autonomous marketing agents.
Unlike generic prompt lists, these are **actionable blueprints** (Processors & Researchers) that take inputs and produce concrete outputs.

## 🛠️ The Tools (Code-First)
These are complete automation scripts you can run locally.

| Tool | Description |
|------|-------------|
| **[Screenshot Automation](./tools/screenshot-automation)** | Capture & beautify screenshots programmatically (Puppeteer). |
| **[Sitemap Generator](./tools/sitemap-generator)** | Build high-coverage XML sitemaps for 10k+ pages. |
| **[LLMS.txt Generator](./tools/llms-txt-generator)** | Create context files for AI agents to read your site. |

## 🧠 The Brains (System Prompts)
High-leverage prompts to copy-paste into Claude/GPT-4.

`;

Object.keys(categories).sort().forEach(cat => {
  readme += `### ${cat}\n`;
  categories[cat].forEach(p => {
    readme += `- [${p.title}](./prompts/${p.file}) - ${p.desc}\n`;
  });
  readme += `\n`;
});

readme += `
## How to Use
1. **For Tools:** Navigate to the folder and follow the README instructions to generate the script.
2. **For Prompts:** Copy the prompt content into your AI's "System Instructions" or "Project Knowledge".

## License
MIT
`;

fs.writeFileSync(path.join(DEST_DIR, 'README.md'), readme);
console.log(`✅ Export complete: ./marketing-agent-blueprints`);
