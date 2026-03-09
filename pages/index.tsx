import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { Terminal, Database, Sparkles, Folder, ArrowRight, Zap, Target, Search } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import FeaturedIn from '../components/FeaturedIn'

interface HomePageProps {
  recipes: Recipe[]
}

export default function OutreachOperatorLaunchPage({ recipes }: HomePageProps) {
  const homepageTitle = "The Outreach Operator | Data-First Sales Blueprints";
  const homepageDescription = "A system of experiments, data hunting, and angle discovery for normal people who need to get replies. Built for Claude Code.";

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} />
      </Head>

      <style jsx global>{`
        body {
            font-family: 'Space Mono', monospace;
            background-color: #000;
            color: #fff;
        }
        .font-display {
            font-family: 'Archivo Black', sans-serif;
        }
        .text-lime {
            color: #ccff00;
        }
        .bg-lime {
            background-color: #ccff00;
        }
        .border-lime {
            border-color: #ccff00;
        }
        .brutalist-shadow {
            box-shadow: 8px 8px 0px 0px #ccff00;
        }
        .brutalist-shadow-white {
            box-shadow: 8px 8px 0px 0px #fff;
        }
      `}</style>

      <div className="min-h-screen selection:bg-[#ccff00] selection:text-black">
        <Navbar />

        {/* HERO: THE VIBE MARKETER STYLE */}
        <section className="pt-40 pb-24 px-4 border-b border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest mb-8">
              <Terminal className="w-3 h-3" /> Terminal-Ready Workflows
            </div>
            
            <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.8] tracking-tighter mb-12">
              The Outreach <br />
              <span className="text-lime">Operator.</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <p className="text-xl md:text-2xl font-bold leading-tight text-white/80">
                  Stop blasting generic lists. I build systems of <strong>Data Hunting</strong> and <strong>Angle Discovery</strong> for people who need to get replies.
                </p>
                <p className="text-lg text-white/50 font-medium max-w-md">
                  This isn't a system that promises millions. It's a technical toolkit to find unique data sources and non-obvious hooks using Claude Code.
                </p>
                
                <div className="pt-4">
                  <a
                    href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPSPS6jXW05hIP"
                    className="inline-flex items-center gap-4 bg-lime text-black px-10 py-6 font-display text-2xl uppercase hover:translate-x-1 hover:translate-y-1 transition-transform brutalist-shadow-white"
                  >
                    Get The Operator Kit ($39) <ArrowRight className="w-8 h-8" strokeWidth={3} />
                  </a>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                   <span className="text-[10px] text-white/30 font-mono ml-2 uppercase tracking-widest">outreach_operator --init</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-lime"> {'>'} Running Data_Hunter_v2.1...</div>
                  <div className="text-white/60"> [SCANNING] G2_Competitor_Reviews</div>
                  <div className="text-white/60"> [EXTRACTING] Pain_Points_Array[42]</div>
                  <div className="text-white/60"> [MAPPING] Internal_Feature_Solution</div>
                  <div className="text-lime"> {'>'} 3 Unique Outreach Angles Generated.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedIn />

        {/* THE SYSTEM: COREY HAINES STYLE REPO FOCUS */}
        <section className="py-32 px-4 bg-white text-black" id="system">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-24 text-center max-w-3xl mx-auto">
              <h2 className="font-display text-5xl md:text-6xl uppercase leading-none mb-8">
                A System of <br />Experiments.
              </h2>
              <p className="text-xl font-bold opacity-60 uppercase">
                Stop looking for "The One" template. Start operating a library of technical experiments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-black flex items-center justify-center text-lime">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl uppercase">Data Hunting</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Find where your prospects actually hang out. Blueprints for scraping job boards, Twitter intent signals, and G2 complaints.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-black flex items-center justify-center text-lime">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl uppercase">Angle Research</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Non-obvious hooks found by AI analyzing prospect data. Move beyond the "congrats on the funding" slop.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-black flex items-center justify-center text-lime">
                  <Terminal className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl uppercase">Terminal Ops</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Automated workflows for Claude Code. Direct reading/writing to your local CSV and CRM files.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE BLUEPRINT ARCHIVE: THE "SWIPE" ELEMENT */}
        <section className="py-32 px-4 border-t border-white/10" id="blueprints">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div>
                <div className="text-lime font-black uppercase text-xs tracking-widest mb-4">Blueprints Library</div>
                <h2 className="font-display text-5xl uppercase leading-none">The Outreach <br /> Repository.</h2>
              </div>
              <Link href="/ai-examples" className="group flex items-center gap-4 text-white font-black uppercase text-sm tracking-widest hover:text-lime transition-colors">
                View All 500+ Skills <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
              {recipes.filter(r => r.category === 'Sales Ops' || r.category === 'Lead Gen').slice(0, 6).map((recipe) => (
                <Link 
                  key={recipe.id}
                  href={`/skills/${recipe.id}`}
                  className="bg-white/5 border border-white/10 p-8 hover:bg-white hover:text-black transition-all group"
                >
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4 group-hover:opacity-100">{recipe.archetype || 'Operator'}</div>
                  <h4 className="font-display text-xl uppercase mb-2 leading-tight">{recipe.title}</h4>
                  <p className="text-xs font-bold opacity-40 group-hover:opacity-100">{recipe.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CALL: THE KIT */}
        <section className="py-40 px-4 bg-lime text-black text-center border-t-4 border-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-6xl md:text-8xl uppercase leading-[0.8] mb-12">
              Install the <br />Department.
            </h2>
            <p className="text-xl md:text-2xl font-bold uppercase mb-16 max-w-2xl mx-auto leading-tight">
              One pre-configured folder for Claude Code. <br /> All 254 Outreach Operator skills included.
            </p>
            <a
              href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
              className="inline-flex items-center gap-6 bg-black text-white px-12 py-8 font-display text-3xl uppercase hover:scale-105 transition-transform brutalist-shadow-white"
            >
              Get The Kit ($39) <ArrowRight className="w-10 h-10" strokeWidth={4} />
            </a>
          </div>
        </section>

        <footer className="py-12 px-4 text-center border-t border-white/10">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-30">
            Real AI Examples // The Outreach Operator // Built for Builders
          </p>
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
