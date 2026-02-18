const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'master-skills');

// Define Master Skill Groupings
const MASTER_GROUPS = {
  'sales-ops': {
    title: 'Sales Operations & Lead Gen Master Context',
    categories: ['Sales Ops', 'Lead Gen', 'Sales Development', 'CRM Ops'],
    description: 'The complete intelligence for building automated outbound systems, lead enrichment, and CRM management.'
  },
  'marketing-ops': {
    title: 'Marketing Operations & Paid Media Master Context',
    categories: ['Marketing Ops', 'Paid Media', 'Ad Ops', 'Email Marketing', 'E-commerce'],
    description: 'Strategic workflows for multi-channel attribution, ad campaign scaling, and marketing automation.'
  },
  'seo-content': {
    title: 'SEO & Content Engineering Master Context',
    categories: ['SEO', 'Content Ops', 'Content Engineering', 'ASO'],
    description: 'Technical SEO blueprints, content cluster automation, and programmatic SEO systems.'
  },
  'revops-strategy': {
    title: 'RevOps & Strategic Growth Master Context',
    categories: ['Strategic Ops', 'RevOps', 'Analytics', 'Finance', 'Competitive Intel'],
    description: 'Data-driven growth strategies, executive reporting, and market intelligence automation.'
  },
  'automation-dev': {
    title: 'AI Automation & Developer Tools Master Context',
    categories: ['Automation', 'Dev Tools', 'Engineering', 'AI Setup'],
    description: 'Low-code automation, local AI setup, and engineering productivity blueprints.'
  }
};

async function buildMasterSkills() {
  console.log('🏗️ Starting Master Skill Consolidation...');

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
  const recipesByGroup = {};

  // 1. Group Recipes
  recipeFiles.forEach(file => {
    const raw = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const category = data.category || 'General';

    // Find which master group this belongs to
    let targetGroup = 'automation-dev'; // Default
    for (const [groupId, group] of Object.entries(MASTER_GROUPS)) {
      if (group.categories.some(c => category.toLowerCase().includes(c.toLowerCase()))) {
        targetGroup = groupId;
        break;
      }
    }

    if (!recipesByGroup[targetGroup]) recipesByGroup[targetGroup] = [];
    recipesByGroup[targetGroup].push({ data, content, file });
  });

  // 2. Generate Master Files
  for (const [groupId, group] of Object.entries(MASTER_GROUPS)) {
    const groupRecipes = recipesByGroup[groupId] || [];
    console.log(`   📦 Consolidating ${groupRecipes.length} recipes into ${groupId}.md...`);

    let masterContent = `# ${group.title}
`;
    masterContent += `> ${group.description}

`;
    
    masterContent += `## 📑 Table of Contents
`;
    groupRecipes.forEach(r => {
      const anchor = r.data.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      masterContent += `- [${r.data.title}](#${anchor})
`;
    });
    
    masterContent += `
---

`;
    masterContent += `## 🤖 Global Agent Instruction
`;
    masterContent += `You are an expert in **${group.categories.join(', ')}**. Use the blueprints below to execute high-value workflows. Each blueprint contains initialization, looping, and output phases. Prioritize clean execution and tangible file artifacts.

`;
    
    masterContent += `
---

`;

    groupRecipes.forEach(r => {
      masterContent += `## ${r.data.title}
`;
      masterContent += `**Category:** ${r.data.category} | **Archetype:** ${r.data.archetype}
`;
      masterContent += `**Tagline:** ${r.data.tagline}

`;
      masterContent += `${r.content}

`;
      masterContent += `--- 

`;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, `${groupId}.md`), masterContent);
  }

  console.log('✅ Master Skill Consolidation complete!');
}

buildMasterSkills();
