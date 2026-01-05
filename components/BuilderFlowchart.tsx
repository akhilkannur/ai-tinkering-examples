import React, { useState } from 'react';
import { Terminal, Copy, Check, FileText, Globe, Database, Search, Twitter, Mail, X } from 'lucide-react';

// --- The Recipe Data ---

interface Recipe {
  id: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate';
  time: string;
  description: string;
  // The Blueprint is the "System Prompt" file
  blueprint: string;
}

const recipes: Recipe[] = [
  {
    id: 'content-recycler',
    title: "The Content Recycler",
    tagline: "Turn one blog post into a month of social content.",
    icon: <Twitter className="w-8 h-8 text-blue-400" />,
    difficulty: 'Beginner',
    time: '5 mins',
    description: "A script that reads a long text file (blog/transcript) and intelligently breaks it down into threaded tweets, LinkedIn carousels, and newsletter snippets.",
    blueprint: `# Project: Content Repurposing Engine

## 1. Goal
Take a raw text file (blog post) and generate platform-specific social media content.

## 2. The Script Logic
- **Input:** Read a file named 'source_content.txt'.
- **Processing:**
  - Extract the top 3 core insights.
  - Rewrite Insight #1 as a Twitter Thread (5 tweets max).
  - Rewrite Insight #2 as a LinkedIn Post (Corporate tone).
  - Rewrite Insight #3 as a Newsletter Intro (Casual tone).
- **Output:** Save all outputs to a Markdown file named 'social_pack.md'.

## 3. Tech Stack
- Language: Python (runs natively)
- No external APIs needed (uses the AI's internal reasoning).

## 4. Execution Plan
1. Create a Python script.
2. Define the 'repurpose_content' function.
3. Use simple file I/O to read input and write output.
`
  },
  {
    id: 'competitor-spy',
    title: "The Competitor Spy",
    tagline: "Track pricing changes on competitor websites automatically.",
    icon: <Globe className="w-8 h-8 text-green-500" />,
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Don't manually check their pricing page. Run this tool every morning to get a 'Diff Report' showing exactly what headlines or prices changed overnight.",
    blueprint: `# Project: Competitor Site Monitor

## 1. Goal
Scrape a specific URL and compare it to yesterday's version to detect changes.

## 2. The Script Logic
- **Input:** A list of URLs to monitor (in 'urls.txt').
- **Action:**
  - Visit each URL.
  - Extract visible text (ignoring code/scripts).
  - Save the text to 'data/YYYY-MM-DD-urlname.txt'.
  - Compare today's file with the most recent previous file.
- **Output:** specific 'Diff Report' highlighting added/removed text.

## 3. Tech Stack
- Language: Python
- Libraries: 'requests', 'beautifulsoup4' (for scraping), 'difflib' (for comparison).

## 4. Execution Plan
1. Install dependencies (requests, beautifulsoup4).
2. Write the scraper function.
3. Write the comparison logic.
`
  },
  {
    id: 'seo-audit',
    title: "The SEO Link Auditor",
    tagline: "Find broken links and missing meta tags instantly.",
    icon: <Search className="w-8 h-8 text-purple-500" />,
    difficulty: 'Beginner',
    time: '10 mins',
    description: "Why pay for Screaming Frog? Build a simple crawler that scans your sitemap and reports 404 errors and pages with missing descriptions.",
    blueprint: `# Project: Simple SEO Crawler

## 1. Goal
Crawl a website to identify broken links (404s) and missing metadata.

## 2. The Script Logic
- **Input:** A starting URL (homepage).
- **Action:**
  - Crawl all internal links found on the page (up to depth 2).
  - Check the HTTP status code of each link.
  - Check if <meta name="description"> exists.
- **Output:** A CSV file 'seo_report.csv' with columns: URL, Status, HasDescription.

## 3. Tech Stack
- Language: Python
- Libraries: 'requests', 'beautifulsoup4'.

## 4. Execution Plan
1. Setup the crawler loop.
2. Implement the status checker.
3. Implement the CSV writer.
`
  },
  {
    id: 'utm-generator',
    title: "The UTM Factory",
    tagline: "A CLI tool to generate perfect tracking links.",
    icon: <Terminal className="w-8 h-8 text-gray-700" />,
    difficulty: 'Beginner',
    time: '5 mins',
    description: "Stop using spreadsheets. Type 'make-link' in your terminal, answer 3 questions (Source, Medium, Campaign), and get a perfect URL copied to your clipboard.",
    blueprint: `# Project: CLI UTM Generator

## 1. Goal
A terminal-based wizard to generate marketing tracking URLs.

## 2. The Script Logic
- **Prompt:** Ask user for Base URL.
- **Prompt:** Ask user for Source (offer defaults: google, facebook).
- **Prompt:** Ask user for Medium (offer defaults: cpc, email).
- **Prompt:** Ask user for Campaign Name (auto-slugify spaces to dashes).
- **Action:** specific the full URL.
- **Action:** Copy the result to the system clipboard automatically.

## 3. Tech Stack
- Language: Python
- Libraries: 'pyperclip' (for clipboard access).

## 4. Execution Plan
1. create the input prompts.
2. Build the URL string construction logic.
3. Integrate clipboard functionality.
`
  },
  {
    id: 'review-analyzer',
    title: "The Review Miner",
    tagline: "Extract sentiment and keywords from customer reviews.",
    icon: <Database className="w-8 h-8 text-yellow-500" />,
    difficulty: 'Intermediate',
    time: '20 mins',
    description: "Feed it a CSV export of your Trustpilot or Amazon reviews. It will output a report: 'Top 3 Complaints', 'Top 3 Praises', and 'Most Used Keywords'.",
    blueprint: `# Project: Customer Review Analyzer

## 1. Goal
Analyze a dataset of customer reviews to extract sentiment and themes.

## 2. The Script Logic
- **Input:** A CSV file 'reviews.csv' (Column A: Review Text).
- **Processing:**
  - Calculate frequency of words (excluding common "stop words").
  - Identify phrases associated with negative sentiment (e.g., "slow", "broken", "expensive").
  - Identify phrases associated with positive sentiment.
- **Output:** A text summary file 'insights.txt'.

## 3. Tech Stack
- Language: Python
- Libraries: 'collections' (for counting), 'csv'.

## 4. Execution Plan
1. Load the CSV data.
2. Implement the word frequency counter.
3. Implement simple keyword matching for sentiment.
`
  },
  {
    id: 'email-formatter',
    title: "The HTML Email Cleaner",
    tagline: "Clean up messy HTML for newsletters.",
    icon: <Mail className="w-8 h-8 text-pink-500" />,
    difficulty: 'Intermediate',
    time: '15 mins',
    description: "Paste your newsletter HTML. This script runs a checklist: checks for alt tags, ensures plain-text version exists, and minifies the code.",
    blueprint: `# Project: HTML Email Validator

## 1. Goal
A sanity-check tool for HTML email templates before sending.

## 2. The Script Logic
- **Input:** Read 'email.html'.
- **Checks:**
  - Are all <img> tags missing 'alt' attributes?
  - Are there any broken links?
  - Is the file size > 100KB?
- **Output:** Print a "Pass/Fail" report to the terminal.

## 3. Tech Stack
- Language: Python
- Libraries: 'beautifulsoup4'.

## 4. Execution Plan
1. Parse the HTML file.
2. Run the validation rules.
3. Print the report in color (Green for Pass, Red for Fail).
`
  }
];

