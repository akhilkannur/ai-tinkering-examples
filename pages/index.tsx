import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import TerminalCookbook from '../components/BuilderFlowchart'
import { Terminal, BookOpen, Cpu, Command, ArrowRight, Zap, Target, Search, Heart } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import AIToolCard from '../components/AIToolCard'
import NewsletterForm from '../components/NewsletterForm'

import StrategicKits from '../components/StrategicKits'
import MockTerminal from '../components/MockTerminal'

interface HybridHomePageProps {
  recipes: Recipe[]
  featuredJobs: JobRecord[]
  featuredTools: ToolRecord[]
  siteSettings: Record<string, boolean>;
}

export default function HybridHomePage({ recipes, featuredJobs, featuredTools, siteSettings }: HybridHomePageProps) {
  const homepageTitle = "Real AI Examples: 500+ AI Workflows That Actually Work";
  const homepageDescription = "Stop chatting and start building. A library of reliable, copy-paste AI workflows and recipes for salespeople, marketers, and founders. Works with Gemini, Claude, and all major AI LLMs.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} key="description" />
        <meta property="og:title" content={homepageTitle} key="og:title" />
        <meta property="og:description" content={homepageDescription} key="og:description" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={homepageTitle} key="twitter:title" />
        <meta name="twitter:description" content={homepageDescription} key="twitter:description" />
        <meta name="twitter:image" content={`${baseUrl}/api/og?mode=home`} key="twitter:image" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Real AI Examples",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/ai-examples?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}} />
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color fade-in selection:bg-accent selection:text-white">
        <Navbar />

        {/* HERO SECTION */}
        <div className="bg-primary-bg pt-24 pb-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 bg-secondary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-mono text-accent mb-8 shadow-sm hover:border-accent/50 transition-colors cursor-default">
                            <span className="relative flex h-2 w-2">
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="tracking-widest uppercase font-bold">Sales & Marketing Plays. Zero Hype.</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-text-color mb-6 tracking-tight leading-[1.1]">
                            We Got Tired of <br />
                            <span className="text-accent">Arguing with Chatbots.</span>
                        </h1>
                        
                        <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-lg font-normal">
                            Most "AI workflows" are just people bragging on Twitter. We actually have work to do. <br/><br/>
                            These are the boring, reliable <strong className="text-text-color">Sales & Marketing plays</strong> we use to make Claude and Gemini shut up and do the job. No code. No "thought leaders." Just results.
                        </p>

                        <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-4">
                            <span className="text-xs font-bold text-accent tracking-wide uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-current" /> 700+ Files. 1 Year Access.
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                            <a 
                                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                                className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] text-sm flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                Get 1 Year Access ($39) <ArrowRight className="w-4 h-4" />
                            </a>
                            <a 
                                href="#blueprints" 
                                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-navy-dark hover:bg-white/10 text-text-color font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                            >
                                See What's Inside
                            </a>
                        </div>
                        <p className="text-xs font-mono text-text-secondary/60 mb-12 flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          1 Year Access. No recurring auto-charge.
                        </p>

                        {/* Playbooks Bar */}
                        <div className="pt-8 border-t border-navy-dark">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary/40 mb-4">Popular Role-Based Plays:</p>
                            <div className="flex flex-wrap gap-3">
                                <a href="/playbook/vp-sales" className="flex items-center gap-2 text-xs font-bold text-text-color bg-secondary-bg border border-navy-dark px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-all">
                                  <Target className="w-3 h-3" /> VP Sales
                                </a>
                                <a href="/playbook/seo-manager" className="flex items-center gap-2 text-xs font-bold text-text-color bg-secondary-bg border border-navy-dark px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-all">
                                  <Search className="w-3 h-3" /> SEO Manager
                                </a>
                                <a href="/playbook/demand-gen" className="flex items-center gap-2 text-xs font-bold text-text-color bg-secondary-bg border border-navy-dark px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-all">
                                  <Zap className="w-3 h-3" /> Demand Gen
                                </a>
                                <a href="/playbook/customer-success" className="flex items-center gap-2 text-xs font-bold text-text-color bg-secondary-bg border border-navy-dark px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-all">
                                  <Heart className="w-3 h-3" /> Customer Success
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative group perspective-1000">
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <MockTerminal />
                    </div>
                </div>
            </div>
        </div>



        {/* COOKBOOK GRID */}
        <div className="bg-primary-bg pb-24" id="blueprints">
            <div className="container mx-auto px-4">
               <TerminalCookbook recipes={recipes} />
            </div>
        </div>

        {/* PHILOSOPHY SECTION */}
        <div className="bg-primary-bg py-24 border-t border-navy-dark relative">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-secondary-bg rounded-xl border border-navy-dark p-8 md:p-12 text-left hover:border-accent/30 transition-colors">
                        <h2 className="text-2xl font-bold text-text-color mb-4 flex items-center gap-3">
                        <span className="bg-blue-500/10 text-blue-400 p-2 rounded-lg border border-blue-500/20"><Terminal className="w-5 h-5"/></span>
                        For the Command Line
                        </h2>
                        <p className="text-text-secondary leading-relaxed mb-6">
                        If you use <strong className="text-text-color">Gemini CLI</strong> or <strong className="text-text-color">Claude Code</strong>, these are your instruction manuals. 
                        Drop a file in. The agent reads it. It does the thing. We stopped trying to be clever and just started being explicit.
                        </p>
                        <div className="bg-primary-bg p-4 rounded-lg border border-navy-dark text-sm font-mono text-text-secondary/70">
                        Claude: "I read the file. I know what to do now." <span className="text-emerald-400">✓ Running</span>
                        </div>
                    </div>

                    <div className="bg-secondary-bg rounded-xl border border-navy-dark p-8 md:p-12 text-left hover:border-accent/30 transition-colors">
                        <h2 className="text-2xl font-bold text-text-color mb-4 flex items-center gap-3">
                        <span className="bg-purple-500/10 text-purple-400 p-2 rounded-lg border border-purple-500/20"><Cpu className="w-5 h-5"/></span>
                        For Cursor & Windsurf
                        </h2>
                        <p className="text-text-secondary leading-relaxed mb-6">
                        Stop typing "Please help me code a landing page" and hoping for the best. 
                        Paste our play into Composer. It gives the AI a rigid structure so it doesn't hallucinate a bunch of nonsense.
                        </p>
                        <div className="bg-primary-bg p-4 rounded-lg border border-navy-dark text-sm font-mono text-text-secondary/70">
                        Composer: "Play detected. Building structure..." <span className="text-purple-400">Generating...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* PREMIUM CONTEXT PROMO */}
        <div className="bg-secondary-bg border-y border-navy-dark py-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-4">
                  <Cpu className="w-4 h-4" /> New: Context Library
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-4 leading-tight">
                  Download the Brain. <br/>
                  <span className="text-accent">Make It Smart Instantly.</span>
                </h2>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Stop copying prompts one by one. Download our <strong>Master Cookbook (JSON)</strong>. 
                  It's 700+ workflows in a single file. Your agent goes from "confused intern" to "expert" in about 3 seconds.
                </p>
                <a href="/context" className="inline-flex items-center gap-2 bg-navy-dark border border-navy-light hover:border-accent text-text-color font-bold px-6 py-3 rounded-lg transition-all group-hover:translate-x-1">
                  <Command className="w-4 h-4 text-accent" /> Download Context Files <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="flex-1 w-full max-w-md bg-[#1e1e1e] rounded-lg border border-navy-dark p-4 font-mono text-sm shadow-2xl relative">
                <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-400">$ ls *.json</div>
                  <div className="text-accent">cookbook-full.json</div>
                  <div className="text-gray-400 mt-4">$ gemini run --context cookbook-full.json</div>
                  <div className="text-white">
                    <span className="text-green-400">✔</span> Loaded 723 workflows.<br/>
                    <span className="text-green-400">✔</span> Role: Marketing Ops Expert.<br/>
                    <span className="text-blue-400">?</span> How can I help you today?
                  </div>
                  <div className="animate-pulse text-accent mt-2">_</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-primary-bg py-24 border-t border-navy-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-text-color mb-16 text-center tracking-tight">
              Why does this <span className="text-accent">exist?</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">01</span> How are these created?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  We run an agency. We needed these to work. We identified real bottlenecks in our own boring Sales/Marketing tasks, then wrote the plays to automate them. If it's in this library, it's because we actually use it.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">02</span> Are they tested?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Yes. If they break, we look stupid. We verify them regularly. If you find an edge case we missed, tell us and we'll fix it.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">03</span> What if a play doesn't work for me?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Email us. Seriously. We'd rather fix the play than have you annoyed. We update logic based on feedback constantly.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">04</span> Which AI tools can run these?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Claude Code, Gemini CLI, Cursor, Windsurf. They're just text files. They don't care what tool you use, as long as it can read English and write code.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">05</span> Why use these instead of simple prompts?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Because simple prompts are vague. "Make me a marketing plan" gets you garbage. Our plays handle tiered commission math, fuzzy lead matching, and multi-step logic. It's the difference between a sketch and a play.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">06</span> Is it safe to download?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Yes. It's a ZIP file full of plain text (.md and .csv). No executables. No binaries. No weird scripts. You can open them in Notepad and read every word before using them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-secondary-bg text-text-color py-24 border-t border-navy-dark" id="newsletter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              📬 Don't Miss Out!
            </h2>
            <p className="text-xl mb-10 font-sans text-text-secondary max-w-2xl mx-auto">
              We send 3 emails a week. They contain files you can use. If they suck, unsubscribe. We won't be offended.
            </p>
            
            <div className="max-w-[500px] mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HybridHomePageProps> = async () => {
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
    console.error('Failed to fetch data for homepage:', error)
    return {
      props: { recipes: [], featuredJobs: [], featuredTools: [], siteSettings: {} },
      revalidate: 60,
    }
  }
}
