import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import TerminalCookbook from '../components/BuilderFlowchart'
import HowToUseGuide from '../components/HowToUseGuide'
import { Terminal, BookOpen, Cpu, Command, ArrowRight, Zap, Target, Search, Heart } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import { fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, JobRecord, ToolRecord } from '../lib/airtable'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import AIToolCard from '../components/AIToolCard'
import NewsletterForm from '../components/NewsletterForm'
import ArchetypeQuiz from '../components/ArchetypeQuiz'
import StrategicKits from '../components/StrategicKits'
import MockTerminal from '../components/MockTerminal'

interface HybridHomePageProps {
  recipes: Recipe[]
  featuredJobs: JobRecord[]
  featuredTools: ToolRecord[]
  siteSettings: Record<string, boolean>;
}

export default function HybridHomePage({ recipes, featuredJobs, featuredTools, siteSettings }: HybridHomePageProps) {
  const homepageTitle = "AI Blueprints: Copy, Paste, Automate Your Sales & Marketing";
  const homepageDescription = "Ditch endless chats. Turn Gemini & Claude into your personal assistants with professional text-file blueprints. No coding needed.";
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
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="tracking-widest uppercase font-bold">AI Blueprints for Sales & Marketing</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-text-color mb-6 tracking-tight leading-[1.1]">
                            Stop Prompting. <br />
                            <span className="text-accent">Start Automating.</span>
                        </h1>
                        
                        <p className="text-lg text-text-secondary mb-10 leading-relaxed max-w-lg font-normal">
                            Turn AI Agents into your personal assistants. 
                            <strong className="text-text-color"> 700+ blueprints</strong> for Sales & Marketing. 
                            Built by non-technical tinkerers, for non-technical tinkerers.
                        </p>

                        <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-4">
                            <span className="text-xs font-bold text-accent tracking-wide uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-current" /> Launch Special: $29 (Normally $149)
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                            <a 
                                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                                className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] text-sm flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                Get Lifetime Access for $29 <ArrowRight className="w-4 h-4" />
                            </a>
                            <a 
                                href="#blueprints" 
                                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-navy-dark hover:bg-white/10 text-text-color font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                            >
                                Browse Free Blueprints
                            </a>
                        </div>
                        <p className="text-xs font-mono text-text-secondary/60 mb-12 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Price increases soon. One-time payment.
                        </p>

                        {/* Playbooks Bar */}
                        <div className="pt-8 border-t border-navy-dark">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary/40 mb-4">Popular Role-Based Playbooks:</p>
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

        {/* HOW TO USE GUIDE */}
        <HowToUseGuide />

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
                        CLI & Folder Agents
                        </h2>
                        <p className="text-text-secondary leading-relaxed mb-6">
                        If you use <strong className="text-text-color">Gemini CLI</strong>, <strong className="text-text-color">Claude Code</strong>, or the new <strong className="text-text-color">Claude Cowork</strong>, these blueprints act as your foundation. 
                        Drop a blueprint into a folder or paste it into the agent, and it understands the full scope: 
                        from creating files to handling complex workflows.
                        </p>
                        <div className="bg-primary-bg p-4 rounded-lg border border-navy-dark text-sm font-mono text-text-secondary/70">
                        Claude: "I've read the blueprint. Starting the build..." <span className="text-emerald-400">✓ Running</span>
                        </div>
                    </div>

                    <div className="bg-secondary-bg rounded-xl border border-navy-dark p-8 md:p-12 text-left hover:border-accent/30 transition-colors">
                        <h2 className="text-2xl font-bold text-text-color mb-4 flex items-center gap-3">
                        <span className="bg-purple-500/10 text-purple-400 p-2 rounded-lg border border-purple-500/20"><Cpu className="w-5 h-5"/></span>
                        For AI Editors
                        </h2>
                        <p className="text-text-secondary leading-relaxed mb-6">
                        Using <strong className="text-text-color">Cursor</strong> or <strong className="text-text-color">Windsurf</strong>? Paste the blueprint into the "Composer" or "Chat" window. 
                        The AI will read the 'Role', 'Objective', and 'Workflow' and build the entire tool in your project folder automatically.
                        </p>
                        <div className="bg-primary-bg p-4 rounded-lg border border-navy-dark text-sm font-mono text-text-secondary/70">
                        Composer: "Follow this blueprint to build..." <span className="text-purple-400">Generating...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* ARCHETYPE QUIZ */}
        <ArchetypeQuiz />

        {/* FAQ SECTION */}
        <div className="bg-primary-bg py-24 border-t border-navy-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-text-color mb-16 text-center tracking-tight">
              Behind the Blueprints: <span className="text-accent">Our Process</span>
            </h2>
            
            <div className="space-y-6">
              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">01</span> How are these blueprints created?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  These aren't just theoretical prompts. They are a mixture of workflows we use internally while running our own agencies and projects, combined with AI to help us structure and scale the documentation. We identify real bottlenecks in Sales and Marketing, then architect a multi-step workflow that an AI agent can actually execute.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">02</span> Are these tested and verified?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Yes. We run and test these recipes regularly to ensure they work. For complex scenarios where we can't verify every single edge case ourselves, we rely on user feedback. We are constantly fixing bugs and updating the logic based on how these perform in the real world.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">03</span> What if a blueprint doesn't work for me?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Reach out to us! If you find a bug or have a specific use case that isn't covered, let us know. We use your feedback to fix existing blueprints and build new ones that are relevant to the actual problems you're trying to solve.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">04</span> Which AI tools can run these?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Our blueprints are tool-agnostic. They are optimized for "Folder Agents" like Claude Code, Gemini CLI, and Cursor, but they work in any environment that can read files and follow logical instructions.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">05</span> Why use these instead of simple prompts?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Simple prompts often fail at complex tasks like tiered commission math or fuzzy lead matching. We've built the underlying logic into these blueprints so you don't have to spend hours debugging prompts. They are designed to be work-ready systems, not just text generators.
                </p>
              </div>

              <div className="bg-secondary-bg p-8 rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                <h3 className="text-xl font-bold mb-3 text-text-color flex items-center gap-3">
                  <span className="text-accent text-sm font-mono border border-accent/30 px-2 py-0.5 rounded">06</span> Is it safe to download these ZIP bundles?
                </h3>
                <p className="text-text-secondary leading-relaxed pl-10">
                  Yes. Our bundles contain **100% plain text files** (.md for the blueprint and .csv for the sample data). We never include executables, scripts, or binaries. You can even inspect the files in any text editor before using them. If you prefer not to download, every blueprint can also be copied and pasted directly from the page.
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
              Sign up to get 3 interesting AI recipes delivered weekly. Join hundreds of subscribers learning to use AI practically.
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
