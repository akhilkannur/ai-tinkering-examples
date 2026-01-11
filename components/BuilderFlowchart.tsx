import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Terminal, Copy, Check, FileText, Search, X, Filter, Download, Lock, Crown, ArrowRight, ExternalLink
} from 'lucide-react';
import { categoryIcons, Category, Recipe } from '../lib/cookbook-data';

interface TerminalCookbookProps {
  recipes: Recipe[];
}

const TerminalCookbook = ({ recipes }: TerminalCookbookProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [copied, setCopied] = useState(false);

  const categories: (Category | 'All')[] = ['All', ...Object.keys(categoryIcons) as Category[]];

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
      return 0;
    });
  }, [selectedCategory, searchQuery, recipes]);

  const handleCopy = () => {
    if (!selectedRecipe || selectedRecipe.isPremium) return;
    navigator.clipboard.writeText(selectedRecipe.blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    if (!selectedRecipe || !selectedRecipe.sampleData || selectedRecipe.isPremium) return;

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
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
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

      {/* Results Count */}
      <div className="mb-6 text-gray-500 text-sm font-medium pl-2 flex items-center gap-4">
        <span>Showing {filteredRecipes.length} recipes</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Available</span>
        </div>
      </div>

      {/* The Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => {
          const CatIcon = categoryIcons[recipe.category] || Terminal;
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
                  {recipe.isPremium && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-yellow-500 text-white shadow-sm">
                      Premium
                    </span>
                  )}
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500`}>
                    {recipe.category}
                  </span>
                </div>
              </div>
              
              <Link href={`/blueprints/${recipe.id}`} onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors pl-3 leading-tight flex items-center gap-2">
                  {recipe.title}
                  {recipe.isPremium && <Lock className="w-3.5 h-3.5 text-gray-300" />}
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
                   <span className="font-bold text-yellow-600 flex items-center gap-1">
                     <Lock className="w-3 h-3" /> Pro Only
                   </span>
                 ) : (
                   recipe.sampleData && <span className="font-bold text-blue-500">Sample Data</span>
                 )}
                 <span className="font-mono">{recipe.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500">Try searching for "PDF", "Excel", or "Scrape".</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* The "Recipe Card" Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animation-fade-in" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className={`p-6 border-b border-gray-100 flex justify-between items-center ${selectedRecipe.isPremium ? 'bg-yellow-50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl shadow-sm border ${selectedRecipe.isPremium ? 'bg-white border-yellow-200 text-yellow-600' : 'bg-white border-gray-100 text-gray-700'}`}>
                   {selectedRecipe.isPremium ? <Crown className="w-6 h-6" /> : React.createElement(categoryIcons[selectedRecipe.category] || Terminal, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {selectedRecipe.title}
                    {selectedRecipe.isPremium && <Lock className="w-5 h-5 text-yellow-600" />}
                  </h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide ${selectedRecipe.isPremium ? 'bg-yellow-500 text-white' : 'bg-blue-100 text-blue-700'}`}>
                      {selectedRecipe.isPremium ? 'Premium Blueprint' : selectedRecipe.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Terminal className="w-3 h-3" /> {selectedRecipe.time} build
                    </span>
                    <Link 
                      href={`/blueprints/${selectedRecipe.id}`}
                      className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
                      onClick={() => setSelectedRecipe(null)}
                    >
                      <ExternalLink className="w-3 h-3" /> View Full Page
                    </Link>
                  </div>
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
                <p className="text-gray-600 leading-relaxed text-lg">{selectedRecipe.description}</p>
              </div>

              {selectedRecipe.isPremium ? (
                /* Premium Locked State */
                <div className="bg-gray-900 rounded-2xl p-8 text-center border-2 border-yellow-500/50 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-white to-yellow-500 animate-pulse" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                      <Lock className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock the Sales & Marketing Toolkit</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      This blueprint is part of our **Premium Automation Kit**. Get instant access to 15+ high-ROI agentic workflows, sample data, and private guides.
                    </p>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-yellow-500/20"
                    >
                      Unlock All 100+ Blueprints <ArrowRight className="w-5 h-5" />
                    </a>
                    <p className="text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" /> One-time payment. Lifetime updates.
                    </p>
                  </div>
                  
                  {/* Blurred Background Preview */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
                    <pre className="text-[8px] text-white p-4 filter blur-[2px]">
                      {selectedRecipe.blueprint}
                    </pre>
                  </div>
                </div>
              ) : (
                /* Free Content State */
                <>
                  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-inner">
                    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                      <span className="text-gray-400 font-mono text-xs flex items-center gap-2">
                        <FileText className="w-3 h-3" /> BLUEPRINT.md
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedRecipe.sampleData && (
                          <button
                            onClick={handleDownload}
                            className="text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 transition-colors bg-yellow-500 text-yellow-900 hover:bg-yellow-400"
                          >
                            <Download className="w-3 h-3" />
                            Download Sample
                          </button>
                        )}
                        <button
                          onClick={handleCopy}
                          className={`text-xs font-bold px-3 py-1.5 rounded flex items-center gap-2 transition-colors ${
                            copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
                          }`}
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <div className="p-6 max-h-[350px] overflow-y-auto">
                      <pre className="font-mono text-sm text-blue-300 whitespace-pre-wrap leading-relaxed">
                        {selectedRecipe.blueprint}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex gap-3 items-start">
                     <div className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">!</div>
                     <div>
                       <h4 className="text-sm font-bold text-yellow-800">Instructions</h4>
                       <p className="text-sm text-yellow-700 mt-1">
                         1. Copy the blueprint above.<br/>
                     {selectedRecipe.sampleData && (
                       <>
                         2. Download the <code className="font-mono bg-yellow-200/50 px-1 rounded">{selectedRecipe.sampleData.filename}</code> sample data file.<br/>
                       </>
                     )}
                         3. Tell your AI: <span className="italic font-semibold">"Read the blueprint and use the sample file to build this."</span>
                       </p>
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