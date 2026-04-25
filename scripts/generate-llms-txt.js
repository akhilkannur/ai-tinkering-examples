const fs = require('fs');
const path = require('path');

// Helper to slugify tool names (matches pages/tools/[slug].tsx logic)
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

const SITE_URL = 'https://realaiexamples.com';
const OUTPUT_DIR = path.join(process.cwd(), 'public');

// Load Data
const { aiTools } = require('../lib/ai-tools-data.ts');
const { localSocialExamples } = require('../lib/social-examples-data.ts');

function generateLlmsTxt() {
  console.log('🤖 Starting llms.txt generation for Tools and Examples...');

  try {
    // 1. Generate Main llms.txt
    let mainLlms = `# RealAIExamples LLM Index
> How People Actually Use AI at Work. A curated library of real-world AI proof and tools.

## Core Sections
- [Home](${SITE_URL})
- [Tools Directory](${SITE_URL}/tools) - 400+ curated AI tools for operators.
- [AI Examples](${SITE_URL}/ai-examples) - Visual swipe file of real-world AI usage.

## Top AI Tools (Programmatic)
${aiTools.slice(0, 100).map(t => `- [${t.name}](${SITE_URL}/tools/${slugify(t.name)}): ${t.description}`).join('\n')}

## Recent Real-World Examples
${localSocialExamples.slice(0, 50).map(ex => `- [${ex.title}](${SITE_URL}/ai-examples/${(ex.category || 'uncategorized').toLowerCase().replace(/\s+/g, '-')}/${ex.slug}): ${ex.summary}`).join('\n')}
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'llms.txt'), mainLlms);
    console.log('✅ Generated public/llms.txt');

    // 2. Generate llms-full.txt (All Tools + Examples)
    let fullContent = `# RealAIExamples Full Content Dump\n\n`;
    
    fullContent += `## TOOLS DIRECTORY (${aiTools.length} tools)\n\n`;
    aiTools.forEach(t => {
      fullContent += `### ${t.name}\n`;
      fullContent += `URL: ${SITE_URL}/tools/${slugify(t.name)}\n`;
      fullContent += `Category: ${t.category}\n`;
      fullContent += `Tags: ${t.tags.useCase.join(', ')} | ${t.tags.price} | ${t.tags.skill}\n`;
      fullContent += `Description: ${t.description}\n\n`;
    });

    fullContent += `\n---\n\n## REAL-WORLD AI EXAMPLES (${localSocialExamples.length} examples)\n\n`;
    localSocialExamples.forEach(ex => {
      fullContent += `### ${ex.title}\n`;
      fullContent += `URL: ${SITE_URL}/ai-examples/${(ex.category || 'uncategorized').toLowerCase().replace(/\s+/g, '-')}/${ex.slug}\n`;
      fullContent += `Category: ${ex.category}\n`;
      fullContent += `Summary: ${ex.summary}\n`;
      if (ex.tags) fullContent += `Tags: ${ex.tags.join(', ')}\n`;
      if (ex.original_link) fullContent += `Source: ${ex.original_link}\n`;
      fullContent += `\n`;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'llms-full.txt'), fullContent);
    console.log('✅ Generated public/llms-full.txt');

    // 3. Clean up legacy niche files if they exist
    const files = fs.readdirSync(OUTPUT_DIR);
    files.forEach(file => {
      if (file.startsWith('llms-') && file !== 'llms-full.txt') {
        fs.unlinkSync(path.join(OUTPUT_DIR, file));
        console.log(`🗑️ Deleted legacy niche file: ${file}`);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run generation
generateLlmsTxt();
