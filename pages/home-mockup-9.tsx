import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Check, X, ArrowRight, Download, BookOpen, Star, FileText } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup9({ recipes }: MockupPageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-purple-100 selection:text-purple-900">
      <Head>
        <title>AI Blueprints | The Manual</title>
      </Head>

      <Navbar />

      <main className="pt-24 pb-24">
        
        {/* HERO: The "Pain vs Glory" Pitch */}
        <div className="container mx-auto px-4 max-w-5xl mb-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="text-purple-600 font-bold tracking-wide uppercase text-sm mb-4">The Missing Manual</div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                    Stop writing prompts from scratch.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Most people use LLMs like a chatbot. The top 1% use them like a compiler. <br/>
                    <strong>The AI Blueprint Library</strong> gives you the source code for autonomous work.
                </p>
            </div>

            {/* The "Before/After" Visual */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
                
                {/* The "Bad" Way */}
                <div className="relative opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="absolute -top-4 -left-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold transform -rotate-6 shadow-sm border border-red-200">
                        ❌ The Chatbot Trap
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm font-mono text-xs text-slate-500 space-y-4">
                        <div className="flex gap-2">
                            <span className="text-slate-300">User:</span>
                            <p>"Write me a sales email for a CEO."</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-slate-300">AI:</span>
                            <p>"Here is a generic email that sounds like a robot..."</p>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm font-bold text-red-600">Result: 0% Response Rate</div>
                </div>

                {/* The "Good" Way */}
                <div className="relative transform md:scale-110 z-10">
                    <div className="absolute -top-4 -right-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold transform rotate-6 shadow-sm border border-purple-200">
                        ✅ The Blueprint Way
                    </div>
                    <div className="bg-white p-6 rounded-xl border-2 border-purple-600 shadow-xl font-mono text-xs text-slate-800 space-y-4">
                        <div className="flex gap-2">
                            <span className="text-purple-600">User:</span>
                            <p>
                                <span className="bg-purple-100 px-1 rounded">@blueprint_vp_sales.md</span><br/>
                                <span className="text-slate-400">Loading context...</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-emerald-600">Agent:</span>
                            <p>"I analyzed the prospect's 10-K. I found 3 pain points. Here is a hyper-personalized draft..."</p>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm font-bold text-purple-700">Result: Meetings Booked</div>
                </div>
            </div>
        </div>

        {/* SOCIAL PROOF */}
        <div className="bg-slate-900 text-white py-12 mb-24">
            <div className="container mx-auto px-4 text-center">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Trusted by builders at</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:opacity-100 transition-opacity">
                    {/* Placeholder logos */}
                    <span className="text-xl font-bold">Stripe</span>
                    <span className="text-xl font-bold">Linear</span>
                    <span className="text-xl font-bold">Vercel</span>
                    <span className="text-xl font-bold">Shopify</span>
                </div>
            </div>
        </div>

        {/* THE "BOOK" CONTENT */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
            <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4 sticky top-24 self-start">
                    <h3 className="font-bold text-slate-900 mb-4 text-lg">Inside the Library</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-center gap-2 text-purple-600 font-bold">
                            <ArrowRight className="w-4 h-4" /> Sales Operations
                        </li>
                        <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-slate-300" /> SEO Systems
                        </li>
                        <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-slate-300" /> Lead Gen
                        </li>
                        <li className="flex items-center gap-2 hover:text-purple-600 cursor-pointer">
                            <ArrowRight className="w-4 h-4 text-slate-300" /> Strategic Ops
                        </li>
                    </ul>
                    <div className="mt-8 bg-purple-50 p-6 rounded-xl border border-purple-100">
                        <div className="font-bold text-purple-900 mb-2">Complete Package</div>
                        <div className="text-3xl font-extrabold text-slate-900 mb-4">$149</div>
                        <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
                            Buy Now
                        </button>
                        <p className="text-xs text-center text-purple-700 mt-3">Lifetime access. One-time payment.</p>
                    </div>
                </div>

                <div className="md:col-span-8 space-y-16">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Sales Operations</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Stop chasing reps for updates. Use these blueprints to automate forecast hygiene, call scoring, and pipeline reviews.
                        </p>
                        <div className="space-y-4">
                            {recipes.filter(r => r.category === 'Sales Ops').slice(0, 5).map(recipe => (
                                <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="block group">
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all">
                                        <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2">
                                            {recipe.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 line-clamp-2">{recipe.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">SEO & Content</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Scale your traffic without scaling headcount. Blueprints for programmatic SEO, content refreshing, and technical audits.
                        </p>
                        <div className="space-y-4">
                            {recipes.filter(r => r.category === 'SEO').slice(0, 5).map(recipe => (
                                <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="block group">
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all">
                                        <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2">
                                            {recipe.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 line-clamp-2">{recipe.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
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
