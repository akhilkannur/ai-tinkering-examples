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
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm sticky top-24 z-30">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
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
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 text-gray-500 text-sm font-medium pl-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Showing {recipesToRender.length} of {filteredRecipes.length} recipes</span>
          {!isUnlocked && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Available</span>
            </div>
          )}
        </div>
        {isUnlocked && (
           <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 animate-pulse">
             <Crown className="w-4 h-4" />
             <span className="text-xs font-bold uppercase tracking-wider">Premium Active</span>
           </div>
        )}
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {recipesToRender.map((recipe, index) => {
            const CatIcon = categoryIcons[recipe.category] || Terminal;
            const isLocked = !isUnlocked && (index >= 100 || recipe.isPremium);
            
            // Logic for "NEW" badge (published in last 7 days)
            const isNew = recipe.publish_date && (new Date().getTime() - new Date(recipe.publish_date).getTime() < 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div
                key={recipe.id}
                className={`group text-left bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer ${
                    isLocked 
                    ? 'border-yellow-200 hover:border-yellow-400 hover:shadow-md opacity-90 hover:opacity-100' 
                    : 'border-gray-100 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1'
                }`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                {/* Visual indicator bar */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  isLocked ? 'bg-yellow-400' :
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
                  <div className={`p-3 rounded-xl transition-colors shadow-sm ${
                      isLocked 
                      ? 'bg-white text-yellow-600 border border-yellow-100' 
                      : 'bg-gray-50 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                    {isLocked ? <Lock className="w-6 h-6" /> : <CatIcon className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isNew && (
                      <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                        ✨ NEW
                      </span>
                    )}
                    {isLocked && (
                        <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Premium
                        </span>
                    )}
                    {recipe.id === 'agent-context-builder' && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                         Start Here
                      </span>
                    )}
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500`}>
                      {recipe.category}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-lg font-bold mb-1 leading-tight pl-3 transition-colors ${isLocked ? 'text-gray-800 group-hover:text-yellow-700' : 'text-gray-900 group-hover:text-blue-600'}`}>
                    {recipe.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-4 min-h-[40px] pl-3 line-clamp-2">
                  {recipe.tagline}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 pl-3">
                   <span className={`px-2 py-0.5 rounded ${
                      recipe.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' : 
                      recipe.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600' : 
                      'bg-red-50 text-red-600'
                   }`}>
                     {recipe.difficulty}
                   </span>
                   <span className="font-sans">{recipe.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && (
            <div className="text-center mb-12">
                <button 
                    onClick={handleLoadMore}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full transition-colors"
                >
                    Load More Recipes ({filteredRecipes.length - visibleCount} remaining)
                </button>
            </div>
        )}
        
        {showPaywallOverlay && (
            <div className="relative mt-12 mb-20 text-center">
                <div className="absolute inset-0 flex items-center justify-center -top-32 bg-gradient-to-t from-white via-white/95 to-transparent z-10 pointer-events-none h-[400px]"></div>
                <div className="relative z-20 bg-gray-900 text-white p-10 rounded-3xl shadow-2xl max-w-2xl mx-auto border border-gray-800 transform hover:scale-[1.01] transition-transform">
                   {!showLicenseInput ? (
                      <>
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30 border-4 border-gray-800">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-3">Unlock {filteredRecipes.length - 50}+ Advanced Blueprints</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed text-lg max-w-lg mx-auto">
                            You've seen the list. Now get the code. <br/>
                            Instant access to the full library of Sales, Marketing, and SEO agents.
                        </p>
                        <a 
                          href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-12 bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center justify-center gap-2 group mb-6"
                        >
                            Get Full Access <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <br/>
                        <button 
                          onClick={() => setShowLicenseInput(true)}
                          className="text-sm text-gray-500 hover:text-white underline decoration-gray-700 underline-offset-4 transition-colors"
                        >
                          I have a license key
                        </button>
                      </>
                   ) : (
                      <form onSubmit={handleLicenseSubmit} className="animate-fade-in max-w-sm mx-auto">
                        <div className="flex items-center justify-between mb-6">
                           <h3 className="text-xl font-bold">Enter License Key</h3>
                           <button type="button" onClick={() => setShowLicenseInput(false)} className="text-gray-500 hover:text-white">
                             <X className="w-6 h-6" />
                           </button>
                        </div>
                        <div className="mb-6">
                           <input 
                             type="text" 
                             value={licenseKeyInput}
                             onChange={(e) => setLicenseKeyInput(e.target.value)}
                             placeholder="TK-XXXX-XXXX-XXXX"
                             className="w-full bg-gray-800 border border-gray-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 font-sans text-center uppercase tracking-widest placeholder-gray-600 text-lg"
                           />
                           {unlockError && <p className="text-red-400 text-sm mt-3">{unlockError}</p>}
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg flex items-center justify-center gap-2 text-lg"
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
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500">Try searching for "PDF", "Excel", or "Scrape".</p>
          <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-6 text-blue-600 font-bold hover:underline">Clear Filters</button>
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className={`p-6 border-b border-gray-100 flex justify-between items-center ${selectedRecipe.isPremium && !isUnlocked ? 'bg-yellow-50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl shadow-sm border ${selectedRecipe.isPremium && !isUnlocked ? 'bg-white border-yellow-200 text-yellow-600' : 'bg-white border-gray-100 text-gray-700'}`}>
                   {selectedRecipe.isPremium && !isUnlocked ? <Crown className="w-6 h-6" /> : React.createElement(categoryIcons[selectedRecipe.category] || Terminal, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {selectedRecipe.title}
                    {selectedRecipe.isPremium && !isUnlocked && <Lock className="w-5 h-5 text-yellow-600" />}
                  </h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
                      <Link href={`/blueprints/${selectedRecipe.id}`} onClick={() => setSelectedRecipe(null)} className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Full Page
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"><X className="w-6 h-6" /></button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed text-lg">{selectedRecipe.description}</p>
              </div>

              {(!isUnlocked && (selectedRecipe.isPremium || recipes.indexOf(selectedRecipe) >= 50)) ? (
                <div className="bg-gray-900 rounded-2xl p-8 text-center border-2 border-yellow-500/50 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                      <Lock className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock this Blueprint</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Get access to this workflow and 500+ others by joining Pro.</p>
                    <a href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP?session=sess_GCYotd6plh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">Unlock Now <ArrowRight className="w-5 h-5" /></a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-inner">
                    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <span className="text-gray-400 font-sans text-xs flex items-center gap-2"><FileText className="w-3 h-3" /> BLUEPRINT.md</span>
                      <div className="flex items-center gap-2">
                        {selectedRecipe.sampleData && (
                          <button onClick={handleDownload} className="text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 bg-yellow-500 text-yellow-900 hover:bg-yellow-400"><Download className="w-3 h-3" /> Sample</button>
                        )}
                        <button onClick={handleCopy} className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied!' : 'Copy'}</button>
                      </div>
                    </div>
                    <div className="p-6 max-h-[350px] overflow-y-auto">
                      <pre className="font-sans text-sm text-blue-300 whitespace-pre-wrap leading-relaxed">{selectedRecipe.blueprint}</pre>
                    </div>
                  </div>
                  <div className="mt-6 p-4 rounded-xl flex gap-3 items-start border bg-yellow-50 border-yellow-100">
                     <div className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">!</div>
                     <p className="text-sm text-yellow-800">1. Copy the blueprint. {selectedRecipe.sampleData ? `2. Download ${selectedRecipe.sampleData.filename}.` : ""} 3. Tell AI: "Read the blueprint {selectedRecipe.sampleData ? "and use the sample file " : ""}to build this."</p>
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
