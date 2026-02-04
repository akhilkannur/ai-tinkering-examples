require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const matter = require('gray-matter');

const SITE_URL = 'https://realaiexamples.com';
const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');
const OUTPUT_DIR = path.join(process.cwd(), 'public');

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const EXAMPLES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples';
const CATEGORIES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CATEGORIES_TABLE || 'Categories';

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.warn('⚠️ Missing Airtable configuration. Skipping Case Studies, but proceeding with Recipes.');
}

function fetchAirtable(tableName, view = '') {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return Promise.resolve([]);
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}${view ? '?view=' + encodeURIComponent(view) : ''}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.records || []);
          } catch (e) {
            resolve([]);
          }
        } else {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.on('timeout', () => { req.destroy(); resolve([]); });
    req.end();
  });
}

async function generateLlmsTxt() {
  console.log('🤖 Starting multi-file llms.txt generation...');

  try {
    const categoriesRaw = await fetchAirtable(CATEGORIES_TABLE);
    const categoryMap = {};
    categoriesRaw.forEach(r => { if (r.fields.Name) categoryMap[r.id] = r.fields.Name; });

    const examplesRaw = await fetchAirtable(EXAMPLES_TABLE);
    const examples = examplesRaw
      .filter(r => r.fields.Published)
      .map(r => {
        const title = r.fields.Title;
        const slug = r.fields.Slug || title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        let categoryName = 'uncategorized';
        if (r.fields.Category?.[0] && categoryMap[r.fields.Category[0]]) {
          categoryName = categoryMap[r.fields.Category[0]].toLowerCase().replace(/\s+/g, '-');
        }
        return { title, url: `${SITE_URL}/ai-examples/${categoryName}/${slug}`, summary: r.fields.Summary || '', category: categoryName };
      });

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
        url: `${SITE_URL}/skills/${file.replace('.md', '')}`,
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
- [All Blueprints](${SITE_URL}/blueprints)
- [Case Studies](${SITE_URL}/ai-examples)

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