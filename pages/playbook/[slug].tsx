import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllRecipes } from '../../lib/recipes';
import { PLAYBOOKS } from '../../lib/playbooks';
import Navbar from '../../components/Navbar';
import { ArrowRight, CheckCircle, Lock, Zap, Target, Search, Heart, PenTool, ShoppingBag, Terminal } from 'lucide-react';

// Map string icon names to Lucide components
const ICON_MAP: Record<string, any> = {
  'Target': Target,
  'Search': Search,
  'Zap': Zap,
  'Heart': Heart,
  'PenTool': PenTool,
  'ShoppingBag': ShoppingBag,
};

export default function PlaybookPage({ playbook, recipes }: any) {
  if (!playbook) return null;

  const Icon = ICON_MAP[playbook.icon] || Zap;

  // Schema.org for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": playbook.title,
    "description": playbook.description,
    "url": `https://realaiexamples.com/playbook/${playbook.slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": recipes.map((recipe: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://realaiexamples.com/skills/${recipe.id}`,
        "name": recipe.title
      }))
    }
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(playbook.title)}&mode=role`;

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>{playbook.title} | AI Blueprints | Real AI Examples</title>
        <meta name="description" content={playbook.description} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={`${playbook.title} | AI Blueprints`} key="og:title" />
        <meta property="og:description" content={playbook.description} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={`${playbook.title} | AI Blueprints`} key="twitter:title" />
        <meta name="twitter:description" content={playbook.description} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-24 text-center max-w-4xl relative z-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
          
          <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-1.5 font-black text-xs uppercase mb-8 transform -rotate-1 brutalist-shadow-sm">
            <Icon className="w-4 h-4" />
            <span className="tracking-widest uppercase font-black text-[10px]">Role-Based Playbook</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-black mb-8 uppercase leading-[0.9] glitch-text" data-text={playbook.title.toUpperCase()}>
            {playbook.title}
          </h1>
          <p className="text-xl md:text-2xl text-black font-black leading-relaxed mb-12 border-l-8 border-[#ccff00] pl-6 py-2 bg-gray-50 text-left mx-auto max-w-2xl">
            {playbook.description}
          </p>
          <div className="flex justify-center">
            <Link href="#blueprints" className="bg-[#ff00ff] text-white px-10 py-5 border-4 border-black font-display text-xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none flex items-center gap-3">
              Explore {recipes.length} Blueprints <ArrowRight className="w-6 h-6 stroke-[3px]" />
            </Link>
          </div>
        </div>

        {/* Blueprint Grid */}
        <div id="blueprints" className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe: any) => (
              <Link 
                key={recipe.id} 
                href={`/skills/${recipe.id}`}
                className="group flex flex-col bg-white border-4 border-black p-8 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 relative brutalist-shadow h-full"
              >
                {/* Badge for Featured/Premium */}
                {recipe.isPremium && (
                  <div className="absolute top-0 right-0 bg-black text-[#ccff00] text-[8px] font-black px-2 py-0.5 z-20 uppercase tracking-widest border-b-2 border-l-2 border-black">
                    PREMIUM
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 text-[10px] font-black font-mono uppercase tracking-widest text-black bg-gray-100 border border-black px-2 py-1">
                    <Terminal className="w-3 h-3 stroke-[3px]" />
                    {recipe.category || 'Automation'}
                  </div>
                </div>

                <h3 className="text-2xl font-display text-black mb-4 group-hover:text-[#ff00ff] transition-colors leading-tight uppercase">
                  {recipe.title}
                </h3>
                
                <p className="text-black font-black font-mono text-xs mb-8 line-clamp-3 leading-relaxed uppercase tracking-tighter">
                  // {recipe.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-black/10 text-black font-display text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                    <span className="group-hover:bg-[#ccff00] transition-colors px-1 border border-black">Work-Ready</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all stroke-[3px]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PLAYBOOKS.map(pb => ({
    params: { slug: pb.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const playbook = PLAYBOOKS.find(pb => pb.slug === slug);
  const allRecipes = getAllRecipes();

  if (!playbook) {
    return { notFound: true };
  }

  // Filter recipes: 
  // 1. Must match category
  // 2. Prioritize 'featuredRecipes' (put them first)
  const categoryRecipes = allRecipes.filter(r => 
    playbook.categories.some(cat => 
      // Fuzzy match category (e.g. 'Sales Ops' matches 'Sales Ops')
      (r.category || '').toLowerCase().includes(cat.toLowerCase())
    )
  );

  // Sort: Featured first, then alphabetical
  const sortedRecipes = categoryRecipes.sort((a, b) => {
    const aFeatured = playbook.featuredRecipes.includes(a.id);
    const bFeatured = playbook.featuredRecipes.includes(b.id);
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return 0;
  });

  return {
    props: {
      playbook,
      recipes: sortedRecipes
    }
  };
};
