import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Terminal, ArrowRight, Zap, Target, Search, Heart, Check, Star, Shield, Lock, Download, Box, Layers, X } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup4({ recipes }: MockupPageProps) {
  // Mock pricing features
  const features = [
    "700+ Battle-tested Blueprints",
    "Role-Based Playbooks (VP Sales, SEO...)",
    "Works with Claude, Gemini & Cursor",
    "Weekly Updates & New Flows",
    "Commercial Use License",
    "100% Plain Text (No Vendor Lock-in)"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>AI Blueprints | The Premium Collection</title>
      </Head>

      <Navbar />

      <main className="pt-24">
        
        {/* SECTION 1: HIGH-CONVERSION HERO */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6">
                            <Star className="w-3 h-3 fill-current" /> New: v2.0 Released
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                            Turn Claude into your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Top Performer.</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                            The ultimate collection of <strong>700+ system prompts & automation blueprints</strong> for Sales Ops, SEO, and Growth. Stop prompting from scratch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#pricing" className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 transform hover:-translate-y-1">
                                Get Lifetime Access <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                            <a href="#preview" className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-200 hover:text-indigo-600 transition-all">
                                View Free Examples
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
                            <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                                ))}
                            </div>
                            <p>Used by 5,000+ engineers & marketers</p>
                        </div>
                    </div>

                    {/* The "Product Shot" Mockup */}
                    <div className="relative perspective-1000 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
                        <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 transform rotate-y-6 rotate-x-6 transition-transform duration-700 group-hover:rotate-0">
                            {/* Fake Browser UI */}
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="mx-auto bg-slate-100 px-3 py-1 rounded text-[10px] text-slate-400 font-mono">blueprint_viewer.exe</div>
                            </div>
                            {/* Blueprint Anatomy */}
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                        <Target className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="h-4 w-48 bg-slate-900 rounded mb-2"></div>
                                        <div className="h-3 w-32 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 font-mono text-xs text-slate-600">
                                    <span className="text-purple-600">ROLE:</span> VP of Sales<br/>
                                    <span className="text-purple-600">OBJECTIVE:</span> Audit pipeline velocity.<br/>
                                    <span className="text-purple-600">CONTEXT:</span> You have access to CRM CSV exports...
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-20 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center justify-center flex-col gap-2">
                                        <Zap className="w-5 h-5 text-indigo-400" />
                                        <span className="text-xs font-bold text-indigo-900">Auto-Reasoning</span>
                                    </div>
                                    <div className="h-20 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-center flex-col gap-2">
                                        <Download className="w-5 h-5 text-emerald-400" />
                                        <span className="text-xs font-bold text-emerald-900">Structured Output</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 2: THE "BENTO" VALUE PROP */}
        <section className="py-20 bg-white border-y border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to automate work.</h2>
                    <p className="text-lg text-slate-500">Most prompt libraries are just text dumps. Our blueprints are engineered workflows designed for the new wave of "Folder Agents" like Claude Code and Gemini.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                            <Layers className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Role-Based Stacks</h3>
                        <p className="text-slate-600 leading-relaxed">Don't guess. Load the "VP Sales" or "SEO Manager" stack to get the exact 20 agents that pro teams use.</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                            <Box className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Sample Data Included</h3>
                        <p className="text-slate-600 leading-relaxed">Every premium blueprint comes with dummy CSVs/JSONs so you can test the workflow instantly.</p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">No Vendor Lock-in</h3>
                        <p className="text-slate-600 leading-relaxed">100% Markdown. It works in OpenAI, Anthropic, Cursor, or your local Llama model. You own the logic.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE "PRODUCT" GRID */}
        <section id="preview" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Explore the Library</h2>
                        <p className="text-slate-500 mt-2">Latest additions to the blueprint database.</p>
                    </div>
                    <a href="/ai-examples" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.slice(0, 6).map((recipe) => (
                        <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-lg">
                                    {recipe.category || 'System'}
                                </span>
                                {recipe.isPremium && <Lock className="w-4 h-4 text-amber-500" />}
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {recipe.title}
                            </h3>
                            
                            <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                                {recipe.description}
                            </p>

                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-400">
                                    {recipe.time} • Auto-Agent
                                </span>
                                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* SECTION 4: THE PRICING TABLE */}
        <section id="pricing" className="py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-slate-500">Stop paying monthly subscriptions for "AI Writers". Own the logic forever.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Free Tier */}
                    <div className="p-8 rounded-3xl border border-slate-200 bg-slate-50 text-slate-600">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">The Tinkerer</h3>
                        <p className="mb-6 text-sm">Perfect for testing the waters.</p>
                        <div className="text-4xl font-extrabold text-slate-900 mb-8">$0</div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> Access to 100 Free Blueprints</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> Web-based viewer</li>
                            <li className="flex items-center gap-3 text-slate-400"><X className="w-5 h-5" /> No sample data files</li>
                            <li className="flex items-center gap-3 text-slate-400"><X className="w-5 h-5" /> No downloadable ZIPs</li>
                        </ul>
                        <a href="/ai-examples" className="block w-full py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-center hover:bg-slate-100 transition-colors">
                            Browse Free
                        </a>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 rounded-3xl border-2 border-indigo-600 bg-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">POPULAR</div>
                        <h3 className="text-2xl font-bold text-indigo-900 mb-2">Lifetime Pro</h3>
                        <p className="mb-6 text-sm text-slate-500">Everything you need to scale.</p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-extrabold text-slate-900">$149</span>
                            <span className="text-slate-400 font-medium line-through">$299</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">50% OFF</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-slate-700 font-medium">
                            {features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-indigo-600" />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="block w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-center hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1">
                            Get Instant Access
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">One-time payment. Money-back guarantee.</p>
                    </div>
                </div>
            </div>
        </section>

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
