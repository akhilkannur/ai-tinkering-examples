import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
import { Command, ArrowRight, Zap, Target, Search, Heart } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import AIToolCard from '../components/AIToolCard'
import NewsletterForm from '../components/NewsletterForm'
import FeaturedIn from '../components/FeaturedIn'

import StrategicKits from '../components/StrategicKits'
import { generateItemListSchema } from '../lib/seo-utils'

// Lazy load heavy components
const TerminalCookbook = dynamic(() => import('../components/BuilderFlowchart'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center text-text-secondary">Loading Blueprints...</div>
})

const MockTerminal = dynamic(() => import('../components/MockTerminal'), { ssr: false })

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

  const itemListSchema = generateItemListSchema(recipes.slice(0, 12), baseUrl);

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} key="description" />
        <meta property="og:title" content={homepageTitle} key="og:title" />
        <meta property="og:description" content={homepageDescription} key="og:description" />
        <meta property="og:url" content={baseUrl} key="og:url" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} key="og:image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" key="og:type" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@realaiexamples" />
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

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </Head>

      <div className="min-h-screen bg-primary-bg font-mono text-text-color fade-in selection:bg-accent selection:text-black">
        <Navbar />

        {/* HERO SECTION */}
        <div className="bg-primary-bg pt-40 pb-24 relative overflow-hidden border-b-8 border-black">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        
                        <h1 className="text-6xl md:text-8xl font-headline font-bold text-text-color mb-6 tracking-tight leading-[0.9] uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            Stop Arguing <br />
                            <span className="text-accent">with Chatbots.</span>
                        </h1>
                        
                        <p className="text-xl text-text-color mb-10 leading-relaxed max-w-lg font-mono">
                            A library of 700+ agent-ready blueprints for Sales, Marketing, and Ops. Built for Gemini CLI, Claude Code, and all major LLM agents.
                        </p>

                        <div className="inline-block bg-black text-accent border-2 border-accent px-4 py-1 mb-8">
                            <span className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                                <Zap className="w-4 h-4 fill-current" /> 700+ Files. 1 Year Access.
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                            <a 
                                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                                className="w-full sm:w-auto px-10 py-5 bg-accent hover:bg-accent-hover text-black font-black border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all text-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 hover:shadow-none"
                            >
                                Get 1 Year Access ($39) <ArrowRight className="w-5 h-5" />
                            </a>
                            <a 
                                href="#skills" 
                                className="w-full sm:w-auto px-10 py-5 bg-white/10 border-4 border-black text-text-color font-black transition-all text-lg flex items-center justify-center gap-2 hover:bg-white/20"
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

        {/* NEW TO AGENTS SECTION */}
        <div className="bg-secondary-bg py-24 border-b-8 border-black text-black">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block bg-black text-accent border-2 border-black px-4 py-1 mb-6">
                            <span className="text-xs font-bold tracking-widest uppercase">
                                New to Agents? Start Here.
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-headline font-black text-black mb-8 tracking-tight uppercase">
                            A Chatbot <span className="text-primary-bg">with Hands.</span>
                        </h2>
                        <p className="text-xl text-black/80 mb-10 leading-relaxed font-mono">
                            ChatGPT can write an email, but it can't send it. <br/>
                            <strong>Agentic Tools</strong> live on your computer. They can create files, run searches, and manage projects - just like a remote intern.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                             <a href="/learn-ai" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-bold border-4 border-black shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-y-1 transition-all uppercase tracking-widest">
                                How to Install (5 Min Guide) <ArrowRight className="w-5 h-5" />
                             </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Step 1 */}
                        <div className="bg-white border-4 border-black p-6 rounded-none relative shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary-bg text-white font-bold border-4 border-black flex items-center justify-center text-lg shadow-lg">1</div>
                            <h3 className="font-bold text-black mb-2 uppercase font-headline text-xl">Install Agent</h3>
                            <p className="text-sm text-black/70 font-mono">Get Claude Code or Gemini CLI running in your terminal.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="bg-white border-4 border-black p-6 rounded-none relative shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary-bg text-white font-bold border-4 border-black flex items-center justify-center text-lg shadow-lg">2</div>
                            <h3 className="font-bold text-black mb-2 uppercase font-headline text-xl">Paste Skill</h3>
                            <p className="text-sm text-black/70 font-mono">Copy a blueprint from my library (e.g., "Lead Finder").</p>
                        </div>
                        {/* Step 3 */}
                        <div className="bg-white border-4 border-black p-6 rounded-none relative shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary-bg text-white font-bold border-4 border-black flex items-center justify-center text-lg shadow-lg">3</div>
                            <h3 className="font-bold text-black mb-2 uppercase font-headline text-xl">Run It</h3>
                            <p className="text-sm text-black/70 font-mono">Watch it work. It creates files, searches web, and executes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FeaturedIn />

        {/* COOKBOOK GRID */}
        <div className="bg-primary-bg pb-24" id="skills">
            <div className="container mx-auto px-4">
               <TerminalCookbook recipes={recipes} />
            </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-primary-bg py-16 border-t border-navy-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text-color mb-10 text-center tracking-tight">
              Quick Questions
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary-bg p-6 rounded-xl border border-navy-dark">
                <h3 className="text-base font-bold mb-2 text-text-color">Which tools work?</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Claude Code, Gemini CLI, Cursor, Windsurf. They're text files - any agent can read them.
                </p>
              </div>

              <div className="bg-secondary-bg p-6 rounded-xl border border-navy-dark">
                <h3 className="text-base font-bold mb-2 text-text-color">What if one breaks?</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Email me. I'll fix it. I'd rather update the play than have you annoyed.
                </p>
              </div>

              <div className="bg-secondary-bg p-6 rounded-xl border border-navy-dark">
                <h3 className="text-base font-bold mb-2 text-text-color">Is it safe?</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Plain text files (.md, .csv). No executables. I manually audit every file to prevent prompt injection and ensure zero malicious logic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SETUP SERVICE CTA */}
        <div className="bg-secondary-bg text-black py-20 border-y-8 border-black">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6 tracking-tight uppercase">
              Terminal giving you a headache?
            </h2>
            <p className="text-xl mb-10 font-mono max-w-2xl mx-auto leading-relaxed">
              Skip the technical setup. I'll remotely install and configure Gemini CLI and Claude Code on your machine. First 10 setups for $99.
            </p>
            <a 
              href="/agent-setup-service" 
              className="inline-block bg-accent text-black hover:bg-accent-hover font-black px-12 py-5 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all text-2xl uppercase tracking-widest transform hover:-translate-y-1 hover:shadow-none"
            >
              Book Remote Setup <ArrowRight className="inline-block w-8 h-8 ml-2" />
            </a>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-secondary-bg text-text-color py-24 border-t border-navy-dark" id="newsletter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              📬 Don't Miss Out!
            </h2>
            <p className="text-xl mb-10 font-sans text-text-secondary max-w-2xl mx-auto">
              Free blueprints starter pack and occasional updates on actionable AI tactics. If they suck, unsubscribe. I won't be offended.
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
