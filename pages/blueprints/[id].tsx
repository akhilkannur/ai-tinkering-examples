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

  const handleDownloadSample = () => {
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

  const handleDownloadBlueprint = () => {
    const blob = new Blob([recipe.blueprint], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const SITE_URL = 'https://realaiexamples.com';
  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(recipe.title)}&category=${encodeURIComponent(recipe.category)}&tagline=${encodeURIComponent(recipe.tagline)}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": recipe.title,
    "description": recipe.description,
    "image": ogImageUrl,
    "author": {
      "@type": "Organization",
      "name": "AI Tinkering Examples"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Tinkering Examples",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blueprints/${recipe.id}`
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blueprints",
        "item": `${SITE_URL}/blueprints`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": recipe.title,
        "item": `${SITE_URL}/blueprints/${recipe.id}`
      }
    ]
  };

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
        <link rel="canonical" href={`${SITE_URL}/blueprints/${recipe.id}`} key="canonical" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
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
                <button
                  onClick={handleDownloadBlueprint}
                  className="text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all bg-gray-700 text-gray-200 hover:bg-gray-600 active:scale-95 shadow-lg shadow-gray-900/20"
                >
                  <FileText className="w-4 h-4" />
                  Download .md
                </button>
                {recipe.sampleData && (
                  <button
                    onClick={handleDownloadSample}
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
              <h3 className="text-xl font-bold text-yellow-900 mb-6">How to Run This</h3>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-sm">1</span>
                    Get the files
                  </h4>
                  <p className="text-yellow-800 text-sm mb-2 ml-8">
                    Download the <span className="font-mono font-bold">{recipe.id}.md</span> blueprint {recipe.sampleData ? `and ${recipe.sampleData.filename}` : ''} using the buttons above.
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center text-sm">2</span>
                    Run in Terminal
                  </h4>
                  <p className="text-yellow-800 text-xs mb-4 ml-8 italic opacity-80">
                    Universal: These blueprints work with any agentic CLI. Choose your preferred tool below:
                  </p>
                  
                  <div className="ml-8 space-y-4">
                    {/* Gemini Command */}
                    <div className="bg-white rounded-xl border border-yellow-200 overflow-hidden">
                      <div className="px-4 py-2 bg-yellow-100/50 border-b border-yellow-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">Gemini CLI</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(`gemini "Read @${recipe.id}.md and execute the workflow"`)}
                          className="text-xs text-yellow-700 hover:text-yellow-900 font-medium"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="p-4 font-mono text-sm text-gray-700 overflow-x-auto whitespace-nowrap">
                        gemini "Read @{recipe.id}.md and execute the workflow"
                      </div>
                    </div>

                    {/* Claude Command */}
                    <div className="bg-white rounded-xl border border-yellow-200 overflow-hidden">
                      <div className="px-4 py-2 bg-yellow-100/50 border-b border-yellow-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">Claude Code</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(`claude "Read ${recipe.id}.md and execute the workflow"`)}
                          className="text-xs text-yellow-700 hover:text-yellow-900 font-medium"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="p-4 font-mono text-sm text-gray-700 overflow-x-auto whitespace-nowrap">
                        claude "Read {recipe.id}.md and execute the workflow"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-600/20">?</div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Why use blueprints?</h3>
              <p className="text-blue-800 leading-relaxed">
                Blueprints act as a "Mission File". Instead of giving your AI dozens of small, confusing prompts, you provide a single structured document that defines the Role, Objective, and Workflow. 
                <br /><br />
                <span className="font-bold">Tool Agnostic:</span> These work with any agentic CLI (Gemini, Claude Code, Cursor, etc.) by providing a clear instruction set for the AI to follow.
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
