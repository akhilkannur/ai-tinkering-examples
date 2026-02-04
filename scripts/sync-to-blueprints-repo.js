const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = path.join(__dirname, '../content/recipes');
const TARGET_REPO_DIR = path.join(__dirname, '../marketing-agent-blueprints');
const TARGET_SKILLS_DIR = path.join(TARGET_REPO_DIR, 'skills');

// 1. Clean target repo (keeping .git and README.md for now)
console.log('🧹 Cleaning target repository...');
const itemsToKeep = ['.git', 'README.md'];
const items = fs.readdirSync(TARGET_REPO_DIR);
items.forEach(item => {
    if (!itemsToKeep.includes(item)) {
        const itemPath = path.join(TARGET_REPO_DIR, item);
        fs.rmSync(itemPath, { recursive: true, force: true });
    }
});

if (!fs.existsSync(TARGET_SKILLS_DIR)) fs.mkdirSync(TARGET_SKILLS_DIR, { recursive: true });

// 2. Read and Filter recipes
const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
console.log(`🔍 Found ${recipeFiles.length} blueprints. Filtering free ones...`);

let freeCount = 0;

recipeFiles.forEach(file => {
    const filePath = path.join(RECIPES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    // Skip premium
    if (data.isPremium === true) return;
    if (!data.id || !data.description) return;

    freeCount++;
    const skillName = data.id;
    const skillFolderPath = path.join(TARGET_SKILLS_DIR, skillName);
    if (!fs.existsSync(skillFolderPath)) fs.mkdirSync(skillFolderPath, { recursive: true });

    // Extract logic (following skill-factory.js logic)
    let skillLogic = '';
    if (body.includes('# Prompt')) {
        skillLogic = body.split('# Prompt')[1].trim();
    } else if (body.includes('## Workflow')) {
        skillLogic = body.split('## Workflow')[1].trim();
    } else {
        skillLogic = body.trim();
    }

    const skillMd = `--- 
name: ${skillName}
description: ${data.description.replace(/\n/g, ' ')}
---

# ${data.title}

${skillLogic}
`;

    fs.writeFileSync(path.join(skillFolderPath, 'SKILL.md'), skillMd);
});

// 3. Update README.md
const newReadme = `# Marketing Agent Blueprints (Gemini CLI Skills)

This repository contains a library of agent-ready AI workflows for Sales, Marketing, and Ops, formatted as **Gemini CLI Skills**.

## Installation

To install any of these blueprints as a skill in your Gemini CLI, use the following command:

\`\`\`bash
gemini skills install https://github.com/akhilkannur/marketing-agent-blueprints --path skills/<blueprint-id>
\`\`\`

Replace \`<blueprint-id>\` with the name of the folder in the \`skills/\` directory.

### Example:
To install the **Agent Context Builder**:
\`\`\`bash
gemini skills install https://github.com/akhilkannur/marketing-agent-blueprints --path skills/agent-context-builder
\`\`\`

## Available Blueprints
Currently, there are **${freeCount}** free blueprints available in this repository.

Browse the full list at [Real AI Examples](https://realaiexamples.com).
`;

fs.writeFileSync(path.join(TARGET_REPO_DIR, 'README.md'), newReadme);

console.log(`✨ Successfully synced ${freeCount} free skills to ${TARGET_REPO_DIR}`);
