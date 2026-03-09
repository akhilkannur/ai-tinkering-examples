import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { Terminal, Database, Sparkles, Folder, ArrowRight, Zap, Target, Search, Code, Cpu } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import FeaturedIn from '../components/FeaturedIn'

interface HomePageProps {
  recipes: Recipe[]
}

export default function OutreachOperatorLaunchPage({ recipes }: HomePageProps) {
  const homepageTitle = "The Outreach Operator | Data-First Sales Blueprints";
  const homepageDescription = "Most outreach is generic noise. I build the technical workflows to find data others miss and craft angles they can't ignore. Built for Claude Code.";

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
        .brutalist-shadow-white {
            box-shadow: 6px 6px 0px 0px #fff;
        }
      `}</style>

      <div className="min-h-screen selection:bg-[#ccff00] selection:text-black">
        <Navbar />

        {/* HERO: OPERATOR STYLE */}
        <section className="pt-40 pb-24 px-4 border-b border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest mb-8">
              <Code className="w-3 h-3" /> Outreach as Code
            </div>
            
            <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.8] tracking-tighter mb-12">
              The Outreach <br />
              <span className="text-lime">Operator.</span>
            </h1>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <p className="text-xl md:text-2xl font-bold leading-tight text-white/90">
                  Most outreach is just generic noise. I build the technical workflows to find <strong>data sources others miss</strong> and craft <strong>angles they can't ignore.</strong>
                </p>
                <p className="text-lg text-white/50 font-medium max-w-lg leading-relaxed">
                  No guru promises. No "1,000 meetings" hype. Just boringly effective outreach architecture for the AI-Native Operator. Built specifically for Claude Code and the terminal.
                </p>
                
                <div className="pt-6">
                  <a
                    href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                    className="inline-flex items-center gap-4 bg-lime text-black px-10 py-6 font-display text-2xl uppercase hover:translate-x-1 hover:translate-y-1 transition-transform brutalist-shadow-white"
                  >
                    Get The Kit ($39) <ArrowRight className="w-8 h-8" strokeWidth={3} />
                  </a>
                  <p className="mt-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                    Includes 254 blueprints + .claude/skills configuration
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8">
                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                   <div className="w-3 h-3 bg-red-500/30 rounded-full"></div>
                   <div className="w-3 h-3 bg-yellow-500/30 rounded-full"></div>
                   <div className="w-3 h-3 bg-green-500/30 rounded-full"></div>
                   <span className="text-[10px] text-white/20 font-mono ml-2 tracking-widest uppercase">system / outreach-operator / research</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-lime"> {'>'} Running Data_Hunter.vsh</div>
                  <div className="text-white/40"> [1/3] Scraping G2 competitor complaints...</div>
                  <div className="text-white/40"> [2/3] Mapping pain points to internal features...</div>
                  <div className="text-white/40"> [3/3] Cross-referencing LinkedIn intent...</div>
                  <div className="text-white/80"> [SUCCESS] 3 unique angles found.</div>
                  <div className="text-lime"> {'>'} Outreach dossier saved to /output/prospects.md</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedIn />

        {/* COREY HAINES STYLE: THE SYSTEMATIC REPO */}
        <section className="py-32 px-4 bg-white text-black" id="framework">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-end mb-24">
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-tighter">
                Boringly <br />Effective <br />Outreach.
              </h2>
              <p className="text-lg font-bold opacity-60 uppercase leading-relaxed">
                Stop looking for "The One" template. Start operating a systematic library of technical experiments. Data is the only moat.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 border-t-4 border-black pt-16">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-lime">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl uppercase">01 / Data_Hunting</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Data is the moat. Stop fighting over the same Apollo exports. Use terminal scripts to scrape intent signals, job boards, and competitor reviews.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-lime">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl uppercase">02 / Angle_Research</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Kill the AI slop. AI-driven research that finds a real reason to talk. No more "I saw your latest post"—provide actual value from the first sentence.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-lime">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl uppercase">03 / Terminal_Ops</h3>
                <p className="font-bold text-sm leading-relaxed opacity-60">
                  Stop chatting. Start operating. Deploy .md blueprints that read, write, and enrich your local files. Your outreach department, version-controlled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE REPOSITORY SHOWCASE */}
        <section className="py-32 px-4 border-t border-white/10" id="blueprints">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div>
                <div className="text-lime font-black uppercase text-xs tracking-[0.3em] mb-4">Functional Blueprints</div>
                <h2 className="font-display text-5xl uppercase leading-none tracking-tighter">The Outreach Repo.</h2>
              </div>
              <Link href="/ai-examples" className="group flex items-center gap-4 text-white font-black uppercase text-sm tracking-widest hover:text-lime transition-colors border-b-2 border-transparent hover:border-lime pb-1">
                View All 500+ Skills <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {recipes.filter(r => r.category === 'Sales Ops' || r.category === 'Lead Gen').slice(0, 6).map((recipe) => (
                <Link 
                  key={recipe.id}
                  href={`/skills/${recipe.id}`}
                  className="bg-black p-8 hover:bg-lime hover:text-black transition-all group"
                >
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-6 group-hover:opacity-100">{recipe.archetype || 'Skill'} // {recipe.id}</div>
                  <h4 className="font-display text-xl uppercase mb-3 leading-tight tracking-tight">{recipe.title}</h4>
                  <p className="text-xs font-bold opacity-40 group-hover:opacity-100 leading-relaxed">{recipe.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* THE FINAL CALL: NO BS */}
        <section className="py-40 px-4 bg-lime text-black border-t-4 border-black overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] leading-none opacity-5 select-none pointer-events-none uppercase">OPERATOR</div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.8] mb-12 tracking-tighter">
              Get the <br />Toolkit.
            </h2>
            <p className="text-xl md:text-2xl font-bold uppercase mb-16 max-w-2xl mx-auto leading-tight">
              One pre-configured folder for Claude Code. <br /> A system of 254 outreach experiments.
            </p>
            <div className="flex flex-col items-center gap-6">
              <a
                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                className="inline-flex items-center gap-6 bg-black text-white px-12 py-8 font-display text-3xl uppercase hover:scale-[1.02] transition-transform brutalist-shadow-white"
              >
                Download Now ($39) <ArrowRight className="w-10 h-10" strokeWidth={4} />
              </a>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Instant Download. Markdown format. Plain English.
              </p>
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-white/10">
          <div className="container mx-auto max-w-6xl flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-30">
            <div>Real AI Examples // The Outreach Operator</div>
            <div>© 2026 // Built for AI-Native Operators</div>
          </div>
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
