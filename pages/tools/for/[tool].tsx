import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Search, ArrowRight, Layers, Filter, Zap, Terminal, Code, Cpu, Command } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import DatabaseDownloadCta from '../../../components/DatabaseDownloadCta';
import StickyActionBar from '../../../components/StickyActionBar';
import { getAllRecipes } from '../../../lib/recipes';
import { Recipe } from '../../../lib/cookbook-data';

interface ToolLandingPageProps {
  toolName: string;
  toolSlug: string;
  recipes: Recipe[];
  categories: string[];
}

// Map of tool slugs to display names and descriptions
const TOOL_CONFIG: Record<string, { name: string, description: string, icon: any }> = {
  'claude-code': {
    name: 'Claude Code',
    description: 'Stop typing and start shipping. Claude Code is for the builders who want to automate refactoring, debugging, and terminal-heavy lifting without the context switching.',
    icon: Terminal
  },
  'gemini-cli': {
    name: 'Gemini CLI',
    description: 'Google’s multimodal engine, right in your terminal. Perfect for handling massive data dumps and building prototype agents that move at 10x speed.',
    icon: Zap
  },
  'chatgpt': {
    name: 'ChatGPT',
    description: 'The universal leverage tool. We’re moving beyond simple prompts to full-blown strategy, copywriting machines, and decision-making logic.',
    icon: Command
  },
  'cursor': {
    name: 'Cursor',
    description: 'The definitive editor for the AI-native dev. Build features while you sleep and automate the boring parts of your codebase with zero friction.',
    icon: Code
  }
};

export default function ToolLandingPage({ toolName, toolSlug, recipes, categories }: ToolLandingPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const config = TOOL_CONFIG[toolSlug] || { name: 'AI Tools', description: 'Curated workflows.', icon: Cpu };
  const ToolIcon = config.icon;

  const title = `Best ${config.name} Workflow Generator & Prompts (2026)`;
  const description = `Stop chatting, start building. ${recipes.length} field-tested ${config.name} workflow generators to automate Sales Ops, SEO, and Marketing.`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?mode=tool&tool=${toolSlug}`; 

  // Filter recipes (we can also filter by 'tool' property in recipe if it exists, 
  // but for now we assume all blueprints can be adapted, so we show all/most relevant)
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = (recipe.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                            (recipe.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  const groupedRecipes = useMemo(() => {
    const groups: Record<string, Recipe[]> = {};
    filteredRecipes.forEach(recipe => {
      const cat = recipe.category || 'Uncategorized';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(recipe);
    });
    return groups;
  }, [filteredRecipes]);

  const sortedCategories = Object.keys(groupedRecipes).sort();

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <link rel="canonical" href={`${baseUrl}/tools/${toolSlug}-blueprints`} />
      </Head>

      <Navbar />
      <StickyActionBar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="container mx-auto px-4 mb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-secondary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-mono text-accent mb-6 shadow-sm">
            <ToolIcon className="w-3 h-3" />
            <span className="tracking-widest uppercase font-bold text-[10px]">{config.name} Edition</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-color mb-6 tracking-tight leading-[1.1]">
            Top Workflows for <br/><span className="text-accent">{config.name}</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-10 font-normal max-w-2xl mx-auto">
            {config.description} <br/>
            Here are {recipes.length} blueprints you can copy-paste directly into {config.name}.
          </p>
          
          {/* Database Download CTA */}
          <div id="database-download" className="mb-16 max-w-3xl mx-auto">
             <DatabaseDownloadCta />
          </div>

          {/* Search Bar */}
          <div className="bg-secondary-bg p-4 rounded-xl border border-navy-dark shadow-2xl flex flex-col md:flex-row gap-4 max-w-2xl mx-auto sticky top-24 z-30">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input 
                type="text" 
                placeholder={`Search ${config.name} workflows...`}
                className="w-full bg-primary-bg border border-navy-dark rounded-lg py-3 pl-10 pr-4 text-text-color focus:ring-2 focus:ring-accent focus:outline-none transition-all placeholder:text-text-secondary/50 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[200px]">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
                 <Filter className="w-4 h-4" />
               </div>
               <select 
                 className="w-full bg-primary-bg border border-navy-dark rounded-lg py-3 pl-10 pr-8 text-text-color focus:ring-2 focus:ring-accent focus:outline-none appearance-none cursor-pointer font-medium"
                 value={selectedCategory}
                 onChange={(e) => setSelectedCategory(e.target.value)}
               >
                 <option value="All">All Categories</option>
                 {categories.map(cat => (
                   <option key={cat} value={cat}>{cat}</option>
                 ))}
               </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="container mx-auto px-4 max-w-6xl">
          {sortedCategories.length === 0 ? (
            <div className="text-center py-24 bg-secondary-bg border border-dashed border-navy-dark rounded-2xl">
              <Layers className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-20" />
              <p className="text-xl text-text-secondary">No workflows found.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {sortedCategories.map(category => (
                <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center gap-4 mb-8 border-b border-navy-dark/50 pb-4">
                    <h2 className="text-3xl font-bold text-text-color tracking-tight">{category}</h2>
                    <span className="bg-accent/10 text-accent text-[10px] px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider border border-accent/20">
                      {groupedRecipes[category].length}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedRecipes[category].map(recipe => (
                      <Link 
                        key={recipe.id} 
                        href={`/skills/${recipe.id}`}
                        className="group flex flex-col bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-[0_10px_30px_rgba(56,189,248,0.05)] relative overflow-hidden"
                      >
                        <h3 className="text-lg font-bold text-text-color mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          {recipe.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-normal">
                          {recipe.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-navy-dark/30">
                          <span className="text-xs font-mono text-text-color/80 bg-primary-bg px-2 py-1 rounded">
                             {config.name} Ready
                          </span>
                          <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-accent" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="border-t border-navy-dark bg-secondary-bg py-12 text-center">
          <Link href="/ai-examples" className="text-text-secondary hover:text-accent underline">
              View all Blueprints
          </Link>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tools = ['claude-code', 'gemini-cli', 'chatgpt', 'cursor'];
  const paths = tools.map(tool => ({
    params: { tool: `${tool}-blueprints` } 
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allRecipes = getAllRecipes();
  // In a real app, you might filter recipes by tool compatibility here.
  // For now, we return all recipes to populate the page.
  const recipes = allRecipes.slice(0, 100); // Limit to 100 for these landing pages to keep them focused
  const categories = Array.from(new Set(recipes.map(r => r.category).filter(Boolean))).sort();
  
  const toolSlug = (params?.tool as string).replace('-blueprints', '');

  return {
    props: {
      toolName: TOOL_CONFIG[toolSlug]?.name || 'AI',
      toolSlug,
      recipes,
      categories
    },
    revalidate: 3600
  };
};
