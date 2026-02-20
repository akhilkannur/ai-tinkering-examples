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
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
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

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/500-ways-to-use-llms-for-work" className="inline-flex items-center gap-2 text-black font-black uppercase tracking-widest hover:bg-[#ccff00] px-2 py-1 border border-black mb-12 text-[10px] transition-all">
            <ArrowLeft className="w-4 h-4 stroke-[3px]" /> All 500 Blueprints
          </Link>

          {/* Header */}
          <div className="max-w-4xl mb-24 relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
            
            <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-1.5 font-black text-xs uppercase mb-8 transform -rotate-1 brutalist-shadow-sm">
              <Terminal className="w-4 h-4" />
              <span className="tracking-widest uppercase font-black">Field-Ready: {roleName}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-black mb-8 uppercase leading-[0.9] glitch-text" data-text={roleName.toUpperCase() + " AI WORKFLOWS"}>
              AI Workflows for <br/><span className="text-[#ff00ff]">{roleName}</span>
            </h1>
            <p className="text-xl md:text-2xl text-black font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm">
              Stop guessing how to prompt. These are <strong>{recipes.length} structured blueprints</strong> designed specifically for {roleName} workflows.
            </p>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map(recipe => (
              <Link 
                key={recipe.id} 
                href={`/skills/${recipe.id}`}
                className="group flex flex-col bg-white border-4 border-black p-8 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 relative brutalist-shadow h-full"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 bg-black flex items-center justify-center text-[#ccff00] border-2 border-black brutalist-shadow-sm group-hover:rotate-6 transition-transform">
                    <Zap className="w-6 h-6 fill-current stroke-[3px]" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-widest leading-none mb-1">Complexity</span>
                    <span className="text-xs font-black text-black uppercase tracking-wider bg-[#ccff00]/20 px-1 border border-black/10 inline-block">{recipe.difficulty}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-display text-black mb-4 group-hover:text-[#ff00ff] transition-colors leading-tight uppercase">
                  {recipe.title}
                </h3>
                <p className="text-black font-black font-mono text-xs mb-8 line-clamp-3 leading-relaxed uppercase tracking-tighter">
                  // {recipe.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black/10 text-black font-display text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 border border-black">
                    <Clock className="w-4 h-4 stroke-[3px]" /> {recipe.time}
                  </div>
                  <span className="group-hover:bg-[#ccff00] transition-colors px-1 border border-black flex items-center gap-2">
                    Open <ArrowLeft className="w-4 h-4 rotate-180 stroke-[3px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {recipes.length === 0 && (
             <div className="p-24 text-center border-4 border-black border-dashed bg-white brutalist-shadow">
               <Briefcase className="w-16 h-16 text-gray-200 mx-auto mb-8 stroke-[3px]" />
               <p className="text-black font-display text-2xl uppercase mb-8">No blueprints found for this role yet.</p>
               <Link href="/500-ways-to-use-llms-for-work" className="bg-[#ccff00] border-2 border-black px-10 py-4 font-display uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">Browse all blueprints ➜</Link>
             </div>
          )}

          {/* Social Proof / Trust */}
          <div className="mt-32 p-10 md:p-16 border-4 border-black bg-white brutalist-shadow flex flex-col md:flex-row items-center gap-12 justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffff] opacity-10 blur-xl"></div>
             <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-display text-black mb-6 uppercase decoration-wavy underline decoration-[#ff00ff]">Production-Ready Logic</h3>
                <p className="text-black font-black font-mono text-sm leading-relaxed uppercase">
                  // Every blueprint in the <strong>{roleName}</strong> library has been tested against real-world data schemas. No "Hallucination" risks - just rigid logic.
                </p>
             </div>
             <div className="flex flex-wrap items-center gap-10">
                <div className="flex flex-col items-center">
                   <div className="bg-black p-3 border-2 border-black brutalist-shadow-sm transform -rotate-3 mb-4">
                      <ShieldCheck className="w-10 h-10 text-emerald-400 stroke-[3px]" />
                   </div>
                   <span className="text-[10px] font-black font-mono text-black uppercase tracking-widest">Verified</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="bg-black p-3 border-2 border-black brutalist-shadow-sm transform rotate-3 mb-4">
                      <Zap className="w-10 h-10 text-[#ccff00] stroke-[3px] fill-current" />
                   </div>
                   <span className="text-[10px] font-black font-mono text-black uppercase tracking-widest">Automated</span>
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
  const categories = Array.from(new Set(allRecipes.map(r => r.category).filter(Boolean)));
  
  const paths = categories.map(cat => ({
    params: { slug: slugify(cat) }
  }));

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
