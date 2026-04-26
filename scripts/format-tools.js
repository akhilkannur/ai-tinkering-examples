const fs = require('fs');

const results = JSON.parse(fs.readFileSync('final_enrichment_results.json', 'utf8'));

const manualData = {
  "PeopleDB": {
    description: "High-performance B2B lead generation database with verified emails and direct dials.",
    category: "Sales",
    features: ["Verified B2B contact data", "Email and direct dial search", "CRM integration support", "Advanced filtering options"]
  },
  "Reasonyx": {
    description: "AI-powered logical reasoning engine for complex problem solving and decision support.",
    category: "Productivity",
    features: ["Logical reasoning analysis", "Decision support tools", "Complex problem decomposition", "AI-driven insights"]
  },
  "TradeTab": {
    description: "Real-time AI trading analysis and market intelligence platform for retail traders.",
    category: "Sales",
    features: ["Real-time market analysis", "AI-powered trading signals", "Portfolio intelligence", "Market sentiment tracking"]
  },
  "Expressify Ai": {
    description: "AI platform for creating expressive and natural-sounding voiceovers and video content.",
    category: "Video & Audio",
    features: ["Expressive AI voiceovers", "Natural language synthesis", "Video content generation", "Multi-language support"]
  }
};

const categories = {
  "FLAEX AI": "Development",
  "Dev Blocks": "Marketing",
  "Scalify.ai": "Design",
  "AI Chatbot Support": "Sales",
  "T2M URL Shortener": "Marketing",
  "Product Metrics": "Sales",
  "KraflIO": "Writing",
  "Kiqo": "Other",
  "Furnea": "Design",
  "Wafler": "Development",
  "Soul Wish": "Other",
  "Bitsafve": "Other",
  "Hi-Ai": "Productivity",
  "MoodTrackMe": "Other"
};

const formatted = results.map(tool => {
  const scraped = tool.scraped || {};
  let description = scraped.description || '';
  
  if (manualData[tool.name]) {
    return {
      name: tool.name,
      description: manualData[tool.name].description,
      url: tool.url,
      category: manualData[tool.name].category,
      tags: { price: "Paid" },
      image: `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`,
      screenshot: scraped.screenshot || "",
      dateAdded: "2026-04-26",
      features: manualData[tool.name].features
    };
  }

  if (description.length < 20 && scraped.bodyText) {
      description = scraped.bodyText.split('\n')[0].substring(0, 160);
  }
  
  const features = [];
  if (scraped.bodyText) {
      const lines = scraped.bodyText.split('\n').filter(l => l.length > 20 && l.length < 100);
      features.push(...lines.slice(0, 4));
  }
  if (features.length === 0) {
      features.push(`AI-powered ${tool.name} capabilities`, "Easy integration", "Modern user interface");
  }

  return {
    name: tool.name,
    description: description,
    url: tool.url,
    category: categories[tool.name] || "Productivity",
    tags: { price: "Freemium" },
    image: `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=128`,
    screenshot: scraped.screenshot || "",
    dateAdded: "2026-04-26",
    features: features
  };
});

console.log(JSON.stringify(formatted, null, 2));
