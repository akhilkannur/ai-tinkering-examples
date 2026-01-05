import React, { useState, useMemo } from 'react';
import { 
  Terminal, Copy, Check, FileText, Search, X, Filter 
} from 'lucide-react';
import { recipes, categoryIcons, Category, Recipe } from '../lib/cookbook-data';

const TerminalCookbook = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [copied, setCopied] = useState(false);

  const categories: (Category | 'All')[] = ['All', ...Object.keys(categoryIcons) as Category[]];

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const matchesSearch = 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = () => {
    if (!selectedRecipe) return;
    navigator.clipboard.writeText(selectedRecipe.blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="mb-6 text-gray-500 text-sm font-medium pl-2">
        Showing {filteredRecipes.length} recipes
      </div>

      {/* The Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => {
          const CatIcon = categoryIcons[recipe.category] || Terminal;
          return (
            <button
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group text-left bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
            >
              {/* Category Strip */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${
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
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors text-gray-700 group-hover:text-blue-600">
                  <CatIcon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500`}>
                  {recipe.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors pl-3 leading-tight">
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
                 <span className="font-mono">{recipe.time}</span>
              </div>
            </button>
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
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                   {React.createElement(categoryIcons[selectedRecipe.category] || Terminal, { className: "w-6 h-6 text-gray-700" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRecipe.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase tracking-wide">
                      {selectedRecipe.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Terminal className="w-3 h-3" /> {selectedRecipe.time} build
                    </span>
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

              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-inner">
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
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
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
                     2. Create a file named <code>BLUEPRINT.md</code> in a new folder.<br/>
                     3. Run: <span className="font-mono bg-yellow-100 px-1 rounded">claude "Read BLUEPRINT.md and build this."</span>
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
