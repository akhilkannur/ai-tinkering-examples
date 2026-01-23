import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Terminal, ArrowRight, Zap, Target, Search, Heart, Cpu, Command, ChevronRight, Hash } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'
import { useState, useMemo } from 'react'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup3({ recipes }: MockupPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = useMemo(() => {
    return recipes.slice(0, 12).filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E5E5] font-mono selection:bg-[#00FF00] selection:text-black">
      <Head>
        <title>Terminal | AI Blueprints</title>
      </Head>

      <Navbar />

      <main className="pt-24 pb-24">
        
        {/* HERO: The Console */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="border border-[#333] bg-[#0A0A0A] p-8 md:p-16 relative overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
            
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-green-500 mb-6 animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest">System Online</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white uppercase leading-[0.9]">
                Automate<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Everything.</span>
              </h1>
              
              <div className="max-w-2xl border-l-2 border-green-500/50 pl-6 mb-10">
                <p className="text-lg text-gray-400 leading-relaxed">
                  <span className="text-green-500">root@user:~$</span> Access 700+ agent blueprints.
                  <br/>
                  <span className="text-green-500">root@user:~$</span> Deploy to Claude, Gemini, or Cursor.
                  <br/>
                  <span className="text-green-500">root@user:~$</span> No code required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#deploy" className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <Terminal className="w-5 h-5" /> Initialize
                </a>
                <a href="/playbook/vp-sales" className="border border-[#333] hover:border-white text-gray-300 hover:text-white font-bold px-8 py-4 uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                  View Docs
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MODULES: The Playbooks */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
            <div className="flex items-center gap-4 mb-8 text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
                <Hash className="w-4 h-4" /> Load_Modules
                <div className="h-px bg-[#333] flex-grow"></div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { title: 'VP_Sales', icon: Target, color: 'text-red-400', slug: 'vp-sales' },
                    { title: 'SEO_Manager', icon: Search, color: 'text-blue-400', slug: 'seo-manager' },
                    { title: 'Demand_Gen', icon: Zap, color: 'text-yellow-400', slug: 'demand-gen' },
                    { title: 'CS_Ops', icon: Heart, color: 'text-purple-400', slug: 'customer-success' },
                ].map((role) => (
                    <Link key={role.slug} href={`/playbook/${role.slug}`} className="bg-[#0A0A0A] border border-[#333] hover:border-gray-500 p-6 transition-all group">
                        <div className="flex justify-between items-start mb-8">
                            <role.icon className={`w-6 h-6 ${role.color}`} />
                            <ChevronRight className="w-4 h-4 text-[#333] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{role.title}</h3>
                        <p className="text-xs text-gray-500">v2.4.0 • Ready</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* DATABASE: The Grid */}
        <div id="deploy" className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Blueprint Database</h2>
                    <p className="text-gray-500 text-sm">Querying {recipes.length} records...</p>
                </div>
                <div className="relative w-full md:w-96">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 font-bold">{'>'}</span>
                    <input 
                        type="text" 
                        placeholder="search_query..." 
                        className="w-full bg-[#0A0A0A] border border-[#333] text-white px-8 py-3 focus:outline-none focus:border-green-500 transition-colors uppercase placeholder:text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="block bg-[#0A0A0A] border-l-2 border-l-transparent hover:border-l-green-500 pl-6 py-4 pr-4 border-y border-r border-y-[#1a1a1a] border-r-[#1a1a1a] transition-all group">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-gray-600 uppercase tracking-widest group-hover:text-green-500/70 transition-colors">
                                {recipe.category?.toUpperCase() || 'SYSTEM'}
                            </span>
                            <span className="text-[10px] text-[#333] border border-[#333] px-1 rounded">ID: {recipe.id.slice(0,4)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-200 mb-2 truncate group-hover:text-white">
                            {recipe.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                            {recipe.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-green-500 transition-colors">
                            <Command className="w-3 h-3" />
                            <span>EXECUTE</span>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                <Link href="/ai-examples" className="text-sm font-bold text-gray-500 hover:text-white uppercase tracking-widest border-b border-gray-800 hover:border-white pb-1 transition-all">
                    Load_More_Records [Space]
                </Link>
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
