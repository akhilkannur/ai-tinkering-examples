const fs = require('fs');
const content = fs.readFileSync('./lib/ai-tools-data.ts', 'utf8');
// Extract the array content using regex since it is a large constant
const match = content.match(/export const aiTools: AiTool\[\] = (\[[\s\S]*?\]);/);
if (match) {
    const toolsStr = match[1]
        .replace(/AiTool\[\]/g, '') // Remove TS types
        .replace(/tags: { price: "(.*?)" }/g, 'tags: { price: "$1" }'); // Ensure valid JS object
    
    // Evaluation in a controlled way to get the array
    const aiTools = eval(toolsStr);
    const integrations = aiTools.flatMap(t => t.integrations || []);
    const counts = {};
    integrations.forEach(i => counts[i] = (counts[i] || 0) + 1);
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    console.log(JSON.stringify(sorted, null, 2));
} else {
    console.log("Could not find aiTools array");
}
