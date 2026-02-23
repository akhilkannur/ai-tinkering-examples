import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal, Clock } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import { getAllRecipes } from '../../../lib/recipes';
import { Recipe, categoryIcons } from '../../../lib/cookbook-data';
import slugify from '../../../utils/slugify';

interface CategoryPageProps {
  category: string;
  recipes: Recipe[];
}

export default function CategoryPage({ category, recipes }: CategoryPageProps) {
  const SITE_URL = 'https://realaiexamples.com';
  const categorySlug = slugify(category);
  const title = `${category} AI Agent Blueprints | Real AI Examples`;
  const description = `Discover high-impact AI agent blueprints for ${category.toLowerCase()}, designed to automate tasks and boost efficiency.`;

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={`${SITE_URL}/skills/category/${categorySlug}`} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <link rel="canonical" href={`${SITE_URL}/skills/category/${categorySlug}`} key="canonical" />
      </Head>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-32 pb-24 max-w-4xl relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-xs font-black font-mono uppercase tracking-widest text-black/40 mb-12">
            <Link href="/" className="hover:text-black flex items-center gap-1 shrink-0 bg-white px-2 py-1 border border-black">
              <ArrowLeft className="w-3 h-3 stroke-[3px]" /> Hub
            </Link>
            <span className="text-black">/</span>
            <span className="text-black truncate">{category}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display text-black uppercase leading-[0.9] glitch-text" data-text={`${category} Blueprints`.toUpperCase()}>
                {category} Blueprints
            </h1>
            <p className="text-xl font-bold uppercase leading-tight font-sans border-l-8 border-[#ff00ff] pl-8 py-4 bg-white border-4 border-black brutalist-shadow mt-8">
              Discover high-impact AI agent blueprints for {category.toLowerCase()}, designed to automate tasks and boost efficiency across your operations.
            </p>
          </div>

          {/* List of Recipes in Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map(recipe => (
              <Link key={recipe.id} href={`/skills/${recipe.id}`} className="group flex flex-col bg-white border-4 border-black p-6 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-black text-[#ccff00] text-[10px] font-black px-2 py-0.5 border-2 border-black uppercase tracking-widest">
                    {recipe.difficulty}
                  </span>
                  <Terminal className="w-5 h-5 text-black group-hover:text-[#ff00ff] transition-colors stroke-[3px]" />
                </div>
                <h2 className="text-xl font-display text-black mb-4 line-clamp-2 uppercase leading-tight group-hover:text-[#ff00ff] transition-colors">
                  {recipe.title}
                </h2>
                <p className="text-xs font-black font-mono text-black/60 mb-8 line-clamp-3 uppercase tracking-tighter">
                  // {recipe.tagline}
                </p>
                <div className="mt-auto pt-4 border-t-2 border-black/10 text-black font-display text-[10px] uppercase">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 stroke-[3px]" /> {recipe.time}
                  </span>
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
  const allRecipes = getAllRecipes();
  const categories = Array.from(new Set(allRecipes.map(recipe => recipe.category)));

  const paths = categories.map(category => ({
    params: { categorySlug: slugify(category) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allRecipes = getAllRecipes();
  const categorySlug = params?.categorySlug as string;
  const category = allRecipes.find(recipe => slugify(recipe.category) === categorySlug)?.category || '';

  const recipes = allRecipes.filter(recipe => slugify(recipe.category) === categorySlug);

  if (!category || recipes.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      category,
      recipes,
    },
  };
};