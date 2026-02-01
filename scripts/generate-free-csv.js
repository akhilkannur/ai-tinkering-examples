const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const recipesDir = path.join(process.cwd(), 'content/recipes');
const outputCsv = path.join(process.cwd(), 'public/ai-blueprints-starter.csv');

function escapeCSV(str) {
  if (typeof str !== 'string') return '';
  return '"' + str.replace(/"/g, '""') + '"';
}

function generateFreeCsv() {
  const fileNames = fs.readdirSync(recipesDir);
  
  // Take top 50 recipes (alphabetical or just first 50 found)
  // In a real scenario, you might want to manually curate "best_of"
  const selectedFiles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .slice(0, 50);

  const headers = ['ID', 'Title', 'Category', 'Description', 'Complexity', 'Tool', 'Blueprint'];
  const rows = [headers.join(',')];

  selectedFiles.forEach((fileName) => {
      const fullPath = path.join(recipesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const row = [
        escapeCSV(data.id || fileName.replace(/\.md$/, '')),
        escapeCSV(data.title || ''),
        escapeCSV(data.category || ''),
        escapeCSV(data.description || ''),
        escapeCSV(data.complexity || ''),
        escapeCSV(data.tool || ''),
        escapeCSV(content || '')
      ];
      
      rows.push(row.join(','));
    });

  fs.writeFileSync(outputCsv, rows.join('\n'));
  console.log(`Generated Free CSV at ${outputCsv} with ${selectedFiles.length} recipes.`);
}

generateFreeCsv();
