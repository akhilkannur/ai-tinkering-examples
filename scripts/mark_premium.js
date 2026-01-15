
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = 'content/recipes';
const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md')).sort();

// We want to keep exactly 50 recipes free.
// The rest should have isPremium: true in frontmatter.

files.forEach((file, index) => {
    const filePath = path.join(RECIPES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    const isFree = index < 50;
    
    if (isFree && data.isPremium) {
        delete data.isPremium;
        const newContent = matter.stringify(body, data);
        fs.writeFileSync(filePath, newContent);
        console.log(`Unmarked as Premium: ${file}`);
    } else if (!isFree && !data.isPremium) {
        data.isPremium = true;
        const newContent = matter.stringify(body, data);
        fs.writeFileSync(filePath, newContent);
        console.log(`Marked as Premium: ${file}`);
    }
});
