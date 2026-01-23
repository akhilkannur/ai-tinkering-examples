import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllRecipes } from '../../lib/recipes';
import { PLAYBOOKS } from '../../lib/playbooks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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
        "url": `https://realaiexamples.com/blueprints/${recipe.id}`,
        "name": recipe.title
      }))
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{playbook.title} | AI Blueprints</title>
        <meta name="description" content={playbook.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full text-xs font-mono text-accent mb-8">
            <Icon className="w-3 h-3" />
            <span className="tracking-widest uppercase font-bold text-[10px]">Role-Based Playbook</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-color mb-6 tracking-tight">
            {playbook.title}
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
            {playbook.description}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#blueprints" className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-accent-hover transition-all flex items-center gap-2">
              Explore {recipes.length} Blueprints <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Blueprint Grid */}
        <div id="blueprints" className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe: any) => (
              <Link 
                key={recipe.id} 
                href={`/blueprints/${recipe.id}`}
                className="group flex flex-col bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/50 transition-all hover:shadow-[0_10px_30px_rgba(56,189,248,0.05)] relative overflow-hidden"
              >
                {/* Badge for Featured/Premium */}
                {recipe.isPremium && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                    <Lock className="w-2 h-2" /> PREMIUM
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded">
                    <Terminal className="w-3 h-3" />
                    {recipe.category || 'Automation'}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-text-color mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                  {recipe.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-normal">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-navy-dark/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-text-secondary">Work-Ready</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-accent transition-all group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
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