const TerminalCookbook = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!selectedRecipe) return;
    navigator.clipboard.writeText(selectedRecipe.blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* The Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="group text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                {recipe.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                recipe.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {recipe.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {recipe.title}
            </h3>
            <p className="text-gray-500 text-sm font-medium mb-4 min-h-[40px]">
              {recipe.tagline}
            </p>
            
            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
               <span className="flex items-center gap-1">
                 <Terminal className="w-3 h-3" /> Python / Node
               </span>
               <span>{recipe.time} build</span>
            </div>
          </button>
        ))}
      </div>

      {/* The "Recipe Card" Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animation-fade-in" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  {selectedRecipe.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRecipe.title}</h2>
                  <p className="text-gray-500 text-sm">Blueprint for Claude Code / Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">What is this?</h3>
                <p className="text-gray-600 leading-relaxed">{selectedRecipe.description}</p>
              </div>

              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                  <span className="text-gray-400 font-mono text-xs flex items-center gap-2">
                    <FileText className="w-3 h-3" /> BLUEPRINT.md
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
                    }`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <div className="p-6 max-h-[300px] overflow-y-auto">
                  <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedRecipe.blueprint}
                  </pre>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
                 <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">1</div>
                 <div>
                   <h4 className="text-sm font-bold text-blue-900">How to use this</h4>
                   <p className="text-sm text-blue-800 mt-1">
                     Create a new file named <code>BLUEPRINT.md</code> in your project folder, paste the code above, and tell your AI: <span className="italic font-semibold">"Read BLUEPRINT.md and follow the instructions."</span>
                   </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TerminalCookbook;
