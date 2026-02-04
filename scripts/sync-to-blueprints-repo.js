const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = path.join(__dirname, '../content/recipes');
const TARGET_REPO_DIR = path.join(__dirname, '../marketing-agent-blueprints');
const TARGET_SKILLS_DIR = path.join(TARGET_REPO_DIR, 'skills');

// 1. Clean target repo (keeping .git and README.md)
console.log('🧹 Cleaning target repository skills...');
const itemsToKeep = ['.git', 'README.md', 'plugin.json'];
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

    // Extract logic
    let skillLogic = '';
    if (body.includes('# Prompt')) {
        skillLogic = body.split('# Prompt')[1].trim();
    } else if (body.includes('## Workflow')) {
        skillLogic = body.split('## Workflow')[1].trim();
    } else {
        skillLogic = body.trim();
    }

    // Enhance logic structure for both Claude and Gemini
    const enhancedLogic = `
## Core Instructions
You are a highly specialized AI agent focusing on ${data.category || 'Marketing'}. Your mission is:
${data.description}

## Implementation Workflow
${skillLogic}

---
*Blueprint ID: ${data.id}*
*Source: [Real AI Examples](https://realaiexamples.com)*
`;

    // Sanitized description - avoid complex regex in literal
    let cleanDesc = data.description.split('\n').join(' ');
    cleanDesc = cleanDesc.split('"').join("'");

    const skillMd = `--- 
name: ${skillName}
description: "${cleanDesc}"
version: 1.0.0
category: ${data.category || 'Marketing'}
---

# ${data.title}

${enhancedLogic}
`;

    fs.writeFileSync(path.join(skillFolderPath, 'SKILL.md'), skillMd);
});

console.log(`✨ Successfully synced ${freeCount} free high-quality skills to ${TARGET_REPO_DIR}`);
