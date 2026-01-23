import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Terminal, ArrowRight, Zap, Target, Search, Heart, Copy, Check, Grid, Lock } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup10({ recipes }: MockupPageProps) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Head>
        <title>AI Blueprints | The Component Library</title>
      </Head>

      <Navbar />

      <main className="pt-32 pb-24">
        
        {/* HERO: The Grid */}
        <div className="container mx-auto px-4 max-w-[1400px]">
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    Build Faster.
                </h1>
                <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                    Beautifully designed, copy-paste components for your AI agents. <br/>
                    Accessible. Customizable. Open Source.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="#components" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                        Browse Components
                    </a>
                    <a href="https://github.com/akhilkannur/marketing-agent-blueprints" target="_blank" className="bg-zinc-900 text-white border border-zinc-800 px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors">
                        GitHub
                    </a>
                </div>
            </div>

            {/* THE COMPONENTS GRID */}
            <div id="components" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.slice(0, 24).map((recipe) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all">
                        {/* Preview Window */}
                        <div className="h-48 bg-zinc-950 p-4 border-b border-zinc-800 relative group-hover:bg-zinc-900/80 transition-colors flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                </div>
                                {recipe.isPremium && <Lock className="w-3 h-3 text-zinc-500" />}
                            </div>
                            <div className="font-mono text-xs text-zinc-500">
                                <span className="text-purple-400">const</span> agent = <span className="text-blue-400">new</span> Agent({'{'}
                                <br/>&nbsp;&nbsp;role: <span className="text-green-400">"{recipe.category}"</span>,
                                <br/>&nbsp;&nbsp;task: <span className="text-green-400">"{recipe.title.slice(0, 15)}..."</span>
                                <br/>{'}'});
                            </div>
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <Copy className="w-3 h-3" /> Copy Code
                                </button>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="p-4">
                            <h3 className="font-bold text-sm text-zinc-200 mb-1 truncate">{recipe.title}</h3>
                            <p className="text-xs text-zinc-500 truncate">{recipe.category}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-24 text-center border-t border-zinc-800 pt-24">
                <h2 className="text-3xl font-bold mb-6">Ready to ship?</h2>
                <p className="text-zinc-400 mb-10">
                    Get the complete bundle of 700+ components.
                </p>
                <button className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    Get Lifetime Access $149
                </button>
            </div>
        </div>

      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<MockupPageProps> = async () => {
  try {
    const recipes = getAllRecipes();
    return {
      props: { recipes },
      revalidate: 300,
    }
  } catch (error) {
    return {
      props: { recipes: [] },
      revalidate: 60,
    }
  }
}
