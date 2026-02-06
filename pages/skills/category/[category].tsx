import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { getAllRecipes } from '../../../lib/recipes';
import { Recipe, categoryDescriptions, categoryIcons } from '../../../lib/cookbook-data';
import { Terminal, ArrowLeft, Search } from 'lucide-react';
import React, { useState, useMemo } from 'react';

import CategoryGuide from '../../../components/CategoryGuide';

interface CategoryPageProps {
  category: string;
  recipes: Recipe[];
}

export default function CategoryPage({ category, recipes }: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, recipes]);

  const catKey = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const meta = categoryDescriptions[catKey] || {
    title: `${category} AI Blueprints`,
    description: `Automate your ${category} workflows with these professional AI agent blueprints.`
  };

  const CatIcon = categoryIcons[recipes[0]?.category] || Terminal;

  return (
    <div className="min-h-screen bg-brand-beige font-sans text-brand-navy">
      <Head>
        <title>{meta.title} | AI Blueprints | Real AI Examples</title>
        <meta name="description" content={meta.description} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={`${meta.title} | AI Blueprints`} key="og:title" />
        <meta property="og:description" content={meta.description} key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={`${meta.title} | AI Blueprints`} key="twitter:title" />
        <meta name="twitter:description" content={meta.description} key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 md:mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Blueprints
        </Link>

        <div className="max-w-4xl mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm mb-6">
            <CatIcon className="w-8 h-8 md:w-10 md:h-10 text-accent" />
          </div>
          <h1 className="text-3xl md:text-6xl font-headline font-bold mb-4 md:mb-6 tracking-tight leading-tight">{meta.title}</h1>
          <p className="text-base md:text-xl text-brand-navy/60 leading-relaxed max-w-2xl">{meta.description}</p>
        </div>

        {/* Search within category */}
        <div className="relative max-w-md mb-8 md:mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            placeholder={`Search ${recipes.length} ${category} blueprints...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/skills/${recipe.id}`}>
              <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col">
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                    {recipe.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors leading-tight">{recipe.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{recipe.tagline}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>{recipe.difficulty}</span>
                  <span>{recipe.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Content Guide */}
        <CategoryGuide category={catKey} />
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = getAllRecipes();
  const categories = Array.from(new Set(recipes.map(r => r.category)));
  
  const paths = categories.map(cat => ({
    params: { category: cat.toLowerCase().replace(/[^a-z0-9]/g, '-') }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryParam = params?.category as string;
  const allRecipes = getAllRecipes();
  
  // Find the original category name
  const recipes = allRecipes.filter(r => 
    r.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === categoryParam
  );

  if (recipes.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      category: recipes[0].category,
      recipes
    },
    revalidate: 300
  };
};
