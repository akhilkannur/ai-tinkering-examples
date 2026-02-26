import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Terminal, Copy, Check, FileText, Search, X, Download, Lock, Crown, ArrowRight, ExternalLink, Key, Cpu, Clock, MessageSquare
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

    // 2. Editor's Picks (Actual project skills we use)
    const EDITORS_PICKS = [
      'recipe-upgrader',          // Premium
      'tool-directory-manager',   // Premium
      'blog-thumbnail-generator', // Free
      'social-media-publisher',   // Free
      'google-analytics-reporter' // Premium
    ];

    const picks = filtered.filter(r => EDITORS_PICKS.includes(r.id))
      .sort((a, b) => EDITORS_PICKS.indexOf(a.id) - EDITORS_PICKS.indexOf(b.id));
    
    const others = filtered.filter(r => !EDITORS_PICKS.includes(r.id));

    // 3. Sort by Date
    const sortedOthers = others.sort((a, b) => {
      if (a.publish_date && b.publish_date) {
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      }
      return 0;
    });

    // 4. Interleave others: 2 Free : 1 Premium
    const premium = sortedOthers.filter(r => r.isPremium);
    const free = sortedOthers.filter(r => !r.isPremium);

    const mixed: Recipe[] = [];
    let pIndex = 0;
    let fIndex = 0;

    while (fIndex < free.length || pIndex < premium.length) {
       if (fIndex < free.length) mixed.push(free[fIndex++]);
       if (fIndex < free.length) mixed.push(free[fIndex++]);
       if (pIndex < premium.length) mixed.push(premium[pIndex++]);
    }

    return [...picks, ...mixed];
  }, [selectedCategory, searchQuery, recipes]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  const recipesToRender = filteredRecipes.slice(0, visibleCount);
  const part1 = recipesToRender.slice(0, 12);
  const part2 = recipesToRender.slice(12);

  const hasMore = visibleCount < filteredRecipes.length;
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
    const isLocked = !isUnlocked && (recipe.isPremium || index >= 200);
    const isNew = recipe.publish_date && (new Date().getTime() - new Date(recipe.publish_date).getTime() < 7 * 24 * 60 * 60 * 1000);

    return (
      <div
        className={`group text-left bg-white p-6 border-4 border-black brutalist-shadow transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${
            isLocked ? 'opacity-90' : ''
        }`}
        onClick={() => setSelectedRecipe(recipe)}
      >
        <div className="flex justify-between items-start mb-6">
          <div className={`w-12 h-12 bg-black border-2 border-black flex items-center justify-center transition-colors brutalist-shadow-sm ${
              isLocked 
              ? 'text-[#ccff00]' 
              : 'text-[#ff00ff] group-hover:text-[#ccff00]'
          }`}>
            {isLocked ? <Lock className="w-6 h-6 stroke-[3px]" /> : <CatIcon className="w-6 h-6 stroke-[3px]" />}
          </div>
          <div className="flex flex-col items-end gap-2">
            {isNew && (
              <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 border-2 border-black uppercase tracking-tighter transform -rotate-3">
                NEW
              </span>
            )}
            {isLocked && (
                <span className="bg-[#ccff00] text-black border-2 border-black text-[10px] font-black px-2 py-1 uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0px_0px_#000]">
                <Lock className="w-3 h-3 stroke-[3px]" /> Premium
                </span>
            )}
            {recipe.id === 'agent-context-builder' && (
              <span className="text-[10px] uppercase tracking-wider font-black px-2 py-1 bg-black text-[#ccff00] border-2 border-black transform rotate-2">
                 Start Here
              </span>
            )}
            <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-1 bg-gray-100 text-black border-2 border-black`}>
              {recipe.category}
            </span>
          </div>
        </div>
        
        <h3 className={`font-display text-xl mb-4 leading-tight transition-colors ${isLocked ? 'text-black' : 'text-black group-hover:text-[#ff00ff]'}`}>
            {recipe.title}
        </h3>
        <p className="text-black font-black font-mono text-xs mb-6 min-h-[40px] leading-relaxed uppercase">
          // {recipe.tagline}
        </p>

        {/* INGREDIENTS LIST (NEEDS / GETS) */}
        {(recipe.inputs || recipe.outputs) && (
          <div className="mb-6 space-y-3 bg-gray-50 p-3 border-2 border-black border-dashed">
            {recipe.inputs && (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-black/40 uppercase tracking-widest">Needs (Ingredients):</span>
                <div className="flex flex-wrap gap-1">
                  {recipe.inputs.map(input => (
                    <span key={input} className="text-[10px] font-bold bg-white px-1.5 py-0.5 border border-black">{input}</span>
                  ))}
                </div>
              </div>
            )}
            {recipe.outputs && (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-black/40 uppercase tracking-widest">Gets (Result):</span>
                <div className="flex flex-wrap gap-1">
                  {recipe.outputs.map(output => (
                    <span key={output} className="text-[10px] font-bold bg-white px-1.5 py-0.5 border border-black text-[#ff00ff]">{output}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t-2 border-black/10 text-[10px] font-black font-mono uppercase tracking-widest">
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Controls: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white border-4 border-black p-6 brutalist-shadow md:sticky md:top-24 z-30">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-black stroke-[3px]" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-2 border-black bg-gray-50 text-black font-black uppercase text-sm placeholder-gray-400 focus:outline-none focus:bg-[#ccff00] transition-all"
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
              className={`px-6 py-2 border-2 border-black font-display text-xs uppercase transition-all brutalist-shadow-sm ${
                selectedCategory === cat 
                  ? 'bg-black text-[#ccff00]' 
                  : 'bg-white text-black hover:bg-[#ccff00]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 text-black text-xs font-black uppercase tracking-[0.2em] pl-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span>Showing {recipesToRender.length} of {filteredRecipes.length} recipes</span>
          {!isUnlocked && (
            <div className="flex items-center gap-2 bg-black text-[#ccff00] px-3 py-1 border-2 border-black transform -rotate-1">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span className="text-[10px]">Premium Available</span>
            </div>
          )}
        </div>
        {isUnlocked && (
           <div className="flex items-center gap-2 px-4 py-1.5 bg-black text-[#ccff00] border-2 border-black transform rotate-1 animate-pulse">
             <Crown className="w-4 h-4 stroke-[3px]" />
             <span className="text-[10px]">Premium Active</span>
           </div>
        )}
      </div>

      <div className="relative">
        
        {/* Editor's Picks / Go-To Skills */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-black text-[#ccff00] border-2 border-black px-4 py-1 font-display text-lg uppercase transform -rotate-1 brutalist-shadow-sm">
              My Go-To Skills
            </div>
            <div className="flex-grow h-1 bg-black/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {part1.slice(0, 5).map((recipe, index) => (
               <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        </div>

        {/* The rest of the library */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-black text-white border-2 border-black px-4 py-1 font-display text-lg uppercase transform rotate-1 brutalist-shadow-sm">
            The Library
          </div>
          <div className="flex-grow h-1 bg-black/10"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {part1.slice(5).map((recipe, index) => (
             <RecipeCard key={recipe.id} recipe={recipe} index={index + 5} />
          ))}
        </div>

        {/* Part 2: Remaining items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {part2.map((recipe, index) => (
             <RecipeCard key={recipe.id} recipe={recipe} index={index + 12} />
          ))}
        </div>

        {hasMore && (
            <div className="text-center mb-20">
                <button 
                    onClick={handleLoadMore}
                    className="bg-black text-[#ccff00] font-display text-xl uppercase py-6 px-12 border-4 border-black brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                    Load More ({filteredRecipes.length - visibleCount} remaining)
                </button>
            </div>
        )}
        
        {showPaywallOverlay && (
            <div className="relative mt-12 mb-32 text-center">
                <div className="absolute inset-0 flex items-center justify-center -top-32 bg-gradient-to-t from-primary-bg via-primary-bg/95 to-transparent z-10 pointer-events-none h-[400px]"></div>
                <div className="relative z-20 bg-white border-4 border-black p-8 brutalist-shadow max-w-lg mx-auto">
                   {!showLicenseInput ? (
                      <>
                        <h3 className="text-2xl font-display text-black mb-4 uppercase leading-none">Unlock the Full Library</h3>
                        <p className="text-black font-bold uppercase text-xs mb-6 leading-relaxed font-mono">
                            // Get all 500+ as 5 consolidated files for non-technical builders.<br/>
                            // One-time payment. Works with Claude Code, Gemini CLI, and all major agentic tools.
                        </p>
                        <Link
                          href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                          className="w-full bg-[#ff00ff] text-white border-4 border-black font-display text-lg uppercase py-4 brutalist-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all inline-flex items-center justify-center gap-2 mb-4"
                        >
                            Get the 5 Files ($39) <ArrowRight className="w-5 h-5 stroke-[3px]" />
                        </Link>
                        <button
                          onClick={() => setShowLicenseInput(true)}
                          className="text-xs font-black font-mono text-black uppercase underline decoration-2 underline-offset-4 hover:text-[#ff00ff] transition-colors"
                        >
                          I have a license key
                        </button>
                      </>
                   ) : (
                      <form onSubmit={handleLicenseSubmit} className="animate-fade-in max-w-sm mx-auto">
                        <div className="flex items-center justify-between mb-6 border-b-2 border-black pb-3">
                           <h3 className="text-lg font-display uppercase tracking-tight">Enter License</h3>
                           <button type="button" onClick={() => setShowLicenseInput(false)} className="p-1 hover:bg-gray-100 transition-all">
                             <X className="w-6 h-6 text-black stroke-[3px]" />
                           </button>
                        </div>
                        <div className="mb-6">
                           <input
                             type="text"
                             value={licenseKeyInput}
                             onChange={(e) => setLicenseKeyInput(e.target.value)}
                             placeholder="TK-XXXX-XXXX-XXXX"
                             className="w-full bg-gray-50 border-2 border-black text-black font-display text-lg px-4 py-3 focus:outline-none focus:bg-[#ccff00] text-center uppercase tracking-widest placeholder-gray-300"
                           />
                           {unlockError && <p className="text-red-600 font-black font-mono text-xs mt-3 uppercase animate-pulse tracking-tighter">⚠️ {unlockError}</p>}
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-black text-[#ccff00] border-2 border-black font-display text-lg uppercase py-3 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                          <Key className="w-5 h-5 stroke-[3px]" /> Activate
                        </button>
                      </form>
                   )}
                </div>
            </div>
        )}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-24 bg-white border-4 border-black brutalist-shadow">
          <Search className="w-20 h-20 text-gray-200 mx-auto mb-8 stroke-[3px]" />
          <h3 className="text-3xl font-display text-black mb-4 uppercase">No blueprints found</h3>
          <p className="text-black font-black font-mono uppercase text-sm tracking-widest">// Try searching for "PDF", "Excel", or "Scrape".</p>
          <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-10 bg-[#ccff00] border-2 border-black px-8 py-3 font-display uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">Clear Filters</button>
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-white border-4 border-black brutalist-shadow w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative" onClick={e => e.stopPropagation()}>
            <div className={`p-8 border-b-4 border-black flex justify-between items-center ${selectedRecipe.isPremium && !isUnlocked ? 'bg-[#ccff00]/10' : 'bg-white'}`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 bg-black flex items-center justify-center border-2 border-black brutalist-shadow-sm ${selectedRecipe.isPremium && !isUnlocked ? 'text-[#ccff00] shadow-[#ccff00]' : 'text-[#ff00ff] shadow-[#ff00ff]'}`}>
                   {selectedRecipe.isPremium && !isUnlocked ? <Lock className="w-10 h-10 stroke-[3px]" /> : React.createElement(categoryIcons[selectedRecipe.category] || Terminal, { className: "w-10 h-10 stroke-[3px]" })}
                </div>
                <div>
                  <h2 className="text-3xl font-display text-black flex items-center gap-4 uppercase leading-none">
                    {selectedRecipe.title}
                    {selectedRecipe.isPremium && !isUnlocked && <Lock className="w-6 h-6 text-black stroke-[3px]" />}
                  </h2>
                  <div className="flex items-center gap-6 mt-3 font-black font-mono text-[10px] uppercase tracking-widest text-gray-500">
                    <Link href={`/skills/${selectedRecipe.id}`} onClick={() => setSelectedRecipe(null)} className="flex items-center gap-2 hover:text-[#ff00ff] transition-colors bg-gray-100 px-2 py-1 border border-black">
                      <ExternalLink className="w-3 h-3" /> Full Page
                    </Link>
                    <span>ID: {selectedRecipe.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all"><X className="w-10 h-10 text-black stroke-[3px]" /></button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
              <div className="mb-10">
                <p className="text-xl text-black font-bold uppercase leading-tight border-l-8 border-[#ccff00] pl-6 py-2 bg-gray-50">{selectedRecipe.description}</p>
                <div className="flex gap-4 mt-6">
                  <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-black text-[10px] font-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Web UI / Chat
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-black text-[10px] font-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    CLI / Agents
                  </div>
                </div>
              </div>

              {(!isUnlocked && (selectedRecipe.isPremium || recipes.indexOf(selectedRecipe) >= 200)) ? (
                <div className="bg-black text-white border-4 border-black p-12 text-center brutalist-shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white flex items-center justify-center mx-auto mb-8 border-4 border-black rotate-3 brutalist-shadow-sm">
                      <Lock className="w-10 h-10 text-black stroke-[3px]" />
                    </div>
                    <h3 className="text-4xl font-display text-white mb-4 uppercase leading-none">Access Denied</h3>
                    <p className="text-white/60 font-black font-mono text-xs mb-10 uppercase tracking-widest">// This blueprint is reserved for Pro members.</p>
                    <a href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-[#ccff00] text-black px-10 py-5 border-4 border-white font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none">Unlock Now <ArrowRight className="w-8 h-8 stroke-[3px]" /></a>
                  </div>
                </div>
              ) : (
                <>
                  {/* TWO PATHS SECTOR */}
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {/* Path 1: Browser */}
                    <div className="border-4 border-black p-6 bg-white brutalist-shadow-sm flex flex-col hover:bg-emerald-50 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <MessageSquare className="w-6 h-6 text-emerald-600" />
                        <h4 className="font-display text-lg uppercase">Browser Mode</h4>
                      </div>
                      <p className="text-[10px] font-black font-mono uppercase text-gray-500 mb-6 leading-relaxed">
                        // Best for ChatGPT, Claude.ai, or Gemini web apps. Just paste and go.
                      </p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(selectedRecipe.blueprint);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`w-full py-4 border-2 border-black font-display text-sm uppercase transition-all ${copied ? 'bg-emerald-400' : 'bg-black text-[#ccff00] hover:bg-emerald-500 hover:text-white'}`}
                      >
                        {copied ? 'Copied!' : 'Copy for Chat'}
                      </button>
                    </div>

                    {/* Path 2: Agent */}
                    <div className="border-4 border-black p-6 bg-white brutalist-shadow-sm flex flex-col hover:bg-blue-50 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <Terminal className="w-6 h-6 text-blue-600" />
                        <h4 className="font-display text-lg uppercase">Agent Mode</h4>
                      </div>
                      <p className="text-[10px] font-black font-mono uppercase text-gray-500 mb-6 leading-relaxed">
                        // Best for Claude Code, Gemini CLI, or Cursor. Optimized for local files.
                      </p>
                      <button 
                        onClick={() => {
                          const fullBlueprint = `---\nid: ${selectedRecipe.id}\ncategory: ${selectedRecipe.category}\n---\n\n${selectedRecipe.blueprint}`;
                          navigator.clipboard.writeText(fullBlueprint);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`w-full py-4 border-2 border-black font-display text-sm uppercase transition-all ${copied ? 'bg-blue-400' : 'bg-black text-[#ccff00] hover:bg-blue-500 hover:text-white'}`}
                      >
                        {copied ? 'Copied!' : 'Copy as Agent Skill'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-black border-4 border-black overflow-hidden brutalist-shadow-sm">
                    <div className="bg-white px-6 py-3 flex items-center justify-between border-b-4 border-black">
                      <span className="text-black font-black font-mono text-xs flex items-center gap-3 uppercase tracking-widest"><FileText className="w-4 h-4" /> INSTRUCTION_LOGIC.md</span>
                      <div className="flex items-center gap-4">
                        {selectedRecipe.sampleData && (
                          <button onClick={handleDownload} className="text-[10px] font-black uppercase px-3 py-1.5 border-2 border-black bg-[#ccff00] text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all brutalist-shadow-sm"><Download className="w-3 h-3 stroke-[3px]" /> Sample</button>
                        )}
                      </div>
                    </div>
                    <div className="p-8 max-h-[250px] overflow-y-auto custom-scrollbar bg-black">
                      <pre className="font-mono text-sm text-[#00ffff] whitespace-pre-wrap leading-relaxed">{selectedRecipe.blueprint}</pre>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-[#ccff00]/10 border-4 border-black border-dashed">
                     <div className="flex gap-4 items-start mb-6">
                        <div className="bg-black text-[#ccff00] w-8 h-8 flex items-center justify-center flex-shrink-0 font-display text-xl border-2 border-black transform rotate-12">!</div>
                        <div>
                          <h4 className="font-display text-lg uppercase mb-1">Execution Path</h4>
                          <p className="text-xs text-black font-black font-mono uppercase leading-relaxed tracking-tighter">
                             Browser: Paste into chat. <br/>
                             Agent: Save as .md in your project and tell AI to use it.
                          </p>
                        </div>
                     </div>
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
