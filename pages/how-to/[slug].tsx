import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ArrowLeft, CheckCircle, Copy, Terminal, Download } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getAllRecipes } from '../../lib/recipes';
import { Recipe } from '../../lib/cookbook-data';

interface HowToPageProps {
  recipe: Recipe;
  problemTitle: string;
  relatedRecipes: Recipe[];
}

export default function HowToPage({ recipe, problemTitle, relatedRecipes }: HowToPageProps) {
  const pageTitle = `How to ${problemTitle} (Free AI Blueprint)`;
  const description = `Don't buy software to ${problemTitle}. Use this free AI blueprint to automate it yourself using Gemini, Claude, or Cursor.`;
  const baseUrl = 'https://realaiexamples.com';
  const pageUrl = `${baseUrl}/how-to/automate-${recipe.id}`;

  // Schema.org HowTo for Rich Snippets
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to ${problemTitle}`,
    "description": description,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Install an AI Blueprint Agent",
        "text": "Install Gemini CLI, Claude Code, or open Cursor Composer. These tools are designed to read files and execute workflows."
      },
      {
        "@type": "HowToStep",
        "name": "Download the Blueprint",
        "text": "Copy the text-based blueprint provided below and save it as a .md file in your project directory."
      },
      {
        "@type": "HowToStep",
        "name": "Run with your Data",
        "text": "Provide your data (e.g., CSV, logs, or code) to the agent along with the blueprint. The agent will follow the logic to solve the problem."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} key="description" />
        <link rel="canonical" href={pageUrl} key="canonical" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={pageTitle} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />
        <meta property="og:url" content={pageUrl} key="og:url" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={pageTitle} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </Head>

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/how-to" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Back to Problem Dictionary
          </Link>

          {/* Problem Header */}
          <div className="mb-12 border-b border-navy-dark pb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-mono text-red-400 mb-6">
              <span>The Problem</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-text-color mb-6 leading-tight">
              How to {problemTitle}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-3xl font-normal">
              You are looking for a way to <strong>{problemTitle}</strong>. 
              Most people would tell you to buy a SaaS subscription for this. 
              <br/><br/>
              <span className="text-text-color font-bold italic underline decoration-accent/30">We say: Build it yourself for free.</span>
            </p>
          </div>

          {/* Solution Section */}
          <div className="bg-secondary-bg rounded-xl border border-navy-dark overflow-hidden shadow-2xl mb-16">
             <div className="bg-navy-dark/50 p-4 border-b border-navy-dark flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-mono text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>The Solution</span>
                   </div>
                   <span className="text-sm text-text-secondary font-mono">Blueprint ID: {recipe.id}</span>
                </div>
                <Link href={`/ai-examples/${recipe.id}`} className="text-xs text-accent hover:underline">
                   View Documentation &rarr;
                </Link>
             </div>
             
             <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-text-color mb-4">The Automation Blueprint</h2>
                <p className="text-text-secondary mb-8">
                   Copy the logic below into a tool like <strong>Gemini CLI</strong> or <strong>Claude Code</strong>. 
                   It includes the role, constraints, and multi-step workflow needed to {problemTitle}.
                </p>

                <div className="relative group">
                   <pre className="bg-primary-bg p-6 rounded-lg border border-navy-dark overflow-x-auto text-sm font-mono text-text-secondary whitespace-pre-wrap">
                      {recipe.blueprint}
                   </pre>
                   <button 
                      onClick={() => navigator.clipboard.writeText(recipe.blueprint)}
                      className="absolute top-4 right-4 p-2 bg-secondary-bg border border-navy-dark rounded text-text-secondary hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                      title="Copy to clipboard"
                   >
                      <Copy className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>

          {/* Related Automations */}
          {relatedRecipes.length > 0 && (
            <div className="mt-20">
               <h3 className="text-2xl font-bold text-text-color mb-8 flex items-center gap-3">
                 <Terminal className="w-6 h-6 text-accent" /> Related {recipe.category} Automations
               </h3>
               <div className="grid md:grid-cols-3 gap-6">
                  {relatedRecipes.map(related => (
                    <Link 
                      key={related.id} 
                      href={`/how-to/automate-${related.id}`}
                      className="bg-secondary-bg border border-navy-dark p-6 rounded-xl hover:border-accent/50 transition-all hover:shadow-lg flex flex-col"
                    >
                      <h4 className="font-bold text-sm text-text-color mb-3 line-clamp-2">
                        How to {related.tagline?.toLowerCase().replace(/\.$/, '') || related.title}
                      </h4>
                      <div className="mt-auto text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                        View <ArrowLeft className="w-3 h-3 rotate-180" />
                      </div>
                    </Link>
                  ))}
               </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-24 text-center p-12 bg-navy-dark/30 rounded-2xl border border-navy-dark">
             <h3 className="text-2xl font-bold text-text-color mb-4">Want the Full Library?</h3>
             <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                                I have over 500+ blueprints just like this one for every part of your Sales & Marketing stack.
                              </p>             <Link href="/500-ways-to-use-llms-for-work" className="inline-block bg-white text-navy-dark font-bold py-3 px-8 rounded-lg hover:bg-slate-200 transition-colors shadow-xl">
                Browse All 500 Blueprints
             </Link>
                    </div>
                  </div>
                </main>
              </div>
            );
          }

export const getStaticPaths: GetStaticPaths = async () => {
  const allRecipes = getAllRecipes();
  
  const paths = allRecipes
    .filter(r => r.tagline)
    .map(r => ({
      params: { slug: `automate-${r.id}` }
    }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const allRecipes = getAllRecipes();
  
  const id = slug.replace(/^automate-/, '');
  const recipe = allRecipes.find(r => r.id === id);

  if (!recipe) {
    return { notFound: true };
  }

  // Find related recipes in the same category
  const relatedRecipes = allRecipes
    .filter(r => r.category === recipe.category && r.id !== recipe.id && r.tagline)
    .slice(0, 3);

  // Format the tagline: remove trailing period, lowercase first letter (unless acronym)
  let problemTitle = recipe.tagline?.trim().replace(/\.$/, '') || recipe.title;
  
  const firstWord = problemTitle.split(' ')[0];
  if (firstWord !== firstWord.toUpperCase()) {
      problemTitle = problemTitle.charAt(0).toLowerCase() + problemTitle.slice(1);
  }

  return {
    props: {
      recipe,
      problemTitle,
      relatedRecipes
    },
    revalidate: 3600
  };
};
