const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = path.join(process.cwd(), 'content/recipes');
const OUTPUT_FILE = path.join(process.cwd(), 'public/cookbook-full.json');

async function generateCookbook() {
  const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
  const recipes = [];

  console.log(`👨‍🍳 Processing ${files.length} recipes...`);

  for (const file of files) {
    const content = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf8');
    const { data, content: markdownBody } = matter(content);

    // Extract the "Workflow" or "Instructions" section
    // We look for the text after "## Workflow" or "## Instructions"
    const workflowMatch = markdownBody.match(/## (Workflow|Instructions)([\s\S]*?)(##|$)/i);
    let workflow = workflowMatch ? workflowMatch[2].trim() : "";

    // If no explicit workflow section, take the whole body but strip headers
    if (!workflow) {
      workflow = markdownBody.replace(/# .+/g, '').trim();
    }

    // Compress workflow: Remove empty lines, reduce spaces
    workflow = workflow.replace(/\n\s*\n/g, '\n').substring(0, 2000); // Cap at 2000 chars to save tokens

    recipes.push({
      id: data.id || file.replace('.md', ''),
      title: data.title,
      category: data.category,
      tagline: data.tagline,
      // "Trigger" is key for Agents to know WHEN to use this
      trigger: `User wants to ${data.description || data.tagline}`,
      steps: workflow
    });
  }

  // Sort by category then title
  recipes.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

  // 1. Save Master File
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(recipes, null, 2));
  console.log(`✅ Generated Master Cookbook: ${OUTPUT_FILE} (${recipes.length} recipes)`);

  // 2. Save Niche Files
  const contextDir = path.join(process.cwd(), 'public/context');
  if (!fs.existsSync(contextDir)) fs.mkdirSync(contextDir, { recursive: true });

  const categories = [...new Set(recipes.map(r => r.category))];
  
  categories.forEach(cat => {
    const nicheRecipes = recipes.filter(r => r.category === cat);
    const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = path.join(contextDir, `cookbook-${slug}.json`);
    
    fs.writeFileSync(filename, JSON.stringify(nicheRecipes, null, 2));
    console.log(`   └─ Generated ${filename} (${nicheRecipes.length} recipes)`);
  });
}

generateCookbook();
