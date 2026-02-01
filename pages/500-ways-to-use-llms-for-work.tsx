import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Search, ArrowRight, Layers, Filter, Zap, Target, TrendingUp, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import DatabaseDownloadCta from '../components/DatabaseDownloadCta';
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
  
  const title = "500 Ways to Use LLMs | AI Workflow Generator for Sales & Marketing";
  const description = "Stop prompting, start automating. 500 curated AI blueprints for Sales Ops, SEOs, and Growth Marketers to build autonomous agentic workflows.";
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
      "url": `https://realaiexamples.com/ai-examples/${recipe.id}`
    }))
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
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

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="container mx-auto px-4 mb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-secondary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-mono text-accent mb-6 shadow-sm">
            <Zap className="w-3 h-3 animate-pulse" />
            <span className="tracking-widest uppercase font-bold text-[10px]">Built for Sales & Marketing Tinkerers</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-text-color mb-6 tracking-tight leading-[1.1]">
            500 Ways to Use <br/><span className="text-accent">LLMs for Work</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-10 font-normal">
            Ditch the "AI Hype." These are 500 field-tested blueprints for <strong>Sales Ops, SEOs, and Growth Marketers</strong>. 
            Copy-paste the logic into Gemini CLI or Claude Code and let the agents do the work.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 opacity-80">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
               <Target className="w-4 h-4 text-emerald-400" /> Lead Gen
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
               <TrendingUp className="w-4 h-4 text-blue-400" /> Revenue Ops
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
               <Cpu className="w-4 h-4 text-purple-400" /> SEO Content
            </div>
          </div>
          
          {/* Database Download CTA */}
          <div id="database-download" className="mb-16 max-w-3xl mx-auto">
             <DatabaseDownloadCta />
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-secondary-bg p-4 rounded-xl border border-navy-dark shadow-2xl flex flex-col md:flex-row gap-4 max-w-2xl mx-auto sticky top-24 z-30">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by problem (e.g. 'lead scoring', 'seo audit')..." 
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
              <p className="text-xl text-text-secondary">No blueprints found matching that search.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                className="mt-4 text-accent hover:underline font-bold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-20">
              {sortedCategories.map(category => (
                <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center gap-4 mb-8 border-b border-navy-dark/50 pb-4">
                    <h2 className="text-3xl font-bold text-text-color tracking-tight">{category}</h2>
                    <span className="bg-accent/10 text-accent text-[10px] px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider border border-accent/20">
                      {groupedRecipes[category].length} Blueprints
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedRecipes[category].map(recipe => (
                      <Link 
                        key={recipe.id} 
                        href={`/ai-examples/${recipe.id}`}
                        className="group flex flex-col bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-[0_10px_30px_rgba(56,189,248,0.05)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                           <Zap className="w-6 h-6 text-accent" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-text-color mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          {recipe.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-normal">
                          {recipe.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-navy-dark/30">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-text-secondary/50 tracking-widest">Efficiency</span>
                            <span className="text-xs font-mono text-text-color/80">
                               {recipe.time} build
                            </span>
                          </div>
                          <div className="bg-primary-bg p-2 rounded-lg border border-navy-dark group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                            <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-accent" />
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
      <section className="bg-secondary-bg py-24 border-t border-navy-dark">
          <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-text-color tracking-tight">Need a custom blueprint?</h2>
              <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                  We add new Sales & Marketing workflows every week. If you have a specific bottleneck, 
                  let us know and we'll build the blueprint for you.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-white text-navy-dark px-8 py-4 rounded-lg font-bold hover:bg-slate-200 transition-all shadow-xl">
                  Back to Homepage <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
      </section>

    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allRecipes = getAllRecipes();
  
  // Sort by category or priority if available, then slice to 500
  // For now, we take the first 500 (or however many we have if less)
  const top500Recipes = allRecipes.slice(0, 500);

  // Extract unique categories from these 500
  const categories = Array.from(new Set(top500Recipes.map(r => r.category).filter(Boolean))).sort();

  return {
    props: {
      recipes: top500Recipes,
      categories
    },
    revalidate: 3600
  };
};