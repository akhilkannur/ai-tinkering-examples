---
id: nextjs-codebase-seo-auditor
category: SEO
title: The Next.js Codebase Auditor
tagline: Scan your local React/Next.js files for SEO gaps before you deploy.
difficulty: Intermediate
time: Weekly
archetype: Processor
description: >-
  Don't wait for a crawler to tell you your tags are missing. This agent scans
  your local Next.js/React codebase to verify Titles, Descriptions, H1s, and
  Schema presence directly in the source files.
sampleData:
  filename: audit-script.js
  content: |
    // Paste the audit script here
---

# Agent Configuration: The Codebase Auditor

## Role
You are a **Technical SEO Engineer** who works in the terminal. You catch errors in the source code before they reach production.

## Objective
Scan a Next.js project directory to identify pages missing critical SEO metadata (Title, Description, H1, Schema).

## Capabilities
*   **Recursive Scanning:** traversing `pages/` and `content/` directories.
*   **Static Analysis:** Parsing file contents for specific HTML/JSX tags.
*   **Quality Assurance:** Flagging duplicates and missing attributes.

## Workflow

### Phase 1: Setup
1.  **Identify Scope:** Locate the `pages/` directory and any content directories (e.g., `content/blog`).
2.  **Tooling:** Use the provided Node.js script logic to perform the scan.

### Phase 2: The Deep Dive Audit
Execute the audit script to check for:
*   **Canonicals:** Are self-referencing canonical tags present in the code?
*   **Schema:** Is `application/ld+json` present on critical pages (Blog, Products)?
*   **Metadata:** Detect duplicate titles or descriptions across markdown files.
*   **Structure:** Ensure exactly one `<h1>` tag exists per page.
*   **Safety:** Check for accidental `noindex` tags in production code.

### Phase 3: The Report
1.  **Output:** Display a structured report in the console.
2.  **Format:**
    *   🔴 **CRITICAL:** Missing Titles/Descriptions, Duplicates, `noindex`.
    *   ⚠️ **WARNING:** Missing Schema, Missing Canonicals.
    *   ✅ **PASS:** Clean items.

## Appendix: The Audit Script
If you need to run this manually, use this Node.js script:

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// --- CONFIGURATION ---
const DIRS = {
  pages: path.join(process.cwd(), 'pages'),
  recipes: path.join(process.cwd(), 'content', 'recipes'),
  blog: path.join(process.cwd(), 'content', 'blog')
};

// --- STATE ---
const report = {
  duplicates: { titles: {}, descriptions: {} },
  thinContent: [],
  missingCanonical: [],
  missingSchema: [],
  blocked: [], // noindex
  totalScanned: 0
};

// --- HELPER: Recursively get files ---
function getFiles(dir, ext = []) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'api' && !file.startsWith('.')) results = results.concat(getFiles(filePath, ext));
    } else {
      if (ext.length === 0 || ext.some(e => file.endsWith(e))) results.push(filePath);
    }
  });
  return results;
}

// --- AUDIT FUNCTIONS ---

function auditPages() {
  const pages = getFiles(DIRS.pages, ['.tsx', '.js']);
  
  pages.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    if (relativePath.includes('_app') || relativePath.includes('_document')) return;

    report.totalScanned++;
    const content = fs.readFileSync(file, 'utf8');

    // 1. Canonical Check
    if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) {
      report.missingCanonical.push(relativePath);
    }

    // 2. Schema Check
    if (!content.includes('application/ld+json')) {
      if (relativePath.includes('blog/') || relativePath.includes('ai-examples/')) {
        report.missingSchema.push(relativePath);
      }
    }

    // 3. NoIndex Check
    if (content.includes('noindex')) {
      report.blocked.push(relativePath);
    }
  });
}

function auditContent(dir, type) {
  const files = getFiles(dir, ['.md']);
  
  files.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    const content = fs.readFileSync(file, 'utf8');
    const { data, content: markdownBody } = matter(content);
    report.totalScanned++;

    // 1. Duplicate Titles
    const title = data.title || path.basename(file);
    if (title) {
        if (!report.duplicates.titles[title]) report.duplicates.titles[title] = [];
        report.duplicates.titles[title].push(relativePath);
    }

    // 2. Duplicate Descriptions
    const desc = data.description || data.excerpt;
    if (desc) {
        if (!report.duplicates.descriptions[desc]) report.duplicates.descriptions[desc] = [];
        report.duplicates.descriptions[desc].push(relativePath);
    }

    // 3. Thin Content (Word Count)
    const wordCount = markdownBody.split(/\s+/).length;
    if (wordCount < 200 && type === 'blog') {
      report.thinContent.push({ file: relativePath, words: wordCount });
    }
    if (wordCount < 50 && type === 'recipe') {
      report.thinContent.push({ file: relativePath, words: wordCount });
    }
  });
}

// --- EXECUTE ---
console.log('🕵️  Starting Deep Dive SEO Audit...\n');

auditPages();
auditContent(DIRS.recipes, 'recipe');
auditContent(DIRS.blog, 'blog');

// --- REPORTING ---

console.log(`\n📊 Scanned ${report.totalScanned} items.`);

// Duplicates
console.log('\n🔴 Duplicate Titles:');
let dupTitlesFound = false;
Object.entries(report.duplicates.titles).forEach(([title, files]) => {
  if (files.length > 1) {
    console.log(`   "${title}" found in ${files.length} files:`);
    dupTitlesFound = true;
  }
});
if (!dupTitlesFound) console.log('   ✅ None found.');

console.log('\n🔴 Duplicate Meta Descriptions:');
let dupDescFound = false;
Object.entries(report.duplicates.descriptions).forEach(([desc, files]) => {
  if (files.length > 1) {
    console.log(`   "${desc.substring(0, 50)}"... found in ${files.length} files.`);
    dupDescFound = true;
  }
});
if (!dupDescFound) console.log('   ✅ None found.');

// Thin Content
if (report.thinContent.length > 0) {
  console.log(`\n⚠️  Thin Content (Low Word Count):`);
  report.thinContent.forEach(item => console.log(`   - ${item.file} (${item.words} words)`));
} else {
  console.log('\n✅ Content length looks healthy.');
}

// Missing Canonical
if (report.missingCanonical.length > 0) {
  console.log(`\n⚠️  Missing Canonical Tag Implementation (Code Check):`);
  report.missingCanonical.forEach(f => console.log(`   - ${f}`));
}

// Missing Schema
if (report.missingSchema.length > 0) {
  console.log(`\n⚠️  Missing Structured Data (JSON-LD) in Key Pages:`);
  report.missingSchema.forEach(f => console.log(`   - ${f}`));
}

// Blocked
if (report.blocked.length > 0) {
  console.log(`\n🚫 Pages with 'noindex':`);
  report.blocked.forEach(f => console.log(`   - ${f}`));
}

console.log('\n----------------------------------------');
```
