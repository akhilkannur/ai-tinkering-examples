const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const recipesDir = path.join(process.cwd(), 'content/recipes');
const outputCsv = path.join(process.cwd(), 'public/500-ai-blueprints.csv');

function escapeCSV(str) {
  if (typeof str !== 'string') return '';
  // Double quotes in CSV are escaped by another double quote
  return '"' + str.replace(/"/g, '""') + '"';
}

function generateCsv() {
  const fileNames = fs.readdirSync(recipesDir);
  
  const headers = ['ID', 'Title', 'Category', 'Description', 'Time', 'Complexity', 'Tool', 'Blueprint'];
  const rows = [headers.join(',')];

  fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .forEach((fileName) => {
      const fullPath = path.join(recipesDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const row = [
        escapeCSV(data.id || fileName.replace(/\.md$/, '')),
        escapeCSV(data.title || ''),
        escapeCSV(data.category || ''),
        escapeCSV(data.description || ''),
        escapeCSV(data.time || ''),
        escapeCSV(data.complexity || ''),
        escapeCSV(data.tool || ''),
        escapeCSV(content || '')
      ];
      
      rows.push(row.join(','));
    });

  fs.writeFileSync(outputCsv, rows.join('\n'));
  console.log(`Generated CSV at ${outputCsv}`);
}

generateCsv();
