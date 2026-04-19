import { Recipe } from './cookbook-data';

export function generateHowToSchema(recipe: Recipe, siteUrl: string, imageUrl?: string) {
  // Try to parse "Phases" or "Steps" from the blueprint
  const steps = [];
  const lines = recipe.blueprint.split('\n');
  let currentStep = { name: '', text: '' };

  lines.forEach(line => {
    if (line.startsWith('### Phase') || line.startsWith('## Phase') || line.startsWith('**Phase')) {
      if (currentStep.name) {
        const stepText = stripMarkdown(currentStep.text.trim());
        steps.push({
          "@type": "HowToStep",
          "name": currentStep.name,
          "text": stepText || `Instructions for the ${currentStep.name} phase.`
        });
      }
      currentStep = { name: line.replace(/#|\*/g, '').trim(), text: '' };
    } else {
      currentStep.text += line + '\n';
    }
  });
  
  // Push the last step
  if (currentStep.name) {
    const stepText = stripMarkdown(currentStep.text.trim());
    steps.push({
      "@type": "HowToStep",
      "name": currentStep.name,
      "text": stepText || `Instructions for the ${currentStep.name} phase.`
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

  // Safely parse time to avoid PTNaNM
  const timeMatch = recipe.time ? recipe.time.match(/\d+/) : null;
  const minutes = timeMatch ? parseInt(timeMatch[0]) : 5;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": recipe.title,
    "description": recipe.description,
    "totalTime": `PT${minutes}M`,
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

  if (imageUrl) {
    schema.image = {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": "1200",
      "height": "630"
    };
  }

  return schema;
}

function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    // Headers
    .replace(/^#+\s+/gm, '')
    // Bold/Italic
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Images ![alt](url) -> alt
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Lists
    .replace(/^[\s-]*[-+*]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Blockquotes
    .replace(/^\s*>\s+/gm, '')
    // Horizontal rules
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    // Newlines to spaces (optional, but safer for JSON)
    .replace(/\n+/g, ' ')
    .trim();
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
        "text": stripMarkdown(whatDoesMatch[1].trim())
      }
    });
  } else if (recipe.description) {
    faqItems.push({
      "@type": "Question",
      "name": `What does the ${recipe.title} blueprint do?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripMarkdown(recipe.description)
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
        "text": stripMarkdown(whatNeedMatch[1].trim())
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

export function generateSoftwareAppSchema(recipe: Recipe, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": recipe.title,
    "description": recipe.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any (Gemini CLI, Claude Code, Cursor, Terminal)",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "url": `${siteUrl}/tools/${recipe.id}`
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
    const regex = new RegExp(`\\b${escapeRegExp(recipe.title)}\\b`, 'i');
    
    if (regex.test(newText)) {
      // Check if we are already inside a link (simple heuristic)
      // This is hard with regex, so we'll just be careful.
      // A safe way is to split the text, link, and join, but let's try a replacement 
      // that avoids replacing inside [...]() constructs if possible.
      
      newText = newText.replace(regex, (match) => {
        // If we successfully matched, mark as linked
        linkedslugs.add(recipe.id);
        return `[${match}](/tools/${recipe.id})`;
      });
    }
  });

  return newText;
}

export function generateItemListSchema(items: any[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => {
      const isRecipe = 'blueprint' in item;
      const categorySlug = item.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';
      const path = isRecipe 
        ? `/tools/${item.id}` 
        : `/ai-examples/${categorySlug}/${item.slug || item.id}`;
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `${siteUrl}${path}`
      };
    })
  };
}

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\\]/g, '\\$&');
}
