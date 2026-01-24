import { Recipe } from './cookbook-data';

export function generateHowToSchema(recipe: Recipe, siteUrl: string) {
  // Try to parse "Phases" or "Steps" from the blueprint
  const steps = [];
  const lines = recipe.blueprint.split('\n');
  let currentStep = { name: '', text: '' };

  lines.forEach(line => {
    if (line.startsWith('### Phase') || line.startsWith('## Phase') || line.startsWith('**Phase')) {
      if (currentStep.name) {
        steps.push({
          "@type": "HowToStep",
          "name": currentStep.name,
          "text": currentStep.text.trim()
        });
      }
      currentStep = { name: line.replace(/#|\*/g, '').trim(), text: '' };
    } else {
      currentStep.text += line + '\n';
    }
  });
  
  // Push the last step
  if (currentStep.name) {
    steps.push({
      "@type": "HowToStep",
      "name": currentStep.name,
      "text": currentStep.text.trim()
    });
  }

  // Fallback if no phases found
  if (steps.length === 0) {
    steps.push({
      "@type": "HowToStep",
      "name": "Execute Blueprint",
      "text": "Copy the blueprint content into your AI agent or terminal to execute this workflow."
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": recipe.title,
    "description": recipe.description,
    "totalTime": `PT${parseInt(recipe.time) || 5}M`, // Best guess parse
    "step": steps,
    "supply": recipe.sampleData ? [
      {
        "@type": "HowToSupply",
        "name": recipe.sampleData.filename
      }
    ] : [],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "AI Agent (Claude/Gemini/OpenAI)"
      }
    ]
  };
}

export function generateFAQSchema(recipe: Recipe) {
  const faqItems = [];
  
  // Extract "What This Does"
  const whatDoesMatch = recipe.blueprint.match(/# What This Does\n([\s\S]*?)(?=#|$)/);
  if (whatDoesMatch) {
    faqItems.push({
      "@type": "Question",
      "name": `What does the ${recipe.title} blueprint do?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": whatDoesMatch[1].trim()
      }
    });
  }

  // Extract "What You Need"
  const whatNeedMatch = recipe.blueprint.match(/# What You Need\n([\s\S]*?)(?=#|$)/);
  if (whatNeedMatch) {
    faqItems.push({
      "@type": "Question",
      "name": `What do I need to run the ${recipe.title} workflow?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": whatNeedMatch[1].trim()
      }
    });
  }

  if (faqItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems
  };
}

export function injectInternalLinks(text: string, recipes: Recipe[]): string {
  if (!text) return '';
  
  let newText = text;
  
  // Sort recipes by title length (descending) to avoid partial matches
  // e.g. Match "Sales Battlecard Builder" before "Sales Battlecard"
  const sortedRecipes = [...recipes]
    .filter(r => r.title.length > 10) // Ignore very short titles to avoid noise
    .sort((a, b) => b.title.length - a.title.length);

  // We only want to link the *first* occurrence of each keyword to avoid spamminess
  const linkedslugs = new Set<string>();

  sortedRecipes.forEach(recipe => {
    if (linkedslugs.has(recipe.id)) return;

    // Regex to match the title case insensitive, ensuring word boundaries
    const regex = new RegExp(`\b${escapeRegExp(recipe.title)}\b`, 'i');
    
    if (regex.test(newText)) {
      // Check if we are already inside a link (simple heuristic)
      // This is hard with regex, so we'll just be careful.
      // A safe way is to split the text, link, and join, but let's try a replacement 
      // that avoids replacing inside [...]() constructs if possible.
      
      newText = newText.replace(regex, (match) => {
        // If we successfully matched, mark as linked
        linkedslugs.add(recipe.id);
        return `[${match}](/blueprints/${recipe.id})`;
      });
    }
  });

  return newText;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\\]/g, '\\$&');
}
