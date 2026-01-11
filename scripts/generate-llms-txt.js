require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://realaiexamples.com';
const RECIPES_DIR = path.join(process.cwd(), 'content', 'recipes');
const OUTPUT_DIR = path.join(process.cwd(), 'public');

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const EXAMPLES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples';
const CATEGORIES_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CATEGORIES_TABLE || 'Categories';

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('❌ Missing Airtable configuration. Skipping llms.txt generation.');
  process.exit(0); // Don't fail build, just skip
}

// Helper for Airtable requests
function fetchAirtable(tableName, view = '') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}${view ? '?view=' + encodeURIComponent(view) : ''}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
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
            reject(e);
          }
        } else {
          reject(new Error(`Airtable API Error: ${res.statusCode} ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

// Helper to read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

async function generateLlmsTxt() {
  console.log('🤖 Starting llms.txt generation...');

  try {
    // 1. Fetch Categories
    console.log('   Fetching categories...');
    const categoriesRaw = await fetchAirtable(CATEGORIES_TABLE);
    const categoryMap = {};
    categoriesRaw.forEach(r => {
      if (r.fields.Name) {
        categoryMap[r.id] = r.fields.Name;
      }
    });

    // 2. Fetch Examples
    console.log('   Fetching examples...');
    const examplesRaw = await fetchAirtable(EXAMPLES_TABLE);
    const examples = examplesRaw
      .filter(r => r.fields.Published)
      .map(r => {
        const title = r.fields.Title;
        const slug = r.fields.Slug || title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        let categoryName = 'uncategorized';
        if (r.fields.Category && r.fields.Category.length > 0) {
          const catId = r.fields.Category[0];
          if (categoryMap[catId]) {
            categoryName = categoryMap[catId].toLowerCase().replace(/\s+/g, '-');
          }
        }
        return {
          title,
          url: `${SITE_URL}/ai-examples/${categoryName}/${slug}`,
          summary: r.fields.Summary || '',
          category: categoryName
        };
      });

    // 3. Get Recipes
    console.log('   Reading recipe files...');
    const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
    const recipes = recipeFiles.map(file => {
      const id = file.replace('.md', '');
      const content = readFile(path.join(RECIPES_DIR, file));
      
      // Simple extraction of Title from MD frontmatter or first line
      let title = id;
      const titleMatch = content.match(/title:\s*"(.*)"/) || content.match(/^#\s+(.*)/);
      if (titleMatch) title = titleMatch[1];

      return {
        title,
        id,
        url: `${SITE_URL}/blueprints/${id}`,
        content // We'll use full content for llms-full.txt
      };
    });

    // --- Generate llms.txt (The Index) ---
    let llmsTxt = `# AI Tinkering Examples (LLM Index)
> Actionable AI workflows and blueprints for non-technical tinkerers.

## Core Sections
- [Home](${SITE_URL})
- [Blueprints (Cookbook)](${SITE_URL}/blueprints) - Detailed step-by-step AI agent recipes
- [AI Examples](${SITE_URL}/ai-examples) - Real-world AI use cases
- [Tools](${SITE_URL}/tools) - Curated AI tools

## Agent Blueprints (High Value)
`;

    recipes.forEach(r => {
      llmsTxt += `- [${r.title}](${r.url})
`;
    });

    llmsTxt += `
## AI Examples (Case Studies)
`;
    examples.forEach(e => {
      llmsTxt += `- [${e.title}](${e.url}): ${e.summary.slice(0, 100)}${e.summary.length > 100 ? '...' : ''}
`;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'llms.txt'), llmsTxt);
    console.log(`✅ Generated public/llms.txt`);


    // --- Generate llms-full.txt (The Content) ---
    /* 
       This file contains the ACTUAL full text content of blueprints. 
       This is incredibly valuable for an agent to "read" the whole site in one request.
    */
    let llmsFullTxt = `# AI Tinkering Examples - Full Content Dump\n\n`;

    recipes.forEach(r => {
      llmsFullTxt += `## Blueprint: ${r.title}\n`;
      llmsFullTxt += `Source: ${r.url}\n\n`;
      llmsFullTxt += `${r.content}\n\n`;
      llmsFullTxt += `---\n\n`;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'llms-full.txt'), llmsFullTxt);
    console.log(`✅ Generated public/llms-full.txt`);

  } catch (error) {
    console.error('❌ Error generating llms.txt:', error);
    // Don't exit 1, just log error so build continues
  }
}

generateLlmsTxt();
