import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Terminal, Copy, Check, Download, FileText, Cpu, BookOpen } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getAllRecipes } from '../../lib/recipes';
import { Recipe, categoryIcons } from '../../lib/cookbook-data';
import React, { useState } from 'react';

interface RecipePageProps {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: RecipePageProps) {
  const [copied, setCopied] = useState(false);
  const CatIcon = categoryIcons[recipe.category] || Terminal;

  const handleCopy = () => {
    navigator.clipboard.writeText(recipe.blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!recipe.sampleData) return;
    const blob = new Blob([recipe.sampleData.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = recipe.sampleData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const ogImageUrl = `https://realaiexamples.com/api/og?title=${encodeURIComponent(recipe.title)}&category=${encodeURIComponent(recipe.category)}&tagline=${encodeURIComponent(recipe.tagline)}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>{recipe.title} | AI Agent Blueprint | Terminal Cookbook</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:title" content={`${recipe.title} | AI Agent Blueprint`} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${recipe.title} | AI Agent Blueprint`} />
        <meta name="twitter:description" content={recipe.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <link rel="canonical" content={`https://realaiexamples.com/blueprints/${recipe.id}`} />
      </Head>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8">
            <Link href="/blueprints" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Blueprints
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate">{recipe.title}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
                <CatIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                    {recipe.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    recipe.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' : 
                    recipe.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-600' : 
                    'bg-red-50 text-red-600'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1 font-mono">
                    <Terminal className="w-3 h-3" /> {recipe.time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-12 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mission Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{recipe.description}</p>
          </div>

          {/* Blueprint Section */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mb-12">
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-gray-400 font-mono text-xs ml-2 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> BLUEPRINT.md
                </span>
              </div>
              <div className="flex items-center gap-3">
                {recipe.sampleData && (
                  <button
                    onClick={handleDownload}
                    className="text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all bg-yellow-500 text-yellow-900 hover:bg-yellow-400 active:scale-95 shadow-lg shadow-yellow-500/20"
                  >
                    <Download className="w-4 h-4" />
                    Download Sample
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className={`text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg ${
                    copied 
                      ? 'bg-green-500 text-white shadow-green-500/20' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Blueprint'}
                </button>
              </div>
            </div>
            <div className="p-8">
              <pre className="font-mono text-base text-blue-300 whitespace-pre-wrap leading-relaxed">
                {recipe.blueprint}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-3xl">
              <div className="bg-yellow-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-yellow-500/20">!</div>
              <h3 className="text-xl font-bold text-yellow-900 mb-4">How to Run This</h3>
              <div className="space-y-4 text-yellow-800">
                <p className="flex gap-3">
                  <span className="font-bold">1.</span>
                  <span>Copy the blueprint instructions above.</span>
                </p>
                {recipe.sampleData && (
                  <p className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <span>Download the <code>{recipe.sampleData.filename}</code> file and place it in your project folder.</span>
                  </p>
                )}
                <p className="flex gap-3">
                  <span className="font-bold">3.</span>
                  <span>Open your AI Agent (Gemini CLI, Claude Code, or Cursor) and paste the blueprint.</span>
                </p>
                <p className="bg-white/50 p-4 rounded-xl italic font-medium text-sm">
                  "Read this blueprint and use the provided CSV to build the automation."
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-600/20">?</div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Why use blueprints?</h3>
              <p className="text-blue-800 leading-relaxed">
                Blueprints act as a "Mission File". Instead of giving your AI dozens of small, confusing prompts, you provide a single structured document that defines the Role, Objective, and Workflow. 
                <br /><br />
                This results in 10x higher accuracy and fewer hallucinations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = getAllRecipes();
  const paths = recipes.map((recipe) => ({
    params: { id: recipe.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipes = getAllRecipes();
  const recipe = recipes.find((r) => r.id === params?.id);

  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
    },
  };
};
