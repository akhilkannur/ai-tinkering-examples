
import { useState } from 'react';
import Head from 'next/head';
import { AiTool, aiTools } from '../lib/ai-tools-data';
import AIToolCard from '../components/AIToolCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Category = 'All' | AiTool['category'];
type Price = 'All' | AiTool['tags']['price'];
type Skill = 'All' | AiTool['tags']['skill'];

const AiToolFinder = () => {
  const [categoryFilter, setCategoryFilter] = useState<Category>('All');
  const [priceFilter, setPriceFilter] = useState<Price>('All');
  const [skillFilter, setSkillFilter] = useState<Skill>('All');

  const filteredTools = aiTools.filter(tool => {
    const categoryMatch = categoryFilter === 'All' || tool.category === categoryFilter;
    const priceMatch = priceFilter === 'All' || tool.tags.price === priceFilter;
    const skillMatch = skillFilter === 'All' || tool.tags.skill === skillFilter;
    return categoryMatch && priceMatch && skillMatch;
  });

  const FilterButton = ({ value, label, currentFilter, setFilter }) => {
    const isActive = currentFilter === value;
    return (
      <button
        onClick={() => setFilter(value)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>AI Tool Finder | Find the Perfect AI Tool for Your Needs</title>
        <meta
          name="description"
          content="Answer a few questions to find the best AI tools for writing, image generation, coding, and more. Your personalized AI tool directory."
        />
      </Head>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find the Perfect AI Tool
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Answer a few questions below to get a curated list of AI tools tailored to your specific needs.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-12">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-3">1. What do you want to accomplish?</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton value="All" label="All" currentFilter={categoryFilter} setFilter={setCategoryFilter} />
              <FilterButton value="Copywriting" label="✍️ Writing & Text" currentFilter={categoryFilter} setFilter={setCategoryFilter} />
              <FilterButton value="Image Generation" label="🎨 Image & Art" currentFilter={categoryFilter} setFilter={setCategoryFilter} />
              <FilterButton value="Code Assistance" label="💻 Code & Development" currentFilter={categoryFilter} setFilter={setCategoryFilter} />
              <FilterButton value="Productivity" label="🚀 Productivity & Business" currentFilter={categoryFilter} setFilter={setCategoryFilter} />
              <FilterButton value="Video & Audio" label="🎬 Video & Audio" currentFilter={categoryFilter} setFilter={setCategoryFilter} />
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-3">2. What's your budget?</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton value="All" label="All" currentFilter={priceFilter} setFilter={setPriceFilter} />
              <FilterButton value="Free" label="Free" currentFilter={priceFilter} setFilter={setPriceFilter} />
              <FilterButton value="Freemium" label="Freemium" currentFilter={priceFilter} setFilter={setPriceFilter} />
              <FilterButton value="Paid" label="Paid" currentFilter={priceFilter} setFilter={setPriceFilter} />
            </div>
          </div>

          {/* Skill Filter */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-3">3. What's your skill level?</h3>
            <div className="flex flex-wrap gap-2">
              <FilterButton value="All" label="All" currentFilter={skillFilter} setFilter={setSkillFilter} />
              <FilterButton value="Beginner" label="Beginner" currentFilter={skillFilter} setFilter={setSkillFilter} />
              <FilterButton value="Intermediate" label="Intermediate" currentFilter={skillFilter} setFilter={setSkillFilter} />
              <FilterButton value="Advanced" label="Advanced" currentFilter={skillFilter} setFilter={setSkillFilter} />
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredTools.length > 0 ? 'Recommended Tools' : 'No tools match your criteria'}
          </h2>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map(tool => (
                <AIToolCard
                  key={tool.name}
                  name={tool.name}
                  description={tool.description}
                  url={tool.url}
                  imageUrl={tool.image}
                  category={tool.category}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">
                  Try selecting different filter options to find the perfect tool.
                </p>
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AiToolFinder;
