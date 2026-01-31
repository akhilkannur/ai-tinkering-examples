const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(process.cwd(), 'pages');
const IGNORE_DIRS = ['api', '_app.tsx', '_document.tsx'];

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.js')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allPages = getAllFiles(PAGES_DIR);
const issues = {
  missingTitle: [],
  missingDescription: [],
  missingH1: [],
  multipleH1: [],
  missingAlt: []
};

console.log(`🔍 Auditing ${allPages.length} pages...\n`);

allPages.forEach(file => {
  const relativePath = path.relative(process.cwd(), file);
  
  if (relativePath.includes('pages/api/') || relativePath.includes('_app') || relativePath.includes('_document')) return;

  const content = fs.readFileSync(file, 'utf8');

  // Check Title
  if (!content.includes('<title>') && !content.includes('title={')) {
    issues.missingTitle.push(relativePath);
  }

  // Check Description
  if (!content.includes('name="description"') && !content.includes('name=\'description\'')) {
    issues.missingDescription.push(relativePath);
  }

  // Check H1
  const h1Count = (content.match(/<h1/g) || []).length;
  if (h1Count === 0) {
    issues.missingH1.push(relativePath);
  } else if (h1Count > 1) {
    issues.multipleH1.push(relativePath);
  }

  // Check Images without Alt
  // Simple regex, might miss some edge cases or false positives with multiline props
  const imgMatches = content.match(/<img[^>]+>/g) || [];
  const nextImageMatches = content.match(/<Image[^>]+>/g) || [];
  
  const allImages = [...imgMatches, ...nextImageMatches];
  
  allImages.forEach(imgTag => {
    if (!imgTag.includes('alt=')) {
      issues.missingAlt.push({ file: relativePath, tag: imgTag.substring(0, 50) + '...' });
    }
  });
});

// Report
console.log('--- 🚨 AUDIT REPORT 🚨 ---');

if (issues.missingTitle.length > 0) {
  console.log(`\n❌ Missing <title> (${issues.missingTitle.length}):`);
  issues.missingTitle.forEach(f => console.log(`   - ${f}`));
} else {
  console.log('\n✅ All pages have titles.');
}

if (issues.missingDescription.length > 0) {
  console.log(`\n❌ Missing meta description (${issues.missingDescription.length}):`);
  issues.missingDescription.forEach(f => console.log(`   - ${f}`));
} else {
  console.log('\n✅ All pages have meta descriptions.');
}

if (issues.missingH1.length > 0) {
  console.log(`\n⚠️ Missing <h1> (${issues.missingH1.length}):`);
  issues.missingH1.forEach(f => console.log(`   - ${f}`));
}

if (issues.multipleH1.length > 0) {
  console.log(`\n⚠️ Multiple <h1> tags (${issues.multipleH1.length}):`);
  issues.multipleH1.forEach(f => console.log(`   - ${f}`));
}

if (issues.missingAlt.length > 0) {
  console.log(`\n❌ Images missing alt text (${issues.missingAlt.length}):`);
  issues.missingAlt.forEach(i => console.log(`   - ${i.file}: ${i.tag}`));
} else {
  console.log('\n✅ All images have alt text.');
}

console.log('\n--------------------------');
