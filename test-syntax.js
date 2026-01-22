// Simple test to validate syntax
try {
  const fs = require('fs');
  const content = fs.readFileSync('./lib/social-examples-data.ts', 'utf8');
  console.log('✅ File exists and can be read');
  
  // Try to validate basic syntax by checking for balanced brackets
  let openBraces = 0;
  let openBrackets = 0;
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    if ((char === '"' || char === "'") && !inString) {
      inString = char;
    } else if (char === inString && !escapeNext) {
      inString = false;
    }
    
    if (!inString) {
      if (char === '{') openBraces++;
      else if (char === '}') openBraces--;
      else if (char === '[') openBrackets++;
      else if (char === ']') openBrackets--;
    }
  }
  
  if (openBraces === 0 && openBrackets === 0) {
    console.log('✅ Braces and brackets appear balanced');
  } else {
    console.log(`❌ Unbalanced: braces=${openBraces}, brackets=${openBrackets}`);
  }
} catch (error) {
  console.error('❌ Error validating file:', error.message);
}