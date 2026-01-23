import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { ArrowRight, Grid, Zap, Layers, Box, Terminal } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup6({ recipes }: MockupPageProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
      <Head>
        <title>AI Blueprints | Swiss Style</title>
      </Head>

      <Navbar />

      <main className="pt-20">
        
        {/* HERO: Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[80vh] border-b-4 border-black">
            {/* Left Col: Big Type */}
            <div className="col-span-1 md:col-span-8 p-8 md:p-16 flex flex-col justify-between border-r-4 border-black relative bg-[#F4F4F0]">
                <div className="absolute top-0 left-0 w-full h-4 bg-red-600"></div>
                
                <div className="text-xl font-bold uppercase tracking-widest mb-12">
                    Fig. 01 — Automation Library
                </div>
                
                <h1 className="text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-12">
                    System<br/>
                    Prompt<br/>
                    <span className="text-red-600">Archive.</span>
                </h1>

                <div className="flex gap-6 items-center">
                    <a href="#grid" className="bg-black text-white px-8 py-6 text-xl font-bold uppercase hover:bg-red-600 transition-colors">
                        Explore Collection
                    </a>
                    <span className="font-bold text-sm uppercase tracking-widest block w-32">
                        {recipes.length} Verified Units Available
                    </span>
                </div>
            </div>

            {/* Right Col: Functional Details */}
            <div className="col-span-1 md:col-span-4 bg-white">
                <div className="h-1/3 p-8 border-b-4 border-black flex flex-col justify-center hover:bg-blue-50 transition-colors">
                    <h3 className="text-4xl font-bold mb-2">Sales Ops</h3>
                    <p className="font-medium text-gray-500">Pipeline hygiene, forecasting, and coaching bots.</p>
                </div>
                <div className="h-1/3 p-8 border-b-4 border-black flex flex-col justify-center hover:bg-yellow-50 transition-colors">
                    <h3 className="text-4xl font-bold mb-2">SEO</h3>
                    <p className="font-medium text-gray-500">Programmatic content, audits, and interlinking.</p>
                </div>
                <div className="h-1/3 p-8 flex flex-col justify-center hover:bg-green-50 transition-colors bg-black text-white">
                    <h3 className="text-4xl font-bold mb-2">Growth</h3>
                    <p className="font-medium text-gray-400">Viral loops, referral systems, and cold outreach.</p>
                </div>
            </div>
        </div>

        {/* THE GRID: Strict */}
        <section id="grid" className="container mx-auto px-4 max-w-[1600px] py-24">
            <div className="flex items-baseline justify-between mb-12 border-b-4 border-black pb-4">
                <h2 className="text-6xl font-black uppercase">Index</h2>
                <div className="text-xl font-bold">A—Z</div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {recipes.slice(0, 12).map((recipe, i) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="group block">
                        <div className="aspect-square bg-gray-100 mb-6 relative overflow-hidden border-2 border-black group-hover:bg-red-600 transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <Terminal className="w-24 h-24 text-black opacity-10 group-hover:text-white group-hover:opacity-100 transition-all transform group-hover:scale-110" />
                            </div>
                            <div className="absolute top-4 left-4 font-bold text-xl">{String(i + 1).padStart(2, '0')}</div>
                            <div className="absolute bottom-4 right-4 font-bold text-xs uppercase bg-black text-white px-2 py-1">
                                {recipe.category || 'System'}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:text-red-600 transition-colors">{recipe.title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">{recipe.description}</p>
                    </Link>
                ))}
            </div>
        </section>

        {/* FOOTER: Big Type */}
        <footer className="bg-black text-white py-24 border-t-8 border-red-600">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-[10vw] font-black leading-none mb-12">
                    AUTOMATE<br/>NOW.
                </h2>
                <div className="flex justify-center gap-8">
                    <button className="text-2xl font-bold uppercase border-b-4 border-white pb-1 hover:text-red-500 hover:border-red-500 transition-colors">
                        Get Full Access
                    </button>
                </div>
            </div>
        </footer>

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
