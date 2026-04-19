import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Search, ArrowRight, Layers, Filter, Zap, Target, TrendingUp, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import StickyActionBar from '../components/StickyActionBar';
import { getAllRecipes } from '../lib/recipes';
import { Recipe } from '../lib/cookbook-data';

interface MegaListicleProps {
  recipes: Recipe[];
  categories: string[];
}

export default function FiveHundredWays({ recipes, categories }: MegaListicleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const title = "500+ AI Agent Blueprints for Sales & Marketing (2026) | Copy-Paste Workflows";
  const description = "The largest free library of ready-to-run AI agent prompts. Automate prospecting, SEO, content, and RevOps in minutes. No coding required.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?mode=home`;

  // Filter recipes based on search and category
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = (recipe.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                            (recipe.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  // Group filtered recipes by category for display
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

  // Schema.org ItemList for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "500 Ways to Use LLMs for Sales & Marketing",
    "description": "500 practical AI blueprints to automate prospecting, SEO, content, and revenue operations.",
    "itemListElement": filteredRecipes.slice(0, 50).map((recipe, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": recipe.title,
      "description": recipe.description,
      "url": `https://realaiexamples.com/tools/${recipe.id}`
    }))
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Navbar />
      <StickyActionBar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <div className="container mx-auto px-4 mb-24 text-center max-w-4xl relative z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          
          <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-1.5 font-black text-xs uppercase mb-8 transform -rotate-1 brutalist-shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
            <span className="tracking-widest uppercase font-black text-[10px]">Built for Tinkerers</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display text-black mb-8 uppercase leading-[0.9] glitch-text" data-text="500 WAYS TO USE LLMS">
            500 Ways to Use <br/><span className="text-[#ff00ff]">LLMs for Work</span>
          </h1>
          <p className="text-xl md:text-2xl text-black font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm text-left mx-auto max-w-2xl">
            Ditch the "AI Hype." These are 500 field-tested blueprints for <strong>Sales Ops, SEOs, and Growth Marketers</strong>.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 mb-16 font-mono font-black uppercase text-xs">
            <div className="flex items-center gap-2 text-black bg-white border-2 border-black px-3 py-1 brutalist-shadow-sm transform -rotate-2">
               <Target className="w-4 h-4 text-emerald-600 stroke-[3px]" /> Lead Gen
            </div>
            <div className="flex items-center gap-2 text-black bg-white border-2 border-black px-3 py-1 brutalist-shadow-sm transform rotate-1">
               <TrendingUp className="w-4 h-4 text-blue-600 stroke-[3px]" /> Revenue Ops
            </div>
            <div className="flex items-center gap-2 text-black bg-white border-2 border-black px-3 py-1 brutalist-shadow-sm transform -rotate-1">
               <Cpu className="w-4 h-4 text-purple-600 stroke-[3px]" /> SEO Content
            </div>
          </div>
          
          {/* Search & Filter Bar */}
          <div className="bg-white border-4 border-black p-6 brutalist-shadow flex flex-col md:flex-row gap-6 max-w-3xl mx-auto sticky top-24 z-30">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-6 h-6 stroke-[3px]" />
              <input 
                type="text" 
                placeholder="Search problems..." 
                className="w-full bg-gray-50 border-2 border-black py-4 pl-12 pr-4 text-black font-black uppercase text-sm focus:bg-[#ccff00] outline-none transition-all placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative min-w-[240px]">
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none">
                 <Filter className="w-5 h-5 stroke-[3px]" />
               </div>
               <select 
                 className="w-full bg-white border-2 border-black py-4 pl-4 pr-12 text-black font-display text-xs uppercase appearance-none cursor-pointer focus:bg-[#ff00ff] focus:text-white transition-all brutalist-shadow-sm"
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
            <div className="text-center py-24 bg-white border-4 border-black border-dashed brutalist-shadow">
              <Layers className="w-16 h-16 text-gray-200 mx-auto mb-8 stroke-[3px]" />
              <p className="text-2xl font-display text-black uppercase mb-8">No blueprints found</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="bg-[#ccff00] border-2 border-black px-8 py-3 font-display uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-32">
              {sortedCategories.map(category => (
                <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex flex-wrap items-center gap-6 mb-12 border-b-4 border-black pb-6">
                    <h2 className="text-3xl md:text-5xl font-display text-black uppercase tracking-tight">{category}</h2>
                    <span className="bg-black text-[#ccff00] text-xs px-3 py-1 border-2 border-black font-black uppercase tracking-widest transform rotate-1 brutalist-shadow-sm">
                      {groupedRecipes[category].length} Blueprints
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {groupedRecipes[category].map(recipe => (
                      <Link 
                        key={recipe.id} 
                        href={`/tools/${recipe.id}`}
                        className="group flex flex-col bg-white border-4 border-black p-8 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 relative brutalist-shadow h-full"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                           <Zap className="w-8 h-8 text-[#ff00ff] fill-current stroke-[3px]" />
                        </div>
                        
                        <h3 className="text-2xl font-display text-black mb-4 group-hover:text-[#ff00ff] transition-colors leading-tight uppercase">
                          {recipe.title}
                        </h3>
                        <p className="text-black font-black font-mono text-xs mb-8 line-clamp-3 flex-grow leading-relaxed uppercase tracking-tighter">
                          // {recipe.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black/10">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest leading-none mb-1">Efficiency</span>
                            <span className="text-xs font-black font-mono text-black">
                               {recipe.time} build
                            </span>
                          </div>
                          <div className="bg-black p-2 border-2 border-black text-[#ccff00] group-hover:rotate-6 transition-all">
                            <ArrowRight className="w-5 h-5 stroke-[3px]" />
                          </div>
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

      {/* Final CTA */}
      <section className="bg-black text-white py-24 border-t-4 border-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
              <h2 className="text-4xl md:text-7xl font-display mb-8 uppercase leading-tight glitch-text" data-text="NEED A CUSTOM BLUEPRINT?">Need a custom <br/>blueprint?</h2>
              <p className="text-xl text-white font-black uppercase mb-12 leading-relaxed font-mono">
                  // I add new workflows every week. If you have a specific bottleneck, let's build it.
              </p>
              <Link href="/" className="bg-[#ccff00] text-black px-12 py-6 border-4 border-white font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none inline-flex items-center gap-4">
                  Back to Hub <ArrowRight className="w-8 h-8 stroke-[3px]" />
              </Link>
          </div>
      </section>

    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allRecipes = getAllRecipes();
  const top500Recipes = allRecipes.slice(0, 500);
  const categories = Array.from(new Set(top500Recipes.map(r => r.category).filter(Boolean))).sort();

  return {
    props: {
      recipes: top500Recipes,
      categories
    },
    revalidate: 3600
  };
};
