const fs = require('fs');

const content = fs.readFileSync('lib/ai-tools-data.ts', 'utf8');

// Match the array content
const arrayMatch = content.match(/export const aiTools: AiTool\[\] = (\[[\s\S]*\]);/);
if (!arrayMatch) {
    console.error("Could not find aiTools array");
    process.exit(1);
}

// A simple parser for the objects in the array
const objects = [];
let currentObject = null;
let depth = 0;
let start = arrayMatch.index + arrayMatch[0].indexOf('[');

// We'll use a more surgical approach
const tools = [];
const objectRegex = /\{[\s\S]*?name: "([^"]+)"[\s\S]*?url: "([^"]+)"[\s\S]*?screenshot: "(https:\/\/api\.microlink\.io[^"]+)"[\s\S]*?\}/g;

let match;
while ((match = objectRegex.exec(content)) !== null) {
    // Check if the name and screenshot are in the same block (approximate)
    const block = match[0];
    if (block.includes('name: "' + match[1] + '"') && block.includes('screenshot: "' + match[3] + '"')) {
        tools.push({
            name: match[1],
            url: match[2],
            screenshot: match[3]
        });
    }
}

console.log(JSON.stringify(tools, null, 2));
