import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { ArrowRight, Zap, Target, Search, Heart, Lock, Bookmark, FileText, Filter } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'
import { useState, useMemo } from 'react'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup2({ recipes }: MockupPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = useMemo(() => {
    return recipes.slice(0, 15).filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] font-serif selection:bg-[#1C1917] selection:text-[#FDFBF7]">
      <Head>
        <title>The Archive | AI Blueprints</title>
      </Head>

      <Navbar />

      <main className="pt-20 pb-24 border-x border-[#1C1917]/10 max-w-7xl mx-auto bg-[#FDFBF7] shadow-2xl">
        
        {/* HERO: The "Masthead" */}
        <div className="px-8 md:px-16 pt-12 pb-16 border-b-2 border-[#1C1917]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
            <div>
              <div className="uppercase tracking-[0.2em] text-xs font-sans font-bold text-[#1C1917]/60 mb-4">
                Vol. 1 — The Automation Collection
              </div>
              <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-6">
                The Automation<br/>
                <span className="italic font-light text-[#444]">Archive.</span>
              </h1>
            </div>
            <div className="max-w-xs text-sm font-sans leading-relaxed text-[#1C1917]/80 border-l border-[#1C1917] pl-4">
              <p>
                A curated library of <strong>{recipes.length} systems</strong> for revenue operations. 
                Stop prompting. Start deploying proven workflows.
              </p>
            </div>
          </div>

          {/* Quick Links (Playbooks) */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#1C1917]">
            {[
              { label: 'VP Sales', href: '/playbook/vp-sales' },
              { label: 'SEO Manager', href: '/playbook/seo-manager' },
              { label: 'Demand Gen', href: '/playbook/demand-gen' },
              { label: 'CS Ops', href: '/playbook/customer-success' }
            ].map((link, i) => (
              <Link key={link.label} href={link.href} className={`group py-4 px-4 flex items-center justify-between hover:bg-[#1C1917] hover:text-white transition-colors border-b md:border-b-0 ${i !== 3 ? 'md:border-r border-[#1C1917]' : ''}`}>
                <span className="font-sans font-bold text-sm uppercase tracking-wider">{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED: The "Lead Story" */}
        <div className="grid md:grid-cols-12 border-b-2 border-[#1C1917]">
            <div className="md:col-span-8 p-8 md:p-16 border-r border-[#1C1917]">
                <span className="font-sans font-bold text-xs uppercase tracking-widest bg-[#1C1917] text-white px-2 py-1">Featured System</span>
                <h2 className="text-4xl font-medium mt-6 mb-4">The Autonomous Sales Sniper</h2>
                <p className="text-xl text-[#1C1917]/70 font-sans leading-relaxed mb-8">
                    A complete blueprint for scraping leads, enriching data, and drafting hyper-personalized outreach without human intervention.
                </p>
                <Link href="/ai-examples/autonomous-sales-sniper" className="inline-flex items-center gap-2 font-sans font-bold border-b-2 border-[#1C1917] hover:text-blue-700 hover:border-blue-700 transition-colors pb-1">
                    Access Blueprint <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="md:col-span-4 bg-[#F5F2EB] p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-6">Why It Works</h3>
                <ul className="space-y-4 font-sans text-sm">
                    <li className="flex gap-3">
                        <span className="font-bold">01</span>
                        <span className="text-[#1C1917]/70">Bypasses generic LinkedIn filters.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold">02</span>
                        <span className="text-[#1C1917]/70">Uses waterfall enrichment logic.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="font-bold">03</span>
                        <span className="text-[#1C1917]/70">Generates 100% unique openers.</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* INDEX: The Content List */}
        <div className="px-8 md:px-16 py-16">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-medium">The Index</h2>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1917]/40" />
                    <input 
                        type="text" 
                        placeholder="Filter archives..." 
                        className="bg-transparent border border-[#1C1917]/20 rounded-full pl-10 pr-4 py-2 font-sans text-sm focus:outline-none focus:border-[#1C1917]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                {filteredRecipes.map((recipe) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="group block">
                        <div className="border-t border-[#1C1917] pt-4 mb-3 flex justify-between items-center">
                            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#1C1917]/50">
                                {recipe.category}
                            </span>
                            {recipe.isPremium && <Lock className="w-3 h-3 text-[#1C1917]" />}
                        </div>
                        <h3 className="text-xl font-medium mb-3 group-hover:underline decoration-1 underline-offset-4 decoration-[#1C1917]/30">
                            {recipe.title}
                        </h3>
                        <p className="font-sans text-sm text-[#1C1917]/60 line-clamp-2 leading-relaxed">
                            {recipe.description}
                        </p>
                    </Link>
                ))}
            </div>
            
            <div className="text-center mt-16 pt-16 border-t border-[#1C1917]/10">
                <Link href="/ai-examples" className="font-sans font-bold bg-[#1C1917] text-[#FDFBF7] px-8 py-4 rounded-full hover:bg-opacity-90 transition-all">
                    Load Full Archive
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
