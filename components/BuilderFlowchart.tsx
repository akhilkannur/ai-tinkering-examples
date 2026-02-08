import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Terminal, Copy, Check, FileText, Search, X, Download, Lock, Crown, ArrowRight, ExternalLink, Key, Zap, MousePointer2, Cpu
} from 'lucide-react';
import { categoryIcons, Category, Recipe } from '../lib/cookbook-data';

interface TerminalCookbookProps {
  recipes: Recipe[];
}

const TerminalCookbook = ({ recipes }: TerminalCookbookProps) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [copied, setCopied] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  
  // Paywall State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLicenseInput, setShowLicenseInput] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const categories: (Category | 'All')[] = ['All', ...Object.keys(categoryIcons) as Category[]];

  // Check for License Key on Mount & URL changes
  useEffect(() => {
    const hasAccess = localStorage.getItem('terminal_cookbook_premium_v2') === 'true';
    if (hasAccess) {
      setIsUnlocked(true);
    }

    if (router.isReady) {
      const { license_key } = router.query;
      if (license_key === 'TK-8821-XPRO-MQ') {
        setIsUnlocked(true);
        localStorage.setItem('terminal_cookbook_premium_v2', 'true');
        router.replace('/', undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query]);

  const handleLicenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (licenseKeyInput.trim() === 'TK-8821-XPRO-MQ') {
      setIsUnlocked(true);
      localStorage.setItem('terminal_cookbook_premium_v2', 'true');
      setShowLicenseInput(false);
      setUnlockError('');
    } else {
      setUnlockError('Invalid license key. Please check your purchase email.');
    }
  };

  const filteredRecipes = useMemo(() => {
    // 1. Filter
    const filtered = recipes.filter(recipe => {
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = 
        (recipe.title?.toLowerCase() || '').includes(lowerQuery) ||
        (recipe.description?.toLowerCase() || '').includes(lowerQuery) ||
        (recipe.tagline?.toLowerCase() || '').includes(lowerQuery);
      return matchesCategory && matchesSearch;
    });

    // 2. Sort by Date first (to prepare for mixing)
    const sortedByDate = filtered.sort((a, b) => {
      if (a.id === 'agent-context-builder') return -1;
      if (b.id === 'agent-context-builder') return 1;
      if (a.publish_date && b.publish_date) {
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      }
      return 0;
    });

    // 3. Separate & Mix
    // We want to interleave Free and Premium to show variety.
    // Strategy: 2 Free : 1 Premium
    const priority = sortedByDate.filter(r => r.id === 'agent-context-builder');
    const others = sortedByDate.filter(r => r.id !== 'agent-context-builder');

    const premium = others.filter(r => r.isPremium);
    const free = others.filter(r => !r.isPremium);

    const mixed: Recipe[] = [];
    let pIndex = 0;
    let fIndex = 0;

    // While we have items in either list
    while (fIndex < free.length || pIndex < premium.length) {
       // Add 2 Free
       if (fIndex < free.length) mixed.push(free[fIndex++]);
       if (fIndex < free.length) mixed.push(free[fIndex++]);
       
       // Add 1 Premium
       if (pIndex < premium.length) mixed.push(premium[pIndex++]);
    }

    return [...priority, ...mixed];
  }, [selectedCategory, searchQuery, recipes]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  const recipesToRender = filteredRecipes.slice(0, visibleCount);
  const part1 = recipesToRender.slice(0, 12);
  const part2 = recipesToRender.slice(12);

  const hasMore = visibleCount < filteredRecipes.length;
  // Always show the paywall/upsell at the bottom for non-pro users, regardless of list size
  const showPaywallOverlay = !isUnlocked;

  const handleCopy = () => {
    if (!selectedRecipe || (selectedRecipe.isPremium && !isUnlocked)) return;
    navigator.clipboard.writeText(selectedRecipe.blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    if (!selectedRecipe || !selectedRecipe.sampleData || (selectedRecipe.isPremium && !isUnlocked)) return;
    const blob = new Blob([selectedRecipe.sampleData.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedRecipe.sampleData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const RecipeCard = ({ recipe, index }: { recipe: Recipe, index: number }) => {
    const CatIcon = categoryIcons[recipe.category] || Terminal;
    // Calculate global index for locking logic based on original filtered list, or just check isPremium
    // NOTE: Index-based locking (>= 200) might be slightly offset by mixing, but 200 is deep enough it doesn't matter much.
    // We'll trust isPremium flag primarily.
    const isLocked = !isUnlocked && (recipe.isPremium || index >= 200);
    const isNew = recipe.publish_date && (new Date().getTime() - new Date(recipe.publish_date).getTime() < 7 * 24 * 60 * 60 * 1000);

    return (
      <div
        className={`group text-left bg-secondary-bg p-6 rounded-none border-4 transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer ${
            isLocked 
            ? 'border-black/50 opacity-80 hover:opacity-100 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]' 
            : 'border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
        }`}
        onClick={() => setSelectedRecipe(recipe)}
      >
        {/* Visual indicator bar */}
        <div className={`absolute top-0 left-0 w-2 h-full opacity-60 group-hover:opacity-100 transition-opacity ${
          isLocked ? 'bg-black' :
          recipe.category === 'Lead Gen' ? 'bg-blue-600' :
          recipe.category === 'Sales Ops' ? 'bg-indigo-600' :
          recipe.category === 'Marketing Ops' ? 'bg-orange-600' :
          recipe.category === 'Content Ops' ? 'bg-pink-600' :
          recipe.category === 'SEO' ? 'bg-green-600' :
          recipe.category === 'Competitive Intel' ? 'bg-red-600' :
          recipe.category === 'CRO' ? 'bg-cyan-600' :
          recipe.category === 'Paid Media' ? 'bg-purple-600' :
          recipe.category === 'Customer Success' ? 'bg-teal-600' :
          recipe.category === 'Retention' ? 'bg-rose-600' :
          recipe.category === 'E-commerce' ? 'bg-amber-600' :
          'bg-gray-600'
        }`} />

        <div className="flex justify-between items-start mb-4 pl-3">
          <div className={`p-3 rounded-none transition-colors shadow-sm ${
              isLocked 
              ? 'bg-black/10 text-black border-2 border-black/20' 
              : 'bg-black text-accent border-2 border-black group-hover:bg-accent group-hover:text-black'
          }`}>
            {isLocked ? <Lock className="w-5 h-5" /> : <CatIcon className="w-5 h-5" />}
          </div>
          <div className="flex flex-col items-end gap-2">
            {isNew && (
              <span className="bg-primary-bg text-white text-[9px] font-black px-2 py-0.5 border-2 border-black uppercase tracking-tighter animate-pulse">
                NEW
              </span>
            )}
            {isLocked && (
                <span className="bg-black text-yellow-400 border-2 border-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Lock className="w-3 h-3" /> Premium
                </span>
            )}
            {recipe.id === 'agent-context-builder' && (
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-indigo-600 text-white border-2 border-black">
                 Start Here
              </span>
            )}
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-black text-white border-2 border-black`}>
              {recipe.category}
            </span>
          </div>
        </div>
        
        <h3 className={`text-xl font-headline font-bold mb-2 leading-tight pl-3 transition-colors text-black uppercase`}>
            {recipe.title}
        </h3>
        <p className="text-black/80 text-sm font-mono mb-4 min-h-[40px] pl-3 line-clamp-2 leading-relaxed">
          {recipe.tagline}
        </p>
        
        <div className="mt-auto pt-4 border-t-2 border-black border-dashed flex items-center justify-between text-xs font-bold font-mono text-black/60 pl-3">
           <span className={`px-2 py-0.5 border-2 border-black ${
              recipe.difficulty === 'Beginner' ? 'text-green-700 bg-green-100' : 
              recipe.difficulty === 'Intermediate' ? 'text-orange-700 bg-orange-100' : 
              'text-red-700 bg-red-100'
           }`}>
             {recipe.difficulty}
           </span>
           <span className="font-mono">{recipe.time}</span>
        </div>
      </div>
           <span className={`px-2 py-0.5 rounded ${
              recipe.difficulty === 'Beginner' ? 'text-green-400 bg-green-400/10' : 
              recipe.difficulty === 'Intermediate' ? 'text-yellow-400 bg-yellow-400/10' : 
              'text-red-400 bg-red-400/10'
           }`}>
             {recipe.difficulty}
           </span>
           <span className="font-mono">{recipe.time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Controls: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between bg-black p-6 rounded-none border-4 border-black sticky top-24 z-30 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-accent" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-2 border-accent rounded-none leading-5 bg-black text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 ease-in-out font-mono text-sm"
            placeholder="Search 700+ blueprints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto gap-3 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-none text-xs font-black whitespace-nowrap transition-all border-2 uppercase tracking-widest ${
                selectedCategory === cat 
                  ? 'bg-accent text-black border-accent shadow-[4px_4px_0px_rgba(255,255,255,0.1)]' 
                  : 'bg-black text-white border-white/20 hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-text-secondary text-sm font-medium pl-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Showing {recipesToRender.length} of {filteredRecipes.length} recipes</span>
          {!isUnlocked && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Premium Available</span>
            </div>
          )}
        </div>
        {isUnlocked && (
           <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 text-green-400 rounded-full border border-green-500/20 animate-pulse">
             <Crown className="w-4 h-4" />
             <span className="text-xs font-bold uppercase tracking-wider">Premium Active</span>
           </div>
        )}
      </div>

      <div className="relative">
        
        {/* Part 1: First 12 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {part1.map((recipe, index) => (
             <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </div>

        {/* Part 2: Remaining items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {part2.map((recipe, index) => (
             <RecipeCard key={recipe.id} recipe={recipe} index={index + 12} />
          ))}
        </div>

        {hasMore && (
            <div className="text-center mb-12">
                <button 
                    onClick={handleLoadMore}
                    className="bg-accent hover:bg-accent-hover text-black font-black py-4 px-10 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-widest text-sm hover:shadow-none hover:translate-y-1"
                >
                    Load More Recipes ({filteredRecipes.length - visibleCount} remaining)
                </button>
            </div>
        )}
        
        {showPaywallOverlay && (
            <div className="relative mt-12 mb-20 text-center">
                <div className="absolute inset-0 flex items-center justify-center -top-32 bg-gradient-to-t from-primary-bg via-primary-bg/95 to-transparent z-10 pointer-events-none h-[400px]"></div>
                <div className="relative z-20 bg-secondary-bg text-black p-10 rounded-none shadow-[12px_12px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto border-4 border-black transform hover:scale-[1.01] transition-transform">
                   {!showLicenseInput ? (
                      <>
                        <div className="w-20 h-20 bg-black text-accent rounded-none flex items-center justify-center mx-auto mb-6 border-4 border-black">
                            <Lock className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl font-bold mb-3 font-headline uppercase">Unlock All 700+ Specialized Blueprints</h3>
                        <p className="text-black/70 mb-8 leading-relaxed text-lg max-w-lg mx-auto font-mono">
                            You've seen the list. Now get the full library. <br/>
                            Instant access to our growing database - plus the <strong>Master Cookbook (JSON)</strong> to load all 700+ as context in one file.
                        </p>
                        <a 
                          href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-12 bg-black text-white font-black py-4 border-4 border-black hover:bg-gray-900 transition-colors shadow-[6px_6px_0px_rgba(0,0,0,0.2)] inline-flex items-center justify-center gap-2 group mb-6 uppercase tracking-widest"
                        >
                            Get Full Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <br/>
                        <button 
                          onClick={() => setShowLicenseInput(true)}
                          className="text-sm text-black/50 hover:text-black underline underline-offset-4 transition-colors font-mono"
                        >
                          I have a license key
                        </button>
                      </>
                   ) : (
                      <form onSubmit={handleLicenseSubmit} className="animate-fade-in max-w-sm mx-auto">
                        <div className="flex items-center justify-between mb-6">
                           <h3 className="text-xl font-bold">Enter License Key</h3>
                           <button type="button" onClick={() => setShowLicenseInput(false)} className="text-text-secondary hover:text-white">
                             <X className="w-6 h-6" />
                           </button>
                        </div>
                        <div className="mb-6">
                           <input 
                             type="text" 
                             value={licenseKeyInput}
                             onChange={(e) => setLicenseKeyInput(e.target.value)}
                             placeholder="TK-XXXX-XXXX-XXXX"
                             className="w-full bg-primary-bg border border-navy-dark text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-sans text-center uppercase tracking-widest placeholder-text-secondary/30 text-lg"
                           />
                           {unlockError && <p className="text-red-400 text-sm mt-3">{unlockError}</p>}
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
                        >
                          <Key className="w-5 h-5" /> Activate License
                        </button>
                      </form>
                   )}
                </div>
            </div>
        )}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-20 bg-secondary-bg rounded-2xl border border-navy-dark">
          <Search className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-text-color mb-2">No recipes found</h3>
          <p className="text-text-secondary">Try searching for "PDF", "Excel", or "Scrape".</p>
          <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-6 text-accent font-bold hover:underline">Clear Filters</button>
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-primary-bg rounded-none shadow-[20px_20px_0px_rgba(0,0,0,0.5)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border-8 border-black" onClick={e => e.stopPropagation()}>
            <div className={`p-8 border-b-4 border-black flex justify-between items-center ${selectedRecipe.isPremium && !isUnlocked ? 'bg-black text-yellow-400' : 'bg-secondary-bg text-black'}`}>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-none shadow-sm border-4 ${selectedRecipe.isPremium && !isUnlocked ? 'bg-black border-yellow-400 text-yellow-400' : 'bg-black border-black text-accent'}`}>
                   {selectedRecipe.isPremium && !isUnlocked ? <Crown className="w-8 h-8" /> : React.createElement(categoryIcons[selectedRecipe.category] || Terminal, { className: "w-8 h-8" })}
                </div>
                <div>
                  <h2 className="text-3xl font-black flex items-center gap-3 font-headline uppercase">
                    {selectedRecipe.title}
                    {selectedRecipe.isPremium && !isUnlocked && <Lock className="w-6 h-6 text-yellow-400" />}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-primary-bg text-sm font-black hover:underline flex items-center gap-2">
                      <Link href={`/skills/${selectedRecipe.id}`} onClick={() => setSelectedRecipe(null)} className="flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" /> Full Page
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="p-3 hover:bg-black hover:text-white transition-colors border-4 border-black"><X className="w-8 h-8" /></button>
            </div>

            <div className="p-8 overflow-y-auto bg-white text-black font-mono">
              <div className="mb-10">
                <p className="text-black/80 leading-relaxed text-xl">{selectedRecipe.description}</p>
              </div>

              {(!isUnlocked && (selectedRecipe.isPremium || recipes.indexOf(selectedRecipe) >= 200)) ? (
                <div className="bg-black text-white p-10 text-center border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.2)] relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-yellow-400/10 rounded-none flex items-center justify-center mx-auto mb-8 border-4 border-yellow-400">
                      <Lock className="w-10 h-10 text-yellow-400" />
                    </div>
                    <h3 className="text-4xl font-black mb-4 font-headline uppercase">Unlock this Blueprint</h3>
                    <p className="text-white/70 mb-10 max-w-md mx-auto font-mono">Get access to this workflow and 500+ others by joining Pro.</p>
                    <a href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-5 border-4 border-black font-black text-xl uppercase tracking-widest shadow-[6px_6px_0px_rgba(255,255,255,0.1)] transition-all">Unlock Now <ArrowRight className="w-6 h-6" /></a>
                  </div>
                </div>
              ) : (
                <>
                  {/* POWER USER SECTION: DOWNLOAD SKILLS */}
                  <div className="bg-black text-white p-8 mb-10 border-4 border-black relative overflow-hidden group">
                      <div className="relative z-10">
                          <div className="flex flex-col gap-6">
                              <div className="flex items-center justify-between">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border-2 border-accent text-accent font-black text-xs uppercase tracking-widest font-mono">
                                      <Cpu className="w-4 h-4" /> Agent-Ready
                                  </div>
                                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest">v2.0 Optimized</span>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <a 
                                      href={`/downloads/skills/${selectedRecipe.id}.skill`}
                                      download
                                      className="flex items-center justify-center gap-3 bg-accent text-black px-4 py-3 border-4 border-black font-black text-sm hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.1)] uppercase tracking-widest"
                                  >
                                      <Zap className="w-4 h-4 fill-current" /> Gemini
                                  </a>
                                  <a 
                                      href={`/downloads/skills/${selectedRecipe.id}-claude.md`}
                                      download
                                      className="flex items-center justify-center gap-3 bg-white text-black px-4 py-3 border-4 border-black font-black text-sm hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.2)] uppercase tracking-widest"
                                  >
                                      <Terminal className="w-4 h-4" /> Claude
                                  </a>
                                  <a 
                                      href={`/downloads/skills/${selectedRecipe.id}.cursorrules`}
                                      download
                                      className="flex items-center justify-center gap-3 bg-black text-white px-4 py-3 border-4 border-white font-black text-sm hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.1)] uppercase tracking-widest"
                                  >
                                      <MousePointer2 className="w-4 h-4" /> Cursor
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="bg-black text-blue-300 border-4 border-black shadow-inner">
                    <div className="bg-black px-6 py-3 flex items-center justify-between border-b-4 border-black">
                      <span className="text-white/60 font-mono text-xs flex items-center gap-2 uppercase tracking-widest font-black"><FileText className="w-4 h-4" /> BLUEPRINT.md</span>
                      <div className="flex items-center gap-3">
                        {selectedRecipe.sampleData && (
                          <button onClick={handleDownload} className="text-xs font-black px-4 py-2 border-2 border-accent text-accent bg-black hover:bg-accent hover:text-black transition-all uppercase tracking-widest">Sample</button>
                        )}
                        <button onClick={handleCopy} className={`text-xs font-black px-4 py-2 border-2 transition-all uppercase tracking-widest ${copied ? 'bg-green-600 text-white border-green-600' : 'bg-white text-black border-white hover:bg-gray-200'}`}>{copied ? 'Copied!' : 'Copy'}</button>
                      </div>
                    </div>
                    <div className="p-8 max-h-[400px] overflow-y-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed">{selectedRecipe.blueprint}</pre>
                    </div>
                  </div>
                  <div className="mt-8 p-6 flex gap-4 items-start border-4 border-black bg-accent/10">
                     <div className="bg-black text-accent w-8 h-8 flex items-center justify-center flex-shrink-0 font-black text-lg border-2 border-black">!</div>
                     <p className="text-base text-black font-mono font-bold">1. Copy the blueprint. {selectedRecipe.sampleData ? `2. Download ${selectedRecipe.sampleData.filename}.` : ""} 3. Tell AI: "Read the blueprint {selectedRecipe.sampleData ? "and use the sample file " : ""}to build this."</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalCookbook;