const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const RECIPES_DIR = path.join(process.cwd(), 'content/recipes');
const BLUEPRINTS_DIR = path.join(process.cwd(), 'public/blueprints');

// Ensure output directory exists
if (!fs.existsSync(BLUEPRINTS_DIR)) {
  fs.mkdirSync(BLUEPRINTS_DIR, { recursive: true });
}

function scaffoldBlueprint(filename) {
  const filePath = path.join(RECIPES_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  const id = frontmatter.id || path.basename(filename, '.md');
  const toolDir = path.join(BLUEPRINTS_DIR, id);

  // Skip if directory already exists (don't overwrite manual work like csv-crm-normalizer)
  if (fs.existsSync(toolDir)) {
    console.log(`Skipping ${id} (already exists)`);
    return;
  }

  console.log(`Scaffolding ${id}...`);
  fs.mkdirSync(toolDir, { recursive: true });

  // 1. Create tool_definition.json
  const toolDef = {
    name: id,
    description: frontmatter.description || frontmatter.tagline || "No description provided.",
    command: "python main.py",
    inputs: [
      {
        name: "config.json",
        description: "Configuration settings.",
        required: true
      }
    ],
    outputs: []
  };

  // Add sample data input if present
  if (frontmatter.sampleData && frontmatter.sampleData.filename) {
    toolDef.inputs.push({
      name: frontmatter.sampleData.filename,
      description: "Input data file.",
      required: true
    });
  }

  fs.writeFileSync(path.join(toolDir, 'tool_definition.json'), JSON.stringify(toolDef, null, 2));

  // 2. Create config.json
  const config = {
    input_file: frontmatter.sampleData ? frontmatter.sampleData.filename : "input.csv",
    output_file: "output.csv"
  };
  fs.writeFileSync(path.join(toolDir, 'config.json'), JSON.stringify(config, null, 2));

  // 3. Create sample data file
  if (frontmatter.sampleData && frontmatter.sampleData.filename && frontmatter.sampleData.content) {
    const samplePath = path.join(toolDir, frontmatter.sampleData.filename);
    const sampleDir = path.dirname(samplePath);
    if (!fs.existsSync(sampleDir)) {
      fs.mkdirSync(sampleDir, { recursive: true });
    }
    fs.writeFileSync(samplePath, frontmatter.sampleData.content);
  }

  // 4. Create README.md (Original Content + Agent Instructions)
  const readmeContent = `# ${frontmatter.title}\n\n${frontmatter.description}\n\n${content}\n\n## Agent Implementation Guide\nThis tool is currently a stub. Your goal is to implement the logic described above in 
main.py
.`;
  fs.writeFileSync(path.join(toolDir, 'README.md'), readmeContent);

  // 5. Create requirements.txt
  fs.writeFileSync(path.join(toolDir, 'requirements.txt'), "pandas\n");

  // 6. Create main.py Stub
  const pyStub = `import json
import os
import sys
// import pandas as pd

def explain(msg):
    print(f"[${frontmatter.title}] {msg}")

def load_config():
    try:
        with open('config.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        explain("Error: config.json not found.")
        sys.exit(1)

def main():
    explain("Starting tool...")
    config = load_config()
    
    // TODO: Implement the logic described in README.md
    // 1. Load Input Data
    // 2. Process Data
    // 3. Save Output
    
    explain("This is a placeholder. Logic needs to be implemented.")

if __name__ == "__main__":
    main()
`;
  fs.writeFileSync(path.join(toolDir, 'main.py'), pyStub);

  // 7. Create tests.py Stub
  const testStub = `import unittest
import os
// from main import main

class TestTool(unittest.TestCase):
    def test_placeholder(self):
        """Placeholder test."""
        self.assertTrue(True)

if __name__ == '__main__':
    unittest.main()
`;
  fs.writeFileSync(path.join(toolDir, 'tests.py'), testStub);
}

// Run for all markdown files
const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
files.forEach(scaffoldBlueprint);
console.log("Scaffolding complete.");