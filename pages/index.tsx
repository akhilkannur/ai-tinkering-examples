import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
import { ArrowRight, Zap, Brain, Search, Terminal, Database, Sparkles, Folder } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import FeaturedIn from '../components/FeaturedIn'
import NewsletterPopup from '../components/NewsletterPopup'

// Lazy load heavy components
const TerminalCookbook = dynamic(() => import('../components/BuilderFlowchart'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center text-text-secondary uppercase font-bold">Loading Outreach Blueprints...</div>
})

const MockTerminal = dynamic(() => import('../components/MockTerminal'), { ssr: false })

interface HomePageProps {
  recipes: Recipe[]
}

export default function OutreachOperatorPage({ recipes }: HomePageProps) {
  const homepageTitle = "The Outreach Operator: Data-First Sales Blueprints";
  const homepageDescription = "Stop blasting generic lists. A system of experiments, unique data sources, and terminal-ready workflows for normal people who need to get replies. Powered by Claude Code.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';

  // Filter recipes for Outreach/Sales only for the main display
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
        <meta name="description" content={homepageDescription} key="description" />
        <meta property="og:title" content={homepageTitle} key="og:title" />
        <meta property="og:description" content={homepageDescription} key="og:description" />
        <meta property="og:url" content={baseUrl} key="og:url" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={homepageTitle} key="twitter:title" />
        <meta name="twitter:description" content={homepageDescription} key="twitter:description" />
      </Head>

      <style jsx global>{`
        body {
            font-family: 'Space Mono', monospace;
            background-color: #f6f6f6;
        }
        .font-display {
            font-family: 'Archivo Black', sans-serif;
        }
        .brutalist-shadow {
            box-shadow: 4px 4px 0px 0px #000;
        }
        .brutalist-shadow-lg {
            box-shadow: 8px 8px 0px 0px #000;
        }
        .marquee-container {
            overflow: hidden;
            white-space: nowrap;
        }
        .marquee-content {
            display: inline-block;
            animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="min-h-screen font-mono text-black selection:bg-[#ccff00] selection:text-black">
        <Navbar />

        {/* HERO SECTION - GITHUB/TERMINAL STYLE */}
        <div className="bg-white pt-32 pb-20 relative border-b-4 border-black">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] px-3 py-1 text-xs font-bold uppercase tracking-widest mb-8 brutalist-shadow">
                            <Terminal className="w-4 h-4" /> v1.2.0 Stable Release
                        </div>
                        
                        <h1 className="font-display text-5xl md:text-7xl mb-8 uppercase leading-[0.85] tracking-tighter">
                            The Outreach <br />
                            <span className="bg-[#ccff00] px-2 text-black">Operator.</span>
                        </h1>
                        
                        <p className="text-xl font-bold mb-10 border-l-8 border-black pl-6 py-2 bg-gray-50 leading-relaxed max-w-lg">
                            Stop chatting. Start operating. A system of <strong>Data Hunting</strong> and <strong>Angle Discovery</strong> workflows for normal people who need more replies. 
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 mb-12">
                            <a
                                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                                className="group px-8 py-5 bg-black text-[#ccff00] border-4 border-black font-display text-xl uppercase brutalist-shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                            >
                                <span className="relative z-10">Get The Operator Kit ($39)</span>
                                <ArrowRight className="w-6 h-6 stroke-[3px] group-hover:translate-x-1 transition-transform relative z-10" />
                            </a>
                            
                            <Link href="#skills" className="px-8 py-5 bg-white text-black border-4 border-black font-display text-xl uppercase brutalist-shadow-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center">
                                View Blueprints
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                           <span className="flex items-center gap-1"><Database className="w-3 h-3" /> 254 Sales Skills</span>
                           <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Terminal-Ready</span>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="relative border-4 border-black brutalist-shadow-lg bg-black p-2">
                          <div className="flex items-center gap-2 mb-2 px-2 py-1 bg-gray-900 border-b border-gray-800">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                             <span className="ml-2 text-[10px] text-gray-500 font-mono">outreach-operator --mode=research</span>
                          </div>
                          <MockTerminal />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* MARQUEE */}
        <div className="bg-black border-b-4 border-black py-4 overflow-hidden">
            <div className="marquee-container font-display text-2xl uppercase tracking-widest text-white/20">
                <div className="marquee-content">
                    Data Hunting // Angle Discovery // Personalization Loops // Enrichment Engines // Outreach Operating // Data Hunting // Angle Discovery // Personalization Loops // Enrichment Engines // Outreach Operating //
                </div>
            </div>
        </div>

        <FeaturedIn />

        {/* THE SYSTEM OF RECORD */}
        <div className="bg-[#ccff00] py-20 border-b-4 border-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="bg-white p-8 border-4 border-black brutalist-shadow relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 bg-black text-white w-12 h-12 flex items-center justify-center font-display text-2xl rotate-12 group-hover:rotate-0 transition-transform">1</div>
                <h3 className="font-display text-2xl mb-4 uppercase">Data Hunting</h3>
                <p className="font-bold text-sm leading-relaxed mb-6">Stop using stale lists. Use specialized scripts to find leads on job boards, Twitter intent, and G2 reviews.</p>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-black pt-4 flex items-center gap-2">
                  <Database className="w-3 h-3" /> 84 Data Blueprints
                </div>
              </div>

              <div className="bg-white p-8 border-4 border-black brutalist-shadow relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 bg-black text-white w-12 h-12 flex items-center justify-center font-display text-2xl -rotate-12 group-hover:rotate-0 transition-transform">2</div>
                <h3 className="font-display text-2xl mb-4 uppercase">Angle Research</h3>
                <p className="font-bold text-sm leading-relaxed mb-6">AI that reads prospect websites/news to find non-obvious hooks. Stop saying "I saw your latest post."</p>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-black pt-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> 112 Angle Blueprints
                </div>
              </div>

              <div className="bg-white p-8 border-4 border-black brutalist-shadow relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 bg-black text-white w-12 h-12 flex items-center justify-center font-display text-2xl rotate-6 group-hover:rotate-0 transition-transform">3</div>
                <h3 className="font-display text-2xl mb-4 uppercase">Terminal Ops</h3>
                <p className="font-bold text-sm leading-relaxed mb-6">Run your entire outreach from the terminal. Deploy skills that read, write, and enrich your CRM files automatically.</p>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-t border-black pt-4 flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> 58 Automation Blueprints
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLUEPRINT GRID */}
        <div className="bg-white py-24" id="skills">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="inline-block bg-[#ff00ff] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-4">
                            Operational Library
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl uppercase leading-none">
                            Outreach <br />
                            <span className="text-gray-300">Blueprints.</span>
                        </h2>
                    </div>
                    <div className="flex-1 max-w-md w-full relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black" />
                        <input 
                            type="text" 
                            placeholder="Search data sources or angles..." 
                            className="w-full bg-white border-4 border-black p-4 pl-12 font-bold text-sm focus:outline-none focus:bg-[#ccff00] transition-colors brutalist-shadow"
                        />
                    </div>
                </div>

                <TerminalCookbook recipes={outreachRecipes} />
                
                <div className="mt-20 p-8 border-4 border-black bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-8 brutalist-shadow">
                    <div className="flex items-center gap-6">
                        <div className="bg-black text-white p-4">
                            <Folder className="w-10 h-10" />
                        </div>
                        <div>
                            <h4 className="font-display text-2xl uppercase">The Vault</h4>
                            <p className="font-bold text-gray-500 uppercase text-xs">Access 250+ additional operational skills for Dev, Amazon, and Marketing.</p>
                        </div>
                    </div>
                    <Link href="/ai-examples" className="bg-white border-2 border-black px-8 py-3 font-display uppercase hover:bg-black hover:text-white transition-all brutalist-shadow-sm">
                        Open Archive
                    </Link>
                </div>
            </div>
        </div>

        {/* FOOTER / CTAS */}
        <div className="bg-black text-white py-24 border-t-4 border-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-5xl md:text-6xl mb-8 uppercase text-[#ccff00]">
              Install the <br /> Department.
            </h2>
            <p className="text-xl mb-12 font-bold max-w-2xl mx-auto uppercase leading-tight text-white/60">
                Stop downloading blueprints one by one. Get the **Outreach Operator Kit**—a pre-configured folder for Claude Code with my top 254 sales skills.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <a
                    href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                    className="group w-full sm:w-auto px-12 py-6 bg-[#ccff00] text-black border-4 border-white font-display text-2xl uppercase brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4"
                >
                    Get Access ($39) 
                    <ArrowRight className="w-8 h-8 stroke-[4px]" />
                </a>
                <Link href="/about" className="text-white font-black uppercase text-sm underline underline-offset-8 hover:text-[#ccff00]">
                    Read the Manifest
                </Link>
            </div>
          </div>
        </div>

        <NewsletterPopup delay={30} />

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
    console.error('Failed to fetch recipes for homepage:', error)
    return {
      props: { recipes: [] },
      revalidate: 3600,
    }
  }
}
