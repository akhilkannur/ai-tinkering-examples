import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Terminal, Copy, Check, FileText, Search, X, Filter, Download, Lock, Crown, ArrowRight, ExternalLink, Key
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
  
  // Paywall State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLicenseInput, setShowLicenseInput] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const categories: (Category | 'All')[] = ['All', ...Object.keys(categoryIcons) as Category[]];

  // Check for License Key on Mount & URL changes
  useEffect(() => {
    // 1. Check LocalStorage
    const hasAccess = localStorage.getItem('terminal_cookbook_premium_v2') === 'true';
    if (hasAccess) {
      setIsUnlocked(true);
    }

    // 2. Check URL Parameter (Auto-unlock from email link)
    if (router.isReady) {
      const { license_key } = router.query;
      if (license_key === 'TK-8821-XPRO-MQ') {
        setIsUnlocked(true);
        localStorage.setItem('terminal_cookbook_premium_v2', 'true');
        // Optional: Remove query param from URL without refresh
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
      
      // Sort by publish_date (newest first)
      if (a.publish_date && b.publish_date) {
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, recipes]);

  // Determine if a recipe is "New" (published in the last 7 days)
  const isNew = (dateString?: string) => {
    if (!dateString) return false;
    const publishDate = new Date(dateString);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return publishDate > sevenDaysAgo;
  };

  // Determine which recipes to show based on unlock status
  const displayedRecipes = isUnlocked ? filteredRecipes : filteredRecipes.slice(0, 50);
  const showPaywallOverlay = !isUnlocked && filteredRecipes.length > 50;

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
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Search 100+ blueprints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills - Scrollable on mobile */}
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

      {/* Results Count & Status */}
      <div className="mb-6 text-gray-500 text-sm font-medium pl-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>Showing {displayedRecipes.length} of {filteredRecipes.length} recipes</span>
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

      {/* The Menu Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {/* Active Recipes */}
          {displayedRecipes.map((recipe) => {
            const CatIcon = categoryIcons[recipe.category] || Terminal;
            // If unlocked, effectively no recipes are "locked", but we still use isPremium for badges
            const isLocked = recipe.isPremium && !isUnlocked; 
            
            return (
              <div
                key={recipe.id}
                className="group text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                {/* Category Strip */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  recipe.isPremium ? 'bg-yellow-500' :
                  recipe.category === 'Lead Gen' ? 'bg-blue-500' :
                  recipe.category === 'Enrichment' ? 'bg-indigo-500' :
                  recipe.category === 'Content Ops' ? 'bg-pink-500' :
                  recipe.category === 'SEO' ? 'bg-green-500' :
                  recipe.category === 'Competitor Intel' ? 'bg-red-500' :
                  recipe.category === 'CRO' ? 'bg-orange-500' :
                  recipe.category === 'CRM Ops' ? 'bg-yellow-500' :
                  recipe.category === 'Social Automation' ? 'bg-cyan-500' :
                  'bg-gray-500'
                }`} />

                <div className="flex justify-between items-start mb-4 pl-3">
                  <div className={`p-3 rounded-xl transition-colors ${recipe.isPremium ? 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-100' : 'bg-gray-50 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    {recipe.isPremium ? <Crown className="w-6 h-6" /> : <CatIcon className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {recipe.id === 'agent-context-builder' && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 animate-pulse border border-indigo-200">
                         Start Here
                      </span>
                    )}
                    {isNew(recipe.publish_date) && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                         New
                      </span>
                    )}
                    {recipe.isPremium && (
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-none shadow-sm ${isUnlocked ? 'bg-green-100 text-green-700' : 'bg-yellow-500 text-white'}`}>
                        {isUnlocked ? 'Unlocked' : 'Premium'}
                      </span>
                    )}
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500`}>
                      {recipe.category}
                    </span>
                    {recipe.archetype && (
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                        recipe.archetype === 'Processor' ? 'bg-blue-50 text-blue-600' :
                        recipe.archetype === 'Researcher' ? 'bg-purple-50 text-purple-600' :
                        'bg-orange-50 text-orange-600'
                      }`}>
                        {recipe.archetype}
                      </span>
                    )}
                  </div>
                </div>
                
                <Link href={`/blueprints/${recipe.id}`} onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors pl-3 leading-tight flex items-center gap-2">
                    {recipe.title}
                    {recipe.isPremium && !isUnlocked && <Lock className="w-3.5 h-3.5 text-gray-300" />}
                  </h3>
                </Link>
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
                   {recipe.isPremium ? (
                     <span className={`font-bold flex items-center gap-1 ${isUnlocked ? 'text-green-600' : 'text-yellow-600'}`}>
                       {isUnlocked ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />} 
                       {isUnlocked ? 'Ready' : 'Pro Only'}
                     </span>
                   ) : (
                     recipe.sampleData && <span className="font-bold text-blue-500">Sample Data</span>
                   )}
                   <span className="font-mono">{recipe.time}</span>
                </div>
              </div>
            );
          })}
          
  const [visibleCount, setVisibleCount] = useState(50);

  // ... (existing effects)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  // ... (existing filter logic)

  // Combined render logic
  const recipesToRender = filteredRecipes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRecipes.length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* ... (Search/Filter UI same as before) ... */}

      {/* The Menu Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {recipesToRender.map((recipe, index) => {
            const CatIcon = categoryIcons[recipe.category] || Terminal;
            // A recipe is "Locked" if we are NOT unlocked AND it's either explicitly marked premium OR it's beyond the first 50 free slots.
            // Actually, let's simplify: The first 50 are "Free Slots". Anything after index 49 is "Premium Slot" if not unlocked.
            const isPremiumSlot = !isUnlocked && index >= 50; 
            // Also respect the intrinsic isPremium flag if it exists (for the new high-value ones)
            const isLocked = !isUnlocked && (isPremiumSlot || recipe.isPremium);

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
                {/* Category/Status Strip */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  isLocked ? 'bg-yellow-400' :
                  recipe.category === 'Lead Gen' ? 'bg-blue-500' :
                  // ... (rest of colors) ...
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
                    {/* ... (badges) ... */}
                    {isLocked && (
                        <span className="bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Premium
                        </span>
                    )}
                    {/* ... (other badges) ... */}
                  </div>
                </div>
                
                {/* Title & Tagline */}
                {/* ... */}
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
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
        
        {/* Paywall Overlay CTA (Only if !isUnlocked and we have scrolled enough to see locked items) */}
        {/* ... */}
      </div>
    </div>
  );
};

export default TerminalCookbook;