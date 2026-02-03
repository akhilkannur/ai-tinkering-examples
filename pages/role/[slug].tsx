import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ArrowLeft, Briefcase, Zap, ShieldCheck, Clock, Terminal } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { getAllRecipes } from '../../lib/recipes';
import { Recipe } from '../../lib/cookbook-data';
import slugify from '../../utils/slugify';

interface RolePageProps {
  roleName: string;
  recipes: Recipe[];
}

export default function RolePage({ roleName, recipes }: RolePageProps) {
  const title = `${recipes.length} AI Blueprints for ${roleName} | Real AI Examples`;
  const description = `Curated AI workflows for ${roleName}. Automate your ${roleName.toLowerCase()} tasks with copy-paste blueprints for Gemini CLI, Claude Code, and Cursor.`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(roleName)}&mode=role`;

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/500-ways-to-use-llms-for-work" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-12 text-sm font-mono uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> All 500 Blueprints
          </Link>

          {/* Header */}
          <div className="max-w-4xl mb-20">
            <div className="inline-flex items-center gap-2 bg-secondary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-mono text-accent mb-6 shadow-sm">
              <Terminal className="w-3 h-3" />
              <span className="tracking-widest uppercase font-bold">Field-Ready: {roleName}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-text-color mb-6 tracking-tight leading-tight">
              AI Workflows for <br/><span className="text-accent">{roleName}</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl font-normal">
              Stop guessing how to prompt. These are <strong>{recipes.length} structured blueprints</strong> designed specifically for {roleName} workflows. 
              Optimized for agentic execution.
            </p>
          </div>

          {/* Recipe Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(recipe => (
              <Link 
                key={recipe.id} 
                href={`/ai-examples/${recipe.id}`}
                className="group flex flex-col bg-secondary-bg border border-navy-dark rounded-xl p-8 hover:border-accent/50 transition-all hover:shadow-[0_15px_40px_rgba(56,189,248,0.05)] relative"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2.5 bg-primary-bg rounded-lg border border-navy-dark text-accent group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-text-secondary/50 uppercase tracking-widest font-bold">Complexity</span>
                    <span className="text-xs font-bold text-text-color uppercase tracking-wider">{recipe.difficulty}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-text-color mb-4 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                  {recipe.title}
                </h3>
                <p className="text-text-secondary text-sm mb-8 line-clamp-3 flex-grow leading-relaxed">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-navy-dark/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-text-secondary/70">
                    <Clock className="w-3.5 h-3.5" /> {recipe.time}
                  </div>
                  <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition-transform uppercase tracking-widest flex items-center gap-2">
                    Open <ArrowLeft className="w-3 h-3 rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {recipes.length === 0 && (
             <div className="p-20 text-center border-2 border-dashed border-navy-dark rounded-2xl bg-secondary-bg/50">
               <Briefcase className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-20" />
               <p className="text-text-secondary text-lg">No blueprints found for this role yet.</p>
               <Link href="/500-ways-to-use-llms-for-work" className="text-accent mt-4 inline-block font-bold hover:underline">Browse all blueprints &rarr;</Link>
             </div>
          )}

          {/* Social Proof / Trust */}
          <div className="mt-24 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-secondary-bg to-primary-bg border border-navy-dark flex flex-col md:flex-row items-center gap-8 justify-between">
             <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-text-color">Production-Ready Logic</h3>
                <p className="text-text-secondary leading-relaxed">
                  Every blueprint in the <strong>{roleName}</strong> library has been tested against real-world data schemas. No "Hallucination" risks - just structured logic.
                </p>
             </div>
             <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                   <ShieldCheck className="w-10 h-10 text-emerald-500 mb-2" />
                   <span className="text-[10px] font-mono text-text-secondary uppercase">Verified</span>
                </div>
                <div className="h-10 w-[1px] bg-navy-dark hidden md:block"></div>
                <div className="flex flex-col items-center">
                   <Zap className="w-10 h-10 text-accent mb-2" />
                   <span className="text-[10px] font-mono text-text-secondary uppercase">Automated</span>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allRecipes = getAllRecipes();
  // distinct categories
  const categories = Array.from(new Set(allRecipes.map(r => r.category).filter(Boolean)));
  
  const paths = categories.map(cat => ({
    params: { slug: slugify(cat) }
  }));

  // Add virtual "growth" role
  paths.push({ params: { slug: 'growth' } });

  return {
    paths,
    fallback: false 
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const allRecipes = getAllRecipes();
  
  let matchedRecipes: Recipe[] = [];
  let roleName = '';

  if (slug === 'growth') {
    roleName = 'Growth';
    const growthCategories = ['Lead Gen', 'Paid Media', 'CRO'];
    matchedRecipes = allRecipes.filter(r => growthCategories.includes(r.category));
  } else {
    // Find category name that matches this slug
    matchedRecipes = allRecipes.filter(r => r.category && slugify(r.category) === slug);
    if (matchedRecipes.length > 0) {
      roleName = matchedRecipes[0].category;
    }
  }
  
  if (matchedRecipes.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      roleName,
      recipes: matchedRecipes
    },
    revalidate: 3600
  };
};
