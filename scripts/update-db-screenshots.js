const fs = require('fs');

const dataPath = 'lib/ai-tools-data.ts';
let content = fs.readFileSync(dataPath, 'utf8');

const tools = JSON.parse(fs.readFileSync('microlink_tools.json', 'utf8'));
let updatedCount = 0;

for (const tool of tools) {
    const slug = tool.name.toLowerCase().trim()
        .replace(/\./g, '-')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    
    const screenshotPath = `/screenshots/${slug}.webp`;
    const localFile = `public/screenshots/${slug}.webp`;
    
    // Only update if the local file exists (was successfully captured)
    if (fs.existsSync(localFile)) {
        // Use a more specific replacement to avoid accidental matches
        // We look for the screenshot field specifically after the tool name and url
        // This is tricky with simple regex over the whole file, but let's try a targeted replace
        
        // Find the block for this tool
        const escapedName = tool.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const toolRegex = new RegExp(`name: "${escapedName}"[\\s\\S]*?screenshot: "https:\\/\\/api\\.microlink\\.io[^"]+"`, 'g');
        
        if (toolRegex.test(content)) {
            content = content.replace(toolRegex, (match) => {
                return match.replace(/screenshot: "https:\/\/api\.microlink\.io[^"]+"/, `screenshot: "${screenshotPath}"`);
            });
            updatedCount++;
        }
    }
}

fs.writeFileSync(dataPath, content);
console.log(`✅ Updated ${updatedCount} tools in ${dataPath}`);
