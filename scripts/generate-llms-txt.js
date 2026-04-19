const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://realaiexamples.com';
const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');
const OUTPUT_DIR = path.join(process.cwd(), 'public');

function generateLlmsTxt() {
  console.log('🤖 Starting multi-file llms.txt generation...');

  try {
    console.log('   Grouping recipes by niche...');
    const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
    const recipesByCategory = {};
    const allRecipes = [];

    recipeFiles.forEach(file => {
      const filePath = path.join(RECIPES_DIR, file);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(rawContent);
      
      const recipe = {
        title: data.title || file.replace('.md', ''),
        id: file.replace('.md', ''),
        url: `${SITE_URL}/tools/${file.replace('.md', '')}`,
        category: data.category || 'General',
        tagline: data.tagline || '',
        content: rawContent
      };

      allRecipes.push(recipe);
      
      const normalizedCat = recipe.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (!recipesByCategory[normalizedCat]) recipesByCategory[normalizedCat] = [];
      recipesByCategory[normalizedCat].push(recipe);
    });

    // 1. Generate Main llms.txt (Index of Niche Files)
    let mainLlms = `# RealAIExamples LLM Index
> Actionable AI workflows for Sales, Marketing, and RevOps.

## Niche-Specific Indices (Recommended for Context)
${Object.keys(recipesByCategory).map(cat => `- [llms-${cat}.txt](${SITE_URL}/llms-${cat}.txt) - ${recipesByCategory[cat].length} recipes`).join('\n')}

## Core Sections
- [Home](${SITE_URL})
- [Tools Library](${SITE_URL}/tools)
- [Example Drops](${SITE_URL})

## Top Recipes
${allRecipes.slice(0, 50).map(r => `- [${r.title}](${r.url}): ${r.tagline}`).join('\n')}
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'llms.txt'), mainLlms);
    console.log('✅ Generated public/llms.txt');

    // 2. Generate Niche Files (llms-sales.txt, etc.)
    for (const cat in recipesByCategory) {
      const catRecipes = recipesByCategory[cat];
      let catContent = `# Blueprints: ${catRecipes[0].category}\n\n`;
      
      catRecipes.forEach(r => {
        catContent += `## ${r.title}\n`;
        catContent += `URL: ${r.url}\n`;
        catContent += `Description: ${r.tagline}\n\n`;
        catContent += `${r.content}\n\n`;
        catContent += `---\n\n`;
      });

      fs.writeFileSync(path.join(OUTPUT_DIR, `llms-${cat}.txt`), catContent);
      console.log(`✅ Generated public/llms-${cat}.txt (${catRecipes.length} recipes)`);
    }

    // 3. Keep llms-full.txt for backward compatibility
    let llmsFullTxt = `# All Blueprints Content Dump\n\n`;
    allRecipes.forEach(r => {
      llmsFullTxt += `## ${r.title}\n${r.content}\n\n---\n\n`;
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'llms-full.txt'), llmsFullTxt);
    console.log('✅ Generated public/llms-full.txt');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateLlmsTxt();
