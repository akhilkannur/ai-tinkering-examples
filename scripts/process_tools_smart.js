const fs = require('fs');

function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (char === '"') {
            if (inQuotes && nextChar === '"') { currentCell += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell); currentCell = '';
        } else if (char === '\n' && !inQuotes) {
            currentRow.push(currentCell); rows.push(currentRow); currentRow = []; currentCell = '';
        } else if (char === '\r' && !inQuotes) { } 
        else { currentCell += char; }
    }
    if (currentCell || currentRow.length) { currentRow.push(currentCell); rows.push(currentRow); }
    return rows;
}

const csvContent = fs.readFileSync('tools_submissions.csv', 'utf8');
const rows = parseCSV(csvContent);
const toolsMap = new Map();
const cutoffDate = new Date(2025, 11, 1);

function inferCategory(text) {
    const t = text.toLowerCase();
    if (t.includes('video') || t.includes('audio') || t.includes('music') || t.includes('speech')) return 'Video & Audio';
    if (t.includes('image') || t.includes('photo') || t.includes('design') || t.includes('logo') || t.includes('art')) return 'Image Generation';
    if (t.includes('write') || t.includes('copy') || t.includes('blog') || t.includes('email') || t.includes('text')) return 'Copywriting';
    if (t.includes('code') || t.includes('dev') || t.includes('api') || t.includes('sql') || t.includes('website')) return 'Code Assistance';
    if (t.includes('seo') || t.includes('marketing') || t.includes('social') || t.includes('ad ')) return 'Marketing';
    return 'Productivity';
}

function inferTags(text, cat) {
    const tags = ['Business'];
    const t = text.toLowerCase();
    
    if (t.includes('free') && !t.includes('trial')) tags.push('Free');
    if (t.includes('api') || t.includes('code')) tags.push('Advanced');
    else tags.push('Beginner');

    return {
        useCase: ['Business'],
        price: t.includes('free') ? 'Free' : 'Freemium',
        skill: (t.includes('api') || t.includes('developer')) ? 'Intermediate' : 'Beginner'
    };
}

rows.slice(1).forEach(cols => {
    const dateStr = cols[0];
    const name = cols[2];
    const desc = cols[4];
    const url = cols[6];

    if (!dateStr || !name || !url) return;

    const [datePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    const rowDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    if (rowDate >= cutoffDate) {
        const key = name.trim().toLowerCase() + '|' + url.trim().toLowerCase();
        toolsMap.set(key, { name: name.trim(), description: desc ? desc.trim() : '', url: url.trim() });
    }
});

const newTools = Array.from(toolsMap.values()).map(t => {
    const category = inferCategory(t.description + ' ' + t.name);
    const tags = inferTags(t.description, category);
    
    let domain = '';
    try {
        domain = new URL(t.url).hostname;
    } catch (e) {
        domain = 'example.com';
    }
    const image = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    return {
        name: t.name,
        description: t.description.length > 120 ? t.description.substring(0, 120) + '...' : t.description,
        url: t.url,
        category: category,
        tags: tags,
        image: image
    };
});

console.log(JSON.stringify(newTools, null, 2));
