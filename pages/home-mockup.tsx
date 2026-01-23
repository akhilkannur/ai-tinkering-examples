import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Terminal, ArrowRight, Zap, Target, Search, Heart, Grid, Layers, Box, Cpu, FileText } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
  featuredJobs: JobRecord[]
  featuredTools: ToolRecord[]
  siteSettings: Record<string, boolean>;
}

export default function HomeMockup({ recipes }: MockupPageProps) {
  // Group top recipes by category for the "Workbench" view
  const categories = ['Sales Ops', 'SEO', 'Content Ops', 'Lead Gen'];
  const workbenchData = categories.reduce((acc, cat) => {
    acc[cat] = recipes.filter(r => r.category === cat).slice(0, 4);
    return acc;
  }, {} as Record<string, Recipe[]>);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-[#1a202c] font-sans selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>AI Blueprints (Mockup) | The Engineer's Workbench</title>
      </Head>

      <Navbar />

      {/* GRAPH PAPER BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <main className="relative z-10 pt-20 pb-24">
        
        {/* HERO: The "Spec Sheet" Style */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 relative overflow-hidden">
            {/* Decorative corner markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-r-4 border-b-4 border-black bg-white z-20"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4 border-black bg-white z-20"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-r-4 border-t-4 border-black bg-white z-20"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-l-4 border-t-4 border-black bg-white z-20"></div>

            <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
              <div className="flex-1">
                <div className="inline-block bg-black text-white font-mono font-bold px-3 py-1 mb-6 text-sm uppercase tracking-widest">
                  SYSTEM_VERSION: 2.0
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter uppercase">
                  Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Agents</span>,<br/>
                  Not Prompts.
                </h1>
                <p className="text-xl font-mono text-gray-600 mb-10 max-w-2xl leading-relaxed">
                  // A library of 700+ executable blueprints for Sales & Marketing.
                  <br/>
                  // Copy config files. Paste into Claude. Watch it run.
                </p>
                
                <div className="flex gap-4">
                  <a href="#workbench" className="bg-black text-white text-lg font-bold px-8 py-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-2">
                    <Terminal className="w-5 h-5" /> Access Terminal
                  </a>
                  <a href="/playbook/vp-sales" className="bg-white text-black border-2 border-black text-lg font-bold px-8 py-4 hover:bg-gray-50 transition-all flex items-center gap-2">
                    View Playbooks
                  </a>
                </div>
              </div>

              {/* Right side: Stats Panel */}
              <div className="hidden md:block w-72 bg-gray-100 border-2 border-black p-6 font-mono text-sm">
                <div className="border-b-2 border-black pb-2 mb-4 font-bold uppercase">System Status</div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Blueprints:</span>
                    <span className="font-bold text-blue-600">{recipes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categories:</span>
                    <span className="font-bold">14</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span className="text-green-600">LIVE</span>
                  </div>
                  <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-400">
                    <p className="text-xs text-gray-500 mb-2">COMPATIBLE WITH:</p>
                    <div className="flex gap-2 text-xl">
                      👾 🤖 🧠
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: ROLE PLAYBOOKS (The "Cartridges") */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">Select Your Role</h2>
            <div className="h-1 bg-black flex-grow"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'VP Sales', icon: Target, color: 'bg-red-100', slug: 'vp-sales' },
              { title: 'SEO Manager', icon: Search, color: 'bg-green-100', slug: 'seo-manager' },
              { title: 'Demand Gen', icon: Zap, color: 'bg-yellow-100', slug: 'demand-gen' },
              { title: 'Customer Success', icon: Heart, color: 'bg-purple-100', slug: 'customer-success' },
            ].map((role) => (
              <Link key={role.slug} href={`/playbook/${role.slug}`} className="group relative">
                <div className={`border-2 border-black p-6 h-full transition-all group-hover:-translate-y-2 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white`}>
                  <div className={`w-12 h-12 ${role.color} border-2 border-black flex items-center justify-center mb-4 rounded-none`}>
                    <role.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-4">{role.title}</h3>
                  <p className="text-sm text-gray-600 font-mono">Load 20+ specialized agents.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION: THE WORKBENCH (Grouped Recipes) */}
        <div id="workbench" className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Blueprint Library</h2>
            <div className="h-1 bg-black flex-grow"></div>
            <Link href="/ai-examples" className="font-mono text-sm font-bold underline hover:text-blue-600">View All {recipes.length} Files →</Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {categories.map((cat) => (
              <div key={cat} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                <div className="bg-black text-white px-6 py-3 font-mono font-bold uppercase flex justify-between items-center">
                  <span>Directory: /{cat.toUpperCase()}</span>
                  <Layers className="w-4 h-4" />
                </div>
                <div className="divide-y-2 divide-gray-100">
                  {workbenchData[cat]?.map((recipe) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="block p-5 hover:bg-yellow-50 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg group-hover:text-blue-700">{recipe.title}</h4>
                        <span className="text-xs font-mono border border-gray-300 px-2 py-0.5 rounded text-gray-500">
                          {recipe.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 font-mono">
                        {recipe.description}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 border-t-2 border-gray-100 text-center">
                  <Link href={`/ai-examples`} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black">
                    Load more {cat} scripts
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<MockupPageProps> = async () => {
  try {
    const [recipes, featuredJobs, featuredTools, siteSettingsData] = await Promise.all([
      Promise.resolve(getAllRecipes()),
      fetchFeaturedJobs(),
      fetchFeaturedTools(),
      fetchSiteSettings(),
    ]);

    const siteSettings: Record<string, boolean> = {};
    siteSettingsData.forEach(setting => {
      siteSettings[setting.settingName] = setting.enabled;
    });

    return {
      props: { recipes, featuredJobs, featuredTools, siteSettings },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch data for mockup:', error)
    return {
      props: { recipes: [], featuredJobs: [], featuredTools: [], siteSettings: {} },
      revalidate: 60,
    }
  }
}
