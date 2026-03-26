import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Search, BookOpen, Wrench, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getAllRecipes } from '../../lib/recipes';
import { Recipe } from '../../lib/cookbook-data';

interface HowToDictionaryProps {
  problems: {
    id: string;
    tagline: string;
    category: string;
  }[];
}

export default function HowToDictionary({ problems }: HowToDictionaryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProblems = useMemo(() => {
    return problems.filter(p => 
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [problems, searchTerm]);

  // Group by category
  const groupedProblems = useMemo(() => {
    const groups: Record<string, typeof problems> = {};
    filteredProblems.forEach(p => {
      const cat = p.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filteredProblems]);

  const sortedCategories = Object.keys(groupedProblems).sort();

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>The AI Problem Dictionary: How to Automate 500+ Tasks</title>
        <meta name="description" content="Don't look for tools. Look for solutions. A dictionary of 500+ 'How-To' guides for automating Sales, Marketing, and SEO tasks with AI." key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="The AI Problem Dictionary: How to Automate 500+ Tasks" key="og:title" />
        <meta property="og:description" content="Don't look for tools. Look for solutions. A dictionary of 500+ 'How-To' guides for automating Sales, Marketing, and SEO tasks with AI." key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="The AI Problem Dictionary: How to Automate 500+ Tasks" key="twitter:title" />
        <meta name="twitter:description" content="Don't look for tools. Look for solutions. A dictionary of 500+ 'How-To' guides for automating Sales, Marketing, and SEO tasks with AI." key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>

      <Navbar />

      <main className="pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-4 max-w-4xl text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-mono text-accent mb-6">
            <BookOpen className="w-3 h-3" />
            <span className="tracking-widest uppercase font-bold">The Problem Dictionary</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-color mb-6 tracking-tight">
            How to <span className="text-accent">Automate Everything</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-10">
            Browse 500+ practical solutions. Search for the problem you have right now.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
            <input 
              type="text" 
              placeholder="e.g. 'clean csv', 'find emails', 'write thread'..." 
              className="w-full bg-secondary-bg border border-navy-dark rounded-xl py-4 pl-12 pr-4 text-lg text-text-color focus:ring-2 focus:ring-accent focus:outline-none transition-all placeholder:text-text-secondary/50 shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            {sortedCategories.map(category => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-text-color mb-6 border-b border-navy-dark pb-2 flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-accent" />
                  {category} Solutions
                </h2>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  {groupedProblems[category].map(problem => (
                    <Link 
                      key={problem.id}
                      href={`/how-to/automate-${problem.id}`}
                      className="group flex items-start justify-between gap-4 p-4 rounded-lg hover:bg-secondary-bg transition-colors border border-transparent hover:border-navy-dark"
                    >
                      <div className="flex flex-col">
                        <span className="text-text-color font-medium group-hover:text-accent transition-colors">
                          How to {problem.tagline.replace(/\.$/, '').toLowerCase()}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-navy-light group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-secondary">No solutions found. Try a different search term.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allRecipes = getAllRecipes();
  
  // Filter for recipes that have a tagline
  const problems = allRecipes
    .filter(r => r.tagline && r.tagline.length > 5)
    .map(r => ({
      id: r.id,
      tagline: r.tagline,
      category: r.category || 'General'
    }));

  return {
    props: {
      problems
    },
    revalidate: 3600
  };
};
