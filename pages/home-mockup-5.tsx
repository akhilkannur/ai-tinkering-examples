import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { ArrowRight, Star, Folder, FileText, Tag, Search, Globe, Archive } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import Link from 'next/link'

interface MockupPageProps {
  recipes: Recipe[]
}

export default function HomeMockup5({ recipes }: MockupPageProps) {
  return (
    <div className="min-h-screen bg-[#EBE9E4] text-[#2A2A2A] font-mono selection:bg-[#FF4D00] selection:text-white">
      <Head>
        <title>The Blueprint Dossier | Vol. 1</title>
      </Head>

      <Navbar />

      <main className="pt-20 pb-24 max-w-[1400px] mx-auto border-x border-[#2A2A2A]">
        
        {/* HEADER: The Manifesto */}
        <header className="grid grid-cols-12 border-b border-[#2A2A2A]">
            <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-b lg:border-b-0 border-[#2A2A2A]">
                <div className="flex justify-between items-start mb-12">
                    <div className="border border-[#2A2A2A] rounded-full px-4 py-1 text-xs uppercase tracking-widest bg-white">
                        System_Archive_v2
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest mb-1">Last Updated</p>
                        <p className="text-sm font-bold">23 JAN 2026</p>
                    </div>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold uppercase leading-[0.9] tracking-tighter mb-8">
                    The Automation<br/>
                    <span className="text-[#FF4D00]">Dossier.</span>
                </h1>
                <p className="text-lg lg:text-xl max-w-2xl leading-relaxed mb-12">
                    A classified collection of <strong>{recipes.length} operating procedures</strong> for the modern revenue stack. 
                    Declassified for public use. 
                </p>
                <div className="flex gap-4">
                    <a href="#dossier" className="bg-[#2A2A2A] text-[#EBE9E4] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#FF4D00] transition-colors flex items-center gap-2">
                        <Folder className="w-4 h-4" /> Open Archive
                    </a>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-[#D6D3CD] border-l border-[#2A2A2A] p-8 flex flex-col justify-between min-h-[400px]">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-[#2A2A2A] pb-2">Operational Zones</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between hover:text-[#FF4D00] cursor-pointer">
                            <span>01. Sales Operations</span>
                            <span>[181]</span>
                        </li>
                        <li className="flex justify-between hover:text-[#FF4D00] cursor-pointer">
                            <span>02. Strategic Ops</span>
                            <span>[124]</span>
                        </li>
                        <li className="flex justify-between hover:text-[#FF4D00] cursor-pointer">
                            <span>03. Demand Gen</span>
                            <span>[73]</span>
                        </li>
                        <li className="flex justify-between hover:text-[#FF4D00] cursor-pointer">
                            <span>04. SEO Warfare</span>
                            <span>[49]</span>
                        </li>
                    </ul>
                </div>
                <div className="border-t border-[#2A2A2A] pt-6">
                    <p className="text-xs leading-relaxed opacity-70">
                        *WARNING: These files contain raw logic. Use with caution in production environments.
                    </p>
                </div>
            </div>
        </header>

        {/* MARQUEE */}
        <div className="border-b border-[#2A2A2A] overflow-hidden whitespace-nowrap py-3 bg-[#FF4D00] text-[#EBE9E4]">
            <div className="inline-block animate-marquee text-xs font-bold uppercase tracking-[0.3em]">
                /// DECLASSIFIED BLUEPRINTS /// CLAUDE COMPATIBLE /// GEMINI READY /// CURSOR OPTIMIZED /// NO CODE REQUIRED /// COPY PASTE DEPLOY ///
            </div>
        </div>

        {/* THE DOSSIER GRID */}
        <section id="dossier" className="bg-[#F5F5F0]">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-[#2A2A2A] text-xs font-bold uppercase tracking-widest bg-[#EBE9E4]">
                <div className="col-span-2 p-4 border-r border-[#2A2A2A]">ID_Code</div>
                <div className="col-span-6 p-4 border-r border-[#2A2A2A]">Operation_Name</div>
                <div className="col-span-2 p-4 border-r border-[#2A2A2A]">Sector</div>
                <div className="col-span-2 p-4">Status</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-[#2A2A2A]">
                {recipes.slice(0, 15).map((recipe, i) => (
                    <Link key={recipe.id} href={`/ai-examples/${recipe.id}`} className="grid grid-cols-12 group hover:bg-white transition-colors">
                        <div className="col-span-2 p-4 border-r border-[#2A2A2A] font-bold text-[#2A2A2A]/50 group-hover:text-[#FF4D00]">
                            {(i + 1).toString().padStart(3, '0')}
                        </div>
                        <div className="col-span-6 p-4 border-r border-[#2A2A2A]">
                            <h3 className="text-lg font-bold mb-1 group-hover:underline decoration-2 underline-offset-2">{recipe.title}</h3>
                            <p className="text-xs opacity-70 line-clamp-1">{recipe.description}</p>
                        </div>
                        <div className="col-span-2 p-4 border-r border-[#2A2A2A] flex items-center">
                            <span className="text-xs border border-[#2A2A2A] rounded-full px-2 py-0.5 bg-[#EBE9E4]">
                                {recipe.category || 'GEN'}
                            </span>
                        </div>
                        <div className="col-span-2 p-4 flex items-center justify-between">
                            <span className="text-xs font-bold text-green-700">ACTIVE</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load More */}
            <div className="p-4 text-center border-t border-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-[#EBE9E4] transition-colors cursor-pointer">
                <span className="text-xs font-bold uppercase tracking-widest">Access Full Database ({recipes.length} Files) ↓</span>
            </div>
        </section>

        {/* PRICING: The Requisition Form */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[#2A2A2A]">
            <div className="p-12 md:p-24 border-r border-[#2A2A2A] bg-white">
                <div className="w-16 h-16 border-2 border-[#2A2A2A] rounded-full flex items-center justify-center mb-8">
                    <Search className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold uppercase mb-4">Civilian Access</h2>
                <p className="mb-8 leading-relaxed">
                    Restricted access to the public archive. Suitable for independent researchers and tinkerers.
                </p>
                <ul className="space-y-4 mb-12 text-sm">
                    <li className="flex gap-3 items-center"><div className="w-2 h-2 bg-[#2A2A2A]"></div> 100 Declassified Files</li>
                    <li className="flex gap-3 items-center"><div className="w-2 h-2 bg-[#2A2A2A]"></div> Web-Only Viewing</li>
                    <li className="flex gap-3 items-center opacity-50"><div className="w-2 h-2 border border-[#2A2A2A]"></div> No Raw Downloads</li>
                </ul>
                <button className="w-full border-2 border-[#2A2A2A] py-4 font-bold uppercase tracking-widest hover:bg-[#2A2A2A] hover:text-white transition-colors">
                    Browse Free
                </button>
            </div>

            <div className="p-12 md:p-24 bg-[#FF4D00] text-[#EBE9E4]">
                <div className="w-16 h-16 border-2 border-[#EBE9E4] rounded-full flex items-center justify-center mb-8">
                    <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold uppercase mb-4">Clearance Level: PRO</h2>
                <p className="mb-8 leading-relaxed opacity-90">
                    Full access to the entire intelligence database. Includes raw source files and private channels.
                </p>
                <div className="text-6xl font-bold mb-8">$149</div>
                <ul className="space-y-4 mb-12 text-sm font-bold">
                    <li className="flex gap-3 items-center"><div className="w-2 h-2 bg-[#EBE9E4]"></div> 700+ Blueprints (Full Access)</li>
                    <li className="flex gap-3 items-center"><div className="w-2 h-2 bg-[#EBE9E4]"></div> Downloadable ZIP Archives</li>
                    <li className="flex gap-3 items-center"><div className="w-2 h-2 bg-[#EBE9E4]"></div> Weekly Intelligence Drops</li>
                </ul>
                <button className="w-full bg-[#EBE9E4] text-[#2A2A2A] py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                    Authorize Payment
                </button>
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
