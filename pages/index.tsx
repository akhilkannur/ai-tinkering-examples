import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { Terminal, Database, Sparkles, Folder, ArrowRight, Search, FileCode } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'

interface HomePageProps {
  recipes: Recipe[]
}

export default function OutreachOperatorPage({ recipes }: HomePageProps) {
  const homepageTitle = "The Outreach Operator | Data-First Sales Blueprints";
  const homepageDescription = "Terminal-ready workflows for data hunting, angle discovery, and outreach automation. Built for Claude Code and Gemini CLI.";

  // Filter recipes for Outreach/Sales only
  const outreachRecipes = recipes.filter(r => 
    r.category === 'Sales Ops' || 
    r.category === 'Lead Gen' || 
    r.category === 'Paid Media' ||
    r.category === 'Competitive Intel'
  );

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} />
      </Head>

      <div className="min-h-screen bg-white font-mono text-black selection:bg-black selection:text-white">
        <Navbar />

        <main className="container mx-auto px-4 pt-32 pb-24 max-w-5xl">
          
          {/* TECHNICAL HEADER */}
          <div className="border-b-2 border-black pb-12 mb-16">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4 opacity-50">
              <Terminal className="w-4 h-4" /> root / outreach-operator / blueprints
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 leading-none">
              The Outreach Operator.
            </h1>
            
            <p className="text-lg font-bold max-w-2xl leading-relaxed mb-8">
              A system of <strong>Data Hunting</strong> and <strong>Angle Discovery</strong> blueprints. Stop blasting generic lists. Use terminal-native agents to find non-obvious data and craft better hooks.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                className="bg-black text-white px-8 py-4 font-bold uppercase text-sm hover:bg-gray-800 transition-colors flex items-center gap-3"
              >
                Download The Operator Kit ($39) <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="#library" className="border-2 border-black px-8 py-4 font-bold uppercase text-sm hover:bg-gray-100 transition-colors">
                Browse Library
              </Link>
            </div>
          </div>

          {/* THE THREE MODES */}
          <div className="grid md:grid-cols-3 gap-0 border-2 border-black mb-24">
            <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
              <div className="flex items-center gap-2 font-black uppercase text-xs mb-4">
                <Database className="w-4 h-4" /> Mode: Data_Hunter
              </div>
              <p className="text-sm font-bold leading-relaxed opacity-70">
                Find leads where they actually hang out. Job boards, Twitter intent, G2 complaints, and niche directories.
              </p>
            </div>
            <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black">
              <div className="flex items-center gap-2 font-black uppercase text-xs mb-4">
                <Sparkles className="w-4 h-4" /> Mode: Angle_Research
              </div>
              <p className="text-sm font-bold leading-relaxed opacity-70">
                AI that reads prospect data to find non-obvious hooks. No more generic "congrats on the funding" emails.
              </p>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 font-black uppercase text-xs mb-4">
                <FileCode className="w-4 h-4" /> Mode: Terminal_Ops
              </div>
              <p className="text-sm font-bold leading-relaxed opacity-70">
                Deploy .md blueprints directly into Claude Code. Automation that reads and writes your local CRM files.
              </p>
            </div>
          </div>

          {/* BLUEPRINT REPO */}
          <div id="library" className="mb-24">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight">
                Operational Library <span className="text-gray-400">({outreachRecipes.length})</span>
              </h2>
              <div className="w-full md:w-64 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Filter skills..." 
                  className="w-full border-2 border-black p-2 pl-10 text-xs font-bold focus:outline-none focus:bg-gray-50 uppercase"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {outreachRecipes.map((recipe) => (
                <Link 
                  key={recipe.id}
                  href={`/skills/${recipe.id}`}
                  className="group border-2 border-black p-6 hover:bg-black hover:text-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border border-current opacity-60">
                        {recipe.category}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-500">
                        {recipe.archetype || 'Skill'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold uppercase">{recipe.title}</h3>
                    <p className="text-xs font-bold opacity-60 group-hover:opacity-100">{recipe.tagline}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black uppercase">
                    <span className="opacity-40 group-hover:opacity-100">{recipe.time}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* THE ARCHIVE LINK */}
          <div className="border-t-2 border-black pt-12 text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <Folder className="w-6 h-6" />
              <h4 className="text-xl font-bold uppercase">The Vault</h4>
            </div>
            <p className="text-sm font-bold text-gray-500 max-w-md mx-auto mb-8 uppercase">
              Looking for something else? I have 250+ additional operational skills for Dev, Amazon, and Marketing in the archive.
            </p>
            <Link href="/ai-examples" className="inline-block border-2 border-black px-8 py-3 font-bold uppercase text-xs hover:bg-black hover:text-white transition-all">
              Open Full Archive
            </Link>
          </div>

        </main>

        <footer className="bg-black text-white py-12 border-t-2 border-black">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
              Built by the Outreach Operator // Powered by Claude Code
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const recipes = await getAllRecipes();
    return {
      props: { recipes },
      revalidate: 86400,
    }
  } catch (error) {
    console.error('Failed to fetch recipes:', error)
    return {
      props: { recipes: [] },
      revalidate: 3600,
    }
  }
}
