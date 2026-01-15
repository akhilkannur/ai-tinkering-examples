const fs = require('fs');
const path = require('path');

const RECIPES_DIR = path.join(process.cwd(), 'content/recipes');

function updateRecipeForCLI(filename) {
  const filePath = path.join(RECIPES_DIR, filename);
  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  const id = path.basename(filename, '.md');

  const parts = fileContent.split('---');
  if (parts.length < 3) return;

  const frontmatter = parts[1];
  let body = parts.slice(2).join('---');

  const oldBlocksRegex = /## (🚀 How to use this|⚡ Quick Start|⚡ Run this with AI)[\s\S]*?---\n/g;
  body = body.replace(oldBlocksRegex, '');

  const newHeader = '\n## ⚡ Run this with AI (Fastest)\nIf you have **Claude Code** or **Gemini CLI** open in this folder, just copy and paste:\n\n```bash\nimplement the logic in public/blueprints/' + id + '/README.md\n```\n\n**Option 2: The Manual Way**\nIf you prefer using the ChatGPT or Claude web browser, copy the strategy below.\n\n---\n';

  const finalContent = '---' + frontmatter + '---\n' + newHeader + body.trimStart();
  fs.writeFileSync(filePath, finalContent);
  console.log('CLI-Optimized: ' + filename);
}

const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
files.forEach(updateRecipeForCLI);
console.log("All recipes updated for CLI-first users.");
