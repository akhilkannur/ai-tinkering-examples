import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Terminal, Copy, Check, FileText, Search, X, Download, Lock, Crown, ArrowRight, ExternalLink, Key
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
  const [visibleCount, setVisibleCount] = useState(100);
  
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
    const filtered = recipes.filter(recipe => {
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const matchesSearch = 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (a.id === 'agent-context-builder') return -1;
      if (b.id === 'agent-context-builder') return 1;
      if (a.publish_date && b.publish_date) {
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, recipes]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 100);
  };

  const recipesToRender = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;
  const showPaywallOverlay = !isUnlocked && filteredRecipes.length > 100;

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

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Controls: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between bg-secondary-bg p-4 rounded-xl border border-navy-dark sticky top-24 z-30 shadow-xl shadow-black/20">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-secondary" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-navy-dark rounded-lg leading-5 bg-primary-bg text-text-color placeholder-text-secondary/50 focus:outline-none focus:bg-primary-bg focus:ring-1 focus:ring-accent focus:border-accent transition duration-150 ease-in-out font-sans"
            placeholder="Search 600+ blueprints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' 
                  : 'bg-primary-bg text-text-secondary border-navy-dark hover:border-text-secondary hover:text-text-color'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {recipesToRender.map((recipe, index) => {
            const CatIcon = categoryIcons[recipe.category] || Terminal;
            const isLocked = !isUnlocked && (index >= 200 || recipe.isPremium);
            
            // Logic for "NEW" badge (published in last 7 days)
            const isNew = recipe.publish_date && (new Date().getTime() - new Date(recipe.publish_date).getTime() < 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div
                key={recipe.id}
                className={`group text-left bg-secondary-bg p-6 rounded-xl border transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer ${
                    isLocked 
                    ? 'border-yellow-900/30 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] opacity-80 hover:opacity-100' 
                    : 'border-navy-dark hover:shadow-[0_0_30px_rgba(244,63,94,0.1)] hover:border-accent/50 hover:-translate-y-1'
                }`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                {/* Visual indicator bar */}
                <div className={`absolute top-0 left-0 w-1 h-full opacity-60 group-hover:opacity-100 transition-opacity ${
                  isLocked ? 'bg-yellow-500' :
                  recipe.category === 'Lead Gen' ? 'bg-blue-500' :
                  recipe.category === 'Sales Ops' ? 'bg-indigo-500' :
                  recipe.category === 'Marketing Ops' ? 'bg-orange-500' :
                  recipe.category === 'Content Ops' ? 'bg-pink-500' :
                  recipe.category === 'SEO' ? 'bg-green-500' :
                  recipe.category === 'Competitive Intel' ? 'bg-red-500' :
                  recipe.category === 'CRO' ? 'bg-cyan-500' :
                  recipe.category === 'Paid Media' ? 'bg-purple-500' :
                  recipe.category === 'Customer Success' ? 'bg-teal-500' :
                  recipe.category === 'Retention' ? 'bg-rose-500' :
                  recipe.category === 'E-commerce' ? 'bg-amber-500' :
                  'bg-gray-500'
                }`} />

                <div className="flex justify-between items-start mb-4 pl-3">
                  <div className={`p-3 rounded-lg transition-colors shadow-sm ${
                      isLocked 
                      ? 'bg-yellow-900/20 text-yellow-500 border border-yellow-500/20' 
                      : 'bg-primary-bg text-text-secondary group-hover:text-accent border border-navy-dark group-hover:border-accent/30'
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : <CatIcon className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isNew && (
                      <span className="bg-accent text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse">
                        NEW
                      </span>
                    )}
                    {isLocked && (
                        <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Premium
                        </span>
                    )}
                    {recipe.id === 'agent-context-builder' && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                         Start Here
                      </span>
                    )}
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm bg-primary-bg text-text-secondary border border-navy-dark`}>
                      {recipe.category}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-lg font-bold mb-2 leading-tight pl-3 transition-colors ${isLocked ? 'text-text-color group-hover:text-yellow-400' : 'text-text-color group-hover:text-accent'}`}>
                    {recipe.title}
                </h3>
                <p className="text-text-secondary text-sm font-medium mb-4 min-h-[40px] pl-3 line-clamp-2 leading-relaxed opacity-80">
                  {recipe.tagline}
                </p>
                
                <div className="mt-auto pt-4 border-t border-navy-dark flex items-center justify-between text-xs text-text-secondary/50 pl-3">
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
          })}
        </div>

        {hasMore && (
            <div className="text-center mb-12">
                <button 
                    onClick={handleLoadMore}
                    className="bg-secondary-bg hover:bg-navy-light text-text-color font-bold py-3 px-8 rounded-lg transition-colors border border-navy-dark hover:border-text-secondary"
                >
                    Load More Recipes ({filteredRecipes.length - visibleCount} remaining)
                </button>
            </div>
        )}
        
        {showPaywallOverlay && (
            <div className="relative mt-12 mb-20 text-center">
                <div className="absolute inset-0 flex items-center justify-center -top-32 bg-gradient-to-t from-primary-bg via-primary-bg/95 to-transparent z-10 pointer-events-none h-[400px]"></div>
                <div className="relative z-20 bg-secondary-bg text-text-color p-10 rounded-2xl shadow-2xl max-w-2xl mx-auto border border-navy-dark transform hover:scale-[1.01] transition-transform">
                   {!showLicenseInput ? (
                      <>
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] border-4 border-secondary-bg">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-3 font-headline">Unlock {Math.max(0, filteredRecipes.length - 200)}+ Advanced Blueprints</h3>
                        <p className="text-text-secondary mb-8 leading-relaxed text-lg max-w-lg mx-auto">
                            You've seen the list. Now get the code. <br/>
                            Instant access to the full library of Sales, Marketing, and SEO agents.
                        </p>
                        <a 
                          href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-12 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-flex items-center justify-center gap-2 group mb-6"
                        >
                            Get Full Access <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                        </a>
                        <br/>
                        <button 
                          onClick={() => setShowLicenseInput(true)}
                          className="text-sm text-text-secondary hover:text-white underline decoration-text-secondary/50 underline-offset-4 transition-colors"
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
          <div className="bg-primary-bg rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-navy-dark" onClick={e => e.stopPropagation()}>
            <div className={`p-6 border-b border-navy-dark flex justify-between items-center ${selectedRecipe.isPremium && !isUnlocked ? 'bg-yellow-900/10' : 'bg-secondary-bg'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg shadow-sm border ${selectedRecipe.isPremium && !isUnlocked ? 'bg-yellow-900/20 border-yellow-500/20 text-yellow-500' : 'bg-primary-bg border-navy-dark text-accent'}`}>
                   {selectedRecipe.isPremium && !isUnlocked ? <Crown className="w-6 h-6" /> : React.createElement(categoryIcons[selectedRecipe.category] || Terminal, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-color flex items-center gap-2 font-headline">
                    {selectedRecipe.title}
                    {selectedRecipe.isPremium && !isUnlocked && <Lock className="w-5 h-5 text-yellow-500" />}
                  </h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-accent text-xs font-bold hover:underline flex items-center gap-1">
                      <Link href={`/blueprints/${selectedRecipe.id}`} onClick={() => setSelectedRecipe(null)} className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Full Page
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-navy-light rounded-full transition-colors text-text-secondary"><X className="w-6 h-6" /></button>
            </div>

            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-navy-light scrollbar-track-primary-bg">
              <div className="mb-8">
                <p className="text-text-secondary leading-relaxed text-lg font-sans">{selectedRecipe.description}</p>
              </div>

              {(!isUnlocked && (selectedRecipe.isPremium || recipes.indexOf(selectedRecipe) >= 200)) ? (
                <div className="bg-secondary-bg rounded-xl p-8 text-center border-2 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)] relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                      <Lock className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock this Blueprint</h3>
                    <p className="text-text-secondary mb-8 max-w-md mx-auto">Get access to this workflow and 500+ others by joining Pro.</p>
                    <a href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">Unlock Now <ArrowRight className="w-5 h-5" /></a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-[#0D1117] rounded-lg overflow-hidden border border-navy-dark shadow-inner">
                    <div className="bg-[#161B22] px-4 py-2 flex items-center justify-between border-b border-navy-dark">
                      <span className="text-text-secondary font-mono text-xs flex items-center gap-2"><FileText className="w-3 h-3" /> BLUEPRINT.md</span>
                      <div className="flex items-center gap-2">
                        {selectedRecipe.sampleData && (
                          <button onClick={handleDownload} className="text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20"><Download className="w-3 h-3" /> Sample</button>
                        )}
                        <button onClick={handleCopy} className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20'}`}>{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied!' : 'Copy'}</button>
                      </div>
                    </div>
                    <div className="p-6 max-h-[350px] overflow-y-auto custom-scrollbar">
                      <pre className="font-mono text-sm text-blue-300 whitespace-pre-wrap leading-relaxed">{selectedRecipe.blueprint}</pre>
                    </div>
                  </div>
                  <div className="mt-6 p-4 rounded-lg flex gap-3 items-start border bg-yellow-900/10 border-yellow-500/20">
                     <div className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">!</div>
                     <p className="text-sm text-yellow-200/80 font-sans">1. Copy the blueprint. {selectedRecipe.sampleData ? `2. Download ${selectedRecipe.sampleData.filename}.` : ""} 3. Tell AI: "Read the blueprint {selectedRecipe.sampleData ? "and use the sample file " : ""}to build this."</p>
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