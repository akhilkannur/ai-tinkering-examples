const captureScreenshot = require('./capture-screenshot');
const fs = require('fs');
const path = require('path');

async function runBatch() {
    const tools = JSON.parse(fs.readFileSync('microlink_tools.json', 'utf8'));
    console.log(`🚀 Starting batch capture for ${tools.length} tools...`);
    
    for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        const slug = tool.name.toLowerCase().trim()
            .replace(/\./g, '-')
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
        
        const filename = `${slug}.webp`;
        const outputPath = path.join(process.cwd(), 'public', 'screenshots', filename);
        
        // Skip if already exists
        if (fs.existsSync(outputPath)) {
            console.log(`⏩ Skipping ${tool.name} (already exists)`);
            continue;
        }
        
        console.log(`[${i+1}/${tools.length}] Capturing ${tool.name}...`);
        try {
            await captureScreenshot(tool.url, filename);
        } catch (e) {
            console.error(`❌ Failed ${tool.name}: ${e.message}`);
        }
        
        // Brief pause between captures
        await new Promise(r => setTimeout(r, 2000));
    }
    
    console.log('✅ Batch capture complete!');
}

runBatch();
