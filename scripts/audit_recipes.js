const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = path.join(__dirname, '../content/recipes');
const OUTPUT_FILE = path.join(__dirname, '../docs/FULL_AUDIT_REPORT.md');

// Signals that a recipe might be "Slop" (Too simple/generic)
const SLOP_SIGNALS = [
  { name: 'Calculator', pattern: /Calculator/i },
  { name: 'Generator', pattern: /Generator/i },
  { name: 'Checklist', pattern: /Checklist/i },
  { name: 'Counter', pattern: /Counter/i },
  { name: 'Tracker', pattern: /Tracker/i },
  { name: 'Template', pattern: /Template/i },
  { name: 'Estimator', pattern: /Estimator/i },
];

// Signals that a recipe is "High Quality" (Agentic/Hybrid)
const QUALITY_SIGNALS = [
  { name: 'Web Fetch', pattern: /web_fetch/i },
  { name: 'Scrape', pattern: /scrape/i },
  { name: 'Research', pattern: /research/i },
  { name: 'Compare', pattern: /compare/i },
  { name: 'Analyze', pattern: /analyze/i },
  { name: 'Hybrid', pattern: /Hybrid/i }, // Archetype check
];

function auditRecipes() {
  const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
  let slopCount = 0;
  let strongCount = 0;
  let auditLog = `# Full Recipe Audit Report\n\nGenerated on: ${new Date().toLocaleDateString()}\n\n`;

  const results = [];

  files.forEach(file => {
    const content = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf8');
    const { data, content: body } = matter(content);
    
    let slopScore = 0;
    let qualityScore = 0;
    let signals = [];

    // Check Title for Slop Signals
    SLOP_SIGNALS.forEach(sig => {
      if (data.title && sig.pattern.test(data.title)) {
        slopScore++;
        signals.push(`🔴 Title: ${sig.name}`);
      }
    });

    // Check Body for Quality Signals
    QUALITY_SIGNALS.forEach(sig => {
      if (body && sig.pattern.test(body) || (data.archetype && sig.pattern.test(data.archetype))) {
        qualityScore++;
        signals.push(`🟢 Tech: ${sig.name}`);
      }
    });

    // Verdict Logic
    let status = 'neutral';
    if (qualityScore >= 1) {
      status = 'strong';
      strongCount++;
    } else if (slopScore >= 1) {
      status = 'weak';
      slopCount++;
    }

    results.push({ file, title: data.title, status, signals, category: data.category });
  });

  // Sort: Weak first
  results.sort((a, b) => (a.status === 'weak' ? -1 : 1));

  auditLog += `## Summary\n`;
  auditLog += `- **Total Recipes:** ${files.length}\n`;
  auditLog += `- **🔴 Likely Slop (Needs Upgrade):** ${slopCount}\n`;
  auditLog += `- **🟢 Likely Strong (Has Research/Logic):** ${strongCount}\n`;
  auditLog += `- **⚪ Neutral:** ${files.length - slopCount - strongCount}\n\n`;

  auditLog += `## Priority Upgrade List (Top 50 Candidates)\n`;
  auditLog += `| File | Title | Issues |\n|---|---|---|\n`;

  results.filter(r => r.status === 'weak').slice(0, 50).forEach(r => {
    auditLog += `| \`${r.file}\` | ${r.title} | ${r.signals.filter(s => s.startsWith('🔴')).join(', ')} |\n`;
  });

  fs.writeFileSync(OUTPUT_FILE, auditLog);
  console.log(`Audit complete. Report saved to ${OUTPUT_FILE}`);
}

auditRecipes();
